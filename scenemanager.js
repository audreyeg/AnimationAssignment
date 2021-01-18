class scenemanager {
	constructor(game) {
	this.game = game;
	this.game.camera = this;
	this.x = 0;

	this.loadlevelOne();
	};

	loadlevelOne() {
	this.x = 0;
	this.animation = new Animation(this.game);
	gameEngine.addEntity(new Animation(gameEngine));
	//this.cactus = new Cactus(gameEngine);
	gameEngine.addEntity(new Cactus(gameEngine, 400, 200));
	gameEngine.addEntity(new Cactus(gameEngine, 100, 500))
	}
}
