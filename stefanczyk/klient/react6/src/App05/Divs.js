import { useParams } from 'react-router-dom';
const Divs = () => {
	let { id } = useParams();
	let intId = parseInt(id)

	const onDivClick = () => {
		alert(`todo`)
	}

	const createDivs = () => {
		let divsArr = []

		for (let i = 0; i < intId; i++) {
			divsArr.push(<div className='param-button' onClick={onDivClick} key={i} >{i}</div >)
		}
		return divsArr
	}

	return (
		<div className='child-center'>
			<div className="title-div">
				<h1>DIVS</h1>
			</div>
			<div className='button-container'>
				{createDivs()}
			</div>
		</div>
	)

}

export default Divs
//TODO: pozmieniać nazwy i dokonczyc zadanie