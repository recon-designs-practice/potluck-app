import React from "react";
import styled from "@emotion/styled";
import {
  auth,
  signInWithPopup,
  provider,
  firestoreDb,
} from "../../../firebase";
import { useNavigate } from "react-router-dom";
import {
  collection,
  query,
  where,
  getDocs,
  getDoc,
  setDoc,
  doc,
} from "@firebase/firestore";
import { FormControl, TextField, Button } from "@mui/material";
import { Form } from "../../../components";
import useUserStore from "../../../stores/userStore";

type Props = {};

const FormWrapper = styled("div")`
  grid-column: 2 / 12;

  @media (min-width: 600px) {
    grid-column: 4 / 10;
  }

  @media (min-width: 900px) {
    grid-column: 5 / 9;
  }

  @media (min-width: 1200px) {
    grid-column: 6 / 8;
  }
`;

export default function LoginForm({}: Props) {
  const [emailValue, setEmailValue] = React.useState(null);
  const [passwordValue, setPasswordValue] = React.useState(null);
  const navigate = useNavigate();
  // @ts-expect-error
  const currentUser = useUserStore((state) => state.currentUser);
  // @ts-expect-error
  const setCurrentUser = useUserStore((state) => state.setCurrentUser);

  const handleSubmit = () => {
    alert("Form has been submitted.");
  };

  async function checkDocumentExists(userUID: any) {
    const usersCollectionRef = collection(firestoreDb, "users");

    const q = query(usersCollectionRef, where("user_uid", "==", userUID));

    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      return true;
    } else {
      return false;
    }
  }

  async function addNewUserDocument(documentObj: any) {
    const usersCollectionRef = collection(firestoreDb, "users");

    const {
      user_uid,
      user_name,
      user_email,
      user_image,
      user_phone,
      user_rsvp_events,
      user_created_events,
    } = documentObj;

    await setDoc(doc(usersCollectionRef, user_uid), {
      user_uid,
      user_name,
      user_email,
      user_image,
      user_phone,
      user_rsvp_events,
      user_created_events,
    });
  }

  const handleGoogleSignIn = () => {
    signInWithPopup(auth, provider).then((result: any) => {
      checkDocumentExists(result.user.uid).then(async (existsValue) => {
        if (!existsValue) {
          const { displayName, email, photoURL, uid } = result.user;

          const newUserDocObj = {
            user_uid: uid,
            user_name: displayName,
            user_email: email,
            user_image: photoURL,
            user_phone: {
              is_phone_private: true,
              phone_number: "555-555-1212",
            },
            user_rsvp_events: [],
            user_created_events: [],
          };

          addNewUserDocument(newUserDocObj);

          const docRef = doc(firestoreDb, "users", uid);
          const documentSnapshot = await getDoc(docRef);

          if (documentSnapshot.exists()) {
            setCurrentUser(documentSnapshot.data());
          }
        }
      });

      console.log(`${result.user.displayName} has signed in.`);
    });
  };

  React.useEffect(() => {
    if (currentUser) {
      const { user_uid } = currentUser
      
      navigate(`/dashboard/user/${user_uid}`)
    }
  }, [currentUser])

  return (
    <FormWrapper>
      <Form title="Log in" onsubmit={handleSubmit}>
        <FormControl>
          <TextField
            label="Email"
            type="email"
            value={emailValue}
            // @ts-expect-error
            onChange={(e) => setEmailValue(e.target.value)}
            disabled
          />
        </FormControl>
        <FormControl>
          <TextField
            label="Password"
            type="password"
            value={passwordValue}
            // @ts-expect-error
            onChange={(e) => setPasswordValue(e.target.value)}
            disabled
          />
        </FormControl>
        <Button type="submit" variant="contained" size="large" disabled>
          Log in
        </Button>
      </Form>
      <Button
        type="button"
        variant="outlined"
        size="large"
        style={{
          marginTop: "12px",
          width: "100%",
        }}
        onClick={handleGoogleSignIn}
      >
        Google
      </Button>
    </FormWrapper>
  );
}
