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
  commentStyle,
} from "../style/ImgMediaCrad";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import AlignItemsList from "./AlignItemsList";
import MuiModal from "./Modal";
import { editPost, commentP, deleteP, draftP } from "../apis/postApi";

const ImgMediaCard = (props) => {
  const userID = sessionStorage.getItem("id");
  const [postInfo, setPostInfo] = useState({
    title: props.post.title,
    content: props.post.content,
    userName: props.post.User.firstName + " " + props.post.User.lastName,
    postDate: props.post.User.createdAt.split("T")[0],
  });
  const [comment, setComment] = useState("");
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open1 = Boolean(anchorEl);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    handleClose();

    editPost(props.post.id, postInfo, props.post.flag)
      .then(() => {
        props.setPostRefresh(!props.postRefresh);
      })
      .catch((err) => alert(err));
  };

  const commentPost = () => {
    commentP(props.post.id, comment)
      .then(() => {
        props.setPostRefresh(!props.postRefresh);
        setComment("");
      })
      .catch((err) => alert(err));
  };

  const deletePost = () => {
    deleteP(props.post.id)
      .then(() => navigate(`/home`))
      .catch((err) => alert(err));
  };

  const draftPost = () => {
    // draftP(props.post.id, props.post.flag)
    editPost(props.post.id, postInfo, !props.post.flag)
      .then(() => {
        navigate(`/home`);
      })
      .catch((err) => alert(err));
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose1 = () => {
    setAnchorEl(null);
  };

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
                    {props.post.flag ? "Drafts" : "Publish"}
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
          height="100"
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
        <Box sx={commentStyle}>
          <TextField
            fullWidth
            id="input-with-sx"
            label="Type here ..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            variant="standard"
          />
          <Button
            variant="contained"
            color="secondary"
            size="small"
            onClick={commentPost}
          >
            Post
          </Button>
        </Box>
        <AlignItemsList comments={props.post.Comments}></AlignItemsList>
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
      <MuiModal
        postInfo={postInfo}
        setPostInfo={setPostInfo}
        handleSubmit={handleSubmit}
        handleClose={handleClose}
        handleOpen={handleOpen}
        open={open}
      />
    </div>
  );
};

export default ImgMediaCard;
