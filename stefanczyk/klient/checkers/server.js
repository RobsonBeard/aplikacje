const e = require("express");
const express = require("express")
const app = express()
const PORT = 3000;
const fs = require("fs")
const path = require("path");
const { isDeepStrictEqual } = require("util");

app.use(express.static('static')) // serwuje stronę index.html

app.use(express.json())


let users = []

app.post('/fetch', function (req, res) {

    // console.log("req body:");
    // console.log(req.body);

    let response = {
        przepusc: true,
    }

    users.push(req.body)

    // console.log("tablica userow przed:");
    // console.log(users);

    try {
        if (users.length > 2) {
            users.pop()
            throw "Juz jest 2 graczy"
        }
        if (users[0].nick === '') {
            users.pop()
            throw "Prosze wypelnic nick"
        }
        if (users.length == 2) {
            if (users[1].nick === users[0].nick) {
                users.pop()
                throw "Powtarzajacy sie nick"
            }
            if (users[1].nick === '') {
                users.pop()
                throw "Prosze wypelnic nick"
            }
        }

    }
    catch (err) {
        console.log("złapano błąd");
        response.przepusc = false
        response.komunikat = err
    }

    response.nick = req.body.nick

    if (users.length == 1) {
        response.kolor = "biale"
    }
    else if (users.length == 2) {
        response.kolor = "czarne"
    }

    response.iloscgraczy = users.length

    console.log("odpowiedz:");
    console.log(response);

    // console.log("tablica userow po:");
    // console.log(users);

    res.setHeader('content-type', 'application/json');
    res.send(JSON.stringify(response, null, 3))
})

let iluUserow = {}

app.post("/checkUsers", function (req, res) {

    if (users.length == 0) {
        iluUserow.ilosc = 0
    }
    else if (users.length == 1) {
        iluUserow.ilosc = 1
    }
    else if (users.length == 2) {
        iluUserow.ilosc = 2
        iluUserow.drugiNick = users[1].nick
    }
    // albo moze zrobic po prostu tak ze ilosc = dlugosc tablicy nw



    res.setHeader('content-type', 'application/json');
    res.send(JSON.stringify(iluUserow, null, 3))
})

app.listen(PORT, function () {
    console.log("start serwera na porcie " + PORT)
})

// klasa Game - działania w 3D, generowanie planszy, pionków
// klasa Net - komunikacja z serwerem - fetch
// klasa Ui - obsługa interfejsu 2D aplikacji (pola txt, przycisk logowania),
// start całości projektu, inicjalizacja obiektów powyższych klas

/*
- w tym projekcie pracujemy na serwerze Express
- nie używamy szablonów handlebars
- istnieje tylko jedna strona index.html
- na stronie nie ma formularza
- komunikacja klient serwer jest realizowana fetchem
- zaczynamy od przypomnienia fetcha (lekcja 4 - aplikacje serwerowe, pkt 6)
*/

/*
serwer - szczegółowy opis

- na serwerze Express istnieje tablica dla userów, która zwiększa się w miarę przybywania użytkowników
- klient (przeglądarka) wysyła login gracza na serwer fetchem
- użytkowników może być max dwóch, po zalogowaniu obaj otrzymują odpowiednie komunikaty, 
- ekran logowania znika dopiero po odpowiedzi serwera, a nie po kliknięciu butona "loguj"
- dopiero po odpowiedzi serwera na planszy pojawiają się odpowiednie pionki (białe albo czarne)
- dopiero po odpowiedzi serwera kamera jest ustawiana z jednej albo drugiej strony planszy (nie plansza się obraca)
- loginy nie mogą się powtarzać (odpowiedni komunikat do klienta)
- trzeci i każdy następny użytkownik otrzymuje komunikat o niemożności zalogowania

klient - opis

- pola planszy wykonane są z oteksturowanych prostopadłościanów
- pionki planszy wykonane są z oteksturowanych walców
*/

/*
Opis funkcjonalności 2 części projektu

- ekran oczekiwania na drugiego gracza widoczny do czasu kiedy ten się zaloguje
- pierwszy gracz dostaje informację o zalogowaniu drugiego
- zaznaczenie własnego pionka (obiekt klasy Pionek) przy jego kliknięciu
- gracz może poruszać tylko swoimi pionkami
- gracz może poruszać pionkami tylko po czarnych polach

serwer - logika logowania - klasa Net() - dokończenie:

- po zalogowaniu pierwszego gracza, musi on wiedzieć kiedy zaloguje się drugi
- zaraz po zalogowaniu pierwszemu wyświetla się informacja "czekam..."
- oraz za pomocą setInterval() wysyła on na serwer zapytanie fetchem np co 1000ms, sprawdzające czy tablica na serwerze ma jednego czy dwóch userów
- jeśli tablica ma dwóch userów, czyli drugi gracz wszedł do gry, to ekran oczekiwania znika i dowiadujemy się kto jest zalogowany  
*/