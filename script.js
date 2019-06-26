// Ширина и высота игрового пространства
  var X = 16, Y = 16; 
  var x = 0, y = 0;
  var stop = 1;
  var tick = 0.5;
  var lifeColor = "#FFFFA2";
  var deadColor = "#343536";

// Моделирование жизни
  var massiv = []; 
  for(var r = 0; r < X; r++) {
    massiv.push([]);
  }

  for(var r = 0; r < X; r++) {
    for(var c = 0; c < Y; c++) {
      massiv[r][c] = 0;  
    }
  }
    
  var elems = []; 
  for(var r = 0; r < X; r++) {
    elems.push([]);
  }

function boardInit(){
  var board = document.getElementById("board");
 
	for(var x= 0; x < 16; x++) {  
    var row = document.createElement("div");
    row.setAttribute("class", "row");
    board.appendChild(row);
    
		for(var y = 0; y < 16; y++) {
      var tile = document.createElement("div");
      tile.toggle = false;
      tile.x = x;
      tile.y = y;
      tile.setAttribute("class", "tile");
      tile.timer = 0;
      
      tile.onclick = function() {
        this.toggle = !this.toggle;                                    
        this.style.background = this.toggle? lifeColor : deadColor; 
        massiv[this.x][this.y] = this.toggle ? 1 : 0;
      }
      
      tile.onmouseover = function() {
        if (!this.toggle) {
          return;
        }
        this.timer = setTimeout(killTile, 2000, this);
      }      

      tile.onmouseout = function() {
        if (this.timer) {
          clearTimeout(this.timer);
          this.timer = 0;
        }
      } 
      
      row.appendChild(tile);
      elems[x][y] = tile;
		}    
	}
}

function killTile(tile) {
  tile.toggle = 0;
  tile.style.background = deadColor; 
  massiv[tile.x][tile.y] = 0;
}

function drawBoard(){
	for(var x = 0; x < 16; x++) {  
		for(var y = 0; y < 16; y++) {
      elems[x][y].style.background = massiv[x][y] ? lifeColor : deadColor;
		}    
	}
}

boardInit();

function run()
  {
    if(stop == 1) {
      document.getElementById("play").textContent = "СТОП";
      stop = 0;
      move();
    } else {
      document.getElementById("play").textContent = "Играть";
      stop = 1;
    }
  }


function time(x)
{
  tick = x;
  document.getElementById("timer").textContent=x+'сек.';
}

function move() 
{  
    var new_massiv = []; 
    var number = 0;

    for(var r = 0; r < X; r++) {
      new_massiv.push([]);
    }

    for(var r = 0; r < X; r++) {
      for(var c = 0; c < Y; c++) {
        new_massiv[r][c] = 0;
      }
    }
    
    // в пустой (мёртвой) клетке, рядом с которой ровно три живые клетки, зарождается жизнь;
    // если у живой клетки есть две или три живые соседки, то эта клетка продолжает жить; 
    // в противном случае, если соседей меньше двух или больше трёх, клетка умирает («от одиночества» или «от перенаселённости»)
    for(var r = 0; r < X; r++) {
      for(var c = 0; c < Y; c++) 
      {
        var counter_neigh = next(r, c) 
        // Смотрим прошлое состояние
        // Мертвая (== 0)
        if(massiv[r][c] == 0) {
          // Восстановление
          if(counter_neigh == 3) {
              new_massiv[r][c] = 1;
          }
        } else { // Живая
          if(counter_neigh < 2 || counter_neigh > 3) {
            new_massiv[r][c] = 0; // Убиваем
          } else { // Ничего не делаем
            new_massiv[r][c] = true; 
          }
        }
              
        if(x != 0 & y != 0) {
          new_massiv[x][y] = 1;
        }          
        
        number += massiv[r][c];
      }
    }
        
    massiv = new_massiv; 
    drawBoard(); 

    
    if(number == 0) {
      stop = 1;
      document.getElementById("play").textContent = "Играть";
    }
      
    if(stop == 0) {
      setTimeout(move, tick*1000); // Рекурсия
    }
}
   
  
  // СОСЕДИ
  function next(r,c) 
  {
    var counter = 0; 
    
    if(r >= 1 & c >= 1) {
      counter += massiv[r - 1][c - 1];
    }
    
    if(r >= 1) {
      counter += massiv[r - 1][c];
    }
    
    if(r >= 1 & c < Y - 1) {
      counter += massiv[r - 1][c + 1];
    }
    
    if(c >= 1) {
      counter += massiv[r][c - 1];
    }
    
    if(c < Y - 1) {
      counter += massiv[r][c + 1];
    }
    
    if(r < X - 1 & c >= 1) {
      counter += massiv[r + 1][c - 1];
    }
    
    if(r < X - 1) {
      counter += massiv[r + 1][c];
    }
    
    if(r < X - 1 & c < Y - 1) {
      counter += massiv[r + 1][c + 1];
    }
    
    return counter; 
  }

  function clean()
  {
    document.getElementById("play").textContent="Играть";
    stop = 1;
    for(var r = 0; r < X; r++) {
      for(var c = 0; c < Y; c++) {
        massiv[r][c] = 0;
      }
    }
    drawBoard();
  }

function firstEx()
{
  massiv = [
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,0],
  [0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,0],
  [0,0,0,0,0,1,1,0,0,0,1,1,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,1,1,1,0,0,1,1,0,1,1,0,0,1,1,1],
  [0,0,0,1,0,1,0,1,0,1,0,1,0,1,0,0],
  [0,0,0,0,0,1,1,0,0,0,1,1,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,1,1,0,0,0,1,1,0,0,0,0],
  [0,0,0,1,0,1,0,1,0,1,0,1,0,1,0,0],
  [0,1,1,1,0,0,1,1,0,1,1,0,0,1,1,1],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,1,1,0,0,0,1,1,0,0,0,0],
  [0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,0], 
  [0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,0], 
  ];
  drawBoard();
}

function secondEx()
{
  massiv = [
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,1,1,0,0,1,1,0,0,0,0,0],
  [0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0],
  [0,0,0,0,1,0,1,0,0,1,0,1,0,0,0,0],
  [0,0,0,0,1,0,0,0,0,0,0,1,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,1,0,0,0,0,0,0,1,0,0,0,0],
  [0,0,0,0,0,1,1,0,0,1,1,0,0,0,0,0],
  [0,0,0,0,0,0,1,1,1,1,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],  
  ];
  drawBoard();
}

function thirdEx()
{
  massiv = [
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],    
  ];
  drawBoard();
}
