"use client";

import { Timeline } from "@/components/ui/timeline";
import LaserFlow from "@/components/ui/LaserFlow";
import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Vortex } from "@/components/ui/vortex";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const cardIcons = {
  "AI Check": "🤖",
  "Consult Doctor": "👨‍⚕️",
  "Health ID": "🆔",
  "Settings": "⚙️",
};

const ImageCarousel = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const images = [
    { src: "/images/health1.jpeg", bg: "bg-green-400" },
    { src: "/images/health2.jpeg", bg: "bg-blue-400" },
    { src: "/images/health3.jpg", bg: "bg-emerald-400" },
    { src: "/images/health4.jpg", bg: "bg-green-500" }
  ];
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [images.length]);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="relative w-full h-screen overflow-hidden">
      <div 
        className="flex transition-transform duration-500 ease-out h-full"
        style={{ transform: `translateX(-${currentImageIndex * 100}%)` }}
      >
        {images.map((image, index) => (
          <div key={index} className="w-full h-full flex-shrink-0">
            <div className={`w-full h-full ${image.bg} flex items-center justify-center`}>
              <img 
                src={image.src} 
                alt={`Health ${index + 1}`}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
              <div className="absolute inset-0 flex items-center justify-center text-white text-2xl font-bold">
                 
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <button
        onClick={prevImage}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-colors z-10"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      
      <button
        onClick={nextImage}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-colors z-10"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  );
};

const SimpleTextReveal = ({ text, revealText }) => {
  const [isRevealed, setIsRevealed] = useState(false);

  return (
    <div 
      className="relative bg-gray-800 p-4 rounded-lg cursor-pointer overflow-hidden"
      onMouseEnter={() => setIsRevealed(true)}
      onMouseLeave={() => setIsRevealed(false)}
    >
      <div className="relative z-10">
        <h3 className="text-xl font-bold text-white transition-opacity duration-300">
          {isRevealed ? revealText : text}
        </h3>
      </div>
      <div className="absolute inset-0 bg-gradient-to-r from-green-500/20 to-blue-500/20 opacity-50"></div>
    </div>
  );
};

const FutureMaruthuvan = () => {
  const sectionRef = useRef(null);
  const timelineData = [
    {
      title: "2026",
      content: (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, rotateY: -15 }}
          whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          whileHover={{ scale: 1.02, rotateX: 5 }}
        >
          <h3 className="text-lg font-bold text-neutral-800 mb-2">Maruthuvan Website</h3>
          <p className="text-sm font-tamil text-green-600 mb-3">மருத்துவன் வலைத்தளம்</p>
          <motion.img 
            src="/images/2025.png" 
            alt="2025" 
            className="rounded-lg w-full h-48 object-cover shadow-md" 
            whileHover={{ scale: 1.05, rotateZ: 1 }}
            transition={{ type: "spring", stiffness: 300 }}
          />
        </motion.div>
      ),
    },
    {
      title: "2027",
      content: (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, rotateY: 15 }}
          whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          whileHover={{ scale: 1.02, rotateX: -5 }}
        >
          <h3 className="text-lg font-bold text-neutral-800 mb-2">Maruthuvan App</h3>
          <p className="text-sm font-tamil text-green-600 mb-3">மருத்துவன் செயலி</p>
          <motion.img 
            src="/images/2026.png" 
            alt="2026" 
            className="rounded-lg w-full h-48 object-cover shadow-md" 
            whileHover={{ scale: 1.05, rotateZ: -1 }}
            transition={{ type: "spring", stiffness: 300 }}
          />
        </motion.div>
      ),
    },
    {
      title: "2028",
      content: (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, rotateY: -15 }}
          whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
          whileHover={{ scale: 1.02, rotateX: 5 }}
        >
          <h3 className="text-lg font-bold text-neutral-800 mb-2">Jan Arogya Setu</h3>
          <p className="text-sm font-tamil text-green-600 mb-3">ஜன் ஆரோக்ய சேது</p>
          <motion.img 
            src="/images/2027.png" 
            alt="2027" 
            className="rounded-lg w-full h-48 object-cover shadow-md" 
            whileHover={{ scale: 1.05, rotateZ: 1 }}
            transition={{ type: "spring", stiffness: 300 }}
          />
        </motion.div>
      ),
    },
    {
      title: "2029",
      content: (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, rotateY: 15 }}
          whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.6 }}
          whileHover={{ scale: 1.02, rotateX: -5 }}
        >
          <h3 className="text-lg font-bold text-neutral-800 mb-2">Global Healthcare Connect</h3>
          <p className="text-sm font-tamil text-green-600 mb-3">உலகளாவிய சுகாதார இணைப்பு</p>
          <motion.img 
            src="/images/2028.jpeg" 
            alt="2028" 
            className="rounded-lg w-full h-48 object-cover shadow-md" 
            whileHover={{ scale: 1.05, rotateZ: -1 }}
            transition={{ type: "spring", stiffness: 300 }}
          />
        </motion.div>
      ),
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        sectionRef.current,
        { 
          opacity: 0, 
          y: 100, 
          scale: 0.9,
          rotationX: 15
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          rotationX: 0,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            end: "bottom 30%",
            toggleActions: "play none none reverse"
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="relative overflow-hidden" style={{ minHeight: '100vh' }}>
      <div className="absolute inset-0 bg-black/5"></div>
      <LaserFlow laserColor="#00ff88" />
      <div className="relative z-20">
        <Timeline data={timelineData} />
      </div>
    </div>
  );
};

