import * as React from "react";
import { Box, Button, Typography, Modal, TextField, Grid } from "@mui/material";
import { modelStyle, submitButtonStyle } from "../style/Model";
const MuiModal = ({
  handleSubmit,
  setPostInfo,
  postInfo,
  handleClose,
  handleOpen,
  open,
}) => {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box component="form" onSubmit={handleSubmit} noValidate sx={modelStyle}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Title
        </Typography>
        <TextField
          id="standard-basic"
          name="title"
          value={postInfo.title}
          onChange={(e) => {
            setPostInfo({ ...postInfo, title: e.target.value });
          }}
          variant="outlined"
        />
        <Typography id="modal-modal-title" variant="h6" sx={{ mt: 2 }}>
          Content
        </Typography>
        <TextField
          fullWidth
          multiline
          rows="3"
          id="standard-basic"
          name="content"
          value={postInfo.content}
          onChange={(e) => {
            setPostInfo({ ...postInfo, content: e.target.value });
          }}
          variant="outlined"
        />
        <Grid container justifyContent="flex-end">
          <Grid item>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={submitButtonStyle}
            >
              Update
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Modal>
  );
};

export default MuiModal;
