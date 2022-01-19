import React, { useState, useEffect, useRef } from 'react';
import moment from 'moment';
import { isValidDate } from '../utils/dateValidator';
// Material UI imports
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Stack from '@mui/material/Stack';
import { TextField } from '@mui/material';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { LocalizationProvider } from '@mui/lab';
import { DatePicker } from '@mui/lab';


function alertMUI(text, action) {
    return (
        <Alert severity="error">
            <AlertTitle>Error</AlertTitle>
            {text}<strong>{action}</strong>
        </Alert>
    )
}

export default function DateSelector(props) {
    /* import props from parent < Gallery > component */
    const { startDate, endDate, setStartDate, setEndDate, initialFirstDay } = props;
    const [fromDate, setFromDate] = useState(startDate);
    const [untilDate, setUntilDate] = useState(endDate); // is this correct? am i trying to mutete state directly?
    const fromDateRef = useRef('');
    const untilDateRef = useRef('');

    /* handle change with timeout and dispatch new propos to parent */   
    const handleChange = (type, input) => {
        const date = moment(input).format('YYYY-MM-DD', true)
        type === 'from' ? setFromDate(date) : setUntilDate(date)
    }

    /* upate references to ensure that only the latest date input change is avaialble for dispatch */
    useEffect(() => {
        fromDateRef.current = fromDate;
        untilDateRef.current = untilDate;
    }, [fromDate, untilDate]);

    /* dispatch latest reference to parent followong 500 ms timeout  */
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

    return (
        <div id='date-selector'>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
                <div className='date-input-field'>
                    <DatePicker
                        label='From'
                        value={fromDate}
                        onChange={(value) => handleChange('from', value)}
                        maxDate={initialFirstDay}
                        minDate='1995-06-16'
                        renderInput={(params) => (
                            <TextField {...params} helperText={'photos available from Jun 16 1995'} />
                        )}
                    />
                </div>
                <div className='date-input-field'>
                    <DatePicker
                        label='Until'
                        value={untilDate}
                        onChange={(value) => handleChange('until', value)}
                        maxDate={initialFirstDay}
                        minDate='1995-06-16'
                        showTodayButton={true}
                        renderInput={(params) => (
                            <TextField {...params} helperText={'latest photo uploaded today'} />
                        )}
                    />
                </div>
            </LocalizationProvider>
        </div>
    )
}
