import { useMemo, useRef } from "react";
import {
  Canvas as THREECanvas,
  CanvasProps as THREECanvasProps,
} from "@react-three/fiber";
import { Texture } from "three";
import { OrthographicCamera } from "@react-three/drei";

type CanvasProps = Omit<THREECanvasProps, "children"> & {
  textures: Texture[];
};

export const Canvas = ({ textures, ...props }: CanvasProps) => {
  const ref = useRef<HTMLCanvasElement | null>(null);

  const planesWithTexture = useMemo(() => {
    return textures.map((texture) => {
      return (
        <mesh key={texture.uuid}>
          <planeGeometry args={[2, 2]} />
          <meshBasicMaterial map={texture} />
        </mesh>
      );
    });
  }, [textures]);

  return (
    <THREECanvas ref={ref} {...props}>
      <OrthographicCamera makeDefault zoom={100} position={[0, 0, 5]} />
      <ambientLight />
      {planesWithTexture}
    </THREECanvas>
  );
};
