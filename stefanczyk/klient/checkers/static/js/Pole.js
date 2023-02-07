// // klasa Itema, zwraca element planszy

class Pole {
    constructor() {

    }

    czarnePola = () => {
        this.materialCzarnePola = new THREE.MeshBasicMaterial({
            side: THREE.DoubleSide, // dwustronny
            transparent: false,
            map: new THREE.TextureLoader().load('mats/czarne.jpg'),
        })
        this.geometriaPola = new THREE.BoxGeometry(30, 15, 30)
        this.figura = new THREE.Mesh(this.geometriaPola, this.materialCzarnePola)
        return this.figura
    }

    bialePola = () => {
        this.materialBialePola = new THREE.MeshBasicMaterial({
            side: THREE.DoubleSide, // dwustronny
            transparent: false,
            map: new THREE.TextureLoader().load('mats/biale.jpg'),
        })
        this.geometriaPola = new THREE.BoxGeometry(30, 15, 30)
        this.figura2 = new THREE.Mesh(this.geometriaPola, this.materialBialePola)
        return this.figura2
    }

    zrobCzarnePola = () => {
        for (let i = 0; i < game.szachownica.length; i++) {
            for (let j = 0; j < game.szachownica[0].length; j++) {
                if (game.szachownica[i][j] == 0) {
                    let figura = this.czarnePola()
                    figura.info = `czarnePole`
                    figura.rodzaj = `pole`
                    figura.position.x = -105 + i * 30
                    figura.position.z = -105 + j * 30
                    game.scene.add(figura)
                }
            }
        }
    }

    zrobBialePola = () => {
        for (let i = 0; i < game.szachownica.length; i++) {
            for (let j = 0; j < game.szachownica[0].length; j++) {
                if (game.szachownica[i][j] == 1) {
                    let figura = this.bialePola()
                    figura.info = `bialePole`
                    figura.rodzaj = `pole`
                    figura.position.x = -105 + i * 30
                    figura.position.z = -105 + j * 30
                    game.scene.add(figura)
                }
            }
        }
    }

    zrobPlansze = () => {
        this.zrobBialePola()
        this.zrobCzarnePola()
    }

}