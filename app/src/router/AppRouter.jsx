import { Route, Routes } from "react-router-dom";
import { routes } from "./menuRoutes";
import RouteNotFound from "../components/routeNotFound/routeNotFound";
import Layout from "../components/layout/Layout.jsx";
import ProtectedRoute from "../authContext/ProtectedRoute.jsx";

const AppRouter = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        {routes
          .filter((route) => route.public)
          .map(({ id, path, Element }) => (
            <Route key={id} path={path} element={<Element />} />
          ))}

        <Route element={<ProtectedRoute />}>
          {routes
            .filter((route) => !route.public)
            .map(({ id, path, Element }) => (
              <Route key={id} path={path} element={<Element />} />
            ))}
        </Route>
        <Route path="*" element={<RouteNotFound />} />
      </Route>
    </Routes>
  );
};

export default AppRouter;
