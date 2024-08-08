const pieces = [];
const boards = {};
let piecesConf = [];
let current = [];
let solutions = [];
let stepInd = 0;
let done = false;
let ignoreInvalid = true;
let ignoreNotSolution = false;
let pauseOnSolution = false;
let drawLines = false;
let W;
let origin;
let board;
let resetBut, playBut, stepBut, limitFrameRateChe, limitFrameRateSli, boardSel, shuffledChe, validChe, solutionsChe, pauseChe, linesChe; 
let showcaseLastT = Date.now();
let showcaseLastInd = 0;

const easyboardpoints = [
  // 1st Row (5 Triangles)
  [[0, 0], [1, 0], [1, 1]],
  [[1, 0], [2, 0], [2, 1]],
  [[0, 1], [0, 0], [1, 1]],
  [[1, 1], [1, 0], [2, 1]],
  [[2, 1], [2, 0], [3, 1]],
  //  2nd Row (9 Triangles)
  [[0, 2], [0, 1], [1, 2]],
  [[1, 2], [0, 1], [1, 1]],
  [[1, 2], [1, 1], [2, 2]],
  [[1, 1], [2, 1], [2, 2]],
  [[2, 2], [2, 1], [3, 2]],
  [[2, 1], [3, 1], [3, 2]],
  [[3, 2], [3, 1], [4, 2]],
  [[3, 1], [4, 1], [4, 2]],
  [[4, 2], [4, 1], [5, 2]],
  // 3rd Row (10 Triangles)
  [[0, 2], [1, 2], [1, 3]],
  [[1, 3], [1, 2], [2, 3]],
  [[1, 2], [2, 2], [2, 3]],
  [[2, 3], [2, 2], [3, 3]],
  [[2, 2], [3, 2], [3, 3]],
  [[3, 3], [3, 2], [4, 3]],
  [[3, 2], [4, 2], [4, 3]],
  [[4, 3], [4, 2], [5, 3]],
  [[4, 2], [5, 2], [5, 3]],
  [[5, 3], [5, 2], [6, 3]],
  // 4th Row (10 Triangles)
  [[1, 3], [2, 3], [2, 4]],
  [[2, 4], [2, 3], [3, 4]],
  [[2, 3], [3, 3], [3, 4]],
  [[3, 4], [3, 3], [4, 4]],
  [[3, 3], [4, 3], [4, 4]],
  [[4, 4], [4, 3], [5, 4]],
  [[4, 3], [5, 3], [5, 4]],
  [[5, 4], [5, 3], [6, 4]],
  [[5, 3], [6, 3], [6, 4]],
  [[6, 4], [6, 3], [7, 4]],
  // 5th Row (10 Triangles)
  [[2, 4], [3, 4], [3, 5]],
  [[3, 5], [3, 4], [4, 5]],
  [[3, 4], [4, 4], [4, 5]],
  [[4, 5], [4, 4], [5, 5]],
  [[4, 4], [5, 4], [5, 5]],
  [[5, 5], [5, 4], [6, 5]],
  [[5, 4], [6, 4], [6, 5]],
  [[6, 5], [6, 4], [7, 5]],
  [[6, 4], [7, 4], [7, 5]],
  [[7, 5], [7, 4], [8, 5]],
  // 6th Row (10 Triangles)
  [[3, 6], [3, 5], [4, 6]],
  [[3, 5], [4, 5], [4, 6]],
  [[4, 6], [4, 5], [5, 6]],
  [[4, 5], [5, 5], [5, 6]],
  [[5, 6], [5, 5], [6, 6]],
  [[5, 5], [6, 5], [6, 6]],
  [[6, 6], [6, 5], [7, 6]],
  [[6, 5], [7, 5], [7, 6]],
  [[7, 6], [7, 5], [8, 6]],
  [[7, 5], [8, 5], [8, 6]],
  // 7th Row (7 Triangles)
  [[3, 6], [4, 6], [4, 7]],
  [[4, 7], [4, 6], [5, 7]],
  [[4, 6], [5, 6], [5, 7]],
  [[5, 7], [5, 6], [6, 7]],
  [[5, 6], [6, 6], [6, 7]],
  [[6, 7], [6, 6], [7, 7]],
  [[6, 6], [7, 6], [7, 7]]
];

