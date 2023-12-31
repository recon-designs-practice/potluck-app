import { Meta, StoryObj } from '@storybook/react'
import HeroSection from '.'

export const Section: StoryObj<typeof HeroSection> = {
  render: args => <HeroSection {...args} />
}

const meta: Meta<typeof HeroSection> = {
  title: 'Pages/Dashboard/Hero Section',
  component: HeroSection
}

export default meta