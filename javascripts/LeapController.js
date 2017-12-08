var direction = 0.;
var forward = 0.;

var max_forward = 90;
var max_dir = 100;
var dead_zone = 0.1;

var formatValue = function (value, maxValue, deadZone) {
  value = Math.min(value, maxValue);
  value = Math.max(value, -1 * maxValue);

  value = value / maxValue;

  if (value > -1 * deadZone &&
      value  <  deadZone) {
    value = 0;
  }

  return value;
};

var controller = Leap.loop({enableGestures:true}, function(frame){
  let nbTrackedHands = frame.hands.length;

  if (nbTrackedHands >= 2) {
    let hand0 = frame.hands[0].isLeft ? frame.hands[0] : frame.hands[1];
    let position0 = hand0.palmPosition;
    let velocity0 = hand0.palmVelocity;
    let direction0 = hand0.direction;

    let hand1 = frame.hands[1].isRight ? frame.hands[1] : frame.hands[0];
    let position1 = hand1.palmPosition;
    let velocity1 = hand1.palmVelocity;
    let direction1 = hand1.direction;

    let delta = position0[1] - position1[1];

    direction = formatValue(delta, max_dir, dead_zone);

    let mean_z = -1 * (position0[2] + position1[2]) / 2;

    forward = formatValue(mean_z, max_forward, dead_zone * 3);
    
    console.log(`dir: ${direction}; forward: ${forward}`);
    
  } else if (nbTrackedHands == 1) {

    
  } else {

  }
});
