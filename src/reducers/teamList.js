import { SET_TEAMLIST } from "../constants/action-types";

export default function teamList(state = [], action) {
    switch (action.type) {
    case SET_TEAMLIST:
            return action.payload
	default:
			return state;
    }
}