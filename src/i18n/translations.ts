import type { PatientLanguage } from "../store/patientStore";

/* =========================================================
   TRANSLATION KEYS
========================================================= */

export type TranslationKey =
  // General
  | "namaste"
  | "selectLanguage"
  | "comfortableLanguage"
  | "continue"
  | "back"
  | "help"
  | "reset"
  | "start"
  | "submit"
  | "cancel"
  | "save"
  | "confirm"
  | "done"
  | "skip"
  | "yes"
  | "no"
  | "close"
  | "remove"
  | "edit"
  | "retry"
  | "next"
  | "selectedLanguage"

  // Interaction
  | "interactionPreference"
  | "howContinue"
  | "chooseInteraction"
  | "voiceToVoice"
  | "voiceToVoiceDescription"
  | "voiceToText"
  | "voiceToTextDescription"
  | "textToVoice"
  | "textToVoiceDescription"
  | "textToText"
  | "textToTextDescription"
  | "recommended"
  | "speakNaturally"
  | "readText"
  | "tapAndListen"
  | "tapAndRead"

  // Patient journey
  | "identifyPatient"
  | "chiefComplaint"
  | "medicalDocuments"
  | "review"
  | "history"
  | "privacy"

  // Home / Welcome
  | "platformSubtitle"
  | "ayurvedaClinicalHistory"
  | "yourStory"
  | "betterCare"
  | "completeHistoryBeforeDoctor"
  | "patientKiosk"
  | "startHealthJourney"
  | "doctorPortal"
  | "reviewManagePatients"
  | "adminPortal"
  | "systemConfiguration"
  | "traditionalWisdom"
  | "rootedInAyurveda"
  | "modernTechnology"
  | "smarterHealthcare"
  | "healthierTomorrow"
  | "forABrighterYou"

  // Speech
  | "speakQuestion"
  | "listen"
  | "speaking"
  | "listening"
  | "yourResponse"
  | "tapMicrophone"
  | "hearQuestionAgain"
  | "tapMicrophoneToAnswer"

  // History
  | "historyComplete"
  | "preparingClinicalHistory"
  | "question"
  | "of"
  | "answerRequired"
  | "typeYourAnswer"
  | "tapOption"
  | "noQuestion"
  | "clinicalHistoryComplete"

  // Documents
  | "thankYou"
  | "continueDocuments"
  | "scanDocuments"
  | "documentsDescription"
  | "scanUpload"
  | "prescription"
  | "labReport"
  | "dischargeSummary"
  | "continueReview"
  | "upload"
  | "scanDocument"
  | "camera"
  | "takePhoto"
  | "retake"
  | "usePhoto"
  | "removeDocument"
  | "documentAdded"
  | "noDocuments"
  | "optionalDocuments"

  // System
  | "networkArchitecture"
  | "online"
  | "offline"

  // Consent
  | "beforeBegin"
  | "privacyMatters"
  | "privacySubtitle"
  | "whatHappens"
  | "consentExplanation"
  | "listenExplanation"
  | "primaryConsent"
  | "primaryConsentText"
  | "optionalConsents"
  | "voiceProcessing"
  | "voiceProcessingDescription"
  | "documentScanning"
  | "documentScanningDescription"
  | "aiDocumentation"
  | "aiDocumentationDescription"
  | "abhaExchange"
  | "abhaExchangeDescription"

  // Patient identification
  | "existingPatient"
  | "newPatient"
  | "useHospitalId"
  | "abha"
  | "abhaId"
  | "useAbhaHealthId"
  | "registerNewPatient"
  | "aadhaarCard"
  | "optional"
  | "selectOptionToContinue"
  | "hospitalId"
  | "hospitalUhid"
  | "enterHospitalId"
  | "enterUhid"
  | "hospitalIdPreviousVisits"
  | "enterAbhaId"
  | "abhaLinkExplanation"
  | "aadhaar"
  | "aadhaarNumber"
  | "enterAadhaar"
  | "aadhaarOptionalExplanation"
  | "continueAsNewPatient"
  | "welcomeToMediKiosk"
  | "newPatientRegistrationExplanation"
  | "whyCollectThis"

  // Demographics
  | "aboutYou"
  | "tellAboutYourself"
  | "basicInfoSubtitle"
  | "fullName"
  | "enterFullName"
  | "fullNameRequired"
  | "dateOfBirth"
  | "age"
  | "enterAge"
  | "ageRequired"
  | "gender"
  | "genderRequired"
  | "selectGender"
  | "male"
  | "female"
  | "other"
  | "preferNotToSay"
  | "mobileNumber"
  | "enterMobileNumber"
  | "occupation"
  | "occupationPlaceholder"
  | "location"
  | "cityDistrict"
  | "state"
  | "selectState"

  // Chief complaint
  | "tellUsYourProblem"
  | "whatBringsYouToday"
  | "selectComplaints"
  | "selectAllThatApply"
  | "primaryComplaint"
  | "associatedComplaint"
  | "somethingElse"
  | "describeProblem"
  | "speakYourProblem"

  // Ayurveda
  | "prakriti"
  | "vikriti"
  | "trividha"
  | "ashtavidha"
  | "dashavidha"
  | "agni"
  | "koshtha"
  | "ahara"
  | "vihara"
  | "nidana"
  | "samprapti"

  // Review
  | "reviewInformation"
  | "checkInformation"
  | "patientInformation"
  | "patientResponses"
  | "previousMedicalHistory"
  | "familyHistory"
  | "drugHistory"
  | "allergyStatus"
  | "lifestyle"
  | "submitForPhysicianReview"

  // Thank You
  | "responseRecorded"
  | "tokenNumber"
  | "sentToDoctor"
  | "underReview"
  | "returnHome"
  | "physicianWillReview";

/* =========================================================
   TRANSLATION SET
========================================================= */

export type TranslationSet =
  Partial<Record<TranslationKey, string>>;

/* =========================================================
   ENGLISH
========================================================= */

const en: TranslationSet = {
  /* ---------------- General ---------------- */

  namaste:
    "Namaste!",

  selectLanguage:
    "Please select your preferred language",

  comfortableLanguage:
    "Choose the language you are most comfortable with",

  continue:
    "Continue",

  back:
    "Back",

  help:
    "Help",

  reset:
    "Reset",

  start:
    "Start",

  submit:
    "Submit",

  cancel:
    "Cancel",

  save:
    "Save",

  confirm:
    "Confirm",

  done:
    "Done",

  skip:
    "Skip",

  yes:
    "Yes",

  no:
    "No",

  close:
    "Close",

  remove:
    "Remove",

  edit:
    "Edit",

  retry:
    "Retry",

  next:
    "Next",

  selectedLanguage:
    "Selected language",

  /* ---------------- Interaction ---------------- */

  interactionPreference:
    "Interaction preference",

  howContinue:
    "How would you like to continue?",

  chooseInteraction:
    "Choose the way that feels most comfortable.",

  voiceToVoice:
    "Voice to Voice",

  voiceToVoiceDescription:
    "Speak naturally and listen to questions through audio.",

  voiceToText:
    "Voice to Text",

  voiceToTextDescription:
    "Speak your answers while MediKiosk converts them into text.",

  textToVoice:
    "Text to Voice",

  textToVoiceDescription:
    "Read questions on screen and listen to them through audio.",

  textToText:
    "Text to Text",

  textToTextDescription:
    "Read questions and type your answers on screen.",

  recommended:
    "Recommended",

  speakNaturally:
    "Speak naturally",

  readText:
    "Read text",

  tapAndListen:
    "Tap and listen",

  tapAndRead:
    "Tap and read",

  /* ---------------- Patient Journey ---------------- */

  identifyPatient:
    "Identify Patient",

  chiefComplaint:
    "Chief Complaint",

  medicalDocuments:
    "Medical Documents",

  review:
    "Review",

  history:
    "Clinical History",

  privacy:
    "Privacy-first clinical intake",

  /* ---------------- Home / Welcome ---------------- */

  platformSubtitle:
    "AI-Powered Ayurveda Clinical History Platform",

  ayurvedaClinicalHistory:
    "Ayurveda Clinical History",

  yourStory:
    "Your Story.",

  betterCare:
    "Better Care.",

  completeHistoryBeforeDoctor:
    "Complete your Ayurvedic health history before meeting your doctor.",

  patientKiosk:
    "Patient Kiosk",

  startHealthJourney:
    "Start Your Health Journey",

  doctorPortal:
    "Doctor Portal",

  reviewManagePatients:
    "Review & Manage Patients",

  adminPortal:
    "Admin Portal",

  systemConfiguration:
    "System Configuration",

  traditionalWisdom:
    "Traditional Wisdom",

  rootedInAyurveda:
    "Rooted in Ayurveda",

  modernTechnology:
    "Modern Technology",

  smarterHealthcare:
    "Smarter Healthcare",

  healthierTomorrow:
    "Healthier Tomorrow",

  forABrighterYou:
    "For a Brighter You",

  /* ---------------- Speech ---------------- */

  speakQuestion:
    "Hear the question again",

  listen:
    "Listen",

  speaking:
    "Speaking...",

  listening:
    "Listening...",

  yourResponse:
    "Your response",

  tapMicrophone:
    "Tap the microphone and speak naturally.",

  hearQuestionAgain:
    "Hear the question again",

  tapMicrophoneToAnswer:
    "Tap the microphone and speak your answer.",

  /* ---------------- History ---------------- */

  historyComplete:
    "History Complete",

  preparingClinicalHistory:
    "Preparing your clinical history...",

  question:
    "Question",

  of:
    "of",

  answerRequired:
    "Please provide an answer to continue.",

  typeYourAnswer:
    "Type your answer",

  tapOption:
    "Tap an option",

  noQuestion:
    "No question available.",

  clinicalHistoryComplete:
    "Your clinical history is complete.",

  /* ---------------- Documents ---------------- */

  thankYou:
    "Thank you.",

  continueDocuments:
    "Continue to Documents",

  scanDocuments:
    "Scan Your Medical Documents",

  documentsDescription:
    "You can add previous prescriptions, laboratory reports, discharge summaries, or other medical documents.",

  scanUpload:
    "Click to scan or upload document",

  prescription:
    "Prescription",

  labReport:
    "Lab Report",

  dischargeSummary:
    "Discharge Summary",

  continueReview:
    "Continue to Review",

  upload:
    "Upload",

  scanDocument:
    "Scan Document",

  camera:
    "Camera",

  takePhoto:
    "Take Photo",

  retake:
    "Retake",

  usePhoto:
    "Use Photo",

  removeDocument:
    "Remove document",

  documentAdded:
    "Document added",

  noDocuments:
    "No documents added",

  optionalDocuments:
    "Documents are optional",

  /* ---------------- System ---------------- */

  networkArchitecture:
    "Network Architecture",

  online:
    "ONLINE",

  offline:
    "OFFLINE",

  /* ---------------- Consent ---------------- */

  beforeBegin:
    "Before we begin",

  privacyMatters:
    "YOUR PRIVACY MATTERS",

  privacySubtitle:
    "Please listen to or read how MediKiosk will use the information you provide during this session.",

  whatHappens:
    "What will happen?",

  consentExplanation:
    "MediKiosk will ask questions about your current complaint, previous medical history, medicines, allergies, family history, lifestyle and relevant Ayurveda clinical history.",

  listenExplanation:
    "Listen to explanation",

  primaryConsent:
    "Primary Clinical Consultation Consent",

  primaryConsentText:
    "I consent to provide my health history for the purpose of clinical consultation. I understand this information will be shared with my treating physician and stored securely as per ABDM / DISHA guidelines.",

  optionalConsents:
    "Optional Consents",

  voiceProcessing:
    "Voice Processing",

  voiceProcessingDescription:
    "Your spoken answers may be transcribed into text for clinical documentation.",

  documentScanning:
    "Medical Document Scanning",

  documentScanningDescription:
    "Scan previous prescriptions, laboratory reports, discharge summaries and other medical documents.",

  aiDocumentation:
    "AI-Assisted Documentation",

  aiDocumentationDescription:
    "AI generates a draft clinical summary from the information you provide. The physician reviews and confirms it.",

  abhaExchange:
    "ABHA / Health Record Exchange",

  abhaExchangeDescription:
    "With your consent, relevant information may be exchanged with your ABHA-linked health records.",

  /* ---------------- Identification ---------------- */

  existingPatient:
    "Existing Patient",

  newPatient:
    "New Patient",

  useHospitalId:
    "Use Hospital ID",

  abha:
    "ABHA",

  abhaId:
    "ABHA ID",

  useAbhaHealthId:
    "Use ABHA Health ID",

  registerNewPatient:
    "Register as New Patient",

  aadhaarCard:
    "Aadhaar Card",

  optional:
    "Optional",

  selectOptionToContinue:
    "Select an option to continue",

  hospitalId:
    "Hospital ID",

  hospitalUhid:
    "Hospital UHID",

  enterHospitalId:
    "Enter your Hospital ID",

  enterUhid:
    "Enter your Hospital UHID",

  hospitalIdPreviousVisits:
    "Use your Hospital ID if you have visited this hospital before.",

  enterAbhaId:
    "Enter your ABHA ID",

  abhaLinkExplanation:
    "Your ABHA can be used to securely link your health records with your consent.",

  aadhaar:
    "Aadhaar",

  aadhaarNumber:
    "Aadhaar Number",

  enterAadhaar:
    "Enter your Aadhaar number",

  aadhaarOptionalExplanation:
    "Aadhaar is optional. You can continue without providing it.",

  continueAsNewPatient:
    "Continue as New Patient",

  welcomeToMediKiosk:
    "Welcome to MediKiosk",

  newPatientRegistrationExplanation:
    "If you are visiting this hospital for the first time, you can continue as a new patient.",

  whyCollectThis:
    "Why do we collect this information?",

  /* ---------------- Demographics ---------------- */

  aboutYou:
    "ABOUT YOU",

  tellAboutYourself:
    "Tell us a little about yourself.",

  basicInfoSubtitle:
    "These details help your physician understand your clinical context.",

  fullName:
    "Full name",

  enterFullName:
    "Enter your full name",

  fullNameRequired:
    "Please enter your full name.",

  dateOfBirth:
    "Date of birth",

  age:
    "Age",

  enterAge:
    "Enter your age",

  ageRequired:
    "Please enter your age.",

  gender:
    "Gender",

  genderRequired:
    "Please select your gender.",

  selectGender:
    "Select gender",

  male:
    "Male",

  female:
    "Female",

  other:
    "Other",

  preferNotToSay:
    "Prefer not to say",

  mobileNumber:
    "Mobile number",

  enterMobileNumber:
    "Enter mobile number",

  occupation:
    "Occupation",

  occupationPlaceholder:
    "e.g. Student, Teacher, Farmer",

  location:
    "Location",

  cityDistrict:
    "City / District",

  state:
    "State",

  selectState:
    "Select state",

  /* ---------------- Chief Complaint ---------------- */

  tellUsYourProblem:
    "Tell us about your problem",

  whatBringsYouToday:
    "What brings you to the clinic today?",

  selectComplaints:
    "Select your complaints",

  selectAllThatApply:
    "Select all that apply",

  primaryComplaint:
    "Primary complaint",

  associatedComplaint:
    "Associated complaint",

  somethingElse:
    "Something else",

  describeProblem:
    "Please describe your problem",

  speakYourProblem:
    "Speak about your problem",

  /* ---------------- Ayurveda ---------------- */

  prakriti:
    "Prakriti",

  vikriti:
    "Vikriti",

  trividha:
    "Trividha Pariksha",

  ashtavidha:
    "Ashtavidha Pariksha",

  dashavidha:
    "Dashavidha Pariksha",

  agni:
    "Agni",

  koshtha:
    "Koshtha",

  ahara:
    "Ahara",

  vihara:
    "Vihara",

  nidana:
    "Nidana",

  samprapti:
    "Samprapti",

  /* ---------------- Review ---------------- */

  reviewInformation:
    "Review your information",

  checkInformation:
    "Please check your information before submitting.",

  patientInformation:
    "Patient Information",

  patientResponses:
    "Patient Responses",

  previousMedicalHistory:
    "Previous Medical History",

  familyHistory:
    "Family History",

  drugHistory:
    "Medication History",

  allergyStatus:
    "Allergy Status",

  lifestyle:
    "Lifestyle",

  submitForPhysicianReview:
    "Submit for Physician Review",

  /* ---------------- Thank You ---------------- */

  responseRecorded:
    "Your response has been recorded.",

  tokenNumber:
    "Token Number",

  sentToDoctor:
    "Sent to Doctor",

  underReview:
    "Under Review",

  returnHome:
    "Return to Home",

  physicianWillReview:
    "The physician will review your clinical history before your consultation.",
};

