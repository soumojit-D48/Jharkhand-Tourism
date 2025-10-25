


// import { useState } from "react";
// import { Button } from "@/components/ui/button";
// import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
// import {
//   Menu,
//   Mountain,
//   MapPin,
//   Users,
//   LogOut,
//   User,
//   ChevronDown,
//   Globe,
//   CloudSun,
//   Bot,
// } from "lucide-react";
// import { useAuth } from "@/context/AuthContext";
// import { Link, useLocation, useNavigate } from "react-router-dom";
// import { toast } from "sonner";

// const Navbar = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [showUserMenu, setShowUserMenu] = useState(false);

//   const navigate = useNavigate();
//   const { user, logout } = useAuth();
//   const location = useLocation();

//   const navigationItems = [
//     { name: "Cultural Sites", href: "/culture", icon: Users },
//     { name: "Destinations", href: "/destinations", icon: MapPin },
//     { name: "Map", href: "/map", icon: Globe },
//     { name: "Ask Me", href: "/ask-me", icon: Bot },
//     { name: "Weather", href: "/weather", icon: CloudSun },
//   ];

//   const handleLogout = async () => {
//     try {
//       const result = await logout();
//       if (result.success) {
//         toast.success("Logged out successfully!");
//         navigate("/");
//       } else {
//         toast.error(result.message || "Failed to logout");
//       }
//       setShowUserMenu(false);
//     } catch (error) {
//       toast.error("Failed to logout");
//       setShowUserMenu(false);
//     }
//   };

//   const handleNavLinkClick = () => {
//     setIsOpen(false);
//   };

//   return (
//     <nav
//       className="sticky top-0 z-50 w-full border-b shadow-sm
//                 bg-gradient-to-r from-green-200 via-teal-100 to-blue-100
//                 text-gray-800 backdrop-blur supports-[backdrop-filter]:bg-opacity-60"
//     >
//       <div className="container mx-auto px-4">
//         <div className="flex h-16 items-center justify-between">
//           {/* Logo */}
//           <Link
//             onClick={() => {
//               navigate("/");
//               window.scrollTo(0, 0);
//             }}
//             to="/"
//             className="flex items-center space-x-2 hover:opacity-80 transition-opacity"
//           >
//             <Mountain className="h-8 w-8 text-primary" />
//             <div className="flex flex-col">
//               <span className="text-lg font-bold text-foreground">
//                 Jharkhand
//               </span>
//               <span className="text-xs text-red">Eco Quest</span>
//             </div>
//           </Link>

//           {/* Desktop Navigation */}
//           <div className="hidden md:flex items-center space-x-8">
//             {navigationItems.map((item) => {
//               const Icon = item.icon;
//               const isActive = location.pathname === item.href;

//               return (
//                 <Link
//                   key={item.name}
//                   to={item.href}
//                   onClick={handleNavLinkClick}
//                   className={`flex items-center space-x-2 text-sm font-medium py-2 px-3 rounded-md transition-colors duration-200
//         ${
//           isActive
//             ? "text-blue-600 bg-gray-200"
//             : "text-gray-600 hover:text-blue-600 hover:bg-gray-100"
//         }`}
//                 >
//                   <Icon className="h-4 w-4" />
//                   <span>{item.name}</span>
//                 </Link>
//               );
//             })}
//           </div>

//           {/* Desktop Auth Section */}
//           <div className="hidden md:flex items-center">
//             {user ? (
//               <div className="relative">
//                 <button
//                   onClick={() => setShowUserMenu(!showUserMenu)}
//                   className="flex items-center space-x-2 p-2 rounded-full hover:bg-muted transition-colors duration-200"
//                 >
//                   <div className="w-8 h-8 flex justify-center items-center rounded-full bg-primary text-primary-foreground font-medium">
//                     {user.name?.[0]?.toUpperCase() || (
//                       <User className="h-4 w-4" />
//                     )}
//                   </div>
//                   <span className="text-sm font-medium text-foreground">
//                     {user.name}
//                   </span>
//                   <ChevronDown
//                     className={`h-4 w-4 text-muted-foreground transition-transform duration-200 ${
//                       showUserMenu ? "rotate-180" : ""
//                     }`}
//                   />
//                 </button>

