import { Player } from "../../types";

export default function PlayerCard({ player }: { player: Player }) {
  return (
    <div className="group perspective-1000 w-full h-[280px] md:h-[320px]" data-testid={`player-card-${player.jersey}`}>
      <div className="relative w-full h-full duration-700 preserve-3d group-hover:my-rotate-y-180">
        
        {/* Front */}
        <div className="absolute inset-0 backface-hidden bg-card border border-white/5 rounded-xl overflow-hidden flex flex-col justify-end p-6">
          {/* Subtle court lines bg */}
          <div className="absolute inset-0 opacity-10 pointer-events-none" style={{
            backgroundImage: "linear-gradient(var(--color-border) 1px, transparent 1px), linear-gradient(90deg, var(--color-border) 1px, transparent 1px)",
            backgroundSize: "20px 20px"
          }} />
          
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
            <span className="font-display text-[120px] text-white/5 select-none translate-y-4">#{player.jersey}</span>
          </div>

          <div className="absolute inset-0 flex items-center justify-center p-4">
             {/* Basketball silhouette placeholder SVG */}
             <svg viewBox="0 0 100 100" className="w-full h-full opacity-20 fill-primary">
                <path d="M50 10 C30 10 15 25 15 45 C15 60 25 75 40 85 C45 88 55 88 60 85 C75 75 85 60 85 45 C85 25 70 10 50 10 Z" />
                <circle cx="50" cy="30" r="10" />
             </svg>
          </div>

          <div className="relative z-10 mt-auto">
            <h3 className="font-bold text-lg text-white mb-1 uppercase tracking-wider">{player.name}</h3>
            <p className="text-primary font-medium text-sm">{player.position}</p>
            <p className="text-muted-foreground text-xs mt-1">{player.grade}</p>
          </div>
        </div>

        {/* Back */}
        <div className="absolute inset-0 backface-hidden my-rotate-y-180 bg-gradient-to-br from-[#11111a] to-black border border-primary/30 rounded-xl overflow-hidden p-6 flex flex-col items-center justify-center text-center">
           <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none">
             <span className="font-display text-8xl text-primary">APEX</span>
           </div>
           
           <span className="font-display text-5xl text-white mb-4">#{player.jersey}</span>
           <h3 className="font-bold text-xl text-white mb-2 uppercase">{player.name}</h3>
           <div className="w-8 h-0.5 bg-primary mb-4" />
           <p className="text-primary font-medium text-sm mb-1">{player.positionFull}</p>
           <p className="text-muted-foreground text-sm">{player.grade}</p>
        </div>

      </div>
    </div>
  );
}
