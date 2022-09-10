// Arxiu Typescript de l'Sprint 5 (Itinerari ANGULAR) de l'alumne Toni Machado
// Guardem data amb format ISO
const d = new Date();
let dateToday: string = d.toISOString();
console.log(dateToday);

// Declarem array pels reports
const reportAcudits: { joke: string; score: number; date: string }[] = [];
// Declarem variable per l'acudit rebut de l'API
let acudit: string = "";

// Funció per amagar element del DOM
const hideElement = (idElement: string) => {
  let elementToHide = document.getElementById(idElement) as HTMLElement;
  elementToHide.style.display = "none";
};

// Funció per mostrar element del DOM
const showElement = (idElement: string) => {
  let elementToShow = document.getElementById(idElement) as HTMLElement;
  elementToShow.style.display = "inline";
};

// Funció per obtenir les dades del temps de la API triada
const getWeather = async () => {
  let meteoTemp, meteoIcone;
  try {
    const apiKey = "30be32c1cccd41eb93460a6f3a889fbb"; // Shhht🤫
    const apiLang = "es";
    const apiLatLon = "lat=41.396604&lon=2.159511"; // Localització: Gràcia (Barcelona)
    let temps = await fetch(`https://api.weatherbit.io/v2.0/current?key=${apiKey}&${apiLatLon}&lang=${apiLang}`);
    let dades = await temps.json();
    // Check dades API
    console.log("Dades meteo", dades);
    meteoTemp = dades.data[0].app_temp;
    meteoIcone = dades.data[0].weather.icon;
    console.log("Temperatura: ", meteoTemp, "ºC");
    console.log("Code: ", meteoIcone);
  } catch (error) {
    console.log(error);
  }
  let iconeTemp = document.getElementById("icone") as HTMLImageElement;
  iconeTemp.src = `https://www.weatherbit.io/static/img/icons/${meteoIcone}.png`;

  let temperatura = document.getElementById("meteo") as HTMLElement;
  temperatura.innerHTML = `${meteoTemp} ºC`;
};
getWeather();

// Funció per rebre l'acudit (GET JOKE) amb funció asincrona i fetch
const getJoke = async () => {
  try {
    // Fem fetch per obtenir un acudit
    let acudits = await fetch("https://icanhazdadjoke.com/", {
      headers: {
        // Per obtenir les dades en format json
        Accept: "application/json",
      },
    });
    let datos = await acudits.json();
    // Check resposta
    console.log(datos);
    // Extraiem acudit
    acudit = datos.joke;
    // Mostrem per pantalla
    let acuditHTML = document.getElementById("acudit") as HTMLElement;
    acuditHTML.innerHTML = `<cite>"${acudit}"</cite>`;
    showElement("negativeButton");
    showElement("neutralButton");
    showElement("positiveButton");
  } catch (error) {
    console.log(error);
  }
};

// Funcio per anar guardant puntuacions dels acudits en un array
function scoreButton(score: number) {
  let report = {
    joke: acudit,
    score: score,
    date: dateToday,
  };
  reportAcudits.push(report);
  console.log(reportAcudits);
  hideElement("negativeButton");
  hideElement("neutralButton");
  hideElement("positiveButton");
}
