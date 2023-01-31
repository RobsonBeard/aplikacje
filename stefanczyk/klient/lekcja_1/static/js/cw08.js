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
    let inpX = this.document.getElementById("inpX");
    let inpY = this.document.getElementById("inpY");
    let inpZ = this.document.getElementById("inpZ");

    const geometry = new THREE.BoxGeometry(10, 10, 10);
    const material = new THREE.MeshNormalMaterial({
        side: THREE.DoubleSide,
        wireframe: false,
        transparent: false,
    });
    const rect = new THREE.Mesh(geometry, material);
    rect.position.set(0, 0, 0);
    scene.add(rect);

    console.log(rect);

    inpX.value = 0;
    inpY.value = 0;
    inpZ.value = 0;

    inpX.oninput = function () {
        rect.position.set(inpX.value, inpY.value, inpZ.value);
    }

    inpY.oninput = function () {
        rect.position.set(inpX.value, inpY.value, inpZ.value);
    }

    inpZ.oninput = function () {
        rect.position.set(inpX.value, inpY.value, inpZ.value);
    }

    function render() {
        requestAnimationFrame(render);
        console.log("render leci");
        renderer.render(scene, camera);
    }
    render();
})