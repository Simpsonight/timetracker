import { v4 as uuid } from 'uuid';

export const ADD_ENTRY = 'APP/NEW_ENTRY/ADD_ENTRY';

export const addEntry = (entry) => ({
    type: ADD_ENTRY,
    entry,
});

export const entryReducer = (state, action) => {
    switch (action.type) {
        case ADD_ENTRY:
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
