import { useEffect, useState } from "react";
import ImgMediaCard from "./ImgMediaCard";
import ResponsiveAppBar from "./AppBar";
import Box from "@mui/material/Box";

// This Component is use to show the draft post

const Draft = () => {
  const [posts, setPosts] = useState([]);
  const [postRefresh, setPostRefresh] = useState(true);

  useEffect(() => {
    //   fetch(`http://localhost:5000/draftpost?id=${sessionStorage.getItem('id')}`,{
    //       method: "GET"
    //   })
    //   .then(response =>{
    //       response.json().then(data=>setPosts([...data]));

    //     })
    //   .catch(err=>console.log(err));
    // },[postRefresh]);

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
      .catch((err) => console.log(err));
  }, [postRefresh]);

  useEffect(() => {
    console.log(posts);
  });
  return (
    <>
      <ResponsiveAppBar></ResponsiveAppBar>
      <Box sx={{ marginTop: 10 }}>
        {posts ? (
          posts.map((post) => (
            <ImgMediaCard
              call="draft"
              postRefresh={postRefresh}
              setPostRefresh={setPostRefresh}
              post={post}
            ></ImgMediaCard>
          ))
        ) : (
          <div>No Draft Posts</div>
        )}
      </Box>
    </>
  );
};

export default Draft;
