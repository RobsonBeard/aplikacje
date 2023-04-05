let options = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
};

let itemContainerDiv = document.getElementById("itemContainer")

let animalSelect = document.getElementById("animalSelect")
let colorSelect = document.getElementById("colorSelect")

document.getElementById("addingButton").addEventListener("click", () => {

    let selectData = JSON.stringify({ animal: animalSelect.value, color: colorSelect.value })
    options.body = selectData

    fetch("/add", options)
        .then(response => response.json())
        .then(data => {
            // console.log(data);

            let animalItems = []
            let returned = []

            for (let i = 0; i < data.length; i++) {
                let itemDiv = document.createElement("div")
                itemDiv.classList.add('item')
                itemDiv.innerText = `${data[i].name} ${data[i].color}`
                animalItems.push(itemDiv)
                returned.push({ id: i, name: data[i].name, color: data[i].color })
            }

            itemContainerDiv.replaceChildren(...animalItems)

            let alertObject = {
                status: "animal added",
                arr: returned
            }
            alert(JSON.stringify(alertObject, null, 5))
        })
        .catch(error => console.log(error));

})


window.addEventListener("load", () => {
    fetch("/getall", options)
        .then(response => response.json())
        .then(data => {
            // console.log(data);

            let animalItems = []

            for (let i = 0; i < data.length; i++) {
                let itemDiv = document.createElement("div")
                itemDiv.classList.add('item')
                itemDiv.innerText = `${data[i].name} ${data[i].color}`
                animalItems.push(itemDiv)
            }

            itemContainerDiv.replaceChildren(...animalItems)
        })
        .catch(error => console.log(error));
})