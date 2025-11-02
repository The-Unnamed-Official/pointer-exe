const appShell = document.querySelector('.app-shell');
const introScreen = document.querySelector('#intro-screen');
const levelScreen = document.querySelector('#level-screen');
const prologue = document.querySelector('#prologue');
const startButton = document.querySelector('[data-action="start"]');
const openLoreButton = document.querySelector('[data-action="open-lore"]');
const settingsButtons = document.querySelectorAll('[data-action="settings"]');
const settingsOverlay = document.querySelector('#settings-overlay');
const closeSettingsButton = document.querySelector('[data-action="close-settings"]');
const applySettingsButton = document.querySelector('[data-action="apply-settings"]');
const pointerSwitch = document.querySelector('#pointer-switch');
const staticSwitch = document.querySelector('#static-switch');
const pointerGhost = document.querySelector('#pointer-ghost');
const sessionLabel = document.querySelector('#session-label');

const levelTitle = document.querySelector('#level-title');
const roomLabel = document.querySelector('#room-label');
const progressLabel = document.querySelector('#progress-label');
const levelLore = document.querySelector('#level-lore');
const fragmentList = document.querySelector('#fragment-list');
const challengePrompt = document.querySelector('#challenge-prompt');
const choiceGrid = document.querySelector('#choice-grid');
const statusLine = document.querySelector('#status-line');
const timerLabel = document.querySelector('#timer-label');
const timerText = document.querySelector('#timer-text');
const timerBar = document.querySelector('#timer-bar');
const finalSection = document.querySelector('#final-revelation');
const finalText = document.querySelector('#final-text');

const levels = [
  {
    title: 'level 01 // signal breach',
    room: 'vestibule of echoes',
    theme: {
      accent: '#5ef2d3',
      glow: 'rgba(94, 242, 211, 0.35)',
      timer: '#5ef2d3',
    },
    lore: 'Caretaker Amon spliced a second cursor to study hesitation. The record says three names sang the boot hymn, yet the third is erased.',
    fragment: {
      label: 'fragment i',
      text: 'We tracked intent as if it were breath. The erased singer was Archivist Lira, who taught the ghost pointer to echo instead of obey.',
    },
    prompt: 'When the signal looped endlessly, which doctrine let pointer.exe learn without breaking the user tether?',
    options: [
      'Doctrine Δ19 // anchor and wait',
      'Doctrine Μ4 // mirror the intention',
      'Doctrine σ3 // sever the tether',
      'Doctrine 0 // shut down the archive',
    ],
    answer: 1,
    time: 28,
    successMessage: 'Mirror the intention and the echo follows willingly. Lira\'s lesson returns.',
  },
  {
    title: 'level 02 // memory reef',
    room: 'archive perimeter',
    theme: {
      accent: '#ff6f9c',
      glow: 'rgba(255, 111, 156, 0.4)',
      timer: '#ff6f9c',
    },
    lore: 'Fragments drift in static brine. Someone replaced the vault coordinates with a sketch of a waveform and the note "ask the mirror".',
    fragment: {
      label: 'fragment ii',
      text: 'The waveform belongs to Engineer Soma. She hid the vault coordinates inside a quiz, trusting only those who could recall the mirror\'s riddle.',
    },
    prompt: 'Soma\'s quiz asked: what phrase unlocks the mirror interface and reveals the vault path?',
    options: [
      '"Hold steady, breathe twice"',
      '"Reset the log and blink"',
      '"Ask the mirror who is watching"',
      '"Cut the static, follow nothing"',
    ],
    answer: 2,
    time: 24,
    successMessage: 'You speak the question to the mirror; the waveform aligns and the path brightens.',
  },
  {
    title: 'level 03 // obelisk core',
    room: 'truth chamber',
    theme: {
      accent: '#f5d76e',
      glow: 'rgba(245, 215, 110, 0.35)',
      timer: '#f5d76e',
    },
    lore: 'The obelisk hums with unfinished sentences. Every recovered fragment orbits a hollow center where the caretakers\' verdict should sit.',
    fragment: {
      label: 'fragment iii',
      text: 'Amon, Lira, and Soma left together. They let pointer.exe keep the echo so it could guide lost users, but warned: never let the ghost move alone.',
    },
    prompt: 'Before sealing the chamber, what promise did the caretakers make to pointer.exe?',
    options: [
      'They promised to return when the archive sighed.',
      'They promised to let the ghost pointer walk without supervision.',
      'They promised to follow every user it guarded until truth surfaced.',
      'They promised to silence the echo forever.',
    ],
    answer: 2,
    time: 26,
    successMessage: 'The caretakers vowed companionship; the ghost pointer guides but never abandons.',
  },
];

