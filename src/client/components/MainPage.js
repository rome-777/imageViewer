import React, { useState, useEffect, useRef } from 'react';
import { useCookies } from 'react-cookie';
import axios from 'axios';
import { today, lookBackDate } from '../utils/initdates';
import { DateSelector } from '.';
import { dateRangeFetch } from '../utils/fetchNasaAPI';
import PhotoGallery from './design/PhotoGallery';
import PhotoModal from './design/PhotoModal';
import '../../../public/style.css';

/* constants */
const initFirstDay = lookBackDate(); // initial value for startDate
const initLastDay = today(); // initial value for endDate

export default function MainPage() {
    const [cookies, setCookie, removeCookie] = useCookies(['user']);
    const [likedPhotos, setLikedPhoto] = useState(new Set());
    const [photoArray, setPhotoArray] = useState([]);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [openModal, setOpenModal] = useState(false);
    const [selectedPhotoId, setSelectedPhotoId] = useState('');
    const [loading, setLoading] = useState(true); // loader - TBD
    const datesSetRef = useRef(false); // switch to prevent fetching data before dates are set
    const isMountedRef = useRef(false); // switch to prevent returning JSX on the 1st render

    /* runs on every change in dates to fetch photos */
    useEffect(() => {
        datesSetRef.current && fetchData();
        isMountedRef.current = true;
    }, [startDate, endDate]);
    
    /* set initial dates to render initial photos -- runs only on the first render */
    useEffect(() => {
        setStartDate(initFirstDay);
        setEndDate(initLastDay);
        datesSetRef.current = true;
    }, []);

    /* create cookie for the user */
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

    /* async data fetch call to API */
    const fetchData = async () => {
        const inputDates = {
            fromDate: startDate,
            untilDate: endDate
        };
        const data = await dateRangeFetch(inputDates);
        setLoading(false);
        setPhotoArray(data);
    };

    /* open modal with photo details when the thumbnail is clicked */
    const toggleModal = (id, action) => {
        setSelectedPhotoId(id);
        setOpenModal(action);
    }

    /* handle like */
    const handleLikeButton = (id) => {
        const photo = photoArray.find(el => el.id === id)
        if (!photo.liked) {
            setLikedPhoto(prev => new Set(prev.add(id)));
        } else {
            setLikedPhoto(prev => new Set(prev.delete(id)));
        }
    }

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
                    photoArray={photoArray}
                    toggleModal={toggleModal}
                />
            </div>
            <div id='photo-modal'>
                <PhotoModal
                    photo={photoArray.find(el => el.id === selectedPhotoId)}
                    openModal={openModal}
                    toggleModal={toggleModal}
                    handleLikeButton={handleLikeButton}
                />
            </div>
        </div>
    )
}
