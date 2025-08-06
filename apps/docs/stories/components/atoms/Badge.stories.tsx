import type { Meta, StoryObj } from '@storybook/nextjs';
import { Badge } from '@repo/ui/components/ui/badge';

const meta: Meta<typeof Badge> = {
  title: 'components/atoms/Badge',
  component: Badge,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['success', 'error', 'info', 'muted']
    }
  }
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Success: Story = {
  args: {
    children: '입찰중',
    variant: 'success'
  }
};

export const Error: Story = {
  args: {
    children: '유찰',
    variant: 'error'
  }
};

export const Info: Story = {
  args: {
    children: '낙찰완료',
    variant: 'info'
  }
};

export const Muted: Story = {
  args: {
    children: '종료됨',
    variant: 'muted'
  }
};

// 모든 상태별 variant를 한번에 보여주는 스토리
export const StatusVariants: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      <Badge variant="success">입찰중</Badge>
      <Badge variant="error">유찰</Badge>
      <Badge variant="info">낙찰완료</Badge>
      <Badge variant="muted">종료됨</Badge>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: '상태를 나타내는 커스텀 variant들입니다.'
      }
    }
  }
};
