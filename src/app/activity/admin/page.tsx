"use client";
import { useEffect, useState, useCallback } from "react";
import Link from "next/link";

/* ─── types ─────────────────────────────────────────────────── */
interface Category { id: number; name: string; color: string; }

interface DraftRow {
  id: string;
  activity: string;
  categoryId: number | "";
  hours: string;
}

interface SavedEntry {
  id: number;
  date: string;
  productive_hours: string;
  activity: string;
  category_id: number;
  category: string;
  category_color: string;
}

/* ─── module-level constants (safe, no re-creation) ─────────── */
const CATEGORY_COLORS = [
  "#e8603a","#3a9e5f","#3a7bd5","#e8a03a",
  "#9b59b6","#1abc9c","#e74c3c","#2a8a6e",
  "#f39c12","#16a085","#8e44ad","#2980b9",
];

function uid() { return Math.random().toString(36).slice(2); }
function today() { return new Date().toISOString().slice(0, 10); }

const navLinks = [
  { label:"home",       href:"/"           },
  { label:"projects",   href:"/projects"   },
  { label:"experience", href:"/experience" },
  { label:"blogs",      href:"/blogs"      },
  { label:"activity",   href:"/activity"   },
];

const IS = (extra?: React.CSSProperties): React.CSSProperties => ({
  width:"100%", padding:"8px 10px",
  border:"2px solid var(--border-dark)",
  background:"var(--bg-card2)", color:"var(--text)",
  fontSize:13, outline:"none", fontFamily:"inherit",
  ...extra,
});

