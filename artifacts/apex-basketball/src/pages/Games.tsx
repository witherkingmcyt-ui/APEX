import { useRef } from "react";
import PageTransition from "../components/layout/PageTransition";
import SectionTitle from "../components/ui/SectionTitle";
import { useScrollAnimation } from "../hooks/useScrollAnimation";
import { useData } from "../context/DataContext";
import { Trophy, MapPin, Calendar, Clock } from "lucide-react";

function ResultBadge({ result, ourScore, theirScore }: { result: string | null; ourScore: number | null; theirScore: number | null }) {
  if (!result || result === "upcoming") {
    return <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest bg-white/10 text-muted-foreground">Upcoming</span>;
  }
  if (result === "win") {
    return (
      <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest bg-green-500/20 text-green-400 border border-green-500/30">
        W {ourScore} – {theirScore}
      </span>
    );
  }
  return (
    <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest bg-red-500/20 text-red-400 border border-red-500/30">
      L {ourScore} – {theirScore}
    </span>
  );
}

export default function Games() {
  const { data } = useData();
  const heroRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  useScrollAnimation(gridRef, { stagger: 0.08 });

  const games = [...data.games].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  const upcoming = games.filter(g => !g.result || g.result === "upcoming");
  const completed = games.filter(g => g.result && g.result !== "upcoming");

  const wins = completed.filter(g => g.result === "win").length;
  const losses = completed.filter(g => g.result === "loss").length;

  return (
    <PageTransition>
      {/* Hero */}
      <section ref={heroRef} className="relative pt-32 pb-24 lg:pt-48 lg:pb-32 bg-card overflow-hidden border-b border-white/5">
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: "radial-gradient(circle at center, var(--color-primary) 0, transparent 2px)",
          backgroundSize: "28px 28px"
        }} />
        <div className="container mx-auto px-4 relative z-10 text-center">
          <SectionTitle title="GAMES" subtitle="Results, scores, and upcoming matchups." />
        </div>
      </section>

      {/* Record Bar */}
      {completed.length > 0 && (
        <section className="bg-card/50 border-b border-white/5 py-8">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-center gap-12">
              <div className="text-center">
                <span className="font-mono text-5xl font-bold text-green-400">{wins}</span>
                <p className="text-xs uppercase tracking-widest text-muted-foreground mt-1">Wins</p>
              </div>
              <div className="w-px h-12 bg-white/10" />
              <div className="text-center">
                <span className="font-mono text-5xl font-bold text-red-400">{losses}</span>
                <p className="text-xs uppercase tracking-widest text-muted-foreground mt-1">Losses</p>
              </div>
              <div className="w-px h-12 bg-white/10" />
              <div className="text-center">
                <span className="font-mono text-5xl font-bold text-primary">{completed.length}</span>
                <p className="text-xs uppercase tracking-widest text-muted-foreground mt-1">Played</p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Games Grid */}
      <section ref={gridRef} className="py-24 relative z-10">
        <div className="container mx-auto px-4">
          {games.length === 0 ? (
            <div className="text-center py-24">
              <Trophy className="w-16 h-16 text-primary/30 mx-auto mb-6" />
              <h3 className="font-display text-3xl text-white mb-3">No Games Yet</h3>
              <p className="text-muted-foreground">Check back soon — the season is coming.</p>
            </div>
          ) : (
            <div className="space-y-16">
              {upcoming.length > 0 && (
                <div>
                  <SectionTitle title="UPCOMING" align="left" className="mb-8 scroll-animate" />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {upcoming.map(game => <GameCard key={game.id} game={game} />)}
                  </div>
                </div>
              )}
              {completed.length > 0 && (
                <div>
                  <SectionTitle title="RESULTS" align="left" className="mb-8 scroll-animate" />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {completed.map(game => <GameCard key={game.id} game={game} />)}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </section>
    </PageTransition>
  );
}

function GameCard({ game }: { game: ReturnType<typeof useData>["data"]["games"][0] }) {
  const fmtDate = (d: string) => {
    if (!d) return "";
    const dt = new Date(d + "T12:00:00");
    return dt.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric", year: "numeric" });
  };

  const homeAwayLabel = game.homeAway === "home" ? "Home" : game.homeAway === "away" ? "Away" : "Neutral";

  return (
    <div className="scroll-animate bg-card border border-white/10 rounded-2xl p-6 hover:border-primary/30 transition-colors duration-300 group">
      <div className="flex items-start justify-between gap-4 mb-4">
        <div>
          <p className="text-xs text-muted-foreground uppercase tracking-widest mb-1">{homeAwayLabel} · {game.tournament || "Game"}</p>
          <h3 className="font-display text-2xl text-white group-hover:text-primary transition-colors">vs. {game.opponent}</h3>
        </div>
        <ResultBadge result={game.result} ourScore={game.ourScore} theirScore={game.theirScore} />
      </div>

      <div className="space-y-2 text-sm text-muted-foreground">
        {game.date && (
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-primary/60 shrink-0" />
            <span>{fmtDate(game.date)}</span>
          </div>
        )}
        {game.time && (
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-primary/60 shrink-0" />
            <span>{game.time}</span>
          </div>
        )}
        {game.location && (
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-primary/60 shrink-0" />
            <span>{game.location}</span>
          </div>
        )}
      </div>

      {game.notes && (
        <p className="mt-4 pt-4 border-t border-white/5 text-sm text-muted-foreground italic">{game.notes}</p>
      )}
    </div>
  );
}
