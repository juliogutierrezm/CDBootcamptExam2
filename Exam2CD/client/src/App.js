import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CreateProjectForm from './components/CreateProjectForm';
import DashboardComponent from './components/DashboardComponent';

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<CreateProjectForm />} />
                <Route path="/dashboard" element={<DashboardComponent />} />
            </Routes>
        </BrowserRouter>
    );
};

export default App;
