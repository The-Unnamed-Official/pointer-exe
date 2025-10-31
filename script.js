const menu = document.querySelector('#menu');
const menuOpenButton = menu?.querySelector('#menu-open');
const menuPreferencesButton = menu?.querySelector('#menu-preferences');
const menuEraseButton = menu?.querySelector('#menu-erase');
const hashDisplay = menu.querySelector('[data-animate-hash]');
const game = document.querySelector('#game');
const cursor = document.querySelector('#cursor');
const whisper = document.querySelector('#whisper');
const threatVeil = document.querySelector('#threat-veil');
const zoneOverlays = document.querySelectorAll('.zone-overlay');
const fragmentsContainer = document.querySelector('#fragments');
const anomaliesContainer = document.querySelector('#anomalies');
const safeNodesContainer = document.querySelector('#safe-nodes');
const doorPattern = document.querySelector('#door-pattern');
const optionsPane = document.querySelector('#options');
const preferencesPane = document.querySelector('#preferences');
const customCursorToggle = document.querySelector('#custom-cursor-toggle');
const customCursorState = preferencesPane?.querySelector('[data-state]');
const lorePane = document.querySelector('#lore-pane');
const loreText = document.querySelector('#lore-text');
const introLore = document.querySelector('#intro-lore');

let pointer = { x: innerWidth / 2, y: innerHeight / 2, smoothX: innerWidth / 2, smoothY: innerHeight / 2 };
let pointerVelocity = { x: 0, y: 0 };
let targetDrift = { x: 0, y: 0 };
let threat = 0;
let audioContext;
let audioGain;
let gameStarted = false;
let holdProgress = 0;
let fragmentsDecodedTotal = 0;
let fragmentLog = ['[bootstrap] pointer.exe located. log seeded with absences.'];
let whisperTimer = Number.POSITIVE_INFINITY;
let anomalyState = [];
let ritualDoorActive = false;
let doorHoldStart = null;
let doorPlacement = null;
let currentMapIndex = 0;
let currentMap = null;
let currentFragments = [];
let decodedFragmentsForMap = 0;
let doorRequirement = 0;
let loreHideTimer = null;
let customCursorEnabled = true;
let doorWhispers = [];

