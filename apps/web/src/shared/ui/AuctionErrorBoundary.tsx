'use client';

import type { ReactNode } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

const AuctionErrorBoundary = ({ fallback, children }: { fallback: ReactNode; children: ReactNode }) => {
  return <ErrorBoundary fallback={fallback}>{children}</ErrorBoundary>;
};

export default AuctionErrorBoundary;
