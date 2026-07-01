import { Link } from "@tanstack/react-router";

export function Footer() {
  return (
    <footer className="mt-32 border-t border-bone/10 px-6 pb-10 pt-16 md:px-10">
      <div className="mx-auto grid max-w-7xl gap-12 md:grid-cols-12">
        <div className="md:col-span-6">
          <p className="serif text-4xl leading-[1.05] text-bone md:text-6xl">
            Design.
            <br />
            Develop.
            <br />
            <span className="text-ember italic">Automate.</span>
          </p>
          <p className="mono mt-8 max-w-md text-xs uppercase tracking-widest text-bone/50">
            Strategy, design and engineering. Lean, fast, and sensibly priced.
          </p>
        </div>

        <div className="md:col-span-3">
          <p className="mono text-[10px] uppercase tracking-widest text-bone/40">[ Index ]</p>
          <ul className="mt-4 space-y-2 text-bone/90">
            {[
              ["/", "Home"],
              ["/about", "About"],
              ["/work", "Work"],
              ["/story", "Story"],
              ["/contact", "Contact"],
            ].map(([to, label]) => (
              <li key={to}>
                <Link to={to} className="hover:text-ember">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-3">
          <p className="mono text-[10px] uppercase tracking-widest text-bone/40">[ Contact ]</p>
          <ul className="mt-4 space-y-2 text-bone/90">
            <li>
              <a href="mailto:team.wedo06@gmail.com" className="hover:text-ember">
                team.wedo06@gmail.com
              </a>
            </li>
            <li>
              <a href="tel:+10000000000" className="hover:text-ember">
                +1 000 000 0000
              </a>
            </li>
            <li className="text-bone/50">Remote · Worldwide</li>
          </ul>
        </div>
      </div>

      <div className="mx-auto mt-16 flex max-w-7xl items-center justify-between border-t border-bone/10 pt-6 mono text-[10px] uppercase tracking-widest text-bone/40">
        <span>WeDo Studio © 2026</span>
        <span>v1.0 — built with intent</span>
      </div>
    </footer>
  );
}
