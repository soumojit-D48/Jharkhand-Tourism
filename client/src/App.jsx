// // import './App.css'

import { Route, Routes } from "react-router-dom";
import { Toaster } from "sonner"; // Import Toaster for notifications
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import NotFound from "./pages/NotFound";
import Destination from "./pages/Destination";
import AskMe from "./pages/AskMe";
import Player from "./pages/Player";
// import WeatherPage from './pages/WeatherPage';
import MapPage from "./pages/Map";
import CulturalSites from "./pages/CulturalSites";
import ForgotPassword from "./pages/ForgotPassword";
import WeatherForcast from "./pages/WeatherForcast";

import Layout from "./components/layout/LayoutComp";
import ProtectedRoute from "./components/layout/ProtectRoute";
import PublicRoute from "./components/layout/PublicRoute";
import HotelRoomCreation from "./pages/CreateHotel";
import AddMultipleRooms from "./pages/AddRooms";
import { AdminManagement } from "./pages/AdminManage";
import { RoleManagement } from "./pages/RoleManage";
import ManageMyHotels from "./pages/ManageMyHotels";
import EditHotel from "./pages/UpdateHotel";
import EditRoom from "./pages/UpdateRoom";
import HotelDetails from "./pages/HotelDetails";
import RoomDetails from "./pages/RoomDetails";
import AllHotels from "./pages/AllHotels";
import Unauthorized from "./components/layout/UnAuthorize";

