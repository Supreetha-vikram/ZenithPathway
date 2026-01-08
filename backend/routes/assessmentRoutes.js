const express = require('express');
const router = express.Router();
const { submitAssessment, getHistory } = require('../controllers/assessmentController');
const { protect } = require('../middleware/authMiddleware');

router.post('/submit', protect, submitAssessment);
router.get('/history', protect, getHistory);

module.exports = router;
