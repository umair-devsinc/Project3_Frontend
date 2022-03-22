import { useEffect,useState } from "react";
import ImgMediaCard from "./ImgMediaCard";
import ResponsiveAppBar from "./AppBar";
import Box from '@mui/material/Box';


const Draft=()=>{
    const [posts,setPosts]=useState([]);
    const [postRefresh,setPostRefresh]=useState(true);



 useEffect(()=>{
            fetch(`http://localhost:5000/draftpost?id=${sessionStorage.getItem('id')}`,{ 
                method: "GET"
            })
            .then(response =>{ 
                response.json().then(data=>setPosts([...data]));
                
              })
            .catch(err=>console.log(err));
          },[postRefresh]);

          return(
          <>
            <ResponsiveAppBar></ResponsiveAppBar>
            <Box sx={{marginTop:10}}>
            {posts?posts.map(post =>
            <ImgMediaCard call="draft" postRefresh={postRefresh} setPostRefresh={setPostRefresh} post={post}></ImgMediaCard>
          
            ):<div>No Draft Post</div>}
            </Box>

          </>)
}

export default Draft;