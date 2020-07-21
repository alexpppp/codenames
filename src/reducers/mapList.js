import { SET_MAPLIST } from "../constants/action-types";

export default function mapList(state = [], action) {
    switch (action.type) {
    case SET_MAPLIST:
            return action.payload
	default:
			return state;
    }
}