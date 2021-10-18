import { Suspense, lazy, useReducer, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import * as ROUTES from "./constants/routes";
import Spinner from "./components/Spinner";
import { reducer, initialState } from "./reducers/userReducer";
import UserContext from "./context/user";
import ProtectedRouting from "./ProtectedRouting";
import Login from "./pages/login";
import SignUp from "./pages/sign-up";
import NotFound from "./pages/not-found";
import { RecoilRoot } from "recoil";

// const Login = lazy(() => import("./pages/login"));
// const SignUp = lazy(() => import("./pages/sign-up"));
// const Dashboard = lazy(() => import("./pages/dashboard"));
// const Profile = lazy(() => import("./pages/profile"));
// const NotFound = lazy(() => import("./pages/not-found"));

export default function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <UserContext.Provider value={{ state, dispatch }}>
      <RecoilRoot>
        <Router>
          <Suspense fallback={<Spinner />}>
            <Switch>
              <Route exact path={ROUTES.LOGIN}>
                <Login />
              </Route>
              <Route path={ROUTES.SIGN_UP}>
                <SignUp />
              </Route>
              <ProtectedRouting />
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
