import DrawnShot from "../util/DrawnShot"
import Action from "./actions"
import ActionType from "./actionTypes";

export class ReducerState {
    shots: Array<DrawnShot>
    radius: number

    constructor(shots: Array<DrawnShot>, radius: number) {
        this.shots = shots
        this.radius = radius
    }
}

export default function reducer(
    state: ReducerState = new ReducerState([], 1),
    action: Action
): ReducerState {
    switch (action.type) {
        case ActionType.ADD_SHOT: {
            return new ReducerState([...state.shots, action.payload], state.radius)
        }

        case ActionType.DELETE_SHOTS: {
            return new ReducerState([], state.radius)
        }

        case ActionType.REDRAW_CANVAS: {
            return new ReducerState(state.shots, action.payload)
        }

        default: {
            return state
        }
    }
}