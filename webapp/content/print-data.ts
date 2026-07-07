export type PrintIssue = {
  slug: string;
  index: number;
  title: string;
  shortTitle: string;
  summary: string;
  status: "available" | "in development";
  focus: string[];
  qrExperiences: string[];
  structure: string[];
  bibliographyAngle: string;
  routeNote: string;
  lineSlug: string;
  volumeSlug: string;
};

export type PrintVolume = {
  slug: string;
  index: number;
  title: string;
  summary: string;
  status: "available" | "building";
  themes: string[];
  editorialDirection: string;
  issueSlugs: string[];
  lineSlug: string;
};

export type EditorialLine = {
  slug: string;
  title: string;
  summary: string;
  status: "active" | "developing";
  accent: string;
  position: string;
  qrPromise: string;
  bibliographyBridge: string;
  volumeSlugs: string[];
};

const issues: PrintIssue[] = [
  {
    slug: "from-variables-to-squares",
    index: 1,
    title: "From Variables to Squares",
    shortTitle: "Variables to Squares",
    summary:
      "A first CodeQuest issue that moves from memory and arithmetic into control flow, looping, and pattern-building problems.",
    status: "available",
    focus: ["variables", "operators", "control flow", "while", "for", "patterns"],
    qrExperiences: [
      "Loop visualizers for square, diagonal, and rhombus patterns.",
      "Recap pages that revisit variables and arithmetic without breaking the print rhythm.",
      "Challenge extensions for the finale problem and language appendix.",
    ],
    structure: [
      "Opening hook and motivational framing.",
      "Concept build-up from variables and operators to control structures.",
      "Pattern-driven exercises that culminate in a final boss challenge.",
    ],
    bibliographyAngle:
      "Balances stronger long-form explanations with a magazine rhythm shaped for retention, exercise flow, and approachable abstraction.",
    routeNote:
      "This issue establishes the reading contract: paper introduces the idea, QR bridges carry the reader toward practice and deeper structure.",
    lineSlug: "codequest",
    volumeSlug: "codequest-essentials",
  },
  {
    slug: "calculatorul-nu-stie-sa-citeasca",
    index: 1,
    title: "Calculatorul nu stie sa citeasca",
    shortTitle: "Calculatorul nu stie sa citeasca",
    summary:
      "A number-focused issue about digits, `mod`, `div`, mirrored reconstruction, and the algorithmic path toward palindrome reasoning.",
    status: "available",
    focus: ["digits", "mod and div", "powers of ten", "palindrome logic", "Blockly tasks"],
    qrExperiences: [
      "Step-by-step digit decomposition widgets for `mod` and `div`.",
      "Interactive number mirroring sequences and palindrome checks.",
      "Recap cards and Blockly-inspired continuations tied to the same narrative problem.",
    ],
    structure: [
      "Shared visual rhythm with the first volume, adapted to numeric decomposition.",
      "A progression from operator behavior to full-number reconstruction.",
      "A recap layer plus a magazine-style final challenge.",
    ],
    bibliographyAngle:
      "Keeps the pseudocode-first stance while using web extensions to offload interaction, traceability, and extra examples.",
    routeNote:
      "The issue page can become the stable landing point behind each print QR, connecting every exercise to a live explanation or continuation.",
    lineSlug: "codequest",
    volumeSlug: "codequest-algorithmic-thinking",
  },
];

const volumes: PrintVolume[] = [
  {
    slug: "codequest-essentials",
    index: 1,
    title: "Essentials",
    summary:
      "Foundational computational thinking through variables, control flow, repetition, and first construction patterns.",
    status: "available",
    themes: ["memory", "arithmetic", "control", "iteration"],
    editorialDirection:
      "The first volume establishes CodeQuest as a print-first but digitally extensible route where readers move between concise explanations, bold exercises, and stable QR-linked continuations.",
    issueSlugs: ["from-variables-to-squares"],
    lineSlug: "codequest",
  },
  {
    slug: "codequest-algorithmic-thinking",
    index: 2,
    title: "Algorithmic Thinking",
    summary:
      "Problem decomposition, numeric reasoning, and stronger algorithmic habits built through focused issue arcs.",
    status: "available",
    themes: ["problem solving", "number logic", "traceability", "reasoning"],
    editorialDirection:
      "This volume leans into stepwise thinking, explicit transformations, and tasks that are easier to understand when print and interaction cooperate.",
    issueSlugs: ["calculatorul-nu-stie-sa-citeasca"],
    lineSlug: "codequest",
  },
  {
    slug: "codequest-working-with-data",
    index: 3,
    title: "Working with Data",
    summary:
      "A planned route toward structured information, tables, transformations, and the first data-centered abstractions.",
    status: "building",
    themes: ["collections", "tables", "transforms", "representation"],
    editorialDirection:
      "This volume is positioned to turn concrete manipulation into more formal data reasoning while preserving the same magazine-plus-web rhythm.",
    issueSlugs: [],
    lineSlug: "codequest",
  },
  {
    slug: "codequest-data-structures",
    index: 4,
    title: "Data Structures",
    summary:
      "A planned progression into arrays, linked ideas, trees, and graph-shaped thinking for more advanced learners.",
    status: "building",
    themes: ["arrays", "links", "trees", "graphs"],
    editorialDirection:
      "This is where the editorial line can visibly align print explanation with the dissertation’s graph-oriented knowledge backbone.",
    issueSlugs: [],
    lineSlug: "codequest",
  },
];

