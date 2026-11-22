"use client";
import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend,
} from "recharts";

type Range = "week" | "2weeks" | "month";
type Mode  = "range" | "date";

interface DailyTotal   { date: string; total_hours: string; }
interface CategoryTotal { name: string; color: string; total_hours: string; }
interface Entry {
  id: number; date: string; productive_hours: string;
  activity: string; category: string; category_color: string;
}

const RANGE_OPTIONS: { label: string; value: Range }[] = [
  { label: "Last Week",    value: "week"   },
  { label: "Last 2 Weeks", value: "2weeks" },
  { label: "Last Month",   value: "month"  },
];

function formatDate(d: string) {
  const [, m, day] = d.split("-");
  const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  return `${months[Number(m) - 1]} ${Number(day)}`;
}

function formatDateFull(d: string) {
  const [y, m, day] = d.split("-");
  const months = ["January","February","March","April","May","June",
                  "July","August","September","October","November","December"];
  return `${months[Number(m)-1]} ${Number(day)}, ${y}`;
}

function groupByDate(entries: Entry[]) {
  const map = new Map<string, Entry[]>();
  for (const e of entries) {
    if (!map.has(e.date)) map.set(e.date, []);
    map.get(e.date)!.push(e);
  }
  return Array.from(map.entries()).sort((a, b) => b[0].localeCompare(a[0]));
}

const navLinks = [
  { label: "home",       href: "/"           },
  { label: "projects",   href: "/projects"   },
  { label: "experience", href: "/experience" },
  { label: "blogs",      href: "/blogs"      },
  { label: "activity",   href: "/activity"   },
];

