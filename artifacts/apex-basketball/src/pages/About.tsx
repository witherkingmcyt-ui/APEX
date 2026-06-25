import { useRef } from "react";
import PageTransition from "../components/layout/PageTransition";
import SectionTitle from "../components/ui/SectionTitle";
import { useScrollAnimation } from "../hooks/useScrollAnimation";
import ApexButton from "../components/ui/ApexButton";
import { Link } from "wouter";

export default function About() {
  const heroRef = useRef<HTMLDivElement>(null);
  const missionRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const valuesRef = useRef<HTMLDivElement>(null);
  const philosophyRef = useRef<HTMLDivElement>(null);
  const locationRef = useRef<HTMLDivElement>(null);

  useScrollAnimation(missionRef);
  useScrollAnimation(timelineRef, { yOffset: 60 });
  useScrollAnimation(valuesRef, { stagger: 0.1 });
  useScrollAnimation(philosophyRef);
  useScrollAnimation(locationRef);

  const timelineEvents = [
    {
      year: "2018",
      title: "Founded as AdiAsh Sports Academy",
      desc: "What started as a vision to give young players in Los Alamitos access to high-quality coaching became a reality in 2018. Coach Shepal Patel founded AdiAsh Sports Academy with a commitment to teaching the fundamentals of basketball and the values that make great athletes — discipline, hard work, and respect. The program began small, with a focus on skill development and a love of the game.",
    },
    {
      year: "2021",
      title: "Multiple Age Groups & NJB",
      desc: "By 2021, the program had grown significantly. Multiple age group teams were formed to serve a wider range of young athletes, and AdiAsh Sports Academy joined the NJB (National Junior Basketball) league, bringing structured, competitive play to our players for the first time. This was the moment the program transformed from a training club into a true travel ball organization.",
    },
    {
      year: "2024",
      title: "Reborn as APEX Basketball",
      desc: "In 2024, the program underwent a full rebrand, emerging as APEX Basketball. The new name reflected a new era of ambition. We joined more competitive leagues including Top Ballers and began competing at a higher level across Southern California. APEX was no longer just a team — it was a standard.",
    },
    {
      year: "2026",
      title: "One Team. Maximum Competition.",
      desc: "Today, APEX fields one main roster competing against high school teams, local tournaments, and events in Las Vegas. The program continues to push the boundaries of what a travel ball team in Los Alamitos can achieve. Our players are competing at levels that prepare them for varsity and beyond.",
    }
  ];

  const values = [
    { title: "Discipline", desc: "We show up. We work hard. Every single practice matters." },
    { title: "Accountability", desc: "Players hold themselves and each other to the highest standard on and off the court." },
    { title: "Growth", desc: "Every rep, every drill, every game is an opportunity to improve. We never stop developing." },
    { title: "Competitiveness", desc: "We compete to win. We prepare to win. We expect to win." },
    { title: "Brotherhood", desc: "APEX players are family. We support each other on the court and in life." },
    { title: "Respect", desc: "For coaches, teammates, opponents, and the game itself. Respect is non-negotiable." },
  ];

  return (
    <PageTransition>
      {/* Hero */}
      <section ref={heroRef} className="relative pt-32 pb-24 lg:pt-48 lg:pb-32 bg-card overflow-hidden border-b border-white/5">
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: "radial-gradient(circle at center, var(--color-primary) 0, transparent 2px)",
          backgroundSize: "24px 24px"
        }} />
        <div className="container mx-auto px-4 relative z-10 text-center">
          <SectionTitle 
            title="OUR STORY" 
            subtitle="From a vision to Southern California's most competitive travel ball program" 
          />
        </div>
      </section>

      {/* Mission & Vision */}
      <section ref={missionRef} className="py-24 relative z-10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24">
            <div className="scroll-animate bg-white/5 p-10 rounded-2xl border border-primary/20 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-transparent" />
              <h3 className="font-display text-4xl text-white mb-6">Mission</h3>
              <p className="text-xl leading-relaxed text-muted-foreground">
                To develop elite basketball players and exceptional human beings through disciplined coaching, competitive play, and a culture of accountability and brotherhood.
              </p>
            </div>
            <div className="scroll-animate bg-white/5 p-10 rounded-2xl border border-accent/20 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-accent to-transparent" />
              <h3 className="font-display text-4xl text-white mb-6">Vision</h3>
              <p className="text-xl leading-relaxed text-muted-foreground">
                To be the most respected travel basketball program in Southern California, producing players who excel on the court and in life.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section ref={timelineRef} className="py-24 relative z-10 bg-card/30">
        <div className="container mx-auto px-4">
          <SectionTitle title="THE JOURNEY" className="mb-20 scroll-animate" />
          
          <div className="relative max-w-4xl mx-auto">
            {/* Timeline Line */}
            <div className="absolute left-[28px] md:left-1/2 top-0 bottom-0 w-0.5 bg-white/10 md:-translate-x-1/2" />
            
            {timelineEvents.map((event, index) => (
              <div key={event.year} className={`relative flex flex-col md:flex-row gap-8 mb-16 scroll-animate ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                {/* Timeline Node */}
                <div className="absolute left-[16px] md:left-1/2 w-6 h-6 rounded-full bg-primary flex items-center justify-center md:-translate-x-1/2 z-10 mt-1 ring-4 ring-background">
                  <div className="w-2 h-2 rounded-full bg-background" />
                </div>
                
                {/* Empty Space for alignment */}
                <div className="hidden md:block w-1/2" />
                
                {/* Content */}
                <div className={`w-full md:w-1/2 pl-16 md:pl-0 ${index % 2 === 0 ? 'md:pr-16 md:text-right' : 'md:pl-16 md:text-left'}`}>
                  <span className="font-display text-5xl text-primary opacity-50 block mb-2">{event.year}</span>
                  <h4 className="text-2xl font-bold text-white mb-4 uppercase tracking-wide">{event.title}</h4>
                  <p className="text-muted-foreground leading-relaxed">
                    {event.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section ref={valuesRef} className="py-24 relative z-10">
        <div className="container mx-auto px-4 text-center">
          <SectionTitle title="CORE VALUES" className="mb-16 scroll-animate" />
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((value, i) => (
              <div key={i} className="bg-card border border-white/5 p-8 rounded-xl text-left hover:border-primary/30 transition-colors scroll-animate">
                <h4 className="font-display text-3xl text-primary mb-3">{value.title}</h4>
                <p className="text-muted-foreground">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Philosophy */}
      <section ref={philosophyRef} className="py-24 relative z-10 bg-primary/5 border-y border-primary/10">
        <div className="container mx-auto px-4 text-center max-w-4xl">
          <h2 className="font-display text-5xl text-white mb-8 scroll-animate">PROGRAM PHILOSOPHY</h2>
          <p className="text-xl md:text-2xl leading-relaxed text-muted-foreground scroll-animate font-medium">
            At APEX, we believe that the best basketball players are built through repetition, competition, and mentorship — not just natural talent. Our coaching philosophy combines technical skill development with mental toughness training. We challenge every player to understand the game at a high level, to read defenses, to communicate, and to lead. We believe in developing complete players who are prepared for high school varsity programs and who carry the lessons of the court into every area of their lives.
          </p>
        </div>
      </section>

      {/* Location */}
      <section ref={locationRef} className="py-24 relative z-10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="scroll-animate">
              <SectionTitle title="OUR HOME COURT" align="left" className="mb-6" />
              <p className="text-xl text-white mb-2">Based in Los Alamitos, CA.</p>
              <p className="text-muted-foreground text-lg mb-8">We practice at Oak Middle School Gym every Monday and Friday from 5–7 PM.</p>
              <Link href="/contact">
                <ApexButton>Get Directions</ApexButton>
              </Link>
            </div>
            <div className="scroll-animate aspect-video rounded-2xl overflow-hidden border border-white/10 relative bg-card flex items-center justify-center">
              {/* iframe map centered on Los Alamitos Oak Middle School approx coords */}
              <iframe 
                width="100%" 
                height="100%" 
                style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg)' }} 
                src="https://www.openstreetmap.org/export/embed.html?bbox=-118.06941%2C33.79155%2C-118.05941%2C33.80155&amp;layer=mapnik&amp;marker=33.79655%2C-118.06441"
                title="Oak Middle School Map"
              />
            </div>
          </div>
        </div>
      </section>

    </PageTransition>
  );
}
