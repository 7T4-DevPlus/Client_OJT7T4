import { createContext, useReducer } from "react";
import { roleReducer } from "../reducers/roleReducer"
import { apiUrl } from "./constants";
import axios from "axios";

export const RoleContext = createContext()

const RoleContextProvider = ({children}) => {
    const [roleState, dispatch] = useReducer(roleReducer, {
        role: null,
        roles: [],
        isLoading: true
    });

    const getRoles = async() => {
        try {
            const response = await axios.get(`${apiUrl}/roles`)
            if (response.data.success) {
                dispatch({type: 'ROLE_LOADED_SUCCESS', payload: response.data.roles})
            }
        } catch (error) {
            dispatch({type: 'ROLE_LOADED_FAIL'})
        }
    }

    const addRole = async newRole => {
        try {
            const response = await axios.post(`${apiUrl}/roles/create`, newRole)
            if (response.data.success) {
                dispatch({type: 'ROLE_CREATED_SUCCESS'})
                return response.data
            }
        } catch (error) {
            return error.response.data
                ? error.response.data
                : { success: false, message: "Server error" };
        }
    }

    const deleteRole = async roleId => {
		try {
			const response = await axios.delete(`${apiUrl}/roles/delete/${roleId}`)
			if (response.data.success)
				dispatch({ type: 'DELETE_ROLE' })
		} catch (error) {
			console.log(error)
		}
	}

	const findRole = roleId => {
		const role = roleState.roles.find(role => role._id === roleId)
		dispatch({ type: 'FIND_ROLE', payload: role })
	}
    
    const roleContextData = {
        roleState,
        getRoles,
        addRole,
        deleteRole,
        findRole
    }

    return (
        <RoleContext.Provider value={roleContextData}>
            {children}
        </RoleContext.Provider>
    )
}

export default RoleContextProvider