/* =========================================================
   HINDI
========================================================= */

const hi: TranslationSet = {
  ...en,

  /* ---------------- General ---------------- */

  namaste:
    "नमस्ते!",

  selectLanguage:
    "कृपया अपनी पसंदीदा भाषा चुनें",

  comfortableLanguage:
    "वह भाषा चुनें जिसमें आप सबसे सहज महसूस करते हैं",

  continue:
    "जारी रखें",

  back:
    "वापस",

  help:
    "सहायता",

  reset:
    "रीसेट",

  start:
    "शुरू करें",

  submit:
    "सबमिट करें",

  cancel:
    "रद्द करें",

  save:
    "सहेजें",

  confirm:
    "पुष्टि करें",

  done:
    "पूर्ण",

  skip:
    "छोड़ें",

  yes:
    "हाँ",

  no:
    "नहीं",

  close:
    "बंद करें",

  remove:
    "हटाएँ",

  edit:
    "संपादित करें",

  retry:
    "पुनः प्रयास करें",

  next:
    "अगला",

  selectedLanguage:
    "चयनित भाषा",

  /* ---------------- Interaction ---------------- */

  interactionPreference:
    "बातचीत का तरीका",

  howContinue:
    "आप कैसे बातचीत करना चाहेंगे?",

  chooseInteraction:
    "अपने लिए सबसे सुविधाजनक तरीका चुनें।",

  voiceToVoice:
    "आवाज़ से आवाज़",

  voiceToVoiceDescription:
    "स्वाभाविक रूप से बोलें और प्रश्न आवाज़ में सुनें।",

  voiceToText:
    "आवाज़ से टेक्स्ट",

  voiceToTextDescription:
    "अपने उत्तर बोलें और MediKiosk उन्हें टेक्स्ट में बदलेगा।",

  textToVoice:
    "टेक्स्ट से आवाज़",

  textToVoiceDescription:
    "प्रश्न पढ़ें और उन्हें आवाज़ में सुनें।",

  textToText:
    "टेक्स्ट से टेक्स्ट",

  textToTextDescription:
    "प्रश्न पढ़ें और स्क्रीन पर उत्तर लिखें।",

  recommended:
    "अनुशंसित",

  speakNaturally:
    "स्वाभाविक रूप से बोलें",

  readText:
    "टेक्स्ट पढ़ें",

  tapAndListen:
    "टैप करें और सुनें",

  tapAndRead:
    "टैप करें और पढ़ें",

  /* ---------------- Patient Journey ---------------- */

  identifyPatient:
    "मरीज़ की पहचान",

  chiefComplaint:
    "मुख्य शिकायत",

  medicalDocuments:
    "चिकित्सीय दस्तावेज़",

  review:
    "समीक्षा",

  history:
    "चिकित्सीय इतिहास",

  privacy:
    "गोपनीयता-प्रथम चिकित्सीय जानकारी",

  /* ---------------- Home ---------------- */

  platformSubtitle:
    "AI-संचालित आयुर्वेदिक क्लिनिकल इतिहास प्लेटफ़ॉर्म",

  ayurvedaClinicalHistory:
    "आयुर्वेदिक क्लिनिकल इतिहास",

  yourStory:
    "आपकी कहानी।",

  betterCare:
    "बेहतर देखभाल।",

  completeHistoryBeforeDoctor:
    "डॉक्टर से मिलने से पहले अपना आयुर्वेदिक स्वास्थ्य इतिहास पूरा करें।",

  patientKiosk:
    "मरीज़ कियोस्क",

  startHealthJourney:
    "अपनी स्वास्थ्य यात्रा शुरू करें",

  doctorPortal:
    "डॉक्टर पोर्टल",

  reviewManagePatients:
    "मरीज़ों की समीक्षा और प्रबंधन",

  adminPortal:
    "एडमिन पोर्टल",

  systemConfiguration:
    "सिस्टम कॉन्फ़िगरेशन",

  traditionalWisdom:
    "पारंपरिक ज्ञान",

  rootedInAyurveda:
    "आयुर्वेद पर आधारित",

  modernTechnology:
    "आधुनिक तकनीक",

  smarterHealthcare:
    "स्मार्ट स्वास्थ्य सेवा",

  healthierTomorrow:
    "स्वस्थ भविष्य",

  forABrighterYou:
    "एक बेहतर भविष्य के लिए",

  /* ---------------- Speech ---------------- */

  speakQuestion:
    "प्रश्न फिर से सुनें",

  listen:
    "सुनें",

  speaking:
    "बोला जा रहा है...",

  listening:
    "सुना जा रहा है...",

  yourResponse:
    "आपका उत्तर",

  tapMicrophone:
    "माइक्रोफ़ोन दबाएँ और स्वाभाविक रूप से बोलें।",

  hearQuestionAgain:
    "प्रश्न फिर से सुनें",

  tapMicrophoneToAnswer:
    "माइक्रोफ़ोन दबाएँ और अपना उत्तर बोलें।",

  /* ---------------- History ---------------- */

  historyComplete:
    "इतिहास पूरा हुआ",

  preparingClinicalHistory:
    "आपका चिकित्सीय इतिहास तैयार किया जा रहा है...",

  question:
    "प्रश्न",

  of:
    "में से",

  answerRequired:
    "जारी रखने के लिए कृपया उत्तर दें।",

  typeYourAnswer:
    "अपना उत्तर लिखें",

  tapOption:
    "एक विकल्प चुनें",

  noQuestion:
    "कोई प्रश्न उपलब्ध नहीं है।",

  clinicalHistoryComplete:
    "आपका चिकित्सीय इतिहास पूरा हो गया है।",

  /* ---------------- Documents ---------------- */

  thankYou:
    "धन्यवाद।",

  continueDocuments:
    "दस्तावेज़ों पर जाएँ",

  scanDocuments:
    "अपने चिकित्सीय दस्तावेज़ स्कैन करें",

  documentsDescription:
    "आप पुराने प्रिस्क्रिप्शन, लैब रिपोर्ट, डिस्चार्ज सारांश या अन्य चिकित्सीय दस्तावेज़ जोड़ सकते हैं।",

  scanUpload:
    "दस्तावेज़ स्कैन या अपलोड करने के लिए क्लिक करें",

  prescription:
    "प्रिस्क्रिप्शन",

  labReport:
    "लैब रिपोर्ट",

  dischargeSummary:
    "डिस्चार्ज सारांश",

  continueReview:
    "समीक्षा पर जाएँ",

  upload:
    "अपलोड करें",

  scanDocument:
    "दस्तावेज़ स्कैन करें",

  camera:
    "कैमरा",

  takePhoto:
    "फोटो लें",

  retake:
    "फिर से लें",

  usePhoto:
    "फोटो का उपयोग करें",

  removeDocument:
    "दस्तावेज़ हटाएँ",

  documentAdded:
    "दस्तावेज़ जोड़ा गया",

  noDocuments:
    "कोई दस्तावेज़ नहीं जोड़ा गया",

  optionalDocuments:
    "दस्तावेज़ वैकल्पिक हैं",

  /* ---------------- System ---------------- */

  networkArchitecture:
    "नेटवर्क आर्किटेक्चर",

  online:
    "ऑनलाइन",

  offline:
    "ऑफलाइन",

  /* ---------------- Consent ---------------- */

  beforeBegin:
    "शुरू करने से पहले",

  privacyMatters:
    "आपकी गोपनीयता महत्वपूर्ण है",

  privacySubtitle:
    "कृपया सुनें या पढ़ें कि इस सत्र के दौरान MediKiosk आपके द्वारा दी गई जानकारी का उपयोग कैसे करेगा।",

  whatHappens:
    "क्या होगा?",

  consentExplanation:
    "MediKiosk आपकी वर्तमान समस्या, पिछले चिकित्सा इतिहास, दवाइयों, एलर्जी, पारिवारिक इतिहास, जीवनशैली और आवश्यक आयुर्वेदिक क्लिनिकल इतिहास के बारे में प्रश्न पूछेगा।",

  listenExplanation:
    "स्पष्टीकरण सुनें",

  primaryConsent:
    "प्राथमिक क्लिनिकल परामर्श सहमति",

  primaryConsentText:
    "मैं क्लिनिकल परामर्श के उद्देश्य से अपना स्वास्थ्य इतिहास प्रदान करने के लिए सहमत हूँ। मैं समझता/समझती हूँ कि यह जानकारी मेरे उपचार करने वाले चिकित्सक के साथ साझा की जाएगी और ABDM / DISHA दिशानिर्देशों के अनुसार सुरक्षित रूप से संग्रहीत की जाएगी।",

  optionalConsents:
    "वैकल्पिक सहमतियाँ",

  voiceProcessing:
    "वॉइस प्रोसेसिंग",

  voiceProcessingDescription:
    "आपके बोले गए उत्तरों को क्लिनिकल दस्तावेज़ीकरण के लिए टेक्स्ट में बदला जा सकता है।",

  documentScanning:
    "मेडिकल दस्तावेज़ स्कैनिंग",

  documentScanningDescription:
    "पिछली पर्चियाँ, लैब रिपोर्ट, डिस्चार्ज सारांश और अन्य मेडिकल दस्तावेज़ स्कैन करें।",

  aiDocumentation:
    "AI-सहायित दस्तावेज़ीकरण",

  aiDocumentationDescription:
    "आपके द्वारा दी गई जानकारी से AI क्लिनिकल सारांश का ड्राफ्ट तैयार करता है। डॉक्टर इसकी समीक्षा और पुष्टि करते हैं।",

  abhaExchange:
    "ABHA / स्वास्थ्य रिकॉर्ड एक्सचेंज",

  abhaExchangeDescription:
    "आपकी सहमति से संबंधित जानकारी आपके ABHA से जुड़े स्वास्थ्य रिकॉर्ड के साथ साझा की जा सकती है।",

  /* ---------------- Identification ---------------- */

  existingPatient:
    "मौजूदा मरीज़",

  newPatient:
    "नया मरीज़",

  useHospitalId:
    "अस्पताल आईडी का उपयोग करें",

  abha:
    "ABHA",

  abhaId:
    "ABHA आईडी",

  useAbhaHealthId:
    "ABHA हेल्थ आईडी का उपयोग करें",

  registerNewPatient:
    "नए मरीज़ के रूप में पंजीकरण करें",

  aadhaarCard:
    "आधार कार्ड",

  optional:
    "वैकल्पिक",

  selectOptionToContinue:
    "जारी रखने के लिए एक विकल्प चुनें",

  hospitalId:
    "अस्पताल आईडी",

  hospitalUhid:
    "अस्पताल UHID",

  enterHospitalId:
    "अपनी अस्पताल आईडी दर्ज करें",

  enterUhid:
    "अपना अस्पताल UHID दर्ज करें",

  hospitalIdPreviousVisits:
    "यदि आप पहले इस अस्पताल में आ चुके हैं तो अपनी अस्पताल आईडी का उपयोग करें।",

  enterAbhaId:
    "अपनी ABHA आईडी दर्ज करें",

  abhaLinkExplanation:
    "आपकी सहमति से ABHA का उपयोग आपके स्वास्थ्य रिकॉर्ड को सुरक्षित रूप से जोड़ने के लिए किया जा सकता है।",

  aadhaar:
    "आधार",

  aadhaarNumber:
    "आधार नंबर",

  enterAadhaar:
    "अपना आधार नंबर दर्ज करें",

  aadhaarOptionalExplanation:
    "आधार वैकल्पिक है। आप इसे दिए बिना भी आगे बढ़ सकते हैं।",

  continueAsNewPatient:
    "नए मरीज़ के रूप में जारी रखें",

  welcomeToMediKiosk:
    "MediKiosk में आपका स्वागत है",

  newPatientRegistrationExplanation:
    "यदि आप पहली बार इस अस्पताल में आ रहे हैं, तो आप नए मरीज़ के रूप में आगे बढ़ सकते हैं।",

  whyCollectThis:
    "हम यह जानकारी क्यों लेते हैं?",

  /* ---------------- Demographics ---------------- */

  aboutYou:
    "आपके बारे में",

  tellAboutYourself:
    "अपने बारे में थोड़ा बताइए।",

  basicInfoSubtitle:
    "ये विवरण आपके चिकित्सक को आपकी क्लिनिकल स्थिति समझने में मदद करते हैं।",

  fullName:
    "पूरा नाम",

  enterFullName:
    "अपना पूरा नाम दर्ज करें",

  fullNameRequired:
    "कृपया अपना पूरा नाम दर्ज करें।",

  dateOfBirth:
    "जन्म तिथि",

  age:
    "आयु",

  enterAge:
    "अपनी आयु दर्ज करें",

  ageRequired:
    "कृपया अपनी आयु दर्ज करें।",

  gender:
    "लिंग",

  genderRequired:
    "कृपया अपना लिंग चुनें।",

  selectGender:
    "लिंग चुनें",

  male:
    "पुरुष",

  female:
    "महिला",

  other:
    "अन्य",

  preferNotToSay:
    "बताना पसंद नहीं है",

  mobileNumber:
    "मोबाइल नंबर",

  enterMobileNumber:
    "मोबाइल नंबर दर्ज करें",

  occupation:
    "व्यवसाय",

  occupationPlaceholder:
    "जैसे विद्यार्थी, शिक्षक, किसान",

  location:
    "स्थान",

  cityDistrict:
    "शहर / ज़िला",

  state:
    "राज्य",

  selectState:
    "राज्य चुनें",

  /* ---------------- Chief Complaint ---------------- */

  tellUsYourProblem:
    "अपनी समस्या के बारे में बताइए",

  whatBringsYouToday:
    "आज आपको किस समस्या के कारण क्लिनिक आना पड़ा?",

  selectComplaints:
    "अपनी शिकायतें चुनें",

  selectAllThatApply:
    "जो भी लागू हो उसे चुनें",

  primaryComplaint:
    "मुख्य शिकायत",

  associatedComplaint:
    "संबंधित शिकायत",

  somethingElse:
    "कुछ और",

  describeProblem:
    "कृपया अपनी समस्या के बारे में बताइए",

  speakYourProblem:
    "अपनी समस्या के बारे में बोलें",

  /* ---------------- Ayurveda ---------------- */

  prakriti:
    "प्रकृति",

  vikriti:
    "विकृति",

  trividha:
    "त्रिविध परीक्षा",

  ashtavidha:
    "अष्टविध परीक्षा",

  dashavidha:
    "दशविध परीक्षा",

  agni:
    "अग्नि",

  koshtha:
    "कोष्ठ",

  ahara:
    "आहार",

  vihara:
    "विहार",

  nidana:
    "निदान",

  samprapti:
    "सम्प्राप्ति",

  /* ---------------- Review ---------------- */

  reviewInformation:
    "अपनी जानकारी की समीक्षा करें",

  checkInformation:
    "सबमिट करने से पहले कृपया अपनी जानकारी जाँच लें।",

  patientInformation:
    "मरीज़ की जानकारी",

  patientResponses:
    "मरीज़ के उत्तर",

  previousMedicalHistory:
    "पिछला चिकित्सा इतिहास",

  familyHistory:
    "पारिवारिक इतिहास",

  drugHistory:
    "दवाओं का इतिहास",

  allergyStatus:
    "एलर्जी की स्थिति",

  lifestyle:
    "जीवनशैली",

  submitForPhysicianReview:
    "डॉक्टर की समीक्षा के लिए सबमिट करें",

  /* ---------------- Thank You ---------------- */

  responseRecorded:
    "आपका उत्तर दर्ज कर लिया गया है।",

  tokenNumber:
    "टोकन नंबर",

  sentToDoctor:
    "डॉक्टर को भेज दिया गया",

  underReview:
    "समीक्षा के अधीन",

  returnHome:
    "होम पर वापस जाएँ",

  physicianWillReview:
    "परामर्श से पहले डॉक्टर आपके चिकित्सीय इतिहास की समीक्षा करेंगे।",
};

