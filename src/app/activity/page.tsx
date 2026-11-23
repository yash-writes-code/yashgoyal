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

function getTodayString() {
  return new Date().toLocaleDateString("en-CA"); // "YYYY-MM-DD" in local time
}

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
  const [searchDate,    setSearchDate   ] = useState(getTodayString);
  const [dailyTotals,   setDailyTotals  ] = useState<DailyTotal[]>([]);
  const [categoryTotals,setCategoryTotals] = useState<CategoryTotal[]>([]);
  const [entries,       setEntries      ] = useState<Entry[]>([]);
  const [loading,       setLoading      ] = useState(true);
  const [error,         setError        ] = useState<string | null>(null);

  const todayStr = getTodayString();
  const isViewingToday = mode === "range" || searchDate === todayStr;
  const activeDisplayDate = mode === "date" ? searchDate : todayStr;

  /* ── fetch range data (line chart over range, activity/categories for today) ── */
  const fetchRange = useCallback(async (r: Range) => {
    setLoading(true); setError(null);
    try {
      const today = getTodayString();
      const res = await fetch(`/api/activity/entries?range=${r}&targetDate=${today}`);
      if (!res.ok) throw new Error(await res.text());
      const data = await res.json();
      setDailyTotals(data.dailyTotals ?? []);
      setCategoryTotals(data.categoryTotals ?? []);
      setEntries(data.entries ?? []);
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
      setEntries(data.entries ?? []);
      setCategoryTotals(data.categoryTotals ?? []);
      setDailyTotals([]);
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
    rawDate: d.date,
    hours: parseFloat(d.total_hours),
  }));

  const maxChartHours = chartData.reduce((max, d) => Math.max(max, d.hours), 0);
  const yAxisMax = Math.max(4, Math.ceil(maxChartHours));
  const yStep = yAxisMax <= 10 ? 1 : yAxisMax <= 20 ? 2 : Math.ceil(yAxisMax / 8);
  const yTicks: number[] = [];
  for (let i = 0; i <= yAxisMax; i += yStep) {
    yTicks.push(i);
  }
  if (yTicks[yTicks.length - 1] < yAxisMax) {
    yTicks.push(yAxisMax);
  }

  const pieData = categoryTotals.map(c => ({
    name: c.name, value: parseFloat(c.total_hours), color: c.color,
  }));

  const dayTotalHours = entries.reduce((s, e) => s + parseFloat(e.productive_hours), 0);
  const rangeTotalHours = dailyTotals.reduce((s, d) => s + parseFloat(d.total_hours), 0);

  return (
    <div className="dot-bg" style={{ minHeight: "100vh" }}>
      {/* Nav */}
      <nav className="page-header-strip" style={{ position: "sticky", top: 0, zIndex: 10 }}>
        <div className="nav-scroll-container" style={{ maxWidth: 900, margin: "0 auto", padding: "0 16px" }}>
          <Link href="/" className="font-pixel" style={{ fontSize: 10, color: "var(--accent)", marginRight: 12, textDecoration: "none", flexShrink: 0 }}>YG</Link>
          {navLinks.map(l => (
            <Link key={l.href} href={l.href} className="nav-pixel-link"
              style={{
                flexShrink: 0,
                ...(l.href === "/activity" ? { color: "var(--accent)", borderColor: "var(--accent)" } : {})
              }}>
              {l.label}
            </Link>
          ))}
        </div>
      </nav>

      <main style={{ maxWidth: 900, margin: "0 auto", padding: "24px 16px 48px" }}>
        {/* Header */}
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", flexWrap: "wrap", gap: 16, marginBottom: 20 }}>
          <div>
            <h1 className="font-pixel" style={{ fontSize: 16, color: "var(--text)", marginBottom: 8 }}>📊 Activity Log</h1>
            <p style={{ fontSize: 13, color: "var(--text-muted)" }}>
              Productivity trend and daily work logs.
            </p>
          </div>
          <Link href="/activity/admin" style={{
            fontFamily: "'Press Start 2P',monospace", fontSize: 8, padding: "8px 14px",
            border: "2px solid var(--border-dark)", background: "var(--bg-card)",
            color: "var(--text-muted)", textDecoration: "none", boxShadow: "3px 3px 0 var(--border-dark)",
          }}>+ ADD ENTRY</Link>
        </div>

        {/* ── Filter bar ── */}
        <div style={{ display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap", marginBottom: 20 }}>
          {/* Range pills */}
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
            {RANGE_OPTIONS.map(opt => (
              <button key={opt.value}
                onClick={() => { setMode("range"); setRange(opt.value); setSearchDate(getTodayString()); }}
                className="font-pixel"
                style={{
                  fontSize: 8, padding: "7px 10px",
                  border: "2px solid var(--border-dark)",
                  background: mode === "range" && range === opt.value ? "var(--accent)" : "var(--bg-card)",
                  color:      mode === "range" && range === opt.value ? "#111" : "var(--text-muted)",
                  cursor: "pointer",
                  boxShadow:  mode === "range" && range === opt.value ? "none" : "2px 2px 0 var(--border-dark)",
                  transition: "all 0.1s",
                }}>
                {opt.label}
              </button>
            ))}
          </div>

          {/* Date picker */}
          <div style={{ display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap" }}>
            <label className="font-pixel" style={{ fontSize: 8, color: mode === "date" ? "var(--accent)" : "var(--text-muted)" }}>
              📅 DATE
            </label>
            <input
              type="date"
              value={searchDate}
              onChange={e => { setSearchDate(e.target.value); setMode("date"); }}
              style={{
                padding: "5px 8px",
                border: `2px solid ${mode === "date" ? "var(--accent)" : "var(--border-dark)"}`,
                background: mode === "date" ? "#fffbf0" : "var(--bg-card)",
                color: "var(--text)", fontSize: 12, outline: "none", cursor: "pointer",
                boxShadow: mode === "date" ? "2px 2px 0 var(--accent)" : "2px 2px 0 var(--border-dark)",
                maxWidth: 145,
              }}
            />
            {mode === "date" && (
              <button
                onClick={() => { setMode("range"); setSearchDate(getTodayString()); }}
                className="font-pixel"
                style={{
                  fontSize: 7, padding: "5px 7px", border: "2px solid var(--border-dark)",
                  background: "var(--bg-card)", color: "var(--text-muted)", cursor: "pointer"
                }}>
                ✕ BACK TO TODAY
              </button>
            )}
          </div>

          {/* Stats summary */}
          {!loading && (
            <span style={{ fontSize: 12, color: "var(--text-muted)", marginLeft: "auto" }}>
              {mode === "range" ? (
                <>
                  <strong style={{ color: "var(--accent)" }}>{rangeTotalHours.toFixed(1)}h</strong> in {range === "week" ? "last week" : range === "2weeks" ? "last 2 weeks" : "last month"}
                  {" · "}
                  <strong style={{ color: "var(--accent2)" }}>{dayTotalHours.toFixed(1)}h</strong> today
                </>
              ) : (
                <>
                  <strong style={{ color: "var(--accent)" }}>{dayTotalHours.toFixed(1)}h</strong> on {formatDate(searchDate)}
                </>
              )}
            </span>
          )}
        </div>

        {error && (
          <div style={{ padding: "12px 16px", border: "2px solid #e85a3a", background: "#fff5f0", color: "#c0392b", fontSize: 13, marginBottom: 24 }}>
            Error: {error}
          </div>
        )}

        {loading ? (
          <div style={{ textAlign: "center", padding: "60px 0", color: "var(--text-muted)", fontSize: 13 }}>
            <span className="blink">Loading…</span>
          </div>
        ) : (
          <>
            {/* ── Single date header when inspecting a specific date ── */}
            {mode === "date" && (
              <div style={{
                marginBottom: 20, padding: "10px 16px", background: "var(--bg-card2)",
                border: "2px solid var(--border-dark)", borderLeft: "4px solid var(--accent)",
                display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 8
              }}>
                <div>
                  <span className="font-pixel" style={{ fontSize: 10, color: "var(--accent)" }}>
                    {formatDateFull(searchDate)}
                  </span>
                  <span style={{ fontSize: 12, color: "var(--text-muted)", marginLeft: 10 }}>
                    ({dayTotalHours.toFixed(1)} hours logged)
                  </span>
                </div>
                <button
                  onClick={() => { setMode("range"); setSearchDate(getTodayString()); }}
                  className="font-pixel"
                  style={{ fontSize: 7, color: "var(--text-muted)", background: "none", border: "none", cursor: "pointer", textDecoration: "underline" }}
                >
                  ← return to today
                </button>
              </div>
            )}

            {/* ── Line Chart (range mode) ── */}
            {mode === "range" && (
              <div className="anime-card" style={{ padding: "20px 16px", marginBottom: 24 }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
                  <h2 className="font-pixel" style={{ fontSize: 9, color: "var(--text-muted)" }}>
                    PRODUCTIVE HOURS / DAY
                  </h2>
                  <span style={{ fontSize: 11, color: "var(--text-light)" }}>
                    click any point to view that day
                  </span>
                </div>

                {chartData.length === 0 ? (
                  <div style={{ textAlign: "center", padding: "32px 0", color: "var(--text-light)", fontSize: 13 }}>
                    No data for this period yet.
                  </div>
                ) : (
                  <ResponsiveContainer width="100%" height={220}>
                    <LineChart
                      data={chartData}
                      margin={{ top: 8, right: 12, bottom: 4, left: -10 }}
                      // eslint-disable-next-line @typescript-eslint/no-explicit-any
                      onClick={(state: any) => {
                        const rawDate = state?.activePayload?.[0]?.payload?.rawDate;
                        if (rawDate) {
                          setSearchDate(rawDate);
                          setMode("date");
                        }
                      }}
                      style={{ cursor: "pointer" }}
                    >
                      <CartesianGrid strokeDasharray="4 4" stroke="var(--border)" />
                      <XAxis dataKey="date" tick={{ fontSize: 9, fill: "var(--text-muted)" }} minTickGap={8} />
                      <YAxis
                        domain={[0, yAxisMax]}
                        ticks={yTicks}
                        interval={0}
                        allowDecimals={false}
                        tickFormatter={(v) => `${v}h`}
                        tick={{ fontSize: 10, fill: "var(--text-muted)" }}
                        width={36}
                      />
                      <Tooltip
                        contentStyle={{ background: "var(--bg-card)", border: "2px solid var(--border-dark)", borderRadius: 0, fontSize: 12 }}
                        formatter={(v) => [`${v}h`, "Hours"]}
                      />
                      <Line
                        type="monotone"
                        dataKey="hours"
                        stroke="var(--accent)"
                        strokeWidth={2.5}
                        dot={{ fill: "var(--accent)", r: 4, strokeWidth: 0 }}
                        activeDot={{ r: 6 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                )}
              </div>
            )}

            {/* ── Today's / Picked Day's Activity + Pie Chart ── */}
            <div className="activity-split-grid">
              {/* Pie Chart: categories for this day */}
              <div className="anime-card" style={{ padding: "20px 16px" }}>
                <h2 className="font-pixel" style={{ fontSize: 9, color: "var(--text-muted)", marginBottom: 16 }}>
                  {isViewingToday ? "TODAY'S CATEGORIES" : `CATEGORIES (${formatDate(activeDisplayDate)})`}
                </h2>
                {pieData.length === 0 ? (
                  <div style={{ textAlign: "center", padding: "32px 0", color: "var(--text-light)", fontSize: 13 }}>
                    No category data for {isViewingToday ? "today" : formatDate(activeDisplayDate)}.
                  </div>
                ) : (
                  <ResponsiveContainer width="100%" height={220}>
                    <PieChart>
                      <Pie
                        data={pieData}
                        cx="50%"
                        cy="50%"
                        innerRadius={45}
                        outerRadius={72}
                        dataKey="value"
                        paddingAngle={2}
                      >
                        {pieData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                      </Pie>
                      <Tooltip
                        contentStyle={{ background: "var(--bg-card)", border: "2px solid var(--border-dark)", borderRadius: 0, fontSize: 12 }}
                        formatter={(v) => [`${Number(v).toFixed(1)}h`, "Hours"]}
                      />
                      <Legend iconSize={10} wrapperStyle={{ fontSize: 11 }} />
                    </PieChart>
                  </ResponsiveContainer>
                )}
              </div>

              {/* Activity list: activities for this day only */}
              <div className="anime-card" style={{ padding: "20px 16px" }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
                  <h2 className="font-pixel" style={{ fontSize: 9, color: "var(--text-muted)" }}>
                    {isViewingToday ? "WHAT I DID TODAY" : `WHAT I DID (${formatDate(activeDisplayDate)})`}
                  </h2>
                  {entries.length > 0 && (
                    <span className="font-pixel" style={{ fontSize: 9, color: "var(--accent)" }}>
                      {dayTotalHours.toFixed(1)}h
                    </span>
                  )}
                </div>

                {entries.length === 0 ? (
                  <div style={{ textAlign: "center", padding: "32px 12px" }}>
                    <p style={{ fontSize: 13, color: "var(--text-muted)", marginBottom: 14 }}>
                      {isViewingToday
                        ? "No activities logged for today yet."
                        : `No activities logged on ${formatDateFull(activeDisplayDate)}.`}
                    </p>
                    <Link
                      href="/activity/admin"
                      className="font-pixel"
                      style={{
                        fontSize: 8,
                        padding: "8px 12px",
                        background: "var(--accent)",
                        color: "#111",
                        textDecoration: "none",
                        display: "inline-block",
                        boxShadow: "2px 2px 0 var(--border-dark)",
                      }}
                    >
                      + LOG ACTIVITY
                    </Link>
                  </div>
                ) : (
                  <div style={{ maxHeight: 300, overflowY: "auto", display: "flex", flexDirection: "column", gap: 8 }}>
                    {entries.map(e => (
                      <div
                        key={e.id}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 10,
                          padding: "8px 12px",
                          background: "var(--bg-card2)",
                          borderLeft: `4px solid ${e.category_color}`,
                        }}
                      >
                        <span style={{ fontSize: 14, color: "var(--text)", flex: 1, fontWeight: 500 }}>
                          {e.activity}
                        </span>
                        <span style={{ fontSize: 12, color: e.category_color, fontWeight: 700, whiteSpace: "nowrap" }}>
                          {e.category}
                        </span>
                        <span style={{ fontSize: 12, color: "var(--text-muted)", whiteSpace: "nowrap", fontWeight: 600 }}>
                          {e.productive_hours}h
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
}
