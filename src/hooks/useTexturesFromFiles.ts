import { useEffect, useState } from "react";
import { Texture, TextureLoader } from "three";

export const useTexturesFromFiles = (files: File[]): Texture[] => {
  const [textures, setTextures] = useState<Texture[]>([]);

  useEffect(() => {
    const promises = files.map((file) => {
      return new Promise<Texture>((resolve) => {
        const reader = new FileReader();
        reader.onload = () => {
          const texture = new TextureLoader().load(reader.result as string);
          resolve(texture);
        };
        reader.readAsDataURL(file);
      });
    });

    Promise.all(promises).then((textures) => {
      setTextures(textures);
    });
  }, [files]);

  return textures;
};
