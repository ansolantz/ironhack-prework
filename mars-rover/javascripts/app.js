// ======================
// Rover Object Goes Here

// let myRover = {
//   direction: 'N'
//   // direction values: 'N', 'S', 'E', 'W'
// }

document.addEventListener("DOMContentLoaded", function (event) {
  roverGrid.buildGrid('gridTable');
  wallE.drawRover();
  eve.drawRover();
});


document.onkeydown = function (event) {
  switch (event.keyCode) {
    case 37:
      wallE.turnLeft();
      break;
    case 38:
      wallE.moveForward();
      break;
    case 39:
      wallE.turnRight();
      break;
    case 40:
      wallE.moveBackwards();
      break;
  }
};

class Coordinate {

  constructor(currentX, currentY) {
    this.x = currentX;
    this.y = currentY;
  }

}

class Grid {

  constructor() {
    console.log('Creating a new Grid class');

  }

  buildGrid(tableID) {

    let tableRef = document.getElementById(tableID);
    for (let y = 0; y < 10; y++) {
      let newRow = tableRef.insertRow(tableRef.rows.length);
      for (let x = 0; x < 10; x++) {
        let newCell = newRow.insertCell(x);
        let newText = document.createTextNode(' ');
        newCell.appendChild(newText);
        newCell.setAttribute('id', '' + 'row' + y + '-col' + x + '');
      }
    }
  }

}

class Rover {

  direction = 'N';
  directionIcon = '&#9650;';
  color = 'Yellow';
  x = 0;
  y = 0;
  image = '';


  travelLog = [];

  constructor(startX, startY, roverImage) {
    console.log('Creating a new Rover class');
    this.x = startX;
    this.y = startY;
    this.image = roverImage;
  }


  // ======================

  drawRover() {
    document.getElementById('' + 'row' + this.y + '-col' + this.x + '').innerHTML = this.directionIcon + '<br><img src="images/' + this.image + '" class="roverImg">';

  }


  turnLeft() {
    console.log('turnLeft was called!');
    console.log('Old direction: ' + this.direction);

    if (this.direction === 'N') {
      this.direction = 'W';
      this.directionIcon = '&#9668;'
    } else if (this.direction === 'S') {
      this.direction = 'E';
      this.directionIcon = '&#9658;'
    }
    else if (this.direction === 'W') {
      this.direction = 'S';
      this.directionIcon = '&#9660;';
    }
    else if (this.direction === 'E') {
      this.direction = 'N';
      this.directionIcon = '&#9650;';
    } else {
      console.log('Not a valid direction!');
    }
    console.log('New direction: ' + this.direction);
    console.log('X: ' + this.x);
    console.log('Y: ' + this.y);

    document.getElementById('printDirection').innerHTML = 'Turning ' + this.direction + ' ' + this.directionIcon;

    document.getElementById('wallEIcon').innerHTML = this.directionIcon;
    this.drawRover();

  }

  // &#9668; Left
  // &#9658; Right
  // &#9650; Move Forward
  // &#9660; Move Backwards

  turnRight() {
    console.log('turnRight was called!');
    console.log('Old direction: ' + this.direction);

    if (this.direction === 'N') {
      this.direction = 'E';
      this.directionIcon = '&#9658;'
    } else if (this.direction === 'S') {
      this.direction = 'W';
      this.directionIcon = '&#9668;'
    }
    else if (this.direction === 'W') {
      this.direction = 'N';
      this.directionIcon = '&#9650;';
    }
    else if (this.direction === 'E') {
      this.direction = 'S';
      this.directionIcon = '&#9660;';
    } else {
      console.log('Not a valid direction!');
    }
    console.log('New direction: ' + this.direction);
    console.log('X: ' + this.x);
    console.log('Y: ' + this.y);

    document.getElementById('printDirection').innerHTML = 'Turning ' + this.direction + ' ' + this.directionIcon;

    document.getElementById('wallEIcon').innerHTML = this.directionIcon;
    this.drawRover();
  }

  checkBoundaries(x, y) {
    if (x < 0 || y < 0 || x > 9 || y > 9) {
      console.log('You hit the wall!');
      document.getElementById('errorMessage').innerHTML = 'You hit the wall! <br>Try again.'
      return false;
    } else {
      return true;
    }

  }

