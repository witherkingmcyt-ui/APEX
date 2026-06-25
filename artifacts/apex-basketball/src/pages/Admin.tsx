import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { toast } from "sonner";
import { Plus, Pencil, Trash2, Check, X, ChevronDown } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useFeaturedEvent, FeaturedEvent } from "../context/EventContext";
import { useData, uid, Player, Coach, GalleryImage, TimelineEntry, Practice, Tournament, Testimonial, Game } from "../context/DataContext";
import PageTransition from "../components/layout/PageTransition";
import ApexButton from "../components/ui/ApexButton";
import CountdownTimer from "../components/ui/CountdownTimer";

// ─── Shared UI ─────────────────────────────────────────────────────────────────

const INPUT = "w-full bg-background border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors text-sm";
const LABEL = "block text-xs font-medium text-muted-foreground uppercase tracking-widest mb-1.5";
const CARD = "bg-card border border-white/10 rounded-2xl p-6 mb-4";

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return <div><label className={LABEL}>{label}</label>{children}</div>;
}

function DeleteBtn({ onClick }: { onClick: () => void }) {
  const [confirm, setConfirm] = useState(false);
  return confirm ? (
    <span className="flex items-center gap-1">
      <button onClick={() => { onClick(); setConfirm(false); }} className="text-red-400 hover:text-red-300 text-xs font-bold uppercase tracking-wider">Delete?</button>
      <button onClick={() => setConfirm(false)} className="text-muted-foreground hover:text-white ml-2"><X className="w-3.5 h-3.5" /></button>
    </span>
  ) : (
    <button onClick={() => setConfirm(true)} className="p-1.5 text-muted-foreground hover:text-red-400 transition-colors" aria-label="Delete"><Trash2 className="w-4 h-4" /></button>
  );
}

function SectionHeader({ title, onAdd }: { title: string; onAdd: () => void }) {
  return (
    <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/10">
      <h2 className="font-display text-2xl text-white tracking-wider">{title}</h2>
      <button onClick={onAdd} className="flex items-center gap-2 px-4 py-2 bg-primary/20 hover:bg-primary/30 border border-primary/40 rounded-lg text-primary text-sm font-medium transition-colors">
        <Plus className="w-4 h-4" /> Add New
      </button>
    </div>
  );
}

// ─── Tab: Featured Event ───────────────────────────────────────────────────────

function EventSection() {
  const { event, updateEvent } = useFeaturedEvent();
  const [form, setForm] = useState<FeaturedEvent>(event);

  useEffect(() => { setForm(event); }, [event]);

  const ch = (f: keyof FeaturedEvent, v: string) => setForm(p => ({ ...p, [f]: v }));

  const save = (e: React.FormEvent) => {
    e.preventDefault();
    updateEvent({ ...form, countdownTarget: `${form.startDate}T00:00:00` });
    toast.success("Featured event updated!");
  };

  const previewDate = form.startDate ? new Date(`${form.startDate}T00:00:00`) : new Date();

  return (
    <div>
      <h2 className="font-display text-2xl text-white tracking-wider mb-6 pb-4 border-b border-white/10">FEATURED EVENT</h2>
      <form onSubmit={save} className="space-y-5 mb-8">
        <Field label="Event Name"><input className={INPUT} value={form.name} onChange={e => ch("name", e.target.value)} placeholder="Tournament name" required /></Field>
        <div className="grid grid-cols-2 gap-4">
          <Field label="Start Date"><input className={INPUT} type="date" value={form.startDate} onChange={e => ch("startDate", e.target.value)} required style={{ colorScheme: "dark" }} /></Field>
          <Field label="End Date"><input className={INPUT} type="date" value={form.endDate} onChange={e => ch("endDate", e.target.value)} required style={{ colorScheme: "dark" }} /></Field>
        </div>
        <Field label="Location"><input className={INPUT} value={form.location} onChange={e => ch("location", e.target.value)} placeholder="City, State" required /></Field>
        <ApexButton type="submit">Save Changes</ApexButton>
      </form>
      <div className="bg-background rounded-xl p-6 text-center border border-white/5">
        <p className="text-xs text-muted-foreground uppercase tracking-widest mb-3">Live Preview</p>
        <h3 className="font-display text-xl text-white mb-2">{form.name}</h3>
        <CountdownTimer targetDate={previewDate} />
      </div>
    </div>
  );
}

// ─── Tab: Games ────────────────────────────────────────────────────────────────

const EMPTY_GAME: Omit<Game, "id"> = { opponent: "", date: "", time: "", location: "", homeAway: "neutral", result: null, ourScore: null, theirScore: null, notes: "", tournament: "" };

