class Net {

	constructor() {

		this.inputNick = document.getElementById("nick")
		this.buttonLoguj = document.getElementById("buttonLoguj")
		this.buttonReset = document.getElementById("buttonReset") // to trzeba będzie przenieść do klasy UI, czytaj server.js

		this.buttonReset.addEventListener("click", () => {
			this.inputNick.value = ""
		})

		this.buttonLoguj.addEventListener("click", () => {
			this.data = {
				nick: this.inputNick.value
			}
			this.inputNick.value = "" // pamietac o tym zeby tu byla dobra kolejnosc
			// console.log(this.data);
			this.fetchPost(this.data)
		})

		this.raycaster = new THREE.Raycaster(); // obiekt Raycastera symulujący "rzucanie" promieni
		this.mouseVector = new THREE.Vector2() // ten wektor czyli pozycja w przestrzeni 2D na ekranie(x,y) wykorzystany będzie do określenie pozycji myszy na ekranie, a potem przeliczenia na pozycje 3D


	}

	fetchPost() {
		const body = JSON.stringify({ nick: this.data.nick }); // body czyli przesyłane na serwer dane
		const headers = { "Content-Type": "application/json" };

		fetch("/fetch", { method: "post", body, headers }) // fetch
			.then(response => response.json())
			.then(
				data => {
					console.log(data);
					if (data.przepusc) {
						console.log("zalogowano");

						let divLogowanie = document.getElementById("logowanie")
						for (let i = 0; i < divLogowanie.children.length; i++) {
							divLogowanie.children[i].setAttribute("hidden", "")
						}
						divLogowanie.setAttribute("hidden", "")
						divLogowanie.style.border = "none"

						let kolorGracza
						if (data.kolor == "biale") {
							kolorGracza = "bialymi"
							zrobBialePionki()
						}
						else if (data.kolor == "czarne") {
							kolorGracza = "czarnymi"

							zrobCzarnePionki()

							game.camera.position.x = 0
							game.camera.position.z = -300
							game.camera.lookAt(game.scene.position);
							document.getElementById("overlay").setAttribute("hidden", "")
							this.klikanieRaycaster() // to moze powodowac w przyszlosci bledy
						}

						document.getElementById("tekstNaPasku").innerText = `Witaj ${data.nick}, grasz ${kolorGracza}.`

						if (data.iloscgraczy === 1) {
							document.getElementById("gifLadowania").removeAttribute("hidden")
							document.getElementById("oczekiwanieNapis").removeAttribute("hidden")

							this.interval = setInterval(() => {
								this.checkUsersFetch()
							}, 1000);

						}

					}
					else {
						document.getElementById("error").innerText = `${data.komunikat}`
					}

				} // dane odpowiedzi z serwera
			)
	}

	checkUsersFetch() {
		const body2 = JSON.stringify({});
		const headers = { "Content-Type": "application/json" };
		fetch("/checkUsers", { method: "post", body2, headers })
			.then(response => response.json())
			.then(
				data => {
					console.log("data 2 fetch:");
					console.log(data);

					if (data.ilosc == 2) {

						document.getElementById("gifLadowania").setAttribute("hidden", "")
						document.getElementById("oczekiwanieNapis").setAttribute("hidden", "")
						document.getElementById("overlay").setAttribute("hidden", "")

						document.getElementById("tekstNaPasku").innerText += ` Podłączył się gracz ${data.drugiNick}, gra czarnymi.`

						clearInterval(this.interval)
						console.log("drugi uzytkownik sie zalogowal");

						this.klikanieRaycaster()
					}

				})
	}

	klikanieRaycaster = () => {

		this.klikniete = []

		window.addEventListener("mousedown", (e) => {
			this.mouseVector.x = (e.clientX / window.innerWidth) * 2 - 1
			this.mouseVector.y = -(e.clientY / window.innerHeight) * 2 + 1 // pozycja myszy zostaje przeliczona na wartości -1 do 1, wymagane przez raycaster
			this.raycaster.setFromCamera(this.mouseVector, game.camera)
			this.intersects = this.raycaster.intersectObjects(game.scene.children)

			//kliknietyTeraz i kliknietyPoprzednio


			if (this.intersects.length > 0) {
				console.log(this.intersects[0].object);
				this.kliknietyTeraz = this.intersects[0].object

				if (this.kliknietyTeraz.type != "AxesHelper") {

					this.klikniete.push(this.kliknietyTeraz)

					if (this.klikniete.length > 2) {
						this.klikniete.shift()
					}
					if (this.klikniete.length == 2) { // i tu tez nie moze byc w ten sposob
						switch (this.kliknietyTeraz.info) {
							case "bialyPionek":
								this.kliknietyTeraz.material.color.r = 0
								this.kliknietyTeraz.material.color.g = 1
								this.kliknietyTeraz.material.color.b = 0
								break;
							case "czarnyPionek":
								this.kliknietyTeraz.material.color.r = 0
								this.kliknietyTeraz.material.color.g = 1
								this.kliknietyTeraz.material.color.b = 0 // najpierw musze jednak stworzyc kilka tych obiektow
								break;
							case "bialePole":
								this.kliknietyTeraz.material.color.r = 0
								this.kliknietyTeraz.material.color.g = 1
								this.kliknietyTeraz.material.color.b = 0
								break;
							case "czarnePole":
								this.kliknietyTeraz.material.color.r = 0
								this.kliknietyTeraz.material.color.g = 1
								this.kliknietyTeraz.material.color.b = 0
								break;
						}
					}
					// console.log(this.klikniete);


				}

			}
		})

		// window.addEventListener("mousedown", (e) => {
		//     mouseVector.x = (event.clientX / window.innerWidth) * 2 - 1;
		//     mouseVector.y = -(event.clientY / window.innerHeight) * 2 + 1; 
		//     // console.log(mouseVector);
		//     // console.log(e);
		//     raycaster.setFromCamera(mouseVector, camera); // szukamy punktów wspólnych "promienia" i obiektu 3D
		//     const intersects = raycaster.intersectObjects(scene.children); // intersects - tablica obiektów w które "trafia" nasz "promień" wysyłany z kamery
		//     // console.log(intersects.length) // scene.children oznacza, że szukamy meshów bezpośrednio dodanych do sceny3D
		//     if (intersects.length > 0) {
		//         // zerowy w tablicy czyli najbliższy kamery obiekt to ten, którego potrzebujemy:
		//         console.log(intersects[0].object); // jeśli długość tablicy > 0 oznacza to że "trafiliśmy" w obiekt 3D czyli "kliknęliśmy" go
		//         siatka = intersects[0].object
		//         if (siatka.type != "AxesHelper") {
		//             console.log("naciśnięto na bryłę - tryb kamery: ruch brył");
		//             trybKamery = false // przełączam tryb na ruszanie bloku
		//         }
		//     }
		// });
	}

}
