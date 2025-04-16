// Counter for unique annotation IDs
let i = 0;

document.addEventListener("DOMContentLoaded", function () {
    generateFontOptions(); // Make sure the select options exist

    initializeParagraphs();

    document.addEventListener("keydown", function (event) {
        const activeElement = document.activeElement;
        const isTyping = activeElement.tagName === "INPUT" || activeElement.tagName === "TEXTAREA" || activeElement.isContentEditable;

        if (!isTyping && event.key === "j") {
            event.preventDefault();
            OpenSettings();
        }
    });
});

function OpenSettings() {
    const settingsBox = document.querySelector("nav.settings");
    settingsBox.classList.toggle('active');
    settingsBox.focus();  // focus the box itself
    trapFocus(settingsBox);
}

function trapFocus(settingsBox) {
    const focusableSelectors = 'a, button, input, textarea, select, [tabindex]:not([tabindex="-1"])';
    const focusableElements = settingsBox.querySelectorAll(focusableSelectors);
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    settingsBox.addEventListener('keydown', function (event) {
        if (event.key === 'Tab') {
            if (event.shiftKey) {
                // Shift + Tab
                if (document.activeElement === firstElement) {
                    event.preventDefault();
                    lastElement.focus();
                }
            } else {
                // Tab
                if (document.activeElement === lastElement) {
                    event.preventDefault();
                    firstElement.focus();
                }
            }
        }
    });
}

// Generate the font type options
function generateFontOptions() {
    let fontTypes = [
        'Arial, sans-serif',
        'Courier New, monospace',
        'Georgia, serif',
        'Times New Roman, serif',
        'Verdana, sans-serif'
    ];

    const fontTypeSelect = document.querySelector('#fontType');
    fontTypes.forEach(font => {
        const option = document.createElement('option');
        option.value = font;
        option.text = font;
        fontTypeSelect.appendChild(option);
    });
}

// Initialize paragraphs with accessibility attributes
function initializeParagraphs() {
    document.querySelectorAll('p').forEach((p, index) => {
        p.setAttribute('tabindex', 0);
        p.classList.add('paragraph');
        p.setAttribute('role', 'button');
        p.setAttribute('aria-label', 'Druk op Enter of Spatie om een annotatie toe te voegen.');
        p.dataset.id = index;
    });

    AddKeyBoardListners();
}

function AddKeyBoardListners() {
    // Add keyboard listener to each paragraph
    document.querySelectorAll('p.paragraph').forEach((p) => {
        p.addEventListener("keydown", function (event) {
            if (event.key === "Enter" || event.key === " ") {
                console.log("Key pressed: " + event.key);
                event.preventDefault();
                openAnnotationBox(p);
            }
        });
    });
}

// Open the annotation box
function openAnnotationBox(p) {
    // Remove existing annotation boxes
    document.querySelectorAll('.annotation-box').forEach(box => box.remove());

    let annotationBox = document.createElement("section");
    annotationBox.classList.add("annotation-box");
    annotationBox.setAttribute('role', 'dialog');
    annotationBox.setAttribute('aria-label', 'Annotatie invoeren');
    annotationBox.id = 'annotationBox' + i;

    annotationBox.innerHTML = `
        <h2>Annotation</h2>
        <span>Voer hieronder de <b>annotatie</b> in</span>
        <textarea rows="4" cols="50" class="annotationText" placeholder="Voer hier je annotatie in..."></textarea>
        <button class="save-button">Opslaan</button>
        <button class="close-button">Sluiten</button>
    `;

    p.after(annotationBox);
    annotationBox.querySelector('.annotationText').focus();

    // Save button listeners
    annotationBox.querySelector('.save-button').addEventListener("click", function () {
        saveAnnotation(annotationBox, p);
    });
    annotationBox.querySelector('.save-button').addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
            saveAnnotation(annotationBox, p);
        }
    });

    // Close button listeners
    annotationBox.querySelector('.close-button').addEventListener("click", function () {
        annotationBox.remove();
        p.focus();
    });
    annotationBox.querySelector('.close-button').addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
            annotationBox.remove();
            p.focus();
        }
    });
}

