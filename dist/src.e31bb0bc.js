// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"../node_modules/parcel-bundler/src/builtins/bundle-url.js":[function(require,module,exports) {
var bundleURL = null;

function getBundleURLCached() {
  if (!bundleURL) {
    bundleURL = getBundleURL();
  }

  return bundleURL;
}

function getBundleURL() {
  // Attempt to find the URL of the current script and use that as the base URL
  try {
    throw new Error();
  } catch (err) {
    var matches = ('' + err.stack).match(/(https?|file|ftp|chrome-extension|moz-extension):\/\/[^)\n]+/g);

    if (matches) {
      return getBaseURL(matches[0]);
    }
  }

  return '/';
}

function getBaseURL(url) {
  return ('' + url).replace(/^((?:https?|file|ftp|chrome-extension|moz-extension):\/\/.+)\/[^/]+$/, '$1') + '/';
}

exports.getBundleURL = getBundleURLCached;
exports.getBaseURL = getBaseURL;
},{}],"../node_modules/parcel-bundler/src/builtins/css-loader.js":[function(require,module,exports) {
var bundle = require('./bundle-url');

function updateLink(link) {
  var newLink = link.cloneNode();

  newLink.onload = function () {
    link.remove();
  };

  newLink.href = link.href.split('?')[0] + '?' + Date.now();
  link.parentNode.insertBefore(newLink, link.nextSibling);
}

var cssTimeout = null;

function reloadCSS() {
  if (cssTimeout) {
    return;
  }

  cssTimeout = setTimeout(function () {
    var links = document.querySelectorAll('link[rel="stylesheet"]');

    for (var i = 0; i < links.length; i++) {
      if (bundle.getBaseURL(links[i].href) === bundle.getBundleURL()) {
        updateLink(links[i]);
      }
    }

    cssTimeout = null;
  }, 50);
}

module.exports = reloadCSS;
},{"./bundle-url":"../node_modules/parcel-bundler/src/builtins/bundle-url.js"}],"styles/main.css":[function(require,module,exports) {
var reloadCSS = require('_css_loader');

module.hot.dispose(reloadCSS);
module.hot.accept(reloadCSS);
},{"_css_loader":"../node_modules/parcel-bundler/src/builtins/css-loader.js"}],"js/getWeather.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var API_KEY = 'b8aa6b77e85dc3ac3f6db7694ca0e9ea';
/* `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&
    exclude=minutely&appid=${API_KEY}&units=metric` */

var getCityData = function getCityData() {
  var city = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  var lat = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 9.08;
  var long = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 8.68;
  var url;

  if (city !== '') {
    url = "//api.openweathermap.org/data/2.5/weather?q=".concat(city, "&appid=").concat(API_KEY, "&units=metric");
  } else {
    url = "https://api.openweathermap.org/data/2.5/onecall?lat=".concat(lat, "&lon=").concat(long, "&\n    exclude=minutely&appid=").concat(API_KEY, "&units=metric");
  }

  return new Promise(function (res, err) {
    fetch(url).then(function (response) {
      return response.json();
    }).then(res).catch(err);
  });
};

var getCityInfo = function getCityInfo(city, displayData, lat, long) {
  getCityData(city, lat, long).then(displayData).catch(function (err) {
    // eslint-disable-next-line no-console
    console.log(err, 'City not Found!!!');
  });
};

var _default = getCityInfo;
exports.default = _default;
},{}],"js/displayInfo.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var displayTime = function displayTime(time) {
  var dateArr = ['Sun', 'Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat'];
  var monthArr = ['Jan.', 'Feb.', 'Mar.', 'Apr.', 'May', 'Jun.', 'July', 'Aug.', 'Sept.', 'Oct.', 'Nov.', 'Dec.'];
  var hr = time.getHours();
  var mins = time.getMinutes();
  var day = dateArr[time.getDay()];
  var date = time.getDate();
  var month = monthArr[time.getDay()];
  var yr = time.getFullYear();
  document.getElementById('date').innerHTML = "".concat(hr, ":").concat(mins, " - ").concat(day, ", ").concat(date, " ").concat(month, " ").concat(yr);
};

var calcTime = function calcTime(tZone) {
  // offset in hours
  var offset = tZone / 3600; // create Date object for current location

  var d = new Date(); // convert to msec
  // add local time zone offset
  // get UTC time in msec

  var utc = d.getTime() + d.getTimezoneOffset() * 60000; // create new Date object for different city
  // using supplied offset

  var nd = new Date(utc + 3600000 * offset);
  displayTime(nd);
};

