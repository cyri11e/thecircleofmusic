let cof, midX, midY, rayon
let loadDateStr

function setup() {
  createCanvas(windowWidth, windowHeight)
  midX = windowWidth / 2
  midY = windowHeight / 2
  rayon = Math.min(windowWidth / 2, windowHeight / 2)
  cof = new Cof('degre', midX, midY, 0.85 * rayon, 'fifth')
  
  // Stocker la date et l'heure du chargement de la page
  let now = new Date()
  loadDateStr = now.toLocaleDateString() + ' ' + now.toLocaleTimeString()
}

function draw() {
  background(210)
  cof.display()
  
  // Afficher la date et l'heure du chargement de la page dans un coin de la page
  push()
  textSize(rayon / 20) // Taille de texte proportionnelle à la taille de la fenêtre
  fill(0)
  text(loadDateStr, 10, 30)
  pop()
  // cofNote.display()
}

// Propager les interactions souris aux objets
function doubleClicked() {
  cof.doubleClicked()
}

function mousePressed(event) {
  cof.pressed()
}

function mouseDragged() {
  cof.dragged()
}

function mouseReleased() {
  cof.released()
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight)
  midX = windowWidth / 2
  midY = windowHeight / 2
  rayon = Math.min(windowWidth / 2, windowHeight / 2)
  cof.update(midX, midY, 0.85 * rayon)
}

function keyPressed() {
  cof.switch()
}