class Net {
  constructor() {
    this.inputNick = document.getElementById("nick");
    this.buttonLoguj = document.getElementById("buttonLoguj");
    this.buttonReset = document.getElementById("buttonReset"); // to trzeba będzie przenieść do klasy UI, czytaj server.js

    this.buttonReset.addEventListener("click", () => {
      this.inputNick.value = "";
      this.resetTablicyUserow()// zrobic to socketem
    });

    this.buttonLoguj.addEventListener("click", () => {
      this.data = {
        nick: this.inputNick.value
      };
      this.inputNick.value = ""; // pamietac o tym zeby tu byla dobra kolejnosc
      this.fetchPost(this.data);
    });

    this.raycaster = new THREE.Raycaster(); // obiekt Raycastera symulujący "rzucanie" promieni
    this.mouseVector = new THREE.Vector2(); // ten wektor czyli pozycja w przestrzeni 2D na ekranie(x,y) wykorzystany będzie do określenie pozycji myszy na ekranie, a potem przeliczenia na pozycje 3D
  }

  resetTablicyUserow() {
    const body = JSON.stringify({});
    const headers = { "Content-Type": "application/json" };
    fetch("/czyscUserow", { method: "post", body, headers })
      .then(response => response.json())
      .then(
        data => {
          console.log(data);
          document.getElementById("error").innerText = "Zresetowano tablice userow"
        }
      )
  }// zrobic to socketem

  fetchPost() {
    const body = JSON.stringify({ nick: this.data.nick }); // body czyli przesyłane na serwer dane
    const headers = { "Content-Type": "application/json" };

    fetch("/fetch", { method: "post", body, headers }) // fetch
      .then(response => response.json())
      .then(
        data => {
          // console.log(data);
          if (data.przepusc) {
            console.log("zalogowano");

            let divLogowanie = document.getElementById("logowanie");
            for (let i = 0; i < divLogowanie.children.length; i++) {
              divLogowanie.children[i].setAttribute("hidden", "");
            }
            divLogowanie.setAttribute("hidden", "");
            divLogowanie.style.border = "none";

            if (data.kolor == "biale") {
              this.kolorGracza = "bialymi";
              pionki.zrobPionki(game.pionki);
            } else if (data.kolor == "czarne") {
              this.kolorGracza = "czarnymi";

              pionki.zrobPionki(game.pionki);
              game.camera.position.x = 0;
              game.camera.position.z = -300;
              game.camera.lookAt(game.scene.position);
              document.getElementById("overlay").setAttribute("hidden", "");
              this.klikanieRaycaster();
              this.pokazEkranOczekiwania()
            }

            document.getElementById("tekstNaPasku").innerText = `Witaj ${data.nick}, grasz ${this.kolorGracza}.`;

            if (data.iloscgraczy === 1) {
              document.getElementById("gifLadowania").removeAttribute("hidden");
              document
                .getElementById("oczekiwanieNapis")
                .removeAttribute("hidden");

              this.interval = setInterval(() => {
                this.checkUsersFetch();
              }, 1000);
            }
          } else {
            document.getElementById("error").innerText = `${data.komunikat}`;
          }
        } // dane odpowiedzi z serwera
      );
  }

  checkUsersFetch() {
    const body2 = JSON.stringify({});
    const headers = { "Content-Type": "application/json" };
    fetch("/checkUsers", { method: "post", body2, headers })
      .then(response => response.json())
      .then(data => {
        // console.log("data 2 fetch:");
        // console.log(data);

        if (data.ilosc == 2) {
          this.ustawUi(data)
          this.klikanieRaycaster();
        }
      });
  }

  ustawUi(data) {
    document.getElementById("gifLadowania").setAttribute("hidden", "");
    document
      .getElementById("oczekiwanieNapis")
      .setAttribute("hidden", "");
    document.getElementById("overlay").setAttribute("hidden", "");

    document.getElementById(
      "tekstNaPasku"
    ).innerText += ` Podłączył się gracz ${data.drugiNick}, gra czarnymi.`;

    clearInterval(this.interval);
    console.log("drugi uzytkownik sie zalogowal");
  }

