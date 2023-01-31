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
    let widthInp = this.document.getElementById("width");
    let heightInp = this.document.getElementById("height");
    let depthInp = this.document.getElementById("depth");

    const geometry = new THREE.BoxGeometry(10, 10, 10);
    const material = new THREE.MeshNormalMaterial({
        side: THREE.DoubleSide,
        wireframe: false,
        transparent: false,
    });
    const rect = new THREE.Mesh(geometry, material);
    rect.scale.set(widthInp.value, heightInp.value, depthInp.value)
    scene.add(rect);

    console.log(rect);

    

    widthInp.oninput = function () {
        rect.scale.set(widthInp.value, heightInp.value, depthInp.value)
    }

    heightInp.oninput = function () {
        rect.scale.set(widthInp.value, heightInp.value, depthInp.value)
    }

    depthInp.oninput = function () {
        rect.scale.set(widthInp.value, heightInp.value, depthInp.value)
    }

    function render() {
        requestAnimationFrame(render);
        console.log("render leci");
        renderer.render(scene, camera);
    }
    render();
})