import './App01.css'
import Item01 from './Item01'

let tablicaItemow = []

for (let i = 0; i < 3; i++) {
  tablicaItemow.push(<Item01 />)
}

const App1 = () => {
  return (
    <div>
      <h1>01: KOMPONENTY FUNKCYJNE</h1>
      <div className='itemContainer'>{tablicaItemow}</div>
    </div>
  );
}

export default App1;
