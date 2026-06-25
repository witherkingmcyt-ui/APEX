export interface Player {
  jersey: number;
  name: string;
  position: string;
  positionFull: string;
  grade: string;
}

export interface Coach {
  name: string;
  title: string;
  bio: string;
  initials: string;
  phone?: string;
  email?: string;
}

export interface Testimonial {
  quote: string;
  author: string;
}

export interface Event {
  title: string;
  date: string;
  location: string;
  featured?: boolean;
}
