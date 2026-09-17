import { create } from "zustand";
import { persist } from "zustand/middleware";

/* =========================================================
   PATIENT LANGUAGE
========================================================= */

export type PatientLanguage =
  | "en"
  | "as"
  | "bn"
  | "brx"
  | "doi"
  | "gu"
  | "hi"
  | "kn"
  | "ks"
  | "kok"
  | "mai"
  | "ml"
  | "mni"
  | "mr"
  | "ne"
  | "or"
  | "pa"
  | "sa"
  | "sat"
  | "sd"
  | "ta"
  | "te"
  | "ur";

/* =========================================================
   INTERACTION MODE
========================================================= */

export type InteractionMode =
  | "voice-to-voice"
  | "voice-to-text"
  | "text-to-voice"
  | "text-to-text";

/* =========================================================
   DEMOGRAPHICS
========================================================= */

export interface Demographics {
  name: string;
  fullName: string;
  dateOfBirth: string;
  age: number | "";
  gender: string;
  mobileNumber: string;
  occupation: string;
  location: string;
  state: string;
}

/* =========================================================
   CONSENT
========================================================= */

export interface ConsentState {
  primary: boolean;
  voiceProcessing: boolean;
  documentScanning: boolean;
  aiDocumentation: boolean;
  abhaExchange: boolean;
}

/* =========================================================
   LIFESTYLE / AHARA / VIHARA
========================================================= */

export interface LifestyleHistory {
  physicalActivity: string;
  sleepPattern: string;
  mealTiming: string;
  dietType: string;
  workEnvironment: string;
  travelFrequency: string;
}

/* =========================================================
   PREVIOUS MEDICAL HISTORY
========================================================= */

export interface MedicalHistory {
  pastMedicalHistory: string;
  pastSurgicalHistory: string;
  familyHistory: string;
  drugHistory: string;

  allergyStatus:
    | "no-known-allergy"
    | "known-allergy"
    | "not-sure"
    | "prefer-not-to-answer"
    | "";
}

/* =========================================================
   PRAKRITI
========================================================= */

export interface PrakritiHistory {
  bodyFrame: string;
  skin: string;
  appetite: string;
}

/* =========================================================
   COMPLAINT
========================================================= */

export interface SelectedComplaint {
  id: string;
  name: string;
  displayName: string;
}

/* =========================================================
   ADAPTIVE HISTORY ANSWER
========================================================= */

export interface HistoryAnswer {
  questionId: string;

  question: string;

  answer: string;

  category: string;

  subCategory?: string;

  complaint?: string;

  source: "voice" | "touch" | "text";

  timestamp: string;
}

/* =========================================================
   PATIENT STATE
========================================================= */

export interface PatientState {
  /* -------------------------------------------------------
     LANGUAGE
  ------------------------------------------------------- */

  language: PatientLanguage;

  setLanguage: (
    language: PatientLanguage
  ) => void;

  /* -------------------------------------------------------
     INTERACTION MODE
  ------------------------------------------------------- */

  mode: InteractionMode;

  setMode: (
    mode: InteractionMode
  ) => void;

  interactionMode: InteractionMode;

  setInteractionMode: (
    mode: InteractionMode
  ) => void;

  /* -------------------------------------------------------
     DEMOGRAPHICS
  ------------------------------------------------------- */

  demographics: Demographics;

  setDemographics: (
    data: Partial<Demographics>
  ) => void;

  /* -------------------------------------------------------
     CONSENT
  ------------------------------------------------------- */

  consent: ConsentState;

  setConsent: (
    data: Partial<ConsentState>
  ) => void;

  /* -------------------------------------------------------
     PATIENT IDENTIFICATION
  ------------------------------------------------------- */

  patientType:
    | "existing"
    | "abha"
    | "new"
    | "aadhaar"
    | null;

  setPatientType: (
    type:
      | "existing"
      | "abha"
      | "new"
      | "aadhaar"
  ) => void;

  hospitalUhid: string;

  setHospitalUhid: (
    uhid: string
  ) => void;

  abhaId: string;

  setAbhaId: (
    id: string
  ) => void;

  /* -------------------------------------------------------
     CHIEF COMPLAINT
  ------------------------------------------------------- */

