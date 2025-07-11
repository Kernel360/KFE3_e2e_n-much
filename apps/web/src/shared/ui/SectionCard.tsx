interface SectionCardProps {
  children: React.ReactNode;
  className?: string;
}

const SectionCard = ({ children, className = '' }: SectionCardProps) => {
  return (
    <section className={`w-full rounded-2xl bg-(--color-secondary) p-5 shadow-sm ${className}`}>{children}</section>
  );
};

export default SectionCard;
