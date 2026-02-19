"use client";

import Link from "next/link";

export default function DoctorCard({ doctor }) {
  return (
    <div className="bg-white shadow rounded-xl p-4 flex flex-col justify-between">
      <div>
        <h2 className="text-lg font-semibold">{doctor.name}</h2>
        <p className="text-sm text-gray-500">{doctor.specialty}</p>
        <p className="text-sm text-yellow-500 mt-1">⭐ {doctor.rating}</p>
        <p
          className={`text-xs font-medium mt-2 ${
            doctor.available ? "text-green-600" : "text-red-600"
          }`}
        >
          {doctor.available ? "Available Now" : "Unavailable"}
        </p>
      </div>
      <Link
        href={`/session?doctorId=${doctor.id}`}
        className={`mt-4 w-full text-center py-2 rounded-lg font-medium ${
          doctor.available
            ? "bg-green-600 text-white hover:bg-green-700"
            : "bg-gray-300 text-gray-600 cursor-not-allowed"
        }`}
      >
        {doctor.available ? "Book Session" : "Unavailable"}
      </Link>
    </div>
  );
}
