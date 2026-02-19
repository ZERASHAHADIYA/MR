"use client";

import { useState, useEffect } from "react";
import Button from "@/components/ui/Button";
import { useLanguage } from "@/hooks/useLanguage";

export default function SettingsPage() {
  const [profile, setProfile] = useState({
    name: "",
    age: "",
    bloodGroup: "",
    allergies: "",
  });

  const { language, setLanguage } = useLanguage();

  useEffect(() => {
    // TODO: Fetch user profile from backend (NestJS)
    setProfile({
      name: "Suryaprakash",
      age: 28,
      bloodGroup: "B+",
      allergies: "Peanuts, Dust",
    });
  }, []);

  const handleSave = () => {
    // TODO: Send updated profile to backend
    console.log("Saving profile", profile, "Language:", language);
    alert("Settings saved!");
  };

  return (
    <div className="max-w-md mx-auto p-6 space-y-6">
      <h1 className="text-xl font-bold">Settings & Preferences</h1>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Name</label>
          <input
            type="text"
            value={profile.name}
            onChange={(e) => setProfile({ ...profile, name: e.target.value })}
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Age</label>
          <input
            type="number"
            value={profile.age}
            onChange={(e) => setProfile({ ...profile, age: e.target.value })}
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Blood Group</label>
          <input
            type="text"
            value={profile.bloodGroup}
            onChange={(e) =>
              setProfile({ ...profile, bloodGroup: e.target.value })
            }
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Allergies</label>
          <input
            type="text"
            value={profile.allergies}
            onChange={(e) => setProfile({ ...profile, allergies: e.target.value })}
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Language</label>
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            <option value="en">English</option>
            <option value="hi">Hindi</option>
            <option value="ta">Tamil</option>
            <option value="te">Telugu</option>
          </select>
        </div>

        <Button onClick={handleSave} className="w-full mt-4">
          Save Settings
        </Button>
      </div>
    </div>
  );
}
