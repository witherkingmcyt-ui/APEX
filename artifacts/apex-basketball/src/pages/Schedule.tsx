import { useRef } from "react";
import PageTransition from "../components/layout/PageTransition";
import SectionTitle from "../components/ui/SectionTitle";
import CountdownTimer from "../components/ui/CountdownTimer";
import ApexButton from "../components/ui/ApexButton";
import { useScrollAnimation } from "../hooks/useScrollAnimation";
import { Link } from "wouter";
import { useData } from "../context/DataContext";
import { useFeaturedEvent } from "../context/EventContext";

const WEEK_DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export default function Schedule() {
  const { data } = useData();
  const { event } = useFeaturedEvent();
  const practiceRef = useRef<HTMLDivElement>(null);
  const tournamentRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useScrollAnimation(practiceRef);
  useScrollAnimation(tournamentRef);
  useScrollAnimation(ctaRef);

  const practices = data.practices;
  const tournaments = data.tournaments;
  const featuredTournament = tournaments.find(t => t.featured) || tournaments[0];
  const countdownDate = new Date(event.countdownTarget);

  const practiceDayNames = practices.map(p => p.day.slice(0, 3));

  const fmtDate = (s: string, e: string) => {
    if (!s) return "";
    const fmt = (d: string) => {
      const [y, m, day] = d.split("-");
      const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
      return `${months[parseInt(m)-1]} ${parseInt(day)}, ${y}`;
    };
    return e ? `${fmt(s)} – ${fmt(e)}` : fmt(s);
  };

  return (
    <PageTransition>
      {/* Hero */}
      <section className="relative pt-32 pb-24 lg:pt-48 lg:pb-32 bg-card overflow-hidden border-b border-white/5">
        <div className="container mx-auto px-4 relative z-10 text-center">
          <SectionTitle title="SCHEDULE" subtitle="Where we practice. When we compete." />
        </div>
      </section>

      {/* Weekly Practices */}
      <section ref={practiceRef} className="py-24 relative z-10">
        <div className="container mx-auto px-4">
          <SectionTitle title="WEEKLY PRACTICES" className="mb-12 scroll-animate" />
          <div className="max-w-5xl mx-auto scroll-animate">
            <div className="grid grid-cols-2 md:grid-cols-7 gap-2 md:gap-4 mb-8">
              {WEEK_DAYS.map((day) => {
                const practice = practices.find(p => p.day.slice(0, 3) === day);
                return (
                  <div
                    key={day}
                    className={`p-4 rounded-xl flex flex-col items-center justify-center text-center border transition-all duration-300 ${
                      practice
                        ? "bg-primary/10 border-primary shadow-[0_0_15px_rgba(227,91,4,0.15)] ring-1 ring-primary/50"
                        : "bg-card border-white/5"
                    }`}
                  >
                    <span className={`font-display text-2xl mb-2 ${practice ? "text-primary" : "text-muted-foreground"}`}>{day}</span>
                    {practice ? (
                      <>
                        <span className="text-white font-bold text-sm mb-1">{practice.startTime}<br />{practice.endTime}</span>
                        <span className="text-muted-foreground text-xs mt-2">{practice.location.split(",")[0]}</span>
                      </>
                    ) : (
                      <span className="text-muted-foreground text-xs uppercase tracking-wider mt-4">Rest</span>
                    )}
                  </div>
                );
              })}
            </div>
            <p className="text-center text-muted-foreground text-sm max-w-2xl mx-auto bg-card p-4 rounded-lg border border-white/5">
              Practices are held every {practiceDayNames.join(" and ")} throughout the season. Please contact Coach Patel to confirm any schedule changes.
            </p>
          </div>
        </div>
      </section>

      {/* Tournaments */}
      <section ref={tournamentRef} className="py-24 relative z-10 bg-card/50 border-y border-white/5">
        <div className="container mx-auto px-4 text-center">
          <SectionTitle title="UPCOMING TOURNAMENTS" className="mb-12 scroll-animate" />

          <div className="max-w-4xl mx-auto space-y-8">
            {tournaments.length === 0 ? (
              <p className="text-muted-foreground">No tournaments scheduled yet.</p>
            ) : (
              tournaments.map(t => (
                <div key={t.id} className="scroll-animate relative rounded-2xl overflow-hidden border border-primary/30 bg-gradient-to-br from-[#1A1A25] to-black p-8 md:p-12 group">
                  <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-primary/20 to-transparent pointer-events-none" />
                  <div className="relative z-10">
                    {t.featured && (
                      <span className="inline-block px-4 py-1 bg-primary text-white font-bold tracking-widest text-xs uppercase rounded-full mb-6">
                        Featured Event
                      </span>
                    )}
                    <h3 className="font-display text-4xl md:text-6xl text-white mb-4 group-hover:text-primary transition-colors duration-500">{t.name}</h3>
                    <div className="flex flex-col md:flex-row items-center justify-center gap-2 md:gap-6 text-lg text-muted-foreground font-medium mb-8">
                      <span>{fmtDate(t.startDate, t.endDate)}</span>
                      <span className="hidden md:block text-primary/50">|</span>
                      <span>{t.location}</span>
                    </div>
                    {t.featured && (
                      <div>
                        <h4 className="font-display text-2xl text-primary mb-6 tracking-widest opacity-80">TOURNAMENT COUNTDOWN</h4>
                        <CountdownTimer targetDate={countdownDate} />
                      </div>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section ref={ctaRef} className="py-24 relative z-10 text-center">
        <div className="container mx-auto px-4 scroll-animate">
          <h2 className="font-display text-4xl text-white mb-4">Questions about the schedule?</h2>
          <p className="text-muted-foreground text-lg mb-8">Contact us directly.</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <a href="tel:714-715-4591" className="font-mono text-2xl text-primary hover:text-white transition-colors">714-715-4591</a>
            <Link href="/contact"><ApexButton>Contact Us</ApexButton></Link>
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
