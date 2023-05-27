const jwt = require('jsonwebtoken');

const createToken = async () => {

    let token = await jwt.sign(
        {
            email: "aaa@test.com",
            anyData: "123"
        },
        "verysecretkey", // powinno być w .env - to jest dodatkowe zabezpieczenie, musimy podac ten klucz przy weryfikowaniu tokena
        {
            expiresIn: "30s" // "1m", "1d", "24h"
        }
    );
    console.log({ token: token });
}

const verifyToken = async (token) => {

    try {
        let decoded = await jwt.verify(token, "verysecretkey")
        console.log({ decoded: decoded });
    }
    catch (ex) {
        console.log({ message: ex.message });
    }
}


const processToken = async () => {
    await createToken()
    await verifyToken("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFhYUB0ZXN0LmNvbSIsImFueURhdGEiOiIxMjMiLCJpYXQiOjE2ODUwMTExMzAsImV4cCI6MTY4NTAxMTE2MH0.G13iv95SMh8fVNP0E2rP2xru6sJb_iD5vvqMsm709qc")
}

processToken()

