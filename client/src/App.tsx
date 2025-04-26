import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import Home from "./routes/HomePage";
import NotFound from "./routes/NotFoundPage";
import Layout from "./routes/layout";
import SignupPage from "./routes/Signup";
import LoginPage from "./routes/Login";
import { useAuthContext } from "./hooks/useAuthContext";
import Board from "./components/Board";
import Profile from "./routes/Profile";

// Define the root component of the application
const App = () => {
  // Access user information from the authentication context using the useAuthContext hook
  const { user } = useAuthContext();

  // Create a BrowserRouter instance with route configurations
  const router = createBrowserRouter([
    {
      path: "/", // Root path
      element: <Layout />, // Layout component is always rendered at the root level
      children: [
        // Define route configurations with elements to render for each path
        { path: "/", element: <Home />, errorElement: <NotFound /> }, // Home page route
        { path: "/profile", element: <Profile />, errorElement: <NotFound /> }, // Profile page route
        { path: "/board", element: user ? <Board /> : <Navigate to="/login" />, errorElement: <NotFound />, /* loader: PageLoader */ }, // Tasks page route, redirect to login if not authenticated
        { path: "/signup", element: !user ? <SignupPage /> : <Navigate to="/board" />, errorElement: <NotFound /> }, // Signup page route, redirect to tasks if already authenticated
        { path: "/login", element: !user ? <LoginPage /> : <Navigate to="/board" />, errorElement: <NotFound /> }, // Login page route, redirect to tasks if already authenticated
        { path: "/settings", element: !user ? <LoginPage /> : <Navigate to="/settings" />, errorElement: <NotFound /> }, // Settings page route, redirect to login if not authenticated
        // Inside your Routes component, add:
      ],
    },
  ]);

  // Render the RouterProvider with the configured router
  return <RouterProvider router={router} />;
}

export default App;
