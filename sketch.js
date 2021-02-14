var path;
var background1;
var ghost;
var Jumping;
var door;
var DoorImage;
var climber;
var ClimberImage;
var ClimberGroup;
var DoorGroup;
PLAY = 1;
END = 0;
var gameState = PLAY;
var edges;
var SpookySound;

function setup(){
  createCanvas(600,600);
  edges = createEdgeSprites();
  
  path = createSprite(300,300,300,300);
  path.addImage(background1);

  ghost = createSprite(150,500,30,30);
  ghost.addImage(Jumping);
  ghost.scale = 0.5;
  
  ClimberGroup = new Group();
  DoorGroup = new Group();
  
} 

function preload(){
  background1 = loadImage("tower.png");
  Jumping = loadImage("ghost-jumping.png");
  DoorImage = loadImage("door.png");
  ClimberImage = loadImage("climber.png");
  SpookySound = loadSound("spooky.wav");
}

function draw(){
 background("black");
console.log(gameState);
  
if (gameState===PLAY){
path.velocityY = -6;
   
if (path.y<0){
   path.y = 300;
 }

if (keyDown("space")){
  ghost.velocityY = -3;
}
ghost.velocityY =  ghost.velocityY+0.5;
  
if (keyDown("right_Arrow")){
  ghost.x = ghost.x+3
}
  
if (keyDown("left_Arrow")){
  ghost.x = ghost.x-3
}  
  spawnDoors();
  if (ghost.isTouching(ClimberGroup)||ghost.y<0||ghost.y>600){
    gameState = END;
  }
ghost.bounceOff(edges[0]);
ghost.bounceOff(edges[1]);
SpookySound.loop(); 
}
   
if (gameState===END){
    ClimberGroup.destroyEach();
    DoorGroup.destroyEach();
    stroke("yellow");
    fill("yellow");
    textSize(30);
    text ("Game Over!",180,300);
    ghost.destroy();
    path.destroy();
  }
  
  drawSprites();
}


function spawnDoors(){
  if (frameCount%100===0){
    door = createSprite(50,30,30,30);
    door.x = Math.round(random(120,400));
    door.velocityY =  6;
    door.addImage(DoorImage);
    
    climber = createSprite(50,130,10,10);
    climber.x = door.x
    climber.addImage(ClimberImage);
    climber.y = door.y + 70;
    climber.velocityY = 6;
    
    ClimberGroup.add(climber);
    DoorGroup.add(door);
  }
}

