import { useContext } from "react";
import User from "./User";
import Suggestions from "./Suggestions";
import UserContext from "../../context/user";

function Sidebar() {
  const { state, dispatch } = useContext(UserContext);

  const { _id, name, picture, following } = state ? state : {};

  console.log("state at Sidebar Component", state);

  const handleLogout = () => {
    localStorage.clear();
    dispatch({ type: "CLEAR" });
  };

  return (
    <div>
      <User name={name} picture={picture} handleLogout={handleLogout} />
      <Suggestions following={following} loggedInUserId={_id} />
    </div>
  );
}

export default Sidebar;
