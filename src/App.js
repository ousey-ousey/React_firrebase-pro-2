import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/home/Home";
import About from "./pages/About";
import Profile from "./pages/Profile";
// LEVEL2
import { SpeedInsights } from "@vercel/speed-insights/react";

import { useContext } from "react";
import ThemeContext from "./context/ThemeContext";
import Signin from "./pages/sign in/Singin.jsx";
import Signup from "./pages/Signup";
import Edit from "./pages/editpage/editpage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <h2>page NOT FOund GO BACK NOW !!!</h2>,
  },
  {
    path: "/signin",
    element: <Signin />,
  },
  {
    path: "/editpage/:stringid",
    element: <Edit />,
  },

  {
    path: "/signup",
    element: <Signup />,
  },

  {
    path: "/about",
    element: <About />,
  },

  {
    path: "/profile",
    element: <Profile />,
  },
]);

function App() {
  const { theme } = useContext(ThemeContext);
  return (
    <div className={`${theme}`}>
      <RouterProvider router={router} />
      <SpeedInsights />
    </div>
  );
}

export default App;
