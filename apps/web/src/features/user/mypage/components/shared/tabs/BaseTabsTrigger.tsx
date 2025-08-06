import { TabsList } from '@repo/ui/components/ui/tabs';
import TabTriggerItem from 'src/features/user/mypage/components/shared/tabs/TabTriggerItem';

interface BaseTabsTriggerProps {
  tabLabels: Record<string, string>;
}

const BaseTabsTrigger = ({ tabLabels }: BaseTabsTriggerProps) => {
  const tabItems = Object.entries(tabLabels).map(([value, label]) => ({
    value,
    label
  }));

  return (
    <TabsList className="w-full rounded-none">
      {tabItems.map((tabItem) => (
        <TabTriggerItem
          key={tabItem.value}
          value={tabItem.value}
          label={tabItem.label}
          className="text-md w-full bg-transparent py-5"
        />
      ))}
    </TabsList>
  );
};

export default BaseTabsTrigger;
