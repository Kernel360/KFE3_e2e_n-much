import { Toaster } from '@repo/ui/components/ui/sonner';

const AppProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      {children}
      <Toaster
        position="top-center"
        toastOptions={{
          classNames: {
            description: '!text-(--color-warm-gray) dark:!text-(--color-warm-gray)'
          }
        }}
      />
    </>
  );
};

export default AppProvider;
