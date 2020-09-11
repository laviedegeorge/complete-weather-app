import './styles/main.css';
import getCityInfo from './js/getWeather';
import displayInfo from './js/displayInfo';

const mainD = document.getElementById('main-details');
let clicked = false;
const oldItems = localStorage.searchedCities ? JSON.parse(localStorage.getItem('searchedCities')) : [];

/* -------- DISPLAY CITES FROM LOCALSTORAGE IN SIDE NAV --------------- */
const displayRecentlySearchedCities = () => {
  const p = document.createElement('p');
  p.classList.add('py-10');
  p.innerHTML = 'No recently searched city yet!';
  const recentSearches = document.getElementById('recent_searches');
  const cities = localStorage.searchedCities ? JSON.parse(localStorage.getItem('searchedCities')).map((city) => {
    const li = document.createElement('li');
    li.classList.add('loc', 'py-5', 'capitalize', 'cursor-pointer');
    li.innerHTML = city;
    return li;
  }) : [];

  recentSearches.innerHTML = '';
  if (cities.length === 0) {
    recentSearches.append(p);
  } else {
    recentSearches.append(...cities);
  }
};

/* --------------- ADD CITY TO LOCALSTORAGE ------------------------ */
const addCityToLocalStorage = (obj) => {
  if (typeof obj === 'object') {
    oldItems.push(document.getElementById('city_input').value);
    localStorage.setItem('searchedCities', JSON.stringify(oldItems));
  }
  displayRecentlySearchedCities();
  document.getElementById('city_input').value = '';
};

/* ------------- DISPLAY DATA IN UI -------------------- */
const displayData = (obj) => {
  /* console.log(obj); */
  displayInfo(obj);
  if (clicked) {
    addCityToLocalStorage(obj);
    clicked = false;
  }
};

/* -------------GET THE CITY DATA---------------- */
const getCity = () => {
  clicked = true;
  mainD.classList.remove('side-nav');
  const loc = document.getElementById('city_input').value;
  getCityInfo(loc, displayData);
};

/* ----------------CLICKING ON THE SEARCH BUTTON ------------------------------*/
const searchBtn = document.getElementById('search');
searchBtn.addEventListener('click', getCity);

/* ---------------CLICKING ON THE SUGGESTED LOCATIONS -------------------------*/
const suggestedLocation = document.getElementById('recent_searches');
suggestedLocation.addEventListener('click', (e) => {
  if (e.target.classList.contains('loc')) {
    mainD.classList.remove('side-nav');
    const value = e.target.innerHTML;
    getCityInfo(value, displayData);
  }
});

/* --------------------GETTING USER LOCATION ----------------------------------*/
const getLocationByCords = (position) => {
  const lat = position.coords.latitude.toFixed(2);
  const long = position.coords.longitude.toFixed(2);
  getCityInfo('', displayData, lat, long);
};

if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(getLocationByCords);
} else {
  // eslint-disable-next-line no-alert
  alert('Geolocation is not supported by this browser or is disabled.');
}

displayRecentlySearchedCities();
