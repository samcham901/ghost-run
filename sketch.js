var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"
var score=0

function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghostStand.png");
  spookySound = loadSound("spooky.wav");
}

function setup() {
  createCanvas(600, 600);
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  ghost = createSprite(400, 400);
  ghost.addImage("ghostStand", ghostImg);
  ghost.scale = 0.4
  doorsGroup = new Group();
  climbersGroup = new Group();
  climber = createSprite(200, 100, 50, 50)
  //climber.addImage("climber.png", climberImg)
  climber.shapeColor="red"
  ghost.setCollider("circle", 0, 0, 100)
  ghost.setDebug=true
}

function draw() {
  background(200);
  
  ghost.collide(doorsGroup)
  if (gameState === "play") {
    doorsGroup.setVelocityYEach(3);
    tower.velocityY = 1;
    doorMaker()
    if (tower.y > 400) {
      tower.y = 300
    }
    ghost.velocityY=2
    if (keyDown("up")) {
      ghost.y = ghost.y - 10
      ghost.addAnimation("ghost-jumping.png",)
    }
    if (keyDown("down")) {
      ghost.y = ghost.y+10
    }
    if (keyDown("left")) {
      ghost.x = ghost.x - 10
    }
    if (keyDown("right")) {
      ghost.x = ghost.x + 10
    }
    if (ghost.isTouching(climber)) {
      gameState="end"
    }
    if (frameCount % 10 === 0) {
      climber.x = Math.round(random(0, 600));
      climber.y = Math.round(random(0, 600));
      climbersGroup.add(climber);
    }
    if (ghost.isTouching(doorsGroup)) {
      ghost.y=ghost.y-100
    }
 }
  if (gameState === "end") {
    tower.velocityY = 0
    ghost.velocityY = 0
    doorsGroup.destroyEach()
 }
 
 
  
  drawSprites();
}
function doorMaker(){
  if (frameCount % 60 === 0) {
    door = createSprite(Math.round(random(0, 600)), Math.round(random(0, 300)));
  
    door.addImage("door.png", doorImg);
    doorsGroup.add(door);
  }
  }