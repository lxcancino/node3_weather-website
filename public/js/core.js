console.log('JavaScript for the browser....');

// fetch('http://localhost:3000/weather?address=Leon,Mexico')
//   .then((response) => response.json())
//   .then((json) => {
//     console.log(json);
//   })
//   .catch((reason) => console.error('Err: ', reason));

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#messageOne');
const messageTwo = document.querySelector('#messageTwo');

// messageOne.textContent = ' From JavaScript';

weatherForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  console.log(search.value);
  messageOne.textContent = 'Loading...';
  const res = await fetchForecast(search.value);
  messageOne.textContent = '';
  if (res.error) {
    messageTwo.textContent = res.error;
  } else {
    const { temperature, feelslike, weather_descriptions } = res.forecast;
    messageTwo.textContent = `
      Tem: ${temperature}\n
      Feels like: ${feelslike}\n
      Description: ${weather_descriptions.join(',')}
    `;
    messageOne.textContent = res.location;
  }
  console.log('Forecast: ', res);
});

const fetchForecast = async (address) => {
  const url = `http://localhost:3000/weather?address=${address}`;
  const response = await fetch(url);
  const fc = await response.json();
  return fc;
};
