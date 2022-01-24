import "./App.css";
import { Routes, Route } from "react-router-dom";
import { TripForm } from "./pages/trip-form/TripForm";
import { TripDesigner } from "./pages/trip-designer/TripDesigner";
import { TripsManager } from "./pages/trips-manager/TripsManager";
import NavigationBar from "./common/components/NavigationBar";
import Discover from "./pages/discover/discover";
import Profile from "./pages/profile/Profile";
import TripListOwner from "./pages/trips-manager/components/TripListOwner";
import TripListParticipant from "./pages/trips-manager/components/TripListParticipant";
import TripListFavorite from "./pages/trips-manager/components/TripListFavorite";

function App() {
  return (
    <div className="App">
      <NavigationBar />
      <Routes>
        <Route exact path="/discover" element={<Discover />} />
        <Route exact path="/profile" element={<Profile />} />
        <Route exact path="/trip-form" element={<TripForm />} />
        <Route exact path="/trip-designer/:tripId" element={<TripDesigner />} />
        <Route
          exact
          path="/trips-manager/owner"
          element={<TripsManager component={<TripListOwner />} />}
        />
        <Route
          exact
          path="/trips-manager/participant"
          element={<TripsManager component={<TripListParticipant />} />}
        />
        <Route
          exact
          path="/trips-manager/favorite"
          element={<TripsManager component={<TripListFavorite />} />}
        />
      </Routes>
    </div>
  );
}

export default App;
