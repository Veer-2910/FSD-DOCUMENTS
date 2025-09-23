const weatherData = {
  Ahmedabad: "42°C",
  Rajkot: "38°C",
  Surat: "36°C",
  Vadodara: "40°C",
};

document.getElementById("getWeatherBtn").addEventListener("click", () => {
  const city = document.getElementById("cityInput").value.trim();
  const result = document.getElementById("weatherResult");

  if (city in weatherData) {
    result.textContent = `The temperature in ${city} is ${weatherData[city]}.`;
  } else {
    result.textContent = `Sorry, no weather data available for "${city}".`;
  }
});
