window.addEventListener("load", function () {
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
        45,
        this.window.innerWidth / this.window.innerHeight,
        0.1,
        10000
    );

    const renderer = new THREE.WebGLRenderer();

    const axes = new THREE.AxesHelper(1000);

    const geometry = new THREE.BoxGeometry(100, 100, 100);
    const material = new THREE.MeshBasicMaterial({
        color: 0x8888ff,
        side: THREE.DoubleSide,
        wireframe: false,
        transparent: false,
        opacity: 0.5
    });
    const cube = new THREE.Mesh(geometry, material);

    scene.add(axes);
    scene.add(cube);

    renderer.setClearColor(0xffffff);
    renderer.setSize(this.window.innerWidth, this.window.innerHeight);

    document.getElementById("root").appendChild(renderer.domElement);

    camera.position.set(200, 0, 200);
    camera.lookAt(scene.position);

    function render() {
        requestAnimationFrame(render);
        console.log("render leci");
        renderer.render(scene, camera);
        cube.rotation.y += 0.01;
    }

    let fovObj = {
        fov: camera.fov
    }
    document.getElementById("fovChange").value = camera.fov;
    document.getElementById("currentFov").innerHTML = JSON.stringify(fovObj, null, 3);

    this.document.getElementById("fovChange").oninput = function () {
        document.getElementById("currentFov").innerHTML = JSON.stringify(fovObj, null, 3);
        camera.fov = this.value;
        fovObj.fov = camera.fov;
        camera.updateProjectionMatrix();
    }

    render();

})

window.addEventListener('resize', onWindowResize, false);

function onWindowResize() {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);

}