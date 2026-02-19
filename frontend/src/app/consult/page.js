'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import dynamic from 'next/dynamic';
import LiquidEther from '@/components/ui/LiquidEther';
import Ribbons from '@/components/Ribbons';

const MapComponent = dynamic(() => import('@/components/MapComponent'), { ssr: false });

const pageTransition = {
  initial: { clipPath: 'circle(0% at 50% 50%)', opacity: 0 },
  animate: { clipPath: 'circle(150% at 50% 50%)', opacity: 1, transition: { duration: 0.8, ease: 'easeInOut' } },
  exit: { clipPath: 'circle(0% at 50% 50%)', opacity: 0, transition: { duration: 0.6, ease: 'easeInOut' } }
};

const ConsultPage = () => {
  const [language, setLanguage] = useState('english');
  const [locationPermission, setLocationPermission] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  const [selectedHospital, setSelectedHospital] = useState(null);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [consultStep, setConsultStep] = useState('permission');
  const [hospitals, setHospitals] = useState([]);
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    if (consultStep === 'map') {
      fetchHospitals();
    }
  }, [consultStep]);

  useEffect(() => {
    if (selectedHospital) {
      fetchDoctors();
    }
  }, [selectedHospital]);

  const fetchHospitals = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/consult/hospitals', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await response.json();
      setHospitals(data.hospitals || []);
    } catch (error) {
      console.error('Failed to fetch hospitals:', error);
    }
  };

  const fetchDoctors = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5000/api/consult/doctors?hospitalId=${selectedHospital._id}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await response.json();
      setDoctors(data.doctors || []);
    } catch (error) {
      console.error('Failed to fetch doctors:', error);
    }
  };

  const requestLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
          setLocationPermission('granted');
          setConsultStep('map');
        },
        (error) => {
          setLocationPermission('denied');
        }
      );
    }
  };

  // Location Permission Screen
  if (consultStep === 'permission') {
    return (
      <>
        <Ribbons />
        <div className="relative min-h-screen bg-gradient-to-br from-green-50 to-blue-50 overflow-hidden">
          <LiquidEther />
          <motion.div
            variants={pageTransition}
            initial="initial"
            animate="animate"
            exit="exit"
            className="relative z-10 min-h-screen flex items-center justify-center p-6"
          >
            <motion.div
              className="max-w-md w-full bg-white/90 backdrop-blur-md rounded-3xl p-8 shadow-2xl border border-green-100"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <div className="text-center">
                <motion.div
                  className="w-24 h-24 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl relative"
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <div className="absolute inset-0 bg-white/20 rounded-full animate-ping"></div>
                  <svg className="w-12 h-12 text-white relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </motion.div>
                <h2 className="text-3xl font-bold text-gray-800 mb-4">
                  {language === 'tamil' ? 'இருப்பிட அனுமதி' : 'Location Permission'}
                </h2>
                <p className="text-gray-600 mb-8 leading-relaxed">
                  {language === 'tamil' 
                    ? 'அருகிலுள்ள மருத்துவமனைகளைக் கண்டறிய உங்கள் இருப்பிடத்தை அணுக அனுமதி தேவை'
                    : 'We need your location to find nearby hospitals under Maruthuvan Scheme'}
                </p>
                <motion.button
                  onClick={requestLocation}
                  className="w-full px-6 py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl hover:from-green-600 hover:to-emerald-700 font-semibold shadow-xl mb-4 flex items-center justify-center gap-3 relative overflow-hidden group"
                  whileHover={{ scale: 1.02, boxShadow: '0 25px 50px rgba(16, 185, 129, 0.4)' }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-green-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <svg className="w-5 h-5 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  </svg>
                  <span className="relative z-10">{language === 'tamil' ? 'இருப்பிடத்தை இயக்கு' : 'Enable Location'}</span>
                </motion.button>
                <button
                  onClick={() => setLanguage(language === 'english' ? 'tamil' : 'english')}
                  className="text-sm text-green-600 hover:text-green-700 font-semibold"
                >
                  {language === 'english' ? 'தமிழ்' : 'English'}
                </button>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </>
    );
  }

  // Map & Hospital List Screen
  if (consultStep === 'map') {
    return (
      <>
        <Ribbons />
        <div className="relative min-h-screen bg-gradient-to-br from-green-50 to-blue-50 overflow-hidden">
          <LiquidEther />
          <AnimatePresence mode="wait">
            <motion.div
              key="map-screen"
              variants={pageTransition}
              initial="initial"
              animate="animate"
              exit="exit"
              className="relative z-10 min-h-screen flex flex-col"
            >
              <motion.div
                className="bg-white/90 backdrop-blur-md shadow-lg border-b border-green-200/50"
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <div className="px-6 py-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                    </div>
                    <h1 className="text-xl font-bold text-gray-800">
                      {language === 'tamil' ? 'அருகிலுள்ள மருத்துவமனைகள்' : 'Nearby Hospitals'}
                    </h1>
                  </div>
                  <button
                    onClick={() => setLanguage(language === 'english' ? 'tamil' : 'english')}
                    className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-semibold hover:bg-green-200 transition-colors"
                  >
                    {language === 'english' ? 'தமிழ்' : 'English'}
                  </button>
                </div>
              </motion.div>

              <div className="flex-1 overflow-hidden">
                <motion.div
                  className="h-64 bg-gray-200 relative overflow-hidden"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  <MapComponent userLocation={userLocation} hospitals={hospitals} />
                </motion.div>

                <div className="p-6 space-y-4 overflow-y-auto">
                  <motion.div
                    className="bg-gradient-to-r from-blue-50 via-green-50 to-blue-50 border-2 border-blue-200 rounded-2xl p-5 mb-4 shadow-lg relative overflow-hidden"
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                  >
                    <div className="absolute top-0 right-0 w-32 h-32 bg-green-200/30 rounded-full blur-3xl"></div>
                    <div className="relative z-10 flex items-start gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-sm text-blue-900 font-bold mb-1">
                          {language === 'tamil' ? 'மருத்துவன் திட்டம்' : 'Maruthuvan Scheme'}
                        </p>
                        <p className="text-xs text-blue-800">
                          {language === 'tamil' ? 'அரசு மருத்துவமனைகளில் இலவச ஆலோசனை' : 'Free consultation at Government hospitals'}
                        </p>
                      </div>
                    </div>
                  </motion.div>

                  {hospitals.map((hospital, idx) => (
                    <motion.div
                      key={hospital._id}
                      className="bg-white/95 backdrop-blur-md rounded-2xl p-6 shadow-xl border-2 border-green-100 cursor-pointer hover:shadow-2xl hover:border-green-400 transition-all relative overflow-hidden group"
                      initial={{ opacity: 0, y: 50 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.6 + idx * 0.1 }}
                      whileHover={{ scale: 1.02, y: -8 }}
                      onClick={() => {
                        setSelectedHospital(hospital);
                        setConsultStep('hospital');
                      }}
                    >
                      <div className="absolute top-0 right-0 w-40 h-40 bg-green-200/20 rounded-full blur-3xl group-hover:bg-green-300/30 transition-colors"></div>
                      <div className="flex items-start justify-between relative z-10">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-3">
                            <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
                              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                              </svg>
                            </div>
                            <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full">Government</span>
                          </div>
                          <h3 className="text-lg font-bold text-gray-800 mb-3">{hospital.name}</h3>
                          <div className="flex items-center gap-4 text-sm text-gray-600">
                            <div className="flex items-center gap-1.5 bg-green-50 px-3 py-1.5 rounded-full">
                              <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                              </svg>
                              <span className="font-bold text-green-700">{hospital.distance}</span>
                            </div>
                            <div className="flex items-center gap-1.5 bg-blue-50 px-3 py-1.5 rounded-full">
                              <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                              </svg>
                              <span className="font-semibold text-blue-700">{hospital.doctors} {language === 'tamil' ? 'மருத்துவர்கள்' : 'Doctors'}</span>
                            </div>
                          </div>
                        </div>
                        <motion.div
                          className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center group-hover:bg-green-500 transition-colors"
                          whileHover={{ x: 5 }}
                          transition={{ duration: 0.2 }}
                        >
                          <svg className="w-5 h-5 text-green-600 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </motion.div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </>
    );
  }

  // Doctor List Screen
  if (consultStep === 'hospital' && selectedHospital) {
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
                <div className="flex items-center gap-3">
                  <motion.button
                    onClick={() => setConsultStep('map')}
                    className="p-2 hover:bg-green-100 rounded-full transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </motion.button>
                  <div>
                    <h1 className="text-xl font-bold text-gray-800">{selectedHospital.name}</h1>
                    <p className="text-sm text-gray-600">{language === 'tamil' ? 'கிடைக்கும் மருத்துவர்கள்' : 'Available Doctors'}</p>
                  </div>
                </div>
              </div>
            </motion.div>

            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              <div className="bg-green-50 border-2 border-green-200 rounded-xl p-4 mb-4">
                <p className="text-sm text-green-800">
                  <strong>{language === 'tamil' ? 'விரைவு நேரம்:' : 'Swift Timing:'}</strong> {language === 'tamil' ? 'மருத்துவர்கள் 24/7 கிடைக்கிறார்கள்' : 'Doctors available 24/7 for video consultation'}
                </p>
              </div>

              {doctors.map((doctor) => (
                <motion.div
                  key={doctor._id}
                  className={`bg-white/90 backdrop-blur-md rounded-2xl p-6 shadow-lg border-2 ${
                    'border-green-200 cursor-pointer hover:shadow-xl'
                  } transition-all`}
                  whileHover={{ scale: 1.02 }}
                  onClick={() => {
                    setSelectedDoctor(doctor);
                    setConsultStep('doctor');
                  }}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex gap-4">
                      <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center">
                        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-gray-800">{doctor.name}</h3>
                        <p className="text-sm text-gray-600 mb-2">{doctor.specialization}</p>
                        <div className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                          <span className="text-xs text-gray-600">
                            {language === 'tamil' ? 'கிடைக்கிறது' : 'Available'}
                          </span>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">{language === 'tamil' ? 'பணி நேரம்:' : 'Shift:'} {doctor.shift}</p>
                      </div>
                    </div>
                    {doctor.available && (
                      <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </>
    );
  }

  // Doctor Details & Video Call Button
  if (consultStep === 'doctor' && selectedDoctor) {
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
                <div className="flex items-center gap-3">
                  <motion.button
                    onClick={() => setConsultStep('hospital')}
                    className="p-2 hover:bg-green-100 rounded-full transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </motion.button>
                  <h1 className="text-xl font-bold text-gray-800">
                    {language === 'tamil' ? 'மருத்துவர் விவரங்கள்' : 'Doctor Details'}
                  </h1>
                </div>
              </div>
            </motion.div>

            <div className="flex-1 overflow-y-auto p-6 flex items-center justify-center">
              <motion.div
                className="max-w-2xl w-full bg-white/90 backdrop-blur-md rounded-3xl p-8 shadow-2xl"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
              >
                <div className="text-center mb-8">
                  <div className="w-24 h-24 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">{selectedDoctor.name}</h2>
                  <p className="text-lg text-gray-600 mb-4">{selectedDoctor.specialization}</p>
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <span className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></span>
                    <span className="text-sm text-green-600 font-semibold">
                      {language === 'tamil' ? 'இப்போது கிடைக்கிறது' : 'Available Now'}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500">{language === 'tamil' ? 'பணி நேரம்:' : 'Shift:'} {selectedDoctor.shift}</p>
                </div>

                <div className="space-y-4 mb-8">
                  <div className="bg-green-50 border-2 border-green-200 rounded-xl p-4">
                    <p className="text-sm text-green-800">
                      <strong>{language === 'tamil' ? 'குறிப்பு:' : 'Note:'}</strong> {language === 'tamil' ? 'வீடியோ அழைப்பு முடிந்ததும், மருந்துச்சீட்டு WhatsApp மூலம் அனுப்பப்படும்' : 'Prescription will be sent via WhatsApp after video call'}
                    </p>
                  </div>

                  <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-4">
                    <p className="text-sm text-blue-800">
                      <strong>{language === 'tamil' ? 'மருத்துவமனை:' : 'Hospital:'}</strong> {selectedHospital.name}
                    </p>
                  </div>
                </div>

                <motion.button
                  onClick={async () => {
                    try {
                      const token = localStorage.getItem('token');
                      const response = await fetch('http://localhost:5000/api/consult/request', {
                        method: 'POST',
                        headers: {
                          'Content-Type': 'application/json',
                          'Authorization': `Bearer ${token}`
                        },
                        body: JSON.stringify({
                          doctorId: selectedDoctor._id,
                          hospitalId: selectedHospital._id,
                          scheduledDate: new Date(),
                          timeSlot: 'Now',
                          symptoms: 'Video consultation request'
                        })
                      });
                      
                      if (response.ok) {
                        alert(language === 'tamil' 
                          ? 'கோரிக்கை அனுப்பப்பட்டது! மருத்துவர் ஏற்றுக்கொண்டவுடன் உங்களுக்கு அறிவிக்கப்படும்.'
                          : 'Request sent! You will be notified when doctor accepts.');
                        setConsultStep('map');
                        setSelectedDoctor(null);
                        setSelectedHospital(null);
                      } else {
                        alert(language === 'tamil' ? 'கோரிக்கை தோல்வியடைந்தது' : 'Request failed');
                      }
                    } catch (error) {
                      alert(language === 'tamil' ? 'கோரிக்கை தோல்வியடைந்தது' : 'Request failed');
                    }
                  }}
                  className="w-full px-6 py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl hover:from-green-600 hover:to-emerald-700 font-semibold shadow-lg flex items-center justify-center gap-3"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                  <span className="text-lg">{language === 'tamil' ? 'வீடியோ ஆலோசனை கோரிக்கை அனுப்பு' : 'Send Video Consultation Request'}</span>
                </motion.button>
              </motion.div>
            </div>
          </div>
        </div>
      </>
    );
  }

  // Video Call Screen
  if (isVideoCall) {
    return (
      <>
        <div className="relative min-h-screen bg-gray-900">
          <div className="relative z-10 min-h-screen flex flex-col">
            {/* Main video area */}
            <div className="flex-1 relative">
              {/* Doctor's video (main) */}
              <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
                <motion.div
                  className="text-center"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <motion.div 
                    className="w-32 h-32 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6"
                    animate={{ 
                      scale: [1, 1.05, 1],
                      boxShadow: [
                        '0 0 0 0 rgba(16, 185, 129, 0.7)',
                        '0 0 0 20px rgba(16, 185, 129, 0)',
                        '0 0 0 0 rgba(16, 185, 129, 0)'
                      ]
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <svg className="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </motion.div>
                  <h2 className="text-2xl font-bold text-white mb-2">{selectedDoctor.name}</h2>
                  <p className="text-gray-400 mb-2">{selectedDoctor.specialization}</p>
                  <motion.div
                    className="flex items-center justify-center gap-2 text-green-400"
                    animate={{ opacity: [1, 0.5, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-sm font-semibold">{language === 'tamil' ? 'இணைக்கப்பட்டது...' : 'Connected...'}</span>
                  </motion.div>
                  
                  {/* Call duration */}
                  <motion.div
                    className="mt-4 text-gray-400 text-sm"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                  >
                    <span className="font-mono">00:00</span>
                  </motion.div>
                </motion.div>
              </div>

              {/* Your video (small) */}
              <motion.div 
                className="absolute top-4 right-4 w-40 h-52 bg-gray-800 rounded-2xl border-4 border-green-500 overflow-hidden shadow-2xl"
                initial={{ x: 100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <div className="w-full h-full bg-gradient-to-br from-gray-700 to-gray-800 flex items-center justify-center relative">
                  <svg className="w-16 h-16 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  <div className="absolute bottom-2 left-2 bg-black/70 text-white px-2 py-1 rounded text-xs font-semibold">
                    {language === 'tamil' ? 'நீங்கள்' : 'You'}
                  </div>
                </div>
              </motion.div>

              {/* Connection status */}
              <motion.div
                className="absolute top-4 left-4 bg-black/70 backdrop-blur-md text-white px-4 py-2 rounded-full flex items-center gap-2"
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm font-semibold">{language === 'tamil' ? 'உயர் தரம்' : 'HD Quality'}</span>
              </motion.div>
            </div>

            {/* Controls */}
            <motion.div 
              className="bg-gray-800/95 backdrop-blur-md p-6 border-t border-gray-700"
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              <div className="flex items-center justify-center gap-4">
                {/* Microphone */}
                <motion.button
                  className="w-14 h-14 bg-gray-700 rounded-full flex items-center justify-center hover:bg-gray-600 transition-colors relative group"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                  </svg>
                  <div className="absolute -top-10 bg-black/80 text-white px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    {language === 'tamil' ? 'மைக்' : 'Mute'}
                  </div>
                </motion.button>

                {/* Video toggle */}
                <motion.button
                  className="w-14 h-14 bg-gray-700 rounded-full flex items-center justify-center hover:bg-gray-600 transition-colors relative group"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                  <div className="absolute -top-10 bg-black/80 text-white px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    {language === 'tamil' ? 'வீடியோ' : 'Video'}
                  </div>
                </motion.button>

                {/* End call */}
                <motion.button
                  onClick={() => {
                    setIsVideoCall(false);
                    setConsultStep('map');
                    setSelectedDoctor(null);
                    setSelectedHospital(null);
                  }}
                  className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center hover:bg-red-700 transition-colors shadow-lg relative group"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  animate={{ 
                    boxShadow: [
                      '0 0 0 0 rgba(220, 38, 38, 0.7)',
                      '0 0 0 10px rgba(220, 38, 38, 0)',
                      '0 0 0 0 rgba(220, 38, 38, 0)'
                    ]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  <div className="absolute -top-10 bg-black/80 text-white px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    {language === 'tamil' ? 'அழைப்பை முடிக்க' : 'End Call'}
                  </div>
                </motion.button>

                {/* Chat */}
                <motion.button
                  className="w-14 h-14 bg-gray-700 rounded-full flex items-center justify-center hover:bg-gray-600 transition-colors relative group"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                  <div className="absolute -top-10 bg-black/80 text-white px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    {language === 'tamil' ? 'செய்தி' : 'Chat'}
                  </div>
                </motion.button>

                {/* Screen share */}
                <motion.button
                  className="w-14 h-14 bg-gray-700 rounded-full flex items-center justify-center hover:bg-gray-600 transition-colors relative group"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <div className="absolute -top-10 bg-black/80 text-white px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    {language === 'tamil' ? 'திரைப் பகிர்' : 'Share'}
                  </div>
                </motion.button>
              </div>

              {/* Additional info */}
              <motion.div
                className="mt-4 text-center text-gray-400 text-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
              >
                <p>{language === 'tamil' ? 'மருந்துச்சீட்டு WhatsApp மூலம் அனுப்பப்படும்' : 'Prescription will be sent via WhatsApp'}</p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </>
    );
  }

  return null;
};

export default ConsultPage;
