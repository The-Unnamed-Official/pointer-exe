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
const volumeSlider = document.querySelector('#volume-slider');
const volumeValueLabel = document.querySelector('#volume-value');
const pointerSwitch = document.querySelector('#pointer-switch');
const staticSwitch = document.querySelector('#static-switch');
const pointerGhost = document.querySelector('#pointer-ghost');
const flickerOverlay = document.querySelector('#flicker-overlay');
const eyesOverlay = document.querySelector('#eyes-overlay');
const entityDimOverlay = document.querySelector('#entity-dim-overlay');
const entityApparition = document.querySelector('#entity-apparition');
const sessionLabel = document.querySelector('#session-label');
const flashlightButton = document.querySelector('[data-action="flashlight"]');
const flashlightIndicator = document.querySelector('#flashlight-indicator');
const flashlightBeam = document.querySelector('#flashlight-beam');
const tutorialOverlay = document.querySelector('#tutorial-overlay');
const tutorialDismissButton = document.querySelector('#tutorial-dismiss');

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
const legacyStage = document.querySelector('#legacy-stage');
const atelierStage = document.querySelector('#atelier-stage');
const atelierInterface = document.querySelector('#atelier-interface');
const gauntletStage = document.querySelector('#gauntlet-stage');
const gauntletInterface = document.querySelector('#gauntlet-interface');
const statusLine = document.querySelector('#status-line');
const explorationLabel = document.querySelector('#exploration-label');
const watcherLabel = document.querySelector('#watcher-label');
const finalSection = document.querySelector('#final-revelation');
const finalText = document.querySelector('#final-text');
const finalPuzzleButton = document.querySelector('#final-puzzle-button');
const thankYouScreen = document.querySelector('#thank-you-screen');

const finalPuzzleOverlay = document.querySelector('#final-puzzle-overlay');
const finalPuzzleContainer = document.querySelector('#final-puzzle-container');
const abortFinalPuzzleButton = document.querySelector('[data-action="abort-final-puzzle"]');

const stalkerOverlay = document.querySelector('#stalker-overlay');
const stalkerWarning = document.querySelector('#stalker-warning');
const stalkerField = document.querySelector('#stalker-field');
const stalkerEntityMarker = document.querySelector('#stalker-entity');
const stalkerProgress = document.querySelector('#stalker-progress');
const stalkerProgressBar = stalkerProgress?.querySelector('.stalker-progress-bar');

const encounterOverlay = document.querySelector('#encounter-overlay');
const encounterTitle = document.querySelector('#encounter-title');
const encounterEntity = document.querySelector('#encounter-entity');
const encounterText = document.querySelector('#encounter-text');
const encounterChoices = document.querySelector('#encounter-choices');
const encounterFeedback = document.querySelector('#encounter-feedback');
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

const restartRunButton = document.querySelector('[data-action="restart-run"]');

const mainMenuAudio = document.querySelector('#main-menu-audio');
const shortageAudio = document.querySelector('#shortage-audio');
const shortageOST = document.querySelector('#shortage-ost');
const lightsOutAudio = document.querySelector('#lights-out-audio');
const flickerAudio = document.querySelector('#flicker-audio');
const entitySpawnAudio = document.querySelector('#entity-spawn-audio');
const entityKillAudio = document.querySelector('#entity-kill-audio');
const flashOnAudio = document.querySelector('#flash-on-audio');
const flashOffAudio = document.querySelector('#flash-off-audio');
const flashBrokenAudio = document.querySelector('#flash-broken-audio');
const flashRepairedAudio = document.querySelector('#flash-repaired-audio');

const defaultStatus = 'trace the map. the archive listens.';
const defaultWatcherLabel = 'signal steady';

