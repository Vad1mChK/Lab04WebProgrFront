import React, { useState, useEffect } from "react";
import { ShootingGallery } from "./ShootingGallery";
import TextNumberInput from "./TextNumberInput";
import Layout, { determineLayout } from "../util/Layout";
import {addShot, deleteShots, redrawCanvas} from '../store/actions'
import store from "../store/store";
import getZone from "../util/zone";

const ShotForm = () => {
    const [layout, setLayout] = useState<Layout>(determineLayout(window.innerWidth));
    const [x, setX] = useState<string>(
        localStorage.getItem('x') ? localStorage.getItem('x')! : '0'
    );
    const [y, setY] = useState<string>(
        localStorage.getItem('y') ? localStorage.getItem('y')! : '0'
    );
    const [r, setR] = useState<string>(
        localStorage.getItem('r') ? localStorage.getItem('r')! : '1'
    );
    const [isXValid, setXValid] = useState<boolean>(true);
    const [isYValid, setYValid] = useState<boolean>(true);
    const [isRValid, setRValid] = useState<boolean>(true);

    useEffect(() => {
        const handleResize = () => {
            setLayout(determineLayout(window.innerWidth));
        };

        window.addEventListener('resize', handleResize);

        // Clean up the event listener when the component unmounts
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    useEffect(() => {
        localStorage.setItem('x', x);
        localStorage.setItem('y', y);
        localStorage.setItem('r', r);
    }, [x, y, r]);

    const getGallerySize = (): number => {
        switch(layout) {
            case Layout.MOBILE:
                return 267 // Or any size you prefer for mobile
            case Layout.TABLET:
                return 350; // Tablet size
            default:
                return 400; // Desktop size
        }
    };

    const handleRChange = (newR: string) => {
        // Update state for 'r' and redraw canvas
        setR(newR);
        store.dispatch(redrawCanvas(newR));
    };

    const handleSendShotViaForm = async (event: React.FormEvent) => {
        event.preventDefault(); // Prevent default form submission behavior

        const jwt = localStorage.getItem('jwt'); // Retrieve JWT from localStorage
        if (!jwt) {
            console.error('No JWT found');
            return;
        }

        const zoneOffsetSeconds = getZone()

        try {
            const response = await fetch('http://localhost:19200/lab04-1.0-SNAPSHOT/api/shot', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${jwt}`
                },
                body: JSON.stringify({
                    x: x,
                    y: y,
                    r: r,
                    zone: zoneOffsetSeconds
                })
            });

            if (!response.ok) {
                // Handle response errors
                console.error('Не удалось отправить выстрел.');
            } else {
                // Handle success
                console.log('Выстрел отправлен успешно.');
                const shot = await response.json();
                store.dispatch(addShot(shot))
                // Optionally, update the store or UI based on the response
            }
        } catch (error) {
            console.error('Ошибка при отправке выстрела:', error);
        }
    };

    const handleClearShots = async () => {
        const jwt = localStorage.getItem('jwt'); // Retrieve JWT from localStorage
        if (!jwt) {
            console.error('No JWT found');
            return;
        }

        try {
            const response = await fetch('http://localhost:19200/lab04-1.0-SNAPSHOT/api/shot/delete', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${jwt}`
                },
            });

            if (!response.ok) {
                // Handle response errors
                console.error('Не удалось очистить выстрелы.');
            } else {
                // Handle success
                console.log('Выстрелы очищены успешно.');
                store.dispatch(deleteShots())
            }
        } catch (error) {
            console.error('Ошибка при очистке выстрелов:', error);
        }
    }

    return (
        <div className="box centering">
            <h1>Тир</h1>
            <ShootingGallery size={getGallerySize()} blocked={!isXValid || !isYValid || !isRValid}/>
            <form method="POST" action="http://localhost:19200/lab04-1.0-SNAPSHOT/api/shot"
                  onSubmit={handleSendShotViaForm}
                  onReset={handleClearShots}>
                <TextNumberInput min={-3} max={5} htmlId="x" htmlName="x" onChange={ (e) => setX(e) }
                     onValidityChange={(isValid) => setXValid(isValid)}
                />
                <TextNumberInput min={-5} max={3} htmlId="y" htmlName="y" onChange={ (e) =>  setY(e) }
                     onValidityChange={(isValid) => setYValid(isValid)}
                />
                <TextNumberInput min={-3} max={5} htmlId="r" htmlName="r" onChange={ handleRChange }
                     onValidityChange={(isValid) => setRValid(isValid)} positive
                />
                <div className="button-group">
                    <input type="submit" disabled={!isXValid || !isYValid || !isRValid}/>
                    <input type="reset" value="Очистить выстрелы" title="Внимание: очищены будут только выстрелы, принадлежащие вам."/>
                </div>
            </form>
        </div>
    );
};

export default ShotForm;
