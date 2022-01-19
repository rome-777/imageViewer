import React, { useState, useEffect, useRef } from 'react';
import { singlePhotoFetch } from '../utils/fetchAPIAxios';

export default function Photo() {
    const [singlePhotoObj, setSinglePhotoObj] = useState(null);
    const isMountedRef = useRef(false); // acts as a switch to prevent return on the 1st render

    useEffect(() => {
        bootstrap();
        isMountedRef.current = true;
    }, []);

    const bootstrap = async () => {
        const data = await fetchSinglePhoto();
        console.log(data)
        setSinglePhotoObj(data);
    }

    return isMountedRef.current && (
        <div id='photo-single'>
            <img id='img-full' src={photoObj.url} />
            <div id='photo-info'>
                <div id='photo-info-date'>{photoObj.date}</div>
                <div id='photo-info-title'>{photoObj.title}</div>
                <div id='photo-info-caption'>{photoObj.explanation}</div>
            </div>
        </div>
    )
}