//                 {/* User Dropdown Menu */}
//                 {showUserMenu && (
//                   <div className="absolute right-0 top-12 w-56 bg-background border border-border rounded-lg shadow-lg py-2 z-50">
//                     <div className="px-3 py-2 border-b border-border">
//                       <p className="text-sm font-medium text-foreground">
//                         {user.name}
//                       </p>
//                       <p className="text-xs text-muted-foreground">
//                         {user.email}
//                       </p>
//                     </div>

//                     <button
//                       onClick={handleLogout}
//                       className="w-full flex items-center space-x-2 px-3 py-2 text-sm text-destructive hover:bg-muted transition-colors duration-200"
//                     >
//                       <LogOut className="h-4 w-4" />
//                       <span>Logout</span>
//                     </button>
//                   </div>
//                 )}
//               </div>
//             ) : (
//               <div className="flex items-center space-x-3">
//                 <Button
//                   variant="ghost"
//                   size="sm"
//                   onClick={() => navigate("/sign-in")}
//                   className="text-muted-foreground hover:text-foreground"
//                 >
//                   Sign In
//                 </Button>
//                 <Button
//                   size="sm"
//                   onClick={() => navigate("/sign-up")}
//                   className="bg-primary hover:bg-primary/90"
//                 >
//                   Get Started
//                 </Button>
//               </div>
//             )}
//           </div>

//           {/* Mobile Menu */}
//           <Sheet open={isOpen} onOpenChange={setIsOpen}>
//             <SheetTrigger asChild className="md:hidden">
//               <Button variant="ghost" size="icon" className="hover:bg-muted">
//                 <Menu className="h-6 w-6" />
//                 <span className="sr-only">Open menu</span>
//               </Button>
//             </SheetTrigger>
//             <SheetContent side="right" className="w-80 p-0">
//               <div className="flex flex-col h-full">
//                 {/* Mobile Header */}
//                 <div className="flex items-center space-x-2 p-6 border-b border-border">
//                   <Mountain className="h-6 w-6 text-primary" />
//                   <div className="flex flex-col">
//                     <span className="font-bold text-foreground">Jharkhand</span>
//                     <span className="text-xs text-muted-foreground">
//                       Eco Quest
//                     </span>
//                   </div>
//                 </div>

//                 {/* Mobile Navigation */}
//                 <div className="flex flex-col p-6 space-y-4">
//                   {navigationItems.map((item) => {
//                     const Icon = item.icon;
//                     return (
//                       <Link
//                         key={item.name}
//                         to={item.href}
//                         onClick={handleNavLinkClick}
//                         className="flex items-center space-x-3 text-sm font-medium text-muted-foreground hover:text-primary transition-colors py-3 px-2 rounded-md hover:bg-muted/50"
//                       >
//                         <Icon className="h-5 w-5" />
//                         <span>{item.name}</span>
//                       </Link>
//                     );
//                   })}
//                 </div>

//                 {/* Mobile Auth Section */}
//                 <div className="mt-auto p-6 border-t border-border">
//                   {user ? (
//                     <div className="space-y-4">
//                       <div className="flex items-center space-x-3">
//                         <div className="w-10 h-10 flex justify-center items-center rounded-full bg-primary text-primary-foreground font-medium">
//                           {user.name?.[0]?.toUpperCase() || (
//                             <User className="h-5 w-5" />
//                           )}
//                         </div>
//                         <div>
//                           <p className="text-sm font-medium text-foreground">
//                             {user.name}
//                           </p>
//                           <p className="text-xs text-muted-foreground">
//                             {user.email}
//                           </p>
//                         </div>
//                       </div>

