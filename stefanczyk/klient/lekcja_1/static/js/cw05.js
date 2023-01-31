window.addEventListener("load", function () {
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
        45,
        this.window.innerWidth / this.window.innerHeight,
        0.1,
        10000
    );

    const renderer = new THREE.WebGLRenderer();

    const axes = new THREE.AxesHelper(1000)

    scene.add(axes)

    renderer.setClearColor(0xffffff);
    renderer.setSize(this.window.innerWidth, this.window.innerHeight);

    document.getElementById("root").appendChild(renderer.domElement);

    camera.position.set(100, 100, 100);
    camera.lookAt(scene.position);

    let data = [];
    let button = this.document.getElementById("create");
    let pre = this.document.getElementById("params");
    let widthInp = this.document.getElementById("width");
    let heightInp = this.document.getElementById("height");
    let depthInp = this.document.getElementById("depth");

    button.onclick = function () {
        pre.innerHTML = "";
        data = [];
        while (scene.children.length > 0) {
            scene.remove(scene.children[0]);
        }
        scene.add(axes);

        const geometry = new THREE.BoxGeometry(widthInp.value, heightInp.value, depthInp.value);
        const material = new THREE.MeshNormalMaterial({
            side: THREE.DoubleSide,
            wireframe: false,
            transparent: false,
        });
        const rect = new THREE.Mesh(geometry, material);

        console.log(rect);

        let obj = {
            info: "rect 0",
            dimensions: {
                width: rect.geometry.parameters.width,
                height: rect.geometry.parameters.height,
                depth: rect.geometry.parameters.depth
            }
        }
        data.push(obj);
        pre.innerText = JSON.stringify(data, null, 3);
        scene.add(rect);
    }

    function render() {
        requestAnimationFrame(render);
        console.log("render leci");
        renderer.render(scene, camera);
    }
    render();
})