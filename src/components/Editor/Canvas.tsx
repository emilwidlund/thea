import { useRef } from "react";
import {
  Canvas as THREECanvas,
  CanvasProps as THREECanvasProps,
  useFrame,
  useThree,
} from "@react-three/fiber";
import { Texture, Mesh, MeshBasicMaterial, Color } from "three";
import { OrthographicCamera } from "@react-three/drei";

type CanvasProps = Omit<THREECanvasProps, "children"> & {
  textures: Texture[];
};

export const Canvas = ({ textures, ...props }: CanvasProps) => {
  const ref = useRef<HTMLCanvasElement | null>(null);

  return (
    <THREECanvas ref={ref} {...props} linear flat>
      <Scene textures={textures} />
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
      <OrthographicCamera makeDefault zoom={100} position={[0, 0, 10]} />
      <mesh ref={meshRef}>
        <planeGeometry args={[1, 1]} />
        <meshBasicMaterial ref={materialRef} color={new Color(0xffffff)} />
      </mesh>
    </>
  );
};
