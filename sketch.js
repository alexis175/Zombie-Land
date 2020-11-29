//make multiplayer option with the same keyboard
//make health bar for character and zombie
//make powers
//make item shop
//make sound
//make gun shooting animation
//make levels
//make a boss who has a better gun and when you kill him you get his gun
//if a and d are pressed at the same time then a grenade is thrown

var engine, world;
var ground;
var score = 0;
var gunImage, gunImage2, bulletImage, bulletImage2;
var character;
var gun1A, gun2A;
var bckground;

function preload(){
  gunImage = loadImage("sprites/gun.png");
  gunImage2 = loadImage("sprites/gun2.png");
  bulletImage = loadImage("sprites/bullet.png");
  bulletImage2 = loadImage("sprites/bullet2.png");
  bckground = loadImage("sprites/background.png");
  WAD_speechImage = loadImage("sprites/speech bubble.png");
  wood = loadImage("sprites/wood platform.png");
  arrowImage = loadImage("sprites/arrow.png");
  wallJumpImage = loadImage("sprites/speech bubble2.png");
  zombieRunningAnimation = loadAnimation("sprites/zombieRunningAnimation1.png","sprites/zombieRunningAnimation2.png","sprites/zombieRunningAnimation3.png","sprites/zombieRunningAnimation4.png","sprites/zombieRunningAnimation5.png","sprites/zombieRunningAnimation6.png");
  zombieDyingAnimation = loadAnimation("sprites/zombie dying.gif");
  shootDirectionImage = loadImage("sprites/speech bubble 3.png");
}

function setup() {
  character = createSprite(600,562.5,75,75);
  character.shapeColor = "blue";

  ground = createSprite(600,650,1700,100);
  ground.shapeColor = "black";

  gun = createSprite(1000,1000,75,75);
  gun.addImage("gun",gunImage);
  gun.scale = 0.5;
  
  gun2 = createSprite(1000,1000,75,75);
  gun2.addImage("gun2",gunImage2);
  gun2.scale = 0.19;

  bullet = createSprite(1000,1000,40,40);
  bullet.addImage("bullet",bulletImage);

  bullet2 = createSprite(1000,1000,40,40);
  bullet2.addImage("bullet2",bulletImage2);

  platform1 = createSprite(350,552.5,300,95);
  //platform1.addImage("wooden platform", wood);
  platform1.shapeColor = "red";

  platform2 = createSprite(1000,375,300,150);
  platform2.shapeColor = "red";

  wall1 = createSprite(-600,600,1200,1400);
  wall2 = createSprite(2040,600,1200,1400);

  //target = createSprite(200,400,50,50);

  WAD_speech = createSprite(600,300,50,50);
  WAD_speech.addImage("wad bubble",WAD_speechImage);

  arrow = createSprite(800,360,50,50);
  arrow.addImage("arrow",arrowImage);
  arrow.scale = 0.15;

  wallJump = createSprite(750,255,50,50);
  wallJump.addImage("speech bubble",wallJumpImage);
  wallJump.scale = 0.375;

  shootDirection = createSprite(750,255,50,50);
  shootDirection.addImage("speech bubble 3", shootDirectionImage);
  shootDirection.visible = false;

  zombieRunning = createSprite(350,400,75,75);
  zombieRunning.addAnimation("running zombie",zombieRunningAnimation);
  zombieRunning.scale = 0.8;

  blockWall = createSprite(830,400,30,60);

  blockWall.visible = false;

  wallJump.visible = false;
  arrow.visible = false;

  gun.visible = false;
  gun2.visible = false;

  bullet.x = character.x
  bullet.y = character.y
  bullet.visible = false;
  bullet.scale = 0.05;

  bullet2.x = character.x
  bullet2.y = character.y
  bullet2.visible = false;
  bullet2.scale = 0.05;

  createCanvas(displayWidth,displayHeight-180);
}

