import { format, getYear } from 'date-fns';

export const getDate = (time: number) => `${format(new Date(time), 'LLLL')}, ${getYear(time)}`;
