const express = require('express');
const router = express.Router();

// Route to handle the detailed health and wellness form submission
router.post('/submit-detailed-info', (req, res) => {
    try {
        // Extract data from the request body
        const { name, email, age, gender, occupation, height, weight, mealFrequency, dietaryRestrictions, activityLevel, primaryFitnessGoal, stressManagement, additionalInfo } = req.body;

        // Here you can add logic to process the data, such as saving it to a database or performing validations

        // For now, just send a success response
        res.status(200).send('Form submitted successfully!');
    } catch (error) {
        console.error('Error processing form submission:', error);
        res.status(500).send('An error occurred while processing your request.');
    }
});

module.exports = router;
