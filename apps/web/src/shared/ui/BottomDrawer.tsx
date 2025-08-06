'use client';

import { Drawer, DrawerContent, DrawerDescription, DrawerOverlay, DrawerTitle } from '@repo/ui/components/ui/drawer';

interface BottomDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: React.ReactNode;
  title?: string;
  description?: string;
  footerNode?: React.ReactNode;
}

const BottomDrawer = ({ open, onOpenChange, children, title, description, footerNode }: BottomDrawerProps) => {
  return (
    <div>
      <Drawer open={open} onOpenChange={onOpenChange}>
        <DrawerOverlay className="mx-auto md:max-w-2xl" />
        <DrawerContent className="mx-auto md:max-w-2xl">
          {title && <DrawerTitle className="sr-only">{title}</DrawerTitle>}
          {description && <DrawerDescription className="sr-only">{description}</DrawerDescription>}
          {children}
          {footerNode && <div className="p-4 pt-0">{footerNode}</div>}
        </DrawerContent>
      </Drawer>
    </div>
  );
};
export default BottomDrawer;
