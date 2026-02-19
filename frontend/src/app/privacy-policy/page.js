'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 py-12 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Privacy Policy</h1>
          <p className="text-sm text-gray-500 mb-8">Last Updated: January 2026</p>

          <div className="space-y-6 text-gray-700">
            <section>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-green-600">Your Data Security</h2>
              </div>
              <p className="mb-2">At Maruthuvan, we take your health data security seriously. We comply with:</p>
              <ul className="list-disc ml-6 space-y-1">
                <li>Digital Personal Data Protection Act (DPDPA) 2023</li>
                <li>Information Technology Act, 2000</li>
                <li>ABDM (Ayushman Bharat Digital Mission) Standards</li>
              </ul>
            </section>

            <section>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-green-600">Data We Collect</h2>
              </div>
              <div className="bg-green-50 p-4 rounded-lg mb-3">
                <h3 className="font-bold mb-2 flex items-center gap-2">
                  <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Essential Data Only:
                </h3>
                <ul className="list-disc ml-6 space-y-1">
                  <li>Mobile number (for authentication)</li>
                  <li>Name, Age, Gender, Blood Group</li>
                  <li>Allergies (critical for doctor safety)</li>
                  <li>Symptoms (temporary, for consultation only)</li>
                  <li>Consultation requests (doctor, hospital, date/time)</li>
                </ul>
              </div>
              <div className="bg-red-50 p-4 rounded-lg">
                <h3 className="font-bold mb-2 flex items-center gap-2">
                  <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  What We DON'T Collect:
                </h3>
                <ul className="list-disc ml-6 space-y-1">
                  <li>Detailed medical history</li>
                  <li>Payment card details</li>
                  <li>Biometric data</li>
                  <li>Genetic information</li>
                </ul>
              </div>
            </section>

            <section>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-green-600">How We Protect Your Data</h2>
              </div>
              <ul className="list-disc ml-6 space-y-2">
                <li><strong>Encryption:</strong> All data transmitted using HTTPS/TLS encryption</li>
                <li><strong>Authentication:</strong> JWT token-based secure authentication</li>
                <li><strong>Access Control:</strong> Role-based access (Patient, Doctor, Admin only)</li>
                <li><strong>Data Hosting:</strong> Stored in India (data sovereignty)</li>
                <li><strong>No Third-Party Sharing:</strong> Your data is never sold or shared</li>
              </ul>
            </section>

            <section>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-green-600">Your Rights</h2>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h3 className="font-bold mb-2 flex items-center gap-2">
                    <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Right to Access
                  </h3>
                  <p className="text-sm">View all your data anytime through your profile</p>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h3 className="font-bold mb-2 flex items-center gap-2">
                    <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Right to Export
                  </h3>
                  <p className="text-sm">Download your data in JSON format</p>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h3 className="font-bold mb-2 flex items-center gap-2">
                    <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Right to Delete
                  </h3>
                  <p className="text-sm">Request account deletion anytime</p>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h3 className="font-bold mb-2 flex items-center gap-2">
                    <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Right to Consent
                  </h3>
                  <p className="text-sm">Control what data is shared and with whom</p>
                </div>
              </div>
            </section>

            <section>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-green-600">Data Retention</h2>
              </div>
              <ul className="list-disc ml-6 space-y-1">
                <li>Consultation requests: 90 days</li>
                <li>Symptoms data: Deleted after consultation</li>
                <li>Prescriptions: 1 year</li>
                <li>User account: Until you request deletion</li>
              </ul>
            </section>

            <section>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-green-600">Data Sharing</h2>
              </div>
              <p className="mb-2">We share your data ONLY with:</p>
              <ul className="list-disc ml-6 space-y-1">
                <li><strong>Doctors:</strong> Only during active consultation (with your consent)</li>
                <li><strong>Hospitals:</strong> Only for appointment booking</li>
                <li><strong>Government:</strong> If legally required (with notice to you)</li>
              </ul>
              <p className="mt-3 font-bold text-red-600">We NEVER share your data with advertisers or third parties.</p>
            </section>

            <section>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-green-600">Contact Us</h2>
              </div>
              <p>For any privacy concerns or data requests:</p>
              <div className="bg-gray-50 p-4 rounded-lg mt-2">
                <p><strong>Email:</strong> privacy@maruthuvan.gov.in</p>
                <p><strong>Phone:</strong> 1800-XXX-XXXX (Toll-Free)</p>
                <p><strong>Address:</strong> Tamil Nadu Health Department, Chennai</p>
              </div>
            </section>

            <section className="bg-green-50 p-6 rounded-lg border-2 border-green-200">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-green-200 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-green-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <h2 className="text-xl font-bold text-green-700">Government Initiative</h2>
              </div>
              <p>Maruthuvan is a Tamil Nadu Government healthcare initiative. Your data is protected under government security standards and will never be used for commercial purposes.</p>
            </section>
          </div>

          <div className="mt-8 pt-6 border-t border-gray-200 flex justify-between items-center">
            <Link href="/dashboard" className="text-green-600 hover:text-green-700 font-semibold">
              ← Back to Dashboard
            </Link>
            <p className="text-sm text-gray-500">Version 1.0 | January 2026</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
