import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Briefcase, LogOut } from 'lucide-react';

const Navbar = () => {
    const navigate = useNavigate();
    const isAuthenticated = !!localStorage.getItem('token');

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/login');
    };

    return (
        <nav className="navbar">
            <div className="container flex justify-between items-center h-full">
                <Link to="/" className="flex items-center gap-2 text-2xl font-black" style={{ letterSpacing: '-0.03em' }}>
                    <div style={{ background: 'var(--grad-primary)', padding: '6px', borderRadius: '10px', display: 'flex' }}>
                         <Briefcase className="text-white" size={24} />
                    </div>
                    <span>Zenith<span className="text-primary">Pathway</span></span>
                </Link>

                <div className="flex items-center gap-8">
                    {isAuthenticated ? (
                        <>
                            <Link to="/assessment" className="nav-link">Assessment</Link>
                            <Link to="/roadmap" className="nav-link">Roadmap</Link>
                            <Link to="/dashboard" className="nav-link">Dashboard</Link>
                            <button
                                onClick={handleLogout}
                                className="flex items-center gap-2"
                                style={{ background: 'transparent', border: '1px solid var(--glass-border)', padding: '0.5rem 1.2rem', borderRadius: '30px', color: 'var(--text-dim)', cursor: 'pointer', fontSize: '0.9rem', fontWeight: 'bold' }}
                            >
                                <LogOut size={16} /> Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link to="/" className="nav-link">Home</Link>
                            <Link to="/login" className="nav-link">Sign In</Link>
                            <Link to="/register" className="btn btn-primary" style={{ padding: '0.6rem 1.5rem', fontSize: '0.9rem' }}>
                                Get Started
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
