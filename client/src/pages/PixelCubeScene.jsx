import React, { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

// --- Particle Component (The scattered cubes) ---
const Particles = ({ count = 200 }) => {
  const meshRef = useRef();

  // Create a stable array of positions, sizes, and colors for the particles
  const particlesData = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      const position = [
        (Math.random() - 0.5) * 10, // X: Scatter broadly
        (Math.random() - 0.5) * 10, // Y
        (Math.random() - 0.5) * 10, // Z
      ];
      // Keep particles closer to the center than the full scatter range
      // This creates the explosion effect around the main cube
      const distance = Math.sqrt(
        position[0] ** 2 + position[1] ** 2 + position[2] ** 2
      );
      const scaleFactor = 1 + distance * 0.5; // Increase scale factor to spread them out

      const size = Math.random() * 0.05 + 0.01;
      const rotation = [
        Math.random() * 2 * Math.PI,
        Math.random() * 2 * Math.PI,
        Math.random() * 2 * Math.PI,
      ];

      temp.push({
        position: position.map((p) => p * scaleFactor),
        size,
        rotation,
        color: new THREE.Color(`hsl(${Math.random() * 360}, 70%, 75%)`),
      });
    }
    return temp;
  }, [count]);

  useFrame((state) => {
    if (meshRef.current) {
      // Rotate the whole particle group slowly
      meshRef.current.rotation.y += 0.0005;
      meshRef.current.rotation.x += 0.0002;
    }
  });

  return (
    <group ref={meshRef}>
      {particlesData.map((p, i) => (
        <mesh
          key={i}
          position={p.position}
          rotation={p.rotation}
          scale={[p.size * 2, p.size * 2, p.size * 2]} // Scale up a bit to make them visible
        >
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial
            color={p.color}
            emissive={p.color}
            emissiveIntensity={0.2}
          />
        </mesh>
      ))}
    </group>
  );
};

// --- Main Cube Component (The gridded center) ---
const MainCube = () => {
  const meshRef = useRef();

  useFrame((state) => {
    // Slight rotation to show the 3D nature
    meshRef.current.rotation.x = meshRef.current.rotation.y += 0.002;
  });

  // Create a rainbow-like gradient material using a texture
  const gradientMaterial = useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 256;
    canvas.height = 256;
    const ctx = canvas.getContext("2d");
    const gradient = ctx.createLinearGradient(0, 0, 256, 256);
    gradient.addColorStop(0, "#ff99e8"); // Pink
    gradient.addColorStop(0.3, "#99aaff"); // Blue
    gradient.addColorStop(0.6, "#aaff99"); // Green/Cyan
    gradient.addColorStop(1, "#ff99e8"); // Back to Pink
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 256, 256);

    const texture = new THREE.CanvasTexture(canvas);
    return new THREE.MeshLambertMaterial({
      map: texture,
      transparent: true,
      opacity: 0.9,
    });
  }, []);

  return (
    <mesh ref={meshRef} position={[0, 0, 0]} scale={[2.5, 2.5, 2.5]}>
      <boxGeometry args={[1, 1, 1, 8, 8, 8]} />{" "}
      {/* 8x8x8 segments for the grid look */}
      {/* 1. Cube Faces with Gradient Texture */}
      <primitive object={gradientMaterial} attach="material" />
      {/* 2. Wireframe for the Grid Lines (Darker color) */}
      <lineSegments>
        {/* Reuse the box geometry for the edges */}
        <edgesGeometry
          attach="geometry"
          args={[new THREE.BoxGeometry(1, 1, 1, 8, 8, 8)]}
        />
        <lineBasicMaterial color={0x151515} linewidth={1} />
      </lineSegments>
    </mesh>
  );
};

// --- Full Scene Exported ---
export default function PixelCubeScene() {
  return (
    <Canvas
      // IMPORTANT: Position the camera back to view the scene
      camera={{ position: [0, 0, 5] }}
    >
      {/* Lights are essential for visibility */}
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={0.5} />
      <pointLight position={[-10, -10, -10]} intensity={0.8} />
      <MainCube />
      <Particles count={300} />{" "}
      {/* Increased particle count for visual density */}
    </Canvas>
  );
}
