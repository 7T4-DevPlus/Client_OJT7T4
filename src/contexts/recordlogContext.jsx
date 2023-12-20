import { createContext, useReducer } from "react";
import { recordReducer } from "../reducers/recordReducer"
import { apiUrl } from "./constants";
import axios from "axios";

export const RecordContext = createContext()

const RecordContextProvider = ({children}) => {
    const [recordState, dispatch] = useReducer(recordReducer, {
        records: [],
        isLoading: true
    });

    const getRecords = async() => {
        try {
            const response = await axios.get(`${apiUrl}/records`)
            if (response.data.success) {
                dispatch({type: 'RECORDS_LOADED_SUCCESS', payload: response.data.records})
            }
        } catch (error) {
            dispatch({type: 'RECORDS_LOADED_FAIL'})
        }
    }
    
    const technicalContextData = {
        recordState,
        getRecords
    }

    return (
        <RecordContext.Provider value={technicalContextData}>
            {children}
        </RecordContext.Provider>
    )
}

export default RecordContextProvider
