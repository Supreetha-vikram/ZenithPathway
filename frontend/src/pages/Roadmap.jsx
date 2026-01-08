import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Lock, PlayCircle, BookOpen, Star, Save, CheckSquare, Square } from 'lucide-react';
import { fetchRoadmap, saveRoadmap } from '../api';

const milestonesData = [
    {
        phase: 'Phase 1: Foundations',
        duration: 'Month 1-2',
        status: 'active', // Default status, logic could check completion
        items: [
            { title: 'Python for Data Science', type: 'course' },
            { title: 'Linear Algebra Refresher', type: 'reading' },
            { title: 'Build basic Neural Net', type: 'project' }
        ]
    },
    {
        phase: 'Phase 2: Advanced Architecture',
        duration: 'Month 3-5',
        status: 'locked',
        items: [
            { title: 'Distributed Systems Patterns', type: 'course' },
            { title: 'Docker & Kubernetes Mastery', type: 'course' },
            { title: 'Design Scalable ML Pipeline', type: 'project' }
        ]
    },
    {
        phase: 'Phase 3: Integration & Ops',
        duration: 'Month 6-8',
        status: 'locked',
        items: [
            { title: 'MLOps Best Practices', type: 'reading' },
            { title: 'Cloud Native AI', type: 'course' }
        ]
    }
];

