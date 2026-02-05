// ====== DINE LISTER ======
const BASE = location.hostname.endsWith("github.io")
  ? "/" + location.pathname.replace(/^\/+/, "").split("/")[0]
  : "";

const withBase = (path) => (BASE ? BASE : "") + path;

const matte1Forelesninger = Array.from({ length: 13 }, (_, i) => {
  const nr = i + 1;
  return { title: `Forelesning ${nr}`, file: `/pdf/matte-1/forelesning-${nr}.pdf` };
});

const diskreForelesninger = Array.from({ length: 24 }, (_, i) => {
  const nr = i + 1;
  return { title: `Forelesning ${nr}`, file: `/pdf/diskre-matematikk/Forelesning ${nr}.pdf` };
});

const itgkOvinger = [
  {
    title: "Øving 3",
    items: [
      { title: "00 intro til løkker", file: "/itgk-html/oving-3/00_intro_til_lokker.html" },
      { title: "01 mer om løkker", file: "/itgk-html/oving-3/01_mer_om_lokker.html" },
      { title: "04 gjett tallet", file: "/itgk-html/oving-3/04_gjett_tallet.html" },
      { title: "09 hangman", file: "/itgk-html/oving-3/09_hangman.html" },
    ],
  },
  {
    title: "Øving 4",
    items: [
      { title: "00 grunnleggende om funksjoner", file: "/itgk-html/oving-4/00_grunnleggende_om_funksjoner.html" },
      { title: "01 varierte funksjoner", file: "/itgk-html/oving-4/01_varierte_funksjoner.html" },
      { title: "02 lokale variabler", file: "/itgk-html/oving-4/02_lokale_variabler.html" },
      { title: "03 globale variabler", file: "/itgk-html/oving-4/03_globale_variabler.html" },
      { title: "04 euklids algoritme", file: "/itgk-html/oving-4/04_euklids_algoritme.html" },
      { title: "05 primtall", file: "/itgk-html/oving-4/05_primtall.html" },
    ],
  },
  {
    title: "Øving 5",
    items: [
      { title: "00 generelt om lister", file: "/itgk-html/oving-5/00_generelt_om_lister.html" },
      { title: "01 lett og blandet om lister", file: "/itgk-html/oving-5/01_lett_og_blandet_om_lister.html" },
      { title: "04 lister og løkker", file: "/itgk-html/oving-5/04_lister_og_lokker.html" },
      { title: "05 teoridelen på eksamen", file: "/itgk-html/oving-5/05_teoridelen_pa_eksamen.html" },
    ],
  },
  {
    title: "Øving 6",
    items: [
      { title: "00 aksessering av karakterer i strenger", file: "/itgk-html/oving-6/00_aksessering_av_karakterer_i_strenger.html" },
      { title: "01 strenger og konkatering", file: "/itgk-html/oving-6/01_strenger_og_konkatinering.html" },
      { title: "02 slicing av strenger", file: "/itgk-html/oving-6/02_slicing_av_strenger.html" },
      { title: "04 strenghåndtering", file: "/itgk-html/oving-6/04_strenghandtering.html" },
    ],
  },
  {
    title: "Øving 7",
    items: [
      { title: "00 generelt om dictionaries", file: "/itgk-html/oving-7/00_generelt_om_dictionaries.html" },
      { title: "02 generelt om sets", file: "/itgk-html/oving-7/02_generelt_om_sets.html" },
      { title: "03 generelt om filbehandling", file: "/itgk-html/oving-7/03_generelt_om_filbehandling.html" },
      { title: "04 osteviruset", file: "/itgk-html/oving-7/04_osteviruset.html" },
    ],
  },
];

