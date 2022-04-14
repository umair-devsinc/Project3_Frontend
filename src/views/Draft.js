import { useEffect, useState } from "react";
import ImgCard from "../components/Card";
import ResponsiveAppBar from "../components/AppBar";
import { Box, Pagination } from "@mui/material";
import { draftStyle } from "../style/Drafts";
import { getDraftPosts } from "../apis/postApi";
const Draft = () => {
  const [posts, setPosts] = useState([]);
  const [postRefresh, setPostRefresh] = useState(true);

  useEffect(() => {
    getDraftPosts()
      .then((response) => {
        setPosts([...response.data]);
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
