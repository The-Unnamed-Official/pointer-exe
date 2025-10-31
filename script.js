const menu = document.getElementById("menu");
const screen = document.getElementById("screen");
const cursor = document.getElementById("cursor");
const pauseOverlay = document.getElementById("pause-overlay");
const ambientText = document.getElementById("ambient-text");
const loreFeed = document.getElementById("lore-feed");
const fragmentsLayer = document.getElementById("fragments");
const anomaliesLayer = document.getElementById("anomalies");
const anchorsLayer = document.getElementById("anchors");
const doorPattern = document.getElementById("door-pattern");
const edgeEls = Array.from(document.querySelectorAll(".edge"));
const edgeWarning = document.getElementById("edge-warning");
const whispersLayer = document.getElementById("whispers");
const flashlightOverlay = document.getElementById("flashlight-overlay");

const fragmentTemplate = document.getElementById("fragment-template");
const anomalyTemplate = document.getElementById("anomaly-template");
const anchorTemplate = document.getElementById("anchor-template");

const HOLD_TIME = 3200; // ms required to decrypt a fragment

const whisperLibrary = {
  calm: [
    "ambient checksum nominal",
    "stillness reduces audit trail",
    "vector idle :: entity listening",
    "silence maintains access window",
  ],
  watchful: [
    "pointer signature copied",
    "loops tighten :: don't repeat",
    "velocity logged for mimicry",
    "whisper back? it already knows",
  ],
  hostile: [
    "rejection script armed",
    "cursor drift engaged",
    "perimeter teeth awake",
    "lag injection prepared",
  ],
};

const edgeWarningMessages = [
  "access denied :: vector repelled",
  "border process: abort approach",
  "perimeter saturating :: retreat",
  "edge integrity spike :: recoil",
  "signal bleed detected :: hold center",
];

const zoneFlashlightFactors = {
  calm: 1.12,
  watchful: 1,
  hostile: 0.82,
};

const anomalyTypes = ["drifter", "siphon", "stalker"];

const state = {
  running: false,
  paused: false,
  threat: 0,
  pointer: { x: window.innerWidth / 2, y: window.innerHeight / 2 },
  overlayOffset: { x: 0, y: 0 },
  pointerLag: 0,
  cursorSpeed: 0,
  lastTimestamp: performance.now(),
  zones: [],
  fragments: [],
  anomalies: [],
  anchors: [],
  activeAnchor: null,
  activeZone: null,
  solvedCount: 0,
  doorActive: false,
  hold: {
    target: null,
    start: 0,
  },
  flashlight: {
    radius: 240,
    desiredRadius: 240,
    baseRadius: 240,
    flicker: 0,
    penalty: 0,
    boost: 0,
  },
  edgeWarningTimer: 0,
};

const zoneTemperaments = ["calm", "watchful", "hostile"];

function init() {
  bindMenu();
  bindPause();
  screen.addEventListener("mousemove", handlePointerMove);
  screen.addEventListener("pointerdown", handlePointerDown);
  screen.addEventListener("pointerup", handlePointerUp);
  screen.addEventListener("pointercancel", handlePointerUp);
  document.addEventListener("pointermove", handlePointerMove);
  document.addEventListener("pointerup", handlePointerUp);
  window.addEventListener("resize", rebuildZones);
  document.addEventListener("mouseleave", () => {
    cursor.style.opacity = "0";
  });
  document.addEventListener("mouseenter", () => {
    cursor.style.opacity = "1";
  });
  cursor.style.left = `${state.pointer.x}px`;
  cursor.style.top = `${state.pointer.y}px`;
  if (flashlightOverlay) {
    flashlightOverlay.style.setProperty("--x", `${state.pointer.x}px`);
    flashlightOverlay.style.setProperty("--y", `${state.pointer.y}px`);
    flashlightOverlay.style.setProperty("--radius", `${state.flashlight.radius}px`);
  }
  generateAmbientText();
}

