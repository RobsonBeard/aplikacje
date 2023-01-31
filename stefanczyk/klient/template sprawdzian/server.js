const express = require("express")
const app = express()
const PORT = 3000;
const fs = require("fs")
const path = require("path")

app.use(express.static('static')) // serwuje stronę index.html
app.use(express.static('static/cwiczenia')) // serwuje pozostałe pliki, czyli ćwiczenia
app.use(express.json()) // !!!!!!!!!!!!!!!!!!!!!!! WAZNE

app.post('/api', function (req, res) {
    fs.readdir(path.join(__dirname + "/static/cwiczenia"), function (err, files) {
        if (err) {
            return console.log(err);
        }
        console.log(files);
        res.setHeader('content-type', 'application/json');
        res.send(JSON.stringify(files, null, 3))
    });
})

app.post('/api2', function (req, res) {
    fs.readdir(path.join(__dirname + "/static/cwiczenia2"), function (err, files) {
        if (err) {
            return console.log(err);
        }
        console.log(files);
        res.setHeader('content-type', 'application/json');
        res.send(JSON.stringify(files, null, 3))
    });
})

app.post('/api3', function (req, res) {
    fs.readdir(path.join(__dirname + "/static/cwiczenia3"), function (err, files) {
        if (err) {
            return console.log(err);
        }
        console.log(files);
        res.setHeader('content-type', 'application/json');
        res.send(JSON.stringify(files, null, 3))
    });
})

app.get('/cw01', function (req, res) {
    res.sendFile(path.join(__dirname + '/static/cwiczenia/cw01.html'))
})

app.get('/cw02', function (req, res) {
    res.sendFile(path.join(__dirname + '/static/cwiczenia/cw02.html'))
})

app.post('/fcw2', function (req, res) {
    let daneRange = req.body
    console.log(daneRange);

    res.setHeader('content-type', 'application/json');
    res.send(JSON.stringify(daneRange, null, 3))
});

app.get('/cw03', function (req, res) {
    res.sendFile(path.join(__dirname + '/static/cwiczenia/cw03.html'))

})

app.post('/fcw3', function (req, res) {
    console.log(req.body);

    res.setHeader('content-type', 'application/json');
    res.send(JSON.stringify(req.body, null, 3))
});

app.get('/cw04', function (req, res) {
    res.sendFile(path.join(__dirname + '/static/cwiczenia/cw04.html'))

})

app.post('/fcw4', function (req, res) {
    console.log(req.body);

    res.setHeader('content-type', 'application/json');
    res.send(JSON.stringify(req.body, null, 3))
});

app.get('/cw05', function (req, res) {
    res.sendFile(path.join(__dirname + '/static/cwiczenia/cw05.html'))

})

app.post('/fcw5', function (req, res) {
    console.log(req.body);

    res.setHeader('content-type', 'application/json');
    res.send(JSON.stringify(req.body, null, 3))
});

app.get('/cw06', function (req, res) {
    res.sendFile(path.join(__dirname + '/static/cwiczenia/cw06.html'))

})

app.post('/fcw6', function (req, res) {
    console.log(req.body);

    res.setHeader('content-type', 'application/json');
    res.send(JSON.stringify(req.body, null, 3))
});

app.get('/cw07', function (req, res) {
    res.sendFile(path.join(__dirname + '/static/cwiczenia/cw07.html'))

})

app.post('/fcw7', function (req, res) {
    console.log(req.body);

    res.setHeader('content-type', 'application/json');
    res.send(JSON.stringify(req.body, null, 3))
});

app.get('/cw08', function (req, res) {
    res.sendFile(path.join(__dirname + '/static/cwiczenia/cw08.html'))

})

app.post('/fcw8', function (req, res) {
    console.log(req.body);

    res.setHeader('content-type', 'application/json');
    res.send(JSON.stringify(req.body, null, 3))
});

app.get('/cw09', function (req, res) {
    res.sendFile(path.join(__dirname + '/static/cwiczenia/cw09.html'))

})

app.get('/cw10', function (req, res) {
    res.sendFile(path.join(__dirname + '/static/cwiczenia/cw10.html'))

})

app.get('/cw11', function (req, res) {
    res.sendFile(path.join(__dirname + '/static/cwiczenia/cw11.html'))

})

app.post('/fcw11', function (req, res) {
    console.log(req.body);

    res.setHeader('content-type', 'application/json');
    res.send(JSON.stringify(req.body, null, 3))
});

