// Arxiu Typescript de l'Sprint 5 (Itinerari ANGULAR) de l'alumne Toni Machado

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
        let acudit = datos.joke;
        // Mostrem per pantalla
        let acuditHTML = document.getElementById('acudit') as HTMLElement;
        acuditHTML.innerHTML = `<cite>"${acudit}"</cite>`;
    } catch(error) {
        console.log(error);
    }
}
carregarAcudit();
}