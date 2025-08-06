import { Button } from '@repo/ui/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@repo/ui/components/ui/dialog';

interface ConfirmDialogProps {
  children: React.ReactNode;
  title: string;
  description: string;
  onConfirm: () => void;
}

const ConfirmDialog = ({ children, title, description, onConfirm }: ConfirmDialogProps) => {
  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>{children}</DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription>{description}</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline" className="flex-1">
                취소
              </Button>
            </DialogClose>
            <DialogClose asChild>
              <Button onClick={onConfirm} variant="inActive" className="flex-1">
                확인
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
};

export default ConfirmDialog;
