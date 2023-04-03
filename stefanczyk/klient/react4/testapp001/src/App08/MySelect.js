import { useState } from 'react'

const MySelect = (props) => {

    const selected = {
        data: ":D"
    }

    const [wybrane, changeSelected] = useState(selected)

    const zmienWybor = (e) => {
        changeSelected(() => {
            return { data: e.target.value }
        })
        props.selectDataToParent(e.target.value)
    }

    return (
        <div className="select-component">
            <h4>komponent MySelect</h4>
            <select onChange={zmienWybor}>
                {
                    props.dane.map((elem, i) => {
                        return <option value={elem.name} key={i}>{elem.name}</option>
                    })
                }
            </select>
            <p>wybrane z select: {wybrane.data}</p>
        </div>
    )
}

export default MySelect
