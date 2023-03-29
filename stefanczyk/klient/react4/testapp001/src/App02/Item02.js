const Item02 = (props) => {

    const showProps = () => {
        alert(JSON.stringify(props, null, 3))
    }

    const showTitle = () => {
        alert(JSON.stringify(props.title, null, 3))
    }

    return (
        <div className="itemBox">
            <div className="headers">
                <h1>{props.title}</h1>
                <h3>{props.info}</h3>
            </div>
            <div className="buttons">
                <button className="button1" onClick={showProps}>show all props</button>
                <button className="button1" onClick={showTitle}>show title</button>
            </div>
        </div>
    )
}

export default Item02

// mozna tez:

// const Item = ({ title, info }) => {

//     return (
       

//             <h1>{title}</h1>
//             <h3>{info}</h3>


//     )
// }
 // i tez tak: 

// const Item = (props) => {
//     const { title, info } = props
//     return (
       

//             <h1>{title}</h1>
//             <h3>{info}</h3>


//     )
// }
