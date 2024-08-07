import { useState, useEffect, Suspense, lazy } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import { AuthProvider, useAuth } from "./uath/AuthenticationContex";
import { AuthProvider as LogOutContext } from "./uath/automaticSignOutContext";
import PrivateRoute from "./Routes/PrivateRoute";
import Loader from "./components/Loader";
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import Logout from "./components/logout.jsx";



// Lazy load scenes
const Dashboard = lazy(() => import("./scenes/dashboard"));
const Team = lazy(() => import("./scenes/team"));
const Invoices = lazy(() => import("./scenes/invoices"));
const Contacts = lazy(() => import("./scenes/contacts"));
const Bar = lazy(() => import("./scenes/bar"));
const Form = lazy(() => import("./scenes/form"));
const Line = lazy(() => import("./scenes/line"));
const Pie = lazy(() => import("./scenes/pie"));
const FAQ = lazy(() => import("./scenes/faq"));
const Geography = lazy(() => import("./scenes/geography"));
const Calendar = lazy(() => import("./scenes/calendar/calendar"));
const Tree = lazy(() => import("./scenes/tree"));
const Register = lazy(() => import("./scenes/form/Register"));
const Login = lazy(() => import("./scenes/form/Register/Login"));
const Documentation = lazy(() => import("./scenes/global/Documentation"));
const ForgotPassword = lazy(() => import("./scenes/form/forgotpassword"));
const SettingsProfile = lazy(() => import("./scenes/partials/sidebar/set-profile-picture"));
const Permissions = lazy(() => import("./scenes/form/Privilages"));
const Roles = lazy(() => import("./scenes/form/Roles/Index"));
const Users = lazy(() => import("./scenes/form/Users"));
const Posts = lazy(() => import("./scenes/form/posts/Index"));
const PostsList = lazy(() => import("./scenes/form/posts/forms/posts.jsx"));
const Feedback = lazy(() => import("./scenes/FeedbackRating/Index.jsx"));
const Ratings = lazy(() => import("./scenes/UserExperienceRatings/Index.jsx"));
const Chat = lazy(() => import("./scenes/Chat/Index.jsx"));

function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AuthProvider>
      <LogOutContext>
        <ColorModeContext.Provider value={colorMode}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <div className="app">
              <Sidebar isSidebar={isSidebar} />
              <main className="content">
                <Topbar setIsSidebar={setIsSidebar} />
                <Suspense fallback={<Loader />}>
                  <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/loader" element={<Loader />} />
                    <Route path="/logout" element={<Logout />} />
                    <Route path="/forgotpassword" element={<ForgotPassword />} />
                    <Route path="/" element={<Navigate to="/login" />} />
                    <Route
                      path="/dashboard"
                      element={
                        <PrivateRoute>
                          <Dashboard />
                        </PrivateRoute>
                      }
                    />
                    <Route
                      path="/notifications"
                      element={
                        <PrivateRoute>
                          <PostsList />
                        </PrivateRoute>
                      }
                    />
                  
                    <Route
                      path="/roles"
                      element={
                        <PrivateRoute>
                          <Roles />
                        </PrivateRoute>
                      }
                    />
                     <Route
                      path="/access"
                      element={
                        <PrivateRoute>
                          <Permissions />
                        </PrivateRoute>
                      }
                    />
                    <Route
                      path="/posts"
                      element={
                        <PrivateRoute>
                          <Posts />
                        </PrivateRoute>
                      }
                    />
                     <Route
                      path="/rate_feedback"
                      element={
                        <PrivateRoute>
                          <Feedback />
                        </PrivateRoute>
                      }
                    />
                    <Route
                      path="/users"
                      element={
                        <PrivateRoute>
                          <Users />
                        </PrivateRoute>
                      }
                    />
                    <Route
                      path="/user_ratings"
                      element={
                        <PrivateRoute>
                          <Ratings />
                        </PrivateRoute>
                      }
                    />
                    <Route
                      path="/chat"
                      element={
                        <PrivateRoute>
                          <Chat />
                        </PrivateRoute>
                      }
                    />
                    <Route
                      path="/bar"
                      element={
                        <PrivateRoute>
                          <Bar />
                        </PrivateRoute>
                      }
                    />
                    <Route
                      path="/pie"
                      element={
                        <PrivateRoute>
                          <Pie />
                        </PrivateRoute>
                      }
                    />
                    <Route
                      path="/line"
                      element={
                        <PrivateRoute>
                          <Line />
                        </PrivateRoute>
                      }
                    />
                    <Route
                      path="/faq"
                      element={
                        <PrivateRoute>
                          <FAQ />
                        </PrivateRoute>
                      }
                    />
                    <Route
                      path="/documentation"
                      element={
                        <PrivateRoute>
                          <Documentation />
                        </PrivateRoute>
                      }
                    />
                    <Route
                      path="/set-profile-picture"
                      element={
                        <PrivateRoute>
                          <SettingsProfile />
                        </PrivateRoute>
                      }
                    />
                    <Route
                      path="/geography"
                      element={
                        <PrivateRoute>
                          <Geography />
                        </PrivateRoute>
                      }
                    />
                    <Route
                      path="/tree"
                      element={
                        <PrivateRoute>
                          <Tree />
                        </PrivateRoute>
                      }
                    />
                  </Routes>
                </Suspense>
              </main>
            </div>
          </ThemeProvider>
        </ColorModeContext.Provider>
      </LogOutContext>
    </AuthProvider>
  );
}

export default App;