/* =========================================================
   MARATHI
========================================================= */

const mr: TranslationSet = {
  ...en,

  /* ---------------- General ---------------- */

  namaste:
    "नमस्कार!",

  selectLanguage:
    "कृपया तुमची पसंतीची भाषा निवडा",

  comfortableLanguage:
    "ज्या भाषेत तुम्हाला सर्वात सोयीचे वाटते ती भाषा निवडा",

  continue:
    "पुढे चला",

  back:
    "मागे",

  help:
    "मदत",

  reset:
    "रीसेट",

  start:
    "सुरू करा",

  submit:
    "सबमिट करा",

  cancel:
    "रद्द करा",

  save:
    "जतन करा",

  confirm:
    "पुष्टी करा",

  done:
    "पूर्ण",

  skip:
    "वगळा",

  yes:
    "होय",

  no:
    "नाही",

  close:
    "बंद करा",

  remove:
    "काढा",

  edit:
    "संपादित करा",

  retry:
    "पुन्हा प्रयत्न करा",

  next:
    "पुढील",

  selectedLanguage:
    "निवडलेली भाषा",

  /* ---------------- Interaction ---------------- */

  interactionPreference:
    "संवादाची पद्धत",

  howContinue:
    "तुम्हाला संवाद कसा साधायचा आहे?",

  chooseInteraction:
    "तुमच्यासाठी सर्वात सोयीची पद्धत निवडा.",

  voiceToVoice:
    "आवाजातून आवाज",

  voiceToVoiceDescription:
    "नैसर्गिकपणे बोला आणि प्रश्न आवाजात ऐका.",

  voiceToText:
    "आवाजातून मजकूर",

  voiceToTextDescription:
    "तुमची उत्तरे बोला आणि MediKiosk ती मजकुरात बदलेल.",

  textToVoice:
    "मजकूरातून आवाज",

  textToVoiceDescription:
    "प्रश्न वाचा आणि ते आवाजात ऐका.",

  textToText:
    "मजकूरातून मजकूर",

  textToTextDescription:
    "प्रश्न वाचा आणि स्क्रीनवर उत्तर टाइप करा.",

  recommended:
    "शिफारस केलेले",

  speakNaturally:
    "नैसर्गिकपणे बोला",

  readText:
    "मजकूर वाचा",

  tapAndListen:
    "टॅप करा आणि ऐका",

  tapAndRead:
    "टॅप करा आणि वाचा",

  /* ---------------- Journey ---------------- */

  identifyPatient:
    "रुग्णाची ओळख",

  chiefComplaint:
    "मुख्य तक्रार",

  medicalDocuments:
    "वैद्यकीय कागदपत्रे",

  review:
    "पुनरावलोकन",

  history:
    "वैद्यकीय इतिहास",

  privacy:
    "गोपनीयता-प्रथम वैद्यकीय माहिती",

  /* ---------------- Home ---------------- */

  platformSubtitle:
    "AI-संचालित आयुर्वेदिक क्लिनिकल इतिहास प्लॅटफॉर्म",

  ayurvedaClinicalHistory:
    "आयुर्वेदिक क्लिनिकल इतिहास",

  yourStory:
    "तुमची कहाणी.",

  betterCare:
    "उत्तम उपचार.",

  completeHistoryBeforeDoctor:
    "डॉक्टरांना भेटण्यापूर्वी तुमचा आयुर्वेदिक आरोग्य इतिहास पूर्ण करा.",

  patientKiosk:
    "रुग्ण किऑस्क",

  startHealthJourney:
    "तुमची आरोग्ययात्रा सुरू करा",

  doctorPortal:
    "डॉक्टर पोर्टल",

  reviewManagePatients:
    "रुग्णांचे पुनरावलोकन व व्यवस्थापन",

  adminPortal:
    "अॅडमिन पोर्टल",

  systemConfiguration:
    "सिस्टम कॉन्फिगरेशन",

  traditionalWisdom:
    "पारंपरिक ज्ञान",

  rootedInAyurveda:
    "आयुर्वेदावर आधारित",

  modernTechnology:
    "आधुनिक तंत्रज्ञान",

  smarterHealthcare:
    "स्मार्ट आरोग्यसेवा",

  healthierTomorrow:
    "निरोगी भविष्य",

  forABrighterYou:
    "उज्ज्वल भविष्यासाठी",

  /* ---------------- Speech ---------------- */

  speakQuestion:
    "प्रश्न पुन्हा ऐका",

  listen:
    "ऐका",

  speaking:
    "बोलत आहे...",

  listening:
    "ऐकत आहे...",

  yourResponse:
    "तुमचे उत्तर",

  tapMicrophone:
    "मायक्रोफोन दाबा आणि नैसर्गिकपणे बोला.",

  hearQuestionAgain:
    "प्रश्न पुन्हा ऐका",

  tapMicrophoneToAnswer:
    "मायक्रोफोन दाबा आणि तुमचे उत्तर बोला.",

  /* ---------------- History ---------------- */

  historyComplete:
    "इतिहास पूर्ण झाला",

  preparingClinicalHistory:
    "तुमचा वैद्यकीय इतिहास तयार केला जात आहे...",

  question:
    "प्रश्न",

  of:
    "पैकी",

  answerRequired:
    "पुढे जाण्यासाठी कृपया उत्तर द्या.",

  typeYourAnswer:
    "तुमचे उत्तर लिहा",

  tapOption:
    "एक पर्याय निवडा",

  noQuestion:
    "कोणताही प्रश्न उपलब्ध नाही.",

  clinicalHistoryComplete:
    "तुमचा वैद्यकीय इतिहास पूर्ण झाला आहे.",

  /* ---------------- Documents ---------------- */

  thankYou:
    "धन्यवाद.",

  continueDocuments:
    "कागदपत्रांकडे जा",

  scanDocuments:
    "तुमची वैद्यकीय कागदपत्रे स्कॅन करा",

  documentsDescription:
    "तुम्ही मागील प्रिस्क्रिप्शन, प्रयोगशाळा अहवाल, डिस्चार्ज सारांश किंवा इतर वैद्यकीय कागदपत्रे जोडू शकता.",

  scanUpload:
    "कागदपत्र स्कॅन किंवा अपलोड करण्यासाठी क्लिक करा",

  prescription:
    "प्रिस्क्रिप्शन",

  labReport:
    "लॅब अहवाल",

  dischargeSummary:
    "डिस्चार्ज सारांश",

  continueReview:
    "पुनरावलोकनाकडे जा",

  upload:
    "अपलोड करा",

  scanDocument:
    "कागदपत्र स्कॅन करा",

  camera:
    "कॅमेरा",

  takePhoto:
    "फोटो घ्या",

  retake:
    "पुन्हा घ्या",

  usePhoto:
    "फोटो वापरा",

  removeDocument:
    "कागदपत्र काढा",

  documentAdded:
    "कागदपत्र जोडले",

  noDocuments:
    "कोणतेही कागदपत्र जोडलेले नाही",

  optionalDocuments:
    "कागदपत्रे ऐच्छिक आहेत",

  /* ---------------- System ---------------- */

  networkArchitecture:
    "नेटवर्क आर्किटेक्चर",

  online:
    "ऑनलाइन",

  offline:
    "ऑफलाइन",

  /* ---------------- Consent ---------------- */

  beforeBegin:
    "सुरुवात करण्यापूर्वी",

  privacyMatters:
    "तुमची गोपनीयता महत्त्वाची आहे",

  privacySubtitle:
    "या सत्रादरम्यान MediKiosk तुम्ही दिलेल्या माहितीचा वापर कसा करेल हे कृपया ऐका किंवा वाचा.",

  whatHappens:
    "काय होईल?",

  consentExplanation:
    "MediKiosk तुमची सध्याची समस्या, मागील वैद्यकीय इतिहास, औषधे, ऍलर्जी, कौटुंबिक इतिहास, जीवनशैली आणि संबंधित आयुर्वेदिक क्लिनिकल इतिहासाबद्दल प्रश्न विचारेल.",

  listenExplanation:
    "स्पष्टीकरण ऐका",

  primaryConsent:
    "प्राथमिक क्लिनिकल सल्लामसलत संमती",

  primaryConsentText:
    "क्लिनिकल सल्लामसलतीच्या उद्देशाने माझा आरोग्य इतिहास देण्यास मी सहमत आहे. ही माहिती माझ्या उपचार करणाऱ्या डॉक्टरांसोबत शेअर केली जाईल आणि ABDM / DISHA मार्गदर्शक तत्त्वांनुसार सुरक्षितपणे संग्रहित केली जाईल हे मला समजते.",

  optionalConsents:
    "पर्यायी संमती",

  voiceProcessing:
    "व्हॉइस प्रोसेसिंग",

  voiceProcessingDescription:
    "तुमची बोललेली उत्तरे क्लिनिकल दस्तऐवजीकरणासाठी मजकुरात रूपांतरित केली जाऊ शकतात.",

  documentScanning:
    "वैद्यकीय दस्तऐवज स्कॅनिंग",

  documentScanningDescription:
    "मागील प्रिस्क्रिप्शन, प्रयोगशाळा अहवाल, डिस्चार्ज सारांश आणि इतर वैद्यकीय कागदपत्रे स्कॅन करा.",

  aiDocumentation:
    "AI-सहाय्यित दस्तऐवजीकरण",

  aiDocumentationDescription:
    "तुम्ही दिलेल्या माहितीवरून AI क्लिनिकल सारांशाचा मसुदा तयार करते. डॉक्टर त्याचे पुनरावलोकन आणि पुष्टी करतात.",

  abhaExchange:
    "ABHA / आरोग्य नोंद विनिमय",

  abhaExchangeDescription:
    "तुमच्या संमतीने संबंधित माहिती तुमच्या ABHA शी जोडलेल्या आरोग्य नोंदींसोबत शेअर केली जाऊ शकते.",

  /* ---------------- Identification ---------------- */

  existingPatient:
    "विद्यमान रुग्ण",

  newPatient:
    "नवीन रुग्ण",

  useHospitalId:
    "रुग्णालय ओळख क्रमांक वापरा",

  abha:
    "ABHA",

  abhaId:
    "ABHA क्रमांक",

  useAbhaHealthId:
    "ABHA हेल्थ आयडी वापरा",

  registerNewPatient:
    "नवीन रुग्ण म्हणून नोंदणी करा",

  aadhaarCard:
    "आधार कार्ड",

  optional:
    "ऐच्छिक",

  selectOptionToContinue:
    "पुढे जाण्यासाठी एक पर्याय निवडा",

  hospitalId:
    "रुग्णालय ओळख क्रमांक",

  hospitalUhid:
    "रुग्णालय UHID",

  enterHospitalId:
    "तुमचा रुग्णालय ओळख क्रमांक टाका",

  enterUhid:
    "तुमचा रुग्णालय UHID टाका",

  hospitalIdPreviousVisits:
    "तुम्ही यापूर्वी या रुग्णालयात आला असल्यास तुमचा रुग्णालय ओळख क्रमांक वापरा.",

  enterAbhaId:
    "तुमचा ABHA क्रमांक टाका",

  abhaLinkExplanation:
    "तुमच्या संमतीने तुमच्या आरोग्य नोंदी सुरक्षितपणे जोडण्यासाठी ABHA वापरता येईल.",

  aadhaar:
    "आधार",

  aadhaarNumber:
    "आधार क्रमांक",

  enterAadhaar:
    "तुमचा आधार क्रमांक टाका",

  aadhaarOptionalExplanation:
    "आधार ऐच्छिक आहे. तो न देता देखील तुम्ही पुढे जाऊ शकता.",

  continueAsNewPatient:
    "नवीन रुग्ण म्हणून पुढे चला",

  welcomeToMediKiosk:
    "MediKiosk मध्ये तुमचे स्वागत आहे",

  newPatientRegistrationExplanation:
    "तुम्ही या रुग्णालयात प्रथमच येत असल्यास नवीन रुग्ण म्हणून पुढे जाऊ शकता.",

  whyCollectThis:
    "आम्ही ही माहिती का घेतो?",

  /* ---------------- Demographics ---------------- */

  aboutYou:
    "तुमच्याबद्दल",

  tellAboutYourself:
    "तुमच्याबद्दल थोडे सांगा.",

  basicInfoSubtitle:
    "ही माहिती तुमच्या डॉक्टरांना तुमची क्लिनिकल पार्श्वभूमी समजून घेण्यास मदत करते.",

  fullName:
    "पूर्ण नाव",

  enterFullName:
    "तुमचे पूर्ण नाव टाका",

  fullNameRequired:
    "कृपया तुमचे पूर्ण नाव टाका.",

  dateOfBirth:
    "जन्मतारीख",

  age:
    "वय",

  enterAge:
    "तुमचे वय टाका",

  ageRequired:
    "कृपया तुमचे वय टाका.",

  gender:
    "लिंग",

  genderRequired:
    "कृपया तुमचे लिंग निवडा.",

  selectGender:
    "लिंग निवडा",

  male:
    "पुरुष",

  female:
    "महिला",

  other:
    "इतर",

  preferNotToSay:
    "सांगणे पसंत नाही",

  mobileNumber:
    "मोबाईल क्रमांक",

  enterMobileNumber:
    "मोबाईल क्रमांक टाका",

  occupation:
    "व्यवसाय",

  occupationPlaceholder:
    "उदा. विद्यार्थी, शिक्षक, शेतकरी",

  location:
    "स्थान",

  cityDistrict:
    "शहर / जिल्हा",

  state:
    "राज्य",

  selectState:
    "राज्य निवडा",

  /* ---------------- Complaint ---------------- */

  tellUsYourProblem:
    "तुमच्या समस्येबद्दल सांगा",

  whatBringsYouToday:
    "आज तुम्हाला क्लिनिकमध्ये कोणत्या समस्येसाठी यावे लागले?",

  selectComplaints:
    "तुमच्या तक्रारी निवडा",

  selectAllThatApply:
    "लागू असलेले सर्व पर्याय निवडा",

  primaryComplaint:
    "मुख्य तक्रार",

  associatedComplaint:
    "संबंधित तक्रार",

  somethingElse:
    "काहीतरी वेगळे",

  describeProblem:
    "कृपया तुमच्या समस्येबद्दल सांगा",

  speakYourProblem:
    "तुमच्या समस्येबद्दल बोला",

  /* ---------------- Ayurveda ---------------- */

  prakriti:
    "प्रकृती",

  vikriti:
    "विकृती",

  trividha:
    "त्रिविध परीक्षा",

  ashtavidha:
    "अष्टविध परीक्षा",

  dashavidha:
    "दशविध परीक्षा",

  agni:
    "अग्नी",

  koshtha:
    "कोष्ठ",

  ahara:
    "आहार",

  vihara:
    "विहार",

  nidana:
    "निदान",

  samprapti:
    "संप्राप्ती",

  /* ---------------- Review ---------------- */

  reviewInformation:
    "तुमच्या माहितीचे पुनरावलोकन करा",

  checkInformation:
    "सबमिट करण्यापूर्वी कृपया तुमची माहिती तपासा.",

  patientInformation:
    "रुग्णाची माहिती",

  patientResponses:
    "रुग्णाची उत्तरे",

  previousMedicalHistory:
    "मागील वैद्यकीय इतिहास",

  familyHistory:
    "कौटुंबिक इतिहास",

  drugHistory:
    "औषधांचा इतिहास",

  allergyStatus:
    "ऍलर्जीची स्थिती",

  lifestyle:
    "जीवनशैली",

  submitForPhysicianReview:
    "डॉक्टरांच्या पुनरावलोकनासाठी सबमिट करा",

  /* ---------------- Thank You ---------------- */

  responseRecorded:
    "तुमचा प्रतिसाद नोंदवला गेला आहे.",

  tokenNumber:
    "टोकन क्रमांक",

  sentToDoctor:
    "डॉक्टरांना पाठवले",

  underReview:
    "पुनरावलोकन सुरू आहे",

  returnHome:
    "मुख्यपृष्ठावर परत जा",

  physicianWillReview:
    "तुमच्या सल्लामसलतीपूर्वी डॉक्टर तुमच्या वैद्यकीय इतिहासाचे पुनरावलोकन करतील.",
};

