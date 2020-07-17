function reducer (state, action) {
    switch (action.type) {
		case "SET_CARDLIST":
            return {
                ...state,
                cardList: action.payload
            }
		case "SET_MAPLIST":
            return {
                ...state,
                mapList: action.payload
            }
        case "SET_TEAMLIST":
            return {
                ...state,
                teamList: action.payload
            }
        case "SET_GAME_SETTINGS":
            return {
                ...state,
                gameSettings: action.payload
            }
		default:
			return state;
			 }
}

export default reducer;