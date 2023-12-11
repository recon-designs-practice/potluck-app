import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { auth, onAuthStateChanged } from "./firebase";
import useUserStore from "./stores/userStore";
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
    path: "/sign-up",
    element: <SignUpPage />,
    errorElement: <ErrorPage />,
  },
]);

function App() {
  // @ts-expect-error
  const currentUser = useUserStore((state) => state.currentUser);
  // @ts-expect-error
  const setCurrentUser = useUserStore((state) => state.setCurrentUser);

  React.useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const { displayName, email, metadata, photoURL, uid } = user;

        const currentUserObj = {
          displayName,
          email,
          metadata,
          photoURL,
          uid,
        };

        setCurrentUser(currentUserObj);
      } else {
        // console.log("User is signed out.");
      }
    });
  }, []);

  return (
    <div>
      <Layout>
        <RouterProvider router={router} />
      </Layout>
    </div>
  );
}

export default App;
