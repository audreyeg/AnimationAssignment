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
        this.fire = 0; //0 = not shooting, 1 = shooting
        this.stun = 0;
        this.ow = 0;

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
    }

  draw(ctx) {
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
    }

    updateBB() {
    	this.lastBB = this.BB;
    	this.BB = new BoundingBox(this.x, this.y, 44, 69);
    }
    update() {
    	if (this.stun != 0){
    		this.stun --;
    		console.log(this.stun);
    	}
    	else if (this.stun == 0){ 

        if (this.game.left) {
        	this.state = 1;
            this.facing = 1;
            if (this.x >= 10) {
            	this.x -= 3;
            }
        } 
        
        if (this.game.right) {
        	this.state = 1;
            this.facing = 0;
            if (this.x < 815) {
            	this.x += 3;
            }
        }

        if (this.game.up) {
        	this.state = 1;
        	this.facing == 3;
        	if (this.y >= 10) {
  				this.y -= 3;
        	}
        }

        if (this.game.down) {
        	this.state = 1;
        	this.facing == 4;
        	if (this. y < 490) {
        		this.y += 3;
        	}
        }
        if (this.game.shoot) {
            this.fire = 1;
        }
        if (!this.game.shoot){
        	this.fire = 0;
        }
        if (this.game.idle) {
        	this.state = 0;
        } 
        //collision
        var that = this;
        this.game.entities.forEach(function (entity) {
        	if (entity.BB && that.BB.collide(entity.BB)) {
        		if (entity instanceof Cactus) {
        			if (that.game.left) {
        					that.x += 5;
        					that.ouch = new Ouch(that.game);
        					if (that.ow == 0) {
							gameEngine.addEntity(new Ouch(gameEngine, that.x + 30, that.y - 30));
        					//that.stun = 30;
        					//that.state = 0;
        					that.ow = 60;
        				}
        			} if (that.game.right) {
        					that.x -= 5;
        					that.ouch = new Ouch(that.game);
        					if (that.ow == 0) {
							gameEngine.addEntity(new Ouch(gameEngine, that.x + 30, that.y - 30));
        					//that.stun = 30;
        					//that.state = 0;
        					that.ow = 60;
        				}
        			} if (that.game.up) {
        					that.y += 5;
        					if (that.ow == 0) {
							gameEngine.addEntity(new Ouch(gameEngine, that.x + 30, that.y - 30));
        					//that.stun = 30;
        					//that.state = 0;
        					that.ow = 60;
        				}
        			} if (that.game.down) {
        					that.y -= 5;
        					if (that.ow == 0) {
							gameEngine.addEntity(new Ouch(gameEngine, that.x + 30, that.y - 30));
        					//that.stun = 30;
        					//that.state = 0;
        					that.ow = 60;
        				}
        			}
        		}
        	}
        	that.updateBB();
        });
        if (this.ow > 0){
        	this.ow --;
        }
    }
}
}