const hardboardpoints = [
  // 1st Row (10 Triangles)
  [[0, 0], [1, 0], [1, 1]],
  [[0, 1], [0, 0], [1, 1]],
  [[1, 1], [1, 0], [2, 1]],
  [[1, 0], [2, 0], [2, 1]],
  [[2, 1], [2, 0], [3, 1]],
  [[2, 0], [3, 0], [3, 1]],
  [[3, 1], [3, 0], [4, 1]],
  [[4, 1], [4, 0], [5, 1]],
  [[4, 0], [5, 0], [5, 1]],
  [[5, 1], [5, 0], [6, 1]],
  // 2nd Row (13 Triangles)
  [[0, 2], [0, 1], [1, 2]],
  [[0, 1], [1, 2], [1, 1]],
  [[1, 2], [1, 1], [2, 2]],
  [[1, 1], [2, 2], [2, 1]],
  [[2, 2], [2, 1], [3, 2]],
  [[2, 1], [3, 1], [3, 2]],
  [[3, 2], [3, 1], [4, 2]],
  [[3, 1], [4, 1], [4, 2]],
  [[4, 2], [4, 1], [5, 2]],
  [[4, 1], [5, 1], [5, 2]],
  [[5, 2], [5, 1], [6, 2]],
  [[5, 1], [6, 1], [6, 2]],
  [[6, 2], [6, 1], [7, 2]],
  // 3rd Row (13 Triangles)
  [[0, 2], [1, 2], [1, 3]],
  [[1, 3], [1, 2], [2, 3]],
  [[1, 2], [2, 2], [2, 3]],
  [[2, 3], [2, 2], [3, 3]],
  [[2, 2], [3, 2], [3, 3]],
  [[3, 3], [3, 2], [4, 3]],
  [[3, 2], [4, 2], [4, 3]],
  [[4, 3], [4, 2], [5, 3]],
  [[4, 2], [5, 2], [5, 3]],
  [[5, 3], [5, 2], [6, 3]],
  [[5, 2], [6, 2], [6, 3]],
  [[6, 3], [6, 2], [7, 3]],
  [[6, 2], [7, 2], [7, 3]],
  // 4th Row (11 Triangles)
  [[1, 3], [2, 3], [2, 4]],
  [[2, 4], [2, 3], [3, 4]],
  [[2, 3], [3, 3], [3, 4]],
  [[3, 4], [3, 3], [4, 4]],
  [[3, 3], [4, 3], [4, 4]],
  [[4, 4], [4, 3], [5, 4]],
  [[4, 3], [5, 3], [5, 4]],
  [[5, 4], [5, 3], [6, 4]],
  [[5, 3], [6, 3], [6, 4]],
  [[6, 4], [6, 3], [7, 4]],
  [[6, 3], [7, 3], [7, 4]],
  // 5th Row (9 Triangles)
  [[2, 4], [3, 4], [3, 5]],
  [[3, 5], [3, 4], [4, 5]],
  [[3, 4], [4, 4], [4, 5]],
  [[4, 5], [4, 4], [5, 5]],
  [[4, 4], [5, 4], [5, 5]],
  [[5, 5], [5, 4], [6, 5]],
  [[5, 4], [6, 4], [6, 5]],
  [[6, 5], [6, 4], [7, 5]],
  [[6, 4], [7, 4], [7, 5]],
  // 6th Row (7 Triangles)
  [[3, 5], [4, 5], [4, 6]],
  [[4, 6], [4, 5], [5, 6]],
  [[4, 5], [5, 5], [5, 6]],
  [[5, 6], [5, 5], [6, 6]],
  [[5, 5], [6, 5], [6, 6]],
  [[6, 6], [6, 5], [7, 6]],
  [[6, 5], [7, 5], [7, 6]]
];

