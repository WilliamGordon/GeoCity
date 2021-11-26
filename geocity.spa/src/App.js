import './App.css';
import {
  BrowserRouter, Routes, Route, Navigate
} from "react-router-dom";
import NavigationBar from './common/components/NavigationBar';
import Discover from './pages/discover/discover' 
import { ItinaryForm } from './pages/itinary-form/ItinaryForm' 
import { ItinaryDesigner } from './pages/itinary-designer/ItinaryDesigner'  
import Login from './pages/login/login' 

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <NavigationBar />
        <Routes>
          <Route exact path="/" element={<Navigate to="/discover" />} />
          <Route exact path="/discover" element={<Discover />} />
          <Route exact path="/itinary-form" element={<ItinaryForm />} />
          <Route exact path="/itinary-designer" element={<ItinaryDesigner />} />
          <Route exact path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App; 
