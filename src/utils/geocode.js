const request = require("request"); // request is used for clients

const geocode = (address, callback) => {
  const mapboxURL =
    `https://api.mapbox.com/geocoding/v5/mapbox.places/` +
    encodeURIComponent(address) +
    `.json?access_token=pk.eyJ1\IjoieXVuYWltZSIsImEiOiJja29ucGVqZnMwMzVoMm9zMnk1NG1xc250In0.gFwc1Z_2SdYULzfxTN2LKg&limit=1`;
  
    console.log(mapboxURL);

  request({ url: mapboxURL, json: true }, (error, {body}) => {
    if (error) {
      callback("Unable to connect to mapbox service!", undefined);
    } else if (body.features.length === 0) {
      callback('Unable to find location. Try another search');
    } else {

      const data = {
        lat: body.features[0].center[1],
        lng: body.features[0].center[0],
        location: body.features[0].place_name
      };
      callback(null, data);
    }
  });
};
module.exports = geocode;