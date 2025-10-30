// import React,{useState,useEffect} from "react";
import React,{useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import WeatherCard from "../components/WeatherCard";
function Weather(){
    const [city,setCity]=useState("");
    const [weather,setWeather]=useState(null);
    const [recent,setRecent]=useState([]);
    const navigate=useNavigate();
    const username = localStorage.getItem("username") || "Guest";
    const token=localStorage.getItem("token");
  //    useEffect(() => {
  //   fetchRecent();
  // }, []);

  const fetchRecent = async () => {
    try {
      const userId = parseJwt(token)?.id;
      if (!userId) return;
      const res = await axios.get(`http://localhost:5000/api/weather/recent/${userId}`);
      setRecent(res.data.recentSearches);
    } catch (err) {
      console.error(err);
    }
  };
  const handleSearch = async (searchCity = city) => {
    try {
      const res = await axios.get(`http://localhost:5000/api/weather/${searchCity}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setWeather(res.data);
      fetchRecent();
    } catch (err) {
      if (err.response?.status === 401) {
        alert("Session expired. Please log in again.");
        localStorage.clear();
        navigate("/");
      } else {
        alert("City not found or network error");
      }
    }
  };
  const handleLogout=()=>{
    localStorage.clear();
    navigate("/");
  };
  const parseJwt=(token)=>{
    try{
        return JSON.parse(atob(token.split(".")[1]));
    }
    catch{
        return null;
    }
  };
  return(
    <div className="weather-container">
        <h2>Welcome,{username}</h2>
        <div className="search-box">
            <input type="text" placeholder="Enter city name" onChange={(e)=>setCity(e.target.value)}/>
            <button onClick={()=>handleSearch()}>Search</button>
            <button onClick={handleLogout}>Logout</button>
        </div>
        {recent.length > 0 && (
        <div className="recent">
          <h4>Recent Searches</h4>
          <div className="recent-list">
            {recent.map((c, i) => (
              <button key={i} className="recent-btn" onClick={() => handleSearch(c)}>
                {c}
              </button>
            ))}
          </div>
        </div>
      )}

      {weather&&<WeatherCard data={weather} />}
    </div>
  );
}

export default Weather;
