"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import * as THREE from "three";


const CATEGORY_COLORS = {
  web: "#60a5fa",
  systems: "#a78bfa",
  ml: "#34d399",
  tools: "#fb923c"
};

export default function SkillCloud({ skills }: { skills: {name: string, category: keyof typeof CATEGORY_COLORS}[] }) {
  const groupRef = useRef<THREE.Group>(null);
  const hoverRef = useRef(false);

  const skillItems = useMemo(() => {
    const N = skills.length;
    const radius = 3.5;
    const goldenRatio = (1 + Math.sqrt(5)) / 2;

    return skills.map((skill, i) => {
      const theta = Math.acos(1 - 2 * (i + 0.5) / N);
      const phi = 2 * Math.PI * i / goldenRatio;

      const x = Math.sin(theta) * Math.cos(phi) * radius;
      const y = Math.cos(theta) * radius;
      const z = Math.sin(theta) * Math.sin(phi) * radius;

      return {
        ...skill,
        position: [x, y, z] as [number, number, number],
        color: CATEGORY_COLORS[skill.category]
      };
    });
  }, [skills]);

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y += hoverRef.current ? 0.001 : 0.003;
    }
  });

  return (
    <>
      <ambientLight intensity={1} />
      <group
        ref={groupRef}
        onPointerEnter={() => (hoverRef.current = true)}
        onPointerLeave={() => (hoverRef.current = false)}
      >
        {skillItems.map((item, i) => (
          <Html
            key={i}
            position={item.position}
            center
            distanceFactor={8}
            className="transition-all duration-300 hover:scale-[1.4] hover:z-50"
          >
            <span
              className="font-mono text-xs cursor-pointer whitespace-nowrap px-2 py-1 rounded-md bg-background/50 backdrop-blur-sm border border-transparent hover:border-white/20 transition-all duration-300"
              style={{ color: item.color }}
            >
              {item.name}
            </span>
          </Html>
        ))}
      </group>
    </>
  );
}
