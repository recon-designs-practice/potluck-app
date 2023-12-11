import React from "react";
import styled from "@emotion/styled";
import useSetupStore from "../../stores/store";
import useUserStore from "../../stores/userStore";
import { auth, signOut, signInWithPopup, provider } from "../../firebase";
import { Button } from "@mui/material";

type Props = {
  children?: React.ReactNode;
};

const StyledHeader = styled("header")`
  display: flex;
  justify-content: space-between;
`;

const StyledButton = styled(Button)`
  align-self: center;
`;

export default function Header({ children }: Props) {
  // @ts-expect-error
  const currentUser = useUserStore((state) => state.currentUser);
  // @ts-expect-error
  const setCurrentUser = useUserStore((state) => state.setCurrentUser);

  const handleSignIn = () => {
    signInWithPopup(auth, provider)
      .then((result: any) => {
        console.log(`${result.user.displayName} has signed in.`);
      })
      .catch((error) => console.log(error.code, error.message));
  };

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        console.log("User has signed out.");
        setCurrentUser(null);
      })
      .catch((error) => console.log(error.code, error.message));
  };

  return (
    <StyledHeader>
      {children ? (
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
      )}
    </StyledHeader>
  );
}
