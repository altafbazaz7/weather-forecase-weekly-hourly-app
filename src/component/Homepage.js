import { useState } from "react";
import { API_KEY } from "../utils/API_KEY";

const Homepage = () => {
    const [currentDayWeather, setCurrentDayWeather] = useState(null);
    const [sevenDayForecast, setSevenDayForecast] = useState(null);
    const [inputValue, setInputValue] = useState("");
    const [getHourly, setGetHourly] = useState({
        date: "",
        hour: null
    });


    return (
        <div className="w-full flex flex-col items-center min-h-[100vh]">
            <Search setCurrentDayWeather={setCurrentDayWeather} setSevenDayForecast={setSevenDayForecast} inputValue={inputValue} setInputValue={setInputValue} />
            <WeatherDetail currentDayWeather={currentDayWeather} />
            <SevenDayForecast getHourly={getHourly} setGetHourly={setGetHourly} sevenDayForecast={sevenDayForecast} />
            {
                getHourly && (<HourlyForecast hour={getHourly.hour} date={getHourly.date} />)
            }
        </div>
    );
};

const Search = ({ setCurrentDayWeather, setSevenDayForecast, inputValue, setInputValue }) => {
    const handleGetCity = async () => {
        try {
            const response = await fetch(`http://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${inputValue}&aqi=no`);
            const jsonResponse = await response.json();

            if (response.ok) {
                const sevenDayForecastResponse = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${inputValue}&days=7&aqi=no&alerts=no`);
                const sevenDayForecastJsonResponse = await sevenDayForecastResponse.json();
                setSevenDayForecast(sevenDayForecastJsonResponse);
            }

            setCurrentDayWeather(jsonResponse);
        } catch (error) {
            setCurrentDayWeather({ message: "No Matching City Found!" });
        }
    };

    return (
        <div className="flex flex-row items-center mt-4 gap-4">
            <input
                className="border border-gray-300 rounded-md px-4 py-2 w-full md:w-96"
                type="text"
                placeholder="Search Here..."
                onChange={(e) => setInputValue(e.target.value)}
                value={inputValue}
            />
            <button
                className="bg-[coral] text-white font-bold py-2 px-4 rounded"
                onClick={handleGetCity}
            >
                Search
            </button>
        </div>
    );
};

export default Homepage;

const WeatherDetail = ({ currentDayWeather, forecast, getHourly, setGetHourly, hourly }) => {


    if (!currentDayWeather) {
        return null;
    }

    const { location, current, hour } = currentDayWeather;
    const { name, region, country } = location;

    return (
        <div className="text-center bg-gray-800 rounded-lg p-6 shadow-md mt-8 min-w-[350px] relative">
            <h1 className="text-white text-lg md:text-lg lg:text-lg font-semibold mb-4">
                {
                    !forecast && !hourly ? (
                        <>
                            Place:  {name}, {region}, {country}
                        </>
                    ) : hourly ? (
                        <>
                            Hour: {name}
                        </>
                    ) :
                        <>
                            Date: {name}
                        </>
                }

            </h1>
            <div className="flex justify-center items-center mb-4 gap-[10px] ">
                <img src={current?.condition?.icon} alt="Weather Icon" className="mr-4" height={80} width={80} />
                {
                    !forecast && (
                        <p className="text-white text-lg md:text-xl lg:text-2xl font-semibold">{current?.temp_c}&#176;C</p>
                    )
                }
                <p className="text-white text-md md:text-lg lg:text-xl font-semibold">{current?.condition?.text}</p>
            </div>
            {
                forecast && (
                    <>
                        <button
                            onClick={() => setGetHourly({
                                hour: hour,
                                date: name
                            })}
                            className="bg-[coral] text-white font-bold py-2 px-4 rounded absolute bottom-[10px] right-[10px]"
                        >
                            Get Hourly?
                        </button>
                    </>
                )
            }

        </div>
    );
};

const SevenDayForecast = ({ sevenDayForecast, getHourly, setGetHourly }) => {
    if (!sevenDayForecast || !Array.isArray(sevenDayForecast.forecast?.forecastday)) {
        return null;
    }

    return (
        <>

            {
                Array.isArray(sevenDayForecast.forecast.forecastday) && <div className="w-[80%] mt-8 mx-[10px] overflow-x-scroll overflow__scroll__bar">
                    <h1 className="text-white text-3xl md:text-4xl lg:text-5xl font-semibold mb-4">7 Day Forecast</h1>
                    <div className="flex  gap-4">
                        {sevenDayForecast.forecast.forecastday.map((day, index) => (
                            <>


                                <WeatherDetail key={index}
                                    getHourly={getHourly}
                                    setGetHourly={setGetHourly}
                                    currentDayWeather={{ location: { name: day.date }, current: day.day, hour: day.hour }} forecast={true} />

                            </>
                        ))}
                    </div>
                </div>
            }
        </>

    );
};



const HourlyForecast = ({ hour, date }) => {


    return (
        <>

            {
                Array.isArray(hour) && (
                    <>
                        <div className="w-[80%] mt-8 mx-[10px] overflow-x-scroll overflow__scroll__bar">
                            <h1 className="text-white text-3xl md:text-4xl lg:text-5xl font-semibold mb-4"  >24hr details for : {date}</h1>
                            <div className="flex  gap-4">
                                {Array.isArray(hour) && hour.map((hour, index) => (
                                    <>
                                        {
                                            console.log(hour.condition, "hourrr")
                                        }


                                        <WeatherDetail key={index}
                                            currentDayWeather={{ location: { name: hour.time.split(" ")[1] }, current: hour, hour: "day.hour" }}
                                            hourly={true} />

                                    </>
                                ))}
                            </div>
                        </div>
                    </>
                )
            }
        </>

    );
};


