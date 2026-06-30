import { Suspense, useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Environment, Text, Sphere, Torus } from "@react-three/drei";
import * as THREE from "three";

function ClientOnly({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;
  return <>{children}</>;
}

function MorphBlob() {
  const ref = useRef<THREE.Mesh>(null!);
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (ref.current) {
      ref.current.rotation.x = t * 0.15;
      ref.current.rotation.y = t * 0.2;
      ref.current.position.x = state.pointer.x * 0.4;
      ref.current.position.y = state.pointer.y * 0.3;
    }
  });
  return (
    <Sphere ref={ref} args={[1.6, 128, 128]}>
      {/* @ts-expect-error drei material */}
      <MeshDistortMaterial
        color="#8b5cf6"
        emissive="#4f8cff"
        emissiveIntensity={0.25}
        roughness={0.15}
        metalness={0.9}
        distort={0.55}
        speed={2.2}
      />
    </Sphere>
  );
}

function Rings() {
  const g = useRef<THREE.Group>(null!);
  useFrame((s) => {
    if (g.current) {
      g.current.rotation.z = s.clock.getElapsedTime() * 0.08;
      g.current.rotation.x = Math.sin(s.clock.getElapsedTime() * 0.2) * 0.3;
    }
  });
  return (
    <group ref={g}>
      {[2.6, 3.0, 3.4].map((r, i) => (
        <Torus key={i} args={[r, 0.005, 16, 200]} rotation={[Math.PI / 2 + i * 0.2, 0, 0]}>
          <meshBasicMaterial color={i === 1 ? "#4f8cff" : "#ffffff"} transparent opacity={0.25 - i * 0.05} />
        </Torus>
      ))}
    </group>
  );
}

function FloatingMarks() {
  const labels = ["WEB", "MOBILE", "AI", "3D", "AUTO"];
  return (
    <>
      {labels.map((l, i) => {
        const a = (i / labels.length) * Math.PI * 2;
        return (
          <Float key={l} speed={1.5} rotationIntensity={0.3} floatIntensity={0.8}>
            <Text
              position={[Math.cos(a) * 3.2, Math.sin(a) * 1.6, Math.sin(a) * 1.2]}
              fontSize={0.18}
              color="white"
              anchorX="center"
              anchorY="middle"
              letterSpacing={0.2}
            >
              {`+ ${l}`}
            </Text>
          </Float>
        );
      })}
    </>
  );
}

export function Hero3D() {
  return (
    <ClientOnly>
      <Canvas
        dpr={[1, 2]}
        camera={{ position: [0, 0, 5], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        className="!absolute !inset-0"
      >
        <color attach="background" args={["#0a0a12"]} />
        <fog attach="fog" args={["#0a0a12", 6, 12]} />
        <ambientLight intensity={0.4} />
        <pointLight position={[6, 4, 4]} intensity={2} color="#8b5cf6" />
        <pointLight position={[-6, -4, 2]} intensity={1.5} color="#4f8cff" />
        <Suspense fallback={null}>
          <Float speed={1.2} rotationIntensity={0.4} floatIntensity={1.2}>
            <MorphBlob />
          </Float>
          <Rings />
          <FloatingMarks />
          <Environment preset="night" />
        </Suspense>
      </Canvas>
    </ClientOnly>
  );
}
