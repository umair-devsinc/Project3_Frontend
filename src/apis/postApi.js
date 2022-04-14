import axios from "axios";
import Cookies from "js-cookie";

const getSinglePost = (id) => {
  return axios.get(`http://localhost:5000/singlePost/${id}`);
};

const savePost = (flag, postInfo) => {
  return axios.post(
    `http://localhost:5000/post`,
    {
      title: postInfo.title,
      content: postInfo.content,
      flag: flag,
      uid: sessionStorage.getItem("id"),
    },
    {
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: `${Cookies.get("jwtoken")}`,
      },
    }
  );
};
// const draftP = (id, flag) => {
//   return axios.put(`http://localhost:5000/dPost/${id}/${!flag}`, {
//     headers: {
//       "Content-type": "application/json; charset=UTF-8",
//     },
//   });
// };

const postCount = () => {
  return axios.get(`${process.env.REACT_APP_PATH}/postCount`);
};

const getPosts = (offset) => {
  return axios.get(`http://localhost:5000/post/${offset}?flag=true`);
};
const getDraftPosts = () => {
  return axios.get(
    `http://localhost:5000/post/0?id=${sessionStorage.getItem("id")}`
  );
};

// const editPost = (id, postInfo) => {
//   return axios.put(
//     `http://localhost:5000/post/${id}`,
//     {
//       title: postInfo.title,
//       content: postInfo.content,
//     },
//     {
//       headers: {
//         "Content-type": "application/json; charset=UTF-8",
//         Authorization: `${Cookies.get("jwtoken")}`,
//       },
//     }
//   );
// };

//edit post rewrite

const editPost = (id, postInfo, flag) => {
  return axios.put(
    `http://localhost:5000/post/${id}`,
    {
      title: postInfo.title,
      content: postInfo.content,
      flag: flag,
    },
    {
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: `${Cookies.get("jwtoken")}`,
      },
    }
  );
};

const commentP = (id, comment) => {
  return axios.post(`${process.env.REACT_APP_PATH}/comment`, {
    text: comment,
    uid: sessionStorage.getItem("id"),
    postId: id,
  });
};

const deleteP = (id) => {
  return axios.delete(`http://localhost:5000/post?id=${id}`, {
    headers: {
      Authorization: `${Cookies.get("jwtoken")}`,
    },
  });
};

export {
  getSinglePost,
  savePost,
  postCount,
  getPosts,
  getDraftPosts,
  editPost,
  commentP,
  deleteP,
  //draftP,
};
