class medpac{
	   constructor(game, x, y) {
	   Object.assign(this, {game, x, y});
	   	this.game.medpac = this;
        this.spritesheet = ASSET_MANAGER.getAsset("./health.png");
        this.x = x;
        this.y = y;
        this.BB = new BoundingBox(x,y,20,20);
    }
    update() {
    };
    draw(ctx) {
    	//spritesheet, xStart, yStart, width, height, x, y, dimensions of box to fill 
    	ctx.drawImage(this.spritesheet, 7, 47, 233, 177, this.x, this.y, 20, 20);
    }
}