const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

// App setup
const app = express();
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection
mongoose
  .connect("mongodb://127.0.0.1:27017/notesDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

// Note schema
const noteSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
});

const Note = mongoose.model("Note", noteSchema);

// Routes
app.get("/api/notes", async (req, res) => {
  const notes = await Note.find().sort({ timestamp: -1 });
  res.json(notes);
});

app.get("/api/notes/:id", async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) return res.status(404).json({ message: "Note not found" });
    res.json(note);
  } catch (err) {
    res.status(400).json({ message: "Invalid ID" });
  }
});

app.post("/api/notes", async (req, res) => {
  const { title, content } = req.body;
  if (!title || !content)
    return res.status(400).json({ message: "Title and content required" });

  const note = new Note({ title, content });
  await note.save();
  res.json({ message: "Note created", note });
});

app.put("/api/notes/:id", async (req, res) => {
  const { title, content } = req.body;
  try {
    const note = await Note.findByIdAndUpdate(
      req.params.id,
      { title, content, timestamp: Date.now() },
      { new: true }
    );
    if (!note) return res.status(404).json({ message: "Note not found" });
    res.json({ message: "Note updated", note });
  } catch (err) {
    res.status(400).json({ message: "Invalid ID" });
  }
});

app.delete("/api/notes/:id", async (req, res) => {
  try {
    const note = await Note.findByIdAndDelete(req.params.id);
    if (!note) return res.status(404).json({ message: "Note not found" });
    res.json({ message: "Note deleted" });
  } catch (err) {
    res.status(400).json({ message: "Invalid ID" });
  }
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
