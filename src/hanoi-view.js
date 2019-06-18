const rodTypes = ['small', 'med', 'large'];

class View {
  constructor(hanoiGame, $el) {
    this.hanoiGame = hanoiGame;
    this.display = $el;
    this.selections = [];
    
    this.setupTowers();
    this.render();
    this.bindTowers();
  }

  setupTowers() {
    const tower = $('<ul><li></li><li></li><li></li></ul>');
    this.display.append(tower);
    this.display.append(tower.clone());
    this.display.append(tower.clone());
  }

  render() {
    const $rods = $('ul');

    this.clear();

    this.hanoiGame.towers.forEach((rod, rodIdx) => {
      rod.forEach((disc, discIdx) => {
        const liIdx = (discIdx === 0) ? 2 : discIdx % 2;
        const lis = $($($rods[rodIdx]).children());
        const $li = $(lis[liIdx]);

        $li.addClass(rodTypes[disc - 1]);
      });
    });
  }

  clear() {
    const $discs = $('ul li');

    rodTypes.forEach((cName) => {
      $discs.removeClass(cName);
    });
  }

  bindTowers() {
    const view = this;

    this.display.on('click', 'ul', function() {
      $(this).addClass('selected');

      if (view.selections.length === 0) {
        view.selections.push($('ul').index(this));
      } else {
        view.handleMove($('ul').index(this));
        $('ul').removeClass('selected');
        view.render();
        view.handleWin();
      }
    });
  }

  handleMove(rod) {
    const isValid = this.hanoiGame.move(this.selections[0], rod);
    if (!isValid) alert('Invalid move, try again!');
    this.selections = [];
  }

  handleWin() {
    if (this.hanoiGame.isWon()) {
      this.display.off('click');
      $('ul').addClass('won');

      rodTypes.forEach((rod) => {
        $(`.${rod}`).addClass('green');
      });

      alert('Congrats! You won!');
    }
  }
}

module.exports = View;