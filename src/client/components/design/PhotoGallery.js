import * as React from 'react';
import { ImageList } from '@mui/material';
import { ImageListItem } from '@mui/material';
import { ImageListItemBar } from '@mui/material';
import { IconButton } from '@mui/material';
import { StarBorder } from '@mui/icons-material';

function srcset(url, width, height, rows = 1, cols = 1) {
  return {
    src: `${url}?w=${width * cols}&h=${height * rows}&fit=crop&auto=format`,
    srcSet: `${url}?w=${width * cols}&h=${
      height * rows
    }&fit=crop&auto=format&dpr=2 2x`,
  };
}

export default function PhotoGallery(props) {
    const { photoArray, toggleModal } = props;

    // add to img and pick up id of the click
    const handleClick = (id) => toggleModal(id, true);

    return (
        <ImageList
            sx={{
                width: '95vw',
                height: '85vh',
                // Promote the list into its own layer in Chrome. This costs memory, but helps keeping high FPS.
                transform: 'translateZ(0)',
            }}
            rowHeight={300}
            gap={1}
        >
        {photoArray.map((item) => {
            const cols = item.liked ? 2 : 1;
            const rows = item.liked ? 2 : 1;

            return (
            <ImageListItem key={item.id} cols={cols} rows={rows}>
                <img
                {...srcset(item.url, 250, 200, rows, cols)}
                alt={item.title}
                loading="lazy"
                onClick={() => handleClick(item.id)}
                />
                <ImageListItemBar
                sx={{
                    background:
                    'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, ' +
                    'rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
                }}
                title={item.title}
                position="top"
                subtitle={item.date}        
                actionIcon={
                    <IconButton
                    sx={{ color: 'white' }}
                    aria-label={`star ${item.title}`}
                    >
                        <StarBorder />
                    </IconButton>
                }
                actionPosition="left"
                />
            </ImageListItem>
            );
        })}
        </ImageList>
    );
    }