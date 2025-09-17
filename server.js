// server.js

const express = require('express');
const fetch = require('node-fetch');

const app = express();
const port = process.env.PORT || 3000; // Use the port provided by Glitch

// Serve static files from the 'public' directory
app.use(express.static('public'));

// API endpoint to fetch METAR data
app.get('/api/metar', async (req, res) => {
    const stationId = req.query.stationId;

    if (!stationId) {
        return res.status(400).json({ error: 'Missing stationId parameter' });
    }

    const apiUrl = `https://aviationweather.gov/api/data/metar?ids=${stationId}&format=json`;

    // Log the API URL
    console.log(`Requesting METAR data from API URL: ${apiUrl}`);

    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error(`AviationWeather API error: ${response.status}`);
        }
        const data = await response.json();

        // Log the response data
        console.log('API response data:', data);

        res.json(data); // Send the data to the client
    } catch (error) {
        console.error('Error fetching METAR data:', error);
        res.status(500).json({ error: 'Error fetching METAR data' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
