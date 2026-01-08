const Roadmap = require('../models/Roadmap');

// Get user's roadmap progress
exports.getRoadmap = async (req, res) => {
    try {
        let roadmap = await Roadmap.findOne({ user: req.user.id });

        if (!roadmap) {
            // If no record exists, return empty progress instead of 404
            return res.json({ progress: [] });
        }

        res.json(roadmap);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// Update or Create roadmap progress
exports.updateRoadmap = async (req, res) => {
    const { progress } = req.body;
    console.log('Update Roadmap Request:', req.user._id, progress);

    try {
        // Atomic Upsert (Update if exists, Insert if new)
        const roadmap = await Roadmap.findOneAndUpdate(
            { user: req.user._id },
            {
                $set: {
                    progress: progress,
                    lastUpdated: Date.now()
                }
            },
            { new: true, upsert: true, setDefaultsOnInsert: true }
        );

        console.log('Roadmap Saved Successfully');
        res.json(roadmap);
    } catch (err) {
        console.error('Save Error:', err.message);
        res.status(500).send('Server Error');
    }
};
