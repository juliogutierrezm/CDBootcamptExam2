import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const NoteForm = () => {
  const navigate = useNavigate();

  const [noteTitle, setNoteTitle] = useState('');
  const [noteBody, setNoteBody] = useState('');
  const [error, setError] = useState('');
  const [errors, setErrors] = useState({});

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8000/api/items', {
        title: noteTitle,
        body: noteBody,
      });
      console.log(response.data); // manejar la respuesta 

      // Reiniciar los estados de los campos y errores
      setNoteTitle('');
      setNoteBody('');
      setErrors({});
      setError(''); // Limpiar el mensaje de error

      // Redirigir al dashboard después de la creación
      navigate('/');
    } catch (error) {
      console.log(error);
      setError(''); // Mostrar mensaje de error general
      if (error.response && error.response.data && error.response.data.error) {
        setErrors({
          noteTitle: error.response.data.error.title,
          noteBody: error.response.data.error.body,
        });
      }
    }
  };

  return (
    <div className="container" style={{ maxWidth: '800px', margin: '0 auto' }}>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <Link to="/" className="link-primary" style={{ float: 'right', margin: '8px' }}>
          go back home
        </Link>
        <h1 className="multisteps-form__title" style={{ marginRight: 'auto' }}>
          Write Notes&nbsp;
        </h1>
      </div>
      {error && <div className="text-danger mb-3">{error}</div>}
      <span style={{ margin: '12px' }}>Write a new note!</span>
      <div
        className="multisteps-form__content"
        style={{ borderStyle: 'solid', borderBottomStyle: 'solid', margin: '12px', padding: '20px' }}
      >
        <div id="input-grp-double" className="form-row mt-4">
          <div className="col-12 col-sm-6">
            <span style={{ padding: '12px' }}>Note Title</span>
            <input
              type="text"
              className={`form-control ${errors.noteTitle ? 'is-invalid' : ''}`}
              style={{
                width: '100%',
                margin: '12px 0',
              }}
              id="noteTitle"
              value={noteTitle}
              onChange={(e) => setNoteTitle(e.target.value)}
            />
            <div className="invalid-feedback text-danger">{errors.noteTitle}</div>
          </div>
          <div className="col-12 col-sm-6 mt-4 mt-sm-0">
            <span style={{ padding: '12px' }}>Note Body</span>
            <textarea
              className={`form-control ${errors.noteBody ? 'is-invalid' : ''}`}
              style={{
                width: '100%',
                height: '150px',
                margin: '12px 0',
              }}
              id="noteBody"
              value={noteBody}
              onChange={(e) => setNoteBody(e.target.value)}
            />
            <div className="invalid-feedback text-danger">{errors.noteBody}</div>
          </div>
        </div>
        <div className="d-flex justify-content-end">
          <button
            className="btn btn-light fs-6 fw-normal btn btn-primary ml-auto js-btn-next"
            type="submit"
            title="Next"
            style={{
              color: 'var(--bs-emphasis-color)',
              boxShadow: '3px 5px',
              border: '0px solid var(--bs-emphasis-color)',
              borderRadius: '0px',
              margin: '12px',
            }}
            onClick={onSubmitHandler}
          >
            Write this note!
          </button>
        </div>
      </div>
    </div>
  );
};

export default NoteForm;
