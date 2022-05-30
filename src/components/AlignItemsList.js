import * as React from "react";
import {
  List,
  ListItem,
  Divider,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Typography,
} from "@mui/material";
import { listStyle } from "../style/AlignItemsList";

export default function AlignItemsList({ comments }) {
  return (
    <List sx={listStyle}>
      {comments &&
        comments.map((comment) => (
          <>
            <ListItem key={comment.id} alignItems="flex-start">
              <ListItemAvatar>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
              </ListItemAvatar>
              <ListItemText
                primary={comment.User.firstName + " " + comment.User.lastName}
                secondary={
                  <>
                    <Typography
                      sx={{ display: "inline" }}
                      component="span"
                      variant="body2"
                      color="text.primary"
                    >
                      {comment.text}
                    </Typography>
                    {" " + comment.createdAt.split("T")[0]}
                  </>
                }
              />
            </ListItem>
            <Divider variant="inset" component="li" />
          </>
        ))}
    </List>
  );
}
