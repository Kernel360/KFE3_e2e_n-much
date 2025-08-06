'use client';

import React from 'react';
import { Button } from '@repo/ui/components/ui/button';
import { useRouter } from 'next/navigation';
import BottomDrawer from 'src/shared/ui/BottomDrawer';

interface InquiryDrawerProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  actionId: string;
}

const InquiryDrawer = ({ open, setOpen, actionId }: InquiryDrawerProps) => {
  const route = useRouter();

  const handleInquiryClick = () => {
    route.push(`/inquiries/${actionId}`);
  };

  const handleChatClick = () => {
    route.push(`/chat/${actionId}`);
  };

  return (
    <BottomDrawer open={open} onOpenChange={setOpen} title="문의" description="문의사항이 있다면 업체에 문의하세요.">
      <div className="flex gap-2 p-4">
        <Button variant="outline" className="flex-1" onClick={handleChatClick}>
          채팅
        </Button>
        <Button variant="inActive" className="flex-1" onClick={handleInquiryClick}>
          문의하기
        </Button>
      </div>
    </BottomDrawer>
  );
};

export default InquiryDrawer;
