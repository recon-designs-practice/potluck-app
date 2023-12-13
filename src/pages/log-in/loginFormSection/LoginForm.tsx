import React from "react";
import styled from "@emotion/styled";
import { auth, signOut, signInWithPopup, provider } from "../../../firebase";
import { useNavigate } from "react-router-dom";
import { FormControl, TextField, Button } from "@mui/material";
import { Form } from "../../../components";

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

  const handleSubmit = () => {
    alert("Form has been submitted.");
  };

  const handleGoogleSignIn = () => {
    signInWithPopup(auth, provider).then((result: any) => {
      console.log(`${result.user.displayName} has signed in.`);

      navigate("/");
    });
  };

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
        variant="contained"
        style={{
          marginTop: "12px",
          width: "100%",
          background: "none",
          color: "#1976d2",
          border: "2px solid #1976d2",
        }}
        onClick={handleGoogleSignIn}
      >
        Google
      </Button>
    </FormWrapper>
  );
}
