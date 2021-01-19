class Animation {
    constructor(game) {
    	//Object.assign(this, {game, x, y});
    	
        
        // Starting Coordinates
        this.x = 0;
        this.y = 200;
        this.game = game;
       
       //this.game.animation = this;
       this.spritesheet = ASSET_MANAGER.getAsset("./cowboy.png");

        this.facing = 0; //0 = right, 1 = left
        this.state = 0; //0 = idle, 1 = running
        this.fire = 0; //0 = not shooting, 1 = shooting, 2 = dead
        this.stun = 0;
        this.ow = 0; //run into cactus 
        this.timer = 0;
        this.health = 50;
        this.dead = false;
        this.medpacTimer = 300;
        this.med = true;

        this.velocity = { x: 0, y: 0 };

        this.updateBB();

        //cowboy's animations
        this.animations = [];

        //spritesheet, xStart, yStart, width, height, frameCount, frameDuration, framePadding, reverse, loop

        //idle + facing right
        this.animations.push(new Animator(this.spritesheet, 6, 6, 44, 69, 1, 0.1, 2, false, true));
        //move right + facing right
  		this.animations.push(new Animator(this.spritesheet, 94, 2, 44, 66, 7, 0.15, 2.5, false, true));
       
       //idle + facing left 
       this.animations.push(new Animator(this.spritesheet, 6, 6, 44, 69, 1, 0.1, 2, false, true));
       //moving left and facing left
       this.animations.push(new Animator(this.spritesheet, 94, 2, 44, 66, 7, 0.15, 2.5, false, true));

       //idle + facing up
		this.animations.push(new Animator(this.spritesheet, 6, 6, 44, 69, 1, 0.1, 2, false, true));
		//moving up and facing up 
		this.animations.push(new Animator(this.spritesheet, 94, 2, 44, 66, 15, 0.1, 2.5, false, true));

       //idle + facing down 
       this.animations.push(new Animator(this.spritesheet, 6, 6, 44, 69, 1, 0.1, 2, false, true));
       //moving down and facing down
       this.animations.push(new Animator(this.spritesheet, 94, 2, 44, 66, 15, 0.1, 2.5, false, true));
        //shooting
        this.animations.push(new Animator(this.spritesheet, 97,140, 60, 60, 4, 0.1, 13, false, true));

        //dead
        this.animations.push(new Animator(this.spritesheet, 166,371, 61, 32, 1, 0.1, 2, false, true));
    }

  draw(ctx) {

      if (this.dead){
          this.stun --;
          ctx.font = "200px Papyrus";
          ctx.fillStyle = "Red";
          ctx.fillText("DEAD", 10, 300);
          ctx.font = "15px Papyrus";
          ctx.fillStyle = "Red";
          ctx.fillText("don't bring a gun to a cactus fight", 300, 325);
          if (this.stun == 0){
             this.removeFromWorld = true;
          }
      }
      if (!this.dead) {
        if (this.health == 50) {
          ctx.font = "15px Papyrus";
          ctx.fillStyle = "Red";
          ctx.fillText("full health: ", 5, 25);
           ctx.font = "30px Papyrus";
          ctx.fillStyle = "Red";
          ctx.fillText(this.health, 80, 25);
        }
        else {
          ctx.font = "15px Papyrus";
          ctx.fillStyle = "Red";
          ctx.fillText("health: ", 5, 25);
          ctx.font = "30px Papyrus";
          ctx.fillStyle = "Red";
          ctx.fillText(this.health, 60, 25);
        }
      }
  
  		//idle, face right, not shooting
  		if (this.state == 0 && this.facing == 0 && this.fire == 0) {
  			this.animations[0].drawFrame(this.game.clockTick, ctx, this.x, this.y, 1);
  		}
  		 //idle, face right, shooting
  		else if (this.state == 0 && this.facing == 0 && this.fire == 1){
  			this.animations[8].drawFrame(this.game.clockTick, ctx, this.x, this.y, 1);
  		} 
  		//move right, face right, not shooting
  		 else if (this.state == 1 && this.facing == 0 && this.fire == 0) {
  			this.animations[1].drawFrame(this.game.clockTick, ctx, this.x, this.y, 1);
  		} 
  		//move right, face right, shooting
  		else if (this.state == 1 && this.facing == 0 && this.fire == 1) {
			this.animations[8].drawFrame(this.game.clockTick, ctx, this.x, this.y, 1);
  		} 
  		//idle, face left, not shooting
  		else if (this.state == 0 && this.facing == 1 && this.fire == 0){
  			ctx.scale(-1,1);
  			this.animations[2].drawFrame(this.game.clockTick, ctx, -this.x - 44, this.y, 1);
  			ctx.restore();
  		} 
  		//idle, face left, shooting 
  		else if (this.state == 0 && this.facing == 1 && this.fire == 1){
  			ctx.scale(-1,1);
  			this.animations[8].drawFrame(this.game.clockTick, ctx, -this.x - 60, this.y, 1);
  			ctx.restore();
  		}
  		 //move left, face left, not shooting
  		else if (this.state == 1 && this.facing == 1 && this.fire == 0){
  			ctx.scale(-1,1);
  			this.animations[3].drawFrame(this.game.clockTick, ctx, -this.x - 44, this.y, 1);
  			ctx.restore();
  		}
  		//move left, face left, shooting 
  		else if (this.state == 1 && this.facing == 1 && this.fire == 1){
  			ctx.scale(-1,1);
  			this.animations[8].drawFrame(this.game.clockTick, ctx, -this.x - 60, this.y, 1);
  			ctx.restore();
  		} 
  		else if (this.state == 0 && this.facing == 3) {
  			this.animations[4].drawFrame(this.game.clockTick, ctx, this.x, this.y, 1);
  		} 
  		//moving up, not shooting
  		else if (this.state == 1 && this.facing == 3 && this.fire == 0) {
  			this.animations[5].drawFrame(this.game.clockTick, ctx, this.x, this.y, 1);
  		} 
  		//moving up, shooting
  		else if (this.state == 1 && this.facing == 3 && this.fire == 1) {
  			this.animations[8].drawFrame(this.game.clockTick, ctx, this.x, this.y, 1);
  		}
  		else if (this.state == 0 && this.facing == 4) {
  			this.animations[6].drawFrame(this.game.clockTick, ctx, this.x, this.y, 1);
  		}
  		//moving down, not shooting
  		 else if (this.state == 1 && this.facing == 4 && this.fire == 0) {
  			this.animations[7].drawFrame(this.game.clockTick, ctx, this.x, this.y, 1);
  		} 
  		//moving down, shooting
  		else if (this.state == 1 && this.facing == 4 && this.fire == 1){
  			this.animations[8].drawFrame(this.game.clockTick, ctx, this.x, this.y, 1);
  		}
      //dead 
      else if (this.state == 2) {
        this.animations[9].drawFrame(this.game.clockTick, ctx, this.x, this.y, 1);
      }
    }

    updateBB() {
    	this.lastBB = this.BB;
    	this.BB = new BoundingBox(this.x, this.y, 44, 69);
    }
    update() {

      if (this.health <= 0){
          this.stun = 1000;
          this.health = 1;
          this.state = 2;
          this.dead = true;
      }

      this.velocity.x = 0;
      this.velocity.y = 0;

    	if (this.stun == 0){ 

        if (this.game.left) {
        	this.state = 1;
            this.facing = 1;
            if (this.x >= 10) {
              this.velocity.x = -3;
            }
        } 
        
        if (this.game.right) {
        	this.state = 1;
            this.facing = 0;
            if (this.x < 815) {
              this.velocity.x = 3;
            }
        }

        if (this.game.up) {
        	this.state = 1;
        	this.facing == 3;
        	if (this.y >= 10) {
            this.velocity.y = -3;
        	}
        }

        if (this.game.down) {
        	this.state = 1;
        	this.facing == 4;
        	if (this. y < 490) {
            this.velocity.y = 3;
        	}
        }
        if (this.game.shoot) {
            this.fire = 1;
        }
        if (!this.game.shoot){
        	this.fire = 0;
        }
        if (this.velocity.x == 0 && this.velocity.y == 0){
          this.state = 0;
        }

        //collision
        var that = this;
        this.game.entities.forEach(function (entity) {
        	if (entity.BB && that.BB.collide(entity.BB)) {
        		if (entity instanceof Cactus && that.timer == 0) {
                that.timer = 8;
                that.velocity.x = (-that.velocity.x) * 8;
                that.velocity.y = (-that.velocity.y) * 8;
                that.ouch = new Ouch(that.game);
                that.health -= 5;
              if (that.ow == 0) {
                gameEngine.addEntity(new Ouch(gameEngine, that.x + 30, that.y - 30));
                that.ow = 60;
              }
        		}
            //collision with health pac 
            if (entity instanceof medpac && that.health < 50) {
              if (that.health > 40) {
                that.health = 50;
                that.med = false;
                that.medpacTimer = 300;
                entity.removeFromWorld = true;
              }
              else {
                that.health += 10;
                that.med = false;
                that.medpacTimer = 300;
                entity.removeFromWorld = true;
              }
            }
        	}
        	that.updateBB();
        });
        if (this.ow > 0){
        	this.ow --;
        }
        if (that.timer != 0) {
          that.timer --;
        }
        //respawn the health pac 
           if ((!this.med) && (this.medpacTimer > 0)){
                  this.medpacTimer--;
                }
            if ((!this.med) && (this.medpacTimer == 0)) {
                  gameEngine.addEntity(new medpac(gameEngine, 800, 50));
                  this.med = true;
               }

    }
    this.x += this.velocity.x;
    this.y += this.velocity.y;
}
}
