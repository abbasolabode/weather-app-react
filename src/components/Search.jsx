import PropTypes from "prop-types";
import { useEffect, useRef } from "react";


export default function Search({ location, onAddChange, inputRef}) {
	const inputTag = useRef(null);

    /* Assigning the input element to the inputRef */
	useEffect(function(){
		inputRef.current = inputTag.current;
	}, [inputTag, inputRef]);

     
  
	function handleInputChange(e) {
		onAddChange(e.target.value);
	}
     
	return (
		<div className="w-[25.875rem] min-h-[4rem] flex justify-center items-center iphonepro:w-[23.4375rem]">
			<input
				className="mt-3 w-[20rem] min-h-[2.5rem] rounded-md placeholder:pl-4 pl-3 text-xl font-cinzel font-light bg-primaryContainer placeholder:font-extralight placeholder:tracking-wider outline-none placeholder:text-sm"
				type="text"
				placeholder="Enter a city"
				value={location}
				onChange={handleInputChange}
				ref={inputTag}
			/>
		</div>
	);
}

Search.propTypes = {
	location: PropTypes.string.isRequired,
	onAddChange: PropTypes.func.isRequired,
	inputRef: PropTypes.object.isRequired,
	inputTag: PropTypes.object,
};
