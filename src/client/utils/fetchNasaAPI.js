/* utility to fetch an array of photos using specified date range from NASA API */
// NASA data format: 'YYYY-MM-DD'
import axios from 'axios';
import moment from 'moment';

// API data -- need to add to environment variables
const apiKey = 'TiV6ZuAnofGPhtQb5kaU00zIvIwJrbwpvJVBhGxw';

// fetch array of photos
export async function fetchPhotos(input) {
    try {
        const res = await axios.get(`https://api.nasa.gov/planetary/apod?api_key=${apiKey}`, {
            params: {
                start_date: input.startDate,
                end_date: input.endDate
            }
        });
        // for each image: create unique id from  date property + attach like property + format date
        res.data.forEach(el => {
            el.id = el.date.split('-').join('')
            el.liked = false;
            el.date = moment(el.date).format('MMMM Do YYYY')
        });
        return res.data;
    }
    catch (err) {
        console.log(err);
    }
}