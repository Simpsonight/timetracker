import React, { createContext, useReducer, useEffect, useMemo } from "react";
import { clientReducer } from "../reducers/clientReducer";
import initialState from "../__mocks/clientsData";

export const ClientContext = createContext();

const ClientContextProvider = (props) => {
  const [clients, dispatch] = useReducer(clientReducer, [], () => {
    if (typeof window !== "undefined") {
      const localData = localStorage.getItem("clients");
      return localData ? JSON.parse(localData) : initialState;
    }
    
    return initialState;
  });

  useEffect(() => {
    localStorage.setItem("clients", JSON.stringify(clients));
  }, [clients]);

  const contextValue = useMemo(() => {
    return { clients, dispatch };
  }, [clients, dispatch]);

  return (
    <ClientContext.Provider value={contextValue}>
      {props.children}
    </ClientContext.Provider>
  );
};

export default ClientContextProvider;