function bindMenu() {
  menu.querySelectorAll(".menu-option").forEach((btn) => {
    btn.addEventListener("click", () => {
      const action = btn.dataset.action;
      if (action === "open") {
        startRun();
      } else if (action === "audit") {
        startRun({ audit: true });
      } else if (action === "erase") {
        glitchMenu(btn);
      }
    });
  });
}

function bindPause() {
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      if (state.paused) {
        resume();
      } else if (state.running) {
        pause();
      }
    }
  });
  pauseOverlay.querySelector("[data-action='resume']").addEventListener("click", resume);
}

function startRun(options = {}) {
  menu.classList.add("fade-out");
  setTimeout(() => {
    menu.hidden = true;
  }, 900);
  state.running = true;
  state.auditMode = options.audit ?? false;
  document.body.classList.toggle("audit-mode", state.auditMode);
  rebuildZones();
  spawnFragments();
  spawnAnomalies();
  spawnAnchors();
  state.threat = 8;
  state.solvedCount = 0;
  state.doorActive = false;
  state.pointerLag = 0;
  state.cursorSpeed = 0;
  state.overlayOffset.x = 0;
  state.overlayOffset.y = 0;
  state.flashlight.baseRadius = state.auditMode ? 420 : 260;
  state.flashlight.radius = state.flashlight.baseRadius;
  state.flashlight.desiredRadius = state.flashlight.baseRadius;
  state.flashlight.flicker = 0;
  state.flashlight.penalty = 0;
  state.flashlight.boost = 0;
  state.activeAnchor = null;
  state.edgeWarningTimer = 0;
  state.activeZone = null;
  loreFeed.innerHTML = "";
  whispersLayer.innerHTML = "";
  edgeWarning.textContent = "";
  edgeWarning.classList.remove("visible");
  state.lastTimestamp = performance.now();
  requestAnimationFrame(tick);
}

function pause() {
  if (!state.running) return;
  state.paused = true;
  pauseOverlay.showModal();
}

function resume() {
  if (!state.paused) return;
  state.paused = false;
  pauseOverlay.close();
  state.lastTimestamp = performance.now();
  requestAnimationFrame(tick);
}

function rebuildZones() {
  const { width, height } = screen.getBoundingClientRect();
  state.zones = [];
  const cols = 3;
  const rows = 3;
  const cellWidth = width / cols;
  const cellHeight = height / rows;
  for (let y = 0; y < rows; y += 1) {
    for (let x = 0; x < cols; x += 1) {
      state.zones.push({
        x: x * cellWidth,
        y: y * cellHeight,
        width: cellWidth,
        height: cellHeight,
        temperament: zoneTemperaments[(x + y) % zoneTemperaments.length],
        whispersCooldown: Math.random() * 4000 + 2000,
        flashlightFactor: zoneFlashlightFactors[
          zoneTemperaments[(x + y) % zoneTemperaments.length]
        ],
        lastWhisper: "",
      });
    }
  }
}

function spawnFragments() {
  fragmentsLayer.innerHTML = "";
  state.fragments = [];
  const total = 6;
  for (let i = 0; i < total; i += 1) {
    const zone = state.zones[(i * 2 + 1) % state.zones.length] ?? state.zones[0];
    const node = fragmentTemplate.content.firstElementChild.cloneNode(true);
    const rect = positionWithinZone(zone, node);
    const fragment = {
      node,
      rect,
      progress: 0,
      solved: false,
      stage: 0,
      lore: createLoreFragment(i),
      temperament: zone.temperament,
      decayDelay: 0,
    };
    node.style.setProperty("--progress", fragment.progress);
    node.style.left = `${rect.x}px`;
    node.style.top = `${rect.y}px`;
    node.dataset.index = i;
    node.addEventListener("pointerenter", () => onFragmentHover(fragment));
    node.addEventListener("pointerleave", () => onFragmentLeave(fragment));
    node.addEventListener("pointerdown", (event) => onFragmentPointerDown(event, fragment));
    node.addEventListener("pointerup", () => handlePointerUp());
    node.querySelector(".fragment-text").textContent = fragment.lore.stageText[0];
    fragmentsLayer.appendChild(node);
    state.fragments.push(fragment);
  }
}

