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

    camera.position.set(0, 75, 100);
    camera.lookAt(scene.position);

    let count = 5;

    for (let j = count / -2; j < count / 2; j++) {
        const geometry = new THREE.BoxGeometry(10, 10, 10);
        const material = new THREE.MeshNormalMaterial({
            side: THREE.DoubleSide,
            wireframe: false,
            transparent: false,
        });
        const cube = new THREE.Mesh(geometry, material);
        cube.position.set(j * 10, j * 10, count / -0.2);
        scene.add(cube);
    }

    for (let j = count / -2; j < count / 2; j++) {
        const geometry = new THREE.BoxGeometry(10, 10, 10);
        const material = new THREE.MeshNormalMaterial({
            side: THREE.DoubleSide,
            wireframe: false,
            transparent: false,
        });
        const cube = new THREE.Mesh(geometry, material);
        cube.position.set(count / -0.2, j * 10, j * 10);
        scene.add(cube);
    }

    for (let j = count / -2; j < count / 2; j++) {
        const geometry = new THREE.BoxGeometry(10, 10, 10);
        const material = new THREE.MeshNormalMaterial({
            side: THREE.DoubleSide,
            wireframe: false,
            transparent: false,
        });
        const cube = new THREE.Mesh(geometry, material);
        cube.position.set(j * 10, j * -10 - 10, count / 0.2 - 10);
        scene.add(cube);
    }

    for (let j = count / -2; j < count / 2; j++) {
        const geometry = new THREE.BoxGeometry(10, 10, 10);
        const material = new THREE.MeshNormalMaterial({
            side: THREE.DoubleSide,
            wireframe: false,
            transparent: false,
        });
        const cube = new THREE.Mesh(geometry, material);
        cube.position.set(count / 0.2 - 10, j * -10 - 10, j * 10);
        scene.add(cube);
    }

    const inpFov = this.document.getElementById("inpFov");
    const inpY = this.document.getElementById("inpY");
    const inpCount = this.document.getElementById("inpCount");

    inpFov.value = camera.fov;

    inpFov.oninput = function () {
        camera.fov = this.value;
        camera.updateProjectionMatrix();
    }

    inpY.oninput = function () {
        camera.position.y = this.value;
        camera.lookAt(scene.position);
    }

    function render() {
        requestAnimationFrame(render);
        console.log("render leci");
        renderer.render(scene, camera);
    }
    render();
})