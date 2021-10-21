import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import ProfileHeader from "./Profile-header";
import { useHistory } from "react-router-dom";
import UserContext from "../../context/user";
import Photos from "./Photos";
import ProfileModal from "./ProfileModal";

function MyProfile() {
  const [myPosts, setMyPosts] = useState([]);
  const { state, dispatch } = useContext(UserContext);
  const history = useHistory();

  // console.log("state at myprofile index page", state);

  useEffect(() => {
    axios({
      method: "GET",
      url: "/api/myposts",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    }).then((response) => {
      // console.log("/mypostsapireponse", response.data);
      setMyPosts(response.data);
    });
  }, []);
  // console.log(myPosts);

  return (
    <>
      {/* Header - props to pass: photos collection -for length, name, picture, followers array, following array */}
      <ProfileHeader
        state={state}
        history={history}
        photosCount={myPosts.myPosts ? myPosts.myPosts.length : 0}
      />
      {/* photos */}
      <Photos myPosts={myPosts} />
      <ProfileModal />
    </>
  );
}

export default MyProfile;
