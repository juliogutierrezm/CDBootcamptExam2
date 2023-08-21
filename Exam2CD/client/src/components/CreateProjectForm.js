import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const ProjectForm = () => {
  const navigate = useNavigate();

  const [projectName, setProjectName] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [errors, setErrors] = useState({});

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    // Validaciones
    const validationErrors = {};
    if (!projectName.trim()) {
      validationErrors.projectName = 'Project name is required';
    }
    if (!dueDate) {
      validationErrors.dueDate = 'Due date is required';
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const response = await axios.post('http://localhost:8000/api/items', {
        name: projectName,
        dueDate: dueDate,
      });
      console.log(response.data); // Puedes manejar la respuesta como sea necesario
      
      // Reiniciar los estados de los campos y errores
      setProjectName('');
      setDueDate('');
      setErrors({});

      // Redirigir al dashboard después de la creación
      navigate('/dashboard');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Create New Project</h2>
      <form onSubmit={onSubmitHandler}>
        <div className="mb-3">
          <label htmlFor="projectName" className="form-label">Project Name</label>
          <input
            type="text"
            className={`form-control ${errors.projectName ? 'is-invalid' : ''}`}
            id="projectName"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
          />
          <div className="invalid-feedback">{errors.projectName}</div>
        </div>
        <div className="mb-3">
          <label htmlFor="dueDate" className="form-label">Due Date</label>
          <input
            type="date"
            className={`form-control ${errors.dueDate ? 'is-invalid' : ''}`}
            id="dueDate"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
          <div className="invalid-feedback">{errors.dueDate}</div>
        </div>
        <button type="submit" className="btn btn-primary">Create Project</button>
      </form>
    </div>
  );
};

export default ProjectForm;
