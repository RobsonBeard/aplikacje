let options = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
};

let graphBoxDiv = document.getElementById("graphBox")

let startRecordingData = () => {

    fetch("/startRecordingData", options)
        .then(response => response.json())
        .then(data => {
            console.log(data);
        })
        .catch(error => console.log(error));

}

let fetchData = () => {
    fetch("/fetchData", options)
        .then(response => response.json())
        .then(data => {
            let newChildren = []
            let sortedUsedMemory = []
            let sortedData = data.sort((a, b) => { return a.id - b.id })

            for (let i = 0; i < sortedData.length; i++) {

                let usedMemory = sortedData[i].used / 1024 / 1024
                sortedUsedMemory.push(usedMemory)
                sortedUsedMemory = sortedUsedMemory.sort((a, b) => { return b - a })

                //TODO: wysokosc slupka mozna jeszcze wyliczyc w zaleznosci od "total" w obiekcie

                // console.log(`${Math.round(usedMemory * 100) / 100} MB`);

                let barDiv = document.createElement("div")
                barDiv.classList.add("bar")
                barDiv.style.height = `${usedMemory * 15}px`
                newChildren.push(barDiv)
            }

            let graphBoxStyles = getComputedStyle(graphBoxDiv)
            let paddingValue = parseFloat(graphBoxStyles.padding.substring(0, graphBoxStyles.padding.length - 2))

            let maxUsedLine = document.createElement("div")
            maxUsedLine.classList.add("max-used-line")
            maxUsedLine.style.bottom = `${sortedUsedMemory[0] * 15 + paddingValue}px` //* trzeba brac pod uwage padding 

            let usageValueBox = document.createElement("div")
            usageValueBox.classList.add("max-used-box")
            usageValueBox.innerText = `${Math.round(sortedUsedMemory[0] * 100) / 100} MB`

            usageValueBox.style.bottom = `${sortedUsedMemory[0] * 15 + paddingValue}px`

            graphBoxDiv.replaceChildren(...newChildren, maxUsedLine, usageValueBox)
        })
        .catch(error => console.log(error));
}

let intervalReceivingData
let startButton = document.getElementById("startReceiving")
let endButton = document.getElementById("stopReceiving")
let recordButton = document.getElementById("startRecording")

recordButton.addEventListener("click", () => {
    startRecordingData()
    recordButton.setAttribute("disabled", "")
    startButton.removeAttribute("disabled")
})

startButton.addEventListener("click", () => {
    intervalReceivingData = setInterval(fetchData, 1000);
    endButton.removeAttribute("disabled")
    startButton.setAttribute("disabled", "")
})

endButton.addEventListener("click", () => {
    clearInterval(intervalReceivingData)
    startButton.removeAttribute("disabled")
    endButton.setAttribute("disabled", "")
})


// jeśli chciałbym użyć promisa, to mogę zrobić tak, że czekam aż pojawi sie 20 pozycji w tablicy, a potem dopiero pokazuje słupki