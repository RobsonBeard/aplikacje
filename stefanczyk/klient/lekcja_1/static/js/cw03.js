window.addEventListener("load", function () {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
        45, // fov
        this.window.innerWidth / this.window.innerHeight, // proporcje widoku
        0.1, // minimalna renderowana odległość
        10000 // maksymalna renderowana odległość
    )
    const renderer = new THREE.WebGLRenderer();
    const axes = new THREE.AxesHelper(1000);

    scene.add(axes);

    renderer.setClearColor(0xffffff);
    renderer.setSize(this.window.innerWidth, this.window.innerHeight);

    document.getElementById("root").appendChild(renderer.domElement);

    camera.position.set(300, 300, 300);
    camera.lookAt(scene.position);

    let cubeButton = this.document.getElementById("cube");
    let sphereButton = this.document.getElementById("sphere");
    let cylinderButton = this.document.getElementById("cylinder");
    let coneButton = this.document.getElementById("cone");
    let pre = this.document.getElementById("types")
    let data = [
        {
            type: axes.type,
            geometry: axes.geometry.type
        }
    ];
    pre.innerText = JSON.stringify(data, null, 3);

    cubeButton.onclick = function () {
        this.innerText = "dodano";
        const geometry = new THREE.BoxGeometry(100, 100, 100, 3, 3, 3);
        const material = new THREE.MeshBasicMaterial({
            color: 0x0000ff,
            side: THREE.DoubleSide,
            wireframe: true,
            transparent: true,
            opacity: 0.9,
        });
        const cube = new THREE.Mesh(geometry, material);
        let obj = {
            type: cube.type,
            geometry: cube.geometry.type
        }
        data.push(obj);
        pre.innerHTML = JSON.stringify(data, null, 3);
        scene.add(cube);
    }

    sphereButton.onclick = function () {
        this.innerText = "dodano";
        const geometry = new THREE.SphereGeometry(50, 15, 15)
        const material = new THREE.MeshBasicMaterial({
            color: 0x00ff00,
            side: THREE.DoubleSide,
            wireframe: true,
            transparent: true,
            opacity: 0.9,
        });
        const sphere = new THREE.Mesh(geometry, material);
        let obj = {
            type: sphere.type,
            geometry: sphere.geometry.type
        }
        data.push(obj);
        pre.innerHTML = JSON.stringify(data, null, 3);
        scene.add(sphere);
    }

    cylinderButton.onclick = function () {
        this.innerText = "dodano";
        const geometry = new THREE.CylinderGeometry(50, 50, 100, 15, 5)
        const material = new THREE.MeshBasicMaterial({
            color: 0xff0000,
            side: THREE.DoubleSide,
            wireframe: true,
            transparent: true,
            opacity: 0.9,
        });
        const cylinder = new THREE.Mesh(geometry, material);
        let obj = {
            type: cylinder.type,
            geometry: cylinder.geometry.type
        }
        data.push(obj);
        pre.innerHTML = JSON.stringify(data, null, 3);
        scene.add(cylinder);
    }

    coneButton.onclick = function () {
        this.innerText = "dodano";
        const geometry = new THREE.ConeGeometry(50, 100, 15, 3)
        const material = new THREE.MeshBasicMaterial({
            color: 0xff00ff,
            side: THREE.DoubleSide,
            wireframe: true,
            transparent: true,
            opacity: 0.9,
        });
        const cone = new THREE.Mesh(geometry, material);
        let obj = {
            type: cone.type,
            geometry: cone.geometry.type
        }
        data.push(obj);
        pre.innerHTML = JSON.stringify(data, null, 3);
        scene.add(cone);
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