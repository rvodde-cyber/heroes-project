"use client";

import { useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://gbqzlssieytbqhacmatd.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdicXpsc3NpZXl0YnFoYWNtYXRkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzk0NDgyOTYsImV4cCI6MjA5NTAyNDI5Nn0.4TCBJrer1sjF2YW3jYPfb-f1siF1SH1fqVFDI9cr0Aw"
);

const THEMES = [
  "Professional courage",
  "Moral leadership",
  "Ethical reflection",
  "Dealing with pressure",
  "Integrity in practice",
  "Team dialogue",
  "Psychological safety",
  "Professional responsibility",
];

export default function MoralCraftsmanshipInputPage() {
  const [form, setForm] = useState({
    name: "",
    institution: "",
    moral_tension: "",
    resilience: "",
    dilemma: "",
    themes: [] as string[],
    hopes: "",
    language: "English",
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleCheckbox = (theme: string) => {
    setForm((prev) => ({
      ...prev,
      themes: prev.themes.includes(theme)
        ? prev.themes.filter((t) => t !== theme)
        : [...prev.themes, theme],
    }));
  };

  const handleSubmit = async () => {
    setError("");

    if (!form.name.trim()) {
      setError("Please enter your name before submitting.");
      return;
    }

    setLoading(true);

    const { error: supabaseError } = await supabase
      .from("heroes_responses")
      .insert([
        {
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
        },
      ]);

    setLoading(false);

    if (supabaseError) {
      setError("Something went wrong. Please try again. (" + supabaseError.message + ")");
    } else {
      setSubmitted(true);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-stone-50 text-slate-800 font-sans flex items-center justify-center">
        <div className="max-w-xl text-center px-6">
          <div className="w-20 h-20 rounded-full bg-teal-100 flex items-center justify-center mx-auto mb-8">
            <svg className="w-10 h-10 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-4xl font-serif mb-4">Thank you!</h2>
          <p className="text-slate-600 leading-8 text-lg">
            Your reflection has been received. Your input will help shape the HEROES programme.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-50 text-slate-800 font-sans">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-teal-900 text-white">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-teal-400 blur-3xl"></div>
          <div className="absolute bottom-0 left-20 w-80 h-80 rounded-full bg-amber-300 blur-3xl"></div>
        </div>
        <div className="relative max-w-5xl mx-auto px-6 py-24">
          <div className="max-w-3xl">
            <div className="uppercase tracking-[0.3em] text-sm text-teal-200 mb-6 font-medium">
              Moral Craftsmanship · HEROES Project
            </div>
            <h1 className="text-5xl md:text-6xl leading-tight font-serif mb-8">
              Help shape the
              <span className="italic text-teal-300"> three-day programme</span>
            </h1>
            <p className="text-xl leading-9 text-slate-200 mb-10">
              Your experience, questions, dilemmas, and reflections are an essential part of this journey.
              This page invites you to contribute themes and perspectives from your daily professional practice.
            </p>
            <div className="flex flex-wrap gap-4 text-sm">
              {["Reflection", "Moral Awareness", "Professional Courage", "Daily Practice"].map((tag) => (
                <div key={tag} className="px-4 py-2 rounded-full bg-white/10 border border-white/20">{tag}</div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Cards */}
      <section className="max-w-5xl mx-auto px-6 py-20">
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {[
            { color: "teal", label: "Reflect", title: "Daily practice", text: "Reflect on situations where values, pressure, responsibility, or professional judgement play an important role." },
            { color: "amber", label: "Contribute", title: "Share experiences", text: "Bring forward dilemmas, questions, tensions, and examples that deserve collective reflection." },
            { color: "slate", label: "Shape", title: "Build together", text: "Your input helps shape the themes, dialogues, and practical focus of the three-day programme." },
          ].map(({ color, label, title, text }) => (
            <div key={title} className="bg-white rounded-3xl shadow-sm border border-stone-200 p-8">
              <div className={`text-sm uppercase tracking-[0.2em] text-${color}-700 mb-3 font-semibold`}>{label}</div>
              <h3 className="text-2xl font-serif mb-4">{title}</h3>
              <p className="leading-8 text-slate-600">{text}</p>
            </div>
          ))}
        </div>

        {/* Form */}
        <div className="bg-white rounded-[2rem] border border-stone-200 shadow-sm overflow-hidden">
          <div className="px-8 py-8 border-b border-stone-100 bg-stone-50">
            <h2 className="text-3xl font-serif mb-3">Participant Reflection Form</h2>
            <p className="text-slate-600 leading-8 max-w-3xl">
              There are no right or wrong answers. We invite you to answer openly and from your own professional experience.
            </p>
          </div>

          <div className="p-8 space-y-14">

            {/* Section 01 */}
            <div>
              <div className="text-sm uppercase tracking-[0.2em] text-teal-700 mb-4 font-semibold">01 · About your practice</div>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block mb-3 font-medium">Name <span className="text-red-500">*</span></label>
                  <input
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    className="w-full rounded-2xl border border-stone-300 px-5 py-4 focus:outline-none focus:ring-2 focus:ring-teal-600"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="block mb-3 font-medium">Organisation / Role</label>
                  <input
                    name="institution"
                    value={form.institution}
                    onChange={handleChange}
                    className="w-full rounded-2xl border border-stone-300 px-5 py-4 focus:outline-none focus:ring-2 focus:ring-teal-600"
                    placeholder="Your role or organisation"
                  />
                </div>
              </div>
            </div>

            {/* Section 02 */}
            <div>
              <div className="text-sm uppercase tracking-[0.2em] text-teal-700 mb-4 font-semibold">02 · Moral tension in practice</div>
              <div className="space-y-8">
                <div>
                  <label className="block mb-3 font-medium">In your daily work, where do you experience moral pressure or tension?</label>
                  <textarea
                    name="moral_tension"
                    value={form.moral_tension}
                    onChange={handleChange}
                    rows={5}
                    className="w-full rounded-2xl border border-stone-300 px-5 py-4 focus:outline-none focus:ring-2 focus:ring-teal-600"
                    placeholder="Describe situations, challenges, or recurring tensions from practice..."
                  />
                </div>
                <div>
                  <label className="block mb-3 font-medium">What helps professionals remain resilient and ethically grounded under pressure?</label>
                  <textarea
                    name="resilience"
                    value={form.resilience}
                    onChange={handleChange}
                    rows={4}
                    className="w-full rounded-2xl border border-stone-300 px-5 py-4 focus:outline-none focus:ring-2 focus:ring-teal-600"
                    placeholder="Share experiences, values, practices, or examples..."
                  />
                </div>
              </div>
            </div>

            {/* Section 03 */}
            <div>
              <div className="text-sm uppercase tracking-[0.2em] text-amber-700 mb-4 font-semibold">03 · Dilemmas and questions</div>
              <div className="space-y-8">
                <div>
                  <label className="block mb-3 font-medium">Share a dilemma, question, or situation that deserves reflection during the programme.</label>
                  <textarea
                    name="dilemma"
                    value={form.dilemma}
                    onChange={handleChange}
                    rows={6}
                    className="w-full rounded-2xl border border-stone-300 px-5 py-4 focus:outline-none focus:ring-2 focus:ring-teal-600"
                    placeholder="You may describe a real-life situation anonymously..."
                  />
                </div>
                <div>
                  <label className="block mb-3 font-medium">Which themes should definitely be addressed during the three days?</label>
                  <div className="grid md:grid-cols-2 gap-4">
                    {THEMES.map((theme) => (
                      <label
                        key={theme}
                        className={`flex items-center gap-3 border rounded-2xl px-5 py-4 cursor-pointer transition ${
                          form.themes.includes(theme)
                            ? "border-teal-600 bg-teal-50"
                            : "border-stone-200 hover:border-teal-400"
                        }`}
                      >
                        <input
                          type="checkbox"
                          className="w-5 h-5"
                          checked={form.themes.includes(theme)}
                          onChange={() => handleCheckbox(theme)}
                        />
                        <span>{theme}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Section 04 */}
            <div>
              <div className="text-sm uppercase tracking-[0.2em] text-slate-700 mb-4 font-semibold">04 · Looking ahead</div>
              <div className="space-y-8">
                <div>
                  <label className="block mb-3 font-medium">What do you hope to take away from this programme?</label>
                  <textarea
                    name="hopes"
                    value={form.hopes}
                    onChange={handleChange}
                    rows={5}
                    className="w-full rounded-2xl border border-stone-300 px-5 py-4 focus:outline-none focus:ring-2 focus:ring-teal-600"
                    placeholder="Describe your hopes, learning goals, or expectations..."
                  />
                </div>
                <div>
                  <label className="block mb-3 font-medium">Preferred language</label>
                  <select
                    name="language"
                    value={form.language}
                    onChange={handleChange}
                    className="w-full md:w-96 rounded-2xl border border-stone-300 px-5 py-4 focus:outline-none focus:ring-2 focus:ring-teal-600"
                  >
                    <option>English</option>
                    <option>Dutch</option>
                    <option>German</option>
                    <option>French</option>
                    <option>Spanish</option>
                    <option>Other</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Error */}
            {error && (
              <div className="rounded-2xl bg-red-50 border border-red-200 px-6 py-4 text-red-700">
                {error}
              </div>
            )}

            {/* Submit */}
            <div className="pt-8 border-t border-stone-100 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div className="max-w-2xl text-slate-600 leading-8">
                Thank you for contributing to this collective reflection process. Your input helps create a meaningful and practice-oriented learning environment.
              </div>
              <button
                onClick={handleSubmit}
                disabled={loading}
                className="px-8 py-4 rounded-2xl bg-slate-900 text-white hover:bg-slate-800 transition shadow-lg shadow-slate-900/10 disabled:opacity-50 disabled:cursor-not-allowed min-w-[180px] text-center"
              >
                {loading ? "Sending..." : "Submit Reflection"}
              </button>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
