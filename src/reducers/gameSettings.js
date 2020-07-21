import { SET_GAME_SETTINGS } from "../constants/action-types";

export default function gameSettings(state = {}, action) {
    switch (action.type) {
    case SET_GAME_SETTINGS:
            return action.payload
	default:
			return state;
    }
}
