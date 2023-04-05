import React, { useState,useContext } from "react";
import { useEffect } from "react";
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { UserContext } from "../App";

export default function Weathwr() {
  const [Data, setData] = useState();
  const [currentData, setCurrentData] = useState();
  const [countris,setcountries]=useState([])
  const [cities,setcities]=useState(["Kolkata","Mumbai","Delhi","Bangalore","Hyderabad","Ahmedabad","Chennai","Pune","kanpur","Lucknow","indore"])
  const [country,setcountry]=useState({iso2: "IN", lat: 20, long: 77, country: "India"})
  const [city,setcity]=useState('Kolkata')

  const {lat, setLat,long, setLong}=useContext(UserContext)

  useEffect(() => {
    fetch('https://countriesnow.space/api/v0.1/countries')
	.then(response => response.json())
	.then(response => setcountries(response.data))
	.catch(err => console.error(err));
  }, [])

  useEffect(() => {
    fetch(`https://api.api-ninjas.com/v1/geocoding?city=' + ${city}&country=${country.country}`,{
      method:'get',
      headers: {
        'X-Api-Key': 'mUtdUZMcjRzppKRe85e9Gg==bWMRNDZcnvddJvSO'
      },
    })
	.then(response => response.json())
	.then(response =>{ console.log(response)
  setLat(response[0].latitude)
  setLong(response[0].longitude)
  })
	.catch(err => console.error(err));
  }, [city])
  
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
      <div className="selec">
          <Autocomplete
      disablePortal
      id="combo-box-demo"
      options={countris}
      sx={{ width: 150 }}
      getOptionLabel={(option) => option.country}
      value={country}
      onChange={(event, newValue) => {
        setcountry(newValue);
      
        setcities(newValue.cities)
        setcity(newValue.cities[0])
      }}
      renderInput={(params) => <TextField {...params} label="Country" />}
    />
           <Autocomplete
      disablePortal
      id="combo-box-demo"
      options={cities}
      sx={{ width: 150 }}
      getOptionLabel={(option) => option}
      value={city}
      onChange={(event, newValue) => {
        setcity(newValue)
      }}
      renderInput={(params) => <TextField {...params} label="City" />}
    />
 </div>
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
