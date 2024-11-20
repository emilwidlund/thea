"use client";

import { useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { type Texture, type Mesh, type MeshBasicMaterial } from "three";
import { Composition } from "@/models/composition";
import { useComposition } from "@/providers/CompositionProvider";
import { Box } from "@react-three/flex";

export interface SceneProps {
  composition: Composition;
  textures: Texture[];
}

export const Scene = ({ textures }: SceneProps) => {
  const meshRef = useRef<Mesh>(null);
  const materialRef = useRef<MeshBasicMaterial>(null);

  const { composition } = useComposition();

  const { size, viewport } = useThree();
  const textureSwapInterval = 1000 / composition.timeline.fps;
  let elapsedTime = 0;
  let textureIndex = 0;

  useFrame((state, delta) => {
    if (!materialRef.current || !meshRef.current) return;

    elapsedTime += delta * 1000; // convert delta to milliseconds

    if (elapsedTime >= textureSwapInterval) {
      const currentTexture = textures[textureIndex % textures.length];
      materialRef.current.map = currentTexture;
      materialRef.current.needsUpdate = true;
      textureIndex++;
      elapsedTime = 0; // reset elapsed time

      // Adjust the mesh scale to maintain the texture's aspect ratio
      const textureAspect =
        currentTexture.image.width / currentTexture.image.height;
      const canvasAspect = size.width / size.height;
      if (canvasAspect > textureAspect) {
        meshRef.current.scale.set(
          viewport.height * textureAspect,
          viewport.height,
          1
        );
      } else {
        meshRef.current.scale.set(
          viewport.width,
          viewport.width / textureAspect,
          1
        );
      }
    }
  });

  return (
    <mesh ref={meshRef}>
      <planeGeometry args={[1, 1]} />
      <meshBasicMaterial
        ref={materialRef}
        color={0xffffff}
        opacity={0.5}
        transparent
      />
    </mesh>
  );
};
