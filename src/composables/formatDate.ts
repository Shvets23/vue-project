import moment from 'moment';

export default function formatDate() {
  const formatTaskDate = (date: string): string => {
    return moment(date).format('YYYY-MM-DD');
  };
  return {
    formatTaskDate,
  };
}
