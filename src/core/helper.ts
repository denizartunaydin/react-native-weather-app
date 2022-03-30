import moment from 'moment';

export const DataFormatType = {
  dateFormat: 'DD.MM.YYYY',
  dateTimeFormat: 'DD.MM.YYYY HH:mm',
  timeFormat: 'HH:mm',
  dayFormat: 'DD',
  monthFormat: 'MMMM',
  yearFormat: 'yyyy',
  getTimeZone: 'YYYY-MM-DD',
};

const dateFormat = (date: any, format: string) => {
  if (date) return moment(date).format(format);
};

const objToQueryString = (obj: any) => {
  const keyValuePairs = [];
  for (const key in obj) {
    keyValuePairs.push(
      encodeURIComponent(key) + '=' + encodeURIComponent(obj[key]),
    );
  }
  return keyValuePairs.join('&');
};

export const Helper = {
  dateFormat: dateFormat,
  objToQueryString: objToQueryString,
};
