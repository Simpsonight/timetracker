import { v4 as uuid } from 'uuid';

export const ADD_CLIENT = 'APP/CLIENTS/ADD_CLIENT';

export const addEntry = (client) => ({
    type: ADD_CLIENT,
    client,
});

export const clientReducer = (state, action) => {
    switch (action.type) {
        case ADD_CLIENT:
            return [
                ...state,
                {
                    id: uuid(),
                    ...action.entry,
                },
            ];
        default:
            return state;
    }
};
