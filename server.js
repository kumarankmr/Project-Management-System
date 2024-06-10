require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require('mongoose');
const projectRoutes = require('./routes/projectRoutes');

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());



const MONGODB_URL = process.env.MONGODB_URL;

// Connect to MongoDB using Mongoose
mongoose.connect(MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB:', err));

  

// Use the project routes
app.use('/projects', projectRoutes);


let projects = [

];


 
app.get("/projects", (req, res) => {
  res.json({ projects });
});

app.post("/projects", (req, res) => {
  const { name, description, status } = req.body;
  const id = projects.length + 1;
  const newProject = { id, name, description, status };
  projects.push(newProject);
  res.json({ success: true, project: newProject });
});

app.put("/projects/:id", (req, res) => {
  const { id } = req.params;
  const { name, description, status } = req.body;
  const index = projects.findIndex((project) => project.id === parseInt(id));
  if (index !== -1) {
    projects[index] = { id: parseInt(id), name, description, status };
    res.json({ success: true, project: projects[index] });
  } else {
    res.status(404).json({ success: false, message: "Project not found" });
  }
});

app.delete("/projects/:id", (req, res) => {
  const { id } = req.params;
  projects = projects.filter((project) => project.id !== parseInt(id));
  res.json({ success: true });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});