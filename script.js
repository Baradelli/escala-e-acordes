const ROMAN_NUMERAL = ["I", "II", "III", "IV", "V", "VI", "VII"];
const NOTES = [
  "C",
  "C#",
  "D",
  "D#",
  "E",
  "F",
  "F#",
  "G",
  "G#",
  "A",
  "A#",
  "B",
  "C",
  "C#",
  "D",
  "D#",
  "E",
  "F",
  "F#",
  "G",
  "G#",
  "A",
  "A#",
  "B",
  "C",
  "C#",
  "D",
  "D#",
  "E",
  "F",
  "F#",
  "G",
  "G#",
  "A",
  "A#",
  "B",
  "C",
  "C#",
  "D",
  "D#",
  "E",
  "F",
  "F#",
  "G",
  "G#",
  "A",
  "A#",
  "B",
];
const SCALES = {
  major: [2, 2, 1, 2, 2, 2, 1],
  minor: [2, 1, 2, 2, 1, 2, 2],
};

const CHORDS = {
  scales: {
    major: ["", "m", "m", "", "", "m", "°"],
    minor: ["m", "°", "", "m", "m", "", ""],
  },
  M: [0, 4, 7],
  m: [0, 3, 7],
  "°": [0, 3, 6],
};

const SCALE_KEYS = document.querySelectorAll(".scale-key");
const CHORD_KEYS = document.querySelectorAll(".chord-key");

const selectTone = document.querySelector("#tone");
const selectScale = document.querySelector("#scale");
const chordsContainer = document.querySelector(".chords-container");

const cleanNotes = () => {
  const keysNatural = document.querySelectorAll(".natural");
  const keysSharp = document.querySelectorAll(".sharp");

  keysNatural.forEach((el) => el.classList.remove("highlight-key"));
  keysSharp.forEach((el) => el.classList.remove("highlight-key"));
};

const cleanChordNotes = () => {
  const keys = document.querySelectorAll(".chord-key");

  keys.forEach((e) => e.classList.remove("highlight-key"));
};

const handleChord = (chordIndex, dNoteIndex) => {
  cleanChordNotes();

  const formation = CHORDS.scales[selectScale.value][chordIndex];

  let NoteIndex = dNoteIndex;

  const chordKeys = [];

  for (let i = 0; i < 3; i++) {
    noteIndex = dNoteIndex + CHORDS[formation || "M"][i];

    chordKeys.push(noteIndex);
  }

  chordKeys.forEach((noteIndex) => {
    CHORD_KEYS[noteIndex].classList.add("highlight-key");
  });
};

const handleScalesOnPiano = (tone, scale) => {
  chordsContainer.innerHTML = "";
  cleanNotes();

  let notesIndex = NOTES.findIndex((note) => note === tone);

  const scaleIndex = [notesIndex];

  for (let i = 0; i < 6; i++) {
    notesIndex = notesIndex + SCALES[scale][i];

    scaleIndex.push(notesIndex);
  }

  scaleIndex.forEach((noteIndex, index) => {
    if (index === 0) {
      handleChord(index, noteIndex);
    }

    SCALE_KEYS[noteIndex].classList.add("highlight-key");

    const chord = NOTES[noteIndex] + CHORDS.scales[scale][index];

    chordsContainer.innerHTML += `<div class="chord index-${index} note-index-${noteIndex}">${ROMAN_NUMERAL[index]} - ${chord}</div>`;
  });

  const chordsEl = document.querySelectorAll(".chord");

  chordsEl.forEach((el) => {
    el.addEventListener("click", (e) => {
      document.querySelectorAll(".selected-chord").forEach((el) => {
        el.classList.remove("selected-chord");
      });

      e.target.classList.add("selected-chord");

      const index = Number(e.target.classList[1].replace("index-", ""));
      const noteIndex = Number(
        e.target.classList[2].replace("note-index-", "")
      );

      handleChord(index, noteIndex);
    });
  });
};

handleScalesOnPiano(selectTone.value, selectScale.value);

selectTone.addEventListener("change", (e) => {
  handleScalesOnPiano(e.target.value, selectScale.value);
});

selectScale.addEventListener("change", (e) => {
  handleScalesOnPiano(selectTone.value, e.target.value);
});
