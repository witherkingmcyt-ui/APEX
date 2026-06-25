import { createContext, useContext, useState, ReactNode } from "react";

export interface FeaturedEvent {
  name: string;
  startDate: string;
  endDate: string;
  location: string;
  countdownTarget: string;
}

const DEFAULT_EVENT: FeaturedEvent = {
  name: "Las Vegas Live w/ Big Foot Tournament",
  startDate: "2026-07-09",
  endDate: "2026-07-12",
  location: "Tark, Nevada",
  countdownTarget: "2026-07-09T00:00:00",
};

const STORAGE_KEY = "apex_featured_event";

function loadEvent(): FeaturedEvent {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) return JSON.parse(stored) as FeaturedEvent;
  } catch {
    // ignore
  }
  return DEFAULT_EVENT;
}

interface EventContextType {
  event: FeaturedEvent;
  updateEvent: (e: FeaturedEvent) => void;
}

const EventContext = createContext<EventContextType | null>(null);

export function EventProvider({ children }: { children: ReactNode }) {
  const [event, setEvent] = useState<FeaturedEvent>(loadEvent);

  const updateEvent = (e: FeaturedEvent) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(e));
    setEvent(e);
  };

  return (
    <EventContext.Provider value={{ event, updateEvent }}>
      {children}
    </EventContext.Provider>
  );
}

export function useFeaturedEvent() {
  const ctx = useContext(EventContext);
  if (!ctx) throw new Error("useFeaturedEvent must be used within EventProvider");
  return ctx;
}
