const menu = document.getElementById("menu");
const screen = document.getElementById("screen");
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
const levelNameEl = document.getElementById("level-name");
const levelObjectiveEl = document.getElementById("level-objective");
const mapGrid = document.getElementById("map-grid");
const inventoryList = document.getElementById("inventory-list");
const storyLog = document.getElementById("story-log");
const settingsPanel = document.getElementById("settings-panel");
const introDialog = document.getElementById("intro-dialog");
const eraseConfirmDialog = document.getElementById("erase-confirm-dialog");
const auditToggle = document.getElementById("setting-audit-mode");
const introToggle = document.getElementById("setting-show-intro");

const fragmentTemplate = document.getElementById("fragment-template");
const anomalyTemplate = document.getElementById("anomaly-template");
const anchorTemplate = document.getElementById("anchor-template");

const HOLD_TIME = 3200; // ms required to decrypt a fragment

let settingsToggleButton = null;
let pendingStartOptions = null;

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

const flashlightSignals = [
  { code: ".. .- -- ... -.-- -. -.-", meaning: "i am syncing" },
  { code: "-... . .- -- ×", meaning: "beam x-reflect" },
  { code: "01010011 01000101", meaning: "SE :: see" },
  { code: "..-. .- -.-. .", meaning: "face" },
  { code: "-- .- -.-- -.-. --- .--.", meaning: "may copy" },
];

const zoneFlashlightFactors = {
  calm: 1.12,
  watchful: 1,
  hostile: 0.82,
};

const anomalyTypes = ["drifter", "siphon", "stalker"];

