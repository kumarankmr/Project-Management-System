import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [projects, setProjects] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("");
  const [editId, setEditId] = useState(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await axios.get("http://localhost:5000/projects");
      setProjects(response.data.projects);
    } catch (error) {
      console.error("Error fetching projects: ", error);
    }
  };

  const addProject = async () => {
    try {
      await axios.post("http://localhost:5000/projects", {
        name,
        description,
        status,
      });
      fetchProjects();
      setName("");
      setDescription("");
      setStatus("");
    } catch (error) {

      console.error("Error adding project: ", error);
    }
  };

  const deleteProject = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/projects/${id}`);
      fetchProjects();
    } catch (error) {
      console.error("Error deleting project: ", error);
    }
  };

  const updateProject = async () => {
    try {
      await axios.put(`http://localhost:5000/projects/${editId}`, {
        name,
        description,
        status,
      });
      fetchProjects();
      setName("");
      setDescription("");
      setStatus("");
      setEditId(null);
    } catch (error) {
      console.error("Error updating project: ", error);
    }
  };

  const handleEdit = (project) => {
    setName(project.name);
    setDescription(project.description);
    setStatus(project.status);
    setEditId(project.id);
  };

  return (
    <>
      <div className="back">
        <Navbar expand="lg" className="bg-body-tertiary" >
          <Container fluid>
            <Navbar.Collapse id="navbarScroll">
              <Nav
                className="me-auto my-2 my-lg-0"
                style={{ maxHeight: '100px' }}
                navbarScroll
              >
                <Nav.Link href="#action1">Home</Nav.Link>
                <Nav.Link href="#action2">Projects</Nav.Link>
                <NavDropdown title="More" id="navbarScrollingDropdown">
                  <NavDropdown.Item href="#action3">Project</NavDropdown.Item>
                  <NavDropdown.Item href="#action4">Status</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="#action5">Details</NavDropdown.Item>
                </NavDropdown>
                <Nav.Link href="#" disabled></Nav.Link>
              </Nav>
              <Form className="d-flex">
                <Form.Control
                  type="search"
                  placeholder="Search"
                  className="me-2"
                  aria-label="Search"
                  onChange={e => { setSearch(e.target.value) }}
                />
                <Button variant="outline-success">Search</Button>
              </Form>
            </Navbar.Collapse>
          </Container>
        </Navbar>
        <div className="container">
          <h1 className="title">Project Management System</h1>
          <div className="form-border">
            <div className="form-group">
              <input
                className="input"
                type="text"
                value={name}
                placeholder="Name"
                onChange={(e) => setName(e.target.value)}
              />
              <input
                className="input"
                type="text"
                value={description}
                placeholder="Project"
                onChange={(e) => setDescription(e.target.value)}
              />
              <input
                className="input"
                type="text"
                value={status}
                placeholder="Status"
                onChange={(e) => setStatus(e.target.value)}
              />
              {editId ? (
                <button className="button" onClick={updateProject}>
                  Update
                </button>
              ) : (
                <button className="button add-button" onClick={addProject}>
                  Add Project
                </button>
              )}
            </div>
          </div>
          <div className="cards-container">
            {projects.map((project) => (
              (project.name.toLowerCase().includes(search.toLowerCase()) ||
                project.status.toLowerCase().includes(search.toLowerCase()) ||
                project.description.toLowerCase().includes(search.toLowerCase())
              ) ? (
                <div key={project.id} className="card">
                  <h3>{project.name}</h3>
                  <p>{project.description}</p>
                  <p>Status: {project.status}</p>
                  <div>
                    <button className="button delete-button" onClick={() => deleteProject(project.id)}>
                      Delete
                    </button>
                    <button className="button edit-button" onClick={() => handleEdit(project)}>
                      Edit
                    </button>
                  </div>
                </div>
              ) : null
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
