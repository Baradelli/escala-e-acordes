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
const KEYS = document.querySelectorAll(".key");

const selectTone = document.querySelector("#tone");
const selectScale = document.querySelector("#scale");

const cleanNotes = () => {
  const keysNatural = document.querySelectorAll(".natural");
  const keysSharp = document.querySelectorAll(".sharp");

  keysNatural.forEach((el) => el.classList.remove("highlight-key"));
  keysSharp.forEach((el) => el.classList.remove("highlight-key"));
};

const handleScalesOnPiano = (tone, scale) => {
  cleanNotes();

  let notesIndex = NOTES.findIndex((note) => note === tone);

  const scaleIndex = [notesIndex];

  for (let i = 0; i < 6; i++) {
    notesIndex = notesIndex + SCALES[scale][i];

    scaleIndex.push(notesIndex);
  }

  console.log(scaleIndex);

  scaleIndex.forEach((note) => {
    KEYS[note].classList.add("highlight-key");
  });
};

handleScalesOnPiano(selectTone.value, selectScale.value);

selectTone.addEventListener("change", (e) => {
  handleScalesOnPiano(e.target.value, selectScale.value);
});

selectScale.addEventListener("change", (e) => {
  handleScalesOnPiano(selectTone.value, e.target.value);
});