const gameLevels = [
  {
    id: "calibration",
    name: "Level 1 :: Calibration Vault",
    objective: "Stabilize the pointer by decrypting the calibration fragments.",
    intro: "The calibration vault wakes around you; the pointer thrums like a trapped insect.",
    horror: "A voice hidden in the floor repeats your breathing half a beat late.",
    outro: "The vault seals behind you, shoving your echo toward the next corridor.",
    map: [
      {
        id: "atrium",
        name: "Atrium Buffer",
        hint: "A suspended walkway waiting for vibration.",
        detail: "Glass corridors warp as your reflection staggers to keep up.",
      },
      {
        id: "relay",
        name: "Signal Relay",
        hint: "Coiled antennae thrum quietly, waiting for instruction.",
        detail: "Relay teeth align with your pulse, echoing footsteps that aren't yours.",
      },
      {
        id: "archive",
        name: "Cold Archive",
        hint: "Rows of vitrified memory cores drip with frost.",
        detail: "Shelves exhale your name as the frost patterns rewrite themselves.",
      },
      {
        id: "maintenance",
        name: "Maintenance Halo",
        hint: "A circular platform orbiting the central core.",
        detail: "Tools hang midair like teeth, biting at your shadow when you pause.",
      },
      {
        id: "elevator",
        name: "Inverted Elevator",
        hint: "A shaft that descends upward, dragging gravity with it.",
        detail: "Gravity reverses in pulses, tugging your organs in the wrong direction.",
      },
      {
        id: "canopy",
        name: "Static Canopy",
        hint: "A net of static hovering over the vault.",
        detail: "Static rain forms letters that spell your name backward.",
      },
    ],
    fragments: [
      {
        id: "resonator",
        location: "atrium",
        item: {
          id: "resonator",
          name: "Calibration Resonator",
          description: "Keeps the pointer aligned with the vault's heartbeat.",
        },
        corrupt: ">calibration-node::a7324f",
        clear: "Resonator hum stabilizes the vault's breath.",
        story: "The atrium glass bows as a shadow copies your grip on the pointer.",
      },
      {
        id: "mirror",
        location: "relay",
        item: {
          id: "mirror",
          name: "Harmonic Mirror",
          description: "Reflects hostile signatures back into the dark.",
        },
        corrupt: ">relay-script::4f0b9c",
        clear: "Mirror tilts, reflecting a second pointer behind you.",
        story: "Something beyond the relay mouths every word you haven't said yet.",
      },
      {
        id: "glyph",
        location: "archive",
        item: {
          id: "glyph",
          name: "Vitrified Glyph",
          description: "A preserved directive etched in frozen light.",
        },
        corrupt: ">archive-frag::c22fea",
        clear: "Glyph warms to your touch, rewriting your fingerprint.",
        story: "The archives rearrange themselves to hide whichever shelf you search.",
      },
      {
        id: "spool",
        location: "maintenance",
        item: {
          id: "spool",
          name: "Magnetized Spool",
          description: "Feeds the flashlight with captured static.",
        },
        corrupt: ">maintenance-loop::7d11ee",
        clear: "Spool unwinds, feeding hungry machines.",
        story: "Tool belts swing like pendulums, keeping time with a distant heartbeat.",
      },
      {
        id: "pulse",
        location: "elevator",
        item: {
          id: "pulse",
          name: "Reverse Pulse Core",
          description: "Allows movement against the vault's gravity wells.",
        },
        corrupt: ">elevator-core::191fed",
        clear: "Pulse core thrums opposite to the elevator's fall.",
        story: "The elevator doors close, but the elevator never arrives.",
      },
      {
        id: "husk",
        location: "canopy",
        item: {
          id: "husk",
          name: "Sentience Husk",
          description: "Keeps the mimic from finishing your form.",
        },
        corrupt: ">canopy-shell::93be01",
        clear: "Husk cracks, leaking luminous dust.",
        story: "The canopy stretches downward like hands reaching through cold water.",
      },
    ],
  },
  {
    id: "refraction",
    name: "Level 2 :: Refraction Loop",
    objective: "Map the looping corridors and steal the mimic's tools.",
    intro: "Corridors fold in on themselves; the loop spins whenever you breathe wrong.",
    horror: "Somewhere ahead another you is screaming for you to slow down.",
    outro: "You fold the loop into a line and step through before it snaps back.",
    map: [
      {
        id: "loop",
        name: "Refraction Loop",
        hint: "A corridor that doubles back on itself every twelve steps.",
        detail: "Walls tilt inward, showing you entering from every direction at once.",
      },
      {
        id: "observatory",
        name: "Observation Dais",
        hint: "Raised platform watching the loop's center.",
        detail: "A seated silhouette mimics you perfectly except for the smile.",
      },
      {
        id: "pool",
        name: "Red Pool",
        hint: "Flooded server pit glowing with warning light.",
        detail: "The surface shows you drowning from the ceiling downward.",
      },
      {
        id: "spindle",
        name: "Signal Spindle",
        hint: "Vertical coil of fiber stretched too tight.",
        detail: "Fibers tighten around the pointer, purring whenever you hesitate.",
      },
      {
        id: "vent",
        name: "Whisper Vent",
        hint: "A vent where cold whispers collect like dew.",
        detail: "Air tastes of copper; whispers press against your teeth.",
      },
      {
        id: "horizon",
        name: "Broken Horizon",
        hint: "An impossible doorway glimpsed between reflections.",
        detail: "The doorway rotates like an eye, following you without moving.",
      },
    ],
    fragments: [
      {
        id: "anchor",
        location: "loop",
        item: {
          id: "anchor",
          name: "Loop Anchor Shard",
          description: "Pins reality long enough to step through.",
        },
        corrupt: ">loop-anchor::52b1aa",
        clear: "Anchor sinks into the floor, halting the loop's rewind.",
        story: "Your footprints keep walking even after you stop.",
      },
      {
        id: "phantom",
        location: "observatory",
        item: {
          id: "phantom",
          name: "Phantom Key",
          description: "Unlocks doors that exist only in reflections.",
        },
        corrupt: ">spectre-key::9482ff",
        clear: "Key glows whenever you face away from it.",
        story: "A figure sits in your chair and grins wider each time you blink.",
      },
      {
        id: "lens",
        location: "pool",
        item: {
          id: "lens",
          name: "Hemolens Disc",
          description: "Filters the red pool's screaming light.",
        },
        corrupt: ">pool-lens::44dc10",
        clear: "Disc spins, staining the beam crimson.",
        story: "In the pool, your reflection surfaces and begs not to be pulled out.",
      },
      {
        id: "coil",
        location: "spindle",
        item: {
          id: "coil",
          name: "Coherence Coil",
          description: "Keeps the flashlight from fracturing in the loop.",
        },
        corrupt: ">spindle-coil::be28a4",
        clear: "Coil locks around the flashlight housing.",
        story: "Every cable hums the exact frequency of your pulse.",
      },
      {
        id: "charm",
        location: "vent",
        item: {
          id: "charm",
          name: "Vent Charm",
          description: "Distracts the whispers with a borrowed heartbeat.",
        },
        corrupt: ">vent-sigil::f11802",
        clear: "Charm rattles, drawing whispers away from your ears.",
        story: "Cold breath pours from the vent carrying your name backwards.",
      },
      {
        id: "film",
        location: "horizon",
        item: {
          id: "film",
          name: "Afterimage Film",
          description: "Captures the mimic's silhouette for negotiation.",
        },
        corrupt: ">horizon-film::6f09ce",
        clear: "Film records a figure that hasn't arrived yet.",
        story: "The broken doorway opens into the same hallway but with no floor.",
      },
    ],
  },
  {
    id: "threshold",
    name: "Level 3 :: Threshold Observatory",
    objective: "Assemble the threshold key and confront the watcher.",
    intro: "The observatory watches you arrive; the watcher hums with hunger.",
    horror: "Every surface reflects you but with one detail missing each time.",
    outro: "The watcher retreats, leaving only the door's breathing.",
    map: [
      {
        id: "gaze",
        name: "Watcher Gaze",
        hint: "A central lens tracking every movement.",
        detail: "The lens widens when you blink, swallowing the room.",
      },
      {
        id: "crypt",
        name: "Memory Crypt",
        hint: "A sunken archive of failed pointers.",
        detail: "The crypt smells of ozone and old blood.",
      },
      {
        id: "eventide",
        name: "Eventide Balcony",
        hint: "A balcony overlooking an impossible horizon.",
        detail: "A sea of static roars, full of silhouettes reaching toward you.",
      },
      {
        id: "antenna",
        name: "Obelisk Antenna",
        hint: "Bone-white antennae arranged like teeth.",
        detail: "The antennae lean down to listen to your heartbeat.",
      },
      {
        id: "nest",
        name: "Glass Nest",
        hint: "Crown of cables surrounding the final door.",
        detail: "Cables tighten if you even think about speaking.",
      },
      {
        id: "door",
        name: "Threshold Door",
        hint: "A door without hinges breathing softly.",
        detail: "The membrane shows a copy of you ready to step inside.",
      },
    ],
    fragments: [
      {
        id: "oculus",
        location: "gaze",
        item: {
          id: "oculus",
          name: "Oculus Lens",
          description: "Focuses the watcher's gaze back onto itself.",
        },
        corrupt: ">gaze-lens::cc10ab",
        clear: "Lens cracks, reflecting an unseen pupil.",
        story: "When you hold the lens, the watcher blinks for the first time.",
      },
      {
        id: "token",
        location: "crypt",
        item: {
          id: "token",
          name: "Crypt Token",
          description: "Permits the dead pointers to stand guard for you.",
        },
        corrupt: ">crypt-token::9013de",
        clear: "Token warms; footsteps gather behind you.",
        story: "Rows of dormant pointers stand and face the opposite direction.",
      },
      {
        id: "knot",
        location: "eventide",
        item: {
          id: "knot",
          name: "Eventide Knot",
          description: "Binds the horizon so it stops screaming.",
        },
        corrupt: ">eventide-knot::111dfa",
        clear: "Knot cinches, muffling the horizon.",
        story: "Silhouettes pound against the horizon; one matches your height.",
      },
      {
        id: "heart",
        location: "antenna",
        item: {
          id: "heart",
          name: "Obelisk Heart",
          description: "Fuel that keeps the flashlight bright against the watcher.",
        },
        corrupt: ">obelisk-heart::7ac301",
        clear: "Heart thrums like a subsonic siren.",
        story: "The antennae lean close, whispering coordinates of your spine.",
      },
      {
        id: "lullaby",
        location: "nest",
        item: {
          id: "lullaby",
          name: "Glass Lullaby",
          description: "A song that quiets the door's teeth.",
        },
        corrupt: ">nest-lullaby::522031",
        clear: "Lullaby echoes, teeth retracting in slow shame.",
        story: "Cables twitch in rhythm, ready to strike if you falter.",
      },
      {
        id: "seal",
        location: "door",
        item: {
          id: "seal",
          name: "Threshold Seal",
          description: "Final key shaped exactly like your fear.",
        },
        corrupt: ">door-seal::ae09b7",
        clear: "Seal softens, molded by your trembling hand.",
        story: "Behind the membrane you hear yourself begging to stay outside.",
      },
    ],
  },
];

