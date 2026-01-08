const mongoose = require('mongoose');

const roadmapSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: true
    },
    // We store progress as a map or array. 
    // Since the roadmap structure is static updates (new phases) might break array indices, 
    // but for this MVP, an array of phase objects with completed items indices is simplest.
    // Or simpler: Just a flat list of "completedItemIds" if items had IDs.
    // Let's stick to the structure:
    progress: [
        {
            phaseId: { type: Number, required: true }, // 0, 1, 2... matching the array index in frontend
            completedItems: [{ type: Number }] // [0, 2] means item 0 and 2 are done
        }
    ],
    lastUpdated: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Roadmap', roadmapSchema);
