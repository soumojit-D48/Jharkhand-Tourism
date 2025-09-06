// import './App.css'
 
import {Route, Routes} from 'react-router-dom'
import Home from './pages/Home'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import NotFound from './pages/NotFound'
import Destination from './pages/Destination'
import AskMe from './pages/AskMe'
// import AIPage from './pages/AIpage'
import Player from './pages/Player'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import WeatherPage from './pages/WeatherPage'
// import MapPage from './pages/MapPage'
// import Map from './pages/map'
// import MapComponent from './pages/map'
import MapPage from './pages/MapPage'
import CulturalSites from './pages/CulturalSites'

function App() {

  return (
    <div className="relative">
    <Navbar/>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/sign-up' element={<SignUp/>}/>
      <Route path='/sign-in' element={<SignIn/>}/>
      <Route path='/destinations' element={<Destination/>}/>
      <Route path='/ask-me' element={<AskMe/>}/>
      {/* <Route path='/ai' element={<AIPage/>}/> */}
      <Route path='/player/:id' element={<Player/>}/>
      <Route path='/weather' element={<WeatherPage/>}/>
      {/* <Route path='/map' element={<MapPage/>}/> */}
      {/* <Route path='/map' element={<MapComponent/>}/> */}
      {/* <Route path='/mapL' element={<RoutingMap/>}/>  */}
      <Route path='/map' element={<MapPage/>}/>
      <Route path='/culture' element={<CulturalSites/>}/>

      <Route path="*" element={<NotFound />} />
    </Routes>
    <Footer className="absolute bottom-0"/>
    </div>
    
  )
}

export default App
