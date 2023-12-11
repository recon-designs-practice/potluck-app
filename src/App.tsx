import React from "react";
import { Routes, Route } from "react-router-dom";
import { auth, onAuthStateChanged } from "./firebase";
import useUserStore from "./stores/userStore";
import { SignUpPage, LogInPage, DashboardPage, ErrorPage } from "./pages";
// import ProtectedRoute from "./components/ProtectedRoute";
import { Layout } from "./components";

function App() {
  // @ts-expect-error
  const setCurrentUser = useUserStore((state) => state.setCurrentUser);

  React.useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (!user) {
        setCurrentUser(null);
      }
    });
  }, []);

  return (
    <div>
      <Layout>
        <Routes>
          <Route
            path="/"
            element={<DashboardPage />}
            errorElement={<ErrorPage />}
          />
          <Route
            path="/sign-up"
            element={<SignUpPage />}
            errorElement={<ErrorPage />}
          />
          <Route
            path="/log-in"
            element={<LogInPage />}
            errorElement={<ErrorPage />}
          />
        </Routes>
      </Layout>
    </div>
  );
}

export default App;
