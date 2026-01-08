import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Assessment from './pages/Assessment';
import Dashboard from './pages/Dashboard';
import Results from './pages/Results';
import Roadmap from './pages/Roadmap';
import './index.css';
import Background3D from './components/Background3D';

function App() {
    return (
        <Router>
            <div className="min-h-screen">
                <Background3D />
                <Navbar />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/assessment" element={<Assessment />} />
                    <Route path="/results" element={<Results />} />
                    <Route path="/roadmap" element={<Roadmap />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
