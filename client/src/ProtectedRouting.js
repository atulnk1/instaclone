import { lazy, useEffect, useContext } from "react";
import { BrowserRouter as Route, Switch, useHistory } from "react-router-dom";
import * as ROUTES from "./constants/routes";
import UserContext from "./context/user";

import Dashboard from "./pages/dashboard";
import Login from "./pages/login";
import Profile from "./pages/profile";

//Enables lazy loading --> splits build into separate js bundles that will be delivered on demand vs one whole pack
//Improves performance of app once it gets bigger

// const Login = lazy(() => import("./pages/login"));
// const SignUp = lazy(() => import("./pages/sign-up"));
// const Dashboard = lazy(() => import("./pages/dashboard"));
// const Profile = lazy(() => import("./pages/profile"));
// const NotFound = lazy(() => import("./pages/not-found"));

const ProtectedRouting = () => {
  const history = useHistory();
  const { state, dispatch } = useContext(UserContext);

  console.log("state", state);

  //   If there is no truthy value for user, redirect him/her to sign in page.
  //   Note that this routing component wraps around the rest of the routes, meaning the user should be redirected to the sign in page if he/she doesn't have the jwt token.
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      dispatch({ type: "USER", payload: user });
    } else {
      if (!history.location.pathname.startsWith(ROUTES.RESET))
        history.push(ROUTES.LOGIN);
    }
  }, []);

  return (
    <Switch>
      {/* <Route path={ROUTES.LOGIN}>
        <Login />
      </Route> */}
      <Route path={ROUTES.PROFILE}>
        <Profile />
      </Route>
      <Route exact path={ROUTES.DASHBOARD}>
        <Dashboard />
      </Route>
    </Switch>
  );
};

export default ProtectedRouting;
