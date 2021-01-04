import Menu from './Menu';
import StageNum from './StageNum';
import Box from './Box';
import Brick from './Brick';
import Iron from './Iron';
import Fade from './Fade';
import Player from './Player';
import Bullet from './Bullet';
import Hit from './Hit';
import eventBus from './eventBus';
import data from './data';

let root = karas.render(
  <canvas width={600} height={600}>
    <Box ref="box"/>
    <Brick ref="brick"/>
    <Iron ref="iron"/>
    <Player ref="player"/>
    <Fade ref="fade"/>
    <Bullet ref="bullet"/>
    <Hit ref="hit"/>
    <Menu ref="menu"/>
    <StageNum ref="stageNum"/>
  </canvas>,
  '#canvas'
);

document.addEventListener('keydown', function(e) {
  let keyCode = e.keyCode;
  // console.warn(e.keyCode, eventBus.gameState);
  if(eventBus.gameState === eventBus.MENUING) {
    if(keyCode === 87 || keyCode === 83) {
      root.ref.menu.altPlayerNum();
    }
    else if(e.keyCode === 74 || e.keyCode === 13) {
      eventBus.gameState = eventBus.BEFORE_GAME;
      let currentData = data.current = karas.util.clone(data[0]);
      root.ref.stageNum.show(1);
      root.ref.brick.setState({
        list: currentData.brick,
      });
      root.ref.iron.setState({
        list: currentData.iron,
      });
      root.ref.player.setState({
        list: currentData.player,
        position: currentData.player.map(item => {
          return item.map(n => n * 16);
        }),
      });
    }
  }
  else if(eventBus.gameState === eventBus.GAMEING) {
    if(keyCode === 87) {
      root.ref.player.move(0, 0);
    }
    else if(keyCode === 68) {
      root.ref.player.move(0, 1);
    }
    else if(keyCode === 83) {
      root.ref.player.move(0, 2);
    }
    else if(keyCode === 65) {
      root.ref.player.move(0, 3);
    }
    else if(keyCode === 74) {
      let position = root.ref.player.getPosition(0);
      let direction = root.ref.player.getDirection(0);
      root.ref.bullet.move(0, position.slice(0), direction);
    }
  }
});

document.addEventListener('keyup', function(e) {
  let keyCode = e.keyCode;
  if(eventBus.gameState === eventBus.GAMEING) {
    if(keyCode === 87) {
      root.ref.player.stop(0);
    }
    else if(keyCode === 68) {
      root.ref.player.stop(0);
    }
    else if(keyCode === 83) {
      root.ref.player.stop(0);
    }
    else if(keyCode === 65) {
      root.ref.player.stop(0);
    }
  }
});
