import { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import Dashboard from "./scenes/dashboard";
import Team from "./scenes/team";
import Invoices from "./scenes/invoices";
import Contacts from "./scenes/contacts";
import Bar from "./scenes/bar";
import Form from "./scenes/form";
import Line from "./scenes/line";
import Pie from "./scenes/pie";
import FAQ from "./scenes/faq";
import Geography from "./scenes/geography";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import Calendar from "./scenes/calendar/calendar";
import Tree from "./scenes/tree";
import Register from "./scenes/form/Register";
import Login from "./scenes/form/Register/Login";
import { AuthProvider, useAuth } from "./uath/AuthenticationContex";
import PrivateRoute from "./Routes/PrivateRoute";
import Documentation from "./scenes/global/Documentation";
import ForgotPassword from "./scenes/form/forgotpassword";


function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const getAuth = localStorage.getItem("Status");
  setTimeout(() => {
    setIsLoading(false);
  }, 3000);

  useEffect(() => {}, []);
  return isLoading ? (
    <div>loading, please wait ...</div>
  ) : (
    <AuthProvider>
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <div className="app">
            <Sidebar isSidebar={isSidebar} />

            <main className="content">
              <Topbar setIsSidebar={setIsSidebar} />
              <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
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
                  path="/team"
                  element={
                    <PrivateRoute>
                      <Team />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/contacts"
                  element={
                    <PrivateRoute>
                      <Contacts />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/invoices"
                  element={
                    <PrivateRoute>
                      <Invoices />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/form"
                  element={
                    <PrivateRoute>
                      <Form />
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
                  path="/forgotpassword"
                  element={
                    <PrivateRoute>
                      <ForgotPassword />
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
                  path="/calendar"
                  element={
                    <PrivateRoute>
                      <Calendar />
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
            </main>
          </div>
        </ThemeProvider>
      </ColorModeContext.Provider>
    </AuthProvider>
  );
}

export default App;