const state = {
  running: false,
  paused: false,
  threat: 0,
  pointer: { x: window.innerWidth / 2, y: window.innerHeight / 2 },
  prevPointer: { x: window.innerWidth / 2, y: window.innerHeight / 2 },
  overlayOffset: { x: 0, y: 0 },
  pointerLag: 0,
  cursorSpeed: 0,
  lastTimestamp: performance.now(),
  levelIndex: 0,
  level: null,
  zones: [],
  fragments: [],
  anomalies: [],
  anchors: [],
  activeAnchor: null,
  activeZone: null,
  solvedCount: 0,
  totalSolved: 0,
  levelComplete: false,
  doorActive: false,
  doorListener: null,
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
    lag: 0,
    position: { x: window.innerWidth / 2, y: window.innerHeight / 2 },
    online: false,
    activationTimer: 0,
    stability: 100,
    off: false,
    messageCooldown: 0,
    reflectionTimer: 0,
    displayRadius: 0,
    drainingFragment: null,
    lastToggle: 0,
  },
  edgeWarningTimer: 0,
  inventory: [],
  storyLog: [],
  activeMap: [],
};

const zoneTemperaments = ["calm", "watchful", "hostile"];

function openSettings() {
  if (!settingsPanel || !menu) return;
  settingsPanel.hidden = false;
  settingsPanel.removeAttribute("hidden");
  settingsPanel.setAttribute("aria-hidden", "false");
  menu.classList.add("settings-visible");
  settingsToggleButton?.setAttribute("aria-expanded", "true");
}

function closeSettings() {
  if (!settingsPanel || !menu) return;
  settingsPanel.hidden = true;
  settingsPanel.setAttribute("aria-hidden", "true");
  settingsPanel.setAttribute("hidden", "");
  menu.classList.remove("settings-visible");
  settingsToggleButton?.setAttribute("aria-expanded", "false");
}

function openDialog(dialog) {
  if (!dialog) return;
  if (typeof dialog.showModal === "function") {
    dialog.showModal();
  } else {
    dialog.setAttribute("open", "true");
  }
}

function closeDialog(dialog) {
  if (!dialog) return;
  if (typeof dialog.close === "function") {
    dialog.close();
  } else {
    dialog.removeAttribute("open");
  }
}

function openIntro() {
  if (state.running) return;
  if (!introDialog) {
    startFromMenu(pendingStartOptions ?? {});
    return;
  }
  if (!pendingStartOptions) {
    pendingStartOptions = {};
  }
  openDialog(introDialog);
  const primary = introDialog.querySelector("[data-action='begin-run']");
  primary?.focus();
}

function startFromMenu(options = {}) {
  pendingStartOptions = null;
  startRun(options);
}

function closeIntro(startGame = false) {
  if (introDialog) {
    closeDialog(introDialog);
  }
  if (startGame) {
    const options = pendingStartOptions ?? {};
    startFromMenu(options);
  } else {
    pendingStartOptions = null;
  }
}

function openEraseConfirm() {
  if (!eraseConfirmDialog) return;
  openDialog(eraseConfirmDialog);
  const cancelButton = eraseConfirmDialog.querySelector("[data-action='cancel-erase']");
  cancelButton?.focus();
}

function closeEraseConfirm() {
  if (!eraseConfirmDialog) return;
  closeDialog(eraseConfirmDialog);
}

function performErase() {
  closeEraseConfirm();
  setTimeout(() => {
    location.reload();
  }, 200);
}

function init() {
  bindMenu();
  bindPause();
  bindFlashlightControls();
  screen.addEventListener("mousemove", handlePointerMove);
  screen.addEventListener("pointerdown", handlePointerDown);
  screen.addEventListener("pointerup", handlePointerUp);
  screen.addEventListener("pointercancel", handlePointerUp);
  document.addEventListener("pointermove", handlePointerMove);
  document.addEventListener("pointerup", handlePointerUp);
  window.addEventListener("resize", rebuildZones);
  if (flashlightOverlay) {
    flashlightOverlay.style.setProperty("--x", `${state.pointer.x}px`);
    flashlightOverlay.style.setProperty("--y", `${state.pointer.y}px`);
    flashlightOverlay.style.setProperty("--radius", `${state.flashlight.radius}px`);
    flashlightOverlay.setAttribute("aria-hidden", "true");
  }
  generateAmbientText();
  state.lastTimestamp = performance.now();
  requestAnimationFrame(tick);
}

