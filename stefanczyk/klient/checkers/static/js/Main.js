let game;
let net;
let ui;
let pionki
let pola
window.onload = () => {

	game = new Game();
	net = new Net();
	// ui = new Ui(); // odkomentowac potem
	pionki = new Pionek()
	pola = new Pole()

	console.log(game);
	console.log(game.scene);
	console.log(net);
	console.log(pionki);
	console.log(pola);

	pola.zrobPlansze(game.szachownica) // pewnie nie powinno tu tego byc, ale trzeba kombinowac z tym, gdzie kod widzi te funkcje, a gdzie nie
}