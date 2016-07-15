import * as moment from 'moment';
import config from '../helpers/clientConfig';

export default {
    currentDate: getCurrentDate,
    date: formatDate,
    parse: parseDate,
    currentYear: getCurrentYear
};

function getCurrentDate() {
    return moment().format(config.dateFormat);
}

function formatDate(dateStr) {
    if (!dateStr) return getCurrentDate();

    return moment(dateStr).format(config.dateFormat);
}

function parseDate(dateStr) {
    return moment(dateStr).toDate();
}

function getCurrentYear() {
    return moment().format(config.yearFormat);
}