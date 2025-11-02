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
let isPaused = false;
let powerOffline = false;
let currentEncounterNode = null;
let pendingShortageNode = null;
let shortageSequence = [];
let shortageProgress = 0;
let statusTimeout = null;
let statusLocked = false;
let watcherTimeout = null;
let collectedFragments = new Map();
let levelState = {
  keysFound: 0,
  keysRequired: 0,
};

const pointerTarget = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
const pointerPosition = { x: pointerTarget.x, y: pointerTarget.y };

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
    playMainMenuAudio();
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
  } else {
    pointerGhost.classList.add('is-hidden');
  }
  document.body?.classList.toggle('hide-cursor', pointerEnabled && gameActive && !pointerSuspended);
}

function ensurePointerAnimation() {
  if (pointerAnimationActive) return;
  pointerAnimationActive = true;
  const animate = () => {
    if (!pointerEnabled || !gameActive || pointerSuspended) {
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
  shortageProgress = 0;
  shortageSequence = shuffleSequence(5);
  shortageStatus.textContent = 'grid offline. trace lines flicker.';
  shortageDescription.textContent = 'Follow the highlighted order. Each sigil demands a steady hand.';
  renderShortagePuzzle();
  shortageOverlay.classList.remove('hidden');
  pointerSuspended = true;
  refreshPointerVisibility();
  mapArea?.classList.add('power-down');
  playShortageAmbient();
  playShortageScore();
  setStatus('the level waits in darkness. restore the pulse.', { duration: 3200 });
}

function renderShortagePuzzle() {
  shortagePuzzle.innerHTML = '';
  shortageSequence.forEach((value, index) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'sigil';
    button.dataset.order = String(value);
    button.textContent = value + 1;
    button.addEventListener('click', () => handleShortageInput(index));
    shortagePuzzle.append(button);
  });
  requestAnimationFrame(() => {
    const first = shortagePuzzle.querySelector('[data-order="0"]');
    if (first) first.classList.add('target');
  });
}

function handleShortageInput(index) {
  const expectedOrder = shortageProgress;
  const button = shortagePuzzle.children[index];
  if (!button) return;
  const order = Number(button.dataset.order);
  if (order === expectedOrder) {
    button.classList.add('charged');
    button.classList.remove('target');
    shortageProgress += 1;
    const nextButton = Array.from(shortagePuzzle.children).find(
      (child) => Number(child.dataset.order) === shortageProgress
    );
    if (nextButton) {
      nextButton.classList.add('target');
      shortageStatus.textContent = `relay ${shortageProgress}/${shortageSequence.length} stabilized.`;
    } else {
      resolveShortage();
    }
  } else {
    button.classList.add('fault');
    shortageStatus.textContent = 'sequence broken. begin again.';
    setTimeout(() => {
      shortageProgress = 0;
      Array.from(shortagePuzzle.children).forEach((child) => {
        child.classList.remove('charged', 'fault', 'target');
      });
      const first = shortagePuzzle.querySelector('[data-order="0"]');
      if (first) first.classList.add('target');
    }, 420);
  }
}

function resolveShortage() {
  shortageOverlay.classList.add('hidden');
  stopShortageAmbient();
  stopShortageScore();
  powerOffline = false;
  pointerSuspended = false;
  refreshPointerVisibility();
  mapArea?.classList.remove('power-down');
  if (pendingShortageNode && !pendingShortageNode.visited) {
    markNodeVisited(pendingShortageNode);
    if (pendingShortageNode.encounter.afterStatus) {
      setStatus(pendingShortageNode.encounter.afterStatus, { duration: 3600 });
    } else {
      setStatus('The lights stagger back to life.', { duration: 2800 });
    }
  }
  pendingShortageNode = null;
  suspendWatchers(false);
}

function abortShortage() {
  shortageOverlay.classList.add('hidden');
  stopShortageAmbient();
  stopShortageScore();
  setStatus('You linger in the dark. The archive disapproves.', { duration: 3200 });
  powerOffline = true;
  mapArea?.classList.add('power-down');
  pointerSuspended = false;
  refreshPointerVisibility();
  suspendWatchers(true);
}

function shuffleSequence(length) {
  const arr = Array.from({ length }, (_, index) => index);
  for (let i = arr.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
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
  startGame();
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
  if (event.key === 'Escape') {
    togglePreferences();
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
