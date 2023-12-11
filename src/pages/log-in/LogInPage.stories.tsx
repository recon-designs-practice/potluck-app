import { Meta, StoryObj } from "@storybook/react";
import LogInPage from ".";
import { Header } from "../../components";

export const Page: StoryObj<typeof LogInPage> = {
  name: "Page",
  render: (args: any) => <LogInPage {...args} />,
};

const meta: Meta<typeof LogInPage> = {
  title: "Pages/Log in",
  component: LogInPage,
  decorators: [
    Story => (
      <div>
        <Header />
        <Story />
      </div>
    )
  ]
};

export default meta;
