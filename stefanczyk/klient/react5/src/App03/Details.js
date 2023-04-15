import { useParams } from 'react-router-dom';
const Details = () => {
	let { id } = useParams();
	console.log(id);
	return (
		<div className="title-div">
			<h1>params id: {id}</h1>
		</div>
	)

}

export default Details