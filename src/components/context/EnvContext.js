import { createContext, useReducer } from "react";
import EnvReducer, { INITSTATE } from "./EnvReducer";

export const EnvContext = createContext(INITSTATE);

export const EnvContextProvider = ({ children }) => {
    const [state,envDispatch] = useReducer(EnvReducer, INITSTATE);
    return(
        <EnvContext.Provider
        value={{
            status: state.status,
            users: state.users,
            login: state.login,
            displayadd: state.displayadd,
            courseiddisplay: state.courseiddisplay,
            allcourses: state.allcourses,
            envDispatch,
        }}>
            {children}
        </EnvContext.Provider>
    );
};