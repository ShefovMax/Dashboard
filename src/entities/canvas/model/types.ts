export interface CanvasPoint {
  x: number;
  y: number;
}

export interface CanvasElement {
  id: string;
  type: 'rect' | 'line' | 'text' | 'image';
  x?: number;
  y?: number;
  lineWidth?: number;
  width?: number;
  height?: number;
  color?: string;
  text?: string;
  points?: CanvasPoint[];
  canvasWidth: number;
  canvasHeight: number;
  src?: string;
}
