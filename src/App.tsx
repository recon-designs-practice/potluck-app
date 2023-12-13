import React from "react";
import { Routes, Route } from "react-router-dom";
import { auth, firestoreDb, onAuthStateChanged } from "./firebase";
import { collection, getDocs } from "firebase/firestore";
import useUserStore from "./stores/userStore";
import useEventsStore from "./stores/eventsStore";
import { SignUpPage, LogInPage, DashboardPage, ErrorPage } from "./pages";
// import ProtectedRoute from "./components/ProtectedRoute";
import { Layout } from "./components";

function App() {
  // @ts-expect-error
  const setCurrentUser = useUserStore((state) => state.setCurrentUser);
  // @ts-expect-error
  const allEvents = useEventsStore((state) => state.allEvents);
  // @ts-expect-error
  const addAllEvents = useEventsStore((state) => state.addAllEvents);

  React.useEffect(() => {
    async function getAllDocs() {
      const querySnapshot = await getDocs(collection(firestoreDb, "events"));

      const tempArr: any = [];

      querySnapshot.forEach((doc) => {
        tempArr.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      addAllEvents(tempArr);
    }

    getAllDocs();
  }, []);

  // console.log(555, allEvents);

  React.useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (!user) {
        setCurrentUser(null);
      }

      if (user) {
        const { displayName, email, metadata, photoURL, uid } = user;

        const newUser = {
          displayName,
          email,
          metadata,
          photoURL,
          uid,
        };

        setCurrentUser(newUser);
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
