let annotationBoxHTML = `
    <h2>Annotation</h2>
    <p>Voer hieronder de <b>annotatie</b> in</p>

    <textarea rows="4" cols="50" placeholder="Voer hier je annotatie in..."></textarea>
    <button class="save-button">Opslaan</button>
    <button class="delete-button">Verwijderen</button>

    <button class="close-button">Sluiten</button>
`;

let annotationBox = document.createElement("section");

annotationBox.classList.add("annotation-box");
annotationBox.innerHTML = annotationBoxHTML;


document.querySelectorAll('p').forEach((p) => {
    // Set the paragraph to be focusable
    p.setAttribute('tabindex', 0);

    // Add a click event listener to all paragraphs
    p.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {

            // Add the annotation box after the pressed paragraph
            p.after(annotationBox);

            document.querySelectorAll('.close-button').forEach((button) => {
                button.addEventListener("click", function () {
                    // Remove the annotation box from the DOM
                    button.parentElement.remove();
                });
            });
        }
    });
});

