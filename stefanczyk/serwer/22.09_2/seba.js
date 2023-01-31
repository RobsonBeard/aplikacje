const express = require("express");
const path = require("path");
const { send } = require("process");
// const bodyParser = require("body-parser"); // dla wersji Expressa < 4.16.0
const app = express();
const PORT = 3000;

let users = ["111@w.pl", "222@w.pl", "333@w.pl"];

app.use(express.urlencoded({ extended: true }));


app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname + "/static/addUser.html"));
})

app.get("/removeUserBySelect", function (req, res) {
    let bySelect = "";
    bySelect += "<form action=\"/delete\" method=\"post\"><select name=\"email\">";
    for (let i = 0; i < users.length; i++) {
        bySelect += `<option value=\"${users[i]}\">${users[i]}</option>`;
    }
    bySelect += "</select><br><button type=\"submit\">USUŃ</button></form>";
    res.send(bySelect);
})

app.get("/removeUserByRadio", function (req, res) {
    let byRadio = "";
    byRadio += "<form action=\"/delete\" method=\"post\">";
    for (let i = 0; i < users.length; i++) {
        byRadio += `<input type=\"radio\" name=\"email\" value=\"${users[i]}\">${users[i]}<br>`;
    }
    byRadio += "<br><button type=\"submit\">USUŃ</button></form>";
    res.send(byRadio);
})

app.get("/removeUserByCheckbox", function (req, res) {
    let byCheckbox = "";
    byCheckbox += "<form action=\"/delete\" method=\"post\">";
    for (let i = 0; i < users.length; i++) {
        byCheckbox += `<input type=\"checkbox\" name=\"email\" value=\"${users[i]}\">${users[i]}<br>`;
    }
    byCheckbox += "<input type=\"hidden\" name=\"type\" value=\"checkbox\">"
    byCheckbox += "<br><button type=\"submit\">USUŃ</button></form>";
    res.send(byCheckbox);
})

app.post("/handleForm", function (req, res) {
    let data = req.body;
    let isAvailable;
    for (let i = 0; i < users.length; i++) {
        console.log(data.email);
        console.log(users[i]);
        if (data.email == users[i]) {
            isAvailable = false;
        }
        else {
            isAvailable = true;
        }
        console.log(isAvailable);
    }
    if (isAvailable) {
        users[users.length] = data.email;
        console.log(users);
        res.sendFile(path.join(__dirname + "/static/addUser.html"));
    }
    else {
        res.send("wpisany email jest zajęty!");
    }

})

app.post("/delete", function (req, res) {
    console.log("DELETE:")
    console.log(users)
    let dataDel = req.body;
    console.log("dataDel: " + dataDel);
    if (dataDel.type == "checkbox") {
        console.log("dataDel.email: " + dataDel.email);
        for (let i = 0; i < dataDel.email.length; i++) {
            let index = users.indexOf(dataDel.email[i])
            users.splice(index, 1);
        }
        res.send("cosik dziala ")
    }
    else {
        let index = users.indexOf(dataDel.email)
        console.log("dataDel.email: " + dataDel.email)
        console.log("Index: " + index);
        users.splice(index, 1);
        res.send("usunięto");
        console.log(users);
    }

})

app.use(express.static('static'));

app.listen(PORT, function () {
    console.log("start serwera na porcie: " + PORT);
})