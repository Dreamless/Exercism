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
    let sizeW = newSize.width > 1 ? newSize.width : 1;
    let sizeH = newSize.height > 1 ? newSize.height : 1;
    const shiftSizeW = newSize.width + sizeW;
    const shiftSizeH = newSize.height + sizeH;

    if (shiftSizeW > this.screenSize.width) {
      sizeW = this.screenSize.width - this.position.x;
    }

    if (shiftSizeH > this.screenSize.height) {
      sizeH = this.screenSize.height - this.position.y;
    }

    this.size.resize(sizeW, sizeH);
  }

  move(newPosition) {
    let posX = newPosition.x > 0 ? newPosition.x : 0;
    let posY = newPosition.y > 0 ? newPosition.y : 0;
    const shiftWidth = this.size.width + posX;
    const shiftHeight = this.size.height + posY;

    if(shiftWidth > this.screenSize.width) {
      posX = this.screenSize.width - this.size.width;
    }

    if(shiftHeight > this.screenSize.height) {
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
