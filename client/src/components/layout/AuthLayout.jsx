// import React from 'react';

// const AuthLayout = ({ children }) => {
//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-12 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-md w-full space-y-8">
//         {children}
//       </div>
//     </div>
//   );
// };

// export default AuthLayout;


import React from "react";

const AuthLayout = ({ children }) => {
  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-indigo-100 to-purple-100 py-12 px-4 sm:px-6 lg:px-8 overflow-hidden">
      
      {/* Background Text (Eco Quest) */}
      <h1 className="absolute inset-0 flex items-start justify-center text-5xl sm:text-8xl md:text-9xl lg:text-[150px] font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-green-500 to-green-700 opacity-10 select-none pointer-events-none">
        ECO QUEST
      </h1>

      {/* Foreground Content */}
      <div className="relative max-w-md w-full space-y-8">
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;
