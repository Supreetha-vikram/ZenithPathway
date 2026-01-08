import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Brain, Cpu, Globe, Rocket, ShieldCheck, Zap } from 'lucide-react';

import TypewriterText from '../components/TypewriterText';

const Home = () => {
    return (
        <div style={{ position: 'relative', overflowX: 'hidden', minHeight: '100vh', width: '100%' }}>
            {/* Dynamic Background */}
            <div className="aurora-bg"></div>
            <div className="grid-overlay"></div>
            
            <div className="container" style={{ position: 'relative', zIndex: 10, paddingTop: '8rem', paddingBottom: '4rem' }}>
                
                {/* Hero Section */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', alignItems: 'center', gap: '4rem', minHeight: '70vh' }}>
                    
                    {/* Hero Content */}
                    <motion.div 
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, type: "spring" }}
                    >
                        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1rem', background: 'rgba(255,255,255,0.05)', borderRadius: '50px', border: '1px solid rgba(255,255,255,0.1)', marginBottom: '3rem' }}>
                            <span className="animate-pulse" style={{ width: '8px', height: '8px', background: '#22c55e', borderRadius: '50%', boxShadow: '0 0 10px #22c55e' }}></span>
                            <span className="text-sm font-bold uppercase tracking-widest text-dim">System Online</span>
                        </div>
                        
                        <h1 className="text-hero mb-8" style={{ lineHeight: 1.1 }}>
                            <TypewriterText text="Unlock Your" hideCursorOnComplete={true} /> <br/>
                            <span className="text-gradient">
                                <TypewriterText text="Cybernetic Potential" delay={100} startDelay={1400} />
                            </span>
                        </h1>
                        
                        <p className="text-lg text-dim tracking-wide" style={{ maxWidth: '550px', lineHeight: 1.8, borderLeft: '3px solid var(--primary)', paddingLeft: '1.5rem', marginBottom: '5rem' }}>
                            The world's most advanced AI-driven career architect. Analyze your neural patterns, align with market vectors, and execute your professional ascent.
                        </p>
                        
                        <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                            <Link to="/assessment" className="btn btn-primary" style={{ padding: '1rem 2.5rem', fontSize: '1rem', borderRadius: '50px' }}>
                                Initialize Sequence <ArrowRight size={18} />
                            </Link>
                            <Link to="/dashboard" className="btn btn-secondary" style={{ padding: '1rem 2rem', fontSize: '1rem', borderRadius: '50px' }}>
                                Access Database
                            </Link>
                        </div>
                    </motion.div>

                    {/* Hero Visual (Floating Cards) */}
                    <div style={{ position: 'relative', height: '500px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <motion.div 
                            animate={{ y: [0, -20, 0] }}
                            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                            className="glass-card"
                            style={{ position: 'absolute', top: '10%', right: '10%', padding: '2rem', width: '280px', zIndex: 2 }}
                        >
                            <Brain size={40} className="text-accent mb-4" />
                            <h3 className="text-lg font-bold">Neural Analysis</h3>
                            <div style={{ height: '4px', background: 'rgba(255,255,255,0.1)', marginTop: '1rem', borderRadius: '2px' }}>
                                <div style={{ width: '75%', height: '100%', background: 'var(--accent)', borderRadius: '2px' }}></div>
                            </div>
                        </motion.div>

                        <motion.div 
                            animate={{ y: [0, 30, 0] }}
                            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                            className="glass-card"
                            style={{ position: 'absolute', bottom: '15%', left: '5%', padding: '2rem', width: '260px', zIndex: 3, background: 'rgba(139, 92, 246, 0.2)', border: '1px solid rgba(139, 92, 246, 0.4)' }}
                        >
                            <Rocket size={40} className="text-primary mb-4" />
                            <h3 className="text-lg font-bold">Velocity Metrics</h3>
                            <div className="text-2xl font-black mt-2">+420%</div>
                        </motion.div>

                        {/* Central Glow */}
                        <div style={{ width: '400px', height: '400px', background: 'radial-gradient(circle, rgba(139,92,246,0.2) 0%, transparent 70%)', borderRadius: '50%', filter: 'blur(40px)', position: 'absolute' }}></div>
                    </div>
                </div>

                {/* Features Grid */}
                <div style={{ marginTop: '20rem' }}>
                    <div style={{ textAlign: 'center', marginBottom: '8rem' }}>
                        <h2 className="text-huge font-black mb-6"><span className="text-gradient">Core Modules</span></h2>
                        <p className="text-xl text-dim">Advanced capabilities for the modern engineer.</p>
                    </div>
                    
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
                        {[
                            { icon: Cpu, title: 'Skill Quantification', desc: 'Precision measurement of technical and cognitive aptitudes.' },
                            { icon: Globe, title: 'Global Market Sync', desc: 'Real-time alignment with standard industry demands.' },
                            { icon: ShieldCheck, title: 'Future-Proofing', desc: 'Predictive analysis to secure long-term relevance.' }
                        ].map((item, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.2 }}
                                className="glass-card"
                                style={{ padding: '3rem', transition: 'all 0.4s' }}
                            >
                                <div style={{ width: '60px', height: '60px', borderRadius: '20px', background: 'rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem', border: '1px solid rgba(255,255,255,0.1)' }}>
                                    <item.icon size={30} className="text-white" />
                                </div>
                                <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
                                <p className="text-dim text-lg leading-relaxed">{item.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Home;
