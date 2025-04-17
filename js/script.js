let i = 0;
let annotationTrapHandler = null; // For toggling focus trap

document.addEventListener("DOMContentLoaded", function () {
    generateFontOptions();
    initializeParagraphs();
    loadAnnotationsFromStorage();

    document.addEventListener("keydown", function (event) {
        const activeElement = document.activeElement;
        const isTyping = activeElement.tagName === "INPUT" || activeElement.tagName === "TEXTAREA" || activeElement.isContentEditable;

        if (!isTyping && event.key === "j") {
            event.preventDefault();
            OpenSettings();
        }

        if (!isTyping && event.key === "f") {
            event.preventDefault();
            FocusAnnotationList();
        }
    });
});

function DeleteAnnotations() {
    localStorage.removeItem('annotations');
    document.querySelectorAll('.annotation').forEach(el => el.remove());
    const list = document.querySelector('.annotatieLijst');
    if (list) list.innerHTML = '';
    i = 0;
}

function FocusAnnotationList() {
    const annotationList = document.querySelector('.annotatieContainer');

    if (annotationList) {
        annotationList.classList.toggle('active');
        const isActive = annotationList.classList.contains('active');

        if (isActive) {
            const firstFocusable = annotationList.querySelector(
                'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
            );
            if (firstFocusable) {
                firstFocusable.focus();
            }

            annotationTrapHandler = trapFocus(annotationList);
            console.log("Focus trap activated on annotation list");
        } else {
            if (annotationTrapHandler) {
                annotationList.removeEventListener('keydown', annotationTrapHandler);
                annotationTrapHandler = null;
                console.log("Focus trap deactivated");
            }
        }
    }
}

function OpenSettings() {
    const settingsBox = document.querySelector("nav.settings");
    settingsBox.classList.toggle('active');
    settingsBox.focus();
    trapFocus(settingsBox);
}

function trapFocus(container) {
    const focusableSelectors = 'a, button, input, textarea, select, [tabindex]:not([tabindex="-1"])';
    const focusableElements = container.querySelectorAll(focusableSelectors);
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    const handler = function (event) {
        if (event.key === 'Tab') {
            if (event.shiftKey && document.activeElement === firstElement) {
                event.preventDefault();
                lastElement.focus();
            } else if (!event.shiftKey && document.activeElement === lastElement) {
                event.preventDefault();
                firstElement.focus();
            }
        }
    };

    container.addEventListener('keydown', handler);
    return handler;
}

function generateFontOptions() {
    const fontTypes = [
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
    document.querySelectorAll('p.paragraph').forEach((p) => {
        p.addEventListener("keydown", function (event) {
            if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                openAnnotationBox(p);
            }
        });
    });
}

function openAnnotationBox(p) {
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

    annotationBox.querySelector('.save-button').addEventListener("click", () => {
        saveAnnotation(annotationBox, p);
    });
    annotationBox.querySelector('.save-button').addEventListener("keydown", function (event) {
        if (event.key === "Enter") saveAnnotation(annotationBox, p);
    });
    annotationBox.querySelector('.close-button').addEventListener("click", () => {
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

function saveAnnotation(annotationBox, p) {
    const annotationText = annotationBox.querySelector('.annotationText').value.trim();
    const paragraphId = p.dataset.id;

    if (annotationText !== "") {
        const annotationId = `annotation${i}`;
        const annotation = document.createElement("p");
        annotation.id = annotationId;
        annotation.classList.add("annotation");
        annotation.setAttribute('tabindex', 0);
        annotation.setAttribute('role', 'note');
        annotation.innerText = annotationText;
        annotation.setAttribute('aria-live', 'polite');
        p.after(annotation);

        const annotationLink = document.createElement("li");
        annotationLink.innerHTML = `<a href="#${annotationId}">${annotationText}</a>`;
        const annotatieLijst = document.querySelector('.annotatieLijst');
        if (annotatieLijst) {
            annotatieLijst.appendChild(annotationLink);
        }

        const stored = getStoredAnnotations();
        stored.push({
            id: annotationId,
            text: annotationText,
            paragraphId: paragraphId
        });
        localStorage.setItem('annotations', JSON.stringify(stored));

        i++;
    }

    annotationBox.remove();
}

function getStoredAnnotations() {
    try {
        const stored = localStorage.getItem('annotations');
        const parsed = JSON.parse(stored);
        return Array.isArray(parsed) ? parsed : [];
    } catch (e) {
        console.warn("Invalid annotations in localStorage", e);
        return [];
    }
}

function loadAnnotationsFromStorage() {
    const annotations = getStoredAnnotations();
    annotations.forEach(a => {
        const paragraph = document.querySelector(`p[data-id="${a.paragraphId}"]`);
        if (!paragraph) return;

        const annotation = document.createElement("p");
        annotation.id = a.id;
        annotation.classList.add("annotation");
        annotation.setAttribute('tabindex', 0);
        annotation.setAttribute('role', 'note');
        annotation.innerText = a.text;
        annotation.setAttribute('aria-live', 'polite');
        paragraph.after(annotation);

        const annotationLink = document.createElement("li");
        annotationLink.innerHTML = `<a href="#${a.id}">${a.text}</a>`;
        const annotatieLijst = document.querySelector('.annotatieLijst');
        if (annotatieLijst) {
            annotatieLijst.appendChild(annotationLink);
        }

        i++;
    });
}

function readAnnotationOnKeyPress() {
    document.addEventListener('keydown', function (event) {
        if (event.key === ' ' || event.key === 'Enter') {
            document.querySelectorAll('.annotation-box textarea').forEach(annotation => {
                let annotationText = annotation.textContent || annotation.innerText;
                let utterance = new SpeechSynthesisUtterance(annotationText);
                utterance.pitch = 1;
                utterance.rate = 1;
                utterance.volume = 1;
                window.speechSynthesis.speak(utterance);
            });
        }
    });
}
readAnnotationOnKeyPress();

function readPage(button) {
    const synth = window.speechSynthesis;
    const volume = parseFloat(document.getElementById('volumeSlider').value);
    const rate = parseFloat(document.getElementById('rateSlider').value);
    const contentElement = document.querySelector('main section.content');

    if (synth.speaking) {
        synth.cancel();
        button.textContent = "🔊 Voorlezen";
        if (contentElement.dataset.originalText) {
            contentElement.innerHTML = contentElement.dataset.originalText;
        }
        AddKeyBoardListners();
    } else {
        const originalText = contentElement.innerText;
        const utterance = new SpeechSynthesisUtterance(originalText);
        utterance.volume = volume;
        utterance.rate = rate;
        contentElement.dataset.originalText = contentElement.innerHTML;

        utterance.onboundary = function (event) {
            if (event.name === 'word' && event.charLength > 0) {
                const start = event.charIndex;
                const end = start + event.charLength;
                const before = originalText.slice(0, start);
                const word = originalText.slice(start, end);
                const after = originalText.slice(end);
                contentElement.innerHTML = `${before}<mark>${word}</mark>${after}`;
            }
        };

        utterance.onend = function () {
            button.textContent = "🔊 Voorlezen";
            if (contentElement.dataset.originalText) {
                contentElement.innerHTML = contentElement.dataset.originalText;
            }
            AddKeyBoardListners();
        };

        synth.speak(utterance);
        button.textContent = "🔇 Stoppen";
    }
}

// Settings
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
    document.body.style.color = obj.value;
}
function changeBackgroundColor(obj) {
    document.body.style.backgroundColor = obj.value;
}
function changeFontType(obj) {
    document.body.style.fontFamily = obj.value;
}