//                       <Button
//                         variant="outline"
//                         size="sm"
//                         onClick={handleLogout}
//                         className="w-full justify-start text-destructive border-destructive/20 hover:bg-destructive/5"
//                       >
//                         <LogOut className="h-4 w-4 mr-2" />
//                         Logout
//                       </Button>
//                     </div>
//                   ) : (
//                     <div className="flex flex-col space-y-3">
//                       <Button
//                         variant="outline"
//                         onClick={() => {
//                           navigate("/sign-in");
//                           setIsOpen(false);
//                         }}
//                         className="w-full"
//                       >
//                         Sign In
//                       </Button>
//                       <Button
//                         onClick={() => {
//                           navigate("/sign-up");
//                           setIsOpen(false);
//                         }}
//                         className="w-full"
//                       >
//                         Get Started
//                       </Button>
//                     </div>
//                   )}
//                 </div>
//               </div>
//             </SheetContent>
//           </Sheet>
//         </div>
//       </div>

//       {/* Backdrop for user menu */}
//       {showUserMenu && (
//         <div
//           className="fixed inset-0 z-40 md:hidden"
//           onClick={() => setShowUserMenu(false)}
//         />
//       )}
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
  Users,
  LogOut,
  User,
  ChevronDown,
  Globe,
  CloudSun,
  Bot,
  Hotel,
  Settings,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showHotelsMenu, setShowHotelsMenu] = useState(false);
  const [showAdminMenu, setShowAdminMenu] = useState(false);
  const [mobileHotelsOpen, setMobileHotelsOpen] = useState(false);
  const [mobileAdminOpen, setMobileAdminOpen] = useState(false);

  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const location = useLocation();

  const navigationItems = [
    { name: "Cultural Sites", href: "/culture", icon: Users },
    { name: "Destinations", href: "/destinations", icon: MapPin },
    { name: "Map", href: "/map", icon: Globe },
    { name: "Ask Me", href: "/ask-me", icon: Bot },
    { name: "Weather", href: "/weather", icon: CloudSun },
  ];

  // const isManager = user?.role === "manager" || user?.role === "admin";
  const isManager = user?.role === "manager" 
  const isAdmin = user?.role === "admin";

  const handleLogout = async () => {
    try {
      const result = await logout();
      if (result.success) {
        toast.success("Logged out successfully!");
        navigate("/");
      } else {
        toast.error(result.message || "Failed to logout");
      }
      setShowUserMenu(false);
    } catch (error) {
      toast.error("Failed to logout");
      setShowUserMenu(false);
    }
  };

  const handleNavLinkClick = () => {
    setIsOpen(false);
    setShowHotelsMenu(false);
    setShowAdminMenu(false);
    setMobileHotelsOpen(false);
    setMobileAdminOpen(false);
  };

  return (
    <nav
      className="sticky top-0 z-50 w-full border-b shadow-sm
                bg-gradient-to-r from-green-200 via-teal-100 to-blue-100
                text-gray-800 backdrop-blur supports-[backdrop-filter]:bg-opacity-60"
    >
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link
            onClick={() => {
              navigate("/");
              window.scrollTo(0, 0);
            }}
            to="/"
            className="flex items-center space-x-2 hover:opacity-80 transition-opacity"
          >
            <Mountain className="h-8 w-8 text-primary" />
            <div className="flex flex-col">
              <span className="text-lg font-bold text-foreground">
                Jharkhand
              </span>
              <span className="text-xs text-red">Eco Quest</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.href;

              return (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={handleNavLinkClick}
                  className={`flex items-center space-x-2 text-sm font-medium py-2 px-3 rounded-md transition-colors duration-200
        ${
          isActive
            ? "text-blue-600 bg-gray-200"
            : "text-gray-600 hover:text-blue-600 hover:bg-gray-100"
        }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{item.name}</span>
                </Link>
              );
            })}

            {/* Hotels - Different behavior based on role */}
            {isManager ? (
              // Manager/Admin: Show dropdown with arrow
              <div
                className="relative"
                onMouseEnter={() => setShowHotelsMenu(true)}
                onMouseLeave={() => setShowHotelsMenu(false)}
              >
                <div
                  className={`flex items-center space-x-2 text-sm font-medium py-2 px-3 rounded-md transition-colors duration-200 cursor-default
                    ${
                      location.pathname.startsWith("/hotels")
                        ? "text-blue-600 bg-gray-200"
                        : "text-gray-600 hover:text-blue-600 hover:bg-gray-100"
                    }`}
                >
                  <Hotel className="h-4 w-4" />
                  <span>Hotels</span>
                  <ChevronDown className="h-3 w-3" />
                </div>

                {showHotelsMenu && (
                  <div className="absolute left-0 top-full mt-1 w-56 bg-background border border-border rounded-lg shadow-lg py-2 z-50">
                    <Link
                      to="/hotels"
                      onClick={handleNavLinkClick}
                      className="flex items-center space-x-2 px-4 py-2 text-sm text-foreground hover:bg-muted transition-colors duration-200"
                    >
                      <Hotel className="h-4 w-4" />
                      <span>See Hotels</span>
                    </Link>
                    <Link
                      to="/hotels/my-hotels"
                      onClick={handleNavLinkClick}
                      className="flex items-center space-x-2 px-4 py-2 text-sm text-foreground hover:bg-muted transition-colors duration-200"
                    >
                      <Settings className="h-4 w-4" />
                      <span>Manage My Hotels</span>
                    </Link>
                  </div>
                )}
              </div>
            ) : (
              // Normal user: Simple link without dropdown or arrow
              <Link
                to="/hotels"
                onClick={handleNavLinkClick}
                className={`flex items-center space-x-2 text-sm font-medium py-2 px-3 rounded-md transition-colors duration-200
                  ${
                    location.pathname.startsWith("/hotels")
                      ? "text-blue-600 bg-gray-200"
                      : "text-gray-600 hover:text-blue-600 hover:bg-gray-100"
                  }`}
              >
                <Hotel className="h-4 w-4" />
                <span>Hotels</span>
              </Link>
            )}

            {/* Admin Dropdown */}
            {isAdmin && (
              <div
                className="relative"
                onMouseEnter={() => setShowAdminMenu(true)}
                onMouseLeave={() => setShowAdminMenu(false)}
              >
                <button
                  className={`flex items-center space-x-2 text-sm font-medium py-2 px-3 rounded-md transition-colors duration-200
                    ${
                      location.pathname.startsWith("/admin")
                        ? "text-blue-600 bg-gray-200"
                        : "text-gray-600 hover:text-blue-600 hover:bg-gray-100"
                    }`}
                >
                  <Settings className="h-4 w-4" />
                  <span>Manage</span>
                  <ChevronDown className="h-3 w-3" />
                </button>

                {showAdminMenu && (
                  <div className="absolute left-0 top-full mt-1 w-56 bg-background border border-border rounded-lg shadow-lg py-2 z-50">
                    <Link
                      to="/admin/admin-manage"
                      onClick={handleNavLinkClick}
                      className="flex items-center space-x-2 px-4 py-2 text-sm text-foreground hover:bg-muted transition-colors duration-200"
                    >
                      <Settings className="h-4 w-4" />
                      <span>Admin Manage</span>
                    </Link>
                    <Link
                      to="/admin/role-manage"
                      onClick={handleNavLinkClick}
                      className="flex items-center space-x-2 px-4 py-2 text-sm text-foreground hover:bg-muted transition-colors duration-200"
                    >
                      <Users className="h-4 w-4" />
                      <span>Role Manage</span>
                    </Link>
                  </div>
                )}
              </div>
            )}
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
                    {user.name?.[0]?.toUpperCase() || (
                      <User className="h-4 w-4" />
                    )}
                  </div>
                  <span className="text-sm font-medium text-foreground">
                    {user.name}
                  </span>
                  <ChevronDown
                    className={`h-4 w-4 text-muted-foreground transition-transform duration-200 ${
                      showUserMenu ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {/* User Dropdown Menu */}
                {showUserMenu && (
                  <div className="absolute right-0 top-12 w-56 bg-background border border-border rounded-lg shadow-lg py-2 z-50">
                    <div className="px-3 py-2 border-b border-border">
                      <p className="text-sm font-medium text-foreground">
                        {user.name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {user.email}
                      </p>
                    </div>

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
                  onClick={() => navigate("/sign-in")}
                  className="text-muted-foreground hover:text-foreground"
                >
                  Sign In
                </Button>
                <Button
                  size="sm"
                  onClick={() => navigate("/sign-up")}
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
                    <span className="text-xs text-muted-foreground">
                      Eco Quest
                    </span>
                  </div>
                </div>

                {/* Mobile Navigation */}
                <div className="flex flex-col p-6 space-y-4 overflow-y-auto">
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

                  {/* Mobile Hotels Section */}
                  {isManager ? (
                    // Manager/Admin: Show expandable section
                    <div>
                      <button
                        onClick={() => setMobileHotelsOpen(!mobileHotelsOpen)}
                        className="w-full flex items-center justify-between text-sm font-medium text-muted-foreground hover:text-primary transition-colors py-3 px-2 rounded-md hover:bg-muted/50"
                      >
                        <div className="flex items-center space-x-3">
                          <Hotel className="h-5 w-5" />
                          <span>Hotels</span>
                        </div>
                        <ChevronDown
                          className={`h-4 w-4 transition-transform duration-200 ${
                            mobileHotelsOpen ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                      {mobileHotelsOpen && (
                        <div className="ml-8 mt-2 space-y-2">
                          <Link
                            to="/hotels"
                            onClick={handleNavLinkClick}
                            className="flex items-center space-x-2 text-sm text-muted-foreground hover:text-primary py-2 px-2 rounded-md hover:bg-muted/50"
                          >
                            <Hotel className="h-4 w-4" />
                            <span>See Hotels</span>
                          </Link>
                          <Link
                            to="/hotels/my-hotels"
                            onClick={handleNavLinkClick}
                            className="flex items-center space-x-2 text-sm text-muted-foreground hover:text-primary py-2 px-2 rounded-md hover:bg-muted/50"
                          >
                            <Settings className="h-4 w-4" />
                            <span>Manage My Hotels</span>
                          </Link>
                        </div>
                      )}
                    </div>
                  ) : (
                    // Normal user: Simple link
                    <Link
                      to="/hotels"
                      onClick={handleNavLinkClick}
                      className="flex items-center space-x-3 text-sm font-medium text-muted-foreground hover:text-primary transition-colors py-3 px-2 rounded-md hover:bg-muted/50"
                    >
                      <Hotel className="h-5 w-5" />
                      <span>Hotels</span>
                    </Link>
                  )}

                  {/* Mobile Admin Section */}
                  {isAdmin && (
                    <div>
                      <button
                        onClick={() => setMobileAdminOpen(!mobileAdminOpen)}
                        className="w-full flex items-center justify-between text-sm font-medium text-muted-foreground hover:text-primary transition-colors py-3 px-2 rounded-md hover:bg-muted/50"
                      >
                        <div className="flex items-center space-x-3">
                          <Settings className="h-5 w-5" />
                          <span>Manage</span>
                        </div>
                        <ChevronDown
                          className={`h-4 w-4 transition-transform duration-200 ${
                            mobileAdminOpen ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                      {mobileAdminOpen && (
                        <div className="ml-8 mt-2 space-y-2">
                          <Link
                            to="/admin/admin-manage"
                            onClick={handleNavLinkClick}
                            className="flex items-center space-x-2 text-sm text-muted-foreground hover:text-primary py-2 px-2 rounded-md hover:bg-muted/50"
                          >
                            <Settings className="h-4 w-4" />
                            <span>Admin Manage</span>
                          </Link>
                          <Link
                            to="/admin/role-manage"
                            onClick={handleNavLinkClick}
                            className="flex items-center space-x-2 text-sm text-muted-foreground hover:text-primary py-2 px-2 rounded-md hover:bg-muted/50"
                          >
                            <Users className="h-4 w-4" />
                            <span>Role Manage</span>
                          </Link>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Mobile Auth Section */}
                <div className="mt-auto p-6 border-t border-border">
                  {user ? (
                    <div className="space-y-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 flex justify-center items-center rounded-full bg-primary text-primary-foreground font-medium">
                          {user.name?.[0]?.toUpperCase() || (
                            <User className="h-5 w-5" />
                          )}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-foreground">
                            {user.name}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {user.email}
                          </p>
                        </div>
                      </div>

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
                          navigate("/sign-in");
                          setIsOpen(false);
                        }}
                        className="w-full"
                      >
                        Sign In
                      </Button>
                      <Button
                        onClick={() => {
                          navigate("/sign-up");
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