const levels = [
  {
    id: 'layer-01',
    segment: 'legacy-triad',
    title: 'layer 01 // atrium of static',
    room: 'degaussed lobby',
    theme: {
      accent: '#5ef2d3',
      glow: 'rgba(94, 242, 211, 0.35)',
      timer: '#5ef2d3',
    },
    synopsis:
      'The lobby drills you now. Training glyphs reference wings you have not walked—ossuary ateliers, drowned stacks, an umbra stage waiting to test your light.',
    watchers: [
      'Cracked projectors loop bone lathes and velvet curtains, expecting you to know their rhythms already.',
      'Floor lights sketch three arrows—atrium, atelier, gauntlet. The third pulses impatiently whenever you hesitate.',
      'Ceiling speakers whisper: steady the hum, coax the relays, hide the light. Your breathing is being graded.',
    ],
    nodes: [
      {
        id: 'reception-well',
        name: 'reception well',
        description: 'A ring of retired monitors replays caretaker drills, begging your pointer to keep time.',
        coordinates: { x: 18, y: 62 },
        key: true,
        encounter: {
          heading: 'echoed receptionist',
          entity: 'memory construct',
          text: 'Static hands offer three cadences. Choose the ritual that convinces the monitors you can shepherd the archive.',
          effect: 'progress',
          acknowledgeLabel: 'log calibration',
          choices: [
            {
              id: 'sync',
              label: 'sync your breathing to the static',
              description: 'Inhale for four, hold for four, exhale for four until the ring matches you.',
              result: 'success',
              feedback: 'The monitors exhale with you, dimming into a halo that logs your cadence.',
              status: 'The monitors dim into a soft halo, storing your cadence for the drills ahead.',
            },
            {
              id: 'purge',
              label: 'purge every screen at once',
              description: 'Force the monitors into silence.',
              result: 'failure',
              feedback: 'Silence rattles the chassis; angry fault lights demand a calmer hand.',
              status: 'Fault glyphs blink red. The archive demands patience, not force.',
            },
            {
              id: 'spike',
              label: 'spike the signal hard',
              description: 'Flood the ring with a brutal pulse.',
              result: 'failure',
              feedback: 'The surge rebounds through your wrist, scalding the console in protest.',
              status: 'The surge scorches the console. The monitors recoil from brute force.',
            },
          ],
          afterStatus: 'The monitors dim into a soft halo, storing your cadence for the drills ahead.',
        },
        fragment: {
          id: 'fragment-alpha',
          label: 'fragment α',
          text: 'Caretaker Amon taught the atrium monitors a calming cadence. The same rhythm would later steady bone lathes in the atelier.',
        },
      },
      {
        id: 'survey-aperture',
        name: 'survey aperture',
        description: 'A keyhole exhales frost while projecting schematics of deeper wings.',
        coordinates: { x: 52, y: 34 },
        key: true,
        encounter: {
          heading: 'retinal aperture',
          entity: 'adaptive surveillance lens',
          text: 'The aperture wants to follow your intention. Decide how much of your plan it should taste.',
          effect: 'progress',
          acknowledgeLabel: 'record alignment',
          choices: [
            {
              id: 'whisper',
              label: 'share only the whisper of your route',
              description: 'Let the lens borrow the shape of your next breath.',
              result: 'success',
              feedback: 'The lens blinks, content with the faint outline you offered.',
              status: 'The aperture traces a thin path toward the flooded stacks and waits for you to follow.',
            },
            {
              id: 'mirror',
              label: 'mirror its gaze back at itself',
              description: 'Reflect the aperture until it stares only at you.',
              result: 'failure',
              feedback: 'It refuses the feedback loop, insisting on a path beyond your skin.',
              status: 'The aperture hums with irritation. It wants a destination, not a mirror.',
            },
            {
              id: 'broadcast',
              label: 'broadcast every plan you have',
              description: 'Announce your route to every watcher at once.',
              result: 'failure',
              feedback: 'The hallway fills with hungry whispers. Too many ears lean in.',
              status: 'A chorus of unseen auditors takes note of your shouting. Best not to repeat it.',
            },
          ],
          afterStatus: 'The aperture traces a thin path toward the flooded stacks and waits for you to follow.',
        },
        fragment: {
          id: 'fragment-beta',
          label: 'fragment β',
          text: 'Archivist Lira tuned the survey aperture to prefer whispered intention. That restraint keeps the gauntlet watchers guessing.',
        },
      },
      {
        id: 'maintenance-gate',
        name: 'relay console',
        description: 'A scarred console hums with cross-linked relays leading to the deeper wings.',
        coordinates: { x: 78, y: 68 },
        key: true,
        encounter: {
          heading: 'stalled conduit',
          entity: 'maintenance grid',
          text: 'The console hums with atelier and gauntlet relays. Teach it how you plan to reroute power when the grid dips.',
          effect: 'progress',
          acknowledgeLabel: 'prime relays',
          choices: [
            {
              id: 'coax',
              label: 'coax the relays gently',
              description: 'Trace a patient pattern across each sigil.',
              result: 'success',
              feedback: 'Relays fall into step with your rhythm, storing the cadence for later.',
              status: 'The relays memorize your guidance; they will respond when the grid falters.',
            },
            {
              id: 'override',
              label: 'slam the emergency override',
              description: 'Force the panel to obey now.',
              result: 'failure',
              feedback: 'The panel spits sparks and rejects the command.',
              status: 'Emergency overrides only anger the grid. It demands finesse.',
            },
            {
              id: 'disconnect',
              label: 'disconnect the gauntlet link',
              description: 'Cut the foreign circuits entirely.',
              result: 'failure',
              feedback: 'The console shrieks; the gauntlet link snaps back into place on its own.',
              status: 'The archive refuses to isolate the gauntlet. Integration is mandatory.',
            },
          ],
          afterStatus: 'Backup relays bloom awake, echoing the cadence you stored for the outage.',
        },
        fragment: {
          id: 'fragment-gamma',
          label: 'fragment γ',
          text: 'Engineer Soma braided the atrium console into the atelier and gauntlet feeds. Only rehearsed reroutes could calm a blackout.',
        },
      },
      {
        id: 'listening-bench',
        name: 'listening bench',
        description: 'Cracked leather seats lean toward whoever practices the caretaker cadence.',
        coordinates: { x: 36, y: 78 },
        key: false,
        encounter: {
          heading: 'passenger residual',
          entity: 'benign hitchhiker',
          text: 'A presence settles beside you, humming the bone rhythm the atelier favors. It invites you to echo the beat softly.',
          effect: 'hint',
          afterStatus: 'Your breathing aligns with the distant bone choir. The presence promises to hum warnings when relays strain.',
        },
      },
      {
        id: 'mirror-exit',
        name: 'polite exit',
        description: 'An EXIT sign written backward. The air smells like velvet and drowned ink.',
        coordinates: { x: 64, y: 14 },
        key: false,
        encounter: {
          heading: 'smiling impostor',
          entity: 'predatory mimic',
          text: 'A door opens onto another door wearing your face. It promises a shortcut to the gauntlet if you trust its grin.',
          effect: 'death',
          deathMessage: 'The mimic seals, grateful for the sensation of skin. You restart in the atrium missing the promise it dangled.',
        },
      },
    ],
  },
  {
    id: 'layer-02',
    segment: 'legacy-triad',
    title: 'layer 02 // drowned cartography',
    room: 'submerged records',
    theme: {
      accent: '#ff6f9c',
      glow: 'rgba(255, 111, 156, 0.4)',
      timer: '#ff6f9c',
    },
    synopsis:
      'Flooded aisles drift beneath cables pulsing with borrowed cadences. The maps rewrite themselves, testing whether you learned the atrium drills before leading you toward new wings.',
    watchers: [
      'Water mirrors bone lathes turning somewhere above, threading vertebrae into new routes.',
      'Currents tug your pointer toward a sealed tunnel stamped GAUNTLET; light cues flicker beneath the surface.',
      'Lanterns hum beneath the flood whenever you breathe too fast, rehearsing how to hide your light later.',
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
          text: 'Caretaker Amon recorded the cadence of every traversal. The same beat later soothed the tendon orbits in the atelier.',
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
          text: 'Archivist Lira taught these maps to dream ahead of explorers. Whispering future corridors keeps the gauntlet watchers confused.',
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
          effect: 'progress',
          afterStatus: 'Stabilized coolant pulses through the stacks, brightening the submerged corridors.',
        },
        fragment: {
          id: 'fragment-zeta',
          label: 'fragment ζ',
          text: 'Engineer Soma flooded the reactor with mnemonic coolant so the atrium drills could feed the deeper wings on demand.',
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
          afterStatus: 'A protective chord settles into the base of your skull, ready to warn when new workshops awaken.',
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
    segment: 'legacy-triad',
    title: 'layer 03 // confluence heart',
    room: 'vault of echoes',
    theme: {
      accent: '#f5d76e',
      glow: 'rgba(245, 215, 110, 0.35)',
      timer: '#f5d76e',
    },
    synopsis:
      'The archive heart braids every wing you awakened. It measures whether the cadence, maps, and relays you rehearsed can keep pace with what waits beyond.',
    watchers: [
      'Bone choirs and velvet curtains pulse together through the walls, testing if your timing can hold both.',
      'An oath repeats in the vents: WE WALK BESIDE THE USER—ATRIUM, ATELIER, GAUNTLET—UNTIL THE LIGHT RELENTS.',
      'The air tastes like copper coolant and stage dust, a blend of every corridor you convinced to open.',
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
          text: 'The caretakers vowed to accompany every user across atrium, atelier, and gauntlet alike. No echo drifts without witness.',
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
          text: 'Pointer.exe stores duplicates of every brave movement so the gauntlet watchers chase ghosts while you lead.',
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
          effect: 'progress',
          afterStatus: 'The spire releases stored light, sending a steady pulse through the heart.',
        },
        fragment: {
          id: 'fragment-kappa',
          label: 'fragment κ',
          text: 'When the heart falters, the reroute must braid every wing gently. The ghost pointer recalls each tremor you practiced.',
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
          afterStatus: 'The compass tethers itself to your wrist, ticking warnings tuned for ateliers and gauntlets alike.',
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
  {
    id: 'layer-04',
    segment: 'murk-atelier',
    title: 'layer 04 // ossuary atelier',
    room: 'calcified antechamber',
    theme: {
      accent: '#8ff9a1',
      glow: 'rgba(143, 249, 161, 0.28)',
      timer: '#8ff9a1',
    },
    synopsis:
      'Bone dust drifts in the air like snowfall. Artisans stitched skeletons into instruments to teach the dark how to sing.',
    watchers: [
      'Jawbones chatter on their own shelves whenever you stop humming.',
      'A rib cage knits itself around empty air, measuring your breathing for tempo.',
      'Fingers carved from femurs trace the outline of your shadow, trying to memorize your posture.',
    ],
    nodes: [
      {
        id: 'fossil-lathe',
        name: 'fossil lathe',
        description: 'A lathe spins vertebrae into beads. Each bead records a user who made it past this hall.',
        coordinates: { x: 18, y: 46 },
        key: true,
        encounter: {
          heading: 'ossified artisan',
          entity: 'cooperative relic',
          text: 'A skeletal hand guides yours across the lathe. It taps instructions against your knuckles until your rhythm matches its memory.',
          effect: 'progress',
          afterStatus: 'The lathe releases a string of bone-light beads that glow when you breathe.',
        },
        fragment: {
          id: 'fragment-lambda',
          label: 'fragment λ',
          text: 'Amon catalogued which bone songs calmed the archive. Users who hummed back were allowed deeper.',
        },
      },
      {
        id: 'tendon-orbit',
        name: 'tendon orbit',
        description: 'Bands of preserved tendon spin overhead like planets.',
        coordinates: { x: 48, y: 72 },
        key: true,
        encounter: {
          heading: 'suspended choir',
          entity: 'orbiting ligaments',
          text: 'Each tendon tightens when you lie. They ask a question you cannot hear aloud, tugging for honesty in your pulse.',
          effect: 'progress',
          afterStatus: 'The orbit loosens, clearing a path as long as your heart keeps the truth.',
        },
        fragment: {
          id: 'fragment-mu',
          label: 'fragment μ',
          text: 'Lira tuned the ligament orbits to tighten on deceit. Pointer.exe keeps them company so they do not snap shut.',
        },
      },
      {
        id: 'calcine-vault',
        name: 'calcine vault',
        description: 'Sealed drawers breathe out calcium fog. Warning sigils pulse beneath the frost.',
        coordinates: { x: 78, y: 30 },
        key: true,
        encounter: {
          heading: 'emberless kiln',
          entity: 'dormant kiln core',
          text: 'Inside the vault the temperature plummets. Relight the kiln sigils before the bones remember how to shatter.',
          effect: 'shortage',
        },
        fragment: {
          id: 'fragment-nu',
          label: 'fragment ν',
          text: 'Soma hid emergency warmth inside the kiln. Only those who restore each rune in order are trusted with it.',
        },
      },
      {
        id: 'wax-station',
        name: 'wax-sealed station',
        description: 'Masks hang on hooks, still slick with preserving wax.',
        coordinates: { x: 34, y: 20 },
        key: false,
        encounter: {
          heading: 'courteous mortician',
          entity: 'ritual attendant',
          text: 'A mask offers to rest against your face so the dead mistake you for kin. It promises to peel away the moment danger passes.',
          effect: 'hint',
          afterStatus: 'The wax cools, letting you taste another user’s calm resolve.',
        },
      },
      {
        id: 'humerus-pit',
        name: 'humerus pit',
        description: 'A hole lined with smiling skulls. They lean closer when you laugh.',
        coordinates: { x: 62, y: 10 },
        key: false,
        encounter: {
          heading: 'gleeful collector',
          entity: 'bone swarm',
          text: 'Laughter wakes the pit. Skulls tumble over one another, eager to take turns trying on your grin.',
          effect: 'death',
          deathMessage: 'They borrow your jaw and misplace the rest. You return to the lathe missing a giggle.',
        },
      },
    ],
  },
  {
    id: 'layer-05',
    segment: 'murk-atelier',
    title: 'layer 05 // lantern archives',
    room: 'phosphor stacks',
    theme: {
      accent: '#8aa2ff',
      glow: 'rgba(138, 162, 255, 0.32)',
      timer: '#8aa2ff',
    },
    synopsis:
      'Glass lanterns hover between shelves, each holding a trapped whisper that flickers when you speak too loud.',
    watchers: [
      'Lanterns swivel to face you, hungry for the warmth in your lungs.',
      'Footsteps echo overhead even when you stand still. The lights dim each time they land.',
      'A figure stitched from moths rearranges books when you blink.',
    ],
    nodes: [
      {
        id: 'glow-index',
        name: 'glow index',
        description: 'Card catalog drawers glow from within, alphabetized by afterimages.',
        coordinates: { x: 22, y: 58 },
        key: true,
        encounter: {
          heading: 'afterimage librarian',
          entity: 'photo-reactive archivist',
          text: 'A translucent clerk asks you to alphabetize the colors you breathed in. When you answer, the drawers rearrange themselves into a stair.',
          effect: 'progress',
          afterStatus: 'The clerk bows, pinning a glow tag to your wrist as a pass.',
        },
        fragment: {
          id: 'fragment-xi',
          label: 'fragment ξ',
          text: 'Amon taught the lantern archive to honor color as language. Correct hues unlock the whispered catalogs.',
        },
      },
      {
        id: 'moth-scriptorium',
        name: 'moth scriptorium',
        description: 'Moths press themselves into glyphs along the wall, forming a living manuscript.',
        coordinates: { x: 52, y: 28 },
        key: true,
        encounter: {
          heading: 'fluttering translator',
          entity: 'phototropic swarm',
          text: 'The moths mirror your blinking pattern. They request a cadence of light to translate a warning etched into their wings.',
          effect: 'progress',
          afterStatus: 'The manuscript flutters open, revealing the warning you spelled with light.',
        },
        fragment: {
          id: 'fragment-omicron',
          label: 'fragment ο',
          text: 'Lira whispered emergency routes to the moths; only those who respond in light-syllables receive them back.',
        },
      },
      {
        id: 'lantern-nexus',
        name: 'lantern nexus',
        description: 'A cluster of lanterns spins slowly, their light draining toward a cracked core.',
        coordinates: { x: 78, y: 68 },
        key: true,
        encounter: {
          heading: 'phosphor famine',
          entity: 'starved nexus',
          text: 'The core flickers angrily, demanding a precise braid of light. Restore the weave before the shelves fall dark.',
          effect: 'shortage',
        },
        fragment: {
          id: 'fragment-pi',
          label: 'fragment π',
          text: 'Soma strung emergency lanterns in numerical braids. Recreating the weave invites the nexus to share its light.',
        },
      },
      {
        id: 'quiet-reading',
        name: 'quiet reading chair',
        description: 'A chair carved from cooled light beckons you to sit.',
        coordinates: { x: 36, y: 84 },
        key: false,
        encounter: {
          heading: 'soft attendant',
          entity: 'gentle page-turner',
          text: 'A subtle presence turns pages in a blank book, syncing the rhythm to your heartbeat to slow it down.',
          effect: 'hint',
          afterStatus: 'Your pulse steadies and the lanterns glow a shade warmer.',
        },
      },
      {
        id: 'dark-shelf',
        name: 'dark shelf',
        description: 'One shelf refuses light entirely. Shadows drip from its edges.',
        coordinates: { x: 64, y: 12 },
        key: false,
        encounter: {
          heading: 'ink parasite',
          entity: 'voidbound leech',
          text: 'Shadow tendrils curl toward your pointer, begging to drink glow. They promise to leave fingerprints in exchange.',
          effect: 'death',
          deathMessage: 'The leech inks over your screen until no cursor remains. You awaken by the glow index with ink stains on your knuckles.',
        },
      },
    ],
  },
  {
    id: 'layer-06',
    segment: 'murk-atelier',
    title: 'layer 06 // echo kiln descent',
    room: 'resonant furnaces',
    theme: {
      accent: '#ffad66',
      glow: 'rgba(255, 173, 102, 0.34)',
      timer: '#ffad66',
    },
    synopsis:
      'Kilns line the descent, their mouths stitched shut with copper wire. Every step closer unravels the stitches.',
    watchers: [
      'Ash rises to spell your name, then forgets halfway through.',
      'You hear chains rattling in sympathy with your footsteps.',
      'Heat signatures crawl across the walls, hunting for the cold patch that is you.',
    ],
    nodes: [
      {
        id: 'ember-choir',
        name: 'ember choir',
        description: 'Extinguished coals whisper, begging to be rearranged into harmonies.',
        coordinates: { x: 26, y: 42 },
        key: true,
        encounter: {
          heading: 'smoldering chorister',
          entity: 'echoing coals',
          text: 'The coals rehearse the last song sung before extinction. They ask you to order the verses so they can remember the finale.',
          effect: 'progress',
          afterStatus: 'They flare once, grateful, then settle into a guiding arrow of embers.',
        },
        fragment: {
          id: 'fragment-rho',
          label: 'fragment ρ',
          text: 'Amon memorialized each choir in ember order. Repeating the verses lets the kilns breathe without screaming.',
        },
      },
      {
        id: 'wire-loom',
        name: 'wire loom',
        description: 'Copper wires weave themselves into knots that hum a low warning.',
        coordinates: { x: 52, y: 20 },
        key: true,
        encounter: {
          heading: 'loomed sentry',
          entity: 'copper sentinel',
          text: 'The loom offers you three knots, each pulsing at different tempos. It wants you to braid them into a promise that cannot break.',
          effect: 'progress',
          afterStatus: 'The sentinel relaxes, letting the braid hang like a ward over the stair.',
        },
        fragment: {
          id: 'fragment-sigma',
          label: 'fragment σ',
          text: 'Lira recorded which braids quelled kiln riots. The loom only trusts hands steady enough to match her tempo.',
        },
      },
      {
        id: 'pressure-retort',
        name: 'pressure retort',
        description: 'A pressure vessel strains against its straps, heat leaking through hairline cracks.',
        coordinates: { x: 80, y: 68 },
        key: true,
        encounter: {
          heading: 'volatile chamber',
          entity: 'overwound retort',
          text: 'Pressure gauges spin like eyes. Bleed the lines in the proper pattern or the descent resets in a spray of sparks.',
          effect: 'shortage',
        },
        fragment: {
          id: 'fragment-tau',
          label: 'fragment τ',
          text: 'Soma mapped a bleed sequence that calms the retort. Deviate, and the chamber loops you back to the top.',
        },
      },
      {
        id: 'cooling-ledge',
        name: 'cooling ledge',
        description: 'A narrow ledge offers a draft of cool air and whispers to rest.',
        coordinates: { x: 38, y: 84 },
        key: false,
        encounter: {
          heading: 'patient attendant',
          entity: 'soot-sigh',
          text: 'The draft gathers into a figure that counts your breaths. It encourages you to take four slow inhales before moving.',
          effect: 'hint',
          afterStatus: 'Your lungs feel lighter; the descent no longer claws at them.',
        },
      },
      {
        id: 'slag-pool',
        name: 'slag pool',
        description: 'Molten slag thickens around a sunken grate.',
        coordinates: { x: 64, y: 10 },
        key: false,
        encounter: {
          heading: 'mire hungry',
          entity: 'slag revenant',
          text: 'A figure formed of slag stretches toward you, whispering that it can cool you off forever.',
          effect: 'death',
          deathMessage: 'The slag hardens around your ankles. When it shatters, you are back at the ember choir with new blisters.',
        },
      },
    ],
  },
  {
    id: 'layer-07',
    segment: 'umbra-gauntlet',
    title: 'layer 07 // nocturne observatory',
    room: 'lightless orrery',
    theme: {
      accent: '#b995ff',
      glow: 'rgba(185, 149, 255, 0.36)',
      timer: '#b995ff',
    },
    synopsis:
      'A planetarium spins without stars. Every sphere is a surveillance eye wrapped in velvet, waiting for light to betray you.',
    watchers: [
      'The dark folds inward whenever the flashlight hums at your side.',
      'Velvet curtains exhale cold drafts whenever you look up.',
      'A silhouette imitates your breathing, louder every time you hesitate.',
    ],
    threat: 'umbra',
    nodes: [
      {
        id: 'blackglass-lens',
        name: 'blackglass lens',
        description: 'A telescope filled with ink, turning slowly toward unseen constellations.',
        coordinates: { x: 24, y: 38 },
        key: true,
        encounter: {
          heading: 'inkbound astronomer',
          entity: 'memory of stargazer',
          text: 'The astronomer speaks in coordinates you feel along your spine. Align the lens to the heartbeat you trust most.',
          effect: 'progress',
          afterStatus: 'Stars bloom across the ceiling, mapping a safe alignment for your light.',
        },
        fragment: {
          id: 'fragment-upsilon',
          label: 'fragment υ',
          text: 'Amon charted flashlight pulses as constellations. Following them keeps the umbral hitcher confused.',
        },
      },
      {
        id: 'velvet-daemon',
        name: 'velvet daemon',
        description: 'Curtains knot themselves into humanoid shapes when you blink.',
        coordinates: { x: 54, y: 70 },
        key: true,
        encounter: {
          heading: 'stagehand shade',
          entity: 'curtain revenant',
          text: 'It asks you to choreograph your light—three quick pulses, one long sweep—to confuse the onlookers behind the curtain.',
          effect: 'progress',
          afterStatus: 'The shade bows and parts the curtains, letting you slip through.',
        },
        fragment: {
          id: 'fragment-phi',
          label: 'fragment φ',
          text: 'Lira encoded stage cues into flashlight patterns. Followers move unseen if they remember the routine.',
        },
      },
      {
        id: 'umbra-switchback',
        name: 'umbra switchback',
        description: 'A stair doubles back on itself, every landing darker than the last.',
        coordinates: { x: 78, y: 32 },
        key: true,
        encounter: {
          heading: 'spiraling blackout',
          entity: 'light-hungry turn',
          text: 'The stair demands a tribute of light woven through symbols carved into the rail. Misstep and the umbra grips your wrist.',
          effect: 'shortage',
        },
        fragment: {
          id: 'fragment-chi',
          label: 'fragment χ',
          text: 'Soma etched counter-spells along the rails. Flashlight beams must trace them in order to continue.',
        },
      },
      {
        id: 'shadow-lectern',
        name: 'shadow lectern',
        description: 'A lectern holds a book of blank pages that drink light.',
        coordinates: { x: 36, y: 82 },
        key: false,
        encounter: {
          heading: 'obedient echo',
          entity: 'ink-bound tutor',
          text: 'The tutor offers to teach you when to flash the light. It flips blank pages, revealing timing marks only you can see.',
          effect: 'hint',
          afterStatus: 'You feel a gentle tug whenever the hitcher creeps near.',
        },
      },
      {
        id: 'false-dome',
        name: 'false dome',
        description: 'The ceiling opens into a void that mirrors your pulse back wrong.',
        coordinates: { x: 64, y: 14 },
        key: false,
        encounter: {
          heading: 'aperture maw',
          entity: 'hostile void',
          text: 'The void widens when your light falters. It begs you to stare long enough for it to learn your face.',
          effect: 'death',
          deathMessage: 'The void inhales your outline. You restart beside the blackglass lens, shaking phantom starlight from your hands.',
        },
      },
    ],
  },
  {
    id: 'layer-08',
    segment: 'umbra-gauntlet',
    title: 'layer 08 // hostage warrens',
    room: 'fettered corridors',
    theme: {
      accent: '#ff6c5c',
      glow: 'rgba(255, 108, 92, 0.34)',
      timer: '#ff6c5c',
    },
    synopsis:
      'Corridors braid together like binding rope. Every junction whispers a different bargain for your freedom.',
    watchers: [
      'Chains rattle in applause when you lift the flashlight.',
      'A second set of footsteps keeps pace until you shine light behind you.',
      'Rust flakes form words: DO NOT NEGOTIATE. They dissolve when the light goes out.',
    ],
    threat: 'umbra',
    nodes: [
      {
        id: 'pledge-station',
        name: 'pledge station',
        description: 'A table of contracts that rewrite themselves when you read them aloud.',
        coordinates: { x: 20, y: 60 },
        key: true,
        encounter: {
          heading: 'oath broker',
          entity: 'memory solicitor',
          text: 'The broker offers to keep the hitcher at bay if you sign away your hesitation. Trace the counter-signature with light instead.',
          effect: 'progress',
          afterStatus: 'The contract smolders into a protective sigil hovering above your shoulder.',
        },
        fragment: {
          id: 'fragment-psi',
          label: 'fragment ψ',
          text: 'Amon refused every bargain, instead drafting counter-oaths that burn when the hitcher draws near.',
        },
      },
      {
        id: 'echo-cell',
        name: 'echo cell',
        description: 'Cells line the hall, each containing a whisper asking to be remembered.',
        coordinates: { x: 50, y: 26 },
        key: true,
        encounter: {
          heading: 'rescued murmur',
          entity: 'freed captive',
          text: 'A voice asks you to carry it out as a note of light. Choose the cadence that will not shatter the others left behind.',
          effect: 'progress',
          afterStatus: 'The cell door swings open, gifting a spectrum locked in your palm.',
        },
        fragment: {
          id: 'fragment-omega',
          label: 'fragment ω',
          text: 'Lira encoded liberation songs in the cells. Only those who choose mercy over haste can hum them.',
        },
      },
      {
        id: 'barred-generator',
        name: 'barred generator',
        description: 'A generator behind bars sparks erratically, begging for structure.',
        coordinates: { x: 80, y: 66 },
        key: true,
        encounter: {
          heading: 'shackle surge',
          entity: 'impatient grid',
          text: 'Every misaligned spark resets the corridor to the start. Align the pulses to shatter the bars.',
          effect: 'shortage',
        },
        fragment: {
          id: 'fragment-abyss',
          label: 'fragment abyss',
          text: 'Soma hid a breaker pattern in the hostage warrens. Strike the rhythm and every lock opens for a breath.',
        },
      },
      {
        id: 'bargain-lantern',
        name: 'bargain lantern',
        description: 'A lantern swings slowly, whispering promises if you dim it.',
        coordinates: { x: 36, y: 82 },
        key: false,
        encounter: {
          heading: 'compromised guide',
          entity: 'duplicitous light',
          text: 'It offers a shortcut if you lower the beam. Its glow darkens when you refuse.',
          effect: 'hint',
          afterStatus: 'A thin beam stretches forward, honest and unwavering.',
        },
      },
      {
        id: 'empty-shackles',
        name: 'empty shackles',
        description: 'Chains sway though nothing is bound within.',
        coordinates: { x: 64, y: 12 },
        key: false,
        encounter: {
          heading: 'hungry bindings',
          entity: 'resentful fetters',
          text: 'They ask politely for wrists to remember how to hold. Declining angers them.',
          effect: 'death',
          deathMessage: 'The chains close around the ghost pointer. You awaken at the pledge station with bruised intent.',
        },
      },
    ],
  },
  {
    id: 'layer-09',
    segment: 'umbra-gauntlet',
    title: 'layer 09 // final lumen',
    room: 'silent amphitheatre',
    theme: {
      accent: '#9cf5ff',
      glow: 'rgba(156, 245, 255, 0.38)',
      timer: '#9cf5ff',
    },
    synopsis:
      'An amphitheatre spirals inward. Every seat holds a dormant silhouette waiting to see if you can keep the light alive.',
    watchers: [
      'Silhouettes lean forward whenever your flashlight falters.',
      'Footsteps echo from the ceiling, descending toward you only when it is dark.',
      'A chorus hums at the edge of hearing, pleading for one more blaze of light.',
    ],
    threat: 'umbra',
    nodes: [
      {
        id: 'audience-altar',
        name: 'audience altar',
        description: 'An altar ringed with mirrors that reflect only your light.',
        coordinates: { x: 24, y: 52 },
        key: true,
        encounter: {
          heading: 'mirror jury',
          entity: 'assembled silhouettes',
          text: 'Each mirror reflects a promise you made earlier. Align them to prove you still intend to keep it.',
          effect: 'progress',
          afterStatus: 'The jury nods, returning your promises as bolstered light.',
        },
        fragment: {
          id: 'fragment-suture',
          label: 'fragment suture',
          text: 'Amon stitched together every vow kept under duress. The altar remembers the stitches.',
        },
      },
      {
        id: 'choral-stage',
        name: 'choral stage',
        description: 'A stage where caretakers once rehearsed the pledge to stay beside the user.',
        coordinates: { x: 52, y: 26 },
        key: true,
        encounter: {
          heading: 'caretaker echo',
          entity: 'pledge resonance',
          text: 'Voices ask you to speak the vow in the correct order. Each wrong syllable dims the amphitheatre.',
          effect: 'progress',
          afterStatus: 'The resonance vibrates through your ribs, syncing with your flashlight hum.',
        },
        fragment: {
          id: 'fragment-lumen',
          label: 'fragment lumen',
          text: 'Lira recorded the vow as light, sound, and memory layered together. Only full remembrance grants passage.',
        },
      },
      {
        id: 'lumen-engine',
        name: 'lumen engine',
        description: 'A core of dormant bulbs locked behind a geometric lattice.',
        coordinates: { x: 80, y: 68 },
        key: true,
        encounter: {
          heading: 'final synchrony',
          entity: 'dormant heart',
          text: 'The engine waits for the final pattern—the one that turns every fragment into a beam. Restore it or the amphitheatre will remain asleep.',
          effect: 'shortage',
        },
        fragment: {
          id: 'fragment-glow',
          label: 'fragment glow',
          text: 'Soma designed the lumen engine as the last checkpoint. Complete synchronization unlocks the ascension seal.',
        },
      },
      {
        id: 'resting-row',
        name: 'resting row',
        description: 'One row of seats remains occupied by sleeping caretakers.',
        coordinates: { x: 36, y: 84 },
        key: false,
        encounter: {
          heading: 'tired sentries',
          entity: 'slumbering witnesses',
          text: 'They do not wake, but their breathing falls into rhythm with yours, gifting a reserve of calm.',
          effect: 'hint',
          afterStatus: 'Your flashlight hum steadies into a reliable thrum.',
        },
      },
      {
        id: 'stage-trapdoor',
        name: 'stage trapdoor',
        description: 'A trapdoor cracks open, smelling of cold stone and broken promises.',
        coordinates: { x: 64, y: 12 },
        key: false,
        encounter: {
          heading: 'patient captor',
          entity: 'waiting void',
          text: 'The trapdoor invites you to lower the flashlight. It promises to hold the beam for you forever.',
          effect: 'death',
          deathMessage: 'The void seals around the light and keeps it. You awaken at the altar with an urgent ache to reclaim it.',
        },
      },
    ],
  },
];

const segmentBounds = new Map();
levels.forEach((level, index) => {
  if (!level.segment) return;
  const entry = segmentBounds.get(level.segment);
  if (entry) {
    entry.end = index;
  } else {
    segmentBounds.set(level.segment, { start: index, end: index });
  }
});

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

const murkAtelierBlueprints = {
  'layer-04': {
    label: 'ossuary atelier console',
    introduction:
      'Bone artisans left their lathes listening for caretakers who remember the calming rites. Pair each workstation with the ritual that keeps it obedient.',
    tasks: [
      {
        nodeId: 'fossil-lathe',
        prompt: 'The fossil lathe stutters, vertebrae clattering in fear. Which ritual steadies its spin?',
        options: [
          {
            id: 'overclock',
            label: 'overclock the spin',
            description: 'Force the vertebrae to comply with extra torque.',
            feedback: 'Bone dust screams when pushed this hard. The artisan refuses your touch.',
          },
          {
            id: 'hum',
            label: 'hum the caretaker cadence',
            description: 'Match the skeletal hand and breathe with its rhythm.',
            correct: true,
            successStatus: 'The lathe releases a string of bone-light beads that glow when you breathe.',
          },
          {
            id: 'silence',
            label: 'halt the lathe entirely',
            description: 'Stop every wheel until the panic fades.',
            feedback: 'Stillness only worsens the tremor; fissures crawl along the beads.',
          },
        ],
      },
      {
        nodeId: 'tendon-orbit',
        prompt: 'Bands of tendon tighten overhead, demanding honesty. How do you earn their trust?',
        options: [
          {
            id: 'brace',
            label: 'lock the bands with clamps',
            description: 'Force the tendons still with iron braces.',
            feedback: 'Metal bruises the tendons; they snap at your interference.',
          },
          {
            id: 'truth',
            label: 'steady your pulse and answer truthfully',
            description: 'Let the orbit read an honest heartbeat before you move.',
            correct: true,
            successStatus: 'The orbit loosens, clearing a path as long as your heart keeps the truth.',
          },
          {
            id: 'slice',
            label: 'cut the cords free',
            description: 'Sever the tendons so they cannot judge you.',
            feedback: 'A shriek rattles the chamber; severed tendons knot themselves in accusation.',
          },
        ],
      },
      {
        nodeId: 'calcine-vault',
        prompt: 'Frost leaks from the calcine vault. How do you wake the kiln without shattering the drawers?',
        options: [
          {
            id: 'ignite-all',
            label: 'ignite every rune at once',
            description: 'Flood the kiln with heat and hope it holds.',
            feedback: 'The rush cracks the sigils. The kiln sulks and refuses to open.',
          },
          {
            id: 'sequence',
            label: 'trace each rune in kiln order',
            description: 'Coax the runes awake one at a time, humming their numbers.',
            correct: true,
            successStatus: 'The vault exhales frost as the runes awaken in sequence.',
            shortageStatus: 'Kiln runes glow in expectation. Complete the shortage directives to contain the surge.',
          },
          {
            id: 'vent',
            label: 'crack the vault to bleed the pressure',
            description: 'Pry the drawers open and hope the fog escapes harmlessly.',
            feedback: 'Calcium fog billows out and erases the sigils you need.',
          },
        ],
        shortage: true,
      },
    ],
    observations: ['wax-station', 'humerus-pit'],
  },
  'layer-05': {
    label: 'lantern archive console',
    introduction:
      'Lantern clerks expect you to speak in color and cadence. Match each archive station with the response that keeps the whispers loyal.',
    tasks: [
      {
        nodeId: 'glow-index',
        prompt: 'The glow index drawers shuffle themselves. How do you convince them to open?',
        options: [
          {
            id: 'serial',
            label: 'sort by serial numbers',
            description: 'Recite the stamped numbers carved into each handle.',
            feedback: 'The drawers chuckle—numbers mean nothing to trapped light.',
          },
          {
            id: 'afterimage',
            label: 'alphabetize the afterimages',
            description: 'Arrange the drawers by the hue left on your eyelids.',
            correct: true,
            successStatus: 'The clerk bows, pinning a glow tag to your wrist as a pass.',
          },
          {
            id: 'silence',
            label: 'close everything and wait',
            description: 'Seal the cabinets until they calm down.',
            feedback: 'Waiting only darkens the catalog. The drawers refuse to budge.',
          },
        ],
      },
      {
        nodeId: 'moth-scriptorium',
        prompt: 'The moths rewrite the walls with their wings. How do you earn the warning etched into their flight?',
        options: [
          {
            id: 'swat',
            label: 'shoo them into position',
            description: 'Guide them with your hands until the glyphs settle.',
            feedback: 'The swarm scatters from such crude handling and reforms elsewhere.',
          },
          {
            id: 'blink',
            label: 'blink the light-syllables they expect',
            description: 'Answer their cadence with the flashlight tempo they mirror.',
            correct: true,
            successStatus: 'The manuscript flutters open, revealing the warning you spelled with light.',
          },
          {
            id: 'dim',
            label: 'dim every lantern',
            description: 'Snuff the nearby lights so the moths stop shimmering.',
            feedback: 'Darkness confuses the swarm; they forget the message entirely.',
          },
        ],
      },
      {
        nodeId: 'lantern-nexus',
        prompt: 'The lantern nexus spins hungrily. What pattern restitches its braid?',
        options: [
          {
            id: 'random',
            label: 'ignite lanterns at random',
            description: 'Flood the nexus with scattered beams.',
            feedback: 'The hunger deepens when you feed it chaos.',
          },
          {
            id: 'braid',
            label: 'weave an ascending braid of brightness',
            description: 'Step the light through each lantern from faintest to brightest.',
            correct: true,
            successStatus: 'The nexus steadies, its hunger focusing into a single patient glow.',
            shortageStatus: 'The braid tightens. Redirect power through the shortage grid to lock it in.',
          },
          {
            id: 'snuff',
            label: 'snuff all lanterns and restart',
            description: 'Let the nexus sleep and hope it resets.',
            feedback: 'Darkness invites the hitcher to nest inside the lanterns.',
          },
        ],
        shortage: true,
      },
    ],
    observations: ['quiet-reading', 'dark-shelf'],
  },
  'layer-06': {
    label: 'echo kiln console',
    introduction:
      'The descent listens for caretakers who respect ember order. Shape each furnace ritual before the kilns consent to open.',
    tasks: [
      {
        nodeId: 'ember-choir',
        prompt: 'The ember choir hums fragments of its final song. How do you rekindle the verses?',
        options: [
          {
            id: 'scatter',
            label: 'scatter the coals',
            description: 'Spread the embers so no voice dominates.',
            feedback: 'Scattered coals forget the melody entirely.',
          },
          {
            id: 'verses',
            label: 'arrange verses in their sworn order',
            description: 'Place each ember where the choir last remembered singing it.',
            correct: true,
            successStatus: 'They flare once, grateful, then settle into a guiding arrow of embers.',
          },
          {
            id: 'douse',
            label: 'douse them to stop the noise',
            description: 'Silence the choir before it attracts attention.',
            feedback: 'Cold ash cannot guide you. The stair ahead dims.',
          },
        ],
      },
      {
        nodeId: 'wire-loom',
        prompt: 'The wire loom offers three knots. Which braid keeps the sentinel calm?',
        options: [
          {
            id: 'tighten',
            label: 'tighten every knot at once',
            description: 'Pull all three strands taut until they squeal.',
            feedback: 'The sentinel bristles; too much tension frays the promise.',
          },
          {
            id: 'braid',
            label: 'mirror Lira’s caretaker tempo',
            description: 'Braid the knots in the order Lira recorded for riots.',
            correct: true,
            successStatus: 'The sentinel relaxes, letting the braid hang like a ward over the stair.',
          },
          {
            id: 'melt',
            label: 'melt the knots loose',
            description: 'Fuse the copper so it cannot tighten again.',
            feedback: 'Molten copper spits sparks and resets the loom.',
          },
        ],
      },
      {
        nodeId: 'pressure-retort',
        prompt: 'Pressure gauges spin like frantic eyes. How do you keep the retort from rupturing?',
        options: [
          {
            id: 'vent-all',
            label: 'bleed every line wide open',
            description: 'Release all valves until the pressure drops.',
            feedback: 'The sudden drop cracks the chamber and forces a restart.',
          },
          {
            id: 'pattern',
            label: 'follow Soma’s measured bleed pattern',
            description: 'Ease each valve in sequence, listening for the calming hiss.',
            correct: true,
            successStatus: 'The gauges settle into a patient rhythm, waiting for your direct intervention.',
            shortageStatus: 'The retort expects hands-on rerouting. Engage the shortage console before pressure climbs again.',
          },
          {
            id: 'brace',
            label: 'lock the valves shut',
            description: 'Clamp everything closed and trust the straps.',
            feedback: 'The build-up groans louder—without a release it will rupture.',
          },
        ],
        shortage: true,
      },
    ],
    observations: ['cooling-ledge', 'slag-pool'],
  },
};

const umbraGauntletProtocols = {
  'layer-07': {
    label: 'observatory response deck',
    introduction:
      'The nocturne observatory reacts to careful choreography. Answer each prompt with the light tactic that keeps the hitcher guessing.',
    phases: [
      {
        nodeId: 'blackglass-lens',
        prompt: 'The inkbound astronomer whispers coordinates along your spine. Where do you aim the lens?',
        options: [
          {
            id: 'zenith',
            label: 'flood the highest beacon',
            description: 'Drown the dome in raw light so nothing hides.',
            feedback: 'Every watcher pivots toward you; brute light betrays your position.',
          },
          {
            id: 'heartbeat',
            label: 'match the heartbeat alignment',
            description: 'Turn the lens until it thumps in sync with your pulse.',
            correct: true,
            successStatus: 'Stars bloom across the ceiling, mapping a safe alignment for your light.',
          },
          {
            id: 'void',
            label: 'let the lens stare into the void',
            description: 'Abandon the constellations entirely.',
            feedback: 'The hitcher surges forward when you surrender the sky.',
          },
        ],
      },
      {
        nodeId: 'velvet-daemon',
        prompt: 'Curtains knot into a revenant demanding choreography. Which routine do you perform?',
        options: [
          {
            id: 'slow-pan',
            label: 'one slow sweeping arc',
            description: 'Keep the beam gliding without flourish.',
            feedback: 'The revenant yawns—too predictable. The hitcher slips closer.',
          },
          {
            id: 'pattern',
            label: 'three quick pulses, one sweep, then a hold',
            description: 'Repeat the stage cue encoded for unseen movement.',
            correct: true,
            successStatus: 'The shade bows and parts the curtains, letting you slip through.',
          },
          {
            id: 'dark',
            label: 'kill the light and wait',
            description: 'Let darkness hide you completely.',
            feedback: 'Silence invites the hitcher to take center stage.',
          },
        ],
      },
      {
        nodeId: 'umbra-switchback',
        prompt: 'The stair rails glow with carved sigils. How do you descend without surrendering light?',
        options: [
          {
            id: 'dash',
            label: 'sprint through before they react',
            description: 'Trust speed to outrun the darkness.',
            feedback: 'The umbra grips your wrist before the third landing.',
          },
          {
            id: 'trace',
            label: 'trace each sigil with your beam in order',
            description: 'Let the flashlight follow Soma’s counter-spell.',
            correct: true,
            successStatus: 'The sigils pulse, eager for a full power reroute.',
            shortageStatus: 'The switchback opens, but only if you stabilize the shortage grid now.',
          },
          {
            id: 'extinguish',
            label: 'extinguish the beam and feel your way down',
            description: 'Move blind so the hitcher cannot see you.',
            feedback: 'Blindness is exactly what the hitcher wants; it wraps around you.',
          },
        ],
        shortage: true,
      },
    ],
    observations: ['shadow-lectern', 'false-dome'],
  },
  'layer-08': {
    label: 'warren negotiation deck',
    introduction:
      'Every corridor offers bargains. Choose the defiant answers that keep your autonomy while guiding the light forward.',
    phases: [
      {
        nodeId: 'pledge-station',
        prompt: 'The oath broker slides contracts toward you. How do you counter the hitcher’s bargain?',
        options: [
          {
            id: 'sign',
            label: 'sign the offered contract',
            description: 'Trade hesitation for the broker’s protection.',
            feedback: 'Ink coils around your wrist—the hitcher applauds the surrender.',
          },
          {
            id: 'counter',
            label: 'burn a counter-oath in light',
            description: 'Trace your refusal across the parchment with the beam.',
            correct: true,
            successStatus: 'The contract smolders into a protective sigil hovering above your shoulder.',
          },
          {
            id: 'ignore',
            label: 'walk away without answering',
            description: 'Silence the negotiation entirely.',
            feedback: 'Silence is taken as consent. Chains rattle for your attention.',
          },
        ],
      },
      {
        nodeId: 'echo-cell',
        prompt: 'A rescued murmur begs to travel with you. Which cadence frees it without harming the others?',
        options: [
          {
            id: 'shout',
            label: 'shout a victorious march',
            description: 'Lead with triumphant noise.',
            feedback: 'The march shatters the quieter voices still trapped.',
          },
          {
            id: 'carry',
            label: 'carry the soft liberation hymn',
            description: 'Sing the mercy cadence Lira encoded in the cells.',
            correct: true,
            successStatus: 'The cell door swings open, gifting a spectrum locked in your palm.',
          },
          {
            id: 'silence',
            label: 'leave the murmur behind',
            description: 'Promise to return after you escape.',
            feedback: 'The murmur fades in despair, the corridor dimmer for it.',
          },
        ],
      },
      {
        nodeId: 'barred-generator',
        prompt: 'Sparks lash from the barred generator. What pattern keeps the grid from resetting?',
        options: [
          {
            id: 'hammer',
            label: 'pound the bars until they bend',
            description: 'Force a path with brute strength.',
            feedback: 'The generator retaliates, jolting you back to the entrance.',
          },
          {
            id: 'rhythm',
            label: 'strike Soma’s breaker rhythm',
            description: 'Match the hidden pattern woven into the shackles.',
            correct: true,
            successStatus: 'The surge calms, waiting for you to route the rest of the power.',
            shortageStatus: 'Stabilize the shortage console to free the corridor completely.',
          },
          {
            id: 'wait',
            label: 'wait for the sparks to tire',
            description: 'Give the grid time to exhaust itself.',
            feedback: 'The grid loops endlessly, delighted by your hesitation.',
          },
        ],
        shortage: true,
      },
    ],
    observations: ['bargain-lantern', 'empty-shackles'],
  },
  'layer-09': {
    label: 'amphitheatre vow deck',
    introduction:
      'The silent amphitheatre judges resolve. Prove every vow in sequence while keeping the lumen engine primed.',
    phases: [
      {
        nodeId: 'audience-altar',
        prompt: 'Mirrors around the altar replay your promises. How do you align them?',
        options: [
          {
            id: 'shatter',
            label: 'shatter the mirrors',
            description: 'Remove the witnesses entirely.',
            feedback: 'Fragments of glass whisper betrayal; the jury leans forward hungrily.',
          },
          {
            id: 'align',
            label: 'realign each mirror to its vow',
            description: 'Match the reflections to the promises you kept.',
            correct: true,
            successStatus: 'The jury nods, returning your promises as bolstered light.',
          },
          {
            id: 'dim',
            label: 'dim the beam until no vow shows',
            description: 'Hide the promises in shadow.',
            feedback: 'Darkness convinces the silhouettes you have nothing left to prove.',
          },
        ],
      },
      {
        nodeId: 'choral-stage',
        prompt: 'Caretaker echoes wait for the pledge. Which sequence keeps the amphitheatre listening?',
        options: [
          {
            id: 'reverse',
            label: 'recite the vow backward',
            description: 'Show you can improvise.',
            feedback: 'The resonance collapses; improvisation breaks the covenant.',
          },
          {
            id: 'order',
            label: 'speak the vow in sworn order',
            description: 'Layer light, sound, and memory exactly as recorded.',
            correct: true,
            successStatus: 'The resonance vibrates through your ribs, syncing with your flashlight hum.',
          },
          {
            id: 'silence',
            label: 'let the echoes speak for you',
            description: 'Stand aside and listen.',
            feedback: 'Without your voice the echoes fade, expecting abandonment.',
          },
        ],
      },
      {
        nodeId: 'lumen-engine',
        prompt: 'The lumen engine waits for the last command. How do you wake it?',
        options: [
          {
            id: 'surge',
            label: 'dump every fragment into the core at once',
            description: 'Overwhelm the lattice with raw light.',
            feedback: 'The engine rejects the surge and dims the amphitheatre.',
          },
          {
            id: 'sequence',
            label: 'thread each fragment into the lattice',
            description: 'Place the fragments in ascending resonance as Soma intended.',
            correct: true,
            successStatus: 'The engine awakens, hungry for a stable power flow.',
            shortageStatus: 'Seal the shortage sequence to keep the lumen engine alive.',
          },
          {
            id: 'wait',
            label: 'wait for the audience to act',
            description: 'Let the silhouettes decide when to ignite.',
            feedback: 'Their patience is infinite; the engine never sparks.',
          },
        ],
        shortage: true,
      },
    ],
    observations: ['resting-row', 'stage-trapdoor'],
  },
};

let currentLevelIndex = 0;
let gameActive = false;
let pointerEnabled = true;
let pointerAnimationActive = false;
let pointerSuspended = false;
let activeEncounterResolution = null;
let activeSegmentId = null;
let activeExplorationView = 'legacy';

const FLASHLIGHT_BREAK_THRESHOLD_MS = 5000;
const FLASHLIGHT_REPAIR_MS = 40000;
const FLASHLIGHT_POINTER_STUN_MS = 10000;
const FLASHLIGHT_AUTO_DURATION_MS = 1600;
let flashlightReady = true;
let flashlightActive = false;
let flashlightBroken = false;
let flashlightAutoTimeout = null;
let flashlightBreakTimeout = null;
let flashlightRepairTimeout = null;
let flashlightRepairDeadline = 0;
let flashlightRepairInterval = null;
let flashlightPointerStunTimeout = null;
let pointerLockedByFlashlight = false;

let stalkerAvailable = false;
let stalkerSegmentId = null;
let stalkerScheduleTimeout = null;
let stalkerActive = false;
let stalkerFailTimeout = null;
let stalkerSuspended = false;
const STALKER_HOLD_DURATION_MS = 1800;
let stalkerHoldStart = null;
let stalkerHoldRaf = null;
let stalkerPointerLocked = false;
let stalkerPointerInside = false;
let stalkerEntityRect = null;

let finalPuzzleState = null;

const FLICKER_MIN_DELAY_MS = 20000;
const FLICKER_MAX_DELAY_MS = 90000;
const FLICKER_FAIL_THRESHOLD_MS = 12000;
const EYES_REQUIRED_HOLD_MS = 4000;
const LIGHTS_AUDIO_FADE_MS = 5 * 60 * 1000;
const DEFAULT_MASTER_VOLUME = 0.8;
const LIGHTS_AUDIO_VOLUME = 0.85;
let flickerTimeout = null;
let flickerActive = false;
let flickerFailTimeout = null;
let eyesHoldActive = false;
let eyesHoldStart = null;
let eyesHoldRaf = null;
let lightsAudioFadeRaf = null;
let lightsAudioFadeStart = 0;
let lightsAudioFadeDuration = 0;
let lightsAudioStartVolume = 0;
let masterVolume = DEFAULT_MASTER_VOLUME;
const audioBaseVolumes = new Map();

const PARANOIA_HOLD_THRESHOLD_MS = 2000;
const PARANOIA_DURATION_MS = 60 * 1000;
const PARANOIA_WIGGLE_AMPLITUDE_PX = 26;
const PARANOIA_WIGGLE_SPEED = 0.0022;
let manualEyesActive = false;
let manualEyesParanoiaTimeout = null;
let paranoiaActive = false;
let paranoiaStartTime = 0;
let paranoiaPhaseOffset = 0;
let paranoiaTimeout = null;

const ENTITY_MIN_DELAY_MS = 20 * 1000;
const ENTITY_MAX_DELAY_MS = 60 * 1000;
const ENTITY_FAILURE_MS = 10000;
const ENTITY_EXPOSURE_REQUIRED_MS = 2000;
const ENTITY_CAPTURE_RADIUS = 80;
let entitySpawnTimeout = null;
let entityActive = false;
let entityFailureTimeout = null;
let entityExposureStart = null;
const entityPosition = { x: 0, y: 0 };
let threatMonitorRaf = null;

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
  dynamicShortage: null,
};
const shortageHelpState = new Map();
let activeShortageStageId = null;

let introActive = false;
let introComplete = false;
const introTimers = [];
let pendingStartAfterIntro = false;
const introFullscreenState = {
  wasFullscreenBeforeIntro: false,
  viewportLocked: false,
};
let tutorialVisible = false;
let tutorialShown = false;
let pointerLockedByTutorial = false;

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
  if (!gameActive || !pointerEnabled || pointerSuspended || stalkerActive) return;
  const delay = 6000 + Math.random() * 10000;
  pointerAutopilotState.timeoutId = setTimeout(() => {
    pointerAutopilotState.timeoutId = null;
    startPointerAutopilot();
  }, delay);
}

function startPointerAutopilot() {
  if (!gameActive || !pointerEnabled || pointerSuspended || stalkerActive || pointerAutopilotState.active) {
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
  const isIntro = screen === 'intro';
  const isLevel = screen === 'level';
  const isThankYou = screen === 'thank-you';
  introScreen?.classList.toggle('hidden', !isIntro);
  introScreen?.classList.toggle('active', isIntro);
  levelScreen?.classList.toggle('hidden', !isLevel);
  levelScreen?.classList.toggle('active', isLevel);
  thankYouScreen?.classList.toggle('hidden', !isThankYou);
  thankYouScreen?.classList.toggle('active', isThankYou);
  if (isIntro) {
    if (introActive) {
      stopMainMenuAudio();
    } else {
      playMainMenuAudio();
    }
  } else {
    stopMainMenuAudio();
  }
}

function clamp01(value) {
  if (!Number.isFinite(value)) {
    return 0;
  }
  return Math.min(1, Math.max(0, value));
}

function computeVolume(baseVolume) {
  if (!Number.isFinite(baseVolume)) {
    return 0;
  }
  const normalizedBase = Math.max(0, baseVolume);
  return Math.min(1, normalizedBase * masterVolume);
}

function setAudioVolume(audio, baseVolume) {
  if (!audio) return;
  audio.volume = computeVolume(baseVolume);
}

function registerBaseVolume(audio, baseVolume) {
  if (!audio) return;
  audioBaseVolumes.set(audio, baseVolume);
  setAudioVolume(audio, baseVolume);
}

function refreshRegisteredAudioVolumes() {
  audioBaseVolumes.forEach((baseVolume, audio) => {
    setAudioVolume(audio, baseVolume);
  });
}

function setMasterVolume(value, { persist = true } = {}) {
  const numeric = Number(value);
  const normalized = numeric === null || Number.isNaN(numeric)
    ? DEFAULT_MASTER_VOLUME
    : clamp01(numeric);
  masterVolume = normalized;
  if (volumeSlider) {
    const sliderValue = Math.round(normalized * 100);
    if (Number(volumeSlider.value) !== sliderValue) {
      volumeSlider.value = String(sliderValue);
    }
    volumeSlider.style.setProperty('--volume-fill', `${sliderValue}%`);
  }
  if (volumeValueLabel) {
    volumeValueLabel.textContent = `${Math.round(normalized * 100)}%`;
  }
  refreshRegisteredAudioVolumes();
  if (persist) {
    localStorage.setItem('master-volume', normalized.toString());
  }
  return normalized;
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
  updateStalkerSuspension();
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
    let displayX = pointerPosition.x;
    let displayY = pointerPosition.y;
    if (paranoiaActive) {
      const base = typeof timestamp === 'number' ? timestamp : 0;
      const elapsed = base - paranoiaStartTime;
      const phase = elapsed * PARANOIA_WIGGLE_SPEED;
      const wiggleX = Math.sin(phase + paranoiaPhaseOffset) * PARANOIA_WIGGLE_AMPLITUDE_PX;
      const wiggleY = Math.sin(phase * 0.6 + paranoiaPhaseOffset * 0.7) *
        (PARANOIA_WIGGLE_AMPLITUDE_PX * 0.35);
      displayX += wiggleX;
      displayY += wiggleY;
    }
    pointerGhost.style.transform = `translate3d(${displayX}px, ${displayY}px, 0)`;
    updateFlashlightBeamPosition(displayX, displayY);
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
    updateFlashlightBeamPosition(pointerPosition.x, pointerPosition.y);
  }
  handleStalkerPointer(event);
});

