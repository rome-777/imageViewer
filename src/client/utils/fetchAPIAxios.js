/* utility to fetch an array of photos using specified date range from NASA API */
// NASA data format: 'YYYY-MM-DD'
import axios from 'axios';

// API data
const apiKey = 'TiV6ZuAnofGPhtQb5kaU00zIvIwJrbwpvJVBhGxw';

// fetch array of photos
export async function dateRangeFetch(input) {
    try {
        const res = await axios.get(`https://api.nasa.gov/planetary/apod?api_key=${apiKey}`, {
            params: {
                start_date: input.fromDate,
                end_date: input.untilDate
            }
        });
        // create unique id for each image from their 'date property + add array of likes to each image
        res.data.forEach(el => {
            el.id = el.date.split('-').join('')
            el.liked = false;
        });
        return res.data;
    }
    catch (err) {
        console.log(err);
    }
}

// fetch single photo (object)
export async function singlePhotoFetch(input) {
    try {
        const res = await axios.get(`https://api.nasa.gov/planetary/apod?api_key=${apiKey}`, {
            params: {
                date: input.fromDate
            }
        });
        return res.data;
    }
    catch (err) {
        console.log(err);
    }
}