window.addEventListener("load", function () {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
        45,
        window.innerWidth / this.window.innerHeight,
        0.1,
        10000
    );
    const renderer = new THREE.WebGLRenderer();
    const axes = new THREE.AxesHelper(1000);

    renderer.setClearColor(0xffffff);
    renderer.setSize(window.innerWidth, window.innerHeight);

    this.document.getElementById("root").appendChild(renderer.domElement);

    camera.position.set(400, 400, 400);
    camera.lookAt(scene.position)

    scene.add(axes);

    let data = [];
    let addButton = this.document.getElementById("addCube");
    let delButton = this.document.getElementById("deleteCubes");
    let pre = this.document.getElementById("cubesCoords");
    let cubeIndex = 0;

    addButton.onclick = function () {
        const geometry = new THREE.BoxGeometry(50, 50, 50);
        const material = new THREE.MeshNormalMaterial({
            side: THREE.DoubleSide,
            wireframe: false,
            transparent: false,
        });
        const cube = new THREE.Mesh(geometry, material);
        cube.position.set(getRandomInt(-300, 300), getRandomInt(-100, 100), getRandomInt(-300, 300));
        let pos = {
            x: cube.position.x,
            y: cube.position.y,
            z: cube.position.z
        }
        let info = { info: `cube ${cubeIndex}` };
        let obj = {
            info: info,
            pos: pos
        }
        data.push(obj);
        pre.innerText = JSON.stringify(data, null, 3);
        cubeIndex++;
        scene.add(cube);
    }

    delButton.onclick = function () {
        cubeIndex = 0;
        pre.innerHTML = "";
        data = [];
        while (scene.children.length > 0) {
            scene.remove(scene.children[0]);
        }
        scene.add(axes);
    }

    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    }

    function render() {
        requestAnimationFrame(render);
        console.log("render leci");
        renderer.render(scene, camera);
    }

    render();
})

window.addEventListener('resize', onWindowResize, false);

function onWindowResize() {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);

}