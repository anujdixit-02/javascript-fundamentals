const nae = document.getElementById("name");
const btn = document.getElementById("btn");
const result = document.getElementById("result");
const city = document.getElementById("city");
const country = document.getElementById("country");

const key = "72ecb4b1ccc32bd894c88dcabb037ea6";

function setBackground(weather) {
  weather = weather.toLowerCase();

  if (weather.includes("cloud")) {
    document.body.style.backgroundImage = "url('img/cloudy.jpg')";
  } else if (weather.includes("rain")) {
    document.body.style.backgroundImage = "url('img/rainy.jpg')";
  } else if (weather.includes("clear")) {
    document.body.style.backgroundImage = "url('img/sunny.jpg')";
  } else if (weather.includes("snow")) {
    document.body.style.backgroundImage = "url('img/snow.jpg')";
  } else if (weather.includes("thunder")) {
    document.body.style.backgroundImage = "url('img/thunder.jpg')";
  } else {
    document.body.style.backgroundImage = "url('img/default.jpg')";
  }
}

btn.onclick = () => {
  let val = nae.value.trim();

  if (!val) {
    result.innerHTML = `<h1>Please enter a city name 🙂</h1>`;
    return;
  }

  result.innerHTML = `<h3>Loading... ⏳</h3>`;

  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${val}&appid=${key}`)
    .then(res => res.json())
    .then(data => {
      if (data.cod !== 200) {
        result.innerHTML = `<h1>Error: ${data.message} 😢</h1>`;
        return;
      }

      setBackground(data.weather[0].main);

      result.innerHTML = `
        <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}.png">
        <h1 class="tmp">${(data.main.temp - 273).toFixed(1)} °C</h1>
        <h2>${data.weather[0].main}</h2>
        <h5>Feels Like: ${(data.main.feels_like - 273).toFixed(1)} °C</h5>
        <h5>Humidity: ${data.main.humidity}%</h5>
        <h5>Wind: ${data.wind.speed} m/s</h5>
      `;

      city.innerHTML = data.name + "/";
      country.innerHTML = data.sys.country;
    })
    .catch((err) => {
      result.innerHTML = `<h1>Network error: ${err.message} 😢</h1>`;
    });
};

nae.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    btn.click();
  }
});

document.getElementById("locate").onclick = () => {
  if (!navigator.geolocation) {
    result.innerHTML = `<h1>Geolocation not supported 😢</h1>`;
    return;
  }

  result.innerHTML = `<h3>Getting location... ⏳</h3>`;

  navigator.geolocation.getCurrentPosition((pos) => {
    let lat = pos.coords.latitude;
    let lon = pos.coords.longitude;

    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}`)
      .then(res => res.json())
      .then(data => {
        if (data.cod !== 200) {
          result.innerHTML = `<h1>Error: ${data.message} 😢</h1>`;
          return;
        }

        setBackground(data.weather[0].main);

        result.innerHTML = `
          <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}.png">
          <h1 class="tmp">${(data.main.temp - 273).toFixed(1)} °C</h1>
          <h2>${data.weather[0].main}</h2>
          <h5>Feels Like: ${(data.main.feels_like - 273).toFixed(1)} °C</h5>
          <h5>Humidity: ${data.main.humidity}%</h5>
          <h5>Wind: ${data.wind.speed} m/s</h5>
        `;

        city.innerHTML = data.name + "/";
        country.innerHTML = data.sys.country;
      })
      .catch((err) => {
        result.innerHTML = `<h1>Network error: ${err.message} 😢</h1>`;
      });

  }, () => {
    result.innerHTML = `<h1>Allow location access 😢</h1>`;
  });
};

const time = document.getElementById("tm");
const dt = document.getElementById("dte");

setInterval(() => {
  const now = new Date();

  let hrs = now.getHours();
  let min = now.getMinutes();

  let ap = hrs >= 12 ? "PM" : "AM";
  hrs = hrs % 12 || 12;

  if (min < 10) min = "0" + min;

  time.innerHTML = `${hrs}:${min} ${ap}`;
  dt.innerHTML = now.toDateString();
}, 1000);

document.body.style.backgroundImage = "url('img/default.jpg')";