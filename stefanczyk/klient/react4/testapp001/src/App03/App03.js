import './App03.css'
import Item03 from './Item03'
import { useState } from 'react' //*

const App3 = () => {
  // visible - wartość do zmieniania za pomocą useState()
  // setVisible - funkcja dokonująca zmiany
  // true - początkowa wartość visible

  // useState() pozwala używać stanu w funkcji (odpowiednik this.state i this.setState)

  const [visible, setVisible] = useState(true)

  const setVis = (val) => {
    setVisible(val)
  }

  return (
    <div>
      <h1>03: USESTATE() - VISIBILITY</h1>
      <div className='contentBox'>
        <div className='buttonContainer'>
          <button className='button1' onClick={() => setVis(true)}>visible</button>
          <button className='button1' onClick={() => setVis(false)}>invisible</button>
        </div>
        <Item03 visible={visible} />
      </div>
    </div>
  )
}

export default App3
