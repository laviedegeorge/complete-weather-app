const displayTime = (time) => {
  const dateArr = ['Sun', 'Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat'];

  const monthArr = [
    'Jan.',
    'Feb.',
    'Mar.',
    'Apr.',
    'May',
    'Jun.',
    'July',
    'Aug.',
    'Sept.',
    'Oct.',
    'Nov.',
    'Dec.',
  ];

  const hr = time.getHours();
  const mins = time.getMinutes();
  const day = dateArr[time.getDay()];
  const date = time.getDate();
  const month = monthArr[time.getDay()];
  const yr = time.getFullYear();

  document.getElementById(
    'date',
  ).innerHTML = `${hr}:${mins} - ${day}, ${date} ${month} ${yr}`;
};

const calcTime = (tZone) => {
  // offset in hours
  const offset = tZone / 3600;

  // create Date object for current location
  const d = new Date();

  // convert to msec
  // add local time zone offset
  // get UTC time in msec
  const utc = d.getTime() + d.getTimezoneOffset() * 60000;

  // create new Date object for different city
  // using supplied offset
  const nd = new Date(utc + 3600000 * offset);
  displayTime(nd);
};

const displayInfo = (obj) => {
  document.getElementById('deg').innerHTML = `${Math.round(
    obj.main.temp,
  )}<sup class="text-sm font-light">0</sup>`;

  document.getElementById('location').innerHTML = obj.name;

  const weatherIcon = document.createElement('img');
  weatherIcon.setAttribute(
    'src',
    `http://openweathermap.org/img/wn/${obj.weather[0].icon}.png`,
  );
  weatherIcon.setAttribute('height', '35px');
  weatherIcon.setAttribute('width', '35px');

  const weatherDescription = document.createElement('span');
  weatherDescription.innerHTML = `${obj.weather[0].description}`;

  document.getElementById('weather_cont').innerHTML = '';
  document.getElementById('weather_cont').innerHTML = '';

  document.getElementById('weather_cont').append(weatherIcon);
  document.getElementById('weather_cont').append(weatherDescription);

  document.getElementById('cloudy').innerHTML = `${obj.clouds.all}%`;
  document.getElementById('humidity').innerHTML = `${obj.main.humidity}%`;
  document.getElementById('wind').innerHTML = `${obj.wind.speed}km/h`;

  calcTime(obj.timezone);
};

export default displayInfo;
