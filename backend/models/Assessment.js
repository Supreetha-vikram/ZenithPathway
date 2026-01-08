const mongoose = require('mongoose');

const assessmentSchema = mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    skills: { type: String, default: '' },
    interests: { type: String, default: '' },
    experience: { type: String, default: 'Beginner' },
    result: {
        role: String,
        confidence: Number,
        description: String,
        roadmap: Array
    },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Assessment', assessmentSchema);
