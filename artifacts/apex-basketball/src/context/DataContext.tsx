import { createContext, useContext, useState, ReactNode, useCallback } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface Player {
  id: string;
  jersey: number;
  name: string;
  position: string;
  positionFull: string;
  grade: string;
}

export interface Coach {
  id: string;
  name: string;
  title: string;
  initials: string;
  bio: string;
  phone?: string;
  email?: string;
}

export interface GalleryImage {
  id: string;
  url: string;
  caption: string;
}

export interface TimelineEntry {
  id: string;
  year: string;
  heading: string;
  body: string;
}

export interface Practice {
  id: string;
  day: string;
  startTime: string;
  endTime: string;
  location: string;
  note?: string;
}

export interface Tournament {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  location: string;
  featured: boolean;
}

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
}

export interface Game {
  id: string;
  opponent: string;
  date: string;
  time: string;
  location: string;
  homeAway: "home" | "away" | "neutral";
  result: "win" | "loss" | "upcoming" | null;
  ourScore: number | null;
  theirScore: number | null;
  notes: string;
  tournament: string;
}

export interface SiteData {
  players: Player[];
  coaches: Coach[];
  gallery: GalleryImage[];
  timeline: TimelineEntry[];
  practices: Practice[];
  tournaments: Tournament[];
  testimonials: Testimonial[];
  games: Game[];
}

// ─── Defaults ─────────────────────────────────────────────────────────────────

