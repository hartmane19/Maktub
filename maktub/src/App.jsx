import React, { useState, useEffect, useRef } from "react";

/* ============================================================
   DAILY CONTENT — each pool rotates automatically by calendar date.
   Add more entries any time; the picker below spreads across
   whatever is here and starts repeating once it runs out.
   ============================================================ */
function dayOfYear(d) {
  const start = new Date(d.getFullYear(), 0, 0);
  return Math.floor((d - start) / 86400000);
}
function pickForToday(pool) {
  return pool[dayOfYear(new Date()) % pool.length];
}

const IMAGES = [
  {
    title: "The Great Wave off Kanagawa",
    origin: "Japan, c. 1831 — woodblock print",
    history:
      "Katsushika Hokusai carved this image in his seventies, part of a series called Thirty-six Views of Mount Fuji. The wave's claws of foam were achieved using a rare pigment called Prussian blue, newly imported from Europe.",
    commonsFile: "The Great Wave off Kanagawa.jpg",
  },
  {
    title: "Poseidon of Cape Artemision",
    origin: "Greece, c. 460 BCE — bronze, National Archaeological Museum of Athens",
    history:
      "Recovered from a shipwreck off Cape Artemision in 1926, this bronze figure once held either a trident or a thunderbolt in its missing hand — historians still debate whether it depicts Poseidon or Zeus.",
    commonsFile: "Poseidon Of Cape Artemision.jpg",
  },
  {
    title: "Apollo del Belvedere",
    origin: "Vatican, Roman copy of a Greek bronze — marble",
    history:
      "Long considered a touchstone of ideal male beauty in Western art, this marble Apollo depicts the god of music, prophecy, and the sun in the moment just after loosing an arrow.",
    commonsFile: "Apollo del Belvedere in Vatican.jpg",
  },
  {
    title: "Hera Farnese",
    origin: "Naples, Roman copy of a 5th-century BCE Greek original — marble",
    history:
      "Early archaeologists named this severe, unsmiling marble figure Hera based on her composed expression and regal bearing, though her exact identity was assigned well after she was unearthed.",
    commonsFile: "Hera Farnese MAN Napoli Inv6027.jpg",
  },
];

const WORDS = [
  { term: "petrichor", pronunciation: "/ˈpɛ.trɪ.kɔːr/", partOfSpeech: "n.", definition: "the pleasant, earthy smell that follows rain after a dry spell, caused by oils released from soil and plants." },
  { term: "ephemeral", pronunciation: "/ɪˈfɛm.ər.əl/", partOfSpeech: "adj.", definition: "lasting for a very short time; fleeting." },
  { term: "serendipity", pronunciation: "/ˌsɛr.ənˈdɪp.ɪ.ti/", partOfSpeech: "n.", definition: "the occurrence of finding something good or useful without looking for it." },
  { term: "wanderlust", pronunciation: "/ˈwɒn.dər.lʌst/", partOfSpeech: "n.", definition: "a strong desire to travel and explore the world." },
  { term: "mellifluous", pronunciation: "/məˈlɪf.lu.əs/", partOfSpeech: "adj.", definition: "a sound that is sweet and smooth, pleasing to hear." },
];

const QUOTES = [
  { text: "Nothing in life is to be feared, it is only to be understood.", author: "Marie Curie" },
  { text: "Knowing yourself is the beginning of all wisdom.", author: "Aristotle" },
  { text: "It does not matter how slowly you go as long as you do not stop.", author: "Confucius" },
  { text: "You have power over your mind, not outside events. Realize this, and you will find strength.", author: "Marcus Aurelius" },
  { text: "The unexamined life is not worth living.", author: "Socrates" },
];

const YOGAS = [
  { sanskrit: "Vrksasana", english: "Tree Pose", benefit: "Improves balance and focus while grounding the mind before the day begins." },
  { sanskrit: "Adho Mukha Svanasana", english: "Downward-Facing Dog", benefit: "Stretches the shoulders, hamstrings, and calves while calming the nervous system." },
  { sanskrit: "Balasana", english: "Child's Pose", benefit: "A gentle resting pose that relieves tension in the back, shoulders, and neck." },
  { sanskrit: "Virabhadrasana II", english: "Warrior II", benefit: "Builds strength and stability in the legs while opening the hips and chest." },
  { sanskrit: "Bhujangasana", english: "Cobra Pose", benefit: "Strengthens the spine and opens the chest, countering the effects of sitting." },
];

const EXERCISES = [
  { name: "Bodyweight Squats", dosage: "3 sets × 15 reps", benefit: "Builds lower-body strength and mobility — no equipment needed." },
  { name: "Push-Ups", dosage: "3 sets × 10 reps", benefit: "Strengthens the chest, shoulders, and triceps using just your bodyweight." },
  { name: "Plank Hold", dosage: "3 rounds × 30 seconds", benefit: "Builds core stability and improves posture." },
  { name: "Walking Lunges", dosage: "3 sets × 10 per leg", benefit: "Builds single-leg strength and balance." },
  { name: "Jumping Jacks", dosage: "3 sets × 30 seconds", benefit: "A quick way to raise your heart rate and wake up the body." },
];

const SONGS = [
  { title: "Here Comes the Sun", artist: "The Beatles", year: "1969", note: "Written by George Harrison after a long, difficult winter — a quiet reminder that things do get better." },
  { title: "What a Wonderful World", artist: "Louis Armstrong", year: "1967", note: "A gentle, hopeful standard that's become one of the most covered songs in American music." },
  { title: "Three Little Birds", artist: "Bob Marley & The Wailers", year: "1977", note: "A reggae classic built around a simple, comforting refrain: every little thing is gonna be alright." },
  { title: "Good Vibrations", artist: "The Beach Boys", year: "1966", note: "Famous for its unusual, layered production — it took over six months and multiple studios to record." },
  { title: "Walking on Sunshine", artist: "Katrina and the Waves", year: "1983", note: "An upbeat, horn-driven pop song that's remained a go-to feel-good anthem for decades." },
];

const WORDLE_WORDS = ["PLANT", "CRANE", "MANGO", "TRAIN", "GHOST"];

const TODAY_DATA = {
  catalogNo: String(dayOfYear(new Date())).padStart(3, "0"),
  image: { ...pickForToday(IMAGES), plate: "Plate I" },
  word: pickForToday(WORDS),
  quote: pickForToday(QUOTES),
  yoga: pickForToday(YOGAS),
  exercise: pickForToday(EXERCISES),
  song: pickForToday(SONGS),
  wordle: { answer: pickForToday(WORDLE_WORDS) },
};

