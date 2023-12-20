export const roleReducer = (state, action) => {
    const {type, payload} = action
    switch (type) {
        case 'ROLE_LOADED_SUCCESS':
            return {
                ...state,
                roles: payload
            }
        case 'ROLE_LOADED_FAIL':
            return {
                ...state,
                 payload: []
            }
        case 'ROLE_CREATED_SUCCESS':
            return {
                 ...state
             }
        case 'DELETE_ROLE':
            return {
                ...state
            }
        case 'FIND_ROLE':
            return { ...state, role: payload }

        default:
            return state
    }
}
