// Arxiu Typescript de l'Sprint 5 (Itinerari ANGULAR) de l'alumne Toni Machado

function getJoke() {
    const carregarAcudit = async() => {
        try {
        let acudits = await fetch('https://icanhazdadjoke.com/', {
            headers: {
                Accept: "application/json",
            },
        });
        let datos = await acudits.json();
        let acudit = datos.joke;
        let acuditHTML = document.getElementById('acudit') as HTMLElement;
        acuditHTML.innerHTML = `<cite>"${acudit}"</cite>`;
        console.log(acudits);

    } catch(error) {
        console.log(error);
    }
}
carregarAcudit();
}