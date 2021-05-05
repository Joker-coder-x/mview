export function genrateRunTimesSet(len, incrementTimesRange = 8) {
  const arr = [];
  let lastValue = 0,
    curValue;

  for (let i = 0; i < len; i++) {
    curValue = Math.floor(Math.random() * incrementTimesRange) + 1 + lastValue;
    arr.push(curValue);
    lastValue = curValue;
  }

  return arr;
}

export function getOffsetBottom(el) {
  const offsetParent = el.offsetParent;
  if (offsetParent) {
    return offsetParent.clientHeight - (el.offsetTop + el.offsetHeight);
  }

  return null;
}

export function getOffsetRight(el) {
  const offsetParent = el.offsetParent;
  if (offsetParent) {
    return offsetParent.clientWidth - (el.offsetLeft + el.offsetWidth);
  }

  return null;
}

export function getOffset(el, direction = "bottom") {
  let offset;
  switch (direction.trim().toLowerCase()) {
    case "left":
      offset = el.offsetLeft;
      break;
    case "right":
      offset = getOffsetRight(el);
      break;
    case "top":
      offset = el.offsetTop;
      break;
    case "bottom":
      offset = getOffsetBottom(el);
      break;
    default:
      offset = null;
  }
  return offset;
}

export function aiMove(
  el,
  distance,
  callback,
  direction = "bottom",
  moveRange = 2
) {
  const offset = getOffset(el, direction);

  let lastOffset = offset === null ? 0 : offset,
    range = Math.abs(lastOffset % distance);

  if (distance - range <= 5) {
    lastOffset = Math.round(Math.abs(lastOffset / distance)) * distance;
  }

  return function move() {
    if (distance > 0) {
      if (distance >= moveRange) {
        distance -= moveRange;
      } else {
        moveRange = distance;
        distance = 0;
      }

      if (lastOffset < 0) {
        lastOffset -= moveRange;
      } else {
        lastOffset += moveRange;
      }

      el.style[direction] = `${
        direction === "bottom" || direction === "left" ? "-" : ""
      }${Math.round(Math.abs(lastOffset))}px`;

      requestAnimationFrame(move);
    } else {
      callback && typeof callback === "function" && callback();
    }
  };
}

export function easeout(x, k, y) {
  let value;
  if (x <= y * 0.5) {
    value = k;
  } else if (x <= y * 0.8) {
    value = k * 0.6;
  } else if (x <= y * 0.9) {
    value = k * 0.4;
  } else if (x < y) {
    value = k * 0.2;
  }

  return value;
}
