export function initCanvas() {
  const canvas = document.getElementById('game') as HTMLCanvasElement | null;
  if (!canvas) {
    throw new Error('No canvas found!');
  }

  const factor = 80;
  canvas.width = 16 * factor;
  canvas.height = 9 * factor;
  return canvas;
}

export function initContext(canvas: HTMLCanvasElement) {
  const ctx = canvas.getContext('2d');
  if (!ctx) {
    throw new Error('No canvas context found!');
  }

  return ctx;
}
