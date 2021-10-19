import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import ProfileHeader from "./Profile-header";
import { useHistory } from "react-router-dom";
import UserContext from "../../context/user";
import Photos from "./photos";

function MyProfile() {
  const [myPhotoCollection, setMyPhotoCollection] = useState([]);
  const { state, dispatch } = useContext(UserContext);
  const history = useHistory();

  console.log("state at myprofile index page", state);

  useEffect(() => {
    axios({
      method: "GET",
      url: "/api/mypost",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    }).then((response) => {
      console.log("/mypostapireponse", response.data);
      setMyPhotoCollection(response.data);
    });
  }, []);
  console.log(myPhotoCollection);

  return (
    <>
      {/* Header - props to pass: photos collection -for length, name, picture, followers array, following array */}
      <ProfileHeader state={state} history={history} />
      {/* photos */}
      <Photos state={state} />
    </>
  );
}

export default MyProfile;