  /*
   * This is ALWAYS the patient's first/main complaint.
   *
   * Example:
   * "I have knee pain"
   *
   * This value is what the Review page should display
   * under Chief Complaint.
   */

  chiefComplaint: string;

  setChiefComplaint: (
    complaint: string
  ) => void;

  /* -------------------------------------------------------
     SELECTED COMPLAINTS
  ------------------------------------------------------- */

  /*
   * Allows the system to keep more than one complaint.
   *
   * Example:
   *
   * Main complaint:
   * Joint Pain
   *
   * Associated complaint:
   * Weakness
   */

  selectedComplaints: SelectedComplaint[];

  setSelectedComplaints: (
    complaints: SelectedComplaint[]
  ) => void;

  addSelectedComplaint: (
    complaint: SelectedComplaint
  ) => void;

  removeSelectedComplaint: (
    complaintId: string
  ) => void;

  /* -------------------------------------------------------
     ADAPTIVE HISTORY
  ------------------------------------------------------- */

  /*
   * Every question actually asked to the patient
   * and every answer actually provided is stored here.
   */

  historyAnswers: HistoryAnswer[];

  addHistoryAnswer: (
    answer: HistoryAnswer
  ) => void;

  updateHistoryAnswer: (
    questionId: string,
    answer: string,
    source?: "voice" | "touch" | "text"
  ) => void;

  getHistoryAnswer: (
    questionId: string
  ) => HistoryAnswer | undefined;

  hasAnsweredQuestion: (
    questionId: string
  ) => boolean;

  clearHistoryAnswers: () => void;

  /* -------------------------------------------------------
     LIFESTYLE
  ------------------------------------------------------- */

  lifestyle: LifestyleHistory;

  setLifestyle: (
    data: Partial<LifestyleHistory>
  ) => void;

  /* -------------------------------------------------------
     PREVIOUS MEDICAL HISTORY
  ------------------------------------------------------- */

  medicalHistory: MedicalHistory;

  setMedicalHistory: (
    data: Partial<MedicalHistory>
  ) => void;

  /* -------------------------------------------------------
     PRAKRITI
  ------------------------------------------------------- */

  prakriti: PrakritiHistory;

  setPrakriti: (
    data: Partial<PrakritiHistory>
  ) => void;

  /* -------------------------------------------------------
     SUBMISSION
  ------------------------------------------------------- */

  tokenNumber: string | null;

  submitForPhysicianReview: () => void;

  /* -------------------------------------------------------
     SESSION RESET
  ------------------------------------------------------- */

  resetPatientSession: () => void;
}

/* =========================================================
   DEFAULT VALUES
========================================================= */

const defaultDemographics: Demographics = {
  name: "",
  fullName: "",
  dateOfBirth: "",
  age: "",
  gender: "",
  mobileNumber: "",
  occupation: "",
  location: "",
  state: "",
};

/* =========================================================
   DEFAULT CONSENT
========================================================= */

const defaultConsent: ConsentState = {
  primary: false,

  voiceProcessing: true,

  documentScanning: false,

  aiDocumentation: true,

  abhaExchange: true,
};

/* =========================================================
   DEFAULT LIFESTYLE
========================================================= */

const defaultLifestyle: LifestyleHistory = {
  physicalActivity: "",

  sleepPattern: "",

  mealTiming: "",

  dietType: "",

  workEnvironment: "",

  travelFrequency: "",
};

/* =========================================================
   DEFAULT MEDICAL HISTORY
========================================================= */

const defaultMedicalHistory: MedicalHistory = {
  pastMedicalHistory: "",

  pastSurgicalHistory: "",

  familyHistory: "",

  drugHistory: "",

  allergyStatus: "",
};

/* =========================================================
   DEFAULT PRAKRITI
========================================================= */

const defaultPrakriti: PrakritiHistory = {
  bodyFrame: "",

  skin: "",

  appetite: "",
};

/* =========================================================
   TOKEN GENERATOR
========================================================= */

function generateTokenNumber(): string {
  const randomNumber =
    Math.floor(
      Math.random() * 900
    ) + 100;

  return `A${randomNumber}`;
}

