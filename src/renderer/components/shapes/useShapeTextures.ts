import { useTexture } from '@react-three/drei';
import { useCallback, useMemo } from 'react';
import { Texture } from 'three';
import terrainNormal from '../../../../assets/textures/terrain-normal.jpg';
import terrainRoughness from '../../../../assets/textures/terrain-roughness.jpg';

type TextureMaps = {
  map?: Texture;
  displacementMap?: Texture;
  normalMap?: Texture;
  roughnessMap?: Texture;
  aoMap?: Texture;
};

export function useShapeTextures() {
  const pavement = useTexture({
    normalMap: terrainRoughness,
    roughnessMap: terrainNormal,
  });

  const textures = useMemo(() => {
    const textureMap: Record<string, TextureMaps> = {
      default: {},
      pavement,
    };
    return textureMap;
  }, [pavement]);

  const getTextureById = useCallback(
    (textureId: string) => {
      const texture = textures[textureId] ?? textures.default;
      return texture;
    },
    [textures],
  );

  return {
    getTextureById,
  };
}
