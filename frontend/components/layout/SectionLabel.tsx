interface Props {
  children: React.ReactNode;
  className?: string;
}

export default function SectionLabel({ children, className = "" }: Props) {
  return (
    <p
      className={`text-xs font-bold uppercase tracking-[0.22em] text-brand-500 dark:text-brand-400 mb-5 sm:mb-6 ${className}`}
    >
      {children}
    </p>
  );
}
