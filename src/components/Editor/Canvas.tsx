"use client";

import { Suspense, useRef } from "react";
import {
  Canvas as THREECanvas,
  CanvasProps as THREECanvasProps,
  useFrame,
  useThree,
} from "@react-three/fiber";
import { type Texture, type Mesh, type MeshBasicMaterial, TextureLoader } from "three";
import { OrthographicCamera, Text } from "@react-three/drei";
import { EffectComposer, Noise } from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";

type CanvasProps = Omit<THREECanvasProps, "children"> & {
  textures: Texture[];
};

export const Canvas = ({ textures, ...props }: CanvasProps) => {
  const ref = useRef<HTMLCanvasElement | null>(null);
  const polarMeshRef = useRef<Mesh>(null);

  const polarTexture = new TextureLoader().load('/polar.png');



  return (
    <THREECanvas ref={ref} {...props} linear flat>
      <OrthographicCamera makeDefault zoom={100} position={[0, 0, 10]} />
      <mesh ref={polarMeshRef} position={[0, 2.5, 1]} scale={.5}>
        <planeGeometry args={[1, 1]} />
        <meshBasicMaterial map={polarTexture} transparent />
      </mesh>
      <Suspense fallback={null}>
        <Text
          position={[0, 0, 1]}
          color="white"
          anchorX="center"
          anchorY="middle"
          font="/fonts/Louize-Italic-205TF.otf"
          textAlign="center"
          maxWidth={1}
        >
          Introducing Discounts
        </Text>
        <Text
          position={[0, -2.5, 1]}
          color="white"
          anchorX="center"
          anchorY="middle"
          font="/fonts/Louize-Italic-205TF.otf"
          textAlign="center"
          fontSize={0.3}
          maxWidth={1}
        >
          polar.sh
        </Text>
      </Suspense>
      {textures.length > 0 && <Scene textures={textures} />}
      
      <EffectComposer>
        <Noise premultiply blendFunction={BlendFunction.ADD} />
      </EffectComposer>
    </THREECanvas>
  );
};

export interface SceneProps {
  textures: Texture[];
}

const Scene = ({ textures }: SceneProps) => {
  const meshRef = useRef<Mesh>(null);
  const materialRef = useRef<MeshBasicMaterial>(null);

  const { size, viewport } = useThree();
  const textureSwapInterval = 250; // 4 times per second
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
      const textureAspect = currentTexture.image.width / currentTexture.image.height;
      const canvasAspect = size.width / size.height;
      if (canvasAspect > textureAspect) {
        meshRef.current.scale.set(viewport.height * textureAspect, viewport.height, 1);
      } else {
        meshRef.current.scale.set(viewport.width, viewport.width / textureAspect, 1);
      }
    }
  });

  return (
    <>
      <mesh ref={meshRef}>
        <planeGeometry args={[1, 1]} />
        <meshBasicMaterial ref={materialRef} color={0xffffff} opacity={0.5} transparent />
      </mesh>
    </>
  );
};
