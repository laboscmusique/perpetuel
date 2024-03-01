const password = ["do", "do", "do", "re", "mi", "re"];
const siteUrl = "https://www.kfc.fr/";

window.onload = function () {
  const background = document.getElementById("piano-container");
  preload();

  const doNote = document.getElementById("do");
  const reNote = document.getElementById("re");
  const miNote = document.getElementById("mi");
  const faNote = document.getElementById("fa");
  const solNote = document.getElementById("sol");

  const notes = this.document.querySelectorAll(".note");
  const MIN_TIME_DOWN = 200;
  let timer;

  let pressed = [];
  let isCorrect = false;

  doNote.addEventListener("mousedown", (e) => {
    onNoteClicked("do");
  });
  reNote.addEventListener("mousedown", (e) => {
    onNoteClicked("re");
  });
  miNote.addEventListener("mousedown", (e) => {
    onNoteClicked("mi");
  });
  faNote.addEventListener("mousedown", (e) => {
    onNoteClicked("fa");
  });
  solNote.addEventListener("mousedown", (e) => {
    onNoteClicked("sol");
  });

  notes.forEach((note) => {
    note.addEventListener("mouseup", (e) => {
      resetBackground();
    });
  });

  function resetBackground() {
    const now = performance.now();
    const timePressed = now - timer;

    if (timePressed < MIN_TIME_DOWN) {
      setTimeout(() => {
        setBackground();
      }, MIN_TIME_DOWN - timePressed);
    } else setBackground();
  }

  function setBackground() {
    background.style.zIndex = 0;
    background.style.backgroundImage = "url(assets/img/piano0.jpg)";
    setTimeout(() => {
      background.style.zIndex = 10;
    }, 10);
  }

  function onNoteClicked(note) {
    if (isCorrect) return;
    timer = performance.now();
    var audio = new Audio(getAudio(note));
    audio.play();

    pressed.push(note);
    background.style.zIndex = 0;
    background.style.backgroundImage = "url(assets/img/piano" + note + ".jpg)";
    setTimeout(() => {
      background.style.zIndex = 10;
    }, 10);

    if (checkIfCorrect()) {
      isCorrect = true;
      setTimeout(() => {
        window.location.replace(siteUrl);
      }, 500);
    }
  }

  function checkIfCorrect() {
    const last = pressed.slice(-password.length);
    return JSON.stringify(last) == JSON.stringify(password);
  }

  function getAudio(note) {
    let file;
    switch (note) {
      case "do":
        file = "./assets/sound/do.mp3";
        break;
      case "re":
        file = "./assets/sound/re.mp3";
        break;
      case "mi":
        file = "./assets/sound/mi.mp3";
        break;
      case "fa":
        file = "./assets/sound/fa.mp3";
        break;
      case "sol":
        file = "./assets/sound/sol.mp3";
        break;
      default:
        break;
    }
    return file;
  }

  function preloadSound(src) {
    var sound = document.createElement("audio");
    if ("src" in sound) {
      sound.autoPlay = false;
    } else {
      sound = document.createElement("bgsound");
      sound.volume = -10000;
    }
    sound.src = src;
    document.body.appendChild(sound);
    return sound;
  }

  function preload() {
    img1 = new Image();
    img1.src = "./assets/img/piano0.jpg";

    img2 = new Image();
    img2.src = "./assets/img/pianodo.jpg";

    img3 = new Image();
    img3.src = "./assets/img/pianore.jpg";

    img4 = new Image();
    img4.src = "./assets/img/pianomi.jpg";

    img5 = new Image();
    img5.src = "./assets/img/pianofa.jpg";

    img6 = new Image();
    img6.src = "./assets/img/pianosol.jpg";

    preloadSound("./assets/sound/do.mp3");
    preloadSound("./assets/sound/re.mp3");
    preloadSound("./assets/sound/mi.mp3");
    preloadSound("./assets/sound/fa.mp3");
    preloadSound("./assets/sound/sol.mp3");
  }
};
