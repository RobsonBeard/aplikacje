let nowyFolder = document.getElementById("nowyFolder")
nowyFolder.addEventListener("click", otworzDialog)
let dialog = document.getElementById("dialog")

function otworzDialog() {
    console.log(dialog);
    dialog.open = true
}