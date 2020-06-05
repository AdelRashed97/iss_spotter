const request = require("request-promise-native");

const fetchMYIP = function() {
  const url = "https://api.ipify.org/?format=json";
  return request(url);
};

const fetchCoordByIP = function(body) {
  const ip = JSON.parse(body).ip;
  const url = `https://ipvigilante.com/json/${ip}`;
  return request(url);
}

module.exports = {fetchMYIP,fetchCoordByIP};