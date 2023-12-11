import { Meta, StoryObj } from "@storybook/react";
import DashboardPage from ".";
import { Header } from "../../components";

export const Page: StoryObj<typeof DashboardPage> = {
  name: "Page",
  render: (args: any) => <DashboardPage {...args} />,
};

const meta: Meta<typeof DashboardPage> = {
  title: "Pages/Dashboard",
  component: DashboardPage,
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
