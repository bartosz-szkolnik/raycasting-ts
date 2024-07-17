import { castRay, Vec2 } from '../math';
import { Scene } from '../types';
import { hittingCell, insideScene } from '../utils';
import { Player } from './player';

const SCREEN_WIDTH = 300;

export function renderScene(ctx: CanvasRenderingContext2D, player: Player, scene: Scene) {
  const stripWidth = Math.ceil(ctx.canvas.width / SCREEN_WIDTH);
  const [r1, r2] = player.fovRange();
  r1.lerp(r2, 0.5);

  for (let x = 0; x < SCREEN_WIDTH; ++x) {
    const p = castRay(scene, player.position, r1.lerp(r2, x / SCREEN_WIDTH));
    const c = hittingCell(player.position, p);

    if (insideScene(scene, c)) {
      const color = scene[c.y][c.x];
      if (color !== null) {
        const v = p.sub(player.position);
        const d = Vec2.fromAngle(player.direction);

        const stripHeight = ctx.canvas.height / v.dot(d);
        // ctx.fillStyle = `rgba(${255 * t}, 0, 0, 1)`;
        ctx.fillStyle = color;
        ctx.fillRect(x * stripWidth, (ctx.canvas.height - stripHeight) * 0.5, stripWidth + 1, stripHeight);
      }
    }
  }
}