export default function ActivityPage() {
  const [mode,          setMode         ] = useState<Mode>("range");
  const [range,         setRange        ] = useState<Range>("week");
  const [searchDate,    setSearchDate   ] = useState(() => new Date().toISOString().slice(0,10));
  const [dailyTotals,   setDailyTotals  ] = useState<DailyTotal[]>([]);
  const [categoryTotals,setCategoryTotals] = useState<CategoryTotal[]>([]);
  const [entries,       setEntries      ] = useState<Entry[]>([]);
  const [loading,       setLoading      ] = useState(true);
  const [error,         setError        ] = useState<string | null>(null);

  /* ── fetch range data ── */
  const fetchRange = useCallback(async (r: Range) => {
    setLoading(true); setError(null);
    try {
      const res = await fetch(`/api/activity/entries?range=${r}`);
      if (!res.ok) throw new Error(await res.text());
      const data = await res.json();
      setDailyTotals(data.dailyTotals);
      setCategoryTotals(data.categoryTotals);
      setEntries(data.entries);
    } catch (e) { setError(String(e)); }
    finally { setLoading(false); }
  }, []);

  /* ── fetch single-date data ── */
  const fetchDate = useCallback(async (d: string) => {
    setLoading(true); setError(null);
    try {
      const res = await fetch(`/api/activity/entries?date=${d}`);
      if (!res.ok) throw new Error(await res.text());
      const data = await res.json();
      setEntries(data.entries);
      setDailyTotals([]);
      setCategoryTotals([]);
    } catch (e) { setError(String(e)); }
    finally { setLoading(false); }
  }, []);

  useEffect(() => {
    if (mode === "range") fetchRange(range);
  }, [mode, range, fetchRange]);

  useEffect(() => {
    if (mode === "date") fetchDate(searchDate);
  }, [mode, searchDate, fetchDate]);

  const chartData = dailyTotals.map(d => ({
    date: formatDate(d.date),
    hours: parseFloat(d.total_hours),
  }));

  const pieData = categoryTotals.map(c => ({
    name: c.name, value: parseFloat(c.total_hours), color: c.color,
  }));

  /* for date mode: build a quick category summary from entries */
  const dateCatData = (() => {
    if (mode !== "date") return [];
    const map = new Map<string,{name:string;color:string;value:number}>();
    for (const e of entries) {
      const key = e.category;
      if (!map.has(key)) map.set(key,{name:e.category,color:e.category_color,value:0});
      map.get(key)!.value += parseFloat(e.productive_hours);
    }
    return Array.from(map.values());
  })();

  const activePie  = mode === "date" ? dateCatData : pieData;
  const grouped    = groupByDate(entries);
  const totalHours = (mode==="date"
    ? entries.reduce((s,e)=>s+parseFloat(e.productive_hours),0)
    : dailyTotals.reduce((s,d)=>s+parseFloat(d.total_hours),0));

  return (
    <div className="dot-bg" style={{ minHeight: "100vh" }}>
      {/* Nav */}
      <nav className="page-header-strip" style={{ position:"sticky", top:0, zIndex:10 }}>
        <div style={{ maxWidth:900, margin:"0 auto", padding:"0 24px", display:"flex", alignItems:"center", gap:4 }}>
          <Link href="/" className="font-pixel" style={{ fontSize:10, color:"var(--accent)", marginRight:16, textDecoration:"none" }}>YG</Link>
          {navLinks.map(l => (
            <Link key={l.href} href={l.href} className="nav-pixel-link"
              style={l.href==="/activity" ? {color:"var(--accent)",borderColor:"var(--accent)"} : {}}>
              {l.label}
            </Link>
          ))}
        </div>
      </nav>

      <main style={{ maxWidth:900, margin:"0 auto", padding:"32px 24px 48px" }}>
        {/* Header */}
        <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", flexWrap:"wrap", gap:16, marginBottom:24 }}>
          <div>
            <h1 className="font-pixel" style={{ fontSize:16, color:"var(--text)", marginBottom:8 }}>📊 Activity Log</h1>
            <p style={{ fontSize:13, color:"var(--text-muted)" }}>Tracking my productive hours and what I work on.</p>
          </div>
          <Link href="/activity/admin" style={{
            fontFamily:"'Press Start 2P',monospace", fontSize:8, padding:"8px 14px",
            border:"2px solid var(--border-dark)", background:"var(--bg-card)",
            color:"var(--text-muted)", textDecoration:"none", boxShadow:"3px 3px 0 var(--border-dark)",
          }}>+ ADD ENTRY</Link>
        </div>

        {/* ── filter bar ── */}
        <div style={{ display:"flex", gap:8, alignItems:"center", flexWrap:"wrap", marginBottom:24 }}>
          {/* range pills */}
          {RANGE_OPTIONS.map(opt => (
            <button key={opt.value}
              onClick={() => { setMode("range"); setRange(opt.value); }}
              className="font-pixel"
              style={{
                fontSize:8, padding:"7px 12px",
                border:"2px solid var(--border-dark)",
                background: mode==="range" && range===opt.value ? "var(--accent)" : "var(--bg-card)",
                color:      mode==="range" && range===opt.value ? "#111" : "var(--text-muted)",
                cursor:"pointer",
                boxShadow:  mode==="range" && range===opt.value ? "none" : "3px 3px 0 var(--border-dark)",
                transition:"all 0.1s",
              }}>
              {opt.label}
            </button>
          ))}

          {/* divider */}
          <div style={{ width:1, height:28, background:"var(--border-dark)", margin:"0 4px" }}/>

          {/* date picker */}
          <div style={{ display:"flex", alignItems:"center", gap:6 }}>
            <label className="font-pixel" style={{ fontSize:8, color: mode==="date" ? "var(--accent)" : "var(--text-muted)" }}>
              📅 DATE
            </label>
            <input
              type="date"
              value={searchDate}
              onChange={e => { setSearchDate(e.target.value); setMode("date"); }}
              onFocus={() => setMode("date")}
              style={{
                padding:"6px 10px",
                border:`2px solid ${mode==="date" ? "var(--accent)" : "var(--border-dark)"}`,
                background: mode==="date" ? "#fffbf0" : "var(--bg-card)",
                color:"var(--text)", fontSize:12, outline:"none", cursor:"pointer",
                boxShadow: mode==="date" ? "2px 2px 0 var(--accent)" : "2px 2px 0 var(--border-dark)",
              }}
            />
            {mode==="date" && (
              <button onClick={() => { setMode("range"); }}
                className="font-pixel"
                style={{ fontSize:7, padding:"6px 8px", border:"2px solid var(--border-dark)",
                  background:"var(--bg-card)", color:"var(--text-muted)", cursor:"pointer" }}>
                ✕ CLEAR
              </button>
            )}
          </div>

          {/* total */}
          {!loading && (
            <span style={{ marginLeft:"auto", fontSize:12, color:"var(--text-muted)", alignSelf:"center" }}>
              <strong style={{ color:"var(--accent)" }}>{totalHours.toFixed(1)}h</strong> total
              {mode==="date" && <span style={{color:"var(--text-light)"}}> on {formatDate(searchDate)}</span>}
            </span>
          )}
        </div>

        {error && (
          <div style={{ padding:"12px 16px", border:"2px solid #e85a3a", background:"#fff5f0", color:"#c0392b", fontSize:13, marginBottom:24 }}>
            Error: {error}
          </div>
        )}

        {loading ? (
          <div style={{ textAlign:"center", padding:"60px 0", color:"var(--text-muted)", fontSize:13 }}>
            <span className="blink">Loading…</span>
          </div>
        ) : (
          <>
            {/* ── date mode: single-day header ── */}
            {mode==="date" && (
              <div style={{ marginBottom:20, padding:"10px 16px", background:"var(--bg-card2)",
                border:"2px solid var(--border-dark)", borderLeft:"4px solid var(--accent)" }}>
                <span className="font-pixel" style={{ fontSize:10, color:"var(--accent)" }}>
                  {formatDateFull(searchDate)}
                </span>
                {entries.length===0 && (
                  <p style={{ fontSize:13, color:"var(--text-muted)", marginTop:6 }}>No entries logged for this date.</p>
                )}
              </div>
            )}

            {/* ── Line Chart (range mode only) ── */}
            {mode==="range" && (
              <div className="anime-card" style={{ padding:"20px 16px", marginBottom:24 }}>
                <h2 className="font-pixel" style={{ fontSize:9, color:"var(--text-muted)", marginBottom:16 }}>
                  PRODUCTIVE HOURS / DAY
                </h2>
                {chartData.length===0 ? (
                  <div style={{ textAlign:"center", padding:"32px 0", color:"var(--text-light)", fontSize:13 }}>
                    No data for this period yet.
                  </div>
                ) : (
                  <ResponsiveContainer width="100%" height={220}>
                    <LineChart data={chartData} margin={{ top:4, right:8, bottom:4, left:-20 }}>
                      <CartesianGrid strokeDasharray="4 4" stroke="var(--border)" />
                      <XAxis dataKey="date" tick={{ fontSize:10, fill:"var(--text-muted)" }} />
                      <YAxis tick={{ fontSize:10, fill:"var(--text-muted)" }} domain={[0,"auto"]} />
                      <Tooltip
                        contentStyle={{ background:"var(--bg-card)", border:"2px solid var(--border-dark)", borderRadius:0, fontSize:12 }}
                        formatter={(v) => [`${v}h`, "Hours"]}
                      />
                      <Line type="monotone" dataKey="hours" stroke="var(--accent)" strokeWidth={2.5}
                        dot={{ fill:"var(--accent)", r:4, strokeWidth:0 }} activeDot={{ r:6 }} />
                    </LineChart>
                  </ResponsiveContainer>
                )}
              </div>
            )}

            {/* ── Pie + List row ── */}
            {(activePie.length > 0 || entries.length > 0) && (
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1.4fr", gap:20, marginBottom:24, alignItems:"start" }}>
                {/* Pie */}
                <div className="anime-card" style={{ padding:"20px 16px" }}>
                  <h2 className="font-pixel" style={{ fontSize:9, color:"var(--text-muted)", marginBottom:16 }}>BY CATEGORY</h2>
                  {activePie.length===0 ? (
                    <div style={{ textAlign:"center", padding:"32px 0", color:"var(--text-light)", fontSize:13 }}>No data.</div>
                  ) : (
                    <ResponsiveContainer width="100%" height={220}>
                      <PieChart>
                        <Pie data={activePie} cx="50%" cy="50%" innerRadius={45} outerRadius={72}
                          dataKey="value" paddingAngle={2}>
                          {activePie.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                        </Pie>
                        <Tooltip
                          contentStyle={{ background:"var(--bg-card)", border:"2px solid var(--border-dark)", borderRadius:0, fontSize:12 }}
                          formatter={(v) => [`${Number(v).toFixed(1)}h`, "Hours"]}
                        />
                        <Legend iconSize={10} wrapperStyle={{ fontSize:11 }} />
                      </PieChart>
                    </ResponsiveContainer>
                  )}
                </div>

                {/* Activity list */}
                <div className="anime-card" style={{ padding:"20px 16px" }}>
                  <h2 className="font-pixel" style={{ fontSize:9, color:"var(--text-muted)", marginBottom:16 }}>WHAT I DID</h2>
                  {grouped.length===0 ? (
                    <div style={{ textAlign:"center", padding:"32px 0", color:"var(--text-light)", fontSize:13 }}>No entries yet.</div>
                  ) : (
                    <div style={{ maxHeight:300, overflowY:"auto", display:"flex", flexDirection:"column", gap:16 }}>
                      {grouped.map(([date, dayEntries]) => (
                        <div key={date}>
                          <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:6 }}>
                            <span className="font-pixel" style={{ fontSize:9, color:"var(--accent)" }}>{formatDate(date)}</span>
                            <span style={{ fontSize:13, color:"var(--text-light)" }}>
                              {dayEntries.reduce((s,e)=>s+parseFloat(e.productive_hours),0).toFixed(1)}h
                            </span>
                          </div>
                          <div style={{ display:"flex", flexDirection:"column", gap:5 }}>
                            {dayEntries.map(e => (
                              <div key={e.id} style={{
                                display:"flex", alignItems:"center", gap:8,
                                padding:"7px 12px", background:"var(--bg-card2)",
                                borderLeft:`3px solid ${e.category_color}`,
                              }}>
                                <span style={{ fontSize:14, color:"var(--text)", flex:1 }}>{e.activity}</span>
                                <span style={{ fontSize:12, color:e.category_color, fontWeight:700, whiteSpace:"nowrap" }}>{e.category}</span>
                                <span style={{ fontSize:12, color:"var(--text-light)", whiteSpace:"nowrap" }}>{e.productive_hours}h</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* empty state when date mode has no entries */}
            {mode==="date" && entries.length===0 && (
              <div style={{ textAlign:"center", padding:"40px 0", color:"var(--text-light)", fontSize:13 }}>
                Nothing logged on {formatDateFull(searchDate)} yet.
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
}
