import { EPS } from '../constants';
import { Vec2 } from '../math';
import { Scene } from '../types';

export function sceneSize(scene: Scene): Vec2 {
  const y = scene.length;
  let x = Number.MIN_VALUE;
  for (let row of scene) {
    x = Math.max(x, row.length);
  }

  return new Vec2(x, y);
}

export function canvasSize(ctx: CanvasRenderingContext2D) {
  return new Vec2(ctx.canvas.width, ctx.canvas.height);
}

export function insideScene(scene: Scene, p: Vec2): boolean {
  const size = sceneSize(scene);
  return 0 <= p.x && p.x < size.x && 0 <= p.y && p.y < size.y;
}

export function hittingCell(p1: Vec2, p2: Vec2): Vec2 {
  const d = p2.sub(p1);
  return new Vec2(Math.floor(p2.x + Math.sign(d.x) * EPS), Math.floor(p2.y + Math.sign(d.y) * EPS));
}
