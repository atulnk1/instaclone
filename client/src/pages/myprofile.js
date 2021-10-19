import React, { useContext } from "react";
import Header from "../components/Header";
import MyProfile from "../components/My-profile";
// import UserContext from "../context/user";

function Myprofile() {
  // const { state, dispatch } = useContext(UserContext);

  return (
    <div>
      <Header />
      <div className="mx-auto my-8 max-w-screen-lg">
        <MyProfile />
      </div>
    </div>
  );
}

export default Myprofile;
