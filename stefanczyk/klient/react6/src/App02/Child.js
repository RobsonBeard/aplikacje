import { useParams } from 'react-router-dom';
const Child = () => {
	let { id } = useParams();
	if (id === "1" || id === "2" || id === "3") {
		return (
			<div className="title-div">
				<h1>Child page - params: {id}</h1>
			</div>
		)
	}
	else {
		return (
			<div className="title-div">
				<h1>PATH NOT RESOLVED</h1>
			</div>
		)
	}
}

export default Child