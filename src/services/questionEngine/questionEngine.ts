/* =========================================================
   MEDIKIOSK ADAPTIVE AYURVEDA QUESTION ENGINE
========================================================= */

export type ComplaintId =
  | "headache"
  | "joint-pain"
  | "acidity"
  | "skin"
  | "sleep"
  | "weakness"
  | "fever-cough"
  | "constipation"
  | "diarrhea"
  | "low-back-pain"
  | "eye-problem"
  | "other";

export interface AdaptiveQuestion {
  id: string;
  question: string;
  category: string;
  subCategory: string;
  complaint: ComplaintId;
  options?: string[];
  required: boolean;
  priority: number;
}

export interface StoredHistoryAnswer {
  questionId: string;
  answer: string;
}

/* =========================================================
   COMPLAINT DEFINITIONS
========================================================= */

export const COMPLAINTS: {
  id: ComplaintId;
  name: string;
  displayName: string;
  keywords: string[];
}[] = [
  {
    id: "headache",
    name: "Shira Shula",
    displayName: "Headache",
    keywords: [
      "headache",
      "head pain",
      "head hurts",
      "migraine",
      "pain in my head",
    ],
  },

  {
    id: "joint-pain",
    name: "Sandhi Shula",
    displayName:
      "Joint Pain / Stiffness",
    keywords: [
      "joint pain",
      "joint",
      "knee pain",
      "knee",
      "elbow pain",
      "shoulder pain",
      "ankle pain",
      "wrist pain",
      "stiffness",
      "joints hurt",
    ],
  },

  {
    id: "acidity",
    name: "Amlapitta",
    displayName:
      "Stomach Pain / Acidity",
    keywords: [
      "stomach pain",
      "stomach ache",
      "acidity",
      "acid reflux",
      "heartburn",
      "burning in stomach",
      "gas",
      "indigestion",
    ],
  },

  {
    id: "skin",
    name: "Tvak Roga",
    displayName:
      "Skin Rash / Itching",
    keywords: [
      "skin rash",
      "rash",
      "itching",
      "itchy skin",
      "skin problem",
      "skin irritation",
    ],
  },

  {
    id: "sleep",
    name: "Anidra",
    displayName:
      "Sleep Difficulty",
    keywords: [
      "cannot sleep",
      "can't sleep",
      "sleep problem",
      "sleep difficulty",
      "insomnia",
      "not sleeping",
      "poor sleep",
    ],
  },

  {
    id: "weakness",
    name: "Daurbalya",
    displayName:
      "Weakness / Fatigue",
    keywords: [
      "weakness",
      "weak",
      "fatigue",
      "tired",
      "low energy",
      "no energy",
      "exhausted",
    ],
  },

  {
    id: "fever-cough",
    name: "Jwara / Kasa",
    displayName:
      "Fever / Cough",
    keywords: [
      "fever",
      "temperature",
      "cough",
      "cold",
      "flu",
      "throat",
    ],
  },

  {
    id: "constipation",
    name: "Vibandha",
    displayName:
      "Constipation",
    keywords: [
      "constipation",
      "hard stool",
      "difficulty passing stool",
      "not passing stool",
    ],
  },

  {
    id: "diarrhea",
    name: "Atisara",
    displayName:
      "Diarrhea",
    keywords: [
      "diarrhea",
      "loose motion",
      "loose stools",
      "frequent stool",
    ],
  },

  {
    id: "low-back-pain",
    name: "Kati Shula",
    displayName:
      "Low Back Pain",
    keywords: [
      "back pain",
      "lower back",
      "low back",
      "backache",
      "waist pain",
    ],
  },

  {
    id: "eye-problem",
    name: "Netra Roga",
    displayName:
      "Eye Problems",
    keywords: [
      "eye pain",
      "eye problem",
      "blurred vision",
      "eyes",
      "eye irritation",
    ],
  },

  {
    id: "other",
    name: "Other",
    displayName:
      "Something else",
    keywords: [],
  },
];

