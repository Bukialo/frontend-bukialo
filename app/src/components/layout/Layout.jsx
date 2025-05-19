import { Outlet } from "react-router-dom";
import Navbar from "./navbar/Navbar.jsx";
import Footer from "./footer/Footer.jsx";

const Layout = () => {
  return (
    <>
      <Navbar></Navbar>
      <Outlet></Outlet>
      <Footer></Footer>
    </>
  );
};

export default Layout;
