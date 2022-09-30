// index.js
const request = require('request');
const {fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes, nextISSTimesForMyLocation } = require('./iss');



// fetchMyIP((error, ip) => {
//   if (error) {
//     console.log("It didn't work!" , error);
//     return;
//   }

//   console.log('It worked! Returned IP:' , ip);
 
//   fetchCoordsByIP(ip, (error, lat) => {
//     if (error) {
//       console.log("It didn't work! Error: Success status was false. Server message says:", error);
//       return;
//     }
  
//     console.log("It worked! we got latitude & longitude", lat);

//     fetchISSFlyOverTimes(lat, (error, result) => {
//       if (error) {
//         console.log("It didn't work!", error);
//         return;
//       }

//       console.log("It worked!" , result);

      nextISSTimesForMyLocation((error, finals) => {
        if (error) {
          console.log("didnt' work but it was close:", error);
        }

        for(const final of finals) {
          const date = new Date(0);
          date.setUTCSeconds(final.risetime);
          console.log(`Next pass at ${date} for ${final.duration} secs`);
        }
      });
//     });
//   });
// });
