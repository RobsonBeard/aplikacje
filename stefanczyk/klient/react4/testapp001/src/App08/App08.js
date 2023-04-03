import './App08.css'
import MyForm from './MyForm'

const App8 = () => {

  const defaultdata = {
    array: [
      { id: 0, name: "hamlet" },
      { id: 1, name: "krzyzacy" },
      { id: 2, name: "lalka" }
    ],
    array2: [
      { id: 0, name: "Kraków" },
      { id: 1, name: "Warszawa" },
      { id: 2, name: "Gdańsk" },
      { id: 3, name: "Toruń" }
    ]
  };

  return (
    <div>
      <h1>08: FUNKCYJNE WYKONANIE ZADANIA Z POPRZEDNIEJ LEKCJI - SELECT</h1>
      <div className='contentBox'>
        <MyForm dane={defaultdata} />
        <MyForm dane={defaultdata} />
      </div>
    </div>
  );
}

export default App8;
