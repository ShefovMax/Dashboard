export function fitCanvasToContainer(canvas: HTMLCanvasElement, container: HTMLDivElement) {
  // eslint-disable-next-line no-param-reassign
  canvas.width = container.clientWidth;
  // eslint-disable-next-line no-param-reassign
  canvas.height = container.clientHeight;
}