/* =========================================================
   BENGALI
========================================================= */

const bn: TranslationSet = {
  ...en,

  namaste:
    "নমস্কার!",

  selectLanguage:
    "আপনার পছন্দের ভাষা নির্বাচন করুন",

  comfortableLanguage:
    "যে ভাষায় আপনি সবচেয়ে স্বাচ্ছন্দ্যবোধ করেন সেটি নির্বাচন করুন",

  continue:
    "চালিয়ে যান",

  back:
    "পিছনে",

  help:
    "সহায়তা",

  reset:
    "রিসেট",

  selectedLanguage:
    "নির্বাচিত ভাষা",

  interactionPreference:
    "যোগাযোগের পদ্ধতি",

  howContinue:
    "আপনি কীভাবে যোগাযোগ করতে চান?",

  chooseInteraction:
    "আপনার জন্য সবচেয়ে আরামদায়ক পদ্ধতিটি বেছে নিন।",

  voiceToVoice:
    "ভয়েস থেকে ভয়েস",

  voiceToText:
    "ভয়েস থেকে টেক্সট",

  textToVoice:
    "টেক্সট থেকে ভয়েস",

  textToText:
    "টেক্সট থেকে টেক্সট",

  history:
    "চিকিৎসা ইতিহাস",

  yourResponse:
    "আপনার উত্তর",

  listening:
    "শুনছি...",

  speaking:
    "বলছি...",

  thankYou:
    "ধন্যবাদ।",

  historyComplete:
    "ইতিহাস সম্পূর্ণ হয়েছে",

  beforeBegin:
    "শুরু করার আগে",

  privacyMatters:
    "আপনার গোপনীয়তা গুরুত্বপূর্ণ",

  privacySubtitle:
    "এই সেশনে আপনার দেওয়া তথ্য MediKiosk কীভাবে ব্যবহার করবে তা শুনুন বা পড়ুন।",

  whatHappens:
    "কী হবে?",

  listenExplanation:
    "ব্যাখ্যা শুনুন",

  primaryConsent:
    "প্রাথমিক ক্লিনিক্যাল পরামর্শের সম্মতি",

  optionalConsents:
    "ঐচ্ছিক সম্মতি",

  voiceProcessing:
    "ভয়েস প্রসেসিং",

  voiceProcessingDescription:
    "আপনার বলা উত্তরগুলি ক্লিনিক্যাল ডকুমেন্টেশনের জন্য টেক্সটে রূপান্তর করা হতে পারে।",

  documentScanning:
    "চিকিৎসা নথি স্ক্যানিং",

  documentScanningDescription:
    "পূর্বের প্রেসক্রিপশন, ল্যাব রিপোর্ট, ডিসচার্জ সারাংশ এবং অন্যান্য চিকিৎসা নথি স্ক্যান করুন।",

  aiDocumentation:
    "AI-সহায়িত ডকুমেন্টেশন",

  aiDocumentationDescription:
    "আপনার দেওয়া তথ্য থেকে AI একটি ক্লিনিক্যাল সারাংশের খসড়া তৈরি করে। চিকিৎসক এটি পর্যালোচনা ও নিশ্চিত করেন।",

  abhaExchange:
    "ABHA / স্বাস্থ্য রেকর্ড বিনিময়",

  abhaExchangeDescription:
    "আপনার সম্মতিতে প্রাসঙ্গিক তথ্য আপনার ABHA-সংযুক্ত স্বাস্থ্য রেকর্ডের সঙ্গে শেয়ার করা হতে পারে।",

  aboutYou:
    "আপনার সম্পর্কে",

  tellAboutYourself:
    "আপনার সম্পর্কে কিছু বলুন।",

  basicInfoSubtitle:
    "এই তথ্যগুলি আপনার চিকিৎসককে আপনার ক্লিনিক্যাল প্রেক্ষাপট বুঝতে সাহায্য করে।",

  fullName:
    "পুরো নাম",

  enterFullName:
    "আপনার পুরো নাম লিখুন",

  age:
    "বয়স",

  enterAge:
    "আপনার বয়স লিখুন",

  gender:
    "লিঙ্গ",

  selectGender:
    "লিঙ্গ নির্বাচন করুন",

  male:
    "পুরুষ",

  female:
    "মহিলা",

  other:
    "অন্যান্য",

  preferNotToSay:
    "বলতে চাই না",

  mobileNumber:
    "মোবাইল নম্বর",

  enterMobileNumber:
    "মোবাইল নম্বর লিখুন",

  occupation:
    "পেশা",

  occupationPlaceholder:
    "যেমন ছাত্র, শিক্ষক, কৃষক",

  location:
    "স্থান",

  cityDistrict:
    "শহর / জেলা",

  state:
    "রাজ্য",

  selectState:
    "রাজ্য নির্বাচন করুন",

  tellUsYourProblem:
    "আপনার সমস্যা সম্পর্কে বলুন",

  whatBringsYouToday:
    "আজ আপনাকে ক্লিনিকে আসতে কী সমস্যা হয়েছে?",

  selectComplaints:
    "আপনার অভিযোগগুলি নির্বাচন করুন",

  selectAllThatApply:
    "প্রযোজ্য সবগুলি নির্বাচন করুন",

  primaryComplaint:
    "প্রধান অভিযোগ",

  associatedComplaint:
    "সম্পর্কিত অভিযোগ",

  somethingElse:
    "অন্য কিছু",

  describeProblem:
    "আপনার সমস্যা বর্ণনা করুন",

  speakYourProblem:
    "আপনার সমস্যা সম্পর্কে বলুন",

  prakriti:
    "প্রকৃতি",

  vikriti:
    "বিকৃতি",

  trividha:
    "ত্রিবিধ পরীক্ষা",

  ashtavidha:
    "অষ্টবিধ পরীক্ষা",

  dashavidha:
    "দশবিধ পরীক্ষা",

  agni:
    "অগ্নি",

  koshtha:
    "কোষ্ঠ",

  ahara:
    "আহার",

  vihara:
    "বিহার",

  nidana:
    "নিদান",

  samprapti:
    "সম্প্রাপ্তি",
};

/* =========================================================
   GUJARATI
========================================================= */

const gu: TranslationSet = {
  ...en,

  namaste:
    "નમસ્તે!",

  selectLanguage:
    "કૃપા કરીને તમારી પસંદગીની ભાષા પસંદ કરો",

  comfortableLanguage:
    "જે ભાષામાં તમને સૌથી વધુ અનુકૂળ લાગે તે પસંદ કરો",

  continue:
    "ચાલુ રાખો",

  back:
    "પાછળ",

  help:
    "મદદ",

  reset:
    "રીસેટ",

  selectedLanguage:
    "પસંદ કરેલી ભાષા",

  interactionPreference:
    "વાતચીતની રીત",

  howContinue:
    "તમે કેવી રીતે વાતચીત કરવા માંગો છો?",

  chooseInteraction:
    "તમારા માટે સૌથી અનુકૂળ રીત પસંદ કરો.",

  voiceToVoice:
    "અવાજથી અવાજ",

  voiceToText:
    "અવાજથી ટેક્સ્ટ",

  textToVoice:
    "ટેક્સ્ટથી અવાજ",

  textToText:
    "ટેક્સ્ટથી ટેક્સ્ટ",

  history:
    "તબીબી ઇતિહાસ",

  yourResponse:
    "તમારો જવાબ",

  listening:
    "સાંભળી રહ્યા છીએ...",

  speaking:
    "બોલી રહ્યા છીએ...",

  thankYou:
    "આભાર.",

  historyComplete:
    "ઇતિહાસ પૂર્ણ થયો",

  beforeBegin:
    "શરૂ કરતા પહેલાં",

  privacyMatters:
    "તમારી ગોપનીયતા મહત્વપૂર્ણ છે",

  whatHappens:
    "શું થશે?",

  listenExplanation:
    "સમજૂતી સાંભળો",

  optionalConsents:
    "વૈકલ્પિક સંમતિઓ",

  voiceProcessing:
    "વૉઇસ પ્રોસેસિંગ",

  voiceProcessingDescription:
    "તમારા બોલેલા જવાબોને ક્લિનિકલ દસ્તાવેજીકરણ માટે ટેક્સ્ટમાં રૂપાંતરિત કરવામાં આવી શકે છે.",

  documentScanning:
    "તબીબી દસ્તાવેજ સ્કેનિંગ",

  documentScanningDescription:
    "પાછલા પ્રિસ્ક્રિપ્શન, લેબ રિપોર્ટ, ડિસ્ચાર્જ સારાંશ અને અન્ય તબીબી દસ્તાવેજો સ્કેન કરો.",

  aiDocumentation:
    "AI-સહાયિત દસ્તાવેજીકરણ",

  aiDocumentationDescription:
    "તમે આપેલી માહિતીમાંથી AI ક્લિનિકલ સારાંશનો ડ્રાફ્ટ બનાવે છે. ડૉક્ટર તેની સમીક્ષા અને પુષ્ટિ કરે છે.",

  abhaExchange:
    "ABHA / આરોગ્ય રેકોર્ડ વિનિમય",

  abhaExchangeDescription:
    "તમારી સંમતિથી સંબંધિત માહિતી તમારા ABHA સાથે જોડાયેલા આરોગ્ય રેકોર્ડ સાથે શેર કરી શકાય છે.",

  aboutYou:
    "તમારા વિશે",

  tellAboutYourself:
    "તમારા વિશે થોડું જણાવો.",

  basicInfoSubtitle:
    "આ વિગતો તમારા ડૉક્ટરને તમારી ક્લિનિકલ પરિસ્થિતિ સમજવામાં મદદ કરે છે.",

  fullName:
    "પૂરું નામ",

  enterFullName:
    "તમારું પૂરું નામ દાખલ કરો",

  age:
    "ઉંમર",

  enterAge:
    "તમારી ઉંમર દાખલ કરો",

  gender:
    "લિંગ",

  selectGender:
    "લિંગ પસંદ કરો",

  male:
    "પુરુષ",

  female:
    "સ્ત્રી",

  other:
    "અન્ય",

  preferNotToSay:
    "જણાવવું નથી",

  mobileNumber:
    "મોબાઇલ નંબર",

  enterMobileNumber:
    "મોબાઇલ નંબર દાખલ કરો",

  occupation:
    "વ્યવસાય",

  occupationPlaceholder:
    "દા.ત. વિદ્યાર્થી, શિક્ષક, ખેડૂત",

  location:
    "સ્થળ",

  cityDistrict:
    "શહેર / જિલ્લો",

  state:
    "રાજ્ય",

  selectState:
    "રાજ્ય પસંદ કરો",
};

/* =========================================================
   PUNJABI
========================================================= */

