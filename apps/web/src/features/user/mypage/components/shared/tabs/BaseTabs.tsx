import { Tabs } from '@repo/ui/components/ui/tabs';
import BaseTabsContent from 'src/features/user/mypage/components/shared/tabs/BaseTabsContent';
import BaseTabsTrigger from 'src/features/user/mypage/components/shared/tabs/BaseTabsTrigger';

interface BaseTabsProps {
  defaultValue: string;
  tabLabels: Record<string, string>;
  tabContents: { value: string; content: React.ReactNode }[];
}

const BaseTabs = ({ defaultValue, tabLabels, tabContents }: BaseTabsProps) => {
  return (
    <Tabs defaultValue={defaultValue}>
      <BaseTabsTrigger tabLabels={tabLabels} />
      <section className="pt-4">
        <BaseTabsContent tabContent={tabContents} />
      </section>
    </Tabs>
  );
};

export default BaseTabs;
