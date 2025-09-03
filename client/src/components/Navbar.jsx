// import React, { useState } from 'react';
// import { Menu, X, ChevronDown } from 'lucide-react';
// import { Button } from '@/components/ui/button';
// import {
//   NavigationMenu,
//   NavigationMenuContent,
//   NavigationMenuItem,
//   NavigationMenuLink,
//   NavigationMenuList,
//   NavigationMenuTrigger,
// } from '@/components/ui/navigation-menu';
// import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
// import { cn } from '@/lib/utils';

// const navigationItems = [
//   { name: 'Home', href: '#' },
//   { name: 'About', href: '#' },
//   { name: 'Services', href: '#' },
//   { name: 'Contact', href: '#' }
// ];

// const Navbar = () => {
//   const [isOpen, setIsOpen] = useState(false);

//   return (
//     <header className="sticky top-0 z-50 w-full bg-navbar-bg/95 backdrop-blur supports-[backdrop-filter]:bg-navbar-bg/75 border-b border-navbar-border shadow-navbar">
//       <div className="container mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex justify-between items-center h-16">
//           {/* Logo */}
//           <div className="flex-shrink-0">
//             <a href="#" className="flex items-center space-x-2">
//               <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
//                 <span className="text-white font-bold text-sm">@</span>
//               </div>
//               <span className="text-xl font-bold text-navbar-text">Brand</span>
//             </a>
//           </div>

//           {/* Desktop Navigation */}
//           <NavigationMenu className="hidden md:flex">
//             <NavigationMenuList>
//               {navigationItems.map((item) => (
//                 <NavigationMenuItem key={item.name}>
//                   <NavigationMenuLink
//                     href={item.href}
//                     className={cn(
//                       "group inline-flex h-10 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors",
//                       "text-navbar-text-muted hover:text-navbar-text hover:bg-navbar-hover",
//                       "focus:bg-navbar-hover focus:text-navbar-text focus:outline-none",
//                       "disabled:pointer-events-none disabled:opacity-50"
//                     )}
//                   >
//                     {item.name}
//                   </NavigationMenuLink>
//                 </NavigationMenuItem>
//               ))}
//             </NavigationMenuList>
//           </NavigationMenu>

//           {/* CTA Button (Desktop) */}
//           <div className="hidden md:flex items-center space-x-4">
//             <Button variant="ghost" className="text-navbar-text-muted hover:text-navbar-text">
//               Sign In
//             </Button>
//             <Button className="bg-gradient-primary hover:shadow-button transition-all duration-300 transform hover:scale-105">
//               Get Started
//             </Button>
//           </div>

//           {/* Mobile Menu Button */}
//           <div className="md:hidden">
//             <Sheet open={isOpen} onOpenChange={setIsOpen}>
//               <SheetTrigger asChild>
//                 <Button variant="ghost" size="icon" className="text-navbar-text">
//                   <Menu className="h-5 w-5" />
//                   <span className="sr-only">Open menu</span>
//                 </Button>
//               </SheetTrigger>
//               <SheetContent side="right" className="w-full max-w-sm">
//                 <div className="flex flex-col space-y-4 mt-8">
//                   {navigationItems.map((item) => (
//                     <a
//                       key={item.name}
//                       href={item.href}
//                       className="text-lg font-medium text-navbar-text hover:text-primary transition-colors duration-200 py-2"
//                       onClick={() => setIsOpen(false)}
//                     >
//                       {item.name}
//                     </a>
//                   ))}
//                   <div className="flex flex-col space-y-2 pt-4 border-t border-navbar-border">
//                     <Button variant="ghost" className="justify-start text-navbar-text-muted hover:text-navbar-text">
//                       Sign In
//                     </Button>
//                     <Button className="justify-start bg-gradient-primary hover:shadow-button transition-all duration-300">
//                       Get Started
//                     </Button>
//                   </div>
//                 </div>
//               </SheetContent>
//             </Sheet>
//           </div>
//         </div>
//       </div>
//     </header>
//   );
// };

// export default Navbar;



// import { useState } from "react";
// import { Button } from "@/components/ui/button";
// import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
// import { Menu, Mountain, MapPin, Camera, TreePine, Users } from "lucide-react";
// import { useAuth } from "@/context/AuthContext";
// import { Link } from "react-router-dom";

// const Navbar = () => {
//   const [isOpen, setIsOpen] = useState(false);

//   const navigationItems = [
//     { name: "Eco Tourism", href: "/eco", icon: TreePine },
//     { name: "Cultural Sites", href: "/cultural", icon: Users },
//     { name: "Destinations", href: "/destinations", icon: MapPin },
//     { name: "Gallery", href: "/gallery", icon: Camera },
//   ];

//   const {user} = useAuth()

