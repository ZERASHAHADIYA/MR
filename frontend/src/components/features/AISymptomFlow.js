"use client";

export default function AISymptomFlow({ messages }) {
  return (
    <div className="flex flex-col space-y-4">
      {messages.map((msg, idx) => (
        <div
          key={idx}
          className={`max-w-xs px-4 py-2 rounded-xl ${
            msg.role === "user" ? "bg-green-100 self-end" : "bg-gray-100 self-start"
          }`}
        >
          {msg.text}
        </div>
      ))}
    </div>
  );
}
