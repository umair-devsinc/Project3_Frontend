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
import AlignItemsList from "./AlignItemsList";

export default function ImgCard(props) {
  const [postInfo, setPostInfo] = useState({
    title: props.post.title,
    content: props.post.content,
    userName: props.post.User.firstName + " " + props.post.User.lastName,
    postDate: props.post.User.createdAt.split("T")[0],
  });
  const navigate = useNavigate();

  return (
    <div style={divStyle}>
      <Card sx={cardStyle}>
        <CardHeader
          avatar={
            <Avatar sx={avatarStyle} aria-label="recipe">
              {postInfo.userName ? postInfo.userName[0] : "A"}
            </Avatar>
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
        <CardActions></CardActions>
      </Card>
    </div>
  );
}
