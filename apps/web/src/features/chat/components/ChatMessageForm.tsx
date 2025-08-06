'use client';

import { useRef } from 'react';
import { Button } from '@repo/ui/components/ui/button';
import { Input } from '@repo/ui/components/ui/input';
import { RiSendPlaneFill } from 'react-icons/ri';
import { sendMessage } from 'src/entities/chat/serverActions';

const ChatMessageForm = ({ chatRoomId }: { auctionId: string; chatRoomId?: string }) => {
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (formData: FormData) => {
    if (!chatRoomId) return;

    try {
      await sendMessage(formData);
      formRef.current?.reset();
    } catch (error) {
      console.error('메시지 전송 실패:', error);
    }
  };

  return (
    <form ref={formRef} action={handleSubmit} className="absolute bottom-1 left-0 right-0 w-full p-5 sm:bottom-3">
      <input type="hidden" name="chat_room_id" value={chatRoomId || ''} />
      <label className="flex items-center">
        <Input
          type="text"
          name="content"
          placeholder="메시지를 입력해 주세요."
          className="mr-2 rounded-full px-5"
          required
        />
        <Button type="submit" variant="text" className="translate-y-0.5 p-0 !px-0">
          <RiSendPlaneFill className="size-6" />
        </Button>
      </label>
    </form>
  );
};

export default ChatMessageForm;
