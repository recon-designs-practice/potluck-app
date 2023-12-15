import React from "react";
import styled from "@emotion/styled";
import { v4 as uuid } from "uuid";
import { useNavigate } from "react-router-dom";
import useUserStore from "../../stores/userStore";
import useEventsStore from "../../stores/eventsStore";
import { auth, signOut, firestoreDb } from "../../firebase";
import { doc, setDoc, updateDoc, Timestamp } from "firebase/firestore";
import { Button, Unstable_Grid2 as Grid, Typography } from "@mui/material";
import LogOutIcon from "@mui/icons-material/LogoutRounded";
import AddIcon from "@mui/icons-material/AddRounded";

type Props = {
  children?: React.ReactNode;
};

const StyledHeader = styled("header")`
  box-sizing: border-box;
  position: relative;
  padding: 20px 20px;

  @media (min-width: 600px) {
    padding: 32px 40px;
  }

  @media (min-width: 900px) {
    padding: 40px 80px;
  }
`;

const StyledButton = styled(Button)`
  align-self: center;
`;

const ButtonWrapper = styled("div")`
  box-sizing: border-box;
  position: relative;
  height: 100%;
  display: none;

  @media (min-width: 900px) {
    display: flex;
    justify-content: end;
    align-items: center;
    gap: 20px;
  }
`;

const MenuIconWrapper = styled("div")`
  box-sizing: border-box;
  position: relative;
  height: 100%;
  display: flex;
  justify-content: end;
  align-items: center;
  gap: 12px;

  @media (min-width: 900px) {
    background: green;
    display: none;
  }
`;

export default function Header({ children }: Props) {
  // @ts-expect-error
  const allEvents = useEventsStore((state) => state.allEvents);
  // @ts-expect-error
  const currentUser = useUserStore((state) => state.currentUser);
  // @ts-expect-error
  const setCurrentUser = useUserStore((state) => state.setCurrentUser);
  // const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const navigate = useNavigate();

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        console.log("User has signed out.");
        setCurrentUser(null);

        navigate("/log-in");
      })
      .catch((error) => console.log(error.code, error.message));
  };

  async function handleAddEvent() {
    const { user_uid, user_rsvp_events, user_created_events } = currentUser;
    const uniqueId = uuid();
    const userDocumentRef = doc(firestoreDb, "users", user_uid);
    const newEventRef = doc(firestoreDb, "events", uniqueId);

    setDoc(newEventRef, {
      event_name: `Christmast party ${allEvents.length + 1}`,
      event_description:
        "A description should go here. Should be long enough to possibly wrap a time or two. Who knows. Let's see how this goes.",
      event_date: Timestamp.fromDate(new Date("December 25, 2023")),
      event_location: "Community room in the main building.",
      event_created_by: userDocumentRef,
      event_image:
        "https://images.unsplash.com/photo-1583779791512-eeccdee5c5dd?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bWNkb25hbGRzfGVufDB8fDB8fHww",
      event_rsvp_users: [userDocumentRef],
    })
      .then(() => console.log("Field with reference added successfully."))
      .catch((error) =>
        console.log("Error adding field with refernce.", error)
      );

    updateDoc(userDocumentRef, {
      user_created_events: [...user_created_events, newEventRef],
      user_rsvp_events: [...user_rsvp_events, newEventRef],
    })
      .then(() => console.log("Field with reference added successfully."))
      .catch((error) =>
        console.log("Error adding field with refernce.", error)
      );
  }

  return (
    <StyledHeader>
      {children ? (
        children
      ) : (
        <Grid container spacing={2}>
          <Grid xs={9} md={6}>
            <div
              style={{
                height: "100%",
                display: "flex",
                justifyContent: "start",
                alignItems: "center",
              }}
            >
              <Typography variant="h4" fontWeight="bold">
                {currentUser ? currentUser.user_name : "Welcome"}
              </Typography>
            </div>
          </Grid>
          <Grid xs={3} md={6}>
            {currentUser && (
              <ButtonWrapper>
                <StyledButton
                  onClick={handleAddEvent}
                  variant="contained"
                  style={{ fontWeight: "bold" }}
                >
                  Add event
                </StyledButton>
                <StyledButton
                  onClick={handleSignOut}
                  variant="outlined"
                  style={{ fontWeight: "bold" }}
                >
                  Log out
                </StyledButton>
              </ButtonWrapper>
            )}
            <MenuIconWrapper>
              {currentUser && (
                <>
                  <AddIcon
                    style={{ cursor: "pointer" }}
                    color="primary"
                    fontSize="large"
                    onClick={handleAddEvent}
                  />
                  <LogOutIcon
                    style={{ cursor: "pointer" }}
                    color="primary"
                    onClick={handleSignOut}
                  />
                </>
              )}
            </MenuIconWrapper>
          </Grid>
        </Grid>
      )}
    </StyledHeader>
  );
}
