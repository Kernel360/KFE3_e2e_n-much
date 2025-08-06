import { TabsContent } from '@repo/ui/components/ui/tabs';

interface TabItem {
  value: string;
  content: React.ReactNode;
}

interface BaseTabsContentProps {
  tabContent: TabItem[];
}

const BaseTabsContent = ({ tabContent }: BaseTabsContentProps) => {
  return tabContent.map((el) => (
    <TabsContent key={el.value} value={el.value}>
      {el.content}
    </TabsContent>
  ));
};

export default BaseTabsContent;