/* ============================================================
   HELPERS
   ============================================================ */
const uid = () => `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

function fmtDate(d) {
  return d
    .toLocaleDateString("en-US", { weekday: "long", month: "short", day: "numeric", year: "numeric" })
    .toUpperCase();
}
function dateKeyFor(d) {
  const y = d.getFullYear(), m = String(d.getMonth() + 1).padStart(2, "0"), day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}
function todayKey(prefix) { return `${prefix}:${dateKeyFor(new Date())}`; }
function yesterdayKey(prefix) {
  const d = new Date(); d.setDate(d.getDate() - 1);
  return `${prefix}:${dateKeyFor(d)}`;
}
function monthYear(dateISO) {
  const d = new Date(dateISO);
  return { month: d.toLocaleDateString("en-US", { month: "long" }), year: d.getFullYear() };
}

async function resolveCommonsImageUrl(fileTitle, widthPx = 800) {
  try {
    const endpoint =
      "https://commons.wikimedia.org/w/api.php?action=query&prop=imageinfo&iiprop=url" +
      `&iiurlwidth=${widthPx}&format=json&origin=*&titles=` +
      encodeURIComponent(`File:${fileTitle}`);
    const res = await fetch(endpoint);
    if (!res.ok) {
      console.error("Commons API request failed", res.status, res.statusText);
      return null;
    }
    const data = await res.json();
    const pages = data?.query?.pages;
    if (!pages) {
      console.error("Commons API returned no pages", data);
      return null;
    }
    const page = Object.values(pages)[0];
    if (page?.missing !== undefined) {
      console.error("Commons file not found:", fileTitle);
      return null;
    }
    const info = page?.imageinfo?.[0];
    const url = info ? info.thumburl || info.url : null;
    if (!url) console.error("Commons page had no imageinfo", page);
    return url;
  } catch (e) {
    console.error("Could not resolve Commons image", e);
    return null;
  }
}

/* ============================================================
   SHARED HEADER
   ============================================================ */
function SectionHeader({ title, plate, dateStr }) {
  return (
    <>
      <div style={styles.header}>
        <div>
          <div style={styles.kicker}>MAKTUB</div>
          <h1 style={styles.masthead}>{title}</h1>
        </div>
        <div style={styles.headerRight}>
          <div style={styles.specimenTag}>{plate}</div>
          <div style={styles.dateStr}>{dateStr}</div>
        </div>
      </div>
      <hr style={styles.headerRule} />
    </>
  );
}

/* ============================================================
   TODAY VIEW (dashboard)
   ============================================================ */
function TodayView({ dateStr, onOpenPuzzle }) {
  const [imgUrl, setImgUrl] = useState(null);
  const [imgFailed, setImgFailed] = useState(false);

  useEffect(() => {
    let cancelled = false;
    resolveCommonsImageUrl(TODAY_DATA.image.commonsFile).then((url) => {
      if (cancelled) return;
      if (url) setImgUrl(url);
      else setImgFailed(true);
    });
    return () => { cancelled = true; };
  }, []);

  return (
    <div>
      <SectionHeader title="Daily Rituals" plate={`No. ${TODAY_DATA.catalogNo}`} dateStr={dateStr} />

      <div style={styles.platewrap} className="card">
        <div className="tag">{TODAY_DATA.image.plate}</div>
        {imgUrl && (
          <img src={imgUrl} alt={TODAY_DATA.image.title} style={styles.plateImg} />
        )}
        {!imgUrl && !imgFailed && (
          <div style={styles.imgPlaceholder}>Loading today's image...</div>
        )}
        {imgFailed && (
          <div style={styles.imgPlaceholder}>Image unavailable today.</div>
        )}
        <div style={{ paddingTop: 16 }}>
          <h2 style={styles.plateTitle}>{TODAY_DATA.image.title}</h2>
          <div style={styles.plateOrigin}>{TODAY_DATA.image.origin}</div>
          <hr className="divider" />
          <p style={styles.plateHistory}>{TODAY_DATA.image.history}</p>
        </div>
      </div>

      <div style={styles.twoCol} className="two-col">
        <div className="card">
          <div className="tag">SPECIMEN — LEXICON</div>
          <div style={styles.cardLabel}>Word of the Day</div>
          <div style={styles.wordTerm}>{TODAY_DATA.word.term}</div>
          <div style={styles.wordMeta}>{TODAY_DATA.word.pronunciation} &nbsp;·&nbsp; {TODAY_DATA.word.partOfSpeech}</div>
          <hr className="divider" />
          <p style={styles.wordDef}>{TODAY_DATA.word.definition}</p>
        </div>

        <div className="card">
          <div className="tag">SPECIMEN — INSCRIPTION</div>
          <div style={styles.cardLabel}>Quote of the Day</div>
          <p style={styles.quoteText}>&ldquo;{TODAY_DATA.quote.text}&rdquo;</p>
          <div style={styles.wordMeta}>— {TODAY_DATA.quote.author}</div>
        </div>

        <div className="card">
          <div className="tag">SPECIMEN — POSTURE</div>
          <div style={styles.cardLabel}>Yoga Pose</div>
          <div style={styles.wordTerm}>{TODAY_DATA.yoga.english}</div>
          <div style={styles.wordMeta}>{TODAY_DATA.yoga.sanskrit}</div>
          <hr className="divider" />
          <p style={styles.wordDef}>{TODAY_DATA.yoga.benefit}</p>
        </div>

        <div className="card">
          <div className="tag">SPECIMEN — MOVEMENT</div>
          <div style={styles.cardLabel}>Exercise of the Day</div>
          <div style={styles.wordTerm}>{TODAY_DATA.exercise.name}</div>
          <div style={styles.wordMeta}>{TODAY_DATA.exercise.dosage}</div>
          <hr className="divider" />
          <p style={styles.wordDef}>{TODAY_DATA.exercise.benefit}</p>
        </div>

        <div className="card">
          <div className="tag">SPECIMEN — RECORDING</div>
          <div style={styles.cardLabel}>Song of the Day</div>
          <div style={styles.wordTerm}>{TODAY_DATA.song.title}</div>
          <div style={styles.wordMeta}>{TODAY_DATA.song.artist} &nbsp;·&nbsp; {TODAY_DATA.song.year}</div>
          <hr className="divider" />
          <p style={styles.wordDef}>{TODAY_DATA.song.note}</p>
        </div>

        <div className="card">
          <div className="tag">SPECIMEN — WORD GUESS</div>
          <div style={styles.cardLabel}>Daily Word Guess</div>
          <div style={styles.wordleTeaserRow}>
            {TODAY_DATA.wordle.answer.split("").map((_, i) => (
              <div key={i} style={styles.wordleTeaserCell} />
            ))}
          </div>
          <hr className="divider" />
          <p style={styles.wordDef}>Guess the {TODAY_DATA.wordle.answer.length}-letter word in six tries.</p>
          <button className="solve-link-btn" onClick={onOpenPuzzle}>Play today's word →</button>
        </div>
      </div>
      <div style={styles.footer}>Collected daily, one plate at a time.</div>
    </div>
  );
}

/* ============================================================
   PUZZLE VIEW (dedicated crossword screen)
   ============================================================ */
const MAX_GUESSES = 6;
const KEYBOARD_ROWS = [
  ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
  ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
  ["ENTER", "Z", "X", "C", "V", "B", "N", "M", "BACK"],
];

function scoreGuess(guess, answer) {
  const result = Array(guess.length).fill("absent");
  const answerLetters = answer.split("");
  const used = Array(answer.length).fill(false);

  // first pass: correct position
  for (let i = 0; i < guess.length; i++) {
    if (guess[i] === answerLetters[i]) {
      result[i] = "correct";
      used[i] = true;
    }
  }
  // second pass: right letter, wrong position
  for (let i = 0; i < guess.length; i++) {
    if (result[i] === "correct") continue;
    const idx = answerLetters.findIndex((l, j) => l === guess[i] && !used[j]);
    if (idx !== -1) {
      result[i] = "present";
      used[idx] = true;
    }
  }
  return result;
}

function WordleView({ dateStr, onBack }) {
  const answer = TODAY_DATA.wordle.answer.toUpperCase();
  const wordLength = answer.length;
  const key = useRef(todayKey("wordle"));

  const [guesses, setGuesses] = useState([]); // array of {letters, scores}
  const [current, setCurrent] = useState("");
  const [status, setStatus] = useState("playing"); // playing | won | lost
  const [loaded, setLoaded] = useState(false);
  const [shakeRow, setShakeRow] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const result = await window.storage.get(key.current, false);
        if (result && result.value) {
          const saved = JSON.parse(result.value);
          setGuesses(saved.guesses || []);
          setStatus(saved.status || "playing");
        }
      } catch {} finally { setLoaded(true); }
    })();
  }, []);

  useEffect(() => {
    if (!loaded) return;
    window.storage.set(key.current, JSON.stringify({ guesses, status }), false).catch(() => {});
  }, [guesses, status, loaded]);

  function submitGuess() {
    if (status !== "playing") return;
    if (current.length !== wordLength) {
      setMessage(`Word must be ${wordLength} letters.`);
      setShakeRow(true);
      setTimeout(() => setShakeRow(false), 400);
      return;
    }
    setMessage("");
    const scores = scoreGuess(current, answer);
    const nextGuesses = [...guesses, { letters: current, scores }];
    setGuesses(nextGuesses);
    setCurrent("");

    if (current === answer) {
      setStatus("won");
    } else if (nextGuesses.length >= MAX_GUESSES) {
      setStatus("lost");
    }
  }

  function pressKey(k) {
    if (status !== "playing") return;
    if (k === "ENTER") { submitGuess(); return; }
    if (k === "BACK") { setCurrent((prev) => prev.slice(0, -1)); return; }
    if (current.length < wordLength) setCurrent((prev) => prev + k);
  }

  useEffect(() => {
    function handleKey(e) {
      if (status !== "playing") return;
      if (e.key === "Enter") submitGuess();
      else if (e.key === "Backspace") setCurrent((prev) => prev.slice(0, -1));
      else if (/^[a-zA-Z]$/.test(e.key)) pressKey(e.key.toUpperCase());
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [current, status, guesses]);

  // letter statuses for the on-screen keyboard
  const keyStatus = {};
  guesses.forEach((g) => {
    g.letters.split("").forEach((l, i) => {
      const s = g.scores[i];
      const rank = { absent: 0, present: 1, correct: 2 };
      if (!(l in keyStatus) || rank[s] > rank[keyStatus[l]]) keyStatus[l] = s;
    });
  });

  const rowsToRender = Array.from({ length: MAX_GUESSES });

  return (
    <div>
      <div style={styles.header}>
        <div>
          <button className="text-link" onClick={onBack} style={{ marginBottom: 8, display: "inline-block" }}>← back to today</button>
          <div style={styles.kicker}>MAKTUB</div>
          <h1 style={styles.masthead}>Today's Word</h1>
        </div>
        <div style={styles.headerRight}>
          <div style={styles.specimenTag}>Word Guess</div>
          <div style={styles.dateStr}>{dateStr}</div>
        </div>
      </div>
      <hr style={styles.headerRule} />

      <div style={styles.card} className="card">
        <div style={styles.wordleBoard}>
          {rowsToRender.map((_, rowIdx) => {
            const submitted = guesses[rowIdx];
            const isCurrentRow = rowIdx === guesses.length && status === "playing";
            const letters = submitted
              ? submitted.letters.split("")
              : isCurrentRow
              ? current.padEnd(wordLength, " ").split("")
              : Array(wordLength).fill(" ");

            return (
              <div
                key={rowIdx}
                style={{
                  ...styles.wordleRow,
                  ...(isCurrentRow && shakeRow ? { animation: "shake 0.4s" } : {}),
                }}
              >
                {letters.map((l, i) => {
                  const s = submitted ? submitted.scores[i] : null;
                  const bg = s === "correct" ? "#3F5443" : s === "present" ? "#B98A3D" : s === "absent" ? "#8C8360" : "#FBF7EC";
                  const color = s ? "#F1ECDC" : "#2B2A25";
                  const border = s ? "1px solid transparent" : "2px solid #C9BFA0";
                  return (
                    <div key={i} style={{ ...styles.wordleCell, background: bg, color, border }}>
                      {l.trim()}
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>

        {message && <div style={styles.puzzleResult}>{message}</div>}
        {status === "won" && (
          <div style={styles.puzzleResult}>Solved it in {guesses.length} {guesses.length === 1 ? "guess" : "guesses"}. Nicely done.</div>
        )}
        {status === "lost" && (
          <div style={styles.puzzleResult}>Out of guesses — today's word was {answer}.</div>
        )}

        <div style={styles.keyboardWrap}>
          {KEYBOARD_ROWS.map((row, ri) => (
            <div key={ri} style={styles.keyboardRow}>
              {row.map((k) => {
                const s = keyStatus[k];
                const bg = s === "correct" ? "#3F5443" : s === "present" ? "#B98A3D" : s === "absent" ? "#8C8360" : "#FBF7EC";
                const color = s ? "#F1ECDC" : "#2B2A25";
                const wide = k === "ENTER" || k === "BACK";
                return (
                  <button
                    key={k}
                    onClick={() => pressKey(k)}
                    style={{
                      ...styles.keyBtn,
                      background: bg,
                      color,
                      flex: wide ? 1.6 : 1,
                    }}
                  >
                    {k === "BACK" ? "⌫" : k}
                  </button>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function TasksView({ dateStr }) {
  const [tasks, setTasks] = useState([]);
  const [draft, setDraft] = useState("");
  const [loaded, setLoaded] = useState(false);
  const key = useRef(todayKey("todos"));

  useEffect(() => {
    (async () => {
      try {
        const result = await window.storage.get(key.current, false);
        if (result && result.value) { setTasks(JSON.parse(result.value)); }
        else throw new Error("none");
      } catch {
        try {
          const prev = await window.storage.get(yesterdayKey("todos"), false);
          const prevTasks = prev && prev.value ? JSON.parse(prev.value) : [];
          setTasks(prevTasks.filter((t) => !t.done).map((t) => ({ id: uid(), text: t.text, done: false, carried: true })));
        } catch { setTasks([]); }
      } finally { setLoaded(true); }
    })();
  }, []);

  useEffect(() => {
    if (!loaded) return;
    const t = setTimeout(() => window.storage.set(key.current, JSON.stringify(tasks), false).catch(() => {}), 400);
    return () => clearTimeout(t);
  }, [tasks, loaded]);

  function addTask() {
    const text = draft.trim(); if (!text) return;
    setTasks((prev) => [...prev, { id: uid(), text, done: false, carried: false }]);
    setDraft("");
  }
  const toggleTask = (id) => setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));
  const removeTask = (id) => setTasks((prev) => prev.filter((t) => t.id !== id));
  const doneCount = tasks.filter((t) => t.done).length;

  return (
    <div>
      <SectionHeader title="Morning Ledger" plate="Plate II" dateStr={dateStr} />
      <div style={styles.card} className="card">
        <div style={styles.progressRow}>
          <span style={styles.cardLabel}>TODAY'S TASKS</span>
          <span style={styles.progressCount}>{doneCount} / {tasks.length} complete</span>
        </div>
        <div style={styles.addRow}>
          <input className="field-input" style={{ flex: 1 }} type="text" placeholder="What needs doing today?"
            value={draft} onChange={(e) => setDraft(e.target.value)} onKeyDown={(e) => e.key === "Enter" && addTask()} />
          <button className="btn" onClick={addTask}>ADD</button>
        </div>
        <div style={{ marginTop: 8 }}>
          {tasks.length === 0 && <div style={styles.emptyState}>Nothing recorded yet — begin your day by adding a task above.</div>}
          {tasks.map((t) => (
            <div className="task-row" key={t.id}>
              <div className={`checkbox ${t.done ? "checked" : ""}`} onClick={() => toggleTask(t.id)}>{t.done ? "✓" : ""}</div>
              <div className={`task-text ${t.done ? "done" : ""}`} onClick={() => toggleTask(t.id)}>
                {t.text}{t.carried && !t.done && <span style={styles.carriedTag}>↺ carried over</span>}
              </div>
              <button className="text-link" onClick={() => removeTask(t.id)}>remove</button>
            </div>
          ))}
        </div>
      </div>
      <div style={styles.footer}>Recorded each morning, one entry at a time.</div>
    </div>
  );
}

/* ============================================================
   JOURNAL VIEW (evening reflection)
   ============================================================ */
function JournalView({ dateStr }) {
  const [entry, setEntry] = useState("");
  const [loaded, setLoaded] = useState(false);
  const [savedAt, setSavedAt] = useState(null);
  const [pastEntries, setPastEntries] = useState([]);
  const [showArchive, setShowArchive] = useState(false);
  const [archiveLoading, setArchiveLoading] = useState(false);
  const key = useRef(todayKey("journal"));

  useEffect(() => {
    (async () => {
      try {
        const result = await window.storage.get(key.current, false);
        if (result && result.value) setEntry(JSON.parse(result.value).text || "");
      } catch {} finally { setLoaded(true); }
    })();
  }, []);

  useEffect(() => {
    if (!loaded) return;
    const t = setTimeout(async () => {
      try { await window.storage.set(key.current, JSON.stringify({ text: entry }), false); setSavedAt(new Date()); }
      catch (e) { console.error(e); }
    }, 600);
    return () => clearTimeout(t);
  }, [entry, loaded]);

  async function loadArchive() {
    setArchiveLoading(true);
    try {
      const list = await window.storage.list("journal:", false);
      const keys = (list && list.keys) || [];
      const entries = [];
      for (const k of keys) {
        if (k === key.current) continue;
        try {
          const res = await window.storage.get(k, false);
          if (res && res.value) entries.push({ date: k.replace("journal:", ""), text: JSON.parse(res.value).text });
        } catch {}
      }
      entries.sort((a, b) => (a.date < b.date ? 1 : -1));
      setPastEntries(entries);
    } catch { setPastEntries([]); } finally { setArchiveLoading(false); }
  }
  function toggleArchive() {
    const next = !showArchive; setShowArchive(next);
    if (next && pastEntries.length === 0) loadArchive();
  }

  return (
    <div>
      <SectionHeader title="Evening Reflection" plate="Plate III" dateStr={dateStr} />
      <div style={styles.card} className="card">
        <div style={styles.cardLabel}>TONIGHT'S ENTRY</div>
        <textarea className="journal-textarea" placeholder="Write about whatever feels right tonight..."
          value={entry} onChange={(e) => setEntry(e.target.value)} />
        <div style={{ marginTop: 10, textAlign: "right" }}>
          <span style={styles.savedText}>{savedAt ? `Saved ${savedAt.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}` : "\u00A0"}</span>
        </div>
      </div>

      <div style={{ marginTop: 22 }}>
        <button className="tab-btn" onClick={toggleArchive}>{showArchive ? "HIDE PAST ENTRIES" : "VIEW PAST ENTRIES"}</button>
        {showArchive && (
          <div style={{ ...styles.card, marginTop: 14 }} className="card">
            <div style={styles.archiveNote}>Past entries are a fixed record and can't be edited.</div>
            {archiveLoading && <div style={styles.emptyState}>Gathering past entries...</div>}
            {!archiveLoading && pastEntries.length === 0 && <div style={styles.emptyState}>No past entries yet — tonight's will be the first.</div>}
            {!archiveLoading && pastEntries.map((e) => (
              <div className="archive-entry" key={e.date}>
                <div style={styles.archiveDate}>{e.date}</div>
                <p style={styles.archiveText}>{e.text || "(no entry written)"}</p>
              </div>
            ))}
          </div>
        )}
      </div>
      <div style={styles.footer}>Written each evening, one page at a time.</div>
    </div>
  );
}

/* ============================================================
   BOOKS VIEW (book journal)
   ============================================================ */
function BooksView({ dateStr }) {
  const STORAGE_KEY = "book-journal:library";
  const TOREAD_KEY = "book-journal:toread";
  const [books, setBooks] = useState([]);
  const [toRead, setToRead] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [tab, setTab] = useState("reading");
  const [newTitle, setNewTitle] = useState("");
  const [newAuthor, setNewAuthor] = useState("");
  const [newTotalPages, setNewTotalPages] = useState("");
  const [quoteDraft, setQuoteDraft] = useState({});
  const [tbrTitle, setTbrTitle] = useState("");
  const [tbrAuthor, setTbrAuthor] = useState("");
  const [startingId, setStartingId] = useState(null);
  const [startingPages, setStartingPages] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const result = await window.storage.get(STORAGE_KEY, false);
        if (result && result.value) setBooks(JSON.parse(result.value));
      } catch {}
      try {
        const result = await window.storage.get(TOREAD_KEY, false);
        if (result && result.value) setToRead(JSON.parse(result.value));
      } catch {}
      setLoaded(true);
    })();
  }, []);
  useEffect(() => {
    if (!loaded) return;
    const t = setTimeout(() => window.storage.set(STORAGE_KEY, JSON.stringify(books), false).catch(() => {}), 400);
    return () => clearTimeout(t);
  }, [books, loaded]);
  useEffect(() => {
    if (!loaded) return;
    const t = setTimeout(() => window.storage.set(TOREAD_KEY, JSON.stringify(toRead), false).catch(() => {}), 400);
    return () => clearTimeout(t);
  }, [toRead, loaded]);

  function addBook() {
    const title = newTitle.trim();
    const totalPages = Math.max(1, Number(newTotalPages) || 0);
    if (!title || !totalPages) return;
    setBooks((prev) => [...prev, { id: uid(), title, author: newAuthor.trim(), status: "reading", totalPages, pagesRead: 0, quotes: [], startedAt: new Date().toISOString(), finishedAt: null }]);
    setNewTitle(""); setNewAuthor(""); setNewTotalPages("");
  }
  function updatePagesRead(id, pages) {
    setBooks((prev) => prev.map((b) => b.id !== id ? b : { ...b, pagesRead: Math.max(0, Math.min(b.totalPages, Number(pages) || 0)) }));
  }
  function markFinished(id) {
    setBooks((prev) => prev.map((b) => b.id === id ? { ...b, status: "finished", pagesRead: b.totalPages, finishedAt: new Date().toISOString() } : b));
  }
  const removeBook = (id) => setBooks((prev) => prev.filter((b) => b.id !== id));
  function addQuote(bookId) {
    const text = (quoteDraft[bookId] || "").trim(); if (!text) return;
    setBooks((prev) => prev.map((b) => b.id === bookId ? { ...b, quotes: [...b.quotes, { id: uid(), text, addedAt: new Date().toISOString() }] } : b));
    setQuoteDraft((prev) => ({ ...prev, [bookId]: "" }));
  }
  const removeQuote = (bookId, quoteId) => setBooks((prev) => prev.map((b) => b.id === bookId ? { ...b, quotes: b.quotes.filter((q) => q.id !== quoteId) } : b));

  function addToRead() {
    const title = tbrTitle.trim(); if (!title) return;
    setToRead((prev) => [...prev, { id: uid(), title, author: tbrAuthor.trim() }]);
    setTbrTitle(""); setTbrAuthor("");
  }
  const removeToRead = (id) => setToRead((prev) => prev.filter((b) => b.id !== id));
  function beginStartReading(id) { setStartingId(id); setStartingPages(""); }
  function cancelStartReading() { setStartingId(null); setStartingPages(""); }
  function confirmStartReading(item) {
    const totalPages = Math.max(1, Number(startingPages) || 0);
    if (!totalPages) return;
    setBooks((prev) => [...prev, { id: uid(), title: item.title, author: item.author, status: "reading", totalPages, pagesRead: 0, quotes: [], startedAt: new Date().toISOString(), finishedAt: null }]);
    setToRead((prev) => prev.filter((b) => b.id !== item.id));
    setStartingId(null); setStartingPages("");
  }

  const reading = books.filter((b) => b.status === "reading");
  const finished = books.filter((b) => b.status === "finished");
  const historyGroups = {};
  finished.forEach((b) => {
    const { month, year } = monthYear(b.finishedAt);
    if (!historyGroups[year]) historyGroups[year] = {};
    if (!historyGroups[year][month]) historyGroups[year][month] = [];
    historyGroups[year][month].push(b);
  });
  const years = Object.keys(historyGroups).sort((a, b) => b - a);
  const allQuotes = books.flatMap((b) => b.quotes.map((q) => ({ ...q, bookTitle: b.title, bookAuthor: b.author })));

  return (
    <div>
      <SectionHeader title="Book Journal" plate="Plate IV" dateStr={dateStr} />
      <div style={styles.tabRow}>
        <button className={`tab-btn ${tab === "reading" ? "active" : ""}`} onClick={() => setTab("reading")}>READING</button>
        <button className={`tab-btn ${tab === "toread" ? "active" : ""}`} onClick={() => setTab("toread")}>TO READ</button>
        <button className={`tab-btn ${tab === "quotes" ? "active" : ""}`} onClick={() => setTab("quotes")}>QUOTES</button>
        <button className={`tab-btn ${tab === "history" ? "active" : ""}`} onClick={() => setTab("history")}>HISTORY</button>
      </div>

      {tab === "reading" && (
        <>
          <div style={styles.card} className="card">
            <div style={styles.cardLabel}>ADD A BOOK</div>
            <div style={styles.addBookRow}>
              <input className="field-input" style={{ flex: 2 }} type="text" placeholder="Title" value={newTitle} onChange={(e) => setNewTitle(e.target.value)} />
              <input className="field-input" style={{ flex: 1 }} type="text" placeholder="Author" value={newAuthor} onChange={(e) => setNewAuthor(e.target.value)} />
              <input className="field-input" style={{ flex: "0 0 80px" }} type="number" min="1" placeholder="Pages" value={newTotalPages} onChange={(e) => setNewTotalPages(e.target.value)} />
              <button className="btn" onClick={addBook}>ADD</button>
            </div>
          </div>

          {reading.length === 0 && <div style={styles.emptyState}>Nothing currently on the shelf — add a book above.</div>}

          {reading.map((b) => (
            <div style={{ ...styles.card, marginTop: 16 }} className="card" key={b.id}>
              <div style={styles.bookHeaderRow}>
                <div>
                  <div style={styles.wordTerm}>{b.title}</div>
                  {b.author && <div style={styles.wordMeta}>{b.author}</div>}
                </div>
                <button className="text-link" onClick={() => removeBook(b.id)}>remove</button>
              </div>
              <div style={styles.progressRow}>
                <div className="progress-track"><div className="progress-fill" style={{ width: `${Math.round((b.pagesRead / b.totalPages) * 100)}%` }} /></div>
                <span style={styles.percentLabel}>{Math.round((b.pagesRead / b.totalPages) * 100)}%</span>
              </div>
              <div style={styles.pagesRow}>
                <input className="field-input" style={{ width: 70 }} type="number" min="0" max={b.totalPages} value={b.pagesRead} onChange={(e) => updatePagesRead(b.id, e.target.value)} />
                <span style={styles.wordMeta}>of {b.totalPages} pages read</span>
              </div>
              <div style={{ marginTop: 12 }}><button className="btn" onClick={() => markFinished(b.id)}>MARK FINISHED</button></div>
              <hr className="divider" />
              <div style={styles.cardLabel}>SAVE A QUOTE</div>
              <div style={styles.addBookRow}>
                <input className="field-input" style={{ flex: 1 }} type="text" placeholder="Type a quote from this book..."
                  value={quoteDraft[b.id] || ""} onChange={(e) => setQuoteDraft((prev) => ({ ...prev, [b.id]: e.target.value }))}
                  onKeyDown={(e) => e.key === "Enter" && addQuote(b.id)} />
                <button className="btn secondary" onClick={() => addQuote(b.id)}>SAVE</button>
              </div>
              {b.quotes.length > 0 && (
                <div style={{ marginTop: 10 }}>
                  {b.quotes.map((q) => (
                    <div key={q.id} style={styles.quoteRow}>
                      <span style={styles.quoteInlineText}>&ldquo;{q.text}&rdquo;</span>
                      <button className="text-link" onClick={() => removeQuote(b.id, q.id)}>remove</button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </>
      )}

      {tab === "toread" && (
        <>
          <div style={styles.card} className="card">
            <div style={styles.cardLabel}>ADD TO YOUR LIST</div>
            <div style={styles.addBookRow}>
              <input className="field-input" style={{ flex: 2 }} type="text" placeholder="Title" value={tbrTitle} onChange={(e) => setTbrTitle(e.target.value)} onKeyDown={(e) => e.key === "Enter" && addToRead()} />
              <input className="field-input" style={{ flex: 1 }} type="text" placeholder="Author" value={tbrAuthor} onChange={(e) => setTbrAuthor(e.target.value)} onKeyDown={(e) => e.key === "Enter" && addToRead()} />
              <button className="btn" onClick={addToRead}>ADD</button>
            </div>
          </div>

          {toRead.length === 0 && <div style={styles.emptyState}>Your to-be-read pile is empty — add a title above.</div>}

          {toRead.map((item) => (
            <div style={{ ...styles.card, marginTop: 16 }} className="card" key={item.id}>
              <div style={styles.bookHeaderRow}>
                <div>
                  <div style={styles.wordTerm}>{item.title}</div>
                  {item.author && <div style={styles.wordMeta}>{item.author}</div>}
                </div>
                <button className="text-link" onClick={() => removeToRead(item.id)}>remove</button>
              </div>

              {startingId !== item.id ? (
                <div style={{ marginTop: 12 }}>
                  <button className="btn" onClick={() => beginStartReading(item.id)}>START READING</button>
                </div>
              ) : (
                <div style={{ marginTop: 14 }}>
                  <hr className="divider" />
                  <div style={styles.cardLabel}>HOW MANY PAGES IS IT?</div>
                  <div style={styles.addBookRow}>
                    <input className="field-input" style={{ flex: "0 0 90px" }} type="number" min="1" placeholder="Pages" value={startingPages} onChange={(e) => setStartingPages(e.target.value)} onKeyDown={(e) => e.key === "Enter" && confirmStartReading(item)} />
                    <button className="btn" onClick={() => confirmStartReading(item)}>CONFIRM</button>
                    <button className="text-link" onClick={cancelStartReading}>cancel</button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </>
      )}

      {tab === "quotes" && (
        <div style={styles.card} className="card">
          <div style={styles.cardLabel}>ALL SAVED QUOTES</div>
          {allQuotes.length === 0 && <div style={styles.emptyState}>No quotes saved yet — add some from the Reading tab.</div>}
          {allQuotes.map((q) => (
            <div key={q.id} style={{ padding: "14px 0", borderBottom: "1px dashed #C9BFA0" }}>
              <p style={styles.quoteText}>&ldquo;{q.text}&rdquo;</p>
              <div style={styles.wordMeta}>— {q.bookTitle}{q.bookAuthor ? `, ${q.bookAuthor}` : ""}</div>
            </div>
          ))}
        </div>
      )}

      {tab === "history" && (
        <div style={styles.card} className="card">
          <div style={styles.cardLabel}>BOOKS FINISHED, BY YEAR</div>
          {years.length === 0 && <div style={styles.emptyState}>No finished books yet — mark one complete from the Reading tab.</div>}
          {years.map((year) => (
            <div key={year} style={{ marginBottom: 18 }}>
              <div style={styles.yearLabel}>{year}</div>
              {Object.keys(historyGroups[year]).sort((a, b) => new Date(`${b} 1, ${year}`) - new Date(`${a} 1, ${year}`)).map((month) => (
                <div key={month} style={{ marginTop: 8 }}>
                  <div style={styles.monthLabel}>{month}</div>
                  {historyGroups[year][month].map((b) => (
                    <div key={b.id} style={styles.historyRow}>
                      <span style={{ fontStyle: "italic" }}>{b.title}</span>
                      {b.author && <span style={{ color: "#5B5642", fontSize: 13 }}> — {b.author}</span>}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          ))}
        </div>
      )}
      <div style={styles.footer}>Every book, a specimen worth keeping.</div>
    </div>
  );
}

/* ============================================================
   APP SHELL — bottom tab navigation
   ============================================================ */
const TABS = [
  { id: "today", label: "Today", icon: "◆" },
  { id: "tasks", label: "Tasks", icon: "☐" },
  { id: "journal", label: "Journal", icon: "✎" },
  { id: "books", label: "Books", icon: "▤" },
];

export default function App() {
  const [active, setActive] = useState("today");
  const [puzzleOpen, setPuzzleOpen] = useState(false);
  const [dateStr, setDateStr] = useState("");

  useEffect(() => { setDateStr(fmtDate(new Date())); }, []);

  return (
    <div style={styles.appWrap}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600&family=Source+Serif+4:ital,wght@0,400;0,600;1,400&family=IBM+Plex+Mono:wght@400;500&display=swap');
        * { box-sizing: border-box; }
        body { margin: 0; }
        .card { position: relative; background: #FBF7EC; border: 1px solid #C9BFA0; padding: 22px 20px 18px; }
        .tag { position: absolute; top: -11px; left: 16px; background: #3F5443; color: #F1ECDC; font-family: 'IBM Plex Mono', monospace; font-size: 10.5px; letter-spacing: 0.06em; padding: 3px 8px; }
        .divider { border: none; border-top: 1px dashed #B7AC8A; margin: 14px 0; }
        a.solve-link { color: #A14A2F; text-decoration: none; border-bottom: 1px solid #A14A2F; font-family: 'IBM Plex Mono', monospace; font-size: 12.5px; }
        .solve-link-btn { color: #A14A2F; text-decoration: none; border: none; border-bottom: 1px solid #A14A2F; background: none; padding: 0; cursor: pointer; font-family: 'IBM Plex Mono', monospace; font-size: 12.5px; }
        @media (max-width: 640px) { .two-col { grid-template-columns: 1fr !important; } }
        .field-input { font-family: 'Source Serif 4', serif; font-size: 14px; border: none; border-bottom: 1px solid #B7AC8A; background: transparent; padding: 7px 2px; outline: none; color: #2B2A25; }
        .field-input:focus { border-bottom-color: #3F5443; }
        .btn { font-family: 'IBM Plex Mono', monospace; font-size: 11.5px; letter-spacing: 0.05em; background: #3F5443; color: #F1ECDC; border: none; padding: 8px 14px; cursor: pointer; }
        .btn:hover { background: #334536; }
        .btn.secondary { background: none; border: 1px solid #A14A2F; color: #A14A2F; }
        .btn.secondary:hover { background: #A14A2F; color: #F1ECDC; }
        .text-link { font-family: 'IBM Plex Mono', monospace; font-size: 11px; color: #A14A2F; background: none; border: none; cursor: pointer; opacity: 0.75; }
        .text-link:hover { opacity: 1; }
        .tab-btn { font-family: 'IBM Plex Mono', monospace; font-size: 12px; letter-spacing: 0.06em; background: none; border: 1px solid #3F5443; color: #3F5443; padding: 8px 14px; cursor: pointer; }
        .tab-btn.active { background: #3F5443; color: #F1ECDC; }
        .progress-track { width: 100%; height: 8px; background: #E3DBC2; border: 1px solid #C9BFA0; }
        .progress-fill { height: 100%; background: #3F5443; }
        .checkbox { width: 18px; height: 18px; border: 1.5px solid #3F5443; flex-shrink: 0; margin-top: 2px; cursor: pointer; display: flex; align-items: center; justify-content: center; font-family: 'IBM Plex Mono', monospace; font-size: 12px; color: #F1ECDC; }
        .checkbox.checked { background: #3F5443; }
        .task-row { display: flex; align-items: flex-start; gap: 10px; padding: 12px 0; border-bottom: 1px dashed #C9BFA0; }
        .task-row:last-child { border-bottom: none; }
        .task-text { flex: 1; font-size: 15px; line-height: 1.4; cursor: pointer; }
        .task-text.done { color: #9C9578; text-decoration: line-through; }
        .journal-textarea { font-family: 'Source Serif 4', serif; font-size: 15.5px; line-height: 1.7; color: #2B2A25; background: transparent; border: none; outline: none; width: 100%; min-height: 220px; resize: vertical; }
        .journal-textarea::placeholder { color: #A69E80; font-style: italic; }
        .archive-entry { border-bottom: 1px dashed #C9BFA0; padding: 14px 0; }
        .archive-entry:last-child { border-bottom: none; }
        .bottom-nav { position: sticky; bottom: 0; display: flex; background: #2B2A25; border-top: 1px solid #4A4838; }
        .nav-btn { flex: 1; background: none; border: none; color: #B7AC8A; padding: 10px 4px 12px; cursor: pointer; font-family: 'IBM Plex Mono', monospace; display: flex; flex-direction: column; align-items: center; gap: 3px; }
        .nav-btn.active { color: #F1ECDC; }
        .nav-icon { font-size: 17px; }
        .nav-label { font-size: 10px; letter-spacing: 0.05em; }
        @keyframes shake {
          10%, 90% { transform: translateX(-2px); }
          20%, 80% { transform: translateX(4px); }
          30%, 50%, 70% { transform: translateX(-8px); }
          40%, 60% { transform: translateX(8px); }
        }
      `}</style>

      <div style={styles.scrollArea}>
        {puzzleOpen ? (
          <WordleView dateStr={dateStr} onBack={() => setPuzzleOpen(false)} />
        ) : (
          <>
            {active === "today" && <TodayView dateStr={dateStr} onOpenPuzzle={() => setPuzzleOpen(true)} />}
            {active === "tasks" && <TasksView dateStr={dateStr} />}
            {active === "journal" && <JournalView dateStr={dateStr} />}
            {active === "books" && <BooksView dateStr={dateStr} />}
          </>
        )}
      </div>

      {!puzzleOpen && (
        <nav className="bottom-nav">
          {TABS.map((t) => (
            <button key={t.id} className={`nav-btn ${active === t.id ? "active" : ""}`} onClick={() => setActive(t.id)}>
              <span className="nav-icon">{t.icon}</span>
              <span className="nav-label">{t.label.toUpperCase()}</span>
            </button>
          ))}
        </nav>
      )}
    </div>
  );
}