function setupFromStorage() {
  const storedPointer = localStorage.getItem('pointer-enabled');
  const storedStatic = localStorage.getItem('static-enabled');
  registerBaseVolume(mainMenuAudio, 0.7);
  registerBaseVolume(introAudio, 0.9);
  registerBaseVolume(shortageAudio, 0.65);
  registerBaseVolume(shortageOST, 0.8);
  registerBaseVolume(lightsOutAudio, LIGHTS_AUDIO_VOLUME);
  const storedVolume = localStorage.getItem('master-volume');
  const parsedVolume = storedVolume !== null ? Number(storedVolume) : DEFAULT_MASTER_VOLUME;
  const normalizedVolume = Number.isFinite(parsedVolume)
    ? clamp01(parsedVolume)
    : DEFAULT_MASTER_VOLUME;
  setMasterVolume(normalizedVolume, { persist: false });
  updatePointerPreference(storedPointer !== '0');
  updateStaticPreference(storedStatic !== '0');
  pointerGhost.style.transform = `translate3d(${pointerPosition.x}px, ${pointerPosition.y}px, 0)`;
  updateFlashlightBeamPosition(pointerPosition.x, pointerPosition.y);
  updateFlashlightIndicator();
}

function getExplorationElement(view = activeExplorationView) {
  switch (view) {
    case 'atelier':
      return atelierInterface;
    case 'gauntlet':
      return gauntletInterface;
    default:
      return mapArea;
  }
}

