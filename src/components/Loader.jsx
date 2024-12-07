import { FaSpinner } from "react-icons/fa";

export default function Loader() {
	return (
		<div className="w-[15rem] min-h-[20rem] flex justify-center items-center mx-auto">
			<h1 className="text-lg flex items-center font-cinzel tracking-wider text-white">
				<span className="animate-spin mr-1"><FaSpinner /></span>
				Loading data
			</h1>
		</div>
	);
}
