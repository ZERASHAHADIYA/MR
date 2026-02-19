'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import apiClient from '@/lib/api';
import { useLanguage } from '@/hooks/useLanguage';
import LiquidEther from '@/components/ui/LiquidEther';
import Ribbons from '@/components/Ribbons';
import QRCode from 'react-qr-code';

export default function MyRequestsPage() {
  const { language } = useLanguage();
  const [requests, setRequests] = useState([]);
  const [qrCode, setQrCode] = useState('');
  const [showQR, setShowQR] = useState(false);

  useEffect(() => {
    fetchRequests();
    fetchQRCode();
  }, []);

  const fetchRequests = async () => {
    try {
      const data = await apiClient.getMyConsultationRequests();
      setRequests(data.requests || []);
    } catch (error) {
      console.error('Failed to fetch requests:', error);
    }
  };

  const fetchQRCode = async () => {
    try {
      const data = await apiClient.getPatientQRCode();
      setQrCode(data.qrCode);
    } catch (error) {
      console.error('Failed to fetch QR code:', error);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'accepted': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status) => {
    const statusMap = {
      pending: { en: 'Pending', ta: 'நிலுவையில்' },
      accepted: { en: 'Accepted', ta: 'ஏற்றுக்கொள்ளப்பட்டது' },
      rejected: { en: 'Rejected', ta: 'நிராகரிக்கப்பட்டது' },
      completed: { en: 'Completed', ta: 'முடிந்தது' }
    };
    return statusMap[status]?.[language] || status;
  };

  return (
    <>
      <Ribbons />
      <div className="relative min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
        <LiquidEther />
        <div className="relative z-10 min-h-screen flex flex-col">
          <motion.div className="bg-white/90 backdrop-blur-md shadow-lg border-b border-green-200/50" initial={{ y: -100, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
            <div className="px-6 py-4 flex justify-between items-center">
              <h1 className="text-xl font-bold text-gray-800">
                {language === 'ta' ? 'எனது கோரிக்கைகள்' : 'My Requests'}
              </h1>
              <button onClick={() => setShowQR(!showQR)} className="px-4 py-2 bg-green-500 text-white rounded-lg">
                {language === 'ta' ? 'QR காட்டு' : 'Show QR'}
              </button>
            </div>
          </motion.div>

          <div className="flex-1 overflow-y-auto p-6">
            {showQR && qrCode && (
              <motion.div className="max-w-md mx-auto mb-6 bg-white/90 backdrop-blur-md rounded-3xl p-8 shadow-2xl text-center" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}>
                <h2 className="text-xl font-bold mb-4">{language === 'ta' ? 'உங்கள் QR குறியீடு' : 'Your QR Code'}</h2>
                <div className="bg-white p-4 rounded-xl inline-block">
                  <QRCode value={qrCode} size={200} />
                </div>
                <p className="text-sm text-gray-600 mt-4">{language === 'ta' ? 'மருத்துவரிடம் இதை காட்டவும்' : 'Show this to your doctor'}</p>
              </motion.div>
            )}

            <div className="max-w-4xl mx-auto grid gap-4">
              {requests.length === 0 ? (
                <div className="text-center py-12 text-gray-500">
                  {language === 'ta' ? 'கோரிக்கைகள் இல்லை' : 'No requests found'}
                </div>
              ) : (
                requests.map((request) => (
                  <motion.div key={request._id} className="bg-white/90 backdrop-blur-md rounded-2xl p-6 shadow-xl" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-lg font-bold text-gray-800">{request.doctorId?.name}</h3>
                        <p className="text-sm text-gray-600">{language === 'ta' ? request.doctorId?.specializationTranslations?.ta : request.doctorId?.specialization}</p>
                        <p className="text-xs text-gray-500 mt-1">{request.hospitalId?.name}</p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(request.status)}`}>
                        {getStatusText(request.status)}
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-gray-500">{language === 'ta' ? 'தேதி' : 'Date'}</p>
                        <p className="font-semibold">{new Date(request.scheduledDate).toLocaleDateString()}</p>
                      </div>
                      <div>
                        <p className="text-gray-500">{language === 'ta' ? 'நேரம்' : 'Time'}</p>
                        <p className="font-semibold">{request.timeSlot}</p>
                      </div>
                    </div>
                    {request.status === 'accepted' && request.meetingLink && (
                      <a href={request.meetingLink} target="_blank" rel="noopener noreferrer" className="mt-4 block w-full px-4 py-2 bg-green-500 text-white text-center rounded-lg hover:bg-green-600">
                        {language === 'ta' ? 'சந்திப்பில் சேர' : 'Join Meeting'}
                      </a>
                    )}
                    {request.status === 'rejected' && request.rejectionReason && (
                      <p className="mt-4 text-sm text-red-600">{language === 'ta' ? 'காரணம்' : 'Reason'}: {request.rejectionReason}</p>
                    )}
                  </motion.div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
