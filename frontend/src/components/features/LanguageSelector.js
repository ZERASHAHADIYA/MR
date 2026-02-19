"use client";

import { useState } from "react";

export default function LanguageSelector() {
  const [lang, setLang] = useState("en");

  return (
    <select
      value={lang}
      onChange={(e) => setLang(e.target.value)}
      className="border rounded px-2 py-1 text-sm"
    >
      <option value="en">English</option>
      <option value="hi">Hindi</option>
      <option value="ta">Tamil</option>
      <option value="te">Telugu</option>
    </select>
  );
}
