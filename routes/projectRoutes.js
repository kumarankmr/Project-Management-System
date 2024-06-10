const express = require('express');
const router = express.Router();
const Project = require('../models/projectModel');

// Get all projects
router.get('/', async (req, res) => {
  try {
    const projects = await Project.find();
    res.json({ projects });
  } catch (err) {
    console.error('Error retrieving projects:', err);
    res.status(500).json({ message: err.message });
  }
});

// Add a new project
router.post('/', async (req, res) => {
  const { name, description, status } = req.body;
  const newProject = new Project({ name, description, status });
  try {
    await newProject.save();
    res.status(201).json({ success: true, project: newProject });
  } catch (err) {
    console.error('Error adding project:', err);
    res.status(400).json({ message: err.message });
  }
});

// Update a project
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { name, description, status } = req.body;
  try {
    const project = await Project.findByIdAndUpdate(id, { name, description, status }, { new: true });
    if (!project) {
      return res.status(404).json({ success: false, message: 'Project not found' });
    }
    res.json({ success: true, project });
  } catch (err) {
    console.error('Error updating project:', err);
    res.status(400).json({ message: err.message });
  }
});

// Delete a project
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const project = await Project.findByIdAndDelete(id);
    if (!project) {
      return res.status(404).json({ success: false, message: 'Project not found' });
    }
    res.json({ success: true });
  } catch (err) {
    console.error('Error deleting project:', err);
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;