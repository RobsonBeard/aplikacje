const Item06 = (props) => {
    console.log(props);

    return (
        <div className="itemBox">
            <h1>ITEM</h1>
            <h4>{JSON.stringify(props.val)}</h4>
        </div>
    )
}

export default Item06
