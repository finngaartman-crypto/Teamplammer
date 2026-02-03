const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

// In-memory "database"
let schedules = [];
let nextId = 1;

app.use(cors());
app.use(express.json());

// Static files (frontend)
app.use(express.static(path.join(__dirname, "public")));

// GET alle schedules
app.get("/api/schedules", (req, res) => {
  res.json(schedules);
});

// POST nieuw schedule
app.post("/api/schedules", (req, res) => {
  const { title, date, description } = req.body;

  if (!title || !date) {
    return res.status(400).json({ error: "title en date zijn verplicht" });
  }

  const newSchedule = {
    id: nextId++,
    title,
    date,
    description: description || ""
  };

  schedules.push(newSchedule);
  res.status(201).json(newSchedule);
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