const DEFAULT_DATA: SiteData = {
  players: [
    { id: "p1",  jersey: 1,  name: "Aditya Patel",      position: "PG / SG", positionFull: "Point Guard / Shooting Guard",     grade: "11th Grade" },
    { id: "p2",  jersey: 3,  name: "Julian Sanchez",    position: "SG / SF", positionFull: "Shooting Guard / Small Forward",   grade: "10th Grade" },
    { id: "p3",  jersey: 5,  name: "Thomas O'Grady",    position: "PG / SG", positionFull: "Point Guard / Shooting Guard",     grade: "9th Grade"  },
    { id: "p4",  jersey: 8,  name: "Ren Nagai",         position: "PF / C",  positionFull: "Power Forward / Center",           grade: "10th Grade" },
    { id: "p5",  jersey: 11, name: "Tomas Ballesteros", position: "PG / SG", positionFull: "Point Guard / Shooting Guard",     grade: "10th Grade" },
    { id: "p6",  jersey: 13, name: "Ben Finlayson",     position: "SG / PG", positionFull: "Shooting Guard / Point Guard",     grade: "10th Grade" },
    { id: "p7",  jersey: 30, name: "Adam Dulay",        position: "SG / PG", positionFull: "Shooting Guard / Point Guard",     grade: "10th Grade" },
    { id: "p8",  jersey: 32, name: "Jack Centello",     position: "C / PF",  positionFull: "Center / Power Forward",           grade: "11th Grade" },
    { id: "p9",  jersey: 58, name: "Robert Flores",     position: "SF / SG", positionFull: "Small Forward / Shooting Guard",   grade: "10th Grade" },
    { id: "p10", jersey: 77, name: "Daniel Hernandez",  position: "SF / PF", positionFull: "Small Forward / Power Forward",    grade: "10th Grade" },
  ],
  coaches: [
    {
      id: "c1",
      name: "Shepal Patel",
      title: "Head Coach & Founder",
      initials: "SP",
      bio: "Coach Shepal Patel is entering his 11th year coaching basketball. He was a former coach at a D1 Basketball School: Los Alamitos High School. He is the owner of ADIASH Sports Academy, a local boys and girls club team where he continues to coach in local leagues and tournaments across Southern California. Coach Patel played basketball for Sports Authority of India (SAI), a prominent sports organization in India. He played for the State of Gujarat and represented India at the national level. Coach Patel's day job is Chief Financial Officer (CFO) at Safran Aerospace.",
      phone: "714-715-4591",
      email: "adiashsportsacademy@gmail.com",
    },
    {
      id: "c2",
      name: "Greg Gabriel",
      title: "Assistant Coach",
      initials: "GG",
      bio: "Greg Gabriel brings valuable on-court experience and energy to the APEX program. He has multiple years of basketball coaching experience with SEYO and plays an essential role in player development and practice management.",
    },
  ],
  gallery: [],
  timeline: [
    { id: "t1", year: "2018", heading: "Founded as AdiAsh Sports Academy", body: "What started as a vision to give young players in Los Alamitos access to high-quality coaching became a reality in 2018. Coach Shepal Patel founded AdiAsh Sports Academy with a commitment to teaching the fundamentals of basketball and the values that make great athletes — discipline, hard work, and respect. The program began small, with a focus on skill development and a love of the game." },
    { id: "t2", year: "2021", heading: "Multiple Age Groups & NJB", body: "By 2021, the program had grown significantly. Multiple age group teams were formed to serve a wider range of young athletes, and AdiAsh Sports Academy joined the NJB (National Junior Basketball) league, bringing structured, competitive play to our players for the first time. This was the moment the program transformed from a training club into a true travel ball organization." },
    { id: "t3", year: "2024", heading: "Reborn as APEX Basketball", body: "In 2024, the program underwent a full rebrand, emerging as APEX Basketball. The new name reflected a new era of ambition. We joined more competitive leagues including Top Ballers and began competing at a higher level across Southern California. APEX was no longer just a team — it was a standard." },
    { id: "t4", year: "2026", heading: "One Team. Maximum Competition.", body: "Today, APEX fields one main roster competing against high school teams, local tournaments, and events in Las Vegas. The program continues to push the boundaries of what a travel ball team in Los Alamitos can achieve. Our players are competing at levels that prepare them for varsity and beyond." },
  ],
  practices: [
    { id: "pr1", day: "Monday",  startTime: "5:00 PM", endTime: "7:00 PM", location: "Oak Middle School Gym, Los Alamitos, CA" },
    { id: "pr2", day: "Friday",  startTime: "5:00 PM", endTime: "7:00 PM", location: "Oak Middle School Gym, Los Alamitos, CA" },
  ],
  tournaments: [
    { id: "tr1", name: "Las Vegas Live w/ Big Foot Tournament", startDate: "2026-07-09", endDate: "2026-07-12", location: "Tark, Nevada", featured: true },
  ],
  testimonials: [
    { id: "tm1", quote: "My son has grown so much as a player and a person since joining APEX. Coach Patel pushes them to be their best every single practice.", author: "Parent of an APEX Player" },
    { id: "tm2", quote: "The level of coaching and dedication here is unlike any other program in Los Alamitos. We are proud APEX parents.", author: "Parent of an APEX Player" },
    { id: "tm3", quote: "APEX gave my son the confidence and the skills to compete at the varsity level. I can not say enough good things about this program.", author: "Parent of an APEX Player" },
  ],
  games: [],
};

// ─── Storage ──────────────────────────────────────────────────────────────────

const STORAGE_KEY = "apex_site_data";

function load(): SiteData {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as Partial<SiteData>;
      // Merge with defaults so new keys added later still populate
      return { ...DEFAULT_DATA, ...parsed };
    }
  } catch { /* ignore */ }
  return DEFAULT_DATA;
}

function save(data: SiteData) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

// ─── Context ──────────────────────────────────────────────────────────────────

interface DataContextType {
  data: SiteData;
  setSection: <K extends keyof SiteData>(key: K, value: SiteData[K]) => void;
}

const DataContext = createContext<DataContextType | null>(null);

export function DataProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<SiteData>(load);

  const setSection = useCallback(<K extends keyof SiteData>(key: K, value: SiteData[K]) => {
    setData((prev) => {
      const next = { ...prev, [key]: value };
      save(next);
      return next;
    });
  }, []);

  return <DataContext.Provider value={{ data, setSection }}>{children}</DataContext.Provider>;
}

export function useData() {
  const ctx = useContext(DataContext);
  if (!ctx) throw new Error("useData must be used within DataProvider");
  return ctx;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

export function uid() {
  return Math.random().toString(36).slice(2, 10);
}
