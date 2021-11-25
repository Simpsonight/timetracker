import React, { createContext, useReducer, useEffect, useMemo } from 'react';
import { entryReducer } from '@/store/reducers/entryReducer';
import initialState from '../../__mocks/entriesData';

export const EntryContext = createContext();

const EntryContextProvider = (props) => {
    const [entries, dispatch] = useReducer(entryReducer, [], () => {
        if (typeof window !== 'undefined') {
            const localData = localStorage.getItem('entries');
            return localData ? JSON.parse(localData) : initialState;
        }
        return initialState;
    });

    useEffect(() => {
        localStorage.setItem('entries', JSON.stringify(entries));
    }, [entries]);

    const contextValue = useMemo(() => {
        return { entries, dispatch };
    }, [entries, dispatch]);

    return <EntryContext.Provider value={contextValue}>{props.children}</EntryContext.Provider>;
};

export default EntryContextProvider;
