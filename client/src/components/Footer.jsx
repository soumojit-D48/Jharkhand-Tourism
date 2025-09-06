import { Separator } from "@/components/ui/separator"; // shadcn separator (optional)
import {  X, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full border-t bg-black text-white">
      <div className=" max-w-7xl mx-auto px-4 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Left side - Brand */}
        <div className="text-center md:text-left">
          <h2 className="text-lg font-semibold">🌿 Tour Jharkhand</h2>
          <p className="text-sm text-gray-500">
            Discover nature & culture together.
          </p>
        </div>

        {/* Middle - Separator (optional from shadcn) */}
        <Separator className="hidden md:block mx-4 flex-1" />

        {/* Right side - Links */}
        <div className="flex space-x-4">
          {/* <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-900">
            <Github className="w-5 h-5" />
          </a> */}
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-900">
            <X className="w-5 h-5" />
          </a>
          <a href="mailto:contact@ecotour.com" className="hover:text-gray-900">
            <Mail className="w-5 h-5" />
          </a>
        </div>
      </div>

      {/* Bottom small copyright */}
      <div className="border-t text-center py-4 text-xs text-gray-400">
        © {new Date().getFullYear()} Tour Jharkhand. All rights reserved.
      </div>
    </footer>
  );
}