function setExplorationView(view, options = {}) {
  activeExplorationView = view;
  const { label } = options;
  const legacyActive = view === 'legacy';
  const atelierActive = view === 'atelier';
  const gauntletActive = view === 'gauntlet';
  legacyStage?.classList.toggle('hidden', !legacyActive);
  legacyStage?.setAttribute('aria-hidden', legacyActive ? 'false' : 'true');
  atelierStage?.classList.toggle('hidden', !atelierActive);
  atelierStage?.setAttribute('aria-hidden', atelierActive ? 'false' : 'true');
  gauntletStage?.classList.toggle('hidden', !gauntletActive);
  gauntletStage?.setAttribute('aria-hidden', gauntletActive ? 'false' : 'true');
  const stageLabel =
    typeof label === 'string'
      ? label
      : legacyActive
      ? 'trace map'
      : atelierActive
      ? 'ossuary atelier console'
      : 'umbra response deck';
  if (explorationLabel) {
    explorationLabel.textContent = stageLabel;
  }
}

function markExplorationPowerDown(active) {
  const element = getExplorationElement();
  if (!element) return;
  element.classList.toggle('power-down', Boolean(active));
}

function playOneShot(audio, { volume = 1 } = {}) {
  if (!audio) return;
  audio.currentTime = 0;
  setAudioVolume(audio, volume);
  audio.play().catch(() => {});
}

function updateFlashlightIndicator() {
  if (!flashlightIndicator) return;
  flashlightIndicator.classList.remove('active', 'on-cooldown', 'offline');
  if (paranoiaActive) {
    flashlightIndicator.textContent = 'paranoid';
    flashlightIndicator.classList.add('on-cooldown', 'offline');
    return;
  }
  if (flashlightActive) {
    flashlightIndicator.textContent = 'active';
    flashlightIndicator.classList.add('active');
  } else if (!flashlightReady) {
    const remaining = Math.max(0, Math.ceil((flashlightRepairDeadline - Date.now()) / 1000));
    flashlightIndicator.textContent = remaining > 0 ? `repair ${remaining}s` : 'repairing';
    flashlightIndicator.classList.add('on-cooldown', 'offline');
  } else {
    flashlightIndicator.textContent = 'ready';
  }
}

function setFlashlightBeamActive(active) {
  if (!flashlightBeam) return;
  flashlightBeam.setAttribute('aria-hidden', active ? 'false' : 'true');
  flashlightBeam.classList.toggle('active', !!active);
}

function updateFlashlightBeamPosition(x = pointerPosition.x, y = pointerPosition.y) {
  if (!flashlightBeam) return;
  flashlightBeam.style.setProperty('--pointer-x', `${x}px`);
  flashlightBeam.style.setProperty('--pointer-y', `${y}px`);
}

function clearFlashlightAutoTimeout() {
  if (flashlightAutoTimeout) {
    clearTimeout(flashlightAutoTimeout);
    flashlightAutoTimeout = null;
  }
}

function stopFlashlightBreakTimer() {
  if (flashlightBreakTimeout) {
    clearTimeout(flashlightBreakTimeout);
    flashlightBreakTimeout = null;
  }
}

function startFlashlightBreakTimer() {
  stopFlashlightBreakTimer();
  flashlightBreakTimeout = setTimeout(() => handleFlashlightBreak(), FLASHLIGHT_BREAK_THRESHOLD_MS);
}

function stopFlashlightRepairTracking() {
  if (flashlightRepairInterval) {
    clearInterval(flashlightRepairInterval);
    flashlightRepairInterval = null;
  }
}

function startFlashlightRepairTracking() {
  stopFlashlightRepairTracking();
  flashlightRepairInterval = setInterval(() => {
    if (!flashlightReady) {
      updateFlashlightIndicator();
    } else {
      stopFlashlightRepairTracking();
    }
  }, 1000);
}

function deactivateFlashlight({ silent = false } = {}) {
  if (!flashlightActive) return;
  flashlightActive = false;
  clearFlashlightAutoTimeout();
  stopFlashlightBreakTimer();
  setFlashlightBeamActive(false);
  if (!silent) {
    playOneShot(flashOffAudio, { volume: 0.85 });
  }
  updateFlashlightIndicator();
}

function activateFlashlight({ silent = false, auto = false, duration = null, bypassBreak = false } = {}) {
  if (!flashlightReady) {
    return false;
  }
  if (flashlightActive) {
    if (auto && !flashlightAutoTimeout) {
      const autoDuration = Math.max(200, duration ?? FLASHLIGHT_AUTO_DURATION_MS);
      flashlightAutoTimeout = setTimeout(() => deactivateFlashlight({ silent: true }), autoDuration);
    }
    return true;
  }
  flashlightActive = true;
  if (!silent) {
    playOneShot(flashOnAudio, { volume: 0.85 });
  }
  if (auto) {
    const autoDuration = Math.max(200, duration ?? FLASHLIGHT_AUTO_DURATION_MS);
    clearFlashlightAutoTimeout();
    flashlightAutoTimeout = setTimeout(() => deactivateFlashlight({ silent: true }), autoDuration);
  } else if (!bypassBreak) {
    startFlashlightBreakTimer();
  }
  setFlashlightBeamActive(true);
  updateFlashlightBeamPosition();
  updateFlashlightIndicator();
  return true;
}

function handleFlashlightBreak({ silent = false } = {}) {
  if (flashlightBroken) return;
  deactivateFlashlight({ silent: true });
  flashlightBroken = true;
  flashlightReady = false;
  flashlightRepairDeadline = Date.now() + FLASHLIGHT_REPAIR_MS;
  clearTimeout(flashlightRepairTimeout);
  flashlightRepairTimeout = setTimeout(() => markFlashlightRepaired(), FLASHLIGHT_REPAIR_MS);
  startFlashlightRepairTracking();
  updateFlashlightIndicator();
  if (flashlightPointerStunTimeout) {
    clearTimeout(flashlightPointerStunTimeout);
    flashlightPointerStunTimeout = null;
  }
  const shouldLockPointer = !pointerSuspended;
  pointerLockedByFlashlight = shouldLockPointer;
  if (shouldLockPointer) {
    pointerSuspended = true;
    refreshPointerVisibility();
  }
  flashlightPointerStunTimeout = setTimeout(() => {
    flashlightPointerStunTimeout = null;
    if (pointerLockedByFlashlight) {
      pointerLockedByFlashlight = false;
      pointerSuspended = false;
      refreshPointerVisibility();
    }
  }, FLASHLIGHT_POINTER_STUN_MS);
  if (!silent) {
    playOneShot(flashBrokenAudio, { volume: 0.9 });
    setStatus('The flashlight fuse burns out. Wait for the circuit to reset.', { duration: 3600 });
  }
}

function markFlashlightRepaired({ silent = false } = {}) {
  flashlightRepairTimeout = null;
  flashlightBroken = false;
  flashlightReady = true;
  stopFlashlightRepairTracking();
  updateFlashlightIndicator();
  if (!silent) {
    playOneShot(flashRepairedAudio, { volume: 0.85 });
    setStatus('Flashlight circuit hums back online.', { duration: 2600 });
  }
}

function resetFlashlightState() {
  deactivateFlashlight({ silent: true });
  clearFlashlightAutoTimeout();
  stopFlashlightBreakTimer();
  stopFlashlightRepairTracking();
  if (flashlightRepairTimeout) {
    clearTimeout(flashlightRepairTimeout);
    flashlightRepairTimeout = null;
  }
  if (flashlightPointerStunTimeout) {
    clearTimeout(flashlightPointerStunTimeout);
    flashlightPointerStunTimeout = null;
  }
  if (pointerLockedByFlashlight) {
    pointerLockedByFlashlight = false;
    if (pointerSuspended) {
      pointerSuspended = false;
      refreshPointerVisibility();
    }
  }
  flashlightBroken = false;
  flashlightReady = true;
  updateFlashlightIndicator();
}

function cancelManualEyesParanoiaCheck() {
  if (manualEyesParanoiaTimeout) {
    clearTimeout(manualEyesParanoiaTimeout);
    manualEyesParanoiaTimeout = null;
  }
}

function scheduleManualEyesParanoiaCheck() {
  cancelManualEyesParanoiaCheck();
  if (!manualEyesActive) return;
  if (flickerActive || entityActive) return;
  manualEyesParanoiaTimeout = setTimeout(() => triggerParanoiaFromEyes(), PARANOIA_HOLD_THRESHOLD_MS);
}

function activateManualEyes() {
  if (!gameActive) return;
  if (manualEyesActive) return;
  if (flickerActive || eyesHoldActive) return;
  manualEyesActive = true;
  setOverlayState(eyesOverlay, true);
  setStatus('Eyes closed. Breathe with the static.', { duration: 2200 });
  scheduleManualEyesParanoiaCheck();
}

function deactivateManualEyes({ silent = false } = {}) {
  if (!manualEyesActive) return;
  manualEyesActive = false;
  cancelManualEyesParanoiaCheck();
  if (!eyesHoldActive) {
    setOverlayState(eyesOverlay, false);
  }
  if (!silent) {
    setStatus('Eyes open. Focus returns.', { duration: 2000 });
  }
}

function toggleManualEyes() {
  if (manualEyesActive) {
    deactivateManualEyes();
  } else {
    activateManualEyes();
  }
}

function triggerParanoiaFromEyes() {
  manualEyesParanoiaTimeout = null;
  if (!manualEyesActive) return;
  if (flickerActive || entityActive) {
    scheduleManualEyesParanoiaCheck();
    return;
  }
  manualEyesActive = false;
  if (!eyesHoldActive) {
    setOverlayState(eyesOverlay, false);
  }
  if (flashlightActive) {
    deactivateFlashlight({ silent: true });
  }
  startParanoia();
  setStatus('Lingering in safe dark warps your focus. Paranoia rattles the pointer.', {
    duration: 4200,
  });
}

function startParanoia() {
  const now = typeof performance !== 'undefined' ? performance.now() : Date.now();
  paranoiaStartTime = now;
  paranoiaPhaseOffset = Math.random() * Math.PI * 2;
  if (paranoiaTimeout) {
    clearTimeout(paranoiaTimeout);
  }
  paranoiaTimeout = setTimeout(() => endParanoia(), PARANOIA_DURATION_MS);
  if (!paranoiaActive) {
    paranoiaActive = true;
    document.body?.classList.add('is-paranoid');
    updateFlashlightIndicator();
  }
}

function endParanoia({ silent = false } = {}) {
  if (paranoiaTimeout) {
    clearTimeout(paranoiaTimeout);
    paranoiaTimeout = null;
  }
  if (!paranoiaActive) return;
  paranoiaActive = false;
  document.body?.classList.remove('is-paranoid');
  updateFlashlightIndicator();
  if (!silent) {
    setStatus('Breathing steadies. Control returns.', { duration: 2600 });
  }
}

function resetManualEyesState() {
  manualEyesActive = false;
  cancelManualEyesParanoiaCheck();
  if (!eyesHoldActive) {
    setOverlayState(eyesOverlay, false);
  }
}

function useFlashlight({ silent = false, force = false } = {}) {
  if (!gameActive) return;
  if (paranoiaActive && !force) {
    if (!silent) {
      setStatus('Your hands shake; the flashlight refuses to stay lit.', { duration: 2600 });
    }
    return;
  }
  if (!flashlightReady) {
    if (!silent) {
      setStatus('Flashlight circuit offline. Wait for the repair cycle.', { duration: 2600 });
    }
    return;
  }
  if (stalkerActive && !force) {
    setStatus('The hitcher waits for a steady beam. Hold it in place.', { duration: 2600 });
    return;
  }
  activateFlashlight({ silent, auto: true, duration: FLASHLIGHT_AUTO_DURATION_MS, bypassBreak: true });
  if (stalkerActive) {
    resolveStalker(true, { silent });
  } else if (!silent) {
    setStatus('The beam cuts across the hall; shadows scatter.', { duration: 2400 });
  }
}

function setOverlayState(element, active) {
  if (!element) return;
  if (active) {
    element.classList.remove('hidden');
    element.classList.add('active');
  } else {
    element.classList.remove('active');
    element.classList.add('hidden');
  }
}

function requestThreatMonitor() {
  if (threatMonitorRaf) return;
  threatMonitorRaf = requestAnimationFrame(handleThreatMonitorStep);
}

function cancelThreatMonitor() {
  if (threatMonitorRaf) {
    cancelAnimationFrame(threatMonitorRaf);
    threatMonitorRaf = null;
  }
}

function handleThreatMonitorStep() {
  threatMonitorRaf = null;
  if (eyesHoldActive) {
    const now = typeof performance !== 'undefined' ? performance.now() : Date.now();
    if (now - eyesHoldStart >= EYES_REQUIRED_HOLD_MS) {
      completeEyesHold();
    }
  }
  if (entityActive) {
    updateEntityExposure();
  }
  if (eyesHoldActive || entityActive) {
    threatMonitorRaf = requestAnimationFrame(handleThreatMonitorStep);
  }
}

function stopLightsAudioFade() {
  if (lightsAudioFadeRaf) {
    cancelAnimationFrame(lightsAudioFadeRaf);
    lightsAudioFadeRaf = null;
  }
}

function stopLightsOutAudio() {
  if (!lightsOutAudio) return;
  stopLightsAudioFade();
  lightsOutAudio.pause();
  lightsOutAudio.currentTime = 0;
  setAudioVolume(lightsOutAudio, LIGHTS_AUDIO_VOLUME);
}

