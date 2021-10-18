import React, { useContext, useState } from "react";
import { Redirect } from "react-router-dom";
import {
  SearchIcon,
  PlusCircleIcon,
  UserGroupIcon,
  GlobeIcon,
  MenuIcon,
  LogoutIcon,
} from "@heroicons/react/outline";
import { HomeIcon } from "@heroicons/react/solid";
import { Link, useHistory } from "react-router-dom";
import UserContext from "../../context/user";
import * as ROUTES from "../../constants/routes";
import { useRecoilState } from "recoil";
import { modalState } from "../../atoms/modalAtom";

function Header() {
  const history = useHistory();
  const { state, dispatch } = useContext(UserContext);
  const [open, setOpen] = useRecoilState(modalState);

  //   console.log("state", state);

  const handleLogout = () => {
    localStorage.clear();
    dispatch({ type: "CLEAR" });
  };

  return (
    <div className="shadow-sm border-b bg-white sticky top-0 z-50">
      <div className="flex justify-between max-w-6xl mx-5 lg:mx-auto">
        {/* Left */}
        <div
          onClick={() => history.push(ROUTES.DASHBOARD)}
          className="relative hidden lg:inline-grid w-24 cursor-pointer my-auto"
        >
          <img
            src="https://i.ibb.co/YcNHmgk/2880px-Instagram-logo-svg.webp"
            layout="fill"
            objectFit="contain"
          />
        </div>

        <div
          onClick={() => console.log("Route back to dashboard")}
          className="relative w-10 my-auto lg:hidden flex-shrink-0 cursor-pointer"
        >
          <img
            src="https://i.ibb.co/72qPrYt/insta-logo.png"
            layout="fill"
            objectFit="contain"
          />
        </div>

        {/* Middle - Search input field */}
        <div className="max-w-xs">
          <div className="relative mt-1 p-3">
            <div className="absolute inset-y-0 pl-3 flex items-center pointer-events-none">
              <SearchIcon className="h-5 w-5 text-gray-500" />
            </div>
            <input
              className="bg-gray-50 block w-full pl-10 sm:text-sm border-gray-300 focus:ring-black focus:border-black rounded-md"
              type="text"
              placeholder="Search"
            />
          </div>
        </div>

        {/* Right */}
        <div className="flex items-center justify-end space-x-4">
          <Link to={ROUTES.DASHBOARD}>
            <HomeIcon className="navBtn" />
          </Link>
          <MenuIcon className="h-6 md:hidden cursor-pointer" />
          <PlusCircleIcon
            onClick={() => {
              setOpen(true);
            }}
            className="navBtn"
          />
          <GlobeIcon className="navBtn" />
          <a href={ROUTES.LOGIN}>
            <LogoutIcon className="navBtn" onClick={handleLogout} />
          </a>
          <img
            src={state ? state.picture : ""}
            alt="Profile Picture"
            className="h-10 w-10 rounded-full cursor-pointer"
            onClick={() =>
              console.log("Remember to redirect using history to profile")
            }
          />
        </div>
      </div>
    </div>
  );
}

export default Header;
