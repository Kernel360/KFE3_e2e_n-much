// import LabelBadge from 'src/components/common/LabelBadge';
// import { STATUS_LABELS, STATUS_VARIANTS } from 'src/entities/user/mypage/constants';
// import type { PointRow } from 'src/shared/supabase/types';

// // PointRow + status 속성
// type ActivityWithStatus = PointRow & {
//   status?: 'OPEN' | 'CLOSED';
// };

// interface ActivityMetaProps {
//   activity: ActivityWithStatus;
// }

// const ActivityMeta = ({ activity }: ActivityMetaProps) => {
//   if (activity.type === 'auction' && activity.status) {
//     return <LabelBadge status={STATUS_LABELS[activity.status]} variant={STATUS_VARIANTS[activity.status]} />;
//   }

//   return (
//     <div className="text-right">
//       <span className="text-(--color-accent) font-medium">{activity.amount?.toLocaleString() || '0'}P</span>
//     </div>
//   );
// };

// export default ActivityMeta;
