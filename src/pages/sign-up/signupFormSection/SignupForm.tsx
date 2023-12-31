import React from "react";
import styled from "@emotion/styled";
import { FormControl, TextField, Button } from "@mui/material";
import { Form } from "../../../components";

// type Props = {};

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

export default function SignupForm() {
  const [emailValue, setEmailValue] = React.useState(null);
  const [passwordValue, setPasswordValue] = React.useState(null);

  const handleSubmit = () => {
    alert("Form has been submitted.");
  };

  return (
    <FormWrapper>
      <Form title="Sign up" onsubmit={handleSubmit}>
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
          Sign up
        </Button>
      </Form>
    </FormWrapper>
  );
}