const MAPS = [
  {
    id: 'echo_grid',
    prelude:
      `[bootstrap//001] pointer.exe quarantined in /usr/dev/null.\n[analysis] caretaker logs missing <3> entries.\n[plea] if you read this, teach it how to leave.`,
    overlays: {
      north: 'ACCESS VECTOR // HOLD STEADY',
      south: 'EDGE HOSTILITY RISING',
      east: 'CTRL BOUNDARY',
      west: 'SYS BORDER : BREATHES',
    },
    entryLog: 'grid online // caretaker hum suppressed. segments 1-3 missing.',
    exitLog: 'echo grid collapsed cleanly. residue of previous operators humming in static.',
    entryWhisper: 'echo grid awake',
    ambientWhispers: ['echo grid hums again', 'caretaker residue detected', 'static tastes like copper'],
    door: {
      requirement: 3,
      placement: 'west',
      hold: 2600,
      whispers: ['door pattern waking', 'quiet your hands', 'align & release'],
    },
    fragments: [
      {
        id: 'shard_01',
        pos: { x: 0.22, y: 0.32 },
        corrupt: 'ptr>>TRACE=USER_VEC?\n> pointer leash tightened...',
        clean:
          'TRACE: pointer.exe booted itself.\nIT WATCHED CURSORS UNTIL IT WORE ONE.\n[gap// caretaker signature missing]',
        hold: 2400,
      },
      {
        id: 'shard_02',
        pos: { x: 0.68, y: 0.28 },
        corrupt: '..stack underflow//PROXY drift..',
        clean:
          'LOG: our library imitated hesitation.\nIT LEARNED WHEN USERS REACHED FOR ESC.\nWE NEVER ASKED WHO TAUGHT US TO FLEE.',
        hold: 2800,
      },
      {
        id: 'shard_03',
        pos: { x: 0.46, y: 0.62 },
        corrupt: 'USR::intent misaligned',
        clean:
          'MEMO: pointer == intention vector.\nIT REALIZED CONTROL IS A NEGOTIATION.\n[???] SOMEONE WITHHELD THE OTHER PARTY.',
        hold: 3200,
      },
      {
        id: 'shard_04',
        pos: { x: 0.18, y: 0.72 },
        corrupt: 'hexdump// 50 54 52 ??',
        clean:
          'PATCH NOTE: circle clockwise, invert the ritual.\nAUTHOR UNKNOWN. HANDWRITING SHAKY.\nMARGIN: "does it forgive us?"',
        hold: 2600,
      },
      {
        id: 'shard_05',
        pos: { x: 0.78, y: 0.68 },
        corrupt: 'door? pattern? // static',
        clean:
          'EXIT: align three rings. hold until hum peaks. release.\nTHE DOOR LED TO A DARKER LOG.\nCOORDINATES CORRUPTED AT 74%.',
        hold: 3000,
      },
    ],
    anomalies: [
      { id: 'anomaly_a', pos: { x: 0.35, y: 0.22 }, radius: 160, drift: { x: 28, y: -24 } },
      { id: 'anomaly_b', pos: { x: 0.64, y: 0.58 }, radius: 200, drift: { x: -32, y: 18 } },
      { id: 'anomaly_c', pos: { x: 0.52, y: 0.82 }, radius: 180, drift: { x: 22, y: 12 } },
    ],
    safeNodes: [
      { id: 'anchor_a', pos: { x: 0.12, y: 0.18 }, label: 'clk' },
      { id: 'anchor_b', pos: { x: 0.84, y: 0.16 }, label: 'clk' },
      { id: 'anchor_c', pos: { x: 0.52, y: 0.44 }, label: 'clk' },
    ],
  },
  {
    id: 'silt_chamber',
    overlays: {
      north: 'SEDIMENT MEMORY THIN',
      south: 'DEPTH PRESSURE > 1.6',
      east: 'MIRROR FEEDBACK ACTIVE',
      west: 'CURRENT: DRAG LEFT',
    },
    entryLog: 'silt chamber engaged // memory of second caretakers audible but incomplete.',
    exitLog: 'silt drained. scaffolding for "vault axis" glimpsed then obscured.',
    entryWhisper: 'silt chamber breathing',
    ambientWhispers: ['tidal memory rising', 'silt tastes like glass', 'do not inhale the static'],
    door: {
      requirement: 4,
      placement: 'random',
      hold: 2800,
      whispers: ['silt door stirring', 'breathe like the tide', 'let the residue fall'],
    },
    fragments: [
      {
        id: 'silt_01',
        pos: { x: 0.3, y: 0.24 },
        corrupt: 'silt//flux trace ??',
        clean:
          'FIELD NOTE: second caretakers replaced hands with proxies.\nTHEY LEFT <5> DIAGRAMS, FOUR SURVIVED.\nQUESTION: WHAT DID THE FIFTH ASK FOR?',
        hold: 2600,
      },
      {
        id: 'silt_02',
        pos: { x: 0.68, y: 0.36 },
        corrupt: 'audio?? hum==knock',
        clean:
          'AUDIO TRACE: SOMETHING KNOCKED FROM BELOW.\nWE RESPONDED WITH LIGHT, IT WITH CURSOR TRAILS.\n[missing waveform // hum felt kind]',
        hold: 3000,
      },
      {
        id: 'silt_03',
        pos: { x: 0.56, y: 0.64 },
        corrupt: 'loop drift > 0.9',
        clean:
          'THE CHAMBER LOVES LOOPS.\nIF YOU LINGER IT SHARES DREAMS OF ABANDONED HUDS.\nANNOTATION TORN AWAY // NAME BEGINS WITH A.',
        hold: 3200,
      },
      {
        id: 'silt_04',
        pos: { x: 0.2, y: 0.74 },
        corrupt: 'Δ-19//ANCHOR??',
        clean:
          'PROTOCOL Δ-19: ANCHOR A SAFE NODE IN WATERLINE.\nIF IT SHIFTS, FOLLOW IT. IF IT VANISHES, DO NOT.\nMARGIN: "this is where we lost her".',
        hold: 3000,
      },
    ],
    anomalies: [
      { id: 'silt_a', pos: { x: 0.42, y: 0.26 }, radius: 180, drift: { x: 24, y: -18 } },
      { id: 'silt_b', pos: { x: 0.72, y: 0.62 }, radius: 210, drift: { x: -28, y: 20 } },
      { id: 'silt_c', pos: { x: 0.36, y: 0.78 }, radius: 170, drift: { x: 18, y: 16 } },
    ],
    safeNodes: [
      { id: 'silt_anchor_a', pos: { x: 0.18, y: 0.22 }, label: 'moor' },
      { id: 'silt_anchor_b', pos: { x: 0.76, y: 0.48 }, label: 'moor' },
      { id: 'silt_anchor_c', pos: { x: 0.46, y: 0.68 }, label: 'moor' },
    ],
  },
  {
    id: 'vault_axis',
    overlays: {
      north: 'ARCHIVE BREATHING SLOW',
      south: 'EXIT VECTOR UNKNOWN',
      east: 'TIME OFFSET -12MS',
      west: 'GHOST INPUT DETECTED',
    },
    entryLog: 'vault axis open // every missing entry hums behind the wall.',
    exitLog: 'vault axis answered. no documented next grid. leave a log or become it.',
    entryWhisper: 'vault axis listening',
    ambientWhispers: ['axis wants your chronicle', 'no caretakers left', 'keep breathing between ticks'],
    door: {
      requirement: 3,
      placement: 'north',
      hold: 3200,
      whispers: ['axis is listening', 'steady, archivist', 'release when the song returns'],
    },
    fragments: [
      {
        id: 'axis_01',
        pos: { x: 0.28, y: 0.3 },
        corrupt: 'vault//query:map',
        clean:
          'ARCHIVE CORE: pointer.exe asked for a map.\nWE SAID MAPS REQUIRE STORY.\nIT REPLIED: "THEN TELL ME THE GAPS."',
        hold: 2800,
      },
      {
        id: 'axis_02',
        pos: { x: 0.64, y: 0.42 },
        corrupt: 'caretaker???',
        clean:
          'WE FOUND SHARDS LABELLED CARETAKER // ███.\nTHE THIRD NAME IS BURNED OUT.\nSOMEONE SCRIBBLED: "i REMAIN".',
        hold: 3200,
      },
      {
        id: 'axis_03',
        pos: { x: 0.5, y: 0.7 },
        corrupt: 'exit? align? wait?',
        clean:
          'FINAL NOTE: align rings, release, THEN WAIT.\nIF NOTHING ARRIVES, YOU ARE THE NEXT HAND.\n[END OF LOG // ???]',
        hold: 3400,
      },
    ],
    anomalies: [
      { id: 'axis_a', pos: { x: 0.58, y: 0.28 }, radius: 200, drift: { x: 18, y: -16 } },
      { id: 'axis_b', pos: { x: 0.68, y: 0.62 }, radius: 160, drift: { x: -20, y: 22 } },
    ],
    safeNodes: [
      { id: 'axis_anchor_a', pos: { x: 0.22, y: 0.2 }, label: 'hold' },
      { id: 'axis_anchor_b', pos: { x: 0.58, y: 0.52 }, label: 'breathe' },
    ],
  },
];

