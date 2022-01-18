import React, { useState, useEffect, useRef } from 'react';
import { fetchPhotoRange } from '../utils/fetchDataAxios';

export default function Photo() {
    const [photoArray, setPhotoArray] = useState(null);
    const isMountedRef = useRef(false); // acts as a switch to prevent return on the 1st render

    useEffect(() => {
        bootstrap();
        isMountedRef.current = true;
    }, []);

    const bootstrap = async () => {
        const data = await fetchPhotoRange();
        console.log(data)
        setPhotoArray(data);
    }

    return isMountedRef.current && (
        <div id='photo-gallery'>
            {photoArray.map(photo => {
                return (
                    <div id='photo-tile' key={photo.id}>
                        <img id='img-thumbnail' src={photo.url} />
                    </div>
                )
            })};
        </div>
    )
}