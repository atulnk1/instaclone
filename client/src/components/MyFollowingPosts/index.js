import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import UserContext from "../../context/user";
import { useRecoilState } from "recoil";
import { postDataState } from "../../atoms/modalAtom";
import Post from "./Post";

function MyFollowingPosts() {
  const [data, setData] = useRecoilState(postDataState);
  const { state, dispatch } = useContext(UserContext);

  // const [posts, setPosts] = useState([]);
  // console.log("state at Posts component", state);

  useEffect(() => {
    console
      .log
      // "useEffect Hook in myfollowingposts Posts index component getting fired"
      ();
    axios({
      method: "GET",
      url: "/api/followingposts",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    }).then((response) => {
      // console.log(`my following post api call response`, response);
      setData(response.data.followingPost);
    });
  }, []);

  // console.log("post data at Posts index", data);
  //data refers to the entire post data

  const deletePost = (postId) => {
    // console.log("deletePost functionality triggered");
    // console.log("postId being passed through delete", postId);
    axios({
      method: "DELETE",
      url: `/api/deletepost/${postId}`,
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    }).then((response) => {
      console.log(response);
      console.log(data);
      const newData = data.filter((post) => {
        return post._id !== postId;
      });
      // console.log("newData", newData);
      setData(newData);
    });
  };

  // console.log("data at Posts index", data);

  return (
    <div>
      {data.map((post) => (
        <Post
          key={post._id}
          id={post._id}
          username={post.postedBy.name}
          posterId={post.postedBy._id}
          userImg={post.postedBy.picture}
          img={post.image}
          caption={post.caption}
          data={post}
          state={state}
          deletePost={deletePost}
        />
      ))}
    </div>
  );
}

export default MyFollowingPosts;
