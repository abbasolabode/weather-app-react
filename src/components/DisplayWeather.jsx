import React from "react";
import PropTypes from "prop-types";
import Day from "./day";
import Error from "./Error";


export default function DisplayWeather({
	country,
	name,
	population,
	latitude,
	longitude,
	timezone,
	elevation,
	convertToFlag,
	country_code,
	weatherData,
	formatDay,
	getWeatherIcon,
}) {
	const {
		temperature_2m_max: max,
		temperature_2m_min: min,
		time: dates,
		weathercode: code,
	} = weatherData;


	if (!Array.isArray(dates) || !max || !min || !code) return "";
	

	return (
		<div className="w-[25.875rem] min-h-[30rem] iphonepro:w-[23.4375rem] laptop:w-[80rem]">
			<div className="w-[25.875rem] min-h-[20rem] flex flex-col justify-center items-center iphonepro:w-[23.4375rem]">
				<h1 className="w-full min-h-[5rem] text-center flex  justify-center text-3xl tracking-widest font-semibold text-yellow-600 font-cinzel mt-6 text-black">
					{name}
					<span className="text-sm ml-2 font-cinzel text-red-600">
						{convertToFlag(country_code)}
					</span>
				</h1>

				<span className="text-white text-center text-8xl"></span>

				<span className="w-[5rem] text-[5rem] text-center text-yellow-500 font-cinzel">
					{}
					<span className="text-lg flex justify-center font-extralight">
						{}
					</span>
				</span>
			</div>

			<div className="w-[25.8em] grid grid-cols-4 justify-center mt-[-5rem] iphonepro:w-[23.4375rem] ml-2 ">
				{dates.map((date, i) => (
					<Day
						date={date}
						max={max.at(i)}
						code={code.at(i)}
						min={min.at(i)}
						isToday={i === 0}
						key={i}
						formatDay={formatDay}
						getWeatherIcon={getWeatherIcon}
					/>
				))}
			</div>

			<div className="w-[25.875rem] min-h-[10.34rem] mt-4 flex justify-around border shadow-2xl bg-white rounded-md iphonepro:w-[23.4375rem] iphonepro:min-h-[10.34rem] shadow-2xl">
				<div className="w-[25.875rem] mr-[1rem] ml-2">
					<div className="w-[25.875rem] flex flex-col justify-start">
						<h3 className="text-[1.05rem] font-cinzel text-sky-500 font-medium text-center iphonepro:mt-3">
							Demography/Geography:
						</h3>
						<div className="mt-3 iphonepro:min-h-[10.34rem]">
							<p className="text-sm font-cinzel font-medium tracking-widest text-sky-500">
								Population: {population}
							</p>
							<p className="text-sm font-cinzel font-medium tracking-widest text-sky-500">
								Latitude: {latitude}
							</p>
							<p className="text-sm font-cinzel font-medium tracking-widest text-sky-500">
								Longitude: {longitude}
							</p>
							<p className="text-sm font-cinzel font-medium tracking-widest text-sky-500">
								Elevation: {elevation}
							</p>
							<p className="text-sm font-cinzel font-medium tracking-widest text-sky-500">
								TimeZone: {timezone}
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}


DisplayWeather.prototype ={
  dates: PropTypes.array.isRequired,
}


/* 

<div className="">
	<h3 className="text-sm text-white font-cinzel">Humidity: 47%</h3>
	<h3 className="no-wrap text-sm text-white flex  font-cinzel">
		Visibility: <span className="ml-2">Moderate</span>
	</h3>
	<h3 className="no-wrap text-sm text-white flex  font-cinzel">
		Chance of Rain: 70%
	</h3>
	<h3 className="no-wrap text-sm text-white flex  font-cinzel">
		Precipitation: 4mm
	</h3>
</div>; */