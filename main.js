"use strict";
// Arxiu Typescript de l'Sprint 5 (Itinerari ANGULAR) de l'alumne Toni Machado
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
            let acudit = datos.joke;
            // Mostrem per pantalla
            let acuditHTML = document.getElementById('acudit');
            acuditHTML.innerHTML = `<cite>"${acudit}"</cite>`;
        }
        catch (error) {
            console.log(error);
        }
    });
    carregarAcudit();
}
