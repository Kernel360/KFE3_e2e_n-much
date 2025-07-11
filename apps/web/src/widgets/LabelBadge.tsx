import { Badge } from '@repo/ui/components/ui/badge';
import { badgeVariants } from '@repo/ui/components/ui/badge';
import type { VariantProps } from 'class-variance-authority';

type BadgeVariant = VariantProps<typeof badgeVariants>['variant'];

interface LabelBadgeProps {
  status: string;
  variant?: BadgeVariant;
  children?: React.ReactNode;
}

const LabelBadge = ({ status, variant = 'default', children }: LabelBadgeProps) => {
  return <Badge variant={variant}>{children || status}</Badge>;
};

LabelBadge.displayName = 'LabelBadge';

// 도메인별 팩토리 함수
export const createLabelBadge = <T extends string>(
  variantMap: Record<T, BadgeVariant>,
  labelMap?: Record<T, string>
) => {
  const Component = ({ status }: { status: T }) => (
    <LabelBadge status={status} variant={variantMap[status]}>
      {labelMap?.[status] || status}
    </LabelBadge>
  );

  Component.displayName = 'GeneratedLabelBadge';

  return Component;
};

export default LabelBadge;
