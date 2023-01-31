let game;
let net;
let ui;
window.onload = () => {
	game = new Game();
	net = new Net();
	// ui = new Ui(); // odkomentowac potem
	console.log(game);
	console.log(game.scene);
	console.log(net);
}