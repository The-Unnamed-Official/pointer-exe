const menu = document.querySelector('#menu');
const menuButtons = menu.querySelectorAll('button');
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
const lorePane = document.querySelector('#lore-pane');
const loreText = document.querySelector('#lore-text');

let pointer = { x: innerWidth / 2, y: innerHeight / 2, smoothX: innerWidth / 2, smoothY: innerHeight / 2 };
let pointerVelocity = { x: 0, y: 0 };
let targetDrift = { x: 0, y: 0 };
let threat = 0;
let audioContext;
let audioGain;
let gameStarted = false;
let holdProgress = 0;
let fragmentsDecoded = 0;
let fragmentLog = [];
let whisperTimer = 0;
let anomalyState = [];
let ritualDoorActive = false;
let doorHoldStart = null;
let doorPlacement = null;

const FRAGMENTS = [
  {
    id: 'shard_01',
    pos: { x: 0.22, y: 0.32 },
    corrupt: 'ptr>>TRACE=USER_VEC?\n> pointer leash tightened...',
    clean: 'TRACE: pointer.exe booted itself.\nIT WATCHED CURSORS UNTIL IT WORE ONE.',
    hold: 2400,
  },
  {
    id: 'shard_02',
    pos: { x: 0.68, y: 0.28 },
    corrupt: '..stack underflow//PROXY drift..',
    clean: 'LOG: our library imitated hesitation.\nIT LEARNED WHEN USERS REACHED FOR ESC.',
    hold: 2800,
  },
  {
    id: 'shard_03',
    pos: { x: 0.46, y: 0.62 },
    corrupt: 'USR::intent misaligned',
    clean: 'MEMO: pointer == intention vector.\nIT REALIZED CONTROL IS A NEGOTIATION.',
    hold: 3200,
  },
  {
    id: 'shard_04',
    pos: { x: 0.18, y: 0.72 },
    corrupt: 'hexdump// 50 54 52 ??',
    clean: 'PATCH NOTE: if user circles clockwise, invert the ritual.',
    hold: 2600,
  },
  {
    id: 'shard_05',
    pos: { x: 0.78, y: 0.68 },
    corrupt: 'door? pattern? // static',
    clean: 'EXIT: align three rings. hold until hum peaks. release.',
    hold: 3000,
  },
];

const ANOMALIES = [
  { id: 'anomaly_a', pos: { x: 0.35, y: 0.22 }, radius: 160, drift: { x: 28, y: -24 } },
  { id: 'anomaly_b', pos: { x: 0.64, y: 0.58 }, radius: 200, drift: { x: -32, y: 18 } },
  { id: 'anomaly_c', pos: { x: 0.52, y: 0.82 }, radius: 180, drift: { x: 22, y: 12 } },
];

const SAFE_NODES = [
  { id: 'anchor_a', pos: { x: 0.12, y: 0.18 } },
  { id: 'anchor_b', pos: { x: 0.84, y: 0.16 } },
  { id: 'anchor_c', pos: { x: 0.52, y: 0.44 } },
];

const WHISPER_BANK = [
  '..\\pointer focus lost',
  'stack:watcher> listening',
  'cursor drift == compliance',
  'ACCESS? HOLD STILL',
  'vector variance rising',
  'checksum yourself',
];

const doorWhispers = ['door pattern waking', 'quiet your hands', 'align & release'];

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
  requestAnimationFrame(tick);
  spawnFragments();
  spawnAnomalies();
  spawnSafeNodes();
  initAudio();
  whisperTimer = performance.now() + 4000;
}

function spawnFragments() {
  FRAGMENTS.forEach((frag) => {
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

    const { x, y } = frag.pos;
    node.style.left = `calc(${x * 100}% - 70px)`;
    node.style.top = `calc(${y * 100}% - 50px)`;

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

    fragmentsContainer.append(node);
  });
}

