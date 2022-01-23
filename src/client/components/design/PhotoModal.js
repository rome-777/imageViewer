import React, { useEffect, useState } from "react";
/* Material UI modules */
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import StarBorder from "@mui/icons-material/StarBorder";
import Star from "@mui/icons-material/Star";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";

export default function PhotoModal(props) {
	const { selectedPhoto, toggleModal, setModal, setSelectedPhoto, handleLikeButton } = props;
	const [open, setOpen] = useState(false);
	const handleClose = () => {
		setModal(false);
		setSelectedPhoto({});
	};

	useEffect(() => {
		setOpen(toggleModal);
	}, [toggleModal]);

	if (!selectedPhoto) return <div />;
	return (
		<div>
			<Modal
				aria-labelledby="transition-modal-title"
				aria-describedby="transition-modal-description"
				open={open}
				onClose={handleClose}
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
              				maxHeight: '90vh',
              				overflow: 'auto',
							boxShadow: 24,
							outline: "none",
						}}
					>
							<Card
								sx={{
									display: 'inline-block',
									maxWidth: "100%",
									maxHeight: "100%",
								}}
							>

								<img
									src={selectedPhoto.url}
									alt={selectedPhoto.title}
									loading="lazy"
								/>

								<CardContent
									sx={{
									width: 0,
									minWidth: '100%',
									paddingBottom: 0,
									p: 2
									}}
								>
									<Typography	gutterBottom variant="h5"	component="div" marginRight='2'>
										{selectedPhoto.title}
									</Typography>
									<Typography sx={{ mb: 1.5, fontSize: 18 }} color="text.secondary">
										{selectedPhoto.date}
									</Typography>
									<Typography variant="body2" color="text.secondary">
										{selectedPhoto.explanation}
									</Typography>
								</CardContent>
								
								<CardActions
									sx={{
										p: 0,
										marginLeft:1,
										marginBottom:1
									}}
								>
									<IconButton onClick={() => handleLikeButton()}>
										{selectedPhoto.liked ? <Star sx={{ color: "black" }}/> : <StarBorder sx={{ color: "black" }}/>}
									</IconButton>
									<Button size="small" onClick={handleClose}>Close</Button>
								</CardActions>
										
							</Card>
						</Box>
					</Fade>
			</Modal>
		</div>
	);
}