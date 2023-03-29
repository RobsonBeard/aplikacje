import './App06.css'
import Item06 from './Item06'
import { useState } from 'react' //*

const App6 = () => {

  const INIT_OBJ = {
    value: 1000,
    array: [1, 2, 3],
    object: { a: 1, b: 2 }
  }

  const [state, updateState] = useState(INIT_OBJ);

  const update = (val) => {
    // console.log(val);
    switch (val) {
      case 0:
        // zmiana wartości value w state
        updateState(() => {
          return { ...state, value: 500 }
        })
        break;
      case 1:
        // zmiana wartości array w state     
        updateState(() => {
          return { ...state, array: [4, 5] }
        })
        break;
      case 2:
        // zmiana wartości object w state  
        updateState(() => {
          return { ...state, object: { c: 4, d: 5, e: 6 } }
        })
        break;
      default:
        break;
    }
  }

  return (
    <div>
      <h1>06: USESTATE() - OBIEKT W STATE</h1>
      <div className='contentBox'>
        <div className='buttonContainer'>
          <button className='button1' onClick={() => update(0)}>change value</button>
          <button className='button1' onClick={() => update(1)}>change array</button>
          <button className='button1' onClick={() => update(2)}>change object</button>
        </div>
        <div className='itemContainer'>
          <Item06 val={state.value} />
          <Item06 val={state.array} />
          <Item06 val={state.object} />
        </div>
      </div>
    </div>
  );
}

export default App6;
