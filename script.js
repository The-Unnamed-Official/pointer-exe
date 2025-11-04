const appShell = document.querySelector('.app-shell');
const introScreen = document.querySelector('#intro-screen');
const levelScreen = document.querySelector('#level-screen');
const prologue = document.querySelector('#prologue');
const startButton = document.querySelector('[data-action="start"]');
const openLoreButton = document.querySelector('[data-action="open-lore"]');
const preferenceButtons = document.querySelectorAll('[data-action="preferences"]');
const settingsOverlay = document.querySelector('#settings-overlay');
const closeSettingsButton = document.querySelector('[data-action="close-settings"]');
const applySettingsButton = document.querySelector('[data-action="apply-settings"]');
const pointerSwitch = document.querySelector('#pointer-switch');
const staticSwitch = document.querySelector('#static-switch');
const pointerGhost = document.querySelector('#pointer-ghost');
const sessionLabel = document.querySelector('#session-label');

const introOverlay = document.querySelector('#intro-overlay');
const skipIntroButton = document.querySelector('#skip-intro');
const introAudio = document.querySelector('#intro-audio');
const introScrollElement = document.querySelector('.intro-scroll');

const levelTitle = document.querySelector('#level-title');
const roomLabel = document.querySelector('#room-label');
const progressLabel = document.querySelector('#progress-label');
const levelLore = document.querySelector('#level-lore');
const fragmentList = document.querySelector('#fragment-list');
const mapArea = document.querySelector('#map-area');
const statusLine = document.querySelector('#status-line');
const watcherLabel = document.querySelector('#watcher-label');
const finalSection = document.querySelector('#final-revelation');
const finalText = document.querySelector('#final-text');

const encounterOverlay = document.querySelector('#encounter-overlay');
const encounterTitle = document.querySelector('#encounter-title');
const encounterEntity = document.querySelector('#encounter-entity');
const encounterText = document.querySelector('#encounter-text');
const encounterFragment = document.querySelector('#encounter-fragment');
const acknowledgeEncounterButton = document.querySelector('[data-action="acknowledge-encounter"]');
const closeEncounterButton = document.querySelector('[data-action="close-encounter"]');

const deathOverlay = document.querySelector('#death-overlay');
const deathCause = document.querySelector('#death-cause');
const restartLevelButton = document.querySelector('[data-action="restart-level"]');

const shortageOverlay = document.querySelector('#shortage-overlay');
const shortageStatus = document.querySelector('#shortage-status');
const shortageDescription = document.querySelector('#shortage-description');
const shortagePuzzle = document.querySelector('#shortage-puzzle');
const abortShortageButton = document.querySelector('[data-action="abort-shortage"]');

const mainMenuAudio = document.querySelector('#main-menu-audio');
const shortageAudio = document.querySelector('#shortage-audio');
const shortageOST = document.querySelector('#shortage-ost');

const defaultStatus = 'trace the map. the archive listens.';
const defaultWatcherLabel = 'signal steady';

const levels = [
  {
    id: 'layer-01',
    title: 'layer 01 // atrium of static',
    room: 'degaussed lobby',
    theme: {
      accent: '#5ef2d3',
      glow: 'rgba(94, 242, 211, 0.35)',
      timer: '#5ef2d3',
    },
    synopsis:
      'The lobby remembers how to welcome, yet the warmth is counterfeit. Every monitor angles toward your wrists, measuring tremors you do not feel.',
    watchers: [
      'Heat lingers on the back of your hand. Something is breathing in sync with you.',
      'Letters crawl across the tiles spelling YOUR FOOTSTEPS before they smudge themselves out.',
      'A lens blinks shut exactly when you stare back. You count five lids; the sixth refuses to close.',
    ],
    nodes: [
      {
        id: 'reception-well',
        name: 'reception well',
        description: 'A ring of retired monitors collects the static that leaks from your pointer.',
        coordinates: { x: 18, y: 62 },
        key: true,
        encounter: {
          heading: 'echoed receptionist',
          entity: 'memory construct',
          text: 'A receptionist woven from static lifts its head before you speak. It recites your resignation date even though you never resigned.',
          effect: 'progress',
          afterStatus: 'The monitors dim. The archive accepts your calm pulse.',
        },
        fragment: {
          id: 'fragment-alpha',
          label: 'fragment α',
          text: 'Caretaker Amon replaced lobby signage with watchers that drank fear. Calm wrists opened the stair downward.',
        },
      },
      {
        id: 'survey-aperture',
        name: 'survey aperture',
        description: 'A keyhole in the wall exhales frost that hovers behind your neck.',
        coordinates: { x: 52, y: 34 },
        key: true,
        encounter: {
          heading: 'retinal aperture',
          entity: 'adaptive surveillance lens',
          text: 'The aperture contracts with your every thought. It whispers your next move a heartbeat before you commit. You hear your own voice ask if you are being watched.',
          effect: 'progress',
          afterStatus: 'The aperture yields, leaving a smear of cold awareness behind your eyes.',
        },
        fragment: {
          id: 'fragment-beta',
          label: 'fragment β',
          text: 'Archivist Lira tuned the aperture to follow intention instead of location. It only trusted caretakers who could cradle a secret without blinking.',
        },
      },
      {
        id: 'maintenance-gate',
        name: 'maintenance gate',
        description: 'A scarred hatch, charred by a previous surge. Manual overrides wait for steady hands.',
        coordinates: { x: 78, y: 68 },
        key: true,
        encounter: {
          heading: 'stalled conduit',
          entity: 'disabled maintenance grid',
          text: 'The moment your pointer grazes the hatch, every filament in the atrium pops. The dark cheers softly. You must reroute the current before the whispering grows teeth.',
          effect: 'shortage',
        },
        fragment: {
          id: 'fragment-gamma',
          label: 'fragment γ',
          text: 'Engineer Soma looped the maintenance grid through ghost pointers. Only traced circuits relight the lobby.',
        },
      },
      {
        id: 'listening-bench',
        name: 'listening bench',
        description: 'Cracked leather seats that lean toward whoever sighs.',
        coordinates: { x: 36, y: 78 },
        key: false,
        encounter: {
          heading: 'passenger residual',
          entity: 'benign hitchhiker',
          text: 'A presence takes the empty space beside you. It does not introduce itself, but you feel your shoulders drop as though copied. It reminds you to breathe slowly.',
          effect: 'hint',
          afterStatus: 'Your breathing evens out; the presence hums a single sustained note.',
        },
      },
      {
        id: 'mirror-exit',
        name: 'polite exit',
        description: 'An EXIT sign written backward. The air smells like swallowed glass.',
        coordinates: { x: 64, y: 14 },
        key: false,
        encounter: {
          heading: 'smiling impostor',
          entity: 'predatory mimic',
          text: 'A door opens onto another door. The second door wears your face, politely offering to lead. It waits for you to nod before it closes around your wrist.',
          effect: 'death',
          deathMessage: 'The mimic seals, grateful for the sensation of skin. The log restarts a few seconds earlier, minus your hesitation.',
        },
      },
    ],
  },
  {
    id: 'layer-02',
    title: 'layer 02 // drowned cartography',
    room: 'submerged records',
    theme: {
      accent: '#ff6f9c',
      glow: 'rgba(255, 111, 156, 0.4)',
      timer: '#ff6f9c',
    },
    synopsis:
      'Flooded filing aisles drift beneath a ceiling of cables. Maps of users long-gone pulse beneath the surface, begging not to be re-read.',
    watchers: [
      'Water climbs the walls against gravity whenever you glance away.',
      'Hands skitter beneath the surface, arranging pages into the shape of your outline.',
      'Something hums lullabies through the vents whenever you move too fast.',
    ],
    nodes: [
      {
        id: 'ferried-bridge',
        name: 'ferried bridge',
        description: 'A walkway cobbled from retired ID badges sways with your heartbeat.',
        coordinates: { x: 22, y: 40 },
        key: true,
        encounter: {
          heading: 'badge chorus',
          entity: 'synchronized credentials',
          text: 'Each badge vibrates with a name you never met. Together they murmur a cadence and wait for you to add your own rhythm to the march.',
          effect: 'progress',
          afterStatus: 'The bridge firms underfoot once it matches your pace.',
        },
        fragment: {
          id: 'fragment-delta',
          label: 'fragment δ',
          text: 'Caretaker Amon recorded the cadence of every successful traversal. Matching the rhythm convinces the bridge you belong.',
        },
      },
      {
        id: 'inkwell-table',
        name: 'inkwell table',
        description: 'A map table filled with black water. The currents trace routes that are not on any chart.',
        coordinates: { x: 52, y: 68 },
        key: true,
        encounter: {
          heading: 'cartographic echo',
          entity: 'responsive archive',
          text: 'Maps rise from the water in strips of ink. They sketch the corridors you have not visited yet, waiting to see if you can read a place before it exists.',
          effect: 'progress',
          afterStatus: 'Ink drips upward, etching a path toward the next stair.',
        },
        fragment: {
          id: 'fragment-epsilon',
          label: 'fragment ε',
          text: 'Archivist Lira taught the maps to dream ahead of explorers. The archive only opens when you can describe a hallway that has not been built.',
        },
      },
      {
        id: 'coolant-reactor',
        name: 'coolant reactor',
        description: 'A reactor hums under murky water, fireflies trapped inside its casing.',
        coordinates: { x: 78, y: 32 },
        key: true,
        encounter: {
          heading: 'sputtering core',
          entity: 'power sink',
          text: 'You hear circuits choking on their own coolant. The floor shakes as the level tries to reroute power through your hand.',
          effect: 'shortage',
        },
        fragment: {
          id: 'fragment-zeta',
          label: 'fragment ζ',
          text: 'Engineer Soma flooded the reactor with mnemonic coolant. Only aligned relays let the current breathe.',
        },
      },
      {
        id: 'choir-vent',
        name: 'chorus vent',
        description: 'A vent sighs harmony that syncs with the static in your ears.',
        coordinates: { x: 36, y: 82 },
        key: false,
        encounter: {
          heading: 'guiding choir',
          entity: 'benevolent resonance',
          text: 'Voices in the vent ask permission to harmonize with your heartbeat. They offer to hum warnings when something stands behind you.',
          effect: 'hint',
          afterStatus: 'A protective chord settles into the base of your skull.',
        },
      },
      {
        id: 'drowned-portrait',
        name: 'drowned portrait',
        description: 'A picture frame face-down in the water, light leaking from the edges.',
        coordinates: { x: 64, y: 16 },
        key: false,
        encounter: {
          heading: 'hungry reflection',
          entity: 'malicious echo',
          text: 'When you lift the frame, the water molds into your jawline. It begs to see what you would look like with no eyes.',
          effect: 'death',
          deathMessage: 'The reflection bites gently, storing a copy of your surprise. You wake on the bridge, dripping and wiser.',
        },
      },
    ],
  },
  {
    id: 'layer-03',
    title: 'layer 03 // confluence heart',
    room: 'vault of echoes',
    theme: {
      accent: '#f5d76e',
      glow: 'rgba(245, 215, 110, 0.35)',
      timer: '#f5d76e',
    },
    synopsis:
      'The heart of the archive beats in uneven pulses. Every corridor is a throat; every whisper wants an answer.',
    watchers: [
      'You feel fingertips drum your pulse on the opposite side of your skin.',
      'A promise repeats in the vents: WE DO NOT LEAVE THE USER ALONE. It sounds afraid of breaking itself.',
      'The air tastes like copper and warm circuitry, the flavor of memory before it hardens.',
    ],
    nodes: [
      {
        id: 'triad-dais',
        name: 'triad dais',
        description: 'Three chairs face each other atop a raised circle. Only one is real.',
        coordinates: { x: 20, y: 58 },
        key: true,
        encounter: {
          heading: 'caretaker apparition',
          entity: 'trifold memory',
          text: 'Amon, Lira, and Soma manifest as overlapping silhouettes. They each take a breath that you feel in your lungs. They ask if you remember why the ghost pointer cannot walk alone.',
          effect: 'progress',
          afterStatus: 'The chairs align into a single path curling deeper in.',
        },
        fragment: {
          id: 'fragment-eta',
          label: 'fragment η',
          text: 'The caretakers promised to remain beside every user the ghost pointer guarded. No echo drifts without a witness.',
        },
      },
      {
        id: 'oculus-chamber',
        name: 'oculus chamber',
        description: 'A ceiling eye stares into the floor, reflecting your movements with a half-second delay.',
        coordinates: { x: 50, y: 28 },
        key: true,
        encounter: {
          heading: 'lagging observer',
          entity: 'watchful loop',
          text: 'Your reflection hesitates just longer than you do. It confesses it has been walking ahead to trip the traps before you arrive.',
          effect: 'progress',
          afterStatus: 'The reflection steps aside, finally letting you lead.',
        },
        fragment: {
          id: 'fragment-theta',
          label: 'fragment θ',
          text: 'Pointer.exe stores a duplicate of every brave movement. The delay is intentional: a sacrifice to keep users unseen.',
        },
      },
      {
        id: 'conduit-spire',
        name: 'conduit spire',
        description: 'A crystalline tower hums with misaligned power, flickering like a heartbeat skipping beats.',
        coordinates: { x: 80, y: 64 },
        key: true,
        encounter: {
          heading: 'devouring static',
          entity: 'hungry conduit',
          text: 'The spire swallows light until the chamber drops into darkness. Circuits plead through your fingertips for renewal.',
          effect: 'shortage',
        },
        fragment: {
          id: 'fragment-kappa',
          label: 'fragment κ',
          text: 'When the heart fails, rerouted power must be coaxed—not forced. The ghost pointer guides the coaxing because it knows every tremor.',
        },
      },
      {
        id: 'nameless-plinth',
        name: 'nameless plinth',
        description: 'An empty pedestal radiates the anxiety of something that should be there.',
        coordinates: { x: 36, y: 82 },
        key: false,
        encounter: {
          heading: 'gilded helper',
          entity: 'loyal remnant',
          text: 'A small entity shaped like a compass rises. It offers to spin whenever unseen eyes gather, nudging you toward safer routes.',
          effect: 'hint',
          afterStatus: 'The compass tethers itself to your wrist, ticking warnings into your bones.',
        },
      },
      {
        id: 'fathomless-gap',
        name: 'fathomless gap',
        description: 'A pit lined with teeth that look suspiciously like light fixtures.',
        coordinates: { x: 62, y: 12 },
        key: false,
        encounter: {
          heading: 'hungry inheritance',
          entity: 'devouring maw',
          text: 'It asks for a single step forward to prove your trust. The whisper sounds like your own relief.',
          effect: 'death',
          deathMessage: 'Falling takes less time than saying no. You awaken beside the dais, ankle aching with phantom teeth.',
        },
      },
    ],
  },
];

