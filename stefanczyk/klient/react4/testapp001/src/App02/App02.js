import './App02.css'
import Item02 from './Item02'

const data = [
  {
    title: "REACTJS",
    info: "easy"
  },
  {
    title: "EXPRESSJS",
    info: "lightweight"
  },
  {
    title: "NEXTJS",
    info: "serverside"
  }
]

let itemki = data.map((elem, i) => {
  return <Item02 title={elem.title} info={elem.info} key={i} />
})

const App2 = () => {
  return (
    <div>
      <h1>02: PROPSY W KOMPONENCIE FUNKCYJNYM</h1>
      <div className='itemContainer'>
        {itemki}
      </div>
    </div>
  );
}

export default App2;
