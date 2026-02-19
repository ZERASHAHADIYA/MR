'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import LiquidEther from '@/components/ui/LiquidEther';
import Ribbons from '@/components/Ribbons';
import { SymptomCheckerForm } from '@/components/SymptomChecker';

const BubbleMenu = ({ onSelect, language }) => {
  const options = [
    {
      id: 'symptom-check',
      icon: (
        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
        </svg>
      ),
      title: language === 'tamil' ? 'அறிகுறி சரிபார்ப்பு' : 'Symptom Check',
      subtitle: language === 'tamil' ? 'உங்கள் அறிகுறிகளை பகுப்பாய்வு செய்யுங்கள்' : 'Analyze your symptoms',
      color: 'from-green-500 to-emerald-600'
    },
    {
      id: 'health-chat',
      icon: (
        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      ),
      title: language === 'tamil' ? 'சுகாதார அரட்டை' : 'Health Chat',
      subtitle: language === 'tamil' ? 'AI உடன் பேசுங்கள்' : 'Chat with AI',
      color: 'from-green-500 to-emerald-600'
    },
    {
      id: 'emergency',
      icon: (
        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
        </svg>
      ),
      title: language === 'tamil' ? 'அவசரநிலை' : 'Emergency',
      subtitle: language === 'tamil' ? 'உடனடி உதவி' : 'Immediate help',
      color: 'from-green-500 to-emerald-600'
    }
  ];

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <motion.div
        className="max-w-4xl w-full"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
      >
        <div className="text-center mb-12">
          <motion.h1
            className="text-4xl md:text-6xl font-bold text-gray-800 mb-4"
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {language === 'tamil' ? 'மருத்துவன் AI' : 'Maruthuvan AI'}
          </motion.h1>
          <motion.p
            className="text-xl text-gray-600 mb-8"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {language === 'tamil' 
              ? 'உங்கள் சுகாதார தேவைகளுக்கு AI உதவி' 
              : 'AI-powered healthcare assistance'}
          </motion.p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {options.map((option, index) => (
            <motion.div
              key={option.id}
              className="relative group cursor-pointer"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
              whileHover={{ scale: 1.05, y: -10 }}
              onClick={() => onSelect(option.id)}
            >
              <div className={`bg-gradient-to-br ${option.color} p-8 rounded-3xl shadow-2xl text-white relative overflow-hidden`}>
                <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative z-10">
                  <div className="mb-4">{option.icon}</div>
                  <h3 className="text-2xl font-bold mb-2">{option.title}</h3>
                  <p className="text-white/80">{option.subtitle}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

const AISymptomChecker = () => {
  const [currentScreen, setCurrentScreen] = useState('menu');
  const [language, setLanguage] = useState('english');
  const [chatMessages, setChatMessages] = useState([]);
  const [chatInput, setChatInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [symptomStep, setSymptomStep] = useState(1);
  const [symptomData, setSymptomData] = useState({
    age: '',
    gender: '',
    symptoms: '',
    duration: '',
    severity: '',
    additionalInfo: ''
  });

  useEffect(() => {
    if (currentScreen === 'health-chat' && chatMessages.length === 0) {
      setChatMessages([{
        role: 'ai',
        text: language === 'tamil' 
          ? 'வணக்கம்! நான் மருத்துவன் AI. உங்கள் சுகாதார கேள்விகளுக்கு உதவ இங்கே இருக்கிறேன்.'
          : 'Hello! I\'m Maruthuvan AI. I\'m here to help with your health questions.',
        timestamp: new Date()
      }]);
    }
  }, [currentScreen, language]);

  const analyzeSymptoms = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/llm', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: `Age: ${symptomData.age}, Gender: ${symptomData.gender}, Symptoms: ${symptomData.symptoms}, Duration: ${symptomData.duration}, Severity: ${symptomData.severity}`,
          language: language,
          type: 'symptom-analysis',
          context: 'symptom-check',
          symptomData: symptomData
        })
      });
      if (response.ok) {
        const data = await response.json();
        setSymptomStep(5);
        setSymptomData(prev => ({ ...prev, analysis: data.response }));
      } else {
        throw new Error('API failed');
      }
    } catch (error) {
      setSymptomStep(5);
      setSymptomData(prev => ({ ...prev, analysis: language === 'tamil' ? 'உங்கள் அறிகுறிகளின் அடிப்படையில், மருத்துவரை அணுகுவது நல்லது. இது ஒரு டெமோ பகுப்பாய்வு. முழு AI சேவை விரைவில்.' : 'Based on your symptoms, it is recommended to consult a doctor. This is a demo analysis. Full AI service coming soon.' }));
    } finally {
      setIsLoading(false);
    }
  };

  const sendChatMessage = async () => {
    if (!chatInput.trim()) return;

    const userMessage = {
      role: 'user',
      text: chatInput,
      timestamp: new Date()
    };

    setChatMessages(prev => [...prev, userMessage]);
    setChatInput('');
    setIsLoading(true);

    try {
      // API call to backend LLM endpoint
      const response = await fetch('http://localhost:5000/api/ai/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          message: chatInput,
          language: language === 'tamil' ? 'ta' : 'en',
          mobile: JSON.parse(localStorage.getItem('user') || '{}').mobile
        })
      });

      if (response.ok) {
        const data = await response.json();
        const aiResponse = {
          role: 'ai',
          text: data.response || (language === 'tamil' 
            ? 'மன்னிக்கவும், தற்போது பதில் அளிக்க முடியவில்லை.'
            : 'Sorry, I cannot provide a response right now.'),
          timestamp: new Date()
        };
        setChatMessages(prev => [...prev, aiResponse]);
      } else {
        const errorData = await response.json();
        console.error('API Error Response:', errorData);
        const aiResponse = {
          role: 'ai',
          text: errorData.response || errorData.message || (language === 'tamil'
            ? 'மன்னிக்கவும், AI சேவை தற்போது கிடைக்கவில்லை. மருத்துவரை அணுகவும்.'
            : 'Sorry, AI service is currently unavailable. Please consult a doctor.'),
          timestamp: new Date()
        };
        setChatMessages(prev => [...prev, aiResponse]);
      }
    } catch (error) {
      console.error('AI Chat Error:', error);
      const aiResponse = {
        role: 'ai',
        text: language === 'tamil'
          ? `பிழை: ${error.message}. மருத்துவரை அணுகவும்.`
          : `Error: ${error.message}. Please consult a doctor.`,
        timestamp: new Date()
      };
      setChatMessages(prev => [...prev, aiResponse]);
    } finally {
      setIsLoading(false);
    }
  };

  const pageVariants = {
    initial: { 
      clipPath: 'circle(0% at 50% 50%)',
      opacity: 0 
    },
    animate: { 
      clipPath: 'circle(150% at 50% 50%)',
      opacity: 1,
      transition: { 
        duration: 0.8,
        ease: "easeInOut"
      }
    },
    exit: { 
      clipPath: 'circle(0% at 50% 50%)',
      opacity: 0,
      transition: { 
        duration: 0.6,
        ease: "easeInOut"
      }
    }
  };

  if (currentScreen === 'menu') {
    return (
      <>
        <Ribbons />
        <div className="relative min-h-screen bg-gradient-to-br from-green-50 to-blue-50 overflow-hidden">
          <LiquidEther />
          <motion.div
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="relative z-10"
          >
            <div className="absolute top-6 left-6">
              <button
                onClick={() => setLanguage(language === 'english' ? 'tamil' : 'english')}
                className="px-4 py-2 bg-white/80 backdrop-blur-md rounded-full text-sm font-semibold text-gray-700 hover:bg-white transition-colors shadow-lg"
              >
                {language === 'english' ? 'தமிழ்' : 'English'}
              </button>
            </div>
            <BubbleMenu onSelect={setCurrentScreen} language={language} />
          </motion.div>
        </div>
      </>
    );
  }

  if (currentScreen === 'symptom-check') {
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
                  <motion.button
                    onClick={() => {
                      setCurrentScreen('menu');
                      setSymptomStep(1);
                      setSymptomData({ age: '', gender: '', symptoms: '', duration: '', severity: '', additionalInfo: '' });
                    }}
                    className="p-2 hover:bg-green-100 rounded-full transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </motion.button>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center">
                      <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                      </svg>
                    </div>
                    <div>
                      <h1 className="text-xl font-bold text-gray-800">
                        {language === 'tamil' ? 'அறிகுறி பகுப்பாய்வு' : 'Symptom Analysis'}
                      </h1>
                      <p className="text-sm text-gray-600">
                        {language === 'tamil' ? `படி ${symptomStep} / 4` : `Step ${symptomStep} of 4`}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setLanguage(language === 'english' ? 'tamil' : 'english')}
                    className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-semibold hover:bg-green-200 transition-colors"
                  >
                    {language === 'english' ? 'தமிழ்' : 'English'}
                  </button>
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
                <SymptomCheckerForm 
                  symptomStep={symptomStep}
                  symptomData={symptomData}
                  setSymptomData={setSymptomData}
                  setSymptomStep={setSymptomStep}
                  analyzeSymptoms={analyzeSymptoms}
                  isLoading={isLoading}
                  language={language}
                  setCurrentScreen={setCurrentScreen}
                />
              </motion.div>
            </div>
          </div>
        </div>
      </>
    );
  }

  if (currentScreen === 'health-chat') {
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
                  <motion.button
                    onClick={() => setCurrentScreen('menu')}
                    className="p-2 hover:bg-green-100 rounded-full transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </motion.button>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center">
                      <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                    </div>
                    <div>
                      <h1 className="text-xl font-bold text-gray-800">
                        {language === 'tamil' ? 'மருத்துவன் AI சாட்' : 'Maruthuvan AI Chat'}
                      </h1>
                      <p className="text-sm text-gray-600 flex items-center gap-2">
                        <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                        {language === 'tamil' ? 'பொதுவான சுகாதார கேள்விகள்' : 'General health questions'}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setLanguage(language === 'english' ? 'tamil' : 'english')}
                    className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-semibold hover:bg-green-200 transition-colors"
                  >
                    {language === 'english' ? 'தமிழ்' : 'English'}
                  </button>
                </div>
              </div>
            </motion.div>

            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              <AnimatePresence>
                {chatMessages.map((message, idx) => (
                  <motion.div 
                    key={idx} 
                    className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    initial={{ opacity: 0, y: 20, scale: 0.8 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.4, delay: idx * 0.1 }}
                  >
                    <div className={`max-w-xs lg:max-w-md px-6 py-4 rounded-2xl shadow-lg ${
                      message.role === 'user'
                        ? 'bg-gradient-to-br from-green-500 to-green-600 text-white rounded-br-md'
                        : 'bg-white shadow-xl border border-green-100 rounded-bl-md'
                    }`}>
                      {message.role === 'ai' && (
                        <div className="flex items-center gap-2 mb-2">
                          <div className="w-6 h-6 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center">
                            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                            </svg>
                          </div>
                          <span className="text-xs font-semibold text-green-600">Maruthuvan AI</span>
                        </div>
                      )}
                      <p className={`text-sm leading-relaxed ${
                        message.role === 'user' ? 'text-white' : 'text-gray-800'
                      }`}>
                        {message.text}
                      </p>
                      <p className={`text-xs mt-2 ${
                        message.role === 'user' ? 'text-green-100' : 'text-gray-500'
                      }`}>
                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
              
              {isLoading && (
                <motion.div 
                  className="flex justify-start"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                >
                  <div className="bg-white shadow-xl border border-green-100 rounded-2xl rounded-bl-md px-6 py-4">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-6 h-6 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center">
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                      </div>
                      <span className="text-xs font-semibold text-green-600">Maruthuvan AI</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      <span className="text-sm text-gray-600 ml-2">
                        {language === 'tamil' ? 'சிந்திக்கிறேன்...' : 'Thinking...'}
                      </span>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>

            <motion.div 
              className="bg-white/90 backdrop-blur-md border-t border-green-200/50 p-6"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="space-y-4">
                <div className="flex gap-3">
                  <input
                    type="text"
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && sendChatMessage()}
                    placeholder={language === 'tamil' 
                      ? 'உங்கள் கேள்வியை இங்கே டைப் செய்யவும்...'
                      : 'Type your health question here...'}
                    className="flex-1 px-6 py-4 border-2 border-green-200 rounded-full focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white shadow-sm transition-all"
                    disabled={isLoading}
                  />
                  <motion.button
                    onClick={sendChatMessage}
                    disabled={!chatInput.trim() || isLoading}
                    className="px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-full hover:from-green-600 hover:to-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 shadow-lg"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span className="font-semibold">{language === 'tamil' ? 'அனுப்பு' : 'Send'}</span>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                  </motion.button>
                </div>
                
                <div className="space-y-2">
                  <p className="text-sm font-semibold text-gray-700">
                    {language === 'tamil' ? 'பொதுவான கேள்விகள்:' : 'Quick questions:'}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {[
                      { en: 'What is diabetes?', ta: 'நீரிழிவு நோய் என்ன?' },
                      { en: 'How to prevent fever?', ta: 'காய்ச்சலை எப்படி தடுக்கலாம்?' },
                      { en: 'Healthy diet tips', ta: 'ஆரோக்கியமான உணவு குறிப்புகள்' }
                    ].map((suggestion, idx) => (
                      <motion.button
                        key={idx}
                        onClick={() => setChatInput(language === 'tamil' ? suggestion.ta : suggestion.en)}
                        className="px-4 py-2 text-sm bg-green-100 text-green-700 rounded-full hover:bg-green-200 transition-colors border border-green-200"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {language === 'tamil' ? suggestion.ta : suggestion.en}
                      </motion.button>
                    ))}
                  </div>
                </div>
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
        <div className="relative z-10 min-h-screen flex items-center justify-center">
          <motion.div
            className="text-center bg-white/80 backdrop-blur-md rounded-3xl p-12 shadow-2xl"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center justify-center gap-4 mb-6">
              <svg className="w-12 h-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
              <h2 className="text-3xl font-bold text-gray-800">
                {language === 'tamil' ? 'அவசரநிலை' : 'Emergency'}
              </h2>
            </div>
            <p className="text-gray-600 mb-8 text-lg">
              {language === 'tamil' ? 'விரைவில் வரும்...' : 'Coming soon...'}
            </p>
            <motion.button
              onClick={() => setCurrentScreen('menu')}
              className="px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-full hover:from-green-600 hover:to-emerald-700 transition-all shadow-lg font-semibold"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {language === 'tamil' ? 'திரும்பு' : 'Back to Menu'}
            </motion.button>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default function AISymptomCheckerPage() {
  return <AISymptomChecker />;
}