const pa: TranslationSet = {
  ...en,

  namaste:
    "ਸਤ ਸ੍ਰੀ ਅਕਾਲ!",

  selectLanguage:
    "ਕਿਰਪਾ ਕਰਕੇ ਆਪਣੀ ਪਸੰਦੀਦਾ ਭਾਸ਼ਾ ਚੁਣੋ",

  comfortableLanguage:
    "ਉਹ ਭਾਸ਼ਾ ਚੁਣੋ ਜਿਸ ਵਿੱਚ ਤੁਸੀਂ ਸਭ ਤੋਂ ਆਰਾਮਦਾਇਕ ਮਹਿਸੂਸ ਕਰਦੇ ਹੋ",

  continue:
    "ਜਾਰੀ ਰੱਖੋ",

  back:
    "ਵਾਪਸ",

  help:
    "ਮਦਦ",

  reset:
    "ਰੀਸੈਟ",

  selectedLanguage:
    "ਚੁਣੀ ਹੋਈ ਭਾਸ਼ਾ",

  interactionPreference:
    "ਗੱਲਬਾਤ ਦਾ ਤਰੀਕਾ",

  howContinue:
    "ਤੁਸੀਂ ਕਿਵੇਂ ਗੱਲਬਾਤ ਕਰਨਾ ਚਾਹੁੰਦੇ ਹੋ?",

  voiceToVoice:
    "ਆਵਾਜ਼ ਤੋਂ ਆਵਾਜ਼",

  voiceToText:
    "ਆਵਾਜ਼ ਤੋਂ ਟੈਕਸਟ",

  textToVoice:
    "ਟੈਕਸਟ ਤੋਂ ਆਵਾਜ਼",

  textToText:
    "ਟੈਕਸਟ ਤੋਂ ਟੈਕਸਟ",

  history:
    "ਮੈਡੀਕਲ ਇਤਿਹਾਸ",

  yourResponse:
    "ਤੁਹਾਡਾ ਜਵਾਬ",

  listening:
    "ਸੁਣ ਰਹੇ ਹਾਂ...",

  speaking:
    "ਬੋਲ ਰਹੇ ਹਾਂ...",

  thankYou:
    "ਧੰਨਵਾਦ।",

  historyComplete:
    "ਇਤਿਹਾਸ ਪੂਰਾ ਹੋਇਆ",

  beforeBegin:
    "ਸ਼ੁਰੂ ਕਰਨ ਤੋਂ ਪਹਿਲਾਂ",

  privacyMatters:
    "ਤੁਹਾਡੀ ਨਿੱਜਤਾ ਮਹੱਤਵਪੂਰਨ ਹੈ",

  whatHappens:
    "ਕੀ ਹੋਵੇਗਾ?",

  listenExplanation:
    "ਵਿਆਖਿਆ ਸੁਣੋ",

  optionalConsents:
    "ਵਿਕਲਪਿਕ ਸਹਿਮਤੀਆਂ",

  voiceProcessing:
    "ਵੌਇਸ ਪ੍ਰੋਸੈਸਿੰਗ",

  voiceProcessingDescription:
    "ਤੁਹਾਡੇ ਬੋਲੇ ਗਏ ਜਵਾਬਾਂ ਨੂੰ ਕਲੀਨਿਕਲ ਦਸਤਾਵੇਜ਼ੀਕਰਨ ਲਈ ਟੈਕਸਟ ਵਿੱਚ ਬਦਲਿਆ ਜਾ ਸਕਦਾ ਹੈ।",

  documentScanning:
    "ਮੈਡੀਕਲ ਦਸਤਾਵੇਜ਼ ਸਕੈਨਿੰਗ",

  documentScanningDescription:
    "ਪਿਛਲੇ ਨੁਸਖੇ, ਲੈਬ ਰਿਪੋਰਟਾਂ, ਡਿਸਚਾਰਜ ਸੰਖੇਪ ਅਤੇ ਹੋਰ ਮੈਡੀਕਲ ਦਸਤਾਵੇਜ਼ ਸਕੈਨ ਕਰੋ।",

  aiDocumentation:
    "AI-ਸਹਾਇਤਾ ਪ੍ਰਾਪਤ ਦਸਤਾਵੇਜ਼ੀਕਰਨ",

  aiDocumentationDescription:
    "ਤੁਹਾਡੇ ਵੱਲੋਂ ਦਿੱਤੀ ਜਾਣਕਾਰੀ ਤੋਂ AI ਕਲੀਨਿਕਲ ਸੰਖੇਪ ਦਾ ਖਰੜਾ ਤਿਆਰ ਕਰਦਾ ਹੈ। ਡਾਕਟਰ ਇਸ ਦੀ ਸਮੀਖਿਆ ਅਤੇ ਪੁਸ਼ਟੀ ਕਰਦਾ ਹੈ।",

  abhaExchange:
    "ABHA / ਸਿਹਤ ਰਿਕਾਰਡ ਐਕਸਚੇਂਜ",

  abhaExchangeDescription:
    "ਤੁਹਾਡੀ ਸਹਿਮਤੀ ਨਾਲ ਸੰਬੰਧਿਤ ਜਾਣਕਾਰੀ ਤੁਹਾਡੇ ABHA ਨਾਲ ਜੁੜੇ ਸਿਹਤ ਰਿਕਾਰਡ ਨਾਲ ਸਾਂਝੀ ਕੀਤੀ ਜਾ ਸਕਦੀ ਹੈ।",

  aboutYou:
    "ਤੁਹਾਡੇ ਬਾਰੇ",

  tellAboutYourself:
    "ਆਪਣੇ ਬਾਰੇ ਥੋੜ੍ਹਾ ਦੱਸੋ।",

  basicInfoSubtitle:
    "ਇਹ ਵੇਰਵੇ ਤੁਹਾਡੇ ਡਾਕਟਰ ਨੂੰ ਤੁਹਾਡੀ ਕਲੀਨਿਕਲ ਸਥਿਤੀ ਸਮਝਣ ਵਿੱਚ ਮਦਦ ਕਰਦੇ ਹਨ।",

  fullName:
    "ਪੂਰਾ ਨਾਮ",

  enterFullName:
    "ਆਪਣਾ ਪੂਰਾ ਨਾਮ ਦਰਜ ਕਰੋ",

  age:
    "ਉਮਰ",

  enterAge:
    "ਆਪਣੀ ਉਮਰ ਦਰਜ ਕਰੋ",

  gender:
    "ਲਿੰਗ",

  selectGender:
    "ਲਿੰਗ ਚੁਣੋ",

  male:
    "ਪੁਰਸ਼",

  female:
    "ਔਰਤ",

  other:
    "ਹੋਰ",

  preferNotToSay:
    "ਦੱਸਣਾ ਪਸੰਦ ਨਹੀਂ",

  mobileNumber:
    "ਮੋਬਾਈਲ ਨੰਬਰ",

  enterMobileNumber:
    "ਮੋਬਾਈਲ ਨੰਬਰ ਦਰਜ ਕਰੋ",

  occupation:
    "ਕਿੱਤਾ",

  occupationPlaceholder:
    "ਜਿਵੇਂ ਵਿਦਿਆਰਥੀ, ਅਧਿਆਪਕ, ਕਿਸਾਨ",

  location:
    "ਸਥਾਨ",

  cityDistrict:
    "ਸ਼ਹਿਰ / ਜ਼ਿਲ੍ਹਾ",

  state:
    "ਰਾਜ",

  selectState:
    "ਰਾਜ ਚੁਣੋ",
};

/* =========================================================
   TAMIL
========================================================= */

const ta: TranslationSet = {
  ...en,

  namaste:
    "வணக்கம்!",

  selectLanguage:
    "உங்கள் விருப்பமான மொழியைத் தேர்ந்தெடுக்கவும்",

  comfortableLanguage:
    "நீங்கள் மிகவும் வசதியாக இருக்கும் மொழியைத் தேர்ந்தெடுக்கவும்",

  continue:
    "தொடரவும்",

  back:
    "பின்செல்",

  help:
    "உதவி",

  reset:
    "மீட்டமை",

  selectedLanguage:
    "தேர்ந்தெடுக்கப்பட்ட மொழி",

  interactionPreference:
    "தொடர்பு முறை",

  howContinue:
    "நீங்கள் எவ்வாறு தொடர்பு கொள்ள விரும்புகிறீர்கள்?",

  voiceToVoice:
    "குரல் முதல் குரல்",

  voiceToText:
    "குரல் முதல் உரை",

  textToVoice:
    "உரை முதல் குரல்",

  textToText:
    "உரை முதல் உரை",

  history:
    "மருத்துவ வரலாறு",

  yourResponse:
    "உங்கள் பதில்",

  listening:
    "கேட்கிறது...",

  speaking:
    "பேசுகிறது...",

  thankYou:
    "நன்றி.",

  historyComplete:
    "வரலாறு முடிந்தது",

  beforeBegin:
    "தொடங்குவதற்கு முன்",

  privacyMatters:
    "உங்கள் தனியுரிமை முக்கியமானது",

  whatHappens:
    "என்ன நடக்கும்?",

  listenExplanation:
    "விளக்கத்தைக் கேளுங்கள்",

  optionalConsents:
    "விருப்ப ஒப்புதல்கள்",

  voiceProcessing:
    "குரல் செயலாக்கம்",

  voiceProcessingDescription:
    "உங்கள் பேச்சு பதில்கள் மருத்துவ ஆவணப்படுத்தலுக்காக உரையாக மாற்றப்படலாம்.",

  documentScanning:
    "மருத்துவ ஆவண ஸ்கேனிங்",

  documentScanningDescription:
    "முந்தைய மருந்துச் சீட்டுகள், ஆய்வக அறிக்கைகள், வெளியேற்றச் சுருக்கங்கள் மற்றும் பிற மருத்துவ ஆவணங்களை ஸ்கேன் செய்யவும்.",

  aiDocumentation:
    "AI உதவியுடன் ஆவணப்படுத்தல்",

  aiDocumentationDescription:
    "நீங்கள் வழங்கும் தகவலிலிருந்து AI மருத்துவச் சுருக்கத்தின் வரைவை உருவாக்குகிறது. மருத்துவர் அதை மதிப்பாய்வு செய்து உறுதிப்படுத்துகிறார்.",

  abhaExchange:
    "ABHA / சுகாதாரப் பதிவுப் பரிமாற்றம்",

  abhaExchangeDescription:
    "உங்கள் ஒப்புதலுடன் தொடர்புடைய தகவல்கள் உங்கள் ABHA இணைக்கப்பட்ட சுகாதாரப் பதிவுகளுடன் பகிரப்படலாம்.",

  aboutYou:
    "உங்களைப் பற்றி",

  tellAboutYourself:
    "உங்களைப் பற்றி சிறிது கூறுங்கள்.",

  basicInfoSubtitle:
    "இந்த விவரங்கள் உங்கள் மருத்துவர் உங்கள் மருத்துவச் சூழலைப் புரிந்துகொள்ள உதவும்.",

  fullName:
    "முழுப் பெயர்",

  enterFullName:
    "உங்கள் முழுப் பெயரை உள்ளிடவும்",

  age:
    "வயது",

  enterAge:
    "உங்கள் வயதை உள்ளிடவும்",

  gender:
    "பாலினம்",

  selectGender:
    "பாலினத்தைத் தேர்ந்தெடுக்கவும்",

  male:
    "ஆண்",

  female:
    "பெண்",

  other:
    "மற்றவை",

  preferNotToSay:
    "தெரிவிக்க விரும்பவில்லை",

  mobileNumber:
    "மொபைல் எண்",

  enterMobileNumber:
    "மொபைல் எண்ணை உள்ளிடவும்",

  occupation:
    "தொழில்",

  occupationPlaceholder:
    "எ.கா. மாணவர், ஆசிரியர், விவசாயி",

  location:
    "இடம்",

  cityDistrict:
    "நகரம் / மாவட்டம்",

  state:
    "மாநிலம்",

  selectState:
    "மாநிலத்தைத் தேர்ந்தெடுக்கவும்",
};

/* =========================================================
   TELUGU
========================================================= */

const te: TranslationSet = {
  ...en,

  namaste:
    "నమస్తే!",

  selectLanguage:
    "దయచేసి మీకు ఇష్టమైన భాషను ఎంచుకోండి",

  comfortableLanguage:
    "మీకు అత్యంత సౌకర్యంగా ఉన్న భాషను ఎంచుకోండి",

  continue:
    "కొనసాగించండి",

  back:
    "వెనుకకు",

  help:
    "సహాయం",

  reset:
    "రీసెట్",

  selectedLanguage:
    "ఎంచుకున్న భాష",

  interactionPreference:
    "సంభాషణ విధానం",

  howContinue:
    "మీరు ఎలా సంభాషించాలనుకుంటున్నారు?",

  voiceToVoice:
    "వాయిస్ నుండి వాయిస్",

  voiceToText:
    "వాయిస్ నుండి టెక్స్ట్",

  textToVoice:
    "టెక్స్ట్ నుండి వాయిస్",

  textToText:
    "టెక్స్ట్ నుండి టెక్స్ట్",

  history:
    "వైద్య చరిత్ర",

  yourResponse:
    "మీ సమాధానం",

  listening:
    "వింటోంది...",

  speaking:
    "మాట్లాడుతోంది...",

  thankYou:
    "ధన్యవాదాలు.",

  historyComplete:
    "చరిత్ర పూర్తయింది",

  beforeBegin:
    "ప్రారంభించే ముందు",

  privacyMatters:
    "మీ గోప్యత ముఖ్యం",

  whatHappens:
    "ఏం జరుగుతుంది?",

  listenExplanation:
    "వివరణ వినండి",

  optionalConsents:
    "ఐచ్ఛిక సమ్మతులు",

  voiceProcessing:
    "వాయిస్ ప్రాసెసింగ్",

  voiceProcessingDescription:
    "మీరు మాట్లాడిన సమాధానాలను క్లినికల్ డాక్యుమెంటేషన్ కోసం టెక్స్ట్‌గా మార్చవచ్చు.",

  documentScanning:
    "వైద్య పత్రాల స్కానింగ్",

  documentScanningDescription:
    "మునుపటి ప్రిస్క్రిప్షన్‌లు, ల్యాబ్ రిపోర్టులు, డిశ్చార్జ్ సారాంశాలు మరియు ఇతర వైద్య పత్రాలను స్కాన్ చేయండి.",

  aiDocumentation:
    "AI సహాయంతో డాక్యుమెంటేషన్",

  aiDocumentationDescription:
    "మీరు అందించిన సమాచారంతో AI క్లినికల్ సారాంశం ముసాయిదాను రూపొందిస్తుంది. వైద్యుడు దాన్ని సమీక్షించి నిర్ధారిస్తారు.",

  abhaExchange:
    "ABHA / ఆరోగ్య రికార్డు మార్పిడి",

  abhaExchangeDescription:
    "మీ సమ్మతితో సంబంధిత సమాచారాన్ని మీ ABHAతో అనుసంధానమైన ఆరోగ్య రికార్డులతో పంచుకోవచ్చు.",

  aboutYou:
    "మీ గురించి",

  tellAboutYourself:
    "మీ గురించి కొంచెం చెప్పండి.",

  basicInfoSubtitle:
    "ఈ వివరాలు మీ వైద్యుడికి మీ క్లినికల్ పరిస్థితిని అర్థం చేసుకోవడంలో సహాయపడతాయి.",

  fullName:
    "పూర్తి పేరు",

  enterFullName:
    "మీ పూర్తి పేరును నమోదు చేయండి",

  age:
    "వయస్సు",

  enterAge:
    "మీ వయస్సును నమోదు చేయండి",

  gender:
    "లింగం",

  selectGender:
    "లింగాన్ని ఎంచుకోండి",

  male:
    "పురుషుడు",

  female:
    "స్త్రీ",

  other:
    "ఇతరులు",

  preferNotToSay:
    "చెప్పడానికి ఇష్టంలేదు",

  mobileNumber:
    "మొబైల్ నంబర్",

  enterMobileNumber:
    "మొబైల్ నంబర్‌ను నమోదు చేయండి",

  occupation:
    "వృత్తి",

  occupationPlaceholder:
    "ఉదా. విద్యార్థి, ఉపాధ్యాయుడు, రైతు",

  location:
    "స్థానం",

  cityDistrict:
    "నగరం / జిల్లా",

  state:
    "రాష్ట్రం",

  selectState:
    "రాష్ట్రాన్ని ఎంచుకోండి",
};

/* =========================================================
   KANNADA
========================================================= */

