import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { SignUpPage, LogInPage, DashboardPage, ErrorPage } from "./pages";
import ProtectedRoute from "./components/ProtectedRoute";
import { Layout } from "./components";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <DashboardPage />
      </ProtectedRoute>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "/log-in",
    element: <LogInPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/sign-in",
    element: <SignUpPage />,
    errorElement: <ErrorPage />,
  },
]);

function App() {
  return (
    <div>
      <Layout>
        <RouterProvider router={router} />
      </Layout>
    </div>
  );
}

export default App;
