import React from "react";
import DisplayWeather from "./DisplayWeather";


export default function Main({ data, isLoading, weatherData, convertToFlag, formatDay,  getWeatherIcon }) {
	const {
		country,
		name,
		population,
		latitude,
		longitude,
		timezone,
		elevation,
		country_code,
	} = data;
	
	return (
		<>
			<div className="w-[25.875rem] min-h-[50rem]">
				<DisplayWeather
					country={country}
					name={name}
					population={population}
					latitude={latitude}
					longitude={longitude}
					timezone={timezone}
					elevation={elevation}
					country_code={country_code}
					convertToFlag={convertToFlag}
					weatherData={weatherData}
					formatDay={formatDay}
					getWeatherIcon={getWeatherIcon}
				/>
			</div>
		</>
	);
}
