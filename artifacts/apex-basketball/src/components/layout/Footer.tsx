import { Link } from "wouter";

export default function Footer() {
  return (
    <footer className="bg-[#070710] border-t border-t-primary/20 pt-16 pb-8 relative z-10" data-testid="footer">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Col 1 */}
          <div className="flex flex-col gap-4">
            <Link href="/" className="font-display text-4xl text-primary tracking-wider" data-testid="footer-logo">
              APEX
            </Link>
            <p className="font-display text-xl text-foreground tracking-wide">
              Train Hard. Compete Harder.
            </p>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-sm">
              Southern California's premier travel basketball program for grades 8–12. Developing elite players and exceptional human beings.
            </p>
          </div>

          {/* Col 2 */}
          <div className="flex flex-col gap-4">
            <h4 className="font-display text-2xl tracking-wide">Quick Links</h4>
            <nav className="flex flex-col gap-2">
              <Link href="/" className="text-muted-foreground hover:text-primary transition-colors text-sm">Home</Link>
              <Link href="/about" className="text-muted-foreground hover:text-primary transition-colors text-sm">About</Link>
              <Link href="/team" className="text-muted-foreground hover:text-primary transition-colors text-sm">Team</Link>
              <Link href="/schedule" className="text-muted-foreground hover:text-primary transition-colors text-sm">Schedule</Link>
              <Link href="/gallery" className="text-muted-foreground hover:text-primary transition-colors text-sm">Gallery</Link>
              <Link href="/contact" className="text-muted-foreground hover:text-primary transition-colors text-sm">Contact</Link>
              <Link href="/join" className="text-muted-foreground hover:text-primary transition-colors text-sm">Join</Link>
            </nav>
          </div>

          {/* Col 3 */}
          <div className="flex flex-col gap-4">
            <h4 className="font-display text-2xl tracking-wide">Contact Us</h4>
            <div className="flex flex-col gap-2 text-sm text-muted-foreground">
              <a href="tel:714-715-4591" className="hover:text-primary transition-colors">714-715-4591</a>
              <a href="mailto:adiashsportsacademy@gmail.com" className="hover:text-primary transition-colors">adiashsportsacademy@gmail.com</a>
              <p>11802 Martha Ann Dr</p>
              <p>Los Alamitos, CA 90720</p>
            </div>
          </div>

          {/* Col 4 */}
          <div className="flex flex-col gap-4">
            <h4 className="font-display text-2xl tracking-wide">Practice Info</h4>
            <div className="flex flex-col gap-2 text-sm text-muted-foreground">
              <p className="text-foreground font-medium">Grades 8–12</p>
              <p>Monday & Friday, 5:00 PM – 7:00 PM</p>
              <p>Oak Middle School Gym</p>
              <p>Los Alamitos, CA</p>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <p>© 2026 APEX Basketball. All Rights Reserved.</p>
          <p>Formerly AdiAsh Sports Academy.</p>
        </div>
      </div>
    </footer>
  );
}
