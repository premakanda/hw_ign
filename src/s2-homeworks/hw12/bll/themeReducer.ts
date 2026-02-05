export type InitStateType = {
    themeId:  number
}
const initState = {
    themeId: 1,
}

export const themeReducer = (state = initState, action: ChangeThemeType): InitStateType => { // fix any
    switch (action.type) {
        // дописать
         case "SET_THEME_ID":
            return {
                ...state,
                themeId: action.themeId
            }

        default:
            return state
    }
}

type ChangeThemeType = {
    type: 'SET_THEME_ID'
    themeId: number
}


export const changeThemeId = (id: number): ChangeThemeType => ({ type: 'SET_THEME_ID', themeId: id }) // fix any
