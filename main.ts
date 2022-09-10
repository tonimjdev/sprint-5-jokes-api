// Arxiu Typescript de l'Sprint 5 (Itinerari ANGULAR) de l'alumne Toni Machado
// Guardem data amb format ISO
const d = new Date();
let dateToday:string = d.toISOString();
console.log (dateToday);

// Declarem array pels reports
const reportAcudits: { joke:string; score:number; date:string }[] = [];
// Declarem variable per l'acudit rebut de l'API
let acudit:string="";

// Funció per amagar element del DOM
const hideElement = (idElement:string) => {
    let elementToHide = document.getElementById(idElement) as HTMLElement;
    elementToHide.style.display = "none";
}

// Funció per mostrar element del DOM
const showElement = (idElement:string) => {
    let elementToShow = document.getElementById(idElement) as HTMLElement;
    elementToShow.style.display = "inline";
}


// Funció per rebre l'acudit (GET JOKE) amb funció asincrona i fetch
function getJoke() {
    const carregarAcudit = async() => {
        try {
            // Fem fetch per obtenir un acudit
        let acudits = await fetch('https://icanhazdadjoke.com/', {
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
        let acuditHTML = document.getElementById('acudit') as HTMLElement;
        acuditHTML.innerHTML = `<cite>"${acudit}"</cite>`;
        showElement('negativeButton');
        showElement('neutralButton');
        showElement('positiveButton');
    } catch(error) {
        console.log(error);
    }
}
carregarAcudit();
}
// Funcio per anar guardant puntuacions dels acudits en un array
function scoreButton(score:number) {
    let report = {
        joke: acudit,
        score: score,
        date: dateToday,
    }
    reportAcudits.push(report);
    console.log(reportAcudits);
    hideElement('negativeButton');
    hideElement('neutralButton');
    hideElement('positiveButton');
}


