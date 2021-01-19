class Cactus {
	   constructor(game, x, y) {
	   Object.assign(this, {game, x, y});
	   	this.game.cactus = this;
        this.spritesheet = ASSET_MANAGER.getAsset("./cactus.png");
        this.x = x;
        this.y = y;
        this.BB = new BoundingBox(x,y,30,40);
    }
    update() {
    };
    draw(ctx) {
    	//spritesheet, xStart, yStart, width, height, x, y, dimensions of box to fill 
    	ctx.drawImage(this.spritesheet, 120, 40, 700, 1200, this.x, this.y, 30, 40);
    }
}