let options = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
};

let graphBoxDiv = document.getElementById("graphBox")

let fetchData = () => {
    fetch("/fetchData", options)
        .then(response => response.json())
        .then(data => {
            let newChildren = []

            let sortedData = data.sort((a, b) => { return a.id - b.id })
            console.log(sortedData)

            for (let i = 0; i < sortedData.length; i++) {

                let usedMemory = sortedData[i].used / 1024 / 1024

                //TODO: mozna to jeszcze wyliczyc na podstawie tego "total" w obiekcie

                // console.log(`${Math.round(usedMemory * 100) / 100} MB`);

                let barDiv = document.createElement("div")
                barDiv.classList.add("bar")
                barDiv.style.height = `${usedMemory * 25}px`
                newChildren.push(barDiv)
            }

            graphBoxDiv.replaceChildren(...newChildren)
        })
        .catch(error => console.log(error));
}

let intervalOdbierajacyDane = setInterval(fetchData, 1000);




