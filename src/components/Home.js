import * as React from 'react';
import ImgMediaCard from "./ImgMediaCard";
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import AddIcon from '@material-ui/icons/Add';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import { useState } from 'react';
import { useCookies } from 'react-cookie';
import ResponsiveAppBar from "./AppBar";



import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';

//This is home component consist of navbar posts(card) and create post button

const Home=()=>{
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 800,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
      };
        const [cookies, setCookie, removeCookie] = useCookies(['jwtoken']);
        const [open, setOpen] = React.useState(false);
        const [posts,setPosts]=React.useState([]);
        const [postRefresh,setPostRefresh]=useState(true);
        const handleOpen = () => setOpen(true);
        const handleClose = () => setOpen(false);

        const handleSubmit = (event) => {
            event.preventDefault();
            handleClose();
            
            console.log("handle submit");
            const data = new FormData(event.currentTarget);
            const post={
              title: data.get('title'),
              content: data.get('content'),
            }
            
            fetch(`http://localhost:5000/post`,{ 
                method: "POST",
     
                body: JSON.stringify({
                    title:post.title,
                    content:post.content,
                    uid: sessionStorage.getItem('id'),
                    
                }),
                 
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
            })
            .then(response =>{ 
                setPostRefresh(!postRefresh);
             
              })
            .catch(err=>console.log(err));
          };

          React.useEffect(()=>{
            fetch(`http://localhost:5000/post`,{ 
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
           
            <Box sx={{ overflow: 'auto',display:'flex',justifyContent:'space-around',marginTop:10}}>
                {/* <Box>
                    <List>
                        {['Friends', 'Groups', 'Marketplace', 'Memories'].map((text, index) => (
                        <ListItem button key={text}>
                            <ListItemIcon>
                            {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                            </ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItem>
                        ))}
                    </List>
                    <Divider />
                    <List>
                        {['All mail', 'Trash', 'Spam'].map((text, index) => (
                        <ListItem button key={text}>
                            <ListItemIcon>
                            {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                            </ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItem>
                        ))}
                    </List>
                </Box> */}
           <Box >

            {posts?posts.map(post =>
            <ImgMediaCard call="home" postRefresh={postRefresh} setPostRefresh={setPostRefresh} post={post}></ImgMediaCard>
          
            ):<div></div>}
            </Box>
        </Box>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box component="form" onSubmit={handleSubmit}  noValidate  sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    Title
                </Typography>
                <TextField id="standard-basic"  name='title' variant="outlined" />
                <Typography id="modal-modal-title" variant="h6" sx={{ mt: 2 }}>
                    Content
                </Typography>
                <TextField fullWidth  multiline rows="3" id="standard-basic" name='content'  variant="outlined" />
                <Grid container justifyContent="flex-end">

                    <Grid item>
                    <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                            Post
                    </Button>
                    </Grid>

                </Grid>

                </Box>
            </Modal>
               
                {cookies.jwtoken?<Button typeof='button' onClick={handleOpen} sx={{position:'fixed',top:'90%',left:'80vw',marginRight:'35px',fontWeight:'bolder'}} variant="outlined" size="large" endIcon={<AddIcon />}>
                    Create Post
                </Button>:<div></div>}
            
        </>
    )
}

export default Home;