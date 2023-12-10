import React from "react";
import Header from "./Header";

export const Default = {
  render: (args) => <Header {...args} />,
  args: {
    children: <h3>Header</h3>
  },
};

const meta = {
  title: "Components/Header",
  component: Header,
};

export default meta;
