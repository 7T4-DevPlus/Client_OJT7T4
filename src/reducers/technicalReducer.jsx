export const technicalReducer = (state, action) => {
    const {type, payload} = action
    switch (type) {
        case 'TECH_LOADED_SUCCESS':
            return {
                ...state,
                technicals: payload
            }
        case 'TECH_LOADED_FAIL':
            return {
                ...state,
                 payload: []
            }
        case 'TECH_CREATED_SUCCESS':
            return {
                 ...state,
                 technicals: [...state.technicals, payload]
             }
        case 'DELETE_TECH':
            return {
                ...state,
                technicals: state.technicals.filter(tech => tech._id !== payload)
            }
        case 'FIND_TECH':
            return { ...state, technical: payload }

        default:
            return state
    }
}
