

// src/pages/Unauthorized.jsx
export default function Unauthorized() {
  return (
    <div className="flex flex-col items-center justify-center h-[70vh] text-center">
      <h1 className="text-3xl font-bold text-red-600 mb-4">🚫 Access Denied</h1>
      <p className="text-gray-600">You are not authorized to view this page.</p>
    </div>
  );
}
