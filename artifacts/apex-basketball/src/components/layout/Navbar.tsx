import { useEffect, useState } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import ApexButton from "../ui/ApexButton";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Team", path: "/team" },
  { name: "Schedule", path: "/schedule" },
  { name: "Gallery", path: "/gallery" },
  { name: "Contact", path: "/contact" },
];

export default function Navbar() {
  const [location] = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on navigation
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-[1000] transition-all duration-300 ${
          scrolled ? "h-14 bg-background/80 backdrop-blur-md border-b border-white/10" : "h-20 bg-transparent border-transparent"
        }`}
      >
        <div className="container mx-auto px-4 md:px-8 h-full flex items-center justify-between">
          <Link href="/" className="font-display text-3xl text-primary tracking-wider" data-testid="nav-logo">
            APEX
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-8">
            <div className="flex items-center gap-6">
              {navLinks.map((link) => {
                const isActive = location === link.path;
                return (
                  <Link
                    key={link.path}
                    href={link.path}
                    className={`relative text-sm font-medium tracking-wide transition-colors hover:text-primary ${
                      isActive ? "text-primary" : "text-foreground"
                    }`}
                    data-testid={`nav-link-${link.name.toLowerCase()}`}
                  >
                    {link.name}
                    {isActive && (
                      <motion.div
                        layoutId="nav-underline"
                        className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary"
                        initial={false}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      />
                    )}
                  </Link>
                );
              })}
            </div>
            <Link href="/join">
              <ApexButton data-testid="nav-join-button">Join APEX</ApexButton>
            </Link>
          </div>

          {/* Mobile Toggle */}
          <button
            className="lg:hidden p-2 text-foreground hover:text-primary transition-colors"
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Open menu"
            data-testid="nav-mobile-toggle"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-[1001] bg-background/95 backdrop-blur-xl flex flex-col pt-24 pb-8 px-6 lg:hidden"
            data-testid="nav-mobile-menu"
          >
            <button
              className="absolute top-6 right-6 p-2 text-foreground hover:text-primary transition-colors"
              onClick={() => setMobileMenuOpen(false)}
              aria-label="Close menu"
              data-testid="nav-mobile-close"
            >
              <X className="w-8 h-8" />
            </button>
            <div className="flex flex-col gap-6 items-center flex-grow justify-center">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  href={link.path}
                  className={`font-display text-4xl tracking-wider transition-colors ${
                    location === link.path ? "text-primary" : "text-foreground"
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              <div className="mt-8">
                <Link href="/join">
                  <ApexButton size="lg">Join APEX</ApexButton>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
