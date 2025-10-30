import React from "react";
function WeatherCard({data}){
    return (
        <div className="card">
            <h3>{data.city}</h3>
              <p>🌡️ Temperature: {data.temperature}°C</p>
      <p>💨 Wind Speed: {data.windspeed} km/h</p>
<p>🕒 Time: {new Date(data.time + "Z").toUTCString()}</p>
      </div>
    );
}
export default WeatherCard;