import React from "react";
import styled from "@emotion/styled";
import { Typography } from "@mui/material";

type Props = {
  title?: String;
  onsubmit?: () => void;
  children: React.ReactNode;
};

const StyledForm = styled("form")`
  box-sizing: border-box;
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export default function Form({
  title,
  children,
  onsubmit,
  ...otherProps
}: Props) {
  return (
    <StyledForm onSubmit={onsubmit} {...otherProps}>
      {title && (
        <Typography variant="h5" fontWeight="bold">
          {title}
        </Typography>
      )}
      {children}
    </StyledForm>
  );
}
