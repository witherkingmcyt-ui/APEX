import { useRef } from "react";
import PageTransition from "../components/layout/PageTransition";
import SectionTitle from "../components/ui/SectionTitle";
import CoachCard from "../components/ui/CoachCard";
import PlayerCard from "../components/ui/PlayerCard";
import { useScrollAnimation } from "../hooks/useScrollAnimation";
import { useData } from "../context/DataContext";

export default function Team() {
  const { data } = useData();
  const coachesRef = useRef<HTMLDivElement>(null);
  const overviewRef = useRef<HTMLDivElement>(null);
  const rosterRef = useRef<HTMLDivElement>(null);

  useScrollAnimation(coachesRef, { stagger: 0.2 });
  useScrollAnimation(overviewRef);
  useScrollAnimation(rosterRef, { stagger: 0.1 });

  const sortedRoster = [...data.players].sort((a, b) => a.jersey - b.jersey);

  return (
    <PageTransition>
      {/* Hero */}
      <section className="relative pt-32 pb-24 lg:pt-48 lg:pb-32 bg-card overflow-hidden border-b border-white/5">
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: "linear-gradient(0deg, transparent 24%, var(--color-primary) 25%, var(--color-primary) 26%, transparent 27%, transparent 74%, var(--color-primary) 75%, var(--color-primary) 76%, transparent 77%, transparent), linear-gradient(90deg, transparent 24%, var(--color-primary) 25%, var(--color-primary) 26%, transparent 27%, transparent 74%, var(--color-primary) 75%, var(--color-primary) 76%, transparent 77%, transparent)",
          backgroundSize: "50px 50px"
        }} />
        <div className="container mx-auto px-4 relative z-10 text-center">
          <SectionTitle title="MEET THE TEAM" subtitle="The coaches who lead. The players who compete." />
        </div>
      </section>

      {/* Coaching Staff */}
      <section ref={coachesRef} className="py-24 relative z-10">
        <div className="container mx-auto px-4">
          <SectionTitle title="COACHING STAFF" className="mb-16 scroll-animate" />
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
            {data.coaches.map((coach) => (
              <div key={coach.id} className="scroll-animate h-full">
                <CoachCard coach={coach} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Program Overview */}
      <section ref={overviewRef} className="py-24 relative z-10 bg-card/30 border-y border-white/5">
        <div className="container mx-auto px-4">
          <SectionTitle title="PROGRAM OVERVIEW" className="mb-16 scroll-animate" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {[
              { label: "Age Groups", value: "Grades 8 through 12" },
              { label: "Current Roster", value: "Competing at the high school level in local tournaments and Las Vegas events" },
              { label: "Practice Location", value: "Oak Middle School Gym, Los Alamitos, CA" },
              { label: "Schedule", value: "Every Monday and Friday, 5:00 PM – 7:00 PM" },
              { label: "Leagues", value: "NJB, Top Ballers, local SoCal & Vegas tournaments" },
            ].map(item => (
              <div key={item.label} className="bg-card border border-white/10 p-6 rounded-xl scroll-animate">
                <h4 className="text-primary font-bold text-sm uppercase tracking-wider mb-2">{item.label}</h4>
                <p className="text-white text-sm">{item.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Player Roster */}
      <section ref={rosterRef} className="py-24 relative z-10">
        <div className="container mx-auto px-4">
          <SectionTitle title="OFFICIAL ROSTER" className="mb-16 scroll-animate" />
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
            {sortedRoster.map((player) => (
              <div key={player.id} className="scroll-animate">
                <PlayerCard player={player} />
              </div>
            ))}
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
