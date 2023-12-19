export const projectReducer = (state, action) => {
    const {type, payload} = action
    switch (type) {
        case 'PRO_LOADED_SUCCESS':
            return {
                ...state,
                projects: payload,
                isLoading: false
            }
        case 'EMP_LOADED_FAIL':
            return {
                ...state,
                payload: [],
                isLoading: false
            }
        case 'PRO_CREATED_SUCCESS':
           return {
                ...state,
                projects: payload,
            }
        case 'CLOSE_PROJECT':
            return {
                 ...state,
                 projects: state.projects.filter(pro => pro._id !== payload)
            }
        case 'FIND_PRO':
            return { ...state, project: payload }
        case 'UPDATE_PRO':
            return {
                ...state,
                project: payload
            }
        case 'PRODETAILS_LOADED_SUCCESS':
            return {
                ...state,
                project: payload
            }
        case 'PRODETAILS_LOADED_FAIL':
            return {
                ...state,
                payload: []
            }

        case 'EMPINPRO_LOADED_SUCCESS':
            return {
                ...state,
                employeesInProject: payload,
                isLoading: false
            }
        case 'EMPINPRO_LOADED_FAIL':
            return {
                ...state,
                payload: [],
                isLoading: false
            }
        case 'EMP_ADDED_SUCCESS':
            return {
                ...state,
                employeesInProject: payload,
            }
        case 'REMOVED_EMP':
            return {
                ...state,
                employeesInProject: state.employeesInProject.filter(emp => emp._id !== payload)
            }
        case 'ALLEMPINPRO_LOADED_SUCCESS':
            return {
                ...state,
                allEmployeesInProject: payload,
            }
        case 'ALLEMPINPRO_LOADED_FAIL':
            return {
                ...state,
                payload: [],
            }

        default:
            return state
    }
}
