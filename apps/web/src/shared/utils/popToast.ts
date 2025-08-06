import { toast } from '@repo/ui/components/ui/sonner';
import { LONG_TOAST_DURATION, MEDIUM_TOAST_DURATION, SHORT_TOAST_DURATION } from 'src/entities/auction/constants';

export const popToast = (
  type: 'info' | 'error' | 'warning' | 'success',
  title: string,
  description: string,
  durationTime: 'short' | 'medium' | 'long'
) => {
  let duration = 0;

  if (durationTime === 'short') {
    duration = SHORT_TOAST_DURATION;
  } else if (durationTime === 'medium') {
    duration = MEDIUM_TOAST_DURATION;
  } else {
    duration = LONG_TOAST_DURATION;
  }

  if (type === 'info') {
    toast.info(title, { description, duration });
  } else if (type === 'error') {
    toast.error(title, { description, duration });
  } else if (type === 'success') {
    toast.success(title, { description, duration });
  } else {
    toast.warning(title, { description, duration });
  }
};
