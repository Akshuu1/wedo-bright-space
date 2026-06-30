export function Marquee({ items }: { items: string[] }) {
  const row = [...items, ...items, ...items];
  return (
    <div className="overflow-hidden border-y border-bone/10 py-10 md:py-14">
      <div className="marquee-track items-center gap-10 md:gap-16">
        {row.map((t, i) => (
          <span key={i} className="flex items-center gap-10 md:gap-16">
            <span
              className="display whitespace-nowrap text-[14vw] uppercase text-bone md:text-[9rem]"
              style={{ letterSpacing: "-0.05em" }}
            >
              {t}
            </span>
            <span className="text-ember text-3xl md:text-5xl">+</span>
          </span>
        ))}
      </div>
    </div>
  );
}
