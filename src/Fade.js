import karas from 'karas';
import data from './data';
import eventBus from './eventBus';

class Fade extends karas.Component {
  constructor(props) {
    super(props);
    this.state = {
      enemy: [],
      player: [],
    };
  }

  componentDidMount() {
    // 开始游戏
    eventBus.on(eventBus.WILL_GAME, () => {
      eventBus.activeEnemyNum = 0;
      this.setState({
        enemy: data.current.enemy,
        player: data.current.player,
      });
    });
    eventBus.on(eventBus.GAMEING, () => {
      this.show('player', 0);
      if(eventBus.playerNum === 2) {
        this.show('player', 1);
      }
      let count = 0;
      let interval = this.interval = setInterval(() => {
        if(eventBus.gameState !== eventBus.GAMEING) {
          clearInterval(interval);
          return;
        }
        // 限制数量
        if(eventBus.activeEnemyNum >= 4) {
          return;
        }
        eventBus.activeEnemyNum++;
        let id = count++;
        setTimeout(function() {
          eventBus.emit(eventBus.ADD_ENEMY, id);
        }, 1500);
        this.show('enemy', id % 3);
        if(count >= data.current.enemy.length) {
          clearInterval(interval);
        }
      }, 1000);
    });
    eventBus.on(eventBus.PLAY_REBONE, (i) => {
      this.show('player', i);
    });
    eventBus.on([eventBus.GAME_OVER, eventBus.GAME_NEXT], () => {
      eventBus.activeEnemyNum = 0;
      clearInterval(this.interval);
    });
  }

  show(name, i) {
    let node = this.ref[name + i];
    node.animate([
      {
        visibility: 'visible',
        backgroundPosition: '-204 0',
      },
      {
        visibility: 'visible',
        backgroundPosition: '0 0',
      },
    ], {
      duration: 300,
      iterations: 6,
      direction: 'alternate',
      easing: 'steps(6)',
    });
  }

  render() {
    return <div style={{
      position: 'absolute',
      left: 0,
      top: 0,
      width: '100%',
      height: '100%',
      opacity: 0.9,
    }}>
      {
        this.state.enemy.map((item, i) => {
          return <span ref={'enemy' + i}
                       style={{
                         position: 'absolute',
                         left: item[0] * 16,
                         top: item[1] * 16,
                         width: 32,
                         height: 32,
                         background: 'url(tank.png) no-repeat -204 0',
                       }}/>;
        })
      }
      {
        this.state.player.map((item, i) => {
          return <span ref={'player' + i}
                       style={{
                         position: 'absolute',
                         left: item[0] * 16,
                         top: item[1] * 16,
                         width: 32,
                         height: 32,
                         background: 'url(tank.png) no-repeat -204 0',
                       }}/>;
        })
      }
    </div>;
  }
}

export default Fade;
