window.addEventListener("load", function () {
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
        45,
        this.window.innerWidth / this.window.innerHeight,
        0.1,
        10000
    );

    const renderer = new THREE.WebGLRenderer({ antialias: true }); // wygładza krawędzie!!!!!!!!!!!!!!!!!!! 

    const axes = new THREE.AxesHelper(1000)

    scene.add(axes)

    renderer.setClearColor(0xffffff);
    renderer.setSize(this.window.innerWidth, this.window.innerHeight);

    document.getElementById("root").appendChild(renderer.domElement);

    camera.position.set(100, 100, 100);
    camera.lookAt(scene.position);

    for (let i = 0; i < 5; i++) {
        for (let j = 0; j < 5; j++) {
            const geometry = new THREE.BoxGeometry(9, 9, 9);
            const material = new THREE.MeshNormalMaterial({
                side: THREE.DoubleSide,
                wireframe: false,
                transparent: false,
            });
            const cube = new THREE.Mesh(geometry, material);
            cube.position.set(i * 10, 0, j * 10);
            scene.add(cube);
        }
    }


    function render() {
        requestAnimationFrame(render);
        console.log("render leci");
        renderer.render(scene, camera);
    }
    render();
})