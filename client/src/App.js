import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import * as ROUTES from "./constants/routes";

//Enables lazy loading --> splits build into separate js bundles that will be delivered on demand vs one whole pack
//Improves performance of app once it gets bigger
const Login = lazy(() => import("./pages/Login"));
const SignUp = lazy(() => import("./pages/Sign-up"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Profile = lazy(() => import("./pages/Profile"));
const NotFound = lazy(() => import("./pages/Not-found"));

export default function App() {
  return (
    <Router>
      <Suspense fallback={<p>Loading...</p>}>
        <Switch>
          <Route path={ROUTES.LOGIN} component={Login} />
          <Route path={ROUTES.SIGN_UP} component={SignUp} />
          <Route path={ROUTES.PROFILE} component={Profile} />
          <Route path={ROUTES.DASHBOARD} component={Dashboard} />
          <Route component={NotFound} />
        </Switch>
      </Suspense>
    </Router>
  );
}
