let cof
let midX
let midY
let rayon


function setup() {
  createCanvas(windowWidth, windowHeight);
  midX = windowWidth/2
  midY = windowHeight/2
  rayon = Math.min(windowWidth/2,windowHeight/2)
  cof = new Cof('degre',midX,midY,0.85*rayon,'fifth')

}


function draw() {
  background(210);
  
  cof.display()
  //cofNote.display()
}

// propager les interactions souris aux objets


function doubleClicked(){
  cof.doubleClicked()
  
}
function mousePressed(event){
  cof.pressed()

}
function mouseDragged(){
  cof.dragged()

}
function mouseReleased(){
  cof.released()

}
function windowResized(){
  resizeCanvas(windowWidth, windowHeight)  
  midX = windowWidth/2
  midY = windowHeight/2
  rayon = Math.min(windowWidth/2,windowHeight/2)

  cof.update(midX,midY,0.85*rayon)  

}

function keyPressed(){
  cof.switch()
}