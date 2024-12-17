import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Main from './components/Main';
import Footer from './components/Footer';
import HomePage from './components/HomePage';
import AuthRoutes from './auth/AuthRoutes';
import LiveRates from './components/LiveRates';
import Cart from './components/Cart';
import BookFertilizer from './components/BookFertilizer';
import EventsPage from './components/EventsPage';
import Aboutus from './pages/Aboutus';

//import GrainPage from './components/GrainPage';

const AppContent = () => {
  const location = useLocation();

  
  const hideHeaderFooter = location.pathname === '/signin' || location.pathname === '/signup' || location.pathname === '/Sell';

  return (
    <div>
      {!hideHeaderFooter && <Navbar />}
      {!hideHeaderFooter && <Main />}
     
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/Aboutus" element={<Aboutus />} />
        <Route path="/*" element={<AuthRoutes />} />
        <Route path="/LiveRates" element={<LiveRates />} />
        <Route path="/Cart" element={<Cart />} />
        <Route path="/BookFertilizer" element={<BookFertilizer />} />
        <Route path="/Events" element={<EventsPage />} />
       {/* <Route path="/sell" element={<GrainPage />} /> */}
      </Routes>
      
      {!hideHeaderFooter && <Footer />}
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

export default App;