//   return (
//     <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
//       <div className="container mx-auto px-4">
//         <div className="flex h-16 items-center justify-between">
//           {/* Logo */}
//           <div className="flex items-center space-x-2">
//             <Mountain className="h-8 w-8 text-primary" />
//             <div className="flex flex-col">
//               <span className="text-lg font-bold text-foreground">Jharkhand</span>
//               <span className="text-xs text-muted-foreground">Eco Tourism</span>
//             </div>
//           </div>

//           {/* Desktop Navigation */}
//           <div className="hidden md:flex items-center space-x-8">
//             {navigationItems.map((item) => {
//               const Icon = item.icon;
//               return (
//                 <Link
//                   key={item.name}
//                   href={"/item.href"}
//                   className="flex items-center space-x-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
//                 >
//                   <Icon className="h-4 w-4" />
//                   <span>{item.name}</span>
//                 </Link>
//               );
//             })}
//           </div>

//           {/* Desktop CTA */}
//           {/* <div className="hidden md:flex items-center space-x-4">
//             <Button variant="outline" size="sm">
//               Plan Trip
//             </Button>
//             <Button size="sm">
//               Book Now
//             </Button>
//           </div> */}

//           {/* Mobile Menu */}
//           <Sheet open={isOpen} onOpenChange={setIsOpen} >
//             <SheetTrigger asChild className="md:hidden">
//               <Button variant="ghost" size="icon">
//                 <Menu className="h-6 w-6" />
//               </Button>
//             </SheetTrigger>
//             <SheetContent side="right" className="w-80">
//               <div className="flex flex-col mt-6 ml-5">
//                 <div className="flex items-center space-x-2">
//                   <Mountain className="h-6 w-6 text-primary" />
//                   <div className="flex flex-col">
//                     <span className="font-bold text-foreground">Jharkhand Eco Tourism</span>
//                   </div>
//                 </div>
                
//                 <div className="flex flex-col space-y-4">
//                   {navigationItems.map((item) => {
//                     const Icon = item.icon;
//                     return (
//                       <Link
//                         key={item.name}
//                         href={"/item.href"}
//                         onClick={() => setIsOpen(false)}
//                         className="flex items-center space-x-3 text-sm font-medium text-muted-foreground hover:text-primary transition-colors py-2"
//                       >
//                         <Icon className="h-5 w-5" />
//                         <span>{item.name}</span>
//                       </Link>
//                     );
//                   })}
//                 </div>
// {/* 
//                 <div className="flex flex-col space-y-3 pt-4 border-t">
//                   <Button variant="outline" className="w-full">
//                     Plan Trip
//                   </Button>
//                   <Button className="w-full">
//                     Book Now
//                   </Button>
//                 </div> */}
//               </div>
//             </SheetContent>
//           </Sheet>



//           { user ? 
//         <div className='w-8 h-8 flex justify-center items-center rounded-full bg-black text-white relative group'
//             >{user.name[0].toUpperCase()}
//             <div className='absolute hidden group-hover:block top-0 right-0 z-10 text-black rounded pt-10'>
//             <ul className='list-none m-0 p-2 bg-gray-100 text-sm'>
//                     {/* if user verified then hide the verify email */}
//                 {!user.isAccountVerified && 
//                 <li onClick={sendVerificationOtp} className='py-1 px-2 hover:bg-gray-200 curPnt'>Verify Email</li>
//                 }
                
//                 <li onClick={logout} className='pr-10 py-1 px-2 hover:bg-gray-200 curPnt'>Logout</li>
//             </ul>
//             </div>
//         </div>

//         : <button onClick={() => navigate('/sign-in')}
//         className='curPnt flex items-center gap-2 border border-gray-500 rounded-full px-6 py-2 text-gray-800 hover:bg-gray-100 transition-all'>Login 
//         </button>
//         }
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;






