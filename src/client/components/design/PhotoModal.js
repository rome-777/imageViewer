import React, { useEffect, useState } from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Typography from "@mui/material/Typography";
import { IconButton } from "@mui/material";
import { StarBorder } from "@mui/icons-material";
import Button from "@mui/material/Button";

import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";


// function srcset(url, width, height) {
//   return {
//     src: `${url}?w=${width}&h=${height}&fit=crop&auto=format`,
//     srcSet: `${url}?w=${width}&h=${height}&fit=crop&auto=format&dpr=2 2x`,
//   };
// }

export default function PhotoModal(props) {
	const { photo, toggleModal, openModal } = props;
	const [open, setOpen] = useState(false);
	const handleClose = () => toggleModal("", false);

	useEffect(() => {
		setOpen(openModal);
	}, [openModal]);

	if (!photo) return <div />;
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
              {/* <CardMedia
                component="img"
                alt={photo.title}
                image={photo.url}
                width='50%'
                maxHeight='50%'
              /> */}

              <img
                src={photo.url}
                    alt={photo.title}
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
                  {photo.title}
                </Typography>
                <Typography sx={{ mb: 1.5, fontSize: 18 }} color="text.secondary">
                  {photo.date}
                </Typography>
								<Typography variant="body2" color="text.secondary">
									{photo.explanation}
								</Typography>
              </CardContent>
              
              <CardActions
                sx={{
                  p: 0,
                  marginLeft:1,
                  marginBottom:1
                }}>
      
								<IconButton
									sx={{ color: "red" }}
									aria-label={`star ${photo.id}`}
								>
									<StarBorder />
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

{
	/* 
            <Typography id="transition-modal-title" variant="h6" component="h2">
              Text in a modal
            </Typography>
            <Typography id="transition-modal-description" sx={{ mt: 2 }}>
              Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
            </Typography> */
}
