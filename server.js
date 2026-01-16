import express from "express";
import dotenv from "dotenv";
 
dotenv.config();

 const app = express();
 const PORT = 3000;

 app.use(express.static("public"));

 app.get("weather", async (req, res) => {
    const city = req.query.city;

    if (!city) {
        return res.status(400).json({ error: "city is required"});
    }

    try {
        const response = await fetch(
         `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.WEATHER_API_KEY}`
        );

        const data = await response.json();
        res.json(data);
    } catch (err) {
        res.status(500).json({error: "Failed to fetch weather data"});
    }
 });