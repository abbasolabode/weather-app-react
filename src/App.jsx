import Search from "./components/Search";
import Main from "./components/main";
import Loader from "./components/Loader";
import Error from "./components/Error";
import { useEffect, useRef, useState } from "react";

function getWeatherIcon(wmoCode) {
	const icons = new Map([
		[[0], "☀️"],
		[[1], "🌤"],
		[[2], "⛅️"],
		[[3], "☁️"],
		[[45, 48], "🌫"],
		[[51, 56, 61, 66, 80], "🌦"],
		[[53, 55, 63, 65, 57, 67, 81, 82], "🌧"],
		[[71, 73, 75, 77, 85, 86], "🌨"],
		[[95], "🌩"],
		[[96, 99], "⛈"],
	]);

	const arr = [...icons.keys()].find((key) => key.includes(wmoCode));
	if (!arr) return "❓"; // Use a default icon if the code isn't found
	return icons.get(arr);
}

function App() {
	/* STATES */
	const [location, setLocation] = useState("");
	const [data, setData] = useState([]);
	const [weatherData, setWeatherData] = useState([]);
	const [error, setError] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const inputRef = useRef(null);

    useEffect(function(){
        console.log(weatherData, data)
	}, [weatherData, data]);


	//Updating the query state
	function handleChange(query) {
		setLocation(query);
	}

	//Format dates
	function formatDay(dateStr) {
		return new Intl.DateTimeFormat("en", { weekday: "short" }).format(
			new Date(dateStr)
		);
	};

	//convert the country code to convertToFlag
	function convertToFlag(countryCode) {
		const codePoints = countryCode
			.toUpperCase()
			.split("")
			.map((char) => 127397 + char.charCodeAt());
			return String.fromCodePoint(...codePoints);
		}
		
		/* Fetch geolocation data */
		useEffect(() => {
			if (!location || location.length < 2) return setError("");//Check if the there's no location OR if the location is less than 2
			const controller = new AbortController();//Aborts unwanted fetches
			
			/* Fetch geodata */
		async function fetchGeoData() {
			try {
				setIsLoading(true);
				setError("");
				const res = await fetch(
					`https://geocoding-api.open-meteo.com/v1/search?name=${location}`,
					{ signal: controller.signal }
				);
				if (!res.ok) throw new Error("Fetch terminated");
				const receivedData = await res.json();
				setData(receivedData?.results?.at(0));
			} catch (err) {
				if (err.name !== "AbortError") {
					setError(err.message);
					console.error("Fetch Error:", err);
				}
			} finally {
				setIsLoading(false);
			}
		}
         
		fetchGeoData();
		return () => controller.abort();
	}, [location]);

	/* Fetch weather data */
	useEffect(
		function () {
			if (!data?.latitude || !data?.longitude || !data?.timezone) return;
			const url = `https://api.open-meteo.com/v1/forecast?latitude=${data.latitude}&longitude=${data.longitude}&timezone=${data.timezone}&daily=weathercode,temperature_2m_max,temperature_2m_min`;
			const controller = new AbortController();
			async function fetchWeatherData() {
				try {
					const res = await fetch(url, { signal: controller.signal });
					if (!res.ok) throw new Error("No data Found");
					const data = await res.json();
					if (data.message === "Error")
						throw new Error("No weather data fetched");
					setWeatherData(data.daily);
				} catch (err) {
					setError(err.name !== "AbortError" ? err.message : "");
				} finally {
					setIsLoading(false);
				};
			};

			fetchWeatherData();
			return () => controller.abort();
		},
		[data?.latitude, data?.longitude, data?.timezone]
	);
        
	/* Implementing "Enter" keypress logic */
	useEffect(
		function () {
			function callback(e) {
				if (document.activeElement === inputRef.current) return;
				if (e.code === "Enter") {
					inputRef.current.focus();
					setLocation("");
				}
			}

			document.addEventListener("keydown", callback);
			return document.removeEventListener("keydown", callback);
		},
		[setLocation, setWeatherData]
	);

	return (
		<>
			<div className="w-[25.875rem] min-h-[38rem] bg-primaryColor mx-auto mt-1 iphonepro:w-[23.4375rem] laptop:w-[80rem]">
				<div>
					<Search
						onAddChange={handleChange}
						location={location}
						setLocation={setLocation}
						inputRef={inputRef}
					/>
					<>
						{isLoading && <Loader />}
						{/* If loading state is true, then render Loader component */}
						{error && <Error />}
						{/* If there's error then render Error component */}
						{!error && !isLoading && (
							<Main
								data={data}
								isLoading={isLoading}
								weatherData={weatherData}
								convertToFlag={convertToFlag}
								formatDay={formatDay}
								getWeatherIcon={getWeatherIcon}
							/>
						)}
						{/* If there's no error and loading is false render Main component */}
					</>
				</div>
			</div>
		</>
	);
}

export default App;
