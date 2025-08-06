import type { Meta, StoryObj } from '@storybook/nextjs';
import { Button } from '@repo/ui/components/ui/button';

const meta: Meta<typeof Button> = {
  title: 'components/atoms/Button',
  component: Button,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs'],
  args: {
    children: '기본 버튼',
    variant: 'base',
    size: 'default',
    style: { cursor: 'pointer' }
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['base', 'outline', 'active', 'inActive', 'text', 'link']
    },
    size: {
      control: 'select',
      options: ['default', 'sm', 'lg']
    },
    style: {
      table: { disable: true }
    }
  }
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: '베이스 버튼',
    variant: 'base',
    style: { cursor: 'pointer' }
  }
};

export const Outline: Story = {
  args: {
    children: '아웃라인 버튼',
    variant: 'outline',
    style: { cursor: 'pointer' }
  }
};

export const Link: Story = {
  args: {
    children: '링크 버튼',
    variant: 'link',
    style: { cursor: 'pointer' }
  }
};

export const Text: Story = {
  args: {
    children: '텍스트 버튼',
    variant: 'text',
    style: { cursor: 'pointer' }
  }
};

export const Active: Story = {
  args: {
    children: '활성 버튼',
    variant: 'active',
    style: { cursor: 'pointer' }
  }
};

export const InActive: Story = {
  args: {
    children: '비활성 버튼',
    variant: 'inActive',
    style: { cursor: 'pointer' }
  }
};

// 사이즈 variants
export const Small: Story = {
  args: {
    children: '작은 버튼',
    size: 'sm',
    variant: 'base',
    style: { cursor: 'pointer' }
  }
};

export const Large: Story = {
  args: {
    children: '큰 버튼',
    size: 'lg',
    variant: 'base',
    style: { cursor: 'pointer' }
  }
};

// 모든 조합 보여주기
export const AllCombinations: Story = {
  render: () => {
    const variants = ['base', 'outline', 'active', 'inActive', 'text', 'link'] as const;
    const sizes = ['sm', 'default', 'lg'] as const;

    return (
      <div className="grid gap-4">
        {variants.map((variant) => (
          <div key={variant} className="flex items-center gap-2">
            <div className="w-20 text-xs font-bold">{variant}:</div>
            {sizes.map((size) => (
              <Button key={`${variant}-${size}`} variant={variant} size={size} className="cursor-pointer">
                {size}
              </Button>
            ))}
          </div>
        ))}
      </div>
    );
  },
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        story: '모든 variant와 size 조합을 확인할 수 있습니다.'
      }
    }
  }
};