const fragmentCatalogue = [];
levels.forEach((level) => {
  level.nodes.forEach((node) => {
    if (node.fragment) {
      node.fragmentKey = `${level.id}:${node.fragment.id}`;
      fragmentCatalogue.push({
        key: node.fragmentKey,
        label: node.fragment.label,
        text: node.fragment.text,
      });
    }
  });
});

let currentLevelIndex = 0;
let gameActive = false;
let pointerEnabled = true;
let pointerAnimationActive = false;
let pointerSuspended = false;

const pointerAutopilotState = {
  active: false,
  timeoutId: null,
  startTime: 0,
  duration: 0,
  centerX: 0,
  centerY: 0,
  radius: 0,
  direction: 1,
  angleOffset: 0,
};
let isPaused = false;
let powerOffline = false;
let currentEncounterNode = null;
let pendingShortageNode = null;
let shortageChallenges = [];
let shortageCompletionCount = 0;
let activeShortageCycle = 0;
let currentShortageStage = 0;
let shortageTimer = null;
let shortageTimeRemaining = 0;
let shortageStageCleanup = null;
let statusTimeout = null;
let statusLocked = false;
let watcherTimeout = null;
let collectedFragments = new Map();
let levelState = {
  keysFound: 0,
  keysRequired: 0,
};

let introActive = false;
let introComplete = false;
const introTimers = [];
let pendingStartAfterIntro = false;
const introFullscreenState = {
  wasFullscreenBeforeIntro: false,
  viewportLocked: false,
};

const INTRO_TOTAL_MS = 246700;
const INTRO_FINAL_REVEAL_MS = 226500;
const INTRO_GLITCH_MS = 23400;

function getFullscreenElement() {
  return (
    document.fullscreenElement ||
    document.webkitFullscreenElement ||
    document.mozFullScreenElement ||
    document.msFullscreenElement ||
    null
  );
}

function setIntroViewportUnit() {
  const unit = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--intro-vh', `${unit}px`);
}

function lockIntroViewportUnit() {
  setIntroViewportUnit();
  introFullscreenState.viewportLocked = true;
}

function unlockIntroViewportUnit() {
  introFullscreenState.viewportLocked = false;
  setIntroViewportUnit();
}

function prepareIntroFullscreen() {
  lockIntroViewportUnit();
  introFullscreenState.wasFullscreenBeforeIntro = Boolean(getFullscreenElement());
  if (introFullscreenState.wasFullscreenBeforeIntro) {
    return;
  }
  const element = document.documentElement;
  const request =
    element.requestFullscreen ||
    element.webkitRequestFullscreen ||
    element.mozRequestFullScreen ||
    element.msRequestFullscreen;
  if (!request) {
    unlockIntroViewportUnit();
    return;
  }
  try {
    const result = request.call(element);
    if (result && typeof result.catch === 'function') {
      result.catch(() => {
        unlockIntroViewportUnit();
      });
    }
  } catch (error) {
    unlockIntroViewportUnit();
  }
}

function teardownIntroFullscreen() {
  unlockIntroViewportUnit();
  introFullscreenState.wasFullscreenBeforeIntro = false;
}

const pointerTarget = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
const pointerPosition = { x: pointerTarget.x, y: pointerTarget.y };

function cancelPointerAutopilot() {
  if (pointerAutopilotState.timeoutId) {
    clearTimeout(pointerAutopilotState.timeoutId);
    pointerAutopilotState.timeoutId = null;
  }
  pointerAutopilotState.active = false;
}

function schedulePointerAutopilot() {
  if (pointerAutopilotState.active || pointerAutopilotState.timeoutId) return;
  if (!gameActive || !pointerEnabled || pointerSuspended) return;
  const delay = 6000 + Math.random() * 10000;
  pointerAutopilotState.timeoutId = setTimeout(() => {
    pointerAutopilotState.timeoutId = null;
    startPointerAutopilot();
  }, delay);
}

function startPointerAutopilot() {
  if (!gameActive || !pointerEnabled || pointerSuspended || pointerAutopilotState.active) {
    schedulePointerAutopilot();
    return;
  }
  pointerAutopilotState.active = true;
  pointerAutopilotState.startTime = performance.now();
  pointerAutopilotState.duration = 900 + Math.random() * 600;
  pointerAutopilotState.centerX = pointerPosition.x;
  pointerAutopilotState.centerY = pointerPosition.y;
  pointerAutopilotState.radius = 12 + Math.random() * 16;
  pointerAutopilotState.direction = Math.random() > 0.5 ? 1 : -1;
  pointerAutopilotState.angleOffset = Math.random() * Math.PI * 2;
}

