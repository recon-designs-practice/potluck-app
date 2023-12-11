import React from 'react'
import Header from './Header'

export const Default = {
    render: (args: any) => <Header {...args} />
}

const meta = {
    title: 'Components/Header',
    component: Header
}

export default meta