// import { Separator } from "@/components/ui/separator"; // shadcn separator (optional)
// import {  X, Mail } from "lucide-react";

// export default function Footer() {
//   return (
//     <footer className="w-full border-t bg-black text-white">
//       <div className=" max-w-7xl mx-auto px-4 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
        
//         {/* Left side - Brand */}
//         <div className="text-center md:text-left">
//           <h2 className="text-lg font-semibold">🌿 Tour Jharkhand</h2>
//           <p className="text-sm text-gray-500">
//             Discover nature & culture together.
//           </p>
//         </div>

//         {/* Middle - Separator (optional from shadcn) */}
//         <Separator className="hidden md:block mx-4 flex-1" />

//         {/* Right side - Links */}
//         <div className="flex space-x-4">
//           {/* <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-900">
//             <Github className="w-5 h-5" />
//           </a> */}
//           <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-900">
//             <X className="w-5 h-5" />
//           </a>
//           <a href="mailto:contact@ecotour.com" className="hover:text-gray-900">
//             <Mail className="w-5 h-5" />
//           </a>
//         </div>
//       </div>

//       {/* Bottom small copyright */}
//       <div className="border-t text-center py-4 text-xs text-gray-400">
//         © {new Date().getFullYear()} Tour Jharkhand. All rights reserved.
//       </div>
//     </footer>
//   );
// }



import { Separator } from "@/components/ui/separator"; 
import { X, Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full border-t bg-black text-gray-300">
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* Brand / Organization */}
        <div>
          <h2 className="text-xl font-bold text-white">🌿 Tour Jharkhand</h2>
          <p className="text-sm mt-2">
            Development of a Smart Digital Platform to Promote 
            <span className="block">Eco & Cultural Tourism in Jharkhand.</span>
          </p>
          <p className="mt-3 text-xs text-gray-400">
            An initiative of the <span className="font-semibold">Government of Jharkhand</span>.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-sm font-semibold text-white mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="/" className="hover:text-white">About Us</a></li>
            <li><a href="/destinations" className="hover:text-white">Destinations</a></li>
            {/* <li><a href="/destinations" className="hover:text-white">Eco Tourism</a></li> */}
            <li><a href="/weather" className="hover:text-white">Weather</a></li>
            <li><a href="/culture" className="hover:text-white">Cultural Heritage</a></li>
            <li><a href="/map" className="hover:text-white">Map</a></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-sm font-semibold text-white mb-3">Contact</h3>
          <ul className="space-y-2 text-sm">
            <li className="flex items-center gap-2"><Mail className="w-4 h-4" /> contact@ecoquest.com</li>
            <li className="flex items-center gap-2"><Phone className="w-4 h-4" /> +91-12345-67890</li>
          </ul>
        </div>

        {/* Social Links */}
        <div>
          <h3 className="text-sm font-semibold text-white mb-3">Follow Us</h3>
          <div className="flex space-x-4">
            {/* <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-white"> */}
              <X className="w-5 h-5" />
            {/* </a> */}
            {/* <a href="mailto:contact@ecotour.com" className="hover:text-white"> */}
              <Mail className="w-5 h-5" />
            {/* </a> */}
          </div>
        </div>
      </div>

      <Separator className="bg-gray-700" />

      {/* Bottom Bar */}
      <div className="text-center py-4 text-xs text-gray-400">
        © {new Date().getFullYear()} Tour Jharkhand. All rights reserved. <br />
        Made with ❤️ by <span className="font-semibold">Eco Quest</span>
      </div>
    </footer>
  );
}