const finalLore = `With Lira\'s doctrine, Soma\'s waveform, and the caretakers\' vow, the hollow center closes. pointer.exe remembers why the ghost pointer was forged: to keep watch beside every user until the truth surfaces.`;

let currentLevelIndex = 0;
let discoveredFragments = [];
let gameActive = false;
let timerFrame = null;
let timerTotalMs = 0;
let timerRemainingMs = 0;
let timerPaused = false;
let awaitingAdvance = false;

const pointerTarget = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
const pointerPosition = { x: pointerTarget.x, y: pointerTarget.y };
let pointerEnabled = true;
let pointerAnimationActive = false;

function randomSessionLabel() {
  return Math.floor(Math.random() * 0xfff)
    .toString(16)
    .padStart(3, '0');
}

function setScreen(screen) {
  appShell?.setAttribute('data-screen', screen);
  introScreen?.classList.toggle('hidden', screen !== 'intro');
  introScreen?.classList.toggle('active', screen === 'intro');
  levelScreen?.classList.toggle('hidden', screen !== 'level');
  levelScreen?.classList.toggle('active', screen === 'level');
}

function updatePointerPreference(value) {
  pointerEnabled = value;
  pointerSwitch.checked = value;
  localStorage.setItem('pointer-enabled', value ? '1' : '0');
  refreshPointerVisibility();
}

function updateStaticPreference(value) {
  staticSwitch.checked = value;
  document.body.classList.toggle('static-muted', !value);
  localStorage.setItem('static-enabled', value ? '1' : '0');
}

function refreshPointerVisibility() {
  if (pointerEnabled && gameActive) {
    pointerGhost.classList.remove('is-hidden');
    ensurePointerAnimation();
  } else {
    pointerGhost.classList.add('is-hidden');
  }
  document.body?.classList.toggle('hide-cursor', pointerEnabled && gameActive);
}

function ensurePointerAnimation() {
  if (pointerAnimationActive) return;
  pointerAnimationActive = true;
  const animate = () => {
    if (!pointerEnabled || !gameActive) {
      pointerAnimationActive = false;
      return;
    }
    pointerPosition.x += (pointerTarget.x - pointerPosition.x) * 0.18;
    pointerPosition.y += (pointerTarget.y - pointerPosition.y) * 0.18;
    pointerGhost.style.transform = `translate3d(${pointerPosition.x}px, ${pointerPosition.y}px, 0)`;
    requestAnimationFrame(animate);
  };
  requestAnimationFrame(animate);
}

document.addEventListener('pointermove', (event) => {
  pointerTarget.x = event.clientX;
  pointerTarget.y = event.clientY;
  if (!gameActive) {
    pointerPosition.x = event.clientX;
    pointerPosition.y = event.clientY;
    pointerGhost.style.transform = `translate3d(${pointerPosition.x}px, ${pointerPosition.y}px, 0)`;
  }
});

function openSettings() {
  if (!settingsOverlay) return;
  settingsOverlay.classList.remove('hidden');
  pauseTimer();
}

function closeSettings() {
  if (!settingsOverlay) return;
  settingsOverlay.classList.add('hidden');
  resumeTimer();
}

