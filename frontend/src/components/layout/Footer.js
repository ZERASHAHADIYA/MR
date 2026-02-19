export default function Footer() {
  return (
    <footer className="bg-gray-100 mt-20">
      <div className="max-w-7xl mx-auto px-6 py-8 text-center text-sm text-gray-600">
        © {new Date().getFullYear()} Rural Healthcare Platform. All rights reserved.
      </div>
    </footer>
  );
}
