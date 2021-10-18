import React, { useContext } from "react";
import {
  SearchIcon,
  PlusCircleIcon,
  UserGroupIcon,
  HeartIcon,
  PaperAirplaneIcon,
  MenuIcon,
} from "@heroicons/react/outline";
import { HomeIcon } from "@heroicons/react/solid";
import { Link, useHistory } from "react-router-dom";
import UserContext from "../../context/user";

function Header() {
  return (
    <div>
      <h1>I am the header</h1>
    </div>
  );
}

export default Header;
