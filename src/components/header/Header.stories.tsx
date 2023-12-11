import React from "react";
import { Meta, StoryObj } from '@storybook/react'
import Header from "./Header";

export const Default: StoryObj<typeof Header> = {
  render: args => <Header {...args} />,
};

const meta: Meta<typeof Header> = {
  title: "Components/Header",
  component: Header,
};

export default meta;
