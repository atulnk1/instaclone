import React, { useContext } from "react";
import Header from "../components/Header";
import Modal from "../components/Header/Modal";
import SearchModal from "../components/Header/searchModal";
import MyProfile from "../components/My-profile";
// import UserContext from "../context/user";

function Myprofile() {
  // const { state, dispatch } = useContext(UserContext);

  return (
    <div>
      <Header />
      <div className="mx-auto my-8 max-w-screen-lg">
        <MyProfile />
        <Modal />
        <SearchModal />
      </div>
    </div>
  );
}

export default Myprofile;
