const express = require('express');
const router = express.Router();
const { getRoadmap, updateRoadmap } = require('../controllers/roadmapController');
const { protect } = require('../middleware/authMiddleware'); // Assuming this exists based on folder structure

// Protected Routes
router.get('/', protect, getRoadmap);
router.post('/', protect, updateRoadmap);

module.exports = router;
