import { useParams } from 'react-router-dom';
const Child = () => {
	let { id } = useParams();

	return (
		<div className="title-div">
			<h1>LINKS PARAM = {id}</h1>
		</div>
	)

}

export default Child