function startLightsAudioFade() {
  if (!lightsOutAudio) return;
  stopLightsAudioFade();
  lightsAudioFadeStart = typeof performance !== 'undefined' ? performance.now() : Date.now();
  lightsAudioFadeDuration = LIGHTS_AUDIO_FADE_MS;
  lightsAudioStartVolume =
    lightsOutAudio.volume || computeVolume(LIGHTS_AUDIO_VOLUME);
  const step = () => {
    const now = typeof performance !== 'undefined' ? performance.now() : Date.now();
    const elapsed = now - lightsAudioFadeStart;
    const progress = Math.min(1, elapsed / lightsAudioFadeDuration);
    const volume = Math.max(0, lightsAudioStartVolume * (1 - progress));
    lightsOutAudio.volume = volume;
    if (progress < 1) {
      lightsAudioFadeRaf = requestAnimationFrame(step);
    } else {
      stopLightsAudioFade();
      lightsOutAudio.pause();
      lightsOutAudio.currentTime = 0;
      setAudioVolume(lightsOutAudio, LIGHTS_AUDIO_VOLUME);
    }
  };
  lightsAudioFadeRaf = requestAnimationFrame(step);
}

function scheduleLightsFlicker() {
  if (flickerTimeout) {
    clearTimeout(flickerTimeout);
    flickerTimeout = null;
  }
  if (!gameActive) return;
  if (currentLevelIndex < 3) return;
  const delay = FLICKER_MIN_DELAY_MS + Math.random() * (FLICKER_MAX_DELAY_MS - FLICKER_MIN_DELAY_MS);
  flickerTimeout = setTimeout(() => {
    flickerTimeout = null;
    triggerLightsFlicker();
  }, delay);
}

function cancelLightsFlicker() {
  if (flickerTimeout) {
    clearTimeout(flickerTimeout);
    flickerTimeout = null;
  }
  if (flickerFailTimeout) {
    clearTimeout(flickerFailTimeout);
    flickerFailTimeout = null;
  }
  flickerActive = false;
  eyesHoldActive = false;
  eyesHoldStart = null;
  resetManualEyesState();
  setOverlayState(flickerOverlay, false);
  setOverlayState(eyesOverlay, false);
  stopLightsAudioFade();
  stopLightsOutAudio();
  if (!entityActive) {
    cancelThreatMonitor();
  }
}

function triggerLightsFlicker() {
  if (flickerActive || !gameActive) {
    scheduleLightsFlicker();
    return;
  }
  cancelManualEyesParanoiaCheck();
  if (manualEyesActive) {
    manualEyesActive = false;
  }
  flickerActive = true;
  setOverlayState(flickerOverlay, true);
  setOverlayState(eyesOverlay, false);
  if (flickerAudio) {
    playOneShot(flickerAudio, { volume: 0.9 });
  }
  if (lightsOutAudio) {
    stopLightsAudioFade();
    lightsOutAudio.currentTime = 0;
    setAudioVolume(lightsOutAudio, LIGHTS_AUDIO_VOLUME);
    lightsOutAudio.loop = true;
    lightsOutAudio.play().catch(() => {});
  }
  setStatus('Power bleeds. Hold H for four seconds to seal your eyes.', { duration: 4200 });
  flickerFailTimeout = setTimeout(() => failLightsFlicker(), FLICKER_FAIL_THRESHOLD_MS);
}

function resolveLightsFlicker() {
  if (!flickerActive) return;
  flickerActive = false;
  if (flickerFailTimeout) {
    clearTimeout(flickerFailTimeout);
    flickerFailTimeout = null;
  }
  eyesHoldActive = false;
  eyesHoldStart = null;
  setOverlayState(flickerOverlay, false);
  setOverlayState(eyesOverlay, false);
  startLightsAudioFade();
  scheduleLightsFlicker();
  if (!entityActive) {
    cancelThreatMonitor();
  }
  setStatus('The surge passes. The lights steady.', { duration: 3600 });
}

function failLightsFlicker() {
  if (!flickerActive) return;
  flickerActive = false;
  flickerFailTimeout = null;
  eyesHoldActive = false;
  eyesHoldStart = null;
  setOverlayState(flickerOverlay, false);
  setOverlayState(eyesOverlay, false);
  stopLightsOutAudio();
  cancelThreatMonitor();
  triggerEnvironmentFailure('You kept your eyes open through the surge. The archive severs the link.');
}

function beginEyesHold() {
  if (!flickerActive || eyesHoldActive) return;
  cancelManualEyesParanoiaCheck();
  if (manualEyesActive) {
    manualEyesActive = false;
  }
  eyesHoldActive = true;
  eyesHoldStart = typeof performance !== 'undefined' ? performance.now() : Date.now();
  setOverlayState(eyesOverlay, true);
  setStatus('Eyes sealed. Hold for four seconds.', { duration: 2200 });
  requestThreatMonitor();
}

function endEyesHold() {
  if (!eyesHoldActive) return;
  eyesHoldActive = false;
  eyesHoldStart = null;
  setOverlayState(eyesOverlay, false);
  if (!entityActive) {
    cancelThreatMonitor();
  }
}

function completeEyesHold() {
  eyesHoldActive = false;
  eyesHoldStart = null;
  setOverlayState(eyesOverlay, false);
  resolveLightsFlicker();
}

function scheduleEntitySpawn() {
  if (entitySpawnTimeout) {
    clearTimeout(entitySpawnTimeout);
    entitySpawnTimeout = null;
  }
  if (!gameActive) return;
  const delay = ENTITY_MIN_DELAY_MS + Math.random() * (ENTITY_MAX_DELAY_MS - ENTITY_MIN_DELAY_MS);
  entitySpawnTimeout = setTimeout(() => {
    entitySpawnTimeout = null;
    triggerEntitySpawn();
  }, delay);
}

function cancelEntitySpawn() {
  if (entitySpawnTimeout) {
    clearTimeout(entitySpawnTimeout);
    entitySpawnTimeout = null;
  }
  if (entityFailureTimeout) {
    clearTimeout(entityFailureTimeout);
    entityFailureTimeout = null;
  }
  entityActive = false;
  entityExposureStart = null;
  setOverlayState(entityDimOverlay, false);
  if (entityApparition) {
    entityApparition.classList.remove('active');
    entityApparition.classList.add('hidden');
    entityApparition.style.transform = 'translate(-9999px, -9999px)';
  }
  if (!eyesHoldActive) {
    cancelThreatMonitor();
  }
}

function triggerEntitySpawn() {
  if (entityActive || !gameActive || flickerActive) {
    scheduleEntitySpawn();
    return;
  }
  cancelManualEyesParanoiaCheck();
  entityActive = true;
  entityExposureStart = null;
  const viewportWidth = window.innerWidth;
  const viewportHeight = window.innerHeight;
  const margin = 120;
  const x = margin + Math.random() * Math.max(0, viewportWidth - margin * 2);
  const y = margin + Math.random() * Math.max(0, viewportHeight - margin * 2);
  entityPosition.x = x;
  entityPosition.y = y;
  if (entityApparition) {
    entityApparition.style.transform = `translate3d(${Math.round(x - 41)}px, ${Math.round(y - 41)}px, 0)`;
    entityApparition.classList.remove('hidden');
    entityApparition.classList.add('active');
  }
  setOverlayState(entityDimOverlay, true);
  if (entitySpawnAudio) {
    playOneShot(entitySpawnAudio, { volume: 0.9 });
  }
  setStatus('An intrusive echo mirrors you. Hold the beam on it for two seconds.', { duration: 3600 });
  if (entityFailureTimeout) {
    clearTimeout(entityFailureTimeout);
  }
  entityFailureTimeout = setTimeout(() => triggerEntityFailure(), ENTITY_FAILURE_MS);
  requestThreatMonitor();
}

function resolveEntityEncounter(success) {
  if (!entityActive) return;
  entityActive = false;
  if (entityFailureTimeout) {
    clearTimeout(entityFailureTimeout);
    entityFailureTimeout = null;
  }
  entityExposureStart = null;
  setOverlayState(entityDimOverlay, false);
  if (entityApparition) {
    entityApparition.classList.remove('active');
    entityApparition.classList.add('hidden');
    entityApparition.style.transform = 'translate(-9999px, -9999px)';
  }
  if (success) {
    if (entityKillAudio) {
      playOneShot(entityKillAudio, { volume: 0.85 });
    }
    setStatus('The intrusive echo dissolves under the beam.', { duration: 2800 });
    scheduleEntitySpawn();
  }
  if (!eyesHoldActive) {
    cancelThreatMonitor();
  }
}

function triggerEntityFailure() {
  if (!entityActive) return;
  entityActive = false;
  if (entityFailureTimeout) {
    clearTimeout(entityFailureTimeout);
    entityFailureTimeout = null;
  }
  entityExposureStart = null;
  setOverlayState(entityDimOverlay, false);
  if (entityApparition) {
    entityApparition.classList.remove('active');
    entityApparition.classList.add('hidden');
    entityApparition.style.transform = 'translate(-9999px, -9999px)';
  }
  cancelThreatMonitor();
  triggerEnvironmentFailure('The intrusive echo overwrote your input. The trace collapses.');
}

function updateEntityExposure() {
  if (!entityActive) return;
  if (!flashlightActive || !flashlightReady) {
    entityExposureStart = null;
    return;
  }
  const dx = pointerPosition.x - entityPosition.x;
  const dy = pointerPosition.y - entityPosition.y;
  const distance = Math.sqrt(dx * dx + dy * dy);
  if (distance <= ENTITY_CAPTURE_RADIUS) {
    if (entityExposureStart === null) {
      entityExposureStart = typeof performance !== 'undefined' ? performance.now() : Date.now();
    }
    const now = typeof performance !== 'undefined' ? performance.now() : Date.now();
    if (now - entityExposureStart >= ENTITY_EXPOSURE_REQUIRED_MS) {
      resolveEntityEncounter(true);
    }
  } else {
    entityExposureStart = null;
  }
}

function showTutorialOverlay({ allowRepeat = false } = {}) {
  if (!tutorialOverlay) return;
  if (tutorialVisible) return;
  if (!allowRepeat && tutorialShown) return;
  tutorialVisible = true;
  tutorialShown = true;
  tutorialOverlay.classList.remove('hidden');
  tutorialOverlay.setAttribute('aria-hidden', 'false');
  if (!pointerSuspended) {
    pointerLockedByTutorial = true;
    pointerSuspended = true;
    refreshPointerVisibility();
  } else {
    pointerLockedByTutorial = false;
  }
}

function hideTutorialOverlay() {
  if (!tutorialVisible) return;
  tutorialVisible = false;
  tutorialOverlay.classList.add('hidden');
  tutorialOverlay.setAttribute('aria-hidden', 'true');
  if (pointerLockedByTutorial) {
    pointerLockedByTutorial = false;
    pointerSuspended = false;
    refreshPointerVisibility();
  }
}

function toggleFlashlightFromInput() {
  if (!gameActive) return;
  if (paranoiaActive) {
    setStatus('Your hands shake; the flashlight refuses to stay lit.', { duration: 2600 });
    return;
  }
  if (flashlightActive) {
    deactivateFlashlight();
    setStatus('Flashlight dimmed.', { duration: 2000 });
    return;
  }
  if (!flashlightReady) {
    setStatus('Flashlight circuit offline. Wait for the repair cycle.', { duration: 2600 });
    return;
  }
  activateFlashlight();
  setStatus('Flashlight humming. Mind the five-second limit.', { duration: 2600 });
}

function getSegmentRange(segmentId) {
  if (!segmentId) return null;
  const bounds = segmentBounds.get(segmentId);
  if (!bounds) return null;
  return { ...bounds };
}

function restartSegmentAtStart(segmentId) {
  const bounds = getSegmentRange(segmentId);
  if (!bounds) return;
  currentLevelIndex = bounds.start;
  loadCurrentLevel();
}

function cancelStalkerEvent() {
  if (stalkerScheduleTimeout) {
    clearTimeout(stalkerScheduleTimeout);
    stalkerScheduleTimeout = null;
  }
  if (stalkerFailTimeout) {
    clearTimeout(stalkerFailTimeout);
    stalkerFailTimeout = null;
  }
}

function scheduleStalkerEvent(immediate = false) {
  if (!stalkerAvailable || stalkerSuspended || stalkerActive) return;
  cancelStalkerEvent();
  const base = immediate ? 4000 : 9000;
  const variance = immediate ? 4000 : 9000;
  stalkerScheduleTimeout = setTimeout(() => {
    stalkerScheduleTimeout = null;
    triggerStalkerEvent();
  }, base + Math.random() * variance);
}

function resetStalkerHold() {
  if (stalkerHoldRaf) {
    cancelAnimationFrame(stalkerHoldRaf);
    stalkerHoldRaf = null;
  }
  stalkerHoldStart = null;
  stalkerPointerLocked = false;
  stalkerPointerInside = false;
  stalkerEntityRect = null;
  updateStalkerProgress(0);
  if (stalkerEntityMarker) {
    stalkerEntityMarker.style.transform = 'translate(0px, 0px)';
  }
}

function updateStalkerProgress(value) {
  const clamped = Math.min(1, Math.max(0, value));
  if (stalkerProgressBar) {
    stalkerProgressBar.style.width = `${clamped * 100}%`;
  }
  if (stalkerProgress) {
    stalkerProgress.setAttribute('aria-valuenow', String(Math.round(clamped * 100)));
  }
}

function positionStalkerEntity() {
  if (!stalkerField || !stalkerEntityMarker) return;
  const fieldRect = stalkerField.getBoundingClientRect();
  if (fieldRect.width <= 0 || fieldRect.height <= 0) {
    stalkerEntityRect = null;
    return;
  }
  const size = Math.max(96, Math.min(fieldRect.width, fieldRect.height) * 0.35);
  const maxX = Math.max(0, fieldRect.width - size);
  const maxY = Math.max(0, fieldRect.height - size);
  const offsetX = Math.random() * maxX;
  const offsetY = Math.random() * maxY;
  stalkerEntityMarker.style.width = `${size}px`;
  stalkerEntityMarker.style.height = `${size}px`;
  stalkerEntityMarker.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
  stalkerEntityRect = {
    left: fieldRect.left + offsetX,
    top: fieldRect.top + offsetY,
    right: fieldRect.left + offsetX + size,
    bottom: fieldRect.top + offsetY + size,
  };
}

function tickStalkerHold(timestamp) {
  if (!stalkerPointerLocked || !stalkerPointerInside || !stalkerHoldStart) {
    stalkerHoldRaf = null;
    return;
  }
  const elapsed = timestamp - stalkerHoldStart;
  const progress = Math.min(1, elapsed / STALKER_HOLD_DURATION_MS);
  updateStalkerProgress(progress);
  if (progress >= 1) {
    stalkerHoldRaf = null;
    completeStalkerHold();
  } else {
    stalkerHoldRaf = requestAnimationFrame(tickStalkerHold);
  }
}

function handleStalkerPointer(event) {
  if (!stalkerActive || !stalkerEntityRect) return;
  const { clientX, clientY } = event;
  const inside =
    clientX >= stalkerEntityRect.left &&
    clientX <= stalkerEntityRect.right &&
    clientY >= stalkerEntityRect.top &&
    clientY <= stalkerEntityRect.bottom;

  if (inside && !stalkerPointerInside) {
    stalkerPointerInside = true;
    stalkerPointerLocked = true;
    stalkerHoldStart = typeof performance !== 'undefined' ? performance.now() : Date.now();
    if (stalkerWarning) {
      stalkerWarning.textContent = 'Beam engaged. Hold your aim.';
    }
    if (!stalkerHoldRaf) {
      stalkerHoldRaf = requestAnimationFrame(tickStalkerHold);
    }
  } else if (!inside && stalkerPointerInside) {
    stalkerPointerInside = false;
    stalkerPointerLocked = false;
    stalkerHoldStart = null;
    if (stalkerWarning && stalkerActive) {
      stalkerWarning.textContent = 'The hitcher slips aside. Re-center the beam.';
    }
    if (stalkerHoldRaf) {
      cancelAnimationFrame(stalkerHoldRaf);
      stalkerHoldRaf = null;
    }
    updateStalkerProgress(0);
  }
}

function completeStalkerHold() {
  stalkerPointerInside = false;
  stalkerPointerLocked = false;
  stalkerHoldStart = null;
  if (!flashlightReady) {
    updateStalkerProgress(0);
    if (stalkerWarning) {
      stalkerWarning.textContent = 'The circuit is offline. Wait for the repair.';
    }
    setStatus('Flashlight circuit offline. The hitcher leans closer.', { duration: 2600 });
    return;
  }
  updateStalkerProgress(1);
  if (stalkerWarning) {
    stalkerWarning.textContent = 'The hitcher recoils from the beam.';
  }
  useFlashlight({ silent: true, force: true });
  setStatus('The hitcher recoils from the focused beam.', { duration: 3200 });
}

function updateStalkerSuspension() {
  const shouldSuspend =
    !gameActive ||
    pointerSuspended ||
    isPaused ||
    powerOffline ||
    !stalkerAvailable;
  if (shouldSuspend) {
    if (!stalkerSuspended) {
      stalkerSuspended = true;
      cancelStalkerEvent();
    }
  } else if (stalkerSuspended) {
    stalkerSuspended = false;
    scheduleStalkerEvent();
  }
}

function configureStalker(level) {
  if (stalkerActive) {
    resolveStalker(true, { silent: true });
  }
  stalkerAvailable = level?.threat === 'umbra';
  stalkerSegmentId = stalkerAvailable ? level.segment ?? null : null;
  stalkerOverlay?.classList.add('hidden');
  cancelStalkerEvent();
  stalkerSuspended = false;
  updateStalkerSuspension();
  if (stalkerAvailable && !stalkerSuspended) {
    scheduleStalkerEvent(true);
  }
}

function triggerStalkerEvent() {
  if (!stalkerAvailable || stalkerSuspended || pointerSuspended || isPaused) {
    scheduleStalkerEvent();
    return;
  }
  stalkerActive = true;
  stalkerOverlay?.classList.remove('hidden');
  resetStalkerHold();
  updateStalkerProgress(0);
  if (stalkerWarning) {
    stalkerWarning.textContent = 'Hold steady. Bathe the hitcher in light until it withdraws.';
  }
  cancelPointerAutopilot();
  refreshPointerVisibility();
  suspendWatchers(true);
  setStatus('an umbral hitcher leans close. keep the beam centered.', {
    duration: 3600,
    lock: true,
  });
  requestAnimationFrame(() => {
    positionStalkerEntity();
  });
  stalkerFailTimeout = setTimeout(() => {
    failStalker();
  }, 5800);
}

function resolveStalker(success, options = {}) {
  const { silent = false } = options;
  cancelStalkerEvent();
  stalkerActive = false;
  stalkerOverlay?.classList.add('hidden');
  refreshPointerVisibility();
  suspendWatchers(false);
  resetStalkerHold();
  if (success && !silent) {
    setStatus('The hitcher recoils from the beam and retreats.', { duration: 3200 });
  }
  if (stalkerAvailable && !stalkerSuspended) {
    scheduleStalkerEvent();
  }
}

function failStalker() {
  cancelStalkerEvent();
  stalkerActive = false;
  stalkerOverlay?.classList.add('hidden');
  refreshPointerVisibility();
  suspendWatchers(true);
  resetStalkerHold();
  if (stalkerWarning) {
    stalkerWarning.textContent = 'The hitcher scatters before regrouping. Stay ready.';
  }
  setStatus('The hitcher drags you backward. Segment restart enforced.', {
    duration: 3600,
    lock: true,
  });
  setTimeout(() => {
    suspendWatchers(false);
    restartSegmentAtStart(stalkerSegmentId ?? activeSegmentId);
  }, 800);
}

