/* SWASTIK - Basundhara Books
   1) Edit SUBJECTS if a class has different subjects.
   2) Add chapter names in CHAPTERS. Each chapter then shows
      Book / Q&A / Notes links automatically.
   File paths follow this pattern:
   content/class-10/physical-science/chapter-1/book.pdf
   content/class-10/physical-science/chapter-1/qa.pdf
   content/class-10/physical-science/chapter-1/notes.pdf
*/

const sub = (id, name) => ({ id, name });
const ODIA = sub("odia", "ଓଡ଼ିଆ"),
  ENG = sub("english", "English"),
  HIN = sub("hindi", "ହିନ୍ଦୀ"),
  MATH = sub("maths", "ଗଣିତ (Maths)"),
  EVS = sub("evs", "ପରିବେଶ ଅଧ୍ୟୟନ (EVS)"),
  SCI = sub("science", "ବିଜ୍ଞାନ (Science)"),
  SST = sub("social-science", "ସାମାଜିକ ବିଜ୍ଞାନ (Social Science)"),
  PSC = sub("physical-science", "ଭୌତିକ ବିଜ୍ଞାନ (Physical Science)"),
  LSC = sub("life-science", "ଜୀବ ବିଜ୍ଞାନ (Life Science)"),
  HPS = sub("history-political-science", "ଇତିହାସ ଓ ରାଜନୀତି ବିଜ୍ଞାନ"),
  GEO = sub("geography-economics", "ଭୂଗୋଳ ଓ ଅର୍ଥନୀତି"),
  PHY = sub("physics", "Physics"),
  CHE = sub("chemistry", "Chemistry"),
  BIO = sub("biology", "Biology"),
  ECO = sub("economics", "Economics"),
  ACC = sub("accountancy", "Accountancy");

function subjectsFor(c) {
  if (c <= 2) return [ODIA, ENG, MATH];
  if (c <= 5) return [ODIA, ENG, MATH, EVS];
  if (c <= 8) return [ODIA, ENG, HIN, MATH, SCI, SST];
  if (c <= 10) return [ODIA, ENG, HIN, MATH, PSC, LSC, HPS, GEO];
  return [ENG, ODIA, PHY, CHE, MATH, BIO, ECO, ACC];
}

/* Add chapters here: "class/subject-id": ["Chapter 1 name", ...] */
const CHAPTERS = {
  "10/physical-science": ["Chapter 1", "Chapter 2", "Chapter 3"],
};

const classGrid = document.getElementById("classGrid");
const bottomNav = document.getElementById("bottomNav");
const title = document.getElementById("selectedClassTitle");
const list = document.getElementById("subjectList");

function makeButtons() {
  for (let c = 1; c <= 12; c++) {
    const a = document.createElement("button");
    a.className = "class-btn";
    a.textContent = "Class " + c;
    a.dataset.c = c;
    a.addEventListener("click", () => selectClass(c));
    classGrid.appendChild(a);

    const b = document.createElement("button");
    b.className = "nav-btn";
    b.textContent = "Class " + c;
    b.dataset.c = c;
    b.addEventListener("click", () => selectClass(c, true));
    bottomNav.appendChild(b);
  }
}

function chapterHTML(c, s, i, name) {
  const base = `content/class-${c}/${s.id}/chapter-${i + 1}/`;
  return `<div class="chapter">
    <p class="chapter-title">${name}</p>
    <div class="links">
      <a href="${base}book.pdf" target="_blank" rel="noopener">📖 Book</a>
      <a href="${base}qa.pdf" target="_blank" rel="noopener">❓ Question-Answer</a>
      <a href="${base}notes.pdf" target="_blank" rel="noopener">📝 Notes</a>
    </div>
  </div>`;
}

function selectClass(c, fromNav) {
  document.querySelectorAll("[data-c]").forEach((el) =>
    el.classList.toggle("active", Number(el.dataset.c) === c)
  );
  title.textContent = `Basundhara Books - Class ${c}`;

  list.innerHTML = subjectsFor(c)
    .map((s) => {
      const ch = CHAPTERS[`${c}/${s.id}`] || [];
      const body = ch.length
        ? ch.map((name, i) => chapterHTML(c, s, i, name)).join("")
        : `<p class="soon">ଶୀଘ୍ର ଆସୁଛି (Coming soon)</p>`;
      return `<details class="subject"><summary>${s.name}</summary>
        <div class="chapters">${body}</div></details>`;
    })
    .join("");

  const activeNav = bottomNav.querySelector(".active");
  if (activeNav) activeNav.scrollIntoView({ inline: "center", block: "nearest" });
  if (!fromNav) title.scrollIntoView({ behavior: "smooth" });
}

makeButtons();