const kn: TranslationSet = {
  ...en,

  namaste:
    "ನಮಸ್ಕಾರ!",

  selectLanguage:
    "ದಯವಿಟ್ಟು ನಿಮ್ಮ ಆದ್ಯತೆಯ ಭಾಷೆಯನ್ನು ಆಯ್ಕೆಮಾಡಿ",

  comfortableLanguage:
    "ನಿಮಗೆ ಹೆಚ್ಚು ಆರಾಮದಾಯಕವಾದ ಭಾಷೆಯನ್ನು ಆಯ್ಕೆಮಾಡಿ",

  continue:
    "ಮುಂದುವರಿಸಿ",

  back:
    "ಹಿಂದೆ",

  help:
    "ಸಹಾಯ",

  reset:
    "ಮರುಹೊಂದಿಸಿ",

  selectedLanguage:
    "ಆಯ್ಕೆ ಮಾಡಿದ ಭಾಷೆ",

  interactionPreference:
    "ಸಂವಹನ ವಿಧಾನ",

  howContinue:
    "ನೀವು ಹೇಗೆ ಸಂವಹನ ಮಾಡಲು ಬಯಸುತ್ತೀರಿ?",

  voiceToVoice:
    "ಧ್ವನಿಯಿಂದ ಧ್ವನಿ",

  voiceToText:
    "ಧ್ವನಿಯಿಂದ ಪಠ್ಯ",

  textToVoice:
    "ಪಠ್ಯದಿಂದ ಧ್ವನಿ",

  textToText:
    "ಪಠ್ಯದಿಂದ ಪಠ್ಯ",

  history:
    "ವೈದ್ಯಕೀಯ ಇತಿಹಾಸ",

  yourResponse:
    "ನಿಮ್ಮ ಉತ್ತರ",

  listening:
    "ಕೇಳುತ್ತಿದೆ...",

  speaking:
    "ಮಾತನಾಡುತ್ತಿದೆ...",

  thankYou:
    "ಧನ್ಯವಾದಗಳು.",

  historyComplete:
    "ಇತಿಹಾಸ ಪೂರ್ಣಗೊಂಡಿದೆ",

  beforeBegin:
    "ಪ್ರಾರಂಭಿಸುವ ಮೊದಲು",

  privacyMatters:
    "ನಿಮ್ಮ ಗೌಪ್ಯತೆ ಮುಖ್ಯವಾಗಿದೆ",

  whatHappens:
    "ಏನಾಗುತ್ತದೆ?",

  listenExplanation:
    "ವಿವರಣೆಯನ್ನು ಕೇಳಿ",

  optionalConsents:
    "ಐಚ್ಛಿಕ ಸಮ್ಮತಿಗಳು",

  voiceProcessing:
    "ಧ್ವನಿ ಸಂಸ್ಕರಣೆ",

  voiceProcessingDescription:
    "ನೀವು ಮಾತನಾಡಿದ ಉತ್ತರಗಳನ್ನು ಕ್ಲಿನಿಕಲ್ ದಾಖಲಾತಿಗಾಗಿ ಪಠ್ಯವಾಗಿ ಪರಿವರ್ತಿಸಬಹುದು.",

  documentScanning:
    "ವೈದ್ಯಕೀಯ ದಾಖಲೆ ಸ್ಕ್ಯಾನಿಂಗ್",

  documentScanningDescription:
    "ಹಿಂದಿನ ಪ್ರಿಸ್ಕ್ರಿಪ್ಷನ್‌ಗಳು, ಲ್ಯಾಬ್ ವರದಿಗಳು, ಡಿಸ್ಚಾರ್ಜ್ ಸಾರಾಂಶಗಳು ಮತ್ತು ಇತರ ವೈದ್ಯಕೀಯ ದಾಖಲೆಗಳನ್ನು ಸ್ಕ್ಯಾನ್ ಮಾಡಿ.",

  aiDocumentation:
    "AI ಸಹಾಯದ ದಾಖಲಾತಿ",

  aiDocumentationDescription:
    "ನೀವು ನೀಡಿದ ಮಾಹಿತಿಯಿಂದ AI ಕ್ಲಿನಿಕಲ್ ಸಾರಾಂಶದ ಕರಡನ್ನು ಸಿದ್ಧಪಡಿಸುತ್ತದೆ. ವೈದ್ಯರು ಅದನ್ನು ಪರಿಶೀಲಿಸಿ ದೃಢೀಕರಿಸುತ್ತಾರೆ.",

  abhaExchange:
    "ABHA / ಆರೋಗ್ಯ ದಾಖಲೆ ವಿನಿಮಯ",

  abhaExchangeDescription:
    "ನಿಮ್ಮ ಒಪ್ಪಿಗೆಯೊಂದಿಗೆ ಸಂಬಂಧಿತ ಮಾಹಿತಿಯನ್ನು ನಿಮ್ಮ ABHAಗೆ ಸಂಪರ್ಕಿತ ಆರೋಗ್ಯ ದಾಖಲೆಗಳೊಂದಿಗೆ ಹಂಚಿಕೊಳ್ಳಬಹುದು.",

  aboutYou:
    "ನಿಮ್ಮ ಬಗ್ಗೆ",

  tellAboutYourself:
    "ನಿಮ್ಮ ಬಗ್ಗೆ ಸ್ವಲ್ಪ ತಿಳಿಸಿ.",

  basicInfoSubtitle:
    "ಈ ವಿವರಗಳು ನಿಮ್ಮ ವೈದ್ಯರಿಗೆ ನಿಮ್ಮ ಕ್ಲಿನಿಕಲ್ ಪರಿಸ್ಥಿತಿಯನ್ನು ಅರ್ಥಮಾಡಿಕೊಳ್ಳಲು ಸಹಾಯ ಮಾಡುತ್ತವೆ.",

  fullName:
    "ಪೂರ್ಣ ಹೆಸರು",

  enterFullName:
    "ನಿಮ್ಮ ಪೂರ್ಣ ಹೆಸರನ್ನು ನಮೂದಿಸಿ",

  age:
    "ವಯಸ್ಸು",

  enterAge:
    "ನಿಮ್ಮ ವಯಸ್ಸನ್ನು ನಮೂದಿಸಿ",

  gender:
    "ಲಿಂಗ",

  selectGender:
    "ಲಿಂಗವನ್ನು ಆಯ್ಕೆಮಾಡಿ",

  male:
    "ಪುರುಷ",

  female:
    "ಮಹಿಳೆ",

  other:
    "ಇತರೆ",

  preferNotToSay:
    "ಹೇಳಲು ಇಷ್ಟವಿಲ್ಲ",

  mobileNumber:
    "ಮೊಬೈಲ್ ಸಂಖ್ಯೆ",

  enterMobileNumber:
    "ಮೊಬೈಲ್ ಸಂಖ್ಯೆಯನ್ನು ನಮೂದಿಸಿ",

  occupation:
    "ಉದ್ಯೋಗ",

  occupationPlaceholder:
    "ಉದಾ. ವಿದ್ಯಾರ್ಥಿ, ಶಿಕ್ಷಕ, ರೈತ",

  location:
    "ಸ್ಥಳ",

  cityDistrict:
    "ನಗರ / ಜಿಲ್ಲೆ",

  state:
    "ರಾಜ್ಯ",

  selectState:
    "ರಾಜ್ಯವನ್ನು ಆಯ್ಕೆಮಾಡಿ",
};

/* =========================================================
   MALAYALAM
========================================================= */

const ml: TranslationSet = {
  ...en,

  namaste:
    "നമസ്കാരം!",

  selectLanguage:
    "നിങ്ങളുടെ ഇഷ്ടഭാഷ തിരഞ്ഞെടുക്കുക",

  comfortableLanguage:
    "നിങ്ങൾക്ക് ഏറ്റവും സൗകര്യപ്രദമായ ഭാഷ തിരഞ്ഞെടുക്കുക",

  continue:
    "തുടരുക",

  back:
    "തിരികെ",

  help:
    "സഹായം",

  reset:
    "റീസെറ്റ്",

  selectedLanguage:
    "തിരഞ്ഞെടുത്ത ഭാഷ",

  interactionPreference:
    "സംവദിക്കുന്ന രീതി",

  howContinue:
    "നിങ്ങൾ എങ്ങനെ സംവദിക്കാൻ ആഗ്രഹിക്കുന്നു?",

  voiceToVoice:
    "ശബ്ദത്തിൽ നിന്ന് ശബ്ദത്തിലേക്ക്",

  voiceToText:
    "ശബ്ദത്തിൽ നിന്ന് ടെക്സ്റ്റിലേക്ക്",

  textToVoice:
    "ടെക്സ്റ്റിൽ നിന്ന് ശബ്ദത്തിലേക്ക്",

  textToText:
    "ടെക്സ്റ്റിൽ നിന്ന് ടെക്സ്റ്റിലേക്ക്",

  history:
    "മെഡിക്കൽ ചരിത്രം",

  yourResponse:
    "നിങ്ങളുടെ മറുപടി",

  listening:
    "കേൾക്കുന്നു...",

  speaking:
    "സംസാരിക്കുന്നു...",

  thankYou:
    "നന്ദി.",

  historyComplete:
    "ചരിത്രം പൂർത്തിയായി",

  beforeBegin:
    "ആരംഭിക്കുന്നതിന് മുമ്പ്",

  privacyMatters:
    "നിങ്ങളുടെ സ്വകാര്യത പ്രധാനമാണ്",

  whatHappens:
    "എന്ത് സംഭവിക്കും?",

  listenExplanation:
    "വിശദീകരണം കേൾക്കുക",

  optionalConsents:
    "ഓപ്ഷണൽ സമ്മതങ്ങൾ",

  voiceProcessing:
    "വോയ്സ് പ്രോസസ്സിംഗ്",

  voiceProcessingDescription:
    "നിങ്ങളുടെ സംസാരിച്ച ഉത്തരങ്ങൾ ക്ലിനിക്കൽ ഡോക്യുമെന്റേഷനായി ടെക്സ്റ്റാക്കി മാറ്റാം.",

  documentScanning:
    "മെഡിക്കൽ രേഖകൾ സ്കാൻ ചെയ്യൽ",

  documentScanningDescription:
    "മുമ്പത്തെ പ്രിസ്ക്രിപ്ഷനുകൾ, ലാബ് റിപ്പോർട്ടുകൾ, ഡിസ്ചാർജ് സംഗ്രഹങ്ങൾ, മറ്റ് മെഡിക്കൽ രേഖകൾ എന്നിവ സ്കാൻ ചെയ്യുക.",

  aiDocumentation:
    "AI സഹായത്തോടെയുള്ള ഡോക്യുമെന്റേഷൻ",

  aiDocumentationDescription:
    "നിങ്ങൾ നൽകുന്ന വിവരങ്ങളിൽ നിന്ന് AI ക്ലിനിക്കൽ സംഗ്രഹത്തിന്റെ കരട് തയ്യാറാക്കുന്നു. ഡോക്ടർ അത് പരിശോധിച്ച് സ്ഥിരീകരിക്കുന്നു.",

  abhaExchange:
    "ABHA / ആരോഗ്യ രേഖ കൈമാറ്റം",

  abhaExchangeDescription:
    "നിങ്ങളുടെ സമ്മതത്തോടെ ബന്ധപ്പെട്ട വിവരങ്ങൾ നിങ്ങളുടെ ABHA-യുമായി ബന്ധിപ്പിച്ച ആരോഗ്യ രേഖകളുമായി പങ്കിടാം.",

  aboutYou:
    "നിങ്ങളെക്കുറിച്ച്",

  tellAboutYourself:
    "നിങ്ങളെക്കുറിച്ച് കുറച്ച് പറയൂ.",

  basicInfoSubtitle:
    "നിങ്ങളുടെ ക്ലിനിക്കൽ പശ്ചാത്തലം മനസ്സിലാക്കാൻ ഈ വിവരങ്ങൾ ഡോക്ടറെ സഹായിക്കും.",

  fullName:
    "പൂർണ്ണ പേര്",

  enterFullName:
    "നിങ്ങളുടെ പൂർണ്ണ പേര് നൽകുക",

  age:
    "പ്രായം",

  enterAge:
    "നിങ്ങളുടെ പ്രായം നൽകുക",

  gender:
    "ലിംഗം",

  selectGender:
    "ലിംഗം തിരഞ്ഞെടുക്കുക",

  male:
    "പുരുഷൻ",

  female:
    "സ്ത്രീ",

  other:
    "മറ്റുള്ളവ",

  preferNotToSay:
    "പറയാൻ താൽപ്പര്യമില്ല",

  mobileNumber:
    "മൊബൈൽ നമ്പർ",

  enterMobileNumber:
    "മൊബൈൽ നമ്പർ നൽകുക",

  occupation:
    "തൊഴിൽ",

  occupationPlaceholder:
    "ഉദാ. വിദ്യാർത്ഥി, അധ്യാപകൻ, കർഷകൻ",

  location:
    "സ്ഥലം",

  cityDistrict:
    "നഗരം / ജില്ല",

  state:
    "സംസ്ഥാനം",

  selectState:
    "സംസ്ഥാനം തിരഞ്ഞെടുക്കുക",
};

/* =========================================================
   ODIA
========================================================= */

