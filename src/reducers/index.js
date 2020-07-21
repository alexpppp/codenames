import { combineReducers } from 'redux';
import cardList from "./cardList";
import mapList from "./mapList";
import teamList from "./teamList";
import gameSettings from "./gameSettings";

export default combineReducers({
    cardList,
    mapList,
    teamList,
    gameSettings
});



// import { SET_CARDLIST, SET_MAPLIST, SET_TEAMLIST, SET_GAME_SETTINGS } from "../constants/action-types";

// function reducer (state, action) {
//     switch (action.type) {
// 		case SET_CARDLIST:
//             return {
//                 ...state,
//                 cardList: action.payload
//             }
// 		case SET_MAPLIST:
//             return {
//                 ...state,
//                 mapList: action.payload
//             }
//         case SET_TEAMLIST:
//             return {
//                 ...state,
//                 teamList: action.payload
//             }
//         case SET_GAME_SETTINGS:
//             return {
//                 ...state,
//                 gameSettings: action.payload
//             }
// 		default:
// 			return state;
// 			 }
// }

// export default reducer;