const Dialog07 = (props) => {

    let clickedCancel = (val) => {
        props.hideDialog(val)
    }

    let clickedOk = (val) => {
        props.delSelected(val)
    }

    let zrobId = (id) => {
        return `dialog${id}`
    }

    return (
        <dialog id={zrobId(props.val)} className="dialog1" open >
            <p>USUNĄĆ ID: {props.val}?</p>
            <div className="buttonContainer2">
                <button className="button1 reversedButton" onClick={() => clickedCancel(props.val)}>Anuluj</button>
                <button className="button1" onClick={() => clickedOk(props.val)}>OK</button>
            </div>
        </dialog>
    )
}

export default Dialog07
