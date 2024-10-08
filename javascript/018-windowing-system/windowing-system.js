// @ts-check
export class Size {
  constructor(width = 80, height = 60) {
    this.width = width;
    this.height = height;
  }

  resize(newWidth, newHeight) {
    this.width = newWidth;
    this.height = newHeight;
  }
}

export class Position {
  constructor(x = 0, y = 0) {
    this.x = x;
    this.y = y;
  }

  move(newX, newY) {
    this.x = newX;
    this.y = newY;
  }
}

export class ProgramWindow {
  constructor() {
    this.screenSize = new Size(800, 600);
    this.size = new Size();
    this.position = new Position();
  }

  resize(newSize) {
    let newWidth = newSize.width > 1 ? newSize.width : 1;
    let newHeight = newSize.height > 1 ? newSize.height : 1;
    const leftBound = this.position.x + newWidth;
    const bottomBound = this.position.y + newHeight;

    if (leftBound > this.screenSize.width) {
      newWidth = this.screenSize.width - this.position.x;
    }

    if (bottomBound > this.screenSize.height) {
      newHeight = this.screenSize.height - this.position.y;
    }

    this.size.resize(newWidth, newHeight);
  }

  move(newPosition) {
    let posX = newPosition.x > 0 ? newPosition.x : 0;
    let posY = newPosition.y > 0 ? newPosition.y : 0;
    const leftBound = this.size.width + posX;
    const bottomBound = this.size.height + posY;

    if (leftBound > this.screenSize.width) {
      posX = this.screenSize.width - this.size.width;
    }

    if (bottomBound > this.screenSize.height) {
      posY = this.screenSize.height - this.size.height;
    }

    this.position.move(posX, posY);
  }
}


export function changeWindow(updatedWindow) {
  updatedWindow.position.move(100, 150);
  updatedWindow.size.resize(400, 300)
  return updatedWindow;
}