const or: TranslationSet = {
  ...en,

  namaste:
    "ନମସ୍କାର!",

  selectLanguage:
    "ଦୟାକରି ଆପଣଙ୍କ ପସନ୍ଦର ଭାଷା ବାଛନ୍ତୁ",

  comfortableLanguage:
    "ଆପଣ ଯେଉଁ ଭାଷାରେ ସବୁଠାରୁ ସହଜ ଅନୁଭବ କରନ୍ତି ତାହା ବାଛନ୍ତୁ",

  continue:
    "ଆଗକୁ ବଢ଼ନ୍ତୁ",

  back:
    "ପଛକୁ",

  help:
    "ସହାୟତା",

  reset:
    "ରିସେଟ",

  selectedLanguage:
    "ଚୟନ କରାଯାଇଥିବା ଭାଷା",

  interactionPreference:
    "ଯୋଗାଯୋଗ ପ୍ରଣାଳୀ",

  howContinue:
    "ଆପଣ କିପରି ଯୋଗାଯୋଗ କରିବାକୁ ଚାହାଁନ୍ତି?",

  voiceToVoice:
    "ସ୍ୱରରୁ ସ୍ୱର",

  voiceToText:
    "ସ୍ୱରରୁ ପାଠ୍ୟ",

  textToVoice:
    "ପାଠ୍ୟରୁ ସ୍ୱର",

  textToText:
    "ପାଠ୍ୟରୁ ପାଠ୍ୟ",

  history:
    "ଚିକିତ୍ସା ଇତିହାସ",

  yourResponse:
    "ଆପଣଙ୍କ ଉତ୍ତର",

  listening:
    "ଶୁଣୁଛି...",

  speaking:
    "କହୁଛି...",

  thankYou:
    "ଧନ୍ୟବାଦ।",

  historyComplete:
    "ଇତିହାସ ସମ୍ପୂର୍ଣ୍ଣ ହୋଇଛି",

  beforeBegin:
    "ଆରମ୍ଭ କରିବା ପୂର୍ବରୁ",

  privacyMatters:
    "ଆପଣଙ୍କ ଗୋପନୀୟତା ଗୁରୁତ୍ୱପୂର୍ଣ୍ଣ",

  whatHappens:
    "କ’ଣ ହେବ?",

  listenExplanation:
    "ବ୍ୟାଖ୍ୟା ଶୁଣନ୍ତୁ",

  optionalConsents:
    "ଇଚ୍ଛାଧୀନ ସମ୍ମତି",

  voiceProcessing:
    "ଭଏସ୍ ପ୍ରୋସେସିଂ",

  voiceProcessingDescription:
    "ଆପଣଙ୍କ କଥିତ ଉତ୍ତରଗୁଡ଼ିକୁ କ୍ଲିନିକାଲ୍ ଡକ୍ୟୁମେଣ୍ଟେସନ୍ ପାଇଁ ପାଠ୍ୟରେ ପରିଣତ କରାଯାଇପାରେ।",

  documentScanning:
    "ଚିକିତ୍ସା ଦଲିଲ୍ ସ୍କାନିଂ",

  documentScanningDescription:
    "ପୂର୍ବରୁ ଥିବା ପ୍ରେସକ୍ରିପ୍ସନ୍, ଲ୍ୟାବ୍ ରିପୋର୍ଟ, ଡିସଚାର୍ଜ ସାରାଂଶ ଏବଂ ଅନ୍ୟାନ୍ୟ ଚିକିତ୍ସା ଦଲିଲ୍ ସ୍କାନ୍ କରନ୍ତୁ।",

  aiDocumentation:
    "AI ସହାୟତାପ୍ରାପ୍ତ ଡକ୍ୟୁମେଣ୍ଟେସନ୍",

  aiDocumentationDescription:
    "ଆପଣ ଦେଇଥିବା ସୂଚନାରୁ AI କ୍ଲିନିକାଲ୍ ସାରାଂଶର ଏକ ଡ୍ରାଫ୍ଟ ପ୍ରସ୍ତୁତ କରେ। ଡାକ୍ତର ଏହାକୁ ସମୀକ୍ଷା କରି ନିଶ୍ଚିତ କରନ୍ତି।",

  abhaExchange:
    "ABHA / ସ୍ୱାସ୍ଥ୍ୟ ରେକର୍ଡ ବିନିମୟ",

  abhaExchangeDescription:
    "ଆପଣଙ୍କ ସମ୍ମତି ସହିତ ସମ୍ପୃକ୍ତ ସୂଚନା ଆପଣଙ୍କ ABHA ସହିତ ସଂଯୁକ୍ତ ସ୍ୱାସ୍ଥ୍ୟ ରେକର୍ଡ ସହିତ ଅଂଶୀଦାର କରାଯାଇପାରେ।",

  aboutYou:
    "ଆପଣଙ୍କ ବିଷୟରେ",

  tellAboutYourself:
    "ଆପଣଙ୍କ ବିଷୟରେ କିଛି କୁହନ୍ତୁ।",

  fullName:
    "ପୂର୍ଣ୍ଣ ନାମ",

  enterFullName:
    "ଆପଣଙ୍କ ପୂର୍ଣ୍ଣ ନାମ ଲେଖନ୍ତୁ",

  age:
    "ବୟସ",

  enterAge:
    "ଆପଣଙ୍କ ବୟସ ଲେଖନ୍ତୁ",

  gender:
    "ଲିଙ୍ଗ",

  selectGender:
    "ଲିଙ୍ଗ ବାଛନ୍ତୁ",

  male:
    "ପୁରୁଷ",

  female:
    "ମହିଳା",

  other:
    "ଅନ୍ୟ",

  preferNotToSay:
    "କହିବାକୁ ଚାହୁଁନାହିଁ",

  mobileNumber:
    "ମୋବାଇଲ୍ ନମ୍ବର",

  enterMobileNumber:
    "ମୋବାଇଲ୍ ନମ୍ବର ଲେଖନ୍ତୁ",

  occupation:
    "ବୃତ୍ତି",

  occupationPlaceholder:
    "ଯଥା. ଛାତ୍ର, ଶିକ୍ଷକ, କୃଷକ",

  location:
    "ସ୍ଥାନ",

  cityDistrict:
    "ସହର / ଜିଲ୍ଲା",

  state:
    "ରାଜ୍ୟ",

  selectState:
    "ରାଜ୍ୟ ବାଛନ୍ତୁ",
};

/* =========================================================
   ASSAMESE
========================================================= */

const as: TranslationSet = {
  ...en,

  namaste:
    "নমস্কাৰ!",

  selectLanguage:
    "অনুগ্ৰহ কৰি আপোনাৰ পছন্দৰ ভাষা বাছনি কৰক",

  comfortableLanguage:
    "আপুনি আটাইতকৈ সহজ অনুভৱ কৰা ভাষাটো বাছনি কৰক",

  continue:
    "আগবাঢ়ক",

  back:
    "পিছলৈ",

  help:
    "সহায়",

  reset:
    "ৰিছেট",

  selectedLanguage:
    "নিৰ্বাচিত ভাষা",

  interactionPreference:
    "যোগাযোগৰ পদ্ধতি",

  howContinue:
    "আপুনি কেনেকৈ যোগাযোগ কৰিব বিচাৰে?",

  voiceToVoice:
    "কণ্ঠৰ পৰা কণ্ঠলৈ",

  voiceToText:
    "কণ্ঠৰ পৰা পাঠ্যলৈ",

  textToVoice:
    "পাঠ্যৰ পৰা কণ্ঠলৈ",

  textToText:
    "পাঠ্যৰ পৰা পাঠ্যলৈ",

  history:
    "চিকিৎসা ইতিহাস",

  yourResponse:
    "আপোনাৰ উত্তৰ",

  listening:
    "শুনি আছোঁ...",

  speaking:
    "কথা কৈ আছে...",

  thankYou:
    "ধন্যবাদ।",

  historyComplete:
    "ইতিহাস সম্পূৰ্ণ হৈছে",

  beforeBegin:
    "আৰম্ভ কৰাৰ আগতে",

  privacyMatters:
    "আপোনাৰ গোপনীয়তা গুৰুত্বপূৰ্ণ",

  whatHappens:
    "কি হ'ব?",

  listenExplanation:
    "ব্যাখ্যা শুনক",

  optionalConsents:
    "ঐচ্ছিক সম্মতি",

  voiceProcessing:
    "ভইচ প্ৰচেছিং",

  voiceProcessingDescription:
    "আপোনাৰ কোৱা উত্তৰসমূহ ক্লিনিকেল নথিভুক্তিৰ বাবে পাঠ্যলৈ ৰূপান্তৰিত কৰিব পাৰি।",

  documentScanning:
    "চিকিৎসা নথি স্কেনিং",

  documentScanningDescription:
    "পূৰ্বৰ প্ৰেছক্ৰিপচন, লেব ৰিপ'ৰ্ট, ডিছচাৰ্জ সাৰাংশ আৰু অন্যান্য চিকিৎসা নথি স্কেন কৰক।",

  aiDocumentation:
    "AI-সহায়িত নথিভুক্তি",

  aiDocumentationDescription:
    "আপুনি দিয়া তথ্যৰ পৰা AI-এ ক্লিনিকেল সাৰাংশৰ খচৰা প্ৰস্তুত কৰে। চিকিৎসকে ইয়াক পৰ্যালোচনা আৰু নিশ্চিত কৰে।",

  abhaExchange:
    "ABHA / স্বাস্থ্য ৰেকৰ্ড বিনিময়",

  abhaExchangeDescription:
    "আপোনাৰ সন্মতিৰ সৈতে প্ৰাসংগিক তথ্য আপোনাৰ ABHA-সংযুক্ত স্বাস্থ্য ৰেকৰ্ডৰ সৈতে ভাগ-বতৰা কৰিব পাৰি।",

  aboutYou:
    "আপোনাৰ বিষয়ে",

  tellAboutYourself:
    "আপোনাৰ বিষয়ে অলপ কওক।",

  fullName:
    "সম্পূৰ্ণ নাম",

  enterFullName:
    "আপোনাৰ সম্পূৰ্ণ নাম লিখক",

  age:
    "বয়স",

  enterAge:
    "আপোনাৰ বয়স লিখক",

  gender:
    "লিংগ",

  selectGender:
    "লিংগ বাছনি কৰক",

  male:
    "পুৰুষ",

  female:
    "মহিলা",

  other:
    "অন্যান্য",

  preferNotToSay:
    "ক'ব নিবিচাৰোঁ",

  mobileNumber:
    "ম'বাইল নম্বৰ",

  enterMobileNumber:
    "ম'বাইল নম্বৰ লিখক",

  occupation:
    "বৃত্তি",

  occupationPlaceholder:
    "যেনে ছাত্ৰ, শিক্ষক, কৃষক",

  location:
    "স্থান",

  cityDistrict:
    "চহৰ / জিলা",

  state:
    "ৰাজ্য",

  selectState:
    "ৰাজ্য বাছনি কৰক",
};

/* =========================================================
   BODO
========================================================= */

const brx: TranslationSet = {
  ...en,

  namaste:
    "नमस्कार!",

  selectLanguage:
    "निजोर पसन्दनि रावखौ सायख'",

  continue:
    "सोलों",

  back:
    "उनथिं",

  help:
    "मदद",

  reset:
    "रिसेट",

  selectedLanguage:
    "सायख' जानाय राव",

  history:
    "चिकित्सा इतिहास",

  yourResponse:
    "नोंथांनि फिन",

  thankYou:
    "साबास।",

  beforeBegin:
    "दाम्बायाव",

  privacyMatters:
    "नोंथांनि गोपनीयता गोनां",

  whatHappens:
    "माबा जागोन?",

  listenExplanation:
    "बुजायनायखौ खोनासिन",

  aboutYou:
    "नोंथांनि सोमोन्दै",

  tellAboutYourself:
    "नोंथांनि सोमोन्दै फिसा बिबरन दि।",

  fullName:
    "आबुं मुं",

  age:
    "बयस",

  gender:
    "जेंडार",

  selectGender:
    "जेंडार सायख'",

  occupation:
    "जिबिका",

  location:
    "जायगा",
};

/* =========================================================
   DOGRI
========================================================= */

const doi: TranslationSet = {
  ...en,

  namaste:
    "नमस्कार!",

  selectLanguage:
    "कृपया अपनी पसंदीदा भाषा चुनो",

  comfortableLanguage:
    "जेहड़ी भाषा च तुस आराम महसूस करो ओह् चुनो",

  continue:
    "जारी रक्खो",

  back:
    "पिच्छे",

  help:
    "मदद",

  reset:
    "रीसेट",

  selectedLanguage:
    "चुनी गेई भाषा",

  interactionPreference:
    "गल्लबात दा तरीका",

  howContinue:
    "तुस कियां गल्लबात करना चाहंदे ओ?",

  voiceToVoice:
    "आवाज थमां आवाज",

  voiceToText:
    "आवाज थमां टेक्स्ट",

  textToVoice:
    "टेक्स्ट थमां आवाज",

  textToText:
    "टेक्स्ट थमां टेक्स्ट",

  history:
    "डाक्टरी इतिहास",

  yourResponse:
    "तुआढ़ा जवाब",

  listening:
    "सुनी रक्खा ऐ...",

  speaking:
    "बोली रक्खा ऐ...",

  thankYou:
    "धन्यवाद।",

  historyComplete:
    "इतिहास पूरा होई गेआ",

  beforeBegin:
    "शुरू करने शा पैह्लें",

  privacyMatters:
    "तुआढ़ी निजता जरूरी ऐ",

  whatHappens:
    "केह् होग?",

  listenExplanation:
    "समझाना सुन्नो",

  optionalConsents:
    "वैकल्पिक सहमतियां",

  aboutYou:
    "तुआढ़े बारे",

  tellAboutYourself:
    "अपने बारे थोह्ड़ा दस्सो।",

  fullName:
    "पूरा नांऽ",

  age:
    "उम्र",

  gender:
    "लिंग",

  selectGender:
    "लिंग चुनो",

  occupation:
    "कम",

  location:
    "जगह",
};

/* =========================================================
   KASHMIRI
========================================================= */

const ks: TranslationSet = {
  ...en,

  namaste:
    "آداب!",

  selectLanguage:
    "مہربانی کٔرِتھ پنُن پسندیدہ زبان ژارنِو",

  continue:
    "جاری تھاو",

  back:
    "پَتھ",

  help:
    "مدد",

  reset:
    "ری سیٹ",

  selectedLanguage:
    "ژارمژ زبان",

  history:
    "طبی تاریخ",

  yourResponse:
    "تُہند جواب",

  listening:
    "بوزان چھِ...",

  speaking:
    "باتھ کران چھِ...",

  thankYou:
    "شُکریہ۔",

  beforeBegin:
    "شروع کرنِس پٮ۪ٹھ",

  privacyMatters:
    "تُہنز رازداری اہم چھِ",

  whatHappens:
    "کیا گژھِ؟",

  listenExplanation:
    "وضاحت بوزیو",

  aboutYou:
    "تُہنز بارے",

  tellAboutYourself:
    "پنُن بارے کینٛہہ وُچھِو۔",

  fullName:
    "پورٕ ناو",

  age:
    "عمر",

  gender:
    "جنس",

  selectGender:
    "جنس ژارنِو",

  occupation:
    "پیشہ",

  location:
    "جگہ",
};

/* =========================================================
   KONKANI
========================================================= */

const kok: TranslationSet = {
  ...en,

  namaste:
    "नमस्कार!",

  selectLanguage:
    "कृपया तुमची पसंतीची भास निवडात",

  continue:
    "फुडे वचात",

  back:
    "फाटीं",

  help:
    "मजत",

  reset:
    "रीसेट",

  selectedLanguage:
    "निवडिल्ली भास",

  history:
    "वैजकी इतिहास",

  yourResponse:
    "तुमचें जाप",

  listening:
    "आयकतां...",

  speaking:
    "उलोयता...",

  thankYou:
    "देव बरे करूं।",

  beforeBegin:
    "सुरवात करचे पयलीं",

  privacyMatters:
    "तुमची खाजगी माहिती म्हत्वाची",

  whatHappens:
    "कितें जातलें?",

  listenExplanation:
    "स्पश्टीकरण आयकात",

  aboutYou:
    "तुमचे विशीं",

  tellAboutYourself:
    "तुमचे विशीं थोडें सांगात.",

  fullName:
    "पुराय नांव",

  age:
    "वय",

  gender:
    "लिंग",

  selectGender:
    "लिंग निवडात",

  occupation:
    "धंदो",

  location:
    "थाव",
};

/* =========================================================
   MAITHILI
========================================================= */

const mai: TranslationSet = {
  ...en,

  namaste:
    "नमस्कार!",

  selectLanguage:
    "कृपया अपन पसंदीदा भाषा चुनू",

  comfortableLanguage:
    "जे भाषा में अहाँ के सबसँ सहज लगैत अछि से चुनू",

  continue:
    "आगाँ बढ़ू",

  back:
    "पाछाँ",

  help:
    "मदद",

  reset:
    "रीसेट",

  selectedLanguage:
    "चुनल भाषा",

  interactionPreference:
    "बातचीत के तरीका",

  howContinue:
    "अहाँ कोना बातचीत करय चाहैत छी?",

  voiceToVoice:
    "आवाज सँ आवाज",

  voiceToText:
    "आवाज सँ टेक्स्ट",

  textToVoice:
    "टेक्स्ट सँ आवाज",

  textToText:
    "टेक्स्ट सँ टेक्स्ट",

  history:
    "चिकित्सा इतिहास",

  yourResponse:
    "अहाँक उत्तर",

  listening:
    "सुनि रहल छी...",

  speaking:
    "बोलि रहल छी...",

  thankYou:
    "धन्यवाद।",

  historyComplete:
    "इतिहास पूरा भेल",

  beforeBegin:
    "शुरू करबाक पहिने",

  privacyMatters:
    "अहाँक निजता महत्वपूर्ण अछि",

  whatHappens:
    "की होयत?",

  listenExplanation:
    "व्याख्या सुनू",

  optionalConsents:
    "वैकल्पिक सहमति",

  aboutYou:
    "अहाँक बारे में",

  tellAboutYourself:
    "अपन बारे में किछु बताउ।",

  fullName:
    "पूरा नाम",

  age:
    "उम्र",

  gender:
    "लिंग",

  selectGender:
    "लिंग चुनू",

  occupation:
    "पेशा",

  location:
    "स्थान",
};