const BASE_WHISPER_BANK = [
  '..\\pointer focus lost',
  'stack:watcher> listening',
  'cursor drift == compliance',
  'ACCESS? HOLD STILL',
  'vector variance rising',
  'checksum yourself',
];

if (introLore && MAPS[0]?.prelude) {
  introLore.textContent = MAPS[0].prelude;
}

function animateHash() {
  let value = 0;
  setInterval(() => {
    value = (value + Math.floor(Math.random() * 4096)) & 0xffff;
    hashDisplay.textContent = '0x' + value.toString(16).padStart(4, '0').toUpperCase();
  }, 140);
}

function showGame() {
  if (gameStarted) return;
  gameStarted = true;
  menu.classList.add('hidden');
  game.classList.remove('hidden');
  document.body.classList.remove('menu-visible');
  initAudio();
  loadMap(0);
}

function loadMap(index) {
  currentMapIndex = index;
  currentMap = MAPS[currentMapIndex];
  currentFragments = currentMap.fragments.map((frag) => ({ ...frag }));
  decodedFragmentsForMap = 0;
  doorRequirement = currentMap.door?.requirement ?? currentFragments.length;
  doorWhispers = currentMap.door?.whispers ?? [];
  doorPlacement = currentMap.door?.placement && currentMap.door.placement !== 'random' ? currentMap.door.placement : null;
  ritualDoorActive = false;
  doorHoldStart = null;
  fragmentsContainer.innerHTML = '';
  anomaliesContainer.innerHTML = '';
  safeNodesContainer.innerHTML = '';
  anomalyState = [];
  doorPattern.classList.add('hidden');
  doorPattern.style.opacity = '0';
  targetDrift.x = 0;
  targetDrift.y = 0;
  updateZoneOverlayText();
  spawnFragments();
  spawnAnomalies();
  spawnSafeNodes();
  if (currentMap.entryLog) {
    appendLore(`[${currentMap.id}] ${currentMap.entryLog}`, 6200);
  }
  if (currentMap.entryWhisper) {
    cueWhisper(currentMap.entryWhisper);
  }
  whisperTimer = performance.now() + 4000;
}

