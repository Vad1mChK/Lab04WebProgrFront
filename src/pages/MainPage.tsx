import React, {useEffect, useState} from 'react';
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import ShotForm from "../components/ShotForm";
import store from '../store/store'
import {addShot, redrawCanvas} from "../store/actions";
import Shot from "../util/Shot";
import ShotTable from "../components/ShotTable";

const MainPage: React.FC = () => {
    const [isAuthorized, setIsAuthorized] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const verifyToken = async () => {
            const jwtToken = localStorage.getItem('jwt');
            if (!jwtToken) {
                navigate('/');
                return;
            }

            try {
                const response = await fetch('http://localhost:19200/lab04-1.0-SNAPSHOT/api/user/whoami', {
                    headers: { 'Authorization': `Bearer ${jwtToken}` }
                });

                if (response.ok) {
                    setIsAuthorized(true);
                } else {
                    navigate('/');
                }
            } catch (error) {
                console.error('Error during JWT verification:', error);
                navigate('/');
            }
        };

        verifyToken();
    }, [navigate]);

    useEffect(() => {
        const fetchShots = async () => {
            const jwt = localStorage.getItem('jwt'); // Assuming JWT is stored in localStorage
            try {
                const response = await fetch('http://localhost:19200/lab04-1.0-SNAPSHOT/api/shot', {
                    headers: {
                        'Authorization': `Bearer ${jwt}`
                    }
                });

                if (response.ok) {
                    const shots = await response.json();
                    shots.forEach((shot: Shot) => {
                        if (!store.getState().shots.includes(shot)) {
                            store.dispatch(addShot(shot))
                        }
                    })
                    store.dispatch(redrawCanvas(localStorage.getItem('r') ?? store.getState().radius))
                    // Optionally, trigger canvas redraw here
                } else {
                    // Handle HTTP errors
                    console.error('Failed to fetch shots');
                }
            } catch (error) {
                console.error('Error fetching shots:', error);
            }
        };

        fetchShots();
    }, [])

    return (
        <div>
            <Header
                labDiscipline="Веб-программирование"
                labNumber={4}
                variantNumber={412348}
                studentName="Чайкин Вадим Константинович"
                studentGroup="P3224"
                studentNumber="322864"
                withLogoutButton
            />
            <ShotForm/>
            <ShotTable/>
        </div>
    )
}

export default MainPage