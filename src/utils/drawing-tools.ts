import { Vec2 } from '../math';

export function strokeLine(ctx: CanvasRenderingContext2D, p1: Vec2, p2: Vec2, strokeStyle = 'magenta') {
  ctx.strokeStyle = strokeStyle;
  ctx.beginPath();
  ctx.moveTo(...p1.array());
  ctx.lineTo(...p2.array());
  ctx.stroke();
}

export function fillCircle(ctx: CanvasRenderingContext2D, center: Vec2, radius: number, fillStyle = 'magenta') {
  ctx.fillStyle = fillStyle;
  ctx.beginPath();
  ctx.arc(...center.array(), radius, 0, 2 * Math.PI);
  ctx.fill();
}