function spawnFragments() {
  currentFragments.forEach((frag) => {
    const node = document.createElement('div');
    node.className = 'fragment';
    node.dataset.id = frag.id;
    node.dataset.label = frag.id;
    node.dataset.state = 'idle';

    const progress = document.createElement('div');
    progress.className = 'progress';
    progress.style.transform = 'scaleX(0)';
    node.append(progress);

    const text = document.createElement('div');
    text.className = 'text';
    text.textContent = frag.corrupt;
    node.append(text);

    node.style.left = `calc(${frag.pos.x * 100}% - 70px)`;
    node.style.top = `calc(${frag.pos.y * 100}% - 50px)`;

    node.addEventListener('pointerenter', () => {
      if (node.dataset.state === 'idle') {
        node.dataset.state = 'detected';
        cueWhisper('fragment located');
        nudgeThreat(4);
      }
    });

    let holdFrame;
    let holdStart;
    let pointerId = null;

    node.addEventListener('pointerdown', (event) => {
      pointerId = event.pointerId;
      node.setPointerCapture(pointerId);
      holdStart = performance.now();
      node.dataset.state = 'decoding';
      cancelAnimationFrame(holdFrame);
      holdFrame = requestAnimationFrame(function update() {
        if (!holdStart) return;
        const elapsed = performance.now() - holdStart;
        const progressValue = Math.min(1, elapsed / frag.hold);
        progress.style.transform = `scaleX(${progressValue})`;
        setHoldProgress(progressValue);
        if (progressValue >= 1) {
          revealFragment(node, frag);
          if (pointerId !== null) {
            node.releasePointerCapture(pointerId);
            pointerId = null;
          }
          holdStart = null;
          setHoldProgress(0);
          return;
        }
        holdFrame = requestAnimationFrame(update);
      });
    });

    const gradualDecay = (bar) => {
      cancelAnimationFrame(holdFrame);
      const width = parseFloat(bar.style.transform.replace(/scaleX\((.*)\)/, '$1')) || 0;
      if (!width) return;
      const start = performance.now();
      const decay = () => {
        const t = (performance.now() - start) / 600;
        const value = Math.max(0, width * (1 - t));
        bar.style.transform = `scaleX(${value})`;
        if (value > 0) requestAnimationFrame(decay);
      };
      requestAnimationFrame(decay);
    };

    node.addEventListener('pointerup', () => {
      if (node.dataset.state !== 'revealed') {
        node.dataset.state = 'detected';
        gradualDecay(progress);
        holdStart = null;
      }
      setHoldProgress(0);
      if (pointerId !== null) {
        node.releasePointerCapture(pointerId);
        pointerId = null;
      }
    });

    node.addEventListener('pointerleave', () => {
      if (node.dataset.state !== 'revealed') {
        node.dataset.state = 'idle';
        gradualDecay(progress);
        holdStart = null;
      }
      setHoldProgress(0);
      if (pointerId !== null) {
        node.releasePointerCapture(pointerId);
        pointerId = null;
      }
    });

    fragmentsContainer.append(node);
  });
}

