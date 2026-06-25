import { Coach } from "../../types";

export default function CoachCard({ coach }: { coach: Coach }) {
  return (
    <div className="relative group overflow-hidden rounded-xl bg-card border border-white/5 p-8 flex flex-col md:flex-row gap-8 hover:border-primary/50 transition-colors duration-500" data-testid={`coach-card-${coach.initials}`}>
      {/* Top Border Accent */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary to-accent transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
      
      <div className="shrink-0 flex flex-col items-center">
        <div className="w-32 h-32 rounded-full bg-primary/20 border-2 border-primary flex items-center justify-center shadow-[0_0_20px_rgba(227,91,4,0.15)] group-hover:shadow-[0_0_30px_rgba(227,91,4,0.3)] transition-shadow duration-500">
          <span className="font-display text-4xl text-primary">{coach.initials}</span>
        </div>
      </div>

      <div className="flex flex-col flex-grow">
        <h3 className="font-display text-4xl text-white tracking-wider mb-1">{coach.name}</h3>
        <p className="text-primary font-medium tracking-wide mb-4 uppercase text-sm">{coach.title}</p>
        <p className="text-muted-foreground text-sm leading-relaxed mb-6">
          {coach.bio}
        </p>
        
        {(coach.phone || coach.email) && (
          <div className="mt-auto flex flex-wrap gap-4 text-sm font-mono text-muted-foreground">
            {coach.phone && (
              <a href={`tel:${coach.phone}`} className="hover:text-primary transition-colors">
                {coach.phone}
              </a>
            )}
            {coach.phone && coach.email && <span className="text-border">|</span>}
            {coach.email && (
              <a href={`mailto:${coach.email}`} className="hover:text-primary transition-colors">
                {coach.email}
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
