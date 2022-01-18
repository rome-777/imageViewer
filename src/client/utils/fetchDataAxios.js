/* utility to fetch an array of photos from specified date range */
import axios from 'axios';
const apiKey = 'TiV6ZuAnofGPhtQb5kaU00zIvIwJrbwpvJVBhGxw';
// YYYY-MM-DD
const startDate = '2017-07-08'
const endDate = '2017-07-10'

// async function to fetch a single photo from selected date
export async function fetchPhotoRange() {
    try {
        const res = await axios.get(`https://api.nasa.gov/planetary/apod?api_key=${apiKey}`, {
            params: {
                start_date: startDate,
                end_date: endDate
            }
        });
        // create unique id for each image from their 'date property
        res.data.forEach(el => {
            el.id = parseInt(el.date.split('-').join(''))
        });
        return res.data;
    }
    catch (err) {
        console.log(err);
    }
}

// async function to fetch a single photo object from selected date
export async function fetchSinglePhoto() {
    try {
        const res = await axios.get(`https://api.nasa.gov/planetary/apod?api_key=${apiKey}`, {
            params: {
                date: startDate
            }
        });
        return res.data;
    }
    catch (err) {
        console.log(err);
    }
}