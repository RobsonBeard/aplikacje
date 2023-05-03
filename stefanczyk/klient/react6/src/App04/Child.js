import { useParams } from 'react-router-dom';
const Child = () => {
	let { id } = useParams();

	const onButtonClick = (urlId, buttonId) => {
		alert(`${urlId}-${buttonId}`)
	}

	const createButtons = () => {
		let buttonArr = []
		let intId = parseInt(id)
		for (let i = 0; i < intId; i++) {
			buttonArr.push(<button className='param-button' onClick={() => onButtonClick(intId, i)} key={i} ><p>param from url = {intId}</p><p>button index = {i}</p></button >)
		}
		return buttonArr
	}

	return (
		<div className='child-center'>
			<div className="title-div">
				<h1>LINKS PARAM = {id}</h1>
			</div>
			<div className='button-container'>
				{createButtons()}
			</div>
		</div>
	)

}

export default Child