import { useState, useEffect } from "react";
import { useParams } from "react-router";
import ImgMediaCard from "../components/ImgMediaCard";
import { getSinglePost } from "../apis/postApi";
const Post = () => {
  let { id } = useParams();
  const [post, setPost] = useState();
  const [postRefresh, setPostRefresh] = useState(true);

  useEffect(() => {
    getSinglePost(id)
      .then((response) => {
        console.log(response.data);
        setPost(response.data);
      })
      .catch((err) => alert(err));
  }, [postRefresh]);

  return (
    <>
      {post && (
        <ImgMediaCard
          postRefresh={postRefresh}
          setPostRefresh={setPostRefresh}
          post={post}
          key={post.id}
        />
      )}
    </>
  );
};

export default Post;
