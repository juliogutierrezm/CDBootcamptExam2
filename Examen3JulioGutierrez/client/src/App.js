// App.js
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NotesForm from './components/NotesForm';
import DashboardComponent from './components/DashboardComponent';
import Notes from './components/NotesComponent';

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/notes/new" element={<NotesForm />} />
                <Route path="/" element={<DashboardComponent />} />
                <Route path="/notes/:id" element={<Notes />} /> {/* Ruta para detalles */}       
            </Routes>
        </BrowserRouter>
    );
};

export default App;