const piecespoints = [
  [ // Piece 1
    [[0, 0], [1, 1], [1, 0]],
    [[0, 0], [0, -1], [1, 0]],
    [[0, -1], [1, -1], [1, 0]],
    [[0, -1], [0, -2], [1, -1]],
    [[0, -2], [1, -2], [1, -1]],
    [[1, -1], [1, -2], [2, -1]],
    [[1, -2], [2, -2], [2, -1]],
    [[1, -2], [1, -3], [2, -2]],
    [[2, -1], [2, -2], [3, -1]],
    [[2, -2], [3, -2], [3, -1]],
    [[3, -1], [3, -2], [4, -1]],
    [[3, -1], [4, -1], [4, 0]],
    [[3, 0], [3, -1], [4, 0]]
  ], [ // Piece 2
    [[0, 0], [1, 0], [1, 1]],
    [[1, 1], [1, 0], [2, 1]],
    [[0, 0], [0, -1], [1, 0]],
    [[0, -1], [1, -1], [1, 0]],
    [[0, -1], [0, -2], [1, -1]],
    [[0, -2], [1, -2], [1, -1]],
    [[1, -1], [1, -2], [2, -1]],
    [[1, -2], [2, -2], [2, -1]],
    [[2, -1], [2, -2], [3, -1]],
    [[2, -2], [3, -2], [3, -1]],
    [[3, -1], [3, -2], [4, -1]],
    [[3, -1], [4, -1], [4, 0]],
    [[4, 0], [4, -1], [5, 0]]
  ], [ // Piece 3
    [[0, 0], [1, 0], [1, 1]],
    [[1, 1], [1, 0], [2, 1]],
    [[0, 0], [0, -1], [1, 0]],
    [[0, -1], [1, -1], [1, 0]],
    [[0, -1], [0, -2], [1, -1]],
    [[0, -2], [1, -2], [1, -1]],
    [[1, -1], [1, -2], [2, -1]],
    [[1, -2], [2, -2], [2, -1]],
    [[2, -1], [2, -2], [3, -1]],
    [[2, -2], [3, -2], [3, -1]],
    [[2, -2], [2, -3], [3, -2]],
    [[2, -3], [3, -3], [3, -2]]
  ], [ // Piece 4
    [[0, 0], [1, 0], [1, 1]],
    [[1, 1], [1, 0], [2, 1]],
    [[1, 0], [2, 0], [2, 1]],
    [[2, 1], [2, 0], [3, 1]],
    [[2, 0], [3, 0], [3, 1]],
    [[2, 0], [2, -1], [3, 0]],
    [[2, -1], [3, -1], [3, 0]],
    [[3, 0], [3, -1], [4, 0]],
    [[2, -1], [2, -2], [3, -1]],
    [[2, -2], [3, -2], [3, -1]],
    [[3, -1], [3, -2], [4, -1]]
  ]
];

//throw new Error('line?'); // 219

