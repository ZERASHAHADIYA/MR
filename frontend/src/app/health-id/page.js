"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { QRCodeCanvas } from "qrcode.react";
import LiquidEther from "@/components/ui/LiquidEther";
import Ribbons from "@/components/Ribbons";

export default function HealthIDPage() {
  const [healthData, setHealthData] = useState(null);
  const [language, setLanguage] = useState('english');
  const qrRef = useRef(null);
  const reportRef = useRef(null);

  useEffect(() => {
    // 🔌 BACKEND: Fetch user health records
    // GET /api/health-records (from Aadhar-based auth)
    setHealthData({
      id: "MARU-123456",
      aadhar: "XXXX-XXXX-1234",
      name: "Suryaprakash",
      age: 28,
      gender: "Male",
      bloodGroup: "B+",
      phone: "+91 98765 43210",
      address: "123, Main Street, Madurai, Tamil Nadu - 625001",
      dob: "15-08-1996",
      fatherName: "Kumar Prakash",
      allergies: ["Peanuts", "Dust"],
      consultations: [
        { date: "2025-01-15", doctor: "Dr. Rajesh Kumar", hospital: "PHC Madurai", diagnosis: "Fever, Cold" },
        { date: "2024-12-20", doctor: "Dr. Priya Sharma", hospital: "GH Chennai", diagnosis: "Regular Checkup" },
      ],
      prescriptions: [
        { date: "2025-01-15", medicine: "Paracetamol 500mg", dosage: "1-0-1 for 3 days" },
      ],
    });
  }, []);

  const text = {
    english: {
      title: "My Health ID",
      subtitle: "Digital Health Record",
      patientId: "Patient ID",
      aadhar: "Aadhar",
      name: "Name",
      age: "Age",
      gender: "Gender",
      blood: "Blood Group",
      phone: "Phone",
      address: "Address",
      dob: "Date of Birth",
      father: "Father's Name",
      allergies: "Allergies",
      consultations: "Consultation History",
      prescriptions: "Prescriptions",
      share: "Share QR Code",
      download: "Download Report",
    },
    tamil: {
      title: "என் சுகாதார அடையாள அட்டை",
      subtitle: "டிஜிட்டல் சுகாதார பதிவு",
      patientId: "நோயாளி எண்",
      aadhar: "ஆதார்",
      name: "பெயர்",
      age: "வயது",
      gender: "பாலினம்",
      blood: "இரத்த வகை",
      phone: "தொலைபேசி",
      address: "முகவரி",
      dob: "பிறந்த தேதி",
      father: "தந்தையின் பெயர்",
      allergies: "ஒவ்வாமை",
      consultations: "ஆலோசனை வரலாறு",
      prescriptions: "மருந்துகள்",
      share: "QR குறியீட்டைப் பகிரவும்",
      download: "அறிக்கையைப் பதிவிறக்கவும்",
    },
  };

  const t = text[language];

  // Share QR Code
  const shareQR = async () => {
    if (!healthData) return;
    
    const canvas = qrRef.current?.querySelector('canvas');
    if (!canvas) return;

    canvas.toBlob(async (blob) => {
      const file = new File([blob], 'health-id-qr.png', { type: 'image/png' });
      
      if (navigator.share && navigator.canShare({ files: [file] })) {
        try {
          await navigator.share({
            title: 'My Health ID',
            text: `Health ID: ${healthData.id}`,
            files: [file],
          });
        } catch (err) {
          if (err.name !== 'AbortError') {
            downloadQR(canvas);
          }
        }
      } else {
        downloadQR(canvas);
      }
    });
  };

  // Download QR as fallback
  const downloadQR = (canvas) => {
    const url = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.download = `health-id-qr-${healthData.id}.png`;
    link.href = url;
    link.click();
  };

  // Download Health Report as PDF
  const downloadReport = () => {
    if (!healthData) return;
    
    // Create printable HTML
    const printWindow = window.open('', '', 'width=800,height=600');
    printWindow.document.write(`
      <html>
        <head>
          <title>Health Report - ${healthData.name}</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 40px; }
            h1 { color: #16a34a; border-bottom: 3px solid #16a34a; padding-bottom: 10px; }
            h2 { color: #059669; margin-top: 30px; }
            .info-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin: 20px 0; }
            .info-item { padding: 10px; background: #f0fdf4; border-left: 4px solid #16a34a; }
            .label { font-weight: bold; color: #666; font-size: 12px; }
            .value { font-size: 16px; color: #000; margin-top: 5px; }
            .consultation { border-left: 4px solid #16a34a; padding: 10px; margin: 10px 0; background: #f0fdf4; }
            .prescription { border: 1px solid #dbeafe; padding: 10px; margin: 10px 0; background: #eff6ff; }
            .allergy { display: inline-block; background: #fee2e2; color: #991b1b; padding: 5px 15px; border-radius: 20px; margin: 5px; }
          </style>
        </head>
        <body>
          <h1><svg style="display: inline-block; width: 24px; height: 24px; vertical-align: middle; margin-right: 8px;" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M3 5a2 2 0 012-2h10a2 2 0 012 2v8a2 2 0 01-2 2h-2.22l.123.489.804.804A1 1 0 0113 18H7a1 1 0 01-.707-1.707l.804-.804L7.22 15H5a2 2 0 01-2-2V5zm5.771 7H5V5h10v7H8.771z" clipRule="evenodd"/></svg>Maruthuvan Health Report</h1>
          <div class="info-grid">
            <div class="info-item"><div class="label">Patient ID</div><div class="value">${healthData.id}</div></div>
            <div class="info-item"><div class="label">Aadhar</div><div class="value">${healthData.aadhar}</div></div>
            <div class="info-item"><div class="label">Name</div><div class="value">${healthData.name}</div></div>
            <div class="info-item"><div class="label">Father's Name</div><div class="value">${healthData.fatherName}</div></div>
            <div class="info-item"><div class="label">Date of Birth</div><div class="value">${healthData.dob}</div></div>
            <div class="info-item"><div class="label">Age</div><div class="value">${healthData.age} years</div></div>
            <div class="info-item"><div class="label">Gender</div><div class="value">${healthData.gender}</div></div>
            <div class="info-item"><div class="label">Blood Group</div><div class="value" style="color: #dc2626;">${healthData.bloodGroup}</div></div>
            <div class="info-item" style="grid-column: span 2;"><div class="label">Phone</div><div class="value">${healthData.phone}</div></div>
            <div class="info-item" style="grid-column: span 2;"><div class="label">Address</div><div class="value">${healthData.address}</div></div>
          </div>
          <div>
            <div class="label">Allergies</div>
            ${healthData.allergies.map(a => `<span class="allergy">${a}</span>`).join('')}
          </div>
          <h2><svg style="display: inline-block; width: 20px; height: 20px; vertical-align: middle; margin-right: 8px;" fill="currentColor" viewBox="0 0 20 20"><path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"/><path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd"/></svg>Consultation History</h2>
          ${healthData.consultations.map(c => `
            <div class="consultation">
              <div style="color: #666; font-size: 12px;">${c.date}</div>
              <div style="font-weight: bold; margin: 5px 0;">${c.doctor}</div>
              <div style="color: #666; font-size: 14px;">${c.hospital}</div>
              <div style="color: #16a34a; font-weight: bold; margin-top: 5px;">${c.diagnosis}</div>
            </div>
          `).join('')}
          <h2><svg style="display: inline-block; width: 20px; height: 20px; vertical-align: middle; margin-right: 8px;" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M7 2a1 1 0 00-.707 1.707L7 4.414v3.758a1 1 0 01-.293.707l-4 4C.817 14.769 2.156 18 4.828 18h10.343c2.673 0 4.012-3.231 2.122-5.121l-4-4A1 1 0 0113 8.172V4.414l.707-.707A1 1 0 0013 2H7zm2 6.172V4h2v4.172a3 3 0 00.879 2.12l1.027 1.028a4 4 0 00-2.171.102l-.47.156a4 4 0 01-2.53 0l-.563-.187a1.993 1.993 0 00-.114-.035l1.063-1.063A3 3 0 009 8.172z" clipRule="evenodd"/></svg>Prescriptions</h2>
          ${healthData.prescriptions.map(p => `
            <div class="prescription">
              <div style="color: #666; font-size: 12px;">${p.date}</div>
              <div style="font-weight: bold;">${p.medicine}</div>
              <div style="color: #2563eb; font-weight: bold; font-size: 14px;">${p.dosage}</div>
            </div>
          `).join('')}
          <div style="margin-top: 40px; padding-top: 20px; border-top: 2px solid #e5e7eb; text-align: center; color: #666;">
            <p>Generated on ${new Date().toLocaleDateString()} at ${new Date().toLocaleTimeString()}</p>
            <p style="font-weight: bold; color: #16a34a;">Maruthuvan - AI Healthcare Platform</p>
          </div>
        </body>
      </html>
    `);
    printWindow.document.close();
    setTimeout(() => {
      printWindow.print();
    }, 250);
  };

  if (!healthData) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-4 border-green-500 border-t-transparent"></div>
    </div>
  );

  return (
    <>
      <Ribbons />
      <div className="relative min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
        <LiquidEther />
        
        <div className="relative z-10 max-w-4xl mx-auto px-4 py-8">
          {/* Language Toggle */}
          <motion.div 
            className="flex justify-end mb-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="bg-white/80 backdrop-blur-md rounded-full p-1 shadow-lg flex gap-2">
              <button
                onClick={() => setLanguage('english')}
                className={`px-4 py-2 rounded-full font-semibold transition-all ${
                  language === 'english'
                    ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-md'
                    : 'text-gray-600 hover:text-green-600'
                }`}
              >
                English
              </button>
              <button
                onClick={() => setLanguage('tamil')}
                className={`px-4 py-2 rounded-full font-semibold transition-all ${
                  language === 'tamil'
                    ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-md'
                    : 'text-gray-600 hover:text-green-600'
                }`}
              >
                தமிழ்
              </button>
            </div>
          </motion.div>

          {/* Header */}
          <motion.div
            className="text-center mb-8"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl font-bold text-gray-800 mb-2">{t.title}</h1>
            <p className="text-gray-600">{t.subtitle}</p>
          </motion.div>

          {/* QR Code Card */}
          <motion.div
            className="bg-white/90 backdrop-blur-md rounded-3xl shadow-2xl p-8 mb-6"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="flex flex-col md:flex-row items-center gap-8">
              {/* QR Code */}
              <div className="flex-shrink-0" ref={qrRef}>
                <div className="bg-white p-4 rounded-2xl shadow-lg">
                  <QRCodeCanvas value={healthData.id} size={200} fgColor="#16a34a" />
                </div>
              </div>

              {/* Basic Info */}
              <div className="flex-1 space-y-3 w-full">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500 font-semibold">{t.patientId}</p>
                    <p className="text-lg font-bold text-green-600">{healthData.id}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 font-semibold">{t.aadhar}</p>
                    <p className="text-lg font-bold text-gray-800">{healthData.aadhar}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 font-semibold">{t.name}</p>
                    <p className="text-lg font-bold text-gray-800">{healthData.name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 font-semibold">{t.father}</p>
                    <p className="text-lg font-bold text-gray-800">{healthData.fatherName}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 font-semibold">{t.dob}</p>
                    <p className="text-lg font-bold text-gray-800">{healthData.dob}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 font-semibold">{t.age}</p>
                    <p className="text-lg font-bold text-gray-800">{healthData.age} years</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 font-semibold">{t.gender}</p>
                    <p className="text-lg font-bold text-gray-800">{healthData.gender}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 font-semibold">{t.blood}</p>
                    <p className="text-lg font-bold text-red-600">{healthData.bloodGroup}</p>
                  </div>
                  <div className="col-span-2">
                    <p className="text-sm text-gray-500 font-semibold">{t.phone}</p>
                    <p className="text-lg font-bold text-gray-800">{healthData.phone}</p>
                  </div>
                  <div className="col-span-2">
                    <p className="text-sm text-gray-500 font-semibold">{t.address}</p>
                    <p className="text-base text-gray-700">{healthData.address}</p>
                  </div>
                  <div className="col-span-2">
                    <p className="text-sm text-gray-500 font-semibold">{t.allergies}</p>
                    <div className="flex gap-2 mt-1">
                      {healthData.allergies.map((allergy, idx) => (
                        <span key={idx} className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm font-semibold">
                          {allergy}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Consultation History */}
          <motion.div
            className="bg-white/90 backdrop-blur-md rounded-3xl shadow-2xl p-8 mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              {t.consultations}
            </h2>
            <div className="space-y-4">
              {healthData.consultations.map((consult, idx) => (
                <div key={idx} className="border-l-4 border-green-500 pl-4 py-2 bg-green-50 rounded-r-lg">
                  <p className="text-sm text-gray-500">{consult.date}</p>
                  <p className="font-bold text-gray-800">{consult.doctor}</p>
                  <p className="text-sm text-gray-600">{consult.hospital}</p>
                  <p className="text-sm text-green-700 font-semibold mt-1">{consult.diagnosis}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Prescriptions */}
          <motion.div
            className="bg-white/90 backdrop-blur-md rounded-3xl shadow-2xl p-8 mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
              </svg>
              {t.prescriptions}
            </h2>
            <div className="space-y-3">
              {healthData.prescriptions.map((rx, idx) => (
                <div key={idx} className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <p className="text-sm text-gray-500">{rx.date}</p>
                  <p className="font-bold text-gray-800">{rx.medicine}</p>
                  <p className="text-sm text-blue-700 font-semibold">{rx.dosage}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <motion.button
              className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-8 py-4 rounded-full font-semibold shadow-lg hover:from-green-600 hover:to-emerald-700 flex items-center justify-center gap-2"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={shareQR}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
              </svg>
              {t.share}
            </motion.button>
            <motion.button
              className="flex-1 bg-white text-green-600 border-2 border-green-600 px-8 py-4 rounded-full font-semibold shadow-lg hover:bg-green-50 flex items-center justify-center gap-2"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={downloadReport}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              {t.download}
            </motion.button>
          </motion.div>
        </div>
      </div>
    </>
  );
}
