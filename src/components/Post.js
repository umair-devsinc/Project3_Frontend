import { useState, useEffect } from "react";
import { useParams } from "react-router";
import ImgMediaCard from "./ImgMediaCard";

const Post = () => {
  let { id } = useParams();
  const [post, setPost] = useState();
  const [postRefresh, setPostRefresh] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:5000/singlePost/${id}`, {
      method: "GET",
    })
      .then((response) => {
        response.json().then((data) => setPost(data));
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
