import { Meta, StoryObj } from "@storybook/react";
import DashboardPage from ".";

export const Page: StoryObj<typeof DashboardPage> = {
  name: "Page",
  render: (args: any) => <DashboardPage {...args} />,
};

const meta: Meta<typeof DashboardPage> = {
  title: "Pages/Dashboard",
  component: DashboardPage,
};

export default meta;