function revealFragment(node, frag) {
  if (node.dataset.state === 'revealed') return;
  node.dataset.state = 'revealed';
  node.querySelector('.text').textContent = frag.clean;
  fragmentsDecoded += 1;
  fragmentLog.push(`[${frag.id}] ${frag.clean}`);
  updateLorePanel();
  nudgeThreat(-20);
  cueWhisper('fragment stabilized');
  if (fragmentsDecoded >= 3 && !ritualDoorActive) {
    activateDoorPattern();
  }
}

function spawnAnomalies() {
  anomalyState = ANOMALIES.map((data) => {
    const node = document.createElement('div');
    node.className = 'anomaly';
    node.style.left = `calc(${data.pos.x * 100}% - 80px)`;
    node.style.top = `calc(${data.pos.y * 100}% - 80px)`;
    anomaliesContainer.append(node);
    return { node, ...data };
  });
}

function spawnSafeNodes() {
  SAFE_NODES.forEach((anchor) => {
    const node = document.createElement('div');
    node.className = 'safe-node';
    node.dataset.id = anchor.id;
    node.textContent = 'clk';
    node.style.left = `calc(${anchor.pos.x * 100}% - 18px)`;
    node.style.top = `calc(${anchor.pos.y * 100}% - 18px)`;
    safeNodesContainer.append(node);
  });
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
    toggleOptions(true);
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

lorePane.addEventListener('click', (event) => {
  if (event.target instanceof HTMLButtonElement && event.target.dataset.action === 'close-lore') {
    lorePane.classList.add('hidden');
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
  if (ritualDoorActive && Math.random() < 0.4) {
    return doorWhispers[Math.floor(Math.random() * doorWhispers.length)];
  }
  return WHISPER_BANK[Math.floor(Math.random() * WHISPER_BANK.length)];
}

function updateWhispers(now) {
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
  doorPlacement = ['north', 'south', 'east', 'west'][Math.floor(Math.random() * 4)];
  positionDoorPattern();
  doorPattern.classList.remove('hidden');
  doorPattern.style.opacity = '1';
  cueWhisper('door pattern glimpsed');
}

function updateDoorPattern(now) {
  if (!ritualDoorActive) return;
  const rect = doorPattern.getBoundingClientRect();
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;
  const dx = pointer.smoothX - centerX;
  const dy = pointer.smoothY - centerY;
  const distance = Math.sqrt(dx * dx + dy * dy);

  if (distance < rect.width * 0.2) {
    if (!doorHoldStart) {
      doorHoldStart = now;
      cueWhisper('harmonize...');
    } else if (now - doorHoldStart > 2600 && threat < 30) {
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
  cueWhisper('exit negotiated');
  revealCredits();
}

function positionDoorPattern() {
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
      <pre>SESSION TERMINATED\nVECTOR RELEASED\nTHANK YOU FOR YOUR STEADY HAND.</pre>
    </div>
  `;
  document.body.append(credits);
  setTimeout(() => {
    credits.classList.add('visible');
  }, 10);
}

menuButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const action = button.dataset.action;
    if (action === 'open') {
      showGame();
    } else if (action === 'audit') {
      cueWhisper('audit mode // minimal threat');
      showGame();
      threat = 0;
    } else if (action === 'erase') {
      cueWhisper('erase denied');
    }
  });
});

animateHash();
setHoldProgress(0);

// keep pointer indicator present even when mouse leaves viewport
window.addEventListener('blur', () => {
  cueWhisper('focus lost');
});

window.addEventListener('resize', () => {
  // reposition fragments on resize
  document.querySelectorAll('.fragment').forEach((node) => {
    const frag = FRAGMENTS.find((f) => f.id === node.dataset.id);
    if (!frag) return;
    node.style.left = `calc(${frag.pos.x * 100}% - 70px)`;
    node.style.top = `calc(${frag.pos.y * 100}% - 50px)`;
  });
});
