import { createFileRoute } from "@tanstack/react-router";
import { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { toast } from "sonner";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — WeDo Studio" },
      { name: "description", content: "Start a project with WeDo. Email, phone, and a brief inquiry form." },
      { property: "og:title", content: "Contact — WeDo Studio" },
      { property: "og:description", content: "Start a project with WeDo." },
    ],
  }),
  component: Contact,
});

const services = ["Website", "Mobile App", "Automation", "Product", "Brand system", "Not sure yet"];
const budgets = ["< $10k", "$10 — 30k", "$30 — 80k", "$80k+"];

function Contact() {
  return (
    <main className="bg-ink text-bone">
      <Hero />
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

  return (
    <section ref={ref} className="relative flex min-h-screen flex-col justify-between overflow-hidden px-6 pb-10 pt-32 md:px-12 md:pt-40">
      <div
        className="pointer-events-none absolute -top-40 left-1/2 h-[900px] w-[900px] -translate-x-1/2 rounded-full opacity-40 blur-3xl"
        style={{ background: "radial-gradient(closest-side, oklch(0.74 0.17 55 / 0.55), transparent 70%)" }}
      />

      <div className="flex items-start justify-between">
        <p className="mono text-[10px] uppercase tracking-[0.32em] text-ember">[ 05 / contact ]</p>
        <p className="mono max-w-[16ch] text-right text-[10px] uppercase tracking-[0.28em] text-bone/45">
          replies within 24h · mon–fri
        </p>
      </div>

      <motion.div style={{ y }}>
        <h1 className="display leading-[0.82] tracking-[-0.06em]" style={{ fontSize: "clamp(4rem, 16vw, 20rem)" }}>
          Let&rsquo;s make
          <br />
          <span className="text-gradient">something.</span>
        </h1>

        <div className="mt-10 grid gap-6 md:grid-cols-3 md:gap-10">
          <ContactLine label="Email" href="mailto:hello@wedo.studio" value="hello@wedo.studio" />
          <ContactLine label="Phone" href="tel:+10000000000" value="+1 000 000 0000" />
          <ContactLine label="Studio" value="Remote · Worldwide" sub="Mon — Fri · 9 to 7 GMT" />
        </div>
      </motion.div>

      <div className="flex items-end justify-between border-t border-bone/10 pt-5">
        <p className="mono text-[10px] uppercase tracking-[0.3em] text-bone/40">scroll ↓ the brief</p>
        <p className="mono text-[10px] uppercase tracking-[0.3em] text-bone/40">wedo · studio ® 2026</p>
      </div>
    </section>
  );
}

function ContactLine({ label, href, value, sub }: { label: string; href?: string; value: string; sub?: string }) {
  const inner = (
    <>
      <p className="mono text-[10px] uppercase tracking-[0.32em] text-bone/40">[ {label} ]</p>
      <p className="display mt-2 text-2xl transition-colors group-hover:text-ember md:text-3xl">{value}</p>
      {sub && <p className="mono mt-1 text-[10px] uppercase tracking-[0.28em] text-bone/40">{sub}</p>}
    </>
  );
  return href ? (
    <a href={href} className="group block rounded-2xl border border-bone/10 bg-bone/[0.02] p-6 backdrop-blur transition hover:border-ember/50">
      {inner}
    </a>
  ) : (
    <div className="group rounded-2xl border border-bone/10 bg-bone/[0.02] p-6 backdrop-blur">
      {inner}
    </div>
  );
}

/* ----------------------------- FORM SECTION ----------------------------- */
function FormSection() {
  const [sending, setSending] = useState(false);
  const [svc, setSvc] = useState<string | null>(null);
  const [bud, setBud] = useState<string | null>(null);

  return (
    <section className="relative border-t border-bone/10 px-6 py-24 md:px-12 md:py-32">
      <div className="mx-auto grid max-w-7xl gap-14 md:grid-cols-12">
        <aside className="md:col-span-4">
          <p className="mono text-[10px] uppercase tracking-[0.32em] text-ember">[ the brief ]</p>
          <h2 className="display mt-4" style={{ fontSize: "clamp(2rem, 4.5vw, 3.5rem)", letterSpacing: "-0.03em", lineHeight: 0.95 }}>
            Tell us about the project.
          </h2>
          <p className="mt-6 text-bone/60">
            The more you share, the sharper our first reply. We read every brief personally — usually the same day.
          </p>
          <div className="mono mt-10 space-y-3 border-t border-bone/10 pt-6 text-[10px] uppercase tracking-[0.28em] text-bone/50">
            <p>✦ new projects · Q3 — Q4 2026</p>
            <p>✦ average kickoff · 8 days</p>
            <p>✦ NDA on request</p>
          </div>
        </aside>

        <form
          className="md:col-span-8"
          onSubmit={(e) => {
            e.preventDefault();
            setSending(true);
            setTimeout(() => {
              setSending(false);
              toast.success("Brief received. We'll be in touch within 24 hours.");
              (e.target as HTMLFormElement).reset();
              setSvc(null);
              setBud(null);
            }, 800);
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
                className={`mono rounded-full border px-4 py-2 text-[11px] uppercase tracking-[0.22em] transition ${
                  svc === s ? "border-ember bg-ember text-ink" : "border-bone/20 text-bone/70 hover:border-bone/60 hover:text-bone"
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
                className={`mono rounded-full border px-4 py-2 text-[11px] uppercase tracking-[0.22em] transition ${
                  bud === b ? "border-ember bg-ember text-ink" : "border-bone/20 text-bone/70 hover:border-bone/60 hover:text-bone"
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
            className="mt-4 w-full resize-none border-b border-bone/20 bg-transparent pb-4 text-xl text-bone outline-none transition placeholder:text-bone/25 focus:border-ember md:text-2xl"
          />

          <input type="hidden" name="service" value={svc ?? ""} />
          <input type="hidden" name="budget" value={bud ?? ""} />

          <button
            type="submit"
            disabled={sending}
            className="group mt-12 flex w-full items-center justify-between rounded-full border border-bone/25 bg-bone/[0.03] px-6 py-5 text-bone transition hover:border-ember hover:bg-ember hover:text-ink disabled:opacity-50 md:px-10 md:py-7"
          >
            <span className="mono text-[11px] uppercase tracking-[0.3em]">
              {sending ? "Sending…" : "Send the brief"}
            </span>
            <span className="display text-2xl transition-transform group-hover:translate-x-2 md:text-4xl">
              →
            </span>
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
      <span className="mono text-[11px] uppercase tracking-[0.28em] text-bone/70">{t}</span>
    </div>
  );
}

function TextField({ n, name, label, placeholder, type = "text" }: { n: string; name: string; label: string; placeholder: string; type?: string }) {
  return (
    <label className="block">
      <FieldLabel n={n} t={label} />
      <input
        required
        name={name}
        type={type}
        placeholder={placeholder}
        className="mt-3 w-full border-b border-bone/20 bg-transparent pb-3 text-lg text-bone outline-none transition placeholder:text-bone/25 focus:border-ember md:text-xl"
      />
    </label>
  );
}

/* ------------------------------ FOOTER BAND ------------------------------ */
function FooterBand() {
  return (
    <section className="relative overflow-hidden border-t border-bone/10 py-14">
      <div className="flex gap-16 whitespace-nowrap [animation:marquee_45s_linear_infinite]">
        {Array.from({ length: 6 }).map((_, i) => (
          <span key={i} className="display flex items-center gap-16 text-bone/25" style={{ fontSize: "clamp(3rem, 8vw, 7rem)", letterSpacing: "-0.05em", lineHeight: 1 }}>
            Let&rsquo;s make something <span className="text-ember">✦</span>
          </span>
        ))}
      </div>
    </section>
  );
}
