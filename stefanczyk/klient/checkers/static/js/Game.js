class Game {

	constructor() {

		this.scene = new THREE.Scene();
		this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 10000);
		this.renderer = new THREE.WebGLRenderer();
		this.renderer.setClearColor(0xffffff);
		this.renderer.setSize(window.innerWidth, window.innerHeight);
		document.getElementById("root").append(this.renderer.domElement);

		this.camera.position.set(0, 250, 300) // potem przy zmianie gracza kamera sie obraca
		this.camera.lookAt(this.scene.position);
		this.axes = new THREE.AxesHelper(1000)
		this.scene.add(this.axes)

		window.addEventListener('resize', this.onWindowResize, false);

		this.szachownica = [
			[1, 0, 1, 0, 1, 0, 1, 0],
			[0, 1, 0, 1, 0, 1, 0, 1],
			[1, 0, 1, 0, 1, 0, 1, 0],
			[0, 1, 0, 1, 0, 1, 0, 1],
			[1, 0, 1, 0, 1, 0, 1, 0],
			[0, 1, 0, 1, 0, 1, 0, 1],
			[1, 0, 1, 0, 1, 0, 1, 0],
			[0, 1, 0, 1, 0, 1, 0, 1],
		];

		this.pionki = [
			[0, 2, 0, 2, 0, 2, 0, 2],
			[2, 0, 2, 0, 2, 0, 2, 0],
			[0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0],
			[0, 1, 0, 1, 0, 1, 0, 1],
			[1, 0, 1, 0, 1, 0, 1, 0],
		]


		this.zrobPlansze()

		this.render() // wywołanie metody render
	}

	render = () => {
		requestAnimationFrame(this.render);
		this.renderer.render(this.scene, this.camera);
		console.log("render leci")
	}

	onWindowResize = () => {
		this.camera.aspect = window.innerWidth / window.innerHeight;
		this.camera.updateProjectionMatrix();
		this.renderer.setSize(window.innerWidth, window.innerHeight);
	}

	zrobPlansze = () => {

		this.materialCzarnePola = new THREE.MeshBasicMaterial({
			side: THREE.DoubleSide, // dwustronny
			transparent: false,
			map: new THREE.TextureLoader().load('mats/czarne.jpg'),
		})
		this.materialBialePola = new THREE.MeshBasicMaterial({
			side: THREE.DoubleSide, // dwustronny
			transparent: false,
			map: new THREE.TextureLoader().load('mats/biale.jpg'),
		})
		this.geometriaPola = new THREE.BoxGeometry(30, 15, 30)

		for (let i = 0; i < this.szachownica.length; i++) {
			for (let j = 0; j < this.szachownica[0].length; j++) {
				if (this.szachownica[i][j] == 0) {
					this.figura = new THREE.Mesh(this.geometriaPola, this.materialCzarnePola)
					this.figura.info = `czarnePole`
				}
				else {
					this.figura = new THREE.Mesh(this.geometriaPola, this.materialBialePola)
					this.figura.info = `bialePole`
				}

				this.figura.position.x = -105 + i * 30
				this.figura.position.z = -105 + j * 30
				this.scene.add(this.figura)
			}
		}
	}










	// zrobBialePionki = () => {
	// 	this.materialBialePionki = new THREE.MeshBasicMaterial({
	// 		side: THREE.DoubleSide,
	// 		transparent: false,
	// 		map: new THREE.TextureLoader().load('mats/biale.jpg'),
	// 		color: 0xFFFF00,
	// 	})

	// 	this.geomertiaPionka = new THREE.CylinderGeometry(10, 10, 10, 32)

	// 	for (let i = 0; i < this.pionki.length; i++) {
	// 		for (let j = 0; j < this.pionki[0].length; j++) {
	// 			if (this.pionki[i][j] == 1) {
	// 				this.figura2 = new THREE.Mesh(this.geomertiaPionka, this.materialBialePionki)
	// 				this.figura2.position.y = 15
	// 				this.figura2.position.x = -105 + j * 30
	// 				this.figura2.position.z = -105 + i * 30 // tutaj zmienne "i" i "j" są w odwrotnych miejscach niz w planszy
	// 				this.figura2.info = `bialyPionek`
	// 				this.scene.add(this.figura2)
	// 			} // pomyslec czy da sie to jakos lepiej napisac
	// 		}
	// 	}

	// }

	// zrobCzarnePionki = () => {
	// 	this.materialCzarnePionki = new THREE.MeshBasicMaterial({
	// 		side: THREE.DoubleSide,
	// 		transparent: false,
	// 		map: new THREE.TextureLoader().load('mats/czarne.jpg'),
	// 		color: 0xFF0000,
	// 	})

	// 	this.geomertiaPionka = new THREE.CylinderGeometry(10, 10, 10, 32)

	// 	for (let i = 0; i < this.pionki.length; i++) {
	// 		for (let j = 0; j < this.pionki[0].length; j++) {
	// 			if (this.pionki[i][j] == 2) {
	// 				this.figura2 = new THREE.Mesh(this.geomertiaPionka, this.materialCzarnePionki)
	// 				this.figura2.position.y = 15
	// 				this.figura2.position.x = -105 + j * 30
	// 				this.figura2.position.z = -105 + i * 30
	// 				this.figura2.info = `czarnyPionek`
	// 				this.scene.add(this.figura2)
	// 			}
	// 		}
	// 	}

	// }

}


