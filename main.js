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
    elementToShow.style.display = "inline";
};
// Funció per rebre l'acudit (GET JOKE) amb funció asincrona i fetch
function getJoke() {
    const carregarAcudit = () => __awaiter(this, void 0, void 0, function* () {
        try {
            // Fem fetch per obtenir un acudit
            let acudits = yield fetch('https://icanhazdadjoke.com/', {
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
            let acuditHTML = document.getElementById('acudit');
            acuditHTML.innerHTML = `<cite>"${acudit}"</cite>`;
            showElement('negativeButton');
            showElement('neutralButton');
            showElement('positiveButton');
        }
        catch (error) {
            console.log(error);
        }
    });
    carregarAcudit();
}
// Funcio per anar guardant puntuacions dels acudits en un array
function scoreButton(score) {
    let report = {
        joke: acudit,
        score: score,
        date: dateToday,
    };
    reportAcudits.push(report);
    console.log(reportAcudits);
    hideElement('negativeButton');
    hideElement('neutralButton');
    hideElement('positiveButton');
}
