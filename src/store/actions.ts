import ActionType from "./actionTypes";
import Shot from "../util/Shot";

export interface AddShotAction {
    type: ActionType.ADD_SHOT
    payload: Shot
}

export interface DeleteShotsAction {
    type: ActionType.DELETE_SHOTS
}

export interface RedrawCanvasAction {
    type: ActionType.REDRAW_CANVAS
    payload: string
}

type Action = AddShotAction | DeleteShotsAction | RedrawCanvasAction

export function addShot(shot: Shot): AddShotAction {
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

export function redrawCanvas(r: string): RedrawCanvasAction {
    return {
        type: ActionType.REDRAW_CANVAS,
        payload: r
    }
}

export default Action