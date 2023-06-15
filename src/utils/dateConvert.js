export const convertDate = (date) => {
  if (date === "-") {
    return "-";
  }
  var creationDate = new Date(date);
  var currentDate = new Date();
  var elapsed = currentDate.getTime() - creationDate.getTime(); // elapsed time in milliseconds
  elapsed < 0 ? (elapsed = elapsed * -1) : (elapsed = elapsed * 1);
  var num = null;
  var dateStr = null;
  if (elapsed < 60000) {
    num = (elapsed / 1000).toFixed(0);
    dateStr = num + (num > 1 ? " secs" : " sec");
  } else if (elapsed > 60000 && elapsed <= 3600000) {
    num = (elapsed / 1000 / 60).toFixed(0);
    dateStr = num + (num > 1 ? " mins" : " min");
  } else if (elapsed > 3600000 && elapsed <= 86400000) {
    num = (elapsed / 1000 / 60 / 60).toFixed(0);
    dateStr = num + (num > 1 ? " hours" : " hour");
  } else if (elapsed > 86400000 && elapsed <= 604800000) {
    num = (elapsed / 1000 / 60 / 60 / 24).toFixed(0);
    dateStr = num + (num > 1 ? " days" : " day");
  } else if (elapsed > 604800000 && elapsed <= 2419200000) {
    num = (elapsed / 1000 / 60 / 60 / 24 / 7).toFixed(0);
    dateStr = num + (num > 1 ? " weeks" : " week");
  } else if (elapsed > 2419200000 && elapsed <= 31536000000) {
    num = (elapsed / 1000 / 60 / 60 / 24 / 30).toFixed(0);
    dateStr = num + (num > 1 ? " months" : " month");
  } else if (elapsed > 31536000000) {
    num = (elapsed / 1000 / 60 / 60 / 24 / 30 / 12).toFixed(0);
    dateStr = num + (num > 1 ? " years" : " year");
  }

  return dateStr;
};
