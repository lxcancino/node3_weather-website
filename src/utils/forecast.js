const request = require('request');
const chalk = require('chalk');

const forecast = (lat, long, callback) => {
  const ws_key = '9ba0dcd4e6fc59d4472ea94577c45be3';
  const term = `${lat},${long}`;
  const url = `http://api.weatherstack.com/current?access_key=${ws_key}&query=${term}`;
  request(url, { json: true }, (err, { body }) => {
    if (err) {
      callback(chalk.red.inverse('Unable to connect to weather servcies'));
    } else {
      const data = body;
      if (data.error) {
        const { info } = data.error;
        console.log(chalk.red(info));
        callback(chalk.red('Unable to find location'));
      } else {
        const { temperature, feelslike, weather_descriptions } = data.current;
        callback(undefined, { temperature, feelslike, weather_descriptions });
        // console.log(
        //   chalk`{yellow ${weather_descriptions[0]}} Is currently {red ${temperature}} degrees out. It feels like {green ${feelslike}} degrees outs`
        // );
      }
    }
  });
};

module.exports = forecast;