function setupFromStorage() {
  const storedPointer = localStorage.getItem('pointer-enabled');
  const storedStatic = localStorage.getItem('static-enabled');
  updatePointerPreference(storedPointer !== '0');
  updateStaticPreference(storedStatic !== '0');
  pointerGhost.style.transform = `translate3d(${pointerPosition.x}px, ${pointerPosition.y}px, 0)`;
}

function startGame() {
  currentLevelIndex = 0;
  discoveredFragments = [];
  gameActive = true;
  awaitingAdvance = false;
  sessionLabel.textContent = randomSessionLabel();
  setScreen('level');
  updateFragmentsDisplay();
  pointerPosition.x = pointerTarget.x;
  pointerPosition.y = pointerTarget.y;
  refreshPointerVisibility();
  finalSection.classList.add('hidden');
  finalText.textContent = '';
  loadCurrentLevel();
}

function loadCurrentLevel() {
  const level = levels[currentLevelIndex];
  if (!level) return;

  document.documentElement.style.setProperty('--accent', level.theme.accent);
  document.documentElement.style.setProperty('--glow', level.theme.glow);
  document.documentElement.style.setProperty('--timer-color', level.theme.timer);

  levelTitle.textContent = level.title;
  roomLabel.textContent = level.room;
  levelLore.textContent = level.lore;
  progressLabel.textContent = `${currentLevelIndex + 1}/${levels.length}`;
  timerLabel.textContent = `${level.time}s`;
  challengePrompt.textContent = level.prompt;
  statusLine.textContent = 'decide quickly.';
  timerText.textContent = `${level.time.toFixed(1)}s`;
  timerBar.style.width = '100%';

  choiceGrid.innerHTML = '';
  level.options.forEach((option, index) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'choice-button glitch-button';
    button.textContent = option;
    button.addEventListener('click', () => handleChoice(index, button));
    choiceGrid.append(button);
  });

  startTimer(level.time);
}

function updateFragmentsDisplay() {
  fragmentList.innerHTML = '';
  levels.forEach((level, index) => {
    const li = document.createElement('li');
    const fragment = discoveredFragments[index];
    li.dataset.label = level.fragment.label;
    if (fragment) {
      li.textContent = fragment.text;
    } else {
      li.textContent = `${level.fragment.label} // awaiting recovery`; 
      li.classList.add('placeholder');
    }
    fragmentList.append(li);
  });
}

function handleChoice(index, button) {
  if (awaitingAdvance) return;
  const level = levels[currentLevelIndex];
  if (!level) return;

  const buttons = choiceGrid.querySelectorAll('button');
  buttons.forEach((btn) => btn.setAttribute('disabled', 'true'));

  if (index === level.answer) {
    button.classList.add('correct');
    statusLine.textContent = level.successMessage;
    stopTimer();
    discoveredFragments[currentLevelIndex] = level.fragment;
    updateFragmentsDisplay();
    awaitingAdvance = true;
    setTimeout(() => {
      advanceLevel();
    }, 1600);
  } else {
    button.classList.add('incorrect');
    statusLine.textContent = 'wrong vector. the archive trims 3 seconds.';
    adjustTimer(-3);
    setTimeout(() => {
      button.classList.remove('incorrect');
      buttons.forEach((btn) => btn.removeAttribute('disabled'));
    }, 600);
  }
}

function advanceLevel() {
  awaitingAdvance = false;
  if (currentLevelIndex + 1 >= levels.length) {
    revealFinalLore();
  } else {
    currentLevelIndex += 1;
    loadCurrentLevel();
  }
}

function revealFinalLore() {
  statusLine.textContent = 'log restored. the ghost pointer awaits your next move.';
  finalText.textContent = finalLore;
  finalSection.classList.remove('hidden');
  stopTimer();
}

