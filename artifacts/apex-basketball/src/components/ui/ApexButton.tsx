import React from 'react';

interface ApexButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline';
  size?: 'default' | 'lg' | 'sm';
  children: React.ReactNode;
}

export default function ApexButton({
  variant = 'primary',
  size = 'default',
  className = '',
  children,
  ...props
}: ApexButtonProps) {
  const baseClasses = "relative inline-flex items-center justify-center font-display tracking-widest uppercase transition-all duration-300 overflow-hidden outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background active:scale-[0.98]";
  
  const sizeClasses = {
    sm: "h-9 px-4 text-sm",
    default: "h-12 px-8 text-lg",
    lg: "h-14 px-10 text-xl",
  };

  const variantClasses = {
    primary: "bg-primary text-primary-foreground hover:shadow-[0_0_30px_rgba(227,91,4,0.5)]",
    outline: "border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground",
  };

  return (
    <button
      className={`${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${className} group`}
      {...props}
    >
      <span className="relative z-10">{children}</span>
      {variant === 'primary' && (
        <span className="absolute inset-0 z-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-[150%] skew-x-[-45deg] transition-all duration-700 ease-out group-hover:translate-x-[150%]" />
      )}
    </button>
  );
}