/* =========================================================
   ZUSTAND STORE
========================================================= */

export const usePatientStore =
  create<PatientState>()(
    persist(
      (set, get) => ({
        /* ===================================================
           LANGUAGE
        =================================================== */

        language: "en",

        setLanguage: (
          language
        ) =>
          set({
            language,
          }),

        /* ===================================================
           INTERACTION MODE
        =================================================== */

        mode:
          "voice-to-voice",

        setMode: (
          mode
        ) =>
          set({
            mode,

            interactionMode:
              mode,
          }),

        interactionMode:
          "voice-to-voice",

        setInteractionMode: (
          mode
        ) =>
          set({
            interactionMode:
              mode,

            mode,
          }),

        /* ===================================================
           DEMOGRAPHICS
        =================================================== */

        demographics: {
          ...defaultDemographics,
        },

        setDemographics: (
          data
        ) =>
          set((state) => {
            const updated = {
              ...state.demographics,

              ...data,
            };

            /*
             * Keep name and fullName synchronized.
             */

            if (
              data.name !==
                undefined &&
              data.fullName ===
                undefined
            ) {
              updated.fullName =
                data.name;
            }

            if (
              data.fullName !==
                undefined &&
              data.name ===
                undefined
            ) {
              updated.name =
                data.fullName;
            }

            return {
              demographics:
                updated,
            };
          }),

        /* ===================================================
           CONSENT
        =================================================== */

        consent: {
          ...defaultConsent,
        },

        setConsent: (
          data
        ) =>
          set((state) => ({
            consent: {
              ...state.consent,

              ...data,
            },
          })),

        /* ===================================================
           PATIENT IDENTIFICATION
        =================================================== */

        patientType: null,

        setPatientType: (
          type
        ) =>
          set({
            patientType:
              type,
          }),

        hospitalUhid: "",

        setHospitalUhid: (
          uhid
        ) =>
          set({
            hospitalUhid:
              uhid,
          }),

        abhaId: "",

        setAbhaId: (
          id
        ) =>
          set({
            abhaId: id,
          }),

        /* ===================================================
           CHIEF COMPLAINT
        =================================================== */

        chiefComplaint: "",

        setChiefComplaint: (
          complaint
        ) =>
          set({
            chiefComplaint:
              complaint,
          }),

        /* ===================================================
           SELECTED COMPLAINTS
        =================================================== */

        selectedComplaints: [],

        setSelectedComplaints: (
          complaints
        ) =>
          set({
            selectedComplaints:
              complaints,
          }),

        addSelectedComplaint: (
          complaint
        ) =>
          set((state) => {
            /*
             * Do not add the same complaint twice.
             */

            const exists =
              state.selectedComplaints.some(
                (item) =>
                  item.id ===
                  complaint.id
              );

            if (exists) {
              return state;
            }

            return {
              selectedComplaints: [
                ...state.selectedComplaints,
                complaint,
              ],
            };
          }),

        removeSelectedComplaint: (
          complaintId
        ) =>
          set((state) => ({
            selectedComplaints:
              state.selectedComplaints.filter(
                (item) =>
                  item.id !==
                  complaintId
              ),
          })),

        /* ===================================================
           ADAPTIVE HISTORY
        =================================================== */

        historyAnswers: [],

        /* ---------------------------------------------------
           ADD ANSWER
        --------------------------------------------------- */

        addHistoryAnswer: (
          answer
        ) =>
          set((state) => {
            /*
             * If this question has already been answered,
             * replace the previous answer.
             *
             * This prevents:
             *
             * Q1
             * Q1
             * Q1
             *
             * duplicates when the patient changes an answer.
             */

            const existingIndex =
              state.historyAnswers.findIndex(
                (item) =>
                  item.questionId ===
                  answer.questionId
              );

            if (
              existingIndex ===
              -1
            ) {
              return {
                historyAnswers: [
                  ...state.historyAnswers,
                  answer,
                ],
              };
            }

            const updated =
              [
                ...state.historyAnswers,
              ];

            updated[
              existingIndex
            ] = answer;

            return {
              historyAnswers:
                updated,
            };
          }),

        /* ---------------------------------------------------
           UPDATE ANSWER
        --------------------------------------------------- */

        updateHistoryAnswer: (
          questionId,
          answer,
          source = "touch"
        ) =>
          set((state) => {
            const index =
              state.historyAnswers.findIndex(
                (item) =>
                  item.questionId ===
                  questionId
              );

            if (
              index ===
              -1
            ) {
              return state;
            }

            const updated =
              [
                ...state.historyAnswers,
              ];

            updated[
              index
            ] = {
              ...updated[index],

              answer,

              source,

              timestamp:
                new Date().toISOString(),
            };

            return {
              historyAnswers:
                updated,
            };
          }),

        /* ---------------------------------------------------
           GET ANSWER
        --------------------------------------------------- */

        getHistoryAnswer: (
          questionId
        ) =>
          get()
            .historyAnswers
            .find(
              (item) =>
                item.questionId ===
                questionId
            ),

        /* ---------------------------------------------------
           HAS ANSWERED
        --------------------------------------------------- */

        hasAnsweredQuestion: (
          questionId
        ) =>
          get()
            .historyAnswers
            .some(
              (item) =>
                item.questionId ===
                questionId
            ),

        /* ---------------------------------------------------
           CLEAR ANSWERS
        --------------------------------------------------- */

        clearHistoryAnswers:
          () =>
            set({
              historyAnswers:
                [],
            }),

        /* ===================================================
           LIFESTYLE
        =================================================== */

        lifestyle: {
          ...defaultLifestyle,
        },

        setLifestyle: (
          data
        ) =>
          set((state) => ({
            lifestyle: {
              ...state.lifestyle,

              ...data,
            },
          })),

        /* ===================================================
           MEDICAL HISTORY
        =================================================== */

        medicalHistory: {
          ...defaultMedicalHistory,
        },

        setMedicalHistory: (
          data
        ) =>
          set((state) => ({
            medicalHistory: {
              ...state.medicalHistory,

              ...data,
            },
          })),

        /* ===================================================
           PRAKRITI
        =================================================== */

        prakriti: {
          ...defaultPrakriti,
        },

        setPrakriti: (
          data
        ) =>
          set((state) => ({
            prakriti: {
              ...state.prakriti,

              ...data,
            },
          })),

        /* ===================================================
           SUBMISSION
        =================================================== */

        tokenNumber: null,

        submitForPhysicianReview:
          () =>
            set({
              tokenNumber:
                generateTokenNumber(),
            }),

        /* ===================================================
           RESET PATIENT SESSION
        =================================================== */

        resetPatientSession:
          () =>
            set({
              /* -------------------------------
                 LANGUAGE
              ------------------------------- */

              language: "en",

              /* -------------------------------
                 MODE
              ------------------------------- */

              mode:
                "voice-to-voice",

              interactionMode:
                "voice-to-voice",

              /* -------------------------------
                 DEMOGRAPHICS
              ------------------------------- */

              demographics: {
                ...defaultDemographics,
              },

              /* -------------------------------
                 CONSENT
              ------------------------------- */

              consent: {
                ...defaultConsent,
              },

              /* -------------------------------
                 IDENTIFICATION
              ------------------------------- */

              patientType:
                null,

              hospitalUhid:
                "",

              abhaId: "",

              /* -------------------------------
                 CHIEF COMPLAINT
              ------------------------------- */

              chiefComplaint:
                "",

              /* -------------------------------
                 COMPLAINTS
              ------------------------------- */

              selectedComplaints:
                [],

              /* -------------------------------
                 ADAPTIVE HISTORY
              ------------------------------- */

              historyAnswers:
                [],

              /* -------------------------------
                 LIFESTYLE
              ------------------------------- */

              lifestyle: {
                ...defaultLifestyle,
              },

              /* -------------------------------
                 MEDICAL HISTORY
              ------------------------------- */

              medicalHistory: {
                ...defaultMedicalHistory,
              },

              /* -------------------------------
                 PRAKRITI
              ------------------------------- */

              prakriti: {
                ...defaultPrakriti,
              },

              /* -------------------------------
                 TOKEN
              ------------------------------- */

              tokenNumber:
                null,
            }),
      }),

      {
        name:
          "medikiosk-patient-session",
      }
    )
  );