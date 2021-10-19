import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import UserContext from "../../context/user";

import Post from "./Post";

function Posts() {
  const [data, setData] = useState([]);
  const { state, dispatch } = useContext(UserContext);
  // const [comments, setComments] = useState([]);

  // const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios({
      method: "GET",
      url: "/api/allposts",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    }).then((response) => {
      console.log(`all post api call response`, response);
      setData(response.data.posts);
    });
  }, []);

  console.log("post data at Posts index", data);
  console.log("data.comments", data.comments);
  //data refers to the entire post data

  return (
    <div>
      <h1>I am a post</h1>
      {data.map((post) => (
        <Post
          key={post._id}
          id={post._id}
          username={post.postedBy.name}
          userImg={post.postedBy.picture}
          img={post.image}
          caption={post.caption}
          data={data}
          setData={setData}
          comments={data.comments}
        />
      ))}
    </div>
  );
}

export default Posts;