app.get('/cw2_01.html', function (req, res) {
    res.sendFile(path.join(__dirname + '/static/cwiczenia2/cw2_01.html'))

}) // kij wie czemu tu nagle trzeba dodawać html

app.get('/cw2_02.html', function (req, res) {
    res.sendFile(path.join(__dirname + '/static/cwiczenia2/cw2_02.html'))

})

app.post('/fcw2_02', function (req, res) {
    console.log(req.body);

    res.setHeader('content-type', 'application/json');
    res.send(JSON.stringify(req.body, null, 3))
});

app.get('/cw2_03.html', function (req, res) {
    res.sendFile(path.join(__dirname + '/static/cwiczenia2/cw2_03.html'))

})

app.post('/fcw2_03', function (req, res) {
    console.log(req.body);

    res.setHeader('content-type', 'application/json');
    res.send(JSON.stringify(req.body, null, 3))
});

app.get('/cw2_04.html', function (req, res) {
    res.sendFile(path.join(__dirname + '/static/cwiczenia2/cw2_04.html'))

})

app.post('/fcw2_04', function (req, res) {
    console.log(req.body);

    res.setHeader('content-type', 'application/json');
    res.send(JSON.stringify(req.body, null, 3))
});

app.get('/cw2_05.html', function (req, res) {
    res.sendFile(path.join(__dirname + '/static/cwiczenia2/cw2_05.html'))

})

app.get('/cw2_06.html', function (req, res) {
    res.sendFile(path.join(__dirname + '/static/cwiczenia2/cw2_06.html'))

})

app.post('/fcw2_06', function (req, res) {
    console.log(req.body);

    res.setHeader('content-type', 'application/json');
    res.send(JSON.stringify(req.body, null, 3))
});

app.get('/cw2_07.html', function (req, res) {
    res.sendFile(path.join(__dirname + '/static/cwiczenia2/cw2_07.html'))

})

app.post('/fcw2_07', function (req, res) {
    console.log(req.body);

    res.setHeader('content-type', 'application/json');
    res.send(JSON.stringify(req.body, null, 3))
});

app.get('/cw2_08.html', function (req, res) {
    res.sendFile(path.join(__dirname + '/static/cwiczenia2/cw2_08.html'))

})

app.get('/cw3_01.html', function (req, res) {
    res.sendFile(path.join(__dirname + '/static/cwiczenia3/cw3_01.html'))

})

app.post('/fcw3_01', function (req, res) {
    console.log(req.body);

    res.setHeader('content-type', 'application/json');
    res.send(JSON.stringify(req.body, null, 3))
})

app.get('/cw3_02.html', function (req, res) {
    res.sendFile(path.join(__dirname + '/static/cwiczenia3/cw3_02.html'))

})

app.post('/fcw3_02', function (req, res) {
    console.log(req.body);

    res.setHeader('content-type', 'application/json');
    res.send(JSON.stringify(req.body, null, 3))
})

app.get('/cw3_03.html', function (req, res) {
    res.sendFile(path.join(__dirname + '/static/cwiczenia3/cw3_03.html'))

})

app.post('/fcw3_03', function (req, res) {
    console.log(req.body);

    res.setHeader('content-type', 'application/json');
    res.send(JSON.stringify(req.body, null, 3))
})

app.get('/cw3_04.html', function (req, res) {
    res.sendFile(path.join(__dirname + '/static/cwiczenia3/cw3_04.html'))

})

app.post('/fcw3_04', function (req, res) {
    console.log(req.body);

    res.setHeader('content-type', 'application/json');
    res.send(JSON.stringify(req.body, null, 3))
})

app.get('/cw3_05.html', function (req, res) {
    res.sendFile(path.join(__dirname + '/static/cwiczenia3/cw3_05.html'))

})

app.get('/cw3_06.html', function (req, res) {
    res.sendFile(path.join(__dirname + '/static/cwiczenia3/cw3_06.html'))

})

app.get('/cw3_07.html', function (req, res) {
    res.sendFile(path.join(__dirname + '/static/cwiczenia3/cw3_07.html'))

})

app.post('/fcw3_07', function (req, res) {
    console.log(req.body);

    res.setHeader('content-type', 'application/json');
    res.send(JSON.stringify(req.body, null, 3))
})

app.listen(PORT, function () {
    console.log("start serwera na porcie " + PORT)
})