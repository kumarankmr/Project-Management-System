const Project = require('../models/projectModel');

const getProjects = async (req, res) => {
  try {
    const projects = await Project.find();
    console.log('Projects retrieved:', projects);
    res.json({ projects });
  } catch (err) {
    console.error('Error retrieving projects:', err);
    res.status(500).json({ message: err.message });
  }
};

const addProject = async (req, res) => {
  const { name, description, status } = req.body;
  const newProject = new Project({ name, description, status });
  try {
    await newProject.save();
    console.log('Project added:', newProject);
    res.status(201).json({ success: true, project: newProject });
  } catch (err) {
    console.error('Error adding project:', err);
    res.status(400).json({ message: err.message });
  }
};

const updateProject = async (req, res) => {
  const { id } = req.params;
  const { name, description, status } = req.body;
  try {
    const project = await Project.findByIdAndUpdate(id, { name, description, status }, { new: true });
    if (!project) {
      return res.status(404).json({ success: false, message: 'Project not found' });
    }
    console.log('Project updated:', project);
    res.json({ success: true, project });
  } catch (err) {
    console.error('Error updating project:', err);
    res.status(400).json({ message: err.message });
  }
};

const deleteProject = async (req, res) => {
  const { id } = req.params;
  try {
    const project = await Project.findByIdAndDelete(id);
    if (!project) {
      return res.status(404).json({ success: false, message: 'Project not found' });
    }
    console.log('Project deleted:', project);
    res.json({ success: true });
  } catch (err) {
    console.error('Error deleting project:', err);
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getProjects,
  addProject,
  updateProject,
  deleteProject,
};
