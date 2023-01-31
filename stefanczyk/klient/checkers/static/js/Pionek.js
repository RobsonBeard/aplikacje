// // klasa Pionka, zwraca cylindrycznego mesha

// class Pionek extends THREE.Mesh {

//     constructor() {
//         super() // wywołanie konstruktora klasy z której dziedziczymy czyli z Mesha
//         console.log(this) // ten console log wykonuje sie pierwszy

//     }
// }

// const pionek = new Pionek()
// console.log(pionek.type) // ten drugi

class Pionek {
    constructor() {

    }

    czarnePionki = () => {
        this.materialCzarnePionki = new THREE.MeshBasicMaterial({
            side: THREE.DoubleSide,
            transparent: false,
            map: new THREE.TextureLoader().load('mats/czarne.jpg'),
            color: 0xFF0000,
        })
        this.geomertiaPionka = new THREE.CylinderGeometry(10, 10, 10, 32)
        this.figura2 = new THREE.Mesh(this.geomertiaPionka, this.materialCzarnePionki)
        return this.figura2
    }

    bialePionki = () => {
        this.materialBialePionki = new THREE.MeshBasicMaterial({
            side: THREE.DoubleSide,
            transparent: false,
            map: new THREE.TextureLoader().load('mats/biale.jpg'),
            color: 0xFFFF00,
        })
        this.geomertiaPionka = new THREE.CylinderGeometry(10, 10, 10, 32)
        this.figura2 = new THREE.Mesh(this.geomertiaPionka, this.materialBialePionki)
        return this.figura2
    }

    zrobCzarnePionki = () => {
        for (let i = 0; i < game.pionki.length; i++) {
            for (let j = 0; j < game.pionki[0].length; j++) {
                if (game.pionki[i][j] == 2) {

                    let figura2 = this.czarnePionki()
                    figura2.position.y = 15
                    figura2.position.x = -105 + j * 30
                    figura2.position.z = -105 + i * 30
                    figura2.info = `czarnyPionek`
                    game.scene.add(figura2)
                }
            }
        }
    }

    zrobBialePionki = () => {
        for (let i = 0; i < game.pionki.length; i++) {
            for (let j = 0; j < game.pionki[0].length; j++) {
                if (game.pionki[i][j] == 1) {

                    let figura2 = this.bialePionki()
                    figura2.position.y = 15
                    figura2.position.x = -105 + j * 30
                    figura2.position.z = -105 + i * 30
                    figura2.info = `bialyPionek`
                    game.scene.add(figura2)
                }
            }
        }
    }

}
