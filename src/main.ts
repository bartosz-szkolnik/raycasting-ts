import { PLAYER_STEP_LENGTH } from './constants';
import { Player, renderScene, renderMinimap } from './lib';
import { Vec2 } from './math';
import { Scene } from './types';
import { initCanvas, initContext, sceneSize, canvasSize } from './utils';

(() => {
  const canvas = initCanvas();
  const ctx = initContext(canvas);

  const scene = [
    [null, null, 'cyan', 'purple', null, null, null, null, null],
    [null, null, null, 'yellow', null, null, null, null, null],
    [null, 'red', 'green', 'blue', null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null],
  ];
  const player = new Player(sceneSize(scene).mul(new Vec2(0.63, 0.63)), Math.PI * 1.25);

  window.addEventListener('keydown', e => {
    if (!e.repeat) {
      switch (e.code) {
        case 'KeyW':
          player.position = player.position.add(Vec2.fromAngle(player.direction).scale(PLAYER_STEP_LENGTH));
          renderGame(ctx, player, scene);
          break;
        case 'KeyS':
          player.position = player.position.sub(Vec2.fromAngle(player.direction).scale(PLAYER_STEP_LENGTH));
          renderGame(ctx, player, scene);
          break;
        case 'KeyD':
          player.direction += Math.PI * 0.1;
          renderGame(ctx, player, scene);
          break;
        case 'KeyA':
          player.direction -= Math.PI * 0.1;
          renderGame(ctx, player, scene);
          break;
      }
    }
  });

  renderGame(ctx, player, scene);
})();

function renderGame(ctx: CanvasRenderingContext2D, player: Player, scene: Scene) {
  const minimapPosition = Vec2.zero().add(canvasSize(ctx).scale(0.03));
  const cellSize = ctx.canvas.width * 0.03;
  const minimapSize = sceneSize(scene).scale(cellSize);

  ctx.fillStyle = '#181818';
  ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

  renderScene(ctx, player, scene);
  renderMinimap(ctx, player, minimapPosition, minimapSize, scene);
}
