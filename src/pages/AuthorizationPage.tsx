import React, { useState } from 'react';
import Header from '../components/Header'
import { useNavigate } from "react-router-dom";

enum AuthMode {
    LOGIN = "LOGIN",
    REGISTER = "REGISTER"
};

const AuthorizationPage: React.FC = () => {
    const [authMode, setAuthMode] = useState<AuthMode>(AuthMode.LOGIN);
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [isFormValid, setFormValid] = useState<boolean>(false);

    const navigate = useNavigate();

    const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(e.target.value);
        setFormValid(e.target.value.trim().length > 0 && password.trim().length > 0);
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
        setFormValid(e.target.value.trim().length > 0 && username.trim().length > 0);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrorMessage(null);

        try {
            const response = await fetch(
                `http://localhost:19200/lab04-1.0-SNAPSHOT/api/auth/${authMode === AuthMode.REGISTER ? 'register' : 'login'}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password }),
            });

            if (!response.ok) {
                const data = await response.json();
                setErrorMessage(data.errorMessage || 'При регистрации произошла ошибка.');
                setSuccessMessage('');
            } else {
                if (authMode === AuthMode.LOGIN) {
                    const data = await response.json();
                    localStorage.setItem('jwt', data.jwt);
                    navigate("/main");
                } else {
                    // Handle successful registration
                    setSuccessMessage('Регистрация прошла успешно.');
                    setErrorMessage('');
                }
            }
        } catch (error) {
            setErrorMessage('Ошибка подключения.');
            setSuccessMessage('');
        }
    };


    return (
        <div className="dark-theme">
            <Header
                labDiscipline="Веб-программирование"
                labNumber={4}
                studentName="Чайкин Вадим Константинович"
                studentGroup="P3224"
                studentNumber="322864"
            />
            <div className="centered-box">
                <h1>{authMode === AuthMode.LOGIN ? 'Вход' : 'Регистрация'}</h1>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="username">
                        Имя пользователя:<br/>
                        <input
                            id="username"
                            name="username"
                            type="text"
                            value={username}
                            onChange={handleUsernameChange}
                            placeholder="Имя пользователя"
                        />
                    </label>
                    <label htmlFor="username">
                        Пароль:<br/>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            value={password}
                            onChange={handlePasswordChange}
                            placeholder="Пароль"
                        />
                    </label>
                    <button type="submit" disabled={!isFormValid}>
                        {authMode === AuthMode.LOGIN ? 'Войти' : 'Зарегистрироваться'}
                    </button>
                </form>
                {errorMessage && <div className="error-message">{errorMessage}</div>}
                {successMessage && <div className="success-message">{successMessage}</div>}
                <p className="no-indent"><a
                    onClick={() => setAuthMode(authMode === AuthMode.LOGIN ? AuthMode.REGISTER : AuthMode.LOGIN)}
                >
                    Переключиться на {authMode === AuthMode.LOGIN ? 'регистр.' : 'вход'}
                </a></p>
            </div>
        </div>
    );
};

export default AuthorizationPage;