function GamesSection() {
  const { data, setSection } = useData();
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState<Omit<Game, "id">>(EMPTY_GAME);

  const startEdit = (g: Game) => { setEditId(g.id); setForm({ ...g }); };
  const startAdd = () => { setEditId("new"); setForm(EMPTY_GAME); };
  const cancel = () => { setEditId(null); };
  const ch = (f: keyof typeof form, v: string | number | null) => setForm(p => ({ ...p, [f]: v }));

  const save = () => {
    if (!form.opponent) return toast.error("Opponent is required");
    if (editId === "new") {
      setSection("games", [...data.games, { id: uid(), ...form }]);
      toast.success("Game added!");
    } else {
      setSection("games", data.games.map(g => g.id === editId ? { id: editId, ...form } : g));
      toast.success("Game updated!");
    }
    setEditId(null);
  };

  const del = (id: string) => {
    setSection("games", data.games.filter(g => g.id !== id));
    toast.success("Game deleted");
    if (editId === id) setEditId(null);
  };

  const sorted = [...data.games].sort((a, b) => new Date(b.date || 0).getTime() - new Date(a.date || 0).getTime());

  return (
    <div>
      <SectionHeader title="GAMES" onAdd={startAdd} />

      {editId === "new" && (
        <div className={CARD + " border-primary/30"}>
          <p className="text-xs text-primary uppercase tracking-widest mb-4 font-bold">New Game</p>
          <GameForm form={form} ch={ch} onSave={save} onCancel={cancel} />
        </div>
      )}

      {sorted.length === 0 && editId !== "new" && <p className="text-muted-foreground text-sm">No games yet. Click "Add New" to create one.</p>}

      {sorted.map(g => (
        <div key={g.id} className={CARD}>
          {editId === g.id ? (
            <>
              <p className="text-xs text-primary uppercase tracking-widest mb-4 font-bold">Editing Game</p>
              <GameForm form={form} ch={ch} onSave={save} onCancel={cancel} />
            </>
          ) : (
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-widest mb-0.5">{g.date || "No date"} · {g.homeAway}</p>
                <h3 className="text-white font-bold text-lg">vs. {g.opponent}</h3>
                <p className="text-sm text-muted-foreground mt-0.5">{g.location} {g.tournament && `· ${g.tournament}`}</p>
                {g.result && g.result !== "upcoming" && (
                  <span className={`mt-2 inline-block px-2 py-0.5 rounded text-xs font-bold ${g.result === "win" ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"}`}>
                    {g.result.toUpperCase()} {g.ourScore}–{g.theirScore}
                  </span>
                )}
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <button onClick={() => startEdit(g)} className="p-1.5 text-muted-foreground hover:text-primary transition-colors"><Pencil className="w-4 h-4" /></button>
                <DeleteBtn onClick={() => del(g.id)} />
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

function GameForm({ form, ch, onSave, onCancel }: { form: Omit<Game, "id">; ch: (f: keyof Omit<Game, "id">, v: string | number | null) => void; onSave: () => void; onCancel: () => void }) {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field label="Opponent *"><input className={INPUT} value={form.opponent} onChange={e => ch("opponent", e.target.value)} placeholder="Team name" /></Field>
        <Field label="Tournament / League"><input className={INPUT} value={form.tournament} onChange={e => ch("tournament", e.target.value)} placeholder="NJB, Top Ballers..." /></Field>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Field label="Date"><input className={INPUT} type="date" value={form.date} onChange={e => ch("date", e.target.value)} style={{ colorScheme: "dark" }} /></Field>
        <Field label="Time"><input className={INPUT} type="time" value={form.time} onChange={e => ch("time", e.target.value)} style={{ colorScheme: "dark" }} /></Field>
        <Field label="Home / Away">
          <select className={INPUT} value={form.homeAway} onChange={e => ch("homeAway", e.target.value)}>
            <option value="home">Home</option><option value="away">Away</option><option value="neutral">Neutral</option>
          </select>
        </Field>
      </div>
      <Field label="Location"><input className={INPUT} value={form.location} onChange={e => ch("location", e.target.value)} placeholder="Gym name, City" /></Field>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Field label="Result">
          <select className={INPUT} value={form.result ?? "upcoming"} onChange={e => ch("result", e.target.value === "upcoming" ? null : e.target.value)}>
            <option value="upcoming">Upcoming</option><option value="win">Win</option><option value="loss">Loss</option>
          </select>
        </Field>
        <Field label="Our Score"><input className={INPUT} type="number" value={form.ourScore ?? ""} onChange={e => ch("ourScore", e.target.value === "" ? null : Number(e.target.value))} placeholder="—" /></Field>
        <Field label="Their Score"><input className={INPUT} type="number" value={form.theirScore ?? ""} onChange={e => ch("theirScore", e.target.value === "" ? null : Number(e.target.value))} placeholder="—" /></Field>
      </div>
      <Field label="Notes"><textarea className={INPUT} rows={2} value={form.notes} onChange={e => ch("notes", e.target.value)} placeholder="Optional notes..." /></Field>
      <div className="flex gap-3 pt-2">
        <button onClick={onSave} className="flex items-center gap-2 px-4 py-2 bg-primary hover:bg-primary/80 rounded-lg text-white text-sm font-bold transition-colors"><Check className="w-4 h-4" /> Save</button>
        <button onClick={onCancel} className="px-4 py-2 text-muted-foreground hover:text-white text-sm transition-colors">Cancel</button>
      </div>
    </div>
  );
}

// ─── Tab: Roster ───────────────────────────────────────────────────────────────

const EMPTY_PLAYER: Omit<Player, "id"> = { jersey: 0, name: "", position: "", positionFull: "", grade: "" };

function RosterSection() {
  const { data, setSection } = useData();
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState<Omit<Player, "id">>(EMPTY_PLAYER);

  const startEdit = (p: Player) => { setEditId(p.id); setForm({ ...p }); };
  const startAdd = () => { setEditId("new"); setForm(EMPTY_PLAYER); };
  const cancel = () => setEditId(null);
  const ch = (f: keyof typeof form, v: string | number) => setForm(p => ({ ...p, [f]: v }));

  const save = () => {
    if (!form.name) return toast.error("Name is required");
    if (editId === "new") {
      const updated = [...data.players, { id: uid(), ...form }].sort((a, b) => a.jersey - b.jersey);
      setSection("players", updated);
      toast.success("Player added!");
    } else {
      const updated = data.players.map(p => p.id === editId ? { id: editId, ...form } : p).sort((a, b) => a.jersey - b.jersey);
      setSection("players", updated);
      toast.success("Player updated!");
    }
    setEditId(null);
  };

  const del = (id: string) => {
    setSection("players", data.players.filter(p => p.id !== id));
    toast.success("Player removed");
    if (editId === id) setEditId(null);
  };

  const sorted = [...data.players].sort((a, b) => a.jersey - b.jersey);

  return (
    <div>
      <SectionHeader title="ROSTER" onAdd={startAdd} />

      {editId === "new" && (
        <div className={CARD + " border-primary/30"}>
          <p className="text-xs text-primary uppercase tracking-widest mb-4 font-bold">New Player</p>
          <PlayerForm form={form} ch={ch} onSave={save} onCancel={cancel} />
        </div>
      )}

      {sorted.map(p => (
        <div key={p.id} className={CARD}>
          {editId === p.id ? (
            <>
              <p className="text-xs text-primary uppercase tracking-widest mb-4 font-bold">Editing Player</p>
              <PlayerForm form={form} ch={ch} onSave={save} onCancel={cancel} />
            </>
          ) : (
            <div className="flex items-center justify-between gap-4">
              <div>
                <span className="font-display text-2xl text-primary mr-3">#{p.jersey}</span>
                <span className="text-white font-bold">{p.name}</span>
                <span className="text-muted-foreground text-sm ml-2">· {p.position} · {p.grade}</span>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={() => startEdit(p)} className="p-1.5 text-muted-foreground hover:text-primary transition-colors"><Pencil className="w-4 h-4" /></button>
                <DeleteBtn onClick={() => del(p.id)} />
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

function PlayerForm({ form, ch, onSave, onCancel }: { form: Omit<Player, "id">; ch: (f: keyof Omit<Player, "id">, v: string | number) => void; onSave: () => void; onCancel: () => void }) {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <Field label="Jersey #"><input className={INPUT} type="number" value={form.jersey || ""} onChange={e => ch("jersey", Number(e.target.value))} placeholder="1" /></Field>
        <div className="col-span-3">
          <Field label="Full Name *"><input className={INPUT} value={form.name} onChange={e => ch("name", e.target.value)} placeholder="First Last" /></Field>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Field label="Position (short)"><input className={INPUT} value={form.position} onChange={e => ch("position", e.target.value)} placeholder="PG / SG" /></Field>
        <Field label="Position (full)"><input className={INPUT} value={form.positionFull} onChange={e => ch("positionFull", e.target.value)} placeholder="Point Guard / Shooting Guard" /></Field>
        <Field label="Grade">
          <select className={INPUT} value={form.grade} onChange={e => ch("grade", e.target.value)}>
            <option value="">Select...</option>
            {["8th Grade","9th Grade","10th Grade","11th Grade","12th Grade"].map(g => <option key={g} value={g}>{g}</option>)}
          </select>
        </Field>
      </div>
      <div className="flex gap-3 pt-2">
        <button onClick={onSave} className="flex items-center gap-2 px-4 py-2 bg-primary hover:bg-primary/80 rounded-lg text-white text-sm font-bold transition-colors"><Check className="w-4 h-4" /> Save</button>
        <button onClick={onCancel} className="px-4 py-2 text-muted-foreground hover:text-white text-sm transition-colors">Cancel</button>
      </div>
    </div>
  );
}

// ─── Tab: Coaches ──────────────────────────────────────────────────────────────

const EMPTY_COACH: Omit<Coach, "id"> = { name: "", title: "", initials: "", bio: "", phone: "", email: "" };

function CoachesSection() {
  const { data, setSection } = useData();
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState<Omit<Coach, "id">>(EMPTY_COACH);

  const startEdit = (c: Coach) => { setEditId(c.id); setForm({ ...c }); };
  const startAdd = () => { setEditId("new"); setForm(EMPTY_COACH); };
  const cancel = () => setEditId(null);
  const ch = (f: keyof typeof form, v: string) => setForm(p => ({ ...p, [f]: v }));

  const save = () => {
    if (!form.name) return toast.error("Name is required");
    if (editId === "new") {
      setSection("coaches", [...data.coaches, { id: uid(), ...form }]);
      toast.success("Coach added!");
    } else {
      setSection("coaches", data.coaches.map(c => c.id === editId ? { id: editId, ...form } : c));
      toast.success("Coach updated!");
    }
    setEditId(null);
  };

  const del = (id: string) => {
    setSection("coaches", data.coaches.filter(c => c.id !== id));
    toast.success("Coach removed");
    if (editId === id) setEditId(null);
  };

  return (
    <div>
      <SectionHeader title="COACHES" onAdd={startAdd} />

      {editId === "new" && (
        <div className={CARD + " border-primary/30"}>
          <p className="text-xs text-primary uppercase tracking-widest mb-4 font-bold">New Coach</p>
          <CoachForm form={form} ch={ch} onSave={save} onCancel={cancel} />
        </div>
      )}

      {data.coaches.map(c => (
        <div key={c.id} className={CARD}>
          {editId === c.id ? (
            <>
              <p className="text-xs text-primary uppercase tracking-widest mb-4 font-bold">Editing Coach</p>
              <CoachForm form={form} ch={ch} onSave={save} onCancel={cancel} />
            </>
          ) : (
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="text-white font-bold text-lg">{c.name}</h3>
                <p className="text-primary text-sm mb-2">{c.title}</p>
                <p className="text-muted-foreground text-sm line-clamp-2">{c.bio}</p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <button onClick={() => startEdit(c)} className="p-1.5 text-muted-foreground hover:text-primary transition-colors"><Pencil className="w-4 h-4" /></button>
                <DeleteBtn onClick={() => del(c.id)} />
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

function CoachForm({ form, ch, onSave, onCancel }: { form: Omit<Coach, "id">; ch: (f: keyof Omit<Coach, "id">, v: string) => void; onSave: () => void; onCancel: () => void }) {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="sm:col-span-2"><Field label="Full Name *"><input className={INPUT} value={form.name} onChange={e => ch("name", e.target.value)} placeholder="Coach Name" /></Field></div>
        <Field label="Initials"><input className={INPUT} value={form.initials} onChange={e => ch("initials", e.target.value)} placeholder="SP" maxLength={3} /></Field>
      </div>
      <Field label="Title"><input className={INPUT} value={form.title} onChange={e => ch("title", e.target.value)} placeholder="Head Coach & Founder" /></Field>
      <Field label="Bio"><textarea className={INPUT} rows={5} value={form.bio} onChange={e => ch("bio", e.target.value)} placeholder="Coach biography..." /></Field>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field label="Phone"><input className={INPUT} value={form.phone || ""} onChange={e => ch("phone", e.target.value)} placeholder="714-555-1234" /></Field>
        <Field label="Email"><input className={INPUT} value={form.email || ""} onChange={e => ch("email", e.target.value)} placeholder="email@example.com" /></Field>
      </div>
      <div className="flex gap-3 pt-2">
        <button onClick={onSave} className="flex items-center gap-2 px-4 py-2 bg-primary hover:bg-primary/80 rounded-lg text-white text-sm font-bold transition-colors"><Check className="w-4 h-4" /> Save</button>
        <button onClick={onCancel} className="px-4 py-2 text-muted-foreground hover:text-white text-sm transition-colors">Cancel</button>
      </div>
    </div>
  );
}

// ─── Tab: Gallery ──────────────────────────────────────────────────────────────

function GallerySection() {
  const { data, setSection } = useData();
  const [url, setUrl] = useState("");
  const [caption, setCaption] = useState("");
  const [editId, setEditId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<{ url: string; caption: string }>({ url: "", caption: "" });

  const add = () => {
    if (!url.trim()) return toast.error("Image URL is required");
    setSection("gallery", [...data.gallery, { id: uid(), url: url.trim(), caption: caption.trim() }]);
    setUrl(""); setCaption("");
    toast.success("Image added!");
  };

  const del = (id: string) => {
    setSection("gallery", data.gallery.filter(img => img.id !== id));
    toast.success("Image deleted");
    if (editId === id) setEditId(null);
  };

  const startEdit = (img: GalleryImage) => { setEditId(img.id); setEditForm({ url: img.url, caption: img.caption }); };

  const saveEdit = () => {
    setSection("gallery", data.gallery.map(img => img.id === editId ? { id: editId, url: editForm.url, caption: editForm.caption } : img));
    setEditId(null);
    toast.success("Image updated!");
  };

  return (
    <div>
      <h2 className="font-display text-2xl text-white tracking-wider mb-6 pb-4 border-b border-white/10">GALLERY</h2>

      {/* Add new */}
      <div className={CARD + " border-primary/20"}>
        <p className="text-xs text-primary uppercase tracking-widest mb-4 font-bold">Add Photo</p>
        <div className="space-y-3">
          <Field label="Image URL *"><input className={INPUT} value={url} onChange={e => setUrl(e.target.value)} placeholder="https://example.com/photo.jpg" /></Field>
          <Field label="Caption (optional)"><input className={INPUT} value={caption} onChange={e => setCaption(e.target.value)} placeholder="Game vs. rival — July 2026" /></Field>
          {url && <img src={url} alt="preview" className="h-24 rounded-lg object-cover border border-white/10" onError={e => (e.currentTarget.style.display = "none")} />}
          <button onClick={add} className="flex items-center gap-2 px-4 py-2 bg-primary hover:bg-primary/80 rounded-lg text-white text-sm font-bold transition-colors"><Plus className="w-4 h-4" /> Add Photo</button>
        </div>
      </div>

      {data.gallery.length === 0 && <p className="text-muted-foreground text-sm">No photos yet.</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {data.gallery.map(img => (
          <div key={img.id} className={CARD + " !p-4"}>
            {editId === img.id ? (
              <div className="space-y-3">
                <Field label="URL"><input className={INPUT} value={editForm.url} onChange={e => setEditForm(p => ({ ...p, url: e.target.value }))} /></Field>
                <Field label="Caption"><input className={INPUT} value={editForm.caption} onChange={e => setEditForm(p => ({ ...p, caption: e.target.value }))} /></Field>
                <div className="flex gap-2">
                  <button onClick={saveEdit} className="flex items-center gap-1 px-3 py-1.5 bg-primary rounded text-white text-xs font-bold"><Check className="w-3.5 h-3.5" /> Save</button>
                  <button onClick={() => setEditId(null)} className="px-3 py-1.5 text-muted-foreground text-xs hover:text-white">Cancel</button>
                </div>
              </div>
            ) : (
              <div className="flex gap-3">
                {img.url && <img src={img.url} alt={img.caption} className="w-20 h-16 object-cover rounded-lg border border-white/10 shrink-0" onError={e => (e.currentTarget.style.display = "none")} />}
                <div className="flex-1 min-w-0">
                  <p className="text-white text-sm font-medium truncate">{img.url}</p>
                  <p className="text-muted-foreground text-xs mt-0.5">{img.caption || "No caption"}</p>
                </div>
                <div className="flex gap-1 shrink-0">
                  <button onClick={() => startEdit(img)} className="p-1.5 text-muted-foreground hover:text-primary transition-colors"><Pencil className="w-3.5 h-3.5" /></button>
                  <DeleteBtn onClick={() => del(img.id)} />
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Tab: Journey (Timeline) ───────────────────────────────────────────────────

const EMPTY_TIMELINE: Omit<TimelineEntry, "id"> = { year: "", heading: "", body: "" };

function TimelineSection() {
  const { data, setSection } = useData();
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState<Omit<TimelineEntry, "id">>(EMPTY_TIMELINE);

  const startEdit = (t: TimelineEntry) => { setEditId(t.id); setForm({ ...t }); };
  const startAdd = () => { setEditId("new"); setForm(EMPTY_TIMELINE); };
  const cancel = () => setEditId(null);
  const ch = (f: keyof typeof form, v: string) => setForm(p => ({ ...p, [f]: v }));

  const save = () => {
    if (!form.year || !form.heading) return toast.error("Year and heading are required");
    if (editId === "new") {
      setSection("timeline", [...data.timeline, { id: uid(), ...form }]);
      toast.success("Timeline entry added!");
    } else {
      setSection("timeline", data.timeline.map(t => t.id === editId ? { id: editId, ...form } : t));
      toast.success("Timeline entry updated!");
    }
    setEditId(null);
  };

  const del = (id: string) => {
    setSection("timeline", data.timeline.filter(t => t.id !== id));
    toast.success("Entry deleted");
    if (editId === id) setEditId(null);
  };

  return (
    <div>
      <SectionHeader title="JOURNEY (TIMELINE)" onAdd={startAdd} />
      <p className="text-muted-foreground text-sm mb-6">These entries appear on the About page under "The Journey".</p>

      {editId === "new" && (
        <div className={CARD + " border-primary/30"}>
          <p className="text-xs text-primary uppercase tracking-widest mb-4 font-bold">New Entry</p>
          <TimelineForm form={form} ch={ch} onSave={save} onCancel={cancel} />
        </div>
      )}

      {data.timeline.map(t => (
        <div key={t.id} className={CARD}>
          {editId === t.id ? (
            <>
              <p className="text-xs text-primary uppercase tracking-widest mb-4 font-bold">Editing Entry</p>
              <TimelineForm form={form} ch={ch} onSave={save} onCancel={cancel} />
            </>
          ) : (
            <div className="flex items-start justify-between gap-4">
              <div>
                <span className="font-display text-3xl text-primary/60">{t.year}</span>
                <h3 className="text-white font-bold mb-1">{t.heading}</h3>
                <p className="text-muted-foreground text-sm line-clamp-2">{t.body}</p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <button onClick={() => startEdit(t)} className="p-1.5 text-muted-foreground hover:text-primary transition-colors"><Pencil className="w-4 h-4" /></button>
                <DeleteBtn onClick={() => del(t.id)} />
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

function TimelineForm({ form, ch, onSave, onCancel }: { form: Omit<TimelineEntry, "id">; ch: (f: keyof Omit<TimelineEntry, "id">, v: string) => void; onSave: () => void; onCancel: () => void }) {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Field label="Year *"><input className={INPUT} value={form.year} onChange={e => ch("year", e.target.value)} placeholder="2026" /></Field>
        <div className="sm:col-span-2"><Field label="Heading *"><input className={INPUT} value={form.heading} onChange={e => ch("heading", e.target.value)} placeholder="Milestone title" /></Field></div>
      </div>
      <Field label="Description"><textarea className={INPUT} rows={4} value={form.body} onChange={e => ch("body", e.target.value)} placeholder="What happened this year..." /></Field>
      <div className="flex gap-3 pt-2">
        <button onClick={onSave} className="flex items-center gap-2 px-4 py-2 bg-primary hover:bg-primary/80 rounded-lg text-white text-sm font-bold transition-colors"><Check className="w-4 h-4" /> Save</button>
        <button onClick={onCancel} className="px-4 py-2 text-muted-foreground hover:text-white text-sm transition-colors">Cancel</button>
      </div>
    </div>
  );
}

// ─── Tab: Schedule ─────────────────────────────────────────────────────────────

function ScheduleSection() {
  const { data, setSection } = useData();

  // Practices
  const [editPracticeId, setEditPracticeId] = useState<string | null>(null);
  const [practiceForm, setPracticeForm] = useState<Omit<Practice, "id">>({ day: "Monday", startTime: "5:00 PM", endTime: "7:00 PM", location: "Oak Middle School Gym, Los Alamitos, CA" });

  const startEditPractice = (p: Practice) => { setEditPracticeId(p.id); setPracticeForm({ ...p }); };
  const startAddPractice = () => { setEditPracticeId("new"); setPracticeForm({ day: "Monday", startTime: "5:00 PM", endTime: "7:00 PM", location: "Oak Middle School Gym, Los Alamitos, CA" }); };

  const savePractice = () => {
    if (editPracticeId === "new") {
      setSection("practices", [...data.practices, { id: uid(), ...practiceForm }]);
      toast.success("Practice added!");
    } else {
      setSection("practices", data.practices.map(p => p.id === editPracticeId ? { id: editPracticeId, ...practiceForm } : p));
      toast.success("Practice updated!");
    }
    setEditPracticeId(null);
  };

  const delPractice = (id: string) => {
    setSection("practices", data.practices.filter(p => p.id !== id));
    toast.success("Practice deleted");
    if (editPracticeId === id) setEditPracticeId(null);
  };

  // Tournaments
  const [editTournId, setEditTournId] = useState<string | null>(null);
  const [tournForm, setTournForm] = useState<Omit<Tournament, "id">>({ name: "", startDate: "", endDate: "", location: "", featured: false });

  const startEditTourn = (t: Tournament) => { setEditTournId(t.id); setTournForm({ ...t }); };
  const startAddTourn = () => { setEditTournId("new"); setTournForm({ name: "", startDate: "", endDate: "", location: "", featured: false }); };

  const saveTourn = () => {
    if (!tournForm.name) return toast.error("Tournament name is required");
    if (editTournId === "new") {
      setSection("tournaments", [...data.tournaments, { id: uid(), ...tournForm }]);
      toast.success("Tournament added!");
    } else {
      setSection("tournaments", data.tournaments.map(t => t.id === editTournId ? { id: editTournId, ...tournForm } : t));
      toast.success("Tournament updated!");
    }
    setEditTournId(null);
  };

  const delTourn = (id: string) => {
    setSection("tournaments", data.tournaments.filter(t => t.id !== id));
    toast.success("Tournament deleted");
    if (editTournId === id) setEditTournId(null);
  };

  const chP = (f: keyof Omit<Practice, "id">, v: string) => setPracticeForm(p => ({ ...p, [f]: v }));
  const chT = (f: keyof Omit<Tournament, "id">, v: string | boolean) => setTournForm(p => ({ ...p, [f]: v }));

  const days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

  return (
    <div className="space-y-12">
      {/* Practices */}
      <div>
        <SectionHeader title="PRACTICES" onAdd={startAddPractice} />

        {editPracticeId === "new" && (
          <div className={CARD + " border-primary/30"}>
            <p className="text-xs text-primary uppercase tracking-widest mb-4 font-bold">New Practice</p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-4">
              <Field label="Day">
                <select className={INPUT} value={practiceForm.day} onChange={e => chP("day", e.target.value)}>
                  {days.map(d => <option key={d} value={d}>{d}</option>)}
                </select>
              </Field>
              <Field label="Start Time"><input className={INPUT} value={practiceForm.startTime} onChange={e => chP("startTime", e.target.value)} placeholder="5:00 PM" /></Field>
              <Field label="End Time"><input className={INPUT} value={practiceForm.endTime} onChange={e => chP("endTime", e.target.value)} placeholder="7:00 PM" /></Field>
              <div className="col-span-2 sm:col-span-4"><Field label="Location"><input className={INPUT} value={practiceForm.location} onChange={e => chP("location", e.target.value)} placeholder="Gym name, City" /></Field></div>
            </div>
            <div className="flex gap-3">
              <button onClick={savePractice} className="flex items-center gap-2 px-4 py-2 bg-primary hover:bg-primary/80 rounded-lg text-white text-sm font-bold"><Check className="w-4 h-4" /> Save</button>
              <button onClick={() => setEditPracticeId(null)} className="px-4 py-2 text-muted-foreground text-sm hover:text-white">Cancel</button>
            </div>
          </div>
        )}

        {data.practices.map(p => (
          <div key={p.id} className={CARD}>
            {editPracticeId === p.id ? (
              <>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-4">
                  <Field label="Day">
                    <select className={INPUT} value={practiceForm.day} onChange={e => chP("day", e.target.value)}>
                      {days.map(d => <option key={d} value={d}>{d}</option>)}
                    </select>
                  </Field>
                  <Field label="Start"><input className={INPUT} value={practiceForm.startTime} onChange={e => chP("startTime", e.target.value)} /></Field>
                  <Field label="End"><input className={INPUT} value={practiceForm.endTime} onChange={e => chP("endTime", e.target.value)} /></Field>
                  <div className="col-span-2 sm:col-span-4"><Field label="Location"><input className={INPUT} value={practiceForm.location} onChange={e => chP("location", e.target.value)} /></Field></div>
                </div>
                <div className="flex gap-3">
                  <button onClick={savePractice} className="flex items-center gap-2 px-4 py-2 bg-primary hover:bg-primary/80 rounded-lg text-white text-sm font-bold"><Check className="w-4 h-4" /> Save</button>
                  <button onClick={() => setEditPracticeId(null)} className="px-4 py-2 text-muted-foreground text-sm hover:text-white">Cancel</button>
                </div>
              </>
            ) : (
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-primary font-bold">{p.day}</span>
                  <span className="text-white ml-3">{p.startTime} – {p.endTime}</span>
                  <p className="text-muted-foreground text-sm mt-0.5">{p.location}</p>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => startEditPractice(p)} className="p-1.5 text-muted-foreground hover:text-primary"><Pencil className="w-4 h-4" /></button>
                  <DeleteBtn onClick={() => delPractice(p.id)} />
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Tournaments */}
      <div>
        <SectionHeader title="TOURNAMENTS" onAdd={startAddTourn} />

        {editTournId === "new" && (
          <div className={CARD + " border-primary/30"}>
            <p className="text-xs text-primary uppercase tracking-widest mb-4 font-bold">New Tournament</p>
            <TournForm form={tournForm} ch={chT} onSave={saveTourn} onCancel={() => setEditTournId(null)} />
          </div>
        )}

        {data.tournaments.map(t => (
          <div key={t.id} className={CARD}>
            {editTournId === t.id ? (
              <>
                <p className="text-xs text-primary uppercase tracking-widest mb-4 font-bold">Editing Tournament</p>
                <TournForm form={tournForm} ch={chT} onSave={saveTourn} onCancel={() => setEditTournId(null)} />
              </>
            ) : (
              <div className="flex items-start justify-between gap-4">
                <div>
                  {t.featured && <span className="text-xs bg-primary/20 text-primary px-2 py-0.5 rounded font-bold uppercase tracking-wider mb-1 inline-block">Featured</span>}
                  <h3 className="text-white font-bold">{t.name}</h3>
                  <p className="text-muted-foreground text-sm">{t.startDate} – {t.endDate} · {t.location}</p>
                </div>
                <div className="flex gap-2 shrink-0">
                  <button onClick={() => startEditTourn(t)} className="p-1.5 text-muted-foreground hover:text-primary"><Pencil className="w-4 h-4" /></button>
                  <DeleteBtn onClick={() => delTourn(t.id)} />
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function TournForm({ form, ch, onSave, onCancel }: { form: Omit<Tournament, "id">; ch: (f: keyof Omit<Tournament, "id">, v: string | boolean) => void; onSave: () => void; onCancel: () => void }) {
  return (
    <div className="space-y-4">
      <Field label="Tournament Name *"><input className={INPUT} value={form.name} onChange={e => ch("name", e.target.value)} placeholder="Las Vegas Live..." /></Field>
      <div className="grid grid-cols-2 gap-4">
        <Field label="Start Date"><input className={INPUT} type="date" value={form.startDate} onChange={e => ch("startDate", e.target.value)} style={{ colorScheme: "dark" }} /></Field>
        <Field label="End Date"><input className={INPUT} type="date" value={form.endDate} onChange={e => ch("endDate", e.target.value)} style={{ colorScheme: "dark" }} /></Field>
      </div>
      <Field label="Location"><input className={INPUT} value={form.location} onChange={e => ch("location", e.target.value)} placeholder="City, State" /></Field>
      <label className="flex items-center gap-3 cursor-pointer">
        <input type="checkbox" checked={form.featured} onChange={e => ch("featured", e.target.checked)} className="w-4 h-4 accent-primary" />
        <span className="text-sm text-white">Mark as Featured Event (shows countdown on Schedule page)</span>
      </label>
      <div className="flex gap-3 pt-2">
        <button onClick={onSave} className="flex items-center gap-2 px-4 py-2 bg-primary hover:bg-primary/80 rounded-lg text-white text-sm font-bold"><Check className="w-4 h-4" /> Save</button>
        <button onClick={onCancel} className="px-4 py-2 text-muted-foreground hover:text-white text-sm">Cancel</button>
      </div>
    </div>
  );
}

// ─── Tab: Testimonials ─────────────────────────────────────────────────────────

const EMPTY_TESTIMONIAL: Omit<Testimonial, "id"> = { quote: "", author: "" };

function TestimonialsSection() {
  const { data, setSection } = useData();
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState<Omit<Testimonial, "id">>(EMPTY_TESTIMONIAL);

  const startEdit = (t: Testimonial) => { setEditId(t.id); setForm({ ...t }); };
  const startAdd = () => { setEditId("new"); setForm(EMPTY_TESTIMONIAL); };
  const cancel = () => setEditId(null);
  const ch = (f: keyof typeof form, v: string) => setForm(p => ({ ...p, [f]: v }));

  const save = () => {
    if (!form.quote) return toast.error("Quote is required");
    if (editId === "new") {
      setSection("testimonials", [...data.testimonials, { id: uid(), ...form }]);
      toast.success("Testimonial added!");
    } else {
      setSection("testimonials", data.testimonials.map(t => t.id === editId ? { id: editId, ...form } : t));
      toast.success("Testimonial updated!");
    }
    setEditId(null);
  };

  const del = (id: string) => {
    setSection("testimonials", data.testimonials.filter(t => t.id !== id));
    toast.success("Testimonial deleted");
    if (editId === id) setEditId(null);
  };

  return (
    <div>
      <SectionHeader title="TESTIMONIALS" onAdd={startAdd} />
      <p className="text-muted-foreground text-sm mb-6">These quotes appear on the home page.</p>

      {editId === "new" && (
        <div className={CARD + " border-primary/30"}>
          <p className="text-xs text-primary uppercase tracking-widest mb-4 font-bold">New Testimonial</p>
          <TestimonialForm form={form} ch={ch} onSave={save} onCancel={cancel} />
        </div>
      )}

      {data.testimonials.map(t => (
        <div key={t.id} className={CARD}>
          {editId === t.id ? (
            <>
              <p className="text-xs text-primary uppercase tracking-widest mb-4 font-bold">Editing Testimonial</p>
              <TestimonialForm form={form} ch={ch} onSave={save} onCancel={cancel} />
            </>
          ) : (
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-white text-sm italic line-clamp-2">"{t.quote}"</p>
                <p className="text-primary text-xs mt-1 font-medium">— {t.author}</p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <button onClick={() => startEdit(t)} className="p-1.5 text-muted-foreground hover:text-primary transition-colors"><Pencil className="w-4 h-4" /></button>
                <DeleteBtn onClick={() => del(t.id)} />
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

function TestimonialForm({ form, ch, onSave, onCancel }: { form: Omit<Testimonial, "id">; ch: (f: keyof Omit<Testimonial, "id">, v: string) => void; onSave: () => void; onCancel: () => void }) {
  return (
    <div className="space-y-4">
      <Field label="Quote *"><textarea className={INPUT} rows={3} value={form.quote} onChange={e => ch("quote", e.target.value)} placeholder="Parent's testimonial..." /></Field>
      <Field label="Attribution"><input className={INPUT} value={form.author} onChange={e => ch("author", e.target.value)} placeholder="Parent of an APEX Player" /></Field>
      <div className="flex gap-3 pt-2">
        <button onClick={onSave} className="flex items-center gap-2 px-4 py-2 bg-primary hover:bg-primary/80 rounded-lg text-white text-sm font-bold"><Check className="w-4 h-4" /> Save</button>
        <button onClick={onCancel} className="px-4 py-2 text-muted-foreground hover:text-white text-sm">Cancel</button>
      </div>
    </div>
  );
}

// ─── Main Admin Page ───────────────────────────────────────────────────────────

const TABS = [
  { id: "event",        label: "Featured Event" },
  { id: "games",        label: "Games" },
  { id: "roster",       label: "Roster" },
  { id: "coaches",      label: "Coaches" },
  { id: "gallery",      label: "Gallery" },
  { id: "journey",      label: "Journey" },
  { id: "schedule",     label: "Schedule" },
  { id: "testimonials", label: "Testimonials" },
] as const;

type TabId = typeof TABS[number]["id"];

export default function Admin() {
  const { isAuthenticated, logout } = useAuth();
  const [, setLocation] = useLocation();
  const [activeTab, setActiveTab] = useState<TabId>("event");
  const [mobileTabOpen, setMobileTabOpen] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) setLocation("/login");
  }, [isAuthenticated, setLocation]);

  if (!isAuthenticated) return null;

  const handleLogout = () => { logout(); setLocation("/"); };

  const activeLabel = TABS.find(t => t.id === activeTab)?.label;

  return (
    <PageTransition>
      <section className="min-h-screen py-28 px-4 relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-primary/8 blur-[150px] rounded-full pointer-events-none" />

        <div className="container mx-auto max-w-5xl relative z-10">
          {/* Header */}
          <div className="flex items-center justify-between mb-10">
            <div>
              <span className="font-display text-3xl text-primary tracking-wider">APEX</span>
              <span className="font-display text-3xl text-white tracking-wider ml-2">ADMIN</span>
              <p className="text-muted-foreground text-xs mt-1 uppercase tracking-widest">Welcome, Coach Patel</p>
            </div>
            <button onClick={handleLogout} className="text-sm text-muted-foreground hover:text-primary transition-colors uppercase tracking-widest font-medium" data-testid="button-logout">
              Log Out
            </button>
          </div>

          <div className="flex gap-8 items-start">
            {/* Sidebar tabs — desktop */}
            <nav className="hidden md:flex flex-col gap-1 w-48 shrink-0 sticky top-24">
              {TABS.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`text-left px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                    activeTab === tab.id
                      ? "bg-primary/20 text-primary border border-primary/30"
                      : "text-muted-foreground hover:text-white hover:bg-white/5"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>

            {/* Mobile tab selector */}
            <div className="md:hidden w-full mb-6">
              <button
                onClick={() => setMobileTabOpen(p => !p)}
                className="w-full flex items-center justify-between px-4 py-3 bg-card border border-white/10 rounded-xl text-white text-sm font-medium"
              >
                {activeLabel} <ChevronDown className={`w-4 h-4 transition-transform ${mobileTabOpen ? "rotate-180" : ""}`} />
              </button>
              {mobileTabOpen && (
                <div className="mt-1 bg-card border border-white/10 rounded-xl overflow-hidden">
                  {TABS.map(tab => (
                    <button
                      key={tab.id}
                      onClick={() => { setActiveTab(tab.id); setMobileTabOpen(false); }}
                      className={`w-full text-left px-4 py-2.5 text-sm transition-colors ${activeTab === tab.id ? "text-primary bg-primary/10" : "text-muted-foreground hover:text-white hover:bg-white/5"}`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0 bg-card border border-white/10 rounded-2xl p-6 md:p-8">
              {activeTab === "event"        && <EventSection />}
              {activeTab === "games"        && <GamesSection />}
              {activeTab === "roster"       && <RosterSection />}
              {activeTab === "coaches"      && <CoachesSection />}
              {activeTab === "gallery"      && <GallerySection />}
              {activeTab === "journey"      && <TimelineSection />}
              {activeTab === "schedule"     && <ScheduleSection />}
              {activeTab === "testimonials" && <TestimonialsSection />}
            </div>
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
