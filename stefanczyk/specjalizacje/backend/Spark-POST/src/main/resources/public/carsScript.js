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

    // console.log(response)
    if (!response.ok)
        console.log(response.status)
    else {
        document.getElementById("data-list").innerHTML = ""
        await makeTable()
    }
}


const makeTable = async () => {
    const carsData = await fetchGetAsync()
    console.log(carsData)

    for (let i = 0; i < carsData.length; i++) {
        const row = document.createElement("div")
        row.classList.add("row")

        const index = document.createElement("div")
        index.innerText = carsData[i].id

        const uuid = document.createElement("div")
        uuid.innerText = carsData[i].uuid

        const model = document.createElement("div")
        model.innerText = carsData[i].model

        const year = document.createElement("div")
        year.innerText = carsData[i].year

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


        updateButton.addEventListener("click", () => {
            console.log("to do")
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
