import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { CheckCircle, ArrowRight, TrendingUp, Unlock, Shield, Target, Award, BookOpen, Share2 } from 'lucide-react';

const Results = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const results = location.state?.results;

    const [revealed, setRevealed] = useState(false);

    useEffect(() => {
        if (!results) {
            navigate('/assessment');
            return;
        }
        const timer = setTimeout(() => setRevealed(true), 500);
        return () => clearTimeout(timer);
    }, [results, navigate]);

    if (!results) return null;

    const { role, description, confidence, roadmap } = results;

    // Use fallbacks in case roadmap item structure differs slightly from expectation
    const sanitizedRoadmap = (roadmap || []).map((step, i) => ({
        ...step,
        // Backend returns { title, status, desc, duration }
        // Frontend V3 UI expects { title, subtitle, status, id } or similar
        // Let's adapt:
        id: i + 1,
        subtitle: step.desc || step.subtitle || 'Milestone',
        status: step.status || (i === 0 ? 'completed' : i === 1 ? 'in-progress' : 'locked')
    }));

    return (
        <div className="container" style={{ padding: '8rem 2rem', minHeight: '100vh' }}>
             <div className="aurora-bg"></div>
             <div className="grid-overlay"></div>

             {!revealed ? (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '60vh' }}>
                     <div className="animate-spin" style={{ width: '6rem', height: '6rem', borderRadius: '50%', border: '4px solid var(--primary)', borderTopColor: 'transparent' }}></div>
                     <h2 style={{ marginTop: '2rem', fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--primary)' }}>Computing Career Trajectory...</h2>
                </div>
             ) : (
                <motion.div 
                    initial={{ opacity: 0 }} 
                    animate={{ opacity: 1 }} 
                    style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 10 }}
                >
                    <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
                         <motion.div 
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.8, type: "spring" }}
                            style={{ display: 'inline-block' }}
                         >
                             <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem', padding: '0.5rem 1.5rem', background: 'rgba(16, 185, 129, 0.1)', borderRadius: '50px', border: '1px solid rgba(16, 185, 129, 0.2)', color: '#10b981', fontWeight: 'bold' }}>
                                <Award size={18} /> Analysis Complete
                            </div>
                             <h1 className="text-huge font-black" style={{ marginBottom: '1.5rem', lineHeight: 1 }}>
                                 <span className="text-gradient">{role}</span>
                             </h1>
                         </motion.div>
                         
                         <motion.p 
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.4 }}
                            className="text-2xl text-dim"
                            style={{ maxWidth: '800px', margin: '0 auto', lineHeight: '1.6' }}
                         >
                             {description}
                         </motion.p>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', marginBottom: '3rem' }}>
                        {/* Confidence Score */}
                        <motion.div 
                            initial={{ x: -30, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: 0.6 }}
                            className="spotlight-card"
                            style={{ padding: '2rem', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}
                        >
                             <div>
                                 <div style={{ fontSize: '5rem', fontWeight: '900', color: 'white', marginBottom: '0.5rem', lineHeight: 1 }}>{confidence}%</div>
                                 <div className="text-sm text-dim uppercase font-bold" style={{ letterSpacing: '0.1em' }}>Match Confidence</div>
                             </div>
                        </motion.div>

                        {/* Market Demand */}
                        <motion.div 
                            initial={{ x: 30, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: 0.7 }}
                            className="spotlight-card"
                            style={{ padding: '2rem' }}
                        >
                            <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                <TrendingUp className="text-accent" />
                                <span>Market Velocity</span>
                            </h3>
                            <p className="text-xl text-dim">This role is in <span className="text-white font-bold">High Demand</span> with an estimated 25% YoY growth.</p>
                        </motion.div>
                    </div>

                    {/* Timeline Preview */}
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.9 }}
                         className="spotlight-card"
                         style={{ padding: '2.5rem' }}
                    >
                         <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem' }}>
                             <h3 style={{ fontSize: '2rem', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                 <BookOpen className="text-primary" /> Generated Curriculum
                             </h3>
                             <Link to="/roadmap" className="btn btn-primary">
                                 View Blueprint <ArrowRight size={18} />
                             </Link>
                         </div>
                         
                         <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
                             {sanitizedRoadmap.map((step, i) => (
                                 <div key={i} style={{ padding: '1.5rem', background: 'rgba(255,255,255,0.02)', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)', transition: 'all 0.3s' }}>
                                     <div style={{ width: '40px', height: '40px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem', background: step.status === 'completed' ? 'rgba(34,197,94,0.1)' : step.status === 'in-progress' ? 'rgba(139,92,246,0.1)' : 'rgba(255,255,255,0.05)', color: step.status === 'completed' ? '#4ade80' : step.status === 'in-progress' ? '#8b5cf6' : '#64748b' }}>
                                         {step.status === 'completed' && <CheckCircle size={20} />}
                                         {step.status === 'in-progress' && <TrendingUp size={20} />}
                                         {step.status === 'locked' && <Unlock size={20} />}
                                     </div>
                                     <div className="text-sm text-dim font-bold uppercase" style={{ letterSpacing: '0.05em', marginBottom: '0.5rem' }}>Phase 0{i + 1}</div>
                                     <h4 style={{ fontSize: '1.1rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>{step.title}</h4>
                                     <p className="text-sm text-dim">{step.subtitle}</p>
                                 </div>
                             ))}
                         </div>
                    </motion.div>
                </motion.div>
             )}
        </div>
    );
};

export default Results;
