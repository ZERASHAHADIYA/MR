"use client";

import { useSearchParams } from "next/navigation";

export default function VideoSessionPage() {
  const params = useSearchParams();
  const doctorId = params.get("doctorId");

  return (
    <div className="p-4 flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-xl font-bold mb-4">Video Consultation</h1>
      <p className="text-gray-600 mb-6">
        You are connecting with Doctor ID: {doctorId}
      </p>
      <div className="bg-black w-full max-w-md h-80 rounded-xl flex items-center justify-center text-white">
        Video Call Placeholder 🎥
      </div>
    </div>
  );
}
