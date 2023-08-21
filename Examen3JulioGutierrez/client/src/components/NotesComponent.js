import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link, Navigate } from 'react-router-dom';

const EditDeleteForm = () => {
  const { id } = useParams();
  const [note, setNote] = useState(null);
  const [editedTitle, setEditedTitle] = useState('');
  const [editedBody, setEditedBody] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/items/${id}`)
      .then((res) => {
        setNote(res.data.data[0]);
        setEditedTitle(res.data.data[0].title);
        setEditedBody(res.data.data[0].body);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  const handleEditNote = async () => {
    try {
      const response = await axios.patch(`http://localhost:8000/api/items/${id}`, {
        title: editedTitle,
        body: editedBody,
      });
      console.log(response.data);
      setNote(response.data.data);
      setIsEditing(true);
    } catch (error) {
      console.log(error);
      setErrors({
        editedTitle: error.response.data.error.title,
        editedBody: error.response.data.error.body,
      });
    }
  };

  const deleteNote = async () => {
    try {
      await axios.delete(`http://localhost:8000/api/items/${id}`);
      setIsDeleting(true);
    } catch (error) {
      console.log(error);
    }
  };

  if (isDeleting) {
    return <Navigate to="/" />;
  }

  if (isEditing) {
    return <Navigate to="/" />;
  }

  if (!note) {
    return null;
  }

  return (
    <div className="container" style={{ maxWidth: '800px', margin: '0 auto' }}>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <Link to="/" className="link-primary" style={{ float: 'right', margin: '8px' }}>
          go back home
        </Link>
        <h1 className="multisteps-form__title" style={{ marginRight: 'auto' }}>
          Notes
        </h1>
      </div>
      <div
        style={{
          borderStyle: 'solid',
          borderBottomStyle: 'solid',
          margin: '12px',
          padding: '20px',
        }}
      >
        <div id="input-grp-double" className="form-row mt-4">
          <div className="col-12 col-sm-6">
            <span
              style={{
                padding: '20px 0',
                marginBottom: '10px',
              }}
            >
              Note Title
            </span>
            <input
              type="text"
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
              className={`form-control ${errors.editedTitle ? 'is-invalid' : ''}`}
              style={{
                width: '100%',
                margin: '0 auto',
                padding: '5px',
                borderRadius: '0px',
                border: '1px solid #ccc',
                marginTop: '10px',
                marginBottom: '10px',
              }}
            />
            {errors.editedTitle && (
              <div className="invalid-feedback text-danger">{errors.editedTitle}</div>
            )}
          </div>
          <div className="col-12 col-sm-6 mt-4 mt-sm-0">
            <span
              style={{
                padding: '10px 0',
                marginBottom: '10px',
              }}
            >
              Note Body
            </span>
            <textarea
              value={editedBody}
              onChange={(e) => setEditedBody(e.target.value)}
              className={`form-control ${errors.editedBody ? 'is-invalid' : ''}`}
              style={{
                width: '100%',
                height: '150px',
                margin: '0 auto',
                padding: '5px',
                borderRadius: '0px',
                border: '1px solid #ccc',
                marginTop: '20px',
              }}
            />
            {errors.editedBody && (
              <div className="invalid-feedback text-danger">{errors.editedBody}</div>
            )}
          </div>
        </div>
      </div>
      <div className="d-flex justify-content-between">
        <button
          className="btn btn-light fs-6 fw-normal btn btn-primary ml-auto js-btn-next"
          onClick={handleEditNote}
          style={{
            color: 'var(--bs-emphasis-color)',
            boxShadow: '3px 5px',
            border: '0px solid var(--bs-emphasis-color)',
            borderRadius: '0px',
            margin: '12px',
          }}
        >
          Edit Note
        </button>
        <button
          className="btn btn-light fs-6 fw-normal btn btn-primary ml-auto js-btn-next"
          onClick={deleteNote}
          style={{
            color: 'var(--bs-emphasis-color)',
            boxShadow: '3px 5px',
            border: '0px solid var(--bs-emphasis-color)',
            borderRadius: '0px',
            margin: '12px',
          }}
        >
          Delete Note
        </button>
      </div>
    </div>
  );
};

export default EditDeleteForm;
