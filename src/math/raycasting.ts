import { EPS } from '../constants';
import { Scene } from '../types';
import { hittingCell, insideScene } from '../utils';
import { Vec2 } from './vec2';

export function castRay(scene: Scene, p1: Vec2, p2: Vec2): Vec2 {
  for (;;) {
    const c = hittingCell(p1, p2);
    if (!insideScene(scene, c) || scene[c.y][c.x] !== null) break;
    const p3 = rayStep(p1, p2);
    p1 = p2;
    p2 = p3;
  }

  return p2;
}

function rayStep(p1: Vec2, p2: Vec2): Vec2 {
  // linear equation is y = k*x + c
  // p1 = (x1, y1)
  // p2 = (x2, y2)
  //
  // | y1 = k * x1 + c
  // | y2 = k * x2 + c
  //
  // y1 - k * x1 = c
  // c = y1 - k * x1 <---
  //
  // y2 = k * x2 + y1 - k * x1
  //
  // y2 = k * (x2 - x1) + y1
  // y2 - y1 = k * (x2 - x1)
  //
  // (y2 - y1)/(x2 - x1) = k
  // k = (y2 - y1)/(x2 - x1) <---

  // dy = (y2 - y1)
  // dx = (x2 - x1)
  // k = dy/dx

  // if dx > 0, we make ceil of the x, if dx < 0, we make floor of the x

  // k as slope only makes sense if the dx is not equal to 0
  // if dx === 0, then this formula doesn't make sense
  // but it also means that what you should get is a vertical line
  // drawing a vertical line is pretty trivial, we don't even need the equation of the line
  // so we have to consider whether the dx is positive, negative or equal to zero
  // we can also have a situation where dy is 0, but that will make the k zero
  // that doesn't really create any kind of problem
  // unless...
  // y = k * x + c
  // x = (y - c) / k
  // which doesn't work if the k is equal to zero
  // so we also have to consider the situation where y === 0

  let p3 = p2;
  const d = p2.sub(p1);

  if (d.x !== 0) {
    const k = d.y / d.x;
    const c = p1.y - k * p1.x;
    const x3 = snap(p2.x, d.x);
    const y3 = x3 * k + c;

    p3 = new Vec2(x3, y3);

    if (k !== 0) {
      const y3 = snap(p2.y, d.y);
      const x3 = (y3 - c) / k;
      const p3t = new Vec2(x3, y3);

      if (p2.distanceTo(p3t) < p2.distanceTo(p3)) {
        p3 = p3t;
      }
    }
  } else {
    const y3 = snap(p2.y, d.y);
    const x3 = p2.x;

    p3 = new Vec2(x3, y3);
  }

  return p3;
}

function snap(x: number, dx: number) {
  if (dx > 0) return Math.ceil(x + Math.sign(dx) * EPS);
  if (dx < 0) return Math.floor(x + Math.sign(dx) * EPS);
  return x;
}
