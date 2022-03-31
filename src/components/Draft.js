import { useEffect, useState } from "react";
import ImgMediaCard from "./ImgMediaCard";
import ResponsiveAppBar from "./AppBar";
import { Box } from "@mui/material";
import { draftStyle } from "../style/Drafts";

const Draft = () => {
  const [posts, setPosts] = useState([]);
  const [postRefresh, setPostRefresh] = useState(true);

  useEffect(() => {
    fetch(
      `http://localhost:5000/post?id=${sessionStorage.getItem(
        "id"
      )}&&flag=false`,
      {
        method: "GET",
      }
    )
      .then((response) => {
        response.json().then((data) => setPosts([...data]));
      })
      .catch((err) => alert(err));
  }, [postRefresh]);

  return (
    <>
      <ResponsiveAppBar></ResponsiveAppBar>
      <Box sx={draftStyle}>
        {posts &&
          posts.map((post) => (
            <ImgMediaCard
              call="draft"
              postRefresh={postRefresh}
              setPostRefresh={setPostRefresh}
              post={post}
              key={post.id}
            ></ImgMediaCard>
          ))}
      </Box>
    </>
  );
};

export default Draft;
