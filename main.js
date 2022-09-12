"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// Arxiu Typescript de l'Sprint 5 (Itinerari ANGULAR) de l'alumne Toni Machado
// Guardem data amb format ISO
const d = new Date();
let dateToday = d.toISOString();
console.log(dateToday);
// Declarem array pels reports
const reportAcudits = [];
// Declarem variable per l'acudit rebut de l'API
let acudit = "";
// Funció per amagar element del DOM
const hideElement = (idElement) => {
    let elementToHide = document.getElementById(idElement);
    elementToHide.style.display = "none";
};
// Funció per mostrar element del DOM
const showElement = (idElement) => {
    let elementToShow = document.getElementById(idElement);
    elementToShow.style.display = "flex";
};
// Funció per obtenir les dades del temps de la API triada
const getWeather = () => __awaiter(void 0, void 0, void 0, function* () {
    let meteoTemp, meteoIcone;
    try {
        const apiKey = "30be32c1cccd41eb93460a6f3a889fbb"; // Shhht🤫
        const apiLang = "es";
        const apiLatLon = "lat=41.396604&lon=2.159511"; // Localització: Gràcia (Barcelona)
        let temps = yield fetch(`https://api.weatherbit.io/v2.0/current?key=${apiKey}&${apiLatLon}&lang=${apiLang}`);
        let dades = yield temps.json();
        // Check dades API
        console.log("Dades meteo", dades);
        meteoTemp = dades.data[0].app_temp;
        meteoIcone = dades.data[0].weather.icon;
        // Check
        console.log("Temperatura: ", meteoTemp, "ºC");
        console.log("Code: ", meteoIcone);
    }
    catch (error) {
        console.log(error);
    }
    // Mostrem l'icone del temps pel DOM mitjançant el codi que ens retorna l'API
    let iconeTemp = document.getElementById("icone");
    iconeTemp.src = `https://www.weatherbit.io/static/img/icons/${meteoIcone}.png`;
    // Mostrem la temperatura tornada
    let temperatura = document.getElementById("meteo");
    temperatura.innerHTML = `${meteoTemp} ºC`;
});
// Cridem a funció per obtenir temps actual
getWeather();
// Funció per triar aleatoriament les formes dels blobs
const getBlobs = () => {
    // Calculem numeros aleatoriament entre 1 i 6
    let random1 = Math.floor(Math.random() * (6 - 1) + 1);
    let random2 = Math.floor(Math.random() * (6 - 1) + 1);
    let random3 = Math.floor(Math.random() * (6 - 1) + 1);
    // Enviem al DOM l'arxiu triat segons random
    let blobGran = document.getElementById("main");
    let blobUp = document.getElementById("blobUp");
    let blobDown = document.getElementById("blobDown");
    blobGran.style.backgroundImage = `url(./svg/blob${random1}.svg)`;
    blobUp.style.backgroundImage = `url(./svg/blob${random2}.svg)`;
    blobDown.style.backgroundImage = `url(./svg/blob${random3}.svg)`;
};
// Cridem funció per obtenir formes aleatories dels blobs
getBlobs();
// Funció per rebre l'acudit (GET JOKE) amb funció asincrona i fetch
const getJoke = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Fem fetch per obtenir un acudit
        let acudits = yield fetch("https://icanhazdadjoke.com/", {
            headers: {
                // Per obtenir les dades en format json
                Accept: "application/json",
            },
        });
        let datos = yield acudits.json();
        // Check resposta
        console.log(datos);
        // Extraiem acudit
        acudit = datos.joke;
        // Mostrem per pantalla
        let acuditHTML = document.getElementById("acudit");
        acuditHTML.innerHTML = `<cite>"${acudit}"</cite>`;
        showElement("faces");
    }
    catch (error) {
        console.log(error);
    }
});
// Funció per rebre l'acudit de la API Chuck Norris ^^
const getChuck = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let acuditsChuck = yield fetch("https://api.chucknorris.io/jokes/random");
        let datos = yield acuditsChuck.json();
        // Check resposta
        console.log(datos);
        // Extraiem acudit
        acudit = datos.value;
        // Mostrem per pantalla
        let acuditHTML = document.getElementById("acudit");
        acuditHTML.innerHTML = `<cite>"${acudit}"</cite>`;
        showElement("faces");
    }
    catch (error) {
        console.log(error);
    }
});
// Funció per triar acudit aleatoriament
const getAcudit = () => {
    let randomAcudit = Math.floor(Math.random() * 10);
    randomAcudit >= 5 ? getJoke() : getChuck();
    getBlobs();
    showElement("faces");
    let nextHTML = document.getElementById("next");
    nextHTML.innerHTML = "Següent Acudit";
};
// Funció per anar guardant puntuacions dels acudits en un array
const scoreButton = (score) => {
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
