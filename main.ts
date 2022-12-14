// Arxiu Typescript de l'Sprint 5 (Itinerari ANGULAR) de l'alumne Toni Machado
// Guardem data amb format ISO
const d = new Date();
let dateToday: string = d.toISOString();
console.log(dateToday);

// Declarem array pels reports
const reportAcudits: { joke: string; score: number; date: string }[] = [];
// Declarem variable per l'acudit rebut de l'API
let acudit: string = "";

// Funci贸 per amagar element del DOM
const hideElement = (idElement: string) => {
  let elementToHide = document.getElementById(idElement) as HTMLElement;
  elementToHide.style.display = "none";
};

// Funci贸 per mostrar element del DOM
const showElement = (idElement: string) => {
  let elementToShow = document.getElementById(idElement) as HTMLElement;
  elementToShow.style.display = "flex";
};

// Funci贸 per obtenir les dades del temps de la API triada
const getWeather = async () => {
  let meteoTemp, meteoIcone;
  try {
    const apiKey = "30be32c1cccd41eb93460a6f3a889fbb"; // Shhht馃か
    const apiLang = "es";
    const apiLatLon = "lat=41.396604&lon=2.159511"; // Localitzaci贸: Gr脿cia (Barcelona)
    let temps = await fetch(`https://api.weatherbit.io/v2.0/current?key=${apiKey}&${apiLatLon}&lang=${apiLang}`);
    let dades = await temps.json();
    // Check dades API
    console.log("Dades meteo", dades);
    meteoTemp = dades.data[0].app_temp;
    meteoIcone = dades.data[0].weather.icon;
    // Check
    console.log("Temperatura: ", meteoTemp, "潞C");
    console.log("Code: ", meteoIcone);
  } catch (error) {
    console.log(error);
  }
  // Mostrem l'icone del temps pel DOM mitjan莽ant el codi que ens retorna l'API
  let iconeTemp = document.getElementById("icone") as HTMLImageElement;
  iconeTemp.src = `https://www.weatherbit.io/static/img/icons/${meteoIcone}.png`;
  // Mostrem la temperatura tornada
  let temperatura = document.getElementById("meteo") as HTMLElement;
  temperatura.innerHTML = `${meteoTemp} 潞C`;
};
// Cridem a funci贸 per obtenir temps actual
getWeather();

// Funci贸 per triar aleatoriament les formes dels blobs
const getBlobs = () => {
  // Calculem numeros aleatoriament entre 1 i 6
  let random1 = Math.floor(Math.random() * (6 - 1) + 1);
  let random2 = Math.floor(Math.random() * (6 - 1) + 1);
  let random3 = Math.floor(Math.random() * (6 - 1) + 1);
  // Enviem al DOM l'arxiu triat segons random
  let blobGran = document.getElementById("main") as HTMLElement;
  let blobUp = document.getElementById("blobUp") as HTMLElement;
  let blobDown = document.getElementById("blobDown") as HTMLElement;
  blobGran.style.backgroundImage = `url(./svg/blob${random1}.svg)`;
  blobUp.style.backgroundImage = `url(./svg/blob${random2}.svg)`;
  blobDown.style.backgroundImage = `url(./svg/blob${random3}.svg)`;
};
// Cridem funci贸 per obtenir formes aleatories dels blobs
getBlobs();

// Funci贸 per rebre l'acudit (GET JOKE) amb funci贸 asincrona i fetch
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
    showElement("faces");
  } catch (error) {
    console.log(error);
  }
};

// Funci贸 per rebre l'acudit de la API Chuck Norris ^^
const getChuck = async () => {
  try {
    let acuditsChuck = await fetch("https://api.chucknorris.io/jokes/random");
    let datos = await acuditsChuck.json();
    // Check resposta
    console.log(datos);
    // Extraiem acudit
    acudit = datos.value;
    // Mostrem per pantalla
    let acuditHTML = document.getElementById("acudit") as HTMLElement;
    acuditHTML.innerHTML = `<cite>"${acudit}"</cite>`;
    showElement("faces");
  } catch (error) {
    console.log(error);
  }
};
// Funci贸 per triar acudit aleatoriament
const getAcudit = () => {
  let randomAcudit = Math.floor(Math.random() * 10);
  randomAcudit >= 5 ? getJoke() : getChuck();
  getBlobs();
  showElement("faces");
  let nextHTML = document.getElementById("next") as HTMLElement;
  nextHTML.innerHTML = "Seg眉ent Acudit";
};
// Funci贸 per anar guardant puntuacions dels acudits en un array
const scoreButton = (score: number) => {
  let report = {
    joke: acudit,
    score: score,
    date: dateToday,
  };
  reportAcudits.push(report);
  // Mostrem l'array dels Reports per consola
  console.log(reportAcudits);
  // Un cop s'ha votat amaguem els smiley
  hideElement("faces");
};
