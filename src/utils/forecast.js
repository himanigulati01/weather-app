const request = require("request");

const forecast = (latitude, longitute, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=857ae11be83b2f2af29b1280f4169aba&query=${encodeURIComponent(
    latitude,
    longitute
  )}`;
  request({ url: url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect with waether stack", null);
    } else if (body.success === false) {
      callback(body.error.info, null);
    } else {
      callback(
        null,
        `${body.current.weather_descriptions[0]}. There is ${body.current.temperature} degrees out. It feels like ${body.current.feelslike} degrees out. The humidity is ${body.current.humidity}%.`
      );
    }
  });
};

module.exports = forecast;
