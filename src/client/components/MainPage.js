import React, { useState, useEffect, useRef } from 'react';
import { useCookies } from 'react-cookie';
import axios from 'axios';
import { today, lookBackDate } from '../utils/initdates';
import { DateSelector } from '.';
import { dateRangeFetch } from '../utils/fetchNasaAPI';
import PhotoGallery from './design/PhotoGallery';
import PhotoModal from './design/PhotoModal';
import '../../../public/style.css';

// constants //
const initFirstDay = lookBackDate(); // initial value for startDate
const initLastDay = today(); // initial value for endDate

export default function MainPage() {
    const [cookies, setCookie, removeCookie] = useCookies(['user']);
    const [userLikedPhotosList, setLikedPhotos] = useState(new Set());
    const [loadedPhotosArray, setPhotosArray] = useState([]);
    const [selectedPhoto, setSelectedPhoto] = useState({});
    const [toggleModal, setModal] = useState(false);
    const [loading, setLoading] = useState(true); // loader - TBD
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const datesSetRef = useRef(false); // switch to prevent fetching data before initial dates are set
    const isMountedRef = useRef(false); // switch to prevent returning JSX on the 1st render

    // runs on every change in dates to fetch photos //
    useEffect(() => {
        datesSetRef.current && fetchData();
        isMountedRef.current = true;
    }, [startDate, endDate]);
    
    // set initial dates to render initial photos -- runs only on the first render //
    useEffect(() => {
        setStartDate(initFirstDay);
        setEndDate(initLastDay);
        datesSetRef.current = true;
    }, []);

    // create cookie for the user //
    useEffect(() => {
        (async () => {
            try {
                const { data } = await axios.get('/api/getUserName');
                setCookie(data, 'cookieMonster', { path: "/" });
            } catch (err) {
                console.log(err)
            }
        })();
    }, []);

    // async data fetch call to API //
    const fetchData = async () => {
        const inputDates = {
            fromDate: startDate,
            untilDate: endDate
        };
        const data = await dateRangeFetch(inputDates);
        setLoading(false);
        setPhotosArray(data);
    };

    // find the selected photo and keep in temp state //
    const handleSelectedPhoto = (id) => {
        const photo = loadedPhotosArray.find(el => el.id === id)
        setSelectedPhoto(photo);
    }

    // handle like: update selected photo and set state with new array //
    const handleLikeButton = () => {
        selectedPhoto.liked = !selectedPhoto.liked ? true : false;
        let updatedPhotoArray = loadedPhotosArray.map(el => el.id === selectedPhoto.id ? { ...el, selectedPhoto } : el)
        setPhotosArray(updatedPhotoArray);
    }

    console.log(loadedPhotosArray)
    console.log(selectedPhoto);

    return isMountedRef.current && (
        <div id='main-page'>
            <div id='date-selector'>
                <DateSelector
                    startDate={startDate}
                    endDate={endDate}
                    setStartDate={(date) => setStartDate(date)}
                    setEndDate={(date) => setEndDate(date)}
                /> 
            </div>
            <div id='photo-gallery'>
                <PhotoGallery
                    loadedPhotosArray={loadedPhotosArray}
                    setModal={setModal}
                    handleSelectedPhoto={handleSelectedPhoto}
                />
            </div>
            <div id='photo-modal'>
                <PhotoModal
                    selectedPhoto={selectedPhoto}
                    toggleModal={toggleModal}
                    setModal={setModal}
                    handleLikeButton={handleLikeButton}
                    setSelectedPhoto={setSelectedPhoto}
                />
            </div>
        </div>
    )
}