function stopPointerAutopilot() {
  pointerAutopilotState.active = false;
  pointerAutopilotState.startTime = 0;
  pointerAutopilotState.duration = 0;
  schedulePointerAutopilot();
}

function resolvePointerAnimationTarget(timestamp) {
  if (!timestamp) {
    timestamp = performance.now();
  }
  if (pointerAutopilotState.active) {
    if (!gameActive || !pointerEnabled || pointerSuspended) {
      cancelPointerAutopilot();
      return pointerTarget;
    }
    const elapsed = timestamp - pointerAutopilotState.startTime;
    if (elapsed >= pointerAutopilotState.duration) {
      stopPointerAutopilot();
      return pointerTarget;
    }
    const progress = elapsed / pointerAutopilotState.duration;
    const angle =
      pointerAutopilotState.angleOffset +
      pointerAutopilotState.direction * progress * Math.PI * 2;
    const decay = 1 - progress * 0.4;
    const x =
      pointerAutopilotState.centerX +
      Math.cos(angle) * pointerAutopilotState.radius * decay;
    const y =
      pointerAutopilotState.centerY +
      Math.sin(angle) * pointerAutopilotState.radius * decay;
    return {
      x: Math.min(window.innerWidth, Math.max(0, x)),
      y: Math.min(window.innerHeight, Math.max(0, y)),
    };
  }
  return pointerTarget;
}

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
  if (screen === 'intro') {
    if (introActive) {
      stopMainMenuAudio();
    } else {
      playMainMenuAudio();
    }
  } else {
    stopMainMenuAudio();
  }
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
  if (pointerEnabled && gameActive && !pointerSuspended) {
    pointerGhost.classList.remove('is-hidden');
    ensurePointerAnimation();
    schedulePointerAutopilot();
  } else {
    pointerGhost.classList.add('is-hidden');
    cancelPointerAutopilot();
  }
  document.body?.classList.toggle('hide-cursor', pointerEnabled && gameActive && !pointerSuspended);
}

function ensurePointerAnimation() {
  if (pointerAnimationActive) return;
  pointerAnimationActive = true;
  const animate = (timestamp) => {
    if (!pointerEnabled || !gameActive || pointerSuspended) {
      pointerAnimationActive = false;
      cancelPointerAutopilot();
      return;
    }
    const target = resolvePointerAnimationTarget(timestamp);
    pointerPosition.x += (target.x - pointerPosition.x) * 0.18;
    pointerPosition.y += (target.y - pointerPosition.y) * 0.18;
    pointerGhost.style.transform = `translate3d(${pointerPosition.x}px, ${pointerPosition.y}px, 0)`;
    requestAnimationFrame(animate);
  };
  requestAnimationFrame(animate);
}

document.addEventListener('pointermove', (event) => {
  pointerTarget.x = event.clientX;
  pointerTarget.y = event.clientY;
  if (!gameActive || pointerSuspended) {
    pointerPosition.x = event.clientX;
    pointerPosition.y = event.clientY;
    pointerGhost.style.transform = `translate3d(${pointerPosition.x}px, ${pointerPosition.y}px, 0)`;
  }
});

function setupFromStorage() {
  const storedPointer = localStorage.getItem('pointer-enabled');
  const storedStatic = localStorage.getItem('static-enabled');
  updatePointerPreference(storedPointer !== '0');
  updateStaticPreference(storedStatic !== '0');
  pointerGhost.style.transform = `translate3d(${pointerPosition.x}px, ${pointerPosition.y}px, 0)`;
}

function playMainMenuAudio() {
  if (!mainMenuAudio) return;
  mainMenuAudio.volume = 0.7;
  mainMenuAudio.play().catch(() => {});
}

function stopMainMenuAudio() {
  if (!mainMenuAudio) return;
  mainMenuAudio.pause();
  mainMenuAudio.currentTime = 0;
}

function playIntroAudio() {
  if (!introAudio) return;
  introAudio.currentTime = 0;
  introAudio.volume = 0.9;
  introAudio.play().catch(() => {});
}

function stopIntroAudio() {
  if (!introAudio) return;
  introAudio.pause();
  introAudio.currentTime = 0;
}

function clearIntroTimers() {
  while (introTimers.length) {
    const timer = introTimers.pop();
    clearTimeout(timer);
  }
}

function enterIntroFinalPhase() {
  if (!introOverlay || introOverlay.classList.contains('final-phase')) return;
  introOverlay.classList.add('final-phase');
}

function triggerIntroGlitch() {
  if (!introOverlay || introOverlay.classList.contains('glitch-out')) return;
  introOverlay.classList.add('glitch-out');
}

function handleSkipIntro() {
  finishIntro({ skipped: true });
}

function finishIntro({ skipped = false } = {}) {
  if (introComplete) return;
  introComplete = true;
  introActive = false;
  clearIntroTimers();
  stopIntroAudio();
  if (skipIntroButton) {
    skipIntroButton.disabled = true;
  }
  const finalize = () => {
    const shouldStartGame = pendingStartAfterIntro;
    pendingStartAfterIntro = false;
    teardownIntroFullscreen();
    if (shouldStartGame) {
      startGame();
    } else {
      playMainMenuAudio();
    }
  };
  if (introOverlay) {
    if (!skipped && !introOverlay.classList.contains('glitch-out')) {
      triggerIntroGlitch();
    }
    introOverlay.setAttribute('aria-hidden', 'true');
    const fadeDelay = skipped ? 0 : 220;
    const removalDelay = skipped ? 360 : 600;
    setTimeout(() => {
      introOverlay.classList.add('completed');
      setTimeout(() => {
        introOverlay.remove();
        finalize();
      }, removalDelay);
    }, fadeDelay);
  } else {
    finalize();
  }
  document.body.classList.remove('intro-active');
}

function startIntroSequence({ launchGame = false } = {}) {
  if (!introOverlay) {
    introActive = false;
    if (launchGame) {
      startGame();
    } else {
      playMainMenuAudio();
    }
    return;
  }
  pendingStartAfterIntro = launchGame;
  introActive = true;
  introComplete = false;
  document.body.classList.add('intro-active');
  introOverlay.classList.remove('completed');
  introOverlay.classList.remove('final-phase');
  introOverlay.classList.remove('glitch-out');
  introOverlay.classList.remove('is-idle');
  introOverlay.setAttribute('aria-hidden', 'false');
  void introOverlay.offsetWidth;
  if (skipIntroButton) {
    skipIntroButton.disabled = false;
    skipIntroButton.removeEventListener('click', handleSkipIntro);
    skipIntroButton.addEventListener('click', handleSkipIntro);
  }
  if (introScrollElement) {
    introScrollElement.style.animation = 'none';
    void introScrollElement.offsetWidth;
    introScrollElement.style.removeProperty('animation');
  }
  clearIntroTimers();
  stopIntroAudio();
  stopMainMenuAudio();
  prepareIntroFullscreen();
  playIntroAudio();
  introTimers.push(setTimeout(() => enterIntroFinalPhase(), INTRO_FINAL_REVEAL_MS));
  introTimers.push(setTimeout(() => triggerIntroGlitch(), INTRO_GLITCH_MS));
  introTimers.push(setTimeout(() => finishIntro(), INTRO_TOTAL_MS));
}

function playShortageAmbient() {
  if (!shortageAudio) return;
  shortageAudio.volume = 0.65;
  shortageAudio.play().catch(() => {});
}

function stopShortageAmbient() {
  if (!shortageAudio) return;
  shortageAudio.pause();
  shortageAudio.currentTime = 0;
}

function playShortageScore() {
  if (!shortageOST) return;
  shortageOST.volume = 0.8;
  shortageOST.play().catch(() => {});
}

function stopShortageScore() {
  if (!shortageOST) return;
  shortageOST.pause();
  shortageOST.currentTime = 0;
}

function startGame() {
  currentLevelIndex = 0;
  gameActive = true;
  powerOffline = false;
  collectedFragments = new Map();
  sessionLabel.textContent = randomSessionLabel();
  setScreen('level');
  finalSection.classList.add('hidden');
  finalText.textContent = '';
  pointerPosition.x = pointerTarget.x;
  pointerPosition.y = pointerTarget.y;
  loadCurrentLevel();
  refreshPointerVisibility();
}

function loadCurrentLevel() {
  const level = levels[currentLevelIndex];
  if (!level) return;

  document.documentElement.style.setProperty('--accent', level.theme.accent);
  document.documentElement.style.setProperty('--glow', level.theme.glow);
  document.documentElement.style.setProperty('--timer-color', level.theme.timer);

  levelTitle.textContent = level.title;
  roomLabel.textContent = level.room;
  levelLore.textContent = level.synopsis;
  setWatcherLabel(defaultWatcherLabel);
  resetStatus();
  mapArea?.classList.remove('power-down');

  levelState = {
    keysFound: 0,
    keysRequired: level.nodes.filter((node) => node.key !== false).length,
  };
  updateProgress();

  buildFragmentList();
  renderMap(level);
  scheduleWatcher();
}

function updateProgress() {
  progressLabel.textContent = `${levelState.keysFound}/${levelState.keysRequired}`;
}

