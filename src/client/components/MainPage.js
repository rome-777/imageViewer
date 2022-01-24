import React, { useState, useEffect, useRef, useReducer } from 'react';
import { useCookies } from 'react-cookie';
import axios from 'axios';
import { today, lookBackDate } from '../utils/initdates';
import { DateSelector } from '.';
import { fetchPhotos } from '../utils/fetchNasaAPI';
import PhotoGallery from './design/PhotoGallery';
import PhotoModal from './design/PhotoModal';
import '../../../public/style.css';

// -- CONSTANTS -- //
const initStartDate = lookBackDate(); // initial value for startDate
const initEndDate = today(); // initial value for endDate
const SET_DATE_RANGE = "SET_DATE_RANGE";
const SET_LOADED_PHOTOS = "SET_LOADED_PHOTOS";
const SET_SELECTED_PHOTO = "SET_SELECTED_PHOTO";
const HANDLE_LIKE = "HANDLE_LIKE";

//-- REDUCER ACTIONS -- //
const _setLoadedPhotos = (photos) => ({ type: "SET_LOADED_PHOTOS", photos });
const _setSelectedPhoto = (photo) => ({ type: "SET_SELECTED_PHOTO", photo });
const _setDateRange = (dates) => ({ type: "SET_DATE_RANGE", dates });
const _handleLike = () => ({ type: "HANDLE_LIKE" });

// -- REDUCER -- //
const initialState = {
	dateRange: {
		startDate: initStartDate,
		endDate: initEndDate,
	},
	loadedPhotos: [],
	selectedPhoto: {},
	userLikedPhotos: new Set(),
};
const reducer = (state, action) => {
    switch (action.type) {
		case SET_DATE_RANGE:
			return { ...state, dateRange: action.dates };
		case SET_LOADED_PHOTOS:
			return { ...state, loadedPhotos: action.photos };
		case SET_SELECTED_PHOTO:
			return { ...state, selectedPhoto: action.photo };
        case HANDLE_LIKE:
            let newPhoto = { ...state.selectedPhoto, liked: !state.selectedPhoto.liked }
            let newLoadedPhotos = state.loadedPhotos.map(el => el.id === state.selectedPhoto.id ? { ...el, ...newPhoto } : el)
            return { ...state, selectedPhoto: newPhoto, loadedPhotos: newLoadedPhotos };
		default:
			return state;
	}
};

export default function MainPage() {
	const [state, dispatch] = useReducer(reducer, initialState);
	const [cookies, setCookie, removeCookie] = useCookies(["user"]);
	const [openModal, setModal] = useState(false);
	const [isLoading, setLoading] = useState(false);

	// runs on every change in dates to fetch photos //
	useEffect(() => {
		fetchData();
	}, [state.dateRange]);

	// async fetch call to fetch photos from API //
	const fetchData = async () => {
		// console.log("fetched"); // *** LOG *** ///
		setLoading(true);
		const data = await fetchPhotos(state.dateRange);
		dispatch(_setLoadedPhotos(data));
		setLoading(false);
	};

	// create cookie for the user //
	// useEffect(() => {
	// 	return async () => {
	// 		try {
	// 			const { data } = await axios.get("/api/getUserName");
	// 			setCookie(data, "cookieMonster", { path: "/" });
	// 		} catch (err) {
	// 			console.log(err);
	// 		}
	// 	};
	// }, []);

	const handleLikeButton = () => {
		dispatch(_handleLike());
	};

	const handlePhotoClick = (photo) => {
		dispatch(_setSelectedPhoto(photo));
		setModal(true);
	};

	const handleCloseModal = () => {
		setModal(false);
		dispatch(_setSelectedPhoto({}));
	};

	const handleUpdateDates = (dates) => {
		dispatch(_setDateRange(dates));
	};

	// console.log("rendered"); // *** LOG *** ///
	// console.log(state.selectedPhoto); // *** LOG *** ///
    // console.log(state.loadedPhotos); // *** LOG *** ///
    
	return (
		<div id="main-page">
			<div id="date-selector">
				<DateSelector
					dateRange={state.dateRange}
					handleUpdateDates={handleUpdateDates}
				/>
			</div>
			<div id="photo-gallery">
				<PhotoGallery
					loadedPhotos={state.loadedPhotos}
					isLoading={isLoading}
					setModal={setModal}
					handlePhotoClick={handlePhotoClick}
				/>
			</div>
			<div id="photo-modal">
				<PhotoModal
					selectedPhoto={state.selectedPhoto}
					openModal={openModal}
					handleLikeButton={handleLikeButton}
					handleCloseModal={handleCloseModal}
				/>
			</div>
		</div>
	);
}