function draw() {
  background(bckground);  
  textSize(30);
  fill("white");
  text("Score:  " + score, width-175, 50);
  //textSize(25);
  //text("To move use the keys, W, A, S, and D",width-1050, 300);

  character.collide(ground);
  character.collide(platform1);
  character.collide(wall1);
  character.collide(wall2);
  character.collide(platform2);
  //character.collide(target);
  bullet.collide(platform1);
  bullet.collide(platform2);
  bullet2.collide(platform1);
  bullet2.collide(platform2);
  zombieRunning.collide(platform1);
  zombieRunning.collide(platform2);
  zombieRunning.collide(ground);
  zombieRunning.collide(wall1);
  zombieRunning.collide(wall2);

  zombieRunning.velocityX = 7.5;

  if(keyWentDown("w") && character.y >= 562.5){
    character.velocityY = -15;
  }

  if(keyWentDown("w") && character.y >= 467 && character.x <= 530 && character.x >= 170){
    character.velocityY = -15;
  }

  if(keyDown("w") && character.x >= 800 && character.y >= 262.5 && character.y <= 467.5 && character.x <= 1200){
    character.velocityY = -15;
  }

  if(keyWentDown("w") && character.y >= 262.5 && character.x >= 850 && character.x <= 110){
    character.velocityY = -15;
  }

  if(keyDown("a")) {
    character.x = character.x-15;
    gun2.visible = true;
    gun.visible = false;
  }
  gun2.x = character.x-30;
  gun2.y = character.y;

  if(keyWentUp("a")) {
    gun.visible = false;
  }

  if(keyDown("d")) {
    character.x = character.x+15;
    gun.visible = true;
    gun2.visible = false;
  }
  gun.x = character.x+30;
  gun.y = character.y;

  if(keyWentUp("d")) {
    gun2.visible = false;
  }

  if(keyDown("p") && gun2.visible === true){
    bullet.velocityX = -30;
    bullet.visible = true;
  }

  if(keyDown("p") && gun.visible === true){
    bullet2.velocityX = 30;
    bullet2.visible = true;
  }

  if((bullet.x<=0) && keyWentDown("p")){
    bullet.x = character.x;
    bullet.y = character.y;
    bullet.visible = false;
  }

  if((bullet2.x >= 1400) && keyWentDown("p")){
    bullet2.x = character.x;
    bullet2.y = character.y;
    bullet2.visible = false;
  }

  /*if(target.collide(bullet||bullet2)){
    target.destroy();
    score = score+100;
  }*/

  if(keyWentDown("w")||keyWentDown("a")||keyWentDown("s")||keyWentDown("d")){
    WAD_speech.visible = false;
  }

  if(WAD_speech.visible === false){
    wallJump.visible = true;
    arrow.visible = true;
  }

  if(character.isTouching(blockWall && platform2)&&keyWentDown("w")){
    wallJump.destroy();
    arrow.destroy();
    shootDirection.visible = true;
  }

  if(keyWentDown("p")){
    shootDirection.visible = false;
  }
  if(bullet.x === 510.275 && bullet.y >= 505 && bullet.y <= 601 && keyDown("p")){
    bullet.x = character.x
    bullet.y = character.y
    bullet.visible = false;
  }
  if(bullet2.x === 839.7 && bullet2.y >= 302 && bullet2.y <= 451 && keyDown("p")){
    bullet2.x = character.x
    bullet2.y = character.y
    bullet2.visible = false;
  }

  if(bullet2.x === 189.7 && bullet2.y >= 505 && bullet2.y <= 601 && keyDown("p")){
    bullet2.x = character.x
    bullet2.y = character.y
    bullet2.visible = false;
  }

  if(bullet.x === 1160.275 && bullet.y >= 302 && bullet.y <= 451 && keyDown("p")){
    bullet.x = character.x
    bullet.y = character.y
    bullet.visible = false;
  }

  character.velocityY = character.velocityY+1
  zombieRunning.velocityY = zombieRunning.velocityY+1

  //character.debug = true;
  //platform1.debug = true;
  character.setCollider("rectangle",0,0,75,75);

  //platform1.debug = true;
  //bullet.debug = true;
  //bullet2.debug = true;
  //character.debug = true;

  //console.log(character.x);
  //console.log(character.y);
  console.log(bullet.x);
  console.log(bullet.y);
  //console.log(bullet2.x);
  //console.log(mouseX);
  //console.log(mouseY);

  drawSprites();
}