/* ════════════════════════════════════════════════════════════ */
export default function AdminPage() {

  /* auth */
  const [authed,      setAuthed     ] = useState(false);
  const [password,    setPassword   ] = useState("");
  const [authError,   setAuthError  ] = useState("");
  const [authLoading, setAuthLoading] = useState(false);

  /* shared */
  const [categories,  setCategories ] = useState<Category[]>([]);
  const [newCatName,  setNewCatName ] = useState("");
  const [newCatColor, setNewCatColor] = useState(CATEGORY_COLORS[0]);
  const [showNewCat,  setShowNewCat ] = useState(false);

  /* ── ADD tab ── */
  const [addDate,   setAddDate  ] = useState(today);
  const [draftRows, setDraftRows] = useState<DraftRow[]>([
    { id: uid(), activity:"", categoryId:"", hours:"" },
  ]);
  const [addSaving, setAddSaving] = useState(false);
  const [addMsg,    setAddMsg   ] = useState<{type:"ok"|"err";text:string}|null>(null);

  /* ── EDIT tab ── */
  const [editDate,     setEditDate    ] = useState(today);
  const [savedEntries, setSavedEntries] = useState<SavedEntry[]>([]);
  const [editLoading,  setEditLoading ] = useState(false);
  const [editing,      setEditing     ] = useState<number|null>(null);
  const [editForm,     setEditForm    ] = useState<{activity:string;categoryId:number|"";hours:string}>({activity:"",categoryId:"",hours:""});
  const [editSaving,   setEditSaving  ] = useState(false);
  const [editMsg,      setEditMsg     ] = useState<{type:"ok"|"err";text:string}|null>(null);

  const [activeTab, setActiveTab] = useState<"add"|"edit">("add");

  /* inline-new on edit tab */
  const [inlineNew,     setInlineNew    ] = useState(false);
  const [inlineForm,    setInlineForm   ] = useState<{activity:string;categoryId:number|"";hours:string}>({activity:"",categoryId:"",hours:""});
  const [inlineSaving,  setInlineSaving ] = useState(false);

  /* ─── on mount: init db ─── */
  useEffect(() => { fetch("/api/activity/init").catch(()=>{}); }, []);

  /* ─── login ─── */
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault(); setAuthLoading(true); setAuthError("");
    try {
      const r = await fetch("/api/activity/admin/login",{
        method:"POST", headers:{"Content-Type":"application/json"},
        body:JSON.stringify({password}),
      });
      if (!r.ok) { const d=await r.json(); setAuthError(d.error||"Invalid password"); }
      else { setAuthed(true); loadCategories(); }
    } catch { setAuthError("Network error"); }
    finally { setAuthLoading(false); }
  };

  /* ─── categories ─── */
  const loadCategories = async () => {
    const r = await fetch("/api/activity/categories");
    const data = await r.json();
    setCategories(data);
    if (data.length > 0) {
      setDraftRows(prev => prev.map(row => row.categoryId==="" ? {...row, categoryId:data[0].id} : row));
    }
  };

  const handleAddCategory = async () => {
    if (!newCatName.trim()) return;
    const r = await fetch("/api/activity/categories",{
      method:"POST", headers:{"Content-Type":"application/json"},
      body:JSON.stringify({name:newCatName.trim(), color:newCatColor}),
    });
    const cat = await r.json();
    setCategories(prev => {
      const ex = prev.find(c=>c.id===cat.id);
      return ex ? prev.map(c=>c.id===cat.id?cat:c) : [...prev, cat];
    });
    setNewCatName(""); setShowNewCat(false);
  };

  /* ─── draft rows ─── */
  const addDraftRow = () =>
    setDraftRows(p => [...p, {id:uid(), activity:"", categoryId:categories[0]?.id??"", hours:""}]);

  const removeDraftRow = (id:string) =>
    setDraftRows(p => p.length===1 ? p : p.filter(r=>r.id!==id));

  const updateDraft = (id:string, field:keyof Omit<DraftRow,"id">, val:string|number) =>
    setDraftRows(p => p.map(r => r.id===id ? {...r,[field]:val} : r));

  /* ─── save all drafts ─── */
  const handleSaveAll = async () => {
    const valid = draftRows.filter(r => r.activity.trim() && r.categoryId!=="" && r.hours);
    if (!valid.length) { setAddMsg({type:"err",text:"Fill in at least one complete row."}); return; }
    setAddSaving(true); setAddMsg(null);
    try {
      const results = await Promise.all(valid.map(row =>
        fetch("/api/activity/entries",{
          method:"POST", headers:{"Content-Type":"application/json"},
          body:JSON.stringify({date:addDate, productiveHours:parseFloat(row.hours), activity:row.activity, categoryId:row.categoryId}),
        })
      ));
      if (results.some(r => !r.ok)) { setAddMsg({type:"err",text:"Some entries failed to save."}); }
      else {
        setAddMsg({type:"ok",text:`Saved ${valid.length} entr${valid.length>1?"ies":"y"}! 🎉`});
        setDraftRows([{id:uid(), activity:"", categoryId:categories[0]?.id??"", hours:""}]);
      }
    } catch { setAddMsg({type:"err",text:"Network error"}); }
    finally { setAddSaving(false); }
  };

  /* ─── load entries for edit date ─── */
  const loadEntriesForDate = useCallback(async (d:string) => {
    setEditLoading(true); setEditMsg(null); setEditing(null);
    try {
      const r = await fetch(`/api/activity/entries?date=${d}`);
      const data = await r.json();
      setSavedEntries(data.entries ?? []);
    } catch {}
    finally { setEditLoading(false); }
  }, []);

  useEffect(() => {
    if (authed) loadEntriesForDate(editDate);
  }, [authed, editDate, loadEntriesForDate]);

  const startEdit = (e:SavedEntry) => {
    setEditing(e.id);
    setEditForm({activity:e.activity, categoryId:e.category_id, hours:e.productive_hours});
    setEditMsg(null);
  };

  const saveEdit = async (id:number) => {
    setEditSaving(true); setEditMsg(null);
    try {
      const r = await fetch("/api/activity/entries",{
        method:"PATCH", headers:{"Content-Type":"application/json"},
        body:JSON.stringify({id, productiveHours:parseFloat(editForm.hours as string), activity:editForm.activity, categoryId:editForm.categoryId}),
      });
      if (!r.ok) { const d=await r.json(); setEditMsg({type:"err",text:d.error||"Failed"}); }
      else { setEditing(null); await loadEntriesForDate(editDate); setEditMsg({type:"ok",text:"Updated!"}); }
    } catch { setEditMsg({type:"err",text:"Network error"}); }
    finally { setEditSaving(false); }
  };

  const deleteEntry = async (id:number) => {
    if (!confirm("Delete this entry?")) return;
    await fetch("/api/activity/entries",{method:"DELETE",headers:{"Content-Type":"application/json"},body:JSON.stringify({id})});
    await loadEntriesForDate(editDate);
  };

  const saveInlineNew = async () => {
    if (!inlineForm.activity.trim()||!inlineForm.categoryId||!inlineForm.hours) return;
    setInlineSaving(true);
    await fetch("/api/activity/entries",{
      method:"POST", headers:{"Content-Type":"application/json"},
      body:JSON.stringify({date:editDate, productiveHours:parseFloat(inlineForm.hours), activity:inlineForm.activity, categoryId:inlineForm.categoryId}),
    });
    setInlineNew(false);
    setInlineForm({activity:"",categoryId:categories[0]?.id??"",hours:""});
    setInlineSaving(false);
    await loadEntriesForDate(editDate);
  };

  /* ══════════════════════════════════════════════════════════
      RENDER HELPERS — plain JSX, NOT inner components,
      so React never unmounts/remounts their DOM nodes.
  ══════════════════════════════════════════════════════════ */

  const navJSX = (
    <nav className="page-header-strip" style={{position:"sticky",top:0,zIndex:10}}>
      <div style={{maxWidth:900,margin:"0 auto",padding:"0 24px",display:"flex",alignItems:"center",gap:4}}>
        <Link href="/" className="font-pixel" style={{fontSize:10,color:"var(--accent)",marginRight:16,textDecoration:"none"}}>YG</Link>
        {navLinks.map(l=>(
          <Link key={l.href} href={l.href} className="nav-pixel-link">{l.label}</Link>
        ))}
      </div>
    </nav>
  );

  /* category chips row */
  const catChips = (
    <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
      {categories.map(c=>(
        <span key={c.id} style={{padding:"3px 10px",border:`2px solid ${c.color}`,color:c.color,fontSize:11,fontWeight:700}}>{c.name}</span>
      ))}
    </div>
  );

  /* new-category row (input + colors + ADD button) */
  const newCatRow = showNewCat ? (
    <div style={{display:"flex",gap:8,alignItems:"center",marginBottom:8}}>
      <input
        type="text"
        value={newCatName}
        onChange={e => setNewCatName(e.target.value)}
        onKeyDown={e => { if (e.key==="Enter") { e.preventDefault(); handleAddCategory(); } }}
        placeholder="Category name"
        style={IS({flex:"1" as unknown as number})}
      />
      <div style={{display:"flex",gap:3,flexWrap:"wrap",width:88}}>
        {CATEGORY_COLORS.map(c=>(
          <button key={c} type="button" onClick={()=>setNewCatColor(c)}
            style={{width:18,height:18,background:c,border:`2px solid ${newCatColor===c?"#111":"transparent"}`,cursor:"pointer",padding:0}}/>
        ))}
      </div>
      <button type="button" onClick={handleAddCategory} className="font-pixel"
        style={{fontSize:7,padding:"8px 10px",background:"var(--accent)",border:"none",color:"#111",cursor:"pointer"}}>ADD</button>
    </div>
  ) : null;

  /* full category panel (header + new row + chips) */
  const catPanel = (
    <div style={{marginTop:12}}>
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:8}}>
        <span className="font-pixel" style={{fontSize:8,color:"var(--text-muted)"}}>CATEGORIES</span>
        <button type="button" onClick={()=>setShowNewCat(v=>!v)} className="font-pixel"
          style={{fontSize:7,color:"var(--accent)",background:"none",border:"none",cursor:"pointer"}}>
          {showNewCat?"CANCEL":"+ NEW"}
        </button>
      </div>
      {newCatRow}
      {catChips}
    </div>
  );

  /* category selector (chip buttons to pick one) */
  const makeCatSelector = (value:number|"", onChange:(id:number)=>void) => (
    <div style={{display:"flex",gap:4,flexWrap:"wrap"}}>
      {categories.map(c=>(
        <button key={c.id} type="button" onClick={()=>onChange(c.id)}
          style={{
            padding:"4px 10px", border:`2px solid ${c.color}`,
            background: value===c.id ? c.color : "transparent",
            color: value===c.id ? "#fff" : c.color,
            fontSize:11, fontWeight:700, cursor:"pointer", transition:"all 0.1s",
          }}>{c.name}</button>
      ))}
    </div>
  );

  /* ════════════════════════════════════════════
      LOGIN SCREEN
  ════════════════════════════════════════════ */
  if (!authed) return (
    <div className="dot-bg" style={{minHeight:"100vh"}}>
      {navJSX}
      <div style={{display:"flex",alignItems:"center",justifyContent:"center",minHeight:"calc(100vh - 60px)"}}>
        <form onSubmit={handleLogin} className="anime-card" style={{padding:"32px 36px",width:"100%",maxWidth:360}}>
          <h1 className="font-pixel" style={{fontSize:12,color:"var(--text)",marginBottom:8,textAlign:"center"}}>🔒 ADMIN</h1>
          <p style={{fontSize:12,color:"var(--text-muted)",textAlign:"center",marginBottom:24}}>Activity Log Admin</p>
          <label className="font-pixel" style={{fontSize:8,color:"var(--text-muted)",display:"block",marginBottom:6}}>PASSWORD</label>
          <input type="password" value={password} onChange={e=>setPassword(e.target.value)} autoFocus style={IS({marginBottom:16})}/>
          {authError && <p style={{fontSize:12,color:"#e74c3c",marginBottom:12}}>{authError}</p>}
          <button type="submit" disabled={authLoading} className="font-pixel"
            style={{width:"100%",padding:"10px",background:"var(--accent)",border:"none",color:"#111",fontSize:9,cursor:"pointer",boxShadow:"3px 3px 0 #b87a1a"}}>
            {authLoading?"...":"ENTER"}
          </button>
        </form>
      </div>
    </div>
  );

  /* ════════════════════════════════════════════
      AUTHENTICATED VIEW
  ════════════════════════════════════════════ */
  return (
    <div className="dot-bg" style={{minHeight:"100vh"}}>
      {navJSX}
      <main style={{maxWidth:720,margin:"0 auto",padding:"28px 24px 48px"}}>

        {/* header */}
        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:24}}>
          <div>
            <h1 className="font-pixel" style={{fontSize:13,color:"var(--text)",marginBottom:5}}>✏️ ACTIVITY ADMIN</h1>
            <p style={{fontSize:12,color:"var(--text-muted)"}}>Log and manage your daily activities</p>
          </div>
          <Link href="/activity" className="font-pixel" style={{fontSize:8,color:"var(--accent)",textDecoration:"none"}}>← VIEW LOG</Link>
        </div>

        {/* tabs */}
        <div style={{display:"flex",gap:0,marginBottom:24,borderBottom:"2px solid var(--border-dark)"}}>
          {(["add","edit"] as const).map(tab=>(
            <button key={tab} onClick={()=>setActiveTab(tab)} className="font-pixel"
              style={{
                fontSize:8, padding:"9px 18px", border:"none", cursor:"pointer",
                background: activeTab===tab ? "var(--bg-card)" : "transparent",
                color: activeTab===tab ? "var(--accent)" : "var(--text-muted)",
                borderBottom: activeTab===tab ? "3px solid var(--accent)" : "3px solid transparent",
                marginBottom:"-2px",
              }}>
              {tab==="add" ? "➕ ADD ENTRIES" : "🗓️ VIEW / EDIT"}
            </button>
          ))}
        </div>

        {/* ───────── ADD TAB ───────── */}
        {activeTab==="add" && (
          <div className="anime-card" style={{padding:"24px 20px"}}>
            {/* date */}
            <div style={{marginBottom:20}}>
              <label className="font-pixel" style={{fontSize:8,color:"var(--text-muted)",display:"block",marginBottom:5}}>DATE</label>
              <input type="date" value={addDate} onChange={e=>setAddDate(e.target.value)} style={IS({maxWidth:220})}/>
            </div>

            {/* product-list table */}
            <div style={{marginBottom:16}}>
              <div style={{display:"grid",gridTemplateColumns:"1fr 160px 72px 32px",gap:6,marginBottom:6,paddingBottom:4,borderBottom:"1px solid var(--border)"}}>
                {["ACTIVITY","CATEGORY","HRS",""].map(h=>(
                  <span key={h} className="font-pixel" style={{fontSize:7,color:"var(--text-light)"}}>{h}</span>
                ))}
              </div>
              <div style={{display:"flex",flexDirection:"column",gap:6}}>
                {draftRows.map((row,i)=>(
                  <div key={row.id} style={{display:"grid",gridTemplateColumns:"1fr 160px 72px 32px",gap:6,alignItems:"start"}}>
                    <input
                      type="text"
                      value={row.activity}
                      onChange={e=>updateDraft(row.id,"activity",e.target.value)}
                      placeholder={`Activity ${i+1}`}
                      style={IS()}
                    />
                    <select
                      value={row.categoryId}
                      onChange={e=>updateDraft(row.id,"categoryId",Number(e.target.value))}
                      style={IS()}
                    >
                      <option value="">— pick —</option>
                      {categories.map(c=><option key={c.id} value={c.id}>{c.name}</option>)}
                    </select>
                    <input
                      type="number" min="0" max="24" step="0.5"
                      value={row.hours}
                      onChange={e=>updateDraft(row.id,"hours",e.target.value)}
                      placeholder="0.5"
                      style={IS({textAlign:"center"})}
                    />
                    <button type="button" onClick={()=>removeDraftRow(row.id)} title="Remove"
                      style={{height:36,background:"none",border:"2px solid var(--border-dark)",color:"#e74c3c",cursor:"pointer",fontSize:14,display:"flex",alignItems:"center",justifyContent:"center"}}>
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <button type="button" onClick={addDraftRow}
              style={{width:"100%",padding:"7px",border:"2px dashed var(--border-dark)",background:"transparent",color:"var(--text-muted)",fontSize:12,cursor:"pointer",marginBottom:12}}>
              + add another activity
            </button>

            {catPanel}

            {addMsg && (
              <div style={{marginTop:14,padding:"9px 12px",border:`2px solid ${addMsg.type==="ok"?"var(--accent2)":"#e74c3c"}`,
                background:addMsg.type==="ok"?"#f0fff4":"#fff5f0",color:addMsg.type==="ok"?"#2d8a4e":"#c0392b",fontSize:13}}>
                {addMsg.text}
              </div>
            )}

            <button type="button" onClick={handleSaveAll} disabled={addSaving} className="font-pixel"
              style={{width:"100%",marginTop:16,padding:"11px",background:"var(--accent)",border:"none",color:"#111",fontSize:9,
                cursor:addSaving?"not-allowed":"pointer",boxShadow:"3px 3px 0 #b87a1a",opacity:addSaving?0.7:1}}>
              {addSaving ? "SAVING..." : "SAVE ALL ENTRIES"}
            </button>
          </div>
        )}

        {/* ───────── EDIT TAB ───────── */}
        {activeTab==="edit" && (
          <div>
            {/* date picker card */}
            <div className="anime-card" style={{padding:"16px 20px",marginBottom:16,display:"flex",alignItems:"center",gap:16}}>
              <div style={{flex:1}}>
                <label className="font-pixel" style={{fontSize:8,color:"var(--text-muted)",display:"block",marginBottom:5}}>PICK DATE</label>
                <input type="date" value={editDate} onChange={e=>setEditDate(e.target.value)} style={IS({maxWidth:220})}/>
              </div>
              <div className="font-pixel" style={{fontSize:8,color:"var(--text-muted)",textAlign:"right",paddingTop:14}}>
                {savedEntries.length} entr{savedEntries.length===1?"y":"ies"}
              </div>
            </div>

            {editMsg && (
              <div style={{marginBottom:12,padding:"9px 12px",border:`2px solid ${editMsg.type==="ok"?"var(--accent2)":"#e74c3c"}`,
                background:editMsg.type==="ok"?"#f0fff4":"#fff5f0",color:editMsg.type==="ok"?"#2d8a4e":"#c0392b",fontSize:13}}>
                {editMsg.text}
              </div>
            )}

            <div className="anime-card" style={{padding:"16px 20px"}}>
              {editLoading ? (
                <div style={{textAlign:"center",padding:"24px 0",color:"var(--text-muted)",fontSize:13}}>
                  <span className="blink">Loading…</span>
                </div>
              ) : savedEntries.length===0 ? (
                <p style={{color:"var(--text-muted)",fontSize:13,textAlign:"center",padding:"20px 0"}}>No entries for this date.</p>
              ) : (
                <div style={{display:"flex",flexDirection:"column",gap:0}}>
                  {savedEntries.map((entry,i)=>(
                    <div key={entry.id} style={{borderBottom:i<savedEntries.length-1?"1px solid var(--border)":"none",padding:"10px 0"}}>
                      {editing===entry.id ? (
                        /* inline edit form */
                        <div style={{display:"flex",flexDirection:"column",gap:8}}>
                          <div style={{display:"grid",gridTemplateColumns:"1fr 72px",gap:8}}>
                            <input type="text" value={editForm.activity}
                              onChange={e=>setEditForm(f=>({...f,activity:e.target.value}))}
                              style={IS()}/>
                            <input type="number" min="0" max="24" step="0.5" value={editForm.hours}
                              onChange={e=>setEditForm(f=>({...f,hours:e.target.value}))}
                              style={IS({textAlign:"center"})}/>
                          </div>
                          {makeCatSelector(editForm.categoryId, id=>setEditForm(f=>({...f,categoryId:id})))}
                          <div style={{display:"flex",gap:8}}>
                            <button onClick={()=>saveEdit(entry.id)} disabled={editSaving} className="font-pixel"
                              style={{padding:"6px 14px",background:"var(--accent)",border:"none",color:"#111",fontSize:8,cursor:"pointer"}}>
                              {editSaving?"…":"SAVE"}
                            </button>
                            <button onClick={()=>setEditing(null)} className="font-pixel"
                              style={{padding:"6px 14px",background:"none",border:"2px solid var(--border-dark)",color:"var(--text-muted)",fontSize:8,cursor:"pointer"}}>
                              CANCEL
                            </button>
                          </div>
                        </div>
                      ) : (
                        /* read row */
                        <div style={{display:"flex",alignItems:"center",gap:10}}>
                          <div style={{width:4,height:36,background:entry.category_color,flexShrink:0}}/>
                          <div style={{flex:1,minWidth:0}}>
                            <div style={{fontSize:13,color:"var(--text)",fontWeight:600,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>
                              {entry.activity}
                            </div>
                            <div style={{fontSize:11,color:entry.category_color,fontWeight:700}}>{entry.category}</div>
                          </div>
                          <span style={{fontSize:12,color:"var(--text-muted)",whiteSpace:"nowrap",flexShrink:0}}>{entry.productive_hours}h</span>
                          <button onClick={()=>startEdit(entry)} title="Edit"
                            style={{background:"none",border:"2px solid var(--border-dark)",width:30,height:30,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                            </svg>
                          </button>
                          <button onClick={()=>deleteEntry(entry.id)} title="Delete"
                            style={{background:"none",border:"2px solid #e74c3c",width:30,height:30,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#e74c3c" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                              <polyline points="3 6 5 6 21 6"/>
                              <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/>
                              <path d="M10 11v6M14 11v6"/>
                              <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/>
                            </svg>
                          </button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {/* inline new entry */}
              {!editLoading && (
                <div style={{marginTop:12,paddingTop:12,borderTop:"1px dashed var(--border-dark)"}}>
                  {!inlineNew ? (
                    <button onClick={()=>{setInlineNew(true);setInlineForm({activity:"",categoryId:categories[0]?.id??"",hours:""});}}
                      style={{width:"100%",padding:"7px",border:"2px dashed var(--border-dark)",background:"transparent",color:"var(--text-muted)",fontSize:12,cursor:"pointer"}}>
                      + add activity for this date
                    </button>
                  ) : (
                    <div style={{display:"flex",flexDirection:"column",gap:8}}>
                      <div style={{display:"grid",gridTemplateColumns:"1fr 72px",gap:8}}>
                        <input type="text" value={inlineForm.activity}
                          onChange={e=>setInlineForm(f=>({...f,activity:e.target.value}))}
                          placeholder="Activity name" style={IS()}/>
                        <input type="number" min="0" max="24" step="0.5"
                          value={inlineForm.hours}
                          onChange={e=>setInlineForm(f=>({...f,hours:e.target.value}))}
                          placeholder="hrs" style={IS({textAlign:"center"})}/>
                      </div>
                      {makeCatSelector(inlineForm.categoryId, id=>setInlineForm(f=>({...f,categoryId:id})))}
                      <div style={{display:"flex",gap:8}}>
                        <button onClick={saveInlineNew} disabled={inlineSaving} className="font-pixel"
                          style={{padding:"6px 14px",background:"var(--accent2)",border:"none",color:"#fff",fontSize:8,cursor:"pointer"}}>
                          {inlineSaving?"…":"ADD"}
                        </button>
                        <button onClick={()=>setInlineNew(false)} className="font-pixel"
                          style={{padding:"6px 14px",background:"none",border:"2px solid var(--border-dark)",color:"var(--text-muted)",fontSize:8,cursor:"pointer"}}>
                          CANCEL
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* category panel */}
            <div className="anime-card" style={{padding:"16px 20px",marginTop:16}}>
              {catPanel}
            </div>
          </div>
        )}

      </main>
    </div>
  );
}