  stworzSocket() {
    this.client = io();

    this.client.on("ruch", data => {

      this.numerPionka = game.pionki[data.stareJ][data.stareI];
      game.pionki[data.stareJ][data.stareI] = 0;
      game.pionki[data.noweJ][data.noweI] = this.numerPionka;

      this.tablicaPionkow = game.pionki

      game.prePionki.innerHTML = "";
      for (let i = 0; i < this.tablicaPionkow.length; i++) {
        for (let j = 0; j < this.tablicaPionkow[0].length; j++) {
          game.prePionki.innerHTML += this.tablicaPionkow[i][j] + " ";
          if (j == this.tablicaPionkow[0].length - 1) {
            game.prePionki.innerHTML += `<br>`;
          }
        }
      }

      for (let i = 0; i < game.scene.children.length; i++) {
        if (game.scene.children[i].rodzaj === "pionek" && game.scene.children[i].position.x == data.stareX && game.scene.children[i].position.z == data.stareZ) {
          new TWEEN.Tween(game.scene.children[i].position) // co
            .to({ x: data.noweX, z: data.noweZ }, 250) // do jakiej pozycji, w jakim czasie
            .easing(TWEEN.Easing.Sinusoidal.In) // typ easingu (zmiana w czasie)
            .start()
        }
      }

      if (data.ktoWykonalRuch == this.kolorGracza) {
        this.pokazEkranOczekiwania()
      }
      else {
        this.ukryjEkranOczekiwania()
      }

    });

    this.client.on("koniecGry", data => {
      if (data.ktoWygral == "bialymi") {
        this.przegrany = "czarnymi"
      }
      else {
        this.przegrany = "bialymi"
      }
      this.blokada = true
      document.getElementById("overlay").removeAttribute("hidden");
      document.getElementById("wygranaPrzezCzas").removeAttribute("hidden")
      document.getElementById("odliczanie").removeAttribute("hidden")
      document.getElementById("odliczanie").innerText = "Koniec czasu!"
      document.getElementById("wygranaPrzezCzas").innerText = `Grający ${this.przegrany} przegrał!`

    })

  } // to musi byc wywolane tylko raz, bo on działa jak eventlistener

  pokazEkranOczekiwania() {
    document.getElementById("overlay").removeAttribute("hidden");
    document.getElementById("oczekiwanieRuch").removeAttribute("hidden");
    document.getElementById("odliczanie").removeAttribute("hidden");
    this.ustawTimer()
    this.blokada = true
  }

  ukryjEkranOczekiwania() {
    document.getElementById("overlay").setAttribute("hidden", "");
    document.getElementById("oczekiwanieRuch").setAttribute("hidden", "");
    document.getElementById("odliczanie").setAttribute("hidden", "");
    clearInterval(this.timer)
    this.blokada = false
  }

  podzielPionki() {
    this.podzielonePionki = {
      biale: [],
      czarne: [],
      bialeIPola: [],
      czarneIPola: []
    }

    for (let i = 0; i < game.scene.children.length; i++) {
      if (game.scene.children[i].info == "czarnyPionek") {
        this.podzielonePionki.czarne.push(game.scene.children[i])
        this.podzielonePionki.czarneIPola.push(game.scene.children[i])
      }
      if (game.scene.children[i].info == "bialyPionek") {
        this.podzielonePionki.biale.push(game.scene.children[i])
        this.podzielonePionki.bialeIPola.push(game.scene.children[i])
      }
      if (game.scene.children[i].info == "czarnePole") {
        this.podzielonePionki.czarneIPola.push(game.scene.children[i])
        this.podzielonePionki.bialeIPola.push(game.scene.children[i])
      }
    }
  }

  // printMagicIndex(arr) {
  //   console.log(arr?.[42]); 
  // } // jesli nie podam argumentu, to z tym ?. sie robi tylko undefined

