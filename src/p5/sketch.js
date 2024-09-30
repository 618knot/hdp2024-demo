let rotationX = 0;
let rotationY = 0;

export default function sketch(p5, characteristic) {
  let graphics;

  p5.setup = () => {
    p5.createCanvas(600, 400, p5.WEBGL);
    graphics = p5.createGraphics(600, 400);
  }

  p5.draw = async () => {
      try {
        const value = await characteristic.readValue();
  
        const decoder = new TextDecoder("utf-8");
        const decodedJson = JSON.parse(decoder.decode(value));
  
        console.log(decodedJson)
        
        rotationX += convertJoystickValue(decodedJson["y"]);
        rotationY += convertJoystickValue(decodedJson["x"]);

      } catch(error) {
        // ハンドリング辛いので握り潰し
      }

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


const NEUTRAL = 0.51;
const OFFSET = 0.02;

const convertJoystickValue = (value) => {
  const minNeutral = NEUTRAL - OFFSET;
  if(value < minNeutral) return (value - minNeutral) * 0.8;
  
  const maxNeutral = NEUTRAL + OFFSET;
  if(value > maxNeutral) return (value - maxNeutral) * 0.8;

  return 0;
}
