import React, { useState, useEffect, useRef } from 'react';
import { today, lookBackDate } from '../utils/initialDates';
import { DateSelector } from '.';
import { dateRangeFetch } from '../utils/fetchAPIAxios';

/* debug */
let renderCount = 1;

/* constants */
const initFirstDay = lookBackDate(); // initial value for startDate
const initLastDay = today(); // initial value for endDate

export default function MainPage() {
    const [photoArray, setPhotoArray] = useState([]);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
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

    //console.log('render count', renderCount++);

    return isMountedRef.current && (
        <div id='main-page'>

            <div id='date-selector'>
                <DateSelector
                    startDate={startDate}
                    endDate={endDate}
                    setStartDate={(date) => setStartDate(date)}
                    setEndDate={(date) => setEndDate(date)}
                /> 
                <div id='mgs-dates'>Please note that photos are only availbel for dates ranging from Jun 16th 1995 until Today</div>
            </div>
            
            <div id='photo-gallery'>
            </div>

            <div id='photo-tiles'>
                {photoArray.map(photo => {
                    return (
                        <div id='photo-tile' key={photo.id}>
                            <img id='img-thumbnail' src={photo.url} />
                        </div>
                    )
                })};
            </div>

        </div>
    )
}
