const fetchGetAsync = async () => {
    const options = {
        method: "GET"
    }

    const response = await fetch("/json", options)

    if (!response.ok)
        return response.status
    else
        return await response.json()
}

const fetchDelete = async (id) => {
    const options = {
        method: "POST",
        body: JSON.stringify(id)
    }

    const response = await fetch("/delete", options)

    if (!response.ok)
        console.log(response.status)
    else {
        document.getElementById(`row${id}`).remove()
    }
}

const fetchUpdate = async (id, model, year) => {
    const options = {
        method: "POST",
        body: JSON.stringify({id: id, model: model, year: year})
    }

    const response = await fetch("/update", options)

    if (!response.ok)
        console.log(response.status)
    else {
        document.getElementById(`model${id}`).innerText = model
        document.getElementById(`year${id}`).innerText = year
    }
}


async function updateCar(e) {
    document.getElementById("dialog").close()
    document.getElementById("dialog").style.display = 'none'

    const carID = e.target.carID
    const newModel = e.target.parentNode.parentNode.children[0].children.model.value // zrobione na pałę więc jak coś przestawie w htmlu to nie bedzie dzialac
    const newYear = e.target.parentNode.parentNode.children[0].children.year.value
    console.log(newModel, newYear, carID)

    await fetchUpdate(carID, newModel, newYear)
}


const makeTable = async () => {
    const carsData = await fetchGetAsync()
    // console.log(carsData)

    for (let i = 0; i < carsData.length; i++) {
        const row = document.createElement("div")
        row.classList.add("row")
        row.id = `row${carsData[i].id}` // to jest do usuwania

        const index = document.createElement("div")
        index.innerText = carsData[i].id

        const uuid = document.createElement("div")
        uuid.innerText = carsData[i].uuid

        const model = document.createElement("div")
        model.innerText = carsData[i].model
        model.id = `model${carsData[i].id}` // to jest do update'u

        const year = document.createElement("div")
        year.innerText = carsData[i].year
        year.id = `year${carsData[i].id}` // to jest do update'u

        const airbags = document.createElement("div")
        for (let j = 0; j < carsData[i].airbags.length; j++) {
            const p = document.createElement("p")
            p.innerText = `${carsData[i].airbags[j].description}: ${carsData[i].airbags[j].value}`
            airbags.appendChild(p)
        }
        airbags.classList.add("airbags")

        const colorBox = document.createElement("div")
        const color = document.createElement("div")
        colorBox.appendChild(color)
        color.style.backgroundColor = carsData[i].color
        color.classList.add("color-div")

        const deleteButton = document.createElement("div")
        const deleteButtonContainer = document.createElement("div")
        deleteButtonContainer.appendChild(deleteButton)
        deleteButton.innerText = "delete car"
        deleteButton.classList.add("button")
        deleteButton.setAttribute("id", `delete_${carsData[i].id}`)

        const updateButton = document.createElement("div")
        const updateButtonContainer = document.createElement("div")
        updateButtonContainer.appendChild(updateButton)
        updateButton.innerText = "update car"
        updateButton.classList.add("button")
        updateButton.setAttribute("id", `update_${carsData[i].id}`)

        deleteButton.addEventListener("click", async function () {
            await fetchDelete(carsData[i].id)
        })
        // https://developer.mozilla.org/en-US/docs/Web/API/HTMLDialogElement/cancel_event


        const dialog = document.getElementById("dialog")

        dialog.addEventListener("cancel", (e) => {
            e.preventDefault() // nie chce, zeby zamykal sie przy esc
        })


        const dialogUpdateButton = document.getElementById("update-dialog-button")

        const inputModel = document.getElementById("model")
        const selectYear = document.getElementById("year")

        updateButton.addEventListener("click", function () {
            dialog.showModal()
            dialog.style.display = 'flex'
            inputModel.value = "model"
            selectYear.value = "2001" // przywracam defaultowe wartosci

            dialogUpdateButton.carID = carsData[i].id
            // https://stackoverflow.com/questions/256754/how-to-pass-arguments-to-addeventlistener-listener-function

            dialogUpdateButton.addEventListener("click", updateCar)
        })

        document.getElementById("close-dialog").addEventListener("click", () => {
            dialogUpdateButton.removeEventListener("click", updateCar)
            dialog.style.display = 'none';
            dialog.close()
        })

        row.appendChild(index)
        row.appendChild(uuid)
        row.appendChild(model)
        row.appendChild(year)
        row.appendChild(airbags)
        row.appendChild(colorBox)
        row.appendChild(deleteButtonContainer)
        row.appendChild(updateButtonContainer)

        document.getElementById("data-list").appendChild(row)
    }
}

makeTable()
    .catch(console.error)

