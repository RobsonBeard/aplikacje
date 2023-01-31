// ctrl shift p i format mozna
let n = 10;
let m = 10;
let arr = [];

function generateArr(n, m) {
    for (let i = 0; i < n; i++) {
        arr[i] = [];
        for (let j = 0; j < m; j++) {
            arr[i][j] = 0;
        }
    }
}

function losuj(n) {
    let x = Math.floor(Math.random() * n);
    // ...
}

function render(n, m) {
    let c = document.createElement("div");
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < m; j++) {
            let div = document.createElement("div")
            div.classList.add("pole");
            div.innerText = arr[i][j];
            c.appendChild(div);
        }
    }
    // console.log(document.body);
    document.body.appendChild(c);
}

// console.log("adiohadfwhadwfr")
generateArr(n, m);
render(n, m);
        // console.table(arr);