import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { 
  Menu, 
  Mountain, 
  MapPin, 
  Camera, 
  TreePine, 
  Users, 
  LogOut, 
  Mail,
  User,
  ChevronDown
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const navigationItems = [
    { name: "Eco Tourism", href: "/eco", icon: TreePine },
    { name: "Cultural Sites", href: "/cultural", icon: Users },
    { name: "Destinations", href: "/destinations", icon: MapPin },
    { name: "Gallery", href: "/gallery", icon: Camera },
  ];

  const handleLogout = async () => {
    try {
      await logout();
      toast.success("Logged out successfully!");
      navigate("/");
      setShowUserMenu(false);
    } catch (error) {
      toast.error("Failed to logout");
    }
  };

  const sendVerificationOtp = async () => {
    try {
      // You'll need to implement this function in your AuthContext
      // await sendVerifyOtp();
      toast.success("Verification email sent!");
      setShowUserMenu(false);
    } catch (error) {
      toast.error("Failed to send verification email");
    }
  };

  const handleNavLinkClick = () => {
    setIsOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
            <Mountain className="h-8 w-8 text-primary" />
            <div className="flex flex-col">
              <span className="text-lg font-bold text-foreground">Jharkhand</span>
              <span className="text-xs text-muted-foreground">Eco Tourism</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className="flex items-center space-x-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors duration-200 py-2 px-3 rounded-md hover:bg-muted/50"
                >
                  <Icon className="h-4 w-4" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </div>

          {/* Desktop Auth Section */}
          <div className="hidden md:flex items-center">
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center space-x-2 p-2 rounded-full hover:bg-muted transition-colors duration-200"
                >
                  <div className="w-8 h-8 flex justify-center items-center rounded-full bg-primary text-primary-foreground font-medium">
                    {user.name?.[0]?.toUpperCase() || <User className="h-4 w-4" />}
                  </div>
                  <span className="text-sm font-medium text-foreground">{user.name}</span>
                  <ChevronDown className={`h-4 w-4 text-muted-foreground transition-transform duration-200 ${showUserMenu ? 'rotate-180' : ''}`} />
                </button>
                
                {/* User Dropdown Menu */}
                {showUserMenu && (
                  <div className="absolute right-0 top-12 w-56 bg-background border border-border rounded-lg shadow-lg py-2 z-50">
                    <div className="px-3 py-2 border-b border-border">
                      <p className="text-sm font-medium text-foreground">{user.name}</p>
                      <p className="text-xs text-muted-foreground">{user.email}</p>
                    </div>
                    
                    {!user.isAccountVerified && (
                      <button
                        onClick={sendVerificationOtp}
                        className="w-full flex items-center space-x-2 px-3 py-2 text-sm text-amber-600 hover:bg-muted transition-colors duration-200"
                      >
                        <Mail className="h-4 w-4" />
                        <span>Verify Email</span>
                      </button>
                    )}
                    
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center space-x-2 px-3 py-2 text-sm text-destructive hover:bg-muted transition-colors duration-200"
                    >
                      <LogOut className="h-4 w-4" />
                      <span>Logout</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => navigate('/sign-in')}
                  className="text-muted-foreground hover:text-foreground"
                >
                  Sign In
                </Button>
                <Button 
                  size="sm"
                  onClick={() => navigate('/sign-up')}
                  className="bg-primary hover:bg-primary/90"
                >
                  Get Started
                </Button>
              </div>
            )}
          </div>

          {/* Mobile Menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon" className="hover:bg-muted">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80 p-0">
              <div className="flex flex-col h-full">
                {/* Mobile Header */}
                <div className="flex items-center space-x-2 p-6 border-b border-border">
                  <Mountain className="h-6 w-6 text-primary" />
                  <div className="flex flex-col">
                    <span className="font-bold text-foreground">Jharkhand</span>
                    <span className="text-xs text-muted-foreground">Eco Tourism</span>
                  </div>
                </div>
                
                {/* Mobile Navigation */}
                <div className="flex flex-col p-6 space-y-4">
                  {navigationItems.map((item) => {
                    const Icon = item.icon;
                    return (
                      <Link
                        key={item.name}
                        to={item.href}
                        onClick={handleNavLinkClick}
                        className="flex items-center space-x-3 text-sm font-medium text-muted-foreground hover:text-primary transition-colors py-3 px-2 rounded-md hover:bg-muted/50"
                      >
                        <Icon className="h-5 w-5" />
                        <span>{item.name}</span>
                      </Link>
                    );
                  })}
                </div>

                {/* Mobile Auth Section */}
                <div className="mt-auto p-6 border-t border-border">
                  {user ? (
                    <div className="space-y-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 flex justify-center items-center rounded-full bg-primary text-primary-foreground font-medium">
                          {user.name?.[0]?.toUpperCase() || <User className="h-5 w-5" />}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-foreground">{user.name}</p>
                          <p className="text-xs text-muted-foreground">{user.email}</p>
                        </div>
                      </div>
                      
                      {!user.isAccountVerified && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={sendVerificationOtp}
                          className="w-full justify-start text-amber-600 border-amber-200 hover:bg-amber-50"
                        >
                          <Mail className="h-4 w-4 mr-2" />
                          Verify Email
                        </Button>
                      )}
                      
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={handleLogout}
                        className="w-full justify-start text-destructive border-destructive/20 hover:bg-destructive/5"
                      >
                        <LogOut className="h-4 w-4 mr-2" />
                        Logout
                      </Button>
                    </div>
                  ) : (
                    <div className="flex flex-col space-y-3">
                      <Button
                        variant="outline"
                        onClick={() => {
                          navigate('/sign-in');
                          setIsOpen(false);
                        }}
                        className="w-full"
                      >
                        Sign In
                      </Button>
                      <Button
                        onClick={() => {
                          navigate('/sign-up');
                          setIsOpen(false);
                        }}
                        className="w-full"
                      >
                        Get Started
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
      
      {/* Backdrop for user menu */}
      {showUserMenu && (
        <div
          className="fixed inset-0 z-40 md:hidden"
          onClick={() => setShowUserMenu(false)}
        />
      )}
    </nav>
  );
};

export default Navbar;