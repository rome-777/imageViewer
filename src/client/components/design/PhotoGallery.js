import React, { useEffect, useState } from 'react';
// Material UI modules //
import { ImageList, ImageListItem, ImageListItemBar, IconButton, Backdrop, CircularProgress } from '@mui/material';
import { StarBorder, Star } from '@mui/icons-material';

// helper to crop photo //
function srcset(url, width, height, rows) {
  return {
    src: `${url}?w=${width}&h=${height * rows}&fit=crop&auto=format`,
    srcSet: `${url}?w=${width}&h=${height * rows}&fit=crop&auto=format&dpr=2 2x`,
  };
}

export default function PhotoGallery(props) {
	const { loadedPhotos, handlePhotoClick, isLoading } = props;
	const [displayedPhotos, setDisplayedPhotos] = useState([]);

	// set displayedPhotos and check if loadedPhotos were updated //
	useEffect(() => {
		setDisplayedPhotos(loadedPhotos);
	}, [loadedPhotos]);

	return (
		<div>
			<ImageList
				sx={{
					width: "95vw",
					height: "85vh",
					// Promote the list into its own layer in Chrome. This costs memory, but helps keeping high FPS.
					transform: "translateZ(0)",
				}}
				rowHeight={300}
				gap={0}
			>
				<Backdrop
					sx={{
						color: "#fff",
						zIndex: (theme) => theme.zIndex.drawer + 1,
					}}
					open={isLoading}
				>
					<CircularProgress color="inherit" />
				</Backdrop>
				{displayedPhotos
					.map((photo) => {
						const rows = photo.liked ? 2 : 1;
						return (
							<ImageListItem
								key={photo.id}
								rows={rows}
								className="grow"
								sx={{
									overflow: "hidden",
								}}
							>
								<img
									{...srcset(photo.url, 250, 200, rows)}
									alt={photo.title}
									loading="lazy"
									onClick={() => handlePhotoClick(photo)} // () => needed?
								/>
								<ImageListItemBar
									sx={{
										background:
											"linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, " +
											"rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)",
									}}
									title={photo.title}
									position="top"
									subtitle={photo.date}
									actionIcon={
										<IconButton
											sx={{ color: "white" }}
											aria-label={`fav ${photo.title}`}
										>
											{photo.liked ? (
												<Star />
											) : (
												<StarBorder />
											)}
										</IconButton>
									}
									actionPosition="left"
								/>
							</ImageListItem>
						);
					})
					.reverse()}
			</ImageList>
		</div>
	);
}