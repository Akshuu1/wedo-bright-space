export function SectionLabel({ index, label }: { index: string; label: string }) {
  return (
    <div className="mono flex items-center gap-4 text-[10px] uppercase tracking-[0.3em] text-bone/50">
      <span className="text-ember">{index} ·</span>
      <span className="h-px flex-1 bg-bone/15" />
      <span>{label}</span>
    </div>
  );
}
