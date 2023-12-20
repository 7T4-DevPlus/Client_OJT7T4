export const employeeReducer = (state, action) => {
    const {type, payload} = action
    switch (type) {
        case 'EMP_LOADED_SUCCESS':
            return {
                ...state,
                employees: payload,
                isLoading: false
            }
        case 'EMP_LOADED_FAIL':
            return {
                ...state,
                payload: [],
                isLoading: false
            }
        case 'EMP_CREATED_SUCCESS':
           return {
                ...state,
                employees: payload,
            }
        case 'DELETE_EMP':
            return {
                 ...state,
                 employees: state.employees.filter(employee => employee._id !== payload)
            }
        case 'FIND_EMP':
            return { ...state, employee: payload }
        case 'UPDATE_EMP':
            return {
                ...state,
                employee: payload
            }
        case 'EMPDETAILS_LOADED_SUCCESS':
            return {
                ...state,
                employee: payload
            }
        case 'EMPDETAILS_LOADED_FAIL':
            return {
                ...state,
                payload: []
            }
        case 'HISTORY_LOADED_SUCCESS':
            return {
                ...state,
                histories: payload
            }
        case 'HISTORY_LOADED_FAIL':
            return {
                ...state,
                payload: []
            }

        default:
            return state
    }
}
