const Item07 = (props) => {

    const showDialog = () => {
        props.showDialog(props.id)
    }

    return (
        <div>
            <div className="itemBox">
                <h1>ITEM</h1>
                <h4>{props.val}</h4>
                <div className="rightAlign">
                    <button className="button1" onClick={showDialog}>show dialog</button>
                </div>
            </div>
        </div>
    )
}

export default Item07
