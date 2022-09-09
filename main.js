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
            let acudits = yield fetch('https://icanhazdadjoke.com/', {
                headers: {
                    Accept: "application/json",
                },
            });
            let datos = yield acudits.json();
            let acudit = datos.joke;
            let acuditHTML = document.getElementById('acudit');
            acuditHTML.innerHTML = `<cite>"${acudit}"</cite>`;
            console.log(acudits);
        }
        catch (error) {
            console.log(error);
        }
    });
    carregarAcudit();
}
