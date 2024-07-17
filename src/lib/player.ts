import { FOV, NEAR_CLIPPING_PLANE } from '../constants';
import { Vec2 } from '../math';

export class Player {
  constructor(public position: Vec2, public direction: number) {}

  fovRange(): [Vec2, Vec2] {
    const l = Math.tan(FOV * 0.5) * NEAR_CLIPPING_PLANE;
    const p = this.position.add(Vec2.fromAngle(this.direction).scale(NEAR_CLIPPING_PLANE));
    const p1 = p.sub(p.sub(this.position).rot90().norm().scale(l));
    const p2 = p.add(p.sub(this.position).rot90().norm().scale(l));

    return [p1, p2];
  }
}
