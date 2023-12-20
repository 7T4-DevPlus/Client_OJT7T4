export const recordReducer = (state, action) => {
    const {type, payload} = action
    switch (type) {
        case 'RECORDS_LOADED_SUCCESS':
            return {
                ...state,
                records: payload,
                isLoading: false
            }
        case 'RECORDS_LOADED_FAIL':
            return {
                ...state,
                 payload: []
            }
        default:
            return state
    }
}
