import { useCountdown } from "../../hooks/useCountdown";
import { useEffect, useState } from "react";

export default function CountdownTimer({ targetDate }: { targetDate: Date }) {
  const [mounted, setMounted] = useState(false);
  const timeLeft = useCountdown(targetDate);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="h-[100px] w-full" />; // Placeholder
  }

  const segments = [
    { label: "DAYS", value: timeLeft.days },
    { label: "HOURS", value: timeLeft.hours },
    { label: "MINUTES", value: timeLeft.minutes },
    { label: "SECONDS", value: timeLeft.seconds },
  ];

  return (
    <div className="flex gap-2 md:gap-4 justify-center" data-testid="countdown-timer">
      {segments.map((seg, i) => (
        <div key={seg.label} className="flex flex-col items-center">
          <div className="w-16 h-20 md:w-24 md:h-28 bg-card border border-white/10 rounded-lg flex items-center justify-center backdrop-blur-md shadow-xl relative overflow-hidden">
            {/* Glossy top highlight */}
            <div className="absolute top-0 left-0 right-0 h-1/2 bg-white/5 pointer-events-none" />
            {/* Center line */}
            <div className="absolute top-1/2 left-0 right-0 h-px bg-black/40 shadow-[0_1px_0_rgba(255,255,255,0.1)] pointer-events-none" />
            
            <span className="font-mono text-3xl md:text-5xl text-primary font-bold">
              {seg.value.toString().padStart(2, '0')}
            </span>
          </div>
          <span className="mt-3 text-xs md:text-sm font-medium tracking-widest text-muted-foreground">
            {seg.label}
          </span>
        </div>
      ))}
    </div>
  );
}
