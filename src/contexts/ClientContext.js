import React, { createContext, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import initialState from "../__mocks/clientsData";

export const ClientContext = createContext();

const ClientContextProvider = props => {
  const [clients, setClients] = useState(initialState);

  const addClient = client => {
    setClients([...clients, { client, id: uuidv4() }]);
  };

  const removeClient = id => {
    setClients(clients.filter(client => client.id !== id));
  };
  
  return (
    <ClientContext.Provider value={{ clients, addClient, removeClient }}>
      {props.children}
    </ClientContext.Provider>
  );
};

export default ClientContextProvider;