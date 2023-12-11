import React from "react";
import styled from "@emotion/styled";
import useSetupStore from "../../stores/store";
import { Button } from "@mui/material";

type Props = {};

const StyledHeader = styled("header")`
  display: flex;
  justify-content: space-between;
`;

const StyledButton = styled(Button)`
  align-self: center;
`

export default function Header({}: Props) {
  // @ts-expect-error
  const isLoggedIn = useSetupStore((state) => state.isLoggedIn);
  // @ts-expect-error
  const setIsLoggedIn = useSetupStore((state) => state.setIsLoggedIn);
  console.log(isLoggedIn);
  return (
    <StyledHeader>
      <h2>Header</h2>
      <StyledButton onClick={setIsLoggedIn} variant="contained">
        {isLoggedIn ? 'Log out' : 'Log in'}
      </StyledButton>
    </StyledHeader>
  );
}
