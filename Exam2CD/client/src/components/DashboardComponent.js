import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:8000/api/items') // Cambiar la URL según tu API
      .then((res) => {
        const modifiedProjects = res.data.data.map((project) => ({
          ...project,
          dueDate: new Date(project.dueDate).toLocaleDateString('en-US'),
        }));
        setProjects(modifiedProjects);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleMoveToInProgress = async (projectId) => {
    try {
      const response = await axios.patch(`http://localhost:8000/api/items/${projectId}`, { state: 'In Progress' });
      console.log(response.data);
      updateProjectState(projectId, 'In Progress');
    } catch (error) {
      console.log(error);
    }
  };

  const handleMoveToCompleted = async (projectId) => {
    try {
      const response = await axios.patch(`http://localhost:8000/api/items/${projectId}`, { state: 'Completed' });
      console.log(response.data);
      updateProjectState(projectId, 'Completed');
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteProject = async (projectId) => {
    try {
      const response = await axios.delete(`http://localhost:8000/api/items/${projectId}`);
      console.log(response.data);
      removeProject(projectId);
    } catch (error) {
      console.log(error);
    }
  };

  const updateProjectState = (projectId, newState) => {
    const updatedProjects = projects.map((project) => {
      if (project._id === projectId) {
        return { ...project, state: newState };
      }
      return project;
    });
    setProjects(updatedProjects);
  };

  const removeProject = (projectId) => {
    const updatedProjects = projects.filter((project) => project._id !== projectId);
    setProjects(updatedProjects);
  };

  return (
    <div className="mt-auto">
      <div className="container">
        <div className="col-md-12">
          <div className="row">
            <div className="col">
              <h1 className="fs-1 fw-semibold d-lg-flex justify-content-center align-items-center align-content-center justify-content-lg-center">Project Manager</h1>
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row">
          <div className="col-md-4 text-bg-primary" style={{ background: 'white' }}>
            <h1 className="fw-normal text-dark text-bg-primary">BackLog</h1>
            {projects.map((project) => project.state === 'Not Started' && (
              <div key={project._id} className="mb-4" style={{ background: 'white', padding: '10px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)' }}>
                <h2 style={{ color: 'black' }}>{project.name}</h2>
                <p style={{ color: 'black' }}>Due: {project.dueDate}</p>
                <button onClick={() => handleMoveToInProgress(project._id)} className="btn btn-warning fw-bolder" type="button" style={{ borderRadius: '20px' }}>Start Project &gt;</button>
              </div>
            ))}
          </div>
          <div className="col-md-4 text-bg-warning">
            <h1 className="fw-normal text-bg-warning">In Progress</h1>
            {projects.map((project) => project.state === 'In Progress' && (
              <div key={project._id} className="mb-4" style={{ background: 'white', padding: '10px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)' }}>
                <h2 style={{ color: 'black' }}>{project.name}</h2>
                <p style={{ color: 'black' }}>Due: {project.dueDate}</p>
                <button onClick={() => handleMoveToCompleted(project._id)} className="btn btn-success fw-bolder" type="button" style={{ borderRadius: '20px' }}>Move to Completed &gt;</button>
              </div>
            ))}
          </div>
          <div className="col-md-4 text-bg-success">
            <h1 className="fw-normal text-dark text-bg-success">Completed</h1>
            {projects.map((project) => project.state === 'Completed' && (
              <div key={project._id} className="mb-4" style={{ background: 'white', padding: '10px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)' }}>
                <h2 style={{ color: 'black' }}>{project.name}</h2>
                <p style={{ color: 'black' }}>Due: {project.dueDate}</p>
                <button onClick={() => handleDeleteProject(project._id)} className="btn btn-danger fw-bold" type="button" style={{ borderRadius: '20px' }}>X Remove Project</button>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row">
          <div className="col text-start mt-auto" data-aos="fade" style={{ boxShadow: '0px 0px', padding: '30px' }}>
            <Link to="/" className="btn btn-primary fw-bolder link-dark" style={{ borderRadius: '20px' }}>+ Add New Project &gt;</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
