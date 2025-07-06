import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import axios from "axios";

const app = express();
dotenv.config();

app.use(express.json());
app.use(
  cors()
  //   {
  //   origin: ["http://localhost:5173", "http://127.0.0.1:5173"], // Add your frontend URLs
  //   methods: ["GET", "POST", "PUT", "DELETE"],
  //   allowedHeaders: ["Content-Type", "Authorization"],
  //   credentials: true,
  // }
);

const port = process.env.PORT || 3001;
const apikey = process.env.apikey;

app.get("/weather", async (req, res) => {
  const cityname = req.query.city;
  if (!cityname) {
    return res.status(400).json({ error: "City is required" });
  }
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityname}&appid=${process.env.apikey}&units=metric`;
  try {
    const response = await axios.get(url);
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch weather data" });
  }
});

app.listen(port, () => {
  console.log(`server running on port ${port}`);
});
