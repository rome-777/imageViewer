import React, { useState, useEffect, useRef } from 'react';
import { today, lookBackDate } from '../utils/initialDates';
import { DateSelector } from '.';
import { dateRangeFetch } from '../utils/fetchAPIAxios';
import PhotoGallery from './design/PhotoGallery';
import PhotoModal from './design/PhotoModal';

/* debug */
let renderCount = 1;

/* constants */
const initFirstDay = lookBackDate(); // initial value for startDate
const initLastDay = today(); // initial value for endDate

export default function MainPage() {
    const [photoArray, setPhotoArray] = useState([]);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [openModal, setOpenModal] = useState(false);
    const [selectedPhotoId, setSelectedPhotoId] = useState('');
    const [loading, setLoading] = useState(true);
    const datesSetRef = useRef(false); // switch to prevent fetching data before dates are set
    const isMountedRef = useRef(false); // switch to prevent returning JSX on the 1st render

    /* runs on every change in dates */
    useEffect(() => {
        datesSetRef.current && fetchData();
        isMountedRef.current = true;
    }, [startDate, endDate]);
    
    /* runs only on the first render */
    useEffect(() => {
        setStartDate(initFirstDay);
        setEndDate(initLastDay);
        datesSetRef.current = true;
    }, []);

    /* data fetching async function */
    const fetchData = async () => {
        const inputDates = {
            fromDate: startDate,
            untilDate: endDate
        };
        const data = await dateRangeFetch(inputDates);
        setLoading(false);
        setPhotoArray(data);
    };

    const toggleModal = (id, action) => {
        setSelectedPhotoId(id);
        setOpenModal(action);
    } 

    //console.log('render count', renderCount++);

    return isMountedRef.current && (
        <div id='main-page'>
            <div id='date-selector'>
                <DateSelector
                    startDate={startDate}
                    endDate={endDate}
                    setStartDate={(date) => setStartDate(date)}
                    setEndDate={(date) => setEndDate(date)} // is this passed coprrectly???
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
                    photo={photoArray.find(el => el.id === selectedPhotoId)} // filter to give it just the photo obj
                    openModal={openModal}
                    toggleModal={toggleModal}
                />
            </div>
        </div>
    )
}
