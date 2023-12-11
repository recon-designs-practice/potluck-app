import { Meta, StoryObj } from "@storybook/react";
import LogInPage from ".";

export const Page: StoryObj<typeof LogInPage> = {
  name: "Log in",
  render: (args: any) => <LogInPage {...args} />,
};

const meta: Meta<typeof LogInPage> = {
  title: "Pages/Log in",
  component: LogInPage,
};

export default meta;
