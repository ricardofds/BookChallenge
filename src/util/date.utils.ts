import { format } from 'date-fns';

export const dateFormat = (value: number | Date) => {
  if (!value) return '';

  return format(value, 'dd/MM/yyyy');
};
