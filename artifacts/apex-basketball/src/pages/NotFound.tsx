import { Link } from "wouter";
import PageTransition from "../components/layout/PageTransition";
import ApexButton from "../components/ui/ApexButton";

export default function NotFound() {
  return (
    <PageTransition>
      <div className="min-h-[100dvh] flex flex-col items-center justify-center text-center px-4 overflow-hidden relative">
        {/* Animated Basketball */}
        <div className="relative w-32 h-32 mb-12">
           <div className="absolute inset-0 bg-primary rounded-full animate-bounce shadow-[inset_-10px_-10px_20px_rgba(0,0,0,0.5)] border-2 border-black">
              {/* Lines */}
              <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-black/40 -translate-y-1/2" />
              <div className="absolute top-0 bottom-0 left-1/2 w-0.5 bg-black/40 -translate-x-1/2" />
              <div className="absolute inset-0 rounded-full border-2 border-black/40 scale-x-50" />
           </div>
           {/* Shadow */}
           <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-20 h-4 bg-black/50 blur-md rounded-full animate-pulse" style={{ animationDuration: '1s' }} />
        </div>

        <h1 className="font-display text-[120px] md:text-[180px] leading-none text-primary mb-4 tracking-tighter">404</h1>
        <h2 className="font-display text-4xl md:text-5xl text-white mb-6 tracking-wide">PAGE NOT FOUND</h2>
        <p className="text-muted-foreground text-xl md:text-2xl font-medium mb-12">
          Looks like this page didn't make the cut.
        </p>
        
        <Link href="/">
          <ApexButton size="lg">Back to Home</ApexButton>
        </Link>
      </div>
    </PageTransition>
  );
}
