import React, { createContext, useReducer, useEffect } from "react";
import { entryReducer } from "../reducers/entryReducer";
import initialState from "../__mocks/entriesData";

export const EntryContext = createContext();

const EntryContextProvider = (props) => {
  const [entries, dispatch] = useReducer(entryReducer, [], () => {
    const localData = localStorage.getItem("entries");
    return localData ? JSON.parse(localData) : initialState;
  });

  useEffect(() => {
    localStorage.setItem("entries", JSON.stringify(entries));
  }, [entries]);

  return (
    <EntryContext.Provider value={{ entries, dispatch }}>
      {props.children}
    </EntryContext.Provider>
  );
};

export default EntryContextProvider;
