const request = require("request");

const fetchMyIP = function(callback) {
  const url = "https://api.ipify.org/?format=json";
  request(url,(error,response,body) => {
    if (error) {
      callback(error,null);
      return;
    }
    
    if (response.statusCode !== 200) {
      callback(Error(`Status Code ${response.statusCode} when fetching IP: ${body}`), null);
      return;
    }

    callback(null,JSON.parse(body).ip);


    
  });
};

const fetchCoordByIP = function(ip,callback) {
  const url = `https://ipvigilante.com/json/${ip}`;
  request(url,(error,response,body) => {
    if (error) {
      callback(error,null);
    }
    
    if (response.statusCode !== 200) {
      callback(Error(`Status Code ${response.statusCode} when fetching coordinates for  IP: ${body}`), null);
      return;
    }
    const {latitude,longitude} = JSON.parse(body).data;
    callback(null,{latitude,longitude});


    
  });
};

module.exports = {fetchMyIP,fetchCoordByIP};