function setup() {
  let size = select('body').style('width').slice(0, -2);

  if (windowWidth > windowHeight - 100)
    size = Math.round(windowHeight * 0.7);

  createCanvas(size, size).parent('canvas');
  frameRate(8);

  origin = new Point(width / 4, 3 * height / 4);
  W = Math.round(width / 10);
  
  //console.log(`width = ${width}\nheight = ${height}\norigin.x = ${origin.x}\norigin.y = ${origin.y}\nW = ${W}`);

  // <--DOM-->

  resetBut = createButton('Reset')
    .parent('reset')
    .mouseClicked(reset);

  playBut = createButton('Play/Pause')
    .parent('play')
    .mouseClicked(pause);

  stepBut = createButton('Step')
    .parent('step')
    .mouseClicked(event => {
      draw();
    });
  stepBut.elt.disabled = true;

  limitFrameRateChe = createCheckbox('', true)
    .parent('limitframerate')
    .changed(event => {
      if (event.target.checked) {
        frameRate(Number(limitFrameRateSli.elt.value));
        limitFrameRateSli.elt.disabled = false;
      } else {
        frameRate(Infinity);
        limitFrameRateSli.elt.disabled = true;
      }
    });

  limitFrameRateSli = createSlider(1, 60, 8)
    .parent('setframerate')
    .input(event => {
      const newfr = Number(event.target.value);
      frameRate(newfr);
      select('#valueframerate').html(newfr);
    });

  boardSel = createSelect(select('#selectboard'))
    .changed(event => {
      board = Shape.getCopy(boards[event.target.value]);
      reset();
    });

  shuffledChe = createCheckbox()
    .parent('setshuffled').changed(event => {
      if (!event.target.checked) piecesConf = pieces
        .map(p => Shape.getCopy(p));
    });

  validChe = createCheckbox('', true)
    .parent('setonlyvalid')
    .changed(event => {
      ignoreInvalid = event.target.checked;
    });

  solutionsChe = createCheckbox()
    .parent('setonlysolutions')
    .changed(event => {
      ignoreNotSolution = event.target.checked;
    });

  pauseChe = createCheckbox()
    .parent('setpauseonsolution')
    .changed(event => {
      pauseOnSolution = event.target.checked;
    });

  linesChe = createCheckbox()
    .parent('setlines')
    .changed(event => {
      drawLines = event.target.checked;
    });
  
  // <!--DOM-->

  // Initialize board and pieces instances
  for (const points of piecespoints) {
    pieces.push(new Shape(points
      .map(x => new Triangle(
        new Point(x[0][0], x[0][1]),
        new Point(x[1][0], x[1][1]),
        new Point(x[2][0], x[2][1])))));
  }

  boards.easy = new Shape(easyboardpoints
    .map(x => new Triangle(
      new Point(x[0][0], x[0][1]),
      new Point(x[1][0], x[1][1]),
      new Point(x[2][0], x[2][1]),
      true
    )), true);

  boards.hard = new Shape(hardboardpoints
    .map(x => new Triangle(
      new Point(x[0][0], x[0][1]),
      new Point(x[1][0], x[1][1]),
      new Point(x[2][0], x[2][1]),
      true
    )), true);
  
  // Easy Board corrections
  for (let i = 0; i < 5; i++) boards.easy.rotate();
  boards.easy.translate(0, 3);

  // Pieces Configuration with 0 transformations
  piecesConf = pieces.map(p => Shape.getCopy(p));

  // Set board
  board = Shape.getCopy(boards.easy);
}

function pause() {
  if (isLooping()) {
    noLoop();
    stepBut.elt.disabled = false;
  } else {
    loop();
    stepBut.elt.disabled = true;
  }
}

function reset() {
  done = false;
  stepInd = 0;
  current = [];
  solutions = [];
  showcaseLastInd = 0;

  // Shuffle Pieces if necessary
  if (shuffledChe.checked()) {
    piecesConf = pieces
      .map(x => [x, Math.random()])
      .sort((a, b) => a[1] - b[1])
      .map(x => x[0]);

    for (const p of piecesConf) {
      for (let i = 0; i < Math.random() * 5; i++) p.rotate();
      if (Math.random() < 0.5) p.reflect();
      p.rotation = 0;
      p.reflected = false;
    }
  }

  if (!isLooping()) draw();
}

//throw new Error('line?'); // 381

class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  translate(dx, dy) {
    this.x += dx;
    this.y += dy;
  }

  rotate() {
    const rotX = this.x - this.y;
    const rotY = this.x;

    this.x = rotX;
    this.y = rotY;
  }

  reflect(ver = true) {
    if (ver) {
      this.x -= this.y;
      this.y *= -1;
    } else {
      this.y -= this.x;
      this.x *= -1;
    }
  }

  draw() {
    push();
    stroke(255, 0, 0);
    strokeWeight(5);

    point(this.x, this.y);
    pop();
  }

  static compare(A, B) {
    return (A.x === B.x && A.y == B.y);
  }

  static getCopy(point) {
    return new Point(point.x, point.y);
  }

  static triToCar(A) {
    const xcar = origin.x + W * ((-1 * A.y) / 2 + A.x);
    const ycar = origin.y - W * ((A.y * Math.sqrt(3)) / 2);

    return new Point(xcar, ycar);
  }

  static triToUniCar(A) {
    const xcar = A.y / -2 + A.x;
    const ycar = (A.y * Math.sqrt(3)) / 2;

    return new Point(xcar, ycar);
  }

  static carToTri(A) {
    const xtri = A.x + A.y / 2;
    const ytri = 2 * A.y / Math.sqrt(3);

    return new Point(xtri, ytri);
  }
}

