const EMPTY = 0;
const MINE = 9;
const BORDER_MATRIX = [[-1,-1], [-1,0], [-1,1], [0,-1], [0,1], [1,-1], [1,0], [1,1]];

class Game {
    makeBoard(size, mineCount) {
      this.mineCount = mineCount;
      this.size = size;
      this.board = new Array(size).fill([]).map(() => new Array(size).fill(EMPTY));
      while(mineCount) {
        if(this.placeMines()) {
          mineCount--;
        }
      }
    }

    applyToBorder(row, col, fn) {
      BORDER_MATRIX.forEach(([offsetRow, offsetCol]) => {
        const newRow = row + offsetRow;
        const newCol = col + offsetCol;
        if(!(newRow < 0 || newCol < 0 || newRow >= this.size || newCol >= this.size)) return false;
        fn.call(this, newRow, newCol);
      });
    }

    placeMines() {
      const rand = Math.random() * this.size * this.size;
      const row = parseInt(rand/this.size), col = parseInt(rand % this.size);
      if(this.board[row][col] === EMPTY) {
          this.board[row][col] = MINE;
          this.applyToBorder(row, col, (r, c) => {
            if(this.board[r] && this.board[r][c] != MINE){
              this.board[r][c]++;
            }
          });
      }
      return true;
    }

    gameOver() {
      new Audio("./bomb.mp3").play();
      alert('You lost!');
    }

    onClicked(e, row, col) {
      console.log(e.type, row, col);
      const el = $(e.target);
      if(e.type === "click") {
        if(this.board[row][col] === MINE) {
          return this.gameOver();
        } else if(this.board[row][col] === EMPTY) {
          this.applyToBorder(row, col, (r, c) => {
            const box = $(`#${r}-${c}`);
            if(!box.hasClass('cover')) return;
            if(this.board[r][c] !== EMPTY) return;
            this.onClicked(e,r,c);
          });
        }
        el.html(this.board[row][col]);
        el.removeClass('cover');
      } else if(e.type === 'contextmenu' && el.hasClass('cover')) {
        el.toggleClass('flag');
      }
      if($('.cover').length === this.mineCount && $('.mine').length === this.mineCount) {
        alert('You won!');
      }
      e.preventDefault();
    }

    buildBoardHTML() {
      const { board } = this;

      for(let i in board) {
        console.log(i, " | ", board[i].join(" "));
      }

      const grid = $('.grid');

      board.forEach((row, r) => {
        const rowEl = $('<div class="row"/>');
        row.forEach((col, c) => {
          const colEl = $(`<div id="${r}-${c}"class="col cover"/>`);
          colEl.on('click contextmenu', (e) => this.onClicked(e, r, c));
          rowEl.append(colEl);
        });
        grid.append(rowEl);
      })
    }
}

$(document).ready(function() {
  const myGame = new Game();
  $('#startGame').on('click', function() {
    if($('.size').val() < $('.mines').val()){
      alert("invalid board!");
    } else {
      myGame.makeBoard(parseInt($('.size').val()), parseInt($('.mines').val()));
      myGame.buildBoardHTML();
    }
  });
});
