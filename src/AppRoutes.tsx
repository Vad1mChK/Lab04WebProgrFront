import React from 'react';
import { HashRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import AuthorizationPage from './pages/AuthorizationPage';
import MainPage from './pages/MainPage';
import ErrorPage from './pages/ErrorPage';

const AppRoutes: React.FC = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<AuthorizationPage />} />
                <Route path="/main" element={<MainPage />} />
                <Route path="/error/:errorCode" element={<ErrorPage />}/>
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </Router>
    );
};

export default AppRoutes;