// Save the annotation
function saveAnnotation(annotationBox, p) {
    let annotationText = annotationBox.querySelector('.annotationText').value;
    let paragraphId = p.dataset.id;

    if (annotationText.trim() !== "") {
        let annotation = document.createElement("p");
        annotation.id = 'annotation' + i;
        annotation.classList.add("annotation");
        annotation.setAttribute('tabindex', 0);
        annotation.setAttribute('role', 'note');
        annotation.innerText = annotationText;
        annotation.setAttribute('aria-live', 'polite');
        p.after(annotation);

        // Create the annotation link here
        let annotationLink = document.createElement("li");
        annotationLink.innerHTML = `<a href="#annotation${i}">${annotationText}</a>`;

        let annotatieLijst = document.querySelector('.annotatieLijst');
        if (annotatieLijst) {
            annotatieLijst.appendChild(annotationLink);
        } else {
            console.error("annotatieLijst element not found!");
        }

        i++; // Increase counter AFTER creating annotation and link
    }

    annotationBox.remove();
}

function changeFontSize(obj) {
    document.querySelectorAll('p').forEach((p) => {
        p.style.fontSize = obj.value;
    });
}

function changeContainerWidth(obj) {
    document.querySelectorAll('.container').forEach((container) => {
        container.style.maxWidth = obj.value;
    });
}

function changeFontColor(obj) {
    const body = document.querySelector('body');
    document.body.style.color = obj.value;
}

function changeBackgroundColor(obj) {
    document.body.style.backgroundColor = obj.value;
}

function changeFontType(obj) {
    const body = document.querySelector('body');
    body.style.fontFamily = obj.value;
}

// Function to read annotations when space or enter is pressed
function readAnnotationOnKeyPress() {
    document.addEventListener('keydown', function(event) {
        // Check if spacebar (keyCode 32) or enter (keyCode 13) was pressed
        if (event.key === ' ' || event.key === 'Enter') {
            // Get all the annotation boxes
            document.querySelectorAll('.annotation-box textarea').forEach((annotation) => {
                // Extract the text content from each annotation box
                let annotationText = annotation.textContent || annotation.innerText;
                
                // Create a new SpeechSynthesisUtterance with the annotation text
                let utterance = new SpeechSynthesisUtterance(annotationText);
                
                // Optionally, you can adjust the voice, rate, and pitch here
                utterance.pitch = 1;
                utterance.rate = 1;
                utterance.volume = 1;

                // Use the speech synthesis API to read the annotation text
                window.speechSynthesis.speak(utterance);
            });
        }
    });
}

// Initialize the function
readAnnotationOnKeyPress();



function readPage(button) {
    const synth = window.speechSynthesis;

    const volume = parseFloat(document.getElementById('volumeSlider').value);
    const rate = parseFloat(document.getElementById('rateSlider').value);

    const contentElement = document.querySelector('main section.content');

    if (synth.speaking) {
        synth.cancel();
        button.textContent = "🔊 Voorlezen";
        // Herstel originele tekst
        if (contentElement.dataset.originalText) {
            contentElement.innerHTML = contentElement.dataset.originalText;
        }
        // Voeg de toetsenbordluisteraars opnieuw toe na stoppen
        AddKeyBoardListners();
    } else {
        const originalText = contentElement.innerText;
        const utterance = new SpeechSynthesisUtterance(originalText);
        utterance.volume = volume;
        utterance.rate = rate;

        // Sla originele HTML op
        contentElement.dataset.originalText = contentElement.innerHTML;

        utterance.onboundary = function (event) {
            if (event.name === 'word' && event.charLength > 0) {
                const start = event.charIndex;
                const end = start + event.charLength;

                // Simpele highlight zonder HTML-tags in de weg
                const before = originalText.slice(0, start);
                const word = originalText.slice(start, end);
                const after = originalText.slice(end);

                contentElement.innerHTML = `${before}<mark>${word}</mark>${after}`;
            }
        };

        utterance.onend = function () {
            button.textContent = "🔊 Voorlezen";
            // Herstel originele tekst
            if (contentElement.dataset.originalText) {
                contentElement.innerHTML = contentElement.dataset.originalText;
            }
            // Voeg de toetsenbordluisteraars toe nadat de spraak is gestopt
            AddKeyBoardListners();
        };

        synth.speak(utterance);
        button.textContent = "🔇 Stoppen";
    }
}







