import React from 'react';
import { Routes, Route } from 'react-router-dom';
import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import GrainPage from '../components/GrainPage';
import EditProfile from '../pages/EditProfile';


const AuthRoutes = () => {
  return (
   
    <Routes>
      <Route path="/SignIn" element={<SignIn />} />
      <Route path="/SignUp" element={<SignUp />} />
      <Route path="/Sell" element={<GrainPage />} />
      <Route path="/EditProfile" element={<EditProfile />} />
    </Routes>
   
  );
};

export default AuthRoutes;
