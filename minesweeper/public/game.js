function generateMines(length) {
  var arr = []
  while(arr.length < length){
      var randomnumber = Math.floor(Math.random()*100) + 1;
      if(arr.indexOf(randomnumber) > -1) continue;
      arr[arr.length] = randomnumber;
  }
  return arr;
}
$( document ).ready(function() {
  let level = 10;
  let mines = generateMines(level);
  let board = new Array(level*level);

  mines.forEach(m => {
    board[m] = 9;
  });

  let grid = [];

  for(let i = 0; i < 10; i++) {
    let row = [];
    for(let j = 0; j < 10; j++) {
      let id = i.toString() + j.toString();
      let col = (!board[parseInt(id, 10)]) ? 0 : board[parseInt(id,10)];
      row.push(col);
    }
    grid.push(row);
  }

  let numOfMine = 0;

  for(let i = 0; i < grid.length; i++) {
    for(let j = 0; j < grid[i].length; j++) {
      if(grid[i][j] != 9) {
        if((j - 1 >= 0 && j + 1 < level) && (i - 1 >= 0 && i + 1 < level)) {
          if(grid[i-1][j-1] === 9) {
              numOfMine++;
          }
          if(grid[i-1][j] === 9) {
              numOfMine++;
          }
          if(grid[i-1][j+1] === 9) {
              numOfMine++;
          }
          if(grid[i][j-1] === 9) {
              numOfMine++;
          }
          if(grid[i][j+1] === 9) {
              numOfMine++;
          }
          if(grid[i+1][j-1] === 9) {
              numOfMine++;
          }
          if(grid[i+1][j] === 9) {
              numOfMine++;
          }
          if(grid[i+1][j+1] === 9) {
              numOfMine++;
          }
        } else if((j - 1 >= 0 && j + 1 < level) && i - 1 < 0) {
          if(grid[i][j-1] === 9) {
              numOfMine++;
          }
          if(grid[i][j+1] === 9) {
              numOfMine++;
          }
          if(grid[i+1][j-1] === 9) {
              numOfMine++;
          }
          if(grid[i+1][j] === 9) {
              numOfMine++;
          }
          if(grid[i+1][j+1] === 9) {
              numOfMine++;
          }
        } else if((j - 1 >= 0 && j + 1 < level) && i + 1 >= level) {
          if(grid[i-1][j-1] === 9) {
              numOfMine++;
          }
          if(grid[i-1][j] === 9) {
              numOfMine++;
          }
          if(grid[i-1][j+1] === 9) {
              numOfMine++;
          }
          if(grid[i][j-1] === 9) {
              numOfMine++;
          }
          if(grid[i][j+1] === 9) {
              numOfMine++;
          }
        } else if(j - 1 < 0 && (i - 1 >= 0 && i + 1 < level)) {
          if(grid[i-1][j] === 9) {
              numOfMine++;
          }
          if(grid[i+1][j] === 9) {
            numOfMine++;
          }
          if(grid[i-1][j+1] === 9) {
              numOfMine++;
          }
          if(grid[i][j+1] === 9) {
              numOfMine++;
          }
          if(grid[i+1][j+1] === 9) {
              numOfMine++;
          }
        } else if(j + 1 >= level && (i - 1 >= 0 && i + 1 < level)) {
          if(grid[i-1][j-1] === 9) {
              numOfMine++;
          }
          if(grid[i][j-1] === 9) {
            numOfMine++;
          }
          if(grid[i+1][j-1] === 9) {
            numOfMine++;
          }
          if(grid[i-1][j] === 9) {
              numOfMine++;
          }
          if(grid[i+1][j] === 9) {
              numOfMine++;
          }
        } else if(i + 1 >= level && j + 1 >= level) {
          if(grid[i-1][j-1] === 9) {
              numOfMine++;
          }
          if(grid[i-1][j] === 9) {
              numOfMine++;
          }
          if(grid[i][j-1] === 9) {
              numOfMine++;
          }
        }
        else {
            if(grid[i][j-1] === 9) {
                numOfMine++;
            }
            if(grid[i][j+1] === 9) {
                numOfMine++;
            }
            console.log("hello");
        }
        grid[i][j] = numOfMine;
        numOfMine = 0;
      }
    }
  }

  grid.map((r, i) => {
    r.forEach((c, j) => {
      let id = i.toString() + j.toString();
      let style;
      switch(c) {
        case 0:
          style = "empty";
          break;
        case 1:
          style = "one";
          break;
        case 2:
          style = "two";
          break;
        case 3:
          style = "three";
          break;
        case 4:
          style = "four";
          break;
        case 5:
          style = "five";
          break;
        case 6:
          style = "six";
          break;
        case 7:
          style = "seven";
          break;
        case 8:
          style = "eight";
          break;
        case 9:
          style = "mine";
        default:
          break;
      }
      $(".grid").append(`<div class="box ${style}" id=${id}><span id=${"hint"+id} hidden>${c}</span></div>`);
      $(".grid").width(400);
      $(".grid").height(400);
      $(".box").width(40);
      $(".box").height(40);
    });
  });

  $(".box").click(function() {
    let coord = this.id.split("").map(i => parseInt(i, 10));
    if(grid[coord[0]][coord[1]] === 0) {

    } else if(grid[coord[0]][coord[1]] === 9) {

    } else {
      $( "#hint" + this.id ).show();
    }
  });

  $(".box").contextmenu(function() {
    $(this).addClass("flag");
  });

});
function edgeCases(i, j) {
  let ijokay = ((i - 1 >= 0 && i + 1 < level) && (j - 1 >= 0 && j + 1 < level));
  let jminus =((i - 1 >= 0 && i + 1 < level) && (j - 1 < 0 && j + 1 < level));
  let jover = ((i - 1 >= 0 && i + 1 < level) && (j - 1 >= 0 && j + 1 >= level));
  let iminus = ((i - 1 < 0 && i + 1 < level) && (j - 1 >= 0 && j + 1 < level));
  let iover = ((i - 1 >= 0 && i + 1 >= level) && (j - 1 >= 0 && j + 1 < level));
  let ijminus = (i - 1 < 0 && j - 1 < 0);
  let ijover = (i + 1 >= level && j + 1 >= level);
  return [ijminus, ijokay, ijover, iminus, iover, jminus, jover];
}
function getPerimeter(id) {
  let coord = id.split("").map(i => parseInt(i, 10));
  let visited = {};
  let stack = [];
  let closed = false;

  while(stack.length != 0 || !closed) {
    let cases;
    if(stack.length === 0){
      cases = edgeCases(coord[0], coord[1]);
    } else {
      let stackid = stack.pop();
      coord = stackid.split("").map(i => parseInt(i, 10));
    }
    let i = coord[0];
    let j = coord[1];
    if(grid[i - 1] != undefined &&
      grid[i + 1] != undefined &&
      grid[i][j - 1] != undefined &&
      grid[i][j + 1] != undefined) {
        if(grid[i-1][j-1] === 0) {
          let boxid = i.toString() + j.toString();
          stack.push(boxid);
        } else {
          
        }
        if(grid[i-1][j] === 0) {
        }
        if(grid[i-1][j+1] === 0) {
        }
        if(grid[i][j-1] === 0) {
        }
        if(grid[i][j+1] === 0) {
        }
        if(grid[i+1][j-1] === 0) {
        }
        if(grid[i+1][j] === 0) {
        }
        if(grid[i+1][j+1] === 0) {
        }
    } else if(grid[coord[0] - 1] === undefined &&
      grid[i + 1] != undefined &&
      grid[i][j - 1] != undefined &&
      grid[i][j + 1] != undefined) {

    } else if(grid[coord[0] - 1] != undefined &&
      grid[i + 1] === undefined &&
      grid[i][j - 1] != undefined &&
      grid[i][j + 1] != undefined) {

    } else if(grid[i- 1] != undefined &&
      grid[i + 1] != undefined &&
      grid[i][j - 1] === undefined &&
      grid[i][j+ 1] != undefined) {

    } else if(grid[i- 1] != undefined &&
      grid[i + 1] != undefined &&
      grid[i][j - 1] != undefined &&
      grid[i][j + 1] === undefined) {

    } else if(grid[i - 1] != undefined &&
      grid[i + 1] === undefined &&
      grid[i][j- 1] != undefined &&
      grid[i][j + 1] === undefined) {

    } else if(grid[i - 1] === undefined &&
      grid[i + 1] != undefined &&
      grid[i][j - 1] === undefined &&
      grid[i][j + 1] != undefined) {

    }

  }
  return Object.keys(visited);
}
