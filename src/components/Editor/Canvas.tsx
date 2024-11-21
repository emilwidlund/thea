"use client";

import { Suspense, useRef } from "react";
import {
  Canvas as THREECanvas,
  CanvasProps as THREECanvasProps,
} from "@react-three/fiber";
import { type Mesh, TextureLoader } from "three";
import { OrthographicCamera, Text } from "@react-three/drei";
import { EffectComposer } from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
import { Scene } from "./Scene";
import { ImageSequenceLayer, TextLayer } from "@/models/layer";
import { Flex, Box } from "@react-three/flex";
import { useComposition } from "@/providers/CompositionProvider";
import { Noise } from "@/effects/NoiseEffect";

type CanvasProps = Omit<THREECanvasProps, "children">;

export const Canvas = (props: CanvasProps) => {
  const ref = useRef<HTMLCanvasElement | null>(null);
  const polarMeshRef = useRef<Mesh>(null);

  const polarTexture = new TextureLoader().load("/polar.png");

  const { composition } = useComposition();

  const sequenceLayer = composition.layers.find(
    (layer) => layer.type === "IMAGE_SEQUENCE"
  ) as ImageSequenceLayer | undefined;

  const textLayer = composition.layers.find(
    (layer) => layer.type === "TEXT"
  ) as TextLayer | undefined;

  return (
    <THREECanvas ref={ref} {...props} linear flat>
      <OrthographicCamera makeDefault zoom={100} position={[0, 0, 10]} />
      <group position={[0, 0, 1]}>
        <Suspense fallback={null}>
          <Flex
            flexDirection="column"
            alignItems="center"
            size={[0, 8, 0]}
            position={[0, 4, 0]}
            padding={1.2}
          >
            <Box centerAnchor>
              <mesh ref={polarMeshRef} scale={0.5}>
                <planeGeometry args={[1, 1]} />
                <meshBasicMaterial map={polarTexture} transparent />
              </mesh>
            </Box>
            <Box centerAnchor flexGrow={1}>
              <Text
                color="white"
                anchorX="center"
                anchorY="middle"
                font="/fonts/Louize-Italic-205TF.otf"
                textAlign="center"
                maxWidth={1}
              >
                {textLayer?.text}
              </Text>
            </Box>
            <Box centerAnchor>
              <Text
                color="white"
                anchorX="center"
                anchorY="middle"
                font="/fonts/Louize-Italic-205TF.otf"
                textAlign="center"
                fontSize={0.4}
                maxWidth={1}
              >
                polar.sh
              </Text>
            </Box>
          </Flex>
        </Suspense>
      </group>

      {sequenceLayer && sequenceLayer.textures.length > 0 && (
        <Scene composition={composition} textures={sequenceLayer.textures} />
      )}

      <EffectComposer>
        <Noise
          premultiply
          blendFunction={BlendFunction.ADD}
          noiseIntensity={5}
          noiseSize={10}
        />
      </EffectComposer>
    </THREECanvas>
  );
};
