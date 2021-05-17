console.log("WindScrib v1.0.0");

const API_KEY = "e33607657d15ab134399ef40a1c43892";
let Longitude = "";
let Latitude = "";

function getUserGeoLocation() {
  const geoLocation = checkGeoLocation();

  if (geoLocation === null) return;

  geoLocation.getCurrentPosition(
    (position) => {
      Latitude = position.coords.latitude;
      Longitude = position.coords.longitude;

      console.log("Lat: ", Latitude, ", Log: ", Longitude);
    },
    (err) => {
      if (err.PERMISSION_DENIED) {
        return alert("WindScrib requires your location data to work");
      }
      if (err.POSITION_UNAVAILABLE) {
        return alert("Unable to get current location info");
      }
      return alert(err.message);
    }
  );
}

function checkGeoLocation() {
  if (navigator.geolocation) {
    return navigator.geolocation;
  } else {
    alert("Unable to get geo location information");
    return null;
  }
}

async function getWeatherInfo() {
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${Latitude}&lon=${Longitude}&appid=${API_KEY}&units=metric`;

  const weatherResponse = await fetch(url);

  const weatherData = await weatherResponse.json();

  console.log(weatherData);
  document.getElementById("display").innerHTML =
    weatherData.main.temp + " <sup>°C</sup>";
}

document.getElementById("btn").addEventListener("click", () => {
  getWeatherInfo();
});

getUserGeoLocation();