const exphilNotater = [
  { title: "Argumentasjonsteori", file: "/pdf/exphil/1) Argumentasjonsteori.pdf" },
  { title: "Vitenskapsfilosofi", file: "/pdf/exphil/2) Vitenskapsfilosofi.pdf" },
  { title: "Natursyn, menneskesyn og teknologi", file: "/pdf/exphil/3) Natursyn, menneskesyn og teknologi.pdf" },
  { title: "Etikk", file: "/pdf/exphil/4) Etikk.pdf" },
  { title: "Politisk filosofi", file: "/pdf/exphil/5) Politisk filosofi.pdf" },
  { title: "Tilleggspensum", file: "/pdf/exphil/6) Tilleggspensum.pdf" },
];

const matte3Forelesninger = [
  { title: "Vektorrom", file: "pdf/matte3C/Vektorrom.pdf"},
  { title: "Lineærtransformasjoner", file: "pdf/matte3C/Lineærtransformasjoner.pdf"}
]

// ====== ÅR/SEMESTER DATA ======
const START_HOEST = 2025;

function semesterLabelsForYear(yearNumber) {
  const start = START_HOEST + (yearNumber - 1);
  return [`Høst ${start}`, `Vår ${start + 1}`];
}

// curriculum[år][semester][fag] = items
const curriculum = {
  1: {
    [`Høst ${START_HOEST}`]: {
      "ITGK": itgkOvinger,
      "Matte 1": matte1Forelesninger,
      "Diskré matematikk": diskreForelesninger,
      "Exphil": exphilNotater,
    },
    [`Vår ${START_HOEST + 1}`]: {
      "Matte 3C": matte3Forelesninger,
    },
  },
  2: {
    [`Høst ${START_HOEST + 1}`]: {},
    [`Vår ${START_HOEST + 2}`]: {},
  },
  3: {
    [`Høst ${START_HOEST + 2}`]: {},
    [`Vår ${START_HOEST + 3}`]: {},
  },
  4: {
    [`Høst ${START_HOEST + 3}`]: {},
    [`Vår ${START_HOEST + 4}`]: {},
  },
  5: {
    [`Høst ${START_HOEST + 4}`]: {},
    [`Vår ${START_HOEST + 5}`]: {},
  },
};

// ====== UI ======
const breadcrumbEl = document.getElementById("breadcrumb");
const stepTitleEl = document.getElementById("stepTitle");
const menuEl = document.getElementById("menu");
const backBtn = document.getElementById("backBtn");

// Viewer (samme flate for liste og innhold)
const viewerTitleEl = document.getElementById("viewerTitle");
const viewerBackBtn = document.getElementById("viewerBackBtn");
const viewerListEl = document.getElementById("viewerList");
const pdfViewer = document.getElementById("pdfViewer");
const viewerHint = document.getElementById("viewerHint");

// State
let step = 0; // 0=år, 1=semester, 2=fag, 3=notatliste, 4=notatvisning
let chosenYear = null;
let chosenSemester = null;
let chosenSubject = null;
let currentNoteList = []; // listen for valgt fag

function resetViewerToEmpty() {
  viewerTitleEl.textContent = "Notater";
  viewerBackBtn.style.display = "none";
  viewerListEl.innerHTML = "Velg et fag for å se notater.";
  viewerHint.style.display = "none";
  pdfViewer.style.display = "none";
  pdfViewer.src = "";
}

function showViewerList(subject, items) {
  viewerTitleEl.textContent = subject;
  viewerBackBtn.style.display = "none";
  viewerListEl.innerHTML = "";

  if (!items || items.length === 0) {
    viewerListEl.textContent = "Ingen notater ennå.";
    return;
  }

  items.forEach((item) => {
    // Gruppe (ITGK Øving X)
    if (item.items && Array.isArray(item.items)) {
      const h = document.createElement("h3");
      h.textContent = item.title;
      viewerListEl.appendChild(h);

      item.items.forEach((sub) => {
        const b = document.createElement("button");
        b.textContent = "🧩 " + sub.title;
        b.onclick = () => openNote(sub.title, sub.file);
        viewerListEl.appendChild(b);
      });
      return;
    }

    // Vanlig notat
    const b = document.createElement("button");
    b.textContent = "📄 " + item.title;
    b.onclick = () => openNote(item.title, item.file);
    viewerListEl.appendChild(b);
  });
}

