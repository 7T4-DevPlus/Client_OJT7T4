import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import PageNotFound from "./pages/404notfound/PagenotFound";
import publishRouters from "./routes/publishRouters/PublishRouters";
import privateRouters from "./routes/privateRouter/PrivateRouter";

const Routers = () => {
  const router = createBrowserRouter([
    {
      path: "",
      element: <Outlet />,
      errorElement: <PageNotFound />,
      children: [...publishRouters, ...privateRouters],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default Routers;
