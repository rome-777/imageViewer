import React, { useEffect, useState } from "react";
/* Material UI modules */
import { Backdrop, Box, Modal, Fade, Typography, IconButton, Button, Card, CardActions, CardContent } from "@mui/material";
import { FavoriteBorder, Favorite } from "@mui/icons-material";

export default function PhotoModal(props) {
	const { selectedPhoto, openModal, handleLikeButton, handleCloseModal } = props;
	const [open, setOpen] = useState(false);
	const [photo, setPhoto] = useState({});

	// open the modal //
	// set selectedPhoto and check if it was updated (with new value of like property) //
	useEffect(() => {
		setOpen(openModal);
		setPhoto(selectedPhoto);
	}, [openModal, selectedPhoto]);

	if (!photo) return <div />;
	return (
		<div>
			<Modal
				aria-labelledby="transition-modal-title"
				aria-describedby="transition-modal-description"
				open={open}
				onClose={handleCloseModal}
				closeAfterTransition
				BackdropComponent={Backdrop}
				BackdropProps={{
					timeout: 1000,
				}}
			>
				<Fade in={open}>
					<Box
						sx={{
							position: "absolute",
							top: "50%",
							left: "50%",
							transform: "translate(-50%, -50%)",
							maxWidth: "85%",
							maxHeight: "90vh",
							overflow: "auto",
							boxShadow: 24,
							outline: "none",
						}}
					>
						<Card
							sx={{
								display: "inline-block",
								maxWidth: "100%",
								maxHeight: "100%",
							}}
						>
							<img
								src={photo.url}
								alt={photo.title}
								loading="lazy"
							/>

							<CardContent
								sx={{
									width: 0,
									minWidth: "100%",
									paddingBottom: 0,
									p: 2,
								}}
							>
								<Typography
									gutterBottom
									variant="h5"
									component="div"
									marginRight="2"
								>
									{photo.title}
								</Typography>
								<Typography
									sx={{ mb: 1.5, fontSize: 18 }}
									color="text.secondary"
								>
									{photo.date}
								</Typography>
								<Typography
									variant="body2"
									color="text.secondary"
								>
									{photo.explanation}
								</Typography>
							</CardContent>

							<CardActions
								sx={{
									p: 0,
									marginLeft: 1,
									marginBottom: 1,
								}}
							>
								<IconButton
									size="large"
									onClick={handleLikeButton}
								>
									{photo.liked ? (
										<Favorite sx={{ color: "black" }} />
									) : (
										<FavoriteBorder
											sx={{ color: "black" }}
										/>
									)}
								</IconButton>
								<Button
									size="medium"
									onClick={handleCloseModal}
								>
									Close
								</Button>
							</CardActions>
						</Card>
					</Box>
				</Fade>
			</Modal>
		</div>
	);
}