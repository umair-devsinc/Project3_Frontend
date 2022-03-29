import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import { red } from "@mui/material/colors";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

export default function ImgMediaCard(props) {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 800,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };
  const userID = sessionStorage.getItem("id");
  const [userName, setUserName] = React.useState();
  const [postDate, setPostDate] = React.useState();
  const [title, setTitle] = React.useState(props.post.title);
  const [content, setContent] = React.useState(props.post.content);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);


  const handleSubmit = (event) => {
    event.preventDefault();
    handleClose();

    fetch(
      `http://localhost:5000/${props.call == "home" ? "post" : "draftpost"}/${props.post.id}`,
      {
        method: "PUT",

        body: JSON.stringify({
          title: title,
          content: content,
        }),

        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }
    )
      .then(() => {
        setTitle(props.post.title);
        setContent(props.post.content);
        props.setPostRefresh(!props.postRefresh);
      })
      .catch((err) => console.log(err));
  };

  const deletePost = () => {
    fetch(`http://localhost:5000/post?id=${props.post.id}`, {
      method: "DELETE",
    })
      .then(() => props.setPostRefresh(!props.postRefresh))
      .then((err) => console.log(err));
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
      .catch((err) => console.log(err));
  };

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open1 = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose1 = () => {
    setAnchorEl(null);
  };

  React.useEffect(() => {
    fetch(`http://localhost:5000/user?id=${props.post.uid}`)
      .then((response) => {
        response.json().then((data) => {
          console.log(data);
          setUserName(data.firstName + " " + data.lastName);
          setPostDate(data.updatedAt);
        });
      })
      .catch((err) => console.log(err));
    setTitle(props.post.title);
    setContent(props.post.content);
  }, [props.post.content, props.post.title]);

  const ITEM_HEIGHT = 48;
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <Card sx={{ minWidth: 700, maxWidth: 1300, margin: 5 }}>
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
              {userName ? userName[0] : userName}
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
                    style: {
                      maxHeight: ITEM_HEIGHT * 4.5,
                      width: "20ch",
                    },
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
          title={userName}
          subheader={postDate}
        />
        <CardMedia
          component="img"
          alt="green iguana"
          height="300"
          image="https://images.unsplash.com/photo-1485182708500-e8f1f318ba72?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OXx8c29jaWFsfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {props.post.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {props.post.content}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small">Share</Button>
          <Button size="small">Learn More</Button>
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
        <Box component="form" onSubmit={handleSubmit} noValidate sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Title
          </Typography>
          <TextField
            id="standard-basic"
            name="title"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
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
            value={content}
            onChange={(e) => {
              setContent(e.target.value);
            }}
            variant="outlined"
          />
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
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
