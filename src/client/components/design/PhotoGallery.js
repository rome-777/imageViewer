import React from 'react';
/* Material UI modules */
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import IconButton from '@mui/material/IconButton';
import StarBorder from '@mui/icons-material/StarBorder';


function srcset(url, width, height, rows) {
  return {
    src: `${url}?w=${width}&h=${height * rows}&fit=crop&auto=format`,
    srcSet: `${url}?w=${width}&h=${height * rows}&fit=crop&auto=format&dpr=2 2x`,
  };
}

export default function PhotoGallery(props) {
    const { loadedPhotosArray, setModal, handleSelectedPhoto } = props;
    const handleClick = (id) => {
        setModal(true);
        handleSelectedPhoto(id);
    }

    return (
        <ImageList
            sx={{
                width: '95vw',
                height: '85vh',
                // Promote the list into its own layer in Chrome. This costs memory, but helps keeping high FPS.
                transform: 'translateZ(0)',
            }}
            rowHeight={300}
            gap={0}
        >
            {loadedPhotosArray.map((photo) => {
                const rows = photo.liked ? 2 : 1;
                return (
                    <ImageListItem
                        key={photo.id}
                        rows={rows}
                        className='grow'
                        sx={{
                            overflow: 'hidden'
                        }}
                    >
                        <img
                            {...srcset(photo.url, 250, 200, rows)}
                            alt={photo.title}
                            loading="lazy"
                            onClick={() => handleClick(photo.id)}
                        />

                        <ImageListItemBar
                            sx={{
                                    background:
                                    'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, ' +
                                    'rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
                            }}
                            title={photo.title}
                            position="top"
                            subtitle={photo.date}        
                            actionIcon={
                                <IconButton
                                sx={{ color: 'white' }}
                                aria-label={`star ${photo.title}`}
                                >
                                    <StarBorder />
                                </IconButton>
                            }
                            actionPosition="left"
                        />

                    </ImageListItem>
                );
            }).reverse()}
        </ImageList>
    );
}