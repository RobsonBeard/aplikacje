let options = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
};

let itemContainerSelect = document.getElementById("itemContainer")
let animalSelect = document.getElementById("animalSelect")
let colorSelect = document.getElementById("colorSelect")

let addingButton = document.getElementById("addingButton")
let gettingButton = document.getElementById("gettingButton")
let deletingButton = document.getElementById("deletingButton")
let updatingButton = document.getElementById("updatingButton")

const updateAfterReceivingData = (data) => {
    let animalItems = []

    for (let i = 0; i < data.length; i++) {
        let itemOption = document.createElement("option")
        itemOption.setAttribute("value", data[i].id)
        itemOption.classList.add('item')
        itemOption.innerText = `${data[i].name} ${data[i].color}`
        animalItems.push(itemOption)
    }

    itemContainerSelect.replaceChildren(...animalItems)
}


window.addEventListener("load", () => {
    fetch("/getall", options)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            updateAfterReceivingData(data)
        })
        .catch(error => console.log(error));
})

addingButton.addEventListener("click", () => {

    let selectData = JSON.stringify({ animal: animalSelect.value, color: colorSelect.value })
    options.body = selectData //? nie jestem pewny czy to będzie działać

    fetch("/add", options)
        .then(response => response.json())
        .then(data => {
            console.log(data);

            updateAfterReceivingData(data)

            let alertObject = {
                status: "animal added",
                arr: data
            }
            alert(JSON.stringify(alertObject, null, 5))
        })
        .catch(error => console.log(error));
})

gettingButton.addEventListener("click", () => {
    fetch("/getall", options)
        .then(response => response.json())
        .then(data => {
            console.log(data);

            updateAfterReceivingData(data)

            let alertObject = {
                all: data
            }
            alert(JSON.stringify(alertObject, null, 5))
        })
        .catch(error => console.log(error));
})

deletingButton.addEventListener("click", () => {
    if (itemContainerSelect.value !== '') {
        let selectData = JSON.stringify({ id: parseFloat(itemContainerSelect.value) })
        options.body = selectData

        fetch("/delete", options)
            .then(response => response.json())
            .then(data => {
                console.log(data);

                updateAfterReceivingData(data)

                let alertObject = {
                    status: "animal deleted",
                    arr: data
                }
                alert(JSON.stringify(alertObject, null, 5))
            })
            .catch(error => console.log(error));
    }
    else {
        alert("Wybierz coś")
    }
})

updatingButton.addEventListener("click", () => {
    if (itemContainerSelect.value !== '') {
        let selectData = JSON.stringify({ id: parseFloat(itemContainerSelect.value) })
        options.body = selectData

        fetch("/update", options)
            .then(response => response.json())
            .then(data => {
                console.log(data);

                updateAfterReceivingData(data)

                let alertObject = {
                    status: "animal updated",
                    arr: data
                }
                alert(JSON.stringify(alertObject, null, 5))
            })
            .catch(error => console.log(error));
    }
    else {
        alert("Wybierz coś")
    }
})