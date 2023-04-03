import React, { useState,useContext } from "react";
import { useEffect } from "react";
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { UserContext } from "../App";

export default function Weathwr() {
  const [Data, setData] = useState();
  const [currentData, setCurrentData] = useState();
  const [countris,setcountries]=useState([])
  const [country,setcountry]=useState({iso2: "IN", lat: 20, long: 77, name: "India"})

  const {lat, setLat,long, setLong}=useContext(UserContext)
    useEffect(() => {
      
      navigator.geolocation.getCurrentPosition(function(position) {
       
        setLat(position.coords.latitude);
        setLong(position.coords.longitude);
      });
         const fetchData = async () => {
  

      const url1 = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&exclude=hourly,minutely&units=metric&appid=395223c27468a2be96c0812062942720`;

      const responce = await fetch(url1);
      const data = await responce.json();
      setData(data);
      setCurrentData(data.current);
    };

    fetchData();
  }, [lat, long]);

  const getTime = (timestamp) => {
    return `${new Date(timestamp * 1000).getHours()}:${new Date(
      timestamp * 1000
    ).getMinutes()}`;
  };

  return (
    <div className="containers">
     
          <Autocomplete
      disablePortal
      id="combo-box-demo"
      options={countris}
      sx={{ width: 300 }}
      getOptionLabel={(option) => option.name}
      value={country}
      onChange={(event, newValue) => {
        setcountry(newValue);
        setLat(newValue?.lat);
        setLong(newValue?.long)
      }}
      renderInput={(params) => <TextField {...params} label="country" />}
    />
 
    <div className="container">
      <div className="content">
        {Data ? <h1 data-testid="heads">{Data.timezone}</h1> : ""}
        {!currentData ? (
          <div class="spinner"></div>
        ) : (
          <div>
            <h3 id="temp">{currentData.temp}°C</h3>
          </div>
        )}

        {!currentData ? (
          ""
        ) : (
          <>
            <p>
              sunrise :{getTime(currentData.sunrise)} a.m{" "}
              <i class="fal fa-sunrise"></i>
            </p>
            <p>
              sunset :{getTime(currentData.sunset)} p.m{" "}
              <i class="fas fa-sunset"></i>
            </p>
          </>
        )}

        {currentData ? <p>Wind speed: {currentData.wind_speed}</p> : ""}
      </div>
      <div data-testid="cloud" className="cloud">
        {!currentData ? (
          <p></p>
        ) : (
          <>
            <img
              src={`http://openweathermap.org/img/w/${currentData.weather[0].icon}.png`}
              alt=""
            />{" "}
            <br />
            <small>{currentData.weather[0].description} </small>
          </>
        )}{" "}
        <br />
        {!currentData ? (
          <p></p>
        ) : (
          <>
            {" "}
            <i class="far fa-humidity"></i> {currentData.humidity}%
          </>
        )}
      </div>
    </div>
    </div>
  );
}