//throw new Error('line?'); // 451

class Triangle {
  constructor(A, B, C, board = false) {
    this.A = A;
    this.B = B;
    this.C = C;
    this.board = board;
    this.fitted = false;
  }

  get points() {
    return [this.A, this.B, this.C];
  }

  translate(dx, dy) {
    this.A.translate(dx, dy);
    this.B.translate(dx, dy);
    this.C.translate(dx, dy);
  }

  rotate() {
    this.A.rotate();
    this.B.rotate();
    this.C.rotate();
  }

  reflect(ver = true) {
    this.A.reflect(ver);
    this.B.reflect(ver);
    this.C.reflect(ver);
  }

  draw() {
    const points = this.points
      .map(p => Point.triToCar(p));

    push();
    noStroke();

    if (this.fitted) fill(20, 240, 20);
    else fill(240, 20, 20);

    triangle(
      points[0].x, points[0].y,
      points[1].x, points[1].y,
      points[2].x, points[2].y
    );

    pop();
  }

  static compare(a, b) {
    return a.points.every(p1 => b.points.some(p2 => Point.compare(p1, p2)));
  }

  static getCopy(triangle) {
    return new Triangle(Point.getCopy(triangle.A), Point.getCopy(triangle.B), Point.getCopy(triangle.C), triangle.board);
  }
}

//throw new Error('line?'); // 512

class Shape {
  constructor(triangles, board = false) {
    this.triangles = triangles;
    this.board = board;
    this.rotation = 0;
    this.reflected = false;
    this.fitted = false;
    this.outline = Shape.getOutline(this);
  }

  get minX() {
    return this.triangles
      .flatMap(t => [t.A.x, t.B.x, t.C.x])
      .reduce((min, x) => (x < min) ? x : min);
  }

  get maxX() {
    return this.triangles
      .flatMap(t => [t.A.x, t.B.x, t.C.x])
      .reduce((max, x) => (x > max) ? x : max);
  }

  get minY() {
    return this.triangles
      .flatMap(t => [t.A.y, t.B.y, t.C.y])
      .reduce((min, y) => (y < min) ? y : min);
  }

  get maxY() {
    return this.triangles
      .flatMap(t => [t.A.y, t.B.y, t.C.y])
      .reduce((max, y) => (y > max) ? y : max);
  }

  translate(dx, dy) {
    for (const t of this.triangles) {
      t.translate(dx, dy);
    }
  }

  rotate() {
    this.rotation = (this.rotation + 1) % 6;

    for (const t of this.triangles) {
      t.rotate();
    }
  }

  reflect(ver = true) {
    this.reflected = !this.reflected;

    for (const t of this.triangles) {
      t.reflect(ver);
    }
  }

  containsTriangle(triangle) {
    triangle.fitted = this.triangles.some(t => Triangle.compare(t, triangle));

    return triangle.fitted;
  }

  contains(shape) {
    for (const t1 of shape.triangles) {
      t1.fitted = this.triangles.some(t2 => Triangle.compare(t1, t2));
    }

    shape.fitted = shape.triangles.every(t => t.fitted);

    return shape.fitted;
  }

  draw(drawTriangles = true) {
    const outline = this.outline
      .map(p => Point.triToCar(p));
    
    push();
    strokeWeight(2);
    stroke(51);
    if (this.board) fill(111);
    else fill(99);
    
    beginShape();
    
    for (const point of outline) {
      vertex(point.x, point.y);
    }
    
    endShape(CLOSE);
    pop();

    if (drawTriangles) {
      for (const triangle of this.triangles) {
        triangle.draw();
      }
    }
  }

  static compare(s1, s2) {
    if (s1.triangles.length !== s2.triangles.length) return false;

    return s1.triangles.every(t1 => s2.some(t2 => Triangle.compare(t1, t2)));
  }

