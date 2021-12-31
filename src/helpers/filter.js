import { format, startOfWeek, endOfWeek, isWithinInterval } from 'date-fns';

export const filterRange = (entries, filterType, filterValue = '') => {
    return entries
        .filter((entry) => {
            const entryDate = new Date(entry.date);
            const currentDate = new Date();
            const START_CURRENT_WEEK = startOfWeek(currentDate, {
                weekStartsOn: 1,
            });
            const END_CURRENT_WEEK = endOfWeek(currentDate, { weekStartsOn: 1 });

            switch (filterType) {
                case 'today':
                    return format(entryDate, 'dd') === format(currentDate, 'dd');
                case 'week':
                    return isWithinInterval(entryDate, {
                        start: new Date(START_CURRENT_WEEK),
                        end: new Date(END_CURRENT_WEEK),
                    });
                case 'month':
                    return format(entryDate, 'MM') === format(currentDate, 'MM');
                case 'individual':
                    return format(entryDate, 'MM/dd/yyyy') === format(new Date(filterValue), 'MM/dd/yyyy');
                default:
                    return entry;
            }
        })
        .sort((a, b) => {
            const dateA = new Date(a.date);
            const dateB = new Date(b.date);
            return dateB - dateA;
        });
};
