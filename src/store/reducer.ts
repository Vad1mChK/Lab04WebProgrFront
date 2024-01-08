import Action from "./actions"
import ActionType from "./actionTypes";
import Shot from "../util/Shot";

export class ReducerState {
    shots: Array<Shot>
    radius: string

    constructor(shots: Array<Shot>, radius: string) {
        this.shots = shots
        this.radius = radius
    }
}

export default function reducer(
    state: ReducerState = new ReducerState([], localStorage.getItem('r') ?? '1'),
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