  static getOutline(shape) {
    const segments = shape.triangles
      .flatMap(triangle => [
        new LineSeg(triangle.A, triangle.B),
        new LineSeg(triangle.A, triangle.C),
        new LineSeg(triangle.B, triangle.C)])
      .map((seg1, i, all) => [seg1, all
        .reduce((occ, seg2) => (LineSeg.compare(seg1, seg2)) ? occ + 1 : occ, 0)])
      .filter(x => x[1] === 1)
      .map(x => x[0]);

    const sorted = [segments.shift()];

    while (segments.length > 0) {
      for (let i = segments.length - 1; i >= 0; i--) {
        if (Point.compare(sorted[sorted.length - 1].B, segments[i].A)) {
          sorted.push(segments.splice(i, 1)[0]);
        } else if (Point.compare(sorted[sorted.length - 1].B, segments[i].B)) {
          sorted.push(segments.splice(i, 1)[0].switch());
        }
      }
    }

    return sorted
      .map(seg => seg.A);
  }

  static getCopy(shape) {
    return new Shape(shape.triangles.map(t => Triangle.getCopy(t)), shape.board);
  }
}

class LineSeg {
  constructor(A, B) {
    this.A = A;
    this.B = B;
  }

  switch() {
    [this.A, this.B] = [this.B, this.A];
    
    return this;
  }

  static compare(a, b) {
    return (
      Point.compare(a.A, b.A) &&
      Point.compare(a.B, b.B)
    ) || (
      Point.compare(a.A, b.B) &&
      Point.compare(a.B, b.A)
    );
  }
}

//throw new Error('line?'); // 673

function step() {
  const status = {
    valid: 'VALID',
    invalid: 'INVALID',
    solution: 'SOLUTION',
    error: 'ERROR'
  };

  function getStatus(piece) {
    board.contains(piece);

    if (current.length === 1) return (piece.fitted) ? status.valid : status.invalid;

    overlap(current.slice(0, current.length - 1), piece);

    if (current.length === pieces.length && current.every(p => p.fitted)) {
      // SOLUTION FOUND
      //console.log(`Found a solution! stepInd: ${stepInd}`);
      solutions.push(current.map(s => Shape.getCopy(s)));

      if (pauseOnSolution) pause();

      return status.solution;
    }

    return (piece.fitted) ? status.valid : status.invalid;
  }

  stepInd++;

  if (current.length === 0) {
    // Add first Piece
    //console.log('added first piece');
    const piece = Shape.getCopy(piecesConf[0]);
    piece.translate(board.minX - piece.minX, board.minY - piece.minY);
    current.push(piece);

    return getStatus(piece);

  } else if (!current[current.length - 1].fitted) {
    // Advance the Piece
    const piece = current[current.length - 1];

    // dokler je maxX od piecea manjši od boarda, premikaj DESNO
    if (piece.maxX < board.maxX) {
      //console.log('advance right');
      piece.translate(1, 0);

      return getStatus(piece);
    }

    // ko vec ne - premakni eno GOR in poravnaj minX
    if (piece.maxY < board.maxY) {
      //console.log('advance up, reset x');
      piece.translate(board.minX - piece.minX, 1);

      return getStatus(piece);
    }

    // ko je maxY od piecea vecji od maxY od boarda resetiraj xy in rotiraj
    if (piece.rotation < 5) {
      //console.log('advance rotate, reset xy');
      piece.rotate();
      piece.translate(board.minX - piece.minX, board.minY - piece.minY);

      return getStatus(piece);
    }

    // po vseh rotacijah se zrcali
    if (!piece.reflected) {
      //console.log('advance reflect, reset xy & rotation');
      piece.rotate();
      piece.reflect();
      piece.translate(board.minX - piece.minX, board.minY - piece.minY);

      return getStatus(piece);
    }

    // Backtrack
    //console.log('BACKTRACKING');
    current.pop();

    if (current.length > 0) {
      // Advance previous Piece
      const piece = current[current.length - 1];
      piece.translate(1, 0);

      return getStatus(piece);
    } else {
      // Left without a legal move
      //console.log('step returning error. that means it\'s done');

      return status.error;
    }
  } else if (current.length < pieces.length) {
    // Add another Piece
    //console.log('added another piece');
    const piece = Shape.getCopy(piecesConf[current.length]);
    piece.translate(board.minX - piece.minX, board.minY - piece.minY);
    current.push(piece);
    
    return getStatus(piece);
  } else {
    // Currently a solution
    // Advance anyway in order to try and find more solutions
    const piece = current[current.length - 1];
    piece.translate(1, 0);

    return getStatus(piece);
  }
}

