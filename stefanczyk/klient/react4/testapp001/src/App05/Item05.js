const Item05 = (props) => {
    console.log(props);

    const deleteItem = () => {
        props.delSelected(props.id)
    }

    return (
        <div className="itemBox">
            <h1>ITEM</h1>
            <h4>{props.val}</h4>
            <div className="rightAlign">
                <button className="button1" onClick={deleteItem}>delete item</button>
            </div>
        </div>
    )
}

export default Item05
