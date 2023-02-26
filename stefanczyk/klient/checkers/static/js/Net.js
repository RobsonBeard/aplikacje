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
							pionki.zrobBialePionki()
						}
						else if (data.kolor == "czarne") {
							kolorGracza = "czarnymi"

							pionki.zrobCzarnePionki()

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
		let licznik = 0
		let nachodzacy

		window.addEventListener("mousedown", (e) => {
			this.mouseVector.x = (e.clientX / window.innerWidth) * 2 - 1
			this.mouseVector.y = -(e.clientY / window.innerHeight) * 2 + 1 // pozycja myszy zostaje przeliczona na wartości -1 do 1, wymagane przez raycaster
			this.raycaster.setFromCamera(this.mouseVector, game.camera)
			this.intersects = this.raycaster.intersectObjects(game.scene.children)


			if (this.intersects.length > 0) {
				this.kliknietyTeraz = this.intersects[0].object
				console.log(this.kliknietyTeraz);

				if (this.kliknietyTeraz.type != "AxesHelper") {

					licznik++
					if (licznik > 2) {
						licznik = 1
					}
					console.log(licznik);


					this.klikniete.push(this.kliknietyTeraz)

					if (this.klikniete.length > 2) {
						this.klikniete.shift() // klikniety na pozycji 2 => 1 => out
					}


					if (this.klikniete.length == 1) {
						this.kliknietyTeraz.material.color.r = 0 // 0 - koloruje, 1 - bez zmian
					}
					else if (this.klikniete.length == 2) {
						this.klikniete[0].material.color.r = 1
						this.klikniete[1].material.color.r = 0
					}

					//  2 pionki na jednej pozycji - chyba problem załatwiony, ale nie jestem pewien
					if (licznik == 2) {
						nachodzacy = false

						for (let i = 0; i < game.scene.children.length; i++) {
							if (game.scene.children[i].rodzaj == "pionek" && (this.klikniete[1].position.x == game.scene.children[i].position.x && this.klikniete[1].position.z == game.scene.children[i].position.z)) {
								nachodzacy = true
								console.log(nachodzacy);
							}
						}

						if (nachodzacy == false && (this.klikniete[0].rodzaj == "pionek" && this.klikniete[1].info == "czarnePole")) {
							this.klikniete[0].position.x = this.klikniete[1].position.x
							this.klikniete[0].position.z = this.klikniete[1].position.z

							this.stareZ = this.klikniete[0].position.z
							this.stareX = this.klikniete[0].position.x
							this.noweZ = this.klikniete[1].position.z
							this.noweX = this.klikniete[1].position.x
							//wyszukac I i J a potem podmienic w tablicy pionkow odpowiednie wartosci, wyslac tablice socketem a potem sie zastanawiac co dalej

							this.stareI = (this.stareX + 105) / 30
							this.stareJ

						} // czyli tutaj ruch pionka się powiódł
						else {
							licznik = 1
						}
					}

					console.log(this.klikniete);

				}

			}
		})
	}




}
