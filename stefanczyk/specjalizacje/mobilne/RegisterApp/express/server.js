const express = require("express")
const app = express()
const PORT = 3000

app.use(express.json())

const users = []
let id = 0


app.post('/register', (req, res) => {
    const login = req.body.login
    const password = req.body.password

    if (users.find(elem => elem.login === login)) {
        res.send(JSON.stringify({ status: false, info: "User already exists" }))
    } else {
        users.push({
            id: id,
            login: login,
            password: password,
            date: new Date().toLocaleDateString() + " " + new Date().toLocaleTimeString()
        })
        id++

        res.setHeader('Content-Type', 'application/json')
        res.send(JSON.stringify({ status: true, info: "OK" }))
    }

})

app.get("/getusers", (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(users))
})

app.post("/deleteuser", (req, res) => {
    const userId = req.body.userId

    for (let i = 0; i < users.length; i++) {
        if (users[i].id === parseInt(userId)) {
            console.log(userId);
            users.splice(i, 1)
        }
    }

    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(users))
})

app.listen(PORT, () => {
    console.log(`Start serwera na porcie ${PORT}`);
})