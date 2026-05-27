"use client";

import { useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://gbqzlssieytbqhacmatd.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdicXpsc3NpZXl0YnFoYWNtYXRkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzk0NDgyOTYsImV4cCI6MjA5NTAyNDI5Nn0.4TCBJrer1sjF2YW3jYPfb-f1siF1SH1fqVFDI9cr0Aw"
);

const THEMES = [
  "Professional courage","Moral leadership","Ethical reflection",
  "Dealing with pressure","Integrity in practice","Team dialogue",
  "Psychological safety","Professional responsibility",
];

const s: Record<string, React.CSSProperties> = {
  page: { minHeight: "100vh", background: "#fafaf9", fontFamily: "Georgia, serif", color: "#1e293b" },
  hero: { background: "linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #134e4a 100%)", color: "white", padding: "80px 24px" },
  heroInner: { maxWidth: 900, margin: "0 auto" },
  eyebrow: { fontSize: 12, letterSpacing: "0.25em", textTransform: "uppercase" as const, color: "#99f6e4", marginBottom: 20, fontFamily: "Arial, sans-serif" },
  h1: { fontSize: "clamp(2rem, 5vw, 3.5rem)", lineHeight: 1.2, marginBottom: 24, fontWeight: 400 },
  heroText: { fontSize: 18, lineHeight: 1.8, color: "#cbd5e1", marginBottom: 32, fontFamily: "Arial, sans-serif" },
  tags: { display: "flex", flexWrap: "wrap" as const, gap: 10 },
  tag: { padding: "6px 16px", borderRadius: 999, border: "1px solid rgba(255,255,255,0.2)", background: "rgba(255,255,255,0.08)", fontSize: 13, fontFamily: "Arial, sans-serif" },
  section: { maxWidth: 900, margin: "0 auto", padding: "60px 24px" },
  cards: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 24, marginBottom: 48 },
  card: { background: "white", borderRadius: 24, border: "1px solid #e7e5e4", padding: 32 },
  cardLabel: { fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase" as const, marginBottom: 8, fontFamily: "Arial, sans-serif", fontWeight: 600 },
  cardTitle: { fontSize: 22, marginBottom: 12, fontWeight: 400 },
  cardText: { fontSize: 15, lineHeight: 1.8, color: "#64748b", fontFamily: "Arial, sans-serif" },
  formWrap: { background: "white", borderRadius: 32, border: "1px solid #e7e5e4", overflow: "hidden" },
  formHeader: { padding: "32px", borderBottom: "1px solid #f5f5f4", background: "#fafaf9" },
  formTitle: { fontSize: 28, fontWeight: 400, marginBottom: 8 },
  formSubtitle: { fontSize: 15, color: "#64748b", lineHeight: 1.8, fontFamily: "Arial, sans-serif" },
  formBody: { padding: 32 },
  sectionLabel: { fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase" as const, fontWeight: 600, marginBottom: 16, fontFamily: "Arial, sans-serif" },
  fieldBlock: { marginBottom: 24 },
  label: { display: "block", marginBottom: 8, fontWeight: 500, fontSize: 15, fontFamily: "Arial, sans-serif" },
  input: { width: "100%", borderRadius: 16, border: "1px solid #d6d3d1", padding: "14px 18px", fontSize: 15, fontFamily: "Arial, sans-serif", outline: "none", boxSizing: "border-box" as const },
  textarea: { width: "100%", borderRadius: 16, border: "1px solid #d6d3d1", padding: "14px 18px", fontSize: 15, fontFamily: "Arial, sans-serif", outline: "none", resize: "vertical" as const, boxSizing: "border-box" as const },
  select: { width: "100%", maxWidth: 360, borderRadius: 16, border: "1px solid #d6d3d1", padding: "14px 18px", fontSize: 15, fontFamily: "Arial, sans-serif", outline: "none", background: "white" },
  grid2: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16 },
  checkLabel: { display: "flex", alignItems: "center", gap: 12, border: "1px solid #e7e5e4", borderRadius: 16, padding: "14px 18px", cursor: "pointer", fontFamily: "Arial, sans-serif", fontSize: 15, transition: "border-color 0.2s" },
  checkLabelActive: { display: "flex", alignItems: "center", gap: 12, border: "2px solid #0d9488", borderRadius: 16, padding: "14px 18px", cursor: "pointer", fontFamily: "Arial, sans-serif", fontSize: 15, background: "#f0fdfa" },
  divider: { borderTop: "1px solid #f5f5f4", paddingTop: 32, marginTop: 32, display: "flex", flexWrap: "wrap" as const, alignItems: "center", justifyContent: "space-between", gap: 24 },
  footnote: { maxWidth: 520, fontSize: 15, color: "#64748b", lineHeight: 1.8, fontFamily: "Arial, sans-serif" },
  btn: { padding: "16px 32px", borderRadius: 16, background: "#0f172a", color: "white", border: "none", fontSize: 16, fontFamily: "Arial, sans-serif", cursor: "pointer", minWidth: 180 },
  btnDisabled: { padding: "16px 32px", borderRadius: 16, background: "#94a3b8", color: "white", border: "none", fontSize: 16, fontFamily: "Arial, sans-serif", cursor: "not-allowed", minWidth: 180 },
  error: { background: "#fef2f2", border: "1px solid #fecaca", borderRadius: 16, padding: "14px 18px", color: "#dc2626", fontFamily: "Arial, sans-serif", fontSize: 15, marginBottom: 16 },
  successPage: { minHeight: "100vh", background: "#fafaf9", display: "flex", alignItems: "center", justifyContent: "center" },
  successBox: { maxWidth: 480, textAlign: "center" as const, padding: 40 },
  successIcon: { width: 72, height: 72, borderRadius: "50%", background: "#ccfbf1", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 32px", fontSize: 32 },
  successTitle: { fontSize: 36, fontWeight: 400, marginBottom: 16 },
  successText: { fontSize: 17, lineHeight: 1.8, color: "#64748b", fontFamily: "Arial, sans-serif" },
  spacer: { height: 48 },
  spacerSm: { height: 24 },
};

export default function Page() {
  const [form, setForm] = useState({
    name: "", institution: "", moral_tension: "", resilience: "",
    dilemma: "", themes: [] as string[], hopes: "", language: "English",
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleCheckbox = (theme: string) => {
    setForm(prev => ({
      ...prev,
      themes: prev.themes.includes(theme)
        ? prev.themes.filter(t => t !== theme)
        : [...prev.themes, theme],
    }));
  };

  const handleSubmit = async () => {
    setError("");
    if (!form.name.trim()) { setError("Please enter your name before submitting."); return; }
    setLoading(true);
    const { error: err } = await supabase.from("heroes_responses").insert([{
      name: form.name,
      institution: form.institution,
      language: form.language,
      answers: {
        moral_tension: form.moral_tension,
        resilience: form.resilience,
        dilemma: form.dilemma,
        themes: form.themes,
        hopes: form.hopes,
      },
    }]);
    setLoading(false);
    if (err) setError("Something went wrong: " + err.message);
    else setSubmitted(true);
  };

  if (submitted) return (
    <div style={s.successPage}>
      <div style={s.successBox}>
        <div style={s.successIcon}>✓</div>
        <h2 style={s.successTitle}>Thank you!</h2>
        <p style={s.successText}>Your reflection has been received. Your input will help shape the HEROES programme.</p>
      </div>
    </div>
  );

  return (
    <div style={s.page}>
      {/* Hero */}
      <div style={s.hero}>
        <div style={s.heroInner}>
          <div style={s.eyebrow}>Moral Craftsmanship · HEROES Project</div>
          <h1 style={s.h1}>Help shape the <em style={{ color: "#5eead4" }}>three-day programme</em></h1>
          <p style={s.heroText}>Your experience, questions, dilemmas, and reflections are an essential part of this journey. This page invites you to contribute themes and perspectives from your daily professional practice.</p>
          <div style={s.tags}>
            {["Reflection", "Moral Awareness", "Professional Courage", "Daily Practice"].map(t => (
              <span key={t} style={s.tag}>{t}</span>
            ))}
          </div>
        </div>
      </div>

      {/* Body */}
      <div style={s.section}>
        {/* Cards */}
        <div style={s.cards}>
          {[
            { color: "#0d9488", label: "Reflect", title: "Daily practice", text: "Reflect on situations where values, pressure, responsibility, or professional judgement play an important role." },
            { color: "#b45309", label: "Contribute", title: "Share experiences", text: "Bring forward dilemmas, questions, tensions, and examples that deserve collective reflection." },
            { color: "#475569", label: "Shape", title: "Build together", text: "Your input helps shape the themes, dialogues, and practical focus of the three-day programme." },
          ].map(c => (
            <div key={c.title} style={s.card}>
              <div style={{ ...s.cardLabel, color: c.color }}>{c.label}</div>
              <div style={s.cardTitle}>{c.title}</div>
              <div style={s.cardText}>{c.text}</div>
            </div>
          ))}
        </div>

        {/* Form */}
        <div style={s.formWrap}>
          <div style={s.formHeader}>
            <div style={s.formTitle}>Participant Reflection Form</div>
            <div style={s.formSubtitle}>There are no right or wrong answers. We invite you to answer openly and from your own professional experience.</div>
          </div>

          <div style={s.formBody}>
            {/* 01 */}
            <div style={{ ...s.sectionLabel, color: "#0d9488" }}>01 · About your practice</div>
            <div style={s.grid2}>
              <div style={s.fieldBlock}>
                <label style={s.label}>Name <span style={{ color: "#dc2626" }}>*</span></label>
                <input name="name" value={form.name} onChange={handleChange} style={s.input} placeholder="Your name" />
              </div>
              <div style={s.fieldBlock}>
                <label style={s.label}>Organisation / Role</label>
                <input name="institution" value={form.institution} onChange={handleChange} style={s.input} placeholder="Your role or organisation" />
              </div>
            </div>

            <div style={s.spacer} />

            {/* 02 */}
            <div style={{ ...s.sectionLabel, color: "#0d9488" }}>02 · Moral tension in practice</div>
            <div style={s.fieldBlock}>
              <label style={s.label}>In your daily work, where do you experience moral pressure or tension?</label>
              <textarea name="moral_tension" value={form.moral_tension} onChange={handleChange} style={s.textarea} rows={5} placeholder="Describe situations, challenges, or recurring tensions from practice..." />
            </div>
            <div style={s.fieldBlock}>
              <label style={s.label}>What helps professionals remain resilient and ethically grounded under pressure?</label>
              <textarea name="resilience" value={form.resilience} onChange={handleChange} style={s.textarea} rows={4} placeholder="Share experiences, values, practices, or examples..." />
            </div>

            <div style={s.spacer} />

            {/* 03 */}
            <div style={{ ...s.sectionLabel, color: "#b45309" }}>03 · Dilemmas and questions</div>
            <div style={s.fieldBlock}>
              <label style={s.label}>Share a dilemma, question, or situation that deserves reflection during the programme.</label>
              <textarea name="dilemma" value={form.dilemma} onChange={handleChange} style={s.textarea} rows={6} placeholder="You may describe a real-life situation anonymously..." />
            </div>
            <div style={s.fieldBlock}>
              <label style={s.label}>Which themes should definitely be addressed during the three days?</label>
              <div style={s.grid2}>
                {THEMES.map(theme => (
                  <label key={theme} style={form.themes.includes(theme) ? s.checkLabelActive : s.checkLabel}>
                    <input type="checkbox" checked={form.themes.includes(theme)} onChange={() => handleCheckbox(theme)} style={{ width: 18, height: 18 }} />
                    {theme}
                  </label>
                ))}
              </div>
            </div>

            <div style={s.spacer} />

            {/* 04 */}
            <div style={{ ...s.sectionLabel, color: "#475569" }}>04 · Looking ahead</div>
            <div style={s.fieldBlock}>
              <label style={s.label}>What do you hope to take away from this programme?</label>
              <textarea name="hopes" value={form.hopes} onChange={handleChange} style={s.textarea} rows={5} placeholder="Describe your hopes, learning goals, or expectations..." />
            </div>
            <div style={s.fieldBlock}>
              <label style={s.label}>Preferred language</label>
              <select name="language" value={form.language} onChange={handleChange} style={s.select}>
                <option>English</option>
                <option>Dutch</option>
                <option>German</option>
                <option>French</option>
                <option>Spanish</option>
                <option>Other</option>
              </select>
            </div>

            {error && <div style={s.error}>{error}</div>}

            <div style={s.divider}>
              <div style={s.footnote}>Thank you for contributing to this collective reflection process. Your input helps create a meaningful and practice-oriented learning environment.</div>
              <button onClick={handleSubmit} disabled={loading} style={loading ? s.btnDisabled : s.btn}>
                {loading ? "Sending..." : "Submit Reflection"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
