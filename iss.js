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
      return;
    }
    
    if (response.statusCode !== 200) {
      callback(Error(`Status Code ${response.statusCode} when fetching coordinates for  IP: ${body}`), null);
      return;
    }
    const {latitude,longitude} = JSON.parse(body).data;
    callback(null,{latitude,longitude});


    
  });
};

const fetchISSFlyOverTimes = function(coords,callback) {
  const {latitude,longitude} = coords;
  const url = `http://api.open-notify.org/iss-pass.json?lat=${latitude}&lon=${longitude}`;
  request(url,(error,response,body) => {
    if (error) {
      callback(error,null);
      return;
    }
    
    if (response.statusCode !== 200) {
      callback(Error(`Status Code ${response.statusCode} when fetching coordinates for  IP: ${body}`), null);
      return;
    }
    const flyOverTimes = JSON.parse(body).response;
    callback(null,flyOverTimes);


    
  });

};

const nextISSTimesForMyLocation = function(callback) {
  fetchMyIP((error, ip) => {
    if (error) {
      callback(error,null);
      return;
    }

    fetchCoordByIP(ip,(error, coords) => {
      if (error) {
        callback(error,null);
        return;
      }
      
      fetchISSFlyOverTimes(coords,(error, flyTimes) => {
        if (error) {
          callback(error,null);
          return;
        }
      
        callback(null,flyTimes);
      });



    });
  });


  
};

//module.exports = {fetchMyIP,fetchCoordByIP,fetchISSFlyOverTimes};
module.exports = {nextISSTimesForMyLocation};
