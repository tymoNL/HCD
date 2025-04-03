document.addEventListener("DOMContentLoaded", function () {
    loadAnnotations(); // Laad opgeslagen annotaties bij het openen van de pagina
});

// Voeg class en toegankelijkheidsattributen toe aan alle paragrafen
document.querySelectorAll('p').forEach((p, index) => {
    p.setAttribute('tabindex', 0);
    p.classList.add('paragraph');
    p.setAttribute('role', 'button');
    p.setAttribute('aria-label', 'Druk op Enter of Spatie om een annotatie toe te voegen.');

    // Voeg een unieke ID toe aan elke paragraaf
    p.dataset.id = index;
});

// Voeg eventlistener toe voor toetsenbord interactie
document.querySelectorAll('p.paragraph').forEach((p) => {
    p.addEventListener("keydown", function (event) {
        if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            openAnnotationBox(p);
        }
    });
});

// Functie om annotatiebox te openen
function openAnnotationBox(p) {
    document.querySelectorAll('.annotation-box').forEach(box => box.remove());

    let annotationBox = document.createElement("section");
    annotationBox.classList.add("annotation-box");
    annotationBox.setAttribute('role', 'dialog');
    annotationBox.setAttribute('aria-label', 'Annotatie invoeren');

    annotationBox.innerHTML = `
        <h2>Annotation</h2>
        <p>Voer hieronder de <b>annotatie</b> in</p>
        <textarea rows="4" cols="50" class="annotationText" placeholder="Voer hier je annotatie in..."></textarea>
        <button class="save-button">Opslaan</button>
        <button class="close-button">Sluiten</button>
    `;

    p.after(annotationBox);
    annotationBox.querySelector('.annotationText').focus();

    // Opslaan van annotatie
    annotationBox.querySelector('.save-button').addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
            saveAnnotation(annotationBox, p);
        }
    });

    // Sluiten van annotatiebox
    annotationBox.querySelector('.close-button').addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
            annotationBox.remove();
            p.focus();
        }
    });
}

// Functie om annotatie op te slaan
function saveAnnotation(annotationBox, p) {
    let annotationText = annotationBox.querySelector('.annotationText').value;
    let paragraphId = p.dataset.id;

    if (annotationText.trim() !== "") {
        let annotation = document.createElement("p");
        annotation.classList.add("annotation");
        annotation.setAttribute('tabindex', 0);
        annotation.setAttribute('role', 'note');
        annotation.innerText = annotationText;
        annotation.setAttribute('aria-live', 'polite');
        p.after(annotation);

        // Sla annotatie op in localStorage
        saveToLocalStorage(paragraphId, annotationText);
    }

    annotationBox.remove();
}

// Functie om annotaties op te slaan in localStorage
function saveToLocalStorage(paragraphId, annotationText) {
    let annotations = JSON.parse(localStorage.getItem("annotations")) || {};
    annotations[paragraphId] = annotationText;
    localStorage.setItem("annotations", JSON.stringify(annotations));
}

// Functie om annotaties te laden bij het openen van de pagina
function loadAnnotations() {
    let annotations = JSON.parse(localStorage.getItem("annotations")) || {};

    document.querySelectorAll('p.paragraph').forEach((p) => {
        let paragraphId = p.dataset.id;
        if (annotations[paragraphId]) {
            let annotation = document.createElement("p");
            annotation.classList.add("annotation");
            annotation.setAttribute('tabindex', 0);
            annotation.setAttribute('role', 'note');
            annotation.innerText = annotations[paragraphId];
            annotation.setAttribute('aria-live', 'polite');
            p.after(annotation);
        }
    });
}
