export function Marquee({ items }: { items: string[] }) {
  const row = [...items, ...items];
  return (
    <div className="overflow-hidden border-y border-bone/10 py-8">
      <div className="marquee-track gap-12">
        {row.map((t, i) => (
          <span key={i} className="serif flex items-center gap-12 whitespace-nowrap text-5xl text-bone md:text-7xl">
            {t}
            <span className="text-ember">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
