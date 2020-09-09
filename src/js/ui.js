/* ------------------ FOR MOBILE TOGGLE BUTTON-------------- */
const mainD = document.getElementById('main-details');
const toggleBtn = document.querySelectorAll('.toggle');
toggleBtn.forEach((btn) => {
  btn.addEventListener('click', (e) => {
    if (e.target === btn) {
      mainD.classList.add('side-nav');
    } else {
      mainD.classList.remove('side-nav');
    }
  });
});

const mainWeatherInfo = document.getElementById('main_weather-info');
mainWeatherInfo.addEventListener('click', (e) => {
  if (e.target === mainWeatherInfo) {
    mainD.classList.remove('side-nav');
  }
});

/* MORE WEATHER DETAILS */
const moreInfoCont = document.getElementById('more_info_cont');
const pushUpBtn = document.getElementById('push_up');
pushUpBtn.addEventListener('click', () => {
  moreInfoCont.classList.toggle('expand');
  pushUpBtn.classList.toggle('rotate');
  console.log('clicked');
});
