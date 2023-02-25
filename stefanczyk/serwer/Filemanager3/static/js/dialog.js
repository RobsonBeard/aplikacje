let nowyFolder = document.getElementById("nowyFolder")
nowyFolder.addEventListener("click", otworzDialog1)
let dialog1 = document.getElementById("dialog1")

let nowyPlik = document.getElementById("nowyPlik")
nowyPlik.addEventListener("click", otworzDialog2)
let dialog2 = document.getElementById("dialog2")

let dialog3 = document.getElementById("dialog3")
let zmianaNazwy = document.getElementById("zmianaNazwy")
zmianaNazwy.addEventListener("click", otworzDialog3)

function otworzDialog1() {
    dialog1.open = true
    dialog2.open = false
    dialog3.open = false
}

function otworzDialog2() {
    dialog1.open = false
    dialog2.open = true
    dialog3.open = false
}

function otworzDialog3() {
    dialog1.open = false
    dialog2.open = false
    dialog3.open = true
}

function zamknijDialog1() {
    dialog1.open = false
}

function zamknijDialog2() {
    dialog2.open = false
}

function zamknijDialog3() {
    dialog3.open = false
}