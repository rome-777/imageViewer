/* utility to fetch the photo */
import axios from 'axios';
const apiKey = 'TiV6ZuAnofGPhtQb5kaU00zIvIwJrbwpvJVBhGxw';

export function fetchSinglePhoto() {
    try {
        return axios.get(`https://api.nasa.gov/planetary/apod?api_key=${apiKey}`)
    } catch (err) {
        console.log(err);
    }
}
