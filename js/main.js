console.log("WindScrib v1.0.1");

const API_KEY = "e33607657d15ab134399ef40a1c43892";





async function getUserGeoLocation() {


  // New Promise
  return new Promise((resolve,reject)=>{

    const geoLocation = checkGeoLocation();

    if (geoLocation === null) return reject("Browsers does not have support for geo location");
  

     geoLocation.getCurrentPosition(
      (position) => {
        Latitude = position.coords.latitude;
        Longitude = position.coords.longitude;
  
        resolve({lat:Latitude,log:Longitude});
      },
      (err) => {
        if (err.PERMISSION_DENIED) {
          return reject("WindScrib requires your location data to work");
        }
        if (err.POSITION_UNAVAILABLE) {
          return reject("Unable to get current location info");
        }
        return reject(err.message);
      }
    );



  });
}


function checkGeoLocation() {
  if (navigator.geolocation) {
    return navigator.geolocation;
  } else {
    alert("Unable to get geo location information");
    return null;
  }
}

async function getWeatherInfo({lat,log}) {

  if (!lat || !log) return alert("Location Access Is Required");

  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${Latitude}&lon=${Longitude}&appid=${API_KEY}&units=metric`;

  const weatherResponse = await fetch(url);

  const weatherData = await weatherResponse.json();

  console.log(weatherData);

  updateWeatherReport(weatherData);
}

async function getCityWeather(city) {

  if (!city) return alert("City does not exist");

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;

  const weatherResponse = await fetch(url);

  const weatherData = await weatherResponse.json();

  console.log(weatherData);

  updateWeatherReport(weatherData);
}


function getEle(id=""){
  if(!id) throw "element is required";
  
  return document.getElementById(id);
}


function updateWeatherReport(data){

  const lat = data.coord.lat;
  const lon = data.coord.lon;
  const temp = data.main.temp;
  const description = data.weather[0].description;
  const location = data.name + ", " + data.sys.country;
  const humidity = data.main.humidity;
  const pressure = data.main.pressure;
  const speed = data.wind.speed;
  const feel = data.main.feels_like
  const status = data.weather[0].description
  const days = ["Sunday" , "Monday" , "Tuesday" , "Wednesday" , "Thursday" , "Friday" , "Saturday"]
  const date = new Date()
  const day = date.getDay()
  const exactdate = date.getDate()

  
  getEle("weather-temp").innerHTML = temp + "<i>°C</i>";
  getEle("weather-desc").innerHTML = description;
  getEle("location").innerHTML = location;
  getEle("lat").innerHTML =  lat;
  getEle("lon").innerHTML = lon;
  getEle("humidity").innerHTML =  humidity;
  getEle("pressure").innerHTML =  pressure;
  getEle("speed").innerHTML = speed;
  getEle("feel").innerHTML = feel;
  getEle("status").innerHTML = status
  getEle("date").innerHTML = `${days[day]}, ${exactdate}`;


}

function getInputData(){

  const input = getEle("search").value
  console.log(input)

  getCityWeather(input)
  

  getEle("search").value = "";
}

getEle("btn").addEventListener("click" , getInputData )




getUserGeoLocation().then(getWeatherInfo).catch(alert);
