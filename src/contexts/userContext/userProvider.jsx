import { createContext, useReducer } from "react";
import { initialStore, reducer } from "./userStore";

export const UserContext = createContext();

const UserProviderContext = ({ children }) => {
  const [store, dispatch] = useReducer(reducer, initialStore);

  return (
    <UserContext.Provider value={{ store, dispatch }}>
      {children}
    </UserContext.Provider>
  );
};
export default UserProviderContext;
