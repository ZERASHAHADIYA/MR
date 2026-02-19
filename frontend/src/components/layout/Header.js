"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function Header() {
  return (
    <motion.header 
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-green-100 px-6 py-4"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link href="/" className="group">
          <motion.h1 
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
            className="text-3xl font-extrabold bg-gradient-to-r from-green-600 via-green-500 to-emerald-600 bg-clip-text text-transparent hover:from-green-700 hover:via-green-600 hover:to-emerald-700 transition-all duration-300"
          >
            Rural<span className="text-green-700">Care</span>
          </motion.h1>
        </Link>
        
        <nav className="hidden md:flex items-center space-x-8">
          <Link href="/dashboard" className="text-gray-700 hover:text-green-600 transition-colors font-medium">
            Home
          </Link>
          <Link href="/ai-check" className="text-gray-700 hover:text-green-600 transition-colors font-medium">
            AI Check
          </Link>
          <Link href="/lab-tests" className="text-gray-700 hover:text-green-600 transition-colors font-medium">
            Lab Tests
          </Link>
          <Link href="/consult" className="text-gray-700 hover:text-green-600 transition-colors font-medium">
            Consult
          </Link>
          <Link href="/auth" className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-xl font-semibold transition-colors">
            Get Started
          </Link>
        </nav>
      </div>
    </motion.header>
  );
}
