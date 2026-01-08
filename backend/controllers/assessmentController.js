const Assessment = require('../models/Assessment');

// Determine Role based on keywords
const determineRole = (text) => {
    const lower = text.toLowerCase();

    if (lower.includes('css') || lower.includes('react') || lower.includes('frontend') || lower.includes('ux')) {
        return {
            role: 'Frontend Architect',
            desc: 'You have a keen eye for visual systems and user experience. Your path involves mastering modern frameworks and performance engineering.',
            roadmap: [
                { title: 'Advanced React Patterns', status: 'active', desc: 'HOCs, Render Props, Hooks mastery', duration: '4 weeks' },
                { title: 'Web Performance', status: 'locked', desc: 'Core Web Vitals, Lazy Loading', duration: '3 weeks' }
            ]
        };
    }

    if (lower.includes('node') || lower.includes('express') || lower.includes('backend') || lower.includes('sql') || lower.includes('database')) {
        return {
            role: 'Backend Systems Engineer',
            desc: 'You think in data structures and scalable architecture. Your path leads to designing high-availability systems.',
            roadmap: [
                { title: 'Microservices Design', status: 'active', desc: 'Event-driven architecture, Docker', duration: '6 weeks' },
                { title: 'Database Optimization', status: 'locked', desc: 'Indexing, Sharding, Caching strategies', duration: '4 weeks' }
            ]
        };
    }

    if (lower.includes('python') || lower.includes('ai') || lower.includes('data') || lower.includes('ml')) {
        return {
            role: 'AI Solutions Architect',
            desc: 'You are aligned with the future of intelligence. Your path involves mastering LLMs, RAG pipelines, and model deployment.',
            roadmap: [
                { title: 'LLM Integration', status: 'active', desc: 'LangChain, Vector DBs, Fine-tuning', duration: '8 weeks' },
                { title: 'MLOps Pipelines', status: 'locked', desc: 'Model monitoring, automated retraining', duration: '5 weeks' }
            ]
        };
    }

    return {
        role: 'Full Stack Engineer',
        desc: 'You bridge the gap between user interface and server logic. Your versatility is your strength.',
        roadmap: [
            { title: 'Next.js Ecosystem', status: 'active', desc: 'SSR, API Routes, Edge Functions', duration: '5 weeks' },
            { title: 'Cloud Infrastructure', status: 'locked', desc: 'AWS/Vercel deployment patterns', duration: '4 weeks' }
        ]
    };
};

const submitAssessment = async (req, res) => {
    try {
        const { skills, interests, experience } = req.body;

        // Simple Recommendation Engine
        const combinedText = `${skills} ${interests}`;
        const recommendation = determineRole(combinedText);

        const assessment = await Assessment.create({
            user: req.user.id,
            skills,
            interests,
            experience,
            result: {
                role: recommendation.role,
                confidence: 94, // Mock confidence for now
                description: recommendation.desc,
                roadmap: recommendation.roadmap
            }
        });

        res.status(201).json(assessment.result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

const getHistory = async (req, res) => {
    try {
        const assessments = await Assessment.find({ user: req.user.id }).sort({ createdAt: -1 });

        // Transform for frontend
        const data = assessments.map(a => ({
            role: a.result.role,
            confidence: a.result.confidence,
            date: a.createdAt
        }));

        res.json(data);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = { submitAssessment, getHistory };
