// Previne que o formulario seja enviado.
document.querySelector('.busca').addEventListener('submit', async (event) => {
  event.preventDefault();

  let input = document.querySelector('#searchInput').value;

  if (input !== '') {
    clearInfo();
    showWarning('Carregando...');

    let url = `https://api.openweathermap.org/data/2.5/weather?q=${input}&appid=affde090a2369fa1aa0bb81c0b416bc1&units=metric&lang=pt_br`;

    let results = await fetch(url);
    let json = await results.json();

    if (results.ok) {
      // Chama a função para aplicar a classe de fundo com base nas condições climáticas
      changeBackground(json.weather[0].main.toLowerCase());

      showInfo({
        name: json.name,
        country: json.sys.country,
        temp: json.main.temp,
        tempIcon: json.weather[0].icon,
        windSpeed: json.wind.speed,
        windAngle: json.wind.deg
      });
    } else {
      clearInfo();
      showWarning('Não encontramos esta localização.');
    }
  } else {
    clearInfo();
  }
});

function showInfo(json) {
  showWarning('');

  document.querySelector('.resultado').style.display = 'block';

  document.querySelector('.titulo').innerHTML = `${json.name}, ${json.country}`;
  document.querySelector('.tempInfo').innerHTML = `${json.temp} <sup>ºC</sup>`;
  document.querySelector('.ventoInfo').innerHTML = `${json.windSpeed} <span>km/h</span>`;

  document.querySelector('.temp img').setAttribute('src', `http://openweathermap.org/img/wn/${json.tempIcon}@2x.png`);

  document.querySelector('.ventoPonto').style.transform = `rotate(${json.windAngle - 90}deg)`;
}

// Função para alterar o fundo de acordo com o clima
function changeBackground(weatherCondition) {
  const body = document.querySelector('body');

  // Remove qualquer classe de clima anterior
  body.classList = '';

  // Define a classe correta com base nas condições climáticas
  if (weatherCondition.includes('clear')) {
    body.classList.add('clear-weather');
  } else if (weatherCondition.includes('rain')) {
    body.classList.add('rain-weather');
  } else if (weatherCondition.includes('clouds')) {
    body.classList.add('cloudy-weather');
  } else if (weatherCondition.includes('snow')) {
    body.classList.add('snow-weather');
  } else if (weatherCondition.includes('storm')) {
    body.classList.add('storm-weather');
  } else {
    body.classList.add('default-weather');
  }
}

function clearInfo() {
  showWarning('');
  document.querySelector('.resultado').style.display = 'none';
}

function showWarning(msg) {
  document.querySelector('.aviso').innerHTML = msg;
}

