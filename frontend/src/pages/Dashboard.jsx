import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Award, RefreshCcw, TrendingUp, Zap, Target, Calendar } from 'lucide-react';
import { getHistory } from '../api';

const Dashboard = () => {
    const [recommendations, setRecommendations] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchHistory();
    }, []);

    const fetchHistory = async () => {
        try {
            const { data } = await getHistory();
            setRecommendations(data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', background: '#02040a' }}>
            <div className="aurora-bg"></div>
            <div className="animate-spin" style={{ width: '50px', height: '50px', border: '3px solid rgba(255,255,255,0.1)', borderTopColor: 'var(--primary)', borderRadius: '50%' }}></div>
        </div>
    );

    // Get the latest recommendation (first item if sorted by date desc)
    const latest = recommendations[0];

    return (
        <div style={{ position: 'relative', minHeight: '100vh', overflowX: 'hidden' }}>
            <div className="aurora-bg"></div>
            <div className="grid-overlay"></div>

            <div className="container" style={{ padding: '8rem 2rem 4rem', position: 'relative', zIndex: 10 }}>
                
                {/* Header */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '4rem', flexWrap: 'wrap', gap: '2rem' }}>
                    <div>
                        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem', padding: '0.5rem 1rem', background: 'rgba(255,255,255,0.05)', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.1)' }}>
                            <Award size={16} className="text-accent" />
                            <span className="text-sm font-bold uppercase tracking-wider text-dim">Command Center</span>
                        </div>
                        <h1 className="text-huge" style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)' }}>
                            Career <span className="text-gradient">Intelligence</span>
                        </h1>
                    </div>
                    
                    <button 
                        onClick={fetchHistory}
                        className="btn btn-secondary"
                        style={{ padding: '0.75rem 1.5rem', fontSize: '0.9rem' }}
                    >
                        <RefreshCcw size={18} /> Refresh Data
                    </button>
                </div>

                {!latest ? (
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="spotlight-card"
                        style={{ padding: '5rem 2rem', textAlign: 'center' }}
                    >
                        <div style={{ width: '80px', height: '80px', background: 'rgba(255,255,255,0.03)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 2rem' }}>
                            <Zap size={32} className="text-dim" />
                        </div>
                        <h2 className="text-2xl font-bold mb-2">Awaiting Assessment Data</h2>
                        <p className="text-dim mb-8">Initialize the neural engine to generate your roadmap.</p>
                        <a href="/assessment" className="btn btn-primary">Start Assessment</a>
                    </motion.div>
                ) : (
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
                        
                        {/* Main Result Card */}
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="spotlight-card"
                            style={{ gridColumn: '1 / -1', padding: '3rem', display: 'flex', flexDirection: 'column', md: { flexDirection: 'row' }, gap: '3rem' }}
                        >
                            <div style={{ flex: 1 }}>
                                <h3 className="text-dim uppercase tracking-widest font-bold text-sm mb-4">Latest Analysis</h3>
                                <h2 className="text-4xl font-black mb-4 flex items-center gap-3">
                                    <span className="text-gradient">{latest.role}</span>
                                </h2>
                                <p className="text-xl text-dim mb-8" style={{ lineHeight: 1.6, maxWidth: '600px' }}>
                                    Your latest assessment identifies this role as your optimal career trajectory based on your current skill matrix.
                                </p>
                                <div style={{ display: 'flex', gap: '1rem' }}>
                                    <a href="/roadmap" className="btn btn-primary">View Blueprint</a>
                                    <a href="/assessment" className="btn btn-secondary">New Assessment</a>
                                </div>
                            </div>
                            
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', minWidth: '250px' }}>
                                <div style={{ padding: '1.5rem', background: 'rgba(255,255,255,0.03)', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)' }}>
                                    <div className="text-dim text-sm uppercase font-bold mb-1">Match Confidence</div>
                                    <div className="text-3xl font-black text-white">{latest.confidence}%</div>
                                </div>
                                <div style={{ padding: '1.5rem', background: 'rgba(255,255,255,0.03)', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)' }}>
                                    <div className="text-dim text-sm uppercase font-bold mb-1">Analysis Date</div>
                                    <div className="text-lg font-bold text-white" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                        <Calendar size={16} className="text-dim" />
                                        {new Date(latest.date).toLocaleDateString()}
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Sub Cards */}
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="spotlight-card"
                            style={{ padding: '2rem' }}
                        >
                            <TrendingUp size={32} className="text-accent mb-4" />
                            <h3 className="text-xl font-bold mb-2">Growth Vector</h3>
                            <p className="text-dim">Your profile shows a positive trend towards <span className="text-white">Senior Engineering</span> roles.</p>
                        </motion.div>

                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="spotlight-card"
                            style={{ padding: '2rem' }}
                        >
                            <Target size={32} className="text-secondary mb-4" />
                            <h3 className="text-xl font-bold mb-2">History Log</h3>
                            <div className="flex flex-col gap-2 mt-4">
                                {recommendations.slice(0, 3).map((rec, i) => (
                                    <div key={i} className="flex justify-between text-sm border-b border-white/5 pb-2 last:border-0 last:pb-0">
                                        <span className="text-white">{rec.role}</span>
                                        <span className="text-dim">{new Date(rec.date).toLocaleDateString()}</span>
                                    </div>
                                ))}
                            </div>
                        </motion.div>

                    </div>
                )}
            </div>
        </div>
    );
};

export default Dashboard;
