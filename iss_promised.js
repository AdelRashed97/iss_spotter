const request = require("request-promise-native");

const fetchMYIP = function() {
  const url = "https://api.ipify.org/?format=json";
  return request(url);
};

const fetchCoordByIP = function(body) {
  const ip = JSON.parse(body).ip;
  const url = `https://ipvigilante.com/json/${ip}`;
  return request(url);
};



const fetchISSFlyOverTimes = function(body) {
  const {latitude,longitude} = JSON.parse(body).data;
  const url = `http://api.open-notify.org/iss-pass.json?lat=${latitude}&lon=${longitude}`;
  return request(url);

};

const nextISSTimesForMyLocation = function() {
  return fetchMYIP()
    .then(fetchCoordByIP)
    .then(fetchISSFlyOverTimes)
    .then((data) => {
      const { response } = JSON.parse(data);
      return response;
    });
  

}

module.exports = {nextISSTimesForMyLocation};