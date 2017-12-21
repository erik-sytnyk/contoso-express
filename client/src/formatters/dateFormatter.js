import moment from 'moment';
import config from '../helpers/clientConfig';

export default {
  currentDate: getCurrentDate,
  date: formatDate,
  parse: parseDate,
  isValid: isValidDate,
  currentYear: getCurrentYear
};

function getCurrentDate() {
  var now = new Date();
  return now.toISOString();
}

function formatDate(dateStr) {
  if (!dateStr) dateStr = getCurrentDate();

  return moment(dateStr).format(config.format.date);
}

function parseDate(dateStr) {
  return moment(dateStr).toDate();
}

function isValidDate(dateStr) {
  return moment(dateStr, moment.ISO_8601, true).isValid();
}

function getCurrentYear() {
  return moment().format(config.format.year);
}
