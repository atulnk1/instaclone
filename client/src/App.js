import { Suspense, lazy, useReducer, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  useHistory,
  Redirect,
} from "react-router-dom";
import * as ROUTES from "./constants/routes";
import Spinner from "./components/Spinner";
import { userReducer, initialState } from "./reducers/userReducer";
import UserContext from "./context/user";
import ProtectedRouting from "./ProtectedRouting";
import Login from "./pages/login";
import SignUp from "./pages/sign-up";
import NotFound from "./pages/not-found";
import Dashboard from "./pages/dashboard";
import Profile from "./pages/profile";
import MyProfile from "./pages/myprofile";

import { RecoilRoot } from "recoil";

// const Login = lazy(() => import("./pages/login"));
// const SignUp = lazy(() => import("./pages/sign-up"));
// const Dashboard = lazy(() => import("./pages/dashboard"));
// const Profile = lazy(() => import("./pages/profile"));
// const NotFound = lazy(() => import("./pages/not-found"));

export default function App() {
  const history = useHistory();
  const [state, dispatch] = useReducer(userReducer, initialState);

  console.log("state at App.js", state);

  // useEffect(() => {
  //   if (!state && !history.location.pathname.startsWith(ROUTES.RESET))
  //     history.push(ROUTES.LOGIN);
  // }, [state]);
  //   export const DASHBOARD = "/";
  // export const LOGIN = "/login";
  // export const SIGN_UP = "/sign-up";
  // export const PROFILE = "/profile/:username";
  // export const NOT_FOUND = "/not-found";
  // export const MYPROFILE = "/profile";
  // export const RESET = "/reset";

  return (
    <UserContext.Provider value={{ state, dispatch }}>
      <RecoilRoot>
        <Router>
          <Suspense fallback={<Spinner />}>
            <Switch>
              <Route exact path={ROUTES.LOGIN}>
                <Login />
              </Route>
              <Route exact path={ROUTES.SIGN_UP}>
                <SignUp />
              </Route>
              <Route path={ROUTES.PROFILE}>
                <Profile />
              </Route>
              <Route exact path={ROUTES.DASHBOARD}>
                <Dashboard />
              </Route>
              <Route exact path={ROUTES.MYPROFILE}>
                <MyProfile />
              </Route>
              {/* <ProtectedRouting /> */}
              <Route exact path={ROUTES.NOT_FOUND}>
                <NotFound />
              </Route>
            </Switch>
          </Suspense>
        </Router>
      </RecoilRoot>
    </UserContext.Provider>
  );
}
