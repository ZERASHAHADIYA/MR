"use client";

import { useState, useEffect } from "react";

export function useLanguage() {
  const [language, setLanguage] = useState("en");

  useEffect(() => {
    const saved = localStorage.getItem("language");
    if (saved) setLanguage(saved);
  }, []);

  const setLang = (lang) => {
    setLanguage(lang);
    localStorage.setItem("language", lang);
  };

  return { language, setLanguage: setLang };
}
