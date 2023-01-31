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


}
let zrobCzarnePionki = () => {
    for (let i = 0; i < game.pionki.length; i++) {
        for (let j = 0; j < game.pionki[0].length; j++) {
            if (game.pionki[i][j] == 2) {

                let czP = new Pionek()
                let figura2 = czP.czarnePionki()
                figura2.position.y = 15
                figura2.position.x = -105 + j * 30
                figura2.position.z = -105 + i * 30
                figura2.info = `czarnyPionek`
                game.scene.add(figura2)
            }
        }
    }
} // i w ten sposob to dziala dobrze, pokrecone mocno

let zrobBialePionki = () => {
    for (let i = 0; i < game.pionki.length; i++) {
        for (let j = 0; j < game.pionki[0].length; j++) {
            if (game.pionki[i][j] == 1) {

                let bP = new Pionek()
                let figura2 = bP.bialePionki()
                figura2.position.y = 15
                figura2.position.x = -105 + j * 30
                figura2.position.z = -105 + i * 30
                figura2.info = `bialyPionek`
                game.scene.add(figura2)
            }
        }
    }
}


