'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import LiquidEther from '@/components/ui/LiquidEther';
import Ribbons from '@/components/Ribbons';

const UngalNalamPage = () => {
  const [selectedLanguage, setSelectedLanguage] = useState(null);
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (selectedLanguage) {
      fetchVideos();
    }
  }, [selectedLanguage]);

  const fetchVideos = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5000/api/health/videos?language=${selectedLanguage === 'tamil' ? 'ta' : 'en'}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();
      setVideos(data.videos || []);
    } catch (error) {
      console.error('Error fetching videos:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!selectedLanguage) {
    return (
      <>
        <Ribbons />
        <div className="relative min-h-screen bg-gradient-to-br from-green-50 to-blue-50 overflow-hidden">
          <LiquidEther />
          <div className="relative z-10 min-h-screen flex items-center justify-center p-6">
            <motion.div
              className="max-w-2xl w-full"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
            >
              <div className="text-center mb-12">
                <motion.div
                  className="w-24 h-24 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl"
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </motion.div>
                <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">Ungal Nalam</h1>
                <p className="text-xl text-gray-600 mb-2">உங்கள் நலம்</p>
                <p className="text-gray-500">Choose your preferred language for health videos</p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <motion.button
                  onClick={() => setSelectedLanguage('tamil')}
                  className="bg-white/90 backdrop-blur-md rounded-3xl p-8 shadow-2xl border-2 border-green-100 hover:border-green-400 transition-all group"
                  whileHover={{ scale: 1.05, y: -10 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className="text-6xl mb-4">T</div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">தமிழ்</h2>
                  <p className="text-gray-600">Tamil Health Videos</p>
                  <div className="mt-4 flex items-center justify-center gap-2 text-green-600 group-hover:text-green-700">
                    <span className="font-semibold">Watch Now</span>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </motion.button>

                <motion.button
                  onClick={() => setSelectedLanguage('english')}
                  className="bg-white/90 backdrop-blur-md rounded-3xl p-8 shadow-2xl border-2 border-green-100 hover:border-green-400 transition-all group"
                  whileHover={{ scale: 1.05, y: -10 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className="text-6xl mb-4">E</div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">English</h2>
                  <p className="text-gray-600">English Health Videos</p>
                  <div className="mt-4 flex items-center justify-center gap-2 text-green-600 group-hover:text-green-700">
                    <span className="font-semibold">Watch Now</span>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </motion.button>
              </div>
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
        <div className="relative z-10 min-h-screen">
          <motion.div
            className="bg-white/90 backdrop-blur-md shadow-lg border-b border-green-200/50"
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <div className="px-6 py-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <motion.button
                  onClick={() => setSelectedLanguage(null)}
                  className="p-2 hover:bg-green-100 rounded-full transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </motion.button>
                <div>
                  <h1 className="text-xl font-bold text-gray-800">
                    {selectedLanguage === 'tamil' ? 'தமிழ் சுகாதார வீடியோக்கள்' : 'Health Videos'}
                  </h1>
                  <p className="text-sm text-gray-600">
                    {selectedLanguage === 'tamil' ? 'உங்கள் நலத்திற்கான குறிப்புகள்' : 'Tips for your wellness'}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setSelectedLanguage(selectedLanguage === 'tamil' ? 'english' : 'tamil')}
                className="px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-semibold hover:bg-green-200 transition-colors"
              >
                {selectedLanguage === 'tamil' ? 'English' : 'தமிழ்'}
              </button>
            </div>
          </motion.div>

          <div className="p-6">
            {loading ? (
              <div className="text-center py-12">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
                <p className="mt-4 text-gray-600">Loading videos...</p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {videos.map((video, index) => (
                  <motion.a
                    key={video.videoId}
                    href={video.youtubeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-white/90 backdrop-blur-md rounded-2xl overflow-hidden shadow-lg border-2 border-green-100 hover:border-green-400 hover:shadow-2xl transition-all cursor-pointer group"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    whileHover={{ scale: 1.03, y: -5 }}
                  >
                    <div className="relative">
                      <div className="aspect-video bg-gradient-to-br from-green-200 to-blue-200 flex items-center justify-center overflow-hidden">
                        {video.thumbnailUrl ? (
                          <img src={video.thumbnailUrl} alt={video.displayTitle} className="w-full h-full object-cover" />
                        ) : (
                          <svg className="w-16 h-16 text-white" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z" />
                          </svg>
                        )}
                      </div>
                      <div className="absolute top-2 right-2 bg-black/70 text-white px-2 py-1 rounded text-xs font-semibold">
                        {video.viewCount || 0} views
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="font-bold text-gray-800 mb-2 line-clamp-2 group-hover:text-green-600 transition-colors">
                        {video.displayTitle || video.title}
                      </h3>
                      <p className="text-sm text-gray-600">{video.displayCategory || video.category}</p>
                    </div>
                  </motion.a>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default UngalNalamPage;
