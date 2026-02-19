import React from 'react';
import { motion } from 'framer-motion';

export const SymptomCheckerForm = ({ symptomStep, symptomData, setSymptomData, setSymptomStep, analyzeSymptoms, isLoading, language, setCurrentScreen }) => {
  if (symptomStep === 1) {
    return (
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          {language === 'tamil' ? 'அடிப்படை தகவல்' : 'Basic Information'}
        </h2>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            {language === 'tamil' ? 'வயது' : 'Age'}
          </label>
          <input
            type="number"
            value={symptomData.age}
            onChange={(e) => setSymptomData({ ...symptomData, age: e.target.value })}
            placeholder={language === 'tamil' ? 'உங்கள் வயதை உள்ளிடவும்' : 'Enter your age'}
            className="w-full px-4 py-3 border-2 border-green-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            {language === 'tamil' ? 'பாலினம்' : 'Gender'}
          </label>
          <div className="grid grid-cols-3 gap-3">
            {['Male', 'Female', 'Other'].map((g) => (
              <button
                key={g}
                onClick={() => setSymptomData({ ...symptomData, gender: g })}
                className={`px-4 py-3 rounded-xl font-semibold transition-all ${
                  symptomData.gender === g
                    ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg'
                    : 'bg-green-100 text-green-700 hover:bg-green-200'
                }`}
              >
                {language === 'tamil' ? (g === 'Male' ? 'ஆண்' : g === 'Female' ? 'பெண்' : 'மற்றவை') : g}
              </button>
            ))}
          </div>
        </div>
        <motion.button
          onClick={() => symptomData.age && symptomData.gender && setSymptomStep(2)}
          disabled={!symptomData.age || !symptomData.gender}
          className="w-full px-6 py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl hover:from-green-600 hover:to-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed font-semibold shadow-lg"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {language === 'tamil' ? 'அடுத்தது' : 'Next'}
        </motion.button>
      </div>
    );
  }

  if (symptomStep === 2) {
    return (
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          {language === 'tamil' ? 'அறிகுறிகள்' : 'Symptoms'}
        </h2>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            {language === 'tamil' ? 'உங்கள் அறிகுறிகளை விவரிக்கவும்' : 'Describe your symptoms'}
          </label>
          <textarea
            value={symptomData.symptoms}
            onChange={(e) => setSymptomData({ ...symptomData, symptoms: e.target.value })}
            placeholder={language === 'tamil' ? 'காய்ச்சல், தலைவலி, இருமல்...' : 'Fever, headache, cough...'}
            rows={5}
            className="w-full px-4 py-3 border-2 border-green-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
        </div>
        <div className="flex gap-3">
          <motion.button
            onClick={() => setSymptomStep(1)}
            className="flex-1 px-6 py-4 bg-gray-200 text-gray-700 rounded-xl hover:bg-gray-300 font-semibold"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {language === 'tamil' ? 'முந்தைய' : 'Previous'}
          </motion.button>
          <motion.button
            onClick={() => symptomData.symptoms && setSymptomStep(3)}
            disabled={!symptomData.symptoms}
            className="flex-1 px-6 py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl hover:from-green-600 hover:to-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed font-semibold shadow-lg"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {language === 'tamil' ? 'அடுத்தது' : 'Next'}
          </motion.button>
        </div>
      </div>
    );
  }

  if (symptomStep === 3) {
    return (
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          {language === 'tamil' ? 'கால அளவு மற்றும் தீவிரம்' : 'Duration & Severity'}
        </h2>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            {language === 'tamil' ? 'எவ்வளவு காலம்?' : 'How long?'}
          </label>
          <select
            value={symptomData.duration}
            onChange={(e) => setSymptomData({ ...symptomData, duration: e.target.value })}
            className="w-full px-4 py-3 border-2 border-green-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
          >
            <option value="">{language === 'tamil' ? 'தேர்ந்தெடுக்கவும்' : 'Select'}</option>
            <option value="1-2 days">{language === 'tamil' ? '1-2 நாட்கள்' : '1-2 days'}</option>
            <option value="3-7 days">{language === 'tamil' ? '3-7 நாட்கள்' : '3-7 days'}</option>
            <option value="1-2 weeks">{language === 'tamil' ? '1-2 வாரங்கள்' : '1-2 weeks'}</option>
            <option value="More than 2 weeks">{language === 'tamil' ? '2 வாரங்களுக்கு மேல்' : 'More than 2 weeks'}</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            {language === 'tamil' ? 'தீவிரம்' : 'Severity'}
          </label>
          <div className="grid grid-cols-3 gap-3">
            {['Mild', 'Moderate', 'Severe'].map((s) => (
              <button
                key={s}
                onClick={() => setSymptomData({ ...symptomData, severity: s })}
                className={`px-4 py-3 rounded-xl font-semibold transition-all ${
                  symptomData.severity === s
                    ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg'
                    : 'bg-green-100 text-green-700 hover:bg-green-200'
                }`}
              >
                {language === 'tamil' ? (s === 'Mild' ? 'லேசான' : s === 'Moderate' ? 'மிதமான' : 'கடுமையான') : s}
              </button>
            ))}
          </div>
        </div>
        <div className="flex gap-3">
          <motion.button
            onClick={() => setSymptomStep(2)}
            className="flex-1 px-6 py-4 bg-gray-200 text-gray-700 rounded-xl hover:bg-gray-300 font-semibold"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {language === 'tamil' ? 'முந்தைய' : 'Previous'}
          </motion.button>
          <motion.button
            onClick={() => symptomData.duration && symptomData.severity && setSymptomStep(4)}
            disabled={!symptomData.duration || !symptomData.severity}
            className="flex-1 px-6 py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl hover:from-green-600 hover:to-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed font-semibold shadow-lg"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {language === 'tamil' ? 'அடுத்தது' : 'Next'}
          </motion.button>
        </div>
      </div>
    );
  }

  if (symptomStep === 4) {
    return (
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          {language === 'tamil' ? 'கூடுதல் தகவல்' : 'Additional Information'}
        </h2>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            {language === 'tamil' ? 'வேறு ஏதேனும் தகவல்?' : 'Any other information?'}
          </label>
          <textarea
            value={symptomData.additionalInfo}
            onChange={(e) => setSymptomData({ ...symptomData, additionalInfo: e.target.value })}
            placeholder={language === 'tamil' ? 'மருந்துகள், ஒவ்வாமை, மருத்துவ வரலாறு...' : 'Medications, allergies, medical history...'}
            rows={5}
            className="w-full px-4 py-3 border-2 border-green-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
        </div>
        <div className="flex gap-3">
          <motion.button
            onClick={() => setSymptomStep(3)}
            className="flex-1 px-6 py-4 bg-gray-200 text-gray-700 rounded-xl hover:bg-gray-300 font-semibold"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {language === 'tamil' ? 'முந்தைய' : 'Previous'}
          </motion.button>
          <motion.button
            onClick={analyzeSymptoms}
            disabled={isLoading}
            className="flex-1 px-6 py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl hover:from-green-600 hover:to-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed font-semibold shadow-lg"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {isLoading ? (language === 'tamil' ? 'பகுப்பாய்வு செய்கிறது...' : 'Analyzing...') : (language === 'tamil' ? 'பகுப்பாய்வு செய்' : 'Analyze')}
          </motion.button>
        </div>
      </div>
    );
  }

  if (symptomStep === 5) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center">
            <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-800">
            {language === 'tamil' ? 'பகுப்பாய்வு முடிவுகள்' : 'Analysis Results'}
          </h2>
        </div>
        <div className="bg-green-50 border-2 border-green-200 rounded-xl p-6">
          <p className="text-gray-800 leading-relaxed">{symptomData.analysis}</p>
        </div>
        <div className="bg-yellow-50 border-2 border-yellow-200 rounded-xl p-4">
          <p className="text-sm text-yellow-800">
            <strong>{language === 'tamil' ? 'குறிப்பு:' : 'Note:'}</strong> {language === 'tamil' ? 'இது மருத்துவ ஆலோசனை அல்ல. தீவிர அறிகுறிகளுக்கு மருத்துவரை அணுகவும்.' : 'This is not medical advice. Please consult a doctor for serious symptoms.'}
          </p>
        </div>
        <motion.button
          onClick={() => {
            setSymptomStep(1);
            setSymptomData({ age: '', gender: '', symptoms: '', duration: '', severity: '', additionalInfo: '' });
          }}
          className="w-full px-6 py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl hover:from-green-600 hover:to-emerald-700 font-semibold shadow-lg"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {language === 'tamil' ? 'புதிய பகுப்பாய்வு' : 'New Analysis'}
        </motion.button>
      </div>
    );
  }

  return null;
};
