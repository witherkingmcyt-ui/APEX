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
          
          {/* Jersey number watermark — top area only */}
          <div className="absolute top-2 left-0 right-0 flex justify-center pointer-events-none overflow-hidden">
            <span className="font-display text-[90px] leading-none text-white/5 select-none">#{player.jersey}</span>
          </div>

          {/* Player silhouette — center, contained above the text block */}
          <div className="absolute inset-x-0 top-[60px] bottom-[80px] flex items-center justify-center p-4 pointer-events-none">
            <svg viewBox="0 0 100 130" className="h-full w-auto opacity-25 fill-primary">
              <circle cx="50" cy="22" r="14" />
              <path d="M26 55 Q28 38 50 36 Q72 38 74 55 L78 95 Q78 100 72 100 L65 100 L62 75 L60 100 L40 100 L38 75 L35 100 L28 100 Q22 100 22 95 Z" />
              <path d="M28 100 L24 125 Q23 128 27 128 L33 128 L36 108 L38 128 L44 128 L46 100 Z" />
              <path d="M72 100 L76 125 Q77 128 73 128 L67 128 L64 108 L62 128 L56 128 L54 100 Z" />
            </svg>
          </div>

          {/* Name / position / grade — pinned to bottom, no overlap */}
          <div className="relative z-10 bg-gradient-to-t from-card via-card/90 to-transparent pt-6">
            <h3 className="font-bold text-base text-white uppercase tracking-wider leading-tight">{player.name}</h3>
            <p className="text-primary font-medium text-xs mt-0.5">{player.position}</p>
            <p className="text-muted-foreground text-xs mt-0.5">{player.grade}</p>
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
           <p className="text-primary font-medium text-sm">{player.position}</p>
        </div>

      </div>
    </div>
  );
}
