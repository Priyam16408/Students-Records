import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import process from "node:process";

const app = express();
const port = Number(process.env.PORT) || 5000;

const studentSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, trim: true, lowercase: true },
  course: { type: String, trim: true, default: "" },
  phone: { type: String, trim: true, default: "" },
  year: { type: String, trim: true, default: "" },
}, { timestamps: true });

const Student = mongoose.model("Student", studentSchema);

app.use(express.json());

app.get("/api/students", async (_request, response, next) => {
  try {
    response.json(await Student.find().sort({ createdAt: -1 }));
  } catch (error) {
    next(error);
  }
});

app.post("/api/students", async (request, response, next) => {
  try {
    const student = await Student.create(request.body);
    response.status(201).json(student);
  } catch (error) {
    next(error);
  }
});

app.put("/api/students/:id", async (request, response, next) => {
  try {
    const student = await Student.findByIdAndUpdate(request.params.id, request.body, {
      new: true,
      runValidators: true,
    });
    if (!student) return response.status(404).json({ message: "Student not found." });
    response.json(student);
  } catch (error) {
    next(error);
  }
});

app.delete("/api/students/:id", async (request, response, next) => {
  try {
    const student = await Student.findByIdAndDelete(request.params.id);
    if (!student) return response.status(404).json({ message: "Student not found." });
    response.json({ message: "Student deleted." });
  } catch (error) {
    next(error);
  }
});

app.use((error, _request, response, next) => {
  if (error.name === "ValidationError" || error.name === "CastError") {
    return response.status(400).json({ message: error.message });
  }
  if (response.headersSent) return next(error);
  console.error(error);
  response.status(500).json({ message: "Server error. Please try again." });
});

async function startServer() {
  if (!process.env.MONGODB_URI) {
    throw new Error("MONGODB_URI is required. Add it to your .env file.");
  }

  await mongoose.connect(process.env.MONGODB_URI);
  app.listen(port, () => console.log(`Student API listening on http://localhost:${port}`));
}

startServer().catch((error) => {
  console.error(error.message);
  process.exit(1);
});