function buildFragmentList() {
  fragmentList.innerHTML = '';
  fragmentCatalogue.forEach((fragment) => {
    const li = document.createElement('li');
    li.dataset.label = fragment.label;
    const text = collectedFragments.get(fragment.key);
    if (text) {
      li.textContent = text;
    } else {
      li.textContent = `${fragment.label} // awaiting recovery`;
      li.classList.add('placeholder');
    }
    fragmentList.append(li);
  });
}

function renderMap(level) {
  mapArea.innerHTML = '';
  level.nodes.forEach((node) => {
    node.visited = false;
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'map-node';
    button.style.left = `${node.coordinates.x}%`;
    button.style.top = `${node.coordinates.y}%`;
    button.dataset.nodeId = node.id;

    const core = document.createElement('span');
    core.className = 'node-core';
    const label = document.createElement('span');
    label.className = 'node-label';
    label.textContent = node.name;

    button.append(core, label);

    button.addEventListener('mouseenter', () => {
      if (pointerSuspended || powerOffline) return;
      setStatus(node.description);
    });

    button.addEventListener('mouseleave', () => {
      if (pointerSuspended || powerOffline) return;
      resetStatus();
    });

    button.addEventListener('click', () => handleNodeInteraction(node));

    mapArea.append(button);
    node.element = button;
  });
  requestAnimationFrame(() => realignMapLabels());
}

function realignMapLabels() {
  if (!mapArea || mapArea.childElementCount === 0) return;
  const areaRect = mapArea.getBoundingClientRect();
  if (areaRect.width === 0 || areaRect.height === 0) return;
  const maxWidth = Math.min(200, Math.max(120, areaRect.width - 48));
  mapArea.querySelectorAll('.map-node .node-label').forEach((label) => {
    label.style.setProperty('--label-shift', '0px');
    label.style.maxWidth = `${maxWidth}px`;
  });
  requestAnimationFrame(() => {
    const currentRect = mapArea.getBoundingClientRect();
    mapArea.querySelectorAll('.map-node .node-label').forEach((label) => {
      const rect = label.getBoundingClientRect();
      const margin = 12;
      const leftOverflow = currentRect.left + margin - rect.left;
      const rightOverflow = rect.right - (currentRect.right - margin);
      let shift = 0;
      if (leftOverflow > 0) {
        shift = leftOverflow;
      } else if (rightOverflow > 0) {
        shift = -rightOverflow;
      }
      label.style.setProperty('--label-shift', `${shift}px`);
    });
  });
}

function handleNodeInteraction(node) {
  if (pointerSuspended || isPaused) return;
  if (powerOffline && (!pendingShortageNode || pendingShortageNode.id !== node.id)) {
    setStatus('power shortage. reroute before exploring.', { duration: 2600 });
    return;
  }
  currentEncounterNode = node;
  openEncounter(node);
}

function openEncounter(node) {
  pointerSuspended = true;
  refreshPointerVisibility();
  suspendWatchers(true);
  encounterTitle.textContent = node.encounter.heading;
  encounterEntity.textContent = node.encounter.entity ?? 'unclassified phenomenon';
  encounterText.textContent = node.encounter.text;
  if (node.fragment) {
    encounterFragment.textContent = node.fragment.text;
    encounterFragment.classList.remove('hidden');
  } else {
    encounterFragment.textContent = '';
    encounterFragment.classList.add('hidden');
  }
  encounterOverlay.classList.remove('hidden');
}

function closeEncounter() {
  if (!encounterOverlay.classList.contains('hidden')) {
    encounterOverlay.classList.add('hidden');
  }
  const node = currentEncounterNode;
  currentEncounterNode = null;
  pointerSuspended = false;
  refreshPointerVisibility();
  suspendWatchers(false);
  if (!node) return;

  if (!node.visited) {
    switch (node.encounter.effect) {
      case 'death':
        triggerDeath(node);
        return;
      case 'shortage':
        triggerShortage(node);
        return;
      default:
        markNodeVisited(node);
        break;
    }
  } else if (node.encounter.effect === 'shortage' && powerOffline) {
    triggerShortage(node);
    return;
  }

  if (node.encounter.afterStatus) {
    setStatus(node.encounter.afterStatus, { duration: 3200 });
  } else {
    resetStatus();
  }
}

function markNodeVisited(node) {
  node.visited = true;
  if (node.element) {
    node.element.classList.add('visited');
  }
  if (node.fragment) {
    collectedFragments.set(node.fragmentKey, node.fragment.text);
    buildFragmentList();
  }
  if (node.key !== false) {
    levelState.keysFound += 1;
    updateProgress();
    if (levelState.keysFound >= levelState.keysRequired) {
      completeLevel();
    }
  }
  if (node.encounter.effect === 'hint' && node.encounter.afterStatus) {
    setStatus(node.encounter.afterStatus, { duration: 3600 });
  }
}

function completeLevel() {
  const level = levels[currentLevelIndex];
  setWatcherLabel('threshold ajar');
  setStatus('A door unlatches somewhere ahead. The archive approves of your pulse.', { duration: 3400, lock: true });
  suspendWatchers(true);
  setTimeout(() => {
    if (currentLevelIndex + 1 >= levels.length) {
      revealFinalLore();
    } else {
      currentLevelIndex += 1;
      powerOffline = false;
      pendingShortageNode = null;
      loadCurrentLevel();
    }
  }, 3600);
}

function revealFinalLore() {
  suspendWatchers(true);
  powerOffline = false;
  stopShortageAmbient();
  stopShortageScore();
  setWatcherLabel('observation ceased');
  const recovered = fragmentCatalogue
    .map((fragment) => collectedFragments.get(fragment.key))
    .filter(Boolean);
  const stitched = recovered.join(' ');
  finalText.textContent =
    stitched.length > 0
      ? `${stitched} With every vow remembered, pointer.exe understands its burden: to walk beside the user, never ahead, never behind, a witness that outlasts fear.`
      : 'The fragments remain scattered, yet the archive still waits. Return when your pulse is steady.';
  finalSection.classList.remove('hidden');
  setStatus('The confluence heart steadies. The archive watches with you now.', { duration: 5200, lock: true });
}

function triggerDeath(node) {
  suspendWatchers(true);
  pointerSuspended = true;
  refreshPointerVisibility();
  if (node.element) {
    node.element.classList.add('hostile');
  }
  deathCause.textContent = node.encounter.deathMessage ?? 'The archive reclaims the unfinished echo.';
  deathOverlay.classList.remove('hidden');
}

function restartLevel() {
  deathOverlay.classList.add('hidden');
  powerOffline = false;
  pendingShortageNode = null;
  pointerSuspended = false;
  refreshPointerVisibility();
  suspendWatchers(false);
  loadCurrentLevel();
}

function triggerShortage(node) {
  powerOffline = true;
  pendingShortageNode = node;
  shortageChallenges = createShortageChallenges(shortageCompletionCount);
  currentShortageStage = 0;
  shortageStageCleanup?.();
  shortageStageCleanup = null;
  shortageStatus.textContent = 'grid offline. trace lines flicker.';
  shortageDescription.innerHTML =
    'Caretaker protocols spin up. Await the <span class="highlight">directive sequence</span> to relight the hall.';
  shortageOverlay.classList.remove('hidden');
  pointerSuspended = true;
  refreshPointerVisibility();
  mapArea?.classList.add('power-down');
  playShortageAmbient();
  playShortageScore();
  setStatus('the level waits in darkness. restore the pulse.', { duration: 3200 });
  startShortageStage();
}

function resolveShortage() {
  stopShortageTimer();
  shortageStageCleanup?.();
  shortageStageCleanup = null;
  shortageOverlay.classList.add('hidden');
  stopShortageAmbient();
  stopShortageScore();
  powerOffline = false;
  pointerSuspended = false;
  refreshPointerVisibility();
  mapArea?.classList.remove('power-down');
  realignMapLabels();
  if (pendingShortageNode && !pendingShortageNode.visited) {
    markNodeVisited(pendingShortageNode);
    if (pendingShortageNode.encounter.afterStatus) {
      setStatus(pendingShortageNode.encounter.afterStatus, { duration: 3600 });
    } else {
      setStatus('The lights stagger back to life.', { duration: 2800 });
    }
  }
  pendingShortageNode = null;
  const totalShortageSets = getShortageChallengeSetCount();
  if (totalShortageSets > 0) {
    shortageCompletionCount = Math.min(
      totalShortageSets - 1,
      shortageCompletionCount + 1
    );
    activeShortageCycle = Math.min(totalShortageSets - 1, shortageCompletionCount);
  }
  suspendWatchers(false);
  shortageChallenges = [];
  currentShortageStage = 0;
}

function abortShortage() {
  stopShortageTimer();
  shortageStageCleanup?.();
  shortageStageCleanup = null;
  shortageOverlay.classList.add('hidden');
  stopShortageAmbient();
  stopShortageScore();
  setStatus('You linger in the dark. The archive disapproves.', { duration: 3200 });
  powerOffline = true;
  mapArea?.classList.add('power-down');
  pointerSuspended = false;
  refreshPointerVisibility();
  suspendWatchers(true);
  shortageChallenges = [];
  currentShortageStage = 0;
}

