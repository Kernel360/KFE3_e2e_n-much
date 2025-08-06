import type { Meta, StoryObj } from '@storybook/nextjs';
import { Button } from '@repo/ui/components/ui/button';

// 모달 컴포넌트
const DialogPreview = ({ title, description }: { title: string; description: string }) => {
  return (
    <div className="relative w-full min-w-[500px] max-w-[500px] rounded-lg border border-gray-200 bg-white p-5 text-center shadow-lg">
      <button className="text-(--color-warm-gray) absolute right-4 top-4 flex h-7 w-7 cursor-pointer items-center justify-center rounded transition-all duration-200 hover:text-gray-800">
        ×
      </button>
      <div className="mb-6">
        <h2 className="mb-2 text-center text-lg font-semibold">{title}</h2>
        <p className="text-(--color-warm-gray) text-center text-sm">{description}</p>
      </div>
      <div className="flex gap-2">
        <Button variant="outline" className="flex-1 cursor-pointer">
          취소
        </Button>
        <Button variant="inActive" className="flex-1 cursor-pointer">
          확인
        </Button>
      </div>
    </div>
  );
};

const meta: Meta<typeof DialogPreview> = {
  title: 'components/ConfirmDialog',
  component: DialogPreview,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs'],
  argTypes: {
    title: { control: 'text' },
    description: { control: 'text' }
  }
};

export default meta;
type Story = StoryObj<typeof meta>;

// 기본 모달
export const Default: Story = {
  args: {
    title: '확인',
    description: '정말로 삭제하시겠습니까?'
  }
};

// 삭제 확인 모달
export const DeleteConfirm: Story = {
  args: {
    title: '삭제 확인',
    description: '이 작업은 되돌릴 수 없습니다. 정말로 삭제하시겠습니까?'
  }
};

// 로그아웃 확인 모달
export const LogoutConfirm: Story = {
  args: {
    title: '로그아웃',
    description: '정말로 로그아웃 하시겠습니까?'
  }
};
