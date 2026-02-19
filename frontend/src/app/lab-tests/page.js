'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import apiClient from '@/lib/api';
import { useLanguage } from '@/hooks/useLanguage';
import LiquidEther from '@/components/ui/LiquidEther';
import Ribbons from '@/components/Ribbons';

export default function LabTestsPage() {
  const router = useRouter();
  const { language } = useLanguage();
  const [tests, setTests] = useState([]);
  const [labs, setLabs] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedTest, setSelectedTest] = useState(null);
  const [selectedLab, setSelectedLab] = useState(null);
  const [bookingDate, setBookingDate] = useState('');
  const [timeSlot, setTimeSlot] = useState('');
  const [sampleType, setSampleType] = useState('home');
  const [patientDetails, setPatientDetails] = useState({
    patientName: '',
    age: '',
    gender: '',
    phoneNumber: '',
    address: ''
  });
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [bookingResponse, setBookingResponse] = useState(null);
  const [showPayment, setShowPayment] = useState(false);

  useEffect(() => {
    fetchTests();
    fetchDistricts();
  }, []);

  useEffect(() => {
    if (selectedDistrict) {
      fetchCities(selectedDistrict);
      fetchLabs(selectedDistrict, '');
    }
  }, [selectedDistrict]);

  useEffect(() => {
    if (selectedCity) {
      fetchLabs(selectedDistrict, selectedCity);
    }
  }, [selectedCity]);

  const fetchTests = async () => {
    try {
      const data = await apiClient.getLabTests();
      setTests(data.tests || []);
    } catch (error) {
      console.error('Failed to fetch tests:', error);
    }
  };

  const fetchLabs = async (district = '', city = '') => {
    try {
      const data = await apiClient.getDiagnosticLabs(district, city);
      setLabs(data.labs || []);
    } catch (error) {
      console.error('Failed to fetch labs:', error);
    }
  };

  const fetchDistricts = async () => {
    try {
      const data = await apiClient.getDistricts();
      setDistricts(data.districts || []);
    } catch (error) {
      console.error('Failed to fetch districts:', error);
    }
  };

  const fetchCities = async (district) => {
    try {
      const data = await apiClient.getCities(district);
      setCities(data.cities || []);
    } catch (error) {
      console.error('Failed to fetch cities:', error);
    }
  };

  const handleBooking = async () => {
    if (!selectedTest || !selectedLab || !bookingDate || !timeSlot) {
      alert(language === 'ta' ? 'அனைத்து விவரங்களையும் நிரப்பவும்' : 'Please fill all details');
      return;
    }

    setLoading(true);
    try {
      const bookingData = {
        testId: selectedTest._id,
        labId: selectedLab._id,
        bookingDate,
        timeSlot,
        sampleType,
        patientDetails
      };

      const response = await apiClient.bookLabTest(bookingData);
      setBookingResponse(response);
      setShowPayment(true);
    } catch (error) {
      alert(language === 'ta' ? 'பதிவு தோல்வியடைந்தது' : 'Booking failed');
    } finally {
      setLoading(false);
    }
  };

  const handlePaymentConfirm = async () => {
    setLoading(true);
    try {
      await apiClient.confirmLabPayment(bookingResponse.booking.bookingId);
      alert(language === 'ta' ? 'கட்டணம் வெற்றிகரமாக முடிந்தது!' : 'Payment successful!');
      router.push('/dashboard');
    } catch (error) {
      alert(language === 'ta' ? 'கட்டணம் தோல்வியடைந்தது' : 'Payment confirmation failed');
    } finally {
      setLoading(false);
    }
  };

  const timeSlots = ['08:00 AM', '09:00 AM', '10:00 AM', '11:00 AM', '02:00 PM', '03:00 PM', '04:00 PM'];

  return (
    <>
      <Ribbons />
      <div className="relative min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
        <LiquidEther />
        <div className="relative z-10 min-h-screen flex flex-col">
          <motion.div
            className="bg-white/90 backdrop-blur-md shadow-lg border-b border-green-200/50"
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <div className="px-6 py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center">
                    <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                    </svg>
                  </div>
                  <div>
                    <h1 className="text-xl font-bold text-gray-800">
                      {language === 'ta' ? 'ஆய்வக பரிசோதனை பதிவு' : 'Lab Test Booking'}
                    </h1>
                    <p className="text-sm text-gray-600">
                      {language === 'ta' ? `படி ${step} / 3` : `Step ${step} of 3`}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          <div className="flex-1 overflow-y-auto p-6">
            {step === 1 && (
              <motion.div
                className="max-w-4xl mx-auto"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
              >
                <div className="bg-white/90 backdrop-blur-md rounded-3xl p-8 shadow-2xl">
                  <h2 className="text-2xl font-bold text-gray-800 mb-6">
                    {language === 'ta' ? 'பரிசோதனையைத் தேர்ந்தெடுக்கவும்' : 'Select Test'}
                  </h2>
                  <div className="grid gap-4">
                    {tests.map((test, index) => (
                      <motion.div
                        key={test._id}
                        onClick={() => {
                          setSelectedTest(test);
                          setStep(2);
                        }}
                        className="bg-white/95 backdrop-blur-md rounded-2xl p-6 shadow-xl border-2 border-green-100 cursor-pointer hover:shadow-2xl hover:border-green-400 transition-all relative overflow-hidden group"
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        whileHover={{ scale: 1.02, y: -5 }}
                      >
                        <div className="absolute top-0 right-0 w-40 h-40 bg-green-200/20 rounded-full blur-3xl group-hover:bg-green-300/30 transition-colors"></div>
                        <div className="relative z-10">
                          <h3 className="text-lg font-bold text-gray-800 mb-2">
                            {language === 'ta' ? test.testNameTranslations?.ta : test.testName}
                          </h3>
                          <p className="text-gray-600 text-sm mb-3">{test.description}</p>
                          <div className="flex justify-between items-center">
                            <span className="text-green-600 font-bold text-xl">₹{test.price}</span>
                            <span className="text-sm text-gray-500 bg-green-50 px-3 py-1 rounded-full">{test.reportDeliveryTime}</span>
                          </div>
                          {test.fastingRequired && (
                            <span className="inline-block mt-3 px-3 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full font-semibold">
                              {language === 'ta' ? 'உண்ணாவிரதம் தேவை' : 'Fasting Required'}
                            </span>
                          )}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                className="max-w-4xl mx-auto"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
              >
                <div className="bg-white/90 backdrop-blur-md rounded-3xl p-8 shadow-2xl">
                  <motion.button
                    onClick={() => setStep(1)}
                    className="mb-6 p-2 hover:bg-green-100 rounded-full transition-colors flex items-center gap-2 text-gray-600"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    {language === 'ta' ? 'திரும்பு' : 'Back'}
                  </motion.button>
                  <h2 className="text-2xl font-bold text-gray-800 mb-6">
                    {language === 'ta' ? 'ஆய்வகத்தைத் தேர்ந்தெடுக்கவும்' : 'Select Lab'}
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div>
                      <label className="block text-sm font-medium mb-2 text-gray-700">
                        {language === 'ta' ? 'மாவட்டம்' : 'District'}
                      </label>
                      <select
                        value={selectedDistrict}
                        onChange={(e) => {
                          setSelectedDistrict(e.target.value);
                          setSelectedCity('');
                        }}
                        className="w-full p-3 border-2 border-green-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      >
                        <option value="">{language === 'ta' ? 'தேர்ந்தெடுக்கவும்' : 'Select District'}</option>
                        {districts.map((district) => (
                          <option key={district} value={district}>{district}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2 text-gray-700">
                        {language === 'ta' ? 'நகரம்' : 'City'}
                      </label>
                      <select
                        value={selectedCity}
                        onChange={(e) => setSelectedCity(e.target.value)}
                        disabled={!selectedDistrict}
                        className="w-full p-3 border-2 border-green-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent disabled:bg-gray-100"
                      >
                        <option value="">{language === 'ta' ? 'அனைத்து' : 'All Cities'}</option>
                        {cities.map((city) => (
                          <option key={city} value={city}>{city}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="grid gap-4">
                    {labs.length === 0 ? (
                      <div className="text-center py-12 text-gray-500">
                        {language === 'ta' ? 'ஆய்வகங்கள் இல்லை' : 'No labs found'}
                      </div>
                    ) : (
                      labs.map((lab, index) => (
                        <motion.div
                        key={lab._id}
                        onClick={() => {
                          setSelectedLab(lab);
                          setStep(3);
                        }}
                        className="bg-white/95 backdrop-blur-md rounded-2xl p-6 shadow-xl border-2 border-green-100 cursor-pointer hover:shadow-2xl hover:border-green-400 transition-all relative overflow-hidden group"
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        whileHover={{ scale: 1.02, y: -5 }}
                      >
                        <div className="absolute top-0 right-0 w-40 h-40 bg-green-200/20 rounded-full blur-3xl group-hover:bg-green-300/30 transition-colors"></div>
                        <div className="relative z-10">
                          <h3 className="text-lg font-bold text-gray-800 mb-2">
                            {language === 'ta' ? lab.labNameTranslations?.ta : lab.labName}
                          </h3>
                          <p className="text-gray-600 text-sm mb-1">{lab.address}</p>
                          <p className="text-gray-500 text-xs mb-3">{lab.city}, {lab.district}</p>
                          <div className="flex items-center gap-3">
                            <span className="text-yellow-500 font-bold">★ {lab.rating}</span>
                            {lab.homeSampleCollection && (
                              <span className="px-3 py-1 bg-green-100 text-green-800 text-xs rounded-full font-semibold">
                                {language === 'ta' ? 'வீட்டில் மாதிரி சேகரிப்பு' : 'Home Collection'}
                              </span>
                            )}
                          </div>
                        </div>
                        </motion.div>
                      ))
                    )}
                  </div>
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                className="max-w-2xl mx-auto"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
              >
                <div className="bg-white/90 backdrop-blur-md rounded-3xl p-8 shadow-2xl">
                  <motion.button
                    onClick={() => setStep(2)}
                    className="mb-6 p-2 hover:bg-green-100 rounded-full transition-colors flex items-center gap-2 text-gray-600"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    {language === 'ta' ? 'திரும்பு' : 'Back'}
                  </motion.button>
                  <h2 className="text-2xl font-bold text-gray-800 mb-6">
                    {language === 'ta' ? 'பதிவு விவரங்கள்' : 'Booking Details'}
                  </h2>

                  <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  {language === 'ta' ? 'தேதி' : 'Date'}
                </label>
                <input
                  type="date"
                  value={bookingDate}
                  onChange={(e) => setBookingDate(e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full p-2 border rounded"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  {language === 'ta' ? 'நேர இடைவெளி' : 'Time Slot'}
                </label>
                <select
                  value={timeSlot}
                  onChange={(e) => setTimeSlot(e.target.value)}
                  className="w-full p-2 border rounded"
                >
                  <option value="">{language === 'ta' ? 'தேர்ந்தெடுக்கவும்' : 'Select'}</option>
                  {timeSlots.map((slot) => (
                    <option key={slot} value={slot}>{slot}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  {language === 'ta' ? 'மாதிரி சேகரிப்பு' : 'Sample Collection'}
                </label>
                <div className="flex gap-4">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      value="home"
                      checked={sampleType === 'home'}
                      onChange={(e) => setSampleType(e.target.value)}
                      className="mr-2"
                    />
                    {language === 'ta' ? 'வீட்டில்' : 'Home'}
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      value="lab"
                      checked={sampleType === 'lab'}
                      onChange={(e) => setSampleType(e.target.value)}
                      className="mr-2"
                    />
                    {language === 'ta' ? 'ஆய்வகத்தில்' : 'Lab'}
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  {language === 'ta' ? 'நோயாளியின் பெயர்' : 'Patient Name'}
                </label>
                <input
                  type="text"
                  value={patientDetails.patientName}
                  onChange={(e) => setPatientDetails({...patientDetails, patientName: e.target.value})}
                  className="w-full p-2 border rounded"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    {language === 'ta' ? 'வயது' : 'Age'}
                  </label>
                  <input
                    type="number"
                    value={patientDetails.age}
                    onChange={(e) => setPatientDetails({...patientDetails, age: e.target.value})}
                    className="w-full p-2 border rounded"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    {language === 'ta' ? 'பாலினம்' : 'Gender'}
                  </label>
                  <select
                    value={patientDetails.gender}
                    onChange={(e) => setPatientDetails({...patientDetails, gender: e.target.value})}
                    className="w-full p-2 border rounded"
                  >
                    <option value="">{language === 'ta' ? 'தேர்ந்தெடுக்கவும்' : 'Select'}</option>
                    <option value="male">{language === 'ta' ? 'ஆண்' : 'Male'}</option>
                    <option value="female">{language === 'ta' ? 'பெண்' : 'Female'}</option>
                    <option value="other">{language === 'ta' ? 'மற்றவை' : 'Other'}</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  {language === 'ta' ? 'தொலைபேசி எண்' : 'Phone Number'}
                </label>
                <input
                  type="tel"
                  value={patientDetails.phoneNumber}
                  onChange={(e) => setPatientDetails({...patientDetails, phoneNumber: e.target.value})}
                  className="w-full p-2 border rounded"
                />
              </div>

              {sampleType === 'home' && (
                <div>
                  <label className="block text-sm font-medium mb-1">
                    {language === 'ta' ? 'முகவரி' : 'Address'}
                  </label>
                  <textarea
                    value={patientDetails.address}
                    onChange={(e) => setPatientDetails({...patientDetails, address: e.target.value})}
                    className="w-full p-2 border rounded"
                    rows="3"
                  />
                </div>
              )}

                    <motion.button
                      onClick={handleBooking}
                      disabled={loading}
                      className="w-full px-6 py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl hover:from-green-600 hover:to-emerald-700 font-semibold shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {loading ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          <span>{language === 'ta' ? 'பதிவு செய்யப்படுகிறது...' : 'Booking...'}</span>
                        </>
                      ) : (
                        <>
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          <span>{language === 'ta' ? 'பதிவு உறுதிப்படுத்து' : 'Confirm Booking'}</span>
                        </>
                      )}
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            )}

            {showPayment && bookingResponse && (
              <motion.div
                className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <motion.div
                  className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                >
                  <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
                    {language === 'ta' ? 'கட்டணம் செய்யவும்' : 'Complete Payment'}
                  </h2>

                  <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-2xl p-6 mb-6">
                    <div className="text-center mb-4">
                      <p className="text-sm text-gray-600 mb-2">
                        {language === 'ta' ? 'தொகை' : 'Amount'}
                      </p>
                      <p className="text-4xl font-bold text-green-600">₹{bookingResponse.booking.amount}</p>
                    </div>

                    <div className="bg-white rounded-xl p-4 mb-4">
                      <p className="text-xs text-gray-600 text-center mb-2">
                        {language === 'ta' ? 'UPI ID' : 'UPI ID'}
                      </p>
                      <p className="text-center font-mono font-bold text-gray-800 break-all">
                        {bookingResponse.upiId}
                      </p>
                    </div>

                    <div className="bg-white rounded-xl p-4 flex items-center justify-center">
                      <div className="text-center">
                        <div className="w-48 h-48 bg-white p-2 rounded-lg mb-2">
                          <img 
                            src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=upi://pay?pa=${bookingResponse.upiId}&pn=Maruthuvan&am=${bookingResponse.booking.amount}&cu=INR`}
                            alt="UPI QR Code"
                            className="w-full h-full"
                          />
                        </div>
                        <p className="text-xs text-gray-600">
                          {language === 'ta' ? 'QR கோடை ஸ்கான் செய்யவும்' : 'Scan QR Code'}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <motion.button
                      onClick={handlePaymentConfirm}
                      disabled={loading}
                      className="w-full px-6 py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl hover:from-green-600 hover:to-emerald-700 font-semibold shadow-xl disabled:opacity-50"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {loading ? (
                        <span>{language === 'ta' ? 'உறுதிப்படுத்துகிறது...' : 'Confirming...'}</span>
                      ) : (
                        <span>{language === 'ta' ? 'நான் கட்டணம் செய்தேன்' : 'I have paid'}</span>
                      )}
                    </motion.button>

                    <motion.button
                      onClick={() => setShowPayment(false)}
                      className="w-full px-6 py-3 bg-gray-200 text-gray-700 rounded-xl hover:bg-gray-300 font-semibold"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {language === 'ta' ? 'ரத்து செய்' : 'Cancel'}
                    </motion.button>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
