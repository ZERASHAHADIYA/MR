"use client";

export default function Button({
  children,
  onClick,
  type = "button",
  variant = "primary",
}) {
  const base =
    "px-6 py-3 rounded-lg font-medium transition transform active:scale-95";

  const variants = {
    primary: "bg-green-600 text-white hover:bg-green-700",
    secondary: "bg-white text-green-600 border border-green-600 hover:bg-green-50",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${base} ${variants[variant]}`}
    >
      {children}
    </button>
  );
}
