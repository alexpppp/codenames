import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools} from 'redux-devtools-extension';
import logger from 'redux-logger';
import reducer from "../reducers/index";

const initialState = { 
    cardList: [],
    mapList: [],
    teamList: [
            { 
            team: "red",
            isTurn: false,
            count: 8
        },
        { 
            team: "blue",
            isTurn: true,
            count: 8,
        }
        ],
    gameSettings: {
            isOver: false,
            winner: null,
            startingTeam: "blue",
            showMap: false
        }
 };

export const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(logger)));