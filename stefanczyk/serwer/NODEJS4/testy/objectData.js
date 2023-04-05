// obiekt z funkcjami

const allFunctionsObj = {

    makeThings: () => {
        console.log("make something");
    },
    makeThingsAsync: async () => {
        console.log("make other things with async");
    },
    makeOtherThingsAndReturn: () => {
        return "make other things and return";
    },
    makeOtherThingsAndReturnWithPromise: async () => {
        return new Promise((resolve) => {
            resolve("resolve succeed")
        })
    }
}

module.exports = allFunctionsObj
