import moment from 'moment';
export const timestampToDate = (timestamp, format = 'DD/MM/YYYY') => {
    const day = moment.unix(timestamp);
    return day.format(format);
}