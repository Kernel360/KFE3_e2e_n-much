// import { twMerge } from 'tailwind-merge';
// import { TabsTrigger } from '@repo/ui/components/ui/tabs';

// type TabTriggerItemProps = {
//   label: string;
// } & React.ComponentProps<typeof TabsTrigger>;

// const TabTriggerItem = (tab: TabTriggerItemProps) => {
//   const { label, value, className } = tab;

//   return (
//     <TabsTrigger
//       key={value}
//       value={value}
//       className={twMerge(
//         'after:bg-(--color-warm-gray)/30 data-[state=active]:text-(--color-accent) data-[state=active]:after:bg-(--color-accent) relative w-2/4 rounded-none after:absolute after:bottom-0 after:left-0 after:right-0 after:h-px data-[state=active]:after:h-0.5',
//         className
//       )}
//     >
//       {label}
//     </TabsTrigger>
//   );
// };

// export default TabTriggerItem;
