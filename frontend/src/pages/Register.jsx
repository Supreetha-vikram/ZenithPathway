import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { User, Mail, Lock, ArrowRight } from 'lucide-react';
import { register } from '../api';

const Register = () => {
    const [formData, setFormData] = useState({ name: '', email: '', password: '' });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await register(formData);
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
            <div className="animate-float" style={{ position: 'absolute', bottom: '10%', right: '5%', width: '400px', height: '400px', background: 'var(--accent)', filter: 'blur(120px)', opacity: 0.15, borderRadius: '50%', pointerEvents: 'none' }}></div>

            <motion.div
                initial={{ opacity: 0, y: 40, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="glass-card"
                style={{ padding: '3rem', width: '100%', maxWidth: '600px', position: 'relative', overflow: 'hidden' }}
            >
                <div style={{ position: 'absolute', top: 0, right: 0, width: '100%', height: '4px', background: 'var(--grad-primary)' }}></div>
                <h2 className="font-black mb-4" style={{ fontSize: '3rem', lineHeight: 1 }}>Initialize</h2>
                <p className="text-xl text-dim mb-10">Join the Zenith neural network.</p>

                {error && <div style={{ background: 'rgba(239, 68, 68, 0.1)', color: '#f87171', padding: '1rem', borderRadius: '12px', marginBottom: '2rem', border: '1px solid rgba(239, 68, 68, 0.2)', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <div className="animate-pulse" style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#f87171' }}></div>
                    {error}
                </div>}

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        <label className="text-sm font-bold uppercase text-dim" style={{ letterSpacing: '0.2em', marginLeft: '0.25rem' }}>Identity</label>
                        <div style={{ position: 'relative' }}>
                            <User size={20} style={{ position: 'absolute', left: '1rem', top: '1rem', color: 'var(--text-dim)' }} />
                            <input
                                type="text"
                                required
                                className="input-field"
                                style={{ paddingLeft: '3rem' }}
                                placeholder="John Doe"
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            />
                        </div>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        <label className="text-sm font-bold uppercase text-dim" style={{ letterSpacing: '0.2em', marginLeft: '0.25rem' }}>Email Coordinates</label>
                        <div style={{ position: 'relative' }}>
                            <Mail size={20} style={{ position: 'absolute', left: '1rem', top: '1rem', color: 'var(--text-dim)' }} />
                            <input
                                type="email"
                                required
                                className="input-field"
                                style={{ paddingLeft: '3rem' }}
                                placeholder="name@zenith.ai"
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            />
                        </div>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        <label className="text-sm font-bold uppercase text-dim" style={{ letterSpacing: '0.2em', marginLeft: '0.25rem' }}>Security Token</label>
                        <div style={{ position: 'relative' }}>
                            <Lock size={20} style={{ position: 'absolute', left: '1rem', top: '1rem', color: 'var(--text-dim)' }} />
                            <input
                                type="password"
                                required
                                className="input-field"
                                style={{ paddingLeft: '3rem' }}
                                placeholder="••••••••••••"
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            />
                        </div>
                    </div>

                    <button type="submit" className="btn btn-primary w-full" style={{ width: '100%', marginTop: '1.5rem', fontSize: '1.1rem' }}>
                        Create Account
                        <ArrowRight size={20} />
                    </button>
                </form>

                <p className="text-center text-dim font-medium" style={{ marginTop: '2.5rem' }}>
                    Already authenticated? <Link to="/login" className="text-primary font-bold hover:text-white" style={{ marginLeft: '0.5rem' }}>Access Portal</Link>
                </p>
            </motion.div>
        </div>
    );
};

export default Register;
