import React from "react";
import styled from "@emotion/styled";
import { FormControl, TextField, Button, Typography } from "@mui/material";

type Props = {};

const Form = styled("form")`
  box-sizing: border-box;
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

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

  const handleSubmit = () => {
    alert("Form has been submitted.");
  };

  return (
    <FormWrapper>
      <Form onSubmit={handleSubmit}>
        <Typography variant="h5" fontWeight="bold">
          Log in
        </Typography>
        <FormControl>
          <TextField
            label="Email"
            type="email"
            value={emailValue}
            // @ts-expect-error
            onChange={(e) => setEmailValue(e.target.value)}
          />
        </FormControl>
        <FormControl>
          <TextField
            label="Password"
            type="password"
            value={passwordValue}
            // @ts-expect-error
            onChange={(e) => setPasswordValue(e.target.value)}
          />
        </FormControl>
        <Button type="submit" variant="contained" size="large">
          Log in
        </Button>
        <Button
          type="submit"
          variant="contained"
          style={{
            background: "none",
            color: "#1976d2",
            border: "2px solid #1976d2",
          }}
        >
          Register
        </Button>
      </Form>
    </FormWrapper>
  );
}
