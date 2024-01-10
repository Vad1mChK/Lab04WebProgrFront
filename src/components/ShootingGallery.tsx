import React, {HTMLProps, MouseEventHandler, useEffect, useState} from 'react'
import aimBottom from '../resources/images/canvas/aim-bottom.svg'
import store from "../store/store";
import { redrawCanvas } from '../util/drawCanvas'
import getZone from "../util/zone";
import {addShot} from "../store/actions";

export const ShootingGallery = (props: HTMLProps<any> & { blocked?: boolean }) => {
    const [radius, setRadius] = useState(store.getState().radius);
    const [shots, setShots] = useState(store.getState().shots);

    useEffect(() => {
        const unsubscribe = store.subscribe(() => {
            setRadius(store.getState().radius);
        });
        return unsubscribe;
    }, []);

    const size = () => props.size
    const [r, setR] = useState(store.getState().radius)
    const canvas = () => document.getElementById('aim-top') as HTMLCanvasElement

    const hit: MouseEventHandler<HTMLCanvasElement> = async (e: React.MouseEvent<HTMLCanvasElement>) => {
        const siz = size() || 1
        console.log(coordinatesFromClick(e, canvas(), siz))

        const {x: x, y: y} = coordinatesFromClick(e, canvas(), siz)

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
                    zone: zoneOffsetSeconds,
                    round: true
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
    }

    useEffect(() => {
        const unsubscribe = store.subscribe(() => {
            const newState = store.getState();
            setShots(newState.shots);
            setR(newState.radius);
        });

        return () => {
            unsubscribe();
        };
    }, []);

    useEffect(() => {
        if (canvas()) {
            redrawCanvas(size() ?? 1, canvas(), parseFloat(r) || 1, shots);
        }
    }, [shots, r, size]);

    function coordinatesFromClick(
        event: React.MouseEvent,
        canvas: HTMLCanvasElement,
        size: number
    ): Coordinates {
        const rect = canvas.getBoundingClientRect()
        const xClicked = event.clientX - rect.x
        const yClicked = event.clientY - rect.y
        const x = (xClicked - size / 2) / size * parseFloat(r) * 10 / 3
        const y = -(yClicked - size / 2) / size * parseFloat(r) * 10 / 3
        return { x: x, y: y }
    }

    return (
        <div id="aim" style={{
            width: props.size,
            height: props.size
        }}>
            <img id="aim-bottom" src={aimBottom} alt="Canvas" width={props.size} height={props.size}/>
            <AimOverlay r={radius} size={props.size} />
            <canvas id="aim-top" width={props.size} height={props.size} onClick={hit}/>
            <div
                id="aim-block"
                style={{
                    width: props.size,
                    height: props.size,
                    display: props.blocked ? 'block' : 'none'
                }}
                hidden={!props.blocked}
            />
        </div>
    )
}

interface Coordinates {
    x: number
    y: number
}

// @ts-ignore
const AimOverlay = ({ r, size }) => {
    const positions = [-r, -r / 2, 0, r / 2, r]; // Positions for the labels
    const svgSize = size; // SVG size (same as the aim size)
    const fontSize = 14
    const style = {
        fill: "#f4f4f4", fontSize: `${fontSize}px`, fontFamily: "JbrMono, monospace"
    }

    return (
        <svg width={svgSize} height={svgSize} style={{ position: "absolute", top: 0, left: 0 }}>
            {positions.map((val, index) => (
                <text
                    key={index}
                    style={style}
                    x={`${size / 2 - fontSize * 2.5}`}
                    y={`${size / 2 - val / r * size * 3 / 10 + fontSize}`}>
                    {val}
                </text>
            ))}
            {positions.map((val, index) => (
                val != 0 ?
                <text
                    key={index}
                    style={style}
                    x={`${size / 2 - fontSize * 2.5 + val / r * size * 3 / 10}`}
                    y={`${size / 2 + fontSize}`}>
                    {val}
                </text> : <div/>
            ))}
        </svg>
    );
};