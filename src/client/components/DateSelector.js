import React, { useState, useEffect, useRef } from 'react';
import { isValidDate } from '../utils/dateValidator';

export default function DateSelector(props) {
    /* import props from parent < Gallery > component */
    const { startDate, endDate, setStartDate, setEndDate, initialFirstDay } = props;
    const [fromDate, setFromDate] = useState(startDate);
    const [untilDate, setUntilDate] = useState(endDate);
    const fromDateRef = useRef('');
    const untilDateRef = useRef('');

    /* handle change with timeout and dispatch new propos to parent */   
    const handleChange = (e) => {
        (e.target.name === 'fromDate') ?
            setFromDate(e.target.value) : setUntilDate(e.target.value)
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
                alert('selected dates are not valid')
            }
        }, 1000);
        return () => clearTimeout(timeout);
    }, [fromDate, untilDate]);

    return (
        <div id='date-selctor-inputs'>
            
            <label>From</label>
            <input
                type='date'
                name='fromDate'
                id='cal-start-date'
                value={fromDate}
                onChange={(e) => handleChange(e)}
                min='1995-06-16'
                max={initialFirstDay}
            >
            </input>

            <label>Until</label>
            <input 
                type='date'
                name='untilDate'
                id='cal-end-date'
                value={untilDate}
                onChange={(e) => handleChange(e)}
                min='1995-06-16'
                max={initialFirstDay}
            >
            </input>

        </div>
    )
}
