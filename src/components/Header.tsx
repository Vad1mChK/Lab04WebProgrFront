import React from "react";
import Shot from "../util/Shot";
import store from "../store/store";
import {addShot, redrawCanvas} from "../store/actions";
import {useNavigate} from "react-router-dom";

type HeaderProps = {
    labDiscipline: string;
    labNumber: number;
    variantNumber?: number;
    studentName: string;
    studentGroup: string;
    studentNumber: string;
    withLogoutButton?: boolean;
};

const Header: React.FC<HeaderProps> = ({
    labDiscipline,
    labNumber,
    studentName,
    studentGroup,
    studentNumber,
    variantNumber = 42069,
    withLogoutButton = false
}) => {
    const navigate = useNavigate();
    const logout = () => {
        localStorage.removeItem('jwt')
        const fetchShots = async () => {
            const jwt = localStorage.getItem('jwt'); // Assuming JWT is stored in localStorage
            try {
                const response = await fetch('http://localhost:19200/lab04-1.0-SNAPSHOT/api/user/logout', {
                    headers: {
                        'Authorization': `Bearer ${jwt}`
                    }
                });

                if (response.ok) {
                    localStorage.removeItem('jwt');
                    console.log('Выход выполнен успешно.')
                } else {
                    // Handle HTTP errors
                    console.error('Не удалось выйти.');
                }
            } catch (error) {
                console.error('Ошибка при выходе:', error);
            }
        };

        navigate('/')
    }

    return (
        <div className="box">
            <h1>Лабораторная работа No. {labNumber} по дисциплине &laquo;{labDiscipline}&raquo; (вар. {variantNumber})</h1>
            <p style={{
                textAlign: "center"
            }}>
                <b>Выполнил</b>: <em>студент</em> {studentName}, {studentGroup}, #{studentNumber}
            </p>
            {
                withLogoutButton ? <button onClick={logout}>Выйти</button> : <div/>
            }
        </div>
    );
};

export default Header;