  moveForward() {
    console.log('moveForward was called')
    console.log('Direction: ' + this.direction)
    let didMove = false;

    if (this.direction === 'N' && this.checkBoundaries(this.x, this.y - 1)) {
      document.getElementById('' + 'row' + this.y + '-col' + this.x + '').innerHTML = '';
      this.y = this.y - 1
      didMove = true;
    } else if (this.direction === 'S' && this.checkBoundaries(this.x, this.y + 1)) {
      document.getElementById('' + 'row' + this.y + '-col' + this.x + '').innerHTML = '';
      this.y = this.y + 1
      didMove = true;
    } else if (this.direction === 'W' && this.checkBoundaries(this.x - 1, this.y)) {
      document.getElementById('' + 'row' + this.y + '-col' + this.x + '').innerHTML = '';
      this.x = this.x - 1
      didMove = true;
    } else if (this.direction === 'E' && this.checkBoundaries(this.x + 1, this.y)) {
      document.getElementById('' + 'row' + this.y + '-col' + this.x + '').innerHTML = '';
      this.x = this.x + 1
      didMove = true;
    } else {
      console.log('Not a valid move!');
      didMove = false;
    }


    if (didMove) {
      console.log('X: ' + this.x);
      console.log('Y: ' + this.y);

      document.getElementById('printDirection').innerHTML = 'Moving Forward ' + this.directionIcon + '<br>X: ' + this.x + '<br>Y: ' + this.y;
      let currentCoordinate = new Coordinate(this.x, this.y)
      this.travelLog.push(currentCoordinate);
      this.printTravelLog();

      document.getElementById('errorMessage').innerHTML = '';

      this.drawRover();


    }

  }

  moveBackwards() {
    console.log('moveBackwards was called')
    console.log('Direction: ' + this.direction)
    let didMove = false;

    if (this.direction === 'N' && this.checkBoundaries(this.x, this.y + 1)) {
      document.getElementById('' + 'row' + this.y + '-col' + this.x + '').innerHTML = '';
      this.y = this.y + 1
      didMove = true;
    } else if (this.direction === 'S' && this.checkBoundaries(this.x, this.y - 1)) {
      document.getElementById('' + 'row' + this.y + '-col' + this.x + '').innerHTML = '';
      this.y = this.y - 1
      didMove = true;
    } else if (this.direction === 'W' && this.checkBoundaries(this.x + 1, this.y)) {
      document.getElementById('' + 'row' + this.y + '-col' + this.x + '').innerHTML = '';
      this.x = this.x + 1
      didMove = true;
    } else if (this.direction === 'E' && this.checkBoundaries(this.x - 1, this.y)) {
      document.getElementById('' + 'row' + this.y + '-col' + this.x + '').innerHTML = '';
      this.x = this.x - 1
      didMove = true;
    } else {
      console.log('Not a valid move!');
      didMove = false;
    }

    if (didMove) {
      document.getElementById('printDirection').innerHTML = 'Moving Backwards ' + this.directionIcon + '<br>X: ' + this.x + '<br>Y: ' + this.y;

      console.log('X: ' + this.x);
      console.log('Y: ' + this.y);
      let currentCoordinate = new Coordinate(this.x, this.y)
      this.travelLog.push(currentCoordinate);
      this.printTravelLog();

      document.getElementById('errorMessage').innerHTML = '';

      this.drawRover();
    }

  }

  runCommands(commands) {
    for (let i = 0; i < commands.length; i++) {
      if (commands[i] === 'f') {
        this.moveForward();
      } else if (commands[i] === 'r') {
        this.turnRight();
      } else if (commands[i] === 'l') {
        this.turnLeft();
      } else if (commands[i] === 'b') {
        this.moveBackwards();
      }
    }
  }

  printTravelLog() {
    this.travelLog.forEach(coordinate => {
      console.log('x history: ' + coordinate.x);
      console.log('y history: ' + coordinate.y);
    });
    document.getElementById('printTravelLog').innerHTML = document.getElementById('printTravelLog').innerHTML + 'X: ' + this.x + ' Y: ' + this.y + '<br>';
  }

}

let wallE = new Rover(0, 0, 'wall-e.svg');
let eve = new Rover(5, 5, 'eve.svg');
let roverGrid = new Grid();












