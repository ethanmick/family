import type { Meta, StoryObj } from '@storybook/react'

import Sidebar from './sidebar'

const meta: Meta<typeof Sidebar> = {
  component: Sidebar,
}

export default meta
type Story = StoryObj<typeof Sidebar>

export const Primary: Story = {
  render: () => <Sidebar />,
}
