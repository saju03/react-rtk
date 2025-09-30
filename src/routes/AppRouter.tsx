import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AppLayout from "../layout/AppLayout";
import LoginRegister from "../pages/LoginRegister";
import ProductListPage from "../pages/ProductListPage";
import ProductDetailPage from "../pages/ProductDetailPage";
import NotFound from "../pages/NotFound";
import { loginRegisterLoaders } from "../loaders/loginRegisterLoaders";
import { productListLoaders } from "../loaders/productListLoaders";

export default function AppRouter() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <AppLayout />,
      children: [
        {
          index: true,
          element: <ProductListPage />,
          loader: productListLoaders,
        },
        {
          path: "/loginorsignup",
          loader: loginRegisterLoaders,
          element: <LoginRegister />,
        },
        {
          path: "/product/:id",
          element: <ProductDetailPage />,
        },
      ],
    },
    { path: "*", element: <NotFound /> },
  ]);

  return <RouterProvider router={router} />;
}
