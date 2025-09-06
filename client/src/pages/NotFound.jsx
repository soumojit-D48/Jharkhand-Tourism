
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Home, AlertTriangle } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 text-center p-6">
      <AlertTriangle className="w-16 h-16 text-red-500 mb-4 animate-bounce" />
      <h1 className="text-6xl font-extrabold text-gray-800 mb-2">404</h1>
      <p className="text-2xl font-medium text-gray-600 mb-6">
        Oops! Page not found
      </p>
      <p className="text-gray-500 mb-8">
        The page <span className="font-mono">{location.pathname}</span> doesn’t exist.
      </p>
      <Button
        asChild
        className="px-6 py-3 text-lg rounded-2xl shadow-lg hover:scale-105 transition-transform"
      >
        <a href="/">
          <Home className="w-5 h-5 mr-2" />
          Go Back Home
        </a>
      </Button>
    </div>
  );
};

export default NotFound;

