import React from 'react';
import AppProvider from 'src/app/(providers)/AppProvider';
import AuthProvider from 'src/app/(providers)/AuthProvider';
import QueryProvider from 'src/app/(providers)/QueryProvider';
import { getServerUserWithProfile } from 'src/entities/auth/serverAction';

const Providers = async ({ children }: { children: React.ReactNode }) => {
  const user = await getServerUserWithProfile();
  return (
    <QueryProvider>
      <AuthProvider user={user}>
        <AppProvider>{children}</AppProvider>
      </AuthProvider>
    </QueryProvider>
  );
};

export default Providers;
