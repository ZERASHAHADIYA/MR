'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import LiquidEther from '@/components/ui/LiquidEther';
import Ribbons from '@/components/Ribbons';

export default function MyRequestsPage() {
  const router = useRouter();
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMyRequests();
    const interval = setInterval(fetchMyRequests, 10000);
    return () => clearInterval(interval);
  }, []);

  const fetchMyRequests = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/consult/my-requests', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await response.json();
      setRequests(data.requests || []);
      setLoading(false);
    } catch (error) {
      console.error('Failed to fetch requests:', error);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <>
      <Ribbons />
      <div className="relative min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
        <LiquidEther />
        <div className="relative z-10 min-h-screen flex flex-col">
          <motion.div className="bg-white/90 backdrop-blur-md shadow-lg border-b border-green-200/50" initial={{ y: -100, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
            <div className="px-6 py-4 flex items-center gap-3">
              <motion.button onClick={() => router.push('/dashboard')} className="p-2 hover:bg-green-100 rounded-full" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </motion.button>
              <h1 className="text-xl font-bold text-gray-800">My Consultation Requests</h1>
            </div>
          </motion.div>

          <div className="flex-1 overflow-y-auto p-6">
            <div className="max-w-4xl mx-auto space-y-4">
              {requests.map((request) => (
                <motion.div key={request._id} className="bg-white/90 backdrop-blur-md rounded-2xl p-6 shadow-xl" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-lg font-bold text-gray-800">{request.doctorId?.name}</h3>
                      <p className="text-sm text-gray-600">{request.doctorId?.specialization}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${request.status === 'accepted' ? 'bg-green-100 text-green-800' : request.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'}`}>
                      {request.status}
                    </span>
                  </div>

                  <div className="space-y-2 mb-4 text-sm text-gray-600">
                    <p>🏥 {request.hospitalId?.name}</p>
                    <p>📅 {new Date(request.scheduledDate).toLocaleDateString()} - {request.timeSlot}</p>
                    <p>🆔 {request.requestId}</p>
                  </div>

                  {request.status === 'accepted' && request.meetingLink && (
                    <motion.button onClick={() => window.open(request.meetingLink, '_blank')} className="w-full px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl font-semibold flex items-center justify-center gap-3" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                      Join Video Call
                    </motion.button>
                  )}

                  {request.status === 'pending' && (
                    <div className="bg-yellow-50 border-2 border-yellow-200 rounded-lg p-3 text-sm text-yellow-800">
                      ⏳ Waiting for doctor response...
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
