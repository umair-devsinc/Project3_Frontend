import * as React from "react";
import ImgMediaCard from "./ImgMediaCard";
import { Button, Box, Typography, Modal, TextField, Grid } from "@mui/material";
import AddIcon from "@material-ui/icons/Add";
import { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import ResponsiveAppBar from "./AppBar";
import useDidMountEffect from "./Hooks";
import {
  homeStyle,
  modelStyle,
  modelButtonStyle,
  createButtonStyle,
} from "../style/Home";

const Home = () => {
  const [cookies] = useCookies(["jwtoken"]);
  const [postInput, setPostInput] = useState({ title: "", content: "" });
  const [title, setTile] = useState("");
  const [content, setContent] = useState("");
  const [open, setOpen] = useState(false);
  const [posts, setPosts] = useState([]);
  const [postRefresh, setPostRefresh] = useState(true);
  const [flag, setFlag] = useState();
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSubmit = () => {
    handleClose();

    fetch(`http://localhost:5000/post`, {
      method: "POST",

      body: JSON.stringify({
        title: postInput.title,
        content: postInput.content,
        flag: flag,
        uid: sessionStorage.getItem("id"),
      }),

      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: `${cookies.jwtoken}`,
      },
    })
      .then(() => {
        setPostRefresh(!postRefresh);
      })
      .catch((err) => alert(err));
  };

  useEffect(() => {
    fetch(`http://localhost:5000/post?flag=true`, {
      method: "GET",
    })
      .then((response) => {
        response.json().then((data) => setPosts([...data]));
      })
      .catch((err) => alert(err));
  }, [postRefresh]);

  useDidMountEffect(() => {
    handleSubmit();
  }, [flag]);

  return (
    <>
      <ResponsiveAppBar />
      <Box sx={homeStyle}>
        {posts &&
          posts.map((post) => (
            <ImgMediaCard
              call="home"
              postRefresh={postRefresh}
              setPostRefresh={setPostRefresh}
              post={post}
              key={post.id}
            />
          ))}
      </Box>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box component="form" noValidate sx={modelStyle}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Title
          </Typography>
          <TextField
            id="standard-basic"
            name="title"
            value={postInput.title}
            onChange={(e) => {
              setPostInput({ ...postInput, title: e.target.value });
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
            value={postInput.content}
            onChange={(e) => {
              setPostInput({ ...postInput, content: e.target.value });
            }}
            variant="outlined"
          />
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Button
                type="button"
                fullWidth
                variant="outlined"
                sx={modelButtonStyle}
                onClick={() => {
                  setFlag(false);
                }}
              >
                Draft
              </Button>
            </Grid>
            <Grid item>
              <Button
                type="button"
                fullWidth
                variant="contained"
                sx={modelButtonStyle}
                onClick={() => {
                  setFlag(true);
                }}
              >
                Publish
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Modal>

      {cookies.jwtoken ? (
        <Button
          typeof="button"
          onClick={handleOpen}
          sx={createButtonStyle}
          variant="outlined"
          size="large"
          endIcon={<AddIcon />}
        >
          Create Post
        </Button>
      ) : (
        <div></div>
      )}
    </>
  );
};

export default Home;
