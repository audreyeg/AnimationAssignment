class Ouch {
	constructor(game, x, y) {
	   Object.assign(this, {game, x, y});
	   	this.game.ouch = this;
        this.spritesheet = ASSET_MANAGER.getAsset("./ouch.png");
        this.x = x;
        this.y = y;
        this.BB = new BoundingBox(x,y,30,40);
        this.life = 60;
    }
    update() {
    	if (this.life == 0) {
    		this.removeFromWorld = true;
    	} else {
    		this.life --;
    	}
    };
    draw(ctx) {
    	//spritesheet, xStart, yStart, width, height, x, y, dimensions of box to fill 
    	ctx.drawImage(this.spritesheet, 10, 40, 700, 1200, this.x, this.y, 80, 80);
    }
}