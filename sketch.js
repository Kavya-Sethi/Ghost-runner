var tower,tImage;
var climber,cImage,door,dImage;
var ghost,gImage;
var PLAY=1;
var END=0;
var gameState=PLAY;
var obGroup;
var laser,lGroup;
var so;


function preload(){
  tImage=loadImage("tower.png");
  gImage=loadImage("ghost-standing.png");
  dImage=loadImage("door.png");
  cImage=loadImage("climber.png");
  so=loadSound("spooky.wav");
}

function setup(){
  createCanvas(600,600);
  tower=createSprite(300,300,10,600);
  tower.addImage("t",tImage);
  tower.velocityY=1;
  
  ghost=createSprite(300,300,10,10);
  ghost.addImage("g",gImage)
  ghost.scale=0.3;
 // ghost.debug=true;
  ghost.setCollider("rectangle",0,0,200,300);
  so.loop();
  obGroup=new Group();
  
  lGroup=new Group();
}

function draw(){
  background("black");
  
  if(gameState===PLAY){
  
    if (tower.y>400){
       tower.y=300;
        }
    
    if(keyDown("left")){
      ghost.velocityX=-3;
    }   
    if(keyDown("right")){
      ghost.velocityX=3;
    }
    if(keyDown("space")){
      ghost.velocityY=-3;
    }
    ghost.velocityY=ghost.velocityY+0.8;
    
    if(ghost.isTouching(obGroup)){
      ghost.velocityY=0;
    }
    
    if(ghost.isTouching(lGroup)||ghost.y>600){
      gameState=END;
    }
    
    spawnDoor();
     drawSprites();
  }
  
  else if(gameState===END){
    fill("orange");
    textSize(50);
    text("Game Over",175,300)
    
  }
 
}

function spawnDoor(){
  
  if(frameCount%250==0){
    door=createSprite(200,-50,10,10);
    door.addImage("d",dImage);
    door.x=Math.round(random(120,450))
    door.velocityY=1;
    door.lifetime=800;
    ghost.depth=door.depth+1;
    
    climber=createSprite(200,10,10,10);
    climber.addImage("c",cImage);
    climber.x=door.x;
    climber.velocityY=1;
    obGroup.add(climber);
    
    laser=createSprite(climber.x,13,100,2);
    laser.velocityY=1;
    laser.debug=true;
    lGroup.add(laser);
  }
}

