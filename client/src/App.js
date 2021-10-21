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
import Login from "./pages/Login";
import SignUp from "./pages/Sign-up";
import NotFound from "./pages/Not-found";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Myprofile from "./pages/Myprofile";
import ProtectedRoute from "./utils/protected-route";

import { RecoilRoot } from "recoil";
import MyFollowingDashboard from "./pages/Myfollowingdashboard";

// const Login = lazy(() => import("./pages/login"));
// const SignUp = lazy(() => import("./pages/sign-up"));
// const Dashboard = lazy(() => import("./pages/dashboard"));
// const Profile = lazy(() => import("./pages/profile"));
// const NotFound = lazy(() => import("./pages/not-found"));

export default function App() {
  const [state, dispatch] = useReducer(userReducer, initialState);

  // console.log("state at App.js", state);

  // useEffect(() => {
  //   if (!state && !history.location.pathname.startsWith(ROUTES.RESET))
  //     history.push(ROUTES.LOGIN);
  // }, [state]);
  //   export const DASHBOARD = "/";
  // export const LOGIN = "/login";
  // export const SIGN_UP = "/sign-up";
  // export const PROFILE = "/profile/:userId";
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
              <ProtectedRoute user={state} exact path={ROUTES.MYPROFILE}>
                <Myprofile />
              </ProtectedRoute>{" "}
              <ProtectedRoute user={state} exact path={ROUTES.PROFILE}>
                <Profile />
              </ProtectedRoute>
              <ProtectedRoute user={state} path={ROUTES.DASHBOARD} exact>
                <Dashboard />
              </ProtectedRoute>
              <ProtectedRoute
                user={state}
                path={ROUTES.MYFOLLOWINGDASHBOARD}
                exact
              >
                <MyFollowingDashboard />
              </ProtectedRoute>
              <Route>
                <NotFound />
              </Route>
            </Switch>
          </Suspense>
        </Router>
      </RecoilRoot>
    </UserContext.Provider>
  );
}
