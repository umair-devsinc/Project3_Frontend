import * as React from "react";
import {
  Card,
  CardHeader,
  CardActions,
  CardContent,
  CardMedia,
  Avatar,
  IconButton,
  Button,
  Typography,
  Link,
  Grid,
  Modal,
  TextField,
  Box,
  Menu,
  MenuItem,
} from "@mui/material";
import {
  modelStyle,
  divStyle,
  cardStyle,
  avatarStyle,
  menuStyle,
  submitButtonStyle,
} from "../style/ImgMediaCrad";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function ImgMediaCard(props) {
  const userID = sessionStorage.getItem("id");
  const [postInfo, setPostInfo] = useState({
    title: props.post.title,
    content: props.post.content,
  });
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    handleClose();

    fetch(`http://localhost:5000/post/${props.post.id}`, {
      method: "PUT",

      body: JSON.stringify({
        title: postInfo.title,
        content: postInfo.content,
      }),

      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then(() => {
        props.setPostRefresh(!props.postRefresh);
      })
      .catch((err) => alert(err));
  };

  const deletePost = () => {
    fetch(`http://localhost:5000/post?id=${props.post.id}`, {
      method: "DELETE",
    })
      .then(() => props.setPostRefresh(!props.postRefresh))
      .catch((err) => alert(err));
  };

  const draftPost = () => {
    fetch(`http://localhost:5000/dPost/${props.post.id}/${!props.post.flag}`, {
      method: "PUT",

      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then(() => {
        props.setPostRefresh(!props.postRefresh);
      })
      .catch((err) => alert(err));
  };

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open1 = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose1 = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    fetch(`http://localhost:5000/user?id=${props.post.uid}`)
      .then((response) => {
        response.json().then((data) => {
          setPostInfo({
            ...postInfo,
            userName: data.firstName + " " + data.lastName,
            postDate: data.createdAt,
          });
        });
      })
      .catch((err) => alert(err));
  }, [props.post.content, props.post.title]);

  return (
    <div style={divStyle}>
      <Card sx={cardStyle}>
        <CardHeader
          avatar={
            <Avatar sx={avatarStyle} aria-label="recipe">
              {postInfo.userName ? postInfo.userName[0] : "A"}
            </Avatar>
          }
          action={
            userID == props.post.uid ? (
              <div>
                <IconButton
                  aria-label="settings"
                  id="long-button"
                  aria-controls={open ? "long-menu" : undefined}
                  aria-expanded={open ? "true" : undefined}
                  aria-haspopup="true"
                  onClick={handleClick}
                >
                  <MoreVertIcon />
                </IconButton>
                <Menu
                  id="long-menu"
                  MenuListProps={{
                    "aria-labelledby": "long-button",
                  }}
                  anchorEl={anchorEl}
                  open={open1}
                  onClose={handleClose1}
                  PaperProps={{
                    style: menuStyle,
                  }}
                >
                  <MenuItem
                    onClick={() => {
                      handleClose();
                      draftPost();
                    }}
                  >
                    {props.call == "home" ? "Drafts" : "Publish"}
                  </MenuItem>
                </Menu>
              </div>
            ) : (
              <div></div>
            )
          }
          title={postInfo.userName}
          subheader={postInfo.postDate}
        />
        <CardMedia
          onClick={() => navigate(`/post/${props.post.id}`)}
          component="img"
          alt="green iguana"
          height="300"
          image="https://images.unsplash.com/photo-1485182708500-e8f1f318ba72?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OXx8c29jaWFsfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {postInfo.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {postInfo.content}
          </Typography>
        </CardContent>
        <CardActions>
          {userID == props.post.uid ? (
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link
                  onClick={handleOpen}
                  sx={{ margin: 2 }}
                  href="#"
                  variant="body2"
                >
                  Edit
                </Link>
              </Grid>
              <Grid item>
                <Link
                  onClick={deletePost}
                  sx={{ margin: 2 }}
                  href="#"
                  variant="body2"
                >
                  Delete
                </Link>
              </Grid>
            </Grid>
          ) : (
            <div></div>
          )}
        </CardActions>
      </Card>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          component="form"
          onSubmit={handleSubmit}
          noValidate
          sx={modelStyle}
        >
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
    </div>
  );
}
