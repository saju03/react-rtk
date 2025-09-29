import { Outlet } from "react-router-dom";
import Footer from "../components/partials/Footer/Footer";
import Header from "../components/partials/Header/Header";
export default function AppLayout() {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}
