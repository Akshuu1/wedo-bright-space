import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { SectionLabel } from "@/components/site/SectionLabel";
import { Reveal } from "@/components/site/Reveal";
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

function Contact() {
  const [sending, setSending] = useState(false);
  return (
    <main className="px-6 pb-24 pt-40 md:px-10">
      <div className="mx-auto max-w-7xl">
        <SectionLabel index="05" label="contact.html" />
        <h1 className="serif mt-10 text-5xl leading-[0.95] text-bone md:text-[12rem]">
          Let&apos;s
          <br />
          <span className="text-ember">make something.</span>
        </h1>


        <div className="mt-24 grid gap-16 md:grid-cols-12">
          <div className="md:col-span-5 space-y-12">
            <div>
              <p className="mono text-[10px] uppercase tracking-widest text-bone/40">[ Email ]</p>
              <a href="mailto:hello@wedo.studio" className="serif mt-3 block text-3xl text-bone hover:text-ember md:text-5xl">hello@wedo.studio</a>
            </div>
            <div>
              <p className="mono text-[10px] uppercase tracking-widest text-bone/40">[ Phone ]</p>
              <a href="tel:+10000000000" className="serif mt-3 block text-3xl text-bone hover:text-ember md:text-5xl">+1 000 000 0000</a>
            </div>
            <div>
              <p className="mono text-[10px] uppercase tracking-widest text-bone/40">[ Office ]</p>
              <p className="serif mt-3 text-2xl text-bone/80 md:text-3xl">Remote · Worldwide<br/>Mon — Fri · 9 to 7</p>
            </div>
          </div>

          <form
            className="md:col-span-7 space-y-6"
            onSubmit={(e) => {
              e.preventDefault();
              setSending(true);
              setTimeout(() => {
                setSending(false);
                toast.success("Brief received. We'll be in touch within 24 hours.");
                (e.target as HTMLFormElement).reset();
              }, 700);
            }}
          >
            {[
              { n: "name", l: "Your name", t: "text" },
              { n: "company", l: "Company", t: "text" },
              { n: "email", l: "Email", t: "email" },
              { n: "budget", l: "Budget (USD)", t: "text" },
            ].map((f) => (
              <label key={f.n} className="block border-b border-bone/15 pb-3">
                <span className="mono block text-[10px] uppercase tracking-widest text-bone/40">{f.l}</span>
                <input required name={f.n} type={f.t} className="mt-2 w-full bg-transparent text-xl text-bone outline-none placeholder:text-bone/30" placeholder={f.l} />
              </label>
            ))}
            <label className="block border-b border-bone/15 pb-3">
              <span className="mono block text-[10px] uppercase tracking-widest text-bone/40">Tell us about the project</span>
              <textarea required name="message" rows={4} className="mt-2 w-full resize-none bg-transparent text-xl text-bone outline-none placeholder:text-bone/30" placeholder="What are we building?" />
            </label>
            <button
              type="submit"
              disabled={sending}
              className="mono group flex w-full items-center justify-between border border-bone/30 px-6 py-5 text-xs uppercase tracking-widest text-bone hover:bg-ember hover:border-ember hover:text-bone disabled:opacity-50"
            >
              <span>{sending ? "Sending…" : "Send the brief"}</span>
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
