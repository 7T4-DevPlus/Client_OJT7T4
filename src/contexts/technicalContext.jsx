import { createContext, useReducer } from "react";
import { technicalReducer } from "../reducers/technicalReducer"
import { apiUrl } from "./constants";
import axios from "axios";

export const TechnicalContext = createContext()

const TechnicalContextProvider = ({children}) => {
    const [technicalState, dispatch] = useReducer(technicalReducer, {
        technical: null,
        technicals: [],
        isLoading: true
    });

    const getTechnicals = async() => {
        try {
            const response = await axios.get(`${apiUrl}/technicals`)
            if (response.data.success) {
                dispatch({type: 'TECH_LOADED_SUCCESS', payload: response.data.technicals})
            }
        } catch (error) {
            dispatch({type: 'TECH_LOADED_FAIL'})
        }
    }

    const addTechnical = async newTech => {
        try {
            const response = await axios.post(`${apiUrl}/technicals/create`, newTech)
            if (response.data.success) {
                dispatch({type: 'TECH_CREATED_SUCCESS', payload: response.data.technical})
                return response.data
            }
        } catch (error) {
            return error.response.data
                ? error.response.data
                : { success: false, message: "Server error" };
        }
    }

    const deleteTechnical = async techId => {
		try {
			const response = await axios.delete(`${apiUrl}/technicals/delete/${techId}`)
			if (response.data.success)
				dispatch({ type: 'DELETE_TECH', payload: techId })
		} catch (error) {
			console.log(error)
		}
	}

	const findTechnical = techId => {
		const technical = technicalState.technicals.find(tech => tech._id === techId)
		dispatch({ type: 'FIND_TECH', payload: technical })
	}
    
    const technicalContextData = {
        technicalState,
        getTechnicals,
        findTechnical,
        addTechnical,
        deleteTechnical
    }

    return (
        <TechnicalContext.Provider value={technicalContextData}>
            {children}
        </TechnicalContext.Provider>
    )
}

export default TechnicalContextProvider
