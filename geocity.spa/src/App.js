import './App.css';
import {
  BrowserRouter, Routes, Route, Navigate
} from "react-router-dom";
import NavigationBar from './common/components/NavigationBar';
import Discover from './pages/discover/discover' 
import { TripForm } from './pages/trip-form/TripForm' 
import { TripDesigner } from './pages/trip-designer/TripDesigner'  
import { TripsManager } from './pages/trips-manager/TripsManager'  
import TripListOwner from './pages/trips-manager/components/TripListOwner'  
import TripListParticipant from './pages/trips-manager/components/TripListParticipant'  
import TripListFavorite from './pages/trips-manager/components/TripListFavorite'  
import Login from './pages/login/login' 

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <NavigationBar />
        <Routes>
          <Route exact path="/" element={<Navigate to="/discover" />} />
          <Route exact path="/discover" element={<Discover />} />
          <Route exact path="/trip-form" element={<TripForm />} />
          <Route exact path="/trip-designer/:tripId" element={<TripDesigner />} />
          <Route exact path="/trips-manager/owner" element={<TripsManager component={<TripListOwner/>}/>} />
          <Route exact path="/trips-manager/participant" element={<TripsManager component={<TripListParticipant/>}/>} />
          <Route exact path="/trips-manager/favorite" element={<TripsManager component={<TripListFavorite/>}/>} />
          <Route exact path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App; 
