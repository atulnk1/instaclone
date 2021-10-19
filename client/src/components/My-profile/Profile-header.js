import React, { useContext } from "react";
import Skeleton from "react-loading-skeleton";
import * as ROUTES from "../../constants/routes";
import UserContext from "../../context/user";

function ProfileHeader() {
  const { state, dispatch } = useContext(UserContext);

  console.log("state at profile-header", state);

  return (
    <div className="grid grid-cols-3 gap-4 justify-between mx-auto max-w-screen-lg">
      <div className="container flex justify-center items-center">
        {state ? (
          <img
            className="rounded-full h-16 w-16 md:h-20 lg:h-40 md:w-20 lg:w-40 flex"
            alt="logged in user profile picture"
            src={state?.picture}
          />
        ) : (
          <img
            className="rounded-full h-16 w-16 md:h-20 lg:h-40 md:w-20 lg:w-40 flex"
            alt={`my profile picture`}
            src="/images/avatars/darryl.jpg"
          />
        )}
      </div>
      <div className="flex items-center justify-center flex-col col-span-2">
        <div className="container flex items-center">
          <p className="text-2xl mr-4">{state?.name}</p>
          {/* {activeBtnFollow && (
          <button
            className="bg-blue-medium font-bold text-sm rounded text-white w-20 h-8"
            type="button"
            onClick={`insert follow and unfollow functionality`}
            onKeyDown={(event) => {
              if (event.key === 'Enter') {
                handleToggleFollow();
              }
            }}
          >
            {isFollowingProfile ? 'Unfollow' : 'Follow'}
          </button>
        )} */}
        </div>
        <div className="container flex mt-4 flex-col lg:flex-row">
          {!state?.followers || !state?.following ? (
            <Skeleton count={1} width={677} height={24} />
          ) : (
            <>
              <p className="mr-10">
                <span className="font-bold">5</span> photos
              </p>
              <p className="mr-10">
                <span className="font-bold">{state.followers.length}</span>
                {` `}
                {state?.followers.length === 1 ? `follower` : `followers`}
              </p>
              <p className="mr-10">
                <span className="font-bold">{state.following.length}</span>{" "}
                following
              </p>
            </>
          )}
        </div>
        <div className="container mt-4">
          <p className="font-medium">
            {!state?.email ? <Skeleton count={1} height={24} /> : state?.email}
          </p>
        </div>
      </div>
    </div>
  );
}

export default ProfileHeader;
