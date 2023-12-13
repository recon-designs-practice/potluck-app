import React from "react";
import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";
import useUserStore from "../../stores/userStore";
import { auth, signOut, signInWithPopup, provider } from "../../firebase";
import { Button, Unstable_Grid2 as Grid } from "@mui/material";

type Props = {
  children?: React.ReactNode;
};

const StyledHeader = styled("header")`
  box-sizing: border-box;
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

export default function Header({ children }: Props) {
  // @ts-expect-error
  const currentUser = useUserStore((state) => state.currentUser);
  // @ts-expect-error
  const setCurrentUser = useUserStore((state) => state.setCurrentUser);
  const navigate = useNavigate();

  const handleSignIn = () => {
    signInWithPopup(auth, provider)
      .then((result: any) => {
        console.log(`${result.user.displayName} has signed in.`);

        navigate("/");
      })
      .catch((error) => console.log(error.code, error.message));
  };

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        console.log("User has signed out.");

        setCurrentUser(null);

        navigate("/log-in");
      })
      .catch((error) => console.log(error.code, error.message));
  };

  return (
    <StyledHeader>
      {children ? (
        children
      ) : (
        <Grid container spacing={0}>
          <Grid xs={9}>
            <div
              style={{
                height: "100%",
                display: "flex",
                justifyContent: "start",
                alignItems: "center",
              }}
            >
              <h2 style={{ margin: "0px" }}>Header with grid</h2>
            </div>
          </Grid>
          <Grid xs={3}>
            <div
              style={{
                height: "100%",
                display: "flex",
                justifyContent: "end",
                alignItems: "center",
              }}
            >
              <StyledButton
                onClick={currentUser ? handleSignOut : handleSignIn}
                variant="contained"
              >
                {currentUser ? "Log out" : "Log in"}
              </StyledButton>
            </div>
          </Grid>
        </Grid>
      )}

      {/* {children ? (
        children
      ) : (
        <>
          <h2>Header</h2>
          <StyledButton
            onClick={currentUser ? handleSignOut : handleSignIn}
            variant="contained"
          >
            {currentUser ? "Log out" : "Log in"}
          </StyledButton>
        </>
      )} */}
    </StyledHeader>
  );
}
