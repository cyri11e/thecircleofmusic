class Cof {
  constructor(mode, x, y, r, type) {
    this.type = type
    this.mode = mode
    this.x = x
    this.y = y
    this.r = r
    this.scaleType = 'major' // Type de gamme par défaut
    this.updateIntervals()
    this.modes = ['ionian', 'dorian', 'phrygian', 'lydian', 'mixolydian', 'aeolian', 'locrian']
    this.harmonicMinorModes = ['harmonic minor', 'locrian nat6', 'ionian ♯5', 'dorian ♯4', 'phrygian dominant', 'lydian ♯2', 'ultralocrian']
    this.key = 'C'
    this.mode = 'ionian'
    this.updateScale()
    this.vNotes = [] // partie visuelle
    this.setNotes()
  }

  updateIntervals() {
    // Le cycle des quintes reste fixe
    this.intervals = ["1P", "5P", "2M", "6M", "3M", "7M", "5d", "2m", "6m", "3m", '7m', '4P']
  }

  updateScale() {
    this.scale = Tonal.Scale.get(this.key + ' ' + this.mode)
    this.isSharpScale = this.scale.notes.map(e => e.slice(1)).includes('#')
    if (this.scaleType === 'major' && this.mode == 'lydian') {
      this.intervals[6] = '4A'
    } else if (this.scaleType === 'harmonicMinor' && this.mode == 'locrian nat6') {
      this.intervals[5] = '6M'
      this.intervals[3] = '4P' // Correction pour éviter deux fois le degré 6
    }
    this.notes = this.intervals.map(Tonal.Note.transposeFrom(this.key))
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
    textSize(this.r / 10)
    text(this.scaleType === 'major' ? 'Major' : 'Harmonic Minor', this.x, this.y + this.r / 4)
    pop()
  }

  setNotes() {
    let note, interval, isScale
    this.vNotes = [] // Réinitialiser les notes visuelles
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
    this.updateScale()
    this.setNotes()
  }

  switch() {
    if (this.type == 'fifth') this.type = 'scale'
    else if (this.type == 'scale') this.type = 'fifth'

    console.log(this.type)
    this.updateIntervals()
    this.notes = this.intervals.map(Tonal.Note.transposeFrom(this.key))
    this.setNotes()
  }

  updateMode(mode) {
    if (this.scaleType === 'major') {
      if ((mode < 0) || (mode > this.modes.length)) return
      this.mode = this.modes[mode - 1]
    } else if (this.scaleType === 'harmonicMinor') {
      if ((mode < 0) || (mode > this.harmonicMinorModes.length)) return
      this.mode = this.harmonicMinorModes[mode - 1]
    }
    this.updateScale()
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
    // Changer de type de gamme en double cliquant au centre
    if (dist(mouseX, mouseY, this.x, this.y) < this.r / 4) {
      this.scaleType = this.scaleType === 'major' ? 'harmonicMinor' : 'major'
      this.mode = this.scaleType === 'major' ? 'ionian' : 'harmonic minor' // Mode 1 par défaut
      this.updateScale()
      this.setNotes()
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