'use client';

import { Button } from '@repo/ui/components/ui/button';
import { Popover, PopoverAnchor, PopoverContent } from '@repo/ui/components/ui/popover';
import Link from 'next/link';
import NotificationList from 'src/features/notification/components/NotificationList';

interface NotificationPopoverProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  trigger: React.ReactNode | React.ReactElement;
}

const NotificationPopover = ({ isOpen, onOpenChange, trigger }: NotificationPopoverProps) => {
  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 z-50 m-auto max-w-2xl bg-black/40" onClick={() => onOpenChange(false)} />
      )}
      <Popover open={isOpen} onOpenChange={onOpenChange}>
        <PopoverAnchor asChild>{trigger}</PopoverAnchor>

        <PopoverContent
          className="sm:min-w-xl mx-5 min-w-[calc(100vw-2.5rem)] p-0 py-2 sm:mx-0"
          align="end"
          side="bottom"
        >
          <div className="space-y-4">
            <div className="border-b-(--color-warm-gray)/30 mb-0 flex items-center justify-between border-b px-4 pb-2">
              <h3 className="font-semibold">알림</h3>
              <Button
                variant="text"
                onClick={() => onOpenChange(false)}
                className="text-(--color-warm-gray) hover:text-(--text-base) -translate-y-0.5 px-2 text-xl transition-colors"
              >
                &times;
              </Button>
            </div>
            <NotificationList />
            <div className="border-t-(--color-warm-gray)/30 border-t pb-2 pt-4 text-center">
              <Link href="/notifications" className="text-(--color-accent) text-sm">
                모든 알림 보기
              </Link>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </>
  );
};

export default NotificationPopover;
