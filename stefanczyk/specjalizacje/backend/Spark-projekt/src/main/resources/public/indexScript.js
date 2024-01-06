const fetchPostAsync = async () => {

    const data = JSON.stringify({
        model: document.getElementById("model").value,
        year: document.getElementById("year").value,
        airbags: [
            {
                description: "driver",
                value: document.getElementById("driver").checked
            },
            {
                description: "passenger",
                value: document.getElementById("passenger").checked
            },
            {
                description: "back",
                value: document.getElementById("back").checked
            },
            {
                description: "side",
                value: document.getElementById("side").checked
            }
        ],
        color: document.getElementById("color").value
    }, null, 5)

    const options = {
        method: "POST",
        body: data,
    };

    let response = await fetch("/add", options)

    if (!response.ok)
        return response.status
    else
        return await response.json()

}

document.getElementById("addbutton").addEventListener("click", async () => {
    const json = await fetchPostAsync()
    alert(JSON.stringify(json, null, 5))
})
