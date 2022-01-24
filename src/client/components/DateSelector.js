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
	const { dateRange, handleUpdateDates } = props;
	const [fromDate, setFromDate] = useState('');
	const [untilDate, setUntilDate] = useState('');
	const isInitialRenderRef = useRef(true); // switch to prevent dispatch on 1st render
	const fromDateRef = useRef('');
	const untilDateRef = useRef('');

	// set dateRange into picker + re-render on each dateRange update //
	useEffect(() => {
		setFromDate(dateRange.startDate);
		setUntilDate(dateRange.endDate);
	}, [dateRange]);

	// update the new dates in the picker //
	const handleChange = (type, date) => {
		isInitialRenderRef.current = false;
		const formattedDate = moment(date).format("YYYY-MM-DD", true);
		type === "From"
			? setFromDate(formattedDate)
			: setUntilDate(formattedDate);
    };
    
	// upate references to ensure that only the latest date input change is avaialble for dispatch //
	useEffect(() => {
		fromDateRef.current = fromDate;
		untilDateRef.current = untilDate;
	}, [fromDate, untilDate]);

    // Date validation prior to dispatch witha 500 ms timeout //
	useEffect(() => {
		const timeout = setTimeout(() => {
            if (
				!isValidDate(fromDateRef.current) ||
				!isValidDate(untilDateRef.current)
			) {
				alert(
					"Selected dates are not within the avaialble range.",
					"Please revise selection"
				);
			}
			if (
				!isInitialRenderRef.current &&
				isValidDate(fromDateRef.current) &&
				isValidDate(untilDateRef.current)
			) {
				dispatchUpdatedDateRange();
			}
		}, 1000);
		return () => clearTimeout(timeout);
	}, [fromDate, untilDate]);
    
    // dispatch latest reference of the dates to parent
    const dispatchUpdatedDateRange = () => {
        const outputDates = {
            startDate: fromDateRef.current,
		    endDate: untilDateRef.current,
		}
        handleUpdateDates(outputDates);
    }

	// Marterial UI dates input/output requires converison (via moment) //
	return (
		<div id="date-selector">
			<LocalizationProvider dateAdapter={AdapterDateFns}>
				<div className="date-input-field">
					<DatePicker
						label="From"
						value={moment(fromDate).format("MM/DD/YYYY", true)}
						onChange={(date) => handleChange("From", date)}
						disableFuture
						minDate={new Date("06/16/1995")}
						maxDate={
							new Date(moment(untilDate).format("MM/DD/YYYY", true))
						}
						renderInput={(params) => (
							<TextField
								{...params}
								helperText={"photos available from Jun 16 1995"}
							/>
						)}
					/>
				</div>
				<div className="date-input-field">
					<DatePicker
						label="Until"
						value={moment(untilDate).format("MM/DD/YYYY", true)}
						onChange={(date) => handleChange("Until", date)}
						disableFuture
						minDate={
							new Date(moment(fromDate).format("MM/DD/YYYY", true))
						}
						renderInput={(params) => (
							<TextField
								{...params}
								helperText={"latest photo uploaded today"}
							/>
						)}
					/>
				</div>
			</LocalizationProvider>
		</div>
	);
}
