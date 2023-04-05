// dane usera i ich modyfikacja

let n = "x"

const setName = (name) => {
    n = name
}

const getName = () => {
    return 'Hello ' + n;
};

//* export pojedynczych funkcji

// module.exports.getName = getName;
// module.exports.setName = setName;

// lub obie w obiekcie

module.exports = { getName, setName }
