import React, { useEffect, useState } from "react";

import Post from "./Post";

function Posts() {
  //   const [posts, setPosts] = useState([]);

  //   useEffect();
  // () =>
  //   onSnapshot(
  //     query(collection(db, "posts"), orderBy("timestamp", "desc")),
  //     (snapshot) => {
  //       setPosts(snapshot.docs);
  //     }
  //   ),
  // [db]

  //   console.log(posts);

  return (
    <div>
      <h1>I am a post</h1>
      {/* {posts.map((post) => (
        <Post
          key={post.id}
          id={post.id}
          username={post.data().username}
          userImg={post.data().profileImg}
          img={post.data().image}
          caption={post.data().caption}
        /> */}
      ))}
    </div>
  );
}

export default Posts;
