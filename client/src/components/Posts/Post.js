import React, { useEffect, useState } from "react";

import {
  BookmarkIcon,
  ChatIcon,
  DotsHorizontalIcon,
  EmojiHappyIcon,
  HeartIcon,
  PaperAirplaneIcon,
} from "@heroicons/react/outline";
import { HeartIcon as HeartIconFilled } from "@heroicons/react/solid";
import Moment from "react-moment";
import axios from "axios";

export default function Post({
  id,
  username,
  userImg,
  img,
  caption,
  comments,
  data,
  setData,
}) {
  const [comment, setComment] = useState("");
  const [likes, setLikes] = useState([]);
  const [hasLiked, setHasLiked] = useState(false);

  //   useEffect();
  //     () =>
  //       onSnapshot(
  //         query(
  //           collection(db, "posts", id, "comments"),
  //           orderBy("timestamp", "desc")
  //         ),
  //         (snapshot) => setComments(snapshot.docs)
  //       ),
  //     [db, id]

  //   useEffect();
  // () =>
  //   onSnapshot(collection(db, "posts", id, "likes"), (snapshot) =>
  //     setLikes(snapshot.docs)
  //   ),
  // [db, id]

  //   useEffect();
  //       () => {
  //     setHasLiked(
  //       likes.findIndex((like) => like.id === session?.user?.uid) !== -1
  //     );
  //   }, [likes]

  const likePost = async () => {
    console.log("like post functionality");
  };

  const sendComment = async (e) => {
    e.preventDefault();
    axios({
      method: "PUT",
      url: "/api/comment",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      data: JSON.stringify({
        postId: id,
        text: comment,
      }),
    })
      .then((response) => {
        console.log(response.data);
        const newData = data.map((item) => {
          if (item._id === response.data._id) {
            return response.data;
          } else {
            return item;
          }
        });
        setData(newData);
        setComment("");
      })
      .catch((err) => {
        if (err) {
          console.log(err);
          setComment("");
        }
      });
  };

  return (
    <div className="bg-white my-7 border rounded-sm">
      {/* Header */}
      <div className="flex items-center p-5">
        <img
          src={userImg}
          alt=""
          className="rounded-full h-12 w-12 object-contain border p-1 mr-3"
        />
        <p className="flex-1 font-bold">{username}</p>
        <DotsHorizontalIcon className="h-5" />
      </div>

      {/* img */}
      <img src={img} alt="" className="object-cover w-full"></img>

      {/* buttons */}

      <div className="flex justify-between px-4 pt-4">
        <div className="flex space-x-4">
          {hasLiked ? (
            <HeartIconFilled onClick={likePost} className="btn text-red-500" />
          ) : (
            <HeartIcon className="btn" onClick={likePost} />
          )}
          <ChatIcon className="btn" />
          <PaperAirplaneIcon className="btn" />
        </div>
        <BookmarkIcon className="btn" />
      </div>

      {/* caption */}
      <p className="p-5 truncate">
        {likes.length > 0 && (
          <p className="font-bold mb-1">{likes.length} likes</p>
        )}
        <span className="font-bold mr-1">{username}</span>
        {caption}
      </p>
      {/* comments */}
      {
        /* comments */
        data.comments.length > 0 && (
          <div className="ml-10 h-20 overflow-y-scroll scrollbar-thumb-black scrollbar-thin">
            {data.comments.map((comment) => (
              <div
                key={comment._id}
                className="flex items-center space-x-2 mb-3"
              >
                <img
                  className="rounded-full h-7"
                  src={comment.postedBy.picture}
                  alt=""
                />
                <p className="text-sm flex-1">
                  <span className="font-bold">{comment.postedBy.name} </span>
                  {comment.text}
                </p>
                {/* <Moment fromNow className="pr-5 text-xs ">
                  {comment.data().timestamp?.toDate()}
                </Moment> */}
              </div>
            ))}
          </div>
        )
      }

      {/* input box */}

      <form className="flex items-center p-4">
        <EmojiHappyIcon className="h-7" />
        <input
          type="text"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Add a comment..."
          className="border-none flex-1 focus:ring-0 outline-none"
        />
        <button
          type="submit"
          disabled={!comment.trim()}
          onClick={sendComment}
          className="font-semibold text-blue-400"
        >
          Post
        </button>
      </form>
    </div>
  );
}
