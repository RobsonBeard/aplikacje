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

		// pola.zrobPlansze()
		// console.log(pola);
		// console.log(pionki);

		this.prePionki = document.getElementById("prePionki")
		for (let i = 0; i < this.pionki.length; i++) {
			for (let j = 0; j < this.pionki[0].length; j++) {
				this.prePionki.innerHTML += this.pionki[i][j] + " "
				if (j == this.pionki[0].length - 1) {
					this.prePionki.innerHTML += `<br>`
				}
			}
		}

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


}