/* =========================================================
   HEADACHE PATHWAY
========================================================= */

const HEADACHE_QUESTIONS: AdaptiveQuestion[] = [
  {
    id: "HEADACHE_LOCATION",
    question:
      "Where do you feel the pain in your head?",
    category: "Vikriti",
    subCategory: "Sthana",
    complaint: "headache",
    options: [
      "Whole head",
      "One side",
      "Forehead",
      "Around the eyes",
      "Back of the head",
      "Other location",
    ],
    required: true,
    priority: 1,
  },

  {
    id: "HEADACHE_ONSET",
    question:
      "When did your headache start?",
    category: "Vikriti",
    subCategory: "Onset",
    complaint: "headache",
    options: [
      "Today",
      "A few days ago",
      "More than a week ago",
      "More than a month ago",
      "Not sure",
    ],
    required: true,
    priority: 2,
  },

  {
    id: "HEADACHE_TIMING",
    question:
      "When does the headache usually occur?",
    category: "Vikriti",
    subCategory: "Timing",
    complaint: "headache",
    options: [
      "Morning",
      "Afternoon",
      "Evening",
      "Night",
      "Any time",
      "Variable",
    ],
    required: true,
    priority: 3,
  },

  {
    id: "HEADACHE_AGGRAVATING",
    question:
      "What tends to make the headache worse?",
    category: "Vikriti",
    subCategory:
      "Aggravating Factors",
    complaint: "headache",
    options: [
      "Screen use",
      "Bright light",
      "Noise",
      "Stress",
      "Lack of sleep",
      "Food or meals",
      "Physical activity",
      "Not sure",
    ],
    required: true,
    priority: 4,
  },

  {
    id: "HEADACHE_ASSOCIATED",
    question:
      "Do you experience any associated symptoms with the headache?",
    category: "Vikriti",
    subCategory:
      "Associated Complaints",
    complaint: "headache",
    options: [
      "Nausea",
      "Vomiting",
      "Dizziness",
      "Sensitivity to light",
      "Sensitivity to sound",
      "None",
      "Other",
    ],
    required: true,
    priority: 5,
  },
];

/* =========================================================
   JOINT PAIN PATHWAY
========================================================= */

const JOINT_PAIN_QUESTIONS: AdaptiveQuestion[] = [
  {
    id: "JOINT_LOCATION",
    question:
      "Which joint is troubling you?",
    category: "Vikriti",
    subCategory: "Sthana",
    complaint: "joint-pain",
    options: [
      "Knee",
      "Shoulder",
      "Elbow",
      "Wrist",
      "Ankle",
      "Hip",
      "Multiple joints",
      "Other",
    ],
    required: true,
    priority: 1,
  },

  {
    id: "JOINT_SIDE",
    question:
      "Which side is affected?",
    category: "Vikriti",
    subCategory: "Laterality",
    complaint: "joint-pain",
    options: [
      "Right side",
      "Left side",
      "Both sides",
      "Not sure",
    ],
    required: true,
    priority: 2,
  },

  {
    id: "JOINT_ONSET",
    question:
      "When did the joint pain start?",
    category: "Vikriti",
    subCategory: "Onset",
    complaint: "joint-pain",
    options: [
      "Today",
      "A few days ago",
      "A few weeks ago",
      "A few months ago",
      "More than a year ago",
      "Not sure",
    ],
    required: true,
    priority: 3,
  },

  {
    id: "JOINT_NATURE",
    question:
      "How would you describe the joint pain?",
    category: "Vikriti",
    subCategory: "Nature",
    complaint: "joint-pain",
    options: [
      "Dull",
      "Sharp",
      "Aching",
      "Stiff",
      "Burning",
      "Variable",
      "Not sure",
    ],
    required: true,
    priority: 4,
  },

  {
    id: "JOINT_STIFFNESS",
    question:
      "Do you experience stiffness in the joint?",
    category: "Vikriti",
    subCategory: "Associated Complaints",
    complaint: "joint-pain",
    options: [
      "Yes",
      "No",
      "Sometimes",
      "Not sure",
    ],
    required: true,
    priority: 5,
  },

  {
    id: "JOINT_SWELLING",
    question:
      "Is there any swelling around the joint?",
    category: "Vikriti",
    subCategory: "Associated Complaints",
    complaint: "joint-pain",
    options: [
      "Yes",
      "No",
      "Sometimes",
      "Not sure",
    ],
    required: true,
    priority: 6,
  },

  {
    id: "JOINT_AGGRAVATING",
    question:
      "What tends to make the joint pain worse?",
    category: "Vikriti",
    subCategory:
      "Aggravating Factors",
    complaint: "joint-pain",
    options: [
      "Walking",
      "Movement",
      "Standing",
      "Climbing stairs",
      "Cold weather",
      "Rest",
      "Other",
      "Not sure",
    ],
    required: true,
    priority: 7,
  },
];

