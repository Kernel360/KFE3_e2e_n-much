import type { ReactNode } from 'react';
import MobileNavigation from 'src/widgets/layout/MobileNavigation';

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      {children}
      <div id="modal-root"></div>
      <MobileNavigation />
    </>
  );
};

export default layout;
