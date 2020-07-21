import { SET_CARDLIST } from "../constants/action-types";

export default function cardList(state = [], action) {
    switch (action.type) {
    case SET_CARDLIST:
        console.log('setting cardlist?')
            return action.payload
	default:
			return state;
    }
}
