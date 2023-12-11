import { Meta, StoryObj } from "@storybook/react";
import SignUpPage from ".";

export const Page: StoryObj<typeof SignUpPage> = {
  name: "Page",
  render: (args: any) => <SignUpPage {...args} />,
};

const meta: Meta<typeof SignUpPage> = {
  title: "Pages/Sign up",
  component: SignUpPage,
};

export default meta;
