import { Meta, StoryObj } from "@storybook/react";
import SignInPage from ".";

export const Page: StoryObj<typeof SignInPage> = {
  name: "Sign in",
  render: (args: any) => <SignInPage {...args} />,
};

const meta: Meta<typeof SignInPage> = {
  title: "Pages/Sign in",
  component: SignInPage,
};

export default meta;
