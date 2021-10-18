export const initialState = null;
// {
// name: "",
// email: "",
// followers: [],
// following: [],
// picture: "",
// };

export const reducer = (state, action) => {
  switch (action.type) {
    case "USER":
      return action.payload;
    case "CLEAR":
      return null;
    case "UPDATE":
      return {
        followers: action.payload.followers,
        following: action.payload.following,
      };
    case "UPDATEPIC":
      return {
        ...state,
        profilePhoto: action.payload,
      };
    default:
      return state;
  }
};

// export const reducer = (state, action) => {
//   if (action.type === "USER") {
//     return action.payload;
//   }
//   if (action.type === "CLEAR") {
//     return null;
//   }
//   if (action.type === "UPDATE") {
//     return {
//       ...state,
//       followers: action.payload.followers,
//       following: action.payload.following,
//     };
//   }
//   if (action.type === "UPDATEPIC") {
//     return {
//       ...state,
//       profilePhoto: action.payload,
//     };
//   }
//   return state;
// };