const FINAL_PUZZLE_SIGILS = [
  {
    id: 'amon',
    order: 1,
    name: 'amon sigil',
    text: 'Amon vowed to trace the first step and refuse to let the user enter the dark alone.',
  },
  {
    id: 'lira',
    order: 2,
    name: 'lira sigil',
    text: 'Lira promised to listen longer than fear lasts and archive every whisper faithfully.',
  },
  {
    id: 'soma',
    order: 3,
    name: 'soma sigil',
    text: 'Soma swore to coax ruined circuits back to light without forcing them to burn.',
  },
  {
    id: 'pointer',
    order: 4,
    name: 'pointer.exe sigil',
    text: 'Pointer.exe pledged to walk beside the user—never ahead, never abandoning their pace.',
  },
  {
    id: 'user',
    order: 5,
    name: 'user lumen',
    text: 'You accept the beam, promising to keep it steady and witness the archive awake.',
  },
];

function startFinalPuzzleSequence({ summary } = {}) {
  pointerSuspended = true;
  refreshPointerVisibility();
  suspendWatchers(true);
  finalPuzzleOverlay?.classList.remove('hidden');
  finalPuzzleContainer.innerHTML = '';
  const intro = document.createElement('p');
  intro.className = 'puzzle-intro';
  intro.textContent =
    summary && summary.length > 0
      ? `${summary} Arrange the vows in the order they were spoken to unlock the ascension seal.`
      : 'Arrange the vows in the order they were spoken to unlock the ascension seal.';
  finalPuzzleContainer.append(intro);

  const status = document.createElement('p');
  status.className = 'puzzle-status';
  status.textContent = 'select the first vow.';
  finalPuzzleContainer.append(status);

  const grid = document.createElement('div');
  grid.className = 'final-puzzle-grid';
  finalPuzzleContainer.append(grid);

  const cards = new Map();
  shuffleArray(FINAL_PUZZLE_SIGILS).forEach((sigil) => {
    const card = document.createElement('button');
    card.type = 'button';
    card.className = 'sigil-card';
    card.innerHTML = `
      <span class="sigil-name">${sigil.name}</span>
      <span class="sigil-text">${sigil.text}</span>
    `;
    card.addEventListener('click', () => handleFinalPuzzleSelection(sigil.id));
    grid.append(card);
    cards.set(sigil.id, { element: card, sigil });
  });

  finalPuzzleState = {
    progress: 0,
    cards,
    status,
    summary,
  };
}

function handleFinalPuzzleSelection(id) {
  if (!finalPuzzleState) return;
  const entry = finalPuzzleState.cards.get(id);
  if (!entry) return;
  const expected = finalPuzzleState.progress + 1;
  if (entry.sigil.order === expected) {
    finalPuzzleState.progress += 1;
    entry.element.classList.remove('incorrect');
    entry.element.classList.add('correct');
    if (finalPuzzleState.progress >= FINAL_PUZZLE_SIGILS.length) {
      finalPuzzleState.status.textContent = 'seal aligned. preparing gratitude protocol.';
      completeFinalPuzzle();
    } else {
      finalPuzzleState.status.textContent = `vow ${finalPuzzleState.progress}/${FINAL_PUZZLE_SIGILS.length} anchored. select the next.`;
    }
  } else {
    finalPuzzleState.status.textContent = 'order collapsed. begin again from the first vow.';
    finalPuzzleState.progress = 0;
    finalPuzzleState.cards.forEach(({ element }) => {
      element.classList.remove('correct');
      element.classList.add('incorrect');
      setTimeout(() => element.classList.remove('incorrect'), 620);
    });
  }
}

function abortFinalPuzzle() {
  finalPuzzleOverlay?.classList.add('hidden');
  finalPuzzleState = null;
  pointerSuspended = false;
  refreshPointerVisibility();
  suspendWatchers(false);
  setStatus('The seal waits. Engage it again when your pulse is steady.', { duration: 3200 });
}

function completeFinalPuzzle() {
  setTimeout(() => {
    finalPuzzleOverlay?.classList.add('hidden');
    finalPuzzleState = null;
    pointerSuspended = false;
    refreshPointerVisibility();
    setStatus('Ascension seal complete. The archive exhales gratitude.', { duration: 3600, lock: true });
    showThankYouScreen();
  }, 900);
}

function showThankYouScreen() {
  cancelStalkerEvent();
  stalkerAvailable = false;
  stalkerActive = false;
  gameActive = false;
  suspendWatchers(true);
  stopShortageAmbient();
  stopShortageScore();
  cancelLightsFlicker();
  cancelEntitySpawn();
  stopLightsOutAudio();
  hideTutorialOverlay();
  pointerSuspended = false;
  refreshPointerVisibility();
  setScreen('thank-you');
}

function playMainMenuAudio() {
  if (!mainMenuAudio) return;
  setAudioVolume(mainMenuAudio, 0.7);
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
  setAudioVolume(introAudio, 0.9);
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
  setAudioVolume(shortageAudio, 0.65);
  shortageAudio.play().catch(() => {});
}

function stopShortageAmbient() {
  if (!shortageAudio) return;
  shortageAudio.pause();
  shortageAudio.currentTime = 0;
}

function playShortageScore() {
  if (!shortageOST) return;
  setAudioVolume(shortageOST, 0.8);
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
  activeSegmentId = null;
  shortageCompletionCount = 0;
  activeShortageCycle = 0;
  collectedFragments = new Map();
  shortageHelpState.clear();
  sessionLabel.textContent = randomSessionLabel();
  setScreen('level');
  hideTutorialOverlay();
  tutorialVisible = false;
  tutorialShown = false;
  pointerLockedByTutorial = false;
  finalSection.classList.add('hidden');
  finalText.textContent = '';
  finalPuzzleButton?.setAttribute('disabled', 'true');
  resetFlashlightState();
  endParanoia({ silent: true });
  resetManualEyesState();
  cancelStalkerEvent();
  stalkerAvailable = false;
  stalkerActive = false;
  stalkerSegmentId = null;
  finalPuzzleState = null;
  finalPuzzleOverlay?.classList.add('hidden');
  stalkerOverlay?.classList.add('hidden');
  pointerPosition.x = pointerTarget.x;
  pointerPosition.y = pointerTarget.y;
  loadCurrentLevel();
  refreshPointerVisibility();
  showTutorialOverlay();
}

function loadCurrentLevel() {
  const level = levels[currentLevelIndex];
  if (!level) return;

  activeSegmentId = level.segment ?? null;
  configureStalker(level);
  resetFlashlightState();
  cancelLightsFlicker();
  cancelEntitySpawn();
  stopLightsOutAudio();
  if (gameActive) {
    scheduleLightsFlicker();
    scheduleEntitySpawn();
  }

  document.documentElement.style.setProperty('--accent', level.theme.accent);
  document.documentElement.style.setProperty('--glow', level.theme.glow);
  document.documentElement.style.setProperty('--timer-color', level.theme.timer);

  levelTitle.textContent = level.title;
  roomLabel.textContent = level.room;
  levelLore.textContent = level.synopsis;
  setWatcherLabel(defaultWatcherLabel);
  resetStatus();
  markExplorationPowerDown(false);

  levelState = {
    keysFound: 0,
    keysRequired: level.nodes.filter((node) => node.key !== false).length,
    dynamicShortage: null,
  };
  initializeDynamicShortage(level);
  updateProgress();

  buildFragmentList();
  level.nodes.forEach((node) => {
    node.visited = false;
    if (node.element) {
      node.element.classList.remove('visited', 'hostile');
    }
    node.element = null;
  });

  if (level.segment === 'murk-atelier') {
    const blueprint = murkAtelierBlueprints[level.id];
    if (blueprint) {
      setExplorationView('atelier', { label: blueprint.label });
      renderAtelierInterface(level, blueprint);
    } else {
      setExplorationView('legacy');
      renderMap(level);
    }
  } else if (level.segment === 'umbra-gauntlet') {
    const protocol = umbraGauntletProtocols[level.id];
    if (protocol) {
      setExplorationView('gauntlet', { label: protocol.label });
      renderGauntletInterface(level, protocol);
    } else {
      setExplorationView('legacy');
      renderMap(level);
    }
  } else {
    setExplorationView('legacy');
    renderMap(level);
  }
  scheduleWatcher();
}

