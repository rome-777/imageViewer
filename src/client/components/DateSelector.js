import React, { useState, useEffect, useRef } from 'react';
import moment from 'moment';
import { isValidDate } from '../utils/datevalidation';
import '../../../public/style.css';
/* Material UI modules */
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';

export default function DateSelector(props) {
    /* import props from parent < Gallery > component */
    const { startDate, endDate, setStartDate, setEndDate } = props;
    const [fromDate, setFromDate] = useState(startDate);
    const [untilDate, setUntilDate] = useState(endDate);
    const fromDateRef = useRef('');
    const untilDateRef = useRef('');

    /* handle change and dispatch new propos to parent */   
    const handleChange = (type, date) => {
        const formattedDate = moment(date).format('YYYY-MM-DD', true)
        type === 'from' ? setFromDate(formattedDate) : setUntilDate(formattedDate)
    }

    /* upate references to ensure that only the latest date input change is avaialble for dispatch */
    useEffect(() => {
        fromDateRef.current = fromDate;
        untilDateRef.current = untilDate;
    }, [fromDate, untilDate]);

    /* dispatch latest reference to parent followong 500ms timeout  */
    useEffect(() => {
        const timeout = setTimeout(() => {
            isValidDate(fromDateRef.current) && setStartDate(fromDateRef.current);
            isValidDate(untilDateRef.current) && setEndDate(untilDateRef.current);
            if (!isValidDate(fromDateRef.current) || !isValidDate(untilDateRef.current)) {
                alert('Selected dates are not within the avaialble range.', 'Please revise selection')
            }
        }, 1000);
        return () => clearTimeout(timeout);
    }, [fromDate, untilDate]);

    /* Marterial UI dates iinout/out requires converison (via moment)*/
    return (
        <div id='date-selector'>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
                <div className='date-input-field'>
                    <DatePicker
                        label='From'
                        value={moment(startDate).format('MM/DD/YYYY', true)}
                        onChange={(date) => handleChange('from', date)}
                        disableFuture
                        minDate={new Date('06/16/1995')}
                        maxDate={new Date(moment(endDate).format('MM/DD/YYYY', true))}
                        renderInput={(params) => (
                            <TextField {...params} helperText={'photos available from Jun 16 1995'} />
                        )}
                    />
                </div>
                <div className='date-input-field'>
                    <DatePicker
                        label='Until'
                        value={moment(endDate).format('MM/DD/YYYY', true)}
                        onChange={(date) => handleChange('until', date)}
                        disableFuture
                        minDate={new Date(moment(startDate).format('MM/DD/YYYY', true))}
                        renderInput={(params) => (
                            <TextField {...params} helperText={'latest photo uploaded today'} />
                        )}
                    />
                </div>
            </LocalizationProvider>
        </div>
    )
}
