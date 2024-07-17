import { Vec2 } from '../math';
import { Scene } from '../types';
import { fillCircle, sceneSize, strokeLine } from '../utils';
import { Player } from './player';

export function renderMinimap(ctx: CanvasRenderingContext2D, player: Player, position: Vec2, size: Vec2, scene: Scene) {
  ctx.save();

  const gridSize = sceneSize(scene);

  ctx.translate(...position.array());
  ctx.scale(...size.div(gridSize).array());
  ctx.lineWidth = 0.1;

  ctx.fillStyle = '#181818';
  ctx.fillRect(0, 0, ...gridSize.array());

  for (let y = 0; y < gridSize.y; ++y) {
    for (let x = 0; x < gridSize.x; ++x) {
      const color = scene[y][x];
      if (color !== null) {
        ctx.fillStyle = color;
        ctx.fillRect(x, y, 1, 1);
      }
    }
  }

  ctx.strokeStyle = '#303030';
  for (let x = 0; x <= gridSize.x; ++x) {
    strokeLine(ctx, new Vec2(x, 0), new Vec2(x, gridSize.y), '#303030');
  }

  for (let y = 0; y <= gridSize.y; ++y) {
    strokeLine(ctx, new Vec2(y, 0), new Vec2(gridSize.x, y), '#303030');
    strokeLine(ctx, new Vec2(0, y), new Vec2(gridSize.x, y), '#303030');
  }

  fillCircle(ctx, player.position, 0.2);

  const [p1, p2] = player.fovRange();

  strokeLine(ctx, p1, p2);
  strokeLine(ctx, player.position, p1);
  strokeLine(ctx, player.position, p2);

  ctx.restore();
}
