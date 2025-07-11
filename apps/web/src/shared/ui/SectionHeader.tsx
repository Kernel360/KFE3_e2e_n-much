interface SectionHeaderProps {
  children: React.ReactNode;
  className?: string;
}

const SectionHeader = ({ children, className = '' }: SectionHeaderProps) => {
  return <h3 className={`font-medium ${className}`}>{children}</h3>;
};

export default SectionHeader;
