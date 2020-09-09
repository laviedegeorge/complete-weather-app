const API_KEY = 'b8aa6b77e85dc3ac3f6db7694ca0e9ea';

const getCityData = (city = '', lat = 9.08, long = 8.68) => {
  let url;
  if (city !== '') {
    url = `//api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
  } else {
    url = `//api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${API_KEY}&units=metric`;
  }

  return new Promise((res, err) => {
    fetch(url)
      .then((response) => response.json())
      .then(res)
      .catch(err);
  });
};

const getCityInfo = (city, displayData, lat, long) => {
  getCityData(city, lat, long)
    .then(displayData)
    .catch((err) => {
      // eslint-disable-next-line no-console
      console.log(err, 'City not Found!!!');
    });
};

export default getCityInfo;
