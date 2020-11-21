const request = require('request');
const chalk = require('chalk');

const geocode = (address, callback) => {
  const token =
    'pk.eyJ1IjoicmNhbmNpbm8iLCJhIjoiY2tndXZpOW9sMDBxNTJwbXlwdG9xeGhrZCJ9.Li2f42kOnl7gKrxvRII-zA';
  const encodedAddress = encodeURIComponent(address);

  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodedAddress}.json?access_token=${token}`;

  request(url, { json: true }, (err, { body }) => {
    if (err) {
      callback('Unale to conncecto to location services');
    } else {
      const { features } = body;
      if (!features || features.length === 0) {
        callback(chalk.red('No locations found'));
      } else {
        const { center, text } = features[0];
        const [longitud, latitud] = center;
        // console.log(chalk.blue('Feature '), features[0]);
        // console.log(`${text} Long: ${lon}, Lat:${lat}`);
        callback(undefined, { location: text, longitud, latitud });
      }
    }
  });
};

module.exports = geocode;
