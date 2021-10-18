// import { useReducer, useEffect } from "react";
// import ProfileHeader from "./profile-header";
// import Photos from "./photos";
// import { getUserPhotosByUsername } from "../../services/firebase";

// export default function Profile({ user }) {
//   const reducer = (state, newState) => ({ ...state, ...newState });
//   const initialState = {
//     profile: {},
//     photosCollection: [],
//     followerCount: 0,
//   };

//   const [{ profile, photosCollection, followerCount }, dispatch] = useReducer(
//     reducer,
//     initialState
//   );

//   useEffect(() => {
//     async function getProfileInfoAndPhotos() {
//       const photos = await getUserPhotosByUsername(user.username);
//       dispatch({
//         profile: user,
//         photosCollection: photos,
//         followerCount: user.followers.length,
//       });
//     }
//     getProfileInfoAndPhotos();
//   }, [user.username]);

//   return (
//     <>
//       <Header
//         photosCount={photosCollection ? photosCollection.length : 0}
//         profile={profile}
//         followerCount={followerCount}
//         setFollowerCount={dispatch}
//       />
//       <Photos photos={photosCollection} />
//     </>
//   );
// }
