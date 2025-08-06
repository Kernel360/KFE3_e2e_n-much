import { Button } from '@repo/ui/components/ui/button';
import { twMerge } from 'tailwind-merge';

type FormActionsButtonType = {
  buttonLabel: string;
  isSubmitting: boolean;
  isRedirecting: boolean;
  className?: string;
};

const FormActionButton = ({ buttonLabel, isRedirecting, isSubmitting, className }: FormActionsButtonType) => {
  return (
    <>
      <div className={twMerge(`absolute bottom-2 left-0 right-0 flex justify-end space-x-2 px-5 ${className}`)}>
        <Button
          variant="active"
          type="submit"
          className="hover:bg-(--color-primary) h-12 flex-1"
          disabled={isSubmitting || isRedirecting}
        >
          {buttonLabel}
        </Button>
      </div>
    </>
  );
};

export default FormActionButton;
