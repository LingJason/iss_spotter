const { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes, nextISSTimesForMyLocation } = require('./iss_promised');

nextISSTimesForMyLocation()
  .then((result) => {
    console.log(result);
  })
  .catch((error) => {
    console.log("It didn't work: ", error.message);
  });

// fetchMyIP()
//   .then(fetchCoordsByIP)
//   .then(fetchISSFlyOverTimes)
//   .then(body => console.log(body));