'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import apiClient from '@/lib/api';
import { useLanguage } from '@/hooks/useLanguage';
import LiquidEther from '@/components/ui/LiquidEther';
import Ribbons from '@/components/Ribbons';

export default function MyBookingsPage() {
  const { language } = useLanguage();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const token = apiClient.getToken();
      if (!token) return;
      
      const decoded = JSON.parse(atob(token.split('.')[1]));
      const data = await apiClient.getUserLabBookings(decoded.userId);
      setBookings(data.bookings || []);
    } catch (error) {
      console.error('Failed to fetch bookings:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      BOOKED: 'bg-blue-100 text-blue-800',
      SAMPLE_COLLECTED: 'bg-yellow-100 text-yellow-800',
      PROCESSING: 'bg-orange-100 text-orange-800',
      REPORT_READY: 'bg-green-100 text-green-800',
      COMPLETED: 'bg-gray-100 text-gray-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  const getStatusText = (status) => {
    if (language === 'ta') {
      const statusTa = {
        BOOKED: 'பதிவு செய்யப்பட்டது',
        SAMPLE_COLLECTED: 'மாதிரி சேகரிக்கப்பட்டது',
        PROCESSING: 'செயலாக்கப்படுகிறது',
        REPORT_READY: 'அறிக்கை தயார்',
        COMPLETED: 'முடிந்தது'
      };
      return statusTa[status] || status;
    }
    return status.replace(/_/g, ' ');
  };

  if (loading) {
    return (
      <>
        <Ribbons />
        <div className="relative min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
          <LiquidEther />
          <div className="relative z-10 min-h-screen flex items-center justify-center">
            <motion.div
              className="text-center"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <div className="w-16 h-16 border-4 border-green-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-xl text-gray-700">{language === 'ta' ? 'ஏற்றுகிறது...' : 'Loading...'}</p>
            </motion.div>
          </div>
        </div>
      </>
    );
  }

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
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center">
                  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
                <h1 className="text-xl font-bold text-gray-800">
                  {language === 'ta' ? 'எனது பதிவுகள்' : 'My Lab Bookings'}
                </h1>
              </div>
            </div>
          </motion.div>

          <div className="flex-1 overflow-y-auto p-6">

            {bookings.length === 0 ? (
              <motion.div
                className="max-w-2xl mx-auto bg-white/90 backdrop-blur-md rounded-3xl p-12 shadow-2xl text-center"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
              >
                <div className="w-24 h-24 bg-gradient-to-br from-gray-200 to-gray-300 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-12 h-12 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
                <p className="text-gray-600 text-lg">
                  {language === 'ta' ? 'பதிவுகள் இல்லை' : 'No bookings found'}
                </p>
              </motion.div>
            ) : (
              <div className="max-w-4xl mx-auto space-y-4">
                {bookings.map((booking, index) => (
                  <motion.div
                    key={booking._id}
                    className="bg-white/90 backdrop-blur-md rounded-2xl p-6 shadow-xl border-2 border-green-100 relative overflow-hidden"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    whileHover={{ scale: 1.01, y: -3 }}
                  >
                    <div className="absolute top-0 right-0 w-40 h-40 bg-green-200/20 rounded-full blur-3xl"></div>
                    <div className="relative z-10">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-xl font-bold text-gray-800">
                            {language === 'ta' 
                              ? booking.testId?.testNameTranslations?.ta 
                              : booking.testId?.testName}
                          </h3>
                          <p className="text-gray-600 text-sm mt-1">
                            {language === 'ta' 
                              ? booking.labId?.labNameTranslations?.ta 
                              : booking.labId?.labName}
                          </p>
                        </div>
                        <span className={`px-4 py-2 rounded-full text-sm font-bold ${getStatusColor(booking.bookingStatus)}`}>
                          {getStatusText(booking.bookingStatus)}
                        </span>
                      </div>

                      <div className="grid grid-cols-2 gap-4 text-sm bg-green-50 rounded-xl p-4">
                        <div>
                          <span className="text-gray-600 font-semibold">{language === 'ta' ? 'தேதி:' : 'Date:'}</span>
                          <span className="ml-2 font-bold text-gray-800">
                            {new Date(booking.bookingDate).toLocaleDateString()}
                          </span>
                        </div>
                        <div>
                          <span className="text-gray-600 font-semibold">{language === 'ta' ? 'நேரம்:' : 'Time:'}</span>
                          <span className="ml-2 font-bold text-gray-800">{booking.timeSlot}</span>
                        </div>
                        <div>
                          <span className="text-gray-600 font-semibold">{language === 'ta' ? 'மாதிரி:' : 'Sample:'}</span>
                          <span className="ml-2 font-bold text-gray-800">
                            {booking.sampleType === 'home' 
                              ? (language === 'ta' ? 'வீட்டில்' : 'Home') 
                              : (language === 'ta' ? 'ஆய்வகம்' : 'Lab')}
                          </span>
                        </div>
                        <div>
                          <span className="text-gray-600 font-semibold">{language === 'ta' ? 'தொகை:' : 'Amount:'}</span>
                          <span className="ml-2 font-bold text-green-600">₹{booking.amount}</span>
                        </div>
                      </div>

                      {booking.reportUrl && (
                        <motion.div className="mt-4">
                          <motion.a
                            href={booking.reportUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-3 rounded-xl hover:from-green-600 hover:to-emerald-700 font-semibold shadow-lg"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                            {language === 'ta' ? 'அறிக்கையைப் பார்க்கவும்' : 'View Report'}
                          </motion.a>
                        </motion.div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
