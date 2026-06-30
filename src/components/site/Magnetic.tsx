import { useRef, useState, type ReactNode, type MouseEvent } from "react";

export function Magnetic({ children, className = "", strength = 0.4 }: { children: ReactNode; className?: string; strength?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [t, setT] = useState({ x: 0, y: 0 });

  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - (r.left + r.width / 2)) * strength;
    const y = (e.clientY - (r.top + r.height / 2)) * strength;
    setT({ x, y });
  };
  const onLeave = () => setT({ x: 0, y: 0 });

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ transform: `translate3d(${t.x}px, ${t.y}px, 0)`, transition: "transform 350ms cubic-bezier(0.22,1,0.36,1)" }}
      className={className}
    >
      {children}
    </div>
  );
}
