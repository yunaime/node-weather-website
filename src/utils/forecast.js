const request = require("request"); // request is used for clients

const forecast = (lat, lng, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=830ac2e39adcb31168e63364400c90d9&query=${lat},${lng}&units=m`;
    console.log('URL:', url);
    request({ url, json: true }, (error, {body}) => {
      if (error) {
        callback("Unable to connect to weather service!", undefined);
      } else if (body.error) {
        callback('Unable to find location!', undefined);
      } else {
        const current = body.current;
        const data = {
          desc: current.weather_descriptions[0],
          temp: current.temperature,
          feelslike: current.feelslike,
          humidity: current.humidity,
        };
  
        callback(undefined, `It is ${data.desc}.\n It is currently ${data.temp} degress out.\n It feels like ${data.feelslike} degress out.\n The humidity is ${data.humidity}%`);
      }
    });
  }

  module.exports = forecast;