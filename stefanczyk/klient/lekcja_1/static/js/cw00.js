window.addEventListener("load", function () {
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
        45,
        4 / 3,
        0.1,
        10000
    );

    const renderer = new THREE.WebGLRenderer();

    renderer.setClearColor(0x0066ff);
    renderer.setSize(500, 500);

    document.getElementById("root").appendChild(renderer.domElement);

    camera.position.set(100, 100, 100);
    camera.lookAt(scene.position);

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