/* =========================================================
   ACIDITY PATHWAY
========================================================= */

const ACIDITY_QUESTIONS: AdaptiveQuestion[] = [
  {
    id: "ACIDITY_LOCATION",
    question:
      "Where exactly do you feel the discomfort?",
    category: "Vikriti",
    subCategory: "Sthana",
    complaint: "acidity",
    options: [
      "Upper abdomen",
      "Middle abdomen",
      "Lower abdomen",
      "Chest",
      "Around the stomach",
      "Other",
    ],
    required: true,
    priority: 1,
  },

  {
    id: "ACIDITY_ONSET",
    question:
      "When did this problem start?",
    category: "Vikriti",
    subCategory: "Onset",
    complaint: "acidity",
    options: [
      "Today",
      "A few days ago",
      "A few weeks ago",
      "A few months ago",
      "Longer ago",
      "Not sure",
    ],
    required: true,
    priority: 2,
  },

  {
    id: "ACIDITY_FOOD",
    question:
      "Does the discomfort relate to eating?",
    category: "Vikriti",
    subCategory: "Relation to Food",
    complaint: "acidity",
    options: [
      "Worse after eating",
      "Worse when hungry",
      "No clear relation",
      "Sometimes",
      "Not sure",
    ],
    required: true,
    priority: 3,
  },

  {
    id: "ACIDITY_NATURE",
    question:
      "What does the discomfort feel like?",
    category: "Vikriti",
    subCategory: "Nature",
    complaint: "acidity",
    options: [
      "Burning",
      "Pain",
      "Bloating",
      "Gas",
      "Indigestion",
      "Variable",
      "Not sure",
    ],
    required: true,
    priority: 4,
  },
];

/* =========================================================
   GENERIC PATHWAYS
========================================================= */

const GENERIC_PATHWAYS: Record<
  Exclude<
    ComplaintId,
    "headache" |
      "joint-pain" |
      "acidity"
  >,
  AdaptiveQuestion[]