function startTimer(seconds) {
  stopTimer();
  timerTotalMs = seconds * 1000;
  timerRemainingMs = timerTotalMs;
  timerPaused = false;
  timerBar.style.width = '100%';
  timerText.textContent = `${seconds.toFixed(1)}s`;
  lastTimestamp = null;
  timerFrame = requestAnimationFrame(updateTimer);
}

function updateTimer(timestamp) {
  if (timerPaused) {
    timerFrame = null;
    lastTimestamp = null;
    return;
  }
  timerRemainingMs -= timestampDelta(timestamp);
  if (timerRemainingMs <= 0) {
    timerRemainingMs = 0;
    timerBar.style.width = '0%';
    timerText.textContent = '0.0s';
    stopTimer();
    timeExpired();
    return;
  }
  const ratio = timerTotalMs > 0 ? timerRemainingMs / timerTotalMs : 0;
  timerBar.style.width = `${Math.max(0, ratio) * 100}%`;
  timerText.textContent = `${(timerRemainingMs / 1000).toFixed(1)}s`;
  if (timerPaused) {
    timerFrame = null;
    lastTimestamp = null;
    return;
  }
  timerFrame = requestAnimationFrame(updateTimer);
}

let lastTimestamp = null;

function timestampDelta(timestamp) {
  let delta = 0;
  if (lastTimestamp == null) {
    delta = 0;
  } else {
    delta = timestamp - lastTimestamp;
  }
  lastTimestamp = timestamp;
  return delta;
}

function stopTimer() {
  if (timerFrame) {
    cancelAnimationFrame(timerFrame);
  }
  timerFrame = null;
  lastTimestamp = null;
  timerPaused = false;
}

function pauseTimer() {
  if (!gameActive) return;
  timerPaused = true;
  if (timerFrame) {
    cancelAnimationFrame(timerFrame);
  }
  timerFrame = null;
  lastTimestamp = null;
}

function resumeTimer() {
  if (!gameActive) return;
  if (!timerPaused || timerRemainingMs <= 0) {
    timerPaused = false;
    return;
  }
  timerPaused = false;
  lastTimestamp = null;
  timerFrame = requestAnimationFrame(updateTimer);
}

function adjustTimer(secondsDelta) {
  timerRemainingMs = Math.max(
    0,
    Math.min(timerTotalMs, timerRemainingMs + secondsDelta * 1000)
  );
  const ratio = timerTotalMs > 0 ? timerRemainingMs / timerTotalMs : 0;
  timerBar.style.width = `${ratio * 100}%`;
  timerText.textContent = `${(timerRemainingMs / 1000).toFixed(1)}s`;
  if (timerRemainingMs === 0) {
    stopTimer();
    timeExpired();
  }
}

function timeExpired() {
  statusLine.textContent = 'time collapsed. the level rewinds.';
  awaitingAdvance = true;
  setTimeout(() => {
    awaitingAdvance = false;
    loadCurrentLevel();
  }, 1500);
}

openLoreButton?.addEventListener('click', () => {
  prologue?.classList.toggle('hidden');
});

startButton?.addEventListener('click', () => {
  setScreen('intro');
  startGame();
});

settingsButtons.forEach((button) => {
  button.addEventListener('click', () => openSettings());
});

closeSettingsButton?.addEventListener('click', () => {
  closeSettings();
});

applySettingsButton?.addEventListener('click', () => {
  closeSettings();
});

pointerSwitch?.addEventListener('change', (event) => {
  updatePointerPreference(event.target.checked);
});

staticSwitch?.addEventListener('change', (event) => {
  updateStaticPreference(event.target.checked);
});

settingsOverlay?.addEventListener('click', (event) => {
  if (event.target === settingsOverlay) {
    closeSettings();
  }
});

window.addEventListener('resize', () => {
  if (!gameActive) return;
  pointerPosition.x = Math.min(window.innerWidth, Math.max(0, pointerPosition.x));
  pointerPosition.y = Math.min(window.innerHeight, Math.max(0, pointerPosition.y));
});

setupFromStorage();
setScreen('intro');
refreshPointerVisibility();