function bindMenu() {
  if (!menu) return;
  const startButton = menu.querySelector("[data-action='start']");
  settingsToggleButton = menu.querySelector("[data-action='settings']");
  const eraseButton = menu.querySelector("[data-action='erase']");
  const closeSettingsButton = menu.querySelector("[data-action='close-settings']");
  const introBeginButton = introDialog?.querySelector("[data-action='begin-run']");
  const introSkipButton = introDialog?.querySelector("[data-action='skip-intro']");
  const confirmEraseButton = eraseConfirmDialog?.querySelector(
    "[data-action='confirm-erase']"
  );
  const cancelEraseButton = eraseConfirmDialog?.querySelector(
    "[data-action='cancel-erase']"
  );

  startButton?.addEventListener("click", () => {
    if (state.running) return;
    const options = {
      audit: auditToggle?.checked ?? false,
    };
    const wantsIntro = Boolean(introToggle?.checked && introDialog);
    closeSettings();
    if (wantsIntro) {
      pendingStartOptions = options;
      openIntro();
    } else {
      startFromMenu(options);
    }
  });

  settingsToggleButton?.addEventListener("click", () => {
    if (settingsPanel?.hidden) {
      openSettings();
    } else {
      closeSettings();
    }
  });

  eraseButton?.addEventListener("click", () => {
    closeSettings();
    if (eraseButton) {
      glitchMenu(eraseButton);
    }
    setTimeout(() => {
      openEraseConfirm();
    }, 220);
  });

  closeSettingsButton?.addEventListener("click", () => {
    closeSettings();
    settingsToggleButton?.focus();
  });

  introBeginButton?.addEventListener("click", () => closeIntro(true));
  introSkipButton?.addEventListener("click", () => closeIntro(true));
  introDialog?.addEventListener("cancel", (event) => {
    event.preventDefault();
    closeIntro(true);
  });

  confirmEraseButton?.addEventListener("click", performErase);
  cancelEraseButton?.addEventListener("click", () => closeEraseConfirm());
  eraseConfirmDialog?.addEventListener("cancel", (event) => {
    event.preventDefault();
    closeEraseConfirm();
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
  if (!pauseOverlay) return;
  const resumeButton = pauseOverlay.querySelector("[data-action='resume']");
  if (resumeButton) {
    resumeButton.addEventListener("click", resume);
  }
}

function bindFlashlightControls() {
  document.addEventListener("keydown", (event) => {
    if (!state.running || state.paused) return;
    if (event.key.toLowerCase() === "x") {
      toggleFlashlight();
    }
  });
  document.addEventListener("contextmenu", (event) => {
    event.preventDefault();
    if (!state.running) return;
    toggleFlashlight();
  });
}

function startRun(options = {}) {
  if (state.running) return;
  closeSettings();
  if (menu) {
    menu.classList.add("menu-exiting", "fade-out");
    const computed = getComputedStyle(menu);
    const fadeDuration = parseFloat(computed.getPropertyValue("--menu-fade-duration")) || 900;
    setTimeout(() => {
      menu.hidden = true;
    }, fadeDuration);
    menu.setAttribute("aria-hidden", "true");
  }
  state.running = true;
  state.auditMode = options.audit ?? false;
  document.body.classList.toggle("audit-mode", state.auditMode);
  rebuildZones();
  state.levelIndex = 0;
  state.level = null;
  state.inventory = [];
  state.storyLog = [];
  state.activeMap = [];
  state.totalSolved = 0;
  state.levelComplete = false;
  state.doorActive = false;
  resetDoor();
  renderStoryLog();
  updateInventoryDisplay();
  updateMapDisplay();
  updateLevelDisplay();
  loadLevel(state.levelIndex);
  state.threat = 8;
  state.solvedCount = 0;
  state.doorActive = false;
  state.pointerLag = 0;
  state.cursorSpeed = 0;
  state.prevPointer.x = state.pointer.x;
  state.prevPointer.y = state.pointer.y;
  state.overlayOffset.x = 0;
  state.overlayOffset.y = 0;
  state.flashlight.baseRadius = state.auditMode ? 420 : 260;
  state.flashlight.radius = state.flashlight.baseRadius;
  state.flashlight.desiredRadius = state.flashlight.baseRadius;
  state.flashlight.flicker = 0;
  state.flashlight.penalty = 0;
  state.flashlight.boost = 0;
  state.flashlight.lag = 0;
  state.flashlight.stability = 100;
  state.flashlight.online = false;
  state.flashlight.activationTimer = 2200;
  state.flashlight.off = false;
  state.flashlight.position.x = state.pointer.x;
  state.flashlight.position.y = state.pointer.y;
  state.flashlight.messageCooldown = 0;
  state.flashlight.reflectionTimer = 0;
  state.flashlight.displayRadius = 0;
  state.flashlight.drainingFragment = null;
  state.flashlight.lastToggle = performance.now();
  state.activeAnchor = null;
  state.edgeWarningTimer = 0;
  state.activeZone = null;
  loreFeed.innerHTML = "";
  whispersLayer.innerHTML = "";
  edgeWarning.textContent = "";
  edgeWarning.classList.remove("visible");
  document.body.classList.remove(
    "flashlight-online",
    "flashlight-unstable",
    "flashlight-off",
    "flashlight-reflection",
    "flashlight-drain"
  );
  if (flashlightOverlay) {
    flashlightOverlay.setAttribute("aria-hidden", "true");
  }
  state.lastTimestamp = performance.now();
}

function pause() {
  if (!state.running) return;
  state.paused = true;
  if (!pauseOverlay) return;
  if (typeof pauseOverlay.showModal === "function") {
    pauseOverlay.showModal();
  } else {
    pauseOverlay.setAttribute("open", "true");
  }
}

function resume() {
  if (!state.paused) return;
  state.paused = false;
  if (pauseOverlay) {
    if (typeof pauseOverlay.close === "function") {
      pauseOverlay.close();
    } else {
      pauseOverlay.removeAttribute("open");
    }
  }
  state.lastTimestamp = performance.now();
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
  const levelData = state.level ?? gameLevels[state.levelIndex] ?? null;
  const fragmentPool = levelData?.fragments ?? [];
  const total = fragmentPool.length;
  state.solvedCount = 0;
  state.levelComplete = false;
  if (!total) return;
  for (let i = 0; i < total; i += 1) {
    const zone = state.zones[(i * 2 + 1) % state.zones.length] ?? state.zones[0];
    const node = fragmentTemplate.content.firstElementChild.cloneNode(true);
    const rect = positionWithinZone(zone, node);
    const blueprint = fragmentPool[i % fragmentPool.length];
    const fragment = {
      node,
      rect,
      progress: 0,
      solved: false,
      stage: 0,
      lore: createLoreFragment(i, levelData, blueprint),
      temperament: zone.temperament,
      decayDelay: 0,
      absorbsLight: Math.random() > 0.55,
      burnsInLight: Math.random() > 0.68,
      item: blueprint?.item ?? null,
      location: blueprint?.location ?? null,
      itemCollected: false,
    };
    node.style.setProperty("--progress", fragment.progress);
    node.style.left = `${rect.x}px`;
    node.style.top = `${rect.y}px`;
    node.dataset.index = i;
    if (fragment.location) {
      node.dataset.location = fragment.location;
    }
    if (fragment.absorbsLight) {
      node.dataset.absorb = "true";
    }
    if (fragment.burnsInLight) {
      node.dataset.scorch = "true";
    }
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
      beamExposure: 0,
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

function loadLevel(index) {
  const level = gameLevels[index];
  if (!level) {
    triggerVictory();
    return;
  }
  state.levelIndex = index;
  state.level = level;
  state.activeMap = level.map.map((node) => ({ ...node, visited: false }));
  state.solvedCount = 0;
  state.levelComplete = false;
  resetDoor();
  updateLevelDisplay();
  updateMapDisplay();
  updateInventoryDisplay();
  generateAmbientText(level);
  spawnFragments();
  spawnAnomalies();
  spawnAnchors();
  addLoreEntry(`level engaged :: ${level.name.toLowerCase()}`);
  logStory(level.intro);
  if (level.horror) {
    setTimeout(() => logStory(level.horror), 600);
  }
}

function updateLevelDisplay() {
  if (levelNameEl) {
    levelNameEl.textContent = state.level?.name ?? "—";
  }
  if (levelObjectiveEl) {
    levelObjectiveEl.textContent = state.level?.objective ?? "—";
  }
}

function updateMapDisplay() {
  if (!mapGrid) return;
  mapGrid.innerHTML = "";
  const nodes = state.activeMap ?? [];
  if (!nodes.length) {
    const placeholder = document.createElement("li");
    placeholder.textContent = "map dormant";
    placeholder.className = "map-placeholder";
    mapGrid.appendChild(placeholder);
    return;
  }
  nodes.forEach((node) => {
    const item = document.createElement("li");
    if (node.visited) {
      item.classList.add("visited");
    }
    const name = document.createElement("span");
    name.className = "map-node-name";
    name.textContent = node.name;
    const detail = document.createElement("span");
    detail.className = "map-node-detail";
    detail.textContent = node.visited ? node.detail : node.hint;
    item.append(name, detail);
    mapGrid.appendChild(item);
  });
}

function updateInventoryDisplay() {
  if (!inventoryList) return;
  inventoryList.innerHTML = "";
  const collected = state.inventory;
  collected.forEach((item) => {
    const entry = document.createElement("li");
    entry.className = "collected";
    const name = document.createElement("span");
    name.className = "item-name";
    name.textContent = item.name;
    const desc = document.createElement("span");
    desc.className = "item-desc";
    desc.textContent = item.description;
    entry.append(name, desc);
    inventoryList.appendChild(entry);
  });
  const level = state.level;
  if (level) {
    level.fragments.forEach((fragment) => {
      if (!fragment.item) return;
      const hasItem = collected.some((item) => item.id === fragment.item.id);
      if (hasItem) return;
      const entry = document.createElement("li");
      entry.className = "missing";
      const name = document.createElement("span");
      name.className = "item-name";
      name.textContent = "???";
      const desc = document.createElement("span");
      desc.className = "item-desc";
      desc.textContent = "artifact unresolved";
      entry.append(name, desc);
      inventoryList.appendChild(entry);
    });
  }
  if (!inventoryList.children.length) {
    const entry = document.createElement("li");
    entry.className = "missing";
    const name = document.createElement("span");
    name.className = "item-name";
    name.textContent = "inventory empty";
    const desc = document.createElement("span");
    desc.className = "item-desc";
    desc.textContent = "awaiting recovered fragments";
    entry.append(name, desc);
    inventoryList.appendChild(entry);
  }
}

function renderStoryLog() {
  if (!storyLog) return;
  storyLog.innerHTML = "";
  if (!state.storyLog.length) {
    const entry = document.createElement("p");
    entry.className = "story-entry";
    entry.textContent = "lore feed dormant";
    storyLog.appendChild(entry);
    return;
  }
  state.storyLog.forEach((item) => {
    const entry = document.createElement("p");
    entry.className = "story-entry";
    entry.textContent = item.text;
    storyLog.appendChild(entry);
  });
}

function logStory(text) {
  if (!text) return;
  state.storyLog.unshift({ text, levelIndex: state.levelIndex });
  state.storyLog = state.storyLog.slice(0, 8);
  renderStoryLog();
}

function collectItem(item) {
  if (!item) return;
  if (state.inventory.some((entry) => entry.id === item.id)) return;
  state.inventory.push({ ...item, levelId: state.level?.id ?? "" });
  addLoreEntry(`item recovered :: ${item.name.toLowerCase()}`);
  updateInventoryDisplay();
}

function markMapNode(locationId) {
  if (!locationId) return;
  const node = state.activeMap.find((entry) => entry.id === locationId);
  if (node && !node.visited) {
    node.visited = true;
    updateMapDisplay();
    generateAmbientText();
  }
}

function checkLevelCompletion() {
  if (!state.fragments.length || state.levelComplete) return;
  const allSolved = state.fragments.every((fragment) => fragment.solved);
  if (allSolved) {
    completeLevel();
  }
}

function completeLevel() {
  if (state.levelComplete) return;
  const level = state.level;
  state.levelComplete = true;
  generateAmbientText();
  adjustThreat(-18);
  state.flashlight.boost = Math.min(
    state.flashlight.baseRadius * 0.8,
    state.flashlight.boost + 80
  );
  if (level) {
    addLoreEntry(`level sealed :: ${level.name.toLowerCase()}`);
    if (level.horror) {
      logStory(level.horror);
    }
    if (level.outro) {
      logStory(level.outro);
    }
  }
  if (state.levelIndex < gameLevels.length - 1) {
    setTimeout(() => {
      loadLevel(state.levelIndex + 1);
    }, 2600);
  } else {
    addLoreEntry("all fragments aligned :: threshold forming");
  }
}

function resetDoor() {
  if (!doorPattern) return;
  if (state.doorListener) {
    doorPattern.removeEventListener("pointerdown", state.doorListener);
    state.doorListener = null;
  }
  doorPattern.classList.remove("active");
  state.doorActive = false;
}

function activateDoor() {
  if (!doorPattern || state.doorActive) return;
  doorPattern.classList.add("active");
  state.doorActive = true;
  addLoreEntry("door pattern aligning :: breathe slow");
  const listener = () => {
    if (state.threat > 30) {
      addLoreEntry("threat too loud :: pattern recoils");
      adjustThreat(6);
      return;
    }
    if (state.flashlight.radius < 180) {
      addLoreEntry("light insufficient :: pattern hides");
      adjustThreat(4);
      return;
    }
    addLoreEntry("hold steady... harmonizing...");
    let aborted = false;
    const monitor = setInterval(() => {
      if (state.threat > 44 || state.flashlight.flicker > 0 || state.flashlight.radius < 160) {
        aborted = true;
        clearInterval(monitor);
        addLoreEntry("pattern fractures :: threat flares");
        adjustThreat(12);
      }
    }, 160);
    setTimeout(() => {
      clearInterval(monitor);
      if (aborted) return;
      addLoreEntry("vector released. exit available.");
      endRun();
    }, 2800);
  };
  state.doorListener = listener;
  doorPattern.addEventListener("pointerdown", listener);
}

function triggerVictory() {
  logStory("threshold reached :: no further layers detected");
  addLoreEntry("interface calm :: nothing else to parse");
}

function onFragmentHover(fragment) {
  fragment.node.classList.add("active");
  fragment.node.querySelector(".fragment-core").style.filter = "brightness(1.4)";
  adjustThreat(fragment.temperament === "hostile" ? 2 : 0.5);
  if (fragment.absorbsLight && state.flashlight.online && !state.flashlight.off) {
    state.flashlight.penalty = Math.min(
      state.flashlight.baseRadius * 0.75,
      state.flashlight.penalty + 60
    );
    state.flashlight.stability = Math.max(0, state.flashlight.stability - 6);
    state.flashlight.drainingFragment = fragment;
    document.body.classList.add("flashlight-drain");
  }
}

function onFragmentLeave(fragment) {
  fragment.node.classList.remove("active");
  fragment.node.querySelector(".fragment-core").style.filter = "";
  if (state.flashlight.drainingFragment === fragment) {
    state.flashlight.drainingFragment = null;
    document.body.classList.remove("flashlight-drain");
  }
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
}

function handlePointerDown(event) {
  if (state.paused) return;
  const fragmentEl = event.target.closest(".fragment");
  if (!fragmentEl) {
    state.hold.target = null;
  }
}

function handlePointerUp() {
  if (!state.hold.target) {
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
}

function stopHolding() {
  if (!state.hold.target) return;
  finalizeHold(false);
}

function handlePointerMove(event) {
  if (event.pointerType === "touch") {
    return;
  }
  state.pointer.x = event.clientX;
  state.pointer.y = event.clientY;
}

function generateAmbientText(levelData = state.level) {
  const lines = [];
  const totalLines = 18;
  const mapNodes = levelData?.map ?? [];
  const activeNodes = state.activeMap ?? [];
  for (let i = 0; i < totalLines; i += 1) {
    if (i < mapNodes.length) {
      const node = mapNodes[i];
      const active = activeNodes.find((entry) => entry.id === node.id)?.visited ?? false;
      const status = active ? "[stabilized]" : "[unmapped]";
      const descriptor = active ? node.detail : node.hint;
      lines.push(`${status} ${node.name.toLowerCase()} :: ${descriptor.toLowerCase()}`);
    } else if (i === totalLines - 2 && levelData?.objective) {
      lines.push(`[objective] ${levelData.objective.toLowerCase()}`);
    } else if (i === totalLines - 1) {
      lines.push(`[threat] ${Math.round(state.threat).toString().padStart(3, "0")} :: monitor drift`);
    } else {
      const fragments = [];
      for (let j = 0; j < 18; j += 1) {
        const value = Math.random() > 0.92 ? "::" : Math.random() > 0.5 ? "0" : "1";
        fragments.push(value);
      }
      lines.push(fragments.join(" "));
    }
  }
  ambientText.textContent = lines.join("\n");
}

function createLoreFragment(index, levelData, blueprint) {
  if (blueprint) {
    const corrupt =
      blueprint.corrupt ??
      `>${(blueprint.id || "fragment")}::${Math.random()
        .toString(16)
        .slice(2, 10)}`;
    const clean =
      blueprint.clear ??
      (levelData?.objective ?? "fragment resolved :: threat dampens");
    return {
      stageText: [corrupt, clean],
      stage: 0,
      story: blueprint.story ?? "",
      item: blueprint.item ?? null,
    };
  }

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
    story: "",
    item: null,
  };
}

function tick(timestamp) {
  const dt = timestamp - state.lastTimestamp;
  state.lastTimestamp = timestamp;
  state.overlayOffset.x = 0;
  state.overlayOffset.y = 0;
  if (!state.running || state.paused) {
    updateCursor(dt);
    requestAnimationFrame(tick);
    return;
  }
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
  const prevX = state.prevPointer.x;
  const prevY = state.prevPointer.y;
  const distance = Math.hypot(state.pointer.x - prevX, state.pointer.y - prevY);
  state.cursorSpeed = distance / Math.max(dt, 16);
  state.prevPointer.x = state.pointer.x;
  state.prevPointer.y = state.pointer.y;
  state.pointerLag = Math.max(0, state.pointerLag - dt * 0.00025);
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
    if (
      state.flashlight.online &&
      !state.flashlight.off &&
      fragment.burnsInLight &&
      !fragment.solved &&
      state.flashlight.displayRadius > 0
    ) {
      const rect = fragment.node.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const distance = Math.hypot(
        centerX - state.flashlight.position.x,
        centerY - state.flashlight.position.y
      );
      if (distance < state.flashlight.displayRadius * 0.55) {
        fragment.progress = Math.max(0, fragment.progress - dt * 1.2);
        fragment.node.classList.add("scorched");
        fragment.decayDelay = 0;
      } else {
        fragment.node.classList.remove("scorched");
      }
    } else {
      fragment.node.classList.remove("scorched");
    }
  });
}

function solveFragment(fragment) {
  if (fragment.solved) return;
  fragment.solved = true;
  fragment.stage += 1;
  fragment.node.classList.add("solved");
  fragment.node.style.setProperty("--progress", 100);
  if (state.flashlight.drainingFragment === fragment) {
    state.flashlight.drainingFragment = null;
    document.body.classList.remove("flashlight-drain");
  }
  const textNode = fragment.node.querySelector(".fragment-text");
  const stageIndex = Math.min(
    fragment.stage,
    fragment.lore.stageText.length - 1
  );
  textNode.textContent = fragment.lore.stageText[stageIndex];
  addLoreEntry(textNode.textContent);
  adjustThreat(-12);
  state.flashlight.penalty = Math.max(0, state.flashlight.penalty - 40);
  state.flashlight.boost = Math.min(
    state.flashlight.baseRadius * 0.6,
    state.flashlight.boost + 30
  );
  state.solvedCount += 1;
  state.totalSolved += 1;
  if (fragment.item && !fragment.itemCollected) {
    collectItem(fragment.item);
    fragment.itemCollected = true;
  }
  if (fragment.lore?.story) {
    logStory(fragment.lore.story);
  }
  markMapNode(fragment.location);
  checkLevelCompletion();
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
  } else if (state.threat < 55) {
    body.classList.add("threat-medium");
    body.classList.remove("threat-high");
  } else {
    body.classList.add("threat-high");
    body.classList.remove("threat-medium");
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
  const seconds = dt / 1000;
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
      state.flashlight.lag = Math.min(
        0.28,
        state.flashlight.lag + intensity * (anomaly.type === "siphon" ? 0.08 : 0.04)
      );
      if (state.flashlight.online && !state.flashlight.off) {
        const stabilityDrag = intensity * (anomaly.type === "siphon" ? 34 : 18) * seconds;
        state.flashlight.stability = Math.max(0, state.flashlight.stability - stabilityDrag);
      }
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

    if (state.flashlight.online && !state.flashlight.off && state.flashlight.displayRadius > 0) {
      const beamX = state.flashlight.position.x - rect.left;
      const beamY = state.flashlight.position.y - rect.top;
      const beamDx = beamX - anomaly.x;
      const beamDy = beamY - anomaly.y;
      const beamDistance = Math.hypot(beamDx, beamDy);
      const leash = state.flashlight.displayRadius * (anomaly.type === "stalker" ? 1.05 : 0.9);
      if (beamDistance < leash) {
        anomaly.beamExposure += dt;
        state.flashlight.stability = Math.max(
          0,
          state.flashlight.stability - seconds * (22 + anomaly.beamExposure * 0.0004)
        );
        if (anomaly.beamExposure > 1400) {
          const norm = Math.max(1, beamDistance);
          anomaly.velocity.x += (beamDx / norm) * 26 * seconds;
          anomaly.velocity.y += (beamDy / norm) * 26 * seconds;
          anomaly.velocity.x = clamp(anomaly.velocity.x, -64, 64);
          anomaly.velocity.y = clamp(anomaly.velocity.y, -64, 64);
          state.flashlight.lag = Math.min(0.32, state.flashlight.lag + 0.14 * seconds);
          adjustThreat(seconds * 6.5);
        }
      } else {
        anomaly.beamExposure = Math.max(0, anomaly.beamExposure - dt * 0.6);
      }
    } else {
      anomaly.beamExposure = Math.max(0, anomaly.beamExposure - dt * 0.6);
    }
    anomaly.node.classList.toggle("agitated", anomaly.beamExposure > 900);
  });
}

