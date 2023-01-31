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

    let data = [];
    let pre = this.document.getElementById("params");
    let button = this.document.getElementById("cameraBtn");
    let a = 0;

    const geometry = new THREE.BoxGeometry(10, 10, 10);
    const material = new THREE.MeshNormalMaterial({
        side: THREE.DoubleSide,
        wireframe: false,
        transparent: false,
    });
    const rect = new THREE.Mesh(geometry, material);
    scene.add(rect);

    button.onclick = function () {
        data = [];
        if (a == 0) {
            camera.position.set(0, 0, 0);
            a++;
        }
        else if (a == 1) {
            camera.position.set(100, 0,0);
            a++;
        }
        else if (a == 2) {
            camera.position.set(0, 100, 0);
            a++;
        }
        else if (a == 3) {
            camera.position.set(0, 0, 100);
            a++;
        }
        else if (a == 4) {
            camera.position.set(100, 100, 0);
            a++;
        }
        else if (a == 5) {
            camera.position.set(0, 100, 100);
            a++;
        }
        else if (a == 6) {
            camera.position.set(100, 0, 100);
            a++;
        }
        else if (a == 7) {
            camera.position.set(100, 100, 100);
            a = 0;
        }
        data.push({
            x: camera.position.x,
            y: camera.position.y,
            z: camera.position.z
        })
        pre.innerText = JSON.stringify(data, null, 3)
    }

    function render() {
        requestAnimationFrame(render);
        console.log("render leci");
        renderer.render(scene, camera);
    }
    render();
})