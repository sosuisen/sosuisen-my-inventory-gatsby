export const getLocalDateAndTime = (utcDateAndTime) => {
  const regularUTC = utcDateAndTime.replace(
    /^(\d\d\d\d)-(\d\d)-(\d\d).(\d\d:\d\d:\d\d)/,
    '$1/$2/$3 $4'
  );
  const offset = new Date().getTimezoneOffset();
  const utcMsec = Date.parse(regularUTC);

  const localMsec = utcMsec - offset * 60 * 1000;
  const localDate = new Date(localMsec);
  const zeroPad = (num) => ('00' + num).slice(-2);
  return `${localDate.getFullYear()}/${zeroPad(localDate.getMonth()+1)}/${zeroPad(localDate.getDate())} ${zeroPad(localDate.getHours())}:${zeroPad(localDate.getMinutes())}`;
};
