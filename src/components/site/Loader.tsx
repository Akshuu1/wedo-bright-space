import { Suspense, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Canvas, useFrame } from "@react-three/fiber";
import { MeshDistortMaterial, Environment } from "@react-three/drei";
import * as THREE from "three";

/* -------------------------------------------------------------------------- */
/*  3D loading centerpiece — morphing chrome sphere with an inner ember core  */
/* -------------------------------------------------------------------------- */

function LoaderScene({ progress, isMobile }: { progress: number; isMobile: boolean }) {
  const outer = useRef<THREE.Mesh>(null!);
  const inner = useRef<THREE.Mesh>(null!);
  const ring = useRef<THREE.Mesh>(null!);

  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime();
    if (outer.current) {
      outer.current.rotation.y += delta * 0.35;
      outer.current.rotation.x = Math.sin(t * 0.4) * 0.25;
      const s = 1 + Math.sin(t * 1.6) * 0.02 + progress * 0.15;
      outer.current.scale.setScalar(s);
    }
    if (inner.current) {
      inner.current.rotation.y -= delta * 0.6;
      inner.current.rotation.z += delta * 0.2;
      const s = 0.55 + progress * 0.35;
      inner.current.scale.setScalar(s);
    }
    if (ring.current) {
      ring.current.rotation.z = t * 0.4;
      ring.current.rotation.x = Math.PI / 2 + Math.sin(t * 0.5) * 0.3;
    }
  });

  // Lower subdivisions & distort speed on mobile — visually identical, ~half the shader work
  const outerDetail = isMobile ? 4 : 6;
  const innerDetail = isMobile ? 3 : 4;
  const ringSegments = isMobile ? 120 : 220;
  const distortSpeed = isMobile ? 1.6 : 2.4;
  const innerSpeed = isMobile ? 2.4 : 3.6;

  return (
    <group>
      <mesh ref={outer}>
        <icosahedronGeometry args={[1.35, outerDetail]} />
        <MeshDistortMaterial
          color="#0a0a0a"
          emissive="#ff5722"
          emissiveIntensity={0.15 + progress * 0.5}
          roughness={0.15}
          metalness={0.95}
          distort={0.35 + progress * 0.25}
          speed={distortSpeed}
        />
      </mesh>

      <mesh ref={inner}>
        <icosahedronGeometry args={[0.55, innerDetail]} />
        <MeshDistortMaterial
          color="#ff5722"
          emissive="#ff8a3c"
          emissiveIntensity={1.4}
          roughness={0.3}
          metalness={0.2}
          distort={0.55}
          speed={innerSpeed}
          transparent
          opacity={0.9}
        />
      </mesh>

      <mesh ref={ring}>
        <torusGeometry args={[1.9, 0.006, 12, ringSegments]} />
        <meshBasicMaterial color="#ff5722" transparent opacity={0.5} />
      </mesh>
    </group>
  );
}

/* -------------------------------------------------------------------------- */
/*  Boot loader                                                                */
/* -------------------------------------------------------------------------- */

