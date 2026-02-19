"use client";

import { motion } from "framer-motion";
import { useState } from "react";

const reviews = [
  {
    id: 1,
    img: "/images/doctor1.jpeg",
    name: "Dr. Arun Kumar",
    role: "Rural Health Physician",
    en: "The platform helps us triage patients before they even reach the clinic.",
    ta: "இந்த தளம் நோயாளிகள் கிளினிக்கிற்கு வருவதற்கு முன்பே முன்னுரிமை வழங்க உதவுகிறது.",
    position: "top-6 left-10",
  },
  {
    id: 2,
    img: "/images/doctor2.jpeg",
    name: "Dr. Meera Nair",
    role: "Community Medicine Specialist",
    en: "Patient awareness and preparedness have improved significantly.",
    ta: "நோயாளிகளின் விழிப்புணர்வும் தயாராக இருப்பதும் குறிப்பிடத்தக்க அளவில் மேம்பட்டுள்ளது.",
    position: "top-16 right-16",
  },
  {
    id: 3,
    img: "/images/doctor3.jpeg",
    name: "Dr. Joseph Daniel",
    role: "Emergency Care Consultant",
    en: "The SOS feature has real-life impact in critical rural cases.",
    ta: "அவசர SOS அம்சம் கிராமப்புற அவசர நிலைகளில் உண்மையான தாக்கத்தை ஏற்படுத்துகிறது.",
    position: "bottom-20 left-24",
  },
  {
    id: 4,
    img: "/images/doctor4.jpeg",
    name: "Dr. Lakshmi Priya",
    role: "Public Health Officer",
    en: "This solution builds trust between healthcare systems and communities.",
    ta: "இந்த தீர்வு சுகாதார அமைப்புகளுக்கும் சமூகங்களுக்கும் இடையே நம்பிக்கையை உருவாக்குகிறது.",
    position: "bottom-10 right-24",
  },
];

export default function TrustedByProfessionals() {
  const [active, setActive] = useState(null);

  return (
    <section className="relative py-40 bg-white overflow-hidden">
      {/* Center Heading */}
      <div className="relative z-10 text-center max-w-3xl mx-auto mb-32">
        <h2 className="text-4xl font-bold mb-4">
          Trusted by Medical Professionals
        </h2>
        <p className="text-lg text-gray-500 font-tamil font-bold">
          மருத்துவ நிபுணர்களால் நம்பப்படுகிறது
        </p>
      </div>

      {/* Floating Reviews */}
      <div className="relative max-w-7xl mx-auto h-[520px]">
        {reviews.map((review) => {
          const isActive = active === review.id;

          return (
            <motion.div
              key={review.id}
              onMouseEnter={() => setActive(review.id)}
              onMouseLeave={() => setActive(null)}
              animate={{
                opacity: active && !isActive ? 0.35 : 1,
                scale: isActive ? 1.08 : 1,
                y: isActive ? -6 : [0, -8, 0],
              }}
              transition={{
                duration: 4,
                repeat: isActive ? 0 : Infinity,
                ease: "easeInOut",
              }}
              className={`absolute ${review.position}
                max-w-sm bg-white/90 backdrop-blur-lg
                rounded-2xl p-6 shadow-md
                border border-gray-100
                cursor-pointer
              `}
            >
              {/* Header */}
              <div className="flex items-center gap-4 mb-3">
                <img
                  src={review.img}
                  alt={review.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <p className="font-semibold text-gray-900">
                    {review.name}
                  </p>
                  <p className="text-sm text-gray-500">
                    {review.role}
                  </p>
                </div>
              </div>

              {/* Review Text */}
              <p className="text-gray-700 text-sm leading-relaxed mb-2">
                “{review.en}”
              </p>
              <p className="text-gray-500 text-sm font-tamil font-bold leading-relaxed">
                “{review.ta}”
              </p>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
