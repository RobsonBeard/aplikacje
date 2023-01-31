const express = require("express") //stałe
const app = express() //stałe
const PORT = 3000; //stałe

const cookieParser = require("cookie-parser")
app.use(cookieParser())

app.get('/', function (req, res) {
    res        
        .cookie("cookieA", "aaa", { expires: new Date(Date.now() + 1000 * 60 * 60 * 4) , httpOnly:true})
        .send('cookieA zostało ustawione')

    console.log("cookies :  ", req.cookies);
   
});

app.listen(PORT, function () {  //stałe
    console.log("start serwera na porcie " + PORT)  //stałe
})  //stałe

