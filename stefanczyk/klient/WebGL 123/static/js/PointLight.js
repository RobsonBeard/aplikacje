class Light {

    constructor(parametrA, parametrB) {

        // przykładowe, nieobowiązkowe parametry konstruktora
        // przekazane podczas tworzenia obiektu klasy Light
        // np scena, kolor światła, wielkość bryły

        this.parametrA = parametrA
        this.parametrB = parametrB

        // dodatkowe zmienne tworzone w konstruktorze
        // widoczne w dalszych funkcjach

        // this.zmienna = 0

        // pusty kontener na inne obiekty 3D

        this.container = new THREE.Object3D();
        this.container.position.set(0, 100, 0)

        //wywołanie funkcji init()

        this.init()
    }

    init() {

        // utworzenie i pozycjonowanie światła

        this.light = new THREE.PointLight(0xffff00, 1);
        this.light.position.set(0, 0, 0); // ma być w pozycji 0,0,0 kontenera - nie zmieniamy!!! :)

        // dodanie światła do kontenera

        this.container.add(this.light);

        //utworzenie widzialnego elementu reprezentującego światło (mały sześcian, kula, czworościan foremny, do wyboru)

        // this.mesh = new THREE.Mesh(..........)
        this.material = new THREE.MeshBasicMaterial({
            side: THREE.DoubleSide,
            wireframe: true,
            transparent: false,
            color: 0x0000ff,
        });
        this.geometria = new THREE.SphereGeometry(10, 10, 10);
        this.kulka = new THREE.Mesh(this.geometria, this.material)
        this.kulka.position.set(0, 0, 0)

        // dodanie go do kontenera

        this.container.add(this.kulka);
    }


    // funkcja zwracająca obiekt kontenera
    // czyli nasze światło wraz z bryłą

    getLight() {
        return this.container;
    }

    // przykład innej funkcji, np do zmiany koloru bryły, zmiany koloru światła, etc

    // changeColor(color) {
    //     console.log("zmiana koloru na " + color)
    // }

}