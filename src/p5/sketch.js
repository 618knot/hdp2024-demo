
export default function sketch(p5, xVal = 0) {
  let rotationX = 0;
  let rotationY = 0;
  let graphics;

  p5.setup = () => {
    p5.createCanvas(600, 400, p5.WEBGL);
    graphics = p5.createGraphics(600, 400);
  }

  p5.draw = () => {
    p5.background(250);
    p5.normalMaterial();
    p5.push();
    p5.rotateX(rotationX);
    p5.rotateY(rotationY);
    p5.box(200);
    p5.pop();

    if (p5.keyIsDown(p5.UP_ARROW) || p5.keyIsDown(87)) {
      rotationX -= 0.05;
    }
    if (p5.keyIsDown(p5.DOWN_ARROW) || p5.keyIsDown(83)) {
      rotationX += 0.05;
    }
    if (p5.keyIsDown(p5.RIGHT_ARROW) || p5.keyIsDown(68)) {
      rotationY += 0.05;
    }
    if (p5.keyIsDown(p5.LEFT_ARROW) || p5.keyIsDown(65)) {
      rotationY -= 0.05;
    }

    graphics.clear();
    graphics.fill(0);
    graphics.textSize(16);
    graphics.text(`rotationX: ${rotationX.toFixed(2)}`, 10, 20);
    graphics.text(`rotationY: ${rotationY.toFixed(2)}`, 10, 40);

    p5.image(graphics, -300, -200);
  };
};
