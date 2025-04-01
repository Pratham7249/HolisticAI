const express = require('express');
const router = express.Router();

router.get('/mental', (req, res) => {
    res.render('mental');
});

// Existing routes
router.get('/listings', (req, res) => {
    // Your existing code for listings
});

// New route for Recycling Initiative
router.get('/recycling', (req, res) => {
    res.render('diet_plan', { user: null }); // Render the diet plan view with a mock user object
});

// Other existing routes
router.get('/signup', (req, res) => {
    // Your existing code for signup
});

router.get('/login', (req, res) => {
    // Your existing code for login
});

module.exports = router;
