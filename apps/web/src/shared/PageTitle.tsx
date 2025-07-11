interface PageTitleProps {
  children: React.ReactNode;
  className?: string;
}

const PageTitle = ({ children, className = '' }: PageTitleProps) => {
  return <h2 className={`text-xl font-bold text-center ${className}`}>{children}</h2>;
};

export default PageTitle;
