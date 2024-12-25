function fadeIn(speed) {
  let value = 0
  if (!speed) speed = 1
  return () => {
    if (value < 100) {
      value = value + speed
    }
    return value
  }
}

function fadeOut(speed) {
  let value = 100
  if (!speed) speed = 1
  return () => {
    if (value > 0) {
      value = value - speed
    }
    return value
  }
}