function App() {
  return (
    <div className="relative">
      <Routes>
        {/* Public Routes - Available to non-authenticated users only */}
        <Route
          path="/sign-in"
          element={
            <PublicRoute>
              <Layout showNavFooter={false}>
                <SignIn />
              </Layout>
            </PublicRoute>
          }
        />
        <Route
          path="/sign-up"
          element={
            <PublicRoute>
              <Layout showNavFooter={false}>
                <SignUp />
              </Layout>
            </PublicRoute>
          }
        />
        <Route
          path="/forgot-password"
          element={
            <PublicRoute>
              <Layout showNavFooter={false}>
                <ForgotPassword />
              </Layout>
            </PublicRoute>
          }
        />

        <Route
          path="/"
          element={
            // <ProtectedRoute>
            <Layout>
              <Home />
            </Layout>
            // </ProtectedRoute>
          }
        />
        <Route
          path="/destinations"
          element={
            <ProtectedRoute>
              <Layout>
                <Destination />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/ask-me"
          element={
            <ProtectedRoute>
              <Layout>
                <AskMe />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/player/:id"
          element={
            <ProtectedRoute>
              <Layout>
                <Player />
              </Layout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/map"
          element={
            <ProtectedRoute>
              <Layout>
                <MapPage />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/culture"
          element={
            <ProtectedRoute>
              <Layout>
                <CulturalSites />
              </Layout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/weather"
          element={
            <ProtectedRoute>
              <Layout>
                <WeatherForcast />
              </Layout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/manager/hotels/create"
          element={
            <ProtectedRoute allowedRoles={["manager", "admin"]}>
              <Layout>
                <HotelRoomCreation />
              </Layout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/manager/hotels/:hotelId/add-rooms"
          element={
            <ProtectedRoute allowedRoles={["manager", "admin"]}>
              <Layout>
                <AddMultipleRooms />
              </Layout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/hotels/my-hotels"
          element={
            <ProtectedRoute allowedRoles={["manager", "admin"]}>
              <Layout>
                <ManageMyHotels />
              </Layout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/manager/hotels/:hotelId/edit"
          element={
            <ProtectedRoute allowedRoles={["manager", "admin"]}>
              <Layout>
                <EditHotel />
              </Layout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/manager/rooms/:roomId/edit"
          element={
            <ProtectedRoute allowedRoles={["manager", "admin"]}>
              <Layout>
                <EditRoom />
              </Layout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/hotels/:hotelId"
          element={
            <ProtectedRoute>
              <Layout>
                <HotelDetails />
              </Layout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/hotels/room/:roomId"
          element={
            <ProtectedRoute>
              <Layout>
                <RoomDetails />
              </Layout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/hotels"
          element={
            <ProtectedRoute>
              <Layout>
                <AllHotels />
              </Layout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/admin-manage"
          element={
            <ProtectedRoute>
              <Layout>
                <AdminManagement />
              </Layout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/role-manage"
          element={
            <ProtectedRoute>
              <Layout>
                <RoleManagement />
              </Layout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/unauthorized"
          element={
            <Layout>
              <Unauthorized />
            </Layout>
          }
        />

        {/* 404 Route */}
        <Route
          path="*"
          element={
            <Layout>
              <NotFound />
            </Layout>
          }
        />
      </Routes>

      {/* Toast notifications */}
      <Toaster position="top-right" richColors />
    </div>
  );
}

export default App;

// import {Route, Routes} from 'react-router-dom'
// import Home from './pages/Home'
// import SignIn from './pages/SignIn'
// import SignUp from './pages/SignUp'
// import NotFound from './pages/NotFound'
// import Destination from './pages/Destination'
// import AskMe from './pages/AskMe'
// // import AIPage from './pages/AIpage'
// import Player from './pages/Player'
// import Navbar from './components/Navbar'
// import Footer from './components/Footer'
// import WeatherPage from './pages/WeatherPage'
// // import MapPage from './pages/MapPage'
// // import Map from './pages/map'
// // import MapComponent from './pages/map'
// import MapPage from './pages/MapPage'
// import CulturalSites from './pages/CulturalSites'
// import ForgotPassword from './pages/ForgotPassword'

// function App() {

//   return (
//     <div className="relative">
//     {/* <Navbar/> */}
//     <Routes>
//       <Route path='/' element={<Home/>}/>
//       <Route path='/sign-up' element={<SignUp/>}/>
//       <Route path='/sign-in' element={<SignIn/>}/>
//       <Route path='/destinations' element={<Destination/>}/>
//       <Route path='/ask-me' element={<AskMe/>}/>
//       {/* <Route path='/ai' element={<AIPage/>}/> */}
//       <Route path='/player/:id' element={<Player/>}/>
//       <Route path='/weather' element={<WeatherPage/>}/>
//       {/* <Route path='/map' element={<MapPage/>}/> */}
//       {/* <Route path='/map' element={<MapComponent/>}/> */}
//       {/* <Route path='/mapL' element={<RoutingMap/>}/>  */}
//       <Route path='/map' element={<MapPage/>}/>
//       <Route path='/culture' element={<CulturalSites/>}/>
//       <Route path="/forgot-password" element={<ForgotPassword />} />

//       <Route path="*" element={<NotFound />} />
//     </Routes>
//     {/* <Footer className="absolute bottom-0"/> */}
//     </div>

//   )
// }

// export default App

// import { Route, Routes } from 'react-router-dom'
// import { Toaster } from 'sonner'

// // Import pages
// import Home from './pages/Home'
// import SignIn from './pages/SignIn'
// import SignUp from './pages/SignUp'
// import NotFound from './pages/NotFound'
// import Destination from './pages/Destination'
// import AskMe from './pages/AskMe'
// import Player from './pages/Player'
// import WeatherPage from './pages/WeatherPage'
// import MapPage from './pages/MapPage'
// import CulturalSites from './pages/CulturalSites'
// import ForgotPassword from './pages/ForgotPassword'

// // Import components
// import Navbar from './components/Navbar'
// import Footer from './components/Footer'

// // Import route protection components
// import { ProtectedRoute, PublicRoute, ConditionalRoute } from './components/layout/ProtectedRoutes'

// function App() {
//   return (
//     <div className="relative min-h-screen flex flex-col">
//       {/* Navbar shows conditionally */}
//       <ConditionalRoute
//         fallback={
//           // Show navbar for public pages too, but it will show login/signup buttons
//           <Navbar />
//         }
//       >
//         <Navbar />
//       </ConditionalRoute>

//       {/* Main content area */}
//       <main className="flex-1">
//         <Routes>
//           {/* Public routes - accessible to everyone */}
//           <Route path='/' element={<Home />} />

//           {/* Auth routes - redirect authenticated users away */}
//           <Route path='/sign-up' element={
//             <PublicRoute>
//               <SignUp />
//             </PublicRoute>
//           } />
//           <Route path='/sign-in' element={
//             <PublicRoute>
//               <SignIn />
//             </PublicRoute>
//           } />
//           <Route path="/forgot-password" element={
//             <PublicRoute>
//               <ForgotPassword />
//             </PublicRoute>
//           } />

//           {/* Protected routes - require authentication */}
//           <Route path='/destinations' element={
//             <ProtectedRoute>
//               <Destination />
//             </ProtectedRoute>
//           } />
//           <Route path='/ask-me' element={
//             <ProtectedRoute>
//               <AskMe />
//             </ProtectedRoute>
//           } />
//           <Route path='/player/:id' element={
//             <ProtectedRoute>
//               <Player />
//             </ProtectedRoute>
//           } />
//           <Route path='/weather' element={
//             <ProtectedRoute>
//               <WeatherPage />
//             </ProtectedRoute>
//           } />
//           <Route path='/map' element={
//             <ProtectedRoute>
//               <MapPage />
//             </ProtectedRoute>
//           } />
//           <Route path='/culture' element={
//             <ProtectedRoute>
//               <CulturalSites />
//             </ProtectedRoute>
//           } />

//           {/* 404 route */}
//           <Route path="*" element={<NotFound />} />
//         </Routes>
//       </main>

//       <Footer />

//       {/* Toast notifications */}
//       <Toaster
//         position="top-right"
//         richColors
//         closeButton
//         duration={4000}
//       />
//     </div>
//   )
// }

// export default App
