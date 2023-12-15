import React from "react";
import styled from "@emotion/styled";
import LoginForm from "./LoginForm";

// type Props = {};

const SectionContainer = styled("div")`
  box-sizing: border-box;
  position: relative;
  padding: 20px 20px;
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-template-rows: auto;

  @media (min-width: 600px) {
    padding: 40px 40px;
  }

  @media (min-width: 900px) {
    padding: 80px 80px;
  }
`;

export default function LogInFormSection() {
  return (
    <SectionContainer>
      <LoginForm />
    </SectionContainer>
  );
}
