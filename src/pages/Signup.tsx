import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignupStep1 from '../components/SignupStep1';
import SignupStep2 from '../components/SignupStep2';
import SignupStep3 from '../components/SignupStep3';

const Signup: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignupStep1 />} />
        <Route path="/step2" element={<SignupStep2 />} />
        <Route path="/step3" element={<SignupStep3 />} />
      </Routes>
    </Router>
  );
};

export default Signup;
