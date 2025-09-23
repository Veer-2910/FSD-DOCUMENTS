const express = require("express");
const fs = require("fs");
const cors = require("cors");
const path = require("path");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "../frontend")));

const filePath = path.join(__dirname, "counter.json");

app.get("/api/counter", (req, res) => {
  const data = JSON.parse(fs.readFileSync(filePath, "utf-8"));
  res.json({ value: data.value });
});

app.post("/api/counter/update", (req, res) => {
  const { value } = req.body;
  fs.writeFileSync(filePath, JSON.stringify({ value }), "utf-8");
  res.json({ success: true, value });
});

app.post("/api/counter/reset", (req, res) => {
  fs.writeFileSync(filePath, JSON.stringify({ value: 0 }), "utf-8");
  res.json({ success: true, value: 0 });
});

app.listen(PORT, () => {
  console.log(`Server + Frontend running at http://localhost:${PORT}`);
});