function spawnAnomalies() {
  anomaliesLayer.innerHTML = "";
  state.anomalies = [];
  const total = 3;
  for (let i = 0; i < total; i += 1) {
    const node = anomalyTemplate.content.firstElementChild.cloneNode(true);
    anomaliesLayer.appendChild(node);
    const { width, height } = screen.getBoundingClientRect();
    const anomaly = {
      node,
      x: Math.random() * width,
      y: Math.random() * height,
      radius: node.getBoundingClientRect().width / 2,
      velocity: {
        x: (Math.random() - 0.5) * 30,
        y: (Math.random() - 0.5) * 30,
      },
      temperament: zoneTemperaments[Math.floor(Math.random() * zoneTemperaments.length)],
      latency: Math.random() * 0.004 + 0.002,
      type: anomalyTypes[i % anomalyTypes.length],
    };
    positionNode(node, anomaly.x, anomaly.y);
    state.anomalies.push(anomaly);
  }
}

function spawnAnchors() {
  anchorsLayer.innerHTML = "";
  state.anchors = [];
  if (!anchorTemplate) return;
  const zonePool = shuffle([...state.zones]);
  const total = Math.min(4, state.zones.length);
  for (let i = 0; i < total; i += 1) {
    const zone = zonePool[i % zonePool.length];
    const node = anchorTemplate.content.firstElementChild.cloneNode(true);
    anchorsLayer.appendChild(node);
    const rect = positionWithinZone(zone, node);
    node.style.left = `${rect.x}px`;
    node.style.top = `${rect.y}px`;
    const anchor = {
      node,
      zone,
      timer: 0,
      active: false,
      triggered: false,
      logged: false,
    };
    node.addEventListener("pointerenter", () => activateAnchor(anchor));
    node.addEventListener("pointerleave", () => deactivateAnchor(anchor));
    state.anchors.push(anchor);
  }
}

function activateAnchor(anchor) {
  anchor.active = true;
  anchor.timer = 0;
  state.activeAnchor = anchor;
  anchor.node.classList.add("active");
  state.flashlight.boost = Math.min(
    state.flashlight.baseRadius * 0.6,
    state.flashlight.boost + 60
  );
  state.flashlight.flicker = 0;
  if (!anchor.triggered) {
    addLoreEntry("anchor located :: breathe");
    anchor.triggered = true;
  }
}

function deactivateAnchor(anchor) {
  anchor.active = false;
  anchor.node.classList.remove("active");
  if (state.activeAnchor === anchor) {
    state.activeAnchor = null;
  }
}

function positionWithinZone(zone, node) {
  const nodeRect = node.getBoundingClientRect();
  const width = nodeRect.width || 40;
  const height = nodeRect.height || 40;
  const padding = 40;
  const x = zone.x + padding + Math.random() * Math.max(zone.width - padding * 2 - width, 10);
  const y = zone.y + padding + Math.random() * Math.max(zone.height - padding * 2 - height, 10);
  return { x, y, width, height };
}