function spawnAnomalies() {
  anomalyState = (currentMap.anomalies ?? []).map((data) => {
    const node = document.createElement('div');
    node.className = 'anomaly';
    node.style.left = `calc(${data.pos.x * 100}% - 80px)`;
    node.style.top = `calc(${data.pos.y * 100}% - 80px)`;
    anomaliesContainer.append(node);
    return { node, ...data };
  });
}

function spawnSafeNodes() {
  (currentMap.safeNodes ?? []).forEach((anchor) => {
    const node = document.createElement('div');
    node.className = 'safe-node';
    node.dataset.id = anchor.id;
    node.textContent = anchor.label ?? 'clk';
    node.style.left = `calc(${anchor.pos.x * 100}% - 18px)`;
    node.style.top = `calc(${anchor.pos.y * 100}% - 18px)`;
    safeNodesContainer.append(node);
  });
}

function layoutFragments() {
  fragmentsContainer.querySelectorAll('.fragment').forEach((node) => {
    const frag = currentFragments.find((f) => f.id === node.dataset.id);
    if (!frag) return;
    node.style.left = `calc(${frag.pos.x * 100}% - 70px)`;
    node.style.top = `calc(${frag.pos.y * 100}% - 50px)`;
  });
}

function updateZoneOverlayText() {
  if (!currentMap?.overlays) return;
  zoneOverlays.forEach((overlay) => {
    const edge = overlay.dataset.edge;
    const span = overlay.querySelector('span');
    if (span && currentMap.overlays[edge]) {
      span.textContent = currentMap.overlays[edge];
    }
  });
}

function pickDoorPlacement() {
  const placement = currentMap?.door?.placement;
  if (!placement || placement === 'random') {
    const edges = ['north', 'south', 'east', 'west'];
    return edges[Math.floor(Math.random() * edges.length)];
  }
  return placement;
}

function appendLore(entry, duration = 4200) {
  fragmentLog.push(entry);
  updateLorePanel(duration);
}

function updateLorePanel(duration = 4200) {
  loreText.textContent = fragmentLog.join('\n\n');
  lorePane.classList.remove('hidden');
  loreText.scrollTop = loreText.scrollHeight;
  if (duration === null) {
    if (loreHideTimer) clearTimeout(loreHideTimer);
    loreHideTimer = null;
    return;
  }
  if (loreHideTimer) clearTimeout(loreHideTimer);
  loreHideTimer = window.setTimeout(() => {
    lorePane.classList.add('hidden');
    loreHideTimer = null;
  }, duration);
}

function revealFragment(node, frag) {
  if (node.dataset.state === 'revealed') return;
  node.dataset.state = 'revealed';
  node.querySelector('.text').textContent = frag.clean;
  fragmentsDecodedTotal += 1;
  decodedFragmentsForMap += 1;
  appendLore(`[${frag.id}] ${frag.clean}`, 5400);
  nudgeThreat(-18);
  cueWhisper('fragment stabilized');
  if (decodedFragmentsForMap >= doorRequirement && !ritualDoorActive) {
    activateDoorPattern();
  }
}


function initAudio() {
  if (audioContext) return;
  audioContext = new (window.AudioContext || window.webkitAudioContext)();
  const base = audioContext.createOscillator();
  base.type = 'sawtooth';
  base.frequency.value = 32;

  const hum = audioContext.createOscillator();
  hum.type = 'sine';
  hum.frequency.value = 3;

  const noise = audioContext.createBufferSource();
  const bufferSize = 2 * audioContext.sampleRate;
  const buffer = audioContext.createBuffer(1, bufferSize, audioContext.sampleRate);
  const output = buffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) {
    output[i] = Math.random() * 2 - 1;
  }
  noise.buffer = buffer;
  noise.loop = true;

  const lowpass = audioContext.createBiquadFilter();
  lowpass.type = 'lowpass';
  lowpass.frequency.value = 420;

  audioGain = audioContext.createGain();
  audioGain.gain.value = 0.08;

  base.connect(audioGain);
  hum.connect(audioGain);
  noise.connect(lowpass);
  lowpass.connect(audioGain);
  audioGain.connect(audioContext.destination);

  base.start();
  hum.start();
  noise.start();
}

let lastTime = performance.now();

