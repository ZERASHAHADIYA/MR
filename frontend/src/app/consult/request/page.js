'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import apiClient from '@/lib/api';
import { useLanguage } from '@/hooks/useLanguage';
import LiquidEther from '@/components/ui/LiquidEther';
import Ribbons from '@/components/Ribbons';

export default function ConsultationRequestPage() {
  const router = useRouter();
  const { language } = useLanguage();
  const [hospitals, setHospitals] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [selectedHospital, setSelectedHospital] = useState(null);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [scheduledDate, setScheduledDate] = useState('');
  const [timeSlot, setTimeSlot] = useState('');
  const [symptoms, setSymptoms] = useState('');
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);

  const timeSlots = ['09:00 AM', '10:00 AM', '11:00 AM', '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM'];

  useEffect(() => {
    fetchHospitals();
  }, []);

  useEffect(() => {
    if (selectedHospital) {
      fetchDoctors(selectedHospital._id);
    }
  }, [selectedHospital]);

  const fetchHospitals = async () => {
    try {
      const data = await apiClient.getHospitals();
      setHospitals(data.hospitals || []);
    } catch (error) {
      console.error('Failed to fetch hospitals:', error);
    }
  };

  const fetchDoctors = async (hospitalId) => {
    try {
      const data = await apiClient.getDoctors(hospitalId);
      setDoctors(data.doctors || []);
    } catch (error) {
      console.error('Failed to fetch doctors:', error);
    }
  };

  const handleSubmit = async () => {
    if (!selectedDoctor || !scheduledDate || !timeSlot) {
      alert(language === 'ta' ? 'அனைத்து விவரங்களையும் நிரப்பவும்' : 'Please fill all details');
      return;
    }

    setLoading(true);
    try {
      await apiClient.createConsultationRequest({
        doctorId: selectedDoctor._id,
        hospitalId: selectedHospital._id,
        scheduledDate,
        timeSlot,
        symptoms
      });

      alert(language === 'ta' ? 'கோரிக்கை அனுப்பப்பட்டது!' : 'Request sent successfully!');
      router.push('/consult/my-requests');
    } catch (error) {
      alert(language === 'ta' ? 'கோரிக்கை தோல்வியடைந்தது' : 'Request failed');
    } finally {
      setLoading(false);
    }
  };

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
              <h1 className="text-xl font-bold text-gray-800">
                {language === 'ta' ? 'ஆலோசனை கோரிக்கை' : 'Consultation Request'}
              </h1>
              <p className="text-sm text-gray-600">
                {language === 'ta' ? `படி ${step} / 3` : `Step ${step} of 3`}
              </p>
            </div>
          </motion.div>

          <div className="flex-1 overflow-y-auto p-6">
            {step === 1 && (
              <motion.div className="max-w-4xl mx-auto" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <div className="bg-white/90 backdrop-blur-md rounded-3xl p-8 shadow-2xl">
                  <h2 className="text-2xl font-bold text-gray-800 mb-6">
                    {language === 'ta' ? 'மருத்துவமனையைத் தேர்ந்தெடுக்கவும்' : 'Select Hospital'}
                  </h2>
                  <div className="grid gap-4">
                    {hospitals.map((hospital) => (
                      <motion.div
                        key={hospital._id}
                        onClick={() => { setSelectedHospital(hospital); setStep(2); }}
                        className="bg-white/95 rounded-2xl p-6 shadow-xl border-2 border-green-100 cursor-pointer hover:shadow-2xl hover:border-green-400 transition-all"
                        whileHover={{ scale: 1.02 }}
                      >
                        <h3 className="text-lg font-bold text-gray-800 mb-2">
                          {language === 'ta' ? hospital.nameTranslations?.ta : hospital.name}
                        </h3>
                        <p className="text-gray-600 text-sm">{hospital.address}</p>
                        <span className="text-yellow-500 font-bold mt-2 inline-block">★ {hospital.rating}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div className="max-w-4xl mx-auto" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <div className="bg-white/90 backdrop-blur-md rounded-3xl p-8 shadow-2xl">
                  <button onClick={() => setStep(1)} className="mb-6 p-2 hover:bg-green-100 rounded-full">
                    ← {language === 'ta' ? 'திரும்பு' : 'Back'}
                  </button>
                  <h2 className="text-2xl font-bold text-gray-800 mb-6">
                    {language === 'ta' ? 'மருத்துவரைத் தேர்ந்தெடுக்கவும்' : 'Select Doctor'}
                  </h2>
                  <div className="grid gap-4">
                    {doctors.map((doctor) => (
                      <motion.div
                        key={doctor._id}
                        onClick={() => { setSelectedDoctor(doctor); setStep(3); }}
                        className="bg-white/95 rounded-2xl p-6 shadow-xl border-2 border-green-100 cursor-pointer hover:shadow-2xl hover:border-green-400 transition-all"
                        whileHover={{ scale: 1.02 }}
                      >
                        <h3 className="text-lg font-bold text-gray-800 mb-2">{doctor.name}</h3>
                        <p className="text-gray-600 text-sm">{language === 'ta' ? doctor.specializationTranslations?.ta : doctor.specialization}</p>
                        <p className="text-gray-500 text-xs mb-3">{doctor.experience} years</p>
                        <div className="flex justify-between">
                          <span className="text-green-600 font-bold">₹{doctor.consultationFee}</span>
                          <span className="text-yellow-500 font-bold">★ {doctor.rating}</span>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div className="max-w-2xl mx-auto" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <div className="bg-white/90 backdrop-blur-md rounded-3xl p-8 shadow-2xl">
                  <button onClick={() => setStep(2)} className="mb-6 p-2 hover:bg-green-100 rounded-full">
                    ← {language === 'ta' ? 'திரும்பு' : 'Back'}
                  </button>
                  <h2 className="text-2xl font-bold text-gray-800 mb-6">
                    {language === 'ta' ? 'நேரத்தைத் தேர்ந்தெடுக்கவும்' : 'Schedule'}
                  </h2>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">{language === 'ta' ? 'தேதி' : 'Date'}</label>
                      <input type="date" value={scheduledDate} onChange={(e) => setScheduledDate(e.target.value)} min={new Date().toISOString().split('T')[0]} className="w-full p-3 border-2 border-green-200 rounded-xl" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">{language === 'ta' ? 'நேரம்' : 'Time'}</label>
                      <select value={timeSlot} onChange={(e) => setTimeSlot(e.target.value)} className="w-full p-3 border-2 border-green-200 rounded-xl">
                        <option value="">{language === 'ta' ? 'தேர்ந்தெடுக்கவும்' : 'Select'}</option>
                        {timeSlots.map((slot) => <option key={slot} value={slot}>{slot}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">{language === 'ta' ? 'அறிகுறிகள்' : 'Symptoms'}</label>
                      <textarea value={symptoms} onChange={(e) => setSymptoms(e.target.value)} className="w-full p-3 border-2 border-green-200 rounded-xl" rows="4" />
                    </div>
                    <button onClick={handleSubmit} disabled={loading} className="w-full px-6 py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl font-semibold shadow-xl disabled:opacity-50">
                      {loading ? (language === 'ta' ? 'அனுப்புகிறது...' : 'Sending...') : (language === 'ta' ? 'கோரிக்கையை அனுப்பு' : 'Send Request')}
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
