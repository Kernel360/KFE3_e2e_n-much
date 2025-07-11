import { Loader2 } from 'lucide-react';

export function LoadingSpinner({ size = 24, color = '#333' }: { size?: number; color?: string }) {
  return (
    <div className="flex flex-col items-center justify-center">
      <Loader2 className={`animate-spin`} style={{ width: size, height: size, color: color }} />
      <p className="text-gray-600">처리 중입니다...</p>
    </div>
  );
}