const TamilNaduSchemes = () => {
  const schemesRef = useRef(null);
  const schemes = [
    {
      name: "Chief Minister's Comprehensive Health Insurance Scheme",
      nameTamil: "முதலமைச்சரின் விரிவான சுகாதார காப்பீட்டு திட்டம்",
      description: "Free medical treatment up to ₹5 lakhs per family per year",
      descriptionTamil: "ஆண்டுக்கு குடும்பத்திற்கு ₹5 லட்சம் வரை இலவச மருத்துவ சிகிச்சை",
      image: "/images/scheme1.jpeg",
      bgColor: "bg-white"
    },
    {
      name: "Amma Baby Care Kit",
      nameTamil: "அம்மா குழந்தை பராமரிப்பு கிட்",
      description: "Free baby care essentials for newborns",
      descriptionTamil: "புதிதாகப் பிறந்த குழந்தைகளுக்கு இலவச பராமரிப்பு பொருட்கள்",
      image: "/images/scheme2.jpeg",
      bgColor: "bg-gray-50"
    },
    {
      name: "Kalaignar Centenary Super Speciality Hospital Scheme",
      nameTamil: "கலைஞர் நூற்றாண்டு சிறப்பு மருத்துவமனை திட்டம்",
      description: "Advanced medical care in government hospitals",
      descriptionTamil: "அரசு மருத்துவமனைகளில் மேம்பட்ட மருத்துவ சேவை",
      image: "/images/scheme3.jpeg",
      bgColor: "bg-white"
    }
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".scheme-section",
        { opacity: 0, y: 50, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".scheme-section",
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        }
      );
    }, schemesRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={schemesRef}>
      {schemes.map((scheme, index) => (
        <motion.div 
          key={index} 
          className={`scheme-section w-full p-8 ${scheme.bgColor} relative overflow-hidden`}
          whileInView={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 50 }}
          transition={{ duration: 0.6, delay: index * 0.2 }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 animate-shimmer"></div>
          <div className="w-full relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <motion.div 
                className={`${index % 2 === 0 ? 'order-1' : 'order-2'}`}
                whileHover={{ scale: 1.05, rotateY: 5 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              >
                <div className="relative overflow-hidden rounded-2xl shadow-2xl">
                  <img 
                    src={scheme.image} 
                    alt={scheme.name}
                    className="w-full h-64 object-cover"
                    onError={(e) => {
                      e.target.style.display = 'none';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                </div>
              </motion.div>
              <motion.div 
                className={`text-gray-800 ${index % 2 === 0 ? 'order-2' : 'order-1'}`}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                <motion.h2 
                  className="text-4xl md:text-5xl font-extrabold mb-3 leading-tight bg-gradient-to-r from-gray-700 to-green-600 bg-clip-text text-transparent"
                  whileHover={{ scale: 1.02 }}
                >
                  {scheme.name}
                </motion.h2>
                <motion.p 
                  className="text-2xl font-tamil font-semibold mb-4 text-green-600"
                  whileHover={{ scale: 1.02 }}
                >
                  {scheme.nameTamil}
                </motion.p>
                <motion.p 
                  className="text-lg mb-2 text-gray-700"
                  whileHover={{ opacity: 1 }}
                >
                  {scheme.description}
                </motion.p>
                <motion.p 
                  className="text-base font-tamil font-semibold text-gray-600"
                  whileHover={{ opacity: 1 }}
                >
                  {scheme.descriptionTamil}
                </motion.p>
              </motion.div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-6xl mx-auto px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Navigation */}
          <div>
            <h3 className="text-lg font-bold mb-4">Navigation</h3>
            <ul className="space-y-2">
              <li><a href="/" className="text-gray-300 hover:text-white transition-colors">Home</a></li>
              <li><span className="text-gray-300 cursor-pointer">About</span></li>
              <li><span className="text-gray-300 cursor-pointer">Services</span></li>
              <li><span className="text-gray-300 cursor-pointer">Contact</span></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-lg font-bold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li><span className="text-gray-300 cursor-pointer">Privacy Policy</span></li>
              <li><span className="text-gray-300 cursor-pointer">Terms of Service</span></li>
              <li><span className="text-gray-300 cursor-pointer">Disclaimer</span></li>
            </ul>
          </div>

          {/* Tamil Nadu Health Links */}
          <div>
            <h3 className="text-lg font-bold mb-4">TN Health Portals</h3>
            <ul className="space-y-2">
              <li><a href="https://www.tnhealth.org/" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white transition-colors">TN Health Department</a></li>
              <li><a href="https://www.cmchis.tn.gov.in/" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white transition-colors">CM Health Insurance</a></li>
              <li><a href="https://www.tnmsc.com/" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white transition-colors">TN Medical Services</a></li>
            </ul>
          </div>

          {/* Government Links */}
          <div>
            <h3 className="text-lg font-bold mb-4">Government</h3>
            <ul className="space-y-2">
              <li><a href="https://www.tn.gov.in/" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white transition-colors">Tamil Nadu Govt</a></li>
              <li><a href="https://www.india.gov.in/" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white transition-colors">India Portal</a></li>
              <li><a href="https://www.mohfw.gov.in/" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white transition-colors">Ministry of Health</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p className="text-gray-400">&copy; 2024 Maruthuvan. All rights reserved.</p>
          <p className="text-sm text-gray-500 mt-2 font-tamil">மருத்துவன் - கிராமப்புற சுகாதார சேவை</p>
        </div>
      </div>
    </footer>
  );
};
import Link from "next/link";

export default function DashboardHome() {
  const containerRef = useRef(null);
  const headerRef = useRef(null);
  const tamilHeroRef = useRef(null);


  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 300], [0, -40]);
  const y2 = useTransform(scrollY, [0, 300], [0, -20]);
  const opacity = useTransform(scrollY, [0, 200], [1, 0.95]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headerRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
        }
      );

      gsap.fromTo(
        tamilHeroRef.current,
        { opacity: 0, x: -30, scale: 0.98 },
        {
          opacity: 1,
          x: 0,
          scale: 1,
          duration: 1,
          delay: 0.15,
          ease: "power3.out",
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);



  return (
    <div ref={containerRef} className="min-h-screen relative overflow-hidden">
      {/* Scrolling Government Name Ticker */}
      <div className="bg-green-600 text-white py-2 overflow-hidden relative z-50">
        <div className="animate-marquee whitespace-nowrap flex items-center justify-between px-4">
          <button
            onClick={() => window.location.href = '/'}
            className="bg-white/20 hover:bg-white/30 px-4 py-1 rounded-full text-sm font-semibold transition-colors flex items-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Landing
          </button>
          <div className="flex-1 text-center">
            <span className="text-lg font-bold mx-8">TamilNadu Government HealthCare Department</span>
            <span className="text-lg font-bold mx-8">தமிழ்நாடு அரசு சுகாதார துறை</span>
          </div>
        </div>
      </div>

      {/* Fixed Vortex Background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <Vortex
          backgroundColor="rgba(16, 185, 129, 0.02)"
          rangeY={800}
          particleCount={300}
          baseHue={160}
          rangeSpeed={2.0}
          baseRadius={2}
          rangeRadius={4}
          className="w-full h-full"
        />
      </div>

      <motion.div
        style={{ y: y1, opacity }}
        className="relative z-10"
      >
        {/* Split Hero Layout - Hello (Right) + Vanakkam (Left) */}
        <motion.div 
          ref={headerRef} 
          className="mb-4 bg-gradient-to-br from-emerald-600 via-green-500 to-teal-600 p-12 relative overflow-hidden w-full shadow-2xl border-4 border-transparent hover:border-yellow-400 transition-all duration-500 group"
          whileHover={{ scale: 1.02, rotateX: 2 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          {/* Animated Border Lines */}
          <div className="absolute top-0 left-0 w-0 h-1 bg-gradient-to-r from-yellow-400 to-orange-400 group-hover:w-full transition-all duration-700 ease-out"></div>
          <div className="absolute top-0 right-0 w-1 h-0 bg-gradient-to-b from-orange-400 to-red-400 group-hover:h-full transition-all duration-700 ease-out delay-200"></div>
          <div className="absolute bottom-0 right-0 w-0 h-1 bg-gradient-to-l from-red-400 to-pink-400 group-hover:w-full transition-all duration-700 ease-out delay-400"></div>
          <div className="absolute bottom-0 left-0 w-1 h-0 bg-gradient-to-t from-pink-400 to-purple-400 group-hover:h-full transition-all duration-700 ease-out delay-600"></div>
          
          {/* Corner Glow Effects */}
          <div className="absolute top-0 left-0 w-4 h-4 bg-yellow-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-700 animate-pulse"></div>
          <div className="absolute top-0 right-0 w-4 h-4 bg-orange-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-800 animate-pulse"></div>
          <div className="absolute bottom-0 right-0 w-4 h-4 bg-red-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-900 animate-pulse"></div>
          <div className="absolute bottom-0 left-0 w-4 h-4 bg-purple-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-1000 animate-pulse"></div>
          {/* Enhanced Background Effects */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 animate-shimmer"></div>
          <div className="absolute inset-0 bg-gradient-to-tl from-blue-500/20 via-transparent to-purple-500/20"></div>
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 animate-pulse"></div>
          
          <div className="w-full relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Left Side - Tamil Vanakkam */}
            <motion.div 
              ref={tamilHeroRef}
              className="text-left order-2 md:order-1"
            >
              <h2 className="text-6xl md:text-8xl font-black mb-4 text-white font-tamil leading-none drop-shadow-2xl">
                வணக்கம்
              </h2>
              <p className="text-xl md:text-2xl text-yellow-100 font-tamil font-bold drop-shadow-lg">
                உங்கள் சுகாதாரப் பயணத்தில் நாங்கள் உங்களுடன் இருக்கிறோம்
              </p>
            </motion.div>

            {/* Right Side - English Hello */}
            <motion.div className="text-right order-1 md:order-2">
              <h1 className="text-6xl md:text-8xl font-black mb-4 text-white leading-none drop-shadow-2xl">
                Hello 👋
              </h1>
              <p className="text-xl md:text-2xl text-yellow-100 mb-3 font-bold drop-shadow-lg">
                How can we help you today?
              </p>
              <p className="text-lg md:text-xl text-orange-100 font-tamil font-bold drop-shadow-lg">
                இன்று நாங்கள் உங்களுக்கு எப்படி உதவ முடியும்?
              </p>
            </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Full-width Image Carousel */}
        <ImageCarousel />

        {/* Tamil Nadu Government Schemes Section */}
        <TamilNaduSchemes />

        {/* Future Maruthuvan Section */}
        <div className="bg-white py-8">
          <FutureMaruthuvan />
        </div>

        {/* Footer */}
        <Footer />
      </motion.div>
    </div>
  );
}