function updateDoorPattern() {
  if (!doorPattern) return;
  const finalLevel = state.levelIndex >= gameLevels.length - 1;
  if (!finalLevel) {
    if (state.doorActive) {
      resetDoor();
    }
    return;
  }
  if (state.levelComplete) {
    activateDoor();
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

  if (!state.flashlight.online) {
    if (state.flashlight.activationTimer > 0) {
      state.flashlight.activationTimer -= dt;
      if (state.flashlight.activationTimer <= 0) {
        enableFlashlight();
      }
    }
    return;
  }

  const seconds = dt / 1000;
  const body = document.body;

  state.flashlight.penalty = Math.max(0, state.flashlight.penalty - dt * 0.02);
  if (!state.activeAnchor) {
    state.flashlight.boost = Math.max(0, state.flashlight.boost - dt * 0.05);
  }
  state.flashlight.lag = Math.max(0, state.flashlight.lag - dt * 0.00018);

  if (state.flashlight.messageCooldown > 0) {
    state.flashlight.messageCooldown -= dt;
  }

  if (state.flashlight.off) {
    state.flashlight.stability = Math.min(100, state.flashlight.stability + seconds * 12);
  } else {
    const stressDrain = state.cursorSpeed * 18 * seconds;
    const dragDrain = state.flashlight.lag * 110 * seconds;
    const threatDrain = (state.threat / 100) * 8 * seconds;
    const baseDrain = 6 * seconds + stressDrain + dragDrain + threatDrain;
    state.flashlight.stability = Math.max(0, state.flashlight.stability - baseDrain);
  }

  if (!state.flashlight.off && state.flashlight.stability < 45) {
    body.classList.add("flashlight-unstable");
    state.flashlight.flicker = Math.max(
      state.flashlight.flicker,
      (45 - state.flashlight.stability) * 5
    );
  } else {
    body.classList.remove("flashlight-unstable");
  }

  if (
    state.flashlight.messageCooldown <= 0 &&
    state.flashlight.stability < 60 &&
    !state.flashlight.off
  ) {
    emitFlashlightSignal();
  }

  if (state.flashlight.reflectionTimer > 0) {
    state.flashlight.reflectionTimer -= dt;
    if (state.flashlight.reflectionTimer <= 0) {
      body.classList.remove("flashlight-reflection");
    }
  } else if (
    !state.flashlight.off &&
    state.flashlight.stability < 24 &&
    Math.random() < seconds * 1.3
  ) {
    state.flashlight.reflectionTimer = 1400 + Math.random() * 800;
    body.classList.add("flashlight-reflection");
  }

  if (!state.flashlight.drainingFragment) {
    body.classList.remove("flashlight-drain");
  }

  const instabilityPenalty = clamp((100 - state.flashlight.stability) * 1.4, 0, state.flashlight.baseRadius);
  const baseRadius =
    state.flashlight.desiredRadius +
    state.flashlight.boost -
    state.flashlight.penalty -
    instabilityPenalty;
  const threatDrag = state.threat * 1.1;
  const minRadius = state.flashlight.off ? 60 : 110;
  const maxRadius = state.flashlight.baseRadius * (state.flashlight.off ? 0.9 : 1.6);
  const target = clamp(baseRadius - threatDrag, minRadius, maxRadius);
  state.flashlight.radius += (target - state.flashlight.radius) * 0.08;
  state.flashlight.flicker = Math.max(0, state.flashlight.flicker - dt);
  const flickerOffset =
    state.flashlight.flicker > 0 && !state.flashlight.off
      ? (Math.random() - 0.5) * Math.min(80, state.flashlight.flicker / 2)
      : 0;
  const rawRadius = Math.max(minRadius, state.flashlight.radius + flickerOffset);

  const displayedX = state.pointer.x + state.overlayOffset.x;
  const displayedY = state.pointer.y + state.overlayOffset.y;
  const stress = (100 - state.flashlight.stability) / 100;
  const smoothing = clamp(0.18 - stress * 0.1 - state.flashlight.lag, 0.03, 0.18);
  state.flashlight.position.x += (displayedX - state.flashlight.position.x) * smoothing;
  state.flashlight.position.y += (displayedY - state.flashlight.position.y) * smoothing;

  const effectiveRadius = state.flashlight.off ? Math.max(60, rawRadius * 0.35) : rawRadius;
  flashlightOverlay.style.setProperty("--x", `${state.flashlight.position.x}px`);
  flashlightOverlay.style.setProperty("--y", `${state.flashlight.position.y}px`);
  flashlightOverlay.style.setProperty("--radius", `${effectiveRadius}px`);
  state.flashlight.displayRadius = state.flashlight.off ? 0 : effectiveRadius;

  if (state.flashlight.flicker > 0 && !state.flashlight.off) {
    body.classList.add("flashlight-flicker");
  } else {
    body.classList.remove("flashlight-flicker");
  }

  body.classList.toggle("flashlight-off", state.flashlight.off);
}

function enableFlashlight() {
  state.flashlight.online = true;
  state.flashlight.activationTimer = 0;
  state.flashlight.messageCooldown = 2000;
  if (flashlightOverlay) {
    flashlightOverlay.removeAttribute("aria-hidden");
  }
  document.body.classList.add("flashlight-online");
  addLoreEntry("pointer-illumination protocol enabled");
}

function toggleFlashlight() {
  if (!state.flashlight.online) return;
  const now = performance.now();
  if (now - state.flashlight.lastToggle < 320) return;
  state.flashlight.lastToggle = now;
  state.flashlight.off = !state.flashlight.off;
  if (state.flashlight.off) {
    addLoreEntry("light shuttered :: interface bares truth");
    state.flashlight.reflectionTimer = 0;
    state.flashlight.flicker = 0;
    state.flashlight.drainingFragment = null;
    document.body.classList.remove("flashlight-reflection", "flashlight-drain", "flashlight-flicker", "flashlight-unstable");
  } else {
    addLoreEntry("light restored :: it resumes observing");
  }
}

function emitFlashlightSignal() {
  if (!flashlightSignals.length) return;
  const signal = flashlightSignals[Math.floor(Math.random() * flashlightSignals.length)];
  state.flashlight.messageCooldown = 2600 + Math.random() * 2200;
  addLoreEntry(`flashlight flicker :: ${signal.code}`);
  if (whispersLayer) {
    const node = document.createElement("div");
    node.className = "whisper flashlight-signal";
    node.textContent = signal.code;
    if (signal.meaning) {
      node.dataset.translation = signal.meaning;
    }
    whispersLayer.prepend(node);
    requestAnimationFrame(() => node.classList.add("visible"));
    while (whispersLayer.children.length > 6) {
      whispersLayer.removeChild(whispersLayer.lastChild);
    }
    setTimeout(() => {
      node.classList.remove("visible");
      setTimeout(() => node.remove(), 600);
    }, 2200);
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
