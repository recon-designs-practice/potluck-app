import React from "react";
import { Routes, Route } from "react-router-dom";
import { auth, firestoreDb, onAuthStateChanged } from "./firebase";
import { collection, getDoc, doc, onSnapshot } from "firebase/firestore";
import useUserStore from "./stores/userStore";
import useEventsStore from "./stores/eventsStore";
import { SignUpPage, LogInPage, DashboardPage, ErrorPage } from "./pages";
// import ProtectedRoute from "./components/ProtectedRoute";
import { Layout } from "./components";

function App() {
  // @ts-expect-error
  const setCurrentUser = useUserStore((state) => state.setCurrentUser);
  // @ts-expect-error
  const addAllEvents = useEventsStore((state) => state.addAllEvents);

  //@ts-expect-error
  React.useEffect(() => {
    const eventsCollectionRef = collection(firestoreDb, "events");

    const unsubscribe = onSnapshot(eventsCollectionRef, (snapshot) => {
      const tempArr: any = [];

      snapshot.forEach((doc: any) => {
        tempArr.push({
          id: doc.id,
          ...doc.data(),
        });
      });

      addAllEvents(tempArr);
    });

    return () => unsubscribe;
  }, []);

  React.useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (!user) {
        setCurrentUser(null);
      }

      if (user) {
        const docRef = doc(firestoreDb, "users", user.uid);
        const documentSnapshot = await getDoc(docRef);

        if (documentSnapshot.exists()) {
          setCurrentUser(documentSnapshot.data());
        }
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
