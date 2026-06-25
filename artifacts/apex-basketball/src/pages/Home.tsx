import { useRef, useEffect, useState } from "react";
import { Link } from "wouter";
import PageTransition from "../components/layout/PageTransition";
import Basketball3D from "../components/3d/Basketball3D";
import ParticleSystem from "../components/3d/ParticleSystem";
import SectionTitle from "../components/ui/SectionTitle";
import ApexButton from "../components/ui/ApexButton";
import CountdownTimer from "../components/ui/CountdownTimer";
import { useScrollAnimation } from "../hooks/useScrollAnimation";
import { testimonials } from "../data/testimonials";
import { useInView } from "react-intersection-observer";

function StatNumber({ value, label, inView }: { value: number; label: string; inView: boolean }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (inView) {
      let start = 0;
      const duration = 2000;
      const startTime = performance.now();
      
      const animate = (currentTime: number) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // easeOutQuart
        const ease = 1 - Math.pow(1 - progress, 4);
        setCount(Math.floor(ease * value));
        
        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };
      
      requestAnimationFrame(animate);
    }
  }, [inView, value]);

  return (
    <div className="flex flex-col items-center justify-center p-6 text-center">
      <span className="font-mono text-5xl md:text-7xl text-primary font-bold mb-2">
        {count}{label.includes('+') ? '+' : ''}
      </span>
      <span className="text-muted-foreground text-sm tracking-wider uppercase">{label.replace(/[0-9+]/g, '')}</span>
    </div>
  );
}

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const whyRef = useRef<HTMLDivElement>(null);
  const countdownRef = useRef<HTMLDivElement>(null);
  const testimonialsRef = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);
  
  useScrollAnimation(statsRef);
  useScrollAnimation(whyRef, { stagger: 0.15 });
  useScrollAnimation(countdownRef);
  useScrollAnimation(testimonialsRef, { stagger: 0.2 });
  useScrollAnimation(galleryRef, { stagger: 0.1 });

  const { ref: statsInViewRef, inView: statsInView } = useInView({ threshold: 0.5, triggerOnce: true });

  const targetDate = new Date("2026-07-09T00:00:00");

  return (
    <PageTransition>
      <ParticleSystem />
      
      {/* Hero Section */}
      <section ref={heroRef} className="relative w-full h-[100dvh] flex items-center justify-center overflow-hidden">
        <Basketball3D />
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background z-10 pointer-events-none" />
        
        <div className="relative z-20 container mx-auto px-4 flex flex-col items-center text-center">
          <h1 className="font-display text-7xl md:text-[120px] leading-[0.85] text-white tracking-wider mb-6 flex flex-col">
            <span className="scroll-animate">TRAIN HARD.</span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent scroll-animate">COMPETE HARDER.</span>
          </h1>
          <p className="text-muted-foreground font-medium text-lg md:text-xl max-w-2xl mb-10 scroll-animate">
            Southern California's Premier Travel Basketball Program for Grades 8–12
          </p>
          <div className="flex flex-col sm:flex-row gap-4 scroll-animate">
            <Link href="/join">
              <ApexButton size="lg" className="w-full sm:w-auto">Join APEX</ApexButton>
            </Link>
            <Link href="/team">
              <ApexButton variant="outline" size="lg" className="w-full sm:w-auto">Meet the Team</ApexButton>
            </Link>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/20 rounded-full flex justify-center p-1">
            <div className="w-1 h-2 bg-primary rounded-full animate-ping" />
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-card/50 border-y border-white/5 py-12 relative z-10">
        <div 
          ref={(node) => {
            statsRef.current = node;
            statsInViewRef(node);
          }} 
          className="container mx-auto px-4"
        >
          <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-primary/20">
            <StatNumber value={11} label="11+ Years Coaching Experience" inView={statsInView} />
            <StatNumber value={4} label="4 Tournament Appearances Per Season" inView={statsInView} />
            <StatNumber value={50} label="50+ Players Developed" inView={statsInView} />
            <StatNumber value={2} label="2 Practices Per Week" inView={statsInView} />
          </div>
        </div>
      </section>

      {/* Why Choose APEX */}
      <section ref={whyRef} className="py-24 relative z-10">
        <div className="container mx-auto px-4">
          <SectionTitle 
            title="WHY CHOOSE APEX" 
            subtitle="More Than A Team. A Development Program." 
            className="mb-16 scroll-animate" 
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-2xl hover:border-primary/50 transition-colors duration-500 scroll-animate">
              <h3 className="font-display text-3xl text-primary mb-4">Elite Coaching Staff</h3>
              <p className="text-muted-foreground leading-relaxed">
                Led by Coach Shepal Patel, a former D1 program coach with over 11 years of experience and a playing background at the national level in India.
              </p>
            </div>
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-2xl hover:border-primary/50 transition-colors duration-500 scroll-animate">
              <h3 className="font-display text-3xl text-primary mb-4">Real Tournament Competition</h3>
              <p className="text-muted-foreground leading-relaxed">
                We compete in serious leagues and tournaments across Southern California and beyond — including Las Vegas events — so players develop in high-pressure environments.
              </p>
            </div>
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-2xl hover:border-primary/50 transition-colors duration-500 scroll-animate">
              <h3 className="font-display text-3xl text-primary mb-4">Proven Player Development</h3>
              <p className="text-muted-foreground leading-relaxed">
                Every player gets position-specific coaching, game IQ development, and the conditioning needed to compete at the high school level and beyond.
              </p>
            </div>
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-2xl hover:border-primary/50 transition-colors duration-500 scroll-animate">
              <h3 className="font-display text-3xl text-primary mb-4">Brotherhood & Accountability</h3>
              <p className="text-muted-foreground leading-relaxed">
                APEX is more than basketball. We build character, discipline, and lifelong bonds that extend far beyond the court.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Countdown */}
      <section ref={countdownRef} className="py-24 bg-card relative z-10 border-y border-white/5 overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none">
          <span className="font-display text-[20vw] whitespace-nowrap text-primary">LAS VEGAS</span>
        </div>
        <div className="container mx-auto px-4 flex flex-col items-center text-center relative z-20">
          <SectionTitle title="NEXT TOURNAMENT" className="mb-8 scroll-animate" />
          <h3 className="text-3xl md:text-5xl font-bold text-white mb-4 scroll-animate">Las Vegas Live w/ Big Foot Tournament</h3>
          <p className="text-xl text-primary font-medium mb-12 scroll-animate">July 9–12, 2026 | Tark, Nevada</p>
          
          <div className="mb-12 scroll-animate">
            <CountdownTimer targetDate={targetDate} />
          </div>
          
          <div className="scroll-animate">
            <Link href="/schedule">
              <ApexButton variant="outline">View Full Schedule</ApexButton>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section ref={testimonialsRef} className="py-24 relative z-10">
        <div className="container mx-auto px-4">
          <SectionTitle title="WHY PARENTS TRUST APEX" className="mb-16 scroll-animate" />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((t, i) => (
              <div key={i} className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-2xl relative overflow-hidden scroll-animate group">
                <div className="absolute -top-4 -left-2 text-[120px] font-serif text-primary/10 leading-none pointer-events-none group-hover:text-primary/20 transition-colors duration-500">"</div>
                <p className="text-foreground/90 leading-relaxed mb-8 relative z-10 italic">
                  "{t.quote}"
                </p>
                <div className="flex items-center gap-4 relative z-10">
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-display">A</div>
                  <span className="text-sm font-medium text-primary uppercase tracking-wider">{t.author}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Preview */}
      <section ref={galleryRef} className="py-24 relative z-10 bg-card/30">
        <div className="container mx-auto px-4 text-center">
          <SectionTitle title="HIGHLIGHTS" className="mb-16 scroll-animate" />
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {[1, 2, 3].map((i) => (
              <div key={i} className="aspect-4/3 relative rounded-xl overflow-hidden group scroll-animate bg-card border border-white/5 cursor-pointer">
                {/* Placeholder Court Pattern */}
                <div className="absolute inset-0 opacity-20" style={{
                  backgroundImage: "linear-gradient(var(--color-primary) 1px, transparent 1px), linear-gradient(90deg, var(--color-primary) 1px, transparent 1px)",
                  backgroundSize: "40px 40px",
                  backgroundPosition: "center"
                }} />
                <div className="absolute inset-0 flex items-center justify-center">
                   <span className="font-display text-6xl text-white/10">APEX</span>
                </div>
                
                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-primary/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <span className="font-bold tracking-widest uppercase text-white scale-90 group-hover:scale-100 transition-transform duration-300">View Gallery</span>
                </div>
              </div>
            ))}
          </div>
          
          <div className="scroll-animate">
            <Link href="/gallery">
              <ApexButton variant="outline">View Full Gallery</ApexButton>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-24 relative z-10 overflow-hidden bg-[#0A0A0F]">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/20 blur-[120px] rounded-full pointer-events-none" />
        
        <div className="container mx-auto px-4 relative z-20 text-center flex flex-col items-center">
          <h2 className="font-display text-5xl md:text-7xl text-white mb-6">READY TO JOIN THE APEX FAMILY?</h2>
          <p className="text-xl text-muted-foreground mb-10 max-w-2xl">
            Tryouts are open for grades 8 through 12. Contact us today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <Link href="/join" className="w-full sm:w-auto">
              <ApexButton size="lg" className="w-full">Register Now</ApexButton>
            </Link>
            <Link href="/contact" className="w-full sm:w-auto">
              <ApexButton variant="outline" size="lg" className="w-full">Contact Us</ApexButton>
            </Link>
          </div>
        </div>
      </section>

    </PageTransition>
  );
}
