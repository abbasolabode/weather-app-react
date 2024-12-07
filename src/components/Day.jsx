import PropTypes from "prop-types";
export default function Day({
	date,
	max,
	min,
	code,
	isToday,
	formatDay,
	getWeatherIcon,
}) {
	return (
		<div className=" mt-3 gap-1 mx-auto iphonepro:w-[23.4375rem]">
			<div className="w-[6rem] min-h-[10rem]">
				<div className="w-[5rem] min-h-[10rem] shadow-2xl flex flex-col bg-black rounded-md items-center iphonepro:shadow-2xl">
					<div className="mx-auto">
						<span className="mt-1 text-white text-5xl  iphonepro:text-3xl">
							{getWeatherIcon(code)}
						</span>
					</div>
					<div className="h-[8rem] flex flex-col justify-center gap-4">
						<h3 className="text-lg font-cinzel text-white text-center iphonepro:text-base">
							<span className={`${isToday ? "text-red-600" : "text-white"}`}>
								{isToday ? "Today" : formatDay(date)}
							</span>
						</h3>
						<p className="font-cinzel text-lg text-white">
							{Math.floor(min)}&deg; &mdash;{" "}
							<strong>{Math.ceil(max)}&deg;</strong>
						</p>
					</div>
				</div>
			</div>
		</div>
	);
}

Day.propTypes = {
	date: PropTypes.array,
	max: PropTypes.number,
	min: PropTypes.number,
	code: PropTypes.array,
	isToday: PropTypes.func,
	formatDay: PropTypes.func,
	getWeatherIcon: PropTypes.func,
};
