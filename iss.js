const request = require('request');

const fetchMyIP = (callback) => {
  request("https://api.ipify.org?format=json", (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }

    // if non-200 status, assume server error
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(error, null);
      return;
    }

    // if we get here, all's well and we got the data

    const data = JSON.parse(body).ip;
    if (data.length === 0) {
      callback(error, null);
    }
    callback(null, data);
  });
  // use request to fetch IP address from JSON API
};

const fetchCoordsByIP = (ip, callback) => {
  request(`http://ipwho.is/${ip}`, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }
    if (response.statusCode !== 200) {
      callback(error, null);
      return;
    }
    const lat = JSON.parse(body);
    const coordinates = {
      latitude: lat.latitude,
      longitude: lat.longitude
    };
    callback(null, coordinates);
  });
};

const fetchISSFlyOverTimes = (coordinates, callback) => {
  let url = `https://iss-flyover.herokuapp.com/json/?lat=${coordinates.latitude}&lon=${coordinates.longitude}`;

  request(url, (error, response, body) => {
    if (error) {
      callback(error, null);
    }
    if (response.statusCode !== 200) {
      callback(error, null);
    }
    const result = JSON.parse(body).response;
    callback(null, result);

  });
};

/**
 * Orchestrates multiple API requests in order to determine the next 5 upcoming ISS fly overs for the user's current location.
 * Input:
 *   - A callback with an error or results. 
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The fly-over times as an array (null if error):
 *     [ { risetime: <number>, duration: <number> }, ... ]
 */ 
 const nextISSTimesForMyLocation = (callback) => {
  fetchMyIP((error, ip) => {
    if (error) {
      callback(error, null);
    return;
    }
    fetchCoordsByIP(ip, (error, lat) => {
      if (error) {
        callback(error, null);
        return;
      }
      fetchISSFlyOverTimes(lat, (error, result) => {
        if (error) {
          callback(error, null);
          return;
        }
        callback(null, result);
      });
    });
  });
};

module.exports = {
  fetchMyIP,
  fetchCoordsByIP,
  fetchISSFlyOverTimes,
  nextISSTimesForMyLocation,
};