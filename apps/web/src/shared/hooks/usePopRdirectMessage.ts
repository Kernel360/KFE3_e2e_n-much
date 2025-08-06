import { useEffect, useState } from 'react';
import { popToast } from 'src/shared/utils/popToast';

export const usePopRedirectMessage = (redirectMessage: string | undefined) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (redirectMessage && mounted) {
      popToast('error', '리다이렉트 이유', redirectMessage, 'long');
    }
  }, [redirectMessage, mounted]);
};