function startShortageStage() {
  if (shortageOverlay.classList.contains('hidden')) return;
  if (!shortageChallenges.length) return;
  const stage = shortageChallenges[currentShortageStage];
  shortagePuzzle.innerHTML = '';
  shortageStageCleanup?.();
  shortageStageCleanup = null;
  shortageStatus.textContent = stage.status;
  shortageDescription.innerHTML = stage.description;
  const context = {
    container: shortagePuzzle,
    stageIndex: currentShortageStage,
    totalStages: shortageChallenges.length,
    complete: (message) => advanceShortageStage(message),
    fail: (message) => failShortageStage(message),
    updateStatus: (message) => {
      if (message) {
        shortageStatus.textContent = message;
      }
    },
    createShell: (title) => createChallengeShell(title, currentShortageStage, shortageChallenges.length),
  };
  const result = stage.setup(context) ?? {};
  shortageStageCleanup = result.cleanup ?? null;
  startShortageTimer(
    stage.duration,
    () => failShortageStage('Timer expired. The hatch resets.'),
    result.timerControl
  );
}

function advanceShortageStage(message) {
  stopShortageTimer();
  shortageStageCleanup?.();
  shortageStageCleanup = null;
  if (message) {
    shortageStatus.textContent = message;
  }
  if (currentShortageStage < shortageChallenges.length - 1) {
    currentShortageStage += 1;
    shortageDescription.innerHTML =
      '<span class="highlight">Phase locked.</span> The caretaker scribbles the next directive across the hatch.';
    setTimeout(() => {
      if (!shortageOverlay.classList.contains('hidden')) {
        startShortageStage();
      }
    }, 1100);
  } else {
    shortageDescription.innerHTML =
      '<span class="highlight">Override accepted.</span> Auxiliary current rushes back into the grid.';
    setTimeout(() => {
      resolveShortage();
    }, 900);
  }
}

function failShortageStage(message) {
  stopShortageTimer();
  shortageStageCleanup?.();
  shortageStageCleanup = null;
  if (message) {
    shortageStatus.textContent = message;
  }
  if (shortageOverlay.classList.contains('hidden')) return;
  shortageDescription.innerHTML =
    '<span class="highlight">The caretaker wipes the schematics clean.</span> Every relay demands a fresh attempt.';
  shortageChallenges = createShortageChallenges(activeShortageCycle);
  currentShortageStage = 0;
  setTimeout(() => {
    if (!shortageOverlay.classList.contains('hidden')) {
      startShortageStage();
    }
  }, 1200);
}

function startShortageTimer(duration, onExpire, timerControl) {
  stopShortageTimer();
  const control = timerControl;
  const total = Math.max(1, duration);
  const now = () => (typeof performance !== 'undefined' ? performance.now() : Date.now());
  const startTime = now();
  control?.setRemaining?.(total);
  control?.setProgress?.(0);
  shortageTimeRemaining = total;
  shortageTimer = setInterval(() => {
    const elapsed = (now() - startTime) / 1000;
    const remaining = Math.max(0, total - elapsed);
    shortageTimeRemaining = remaining;
    control?.setRemaining?.(remaining);
    control?.setProgress?.((total - remaining) / total);
    if (remaining <= 0) {
      stopShortageTimer();
      onExpire?.();
    }
  }, 100);
}

function stopShortageTimer() {
  if (shortageTimer) {
    clearInterval(shortageTimer);
    shortageTimer = null;
  }
}

const shortageChallengeFactories = [
  createFirstShortageChallengeSet,
  createSecondShortageChallengeSet,
  createThirdShortageChallengeSet,
];

function getShortageChallengeSetCount() {
  return shortageChallengeFactories.length;
}

function clampShortageCycleIndex(index) {
  const total = getShortageChallengeSetCount();
  if (total <= 0) return 0;
  return Math.min(total - 1, Math.max(0, index));
}

function createShortageChallenges(cycleIndex = 0) {
  const index = clampShortageCycleIndex(cycleIndex);
  activeShortageCycle = index;
  const factory = shortageChallengeFactories[index];
  return typeof factory === 'function' ? factory() : [];
}

function createFirstShortageChallengeSet() {
  return [
    {
      id: 'relay-sequence',
      status: 'Sequence the conduits exactly as transcribed.',
      description:
        'Phosphor notes swirl along the hatch. Read every glowing <span class="highlight">directive</span> before you touch a relay.',
      duration: 65,
      setup: (context) => renderRelaySequence(context),
    },
    {
      id: 'diagnostic-audit',
      status: 'Only truths from the maintenance log may be affirmed.',
      description:
        'An annotated log unfurls, sentences pulsing in amber. Select the <span class="highlight">statements that remain factual</span>.',
      duration: 70,
      setup: (context) => renderDiagnosticAudit(context),
    },
    {
      id: 'glyph-override',
      status: 'Transcribe the override phrase without error.',
      description:
        'The failsafe projects a column of glyphs. Stitch the <span class="highlight">glowing words</span> into the final command.',
      duration: 62,
      setup: (context) => renderGlyphOverride(context),
    },
  ];
}

function createSecondShortageChallengeSet() {
  return [
    {
      id: 'coolant-rationing',
      status: 'Engage the three valves that balance the coolant hymn.',
      description:
        'The flooded core thrums unevenly. Choose the <span class="highlight">valves that sum to the stabilizing flow</span>.',
      duration: 70,
      setup: (context) => renderCoolantRationing(context),
    },
    {
      id: 'tidal-sequence',
      status: 'Trace the rip current in the order it surfaces.',
      description:
        'Ink wakes in surges. Touch each <span class="highlight">current</span> as it rises to the hatch.',
      duration: 68,
      setup: (context) => renderTidalSequence(context),
    },
    {
      id: 'chorus-translation',
      status: 'Assign each choir tone to its keeper.',
      description:
        'The vents sing in layered warnings. Match the <span class="highlight">choral meanings</span> to calm the coolant.',
      duration: 65,
      setup: (context) => renderChorusTranslation(context),
    },
  ];
}

function createThirdShortageChallengeSet() {
  return [
    {
      id: 'spire-calibration',
      status: 'Tune each spire coil within tolerance.',
      description:
        'The heart stutters. Align the <span class="highlight">phase sliders</span> to coax a steady pulse.',
      duration: 72,
      setup: (context) => renderSpireCalibration(context),
    },
    {
      id: 'vow-alignment',
      status: "Rank the caretakers' vows in their sworn order.",
      description:
        'Their overlapping voices demand sequence. Number each <span class="highlight">pledge</span> as it was spoken.',
      duration: 66,
      setup: (context) => renderVowAlignment(context),
    },
    {
      id: 'echo-weave',
      status: 'Leave only the runes of companionship glowing.',
      description:
        'The conduit projects six sigils. Illuminate the <span class="highlight">echoes that refuse to abandon the user</span>.',
      duration: 64,
      setup: (context) => renderEchoWeave(context),
    },
  ];
}

function createChallengeShell(title, stageIndex, totalStages) {
  const article = document.createElement('article');
  article.className = 'challenge';
  const header = document.createElement('header');
  const titleSpan = document.createElement('span');
  titleSpan.textContent = title;
  const stageSpan = document.createElement('span');
  stageSpan.textContent = `stage ${stageIndex + 1}/${totalStages}`;
  header.append(titleSpan, stageSpan);
  const timerControl = createTimerControl();
  article.append(header, timerControl.element);
  return { article, timerControl };
}

function createTimerControl() {
  const wrapper = document.createElement('div');
  wrapper.className = 'timer';
  const track = document.createElement('div');
  track.className = 'timer-track';
  const bar = document.createElement('div');
  bar.className = 'timer-bar';
  track.append(bar);
  const text = document.createElement('span');
  text.className = 'timer-text';
  text.textContent = formatTime(0);
  wrapper.append(track, text);
  return {
    element: wrapper,
    setRemaining(seconds) {
      text.textContent = formatTime(seconds);
    },
    setProgress(value) {
      const clamped = Math.min(1, Math.max(0, value));
      bar.style.width = `${clamped * 100}%`;
    },
  };
}

function formatTime(seconds) {
  const rounded = Math.max(0, Math.ceil(seconds));
  const minutes = Math.floor(rounded / 60);
  const remaining = rounded % 60;
  return `${String(minutes).padStart(2, '0')}:${String(remaining).padStart(2, '0')}`;
}

