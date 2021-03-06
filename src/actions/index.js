import { SET_CARDLIST, SET_MAPLIST, SET_TEAMLIST, SET_GAME_SETTINGS } from "../constants/action-types";

export const setCardList = payload => 
    ({
    type: SET_CARDLIST,
    payload
 });

export const setMapList = payload => 
    ({
    type: SET_MAPLIST,
    payload
 });

export const setTeamList = payload => 
    ({
    type: SET_TEAMLIST,
    payload
 });

export const setGameSettings = payload => 
    ({
        type: SET_GAME_SETTINGS,
        payload
    });