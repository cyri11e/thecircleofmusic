function intervalToDegre(intervalName) {
  // conversion intervalle en degre
  // 2M 3m -> 2 3b
  let degre, num, nature, alteration
  num = intervalName[0]
  nature = intervalName[1]

  if ((nature == 'm') || (nature == 'd') || (nature == 'b'))
    alteration = 'b'
  else if ((nature == 'a') || (nature == 'A') || (nature == '#'))
    alteration = '#'
  else
    alteration = ''

  degre = alteration + num
  return degre
}

function toggle(value) {
  return !value
}

function textDegre(degre, x, y) {
  // recoit un degre 1 2 3 ... 4# 5b ...
  // affiche l alteration en 1er
  let size = textSize(), alteration, num, symbol

  if (degre.length == 2) {
    num = degre[1]
    alteration = degre[0]
  } else {
    num = degre[0]
    alteration = ''
  }

  if (alteration)
    if (alteration == 'b')
      symbol = '♭'
    else if (alteration == '#')
      symbol = '♯'

  if (symbol) {
    text(num, x + size / 4, y)
    text(symbol, x - size / 4, y)
  } else text(num, x, y)
}

function textNote(note, x, y) {
  let size = textSize(), alteration, letter, symbol

  if (note.length == 3) {
    letter = note[0]
    alteration = note[1] + note[2]
  } else if (note.length == 2) {
    letter = note[0]
    alteration = note[1]
  } else {
    letter = note[0]
    alteration = ''
  }

  if (alteration)
    if (alteration == 'bb')
      symbol = '𝄫'
    else if (alteration == 'b')
      symbol = '♭'
    else if (alteration == '##')
      symbol = '𝄪'
    else if (alteration == '#')
      symbol = '♯'

  if (symbol) {
    text(letter, x - size / 4, y)
    text(symbol, x + size / 4, y)
  } else text(letter, x, y)
}