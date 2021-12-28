import { v4 as uuid } from 'uuid';

export const ADD_ENTRY = 'APP/ENTRY/ADD_ENTRY';
export const DELETE_ENTRY = 'APP/ENTRY/DELETE_ENTRY';

export const addEntry = (entry) => ({
    type: ADD_ENTRY,
    entry,
});

export const deleteEntry = (id) => ({
    type: DELETE_ENTRY,
    id,
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
        case DELETE_ENTRY:
            return state.filter((item) => item.id !== action.id);
        default:
            return state;
    }
};
