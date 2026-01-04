// === Cache DOM elements ===
const textarea = document.getElementById("tirra");
const keyboards = document.querySelectorAll("#charKeyboard, #charKeyboard1");

// === Mapping direct mode ===
const directMap = {
    c: "č",
    d: "ḍ",
    g: "ǧ",
    h: "ḥ",
    r: "ṛ",
    s: "ṣ",
    t: "ṭ",
    z: "ẓ",
    e: "ɛ",
    y: "ɣ",
    E: "Σ",
    Y: "Γ"
};

// === Keyboard click handler (delegation) ===
keyboards.forEach(keyboard => {
    keyboard.addEventListener("click", ({ target }) => {
        const char = target.dataset.char;
        if (!char) return;

        textarea.focus();
        textarea.value += char;
    });
});

// === Direct mode replacement ===
function directMode() {
    const value = textarea.value;
    if (value.length < 2) return;

    const last = value.at(-1);
    const prev = value.at(-2);

    if (last === "=" && directMap[prev]) {
        textarea.value =
            value.slice(0, -2) + directMap[prev];
    }
}

// === Clipboard ===
function copyText() {
    if (!textarea.value.trim()) return;
    navigator.clipboard.writeText(textarea.value);
    textarea.focus();
}

// === Clear ===
function clearText() {
    textarea.value = "";
    setCursorToSecondLine();
}

// === Cursor positioning ===
function setCursorToSecondLine() {
    textarea.value = "\n";
    textarea.setSelectionRange(1, 1);
    textarea.focus();
}