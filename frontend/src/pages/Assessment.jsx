import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Code, Brain, Heart, Layers, ArrowRight, ArrowLeft, Loader2 } from 'lucide-react';
import { submitAssessment } from '../api';

const Assessment = () => {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        technical: '',
        soft: '',
        interests: '',
        experience: 'Beginner'
    });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleNext = () => setStep(step + 1);
    const handleBack = () => setStep(step - 1);

    const handleSubmit = async () => {
        setLoading(true);
        try {
            const technicalArray = formData.technical.split(',').map(s => s.trim()).filter(s => s);
            const softArray = formData.soft.split(',').map(s => s.trim()).filter(s => s);
            const interestsArray = formData.interests.split(',').map(s => s.trim()).filter(s => s);

            const { data } = await submitAssessment({
                technical: technicalArray,
                soft: softArray,
                interests: interestsArray,
                experience: formData.experience
            });
            navigate('/results', { state: { results: data } });
        } catch (err) {
            console.error(err);
            alert('Error submitting assessment');
        } finally {
            setLoading(false);
        }
    };

    const steps = [
        {
            id: 1,
            title: 'Technical Skills',
            desc: 'Enter your tech stack (e.g. React, Python, Java)',
            icon: Code,
            field: 'technical',
            placeholder: 'e.g. JavaScript, Python, SQL, AWS...'
        },
        {
            id: 2,
            title: 'Soft Skills',
            desc: 'What are your personality & teamwork strengths?',
            icon: Brain,
            field: 'soft',
            placeholder: 'e.g. Communication, Problem Solving, Leadership, Time Management...'
        },
        {
            id: 3,
            title: 'Career Interests',
            desc: 'What fields or domains excite you?',
            icon: Heart,
            field: 'interests',
            placeholder: 'e.g. Artificial Intelligence, Web Development, Fintech, Healthcare...'
        },
        {
            id: 4,
            title: 'Experience Level',
            desc: 'How would you describe your overall expertise?',
            icon: Layers,
            field: 'experience',
            isRadio: true
        }
    ];

    const currentStep = steps[step - 1];

    return (
        <div style={{ minHeight: '100vh', position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
            <div className="aurora-bg"></div>
            <div className="grid-overlay"></div>
            
            <div className="container" style={{ paddingTop: '8rem', paddingBottom: '4rem', position: 'relative', zIndex: 10, flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                
                <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem', padding: '0.5rem 1rem', background: 'rgba(255,255,255,0.05)', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.1)' }}>
                        <Brain size={16} className="text-primary" />
                        <span className="text-sm font-bold uppercase tracking-wider text-dim">Neural Uplink Active</span>
                    </div>
                    <h1 className="text-huge font-black mb-4">
                        Phase <span className="text-gradient">0{step}</span>
                    </h1>
                    <div style={{ width: '100%', maxWidth: '400px', height: '4px', background: 'rgba(255,255,255,0.1)', margin: '0 auto', borderRadius: '2px', overflow: 'hidden' }}>
                        <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: `${(step / steps.length) * 100}%` }}
                            transition={{ duration: 0.5 }}
                            style={{ height: '100%', background: 'var(--grad-primary)' }}
                        ></motion.div>
                    </div>
                </div>

                <motion.div
                    key={step}
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: -20 }}
                    transition={{ duration: 0.4 }}
                    className="glass-card"
                    style={{ padding: '4rem', maxWidth: '800px', margin: '0 auto', width: '100%', border: '1px solid rgba(255,255,255,0.1)' }}
                >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', marginBottom: '3rem' }}>
                        <div style={{ padding: '1.5rem', background: 'rgba(139,92,246,0.1)', borderRadius: '16px', color: 'var(--primary)', border: '1px solid rgba(139,92,246,0.2)' }}>
                            <currentStep.icon size={32} />
                        </div>
                        <div>
                            <h2 className="text-3xl font-bold mb-1">{currentStep.title}</h2>
                            <p className="text-dim text-lg">{currentStep.desc}</p>
                        </div>
                    </div>

                    <div style={{ marginBottom: '3rem' }}>
                        {currentStep.isRadio ? (
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
                                {['Beginner', 'Intermediate', 'Expert'].map(level => (
                                    <button
                                        key={level}
                                        onClick={() => setFormData({ ...formData, experience: level })}
                                        className="spotlight-card"
                                        style={{ 
                                            padding: '2rem', 
                                            textAlign: 'center', 
                                            fontSize: '1.25rem', 
                                            fontWeight: 'bold', 
                                            transition: 'all 0.3s',
                                            background: formData.experience === level ? 'rgba(139,92,246,0.2)' : 'rgba(255,255,255,0.03)',
                                            borderColor: formData.experience === level ? 'var(--primary)' : 'transparent',
                                            color: formData.experience === level ? 'white' : 'var(--text-dim)',
                                            outline: 'none'
                                        }}
                                    >
                                        <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>
                                            {level === 'Beginner' ? '🌱' : level === 'Intermediate' ? '🚀' : '⚡'}
                                        </div>
                                        {level}
                                    </button>
                                ))}
                            </div>
                        ) : (
                            <div style={{ position: 'relative' }}>
                                <div style={{ position: 'absolute', top: '-10px', left: '20px', background: '#0f172a', padding: '0 10px', fontSize: '0.85rem', color: 'var(--primary)', fontWeight: 'bold' }}>
                                    Input Stream
                                </div>
                                <textarea
                                    className="input-field"
                                    style={{ 
                                        width: '100%', 
                                        height: '200px', 
                                        fontSize: '1.1rem', 
                                        padding: '2rem', 
                                        background: 'rgba(0,0,0,0.3)', 
                                        border: '1px solid rgba(255,255,255,0.1)', 
                                        resize: 'none',
                                        fontFamily: 'monospace',
                                        lineHeight: '1.6'
                                    }}
                                    placeholder={currentStep.placeholder}
                                    value={formData[currentStep.field]}
                                    onChange={(e) => setFormData({ ...formData, [currentStep.field]: e.target.value })}
                                />
                            </div>
                        )}
                    </div>

                    <div className="flex justify-between items-center">
                        <button 
                            onClick={handleBack} 
                            style={{ 
                                opacity: step > 1 ? 1 : 0, 
                                pointerEvents: step > 1 ? 'auto' : 'none',
                                display: 'flex', alignItems: 'center', gap: '0.5rem',
                                color: 'var(--text-dim)', background: 'transparent', border: 'none', fontSize: '1.1rem', cursor: 'pointer', transition: 'color 0.2s'
                            }}
                            className="hover:text-white"
                        >
                            <ArrowLeft size={20} /> Back
                        </button>

                        {step < steps.length ? (
                            <button onClick={handleNext} className="btn btn-primary" style={{ padding: '1rem 3rem' }}>
                                Next Phase <ArrowRight size={20} />
                            </button>
                        ) : (
                            <button
                                onClick={handleSubmit}
                                disabled={loading || !formData.technical}
                                className="btn btn-primary"
                                style={{ padding: '1rem 4rem', opacity: loading ? 0.7 : 1 }}
                            >
                                {loading ? <Loader2 className="animate-spin" size={24} /> : 'Synthesize Career Path'}
                                {!loading && <ArrowRight size={20} />}
                            </button>
                        )}
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default Assessment;
