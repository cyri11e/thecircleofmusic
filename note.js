class Note{
  constructor(index,note,interval,isScale,x,y,r,key){
    //console.log('creation',x,y,r)
    this.index=index  
    this.key=key
    this.a=index*PI/6
    this.r=r 
    this.size=r/8
    this.xCenter=x
    this.yCenter=y
    this.x=x+0.8*r*Math.cos(this.a-HALF_PI)
    this.y=y+0.8*r*Math.sin(this.a-HALF_PI)
    this.interval=interval
    this.note=note
    this.isScale=isScale
    this.noteIsSelected=false

    textFont('Arial')
    colorMode(HSB,628)
    
    textAlign(CENTER,CENTER)
    textSize(0.8*this.size)
    noStroke()
    this.debug =''
    this.anim =fadeIn(10)
    this.anim2 =fadeOut(10)
  }
  
  display(){
    push()
    this.displayDegre()       
    this.displayNote()    
    this.getStatus() 
    pop()
  }

  update(x,y,r){   // modification de taille
    //console.log('update ',x,y,r)
    this.r=r 
    this.size=r/10
    this.xCenter=x
    this.yCenter=y
    this.x=x+0.8*r*Math.cos(this.a-HALF_PI)
    this.y=y+0.8*r*Math.sin(this.a-HALF_PI)
  }

  getStatus(){ // zones sensibles / interactions souris
    this.previous=this.noteIsHovered
    this.degreIsHovered =(dist(mouseX,mouseY,this.x,this.y)<this.size)
    this.noteIsHovered =(dist(mouseX,mouseY,this.xNote,this.yNote)<this.size)
      
    this.noteIsClicked = mouseIsPressed&&this.noteIsHovered
    this.degreIsClicked = mouseIsPressed&&this.degreIsHovered

    if (this.noteIsHovered!=this.previous){
      this.previous=this.noteIsHovered
      if (this.noteIsHovered)
        this.isEnteringNote = true
      else
        this.isEnteringNote = false
      
      if (!this.isEnteringNote) 
        this.anim=fadeOut(20)
    }    
  }
  

 displayDegre(){   
    if (this.degreIsHovered){
      strokeWeight(5*this.animate(1))
      stroke(this.a*100,
             455+200*this.animate(1),
             470+200*this.animate(1))            
    } else {
      strokeWeight(5)
      stroke(this.a*100,
                 455,
                 470)            
    }

    if (this.degreIsSelected)
      strokeWeight(20)

    strokeCap(SQUARE)
   
    this.xNote=this.xCenter+0.8*this.r*Math.cos(this.a-HALF_PI-PI/12)
    this.yNote=this.yCenter+0.8*this.r*Math.sin(this.a-HALF_PI-PI/12)

    push()
   strokeWeight(1)
   noFill()   
   translate(this.xNote,this.yNote)
   rotate(this.a-PI/24)
   translate(-this.xNote,-this.yNote)    
   
   if (cof.type=='fifth')
     text('◀', this.xNote, this.yNote) 
  
   translate(this.xNote,this.yNote)  
   rotate(-this.a+PI/24)     
   translate(-this.xNote,-this.yNote) 
   pop()
   
    noFill()   
    if (this.isScale){
     arc(this.xCenter,
        this.yCenter,
        0.7*2*this.r,
        0.7*2*this.r,
        this.a-PI/12-HALF_PI,
        this.a+PI/12-HALF_PI)     
    }

    // cercle 
     if (this.noteIsHovered) {
      strokeWeight(this.r/5+this.anim())
       arc(this.xCenter,
        this.yCenter,
        0.8*2*this.r,
        0.8*2*this.r,
        this.a-PI/12-HALF_PI,
        this.a+PI/12-HALF_PI)   
    } else 
      this.anim =fadeOut(20)
         
   
   if (this.isScale){
      fill(this.a*100,455,470)
      this.xNote=this.xCenter+0.7*this.r*Math.cos(this.a-HALF_PI)
      this.yNote=this.yCenter+0.7*this.r*Math.sin(this.a-HALF_PI)
      let xNote=this.xCenter+0.3*this.r*Math.cos(this.a-HALF_PI)
      let yNote=this.yCenter+0.3*this.r*Math.sin(this.a-HALF_PI)
      line(xNote,yNote,this.xNote,this.yNote) 
      fill('rgb(255,255,255)')  
    }

    else
      fill('#777777')  

    noStroke()
    textDegre(intervalToDegre(this.interval),this.x,this.y)
 } 
  
  
  displayNote(){    
    if (this.noteIsHovered){
      strokeWeight(5 )
      stroke(this.a*100,
             455+100*this.animate(0.01),
             470+100*this.animate(0.01))  
      
    } else {
      strokeWeight(5)
      stroke(this.a*100,
                 455,
                 470)            
    }

    if (this.noteIsSelected){
      strokeWeight(20)      
    }
  
    this.xNote=this.xCenter+this.r*Math.cos(this.a-HALF_PI)
    this.yNote=this.yCenter+this.r*Math.sin(this.a-HALF_PI)
    


    noFill()
    
    // cercle exterieur
      arc(this.xCenter,
        this.yCenter,
        0.9*2*this.r,
        0.9*2*this.r,
        this.a-PI/12-HALF_PI,
        this.a+PI/12-HALF_PI)
         
    if (this.isScale){
      fill(this.a*100,455,470)

      circle(this.xNote,this.yNote,this.size)
      fill('rgb(255,255,255)')  
    }

    else
      fill('#777777')  
    
    noStroke()

    textNote(this.note,this.xNote,this.yNote)    
  }
  
  animate(speed){
    return (Math.sin(frameCount/(1/speed)))
  }
  

  
  noteDoubleClicked(){
      console.log('note dble clc'+this.note)
      return this.note   
  }
  
  degreDoubleClicked(){
      console.log(intervalToDegre(this.interval))
      return intervalToDegre(this.interval)   
  }
  
  
  pressed() {
    this.noteIsSelected=toggle(this.noteIsSelected)
    this.anim =fadeIn(5) // reinit de l animation
  } 
  
  dragged() {
    text(this.a ,50,50)
  }
}