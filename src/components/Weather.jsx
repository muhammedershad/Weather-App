import axios from 'axios'
import React, { useEffect, useState } from 'react'
import clear from '../assets/clear.jpg'
import cloudy from '../assets/cloudy.jpg'
import mist from '../assets/mist.jpg'
import snow from '../assets/snow.jpg'
import rain from '../assets/rain.jpg'
import drizzle from '../assets/drizzle.jpg'
import thunderStorm from '../assets/thunderStorm.jpg'

const Weather = () => {

    const [city, setCity] = useState('delhi')
    const [weather, setWeather] = useState({})
    const [image, setImage] = useState('')

    const operWeatherApi = import.meta.env.VITE_OPENWEATHERAPI;

    useEffect(() => {
        // setWeather({...weather,date:formatDate(new Date())})
        setWeatherHandle()

    }, [])

    const getWeather = async (e) => {
        e.preventDefault()
        setWeatherHandle()
    }

    const setWeatherHandle = async () => {
        try {
            const res = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${operWeatherApi}&units=metric`)
            // console.log(res)
            setCity('')
            let code = res.data.weather[0].id
            if (code > 800) {
                setImage(cloudy)
            }
            else if (code == 800) {
                setImage(clear)
            }
            else if (code < 800 && code > 700) {
                setImage(mist)
            }
            else if (code >= 600 && code < 700) {
                setImage(snow)
            }
            else if (code >= 500 && code < 600) {
                setImage(rain)
            }
            else if (code >= 300 && code < 500) {
                setImage(drizzle)
            }
            else if (code >= 200 && code < 300) {
                setImage(thunderStorm)
            }


            setWeather({
                ...weather,
                temperature: res.data.main.temp,
                maxTemp: res.data.main.temp_max,
                minTemp: res.data.main.temp_min,
                humidity: res.data.main.humidity,
                wind: res.data.wind.speed,
                visibility: res.data.visibility / 1000,
                location: res.data.name,
                weather: res.data.weather[0].main,
                icon: res.data.weather[0].icon,
                date: formatDate(new Date())
            })
        } catch (error) {
            console.log(error)
        }
    }


    function formatDate(date) {
        const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

        const dayOfWeek = daysOfWeek[date.getDay()];
        const day = date.getDate();
        const month = months[date.getMonth()];
        const year = date.getFullYear();

        return `${dayOfWeek} ${day} ${month} ${year}`;
    }



    return (
        <div className="min-h-screen flex items-center justify-center" style={{
            backgroundImage: `url(${image})`, backgroundPosition: 'center',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            transition: 'background-image 1s linear'
        }}>
            <div className="flex flex-col bg-white bg-opacity-10 backdrop-blur-sm rounded p-4 w-full max-w-xs shadow-lg">
                <form className='mb-2 rounded border border-gray-400' onSubmit={(e) => getWeather(e)}>
                    <input type="text" className='w-3/4 bg-transparent  outline-none p-2' value={city} onChange={(e) => setCity(e.target.value)} />
                    <button className='w-1/4  p-2 text-white'>Search</button>
                </form>
                <div className="font-bold text-3xl">{weather.location}</div>
                <div className="text-sm text-gray-800">{weather.date}</div>
                <div className="mt-4 self-center items-center justify-center h-24 w-24">
                    <img src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`} alt="" />
                </div>
                <div className="flex flex-row items-center justify-center mt-6">
                    <div className="font-medium text-6xl my-2">{weather.temperature}°</div>
                    <div className="flex flex-col items-center ml-6">
                        <div>{weather.weather}</div>
                        <div className="mt-1">
                            <span className="text-sm">
                                <i className="far fa-long-arrow-up" />
                            </span>
                            <span className="text-sm  text-gray-800">{weather.maxTemp}°C</span>
                        </div>
                        <div>
                            <span className="text-sm">
                                <i className="far fa-long-arrow-down" />
                            </span>
                            <span className="text-sm text-gray-800">{weather.minTemp}°C</span>
                        </div>
                    </div>
                </div>
                <div className="flex flex-row justify-between mt-6">
                    <div className="flex flex-col items-center">
                        <div className="font-medium text-base">Wind</div>
                        <div className="text-sm text-gray-800">{weather.wind}k/h</div>
                    </div>
                    <div className="flex flex-col items-center">
                        <div className="font-medium text-base">Humidity</div>
                        <div className="text-sm text-gray-800">{weather.humidity}%</div>
                    </div>
                    <div className="flex flex-col items-center">
                        <div className="font-medium text-base">Visibility</div>
                        <div className="text-sm text-gray-800">{weather.visibility}km</div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Weather
