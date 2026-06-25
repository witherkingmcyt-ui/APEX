interface SectionTitleProps {
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
  className?: string;
}

export default function SectionTitle({ title, subtitle, align = 'center', className = '' }: SectionTitleProps) {
  return (
    <div className={`flex flex-col gap-3 ${align === 'center' ? 'items-center text-center' : 'items-start text-left'} ${className}`}>
      <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-foreground tracking-wide uppercase">
        {title}
      </h2>
      {subtitle && (
        <p className="text-muted-foreground text-lg md:text-xl font-medium max-w-2xl">
          {subtitle}
        </p>
      )}
      <div className={`h-1 w-16 bg-primary mt-2 rounded-full ${align === 'center' ? 'mx-auto' : ''}`} />
    </div>
  );
}