export function Loader() {
  const [pct, setPct] = useState(0);
  const [done, setDone] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [lowPower, setLowPower] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (typeof window === "undefined") return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const mobile = window.matchMedia("(max-width: 768px)").matches;
    setIsMobile(mobile);

    // Low-power heuristic: few cores, low memory, or save-data
    const nav = navigator as Navigator & { deviceMemory?: number; connection?: { saveData?: boolean } };
    const weak =
      (nav.hardwareConcurrency ?? 8) <= 4 ||
      (nav.deviceMemory ?? 8) <= 4 ||
      nav.connection?.saveData === true;
    setLowPower(weak);

    if (reduced) {
      setPct(100);
      setDone(true);
      const id = window.setTimeout(() => setHidden(true), 300);
      return () => window.clearTimeout(id);
    }

    let raf = 0;
    const start = performance.now();
    const DURATION = mobile ? 2200 : 2600;
    const ease = (p: number) => (p === 1 ? 1 : 1 - Math.pow(2, -10 * p));

    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / DURATION);
      setPct(ease(p) * 100);
      if (p < 1) raf = requestAnimationFrame(tick);
      else {
        window.setTimeout(() => setDone(true), 320);
        window.setTimeout(() => setHidden(true), 1800);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  if (hidden) return null;
  const shown = Math.min(100, Math.floor(pct));
  const progress = pct / 100;

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          key="loader"
          className="fixed inset-0 z-[120] overflow-hidden bg-ink text-bone"
          initial={{ clipPath: "inset(0% 0% 0% 0%)" }}
          exit={{ clipPath: "inset(0% 0% 100% 0%)" }}
          transition={{ duration: 1.15, ease: [0.76, 0, 0.24, 1] }}
          aria-hidden
        >
          {/* radial ember ambient */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(55% 45% at 50% 55%, rgba(255,87,34,0.18), transparent 70%)",
            }}
          />
          {/* grain */}
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.07] mix-blend-overlay"
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='140' height='140'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)' opacity='0.7'/></svg>\")",
            }}
          />

          {/* 3D canvas */}
          {mounted && (
            <div className="absolute inset-0">
              <Canvas
                dpr={isMobile ? [1, 1.5] : [1, 2]}
                camera={{ position: [0, 0, 4.2], fov: 42 }}
                gl={{
                  antialias: !isMobile,
                  alpha: true,
                  powerPreference: "high-performance",
                }}
                performance={{ min: 0.5 }}
              >
                <ambientLight intensity={0.5} />
                <pointLight position={[4, 3, 3]} intensity={2.2} color="#ff8a3c" />
                <pointLight position={[-4, -2, 2]} intensity={1.4} color="#4f8cff" />
                <Suspense fallback={null}>
                  <LoaderScene progress={progress} isMobile={isMobile} />
                  {/* Skip HDR environment on mobile / low-power — biggest win */}
                  {!isMobile && !lowPower && <Environment preset="night" />}
                </Suspense>
              </Canvas>
            </div>
          )}


          {/* Vignette on top of canvas */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(120% 90% at 50% 50%, transparent 40%, rgba(10,10,10,0.65) 100%)",
            }}
          />

          {/* Top meta */}
          <motion.div
            className="absolute inset-x-0 top-0 flex items-start justify-between px-6 pt-6 md:px-10 md:pt-8"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.05 }}
          >
            <span className="mono flex items-center gap-2 text-[10px] uppercase tracking-[0.34em] text-bone/60">
              <span className="relative inline-flex h-1.5 w-1.5">
                <span className="absolute inset-0 animate-ping rounded-full bg-ember/70" />
                <span className="relative h-1.5 w-1.5 rounded-full bg-ember" />
              </span>
              WeDo® — Index MMXXVI
            </span>
            <span className="mono text-[10px] uppercase tracking-[0.34em] text-bone/45">
              {shown < 33 ? "Compiling" : shown < 66 ? "Assembling" : shown < 99 ? "Rendering" : "Ready"}
            </span>
          </motion.div>

          {/* Bottom bay — counter + wordmark + hairline */}
          <motion.div
            className="absolute inset-x-0 bottom-0 px-6 pb-6 md:px-10 md:pb-10"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
          >
            <div className="flex items-end justify-between gap-6">
              <p
                className="display text-bone"
                style={{
                  fontSize: "clamp(1.25rem, 2.2vw, 1.75rem)",
                  letterSpacing: "-0.03em",
                  lineHeight: 1,
                }}
              >
                W<span className="text-ember">e</span>Do
              </p>

              <p
                className="display tabular-nums text-bone leading-none"
                style={{
                  fontSize: "clamp(3.5rem, 11vw, 10rem)",
                  letterSpacing: "-0.07em",
                }}
              >
                {String(shown).padStart(2, "0")}
                <span className="text-ember">.</span>
              </p>

              <p className="mono tabular-nums text-[10px] uppercase tracking-[0.32em] text-bone/50">
                <span className="text-bone">{String(shown).padStart(3, "0")}</span>
                <span className="mx-1 text-bone/25">/</span>
                <span>100</span>
              </p>
            </div>

            <div className="mt-5 h-px w-full overflow-hidden bg-bone/12">
              <div
                className="h-full origin-left bg-ember"
                style={{
                  transform: `scaleX(${progress})`,
                  transition: "transform 120ms cubic-bezier(0.22,1,0.36,1)",
                  boxShadow: "0 0 14px rgba(255,87,34,0.7)",
                }}
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/**
 * Thin top progress bar for client-side route changes.
 */
export function RouteProgress({ active }: { active: boolean }) {
  const [pct, setPct] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let raf = 0;
    if (active) {
      setVisible(true);
      setPct(0);
      const start = performance.now();
      const DURATION = 900;
      const ease = (p: number) => (p === 1 ? 1 : 1 - Math.pow(2, -10 * p));
      const tick = (t: number) => {
        const p = Math.min(0.92, (t - start) / DURATION);
        setPct(ease(p));
        if (p < 0.92) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    } else if (visible) {
      setPct(1);
      const id = window.setTimeout(() => {
        setVisible(false);
        setPct(0);
      }, 320);
      return () => window.clearTimeout(id);
    }
    return () => cancelAnimationFrame(raf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active]);

  return (
    <div
      className="pointer-events-none fixed left-0 right-0 top-0 z-[110] h-[2px] bg-transparent"
      aria-hidden
    >
      <div
        className="h-full origin-left bg-ember"
        style={{
          transform: `scaleX(${pct})`,
          opacity: visible ? 1 : 0,
          transition: "transform 140ms linear, opacity 280ms ease-out",
          boxShadow: "0 0 12px rgba(255,87,34,0.7)",
        }}
      />
    </div>
  );
}
