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

const fetchGenerateCarsAsync = async () => {
    const options = {
        method: "POST",
    };

    let response = await fetch("/generate", options)

    if (!response.ok)
        return response.status
    else {
        document.getElementById("data-list").innerHTML = ""
        await makeTable()
    }
}

const fetchGenerateInvoiceAsync = async (id) => {
    const options = {
        method: "POST",
        body: JSON.stringify(id)
    };

    let response = await fetch("/invoice", options)

    if (!response.ok)
        return response.status
    else {
        console.log("poszlo")
    }
}

const fetchDownloadInvoiceAsync = async () => {
    const options = {
        method: "GET"
    }

    const response = await fetch("/invoices", options)

    if (!response.ok)
        return response.status
    else {
        // return await response.json()
        console.log("pobrano")
    }
}


document.getElementById("generate-button").addEventListener("click", fetchGenerateCarsAsync)


const makeTable = async () => {
    const carsData = await fetchGetAsync()

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


        const generateButton = document.createElement("div")
        const generateButtonContainer = document.createElement("div")
        generateButtonContainer.appendChild(generateButton)
        generateButton.innerText = "generuj fakturę"
        generateButton.classList.add("button")
        generateButton.setAttribute("id", `generate_${carsData[i].id}`)
        generateButton.clicked = false

        generateButton.addEventListener("click", async function () {
            if (!this.clicked) {
                await fetchGenerateInvoiceAsync(carsData[i].id)
                const downloadLink = document.createElement("a")
                downloadLink.innerText = "pobierz"
                downloadLink.setAttribute("href", "#")

                // downloadLink.addEventListener("click", fetchDownloadInvoiceAsync)

                const downloadLinkContainer = document.createElement("div")
                downloadLinkContainer.appendChild(downloadLink)
                row.appendChild(downloadLinkContainer)
                this.clicked = true
            }
        })


        row.appendChild(index)
        row.appendChild(uuid)
        row.appendChild(model)
        row.appendChild(year)
        row.appendChild(airbags)
        row.appendChild(colorBox)
        row.appendChild(generateButtonContainer)


        document.getElementById("data-list").appendChild(row)
    }
}

makeTable()
    .catch(console.error)
