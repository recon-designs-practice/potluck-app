import React from "react";
import { Meta, StoryObj } from '@storybook/react'
import Header from "./Header";

export const Default: StoryObj<typeof Header> = {
  render: args => (<header {...args}>Not a Header component.</header>)
};

const meta: Meta<typeof Header> = {
  title: "Components/Header",
  component: Header,
};

export default meta;
