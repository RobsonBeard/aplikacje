let x = 10 // długość i szerokośc planszy, którą potem będzie podawał użytkownik
let y = 10
let bomby = 10 // tez podaje gracz
let pola = [
    []
]
// trzeba popracowac klasami, żeby potem wiersz łamał się co odpowiednią ilość divów


for(let i=0; i<x; i++) //szerokosc
{
    pola[i] = []
    for(let j=0; j<y; j++) //dlugosc
    {
        let d = document.createElement("div");
        d.setAttribute(`id`,`${i}${j}`)
        d.classList.add("pole")
        // d.classList.add(`pole:nth-child(${x}n+1)`) -> jakos w ten sposob
        document.getElementById("aaa").appendChild(d)
        pola[i][j] = 0
    }
}
console.table(pola)