const express = require('express');
const path = require('path');
const expressLayouts = require('express-ejs-layouts');
const axios = require('axios');
const fileUpload = require('express-fileupload'); // Import express-fileupload
const dotenv = require('dotenv');
dotenv.config();

const app = express();

// --- Configuration ---
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.set('layout', 'layouts/boilerplate'); // Set the default layout

// --- Middleware ---
app.use(express.static(path.join(__dirname, 'public')));
app.use(expressLayouts);
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies
app.use(express.json()); // Parse JSON bodies
app.use(fileUpload()); // Use express-fileupload middleware

// --- Routes ---
const authRoutes = require('./routes/auth');
const ecoResourcesRoutes = require('./routes/eco_resources');
const leaderboardRoutes = require('./routes/leaderboard');
const recyclingRoutes = require('./routes/recycling'); // Import the recycling routes

app.use('/', authRoutes);
app.get('/mental', (req, res) => {
    res.render('mental');
});
app.use('/leaderboard', leaderboardRoutes);
app.use('/eco-resources', ecoResourcesRoutes);

// --- Route Handlers ---

// Home Route
app.get('/', (req, res) => {
    const user = null; // Replace with actual user data if available
    const cityWasteManagementRanking = require('./init/data'); // Import data
    res.render('home', { user, cityWasteManagementRanking });
});

// Diet Plan Route
app.get('/diet-plan', (req, res) => {
    const user = null; // Replace with actual user data if available
    res.render('diet_plan_updated', { user }); // Changed to 'diet_plan_updated'
});

// Dashboard Route
app.get('/dashboard', (req, res) => {
    const user = null; // Replace with actual user data if available
    res.render('dashboard', { user });
});

// recycling  Route
app.get('/recycling', (req, res) => {
    const user = null; // Replace with actual user data if available
    res.render('recycling', { user });
});

app.get('/fitness', (req, res) => {
    const user = null; // Replace with actual user data if available
    res.render('fitness', { user });
});

// app.get('/mental',(req,res)=>{
   
//     res.render('mental',{user});
// })

// Image Upload Route
app.post('/upload-image', async (req, res) => {
    const user = null; // Replace with actual user data if available
    if (!req.files || !req.files.image) {
        return res.status(400).render('dashboard', { user, error: 'No image uploaded.' });
    }

    const imageFile = req.files.image;
    try {
        const response = await axios.post('https://api.gemini.com/v1/upload', {
            image: imageFile.data.toString('base64')
        });
        const geminiResponse = response.data;
        res.render('dashboard', { user, geminiResponse });
    } catch (error) {
        console.error('Error uploading image to Gemini API:', error);
        res.render('dashboard', { user, error: 'Failed to upload image.' });
    }
});

// --- Error Handling ---
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// --- Server ---
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});