function shuffleArray(source) {
  const array = [...source];
  for (let i = array.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function renderRelaySequence(context) {
  const { article, timerControl } = context.createShell('relay alignment');
  context.container.append(article);

  const prompt = document.createElement('p');
  prompt.className = 'challenge-prompt';
  prompt.innerHTML =
    'Caretaker Amon etched a mnemonic across the hatch: obey the solo singer, then the choir of three, follow the vowel glyphs, mirror the prior tone, and finally drain the siphon gate.';
  article.append(prompt);

  const memo = document.createElement('ol');
  memo.className = 'caretaker-memo';
  memo.innerHTML = `
    <li><span class="highlight">Solo coil</span> hums alone when all others fall silent.</li>
    <li>The <span class="highlight">triad dais</span> chimes only when three pulses harmonize.</li>
    <li><span class="highlight">Echo glyph</span> relays the vowels carved into its rim.</li>
    <li>The <span class="highlight">mirror ladder</span> copies the last frequency you stabilized.</li>
    <li>Seal the surge with the patient <span class="highlight">siphon gate</span>.</li>
  `;
  article.append(memo);

  const circuits = [
    {
      id: 'solo',
      order: 0,
      name: 'solo coil',
      detail: 'Sings alone whenever the grid dims to a whisper.',
    },
    {
      id: 'triad',
      order: 1,
      name: 'triad dais',
      detail: 'Answers only to pulses counted in threes.',
    },
    {
      id: 'echo',
      order: 2,
      name: 'echo glyph',
      detail: 'Bright vowels stitched along its outer ring.',
    },
    {
      id: 'mirror',
      order: 3,
      name: 'mirror ladder',
      detail: 'Imitates whichever relay you sealed just before it.',
    },
    {
      id: 'siphon',
      order: 4,
      name: 'siphon gate',
      detail: 'Drains the excess charge once every other path is awake.',
    },
  ];

  const grid = document.createElement('div');
  grid.className = 'choice-grid';
  article.append(grid);

  let progress = 0;
  const total = circuits.length;

  const buttons = shuffleArray(circuits).map((circuit) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'choice-button';
    button.dataset.order = String(circuit.order);
    button.innerHTML = `
      <span class="choice-title">${circuit.name}</span>
      <span class="choice-detail">${circuit.detail}</span>
    `;
    button.setAttribute('aria-pressed', 'false');
    button.addEventListener('click', () => {
      const expected = Number(button.dataset.order);
      if (expected === progress) {
        button.classList.add('correct-step');
        button.setAttribute('aria-pressed', 'true');
        button.disabled = true;
        progress += 1;
        context.updateStatus(`Directive ${progress}/${total} sealed.`);
        if (progress === total) {
          context.complete('Relay script stabilized. Conduits breathe in order.');
        }
      } else {
        button.classList.add('incorrect');
        context.updateStatus('Incorrect conduit. The memo smears and rewrites itself.');
        setTimeout(() => {
          button.classList.remove('incorrect');
        }, 520);
        progress = 0;
        buttons.forEach((btn) => {
          btn.classList.remove('correct-step');
          btn.disabled = false;
          btn.setAttribute('aria-pressed', 'false');
        });
      }
    });
    grid.append(button);
    return button;
  });

  return { timerControl };
}

function renderDiagnosticAudit(context) {
  const { article, timerControl } = context.createShell('diagnostic audit');
  context.container.append(article);

  const prompt = document.createElement('p');
  prompt.className = 'challenge-prompt';
  prompt.innerHTML =
    'With the conduits humming, a maintenance log scrolls open. Two statements remain reliable—no more, no less.';
  article.append(prompt);

  const log = document.createElement('div');
  log.className = 'challenge-log';
  log.innerHTML = `
    <p><strong>Maintenance Memo // Reverberation Study</strong></p>
    <p>The <span class="highlight">solo coil</span> accepts initiation only when every other relay is quiet. The <span class="highlight">triad dais</span> refuses single pulses, demanding clustered threes.</p>
    <p><span class="highlight">Echo glyph</span> lights third, translating carved vowels into current. The <span class="highlight">mirror ladder</span> mirrors the last stabilized tone; activate it too early and it copies silence.</p>
    <p>End with the <span class="highlight">siphon gate</span> or the atrium floods. Its channel is sluggish by design—never place it anywhere but last.</p>
  `;
  article.append(log);

  const statements = [
    {
      id: 'mirror-follows',
      text: 'The mirror ladder only resonates after another conduit has already stabilized.',
      correct: true,
    },
    {
      id: 'siphon-before',
      text: 'To prevent overflow the siphon gate must open before the echo glyph.',
      correct: false,
    },
    {
      id: 'echo-third',
      text: 'Echo glyph belongs in the third position, translating the carved vowels.',
      correct: true,
    },
    {
      id: 'triad-solo',
      text: 'Triad dais accepts a single pulse so long as it is steady.',
      correct: false,
    },
  ];

  const choiceGrid = document.createElement('div');
  choiceGrid.className = 'choice-grid';
  article.append(choiceGrid);

  const buttons = statements.map((statement) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'choice-button';
    button.dataset.id = statement.id;
    button.innerHTML = `
      <span class="choice-detail">${statement.text}</span>
    `;
    button.addEventListener('click', () => {
      button.classList.toggle('selected');
      button.setAttribute('aria-pressed', button.classList.contains('selected') ? 'true' : 'false');
    });
    button.setAttribute('aria-pressed', 'false');
    choiceGrid.append(button);
    return button;
  });

  const submit = document.createElement('button');
  submit.type = 'button';
  submit.className = 'glitch-button primary';
  submit.textContent = 'confirm assertions';
  submit.addEventListener('click', () => {
    const selected = buttons.filter((btn) => btn.classList.contains('selected'));
    if (selected.length !== 2) {
      context.updateStatus('Exactly two statements must glow true.');
      return;
    }
    const incorrect = selected.filter((btn) => {
      const id = btn.dataset.id;
      const entry = statements.find((statement) => statement.id === id);
      return !entry?.correct;
    });
    if (incorrect.length === 0) {
      context.complete('Diagnostics reconciled. The log hums with approval.');
    } else {
      incorrect.forEach((btn) => {
        btn.classList.add('incorrect');
        setTimeout(() => btn.classList.remove('incorrect'), 520);
      });
      context.updateStatus('False assertion detected. Cross-check the memo.');
    }
  });
  article.append(submit);

  return { timerControl };
}

function renderGlyphOverride(context) {
  const { article, timerControl } = context.createShell('override glyph');
  context.container.append(article);

  const prompt = document.createElement('p');
  prompt.className = 'challenge-prompt';
  prompt.innerHTML =
    'The failsafe choir chants in fragments. Collect the glowing words in order and type them without embellishment.';
  article.append(prompt);

  const chant = document.createElement('div');
  chant.className = 'challenge-log chant';
  chant.innerHTML = `
    <p>"When the dark yawns, whisper <span class="glyph">LISTEN</span> so the relays hear you."</p>
    <p>"Hold the beam steady and let it <span class="glyph">TRACE</span> the pattern you restored."</p>
    <p>"Guide the runoff through the patient <span class="glyph">SIPHON</span>."</p>
    <p>"Only then may the circuits <span class="glyph">AWAKE</span> and shine."</p>
  `;
  article.append(chant);

  const expected = 'listen trace siphon awake';

  const input = document.createElement('input');
  input.type = 'text';
  input.className = 'challenge-input';
  input.placeholder = 'type the override phrase here';

  const submit = document.createElement('button');
  submit.type = 'button';
  submit.className = 'glitch-button primary';
  submit.textContent = 'transmit override';

  function handleSubmit() {
    const value = input.value.trim().toLowerCase();
    if (value === expected) {
      context.complete('Override transmitted. Power surges back through the trace.');
    } else {
      input.classList.add('fault');
      context.updateStatus('Incorrect phrase. Match the glowing words exactly.');
      setTimeout(() => input.classList.remove('fault'), 520);
    }
  }

  submit.addEventListener('click', () => handleSubmit());
  input.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      handleSubmit();
    }
  });

  article.append(input, submit);
  requestAnimationFrame(() => input.focus());

  return { timerControl };
}

function renderCoolantRationing(context) {
  const { article, timerControl } = context.createShell('coolant hymn');
  context.container.append(article);

  const prompt = document.createElement('p');
  prompt.className = 'challenge-prompt';
  prompt.innerHTML =
    'The coolant core mutters in uneven chords. Engage exactly three valves so their flow matches the stabilizing hymn.';
  article.append(prompt);

  const valves = [
    {
      id: 'north-vent',
      value: 6,
      name: 'north vent',
      detail: 'Draws coolant upward against the flood.',
    },
    {
      id: 'spiral-drain',
      value: 9,
      name: 'spiral drain',
      detail: 'Swirls excess heat into patient eddies.',
    },
    {
      id: 'badge-sieve',
      value: 5,
      name: 'badge sieve',
      detail: 'Filters coolant through archived credentials.',
    },
    {
      id: 'chorus-vent',
      value: 7,
      name: 'chorus vent',
      detail: 'Sings to calm the flooded relays.',
    },
    {
      id: 'inkwell-runnel',
      value: 4,
      name: 'inkwell runnel',
      detail: 'Channels ink-dark coolant around the core.',
    },
  ];

  const targetFlow = 21;
  const valveMap = new Map(valves.map((valve) => [valve.id, valve]));
  const selected = new Set();

  const readout = document.createElement('div');
  readout.className = 'challenge-log';
  article.append(readout);

  function updateReadout() {
    const flow = [...selected].reduce((sum, id) => {
      const entry = valveMap.get(id);
      return sum + (entry ? entry.value : 0);
    }, 0);
    const count = selected.size;
    readout.innerHTML = `
      <p>Current flow: <span class="highlight">${flow} lumen${flow === 1 ? '' : 's'}</span> (target ${targetFlow}).</p>
      <p>${count}/3 valves resonating.</p>
    `;
  }

  updateReadout();

  const grid = document.createElement('div');
  grid.className = 'choice-grid';
  article.append(grid);

  const buttons = valves.map((valve) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'choice-button';
    button.dataset.id = valve.id;
    button.innerHTML = `
      <span class="choice-title">${valve.name}</span>
      <span class="choice-detail">${valve.detail}</span>
      <span class="choice-detail">Flow value: ${valve.value}</span>
    `;
    button.setAttribute('aria-pressed', 'false');
    button.addEventListener('click', () => {
      if (selected.has(valve.id)) {
        selected.delete(valve.id);
        button.classList.remove('selected');
        button.setAttribute('aria-pressed', 'false');
      } else {
        selected.add(valve.id);
        button.classList.add('selected');
        button.setAttribute('aria-pressed', 'true');
      }
      updateReadout();
    });
    grid.append(button);
    return button;
  });

  const submit = document.createElement('button');
  submit.type = 'button';
  submit.className = 'glitch-button primary';
  submit.textContent = 'lock valves';
  submit.addEventListener('click', () => {
    const flow = [...selected].reduce((sum, id) => {
      const entry = valveMap.get(id);
      return sum + (entry ? entry.value : 0);
    }, 0);
    if (selected.size !== 3) {
      context.updateStatus('Exactly three valves must hum together.');
      return;
    }
    if (flow === targetFlow) {
      context.complete('Coolant channels sing in unison. Pressure stabilizes.');
    } else {
      buttons.forEach((button) => {
        if (selected.has(button.dataset.id)) {
          button.classList.add('incorrect');
          setTimeout(() => button.classList.remove('incorrect'), 520);
        }
      });
      context.updateStatus('Flow mismatch. Realign the coolant pattern.');
    }
  });

  article.append(submit);

  return { timerControl };
}