/* =========================================================
   MANIPURI
========================================================= */

const mni: TranslationSet = {
  ...en,

  namaste:
    "নমস্কার!",

  selectLanguage:
    "নখোয়গী পামজবা লোইশিং খনবিয়ু",

  continue:
    "মখা চলহৌ",

  back:
    "মতাংদা",

  help:
    "মতেং",

  reset:
    "রিসেট",

  selectedLanguage:
    "খনবা লোইশিং",

  history:
    "চিকিৎসা ইতিহাস",

  yourResponse:
    "নখোয়গী ফংবা",

  listening:
    "তারি...",

  speaking:
    "হায়রি...",

  thankYou:
    "থাগৎচরি।",

  beforeBegin:
    "হৌজিক হৌনবা মমাংদা",

  privacyMatters:
    "নখোয়গী প্রাইভেসি মহত্ত্বা",

  whatHappens:
    "করিগুম্বা থোক্কনি?",

  listenExplanation:
    "শিংজিনবা তারো",

  aboutYou:
    "নখোয়গী মরমদা",

  tellAboutYourself:
    "নখোয়গী মরমদা ফিসা শিংজিন থোকপা হায়বিয়ু।",

  fullName:
    "অচৌবা মিং",

  age:
    "চহি",

  gender:
    "লিঙ্গ",

  selectGender:
    "লিঙ্গ খনবিয়ু",

  occupation:
    "পাম্বা থবক",

  location:
    "ফংফম",
};

/* =========================================================
   NEPALI
========================================================= */

const ne: TranslationSet = {
  ...en,

  namaste:
    "नमस्ते!",

  selectLanguage:
    "कृपया आफ्नो मनपर्ने भाषा छान्नुहोस्",

  comfortableLanguage:
    "तपाईंलाई सबैभन्दा सहज लाग्ने भाषा छान्नुहोस्",

  continue:
    "जारी राख्नुहोस्",

  back:
    "पछाडि",

  help:
    "सहायता",

  reset:
    "रिसेट",

  selectedLanguage:
    "छानिएको भाषा",

  interactionPreference:
    "कुराकानीको तरिका",

  howContinue:
    "तपाईं कसरी कुराकानी गर्न चाहनुहुन्छ?",

  voiceToVoice:
    "आवाजबाट आवाज",

  voiceToText:
    "आवाजबाट पाठ",

  textToVoice:
    "पाठबाट आवाज",

  textToText:
    "पाठबाट पाठ",

  history:
    "चिकित्सा इतिहास",

  yourResponse:
    "तपाईंको उत्तर",

  listening:
    "सुन्दै...",

  speaking:
    "बोल्दै...",

  thankYou:
    "धन्यवाद।",

  historyComplete:
    "इतिहास पूरा भयो",

  beforeBegin:
    "सुरु गर्नुअघि",

  privacyMatters:
    "तपाईंको गोपनीयता महत्त्वपूर्ण छ",

  whatHappens:
    "के हुनेछ?",

  listenExplanation:
    "व्याख्या सुन्नुहोस्",

  optionalConsents:
    "वैकल्पिक सहमतिहरू",

  aboutYou:
    "तपाईंको बारेमा",

  tellAboutYourself:
    "आफ्नो बारेमा केही बताउनुहोस्।",

  fullName:
    "पूरा नाम",

  age:
    "उमेर",

  gender:
    "लिङ्ग",

  selectGender:
    "लिङ्ग छान्नुहोस्",

  occupation:
    "पेशा",

  location:
    "स्थान",
};

/* =========================================================
   SANSKRIT
========================================================= */

const sa: TranslationSet = {
  ...en,

  namaste:
    "नमस्ते!",

  selectLanguage:
    "स्वस्य प्रियं भाषां चिनुत",

  continue:
    "अनुवर्तयतु",

  back:
    "पृष्ठतः",

  help:
    "सहायता",

  reset:
    "पुनःस्थापनम्",

  selectedLanguage:
    "चयनिता भाषा",

  history:
    "चिकित्सकीय इतिहासः",

  yourResponse:
    "भवतः उत्तरम्",

  listening:
    "शृणोति...",

  speaking:
    "वदति...",

  thankYou:
    "धन्यवादः।",

  historyComplete:
    "इतिहासः पूर्णः",

  beforeBegin:
    "आरम्भात् पूर्वम्",

  privacyMatters:
    "भवतः गोपनीयता महत्त्वपूर्णा अस्ति",

  whatHappens:
    "किं भविष्यति?",

  listenExplanation:
    "व्याख्यां शृणुत",

  optionalConsents:
    "वैकल्पिकाः अनुमतयः",

  aboutYou:
    "भवतः विषये",

  tellAboutYourself:
    "भवतः विषये किञ्चित् कथयतु।",

  fullName:
    "पूर्णं नाम",

  age:
    "वयः",

  gender:
    "लिङ्गम्",

  selectGender:
    "लिङ्गं चिनुत",

  occupation:
    "व्यवसायः",

  location:
    "स्थानम्",
};

/* =========================================================
   SANTALI
========================================================= */

const sat: TranslationSet = {
  ...en,

  namaste:
    "ᱡᱚᱦᱟᱨ!",

  selectLanguage:
    "ᱟᱢᱟᱜ ᱯᱟᱥᱟᱹᱱᱫ ᱠᱟᱹᱱᱤ ᱯᱟᱹᱥᱤ ᱵᱟᱹᱪᱷᱟᱹ",

  continue:
    "ᱞᱟᱦᱟ ᱥᱮᱫ",

  back:
    "ᱛᱟᱹᱞᱟ",

  help:
    "ᱜᱚᱲᱚ",

  reset:
    "ᱨᱤᱥᱮᱴ",

  selectedLanguage:
    "ᱵᱟᱹᱪᱷᱟᱹ ᱯᱟᱹᱥᱤ",

  history:
    "ᱪᱤᱠᱤᱛᱥᱟ ᱦᱤᱥᱴᱚᱨᱤ",

  yourResponse:
    "ᱟᱢᱟᱜ ᱡᱚᱵᱟᱵ",

  listening:
    "ᱟᱭᱚᱢ...",

  speaking:
    "ᱵᱟᱛ ᱠᱟᱛᱮ...",

  thankYou:
    "ᱥᱟᱨᱦᱟᱣ।",

  beforeBegin:
    "ᱮᱦᱚᱵ ᱠᱟᱛᱮ ᱢᱟᱹᱲᱟᱹᱝ",

  privacyMatters:
    "ᱟᱢᱟᱜ ᱜᱚᱯᱚᱱᱤᱭᱟ ᱢᱟᱹᱦᱟᱹᱱ",

  whatHappens:
    "ᱪᱮᱫ ᱦᱩᱭᱩᱜ?",

  listenExplanation:
    "ᱵᱟᱭᱟᱠᱷᱭᱟ ᱟᱭᱚᱢ",

  aboutYou:
    "ᱟᱢᱟᱜ ᱵᱟᱵᱚᱛᱮ",

  tellAboutYourself:
    "ᱟᱢᱟᱜ ᱵᱟᱵᱚᱛᱮ ᱛᱤᱱᱟᱹᱜ ᱵᱟᱹᱛ ᱢᱮ।",

  fullName:
    "ᱯᱩᱨᱟᱹ ᱧᱩᱛᱩᱢ",

  age:
    "ᱦᱟᱹᱴ",

  gender:
    "ᱞᱤᱝᱜ",

  selectGender:
    "ᱞᱤᱝᱜ ᱵᱟᱹᱪᱷᱟᱣ",

  occupation:
    "ᱠᱟᱹᱢ",

  location:
    "ᱴᱷᱟᱹᱣ",
};

/* =========================================================
   SINDHI
========================================================= */

const sd: TranslationSet = {
  ...en,

  namaste:
    "سلام!",

  selectLanguage:
    "مهرباني ڪري پنهنجي پسند جي ٻولي چونڊيو",

  comfortableLanguage:
    "اها ٻولي چونڊيو جنهن ۾ توهان سڀ کان وڌيڪ آرامده محسوس ڪريو",

  continue:
    "جاري رکو",

  back:
    "پوئتي",

  help:
    "مدد",

  reset:
    "ري سيٽ",

  selectedLanguage:
    "چونڊيل ٻولي",

  interactionPreference:
    "ڳالهائڻ جو طريقو",

  howContinue:
    "توهان ڪيئن ڳالهائڻ چاهيو ٿا؟",

  voiceToVoice:
    "آواز کان آواز",

  voiceToText:
    "آواز کان متن",

  textToVoice:
    "متن کان آواز",

  textToText:
    "متن کان متن",

  history:
    "طبي تاريخ",

  yourResponse:
    "توهان جو جواب",

  listening:
    "ٻڌي رهيو آهي...",

  speaking:
    "ڳالهائي رهيو آهي...",

  thankYou:
    "مهرباني.",

  historyComplete:
    "تاريخ مڪمل ٿي وئي",

  beforeBegin:
    "شروع ڪرڻ کان اڳ",

  privacyMatters:
    "توهان جي رازداري اهم آهي",

  whatHappens:
    "ڇا ٿيندو؟",

  listenExplanation:
    "وضاحت ٻڌو",

  optionalConsents:
    "اختياري رضامنديون",

  aboutYou:
    "توهان بابت",

  tellAboutYourself:
    "پنهنجي باري ۾ ٿورو ٻڌايو.",

  fullName:
    "پورو نالو",

  age:
    "عمر",

  gender:
    "جنس",

  selectGender:
    "جنس چونڊيو",

  occupation:
    "پيشو",

  location:
    "جڳهه",
};

/* =========================================================
   URDU
========================================================= */

const ur: TranslationSet = {
  ...en,

  namaste:
    "نمستے!",

  selectLanguage:
    "براہ کرم اپنی پسندیدہ زبان منتخب کریں",

  comfortableLanguage:
    "وہ زبان منتخب کریں جس میں آپ سب سے زیادہ آرام دہ محسوس کرتے ہیں",

  continue:
    "جاری رکھیں",

  back:
    "واپس",

  help:
    "مدد",

  reset:
    "ری سیٹ",

  selectedLanguage:
    "منتخب زبان",

  interactionPreference:
    "بات چیت کا طریقہ",

  howContinue:
    "آپ کس طرح بات چیت کرنا چاہتے ہیں؟",

  voiceToVoice:
    "آواز سے آواز",

  voiceToText:
    "آواز سے متن",

  textToVoice:
    "متن سے آواز",

  textToText:
    "متن سے متن",

  recommended:
    "تجویز کردہ",

  speakNaturally:
    "قدرتی طور پر بولیں",

  readText:
    "متن پڑھیں",

  tapAndListen:
    "ٹیپ کریں اور سنیں",

  tapAndRead:
    "ٹیپ کریں اور پڑھیں",

  history:
    "طبی تاریخ",

  yourResponse:
    "آپ کا جواب",

  listening:
    "سن رہا ہے...",

  speaking:
    "بول رہا ہے...",

  thankYou:
    "شکریہ۔",

  historyComplete:
    "تاریخ مکمل ہو گئی",

  beforeBegin:
    "شروع کرنے سے پہلے",

  privacyMatters:
    "آپ کی رازداری اہم ہے",

  privacySubtitle:
    "اس سیشن کے دوران آپ کی فراہم کردہ معلومات کو MediKiosk کس طرح استعمال کرے گا، براہ کرم سنیں یا پڑھیں۔",

  whatHappens:
    "کیا ہوگا؟",

  listenExplanation:
    "وضاحت سنیں",

  primaryConsent:
    "بنیادی طبی مشاورت کی رضامندی",

  primaryConsentText:
    "میں طبی مشاورت کے مقصد کے لیے اپنی صحت کی تاریخ فراہم کرنے پر رضامند ہوں۔ میں سمجھتا/سمجھتی ہوں کہ یہ معلومات میرے معالج کے ساتھ شیئر کی جائیں گی اور ABDM / DISHA رہنما اصولوں کے مطابق محفوظ طریقے سے رکھی جائیں گی۔",

  optionalConsents:
    "اختیاری رضامندیاں",

  voiceProcessing:
    "وائس پروسیسنگ",

  voiceProcessingDescription:
    "آپ کے بولے گئے جوابات کو طبی دستاویزات کے لیے متن میں تبدیل کیا جا سکتا ہے۔",

  documentScanning:
    "طبی دستاویزات کی اسکیننگ",

  documentScanningDescription:
    "پچھلے نسخے، لیب رپورٹس، ڈسچارج خلاصے اور دیگر طبی دستاویزات اسکین کریں۔",

  aiDocumentation:
    "AI معاون دستاویزات",

  aiDocumentationDescription:
    "آپ کی فراہم کردہ معلومات سے AI طبی خلاصے کا مسودہ تیار کرتا ہے۔ ڈاکٹر اس کا جائزہ لے کر تصدیق کرتا ہے۔",

  abhaExchange:
    "ABHA / ہیلتھ ریکارڈ ایکسچینج",

  abhaExchangeDescription:
    "آپ کی رضامندی سے متعلقہ معلومات آپ کے ABHA سے منسلک صحت کے ریکارڈ کے ساتھ شیئر کی جا سکتی ہیں۔",

  aboutYou:
    "آپ کے بارے میں",

  tellAboutYourself:
    "اپنے بارے میں کچھ بتائیں۔",

  basicInfoSubtitle:
    "یہ معلومات آپ کے معالج کو آپ کے طبی پس منظر کو سمجھنے میں مدد کرتی ہیں۔",

  fullName:
    "پورا نام",

  enterFullName:
    "اپنا پورا نام درج کریں",

  age:
    "عمر",

  enterAge:
    "اپنی عمر درج کریں",

  gender:
    "صنف",

  selectGender:
    "صنف منتخب کریں",

  male:
    "مرد",

  female:
    "خاتون",

  other:
    "دیگر",

  preferNotToSay:
    "بتانا پسند نہیں",

  mobileNumber:
    "موبائل نمبر",

  enterMobileNumber:
    "موبائل نمبر درج کریں",

  occupation:
    "پیشہ",

  occupationPlaceholder:
    "مثلاً طالب علم، استاد، کسان",

  location:
    "مقام",

  cityDistrict:
    "شہر / ضلع",

  state:
    "ریاست",

  selectState:
    "ریاست منتخب کریں",
};

/* =========================================================
   ALL SUPPORTED LANGUAGES
========================================================= */

export const translations: Record<
  PatientLanguage,
  TranslationSet
> = {
  en,
  hi,
  mr,
  bn,
  gu,
  pa,
  ta,
  te,
  kn,
  ml,
  or,
  as,
  brx,
  doi,
  ks,
  kok,
  mai,
  mni,
  ne,
  sa,
  sat,
  sd,
  ur,
};

/* =========================================================
   TRANSLATION FUNCTION
========================================================= */

/**
 * Returns the translation for the selected language.
 *
 * Fallback order:
 *
 * 1. Selected language
 * 2. English
 * 3. Translation key itself
 */
export function t(
  language: PatientLanguage,
  key: TranslationKey
): string {
  return (
    translations[language]?.[key] ??
    translations.en[key] ??
    key
  );
}

/* =========================================================
   BACKWARD COMPATIBILITY
========================================================= */

/**
 * Some existing components may import `translate`
 * instead of `t`.
 */
export const translate = t;