  klikanieRaycaster = () => {
    this.klikniete = [];
    this.klikniete2 = []
    let licznik = 0;
    let nachodzacy;
    this.stworzSocket()
    this.podzielPionki()

    window.addEventListener("mousedown", e => {
      this.mouseVector.x = (e.clientX / window.innerWidth) * 2 - 1;
      this.mouseVector.y = -(e.clientY / window.innerHeight) * 2 + 1; // pozycja myszy zostaje przeliczona na wartości -1 do 1, wymagane przez raycaster
      this.raycaster.setFromCamera(this.mouseVector, game.camera);

      if (!this.blokada) {
        if (this.kolorGracza == "bialymi") {
          this.intersects = this.raycaster.intersectObjects(this.podzielonePionki.bialeIPola);
        }
        else {
          this.intersects = this.raycaster.intersectObjects(this.podzielonePionki.czarneIPola);
        }
      }
      else {
        this.intersects = []
      }

      if (this.intersects.length > 0) {
        this.kliknietyTeraz = this.intersects[0].object;
        console.log(this.kliknietyTeraz);

        licznik++;
        if (licznik > 2) {
          licznik = 1;
        }

        this.klikniete.push(this.kliknietyTeraz);

        if (this.klikniete.length > 2) {
          this.klikniete.shift(); // klikniety na pozycji 2 => 1 => out
        }

        if (this.klikniete.length == 1) {
          this.kliknietyTeraz.material.color.r = 0; // 0 - koloruje, 1 - bez zmian
        } else if (this.klikniete.length == 2) {
          this.klikniete[0].material.color.r = 1;
          this.klikniete[1].material.color.r = 0;
        }



        //pamietaj ze I i J w polu i w pionku są na odwrot
        // z pionka 6_1 chcę ruszyć się na pole 0_5 lub 2_5

        // this.poprzedniaPozycja = this.kliknietyTeraz.pozycjaIJ
        // this.poprzednieI = parseFloat(this.poprzedniaPozycja.substring(0, 1))
        // this.poprzednieJ = parseFloat(this.poprzedniaPozycja.substring(2, 3))
        // if (this.kolorGracza == "bialymi") {
        //   if (this.kliknietyTeraz.rodzaj == "pionek") {
        //     this.nastepnePola = []
        //     this.nastepneI = this.poprzednieI - 1
        //     this.nastepneJ1 = this.poprzednieJ - 1
        //     this.nastepneJ2 = this.poprzednieJ + 1
        //     this.nastepnePole1 = game.scene.getObjectByProperty("pozycjaIJ", `${this.nastepneJ1}_${this.nastepneI}`)
        //     this.nastepnePole2 = game.scene.getObjectByProperty("pozycjaIJ", `${this.nastepneJ2}_${this.nastepneI}`)
        //     this.nastepnePola = [this.nastepnePole1, this.nastepnePole2]
        //     if (this.nastepnePola[0] != undefined) {
        //       this.nastepnePola[0].material.color.r = 0
        //     }
        //     if (this.nastepnePola[1] != undefined) {
        //       this.nastepnePola[1].material.color.r = 0
        //     }
        //   }
        // }
        // else {

        // }

        // if (this.kolorGracza == "bialymi") {
        //   if (this.kliknietyTeraz.info == "bialyPionek") {
        //     this.zaznaczPionka()
        //   }
        //   // if (this.klikniete.length == 1 && this.klikniete[0]) {

        //   // }
        // }
        // else {
        //   if (this.kliknietyTeraz.info == "czarnyPionek") {
        //     this.zaznaczPionka()
        //   }
        // }



        if (licznik == 2) {
          nachodzacy = false;

          for (let i = 0; i < game.scene.children.length; i++) {
            if (game.scene.children[i].rodzaj == "pionek" && (this.klikniete[1].position.x == game.scene.children[i].position.x && this.klikniete[1].position.z == game.scene.children[i].position.z)) {
              nachodzacy = true;
            }
          }

          if (nachodzacy == false && (this.klikniete[0].rodzaj == "pionek" && this.klikniete[1].info == "czarnePole")) {

            // if (this.klikniete2.length == 2) {
            //   this.klikniete2[0].material.color.r = 1;
            //   this.klikniete2[1].material.color.r = 1; // odkolorowywuje pionki
            //   this.klikniete2 = []
            // }
            // else if (this.klikniete2.length == 1) {
            //   this.klikniete2[0].material.color.r = 1;
            //   this.klikniete2 = []
            // }

            this.stareZ = this.klikniete[0].position.z;
            this.stareX = this.klikniete[0].position.x;
            this.noweZ = this.klikniete[1].position.z;
            this.noweX = this.klikniete[1].position.x;

            this.client.emit("ruch", {
              stareZ: this.stareZ,
              stareX: this.stareX,
              noweX: this.noweX,
              noweZ: this.noweZ,
              stareI: (this.stareX + 105) / 30,
              stareJ: (this.stareZ + 105) / 30,
              noweI: (this.noweX + 105) / 30,
              noweJ: (this.noweZ + 105) / 30,
              ktoWykonalRuch: this.kolorGracza,
            });

          } // czyli tutaj ruch pionka się powiódł
          else {
            // if (this.klikniete2.length == 2) {
            //   this.klikniete2[0].material.color.r = 1;
            //   this.klikniete2[1].material.color.r = 1; // odkolorowywuje pionki
            //   this.klikniete2 = []
            // }
            // else if (this.klikniete2.length == 1) {
            //   this.klikniete2[0].material.color.r = 1;
            //   this.klikniete2 = []
            // }
            // console.log(this.klikniete2[0]);
            // console.log(this.klikniete2[1]);
            licznik = 1;
          }
        }
      }

    });
  };

  ustawTimer() {
    this.start = Date.now()
    this.timer = setInterval(() => {
      this.milisekundy = Date.now() - this.start
      this.wyswietlone = 30 - Math.floor(this.milisekundy / 1000)
      document.getElementById("odliczanie").innerText = `${this.wyswietlone}`
      // console.log(typeof this.wyswietlone);
      if (this.wyswietlone <= -9999) { // zmienic, teraz wkurza
        this.client.emit("koniecGry", {
          ktoWygral: this.kolorGracza
        })
        clearInterval(this.timer)
        if (this.kolorGracza == "bialymi") {
          this.przegrany = "czarnymi"
        }
        else {
          this.przegrany = "bialymi"
        }
        document.getElementById("odliczanie").innerText = "Koniec czasu!"
        document.getElementById("wygranaPrzezCzas").removeAttribute("hidden")
        document.getElementById("wygranaPrzezCzas").innerText = `Grający ${this.przegrany} przegrał!`
        document.getElementById("oczekiwanieRuch").setAttribute("hidden", "")
      }
    }, 1000);
  }

  // zaznaczPionka() {
  //   this.klikniete2.push(this.kliknietyTeraz)
  //   if (this.klikniete2.length > 2) {
  //     this.klikniete2.shift();
  //   }
  //   if (this.klikniete2.length == 1) {
  //     this.klikniete2[0].material.color.r = 0
  //   }
  //   else if (this.klikniete2.length == 2) {
  //     this.klikniete2[0].material.color.r = 1
  //     this.klikniete2[1].material.color.r = 0;
  //   }
  // }

}