const Roadmap = () => {
    // Map phase index -> array of completed item indices
    // e.g. { 0: [0, 1], 1: [] }
    const [progress, setProgress] = useState({});
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        loadProgress();
    }, []);

    const loadProgress = async () => {
        try {
            const { data } = await fetchRoadmap();
            console.log('Fetched Roadmap:', data);
            if (data.progress) {
                const progressMap = {};
                data.progress.forEach(p => {
                    progressMap[p.phaseId] = p.completedItems;
                });
                setProgress(progressMap);
            }
        } catch (err) {
            console.error("Failed to load roadmap", err);
        } finally {
            setLoading(false);
        }
    };

    const toggleItem = (phaseIndex, itemIndex) => {
        setProgress(prev => {
            const currentPhaseItems = prev[phaseIndex] || [];
            const isCompleted = currentPhaseItems.includes(itemIndex);
            
            let newPhaseItems;
            if (isCompleted) {
                newPhaseItems = currentPhaseItems.filter(i => i !== itemIndex);
            } else {
                newPhaseItems = [...currentPhaseItems, itemIndex];
            }

            return {
                ...prev,
                [phaseIndex]: newPhaseItems
            };
        });
    };

    const handleSave = async () => {
        setSaving(true);
        try {
            // Convert map back to backend array format
            const progressArray = Object.keys(progress).map(phaseId => ({
                phaseId: parseInt(phaseId),
                completedItems: progress[phaseId]
            }));
            
            await saveRoadmap(progressArray);
            // Optional: Show success toast
        } catch (err) {
            console.error("Failed to save", err);
        } finally {
            setSaving(false);
        }
    };

    const isItemCompleted = (phaseIndex, itemIndex) => {
        return progress[phaseIndex]?.includes(itemIndex);
    };

    return (
        <div className="container" style={{ padding: '8rem 2rem', minHeight: '100vh', position: 'relative' }}>
            <div className="aurora-bg"></div>
            <div className="grid-overlay"></div>
            
            {/* Header */}
            <div className="text-center mb-12">
                <h1 className="text-huge font-black mb-6">Strategic <span className="text-gradient">Blueprints</span></h1>
                <p className="text-xl text-dim" style={{ maxWidth: '600px', margin: '0 auto' }}>
                    Track your professional ascent. Mark milestones as you conquer them.
                </p>
            </div>

            {/* Save Button (Floating or Sticky) */}
            <div style={{ position: 'fixed', bottom: '2rem', right: '2rem', zIndex: 50 }}>
                <button 
                    onClick={handleSave}
                    disabled={saving}
                    className="btn btn-primary"
                    style={{ padding: '1rem 2rem', borderRadius: '50px', display: 'flex', alignItems: 'center', gap: '0.8rem', boxShadow: '0 10px 30px rgba(0,0,0,0.5)' }}
                >
                    <Save size={20} />
                    {saving ? 'Saving...' : 'Save Progress'}
                </button>
            </div>

            <div style={{ maxWidth: '900px', margin: '0 auto', position: 'relative' }}>
                {/* Vertical Line */}
                <div style={{ position: 'absolute', left: '27px', top: 0, bottom: 0, width: '4px', background: 'rgba(255,255,255,0.05)', borderRadius: '10px' }}></div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '4rem' }}>
                    {milestonesData.map((milestone, i) => {
                        const phaseItems = progress[i] || [];
                        const isPhaseComplete = phaseItems.length === milestone.items.length;
                        const isPhaseActive = phaseItems.length > 0 && !isPhaseComplete; // Simplified logic
                        
                        // Status Logic (Visual only for now)
                        let statusColor = '#22c55e'; // default success green
                        if (isPhaseComplete) statusColor = '#22c55e';
                        else if (isPhaseActive) statusColor = 'var(--primary)';
                        else statusColor = 'var(--text-dim)';

                        return (
                            <motion.div 
                                key={i}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.2 }}
                                style={{ position: 'relative', paddingLeft: '6rem' }}
                            >
                                {/* Connector Node */}
                                <div style={{ 
                                    position: 'absolute', left: 0, top: 20, width: '58px', height: '58px', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '5px solid var(--bg-dark)', zIndex: 10,
                                    background: isPhaseComplete ? '#22c55e' : 'rgba(255,255,255,0.05)',
                                    color: 'white',
                                    boxShadow: isPhaseComplete ? '0 0 20px rgba(34,197,94,0.4)' : 'none'
                                 }}>
                                    {isPhaseComplete ? <CheckCircle size={28} /> : 
                                     <span className="font-bold" style={{ fontSize: '1.2rem', color: 'var(--text-dim)' }}>{i + 1}</span>}
                                </div>

                                <div className="glass-card" style={{ padding: '2rem', border: '1px solid var(--glass-border)' }}>
                                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                                        <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>
                                            {milestone.phase}
                                        </h3>
                                        <span style={{ fontSize: '0.9rem', color: 'var(--text-dim)', background: 'rgba(0,0,0,0.3)', padding: '0.25rem 0.75rem', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)' }}>
                                            {milestone.duration}
                                        </span>
                                    </div>

                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                                        {milestone.items.map((item, j) => {
                                            const completed = isItemCompleted(i, j);
                                            return (
                                                <div 
                                                    key={j} 
                                                    onClick={() => toggleItem(i, j)}
                                                    style={{ 
                                                        display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem', borderRadius: '12px', 
                                                        background: completed ? 'rgba(34, 197, 94, 0.05)' : 'rgba(255,255,255,0.03)', 
                                                        border: completed ? '1px solid rgba(34, 197, 94, 0.2)' : '1px solid rgba(255,255,255,0.05)',
                                                        cursor: 'pointer',
                                                        transition: 'all 0.2s ease'
                                                    }}
                                                    className="hover:bg-white/5"
                                                >
                                                    <div style={{ color: completed ? '#4ade80' : 'var(--text-dim)' }}>
                                                        {completed ? <CheckSquare size={24} /> : <Square size={24} />}
                                                    </div>
                                                    
                                                    <div style={{ flex: 1 }}>
                                                        <span style={{ fontSize: '1rem', fontWeight: '500', color: completed ? '#fff' : 'var(--text-dim)', textDecoration: completed ? 'line-through' : 'none', opacity: completed ? 0.8 : 1 }}>
                                                            {item.title}
                                                        </span>
                                                        <div style={{ fontSize: '0.8rem', color: 'var(--text-dim)', opacity: 0.6, marginTop: '2px', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                                                            {item.type === 'course' ? <PlayCircle size={12} /> : item.type === 'reading' ? <BookOpen size={12} /> : <Star size={12} />}
                                                            <span className="uppercase tracking-wider" style={{ fontSize: '0.7rem' }}>{item.type}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default Roadmap;
