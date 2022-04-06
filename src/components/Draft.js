import { useEffect, useState } from "react";
import ImgCard from "./Card";
import ResponsiveAppBar from "./AppBar";
import { Box, Pagination } from "@mui/material";
import { draftStyle } from "../style/Drafts";

const Draft = () => {
  const [posts, setPosts] = useState([]);
  const [postRefresh, setPostRefresh] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:5000/post/0?id=${sessionStorage.getItem("id")}`, {
      method: "GET",
    })
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
            <ImgCard
              call="draft"
              postRefresh={postRefresh}
              setPostRefresh={setPostRefresh}
              post={post}
              key={post.id}
            />
          ))}
      </Box>
    </>
  );
};

export default Draft;
