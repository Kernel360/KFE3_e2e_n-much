'use client';

import { Button } from '@repo/ui/components/ui/button';
import { IoNotifications } from 'react-icons/io5';
import NotificationPopover from 'src/features/notification/components/NotificationPopover';

interface Props {
  isOpen: boolean;
  onClick: () => void;
  onPopoverToggle: (open: boolean) => void;
}

const NotificationButton = ({ isOpen, onClick, onPopoverToggle }: Props) => {
  const hasUnread = false; // TODO: 나중에 알림 상태 연동

  return (
    <div className="flex items-center">
      <NotificationPopover
        isOpen={isOpen}
        onOpenChange={onPopoverToggle}
        trigger={
          <Button variant="text" className="relative !p-0" onClick={onClick}>
            <IoNotifications className="text-(--color-accent) size-6" />
            {hasUnread && <span className="bg-(--color-red) absolute right-0.5 top-1.5 size-2 rounded-full" />}
          </Button>
        }
      />
    </div>
  );
};

export default NotificationButton;