> = {
  skin: [
    {
      id: "SKIN_LOCATION",
      question:
        "Where is the skin problem located?",
      category: "Vikriti",
      subCategory: "Sthana",
      complaint: "skin",
      options: [
        "Face",
        "Arms",
        "Legs",
        "Body",
        "Scalp",
        "Multiple areas",
        "Other",
      ],
      required: true,
      priority: 1,
    },
    {
      id: "SKIN_ONSET",
      question:
        "When did the skin problem start?",
      category: "Vikriti",
      subCategory: "Onset",
      complaint: "skin",
      options: [
        "Today",
        "A few days ago",
        "A few weeks ago",
        "A few months ago",
        "Not sure",
      ],
      required: true,
      priority: 2,
    },
    {
      id: "SKIN_NATURE",
      question:
        "What is the main skin symptom?",
      category: "Vikriti",
      subCategory: "Nature",
      complaint: "skin",
      options: [
        "Itching",
        "Rash",
        "Dryness",
        "Redness",
        "Burning",
        "Other",
      ],
      required: true,
      priority: 3,
    },
  ],

  sleep: [
    {
      id: "SLEEP_PROBLEM",
      question:
        "What difficulty do you have with sleep?",
      category: "Vikriti",
      subCategory: "Sleep Pattern",
      complaint: "sleep",
      options: [
        "Difficulty falling asleep",
        "Waking frequently",
        "Waking too early",
        "Not feeling rested",
        "Variable sleep",
        "Other",
      ],
      required: true,
      priority: 1,
    },
    {
      id: "SLEEP_ONSET",
      question:
        "Since when have you had this sleep difficulty?",
      category: "Vikriti",
      subCategory: "Onset",
      complaint: "sleep",
      options: [
        "A few days",
        "A few weeks",
        "A few months",
        "Longer",
        "Not sure",
      ],
      required: true,
      priority: 2,
    },
  ],

  weakness: [
    {
      id: "WEAKNESS_ONSET",
      question:
        "Since when have you been feeling weak or tired?",
      category: "Vikriti",
      subCategory: "Onset",
      complaint: "weakness",
      options: [
        "Today",
        "A few days",
        "A few weeks",
        "A few months",
        "Longer",
        "Not sure",
      ],
      required: true,
      priority: 1,
    },
    {
      id: "WEAKNESS_TIMING",
      question:
        "When do you usually feel the most weakness?",
      category: "Vikriti",
      subCategory: "Timing",
      complaint: "weakness",
      options: [
        "Morning",
        "Afternoon",
        "Evening",
        "Night",
        "Throughout the day",
        "Variable",
      ],
      required: true,
      priority: 2,
    },
  ],

  "fever-cough": [
    {
      id: "FEVER_COUGH_MAIN",
      question:
        "Which symptom is troubling you more?",
      category: "Vikriti",
      subCategory: "Chief Symptom",
      complaint: "fever-cough",
      options: [
        "Fever",
        "Cough",
        "Cold",
        "Throat discomfort",
        "More than one",
      ],
      required: true,
      priority: 1,
    },
    {
      id: "FEVER_COUGH_ONSET",
      question:
        "When did these symptoms start?",
      category: "Vikriti",
      subCategory: "Onset",
      complaint: "fever-cough",
      options: [
        "Today",
        "A few days ago",
        "About a week ago",
        "More than a week ago",
        "Not sure",
      ],
      required: true,
      priority: 2,
    },
  ],

  constipation: [
    {
      id: "CONSTIPATION_ONSET",
      question:
        "Since when have you had difficulty passing stool?",
      category: "Vikriti",
      subCategory: "Onset",
      complaint: "constipation",
      options: [
        "Today",
        "A few days",
        "A few weeks",
        "A few months",
        "Longer",
        "Not sure",
      ],
      required: true,
      priority: 1,
    },
    {
      id: "CONSTIPATION_PATTERN",
      question:
        "How is your stool usually?",
      category: "Vikriti",
      subCategory: "Stool Pattern",
      complaint: "constipation",
      options: [
        "Hard",
        "Dry",
        "Normal",
        "Variable",
        "Not sure",
      ],
      required: true,
      priority: 2,
    },
  ],

  diarrhea: [
    {
      id: "DIARRHEA_ONSET",
      question:
        "When did the loose stools start?",
      category: "Vikriti",
      subCategory: "Onset",
      complaint: "diarrhea",
      options: [
        "Today",
        "Yesterday",
        "A few days ago",
        "More than a week ago",
        "Not sure",
      ],
      required: true,
      priority: 1,
    },
    {
      id: "DIARRHEA_FREQUENCY",
      question:
        "How often are you passing loose stools?",
      category: "Vikriti",
      subCategory: "Frequency",
      complaint: "diarrhea",
      options: [
        "1–2 times a day",
        "3–5 times a day",
        "More than 5 times a day",
        "Variable",
        "Not sure",
      ],
      required: true,
      priority: 2,
    },
  ],

  "low-back-pain": [
    {
      id: "BACK_LOCATION",
      question:
        "Where exactly do you feel the back pain?",
      category: "Vikriti",
      subCategory: "Sthana",
      complaint: "low-back-pain",
      options: [
        "Centre of lower back",
        "Right side",
        "Left side",
        "Both sides",
        "Other",
      ],
      required: true,
      priority: 1,
    },
    {
      id: "BACK_ONSET",
      question:
        "When did the back pain start?",
      category: "Vikriti",
      subCategory: "Onset",
      complaint: "low-back-pain",
      options: [
        "Today",
        "A few days ago",
        "A few weeks ago",
        "A few months ago",
        "Longer",
        "Not sure",
      ],
      required: true,
      priority: 2,
    },
    {
      id: "BACK_AGGRAVATING",
      question:
        "What makes the back pain worse?",
      category: "Vikriti",
      subCategory:
        "Aggravating Factors",
      complaint: "low-back-pain",
      options: [
        "Walking",
        "Sitting",
        "Standing",
        "Bending",
        "Lifting",
        "Movement",
        "Other",
      ],
      required: true,
      priority: 3,
    },
  ],

  "eye-problem": [
    {
      id: "EYE_MAIN",
      question:
        "What is the main problem with your eyes?",
      category: "Vikriti",
      subCategory: "Chief Symptom",
      complaint: "eye-problem",
      options: [
        "Pain",
        "Blurred vision",
        "Redness",
        "Itching",
        "Watering",
        "Dryness",
        "Other",
      ],
      required: true,
      priority: 1,
    },
    {
      id: "EYE_SIDE",
      question:
        "Which eye is affected?",
      category: "Vikriti",
      subCategory: "Laterality",
      complaint: "eye-problem",
      options: [
        "Right eye",
        "Left eye",
        "Both eyes",
        "Not sure",
      ],
      required: true,
      priority: 2,
    },
  ],

  other: [
    {
      id: "OTHER_CATEGORY",
      question:
        "What type of problem are you experiencing?",
      category: "Vikriti",
      subCategory: "Problem Type",
      complaint: "other",
      options: [
        "Pain",
        "Digestive",
        "Respiratory",
        "Urinary",
        "Women's health",
        "Skin",
        "General health",
        "Something else",
      ],
      required: true,
      priority: 1,
    },
  ],
};

