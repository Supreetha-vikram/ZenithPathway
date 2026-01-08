import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock, ArrowRight } from 'lucide-react';
import { login } from '../api';

const Login = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await login(formData);
            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data.user));
            navigate('/assessment');
        } catch (err) {
            setError(err.response?.data?.message || 'Something went wrong');
        }
    };

    return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 'calc(100vh - var(--nav-height))', position: 'relative', overflow: 'hidden' }}>
            <div className="aurora-bg"></div>
            <div className="grid-overlay"></div>
            <div className="animate-float" style={{ position: 'absolute', top: '20%', left: '10%', width: '300px', height: '300px', background: 'var(--primary)', filter: 'blur(120px)', opacity: 0.2, borderRadius: '50%', pointerEvents: 'none' }}></div>
            
            <motion.div
                initial={{ opacity: 0, y: 40, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="glass-card"
                style={{ 
                    padding: '4rem 3rem', 
                    width: '100%', 
                    maxWidth: '500px', 
                    position: 'relative', 
                    overflow: 'hidden',
                    background: 'rgba(20, 5, 10, 0.4)', // Slightly darker glass
                    border: '1px solid rgba(255, 0, 127, 0.2)',
                    boxShadow: '0 0 40px rgba(0, 0, 0, 0.5), inset 0 0 20px rgba(255, 0, 127, 0.05)'
                }}
            >
                {/* Decorative Top Line */}
                <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: '30%', height: '2px', background: 'var(--primary)', boxShadow: '0 0 10px var(--primary)' }}></div>
                
                <div className="text-center mb-8">
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem', padding: '0.25rem 0.75rem', borderRadius: '50px', background: 'rgba(255, 0, 127, 0.1)', border: '1px solid rgba(255, 0, 127, 0.2)' }}>
                        <span className="animate-pulse" style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--primary)' }}></span>
                        <span className="text-sm font-bold uppercase tracking-widest text-primary" style={{ fontSize: '0.7rem' }}>Secure Access</span>
                    </div>

                    <h2 className="font-black mb-2" style={{ fontSize: '2.5rem', lineHeight: 1 }}>Login</h2>
                    <p className="text-dim">Enter credentials to initialize session.</p>
                </div>

                {error && <div style={{ background: 'rgba(239, 68, 68, 0.1)', color: '#f87171', padding: '0.75rem', borderRadius: '8px', marginBottom: '2rem', border: '1px solid rgba(239, 68, 68, 0.2)', fontSize: '0.9rem', textAlign: 'center' }}>
                    {error}
                </div>}

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        <label className="text-sm font-bold uppercase text-dim" style={{ fontSize: '0.75rem', letterSpacing: '0.1em', marginLeft: '0.25rem' }}>Email Coordinates</label>
                        <div style={{ position: 'relative' }}>
                            <Mail size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--primary)' }} />
                            <input
                                type="email"
                                required
                                className="input-field"
                                style={{ paddingLeft: '3rem', background: 'rgba(0,0,0,0.2)', borderColor: 'rgba(255,255,255,0.1)' }}
                                placeholder="name@zenith.ai"
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            />
                        </div>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        <label className="text-sm font-bold uppercase text-dim" style={{ fontSize: '0.75rem', letterSpacing: '0.1em', marginLeft: '0.25rem' }}>Access Key</label>
                        <div style={{ position: 'relative' }}>
                            <Lock size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--primary)' }} />
                            <input
                                type="password"
                                required
                                className="input-field"
                                style={{ paddingLeft: '3rem', background: 'rgba(0,0,0,0.2)', borderColor: 'rgba(255,255,255,0.1)' }}
                                placeholder="••••••••••••"
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            />
                        </div>
                    </div>

                    <button type="submit" className="btn btn-primary w-full" style={{ width: '100%', marginTop: '1.5rem' }}>
                        Authenticate
                    </button>
                </form>

                <div className="text-center mt-8">
                    <p className="text-dim text-sm">
                        New entity? <Link to="/register" className="text-primary font-bold hover:text-white transition-colors" style={{ marginLeft: '0.5rem' }}>Initialize Protocol</Link>
                    </p>
                </div>
            </motion.div>
        </div>
    );
};

export default Login;
