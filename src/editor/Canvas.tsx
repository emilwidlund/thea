import { useRef } from "react";

export interface CanvasProps
  extends React.CanvasHTMLAttributes<HTMLCanvasElement> {}

export const Canvas = ({ ...props }: CanvasProps) => {
  const ref = useRef<HTMLCanvasElement | null>(null);

  return <canvas ref={ref} {...props} />;
};
