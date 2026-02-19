'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import apiClient from '@/lib/api';
import { useLanguage } from '@/hooks/useLanguage';
import LiquidEther from '@/components/ui/LiquidEther';
import Ribbons from '@/components/Ribbons';

export default function DoctorPanelPage() {
  const router = useRouter();
  const { language } = useLanguage();
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [requests, setRequests] = useState([]);
  const [selectedRequest, setSelectedRequest] = useState(null);

  useEffect(() => {
    const adminStatus = localStorage.getItem('isAdmin');
    if (adminStatus === 'true') {
      setIsAdmin(true);
      fetchRequests();
    } else {
      router.push('/admin/login');
    }
    setLoading(false);
  }, [router]);

  const fetchRequests = async () => {
    try {
      // For demo: fetch all pending requests (no doctorId filter)
      const response = await fetch('http://localhost:5000/api/doctor/requests', {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
      });
      const data = await response.json();
      setRequests(data.requests || []);
    } catch (error) {
      console.error('Failed to fetch requests:', error);
    }
  };

  const handleAccept = async (requestId) => {
    try {
      const response = await apiClient.updateConsultationRequest(requestId, 'accepted');
      alert(language === 'ta' ? 'ஏற்றுக்கொள்ளப்பட்டது! Google Meet இல் திருப்பிவிடப்படுகிறது...' : 'Accepted! Redirecting to Google Meet...');
      
      // Redirect doctor to Google Meet
      if (response.request?.meetingLink) {
        window.open(response.request.meetingLink, '_blank');
      }
      
      fetchRequests();
    } catch (error) {
      alert(language === 'ta' ? 'தோல்வி' : 'Failed');
    }
  };

  const handleReject = async (requestId) => {
    const reason = prompt(language === 'ta' ? 'காரணம்?' : 'Reason?');
    if (!reason) return;
    
    try {
      await apiClient.updateConsultationRequest(requestId, 'rejected', reason);
      alert(language === 'ta' ? 'நிராகரிக்கப்பட்டது' : 'Rejected');
      fetchRequests();
    } catch (error) {
      alert(language === 'ta' ? 'தோல்வி' : 'Failed');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('isAdmin');
    localStorage.removeItem('adminUser');
    router.push('/admin/login');
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center"><div className="w-16 h-16 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div></div>;
  if (!isAdmin) return null;

  return (
    <>
      <Ribbons />
      <div className="relative min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
        <LiquidEther />
        <div className="relative z-10 min-h-screen flex flex-col">
          <motion.div className="bg-white/90 backdrop-blur-md shadow-lg border-b border-green-200/50" initial={{ y: -100, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
            <div className="px-6 py-4 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => window.location.href = '/'}
                  className="p-2 hover:bg-green-100 rounded-full transition-colors"
                  title="Back to Landing Page"
                >
                  <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                </button>
                <h1 className="text-xl font-bold text-gray-800">
                  {language === 'ta' ? 'மருத்துவர் பேனல்' : 'Doctor Panel'}
                </h1>
              </div>
              <button onClick={handleLogout} className="px-4 py-2 bg-red-500 text-white rounded-lg text-sm hover:bg-red-600">
                {language === 'ta' ? 'வெளியேறு' : 'Logout'}
              </button>
            </div>
          </motion.div>

          <div className="flex-1 overflow-y-auto p-6">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-xl font-bold mb-4">{language === 'ta' ? 'நிலுவையில் உள்ள கோரிக்கைகள்' : 'Pending Requests'}</h2>
              <div className="space-y-4">
                {requests.map((request) => (
                  <motion.div key={request._id} className="bg-white/90 backdrop-blur-md rounded-2xl p-6 shadow-xl" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    <div className="mb-3">
                      <h3 className="font-bold text-gray-800 text-lg">{request.patientId?.name || 'Patient'}</h3>
                      <p className="text-xs text-gray-500">Mobile: {request.patientId?.mobile || 'N/A'}</p>
                    </div>
                    <div className="space-y-1 mb-3">
                      <p className="text-sm text-gray-600"><strong>Doctor:</strong> {request.doctorId?.name || 'N/A'}</p>
                      <p className="text-sm text-gray-600"><strong>Hospital:</strong> {request.hospitalId?.name || 'N/A'}</p>
                      <p className="text-sm text-gray-600"><strong>Date:</strong> {new Date(request.scheduledDate).toLocaleDateString()} - {request.timeSlot}</p>
                      <p className="text-sm text-gray-600"><strong>Request ID:</strong> {request.requestId}</p>
                    </div>
                    {request.symptoms && <p className="text-sm text-gray-500 bg-gray-50 p-2 rounded mb-3"><strong>Symptoms:</strong> {request.symptoms}</p>}
                    <div className="flex gap-2 mt-4">
                      <button onClick={() => handleAccept(request.requestId)} className="px-4 py-2 bg-green-500 text-white rounded-lg text-sm">
                        {language === 'ta' ? 'ஏற்று' : 'Accept'}
                      </button>
                      <button onClick={() => handleReject(request.requestId)} className="px-4 py-2 bg-red-500 text-white rounded-lg text-sm">
                        {language === 'ta' ? 'நிராகரி' : 'Reject'}
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
