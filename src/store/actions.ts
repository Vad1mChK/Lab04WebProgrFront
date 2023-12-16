import ActionType from "./actionTypes";
import DrawnShot from "../util/DrawnShot";

export interface AddShotAction {
    type: ActionType.ADD_SHOT
    payload: DrawnShot
}

export interface DeleteShotsAction {
    type: ActionType.DELETE_SHOTS
}

export interface RedrawCanvasAction {
    type: ActionType.REDRAW_CANVAS
    payload: number
}

type Action = AddShotAction | DeleteShotsAction | RedrawCanvasAction

export function addShot(shot: DrawnShot): AddShotAction {
    return {
        type: ActionType.ADD_SHOT,
        payload: shot
    }
}

export function deleteShots(): DeleteShotsAction {
    return {
        type: ActionType.DELETE_SHOTS
    }
}

export function redrawCanvas(r: number): RedrawCanvasAction {
    return {
        type: ActionType.REDRAW_CANVAS,
        payload: r
    }
}

export default Action