/* ============================================================
   STYLES
   ============================================================ */
const styles = {
  appWrap: { display: "flex", flexDirection: "column", height: "100vh", background: "#EFE7D2", fontFamily: "'Source Serif 4', serif", color: "#2B2A25" },
  scrollArea: { flex: 1, overflowY: "auto", padding: "32px 20px 30px", maxWidth: 760, margin: "0 auto", width: "100%" },
  header: { display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: 10 },
  kicker: { fontFamily: "'IBM Plex Mono', monospace", fontSize: 11, letterSpacing: "0.12em", color: "#3F5443", marginBottom: 4 },
  masthead: { fontFamily: "'Fraunces', serif", fontSize: 34, fontWeight: 600, margin: 0, letterSpacing: "-0.01em" },
  headerRight: { textAlign: "right" },
  specimenTag: { fontFamily: "'IBM Plex Mono', monospace", fontSize: 12, color: "#A14A2F", letterSpacing: "0.05em" },
  dateStr: { fontFamily: "'IBM Plex Mono', monospace", fontSize: 11, color: "#5B5642", marginTop: 2 },
  headerRule: { border: "none", borderTop: "2px solid #2B2A25", margin: "14px 0 22px" },
  platewrap: { marginBottom: 22 },
  plateImg: { width: "100%", display: "block", filter: "sepia(8%)", border: "1px solid #C9BFA0" },
  imgPlaceholder: {
    width: "100%",
    minHeight: 220,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "#E3DBC2",
    border: "1px solid #C9BFA0",
    fontFamily: "'IBM Plex Mono', monospace",
    fontSize: 12.5,
    color: "#8C8360",
    fontStyle: "italic",
  },
  plateTitle: { fontFamily: "'Fraunces', serif", fontSize: 24, fontWeight: 600, margin: "0 0 4px" },
  plateOrigin: { fontFamily: "'IBM Plex Mono', monospace", fontSize: 11.5, color: "#5B5642", letterSpacing: "0.03em" },
  plateHistory: { fontSize: 15, lineHeight: 1.6, margin: 0, color: "#3A382F" },
  twoCol: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18 },
  cardLabel: { fontFamily: "'IBM Plex Mono', monospace", fontSize: 10.5, letterSpacing: "0.08em", color: "#5B5642", marginBottom: 10, textTransform: "uppercase" },
  wordTerm: { fontFamily: "'Fraunces', serif", fontSize: 20, fontWeight: 600 },
  wordMeta: { fontFamily: "'IBM Plex Mono', monospace", fontSize: 12, color: "#5B5642", marginTop: 2 },
  wordDef: { fontSize: 14.5, lineHeight: 1.55, margin: 0, color: "#3A382F" },
  quoteText: { fontFamily: "'Fraunces', serif", fontSize: 17, fontStyle: "italic", lineHeight: 1.5, margin: "6px 0 8px" },
  wordleTeaserRow: { display: "flex", gap: 4, marginTop: 6 },
  wordleTeaserCell: { width: 22, height: 22, border: "1.5px solid #8C8360", background: "#FBF7EC" },
  footer: { textAlign: "center", fontFamily: "'IBM Plex Mono', monospace", fontSize: 11, color: "#8C8360", marginTop: 34, letterSpacing: "0.04em" },
  card: { background: "#FBF7EC", border: "1px solid #C9BFA0", padding: "20px 18px" },
  progressRow: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12, gap: 10 },
  progressCount: { fontFamily: "'IBM Plex Mono', monospace", fontSize: 11.5, color: "#3F5443" },
  addRow: { display: "flex", gap: 10, alignItems: "center", marginBottom: 6 },
  emptyState: { fontFamily: "'IBM Plex Mono', monospace", fontSize: 12.5, color: "#8C8360", fontStyle: "italic", textAlign: "center", padding: "16px 0" },
  carriedTag: { fontFamily: "'IBM Plex Mono', monospace", fontSize: 10.5, color: "#A14A2F", marginLeft: 8 },
  savedText: { fontFamily: "'IBM Plex Mono', monospace", fontSize: 11, color: "#8C8360" },
  archiveNote: { fontFamily: "'IBM Plex Mono', monospace", fontSize: 10.5, color: "#8C8360", fontStyle: "italic", marginBottom: 10 },
  archiveDate: { fontFamily: "'IBM Plex Mono', monospace", fontSize: 11, color: "#A14A2F", marginBottom: 4 },
  archiveText: { fontSize: 14, lineHeight: 1.6, margin: 0, color: "#3A382F", whiteSpace: "pre-wrap" },
  tabRow: { display: "flex", gap: 8, marginBottom: 18 },
  addBookRow: { display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap" },
  bookHeaderRow: { display: "flex", justifyContent: "space-between", alignItems: "flex-start" },
  percentLabel: { fontFamily: "'IBM Plex Mono', monospace", fontSize: 12, color: "#3F5443", minWidth: 36, textAlign: "right" },
  pagesRow: { display: "flex", alignItems: "center", gap: 10, marginTop: 10 },
  quoteRow: { display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 10, padding: "8px 0", borderBottom: "1px dashed #C9BFA0" },
  quoteInlineText: { fontSize: 14, fontStyle: "italic", lineHeight: 1.5 },
  yearLabel: { fontFamily: "'Fraunces', serif", fontSize: 20, fontWeight: 600, color: "#3F5443", marginBottom: 6 },
  monthLabel: { fontFamily: "'IBM Plex Mono', monospace", fontSize: 11.5, letterSpacing: "0.05em", color: "#A14A2F", marginBottom: 4 },
  historyRow: { fontSize: 14.5, padding: "4px 0 4px 12px" },
  wordleBoard: { display: "flex", flexDirection: "column", gap: 6, alignItems: "center" },
  wordleRow: { display: "flex", gap: 6 },
  wordleCell: {
    width: 44, height: 44, display: "flex", alignItems: "center", justifyContent: "center",
    fontFamily: "'IBM Plex Mono', monospace", fontSize: 20, fontWeight: 600,
    textTransform: "uppercase",
  },
  puzzleResult: {
    marginTop: 14, textAlign: "center", fontFamily: "'IBM Plex Mono', monospace", fontSize: 12.5, color: "#3F5443",
  },
  keyboardWrap: { marginTop: 20, display: "flex", flexDirection: "column", gap: 6 },
  keyboardRow: { display: "flex", gap: 5, justifyContent: "center" },
  keyBtn: {
    flex: 1, minWidth: 0, height: 44, border: "none", cursor: "pointer",
    fontFamily: "'IBM Plex Mono', monospace", fontSize: 12.5, fontWeight: 600,
  },
};