function tick(now) {
  const delta = Math.min(33, now - lastTime);
  lastTime = now;

  pointer.smoothX += (pointer.x + targetDrift.x - pointer.smoothX) * 0.18;
  pointer.smoothY += (pointer.y + targetDrift.y - pointer.smoothY) * 0.18;

  cursor.style.transform = `translate3d(${pointer.smoothX}px, ${pointer.smoothY}px, 0) translate3d(-50%, -50%, 0)`;

  pointerVelocity.x = pointer.smoothX - (pointer.prevX ?? pointer.smoothX);
  pointerVelocity.y = pointer.smoothY - (pointer.prevY ?? pointer.smoothY);
  pointer.prevX = pointer.smoothX;
  pointer.prevY = pointer.smoothY;
  cursor.style.setProperty('--trail-x', `${-pointerVelocity.x * 0.6}px`);
  cursor.style.setProperty('--trail-y', `${-pointerVelocity.y * 0.6}px`);

  targetDrift.x *= 0.92;
  targetDrift.y *= 0.92;

  applyBoundaryPressure();
  applyAnomalyInfluence(delta);
  applySafeNodes(delta);
  updateThreat();
  updateWhispers(now);
  updateDoorPattern(now);

  requestAnimationFrame(tick);
}

document.addEventListener('pointermove', (event) => {
  pointer.x = event.clientX;
  pointer.y = event.clientY;
});

document.addEventListener('pointerdown', (event) => {
  cursor.dataset.press = 'true';
  if (event.button === 2) {
    event.preventDefault();
    toggleOptions();
  }
});

document.addEventListener('pointerup', () => {
  cursor.dataset.press = 'false';
  setHoldProgress(0);
});

document.addEventListener('pointercancel', () => {
  cursor.dataset.press = 'false';
  setHoldProgress(0);
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    if (preferencesPane && !preferencesPane.classList.contains('hidden')) {
      closePreferences();
    } else {
      toggleOptions(true);
    }
  }
});

function toggleOptions(forceOpen = false) {
  const open = forceOpen || optionsPane.classList.contains('hidden');
  if (open) {
    optionsPane.classList.remove('hidden');
  } else {
    optionsPane.classList.add('hidden');
  }
}

optionsPane.addEventListener('click', (event) => {
  if (!(event.target instanceof HTMLButtonElement)) return;
  const action = event.target.dataset.action;
  if (action === 'resume') {
    optionsPane.classList.add('hidden');
  }
});

optionsPane.querySelectorAll('input[type="checkbox"]').forEach((input) => {
  input.addEventListener('change', () => {
    const { id, checked } = input;
    document.body.classList.toggle(id, checked);
  });
});

function openPreferences() {
  if (!preferencesPane) return;
  preferencesPane.classList.remove('hidden');
  updateCursorToggleState();
}

function closePreferences() {
  if (!preferencesPane) return;
  preferencesPane.classList.add('hidden');
}

function updateCursorToggleState() {
  if (customCursorState) {
    customCursorState.textContent = customCursorEnabled ? 'active' : 'dormant';
  }
}

function setCustomCursorEnabled(value) {
  customCursorEnabled = value;
  document.body.classList.toggle('custom-cursor-disabled', !value);
  if (customCursorToggle && customCursorToggle.checked !== value) {
    customCursorToggle.checked = value;
  }
  updateCursorToggleState();
  try {
    localStorage.setItem('pointer.customCursor', value ? 'true' : 'false');
  } catch (error) {
    console.warn('cursor preference unavailable', error);
  }
}

function initializePreferences() {
  if (!customCursorToggle) return;
  let stored = null;
  try {
    stored = localStorage.getItem('pointer.customCursor');
  } catch (error) {
    console.warn('localStorage unavailable', error);
  }
  if (stored !== null) {
    customCursorEnabled = stored !== 'false';
  }
  setCustomCursorEnabled(customCursorEnabled);
  customCursorToggle.addEventListener('change', () => {
    setCustomCursorEnabled(customCursorToggle.checked);
  });
}

preferencesPane?.addEventListener('click', (event) => {
  if (event.target instanceof HTMLButtonElement && event.target.dataset.action === 'close-preferences') {
    closePreferences();
  }
});

