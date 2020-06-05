const request = require("request-promise-native");

const fetchMYIP = function() {
  const url = "https://api.ipify.org/?format=json";
  return request(url);
};

module.exports = {fetchMYIP};