var displayInfo = function displayInfo(obj) {
  document.getElementById('deg').innerHTML = "".concat(Math.round(obj.main.temp), "<sup class=\"text-sm font-light\">0</sup>");
  document.getElementById('location').innerHTML = obj.name;
  var weatherIcon = document.createElement('img');
  weatherIcon.setAttribute('src', "http://openweathermap.org/img/wn/".concat(obj.weather[0].icon, ".png"));
  weatherIcon.setAttribute('height', '35px');
  weatherIcon.setAttribute('width', '35px');
  var weatherDescription = document.createElement('span');
  weatherDescription.innerHTML = "".concat(obj.weather[0].description);
  document.getElementById('weather_cont').innerHTML = '';
  document.getElementById('weather_cont').innerHTML = '';
  document.getElementById('weather_cont').append(weatherIcon);
  document.getElementById('weather_cont').append(weatherDescription);
  document.getElementById('cloudy').innerHTML = "".concat(obj.clouds.all, "%");
  document.getElementById('humidity').innerHTML = "".concat(obj.main.humidity, "%");
  document.getElementById('wind').innerHTML = "".concat(obj.wind.speed, "km/h");
  calcTime(obj.timezone);
};

var _default = displayInfo;
exports.default = _default;
},{}],"index.js":[function(require,module,exports) {
"use strict";

require("./styles/main.css");

var _getWeather = _interopRequireDefault(require("./js/getWeather"));

var _displayInfo = _interopRequireDefault(require("./js/displayInfo"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var mainD = document.getElementById('main-details');
var clicked = false;
var oldItems = localStorage.searchedCities ? JSON.parse(localStorage.getItem('searchedCities')) : [];
/* -------- DISPLAY CITES FROM LOCALSTORAGE IN SIDE NAV --------------- */

var displayRecentlySearchedCities = function displayRecentlySearchedCities() {
  var p = document.createElement('p');
  p.classList.add('py-10');
  p.innerHTML = 'No recently searched city yet!';
  var recentSearches = document.getElementById('recent_searches');
  var cities = localStorage.searchedCities ? JSON.parse(localStorage.getItem('searchedCities')).map(function (city) {
    var li = document.createElement('li');
    li.classList.add('loc', 'py-5', 'capitalize', 'cursor-pointer');
    li.innerHTML = city;
    return li;
  }) : [];
  recentSearches.innerHTML = '';

  if (cities.length === 0) {
    recentSearches.append(p);
  } else {
    recentSearches.append.apply(recentSearches, _toConsumableArray(cities));
  }
};
/* --------------- ADD CITY TO LOCALSTORAGE ------------------------ */


var addCityToLocalStorage = function addCityToLocalStorage(obj) {
  if (_typeof(obj) === 'object') {
    oldItems.push(document.getElementById('city_input').value);
    localStorage.setItem('searchedCities', JSON.stringify(oldItems));
  }

  displayRecentlySearchedCities();
  document.getElementById('city_input').value = '';
};
/* ------------- DISPLAY DATA IN UI -------------------- */


var displayData = function displayData(obj) {
  /* console.log(obj); */
  (0, _displayInfo.default)(obj);

  if (clicked) {
    addCityToLocalStorage(obj);
    clicked = false;
  }
};
/* -------------GET THE CITY DATA---------------- */


var getCity = function getCity() {
  clicked = true;
  mainD.classList.remove('side-nav');
  var loc = document.getElementById('city_input').value;
  (0, _getWeather.default)(loc, displayData);
};
/* ----------------CLICKING ON THE SEARCH BUTTON ------------------------------*/


var searchBtn = document.getElementById('search');
searchBtn.addEventListener('click', getCity);
/* ---------------CLICKING ON THE SUGGESTED LOCATIONS -------------------------*/

var suggestedLocation = document.getElementById('recent_searches');
suggestedLocation.addEventListener('click', function (e) {
  if (e.target.classList.contains('loc')) {
    mainD.classList.remove('side-nav');
    var value = e.target.innerHTML;
    (0, _getWeather.default)(value, displayData);
  }
});
/* --------------------GETTING USER LOCATION ----------------------------------*/

var getLocationByCords = function getLocationByCords(position) {
  var lat = position.coords.latitude.toFixed(2);
  var long = position.coords.longitude.toFixed(2);
  (0, _getWeather.default)('', displayData, lat, long);
};

if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(getLocationByCords);
} else {
  // eslint-disable-next-line no-alert
  alert('Geolocation is not supported by this browser or is disabled.');
}

displayRecentlySearchedCities();
},{"./styles/main.css":"styles/main.css","./js/getWeather":"js/getWeather.js","./js/displayInfo":"js/displayInfo.js"}],"../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "53188" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","index.js"], null)
//# sourceMappingURL=/src.e31bb0bc.js.map