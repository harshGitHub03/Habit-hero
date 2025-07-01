import { redirect, Route, Routes, useLocation, useNavigate, Navigate, Outlet } from "react-router-dom";
import AboutPage from "./pages/AboutPage";
import Navbar from "./pages/Navbar";
import HowItWorks from "./Components/About page components/HowItWorks";
import HowItWorksPage from "./pages/HowItWorksPage";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Dashboard from "./pages/authTruePages/Dashboard";
import Achievements from "./pages/authTruePages/Achievement";
import ProfilePage from "./pages/authTruePages/ProfilePage";
import Logout from "./pages/authTruePages/LogoutPage";

import Habits from "./pages/authTruePages/Habits";
import HabitHistory from "./pages/authTruePages/HabitHistory";
import CreateHabitPage from "./Components/my-habit page components/CreateHabitPage";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef } from "react";
import NotFound from "./pages/NotFound";
import { verfyToken } from "./redux/thunks/authThunks";
import { getAllHabits } from "./redux/thunks/habitThunks";


const PrivateRoute = () => {
  const { isAuthenticated, loading } = useSelector((state) => state.authData);
  if (loading) return <div>Loading...</div>;
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

// GuestRoute.jsx
const GuestRoute = () => {
  const { isAuthenticated, loading } = useSelector((state) => state.authData);
  if (loading) return <div>Loading...</div>;
  return !isAuthenticated ? <Outlet /> : <Navigate to="/dashboard" replace />;
};

const App = () => {
  const dispatch = useDispatch()

  //verifyJwt on load/reload
  useEffect(() => {
    dispatch(verfyToken())
  }, [])


  const protectedRoutes = [
    { path: "/dashboard", element: <Dashboard /> },
    { path: "/habits", element: <Habits /> },
    { path: "/habits/create", element: <CreateHabitPage /> },
    { path: "/habit-history", element: <HabitHistory /> },
    { path: "/achievements", element: <Achievements /> },
    { path: "/profile", element: <ProfilePage /> },
    { path: "/logout", element: <Logout /> }
  ];

  const guestRoutes = [
    { path: "/", element: <AboutPage /> },
    { path: "/how-it-works", element: <HowItWorksPage /> },
    { path: "/login", element: <Login /> },
    { path: "/signup", element: <SignUp /> },
  ];


  //get pathname to scroll to top when route changes
  const { pathname } = useLocation();

  //scroll to top on reload
  useEffect(() => {
    window.scrollTo({
      top: 0,
      // behavior: 'smooth',
    });
  }, [pathname])

  return (
    <>
      <Navbar />
      <Routes>
        {/* Guest Routes */}
        <Route element={<GuestRoute />}>
          {guestRoutes.map(({ path, element }) => (
            <Route key={path} path={path} element={element} />
          ))}
        </Route>

        {/* Protected Routes */}
        <Route element={<PrivateRoute />}>
          {protectedRoutes.map(({ path, element }) => (
            <Route key={path} path={path} element={element} />
          ))}
        </Route>

        {/* 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App