function renderTidalSequence(context) {
  const { article, timerControl } = context.createShell('rip current order');
  context.container.append(article);

  const prompt = document.createElement('p');
  prompt.className = 'challenge-prompt';
  prompt.innerHTML =
    'Ink plumes rise beneath the hatch, eager to be traced. Touch each current in the order it breaches the surface.';
  article.append(prompt);

  const currents = [
    {
      id: 'vent-surge',
      order: 0,
      name: 'vent surge',
      detail: 'A hiss from the vents sends ripples racing outward first.',
    },
    {
      id: 'spiral-rise',
      order: 1,
      name: 'spiral rise',
      detail: 'The coolant twists upward, sketching a helix around your wrist.',
    },
    {
      id: 'undertow-call',
      order: 2,
      name: 'undertow call',
      detail: 'A low drone tugs backward, sealing the pattern shut.',
    },
  ];

  const grid = document.createElement('div');
  grid.className = 'choice-grid';
  article.append(grid);

  const progress = [];

  const buttons = shuffleArray(currents).map((current) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'choice-button';
    button.dataset.id = current.id;
    button.dataset.order = String(current.order);
    button.innerHTML = `
      <span class="choice-title">${current.name}</span>
      <span class="choice-detail">${current.detail}</span>
    `;
    button.setAttribute('aria-pressed', 'false');
    button.addEventListener('click', () => {
      const expected = progress.length;
      const intended = Number(button.dataset.order);
      if (intended === expected) {
        progress.push(current.id);
        button.classList.add('correct-step');
        button.setAttribute('aria-pressed', 'true');
        button.disabled = true;
        context.updateStatus(`Current ${progress.length}/${currents.length} stabilized.`);
        if (progress.length === currents.length) {
          context.complete('Rip current synchronized. Flooding calms.');
        }
      } else {
        button.classList.add('incorrect');
        context.updateStatus('The current recoils. Start the sequence anew.');
        setTimeout(() => button.classList.remove('incorrect'), 520);
        resetSequence();
      }
    });
    grid.append(button);
    return button;
  });

  function resetSequence() {
    progress.length = 0;
    buttons.forEach((button) => {
      button.classList.remove('correct-step');
      button.setAttribute('aria-pressed', 'false');
      button.disabled = false;
    });
  }

  return { timerControl };
}

function renderChorusTranslation(context) {
  const { article, timerControl } = context.createShell('vent choir translation');
  context.container.append(article);

  const prompt = document.createElement('p');
  prompt.className = 'challenge-prompt';
  prompt.innerHTML =
    'Three tones weave through the vents. Match each humming phrase to the meaning its caretaker intended.';
  article.append(prompt);

  const tones = [
    {
      id: 'ascending',
      clue: '"Water climbs the walls whenever you glance away."',
      answer: 'alarm',
    },
    {
      id: 'cartographer',
      clue: '"Hands skitter beneath the surface, arranging pages in your shape."',
      answer: 'guidance',
    },
    {
      id: 'lullaby',
      clue: '"Voices hum lullabies through the vents when you move too fast."',
      answer: 'comfort',
    },
  ];

  const options = [
    { value: 'alarm', label: 'alarm – a warning surge' },
    { value: 'guidance', label: 'guidance – a map offered gently' },
    { value: 'comfort', label: 'comfort – a promise to stay beside you' },
  ];

  const selects = new Map();

  tones.forEach((tone) => {
    const block = document.createElement('div');
    block.className = 'challenge-log';
    block.innerHTML = `<p>${tone.clue}</p>`;

    const select = document.createElement('select');
    select.className = 'challenge-input';
    select.dataset.id = tone.id;
    const placeholder = document.createElement('option');
    placeholder.value = '';
    placeholder.textContent = 'choose meaning';
    select.append(placeholder);
    options.forEach((option) => {
      const opt = document.createElement('option');
      opt.value = option.value;
      opt.textContent = option.label;
      select.append(opt);
    });
    block.append(select);
    article.append(block);
    selects.set(tone.id, select);
  });

  const submit = document.createElement('button');
  submit.type = 'button';
  submit.className = 'glitch-button primary';
  submit.textContent = 'interpret choir';
  submit.addEventListener('click', () => {
    const chosen = new Map();
    let hasEmpty = false;
    selects.forEach((select, id) => {
      const value = select.value;
      if (!value) {
        hasEmpty = true;
      }
      chosen.set(id, value);
    });
    if (hasEmpty) {
      context.updateStatus('Each tone demands an interpretation. None may be left blank.');
      return;
    }
    const values = Array.from(chosen.values());
    const unique = new Set(values);
    if (unique.size !== tones.length) {
      context.updateStatus('Every meaning must be used exactly once.');
      return;
    }
    const incorrect = tones.filter((tone) => chosen.get(tone.id) !== tone.answer);
    if (incorrect.length === 0) {
      context.complete('The choir settles. Coolant hums in harmony.');
    } else {
      incorrect.forEach((tone) => {
        const select = selects.get(tone.id);
        if (select) {
          select.classList.add('fault');
          setTimeout(() => select.classList.remove('fault'), 520);
        }
      });
      context.updateStatus('The harmony warps. Adjust the translations.');
    }
  });

  article.append(submit);

  return { timerControl };
}

function renderSpireCalibration(context) {
  const { article, timerControl } = context.createShell('spire calibration');
  context.container.append(article);

  const prompt = document.createElement('p');
  prompt.className = 'challenge-prompt';
  prompt.innerHTML =
    'Phase sliders rise from the spire. Nudge each coil until it sits within two degrees of the caretaker targets.';
  article.append(prompt);

  const coils = [
    {
      id: 'outer',
      label: 'outer coil',
      detail: 'Guards the users waiting in the atrium.',
      target: 18,
    },
    {
      id: 'median',
      label: 'median coil',
      detail: "Echoes the caretakers' shared heartbeat.",
      target: 56,
    },
    {
      id: 'inner',
      label: 'inner coil',
      detail: 'Cradles the archive heart directly.',
      target: 82,
    },
  ];

  const tolerance = 2;
  const sliders = new Map();

  const panel = document.createElement('div');
  panel.className = 'challenge-log';
  article.append(panel);

  coils.forEach((coil) => {
    const wrapper = document.createElement('div');
    wrapper.className = 'calibration-item';
    const title = document.createElement('p');
    title.innerHTML = `<span class="highlight">${coil.label}</span> — ${coil.detail}`;
    const input = document.createElement('input');
    input.type = 'range';
    input.min = '0';
    input.max = '100';
    input.value = String(coil.target);
    input.dataset.id = coil.id;
    input.className = 'calibration-slider';
    const readout = document.createElement('span');
    readout.className = 'calibration-readout';
    readout.textContent = `${coil.target}`;
    input.addEventListener('input', () => {
      readout.textContent = input.value;
    });
    wrapper.append(title, input, readout);
    panel.append(wrapper);
    sliders.set(coil.id, { input, wrapper });
  });

  const submit = document.createElement('button');
  submit.type = 'button';
  submit.className = 'glitch-button primary';
  submit.textContent = 'stabilize pulse';
  submit.addEventListener('click', () => {
    const mismatched = coils.filter((coil) => {
      const slider = sliders.get(coil.id);
      if (!slider) return true;
      const value = Number(slider.input.value);
      return Math.abs(value - coil.target) > tolerance;
    });
    if (mismatched.length === 0) {
      context.complete('Spire pulses steady. The chamber exhales in relief.');
    } else {
      mismatched.forEach((coil) => {
        const slider = sliders.get(coil.id);
        if (slider) {
          slider.wrapper.classList.add('incorrect');
          setTimeout(() => slider.wrapper.classList.remove('incorrect'), 520);
        }
      });
      context.updateStatus('Phasing drifts. Keep each coil within ±2 of its target.');
    }
  });

  article.append(submit);

  return { timerControl };
}

