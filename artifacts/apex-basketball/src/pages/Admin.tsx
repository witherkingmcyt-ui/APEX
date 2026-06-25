import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { toast } from "sonner";
import { useAuth } from "../context/AuthContext";
import { useFeaturedEvent, FeaturedEvent } from "../context/EventContext";
import PageTransition from "../components/layout/PageTransition";
import ApexButton from "../components/ui/ApexButton";
import CountdownTimer from "../components/ui/CountdownTimer";

export default function Admin() {
  const { isAuthenticated, logout } = useAuth();
  const { event, updateEvent } = useFeaturedEvent();
  const [, setLocation] = useLocation();

  const [form, setForm] = useState<FeaturedEvent>(event);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      setLocation("/login");
    }
  }, [isAuthenticated, setLocation]);

  useEffect(() => {
    setForm(event);
  }, [event]);

  if (!isAuthenticated) return null;

  const handleChange = (field: keyof FeaturedEvent, value: string) => {
    setSaved(false);
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();

    const countdownTarget = form.startDate ? `${form.startDate}T00:00:00` : form.countdownTarget;
    const updated: FeaturedEvent = { ...form, countdownTarget };
    updateEvent(updated);
    setSaved(true);
    toast.success("Featured event updated! Changes are live on the home page.");
  };

  const handleLogout = () => {
    logout();
    setLocation("/");
  };

  const previewDate = form.startDate && form.endDate
    ? `${formatDisplayDate(form.startDate)} – ${formatDisplayDate(form.endDate)}`
    : "";

  const countdownDate = form.startDate ? new Date(`${form.startDate}T00:00:00`) : new Date(form.countdownTarget);

  return (
    <PageTransition>
      <section className="min-h-screen py-32 px-4 relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-primary/10 blur-[150px] rounded-full pointer-events-none" />

        <div className="container mx-auto max-w-3xl relative z-10">
          {/* Header */}
          <div className="flex items-center justify-between mb-12">
            <div>
              <span className="font-display text-4xl text-primary tracking-wider">APEX</span>
              <h1 className="font-display text-3xl text-white tracking-wider">ADMIN PANEL</h1>
              <p className="text-muted-foreground text-sm mt-1">Welcome, Coach Patel</p>
            </div>
            <button
              onClick={handleLogout}
              className="text-sm text-muted-foreground hover:text-primary transition-colors uppercase tracking-widest font-medium"
              data-testid="button-logout"
            >
              Log Out
            </button>
          </div>

          {/* Edit Form */}
          <form onSubmit={handleSave} data-testid="admin-form">
            <div className="bg-card border border-white/10 rounded-2xl p-8 backdrop-blur-xl mb-8">
              <h2 className="font-display text-2xl text-white tracking-wider mb-6 pb-4 border-b border-white/10">
                FEATURED EVENT
              </h2>

              <div className="space-y-6">
                <div>
                  <label htmlFor="event-name" className="block text-xs font-medium text-muted-foreground uppercase tracking-widest mb-2">
                    Event Name
                  </label>
                  <input
                    id="event-name"
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => handleChange("name", e.target.value)}
                    placeholder="e.g. Las Vegas Live w/ Big Foot Tournament"
                    data-testid="input-event-name"
                    className="w-full bg-background border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors text-sm"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="event-start" className="block text-xs font-medium text-muted-foreground uppercase tracking-widest mb-2">
                      Start Date
                    </label>
                    <input
                      id="event-start"
                      type="date"
                      required
                      value={form.startDate}
                      onChange={(e) => handleChange("startDate", e.target.value)}
                      data-testid="input-event-start"
                      className="w-full bg-background border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors text-sm [color-scheme:dark]"
                    />
                  </div>
                  <div>
                    <label htmlFor="event-end" className="block text-xs font-medium text-muted-foreground uppercase tracking-widest mb-2">
                      End Date
                    </label>
                    <input
                      id="event-end"
                      type="date"
                      required
                      value={form.endDate}
                      onChange={(e) => handleChange("endDate", e.target.value)}
                      data-testid="input-event-end"
                      className="w-full bg-background border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors text-sm [color-scheme:dark]"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="event-location" className="block text-xs font-medium text-muted-foreground uppercase tracking-widest mb-2">
                    Location
                  </label>
                  <input
                    id="event-location"
                    type="text"
                    required
                    value={form.location}
                    onChange={(e) => handleChange("location", e.target.value)}
                    placeholder="e.g. Tark, Nevada"
                    data-testid="input-event-location"
                    className="w-full bg-background border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors text-sm"
                  />
                </div>
              </div>

              <div className="mt-8 flex items-center gap-4">
                <ApexButton type="submit" data-testid="button-save-event">
                  Save Changes
                </ApexButton>
                {saved && (
                  <span className="text-green-400 text-sm font-medium">Changes saved!</span>
                )}
              </div>
            </div>
          </form>

          {/* Live Preview */}
          <div className="bg-card border border-white/10 rounded-2xl p-8 backdrop-blur-xl">
            <h2 className="font-display text-2xl text-white tracking-wider mb-6 pb-4 border-b border-white/10">
              LIVE PREVIEW
            </h2>
            <p className="text-xs text-muted-foreground uppercase tracking-widest mb-6">
              This is how it appears on the home page
            </p>
            <div className="bg-background rounded-xl p-6 text-center">
              <p className="text-xs text-muted-foreground uppercase tracking-widest mb-3">Next Tournament</p>
              <h3 className="font-display text-2xl md:text-3xl text-white mb-2">{form.name || "Event Name"}</h3>
              {previewDate && (
                <p className="text-primary font-medium mb-6">{previewDate} | {form.location}</p>
              )}
              <CountdownTimer targetDate={countdownDate} />
            </div>
          </div>
        </div>
      </section>
    </PageTransition>
  );
}

function formatDisplayDate(dateStr: string): string {
  if (!dateStr) return "";
  const [year, month, day] = dateStr.split("-");
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  return `${months[parseInt(month) - 1]} ${parseInt(day)}, ${year}`;
}