function openNote(title, path) {
  // Når du åpner et notat: skjul lista, vis innhold, vis “tilbake”
  viewerTitleEl.textContent = title;
  viewerBackBtn.style.display = "inline-block";

  viewerListEl.innerHTML = "";
  viewerHint.style.display = "none";

  pdfViewer.style.display = "block";
  pdfViewer.src = "";
  console.log("BASE:", BASE);
  console.log("Opening:", withBase(path));
  setTimeout(() => {
    const url = new URL(withBase(path), window.location.origin).toString();
    pdfViewer.src = url;
  }, 0);

  step = 4; // notatvisning
}

viewerBackBtn.onclick = () => {
  // Tilbake fra notatvisning til lista i samme fag
  step = 3;
  pdfViewer.style.display = "none";
  pdfViewer.src = "";
  viewerBackBtn.style.display = "none";
  showViewerList(chosenSubject, currentNoteList);
};

function setBackVisible(visible) {
  backBtn.style.display = visible ? "inline-block" : "none";
}

function setBreadcrumb() {
  const parts = [];
  if (chosenYear) parts.push(`År ${chosenYear}`);
  if (chosenSemester) parts.push(chosenSemester);
  if (chosenSubject) parts.push(chosenSubject);
  breadcrumbEl.textContent = parts.length ? parts.join(" → ") : "Velg år";
}

function showMenu(title, items, onClickItem) {
  stepTitleEl.textContent = title;
  menuEl.innerHTML = "";

  if (!items || items.length === 0) {
    menuEl.textContent = "Ingenting her ennå.";
    return;
  }

  items.forEach((label) => {
    const btn = document.createElement("button");
    btn.textContent = label;
    btn.onclick = () => onClickItem(label);
    menuEl.appendChild(btn);
  });
}

function semesterData() {
  if (!chosenYear || !chosenSemester) return null;
  return curriculum[chosenYear]?.[chosenSemester] ?? null;
}

// ====== NAVIGASJON ======
function goToYears() {
  step = 0;
  chosenYear = null;
  chosenSemester = null;
  chosenSubject = null;
  currentNoteList = [];

  setBackVisible(false);
  setBreadcrumb();
  resetViewerToEmpty();

  const years = [1, 2, 3, 4, 5].map((n) => `År ${n}`);
  showMenu("År", years, (label) => {
    chosenYear = Number(label.replace("År ", ""));
    goToSemesters();
  });
}

function goToSemesters() {
  step = 1;
  chosenSemester = null;
  chosenSubject = null;
  currentNoteList = [];

  setBackVisible(true);
  setBreadcrumb();
  resetViewerToEmpty();

  const labels = semesterLabelsForYear(chosenYear);
  showMenu("Semester", labels, (label) => {
    chosenSemester = label;
    goToSubjects();
  });
}

function goToSubjects() {
  step = 2;
  chosenSubject = null;
  currentNoteList = [];

  setBackVisible(true);
  setBreadcrumb();
  resetViewerToEmpty();

  const sem = semesterData();
  const subjects = sem ? Object.keys(sem) : [];
  showMenu("Fag", subjects, (label) => {
    chosenSubject = label;

    // Når fag velges: vis notatliste i høyre panel
    const items = sem?.[chosenSubject] ?? [];
    currentNoteList = items;
    step = 3;

    setBreadcrumb();
    showViewerList(chosenSubject, items);
  });
}

backBtn.onclick = () => {
  // Hvis du er inne i en notatvisning, må du først tilbake til lista
  if (step === 4) {
    viewerBackBtn.onclick();
    return;
  }
  if (step === 3) return goToSubjects();   // fra notatliste tilbake til fag
  if (step === 2) return goToSemesters();  // fra fag tilbake til semester
  if (step === 1) return goToYears();      // fra semester tilbake til år
};

// Start
goToYears();
