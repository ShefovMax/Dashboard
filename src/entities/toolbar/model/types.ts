export type Tool = 'pen' | 'text' | 'image' | 'eraser';

export interface ToolbarState {
  tool: Tool;
  color: string;
  lineWidth: number;
  fontSize: number;
  imageSrc?: string | null;
}
