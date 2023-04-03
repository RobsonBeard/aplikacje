import MySelect from './MySelect'
import { useState } from 'react'

const MyForm = (props) => {

  const stateStatus = []
  const [status, setStatus] = useState(stateStatus)

  const onSelectChange = (info) => {
    setStatus(() => {
      return [...status, info]
    })
  }

  const handleSubmit = (e) => {
    if (status.length != 0) {
      alert(status.join(", "))
    }
    else {
      alert("nie wysylaj pustej")
    }
    e.preventDefault()
  }

  const ladnyTekst = (tekst) => {

    const MAX_DLUGOSC = 30
    let ileEnterow = Math.ceil(parseFloat(tekst.length) / MAX_DLUGOSC)
    let tablicaStringow = []
    for (let i = 0; i < ileEnterow; i++) {
      let pomString = tekst.slice(MAX_DLUGOSC * i, MAX_DLUGOSC * (i + 1))
      tablicaStringow.push(pomString)
    }
    let wynik = tablicaStringow.join("\n")
    return wynik
  } // jak w ogole sformatowac taki tekst bez znacznika??

  return (
    <form className='form-component'>
      <h3>Komponent MyForm</h3>
      <MySelect dane={props.dane.array} selectDataToParent={onSelectChange} />
      <MySelect dane={props.dane.array2} selectDataToParent={onSelectChange} />
      <button className='button-red' onClick={handleSubmit}>send</button>
      <p>wysyłane: {ladnyTekst(JSON.stringify(status))}</p>
      {/* <div className='sending-text-box'>
        <p>wysyłane: </p>
        <p>{JSON.stringify(status)}</p>
      </div> */}
    </form>
  );
}

export default MyForm;
