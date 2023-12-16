import React, {HTMLProps, MouseEventHandler} from 'react'
import aimBottom from '../resources/images/canvas/aim-bottom.svg'
import store from "../store/store";

export const ShootingGallery = (props: HTMLProps<any>) => {
    const size = () => props.size
    const r = () => store.getState().radius
    const canvas = () => document.getElementById('aim-top') as HTMLCanvasElement

    const hit: MouseEventHandler<HTMLCanvasElement> = (e: React.MouseEvent<HTMLCanvasElement>) => {

    }

    return (
        <div id="aim">
            <img id="aim-bottom" src={aimBottom} alt="Canvas" width={props.size} height={props.size}/>
            <canvas id="aim-top" width={props.size} height={props.size} onClick={hit}/>
        </div>
    )
}

interface Coordinates {
    x: number
    y: number
}

function coordinatesFromClick(
    event: React.MouseEvent,
    canvas: HTMLCanvasElement,
    size: number,
    shift: number
): Coordinates {
    return { x: 1, y: 2 }
}