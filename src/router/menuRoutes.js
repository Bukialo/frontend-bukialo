import HomePage from "../pages/homepage/HomePage.jsx";
import Contact from "../pages/contact/Contact.jsx";
import Login from "../components/sesion/login/Login.jsx";
import Register from "../components/sesion/register/Register.jsx";
import Dashboard from "../pages/dashboard/Dashboard.jsx";
import Profile from "../pages/profile/Profile.jsx";
import PaymentSuccess from "../pages/payment_mp/paymentSuccess/PaymentSuccess.jsx";
import PaymentFailed from "../pages/payment_mp/paymentFailed/PaymentFailed.jsx";

export const routes = [
  {
    id: "homepage",
    path: "/",
    Element: HomePage,
    public: true,
  },
  {
    id: "contact",
    path: "/contact",
    Element: Contact,
    public: true,
  },
  {
    id: "login",
    path: "/login",
    Element: Login,
    public: true,
  },
  {
    id: "register",
    path: "/register",
    Element: Register,
    public: true,
  },
  {
    id: "dashboard",
    path: "/dashboard",
    Element: Dashboard,
    public: false,
  },
  {
    id: "profile",
    path: "/profile",
    Element: Profile,
    public: false,
  },
  {
    id: "payment-success",
    path: "/payment-success",
    Element: PaymentSuccess,
    public: false,
  },
  {
    id: "payment-failed",
    path: "/payment-failed",
    Element: PaymentFailed,
    public: false,
  },
];
