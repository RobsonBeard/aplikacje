import './App04.css'
import Item04 from './Item04'
import { useState } from 'react' //*

const App4 = () => {

  //wyjściowa tablica

  const INIT_LIST = [];

  //state

  const [list, setList] = useState(INIT_LIST)

  const addToEnd = () => {
    setList(() => {
      return [...list, Math.floor(Math.random() * 1000)] // nowa tablica z dodanym elementem na końcu
    })
  } // z tego co rozumiem, to ...list wstawia po prostu wszystkie elementy poprzedniej talicy list

  const addToStart = () => {
    setList(() => {
      return [Math.floor(Math.random() * 1000), ...list] // nowa tablica z dodanym elementem na początku
    })
  }

  const addFive = () => {
    let randomFiveArr = [Math.floor(Math.random() * 1000), Math.floor(Math.random() * 1000), Math.floor(Math.random() * 1000), Math.floor(Math.random() * 1000), Math.floor(Math.random() * 1000)]
    setList(() => {
      return [...list, ...randomFiveArr] //tak samo tutaj musze uzyc ..., zeby mi sie wstawily wszystkie elementy, a nie 1 zestackowany
    })
  }

  const delFirst = () => {
    setList(() => {
      return [...list.filter((item, i) => i !== 0)] // nowa przefiltrowana tablica
    })
  }

  const delLast = () => {
    setList(() => {
      return [...list.filter((item, i) => i !== list.length - 1)] // czyli mozna wykonywac dzialania na tej tablicy
    })
  }

  const delAll = () => {
    setList(() => {
      return []
    })
  }

  return (
    <div>
      <h1>04: USESTATE() - SPREAD OPERATOR - DZIAŁANIA NA TABLICACH</h1>
      <div className='contentBox'>
        <div className='buttonContainer'>
          <button className='button1' onClick={() => addToEnd()}>dodaj na koniec</button>
          <button className='button1' onClick={() => addToStart()}>dodaj na początek</button>
          <button className='button1' onClick={() => addFive()}>dodaj 5</button>
          <button className='button1' onClick={() => delFirst()}>usuń pierwszy</button>
          <button className='button1' onClick={() => delLast()}>usuń ostatni</button>
          <button className='button1' onClick={() => delAll()}>usuń wszystkie</button>
        </div>
        <div className='itemContainer'>
          {
            list.map((element, i) => {
              return <Item04 val={element} key={i} />
            })
          }
        </div>
      </div>
    </div>
  );
}

export default App4;
