import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import AuthorizationPage from './pages/AuthorizationPage'; // Adjust the import path as needed
import MainPage from './pages/MainPage'; // Adjust the import path as needed
import ErrorPage from './pages/ErrorPage'; // Adjust the import path as needed

const AppRoutes: React.FC = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<AuthorizationPage />} />
                <Route path="/main" element={<MainPage />} />
                <Route path="/error/:errorCode" element={<ErrorPage />} />
                <Route path="*" element={<Navigate to="/auth" replace />} />
            </Routes>
        </Router>
    );
};

export default AppRoutes;
