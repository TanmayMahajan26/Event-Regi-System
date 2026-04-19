import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import CitySelect from './pages/CitySelect';
import EventsList from './pages/EventsList';
import EventDetail from './pages/EventDetail';
import SeatMap from './pages/SeatMap';
import Booking from './pages/Booking';
import Confirmation from './pages/Confirmation';
import Admin from './pages/Admin';

function App() {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cities" element={<CitySelect />} />
        <Route path="/city/:cityId" element={<EventsList />} />
        <Route path="/event/:eventId" element={<EventDetail />} />
        <Route path="/event/:eventId/seats" element={<SeatMap />} />
        <Route path="/event/:eventId/book" element={<Booking />} />
        <Route path="/confirmation" element={<Confirmation />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </div>
  );
}

export default App;
