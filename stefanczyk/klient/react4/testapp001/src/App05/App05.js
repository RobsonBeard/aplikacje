import './App05.css'
import Item05 from './Item05'
import { useState } from 'react' //*

const App5 = () => {

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

  const delSelected = (val) => {
    setList(() => {
      return [...list.filter((item, i) => i !== val)]
    })
  }

  return (
    <div>
      <h1>05: WYWOŁANIE FUNKCJI W RODZICU</h1>
      <div className='contentBox'>
        <div className='buttonContainer'>
          <button className='button1' onClick={() => addToEnd()}>dodaj na koniec</button>
          <button className='button1' onClick={() => addToStart()}>dodaj na początek</button>
          <button className='button1' onClick={() => delAll()}>usuń wszystkie</button>
        </div>
        <div className='itemContainer'>
          {
            list.map((element, i) => {
              return <Item05 val={element} id={i} delSelected={delSelected} key={i} />
            })
          }
        </div>
      </div>
    </div>
  );
}

export default App5;
