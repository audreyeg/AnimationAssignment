var gameEngine = new GameEngine();

var ASSET_MANAGER = new AssetManager();
ASSET_MANAGER.queueDownload("./cowboy.png");
ASSET_MANAGER.queueDownload("./cactus.png");
ASSET_MANAGER.queueDownload("./ouch.png");


ASSET_MANAGER.downloadAll(function () {
	var canvas = document.getElementById('game');
	var ctx = canvas.getContext('2d');

	gameEngine.init(ctx);
	new scenemanager(gameEngine);
	//gameEngine.addEntity(new Animation(gameEngine));
	gameEngine.start();
});
 