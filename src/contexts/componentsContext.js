import { createContext, useReducer, useState } from "react";

export const ComponentsContext = createContext()

const ComponentsContextProvider = ({children}) => {
    const [checkedItems, setCheckedItems] = useState([]);
    const [radioItem, setRadioItem] = useState(null);
    
    const checkContextData = {
        checkedItems,
        setCheckedItems,
        radioItem,
        setRadioItem
    }

    return (
        <ComponentsContext.Provider value={checkContextData}>
            {children}
        </ComponentsContext.Provider>
    )
}

export default ComponentsContextProvider