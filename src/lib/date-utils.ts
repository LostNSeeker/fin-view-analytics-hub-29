
import { format, formatDistance } from 'date-fns';

export const formatDate = (date: string | Date, includeTime = false): string => {
  if (!date) return 'N/A';
  
  const dateObj = new Date(date);
  if (includeTime) {
    return format(dateObj, 'MMM d, yyyy h:mm a');
  }
  return format(dateObj, 'MMM d, yyyy');
};

export const formatTimeAgo = (date: string | Date): string => {
  if (!date) return 'N/A';
  
  const dateObj = new Date(date);
  return formatDistance(dateObj, new Date(), { addSuffix: true });
};