function shuffle(list) {
  const arr = [...list];
  for (let i = arr.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function positionNode(node, x, y) {
  node.style.left = `${x}px`;
  node.style.top = `${y}px`;
}

function onFragmentHover(fragment) {
  fragment.node.classList.add("active");
  fragment.node.querySelector(".fragment-core").style.filter = "brightness(1.4)";
  adjustThreat(fragment.temperament === "hostile" ? 2 : 0.5);
}

function onFragmentLeave(fragment) {
  fragment.node.classList.remove("active");
  fragment.node.querySelector(".fragment-core").style.filter = "";
  if (state.hold.target === fragment) {
    stopHolding();
  }
}

function onFragmentPointerDown(event, fragment) {
  if (state.paused) return;
  event.preventDefault();
  event.stopPropagation();
  state.hold.target = fragment;
  state.hold.start = performance.now();
  fragment.decayDelay = 400;
  cursor.classList.add("holding");
}

function handlePointerDown(event) {
  if (state.paused) return;
  const fragmentEl = event.target.closest(".fragment");
  if (!fragmentEl) {
    state.hold.target = null;
    cursor.classList.add("holding");
  }
}

function handlePointerUp() {
  if (!state.hold.target) {
    cursor.classList.remove("holding");
    return;
  }
  finalizeHold(false);
}

function finalizeHold(completed) {
  if (!state.hold.target) return;
  const fragment = state.hold.target;
  if (!completed) {
    fragment.node.classList.remove("active");
    fragment.node.querySelector(".fragment-core").style.filter = "";
  }
  state.hold.target = null;
  cursor.classList.remove("holding");
}

function stopHolding() {
  if (!state.hold.target) return;
  finalizeHold(false);
}

function handlePointerMove(event) {
  state.pointer.x = event.clientX;
  state.pointer.y = event.clientY;
}

function generateAmbientText() {
  const lines = [];
  for (let i = 0; i < 18; i += 1) {
    const fragments = [];
    for (let j = 0; j < 18; j += 1) {
      const value = Math.random() > 0.92 ? "::" : Math.random() > 0.5 ? "0" : "1";
      fragments.push(value);
    }
    lines.push(fragments.join(" "));
  }
  ambientText.textContent = lines.join("\n");
}

function createLoreFragment(index) {
  const headers = [
    "logheader: pointer drift",
    "stacktrace fragment",
    "checksum residue",
    "sigil delta",
    "user vector echo",
    "safety override"
  ];
  const corrupt = `>${headers[index % headers.length]}::${Math.random()
    .toString(16)
    .slice(2, 10)}`;
  const clean = [
    "it watched the first hesitation",
    "vector recognized as intent",
    "mirrored your drag path",
    "contract offered: stay still",
    "exit arranges at boundary",
    "release requires harmonic lull"
  ];
  return {
    stageText: [corrupt, clean[index % clean.length]],
    stage: 0,
  };
}

function tick(timestamp) {
  if (!state.running || state.paused) return;
  const dt = timestamp - state.lastTimestamp;
  state.lastTimestamp = timestamp;
  state.overlayOffset.x = 0;
  state.overlayOffset.y = 0;
  updateZones(dt);
  updateAnomalies(dt);
  updateEdges(dt);
  updateCursor(dt);
  updateHold(dt);
  updateThreat(dt);
  updateAnchors(dt);
  updateFragments(dt);
  updateDoorPattern();
  updateFlashlight(dt);
  updateWhispers(dt);
  requestAnimationFrame(tick);
}

function updateCursor(dt) {
  state.pointerLag = Math.max(0, state.pointerLag - dt * 0.00025);
  const smoothingBase = 0.16;
  const smoothing = Math.max(0.04, smoothingBase - state.pointerLag);
  const currentX = parseFloat(cursor.dataset.x || state.pointer.x);
  const currentY = parseFloat(cursor.dataset.y || state.pointer.y);
  const nextX = currentX + (state.pointer.x - currentX) * smoothing;
  const nextY = currentY + (state.pointer.y - currentY) * smoothing;

  const jitterX = clamp(state.overlayOffset.x, -48, 48);
  const jitterY = clamp(state.overlayOffset.y, -48, 48);

  cursor.dataset.x = nextX;
  cursor.dataset.y = nextY;
  cursor.style.left = `${nextX + jitterX}px`;
  cursor.style.top = `${nextY + jitterY}px`;

  const distance = Math.hypot(nextX - currentX, nextY - currentY);
  state.cursorSpeed = distance / Math.max(dt, 16);
}

function updateZones(dt) {
  if (!state.zones.length) return;
  const rect = screen.getBoundingClientRect();
  const pointerX = state.pointer.x - rect.left;
  const pointerY = state.pointer.y - rect.top;
  let activeZone = null;
  state.zones.forEach((zone) => {
    zone.whispersCooldown -= dt;
    if (
      pointerX >= zone.x &&
      pointerX <= zone.x + zone.width &&
      pointerY >= zone.y &&
      pointerY <= zone.y + zone.height
    ) {
      activeZone = zone;
    }
  });

  state.activeZone = activeZone;

  let desired = state.flashlight.baseRadius;
  if (activeZone) {
    desired = state.flashlight.baseRadius * (activeZone.flashlightFactor ?? 1);
    const temperament = activeZone.temperament;
    const pressure =
      temperament === "hostile" ? 3.2 : temperament === "watchful" ? 1.6 : 0.6;
    adjustThreat((dt / 1000) * pressure);
    if (temperament === "hostile" && state.cursorSpeed < 0.15) {
      state.flashlight.flicker = Math.max(state.flashlight.flicker, 120);
    }
  }

  state.flashlight.desiredRadius = desired;

  state.zones.forEach((zone) => {
    const baseCooldown =
      zone.temperament === "hostile"
        ? 1800
        : zone.temperament === "watchful"
        ? 2600
        : 3600;
    const shouldWhisper =
      zone.whispersCooldown <= 0 &&
      ((state.activeZone === zone && Math.random() > 0.3) || state.threat > 55);
    if (shouldWhisper) {
      emitWhisper(zone);
      zone.whispersCooldown = baseCooldown + Math.random() * baseCooldown;
    }
  });
}

function updateHold(dt) {
  if (!state.hold.target) return;
  const fragment = state.hold.target;
  fragment.progress += dt;
  fragment.node.style.setProperty("--progress", (fragment.progress / HOLD_TIME) * 100);
  if (fragment.progress >= HOLD_TIME) {
    solveFragment(fragment);
    finalizeHold(true);
  }
}

function updateFragments(dt) {
  state.fragments.forEach((fragment) => {
    if (state.hold.target !== fragment && !fragment.solved && fragment.progress > 0) {
      if (fragment.decayDelay > 0) {
        fragment.decayDelay -= dt;
      } else {
        fragment.progress = Math.max(0, fragment.progress - dt * 0.7);
        fragment.node.style.setProperty("--progress", (fragment.progress / HOLD_TIME) * 100);
      }
    }
  });
}

function solveFragment(fragment) {
  if (fragment.solved) return;
  fragment.solved = true;
  fragment.stage += 1;
  fragment.node.classList.add("solved");
  fragment.node.style.setProperty("--progress", 100);
  const textNode = fragment.node.querySelector(".fragment-text");
  textNode.textContent = fragment.lore.stageText[Math.min(fragment.stage, fragment.lore.stageText.length - 1)];
  addLoreEntry(textNode.textContent);
  adjustThreat(-12);
  state.flashlight.penalty = Math.max(0, state.flashlight.penalty - 40);
  state.flashlight.boost = Math.min(
    state.flashlight.baseRadius * 0.6,
    state.flashlight.boost + 30
  );
  state.solvedCount += 1;
}

function addLoreEntry(text) {
  const entry = document.createElement("div");
  entry.className = "entry";
  entry.textContent = text;
  loreFeed.prepend(entry);
  while (loreFeed.children.length > 6) {
    loreFeed.removeChild(loreFeed.lastChild);
  }
}

function emitWhisper(zone) {
  if (!whispersLayer) return;
  const options = whisperLibrary[zone.temperament] ?? whisperLibrary.calm;
  let message = options[Math.floor(Math.random() * options.length)];
  if (message === zone.lastWhisper) {
    message = options[(Math.floor(Math.random() * options.length) + 1) % options.length];
  }
  zone.lastWhisper = message;
  const node = document.createElement("div");
  node.className = "whisper";
  node.textContent = message;
  whispersLayer.prepend(node);
  requestAnimationFrame(() => node.classList.add("visible"));
  while (whispersLayer.children.length > 5) {
    whispersLayer.removeChild(whispersLayer.lastChild);
  }
  const linger = state.threat > 60 ? 2000 : 3200;
  setTimeout(() => {
    node.classList.remove("visible");
    setTimeout(() => {
      node.remove();
    }, 600);
  }, linger);
}

function updateWhispers(dt) {
  if (!state.running) return;
  if (!state.activeAnchor && state.threat < 30) {
    state.flashlight.penalty = Math.max(0, state.flashlight.penalty - dt * 0.01);
  }
}

function updateThreat(dt) {
  const decay = state.hold.target ? 0 : 0.004 * dt;
  state.threat = Math.max(0, state.threat - decay);
  const body = document.body;
  if (state.threat < 25) {
    body.classList.remove("threat-medium", "threat-high");
    cursor.classList.remove("stressed");
  } else if (state.threat < 55) {
    body.classList.add("threat-medium");
    body.classList.remove("threat-high");
    cursor.classList.remove("stressed");
  } else {
    body.classList.add("threat-high");
    body.classList.remove("threat-medium");
    cursor.classList.add("stressed");
  }
}

function adjustThreat(delta) {
  state.threat = Math.min(100, Math.max(0, state.threat + delta));
}

function updateAnchors(dt) {
  if (!state.anchors.length) return;
  let active = false;
  const availability = Math.max(0.35, 1 - state.threat / 120);
  state.anchors.forEach((anchor) => {
    if (anchor.active) {
      active = true;
      anchor.timer += dt;
      adjustThreat(-(dt / 1000) * 6.2);
      state.flashlight.penalty = Math.max(0, state.flashlight.penalty - dt * 0.12);
      if (anchor.timer > 1800 && !anchor.logged) {
        addLoreEntry("anchor harmonized :: threat easing");
        anchor.logged = true;
      }
      anchor.node.style.opacity = "1";
    } else {
      anchor.timer = Math.max(0, anchor.timer - dt * 0.4);
      anchor.node.style.opacity = String(Math.min(1, availability));
    }
  });
  if (active) {
    state.flashlight.boost = Math.min(
      state.flashlight.baseRadius * 0.6,
      state.flashlight.boost + dt * 0.18
    );
  } else {
    state.flashlight.boost = Math.max(0, state.flashlight.boost - dt * 0.08);
  }
}

function updateEdges(dt) {
  if (!state.running) return;
  const rect = screen.getBoundingClientRect();
  const relativeX = state.pointer.x - rect.left;
  const relativeY = state.pointer.y - rect.top;
  const proximity = 90;
  let near = false;
  let pressureX = 0;
  let pressureY = 0;

  if (relativeY < proximity) {
    const intensity = 1 - relativeY / proximity;
    edgeEls[0].style.opacity = "0.4";
    pressureY += (12 + state.threat * 0.12) * intensity;
    near = true;
  } else {
    edgeEls[0].style.opacity = "0";
  }
  if (relativeX > rect.width - proximity) {
    const intensity = 1 - (rect.width - relativeX) / proximity;
    edgeEls[1].style.opacity = "0.4";
    pressureX -= (12 + state.threat * 0.12) * intensity;
    near = true;
  } else {
    edgeEls[1].style.opacity = "0";
  }
  if (relativeY > rect.height - proximity) {
    const intensity = 1 - (rect.height - relativeY) / proximity;
    edgeEls[2].style.opacity = "0.4";
    pressureY -= (12 + state.threat * 0.12) * intensity;
    near = true;
  } else {
    edgeEls[2].style.opacity = "0";
  }
  if (relativeX < proximity) {
    const intensity = 1 - relativeX / proximity;
    edgeEls[3].style.opacity = "0.4";
    pressureX += (12 + state.threat * 0.12) * intensity;
    near = true;
  } else {
    edgeEls[3].style.opacity = "0";
  }

  if (near) {
    adjustThreat((dt / 1000) * (state.threat > 45 ? 4 : 2.4));
    if (state.threat > 35 && state.edgeWarningTimer <= 0) {
      showEdgeWarning(edgeWarningMessages[Math.floor(Math.random() * edgeWarningMessages.length)]);
      state.edgeWarningTimer = 1400;
    }
  } else if (state.edgeWarningTimer <= 0) {
    hideEdgeWarning();
  }

  if (state.edgeWarningTimer > 0) {
    state.edgeWarningTimer -= dt;
    if (state.edgeWarningTimer <= 0 && !near) {
      hideEdgeWarning();
    }
  }

  state.overlayOffset.x += pressureX;
  state.overlayOffset.y += pressureY;
}

function showEdgeWarning(message) {
  if (!edgeWarning) return;
  edgeWarning.textContent = message;
  edgeWarning.classList.add("visible");
}

function hideEdgeWarning() {
  if (!edgeWarning) return;
  edgeWarning.classList.remove("visible");
}

function updateAnomalies(dt) {
  const rect = screen.getBoundingClientRect();
  const { width, height } = rect;
  state.anomalies.forEach((anomaly) => {
    if (anomaly.type === "stalker") {
      const targetX = state.pointer.x - rect.left;
      const targetY = state.pointer.y - rect.top;
      const diffX = targetX - anomaly.x;
      const diffY = targetY - anomaly.y;
      const distance = Math.hypot(diffX, diffY) || 1;
      anomaly.velocity.x += (diffX / distance) * 12 * (dt / 1000);
      anomaly.velocity.y += (diffY / distance) * 12 * (dt / 1000);
      anomaly.velocity.x = clamp(anomaly.velocity.x, -48, 48);
      anomaly.velocity.y = clamp(anomaly.velocity.y, -48, 48);
    } else if (anomaly.type === "siphon") {
      anomaly.velocity.x *= 0.992;
      anomaly.velocity.y *= 0.992;
    }

    anomaly.x += anomaly.velocity.x * (dt / 1000);
    anomaly.y += anomaly.velocity.y * (dt / 1000);
    if (anomaly.x < 0 || anomaly.x > width) {
      anomaly.velocity.x *= -1;
      anomaly.x = clamp(anomaly.x, 0, width);
    }
    if (anomaly.y < 0 || anomaly.y > height) {
      anomaly.velocity.y *= -1;
      anomaly.y = clamp(anomaly.y, 0, height);
    }
    positionNode(anomaly.node, anomaly.x, anomaly.y);

    const pointerX = state.pointer.x - rect.left;
    const pointerY = state.pointer.y - rect.top;
    const dx = pointerX - anomaly.x;
    const dy = pointerY - anomaly.y;
    const distance = Math.hypot(dx, dy);
    const influenceRadius =
      anomaly.radius * (anomaly.type === "stalker" ? 1.5 : anomaly.type === "siphon" ? 1.35 : 1.25);
    if (distance < influenceRadius) {
      const intensity = 1 - distance / influenceRadius;
      state.overlayOffset.x += dx * -0.06 * intensity;
      state.overlayOffset.y += dy * -0.06 * intensity;
      adjustThreat(intensity * (anomaly.type === "siphon" ? 0.8 : 0.5));
      if (anomaly.type === "siphon") {
        state.flashlight.penalty = Math.min(
          state.flashlight.baseRadius * 0.7,
          state.flashlight.penalty + intensity * 80
        );
        state.flashlight.flicker = Math.max(state.flashlight.flicker, 280 * intensity);
      } else if (anomaly.type === "stalker") {
        state.pointerLag = Math.min(0.12, state.pointerLag + intensity * 0.06);
      } else {
        state.pointerLag = Math.min(0.12, state.pointerLag + intensity * 0.03);
        if (state.cursorSpeed > 0.8) {
          state.flashlight.flicker = Math.max(state.flashlight.flicker, 160 * intensity);
        }
      }
    }
  });
}

function updateDoorPattern() {
  if (state.doorActive) return;
  const required = Math.ceil(state.fragments.length * 0.6);
  if (state.solvedCount >= required) {
    doorPattern.classList.add("active");
    state.doorActive = true;
    addLoreEntry("door pattern aligning. wait for calm.");
    doorPattern.addEventListener(
      "pointerdown",
      () => {
        if (state.threat > 30) {
          addLoreEntry("threat too loud. pattern recoils.");
          adjustThreat(6);
          return;
        }
        if (state.flashlight.radius < 180) {
          addLoreEntry("light insufficient :: pattern hides.");
          adjustThreat(4);
          return;
        }
        addLoreEntry("hold steady... harmonizing...");
        cursor.classList.add("holding");
        let aborted = false;
        const monitor = setInterval(() => {
          if (state.threat > 44 || state.flashlight.flicker > 0 || state.flashlight.radius < 160) {
            aborted = true;
            clearInterval(monitor);
            cursor.classList.remove("holding");
            addLoreEntry("pattern fractures :: threat flares.");
            adjustThreat(12);
          }
        }, 160);
        setTimeout(() => {
          clearInterval(monitor);
          if (aborted) return;
          cursor.classList.remove("holding");
          addLoreEntry("vector released. exit available.");
          endRun();
        }, 2800);
      },
      { once: true }
    );
  }
}

function endRun() {
  state.running = false;
  setTimeout(() => {
    location.reload();
  }, 2600);
}

function updateFlashlight(dt) {
  if (!flashlightOverlay) return;
  state.flashlight.penalty = Math.max(0, state.flashlight.penalty - dt * 0.02);
  if (!state.activeAnchor) {
    state.flashlight.boost = Math.max(0, state.flashlight.boost - dt * 0.05);
  }
  const baseRadius = state.flashlight.desiredRadius + state.flashlight.boost - state.flashlight.penalty;
  const threatDrag = state.threat * 1.1;
  const target = clamp(baseRadius - threatDrag, 110, state.flashlight.baseRadius * 1.6);
  state.flashlight.radius += (target - state.flashlight.radius) * 0.08;
  state.flashlight.flicker = Math.max(0, state.flashlight.flicker - dt);
  const flickerOffset =
    state.flashlight.flicker > 0 ? (Math.random() - 0.5) * Math.min(60, state.flashlight.flicker / 2) : 0;
  const radiusValue = Math.max(110, state.flashlight.radius + flickerOffset);
  const displayedX = parseFloat(cursor.dataset.x || state.pointer.x) + state.overlayOffset.x;
  const displayedY = parseFloat(cursor.dataset.y || state.pointer.y) + state.overlayOffset.y;
  flashlightOverlay.style.setProperty("--x", `${displayedX}px`);
  flashlightOverlay.style.setProperty("--y", `${displayedY}px`);
  flashlightOverlay.style.setProperty("--radius", `${radiusValue}px`);
  if (state.flashlight.flicker > 0) {
    document.body.classList.add("flashlight-flicker");
  } else {
    document.body.classList.remove("flashlight-flicker");
  }
}

// Soft glitch when Erase is chosen
function glitchMenu(btn) {
  btn.classList.add("glitching");
  let ticks = 0;
  const interval = setInterval(() => {
    ticks += 1;
    btn.style.transform = `translate(${(Math.random() - 0.5) * 4}px, ${(Math.random() - 0.5) * 4}px)`;
    btn.style.color = Math.random() > 0.5 ? "var(--accent)" : "var(--fg)";
    if (ticks > 18) {
      clearInterval(interval);
      btn.style.transform = "";
      btn.style.color = "var(--fg)";
      btn.classList.remove("glitching");
    }
  }, 40);
}

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

init();
