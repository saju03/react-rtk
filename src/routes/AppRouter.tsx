import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AppLayout from "../layout/AppLayout";
import LoginRegister from "../pages/LoginRegister";
import NotFound from "../pages/NotFound";

export default function AppRouter() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <AppLayout />,
      children: [
        {
          path: "/loginorsignup",
          element: <LoginRegister />,
        },
      ],
    },
    { path: "*", element: <NotFound /> },
  ]);

  return <RouterProvider router={router} />;
}