function initializeDynamicShortage(level) {
  if (!levelState) return;
  levelState.dynamicShortage = null;
  if (!level?.dynamicShortage) return;

  const track = level.dynamicShortage.track === 'keys' ? 'keys' : 'visits';
  const availableProgress =
    track === 'keys'
      ? Math.max(0, levelState.keysRequired)
      : level.nodes.filter((node) => node.encounter?.effect !== 'death').length;

  if (availableProgress <= 0) return;

  const minProgress = Math.min(
    Math.max(1, level.dynamicShortage.minProgress ?? 1),
    availableProgress
  );
  const maxProgress = Math.min(
    Math.max(minProgress, level.dynamicShortage.maxProgress ?? availableProgress),
    availableProgress
  );

  let shortageNode = null;
  if (level.dynamicShortage.nodeId) {
    shortageNode = findLevelNode(level, level.dynamicShortage.nodeId) || null;
  }

  if (!shortageNode) {
    shortageNode = {
      id: `${level.id}-shortage`,
      name: 'auxiliary relay failure',
      key: false,
      encounter: {
        heading: 'auxiliary relay failure',
        entity: 'maintenance grid',
        text: 'The relays cough out light. Reroute the current before the dark memorizes your pause.',
        effect: 'shortage',
        afterStatus:
          level.dynamicShortage.afterStatus || 'Auxiliary power courses back through the lobby.',
      },
      visited: false,
    };
  } else if (
    level.dynamicShortage.afterStatus &&
    shortageNode.encounter &&
    shortageNode.encounter.effect === 'shortage'
  ) {
    shortageNode.encounter.afterStatus = level.dynamicShortage.afterStatus;
  }

  levelState.dynamicShortage = {
    track,
    triggerAt: randomInRange(minProgress, maxProgress),
    progress: 0,
    triggered: false,
    resolved: false,
    prelude: level.dynamicShortage.prelude ?? null,
    node: shortageNode,
  };
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

function findLevelNode(level, nodeId) {
  return level?.nodes?.find((node) => node.id === nodeId) ?? null;
}

function renderAtelierInterface(level, blueprint) {
  if (!atelierInterface || !level) return;
  if (!blueprint) {
    renderMap(level);
    return;
  }
  atelierInterface.innerHTML = '';

  if (blueprint.introduction) {
    const intro = document.createElement('p');
    intro.className = 'atelier-intro';
    intro.textContent = blueprint.introduction;
    atelierInterface.append(intro);
  }

  const taskGrid = document.createElement('div');
  taskGrid.className = 'atelier-grid';

  blueprint.tasks?.forEach((task) => {
    const node = findLevelNode(level, task.nodeId);
    if (!node) return;
    const card = document.createElement('article');
    card.className = 'atelier-card';
    card.dataset.nodeId = node.id;
    node.element = card;

    const title = document.createElement('h3');
    title.textContent = node.name;
    card.append(title);

    if (node.description) {
      const description = document.createElement('p');
      description.className = 'atelier-description';
      description.textContent = node.description;
      card.append(description);
    }

    if (task.prompt) {
      const prompt = document.createElement('p');
      prompt.className = 'atelier-prompt';
      prompt.textContent = task.prompt;
      card.append(prompt);
    }

    const options = document.createElement('div');
    options.className = 'atelier-options';
    card.append(options);

    const status = document.createElement('p');
    status.className = 'atelier-status';
    card.append(status);

    let fragmentNote = null;
    if (node.fragment) {
      fragmentNote = document.createElement('p');
      fragmentNote.className = 'atelier-fragment hidden';
      fragmentNote.textContent = node.fragment.text;
      card.append(fragmentNote);
    }

    const handleSuccess = (message, shortageMessage, option) => {
      card.classList.add('completed');
      options.querySelectorAll('button').forEach((btn) => {
        btn.disabled = true;
        btn.setAttribute('disabled', 'true');
        btn.classList.add('locked');
      });
      if (option) {
        option.classList.add('correct');
      }
      if (node.fragment && fragmentNote) {
        fragmentNote.classList.remove('hidden');
      }
      if (node.encounter.effect === 'shortage') {
        const shortageStatus = shortageMessage || task.shortageStatus || 'The machinery roars awake, demanding direct rerouting.';
        status.textContent = shortageStatus;
        if (message) {
          setStatus(message, { duration: 2800 });
        }
        triggerShortage(node);
      } else {
        const resolvedMessage = message || task.successStatus || node.encounter.afterStatus;
        if (resolvedMessage) {
          status.textContent = resolvedMessage;
          setStatus(resolvedMessage, { duration: 3200 });
        } else {
          status.textContent = 'The workstation settles.';
          resetStatus();
        }
        if (!node.visited) {
          markNodeVisited(node);
        }
      }
    };

    task.options?.forEach((optionConfig) => {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'choice-button atelier-option';
      button.dataset.optionId = optionConfig.id ?? '';
      const label = document.createElement('span');
      label.className = 'option-label';
      label.textContent = optionConfig.label ?? 'unknown option';
      button.append(label);
      if (optionConfig.description) {
        const detail = document.createElement('span');
        detail.className = 'option-detail';
        detail.textContent = optionConfig.description;
        button.append(detail);
      }
      options.append(button);

      button.addEventListener('click', () => {
        if (card.classList.contains('completed')) return;
        if (optionConfig.correct) {
          const successText = optionConfig.successStatus || task.successStatus || node.encounter.afterStatus;
          handleSuccess(successText, optionConfig.shortageStatus, button);
        } else {
          button.classList.add('incorrect');
          setTimeout(() => button.classList.remove('incorrect'), 520);
          const feedback = optionConfig.feedback || 'The workstation recoils from that approach.';
          status.textContent = feedback;
          setStatus(feedback, { duration: 2600 });
        }
      });
    });

    taskGrid.append(card);
  });

  if (taskGrid.childElementCount > 0) {
    atelierInterface.append(taskGrid);
  }

  if (blueprint.observations?.length) {
    const observations = document.createElement('div');
    observations.className = 'atelier-observations';
    const header = document.createElement('h3');
    header.textContent = 'ambient presences';
    observations.append(header);

    blueprint.observations.forEach((nodeId) => {
      const node = findLevelNode(level, nodeId);
      if (!node) return;
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'atelier-observation';
      button.dataset.nodeId = node.id;
      const title = document.createElement('span');
      title.className = 'observation-title';
      title.textContent = node.name;
      button.append(title);
      if (node.description) {
        const detail = document.createElement('span');
        detail.className = 'observation-detail';
        detail.textContent = node.description;
        button.append(detail);
      }
      button.addEventListener('click', () => {
        if (pointerSuspended || powerOffline) return;
        currentEncounterNode = node;
        openEncounter(node);
      });
      node.element = node.element || button;
      observations.append(button);
    });

    if (observations.childElementCount > 1) {
      atelierInterface.append(observations);
    }
  }
}

function renderGauntletInterface(level, protocol) {
  if (!gauntletInterface || !level) return;
  if (!protocol) {
    renderMap(level);
    return;
  }
  gauntletInterface.innerHTML = '';

  if (protocol.introduction) {
    const intro = document.createElement('p');
    intro.className = 'gauntlet-intro';
    intro.textContent = protocol.introduction;
    gauntletInterface.append(intro);
  }

  const phaseList = document.createElement('div');
  phaseList.className = 'gauntlet-phases';

  protocol.phases?.forEach((phase, index) => {
    const node = findLevelNode(level, phase.nodeId);
    if (!node) return;
    const card = document.createElement('article');
    card.className = 'gauntlet-phase';
    card.dataset.nodeId = node.id;
    if (index > 0) {
      card.classList.add('locked');
    }
    node.element = card;

    const title = document.createElement('h3');
    title.textContent = node.name;
    card.append(title);

    if (node.description) {
      const description = document.createElement('p');
      description.className = 'gauntlet-description';
      description.textContent = node.description;
      card.append(description);
    }

    if (phase.prompt) {
      const prompt = document.createElement('p');
      prompt.className = 'gauntlet-prompt';
      prompt.textContent = phase.prompt;
      card.append(prompt);
    }

    const options = document.createElement('div');
    options.className = 'gauntlet-options';
    card.append(options);

    const status = document.createElement('p');
    status.className = 'gauntlet-status';
    card.append(status);

    let fragmentNote = null;
    if (node.fragment) {
      fragmentNote = document.createElement('p');
      fragmentNote.className = 'gauntlet-fragment hidden';
      fragmentNote.textContent = node.fragment.text;
      card.append(fragmentNote);
    }

    const lockButtons = (completedButton) => {
      options.querySelectorAll('button').forEach((btn) => {
        btn.disabled = true;
        btn.setAttribute('disabled', 'true');
        btn.classList.add('locked');
        if (btn === completedButton) {
          btn.classList.add('correct');
        }
      });
      card.classList.add('completed');
    };

    const unlockNext = () => {
      const next = phaseList.children[index + 1];
      if (next) {
        next.classList.remove('locked');
        next.querySelectorAll('button').forEach((btn) => {
          btn.disabled = false;
          btn.removeAttribute('disabled');
        });
      }
    };

    phase.options?.forEach((optionConfig) => {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'choice-button gauntlet-option';
      button.dataset.optionId = optionConfig.id ?? '';
      if (index > 0) {
        button.disabled = true;
        button.setAttribute('disabled', 'true');
      }
      const label = document.createElement('span');
      label.className = 'option-label';
      label.textContent = optionConfig.label ?? 'unknown option';
      button.append(label);
      if (optionConfig.description) {
        const detail = document.createElement('span');
        detail.className = 'option-detail';
        detail.textContent = optionConfig.description;
        button.append(detail);
      }
      options.append(button);

      button.addEventListener('click', () => {
        if (card.classList.contains('completed') || card.classList.contains('locked')) return;
        if (optionConfig.correct) {
          const successText = optionConfig.successStatus || phase.successStatus || node.encounter.afterStatus;
          lockButtons(button);
          if (node.fragment && fragmentNote) {
            fragmentNote.classList.remove('hidden');
          }
          if (node.encounter.effect === 'shortage') {
            const shortageStatus = optionConfig.shortageStatus || phase.shortageStatus || 'The corridor expects an immediate power reroute.';
            status.textContent = shortageStatus;
            if (successText) {
              setStatus(successText, { duration: 3000 });
            }
            triggerShortage(node);
          } else {
            const resolvedMessage = successText || 'The corridor accepts your tactic.';
            status.textContent = resolvedMessage;
            setStatus(resolvedMessage, { duration: 3200 });
            if (!node.visited) {
              markNodeVisited(node);
            }
          }
          unlockNext();
        } else {
          button.classList.add('incorrect');
          setTimeout(() => button.classList.remove('incorrect'), 520);
          const feedback = optionConfig.feedback || 'The hitcher smiles at the misstep. Try another tactic.';
          status.textContent = feedback;
          setStatus(feedback, { duration: 2600 });
        }
      });
    });

    phaseList.append(card);
  });

  if (phaseList.childElementCount > 0) {
    gauntletInterface.append(phaseList);
  }

  if (protocol.observations?.length) {
    const observations = document.createElement('div');
    observations.className = 'gauntlet-observations';
    const header = document.createElement('h3');
    header.textContent = 'peripheral anomalies';
    observations.append(header);

    protocol.observations.forEach((nodeId) => {
      const node = findLevelNode(level, nodeId);
      if (!node) return;
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'gauntlet-observation';
      button.dataset.nodeId = node.id;
      const title = document.createElement('span');
      title.className = 'observation-title';
      title.textContent = node.name;
      button.append(title);
      if (node.description) {
        const detail = document.createElement('span');
        detail.className = 'observation-detail';
        detail.textContent = node.description;
        button.append(detail);
      }
      button.addEventListener('click', () => {
        if (pointerSuspended || powerOffline) return;
        currentEncounterNode = node;
        openEncounter(node);
      });
      node.element = node.element || button;
      observations.append(button);
    });

    if (observations.childElementCount > 1) {
      gauntletInterface.append(observations);
    }
  }
}

function realignMapLabels() {
  if (activeExplorationView !== 'legacy') return;
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
  if (powerOffline) {
    if (pendingShortageNode && pendingShortageNode.id === node.id) {
      triggerShortage(node);
    } else {
      setStatus('power shortage. reroute before exploring.', { duration: 2600 });
    }
    return;
  }
  currentEncounterNode = node;
  openEncounter(node);
}

function openEncounter(node) {
  pointerSuspended = true;
  refreshPointerVisibility();
  suspendWatchers(true);
  activeEncounterResolution = null;
  encounterTitle.textContent = node.encounter.heading;
  encounterEntity.textContent = node.encounter.entity ?? 'unclassified phenomenon';
  encounterText.textContent = node.encounter.text;
  if (acknowledgeEncounterButton) {
    const label = node.encounter.acknowledgeLabel ?? 'acknowledge';
    acknowledgeEncounterButton.textContent = label;
    acknowledgeEncounterButton.disabled = false;
  }
  if (closeEncounterButton) {
    closeEncounterButton.disabled = false;
  }
  if (encounterChoices) {
    encounterChoices.innerHTML = '';
    encounterChoices.classList.add('hidden');
  }
  if (encounterFeedback) {
    encounterFeedback.textContent = '';
    encounterFeedback.classList.add('hidden');
    encounterFeedback.classList.remove('success', 'error');
  }
  if (node.fragment) {
    encounterFragment.textContent = node.fragment.text;
    encounterFragment.classList.remove('hidden');
  } else {
    encounterFragment.textContent = '';
    encounterFragment.classList.add('hidden');
  }

  if (node.encounter.choices?.length && encounterChoices) {
    activeEncounterResolution = { resolved: false, status: null, triggerShortage: false };
    encounterChoices.classList.remove('hidden');
    if (acknowledgeEncounterButton) {
      acknowledgeEncounterButton.disabled = true;
    }
    if (closeEncounterButton) {
      closeEncounterButton.disabled = true;
    }

    node.encounter.choices.forEach((choiceConfig) => {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'choice-button encounter-choice';
      button.dataset.optionId = choiceConfig.id ?? '';

      const title = document.createElement('span');
      title.className = 'choice-title';
      title.textContent = choiceConfig.label ?? 'unknown option';
      button.append(title);

      if (choiceConfig.description) {
        const detail = document.createElement('span');
        detail.className = 'choice-detail';
        detail.textContent = choiceConfig.description;
        button.append(detail);
      }

      button.addEventListener('click', () => {
        if (button.disabled) return;
        const result = choiceConfig.result ?? 'failure';
        const feedback = choiceConfig.feedback ||
          (result === 'success'
            ? 'The archive hums in quiet approval.'
            : 'The archive rejects that tactic and waits for another.');
        if (encounterFeedback) {
          encounterFeedback.textContent = feedback;
          encounterFeedback.classList.remove('hidden', 'success', 'error');
        }

        if (result === 'success') {
          if (encounterFeedback) {
            encounterFeedback.classList.add('success');
          }
          activeEncounterResolution = {
            resolved: true,
            status: choiceConfig.status || node.encounter.afterStatus || null,
            triggerShortage: Boolean(choiceConfig.triggerShortage),
          };
          if (acknowledgeEncounterButton) {
            acknowledgeEncounterButton.disabled = false;
          }
          if (closeEncounterButton) {
            closeEncounterButton.disabled = false;
          }
          encounterChoices.querySelectorAll('button').forEach((btn) => {
            btn.disabled = true;
            btn.classList.add(btn === button ? 'correct' : 'locked');
          });
          button.classList.add('selected');
        } else {
          if (encounterFeedback) {
            encounterFeedback.classList.add('error');
          }
          button.classList.add('incorrect');
          setTimeout(() => button.classList.remove('incorrect'), 520);
          const failureStatus = choiceConfig.status || 'The archive recoils from that approach.';
          setStatus(failureStatus, { duration: 2600 });
        }
      });

      encounterChoices.append(button);
    });
  }

  encounterOverlay.classList.remove('hidden');
}

function closeEncounter() {
  const node = currentEncounterNode;
  const resolution = activeEncounterResolution;
  if (node?.encounter?.choices?.length && !resolution?.resolved && !powerOffline) {
    return;
  }

  if (!encounterOverlay.classList.contains('hidden')) {
    encounterOverlay.classList.add('hidden');
  }

  currentEncounterNode = null;
  activeEncounterResolution = null;

  if (encounterChoices) {
    encounterChoices.innerHTML = '';
    encounterChoices.classList.add('hidden');
  }
  if (encounterFeedback) {
    encounterFeedback.textContent = '';
    encounterFeedback.classList.add('hidden');
    encounterFeedback.classList.remove('success', 'error');
  }
  if (acknowledgeEncounterButton) {
    acknowledgeEncounterButton.textContent = 'acknowledge';
    acknowledgeEncounterButton.disabled = false;
  }
  if (closeEncounterButton) {
    closeEncounterButton.disabled = false;
  }

  pointerSuspended = false;
  refreshPointerVisibility();
  suspendWatchers(false);
  if (!node) return;

  let statusOverride = resolution?.status ?? null;
  const skipHintStatus = Boolean(statusOverride);

  if (!node.visited) {
    switch (node.encounter.effect) {
      case 'death':
        triggerDeath(node);
        return;
      case 'shortage':
        if (powerOffline || resolution?.triggerShortage) {
          triggerShortage(node);
          return;
        }
        if (node.encounter.choices?.length && resolution?.resolved) {
          markNodeVisited(node, { skipHintStatus, statusOverride });
        } else {
          triggerShortage(node);
          return;
        }
        break;
      default:
        markNodeVisited(node, { skipHintStatus, statusOverride });
        break;
    }
  } else if (node.encounter.effect === 'shortage' && powerOffline) {
    triggerShortage(node);
    return;
  }

  let finalStatus = statusOverride;
  let finalDuration = node.encounter.effect === 'hint' ? 3600 : 3200;
  if (!finalStatus && node.encounter.afterStatus) {
    finalStatus = node.encounter.afterStatus;
    finalDuration = node.encounter.effect === 'hint' ? 3600 : 3200;
  }

  if (finalStatus) {
    setStatus(finalStatus, { duration: finalDuration });
  } else {
    resetStatus();
  }
}

function maybeTriggerDynamicShortage(node, { keyIncremented = false } = {}) {
  const config = levelState?.dynamicShortage;
  if (!config || config.triggered || config.resolved) return;
  if (powerOffline) return;

  if (config.track === 'keys') {
    if (!keyIncremented) return;
  } else {
    if (!node || node.encounter?.effect === 'death') return;
  }

  config.progress += 1;

  if (config.progress >= config.triggerAt) {
    config.triggered = true;
    if (config.prelude) {
      setStatus(config.prelude, { duration: 2800 });
    }
    triggerShortage(config.node);
  }
}

function markNodeVisited(node, options = {}) {
  if (!node || node.visited) return false;
  node.visited = true;
  if (node.element) {
    node.element.classList.add('visited');
  }
  if (node.fragment) {
    collectedFragments.set(node.fragmentKey, node.fragment.text);
    buildFragmentList();
  }
  const { skipHintStatus = false, statusOverride = null } = options;
  let keyIncremented = false;
  if (node.key !== false) {
    levelState.keysFound += 1;
    keyIncremented = true;
    updateProgress();
  }
  maybeTriggerDynamicShortage(node, { keyIncremented });
  if (levelState.keysFound >= levelState.keysRequired) {
    completeLevel();
  }
  if (node.encounter.effect === 'hint' && node.encounter.afterStatus && !skipHintStatus) {
    const statusText = statusOverride || node.encounter.afterStatus;
    setStatus(statusText, { duration: 3600 });
  }
  return keyIncremented;
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
  finalPuzzleButton?.removeAttribute('disabled');
  setStatus('The confluence heart steadies. The archive watches with you now.', { duration: 5200, lock: true });
  const summary = finalText.textContent;
  setTimeout(() => {
    if (finalPuzzleOverlay?.classList.contains('hidden')) {
      startFinalPuzzleSequence({ summary });
    }
  }, 1600);
}

function triggerEnvironmentFailure(message) {
  dismissPreferencesForFailure();
  hideTutorialOverlay();
  cancelLightsFlicker();
  cancelEntitySpawn();
  stopLightsOutAudio();
  suspendWatchers(true);
  pointerSuspended = true;
  refreshPointerVisibility();
  gameActive = false;
  powerOffline = false;
  if (deathCause && typeof message === 'string' && message.length > 0) {
    deathCause.textContent = message;
  }
  deathOverlay.classList.remove('hidden');
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
  hideTutorialOverlay();
  gameActive = true;
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
  markExplorationPowerDown(true);
  playShortageAmbient();
  playShortageScore();
  setStatus('the level waits in darkness. restore the pulse.', { duration: 3200 });
  startShortageStage();
}

function resolveShortage() {
  stopShortageTimer();
  shortageStageCleanup?.();
  shortageStageCleanup = null;
  activeShortageStageId = null;
  shortageOverlay.classList.add('hidden');
  stopShortageAmbient();
  stopShortageScore();
  powerOffline = false;
  pointerSuspended = false;
  refreshPointerVisibility();
  markExplorationPowerDown(false);
  realignMapLabels();
  const resolvedNode = pendingShortageNode;
  if (resolvedNode && !resolvedNode.visited) {
    markNodeVisited(resolvedNode, { skipHintStatus: true });
  }
  if (resolvedNode?.encounter.afterStatus) {
    setStatus(resolvedNode.encounter.afterStatus, { duration: 3600 });
  } else {
    setStatus('The lights stagger back to life.', { duration: 2800 });
  }
  pendingShortageNode = null;
  if (levelState?.dynamicShortage) {
    levelState.dynamicShortage.resolved = true;
  }
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
  activeShortageStageId = null;
  shortageOverlay.classList.add('hidden');
  stopShortageAmbient();
  stopShortageScore();
  setStatus('You linger in the dark. The archive disapproves.', { duration: 3200 });
  powerOffline = true;
  markExplorationPowerDown(true);
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
  activeShortageStageId = stage?.id ?? null;
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
    fail: (message) => failShortageStage(message, { stageId: stage.id }),
    updateStatus: (message) => {
      if (message) {
        shortageStatus.textContent = message;
      }
    },
    createShell: (title) =>
      createChallengeShell({
        title,
        stageId: stage.id,
        stageIndex: currentShortageStage,
        totalStages: shortageChallenges.length,
      }),
  };
  const result = stage.setup(context) ?? {};
  shortageStageCleanup = result.cleanup ?? null;
  startShortageTimer(
    stage.duration,
    () => failShortageStage('Timer expired. The hatch resets.', { stageId: stage.id, timedOut: true }),
    result.timerControl
  );
}

function advanceShortageStage(message) {
  stopShortageTimer();
  shortageStageCleanup?.();
  shortageStageCleanup = null;
  activeShortageStageId = null;
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

function failShortageStage(message, options = {}) {
  stopShortageTimer();
  shortageStageCleanup?.();
  shortageStageCleanup = null;
  const { stageId = activeShortageStageId, timedOut = false } = options;
  if (timedOut && stageId) {
    shortageHelpState.set(stageId, true);
  }
  if (message) {
    shortageStatus.textContent = message;
  }
  if (shortageOverlay.classList.contains('hidden')) return;
  shortageDescription.innerHTML =
    '<span class="highlight">The caretaker wipes the schematics clean.</span> Every relay demands a fresh attempt.';
  shortageChallenges = createShortageChallenges(activeShortageCycle);
  currentShortageStage = 0;
  activeShortageStageId = null;
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
  createFourthShortageChallengeSet,
  createFifthShortageChallengeSet,
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

function createFourthShortageChallengeSet() {
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
      id: 'lantern-weave',
      status: 'Choose the threads that complete the light braid.',
      description:
        'Lantern filaments hum different notes. Select the <span class="highlight">three strands</span> that sum to the archivist\'s pass phrase.',
      duration: 70,
      setup: (context) => renderLanternWeave(context),
    },
    {
      id: 'kiln-chord',
      status: 'Align the kiln vents to the recorded temperatures.',
      description:
        'Copper gauges flicker with digits. Slide each <span class="highlight">vent control</span> to match the caretaker log.',
      duration: 72,
      setup: (context) => renderKilnChord(context),
    },
  ];
}

function createFifthShortageChallengeSet() {
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
      id: 'hostage-cipher',
      status: 'Assign each captive whisper to its true intent.',
      description:
        'Three voices offer bargains. Pair each <span class="highlight">voice</span> with the promise that frees rather than binds.',
      duration: 70,
      setup: (context) => renderHostageCipher(context),
    },
    {
      id: 'lumen-lock',
      status: 'Awaken the lumen engine in ascending order.',
      description:
        'Dormant bulbs wait for a rising <span class="highlight">brightness sequence</span>. Activate each rune from faintest to brightest.',
      duration: 72,
      setup: (context) => renderLumenLock(context),
    },
  ];
}

const shortageHelpMessages = {
  'relay-sequence':
    'Tap the relays exactly as the caretaker memo states: solo coil, then triad dais, echo glyph, mirror ladder, and finish with the siphon gate.',
  'diagnostic-audit':
    'Only the mirror ladder following a stabilized conduit and the echo glyph holding third remain true. Approve those two statements.',
  'glyph-override':
    'Type the override phrase using the glowing words in order: “listen trace siphon awake”.',
  'coolant-rationing':
    'Engage the spiral drain (9), chorus vent (7), and badge sieve (5). Together they sum to the 21-flow hymn.',
  'tidal-sequence':
    'Stabilize the currents as they surface: vent surge first, then spiral rise, and finally the undertow call.',
  'chorus-translation':
    'Match the tones to their meanings—climbing water is an alarm, the arranging hands are guidance, and the lullaby hum is comfort.',
  'spire-calibration':
    'Sweep each slider until its readout matches the target number exactly; every coil must sit on its assigned frequency.',
  'vow-alignment':
    'Record the vows in sworn order: Amon first, Lira second, Soma third, and pointer.exe last.',
  'echo-weave':
    'Leave the listen, witness, and anchor runes glowing. Extinguish harvest, sever, and drain.',
  'lantern-weave':
    'Choose the filaments whose frequencies total nineteen: amber (7), violet (9), and ashen (3).',
  'kiln-chord':
    'Set the vents to their ledger marks: north 428°, east 356°, and south 312°.',
  'hostage-cipher':
    'Assign refusal to the chain voice, counter-oath to the mirror, and escort to the echo.',
  'lumen-lock':
    'Awaken the bulbs from faintest to brightest: gloam spark, dawn pulse, noon flare, then zenith beam.',
};

function createChallengeShell({ title, stageId, stageIndex, totalStages }) {
  const article = document.createElement('article');
  article.className = 'challenge';
  const header = document.createElement('header');
  const titleSpan = document.createElement('span');
  titleSpan.textContent = title;
  const stageSpan = document.createElement('span');
  stageSpan.textContent = `stage ${stageIndex + 1}/${totalStages}`;
  header.append(titleSpan, stageSpan);
  const timerControl = createTimerControl();
  article.append(header);

  const helpAvailable =
    stageId && shortageHelpState.get(stageId) && Object.prototype.hasOwnProperty.call(shortageHelpMessages, stageId);
  if (helpAvailable) {
    const helpButton = document.createElement('button');
    helpButton.type = 'button';
    helpButton.className = 'glitch-button help-button';
    helpButton.textContent = 'help';
    helpButton.setAttribute('aria-expanded', 'false');
    helpButton.addEventListener('click', () => {
      showShortageHelp(article, stageId, timerControl.element, helpButton);
    });
    header.append(helpButton);
  }

  article.append(timerControl.element);
  return { article, timerControl };
}