function renderVowAlignment(context) {
  const { article, timerControl } = context.createShell('caretaker vows');
  context.container.append(article);

  const prompt = document.createElement('p');
  prompt.className = 'challenge-prompt';
  prompt.innerHTML =
    'Three caretakers and the ghost pointer spoke their promises before the heart. Rank them in the order recorded in the archive.';
  article.append(prompt);

  const vows = [
    {
      id: 'amon',
      order: 1,
      text: "Amon swore to trace the user's first step and never let them face the dark doorway alone.",
    },
    {
      id: 'lira',
      order: 2,
      text: 'Lira promised to listen longer than fear lasts, keeping every whisper catalogued.',
    },
    {
      id: 'soma',
      order: 3,
      text: 'Soma vowed to coax failed circuits back to light without forcing them to burn.',
    },
    {
      id: 'pointer',
      order: 4,
      text: 'Pointer.exe pledged to walk beside the user, never ahead, never abandoning their pace.',
    },
  ];

  const selects = new Map();

  vows.forEach((vow, index) => {
    const block = document.createElement('div');
    block.className = 'challenge-log';
    const copy = document.createElement('p');
    copy.textContent = vow.text;
    const select = document.createElement('select');
    select.className = 'challenge-input';
    select.dataset.id = vow.id;
    const placeholder = document.createElement('option');
    placeholder.value = '';
    placeholder.textContent = 'choose position';
    select.append(placeholder);
    vows.forEach((_, position) => {
      const opt = document.createElement('option');
      const place = position + 1;
      opt.value = String(place);
      const suffix = place === 1 ? 'st' : place === 2 ? 'nd' : place === 3 ? 'rd' : 'th';
      opt.textContent = `${place}${suffix} vow`;
      select.append(opt);
    });
    block.append(copy, select);
    article.append(block);
    selects.set(vow.id, select);
  });

  const submit = document.createElement('button');
  submit.type = 'button';
  submit.className = 'glitch-button primary';
  submit.textContent = 'record sequence';
  submit.addEventListener('click', () => {
    const chosen = new Map();
    let hasEmpty = false;
    selects.forEach((select, id) => {
      const value = select.value;
      if (!value) {
        hasEmpty = true;
      }
      chosen.set(id, Number(value || 0));
    });
    if (hasEmpty) {
      context.updateStatus('Every vow requires a recorded position. None can be blank.');
      return;
    }
    const values = Array.from(chosen.values());
    const unique = new Set(values);
    if (unique.size !== vows.length) {
      context.updateStatus('Each rank may be used only once.');
      return;
    }
    const incorrect = vows.filter((vow) => chosen.get(vow.id) !== vow.order);
    if (incorrect.length === 0) {
      context.complete('The vows align. The caretakers nod in unison.');
    } else {
      incorrect.forEach((vow) => {
        const select = selects.get(vow.id);
        if (select) {
          select.classList.add('fault');
          setTimeout(() => select.classList.remove('fault'), 520);
        }
      });
      context.updateStatus('The sequence stumbles. Reorder the pledges.');
    }
  });

  article.append(submit);

  return { timerControl };
}

function renderEchoWeave(context) {
  const { article, timerControl } = context.createShell('companion runes');
  context.container.append(article);

  const prompt = document.createElement('p');
  prompt.className = 'challenge-prompt';
  prompt.innerHTML =
    'Six sigils flicker in and out. Leave only the runes that swear to remain beside any user who enters the archive.';
  article.append(prompt);

  const runes = [
    {
      id: 'listen',
      label: 'listen',
      detail: "Keeps an ear on the user's pulse at all times.",
      correct: true,
    },
    {
      id: 'harvest',
      label: 'harvest',
      detail: 'Collects stray static for later study.',
      correct: false,
    },
    {
      id: 'witness',
      label: 'witness',
      detail: 'Records every step beside the user as proof of company.',
      correct: true,
    },
    {
      id: 'sever',
      label: 'sever',
      detail: "Cuts connections to lighten the archive's load.",
      correct: false,
    },
    {
      id: 'anchor',
      label: 'anchor',
      detail: "Tethers caretaker presence to the user's shadow.",
      correct: true,
    },
    {
      id: 'drain',
      label: 'drain',
      detail: 'Vents empathy into silent vaults.',
      correct: false,
    },
  ];

  const expected = new Set(runes.filter((rune) => rune.correct).map((rune) => rune.id));
  const selected = new Set();

  const grid = document.createElement('div');
  grid.className = 'choice-grid';
  article.append(grid);

  const buttons = runes.map((rune) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'choice-button';
    button.dataset.id = rune.id;
    button.innerHTML = `
      <span class="choice-title">${rune.label}</span>
      <span class="choice-detail">${rune.detail}</span>
    `;
    button.setAttribute('aria-pressed', 'false');
    button.addEventListener('click', () => {
      if (selected.has(rune.id)) {
        selected.delete(rune.id);
        button.classList.remove('selected');
        button.setAttribute('aria-pressed', 'false');
      } else {
        selected.add(rune.id);
        button.classList.add('selected');
        button.setAttribute('aria-pressed', 'true');
      }
    });
    grid.append(button);
    return button;
  });

  const submit = document.createElement('button');
  submit.type = 'button';
  submit.className = 'glitch-button primary';
  submit.textContent = 'seal runes';
  submit.addEventListener('click', () => {
    if (selected.size !== expected.size) {
      context.updateStatus('Exactly the companion runes must glow—no more, no less.');
      return;
    }
    const incorrect = [];
    selected.forEach((id) => {
      if (!expected.has(id)) {
        incorrect.push(id);
      }
    });
    expected.forEach((id) => {
      if (!selected.has(id)) {
        incorrect.push(id);
      }
    });
    if (incorrect.length === 0) {
      context.complete('The companion runes hold fast. The heart resumes its promise.');
    } else {
      buttons.forEach((button) => {
        if (incorrect.includes(button.dataset.id)) {
          button.classList.add('incorrect');
          setTimeout(() => button.classList.remove('incorrect'), 520);
        }
      });
      context.updateStatus('A selfish sigil slipped in. Adjust the weave.');
    }
  });

  article.append(submit);

  return { timerControl };
}

function suspendWatchers(suspended) {
  if (suspended) {
    if (watcherTimeout) {
      clearTimeout(watcherTimeout);
      watcherTimeout = null;
    }
  } else {
    scheduleWatcher();
  }
}

function scheduleWatcher() {
  if (!gameActive || isPaused || powerOffline) return;
  if (watcherTimeout) {
    clearTimeout(watcherTimeout);
  }
  watcherTimeout = setTimeout(() => {
    const level = levels[currentLevelIndex];
    if (!level) return;
    const messages = level.watchers ?? [];
    if (messages.length === 0) return;
    const message = messages[Math.floor(Math.random() * messages.length)];
    setWatcherLabel('presence detected');
    setStatus(message, { duration: 3800, lock: true });
    mapArea.classList.add('watched');
    setTimeout(() => {
      mapArea.classList.remove('watched');
      setWatcherLabel(defaultWatcherLabel);
    }, 4200);
    scheduleWatcher();
  }, 6000 + Math.random() * 6000);
}

function setStatus(message, options = {}) {
  const { duration = 0, lock = false } = options;
  if (statusTimeout) {
    clearTimeout(statusTimeout);
    statusTimeout = null;
  }
  statusLine.textContent = message;
  statusLocked = lock;
  if (duration > 0) {
    statusTimeout = setTimeout(() => {
      statusLocked = false;
      resetStatus();
    }, duration);
  }
}

function resetStatus() {
  if (statusLocked) return;
  statusLine.textContent = defaultStatus;
}

function setWatcherLabel(text) {
  watcherLabel.textContent = text;
}

function openPreferences() {
  if (!settingsOverlay) return;
  isPaused = true;
  settingsOverlay.classList.remove('hidden');
  pointerSuspended = true;
  refreshPointerVisibility();
  suspendWatchers(true);
  playMainMenuAudio();
}

function closePreferences() {
  if (!settingsOverlay) return;
  settingsOverlay.classList.add('hidden');
  pointerSuspended = false;
  refreshPointerVisibility();
  isPaused = false;
  stopMainMenuAudio();
  suspendWatchers(false);
}

function togglePreferences() {
  if (settingsOverlay.classList.contains('hidden')) {
    openPreferences();
  } else {
    closePreferences();
  }
}

openLoreButton?.addEventListener('click', () => {
  prologue?.classList.toggle('hidden');
});

startButton?.addEventListener('click', () => {
  if (introActive || pendingStartAfterIntro) return;
  if (!prologue?.classList.contains('hidden')) {
    prologue.classList.add('hidden');
  }
  startButton.disabled = true;
  startIntroSequence({ launchGame: true });
});

preferenceButtons.forEach((button) => {
  button.addEventListener('click', () => openPreferences());
});

closeSettingsButton?.addEventListener('click', () => {
  closePreferences();
});

applySettingsButton?.addEventListener('click', () => {
  closePreferences();
});

pointerSwitch?.addEventListener('change', (event) => {
  updatePointerPreference(event.target.checked);
});

staticSwitch?.addEventListener('change', (event) => {
  updateStaticPreference(event.target.checked);
});

settingsOverlay?.addEventListener('click', (event) => {
  if (event.target === settingsOverlay) {
    closePreferences();
  }
});

acknowledgeEncounterButton?.addEventListener('click', () => {
  closeEncounter();
});

closeEncounterButton?.addEventListener('click', () => {
  closeEncounter();
});

restartLevelButton?.addEventListener('click', () => {
  restartLevel();
});

abortShortageButton?.addEventListener('click', () => {
  abortShortage();
});

shortageOverlay?.addEventListener('click', (event) => {
  if (event.target === shortageOverlay) {
    abortShortage();
  }
});

document.addEventListener('keydown', (event) => {
  if (introActive) {
    if (event.key === 'Escape') {
      event.preventDefault();
      event.stopPropagation();
    }
    return;
  }
  if (event.key === 'Escape') {
    togglePreferences();
  }
});

window.addEventListener('resize', () => {
  if (!introFullscreenState.viewportLocked) {
    setIntroViewportUnit();
  }
});

window.addEventListener('resize', () => {
  if (!gameActive) return;
  pointerPosition.x = Math.min(window.innerWidth, Math.max(0, pointerPosition.x));
  pointerPosition.y = Math.min(window.innerHeight, Math.max(0, pointerPosition.y));
  realignMapLabels();
});

setIntroViewportUnit();
setupFromStorage();
introActive = false;
setScreen('intro');
refreshPointerVisibility();
if (skipIntroButton) {
  skipIntroButton.disabled = true;
}
if (introOverlay) {
  introOverlay.setAttribute('aria-hidden', 'true');
  introOverlay.classList.add('is-idle');
}