const lines: EditorialLine[] = [
  {
    slug: "codequest",
    title: "CodeQuest",
    summary:
      "A recurring computing line that turns printed issues into guided routes through algorithmic thinking, programming ideas, and concept structure.",
    status: "active",
    accent: "bg-amber-400",
    position:
      "CodeQuest is the most advanced print line in the current workspace, with real volume and issue structure already taking shape.",
    qrPromise:
      "Its QR codes are not decorative. They are stable bridges into exercises, recaps, route maps, and issue-specific companion pages.",
    bibliographyBridge:
      "The line borrows from concept-mapping, progression design, and interactive CS pedagogy: overview first, then detail on demand, then active problem solving.",
    volumeSlugs: [
      "codequest-essentials",
      "codequest-algorithmic-thinking",
      "codequest-working-with-data",
      "codequest-data-structures",
    ],
  },
  {
    slug: "origin-continuum",
    title: "Origin Continuum",
    summary:
      "The broader editorial umbrella for the project’s educational print direction, framing the series as a coherent continuum rather than isolated titles.",
    status: "developing",
    accent: "bg-cyan-400",
    position:
      "This line can hold the institutional identity, cross-series framing, and the long-form rationale that links print, web, and future school use.",
    qrPromise:
      "Its future QR layer can foreground bibliography, project notes, and thematic cross-links between series.",
    bibliographyBridge:
      "It is the natural place to surface the dissertation’s academic backbone in a reader-friendly editorial form.",
    volumeSlugs: [],
  },
  {
    slug: "reality-engine",
    title: "Reality Engine",
    summary:
      "A developing line for science-and-systems explorations where physical artifacts, conceptual modeling, and interactive extensions can work together.",
    status: "developing",
    accent: "bg-emerald-400",
    position:
      "This line is still early, but it supports the wider ecosystem idea that print can be a launch point into richer digital structures.",
    qrPromise:
      "The same stable landing architecture can later support labs, simulations, or build notes.",
    bibliographyBridge:
      "It can reuse the same research-backed patterns around conceptual orientation, exploration, and guided progression.",
    volumeSlugs: [],
  },
];

export const printNarrative = {
  heroTitle: "Print that opens into a living learning route.",
  heroSubtitle:
    "This webapp presents the initiative behind the print layer: editorial lines, volume structure, issue pages, and the interactive role of QR codes as stable bridges into deeper learning.",
  linesTitle: "Editorial lines",
  linesSubtitle:
    "Each line acts like a structured route rather than a loose shelf. The print object stays tactile and memorable, while the web companion keeps context, prerequisites, and extensions visible.",
  volumesTitle: "Volumes",
  volumesSubtitle:
    "Volumes organize progression. They give the line a pedagogical cadence and create stable homes for issue-level QR targets.",
  issuesTitle: "Issues",
  issuesSubtitle:
    "Issue pages anchor the editorial rhythm: one magazine, one focused problem arc, one digital companion that can expand without cluttering the printed page.",
};

export const printLines = lines;
export const printVolumes = volumes;
export const printIssues = issues;

export function getLine(slug: string) {
  return lines.find((line) => line.slug === slug);
}

export function getVolume(slug: string) {
  return volumes.find((volume) => volume.slug === slug);
}

export function getIssue(slug: string) {
  return issues.find((issue) => issue.slug === slug);
}

export function getVolumesForLine(lineSlug: string) {
  return volumes.filter((volume) => volume.lineSlug === lineSlug);
}

export function getIssuesForVolume(volumeSlug: string) {
  return issues.filter((issue) => issue.volumeSlug === volumeSlug);
}

export function getIssuesForLine(lineSlug: string) {
  return issues.filter((issue) => issue.lineSlug === lineSlug);
}
