import { createContext, useState } from "react";

export const ComponentsContext = createContext()

const ComponentsContextProvider = ({children}) => {
    const [processing, setProcessing] = useState(false);
    const [alert, setAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");
    const [alertType, setAlertType] = useState("");
    const [searchType, setSearchType] = useState("employee");
    
    const checkContextData = {
        processing,
        setProcessing,
        alert,
        setAlert,
        alertMessage,
        setAlertMessage,
        alertType,
        setAlertType,
        searchType,
        setSearchType
    }

    return (
        <ComponentsContext.Provider value={checkContextData}>
            {children}
        </ComponentsContext.Provider>
    )
}

export default ComponentsContextProvider
