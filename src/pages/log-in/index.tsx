import React from "react";
import styled from "@emotion/styled";
import LogInFormSection from "./loginFormSection";

const Main = styled("main")`
  height: calc(100vh - 64px);
`;

export default function LogInPage() {
  return (
    <Main style={{ height: "calc(100vh - 64px)" }}>
      <LogInFormSection />
    </Main>
  );
}
