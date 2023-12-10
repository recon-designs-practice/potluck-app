import React from "react";

type Props = {
  children?: React.ReactNode;
};

export default function Header({ children }: Props) {
  return <header>{!children ? <h3>Header</h3> : children}</header>;
}
