import React, { useEffect, useState,useContext } from "react";
import { UserContext } from "../App";
const Daily = () => {

  
  const {lat, setLat,long, setLong}=useContext(UserContext)

  useEffect(() => {
    const fetchData = async () => {

    const [Data,setData]=useState([])
    
 
    useEffect(() => {
        const fetchData = async () => {
          
        
            const url1=`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&exclude=hourly,minutely&units=metric&appid=395223c27468a2be96c0812062942720`
             
              const responce=await fetch(url1)
              const data=await responce.json()
            console.log(data)
             setData(data.daily)
          
          
          }
          fetchData();
      
          
        }, [lat,long])

    

      const url1 = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&exclude=hourly,minutely&units=metric&appid=395223c27468a2be96c0812062942720`;

      const responce = await fetch(url1);
      const data = await responce.json();
      console.log(data);
      setData(data.daily);
    };
    fetchData();
  }, [lat, long]);

  const getDate = (timestamp) => {
    const dayname = new Date(timestamp * 1000).toLocaleDateString("en", {
      weekday: "long",
    });
    return dayname;
  };
  const kelvinTocelcius = (k) => (k - 273.15).toFixed(1);
  const getTime = (timestamp) => {
    return `${new Date(timestamp * 1000).getHours()}:${new Date(
      timestamp * 1000
    ).getMinutes()}`;
  };

  return (
    <div className="weeks">
      {Data
        ? Data.slice(1).map((elem) => {
            return (
              <div className="day">
                <p>{getDate(elem.dt)}</p>
                <p>Sunrise :{getTime(elem.sunrise)} a.m</p>
                <p>Sunset :{getTime(elem.sunset)} p.m</p>
                <small>
                  Max:{elem.temp.max}°C Min:{elem.temp.min}°C
                </small>
                <img
                  src={`http://openweathermap.org/img/w/${elem.weather[0].icon}.png`}
                  alt=""
                />
                <p>{elem.weather[0].description}</p>
              </div>
            );
          })
        : ""}
    </div>
  );
};


export default Daily;


