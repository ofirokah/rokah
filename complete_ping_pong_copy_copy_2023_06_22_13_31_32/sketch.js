let paddleWidth = 100;
let paddleHeight = 10;
let paddleSpeed = 5;
let paddle1Y;
let paddle2Y;
let paddle1Direction = 0;
let paddle2Direction = 0;
let ball;
let ballSpeedX = 2;
let ballSpeedY = 2;
let score1 = 0;
let score2 = 0;
let ballSize = 170;
let images = [];

function preload() {
  font = loadFont("haim-classic-bold-fm.otf");
  images[0] = loadImage("images/cube 1.png");
  images[1] = loadImage("images/cube 2.png");
  images[2] = loadImage("images/cube 3.png");
  images[3] = loadImage("images/cube 4.png");
  images[4] = loadImage("images/peddle.png");
  images[5] = loadImage("images/peddle2.png");
}
function setup() {
  createCanvas(500, 700, WEBGL);
  textFont(font);
  paddle1X = width / 2;
  paddle2X = width / 2;
  ball = createVector(width / 2, height / 2);
  cnv = createGraphics(300, 200);
  cnv.textFont(font);
  cnv.textSize(ballSize / 10);
  cnv.background(20);
  writeTypography();
  rectMode(CENTER);
  cnv.rectMode(CENTER);
}

function draw() {
  background(0);
  noFill();
  stroke(255);
  rect(0, 0, width, height);
  translate(-width / 2, -height / 2);
  drawPaddle(paddle1X, 10);
  drawPaddle(paddle2X, height - paddleHeight);
  movePaddle();
  moveBall();
  checkCollisions();
  cnv.fill(255);
  cnv.text(38 - day() + ":" + (23 - hour()) + ":" + (54 - minute()), 50, 50);
  // cnv.text(day() + ":" + hour(), 150, 50);
  drawBall();
  displayScore();
}

function drawPaddle(x, y) {
  fill(255);
  // rect(x, y - paddleHeight / 2, paddleWidth, paddleHeight);
  if (y > height / 2) {
    image(
      images[5],
      x - paddleWidth / 2,
      y - paddleWidth,
      paddleWidth,
      paddleWidth
    );
  } else {
    image(
      images[4],
      x - paddleWidth / 2,
      y ,
      paddleWidth,
      paddleWidth
    );
  }
}

function movePaddle() {
  if (keyIsDown(65)) {
    // 'a' key
    paddle1Direction = -1;
  } else if (keyIsDown(68)) {
    // 'd' key
    paddle1Direction = 1;
  } else {
    paddle1Direction = 0;
  }

  if (keyIsDown(LEFT_ARROW)) {
    paddle2Direction = -1;
  } else if (keyIsDown(RIGHT_ARROW)) {
    paddle2Direction = 1;
  } else {
    paddle2Direction = 0;
  }

  paddle1X += paddle1Direction * paddleSpeed;
  paddle2X += paddle2Direction * paddleSpeed;

  paddle1X = constrain(paddle1X, paddleWidth / 2, width - paddleWidth / 2);
  paddle2X = constrain(paddle2X, paddleWidth / 2, width - paddleWidth / 2);
}

function drawBall() {
  noFill();
  noStroke();
  push();
  translate(ball.x, ball.y);
  rotateX(frameCount * 0.01);
  rotateY(frameCount * 0.01);
  box(ballSize);
  translate(0, 0, ballSize / 2);
  texture(cnv.get(0, 0, 100, 100));
  plane(ballSize, ballSize);
  texture(cnv.get(100, 0, 100, 100));
  translate(0, 0, -ballSize);
  plane(ballSize, ballSize);
  texture(cnv.get(200, 0, 100, 100));
  translate(0, ballSize / 2, ballSize / 2);
  rotateY(PI / 2);
  rotateX(PI / 2);
  plane(ballSize, ballSize);
  texture(cnv.get(0, 100, 100, 100));
  translate(0, 0, ballSize);
  plane(ballSize, ballSize);
  texture(cnv.get(100, 100, 100, 100));
  translate(0, -ballSize / 2, -ballSize / 2);
  rotateX(PI / 2);
  plane(ballSize, ballSize);
  texture(cnv.get(200, 100, 100, 100));
  translate(0, 0, -ballSize);
  plane(ballSize, ballSize);
  pop();
}

function moveBall() {
  ballSpeedX *= 1.001;
  ballSpeedY *= 1.001;
  // console.log(ballSpeedX)
  ball.x += ballSpeedX;
  ball.y += ballSpeedY;
}

function checkCollisions() {
  // Check collision with paddles
  if (
    ball.y - 10 <= paddleHeight &&
    ball.x >= paddle1X - paddleWidth / 2 &&
    ball.x <= paddle1X + paddleWidth / 2
  ) {
    ballSpeedY *= -1;
    cnv.background(20);
    writeTypography();
  } else if (
    ball.y + 10 >= height - paddleHeight &&
    ball.x >= paddle2X - paddleWidth / 2 &&
    ball.x <= paddle2X + paddleWidth / 2
  ) {
    ballSpeedY *= -1;
    cnv.background(20);
    writeTypography();
  }

  // Check collision with left/right walls
  if (ball.x - 10 <= 0 || ball.x + 10 >= width) {
    ballSpeedX *= -1;
    cnv.background(20);
    writeTypography();
  }

  // Check if ball goes out of bounds
  if (ball.y < 0) {
    ball = createVector(width / 2, height / 2);
    ballSpeedX = -5;
    ballSpeedX *= -1;
    cnv.background(20);
    writeTypography();
    if (ballSpeedY < 0) {
      ballSpeedY = 5;
    } else {
      ballSpeedY = -5;
    }
    score2++;
  } else if (ball.y > height) {
    ball = createVector(width / 2, height / 2);
    ballSpeedX = 5;
    ballSpeedX *= -1;
    cnv.background(20);
    writeTypography();
    if (ballSpeedY < 0) {
      ballSpeedY = 5;
    } else {
      ballSpeedY = -5;
    }
    score1++;
  }
}
function writeTypography() {
  cnv.textAlign(CENTER, CENTER);
  cnv.noStroke();
  cnv.fill(255);
  cnv.image(images[0], 100, 0, 100, 100);
  cnv.image(images[1], 200, 0, 100, 100);
  cnv.image(images[2], 0, 100, 100, 100);
  cnv.image(images[3], 100, 100, 100, 100);
  cnv.image(images[0], 200, 100, 100, 100);
}

function displayScore() {
  fill(255);
  textSize(24);
  textAlign(CENTER);
  text(score1, width - 30, height / 2 - 50);
  text(score2, width - 30, height / 2 + 50);
  stroke(255);
  for (let i = -1; i < 20; i++) {
    if (i % 2 != 0) {
      x = map(i, 0, 20, 0, width) - 10;
      line(x, height / 2, x + width / 20, height / 2);
    }
  }
  noFill();
}
function giveRandom(c = 28) {
  let st = "אבגדהוזחטיכךלמםנןסעפףצץקרשתןףץ";
  let res = "";
  for (let i = 0; i < c; i++) {
    if (random(1) < 0.4) {
      res += st[floor(random(30))];
    } else {
      res += " ";
    }

    if (res.length % 8 == 0) {
      res += "\n";
    }
  }
  return res;
}
