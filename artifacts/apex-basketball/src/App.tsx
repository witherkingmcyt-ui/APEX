import { Switch, Route, Router as WouterRouter, useLocation } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useEffect, useState } from "react";
import Lenis from "@studio-freight/lenis";
import { AnimatePresence, motion } from "framer-motion";

// Pages
import Home from "./pages/Home";
import About from "./pages/About";
import Team from "./pages/Team";
import Schedule from "./pages/Schedule";
import Contact from "./pages/Contact";
import Join from "./pages/Join";
import Gallery from "./pages/Gallery";
import Login from "./pages/Login";
import Admin from "./pages/Admin";
import Games from "./pages/Games";
import NotFound from "./pages/NotFound";

// Layout
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import CustomCursor from "./components/layout/CustomCursor";

// Context
import { AuthProvider } from "./context/AuthContext";
import { EventProvider } from "./context/EventContext";
import { DataProvider } from "./context/DataContext";

const queryClient = new QueryClient();

// Initial Loading Screen Component
function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const duration = 2000;
    const interval = 20;
    const steps = duration / interval;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      setProgress((step / steps) * 100);
      if (step >= steps) {
        clearInterval(timer);
        setTimeout(onComplete, 200);
      }
    }, interval);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <motion.div 
      initial={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: "-100%" }}
      transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
      className="fixed inset-0 z-[99999] bg-[#0A0A0F] flex flex-col items-center justify-center"
    >
      <div className="flex flex-col items-center text-center">
        {/* Simple CSS Basketball for loader to be lightweight */}
        <div className="w-16 h-16 bg-primary rounded-full mb-8 animate-spin border-2 border-black relative overflow-hidden" style={{ animationDuration: '3s' }}>
          <div className="absolute top-1/2 left-0 right-0 h-[2px] bg-black -translate-y-1/2" />
          <div className="absolute top-0 bottom-0 left-1/2 w-[2px] bg-black -translate-x-1/2" />
          <div className="absolute inset-0 rounded-full border-[2px] border-black scale-x-50" />
        </div>
        
        <h1 className="font-display text-[80px] leading-none text-white tracking-widest mb-2">APEX</h1>
        <h2 className="font-display text-[40px] leading-none text-primary tracking-widest mb-6">BASKETBALL</h2>
        
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="text-muted-foreground uppercase tracking-widest text-sm font-medium mb-12"
        >
          Train Hard. Compete Harder.
        </motion.p>
      </div>

      <div className="absolute bottom-0 left-0 w-full h-1 bg-white/5">
        <div 
          className="h-full bg-primary transition-all duration-[20ms] ease-linear"
          style={{ width: `${progress}%` }}
        />
      </div>
    </motion.div>
  );
}

// Custom route wrapper for AnimatePresence
function AnimatedRouter() {
  const [location] = useLocation();

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <AnimatePresence mode="wait">
      <Switch location={location} key={location}>
        <Route path="/" component={Home} />
        <Route path="/about" component={About} />
        <Route path="/team" component={Team} />
        <Route path="/schedule" component={Schedule} />
        <Route path="/contact" component={Contact} />
        <Route path="/join" component={Join} />
        <Route path="/gallery" component={Gallery} />
        <Route path="/games" component={Games} />
        <Route path="/login" component={Login} />
        <Route path="/admin" component={Admin} />
        <Route component={NotFound} />
      </Switch>
    </AnimatePresence>
  );
}

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Force dark mode
    document.documentElement.classList.add("dark");

    // Initialize Lenis smooth scroll
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        
        <AnimatePresence>
          {loading && <LoadingScreen onComplete={() => setLoading(false)} />}
        </AnimatePresence>

        {!loading && (
          <AuthProvider>
            <DataProvider>
            <EventProvider>
              <div className="flex flex-col min-h-[100dvh] bg-background text-foreground selection:bg-primary selection:text-white">
                <CustomCursor />
                <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
                  <Navbar />
                  <main className="flex-grow flex flex-col relative z-0">
                    <AnimatedRouter />
                  </main>
                  <Footer />
                </WouterRouter>
                <Toaster theme="dark" position="bottom-right" />
              </div>
            </EventProvider>
            </DataProvider>
          </AuthProvider>
        )}

      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
