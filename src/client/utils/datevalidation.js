/* simple date validator */
import { today } from './initdates';
import moment  from 'moment';

/* inputs & constratints */
const format = 'YYYY-MM-DD'
const min = '1995-06-16';
const max = today();

/* validator */
export function isValidDate(date) {
    return (moment(date, format, true).isValid() && moment(date).isBetween(moment(min).subtract(1, 'day'), moment(max).add(1, 'day')))
}