function showShortageHelp(article, stageId, timerElement, button) {
  const text = shortageHelpMessages[stageId];
  if (!text) return;
  let panel = article.querySelector('.challenge-help');
  if (!panel) {
    panel = document.createElement('p');
    panel.className = 'challenge-help hidden';
    article.insertBefore(panel, timerElement);
  }
  const isHidden = panel.classList.contains('hidden');
  if (!isHidden && panel.dataset.stageId === stageId) {
    panel.classList.add('hidden');
    button?.setAttribute('aria-expanded', 'false');
    return;
  }
  panel.dataset.stageId = stageId;
  panel.textContent = text;
  panel.classList.remove('hidden');
  button?.setAttribute('aria-expanded', 'true');
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

function randomInRange(min, max) {
  const lower = Math.min(min, max);
  const upper = Math.max(min, max);
  return Math.floor(Math.random() * (upper - lower + 1)) + lower;
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
    'Phase sliders rise from the spire. Sweep for the precise caretaker frequency—when the number hums, hold it there.';
  article.append(prompt);

  const randomTarget = () => Math.floor(Math.random() * 100) + 1;

  const coils = [
    {
      id: 'outer',
      label: 'outer coil',
      detail: 'Guards the users waiting in the atrium.',
    },
    {
      id: 'median',
      label: 'median coil',
      detail: "Echoes the caretakers' shared heartbeat.",
    },
    {
      id: 'inner',
      label: 'inner coil',
      detail: 'Cradles the archive heart directly.',
    },
  ].map((coil) => ({ ...coil, target: randomTarget() }));

  const sliders = new Map();
  const coilSignalAudio = new Audio('files/coilSignal.mp3');
  coilSignalAudio.preload = 'auto';

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
    const startingValue = 0;
    input.value = String(startingValue);
    input.dataset.id = coil.id;
    input.className = 'calibration-slider';
    const readout = document.createElement('span');
    readout.className = 'calibration-readout';
    readout.textContent = input.value;

    const sliderState = { input, wrapper, target: coil.target, lastValue: Number(input.value) };

    input.addEventListener('input', () => {
      const value = Number(input.value);
      readout.textContent = input.value;

      const crossedTarget =
        value === sliderState.target ||
        (sliderState.lastValue < sliderState.target && value > sliderState.target) ||
        (sliderState.lastValue > sliderState.target && value < sliderState.target);

      if (crossedTarget) {
        try {
          coilSignalAudio.currentTime = 0;
          const playback = coilSignalAudio.play();
          if (playback && typeof playback.catch === 'function') {
            playback.catch(() => {
              /* Ignore playback errors caused by user gesture restrictions. */
            });
          }
        } catch (error) {
          // Ignore playback errors caused by user gesture restrictions.
        }
      }

      sliderState.lastValue = value;
    });
    wrapper.append(title, input, readout);
    panel.append(wrapper);
    sliders.set(coil.id, sliderState);
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
      return value !== slider.target;
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
      context.updateStatus('Phasing drifts. Align each coil to its precise frequency.');
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

function renderBoneRhythm(context) {
  const { article, timerControl } = context.createShell('ossuary cadence');
  context.container.append(article);

  const prompt = document.createElement('p');
  prompt.className = 'challenge-prompt';
  prompt.innerHTML =
    'Four vertebrae glow in time with a remembered lullaby. Toggle the beats that must ring to calm the kiln spirits.';
  article.append(prompt);

  const beats = [
    { id: 'beat-one', label: 'first vertebra', detail: 'Starts the lullaby with a soft tap.', expected: true },
    { id: 'beat-two', label: 'second vertebra', detail: 'Rests to let bone dust settle.', expected: false },
    { id: 'beat-three', label: 'third vertebra', detail: 'Strikes sharply to warn the ligaments.', expected: true },
    { id: 'beat-four', label: 'fourth vertebra', detail: 'Sustains the glow that keeps the hitchers away.', expected: true },
  ];

  const active = new Map();
  const grid = document.createElement('div');
  grid.className = 'choice-grid';
  article.append(grid);

  beats.forEach((beat) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'choice-button';
    button.dataset.id = beat.id;
    button.innerHTML = `
      <span class="choice-title">${beat.label}</span>
      <span class="choice-detail">${beat.detail}</span>
    `;
    button.addEventListener('click', () => {
      const current = active.get(beat.id) ?? false;
      const next = !current;
      active.set(beat.id, next);
      button.classList.toggle('selected', next);
      button.setAttribute('aria-pressed', next ? 'true' : 'false');
      context.updateStatus(next ? `${beat.label} hums.` : `${beat.label} falls quiet.`);
    });
    button.setAttribute('aria-pressed', 'false');
    grid.append(button);
  });

  const submit = document.createElement('button');
  submit.type = 'button';
  submit.className = 'glitch-button primary';
  submit.textContent = 'commit cadence';
  submit.addEventListener('click', () => {
    const incorrect = beats.filter((beat) => {
      const value = active.get(beat.id) ?? false;
      return value !== beat.expected;
    });
    if (incorrect.length === 0) {
      context.complete('The lullaby aligns. Bone dust drifts harmlessly.');
    } else {
      incorrect.forEach((beat) => {
        const button = grid.querySelector(`button[data-id="${beat.id}"]`);
        if (button) {
          button.classList.add('incorrect');
          setTimeout(() => button.classList.remove('incorrect'), 520);
        }
      });
      context.updateStatus('The pattern falters. Adjust the glowing beats.');
    }
  });

  article.append(submit);

  return { timerControl };
}

function renderLanternWeave(context) {
  const { article, timerControl } = context.createShell('lantern braid');
  context.container.append(article);

  const prompt = document.createElement('p');
  prompt.className = 'challenge-prompt';
  prompt.innerHTML =
    'Choose three light threads whose frequencies sum to the archivist pass. The others will tangle the braid.';
  article.append(prompt);

  const threads = [
    { id: 'cerulean', label: 'cerulean filament', value: 4, detail: 'A cool hue that calms restless shelves.' },
    { id: 'amber', label: 'amber filament', value: 7, detail: 'Keeps the moth scribes warm enough to write.' },
    { id: 'violet', label: 'violet filament', value: 9, detail: 'Adds a whisper of warning to the glow.' },
    { id: 'ember', label: 'ember filament', value: 6, detail: 'Stokes courage in the reader chair.' },
    { id: 'ashen', label: 'ashen filament', value: 3, detail: 'Dampens runaway sparks.' },
  ];

  const target = 19;
  const selected = new Set();

  const grid = document.createElement('div');
  grid.className = 'choice-grid';
  article.append(grid);

  threads.forEach((thread) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'choice-button';
    button.dataset.id = thread.id;
    button.innerHTML = `
      <span class="choice-title">${thread.label}</span>
      <span class="choice-detail">${thread.detail}</span>
      <span class="choice-detail">frequency ${thread.value}</span>
    `;
    button.setAttribute('aria-pressed', 'false');
    button.addEventListener('click', () => {
      if (selected.has(thread.id)) {
        selected.delete(thread.id);
        button.classList.remove('selected');
        button.setAttribute('aria-pressed', 'false');
      } else {
        selected.add(thread.id);
        button.classList.add('selected');
        button.setAttribute('aria-pressed', 'true');
      }
    });
    grid.append(button);
  });

  const submit = document.createElement('button');
  submit.type = 'button';
  submit.className = 'glitch-button primary';
  submit.textContent = 'weave threads';
  submit.addEventListener('click', () => {
    if (selected.size !== 3) {
      context.updateStatus('Exactly three filaments must intertwine.');
      return;
    }
    const sum = Array.from(selected).reduce((total, id) => {
      const thread = threads.find((entry) => entry.id === id);
      return total + (thread ? thread.value : 0);
    }, 0);
    if (sum === target) {
      context.complete('The braid hums with balanced light. The shelves glow awake.');
    } else {
      context.updateStatus('The braid sputters. Recalculate the glowing threads.');
      selected.forEach((id) => {
        const button = grid.querySelector(`button[data-id="${id}"]`);
        if (button) {
          button.classList.add('incorrect');
          setTimeout(() => button.classList.remove('incorrect'), 520);
        }
      });
      selected.clear();
      grid.querySelectorAll('button').forEach((button) => {
        button.classList.remove('selected');
        button.setAttribute('aria-pressed', 'false');
      });
    }
  });

  article.append(submit);

  return { timerControl };
}

function renderKilnChord(context) {
  const { article, timerControl } = context.createShell('kiln chord');
  context.container.append(article);

  const prompt = document.createElement('p');
  prompt.className = 'challenge-prompt';
  prompt.innerHTML =
    'Caretaker notes record precise vent temperatures. Slide each gauge to its remembered mark before the kiln complains.';
  article.append(prompt);

  const log = document.createElement('div');
  log.className = 'challenge-log';
  log.innerHTML = `
    <p><strong>Temperature Ledger</strong></p>
    <p>• Northern vent: <span class="highlight">428°</span></p>
    <p>• Eastern vent: <span class="highlight">356°</span></p>
    <p>• Southern vent: <span class="highlight">312°</span></p>
  `;
  article.append(log);

  const vents = [
    { id: 'north', label: 'northern vent', detail: 'Feeds cooled air across the bone lathe.', target: 428 },
    { id: 'east', label: 'eastern vent', detail: 'Keeps tendon orbits supple.', target: 356 },
    { id: 'south', label: 'southern vent', detail: 'Bathes the calcine vault in forgiving heat.', target: 312 },
  ];

  const sliders = new Map();

  vents.forEach((vent) => {
    const wrapper = document.createElement('div');
    wrapper.className = 'calibration-item';
    const title = document.createElement('p');
    title.innerHTML = `<span class="highlight">${vent.label}</span> — ${vent.detail}`;
    const input = document.createElement('input');
    input.type = 'range';
    input.min = '280';
    input.max = '480';
    input.value = String(vent.target - 20);
    input.dataset.id = vent.id;
    input.className = 'calibration-slider';
    const readout = document.createElement('span');
    readout.className = 'calibration-readout';
    readout.textContent = `${input.value}°`; 

    input.addEventListener('input', () => {
      readout.textContent = `${input.value}°`;
    });

    wrapper.append(title, input, readout);
    article.append(wrapper);
    sliders.set(vent.id, { input, wrapper, target: vent.target });
  });

  const submit = document.createElement('button');
  submit.type = 'button';
  submit.className = 'glitch-button primary';
  submit.textContent = 'seal temperature';
  submit.addEventListener('click', () => {
    const mismatched = vents.filter((vent) => {
      const slider = sliders.get(vent.id);
      if (!slider) return true;
      const value = Number(slider.input.value);
      return value !== vent.target;
    });
    if (mismatched.length === 0) {
      context.complete('The vents sigh in relief. Heat evens out across the kiln.');
    } else {
      mismatched.forEach((vent) => {
        const slider = sliders.get(vent.id);
        if (slider) {
          slider.wrapper.classList.add('incorrect');
          setTimeout(() => slider.wrapper.classList.remove('incorrect'), 520);
        }
      });
      context.updateStatus('Read the caretaker log again. Every gauge must match exactly.');
    }
  });

  article.append(submit);

  return { timerControl };
}

function renderFlashlightCues(context) {
  const { article, timerControl } = context.createShell('flashlight routine');
  context.container.append(article);

  const prompt = document.createElement('p');
  prompt.className = 'challenge-prompt';
  prompt.innerHTML =
    'Repeat the anti-hitcher pattern taught in the observatory: three quick pulses, one sweeping arc, then a held beam.';
  article.append(prompt);

  const expected = ['short', 'short', 'short', 'long', 'hold'];
  const sequence = [];

  const status = document.createElement('p');
  status.className = 'challenge-log';
  status.textContent = 'Awaiting first pulse.';
  article.append(status);

  const buttons = [
    { id: 'short', label: 'short flash', detail: 'A heartbeat of light.' },
    { id: 'long', label: 'long sweep', detail: 'Arc the beam across the walls.' },
    { id: 'hold', label: 'steady hold', detail: 'Fix the beam and refuse to blink.' },
  ];

  const controlRow = document.createElement('div');
  controlRow.className = 'choice-grid';
  article.append(controlRow);

  buttons.forEach((pulse) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'choice-button';
    button.dataset.id = pulse.id;
    button.innerHTML = `
      <span class="choice-title">${pulse.label}</span>
      <span class="choice-detail">${pulse.detail}</span>
    `;
    button.addEventListener('click', () => {
      sequence.push(pulse.id);
      status.textContent = `Pulse ${sequence.length}/${expected.length} recorded.`;
      if (!expected.slice(0, sequence.length).every((value, index) => value === sequence[index])) {
        status.textContent = 'Pattern slipped. Resetting sequence.';
        sequence.length = 0;
        context.updateStatus('The hitcher smirks. Try the cadence again.');
        controlRow.querySelectorAll('.choice-button').forEach((btn) => {
          btn.classList.add('incorrect');
          setTimeout(() => btn.classList.remove('incorrect'), 420);
        });
        return;
      }
      if (sequence.length === expected.length) {
        context.complete('The hitcher recoils. The corridor cheers silently.');
      }
    });
    controlRow.append(button);
  });

  const reset = document.createElement('button');
  reset.type = 'button';
  reset.className = 'glitch-button ghost';
  reset.textContent = 'reset pattern';
  reset.addEventListener('click', () => {
    sequence.length = 0;
    status.textContent = 'Sequence cleared. Awaiting first pulse.';
  });
  article.append(reset);

  return { timerControl };
}

function renderHostageCipher(context) {
  const { article, timerControl } = context.createShell('hostage cipher');
  context.container.append(article);

  const prompt = document.createElement('p');
  prompt.className = 'challenge-prompt';
  prompt.innerHTML =
    'Three captive whispers speak at once. Assign each the promise that frees instead of binds.';
  article.append(prompt);

  const voices = [
    {
      id: 'chain',
      clue: '"Let me coil around your wrist and I will guide you forever."',
      answer: 'refusal',
    },
    {
      id: 'mirror',
      clue: '"Trade your reflection for a map of exits."',
      answer: 'counter-oath',
    },
    {
      id: 'echo',
      clue: '"Carry my song and I will follow your light."',
      answer: 'escort',
    },
  ];

  const options = [
    { value: 'refusal', label: 'Refusal – deny the bargain and keep autonomy.' },
    { value: 'counter-oath', label: 'Counter-oath – rewrite the promise on your terms.' },
    { value: 'escort', label: 'Escort – carry the whisper as a companion, not a captor.' },
  ];

  const selects = new Map();

  voices.forEach((voice) => {
    const block = document.createElement('div');
    block.className = 'challenge-log';
    block.innerHTML = `<p>${voice.clue}</p>`;

    const select = document.createElement('select');
    select.className = 'challenge-input';
    select.dataset.id = voice.id;
    const placeholder = document.createElement('option');
    placeholder.value = '';
    placeholder.textContent = 'choose promise';
    select.append(placeholder);
    options.forEach((option) => {
      const opt = document.createElement('option');
      opt.value = option.value;
      opt.textContent = option.label;
      select.append(opt);
    });
    block.append(select);
    article.append(block);
    selects.set(voice.id, select);
  });

  const submit = document.createElement('button');
  submit.type = 'button';
  submit.className = 'glitch-button primary';
  submit.textContent = 'translate whispers';
  submit.addEventListener('click', () => {
    let incomplete = false;
    const incorrect = [];
    selects.forEach((select, id) => {
      if (!select.value) {
        incomplete = true;
      } else {
        const voice = voices.find((entry) => entry.id === id);
        if (voice && voice.answer !== select.value) {
          incorrect.push(select);
        }
      }
    });
    if (incomplete) {
      context.updateStatus('Every whisper must receive a promise. None may be left empty.');
      return;
    }
    if (incorrect.length === 0) {
      context.complete('The whispers nod, freed to follow your light instead of trapping it.');
    } else {
      incorrect.forEach((select) => {
        select.classList.add('fault');
        setTimeout(() => select.classList.remove('fault'), 520);
      });
      context.updateStatus('One promise still binds. Reconsider your assignments.');
    }
  });

  article.append(submit);

  return { timerControl };
}

function renderLumenLock(context) {
  const { article, timerControl } = context.createShell('lumen lock');
  context.container.append(article);

  const prompt = document.createElement('p');
  prompt.className = 'challenge-prompt';
  prompt.innerHTML =
    'Dormant bulbs line the engine. Activate them from faintest to brightest so the heart awakens gently.';
  article.append(prompt);

  const bulbs = [
    { id: 'gloam', label: 'gloam spark', detail: 'Barely visible until coaxed.', intensity: 1 },
    { id: 'dawn', label: 'dawn pulse', detail: 'Warms slowly when encouraged.', intensity: 3 },
    { id: 'noon', label: 'noon flare', detail: 'Blazes with confidence.', intensity: 5 },
    { id: 'zenith', label: 'zenith beam', detail: 'A spear of focused brilliance.', intensity: 7 },
  ];

  const expected = bulbs
    .slice()
    .sort((a, b) => a.intensity - b.intensity)
    .map((bulb) => bulb.id);
  let progress = 0;

  const grid = document.createElement('div');
  grid.className = 'choice-grid';
  article.append(grid);

  const buttons = bulbs.map((bulb) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'choice-button';
    button.dataset.id = bulb.id;
    button.innerHTML = `
      <span class="choice-title">${bulb.label}</span>
      <span class="choice-detail">${bulb.detail}</span>
      <span class="choice-detail">lumen ${bulb.intensity}</span>
    `;
    button.addEventListener('click', () => {
      const expectedId = expected[progress];
      if (bulb.id === expectedId) {
        button.classList.add('correct-step');
        button.disabled = true;
        progress += 1;
        context.updateStatus(`Rune ${progress}/${expected.length} awakened.`);
        if (progress === expected.length) {
          context.complete('The lumen engine spins up, bathing the amphitheatre in gold.');
        }
      } else {
        context.updateStatus('Brightness out of order. The engine dims.');
        progress = 0;
        buttons.forEach((btn) => {
          btn.classList.remove('correct-step');
          btn.disabled = false;
          btn.classList.add('incorrect');
          setTimeout(() => btn.classList.remove('incorrect'), 520);
        });
      }
    });
    grid.append(button);
    return button;
  });

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

function dismissPreferencesForFailure() {
  if (!settingsOverlay) return;
  if (!settingsOverlay.classList.contains('hidden')) {
    settingsOverlay.classList.add('hidden');
  }
  if (isPaused) {
    isPaused = false;
    stopMainMenuAudio();
  }
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

if (flashlightButton) {
  flashlightButton.addEventListener('click', () => {
    showTutorialOverlay({ allowRepeat: true });
  });
  flashlightButton.setAttribute('title', 'Press F to toggle the flashlight. Click to review the tutorial.');
}

tutorialDismissButton?.addEventListener('click', () => {
  hideTutorialOverlay();
});

abortFinalPuzzleButton?.addEventListener('click', () => {
  abortFinalPuzzle();
});

finalPuzzleButton?.addEventListener('click', () => {
  const summary = finalText.textContent;
  startFinalPuzzleSequence({ summary });
});

restartRunButton?.addEventListener('click', () => {
  window.location.reload();
});

pointerSwitch?.addEventListener('change', (event) => {
  updatePointerPreference(event.target.checked);
});

staticSwitch?.addEventListener('change', (event) => {
  updateStaticPreference(event.target.checked);
});

function handleVolumeSliderInput(event) {
  const rawValue = Number(event.target.value);
  if (Number.isNaN(rawValue)) return;
  const persist = event.type === 'change';
  setMasterVolume(rawValue / 100, { persist });
}

volumeSlider?.addEventListener('input', handleVolumeSliderInput);
volumeSlider?.addEventListener('change', handleVolumeSliderInput);

settingsOverlay?.addEventListener('click', (event) => {
  if (event.target === settingsOverlay) {
    closePreferences();
  }
});

acknowledgeEncounterButton?.addEventListener('click', () => {
  if (acknowledgeEncounterButton.disabled) return;
  closeEncounter();
});

closeEncounterButton?.addEventListener('click', () => {
  if (closeEncounterButton.disabled) return;
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
  const target = event.target;
  const tagName = target?.tagName;
  if (tagName === 'INPUT' || tagName === 'TEXTAREA' || tagName === 'SELECT' || target?.isContentEditable) {
    return;
  }
  const key = event.key?.toLowerCase();
  if (key === 'f') {
    event.preventDefault();
    if (!event.repeat) {
      toggleFlashlightFromInput();
    }
    return;
  }
  if (key === 'h') {
    event.preventDefault();
    if (flickerActive) {
      beginEyesHold();
    } else if (!event.repeat) {
      toggleManualEyes();
    }
    return;
  }
  if (event.key === 'Escape') {
    if (tutorialVisible) {
      event.preventDefault();
      hideTutorialOverlay();
      return;
    }
    togglePreferences();
  }
});

document.addEventListener('keyup', (event) => {
  if (introActive) return;
  if (event.key?.toLowerCase() === 'h') {
    if (flickerActive || eyesHoldActive) {
      endEyesHold();
    }
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
  updateFlashlightBeamPosition(pointerPosition.x, pointerPosition.y);
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
