class Cof {
  constructor(mode, x, y, r, type) {
    this.type = type
    this.mode = mode
    this.x = x
    this.y = y
    this.r = r
    if (type == 'fifth')
      this.intervals = ["1P", "5P", "2M", "6M", "3M", "7M", "5d", "2m", "6m", "3m", '7m', '4P']
    else
      this.intervals = ["1P", "2m", "2M", "3m", "3M", '4P', "5d", "5P", "6m", "6M", '7m', "7M"]
    this.modes = ['ionian', 'dorian', 'phrygian', 'lydian', 'mixolydian', 'aeolian', 'locrian']
    this.key = 'C'
    this.mode = 'ionian'
    this.scale = Tonal.Scale.get(this.key + ' ' + this.mode)

    this.isSharpScale = this.scale.notes.map(e => e.slice(1)).includes('#')

    if (this.mode == 'lydian')
      this.intervals[6] = '4A'
    this.notes = this.intervals.map(Tonal.Note.transposeFrom(this.key))
    console.log(this.scale.notes)

    this.vNotes = [] // partie visuelle
    this.setNotes()
  }

  display() {
    for (let note of this.vNotes) {
      note.display()
    }
    fill('grey')
    this.displayCenter()
    text(this.key + ' ' + this.mode, this.x, this.y)
  }

  displayCenter() {
    push()
    textSize(this.r / 3)
    if (this.type == 'fifth')
      text('☾       ☼', this.x, this.y)
    pop()
  }

  setNotes() {
    let note, interval, isScale
    for (let i = 0; i < this.intervals.length; i++) {
      note = this.notes[i]
      interval = this.intervals[i]
      isScale = this.scale.notes.includes(note)
      this.vNotes.push(new Note(i, note, interval, isScale, this.x, this.y, this.r))
    }
  }

  update(x, y, r) {
    this.x = x
    this.y = y
    this.r = r
    for (let note of this.vNotes) {
      note.update(x, y, r)
    }
  }

  updateKey(newkey) {
    console.log('update' + newkey)
    this.key = newkey
    this.scale = Tonal.Scale.get(this.key + ' ' + this.mode)
    this.isSharpScale = this.scale.notes.map(e => e.slice(1)).includes('#')

    if (this.mode == 'lydian')
      this.intervals[6] = '4A'
    this.notes = this.intervals.map(Tonal.Note.transposeFrom(this.key))
    this.vNotes = [] // partie visuelle
    this.setNotes()
  }

  switch() {
    if (this.type == 'fifth') this.type = 'scale'
    else if (this.type == 'scale') this.type = 'fifth'

    console.log(this.type)
    if (this.type == 'fifth')
      this.intervals = ["1P", "5P", "2M", "6M", "3M", "7M", "5d", "2m", "6m", "3m", '7m', '4P']
    else
      this.intervals = ["1P", "2m", "2M", "3m", "3M", '4P', "5d", "5P", "6m", "6M", '7m', "7M"]

    this.notes = this.intervals.map(Tonal.Note.transposeFrom(this.key))
    this.vNotes = [] // partie visuelle
    this.setNotes()
  }

  updateMode(mode) {
    if ((mode < 0) || (mode > this.modes.length)) return
    this.mode = this.modes[mode - 1]
    this.scale = Tonal.Scale.get(this.key + ' ' + this.mode)
    this.isSharpScale = this.scale.notes.map(e => e.slice(1)).includes('#')

    if (this.mode == 'lydian')
      this.intervals[6] = '4A'
    this.notes = this.intervals.map(Tonal.Note.transposeFrom(this.key))
    this.vNotes = [] // partie visuelle
    this.setNotes()
  }

  // interactivite
  pressed() {
    for (let note of this.vNotes) {
      if (note.noteIsHovered)
        note.pressed()
    }
  }

  doubleClicked() {
    for (let note of this.vNotes) {
      if (note.noteIsHovered)
        this.updateKey(note.noteDoubleClicked())

      if (note.degreIsHovered) {
        let index = note.degreDoubleClicked()
        if ((index > 0) && (index <= 7))
          this.updateMode(index)
      }
    }
  }

  dragged() {
    if (this.mode != 'note') return
    for (let note of this.vNotes) {
      if (note.isHovered)
        this.dragMode = true
    }

    this.endAngle = atan2(mouseY - this.y, mouseX - this.x) + HALF_PI
    this.delta = this.endAngle - this.startAngle
    this.transpose = Math.floor((this.delta + PI / 12) / (PI / 6))

    for (let note of this.vNotes) {
      if (this.dragMode)
        note.update(this.delta)
    }
  }

  released() {
    if (this.mode != 'note') return
    this.dragMode = false
    this.updateKey(this.transpose)
    for (let note of this.vNotes) {
      if (note.isClicked)
        note.dragMode = false
    }
  }

} //class