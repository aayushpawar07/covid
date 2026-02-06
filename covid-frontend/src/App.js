import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";

import ThemeContextProvider from "./contexts/ThemeContext";
import Layout from "./components/Layout";

// Pages
import Dashboard from "./pages/Dashboard";
import CountryWisePage from "./pages/CountryWisePage";
import UsaCountryWisePage from "./pages/UsaCountryWisePage";
import WorldometerPage from "./pages/WorldometerPage";
import DayWisePage from "./pages/DayWisePage";
import FullGroupedPage from "./pages/FullGroupedPage";
import CovidCleanCompletePage from "./pages/CovidCleanCompletePage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import { useAuth } from "./contexts/AuthContext";

function RequireAuth({ children }) {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return children;
}

function App() {
  return (
    <ThemeContextProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />

            <Route
              path="/"
              element={
                <RequireAuth>
                  <Dashboard />
                </RequireAuth>
              }
            />
            <Route
              path="/country-wise"
              element={
                <RequireAuth>
                  <CountryWisePage />
                </RequireAuth>
              }
            />
            <Route
              path="/usa-country-wise"
              element={
                <RequireAuth>
                  <UsaCountryWisePage />
                </RequireAuth>
              }
            />
            <Route
              path="/worldometer"
              element={
                <RequireAuth>
                  <WorldometerPage />
                </RequireAuth>
              }
            />
            <Route
              path="/day-wise"
              element={
                <RequireAuth>
                  <DayWisePage />
                </RequireAuth>
              }
            />
            <Route
              path="/full-grouped"
              element={
                <RequireAuth>
                  <FullGroupedPage />
                </RequireAuth>
              }
            />
            <Route
              path="/clean-complete"
              element={
                <RequireAuth>
                  <CovidCleanCompletePage />
                </RequireAuth>
              }
            />
          </Routes>
        </Layout>
      </Router>
    </ThemeContextProvider>
  );
}

export default App;
