import moment from 'moment';

export const getDateTimeNowLocalISOString = () => {
  const tzoffset = new Date().getTimezoneOffset() * 60000; //offset in milliseconds
  const localISOTime = new Date(Date.now() - tzoffset)
    .toISOString()
    .slice(0, -1);
  return localISOTime;
};

export const convertToReadableDateTime = (date) => {
  let dateFormat = null;
  if (date) {
      dateFormat = moment(date).format("DD MMM yyyy HH:mm:ss A");
  }
  return dateFormat;
}