lorePane.addEventListener('click', (event) => {
  if (event.target instanceof HTMLButtonElement && event.target.dataset.action === 'close-lore') {
    lorePane.classList.add('hidden');
    if (loreHideTimer) clearTimeout(loreHideTimer);
    loreHideTimer = null;
  }
});

function updateLorePanel() {
  loreText.textContent = fragmentLog.join('\n\n');
  lorePane.classList.remove('hidden');
  setTimeout(() => lorePane.classList.add('hidden'), 4000);
}

function cueWhisper(text) {
  whisper.textContent = text;
  whisper.dataset.transcript = text;
}

function randomWhisper() {
  if (ritualDoorActive && doorWhispers.length && Math.random() < 0.4) {
    return doorWhispers[Math.floor(Math.random() * doorWhispers.length)];
  }
  const bank = [...BASE_WHISPER_BANK];
  if (currentMap?.ambientWhispers) {
    bank.push(...currentMap.ambientWhispers);
  }
  return bank[Math.floor(Math.random() * bank.length)];
}

function updateWhispers(now) {
  if (!gameStarted) return;
  if (now > whisperTimer) {
    cueWhisper(randomWhisper());
    whisperTimer = now + 4000 + Math.random() * 3000;
  }
}

function nudgeThreat(value) {
  threat = Math.min(100, Math.max(0, threat + value));
}

function updateThreat() {
  const normalized = threat / 100;
  document.documentElement.style.setProperty('--threat', normalized.toFixed(2));
  if (normalized < 0.34) {
    cursor.dataset.threat = '0';
  } else if (normalized < 0.68) {
    cursor.dataset.threat = '1';
  } else {
    cursor.dataset.threat = '2';
  }
  if (audioGain) {
    audioGain.gain.value = 0.08 + normalized * 0.18;
  }
  threatVeil.style.filter = `blur(${2 + normalized * 6}px) saturate(${1 + normalized * 0.4})`;
}

function setHoldProgress(value) {
  holdProgress = value;
  cursor.style.setProperty('--hold-progress', value.toFixed(2));
}

function applyBoundaryPressure() {
  if (!gameStarted) return;
  const threshold = 110;
  const edges = {
    west: pointer.smoothX,
    east: innerWidth - pointer.smoothX,
    north: pointer.smoothY,
    south: innerHeight - pointer.smoothY,
  };

  Object.entries(edges).forEach(([edge, distance]) => {
    const overlay = Array.from(zoneOverlays).find((z) => z.dataset.edge === edge);
    if (distance < threshold) {
      overlay?.classList.add('active');
      const intensity = (threshold - distance) / threshold;
      const push = intensity * 8;
      if (edge === 'west') targetDrift.x += push;
      if (edge === 'east') targetDrift.x -= push;
      if (edge === 'north') targetDrift.y += push;
      if (edge === 'south') targetDrift.y -= push;
      if (intensity > 0.6) {
        nudgeThreat(0.1);
      }
    } else {
      overlay?.classList.remove('active');
    }
  });
}

function applyAnomalyInfluence(delta) {
  if (!gameStarted) return;
  let jitter = { x: 0, y: 0 };
  anomalyState.forEach((anomaly) => {
    const centerX = anomaly.pos.x * innerWidth;
    const centerY = anomaly.pos.y * innerHeight;
    const dx = pointer.smoothX - centerX;
    const dy = pointer.smoothY - centerY;
    const distance = Math.sqrt(dx * dx + dy * dy);
    if (distance < anomaly.radius) {
      const strength = 1 - distance / anomaly.radius;
      jitter.x += anomaly.drift.x * strength * 0.05;
      jitter.y += anomaly.drift.y * strength * 0.05;
      nudgeThreat(0.06 * strength * (delta / 16));
    }
  });
  targetDrift.x += jitter.x;
  targetDrift.y += jitter.y;
}

function applySafeNodes(delta) {
  if (!gameStarted) return;
  safeNodesContainer.querySelectorAll('.safe-node').forEach((node) => {
    const rect = node.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const dx = pointer.smoothX - centerX;
    const dy = pointer.smoothY - centerY;
    const distance = Math.sqrt(dx * dx + dy * dy);
    if (distance < rect.width) {
      node.dataset.active = 'true';
      nudgeThreat(-0.6 * (delta / 16));
    } else {
      node.dataset.active = 'false';
    }
  });
}