function overlap(placed, test) {
  for (const triangle of test.triangles) {
    if (placed.some(p => (p.triangles.some(t => Triangle.compare(triangle, t))))) {
      test.fitted = false;
      triangle.fitted = false;
    }
  }
}

//throw new Error('line?'); // 796

function draw() {
  background(222);

  // Lines
  if (drawLines) {
    const h = Math.sqrt(3) * W / 2;
    const horroff = height * Math.tan(30 * Math.PI / 180);

    push();
    strokeWeight(1);
    stroke(88);

    // Horizontal lines
    const ymax = origin.y + h * Math.floor((height - origin.y) / h);

    for (let y = ymax; y >= 0; y -= h) {
      line(0, y, width, y);
    }

    // Right Slanted Lines
    const bottomxcorrection = Math.tan(30 * Math.PI / 180) * (height - origin.y) + W * Math.floor((origin.x + origin.y * Math.tan(30 * Math.PI / 180)) / W);

    for (let xbottom = origin.x - bottomxcorrection; xbottom < Number(width) + horroff; xbottom += W) {
      line(xbottom, height, xbottom + horroff, 0);
    }
    
    // Left Slanted Lines
    const topxcorrection = Math.tan(30 * Math.PI / 180) * origin.y + W * Math.floor((origin.x + origin.y * Math.tan(30 * Math.PI / 180)) / W);

    for (let xtop = origin.x - topxcorrection; xtop < Number(width) + horroff; xtop += W) {
      line(xtop, 0, xtop + horroff, height);
    }
    
    // Origin
    origin.draw();
    
    // Cartesian Axis
    stroke(200, 40, 40);
    strokeWeight(1);
    line(0, origin.y, width, origin.y);
    line(origin.x, 0, origin.x, height);
    
    // Triangluar Y Axis
    const axxzero = origin.x - origin.y * Math.tan(30 * Math.PI / 180);
    line(axxzero, 0, axxzero + horroff, height);
    
    pop();
  }
  
  // Draw Gameboard
  board.draw(false);

  // Advance Simulation
  while (!done) {
    const status = step();

    if (status === 'ERROR') {
      done = true;
      break;
    }

    if (
      (!ignoreInvalid || ['VALID', 'SOLUTION'].includes(status)) && 
      (!ignoreNotSolution || status === 'SOLUTION')
    ) break;
  }
  
  // Draw Pieces
  for (const piece of current) {
    piece.draw();
  }

  // Solution Showcase
  if (done && solutions.length > 0) {
    const t = Date.now();
    let index = showcaseLastInd;

    if (showcaseLastT + 1000 < t) {
      index = (showcaseLastInd + 1 < solutions.length) ? showcaseLastInd + 1 : 0;
      showcaseLastInd = index;
      showcaseLastT = t;
    }

    const solution = solutions[index];

    push();
    textAlign(CENTER);
    textSize(Math.round(width / 7));
    textFont('monospace');
    noStroke();
    fill(0);
    text(`SOLUTION ${index + 1}`, width / 2, height / 5);
    pop();

    for (const piece of solution) {
      piece.draw(false);
    }
  }

  // Debug
  push();
  noStroke();
  fill(0);
  textSize(12);
  textFont('monospace');
  textAlign(LEFT, BASELINE);
  text(`fps: ${frameRate().toFixed(0)}`, 6, 18);
  text(`step: ${stepInd}`, 6, 33);
  text(`solutions: ${solutions.length}`, 6, 48);
  pop();
}

//throw new Error('line?'); // 910

/*const showcase = showcaseGen();

function* showcaseGen() {
  for (const piece of pieces) {
    for (let rot = 0; rot < 6; rot++) {
      for (let ref = 0; ref < 2; ref++) {
        const conf = Shape.getCopy(piece);
        for (let r = 0; r <= rot; r++) conf.rotate();
        if (ref) conf.reflect();

        yield conf;
      }
    }
  }
}*/