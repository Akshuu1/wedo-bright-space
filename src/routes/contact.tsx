import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { toast } from "sonner";
import emailjs from "@emailjs/browser";

const EMAILJS_SERVICE_ID = "service_phlyiin";
const EMAILJS_TEMPLATE_ID = "template_y46feg3";
const EMAILJS_PUBLIC_KEY = "CYLB3BxV3dOfyNzgp";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — WeDo" },
      {
        name: "description",
        content: "Start a project with WeDo. Tell us about your idea and we'll reply within one working day.",
      },
      { property: "og:title", content: "Contact — WeDo" },
      { property: "og:description", content: "Start a project with WeDo." },
      { property: "og:url", content: "/contact" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ContactPage",
          name: "Contact — WeDo ",
          url: "/contact",
        }),
      },
    ],
  }),
  component: Contact,
});

const services = ["Website", "Mobile App", "Automation", "UI/UX Design", "Social Media Management"];
const budgets = ["< ₹10k", "₹10 — 30k", "₹30 — 80k", "₹80k+"];

function Contact() {
  return (
    <main className="bg-ink text-bone">
      <Hero />
      <TickerStrip />
      <FormSection />
      <FooterBand />
    </main>
  );
}

/* -------------------------------- HERO -------------------------------- */
function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "-25%"]);
  const [clock, setClock] = useState("");

  useEffect(() => {
    const tick = () => {
      const d = new Date();
      setClock(
        `${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}:${String(d.getSeconds()).padStart(2, "0")}`,
      );
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <section
      ref={ref}
      className="relative flex min-h-screen flex-col justify-between overflow-hidden px-6 pb-10 pt-32 md:px-12 md:pt-40"
    >
      <div
        className="pointer-events-none absolute -top-40 left-1/2 h-[900px] w-[900px] -translate-x-1/2 rounded-full opacity-40 blur-3xl"
        style={{ background: "radial-gradient(closest-side, #B5566B, transparent 70%)" }}
      />
      <div
        className="pointer-events-none absolute bottom-0 right-[-10%] h-[520px] w-[520px] rounded-full opacity-25 blur-3xl"
        style={{ background: "radial-gradient(closest-side, #f6ea3a, transparent 70%)" }}
      />

      {/* HUD top */}
      <div className="relative z-10 flex items-start justify-between">
        <div className="flex items-center gap-3">
          <span className="pill">
            <span className="h-1.5 w-1.5 rounded-full bg-ember" style={{ animation: "blink 1.6s infinite" }} />
            Contact
          </span>
          <span className="mono hidden text-[10px] uppercase tracking-[0.28em] text-bone/50 md:inline">
            ⏵ inbox open · replies &lt; 24h
          </span>
        </div>
        <span className="mono tabular-nums text-[10px] uppercase tracking-[0.28em] text-bone/60">local · {clock}</span>
      </div>

      <motion.div style={{ y }} className="relative z-10">
        <h1 className="display leading-[0.82] tracking-[-0.055em]" style={{ fontSize: "clamp(2.9rem, 11vw, 12rem)" }}>
          Let&rsquo;s create
          <br />
          <span className="text-outline">something </span>
          <span className="text-gradient">extraordinary</span>
        </h1>
        <p className="mono mt-6 max-w-md text-[11px] uppercase tracking-[0.24em] text-bone/55">
          Launching a startup, growing a business or reimagining your digital presence —
          <span className="text-bone"> we&rsquo;re ready to build your next experience.</span>
        </p>

        <div className="mt-10 grid gap-4 md:grid-cols-3">
          <ContactLine label="Email" href="mailto:team.wedo06@gmail.com" value="team.wedo06@gmail.com" accent />
          <ContactLine label="Phone" href="tel:+91 9518238401" value="+91 9518238401" />
          <ContactLine label="Studio" value="· Worldwide ·" sub="Mon — Fri · 9 to 7 GMT" />
        </div>
      </motion.div>

      <div className="relative z-10 flex items-end justify-between border-t-2 border-bone pt-5">
        <p className="mono text-[10px] uppercase tracking-[0.3em] text-bone/60">↓ scroll · the brief</p>
        <p className="mono text-[10px] uppercase tracking-[0.3em] text-bone/60">wedo · ® 2026</p>
      </div>
    </section>
  );
}

function ContactLine({
  label,
  href,
  value,
  sub,
  accent,
}: {
  label: string;
  href?: string;
  value: string;
  sub?: string;
  accent?: boolean;
}) {
  const inner = (
    <>
      <div className="mono flex items-center justify-between text-[10px] uppercase tracking-[0.32em] text-bone/60">
        <span>[ {label} ]</span>
        <span className={accent ? "text-ember" : "text-bone/40"}>◐</span>
      </div>
      <p className="display mt-3 text-xl transition-colors group-hover:text-ember md:text-2xl">{value}</p>
      {sub && <p className="mono mt-1 text-[10px] uppercase tracking-[0.28em] text-bone/50">{sub}</p>}
    </>
  );
  const cls = `group block border-2 border-bone bg-ink p-5 transition hover:-translate-y-1 md:p-6 ${
    accent ? "hover:shadow-[8px_8px_0_0_#B5566B]" : "hover:shadow-[8px_8px_0_0_#f6ea3a]"
  }`;
  return href ? (
    <a href={href} className={cls}>
      {inner}
    </a>
  ) : (
    <div className={cls}>{inner}</div>
  );
}

/* ------------------------------ TICKER ------------------------------ */
function TickerStrip() {
  const items = [
    "◐ Replies within 24h",
    "✦ NDA on request",
    "✧ Kickoff · avg 8 days",
    "★ Founder-first",
    "✦ Remote-native",
    "◇ Fair, honest scopes",
  ];
  const doubled = [...items, ...items];
  return (
    <div className="ticker-strip">
      <div className="marquee-track py-4">
        {doubled.map((s, i) => (
          <span key={i} className="mono flex items-center gap-8 px-8 text-[13px] font-bold uppercase tracking-[0.22em]">
            {s}
            <span className="opacity-40">/</span>
          </span>
        ))}
      </div>
    </div>
  );
}

/* ----------------------------- FORM SECTION ----------------------------- */
function FormSection() {
  const [sending, setSending] = useState(false);
  const [svc, setSvc] = useState<string | null>(null);
  const [bud, setBud] = useState<string | null>(null);

  return (
    <section className="relative border-y-2 border-bone bg-chalk px-6 py-24 md:px-12 md:py-32">
      <div className="mx-auto grid max-w-7xl gap-14 md:grid-cols-12">
        <aside className="md:col-span-4">
          <span className="pill-solid mb-6">✎ The brief</span>
          <h2
            className="display mt-4"
            style={{ fontSize: "clamp(2rem, 4.5vw, 3.5rem)", letterSpacing: "-0.03em", lineHeight: 0.95 }}
          >
            Tell us about
            <br />
            <span className="text-gradient">the project</span>
          </h2>
          <p className="mt-6 text-bone/70">
            The more you share, the sharper our first reply. We read every brief personally — usually the same day.
          </p>
          <ul className="mono mt-10 space-y-3 border-t-2 border-bone pt-6 text-[10px] uppercase tracking-[0.28em] text-bone/60">
            <li className="flex items-center gap-3">
              <span className="text-ember">✦</span> new projects ·
            </li>
            <li className="flex items-center gap-3">
              <span className="text-ember">✦</span> average kickoff · 8 days
            </li>
            <li className="flex items-center gap-3">
              <span className="text-ember">✦</span> NDA on request
            </li>
          </ul>

          <div className="mt-10 hidden h-32 w-32 rotate-[-6deg] md:block">
            <div className="brut-box-zap flex h-full w-full items-center justify-center">
              <span className="display text-6xl">05</span>
            </div>
          </div>
        </aside>

        <form
          className="md:col-span-8"
          onSubmit={async (e) => {
            e.preventDefault();
            const form = e.currentTarget;
            setSending(true);
            try {
              await emailjs.sendForm(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, form, {
                publicKey: EMAILJS_PUBLIC_KEY,
              });
              toast.success("Brief received. We'll be in touch within 24 hours.");
              form.reset();
              setSvc(null);
              setBud(null);
            } catch (err) {
              console.error("EmailJS error:", err);
              toast.error("Something went wrong. Please email us directly at team.wedo06@gmail.com");
            } finally {
              setSending(false);
            }
          }}
        >
          {/* service chips */}
          <FieldLabel n="01" t="What are we building?" />
          <div className="mt-4 flex flex-wrap gap-2">
            {services.map((s) => (
              <button
                type="button"
                key={s}
                onClick={() => setSvc(s)}
                className={`mono border-2 border-bone px-4 py-2 text-[11px] uppercase tracking-[0.22em] transition ${
                  svc === s ? "bg-ember text-ink shadow-[4px_4px_0_0_#0a0a0a]" : "bg-ink text-bone hover:bg-zap"
                }`}
              >
                {s}
              </button>
            ))}
          </div>

          {/* budget chips */}
          <FieldLabel n="02" t="Budget range" className="mt-10" />
          <div className="mt-4 flex flex-wrap gap-2">
            {budgets.map((b) => (
              <button
                type="button"
                key={b}
                onClick={() => setBud(b)}
                className={`mono border-2 border-bone px-4 py-2 text-[11px] uppercase tracking-[0.22em] transition ${
                  bud === b ? "bg-ember text-ink shadow-[4px_4px_0_0_#0a0a0a]" : "bg-ink text-bone hover:bg-zap"
                }`}
              >
                {b}
              </button>
            ))}
          </div>

          {/* text fields */}
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            <TextField n="03" name="name" label="Your name" placeholder="Jane Doe" />
            <TextField n="04" name="company" label="Company" placeholder="Studio, brand, LLC" />
            <TextField n="05" name="email" type="email" label="Email" placeholder="you@company.com" />
            <TextField n="06" name="timeline" label="Timeline" placeholder="ASAP · in 4 weeks · Q1 2026" />
          </div>

          <FieldLabel n="07" t="The pitch" className="mt-10" />
          <textarea
            required
            name="message"
            rows={5}
            placeholder="What are we building — and why now?"
            className="mt-4 w-full resize-none border-2 border-bone bg-ink p-4 text-lg text-bone outline-none transition placeholder:text-bone/30 focus:shadow-[6px_6px_0_0_#B5566B] md:text-xl"
          />

          <input type="hidden" name="service" value={svc ?? ""} />
          <input type="hidden" name="budget" value={bud ?? ""} />

          <button
            type="submit"
            disabled={sending}
            className="group mt-12 flex w-full items-center justify-between border-2 border-bone bg-bone px-6 py-5 text-ink transition hover:-translate-y-1 hover:bg-ember hover:shadow-[8px_8px_0_0_#0a0a0a] disabled:opacity-50 md:px-10 md:py-7"
          >
            <span className="mono text-[11px] uppercase tracking-[0.3em]">
              {sending ? "Sending…" : "✦ Send the brief"}
            </span>
            <span className="display text-2xl transition-transform group-hover:translate-x-2 md:text-4xl">→</span>
          </button>
        </form>
      </div>
    </section>
  );
}

function FieldLabel({ n, t, className = "" }: { n: string; t: string; className?: string }) {
  return (
    <div className={`flex items-baseline gap-4 ${className}`}>
      <span className="mono text-[10px] uppercase tracking-[0.32em] text-ember">[ {n} ]</span>
      <span className="mono text-[11px] uppercase tracking-[0.28em] text-bone">{t}</span>
    </div>
  );
}

function TextField({
  n,
  name,
  label,
  placeholder,
  type = "text",
}: {
  n: string;
  name: string;
  label: string;
  placeholder: string;
  type?: string;
}) {
  return (
    <label className="block">
      <FieldLabel n={n} t={label} />
      <input
        required
        name={name}
        type={type}
        placeholder={placeholder}
        className="mt-3 w-full border-2 border-bone bg-ink px-4 py-3 text-lg text-bone outline-none transition placeholder:text-bone/30 focus:shadow-[6px_6px_0_0_#B5566B] md:text-xl"
      />
    </label>
  );
}

/* ------------------------------ FOOTER BAND ------------------------------ */
function FooterBand() {
  return (
    <section className="relative overflow-hidden bg-bone py-14 text-ink">
      <div className="marquee-track">
        {Array.from({ length: 6 }).map((_, i) => (
          <span
            key={i}
            className="display flex items-center gap-16 pr-16 text-ink"
            style={{ fontSize: "clamp(2.9rem, 8vw, 7rem)", letterSpacing: "-0.05em", lineHeight: 1 }}
          >
            Let&rsquo;s make something <span className="text-ember">✦</span>
          </span>
        ))}
      </div>
    </section>
  );
}
