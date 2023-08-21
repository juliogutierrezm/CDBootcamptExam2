import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const [notes, setNotes] = useState([]);
  const [sortedNotes, setSortedNotes] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:8000/api/items') // Cambiar la URL según tu API
      .then((res) => {
        setNotes(res.data.data);
        setSortedNotes(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const sortNotesByOldest = () => {
    const sorted = [...notes].sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    setSortedNotes(sorted);
  };

  const sortNotesByNewest = () => {
    const sorted = [...notes].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    setSortedNotes(sorted);
  };

  const getRandomNote = () => {
    const randomIndex = Math.floor(Math.random() * notes.length);
    const randomNote = notes[randomIndex];
    console.log('Random Note:', randomNote);
  };

  return (
    <div className="container" style={{ maxWidth: '800px', margin: '0 auto' }}>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h1 className="multisteps-form__title" style={{ marginRight: 'auto' }}>
          Note Wall
        </h1>
        <div style={{ textAlign: 'right' }}>
          <Link to="/notes/new/">
            <button
              className="btn btn-light fs-6 fw-normal btn btn-primary"
              type="submit"
              title="Next"
              style={{
                color: 'black',
                boxShadow: '3px 5px black',
                border: '0px solid var(--bs-emphasis-color)',
                borderRadius: '0px',
                margin: '12px',
              }}
            >
              Write note
            </button>
          </Link>
        </div>
      </div>
      <span style={{ margin: '12px' }}>Leave a note</span>
      <div style={{ textAlign: 'center' }}>
        <button
          className="btn btn-light fs-6 fw-normal btn btn-primary"
          type="button"
          onClick={sortNotesByOldest}
          style={{
            color: 'black',
            boxShadow: '3px 5px black',
            border: '0px solid var(--bs-emphasis-color)',
            borderRadius: '0px',
            margin: '12px',
          }}
        >
          Sort by Oldest
        </button>
        <button
          className="btn btn-light fs-6 fw-normal btn btn-primary"
          type="button"
          onClick={sortNotesByNewest}
          style={{
            color: 'black',
            boxShadow: '3px 5px black',
            border: '0px solid var(--bs-emphasis-color)',
            borderRadius: '0px',
            margin: '12px',
          }}
        >
          Sort by Newest
        </button>
      </div>
      <hr style={{ borderBottomStyle: 'solid' }} />
      {sortedNotes.map((note) => (
        <div key={note._id} className="mb-4">
          <h2>{note.title}</h2>
          <p>{note.body}</p>
          <div style={{ textAlign: 'right' }}>
            <Link to={`/notes/${note._id}`} className="btn btn-primary">edit</Link>
          </div>
        </div>
      ))}
      <div style={{ textAlign: 'center', margin: '12px' }}>
        <button
          className="btn btn-light fs-6 fw-normal btn btn-primary"
          type="button"
          onClick={getRandomNote}
          style={{
            color: 'black',
            boxShadow: '3px 5px black',
            border: '0px solid var(--bs-emphasis-color)',
            borderRadius: '0px',
            margin: '12px',
          }}
        >
          Random Note
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