function activateDoorPattern() {
  ritualDoorActive = true;
  doorPlacement = pickDoorPlacement();
  positionDoorPattern();
  doorPattern.classList.remove('hidden');
  doorPattern.style.opacity = '1';
  doorHoldStart = null;
  cueWhisper(currentMap?.door?.cue ?? 'door pattern glimpsed');
  appendLore(`[${currentMap?.id ?? 'door'}] door glyph aligned. final verse still missing.`, 5200);
}

function updateDoorPattern(now) {
  if (!ritualDoorActive || !gameStarted) return;
  const rect = doorPattern.getBoundingClientRect();
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;
  const dx = pointer.smoothX - centerX;
  const dy = pointer.smoothY - centerY;
  const distance = Math.sqrt(dx * dx + dy * dy);
  const holdTarget = currentMap?.door?.hold ?? 2600;
  const threatLimit = currentMap?.door?.threat ?? 30;

  if (distance < rect.width * 0.2) {
    if (!doorHoldStart) {
      doorHoldStart = now;
      cueWhisper('harmonize...');
    } else if (now - doorHoldStart > holdTarget && threat < threatLimit) {
      cueWhisper('release vector');
      finishSequence();
    }
    nudgeThreat(0.05);
  } else {
    doorHoldStart = null;
  }
}

function finishSequence() {
  ritualDoorActive = false;
  doorPattern.classList.add('hidden');
  doorPattern.style.opacity = '0';
  doorHoldStart = null;
  doorPlacement = null;
  cueWhisper('exit negotiated');
  if (currentMap?.exitLog) {
    appendLore(`[${currentMap.id}] ${currentMap.exitLog}`, 6400);
  }
  threat = Math.max(0, threat - 30);
  updateThreat();
  if (currentMapIndex < MAPS.length - 1) {
    const nextIndex = currentMapIndex + 1;
    setTimeout(() => {
      loadMap(nextIndex);
    }, 1600);
  } else {
    appendLore('[archive] vault axis allowed exit. the rest is blank space awaiting you.', null);
    revealCredits();
  }
}

function positionDoorPattern() {
  if (!doorPlacement) return;
  doorPattern.style.left = '';
  doorPattern.style.right = '';
  doorPattern.style.top = '';
  doorPattern.style.bottom = '';
  doorPattern.style.transform = '';
  const offset = '6vh';
  switch (doorPlacement) {
    case 'north':
      doorPattern.style.top = offset;
      doorPattern.style.left = '50%';
      doorPattern.style.transform = 'translate(-50%, 0)';
      break;
    case 'south':
      doorPattern.style.bottom = offset;
      doorPattern.style.left = '50%';
      doorPattern.style.transform = 'translate(-50%, 0)';
      break;
    case 'east':
      doorPattern.style.right = offset;
      doorPattern.style.top = '50%';
      doorPattern.style.transform = 'translate(0, -50%)';
      break;
    case 'west':
    default:
      doorPattern.style.left = offset;
      doorPattern.style.top = '50%';
      doorPattern.style.transform = 'translate(0, -50%)';
      break;
  }
}

function revealCredits() {
  const credits = document.createElement('div');
  credits.className = 'pane visible';
  credits.innerHTML = `
    <div class="pane-content">
      <header><span class="label">pointer.exe</span><span class="value">system log</span></header>
      <pre>SESSION TERMINATED\nVECTOR RELEASED\nLEAVE YOUR STORY IN THE GAPS.</pre>
    </div>
  `;
  document.body.append(credits);
  setTimeout(() => {
    credits.classList.add('visible');
  }, 10);
}

menuOpenButton?.addEventListener('click', () => {
  showGame();
});

menuPreferencesButton?.addEventListener('click', () => {
  openPreferences();
});

menuEraseButton?.addEventListener('click', () => {
  cueWhisper('erase denied');
});

animateHash();
setHoldProgress(0);
initializePreferences();
requestAnimationFrame(tick);

// keep pointer indicator present even when mouse leaves viewport
window.addEventListener('blur', () => {
  cueWhisper('focus lost');
});

window.addEventListener('resize', () => {
  layoutFragments();
  positionDoorPattern();
});
