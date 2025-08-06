import type { Meta, StoryObj } from '@storybook/nextjs';

// 토스트 미리보기
const ToastPreview = ({ type, message }: { type: string; message: string }) => {
  const getIcon = () => {
    switch (type) {
      case 'success':
        return (
          <svg width="20" height="20" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="8" cy="8" r="7" fill="var(--color-green)" stroke="#FFFFFF" strokeWidth="2" />
            <path d="m5 8 2 2 4-4" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        );
      case 'error':
        return (
          <svg width="20" height="20" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="8" cy="8" r="7" fill="var(--color-red)" stroke="#FFFFFF" strokeWidth="2" />
            <path d="m5.5 5.5 5 5M10.5 5.5l-5 5" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        );
      case 'info':
        return (
          <svg width="20" height="20" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="8" cy="8" r="7" fill="var(--color-accent)" stroke="#FFFFFF" strokeWidth="2" />
            <path d="M8 7v3M8 5h.01" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        );
      case 'loading':
        return (
          <div className="animate-spin">
            <svg width="20" height="20" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="8" cy="8" r="6" stroke="#E5E7EB" strokeWidth="2" />
              <path d="M14 8a6 6 0 01-6 6" stroke="var(--color-warm-gray)" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </div>
        );
      default:
        return (
          <svg width="20" height="20" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="8" cy="8" r="7" fill="var(--color-green)" stroke="#FFFFFF" strokeWidth="2" />
            <path d="m5 8 2 2 4-4" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        );
    }
  };

  return (
    <div className="relative w-full max-w-sm rounded-lg border border-gray-200 bg-white p-4 shadow-lg">
      <div className="flex items-center gap-2">
        <div className="flex-shrink-0">{getIcon()}</div>
        <div className="flex-1">
          <div className="text-(--text-base) text-sm">{message}</div>
        </div>
      </div>
    </div>
  );
};

const meta: Meta<typeof ToastPreview> = {
  title: 'components/Toaster',
  component: ToastPreview,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs'],
  args: {
    type: 'default',
    message: '기본 토스트 메시지입니다.'
  },
  argTypes: {
    type: {
      control: 'select',
      options: ['default', 'success', 'error', 'info', 'loading']
    },
    message: { control: 'text' }
  }
};

export default meta;
type Story = StoryObj<typeof meta>;

// 기본 토스트
export const Default: Story = {
  args: {
    type: 'default',
    message: '작업이 완료되었습니다.'
  }
};

// 성공 토스트
export const Success: Story = {
  args: {
    type: 'success',
    message: '로그아웃에 성공했습니다!'
  }
};

// 에러 토스트
export const Error: Story = {
  args: {
    type: 'error',
    message: '로그인에 실패했습니다. 다시 시도해주세요.'
  }
};

// 정보 토스트
export const Info: Story = {
  args: {
    type: 'info',
    message: '새로운 업데이트가 있습니다.'
  }
};

// 로딩 토스트
export const Loading: Story = {
  args: {
    type: 'loading',
    message: '데이터를 저장하고 있습니다...'
  }
};

// 모든 토스트 타입
export const AllTypes: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <ToastPreview type="success" message="파일 업로드에 성공했습니다!" />
      <ToastPreview type="error" message="네트워크 연결에 실패했습니다." />
      <ToastPreview type="info" message="저장하지 않은 변경사항이 있습니다." />
      <ToastPreview type="loading" message="프로필을 업데이트하고 있습니다..." />
      <ToastPreview type="default" message="작업이 완료되었습니다." />
    </div>
  ),
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        story: '모든 토스트 타입을 한번에 확인할 수 있습니다.'
      }
    }
  }
};
