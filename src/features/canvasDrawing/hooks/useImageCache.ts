import { useCallback, useRef } from 'react';

// Кэш изображений, загружаем их асинхронно
export function useImageCache() {
  const cache = useRef<Map<string, HTMLImageElement>>(new Map());

  const getImage = useCallback((id: string) => cache.current.get(id), []);

  const loadImage = useCallback((id: string, src: string, onLoad: () => void) => {
    if (cache.current.has(id)) return;

    const img = new Image();
    img.src = src;
    img.onload = () => {
      cache.current.set(id, img);
      onLoad();
    };
  }, []);

  return { getImage, loadImage };
}
