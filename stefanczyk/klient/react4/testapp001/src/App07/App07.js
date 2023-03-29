import './App07.css'
import Item07 from './Item07'
import Dialog07 from './Dialog07'
import { useState } from 'react' //*

const App7 = () => {

  //wyjściowa tablica

  const INIT_LIST = [];

  //state

  const [list, setList] = useState(INIT_LIST)

  const addToEnd = () => {
    setList(() => {
      return [...list, Math.floor(Math.random() * 1000)]
    })
  }

  const addToStart = () => {
    setList(() => {
      return [Math.floor(Math.random() * 1000), ...list]
    })
  }

  const delAll = () => {
    setList(() => {
      return []
    })
  }

  const showDialog = (val) => {
    // setList(() => {
    //   return [...list.filter((item, i) => i !== val)]
    // })
    <Dialog07 />
  }

  return (
    <div>
      <h1>07: DIALOG - WYWOŁANIE FUNKCJI W RODZICU</h1>
      <div className='contentBox'>
        <div className='buttonContainer'>
          <button className='button1' onClick={() => addToEnd()}>dodaj na koniec</button>
          <button className='button1' onClick={() => addToStart()}>dodaj na początek</button>
          <button className='button1' onClick={() => delAll()}>usuń wszystkie</button>
        </div>
        <div className='itemContainer'>
          {
            list.map((element, i) => {
              return <Item07 val={element} id={i} showDialog={showDialog} key={i} />
            })
          }
        </div>
      </div>
    </div>
  );
}

export default App7;
