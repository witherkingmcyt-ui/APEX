import { useRef } from "react";
import PageTransition from "../components/layout/PageTransition";
import SectionTitle from "../components/ui/SectionTitle";
import CountdownTimer from "../components/ui/CountdownTimer";
import ApexButton from "../components/ui/ApexButton";
import { useScrollAnimation } from "../hooks/useScrollAnimation";
import { schedule } from "../data/schedule";
import { Link } from "wouter";

export default function Schedule() {
  const heroRef = useRef<HTMLDivElement>(null);
  const practiceRef = useRef<HTMLDivElement>(null);
  const tournamentRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useScrollAnimation(practiceRef);
  useScrollAnimation(tournamentRef);
  useScrollAnimation(ctaRef);

  const featuredEvent = schedule.find(e => e.featured) || schedule[0];
  const targetDate = new Date("2026-07-09T00:00:00");

  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return (
    <PageTransition>
      {/* Hero */}
      <section ref={heroRef} className="relative pt-32 pb-24 lg:pt-48 lg:pb-32 bg-card overflow-hidden border-b border-white/5">
        <div className="container mx-auto px-4 relative z-10 text-center">
          <SectionTitle 
            title="SCHEDULE" 
            subtitle="Where we practice. When we compete." 
          />
        </div>
      </section>

      {/* Weekly Practices */}
      <section ref={practiceRef} className="py-24 relative z-10">
        <div className="container mx-auto px-4">
          <SectionTitle title="WEEKLY PRACTICES" className="mb-12 scroll-animate" />
          
          <div className="max-w-5xl mx-auto scroll-animate">
            <div className="grid grid-cols-2 md:grid-cols-7 gap-2 md:gap-4 mb-8">
              {days.map((day, idx) => {
                const isPracticeDay = day === "Mon" || day === "Fri";
                return (
                  <div 
                    key={day} 
                    className={`p-4 rounded-xl flex flex-col items-center justify-center text-center border transition-all duration-300 ${
                      isPracticeDay 
                        ? "bg-primary/10 border-primary shadow-[0_0_15px_rgba(227,91,4,0.15)] ring-1 ring-primary/50" 
                        : "bg-card border-white/5"
                    }`}
                  >
                    <span className={`font-display text-2xl mb-2 ${isPracticeDay ? "text-primary" : "text-muted-foreground"}`}>{day}</span>
                    {isPracticeDay ? (
                      <>
                        <span className="text-white font-bold text-sm mb-1">5:00 PM<br/>7:00 PM</span>
                        <span className="text-muted-foreground text-xs mt-2">Oak Middle School Gym</span>
                      </>
                    ) : (
                      <span className="text-muted-foreground text-xs uppercase tracking-wider mt-4">Rest</span>
                    )}
                  </div>
                );
              })}
            </div>
            <p className="text-center text-muted-foreground text-sm max-w-2xl mx-auto bg-card p-4 rounded-lg border border-white/5">
              Practices are held every Monday and Friday throughout the season. Please contact Coach Patel to confirm any schedule changes.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Tournament */}
      <section ref={tournamentRef} className="py-24 relative z-10 bg-card/50 border-y border-white/5">
        <div className="container mx-auto px-4 text-center">
          
          <div className="max-w-4xl mx-auto scroll-animate">
            <div className="relative rounded-2xl overflow-hidden border border-primary/30 bg-gradient-to-br from-[#1A1A25] to-black p-8 md:p-12 mb-16 group">
              {/* Abstract Skyline Gradient bg */}
              <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-primary/20 to-transparent pointer-events-none" />
              
              <div className="relative z-10">
                <span className="inline-block px-4 py-1 bg-primary text-primary-foreground font-bold tracking-widest text-xs uppercase rounded-full mb-6">
                  Featured Event
                </span>
                <h3 className="font-display text-5xl md:text-7xl text-white mb-4 group-hover:text-primary transition-colors duration-500">{featuredEvent.title}</h3>
                <div className="flex flex-col md:flex-row items-center justify-center gap-2 md:gap-6 text-lg text-muted-foreground font-medium mb-12">
                  <span>{featuredEvent.date}</span>
                  <span className="hidden md:block text-primary/50">|</span>
                  <span>{featuredEvent.location}</span>
                </div>
                
                <div>
                   <h4 className="font-display text-2xl text-primary mb-6 tracking-widest opacity-80">TOURNAMENT COUNTDOWN</h4>
                   <CountdownTimer targetDate={targetDate} />
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Contact CTA */}
      <section ref={ctaRef} className="py-24 relative z-10 text-center">
        <div className="container mx-auto px-4 scroll-animate">
          <h2 className="font-display text-4xl text-white mb-4">Questions about the schedule?</h2>
          <p className="text-muted-foreground text-lg mb-8">Contact us directly.</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <a href="tel:714-715-4591" className="font-mono text-2xl text-primary hover:text-white transition-colors">
              714-715-4591
            </a>
            <Link href="/contact">
              <ApexButton>Contact Us</ApexButton>
            </Link>
          </div>
        </div>
      </section>

    </PageTransition>
  );
}
