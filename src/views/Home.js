import * as React from "react";
import ImgCard from "../components/Card";
import {
  Button,
  Box,
  Typography,
  Modal,
  TextField,
  Grid,
  Pagination,
} from "@mui/material";
import AddIcon from "@material-ui/icons/Add";
import { useState, useEffect, useLayoutEffect, useRef } from "react";
import ResponsiveAppBar from "../components/AppBar";
import useDidMountEffect from "../components/Hooks";
import { isLogin } from "../utils/Auth";
import { savePost, postCount, getPosts } from "../apis/postApi";
import {
  homeStyle,
  modelStyle,
  modelButtonStyle,
  createButtonStyle,
  divStyle,
} from "../style/Home";

const Home = () => {
  const [postInfo, setPostInfo] = useState({ title: "", content: "" });
  const [open, setOpen] = useState(false);
  const [posts, setPosts] = useState();
  const [postRefresh, setPostRefresh] = useState(true);
  const [count, setCount] = useState(0);
  const [offset, setOffset] = useState(0);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSubmit = (flag) => {
    handleClose();

    savePost(flag, postInfo)
      .then((response) => {
        setPostRefresh(!postRefresh);
        //setPosts([...posts, response.data]);
        setPostInfo({ ...postInfo, title: "", content: "" });
      })
      .catch((err) => alert(err));
  };

  //for talha bhai
  useEffect(() => {
    postCount()
      .then((response) => {
        setCount(Math.ceil(response.data.count / 2));
      })
      .catch((err) => alert(err));

    getPosts(offset)
      .then((response) => {
        setPosts([...response.data]);
      })
      .catch((err) => alert(err));
  }, [postRefresh, offset]);
  // useEffect(() => {
  //   fetch(`http://localhost:5000/post/${offset}?flag=true`, {
  //     method: "GET",
  //   })
  //     .then((response) => {
  //       response.json().then((data) => {
  //         setPosts([...data]);
  //       });
  //     })
  //     .catch((err) => alert(err));
  // }, [postRefresh, offset]);

  // useDidMountEffect(() => {
  //   handleSubmit();
  // }, []);

  return (
    <>
      <ResponsiveAppBar />

      <Box sx={homeStyle}>
        {posts &&
          posts.map((post) => (
            <ImgCard
              call="home"
              postRefresh={postRefresh}
              setPostRefresh={setPostRefresh}
              post={post}
              key={post.id}
            />
          ))}
      </Box>
      {count > 0 && (
        <div style={divStyle}>
          <Pagination
            onChange={(e, val) => {
              setOffset(val * 2 - 2);
            }}
            count={count}
            color="primary"
          />
        </div>
      )}

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
                type="button"
                fullWidth
                variant="outlined"
                sx={modelButtonStyle}
                onClick={() => {
                  handleSubmit(false);
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
                  handleSubmit(true);
                }}
              >
                Publish
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Modal>

      {isLogin() ? (
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
