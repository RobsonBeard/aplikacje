const express = require("express")
const path = require("path") 
const app = express()
const PORT = 3000;
const bodyParser = require("body-parser")

app.use(bodyParser.urlencoded({ extended: true }));

let users = [
    {nick:"111", email:"111@w.pl"},
    {nick:"222", email:"222@w.pl"},
    {nick:"333", email:"333@w.pl"},
    {nick:"444", email:"444@w.pl"},
    {nick:"555", email:"555@w.pl"}
 ]

app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname + "/static/addUser.html"))
    console.log("tablica: ")
    console.log(users);
})

app.post("/handleForm", function(req, res) {
    let nowymail = req.body
    let x = true;

    for(let i=0; i<users.length; i++)
    {
        if(users[i].email == nowymail.email)
        {
            x = false
        }
    }

    if(x)
    {
        users.push(nowymail)
        console.log("nowy mail: ")
        console.log(nowymail)
        console.log("tablica: ")
        console.log(users);
	// res.redirect('/'); // sprawdzić jak działa!!!
 
    }
    else
    {
        res.send(`Podany email jest zajety. <br><a href="/">powrót do menu głównego</a>`)
        console.log("wpisano zajęty email");
    }
})

app.post("/usun", function(req, res){
    let danedousuniecia = req.body
    console.log("tablica: ")
    console.log(users);
    console.log("dane do usunięcia: ");
    console.log(danedousuniecia);

    let indeks;

    if(JSON.stringify(danedousuniecia) === '{}') //wpisalem w google
    {
        res.send(`Musisz coś usunąć kurde ten<br><a href="/">powrót do menu głównego</a><br><a href="/removeUserByCheckbox">powrót do usuwania checkboxami</a><br><a href="/removeUserByRadio">powrót do usuwania radio</a><br><a href="/removeUserBySelect">powrót do usuwania selectem</a>`)
    }
    else if(Array.isArray(danedousuniecia.pole))
    {
        for(let i=0; i<danedousuniecia.pole.length;i++)
        {
            indeks = parseFloat(danedousuniecia.pole[i].substr(4,1)) // elementy w tablicy "pole", która znajduje się w danych przesłanych z checkboxach są elementy "pole1", "pole2" itp. Ucinam więc część "pole" i zamieniam pozostałość na liczbę typu float. Dzięki temu będę mógł łatwo usunąć maile z tablicy obiektów "users"
            console.log("test: ");
            console.log(indeks - i);
            users.splice((indeks - i), 1) 
        }
    }
    else
    {
        indeks = parseFloat(danedousuniecia.pole.substr(4,1))
        users.splice(indeks, 1)
    }
    

    res.send(`usunięto wybrane maile <br><a href="/">powrót do menu głównego</a><br><a href="/removeUserByCheckbox">powrót do usuwania checkboxami</a><br><a href="/removeUserByRadio">powrót do usuwania radio</a><br><a href="/removeUserBySelect">powrót do usuwania selectem</a>`)
    console.log("tablica: ")
    console.log(users);
})

app.get("/removeUserByCheckbox", function (req, res) {
    let checkbox = ""
    checkbox += `<form action="/usun" method="POST">`
    for (let i=0; i<users.length; i++)
    {
        checkbox += `<input type="checkbox" id="pole${i}" name="pole" value="pole${i}">
        <label for="pole${i}">${users[i].email}</label><br>`
    }
    checkbox += `<br><button type="submit">Usuń</button>`
    checkbox += `</form>`
    res.send(checkbox)
})
app.get("/removeUserByRadio", function (req, res) {
    let radio = ""
    radio += `<form action="/usun" method="POST">`
    for (let i=0; i<users.length; i++)
    {
        radio += `<input type="radio" id="pole${i}" name="pole" value="pole${i}">
        <label for="pole${i}">${users[i].email}</label><br>`
    }
    radio += `<br><button type="submit">Usuń</button>`
    radio += `</form>`
    res.send(radio)
})
app.get("/removeUserBySelect", function (req, res) {
    let select = ""
    select += `<form action="/usun" method="POST">`
    select += `<select name="pole" id="pola">`
    for (let i=0; i<users.length; i++)
    {
        select += `<option value="pole${i}">${users[i].email}</option>`
    }
    select += `</select>`
    select += `<br><br><button type="submit">Usuń</button>`
    select += `</form>`
    res.send(select)
})



app.use(express.static('static'))

app.listen(PORT, function () {
    console.log("start serwera na porcie " + PORT)
})