/* =========================================================
   GET PATHWAY
========================================================= */

export function getQuestionPathway(
  complaint: ComplaintId
): AdaptiveQuestion[] {
  if (complaint === "headache") {
    return HEADACHE_QUESTIONS;
  }

  if (complaint === "joint-pain") {
    return JOINT_PAIN_QUESTIONS;
  }

  if (complaint === "acidity") {
    return ACIDITY_QUESTIONS;
  }

  return GENERIC_PATHWAYS[complaint];
}

/* =========================================================
   ANALYZE COMPLAINT
========================================================= */

export function identifyComplaints(
  text: string
): ComplaintId[] {
  const normalized =
    text.toLowerCase().trim();

  const matches: ComplaintId[] = [];

  for (const complaint of COMPLAINTS) {
    if (
      complaint.keywords.some(
        (keyword) =>
          normalized.includes(
            keyword.toLowerCase()
          )
      )
    ) {
      matches.push(complaint.id);
    }
  }

  return matches.length
    ? matches
    : ["other"];
}

/* =========================================================
   GET NEXT QUESTION
========================================================= */

export function getNextQuestion(
  complaint: ComplaintId,
  answers: StoredHistoryAnswer[]
): AdaptiveQuestion | null {
  const pathway =
    getQuestionPathway(complaint);

  const answeredIds = new Set(
    answers.map(
      (answer) =>
        answer.questionId
    )
  );

  const remaining =
    pathway
      .filter(
        (question) =>
          !answeredIds.has(
            question.id
          )
      )
      .sort(
        (a, b) =>
          a.priority -
          b.priority
      );

  return remaining[0] || null;
}

/* =========================================================
   GET COMPLAINT DETAILS
========================================================= */

export function getComplaint(
  id: ComplaintId
) {
  return COMPLAINTS.find(
    (complaint) =>
      complaint.id === id
  );
}