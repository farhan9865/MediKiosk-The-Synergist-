import {
  ArrowLeft,
  ArrowRight,
  Check,
  Fingerprint,
  UserRound,
  UserRoundPlus,
  CreditCard,
  CircleHelp,
} from "lucide-react";

import { useNavigate } from "react-router-dom";
import { useState } from "react";

import KioskLayout from "../../components/common/KioskLayout";
import ProgressBar from "../../components/common/ProgressBar";

import { usePatientStore } from "../../store/patientStore";

import {
  speakText,
} from "../../services/speech/speech";


/* ========================================================================= */
/* TYPES                                                                     */
/* ========================================================================= */

type PatientType =
  | "existing"
  | "abha"
  | "new"
  | "aadhaar";


type PageCopy = {
  identifyPatient: string;
  selectOptionToContinue: string;

  existingPatient: string;
  useHospitalId: string;

  abhaId: string;
  useAbhaHealthId: string;

  newPatient: string;
  registerNewPatient: string;

  aadhaarCard: string;
  optional: string;

  hospitalUhid: string;
  enterUhid: string;
  hospitalIdPreviousVisits: string;

  enterAbhaId: string;
  abhaLinkExplanation: string;

  aadhaarNumber: string;
  enterAadhaar: string;
  aadhaarOptionalExplanation: string;

  welcomeToMediKiosk: string;
  newPatientRegistrationExplanation: string;

  whyCollectThis: string;
  forClinicalConsultation: string;
  secureAndConfidential: string;
  yourControlYourConsent: string;
  usedOnlyWithPermission: string;

  back: string;
  help: string;
  continue: string;

  ayurvedaClinicalHistory: string;
};


/* ========================================================================= */
/* TRANSLATIONS                                                              */
/* ========================================================================= */
/*
 * The selected language from the Language page is used as the key.
 *
 * Supported:
 *
 * English
 * Hindi
 * Marathi
 * Konkani
 * Sanskrit
 * Sindhi
 * Assamese
 * Bengali
 * Bodo
 * Dogri
 * Gujarati
 * Kannada
 * Kashmiri
 * Maithili
 * Malayalam
 * Manipuri
 * Nepali
 * Odia
 * Punjabi
 * Santali
 * Tamil
 * Telugu
 * Urdu
 *
 * English is also used for the option voice.
 */


/* ------------------------------------------------------------------------- */
/* ENGLISH                                                                   */
/* ------------------------------------------------------------------------- */

const pageTranslations: Record<string, PageCopy> = {

  en: {
    identifyPatient: "Identify Patient",
    selectOptionToContinue: "Select an option to continue",

    existingPatient: "Existing Patient",
    useHospitalId: "Use Hospital ID",

    abhaId: "ABHA ID",
    useAbhaHealthId: "Use ABHA Health ID",

    newPatient: "New Patient",
    registerNewPatient: "Register as New Patient",

    aadhaarCard: "Aadhaar Card",
    optional: "Optional",

    hospitalUhid: "Hospital UHID",
    enterUhid: "Enter your Hospital UHID",
    hospitalIdPreviousVisits:
      "Use your Hospital ID if you have visited this hospital before.",

    enterAbhaId: "Enter your ABHA ID",
    abhaLinkExplanation:
      "Your ABHA ID can be used to securely link your health records.",

    aadhaarNumber: "Aadhaar Number",
    enterAadhaar: "Enter your Aadhaar Number",
    aadhaarOptionalExplanation:
      "Aadhaar is optional and may be used for patient identification.",

    welcomeToMediKiosk: "Welcome to MediKiosk",
    newPatientRegistrationExplanation:
      "You can continue as a new patient. We will collect the information needed for your clinical history.",

    whyCollectThis: "Why do we collect this information?",
    forClinicalConsultation:
      "For clinical consultation",
    secureAndConfidential:
      "Secure and confidential",
    yourControlYourConsent:
      "Your control, your consent",
    usedOnlyWithPermission:
      "Used only with permission",

    back: "Back",
    help: "Help",
    continue: "Continue",

    ayurvedaClinicalHistory:
      "AI-Powered Ayurveda Clinical History Platform",
  },


  /* ----------------------------------------------------------------------- */
  /* HINDI                                                                    */
  /* ----------------------------------------------------------------------- */

  hi: {
    identifyPatient: "रोगी की पहचान करें",
    selectOptionToContinue: "जारी रखने के लिए एक विकल्प चुनें",

    existingPatient: "मौजूदा रोगी",
    useHospitalId: "अस्पताल आईडी का उपयोग करें",

    abhaId: "आभा आईडी",
    useAbhaHealthId: "आभा हेल्थ आईडी का उपयोग करें",

    newPatient: "नया रोगी",
    registerNewPatient: "नए रोगी के रूप में पंजीकरण करें",

    aadhaarCard: "आधार कार्ड",
    optional: "वैकल्पिक",

    hospitalUhid: "अस्पताल UHID",
    enterUhid: "अपना अस्पताल UHID दर्ज करें",
    hospitalIdPreviousVisits:
      "यदि आप पहले इस अस्पताल में आ चुके हैं तो अपनी अस्पताल आईडी का उपयोग करें।",

    enterAbhaId: "अपनी आभा आईडी दर्ज करें",
    abhaLinkExplanation:
      "आपकी आभा आईडी का उपयोग आपके स्वास्थ्य रिकॉर्ड को सुरक्षित रूप से जोड़ने के लिए किया जा सकता है।",

    aadhaarNumber: "आधार नंबर",
    enterAadhaar: "अपना आधार नंबर दर्ज करें",
    aadhaarOptionalExplanation:
      "आधार वैकल्पिक है और रोगी की पहचान के लिए उपयोग किया जा सकता है।",

    welcomeToMediKiosk: "MediKiosk में आपका स्वागत है",
    newPatientRegistrationExplanation:
      "आप नए रोगी के रूप में आगे बढ़ सकते हैं। हम आपकी चिकित्सीय जानकारी के लिए आवश्यक जानकारी एकत्र करेंगे।",

    whyCollectThis: "हम यह जानकारी क्यों एकत्र करते हैं?",
    forClinicalConsultation:
      "चिकित्सीय परामर्श के लिए",
    secureAndConfidential:
      "सुरक्षित और गोपनीय",
    yourControlYourConsent:
      "आपका नियंत्रण, आपकी सहमति",
    usedOnlyWithPermission:
      "केवल आपकी अनुमति से उपयोग किया जाता है",

    back: "वापस",
    help: "सहायता",
    continue: "जारी रखें",

    ayurvedaClinicalHistory:
      "एआई-संचालित आयुर्वेदिक क्लिनिकल हिस्ट्री प्लेटफ़ॉर्म",
  },


  /* ----------------------------------------------------------------------- */
  /* MARATHI                                                                  */
  /* ----------------------------------------------------------------------- */

  mr: {
    identifyPatient: "रुग्णाची ओळख",
    selectOptionToContinue: "पुढे जाण्यासाठी एक पर्याय निवडा",

    existingPatient: "विद्यमान रुग्ण",
    useHospitalId: "हॉस्पिटल आयडी वापरा",

    abhaId: "आभा आयडी",
    useAbhaHealthId: "आभा हेल्थ आयडी वापरा",

    newPatient: "नवीन रुग्ण",
    registerNewPatient: "नवीन रुग्ण म्हणून नोंदणी करा",

    aadhaarCard: "आधार कार्ड",
    optional: "ऐच्छिक",

    hospitalUhid: "हॉस्पिटल UHID",
    enterUhid: "तुमचा हॉस्पिटल UHID प्रविष्ट करा",
    hospitalIdPreviousVisits:
      "तुम्ही यापूर्वी या हॉस्पिटलमध्ये आला असल्यास तुमचा हॉस्पिटल आयडी वापरा.",

    enterAbhaId: "तुमचा आभा आयडी प्रविष्ट करा",
    abhaLinkExplanation:
      "तुमचा आभा आयडी तुमचे आरोग्य रेकॉर्ड सुरक्षितपणे जोडण्यासाठी वापरला जाऊ शकतो.",

    aadhaarNumber: "आधार क्रमांक",
    enterAadhaar: "तुमचा आधार क्रमांक प्रविष्ट करा",
    aadhaarOptionalExplanation:
      "आधार ऐच्छिक आहे आणि रुग्णाची ओळख पटवण्यासाठी वापरला जाऊ शकतो.",

    welcomeToMediKiosk: "MediKiosk मध्ये आपले स्वागत आहे",
    newPatientRegistrationExplanation:
      "तुम्ही नवीन रुग्ण म्हणून पुढे जाऊ शकता. तुमच्या क्लिनिकल इतिहासासाठी आवश्यक माहिती आम्ही गोळा करू.",

    whyCollectThis: "आम्ही ही माहिती का गोळा करतो?",
    forClinicalConsultation:
      "क्लिनिकल सल्लामसलतीसाठी",
    secureAndConfidential:
      "सुरक्षित आणि गोपनीय",
    yourControlYourConsent:
      "तुमचे नियंत्रण, तुमची संमती",
    usedOnlyWithPermission:
      "फक्त तुमच्या परवानगीने वापरले जाते",

    back: "मागे",
    help: "मदत",
    continue: "पुढे चला",

    ayurvedaClinicalHistory:
      "एआय-संचालित आयुर्वेदिक क्लिनिकल हिस्ट्री प्लॅटफॉर्म",
  },


  /* ----------------------------------------------------------------------- */
  /* KONKANI                                                                  */
  /* ----------------------------------------------------------------------- */

  kok: {
    identifyPatient: "रुग्णाची वळख",
    selectOptionToContinue: "फुडें वचपाक एक पर्याय निवडात",

    existingPatient: "आसा रुग्ण",
    useHospitalId: "हॉस्पिटल आयडी वापरात",

    abhaId: "आभा आयडी",
    useAbhaHealthId: "आभा हेल्थ आयडी वापरात",

    newPatient: "नवो रुग्ण",
    registerNewPatient: "नव्या रुग्णा प्रमाणे नोंदणी करात",

    aadhaarCard: "आधार कार्ड",
    optional: "ऐच्छिक",

    hospitalUhid: "हॉस्पिटल UHID",
    enterUhid: "तुमचो हॉस्पिटल UHID दियात",
    hospitalIdPreviousVisits:
      "तुमी पयलीं ह्या हॉस्पिटलांत आयला आसात जाल्यार हॉस्पिटल आयडी वापरात.",

    enterAbhaId: "तुमचो आभा आयडी दियात",
    abhaLinkExplanation:
      "तुमचो आभा आयडी आरोग्य नोंदी सुरक्षितपणान जोडपाक वापरू येता.",

    aadhaarNumber: "आधार क्रमांक",
    enterAadhaar: "तुमचो आधार क्रमांक दियात",
    aadhaarOptionalExplanation:
      "आधार ऐच्छिक आसा आनी रुग्णाची वळख करपाक वापरू येता.",

    welcomeToMediKiosk: "MediKioskांत तुमचें स्वागत",
    newPatientRegistrationExplanation:
      "तुमी नव्या रुग्णा प्रमाणे फुडें वचूंक शकतात. तुमच्या क्लिनिकल इतिहासाखातीर गरजेची म्हायती घेतली वतली.",

    whyCollectThis: "आमी ही म्हायती कित्याक घेतात?",
    forClinicalConsultation:
      "क्लिनिकल सल्ल्याक लागीं",
    secureAndConfidential:
      "सुरक्षित आनी गोपनीय",
    yourControlYourConsent:
      "तुमचें नियंत्रण, तुमची संमती",
    usedOnlyWithPermission:
      "फकत तुमच्या परवानगीन वापरतात",

    back: "फाटीं",
    help: "मदत",
    continue: "फुडें",

    ayurvedaClinicalHistory:
      "एआय-आधारित आयुर्वेदिक क्लिनिकल हिस्ट्री प्लॅटफॉर्म",
  },


  /* ----------------------------------------------------------------------- */
  /* SANSKRIT                                                                 */
  /* ----------------------------------------------------------------------- */

  sa: {
    identifyPatient: "रुग्णस्य परिचयं कुर्वन्तु",
    selectOptionToContinue: "अग्रे गन्तुं विकल्पं चिनुत",

    existingPatient: "विद्यमानः रुग्णः",
    useHospitalId: "चिकित्सालयस्य परिचयपत्रं प्रयुङ्क्ताम्",

    abhaId: "आभा परिचयः",
    useAbhaHealthId: "आभा स्वास्थ्यपरिचयं प्रयुङ्क्ताम्",

    newPatient: "नूतनः रुग्णः",
    registerNewPatient: "नूतनरुग्णरूपेण पञ्जीकरणं कुरुत",

    aadhaarCard: "आधारपत्रम्",
    optional: "वैकल्पिकम्",

    hospitalUhid: "चिकित्सालय UHID",
    enterUhid: "चिकित्सालयस्य UHID लिखतु",
    hospitalIdPreviousVisits:
      "यदि पूर्वं अस्मिन् चिकित्सालये आगतवान् असि तर्हि चिकित्सालयस्य परिचयपत्रं प्रयुङ्क्ताम्।",

    enterAbhaId: "आभा परिचयं लिखतु",
    abhaLinkExplanation:
      "आभा परिचयस्य उपयोगेन स्वास्थ्यविवरणं सुरक्षितरूपेण संयोजयितुं शक्यते।",

    aadhaarNumber: "आधार क्रमाङ्कः",
    enterAadhaar: "आधार क्रमाङ्कं लिखतु",
    aadhaarOptionalExplanation:
      "आधारः वैकल्पिकः अस्ति तथा रुग्णस्य परिचयाय उपयोक्तुं शक्यते।",

    welcomeToMediKiosk: "MediKiosk मध्ये स्वागतम्",
    newPatientRegistrationExplanation:
      "नूतनरुग्णरूपेण अग्रे गन्तुं शक्नोषि। चिकित्सकीय इतिहासाय आवश्यकं विवरणं सङ्गृहीष्यामः।",

    whyCollectThis: "वयं इदं विवरणं किमर्थं सङ्गृह्णीमः?",
    forClinicalConsultation:
      "चिकित्सकीय परामर्शाय",
    secureAndConfidential:
      "सुरक्षितं गोपनीयं च",
    yourControlYourConsent:
      "तव नियन्त्रणं, तव सम्मतिः",
    usedOnlyWithPermission:
      "केवलं तव अनुमत्या प्रयुज्यते",

    back: "पृष्ठतः",
    help: "सहायता",
    continue: "अग्रे गच्छतु",

    ayurvedaClinicalHistory:
      "कृत्रिमबुद्धि-आधारित आयुर्वेदिक चिकित्सकीय इतिहास मंच",
  },


  /* ----------------------------------------------------------------------- */
  /* SINDHI                                                                   */
  /* ----------------------------------------------------------------------- */

  sd: {
    identifyPatient: "مريض جي سڃاڻپ",
    selectOptionToContinue: "جاري رکڻ لاءِ هڪ اختيار چونڊيو",

    existingPatient: "موجوده مريض",
    useHospitalId: "اسپتال آءِ ڊي استعمال ڪريو",

    abhaId: "آڀا آءِ ڊي",
    useAbhaHealthId: "آڀا هيلٿ آءِ ڊي استعمال ڪريو",

    newPatient: "نئون مريض",
    registerNewPatient: "نئين مريض طور رجسٽر ٿيو",

    aadhaarCard: "آدھار ڪارڊ",
    optional: "اختياري",

    hospitalUhid: "اسپتال UHID",
    enterUhid: "پنهنجو اسپتال UHID داخل ڪريو",
    hospitalIdPreviousVisits:
      "جيڪڏهن توهان اڳ ۾ هن اسپتال ۾ آيا آهيو ته پنهنجي اسپتال آءِ ڊي استعمال ڪريو.",

    enterAbhaId: "پنهنجي آڀا آءِ ڊي داخل ڪريو",
    abhaLinkExplanation:
      "توهان جي آڀا آءِ ڊي صحت جي رڪارڊ کي محفوظ طريقي سان ڳنڍڻ لاءِ استعمال ٿي سگهي ٿي.",

    aadhaarNumber: "آدھار نمبر",
    enterAadhaar: "پنهنجو آدھار نمبر داخل ڪريو",
    aadhaarOptionalExplanation:
      "آدھار اختياري آهي ۽ مريض جي سڃاڻپ لاءِ استعمال ٿي سگهي ٿو.",

    welcomeToMediKiosk: "MediKiosk ۾ ڀليڪار",
    newPatientRegistrationExplanation:
      "توهان نئين مريض طور اڳتي وڌي سگهو ٿا. توهان جي ڪلينڪل تاريخ لاءِ ضروري معلومات گڏ ڪئي ويندي.",

    whyCollectThis: "اسان هي معلومات ڇو گڏ ڪريون ٿا؟",
    forClinicalConsultation:
      "طبي صلاح لاءِ",
    secureAndConfidential:
      "محفوظ ۽ رازداري سان",
    yourControlYourConsent:
      "توهان جو ڪنٽرول، توهان جي رضامندي",
    usedOnlyWithPermission:
      "صرف توهان جي اجازت سان استعمال ڪئي ويندي",

    back: "واپس",
    help: "مدد",
    continue: "جاري رکو",

    ayurvedaClinicalHistory:
      "AI تي ٻڌل آيورويدڪ ڪلينڪل هسٽري پليٽ فارم",
  },


  /* ----------------------------------------------------------------------- */
  /* ASSAMESE                                                                 */
  /* ----------------------------------------------------------------------- */

  as: {
    identifyPatient: "ৰোগীৰ পৰিচয়",
    selectOptionToContinue: "আগবাঢ়িবলৈ এটা বিকল্প বাছনি কৰক",

    existingPatient: "বৰ্তমানৰ ৰোগী",
    useHospitalId: "হাস্পতালৰ আইডি ব্যৱহাৰ কৰক",

    abhaId: "আভা আইডি",
    useAbhaHealthId: "আভা হেল্থ আইডি ব্যৱহাৰ কৰক",

    newPatient: "নতুন ৰোগী",
    registerNewPatient: "নতুন ৰোগী হিচাপে পঞ্জীয়ন কৰক",

    aadhaarCard: "আধাৰ কাৰ্ড",
    optional: "ঐচ্ছিক",

    hospitalUhid: "হাস্পতাল UHID",
    enterUhid: "আপোনাৰ হাস্পতাল UHID লিখক",
    hospitalIdPreviousVisits:
      "আপুনি আগতে এই হাস্পতাললৈ আহিলে আপোনাৰ হাস্পতাল আইডি ব্যৱহাৰ কৰক।",

    enterAbhaId: "আপোনাৰ আভা আইডি লিখক",
    abhaLinkExplanation:
      "আপোনাৰ স্বাস্থ্য ৰেকৰ্ড সুৰক্ষিতভাৱে সংযোগ কৰিবলৈ আভা আইডি ব্যৱহাৰ কৰিব পাৰি।",

    aadhaarNumber: "আধাৰ নম্বৰ",
    enterAadhaar: "আপোনাৰ আধাৰ নম্বৰ লিখক",
    aadhaarOptionalExplanation:
      "আধাৰ ঐচ্ছিক আৰু ৰোগীৰ পৰিচয়ৰ বাবে ব্যৱহাৰ কৰিব পাৰি।",

    welcomeToMediKiosk: "MediKiosk লৈ স্বাগতম",
    newPatientRegistrationExplanation:
      "আপুনি নতুন ৰোগী হিচাপে আগবাঢ়িব পাৰে। আপোনাৰ ক্লিনিকেল ইতিহাসৰ বাবে প্ৰয়োজনীয় তথ্য সংগ্ৰহ কৰা হ'ব।",

    whyCollectThis: "আমি এই তথ্য কিয় সংগ্ৰহ কৰোঁ?",
    forClinicalConsultation:
      "ক্লিনিকেল পৰামৰ্শৰ বাবে",
    secureAndConfidential:
      "সুৰক্ষিত আৰু গোপনীয়",
    yourControlYourConsent:
      "আপোনাৰ নিয়ন্ত্ৰণ, আপোনাৰ সন্মতি",
    usedOnlyWithPermission:
      "কেৱল আপোনাৰ অনুমতিৰে ব্যৱহাৰ কৰা হ'ব",

    back: "পিছলৈ",
    help: "সহায়",
    continue: "আগবাঢ়ক",

    ayurvedaClinicalHistory:
      "AI-চালিত আয়ুৰ্বেদিক ক্লিনিকেল ইতিহাস প্লেটফৰ্ম",
  },


  /* ----------------------------------------------------------------------- */
  /* BENGALI                                                                  */
  /* ----------------------------------------------------------------------- */

  bn: {
    identifyPatient: "রোগীর পরিচয়",
    selectOptionToContinue: "চালিয়ে যেতে একটি বিকল্প নির্বাচন করুন",

    existingPatient: "বিদ্যমান রোগী",
    useHospitalId: "হাসপাতাল আইডি ব্যবহার করুন",

    abhaId: "আভা আইডি",
    useAbhaHealthId: "আভা হেলথ আইডি ব্যবহার করুন",

    newPatient: "নতুন রোগী",
    registerNewPatient: "নতুন রোগী হিসেবে নিবন্ধন করুন",

    aadhaarCard: "আধার কার্ড",
    optional: "ঐচ্ছিক",

    hospitalUhid: "হাসপাতাল UHID",
    enterUhid: "আপনার হাসপাতাল UHID লিখুন",
    hospitalIdPreviousVisits:
      "আপনি আগে এই হাসপাতালে এসে থাকলে আপনার হাসপাতাল আইডি ব্যবহার করুন।",

    enterAbhaId: "আপনার আভা আইডি লিখুন",
    abhaLinkExplanation:
      "আপনার স্বাস্থ্য রেকর্ড নিরাপদে সংযুক্ত করতে আভা আইডি ব্যবহার করা যেতে পারে।",

    aadhaarNumber: "আধার নম্বর",
    enterAadhaar: "আপনার আধার নম্বর লিখুন",
    aadhaarOptionalExplanation:
      "আধার ঐচ্ছিক এবং রোগীর পরিচয়ের জন্য ব্যবহার করা যেতে পারে।",

    welcomeToMediKiosk: "MediKiosk-এ স্বাগতম",
    newPatientRegistrationExplanation:
      "আপনি নতুন রোগী হিসেবে এগিয়ে যেতে পারেন। আপনার ক্লিনিক্যাল ইতিহাসের জন্য প্রয়োজনীয় তথ্য সংগ্রহ করা হবে।",

    whyCollectThis: "আমরা এই তথ্য কেন সংগ্রহ করি?",
    forClinicalConsultation:
      "ক্লিনিক্যাল পরামর্শের জন্য",
    secureAndConfidential:
      "নিরাপদ ও গোপনীয়",
    yourControlYourConsent:
      "আপনার নিয়ন্ত্রণ, আপনার সম্মতি",
    usedOnlyWithPermission:
      "শুধুমাত্র আপনার অনুমতিতে ব্যবহার করা হবে",

    back: "পিছনে",
    help: "সহায়তা",
    continue: "চালিয়ে যান",

    ayurvedaClinicalHistory:
      "AI-চালিত আয়ুর্বেদিক ক্লিনিক্যাল হিস্ট্রি প্ল্যাটফর্ম",
  },


  /* ----------------------------------------------------------------------- */
  /* BODO                                                                     */
  /* ----------------------------------------------------------------------- */

  brx: {
    identifyPatient: "सोरगोनायारि सिनायथि",
    selectOptionToContinue: "जायगा सोलोंनायनि थाखाय मोनसे अप्सन सायख",

    existingPatient: "थांनाय रोगी",
    useHospitalId: "हास्पिटल आइडि बाहाय",

    abhaId: "आभा आइडि",
    useAbhaHealthId: "आभा हेल्थ आइडि बाहाय",

    newPatient: "गोदान रोगी",
    registerNewPatient: "गोदान रोगी हिसाबै रेजिस्टर खालाम",

    aadhaarCard: "आधार कार्ड",
    optional: "बाहायनो हायो",

    hospitalUhid: "हास्पिटल UHID",
    enterUhid: "नोंथांनि हास्पिटल UHID सोरख",
    hospitalIdPreviousVisits:
      "नोंथां गिबियाव बे हास्पिटलाव आयोब्ला हास्पिटल आइडि बाहाय।",

    enterAbhaId: "नोंथांनि आभा आइडि सोरख",
    abhaLinkExplanation:
      "आभा आइडिनि मददजों नोंथांनि हेल्थ रेकर्ड सुरक्षितै जोडनो हायो।",

    aadhaarNumber: "आधार नम्बर",
    enterAadhaar: "नोंथांनि आधार नम्बर सोरख",
    aadhaarOptionalExplanation:
      "आधार ऐच्छिक आरो रोगीनि सिनायथिनि थाखाय बाहायनो हायो।",

    welcomeToMediKiosk: "MediKiosk आव फैयाबाय",
    newPatientRegistrationExplanation:
      "नोंथां गोदान रोगी हिसाबै फुदों जाबाय। क्लिनिकल इतिहासनि थाखाय गोनांथार बिबरन लाबाय जाबाय।",

    whyCollectThis: "बेखौ बिबरन सोरजों मानो लाबाय?",
    forClinicalConsultation:
      "क्लिनिकल सलाहनि थाखाय",
    secureAndConfidential:
      "सुरक्षित आरो गोपोनिय",
    yourControlYourConsent:
      "नोंथांनि नियन्त्रण, नोंथांनि सहमति",
    usedOnlyWithPermission:
      "खालि नोंथांनि अनुमतिजों बाहाय जाबाय",

    back: "फिन",
    help: "मदद",
    continue: "फुदों",

    ayurvedaClinicalHistory:
      "AI-चालित आयुर्वेदिक क्लिनिकल हिस्ट्री प्लेटफर्म",
  },


  /* ----------------------------------------------------------------------- */
  /* DOGRI                                                                    */
  /* ----------------------------------------------------------------------- */

  doi: {
    identifyPatient: "मरीज दी पन्छान",
    selectOptionToContinue: "अग्गें बधने लेई इक विकल्प चुनो",

    existingPatient: "मौजूदा मरीज",
    useHospitalId: "अस्पताल आईडी बरतो",

    abhaId: "आभा आईडी",
    useAbhaHealthId: "आभा हेल्थ आईडी बरतो",

    newPatient: "नमां मरीज",
    registerNewPatient: "नमां मरीज दे रूप च पंजीकरण करो",

    aadhaarCard: "आधार कार्ड",
    optional: "वैकल्पिक",

    hospitalUhid: "अस्पताल UHID",
    enterUhid: "अपना अस्पताल UHID दर्ज करो",
    hospitalIdPreviousVisits:
      "जे तुस पैह्लें इस अस्पताल च आए ओ तां अस्पताल आईडी बरतो।",

    enterAbhaId: "अपनी आभा आईडी दर्ज करो",
    abhaLinkExplanation:
      "आभा आईडी कन्नै तुंदे स्वास्थ्य रिकार्ड सुरक्षित तरीके कन्नै जोड़े जाई सकदे न।",

    aadhaarNumber: "आधार नंबर",
    enterAadhaar: "अपना आधार नंबर दर्ज करो",
    aadhaarOptionalExplanation:
      "आधार वैकल्पिक ऐ ते मरीज दी पन्छान लेई बरतेआ जाई सकदा ऐ।",

    welcomeToMediKiosk: "MediKiosk च तुआडा स्वागत ऐ",
    newPatientRegistrationExplanation:
      "तुस नमां मरीज बनियै अग्गें बधि सकदे ओ। तुंदे क्लिनिकल इतिहास लेई जरूरी जानकारी इकट्ठी कीती जाह्गी।",

    whyCollectThis: "अस एह जानकारी काहदे लेई इकट्ठी करदे आं?",
    forClinicalConsultation:
      "क्लिनिकल सलाह लेई",
    secureAndConfidential:
      "सुरक्षित ते गोपनीय",
    yourControlYourConsent:
      "तुंदा नियंत्रण, तुंदी सहमति",
    usedOnlyWithPermission:
      "सिर्फ तुंदी इजाज़त कन्नै बरतेआ जाह्गा",

    back: "पिच्छें",
    help: "मदद",
    continue: "अग्गें बधो",

    ayurvedaClinicalHistory:
      "AI-आधारित आयुर्वेदिक क्लिनिकल हिस्ट्री प्लेटफॉर्म",
  },


  /* ----------------------------------------------------------------------- */
  /* GUJARATI                                                                 */
  /* ----------------------------------------------------------------------- */

  gu: {
    identifyPatient: "દર્દીની ઓળખ",
    selectOptionToContinue: "આગળ વધવા માટે એક વિકલ્પ પસંદ કરો",

    existingPatient: "હાલનો દર્દી",
    useHospitalId: "હોસ્પિટલ ID નો ઉપયોગ કરો",

    abhaId: "આભા ID",
    useAbhaHealthId: "આભા હેલ્થ ID નો ઉપયોગ કરો",

    newPatient: "નવો દર્દી",
    registerNewPatient: "નવા દર્દી તરીકે નોંધણી કરો",

    aadhaarCard: "આધાર કાર્ડ",
    optional: "વૈકલ્પિક",

    hospitalUhid: "હોસ્પિટલ UHID",
    enterUhid: "તમારું હોસ્પિટલ UHID દાખલ કરો",
    hospitalIdPreviousVisits:
      "જો તમે અગાઉ આ હોસ્પિટલમાં આવ્યા હોવ તો તમારી હોસ્પિટલ ID નો ઉપયોગ કરો.",

    enterAbhaId: "તમારું આભા ID દાખલ કરો",
    abhaLinkExplanation:
      "તમારા આરોગ્ય રેકોર્ડને સુરક્ષિત રીતે જોડવા માટે આભા ID નો ઉપયોગ કરી શકાય છે.",

    aadhaarNumber: "આધાર નંબર",
    enterAadhaar: "તમારો આધાર નંબર દાખલ કરો",
    aadhaarOptionalExplanation:
      "આધાર વૈકલ્પિક છે અને દર્દીની ઓળખ માટે ઉપયોગ કરી શકાય છે.",

    welcomeToMediKiosk: "MediKiosk માં આપનું સ્વાગત છે",
    newPatientRegistrationExplanation:
      "તમે નવા દર્દી તરીકે આગળ વધી શકો છો. તમારા ક્લિનિકલ ઇતિહાસ માટે જરૂરી માહિતી એકત્રિત કરવામાં આવશે.",

    whyCollectThis: "અમે આ માહિતી શા માટે એકત્રિત કરીએ છીએ?",
    forClinicalConsultation:
      "ક્લિનિકલ પરામર્શ માટે",
    secureAndConfidential:
      "સુરક્ષિત અને ગોપનીય",
    yourControlYourConsent:
      "તમારું નિયંત્રણ, તમારી સંમતિ",
    usedOnlyWithPermission:
      "ફક્ત તમારી પરવાનગીથી ઉપયોગ કરવામાં આવશે",

    back: "પાછા",
    help: "મદદ",
    continue: "ચાલુ રાખો",

    ayurvedaClinicalHistory:
      "AI આધારિત આયુર્વેદિક ક્લિનિકલ હિસ્ટ્રી પ્લેટફોર્મ",
  },


  /* ----------------------------------------------------------------------- */
  /* KANNADA                                                                  */
  /* ----------------------------------------------------------------------- */

  kn: {
    identifyPatient: "ರೋಗಿಯನ್ನು ಗುರುತಿಸಿ",
    selectOptionToContinue: "ಮುಂದುವರಿಸಲು ಒಂದು ಆಯ್ಕೆಯನ್ನು ಆರಿಸಿ",

    existingPatient: "ಈಗಾಗಲೇ ಇರುವ ರೋಗಿ",
    useHospitalId: "ಆಸ್ಪತ್ರೆ ID ಬಳಸಿ",

    abhaId: "ಆಭಾ ID",
    useAbhaHealthId: "ಆಭಾ ಹೆಲ್ತ್ ID ಬಳಸಿ",

    newPatient: "ಹೊಸ ರೋಗಿ",
    registerNewPatient: "ಹೊಸ ರೋಗಿಯಾಗಿ ನೋಂದಾಯಿಸಿ",

    aadhaarCard: "ಆಧಾರ್ ಕಾರ್ಡ್",
    optional: "ಐಚ್ಛಿಕ",

    hospitalUhid: "ಆಸ್ಪತ್ರೆ UHID",
    enterUhid: "ನಿಮ್ಮ ಆಸ್ಪತ್ರೆ UHID ನಮೂದಿಸಿ",
    hospitalIdPreviousVisits:
      "ನೀವು ಈ ಹಿಂದೆ ಈ ಆಸ್ಪತ್ರೆಗೆ ಬಂದಿದ್ದರೆ ನಿಮ್ಮ ಆಸ್ಪತ್ರೆ ID ಬಳಸಿ.",

    enterAbhaId: "ನಿಮ್ಮ ಆಭಾ ID ನಮೂದಿಸಿ",
    abhaLinkExplanation:
      "ನಿಮ್ಮ ಆರೋಗ್ಯ ದಾಖಲೆಗಳನ್ನು ಸುರಕ್ಷಿತವಾಗಿ ಸಂಪರ್ಕಿಸಲು ಆಭಾ ID ಬಳಸಬಹುದು.",

    aadhaarNumber: "ಆಧಾರ್ ಸಂಖ್ಯೆ",
    enterAadhaar: "ನಿಮ್ಮ ಆಧಾರ್ ಸಂಖ್ಯೆ ನಮೂದಿಸಿ",
    aadhaarOptionalExplanation:
      "ಆಧಾರ್ ಐಚ್ಛಿಕವಾಗಿದ್ದು ರೋಗಿಯ ಗುರುತಿಗಾಗಿ ಬಳಸಬಹುದು.",

    welcomeToMediKiosk: "MediKiosk ಗೆ ಸ್ವಾಗತ",
    newPatientRegistrationExplanation:
      "ನೀವು ಹೊಸ ರೋಗಿಯಾಗಿ ಮುಂದುವರಿಯಬಹುದು. ನಿಮ್ಮ ಕ್ಲಿನಿಕಲ್ ಇತಿಹಾಸಕ್ಕೆ ಅಗತ್ಯವಿರುವ ಮಾಹಿತಿಯನ್ನು ಸಂಗ್ರಹಿಸಲಾಗುತ್ತದೆ.",

    whyCollectThis: "ನಾವು ಈ ಮಾಹಿತಿಯನ್ನು ಏಕೆ ಸಂಗ್ರಹಿಸುತ್ತೇವೆ?",
    forClinicalConsultation:
      "ಕ್ಲಿನಿಕಲ್ ಸಮಾಲೋಚನೆಗಾಗಿ",
    secureAndConfidential:
      "ಸುರಕ್ಷಿತ ಮತ್ತು ಗೌಪ್ಯ",
    yourControlYourConsent:
      "ನಿಮ್ಮ ನಿಯಂತ್ರಣ, ನಿಮ್ಮ ಸಮ್ಮತಿ",
    usedOnlyWithPermission:
      "ನಿಮ್ಮ ಅನುಮತಿಯೊಂದಿಗೆ ಮಾತ್ರ ಬಳಸಲಾಗುತ್ತದೆ",

    back: "ಹಿಂದೆ",
    help: "ಸಹಾಯ",
    continue: "ಮುಂದುವರಿಸಿ",

    ayurvedaClinicalHistory:
      "AI ಆಧಾರಿತ ಆಯುರ್ವೇದ ಕ್ಲಿನಿಕಲ್ ಹಿಸ್ಟರಿ ಪ್ಲಾಟ್‌ಫಾರ್ಮ್",
  },


  /* ----------------------------------------------------------------------- */
  /* KASHMIRI                                                                 */
  /* ----------------------------------------------------------------------- */

  ks: {
    identifyPatient: "مریض سڃان",
    selectOptionToContinue: "جاری تھاونہٕ خاطرٕ اکھ انتخاب کٔرِو",

    existingPatient: "موجود مریض",
    useHospitalId: "ہسپتال ID استعمال کٔرِو",

    abhaId: "آبھاآ ID",
    useAbhaHealthId: "آبھاآ ہیلتھ ID استعمال کٔرِو",

    newPatient: "نو مریض",
    registerNewPatient: "نوس مریضس طور رجسٹر کٔرِو",

    aadhaarCard: "آدھار کارڈ",
    optional: "اختیاری",

    hospitalUhid: "ہسپتال UHID",
    enterUhid: "پنُن ہسپتال UHID درج کٔرِو",
    hospitalIdPreviousVisits:
      "اگر تُہۍ پٔتھۍ یتھ ہسپتالس منز آمت چھُو، پنُن ہسپتال ID استعمال کٔرِو۔",

    enterAbhaId: "پنُن آبھا ID درج کٔرِو",
    abhaLinkExplanation:
      "آبھاآ ID استعمال کرنہٕ سان صحت ریکارڈ محفوظ طریقس منز جوڑِتھ ہیکو۔",

    aadhaarNumber: "آدھار نمبر",
    enterAadhaar: "پنُن آدھار نمبر درج کٔرِو",
    aadhaarOptionalExplanation:
      "آدھار اختیاری چھُ تہٕ مریضس سڃان خاطرٕ استعمال گژھِتھ ہیکہٕ۔",

    welcomeToMediKiosk: "MediKiosk منز خوش آمدید",
    newPatientRegistrationExplanation:
      "تُہۍ نو مریض بنِتھ آگے گژھِتھ ہیکو۔ کلینیکل تاریخ خاطرٕ ضروری معلومات جمع کٔرِتھ گژھہ۔",

    whyCollectThis: "یہ معلومات کیوں جمع کران چھِو؟",
    forClinicalConsultation:
      "کلینیکل مشورس خاطرٕ",
    secureAndConfidential:
      "محفوظ تہٕ رازدار",
    yourControlYourConsent:
      "تُہند اختیار، تُہند رضامندی",
    usedOnlyWithPermission:
      "صرف تُہند اجازت سان استعمال گژھہ",

    back: "واپس",
    help: "مدد",
    continue: "جاری کٔرِو",

    ayurvedaClinicalHistory:
      "AI-پاورڈ آیورویدک کلینیکل ہسٹری پلیٹ فارم",
  },


  /* ----------------------------------------------------------------------- */
  /* MAITHILI                                                                 */
  /* ----------------------------------------------------------------------- */

  mai: {
    identifyPatient: "रोगी के पहचान",
    selectOptionToContinue: "आगाँ बढ़बाक लेल एकटा विकल्प चुनू",

    existingPatient: "पहिने सँ रहल रोगी",
    useHospitalId: "अस्पताल आईडी के उपयोग करू",

    abhaId: "आभा आईडी",
    useAbhaHealthId: "आभा हेल्थ आईडी के उपयोग करू",

    newPatient: "नव रोगी",
    registerNewPatient: "नव रोगी के रूप मे पंजीकरण करू",

    aadhaarCard: "आधार कार्ड",
    optional: "वैकल्पिक",

    hospitalUhid: "अस्पताल UHID",
    enterUhid: "अपन अस्पताल UHID दर्ज करू",
    hospitalIdPreviousVisits:
      "जँ अहाँ पहिने एहि अस्पताल मे आएल छी तँ अपन अस्पताल आईडी के उपयोग करू।",

    enterAbhaId: "अपन आभा आईडी दर्ज करू",
    abhaLinkExplanation:
      "आभा आईडी सँ अहाँक स्वास्थ्य रेकॉर्ड सुरक्षित रूप सँ जोड़ल जा सकैत अछि।",

    aadhaarNumber: "आधार नम्बर",
    enterAadhaar: "अपन आधार नम्बर दर्ज करू",
    aadhaarOptionalExplanation:
      "आधार वैकल्पिक अछि आ रोगी के पहचान लेल उपयोग कएल जा सकैत अछि।",

    welcomeToMediKiosk: "MediKiosk मे अहाँक स्वागत अछि",
    newPatientRegistrationExplanation:
      "अहाँ नव रोगी के रूप मे आगाँ बढ़ि सकैत छी। क्लिनिकल इतिहास लेल जरूरी जानकारी जमा कएल जाएत।",

    whyCollectThis: "हम ई जानकारी किएक जमा करैत छी?",
    forClinicalConsultation:
      "क्लिनिकल परामर्श लेल",
    secureAndConfidential:
      "सुरक्षित आ गोपनीय",
    yourControlYourConsent:
      "अहाँक नियंत्रण, अहाँक सहमति",
    usedOnlyWithPermission:
      "केवल अहाँक अनुमति सँ उपयोग कएल जाएत",

    back: "पाछाँ",
    help: "मदद",
    continue: "आगाँ बढ़ू",

    ayurvedaClinicalHistory:
      "AI आधारित आयुर्वेदिक क्लिनिकल हिस्ट्री प्लेटफॉर्म",
  },


  /* ----------------------------------------------------------------------- */
  /* MALAYALAM                                                                */
  /* ----------------------------------------------------------------------- */

  ml: {
    identifyPatient: "രോഗിയെ തിരിച്ചറിയുക",
    selectOptionToContinue: "തുടരാൻ ഒരു ഓപ്ഷൻ തിരഞ്ഞെടുക്കുക",

    existingPatient: "നിലവിലുള്ള രോഗി",
    useHospitalId: "ആശുപത്രി ഐഡി ഉപയോഗിക്കുക",

    abhaId: "ആഭാ ഐഡി",
    useAbhaHealthId: "ആഭാ ഹെൽത്ത് ഐഡി ഉപയോഗിക്കുക",

    newPatient: "പുതിയ രോഗി",
    registerNewPatient: "പുതിയ രോഗിയായി രജിസ്റ്റർ ചെയ്യുക",

    aadhaarCard: "ആധാർ കാർഡ്",
    optional: "ഐച്ഛികം",

    hospitalUhid: "ആശുപത്രി UHID",
    enterUhid: "നിങ്ങളുടെ ആശുപത്രി UHID നൽകുക",
    hospitalIdPreviousVisits:
      "നിങ്ങൾ മുമ്പ് ഈ ആശുപത്രിയിൽ വന്നിട്ടുണ്ടെങ്കിൽ നിങ്ങളുടെ ആശുപത്രി ഐഡി ഉപയോഗിക്കുക.",

    enterAbhaId: "നിങ്ങളുടെ ആഭാ ഐഡി നൽകുക",
    abhaLinkExplanation:
      "നിങ്ങളുടെ ആരോഗ്യ രേഖകൾ സുരക്ഷിതമായി ബന്ധിപ്പിക്കാൻ ആഭാ ഐഡി ഉപയോഗിക്കാം.",

    aadhaarNumber: "ആധാർ നമ്പർ",
    enterAadhaar: "നിങ്ങളുടെ ആധാർ നമ്പർ നൽകുക",
    aadhaarOptionalExplanation:
      "ആധാർ ഐച്ഛികമാണ്, രോഗിയുടെ തിരിച്ചറിയലിനായി ഉപയോഗിക്കാം.",

    welcomeToMediKiosk: "MediKiosk-ലേക്ക് സ്വാഗതം",
    newPatientRegistrationExplanation:
      "നിങ്ങൾക്ക് പുതിയ രോഗിയായി തുടരാം. നിങ്ങളുടെ ക്ലിനിക്കൽ ചരിത്രത്തിനായി ആവശ്യമായ വിവരങ്ങൾ ശേഖരിക്കും.",

    whyCollectThis: "എന്തുകൊണ്ടാണ് ഞങ്ങൾ ഈ വിവരങ്ങൾ ശേഖരിക്കുന്നത്?",
    forClinicalConsultation:
      "ക്ലിനിക്കൽ കൺസൾട്ടേഷനായി",
    secureAndConfidential:
      "സുരക്ഷിതവും രഹസ്യാത്മകവും",
    yourControlYourConsent:
      "നിങ്ങളുടെ നിയന്ത്രണം, നിങ്ങളുടെ സമ്മതം",
    usedOnlyWithPermission:
      "നിങ്ങളുടെ അനുമതിയോടെ മാത്രം ഉപയോഗിക്കും",

    back: "തിരികെ",
    help: "സഹായം",
    continue: "തുടരുക",

    ayurvedaClinicalHistory:
      "AI അധിഷ്ഠിത ആയുർവേദ ക്ലിനിക്കൽ ഹിസ്റ്ററി പ്ലാറ്റ്ഫോം",
  },


  /* ----------------------------------------------------------------------- */
  /* MANIPURI                                                                  */
  /* ----------------------------------------------------------------------- */

  mni: {
    identifyPatient: "রোগীগী মশক তাকপা",
    selectOptionToContinue: "মখা তানা চৎনবা অপশন অমা খল্লু",

    existingPatient: "হৌজিক লৈরিবা রোগী",
    useHospitalId: "হস্পিটাল ID শিজিন্নৌ",

    abhaId: "আভা ID",
    useAbhaHealthId: "আভা হেল্থ ID শিজিন্নৌ",

    newPatient: "অনৌবা রোগী",
    registerNewPatient: "অনৌবা রোগী অমা ওইনা রেজিস্টর তৌ",

    aadhaarCard: "আধার কার্ড",
    optional: "অপশনেল",

    hospitalUhid: "হস্পিটাল UHID",
    enterUhid: "নখোয়গী হস্পিটাল UHID শেমদোকউ",
    hospitalIdPreviousVisits:
      "মখোয় হস্পিটাল অসিদা হাংখ্রে হায়রবদি হস্পিটাল ID শিজিন্নৌ।",

    enterAbhaId: "নখোয়গী আভা ID শেমদোকউ",
    abhaLinkExplanation:
      "আভা ID শিজিন্নগা নখোয়গী হেল্থ রেকর্ড সেফ ওইনা লোয়নবা য়াই।",

    aadhaarNumber: "আধার নম্বর",
    enterAadhaar: "নখোয়গী আধার নম্বর শেমদোকউ",
    aadhaarOptionalExplanation:
      "আধার অপশনেল অমসুং রোগীগী মশক তাক্নবা শিজিন্নবা য়াই।",

    welcomeToMediKiosk: "MediKiosk দা তারাম্না তরাম্না",
    newPatientRegistrationExplanation:
      "নখোয় অনৌবা রোগী ওইনা মখা তানা চৎপা য়াই। ক্লিনিকেল হিস্টরীগী মরমদা দরকার লৈবা ইনফরমেশন লৌগনি।",

    whyCollectThis: "এনাংগী ইনফরমেশন অসি করিগুম্বা লৌরিবনো?",
    forClinicalConsultation:
      "ক্লিনিকেল কনসালটেশনগী থাখায়",
    secureAndConfidential:
      "সেফ অমসুং কনফিডেনশেল",
    yourControlYourConsent:
      "নখোয়গী কন্ট্রোল, নখোয়গী কনসেন্ট",
    usedOnlyWithPermission:
      "নখোয়গী পারমিশননা খক শিজিন্নগনি",

    back: "মতুং",
    help: "মতেং",
    continue: "মখা তানা",

    ayurvedaClinicalHistory:
      "AI-চালিত আয়ুর্বেদিক ক্লিনিকেল হিস্টরি প্ল্যাটফর্ম",
  },


  /* ----------------------------------------------------------------------- */
  /* NEPALI                                                                   */
  /* ----------------------------------------------------------------------- */

  ne: {
    identifyPatient: "बिरामी पहिचान",
    selectOptionToContinue: "जारी राख्न एउटा विकल्प छान्नुहोस्",

    existingPatient: "पहिलेको बिरामी",
    useHospitalId: "अस्पताल ID प्रयोग गर्नुहोस्",

    abhaId: "आभा ID",
    useAbhaHealthId: "आभा हेल्थ ID प्रयोग गर्नुहोस्",

    newPatient: "नयाँ बिरामी",
    registerNewPatient: "नयाँ बिरामीको रूपमा दर्ता गर्नुहोस्",

    aadhaarCard: "आधार कार्ड",
    optional: "वैकल्पिक",

    hospitalUhid: "अस्पताल UHID",
    enterUhid: "आफ्नो अस्पताल UHID लेख्नुहोस्",
    hospitalIdPreviousVisits:
      "यदि तपाईं पहिले यस अस्पतालमा आउनुभएको छ भने आफ्नो अस्पताल ID प्रयोग गर्नुहोस्।",

    enterAbhaId: "आफ्नो आभा ID लेख्नुहोस्",
    abhaLinkExplanation:
      "आभा ID तपाईंको स्वास्थ्य रेकर्ड सुरक्षित रूपमा जोड्न प्रयोग गर्न सकिन्छ।",

    aadhaarNumber: "आधार नम्बर",
    enterAadhaar: "आफ्नो आधार नम्बर लेख्नुहोस्",
    aadhaarOptionalExplanation:
      "आधार वैकल्पिक हो र बिरामीको पहिचानका लागि प्रयोग गर्न सकिन्छ।",

    welcomeToMediKiosk: "MediKiosk मा स्वागत छ",
    newPatientRegistrationExplanation:
      "तपाईं नयाँ बिरामीको रूपमा अगाडि बढ्न सक्नुहुन्छ। तपाईंको क्लिनिकल इतिहासका लागि आवश्यक जानकारी सङ्कलन गरिनेछ।",

    whyCollectThis: "हामी यो जानकारी किन सङ्कलन गर्छौं?",
    forClinicalConsultation:
      "क्लिनिकल परामर्शका लागि",
    secureAndConfidential:
      "सुरक्षित र गोप्य",
    yourControlYourConsent:
      "तपाईंको नियन्त्रण, तपाईंको सहमति",
    usedOnlyWithPermission:
      "तपाईंको अनुमति मात्र प्रयोग गरिनेछ",

    back: "पछाडि",
    help: "मद्दत",
    continue: "जारी राख्नुहोस्",

    ayurvedaClinicalHistory:
      "AI-संचालित आयुर्वेदिक क्लिनिकल हिस्ट्री प्लेटफर्म",
  },


  /* ----------------------------------------------------------------------- */
  /* ODIA                                                                     */
  /* ----------------------------------------------------------------------- */

  or: {
    identifyPatient: "ରୋଗୀଙ୍କ ପରିଚୟ",
    selectOptionToContinue: "ଆଗକୁ ବଢିବା ପାଇଁ ଏକ ବିକଳ୍ପ ବାଛନ୍ତୁ",

    existingPatient: "ପୂର୍ବରୁ ଥିବା ରୋଗୀ",
    useHospitalId: "ହସ୍ପିଟାଲ ID ବ୍ୟବହାର କରନ୍ତୁ",

    abhaId: "ଆଭା ID",
    useAbhaHealthId: "ଆଭା ହେଲ୍ଥ ID ବ୍ୟବହାର କରନ୍ତୁ",

    newPatient: "ନୂଆ ରୋଗୀ",
    registerNewPatient: "ନୂଆ ରୋଗୀ ଭାବେ ପଞ୍ଜିକରଣ କରନ୍ତୁ",

    aadhaarCard: "ଆଧାର କାର୍ଡ",
    optional: "ଇଚ୍ଛାଧୀନ",

    hospitalUhid: "ହସ୍ପିଟାଲ UHID",
    enterUhid: "ଆପଣଙ୍କ ହସ୍ପିଟାଲ UHID ଲେଖନ୍ତୁ",
    hospitalIdPreviousVisits:
      "ଆପଣ ପୂର୍ବରୁ ଏହି ହସ୍ପିଟାଲକୁ ଆସିଥିଲେ ଆପଣଙ୍କ ହସ୍ପିଟାଲ ID ବ୍ୟବହାର କରନ୍ତୁ।",

    enterAbhaId: "ଆପଣଙ୍କ ଆଭା ID ଲେଖନ୍ତୁ",
    abhaLinkExplanation:
      "ଆପଣଙ୍କ ସ୍ୱାସ୍ଥ୍ୟ ରେକର୍ଡକୁ ସୁରକ୍ଷିତ ଭାବରେ ଯୋଡିବା ପାଇଁ ଆଭା ID ବ୍ୟବହାର କରାଯାଇପାରେ।",

    aadhaarNumber: "ଆଧାର ନମ୍ବର",
    enterAadhaar: "ଆପଣଙ୍କ ଆଧାର ନମ୍ବର ଲେଖନ୍ତୁ",
    aadhaarOptionalExplanation:
      "ଆଧାର ଇଚ୍ଛାଧୀନ ଏବଂ ରୋଗୀଙ୍କ ପରିଚୟ ପାଇଁ ବ୍ୟବହାର କରାଯାଇପାରେ।",

    welcomeToMediKiosk: "MediKiosk କୁ ସ୍ୱାଗତ",
    newPatientRegistrationExplanation:
      "ଆପଣ ନୂଆ ରୋଗୀ ଭାବେ ଆଗକୁ ବଢିପାରିବେ। ଆପଣଙ୍କ କ୍ଲିନିକାଲ ଇତିହାସ ପାଇଁ ଆବଶ୍ୟକ ସୂଚନା ସଂଗ୍ରହ କରାଯିବ।",

    whyCollectThis: "ଆମେ ଏହି ସୂଚନା କାହିଁକି ସଂଗ୍ରହ କରୁଛୁ?",
    forClinicalConsultation:
      "କ୍ଲିନିକାଲ ପରାମର୍ଶ ପାଇଁ",
    secureAndConfidential:
      "ସୁରକ୍ଷିତ ଏବଂ ଗୋପନୀୟ",
    yourControlYourConsent:
      "ଆପଣଙ୍କ ନିୟନ୍ତ୍ରଣ, ଆପଣଙ୍କ ସମ୍ମତି",
    usedOnlyWithPermission:
      "କେବଳ ଆପଣଙ୍କ ଅନୁମତିରେ ବ୍ୟବହାର ହେବ",

    back: "ପଛକୁ",
    help: "ସହାୟତା",
    continue: "ଜାରି ରଖନ୍ତୁ",

    ayurvedaClinicalHistory:
      "AI-ଚାଳିତ ଆୟୁର୍ବେଦିକ କ୍ଲିନିକାଲ ହିଷ୍ଟ୍ରି ପ୍ଲାଟଫର୍ମ",
  },


  /* ----------------------------------------------------------------------- */
  /* PUNJABI                                                                  */
  /* ----------------------------------------------------------------------- */

  pa: {
    identifyPatient: "ਮਰੀਜ਼ ਦੀ ਪਛਾਣ",
    selectOptionToContinue: "ਅੱਗੇ ਵਧਣ ਲਈ ਇੱਕ ਵਿਕਲਪ ਚੁਣੋ",

    existingPatient: "ਮੌਜੂਦਾ ਮਰੀਜ਼",
    useHospitalId: "ਹਸਪਤਾਲ ID ਵਰਤੋ",

    abhaId: "ਆਭਾ ID",
    useAbhaHealthId: "ਆਭਾ ਹੈਲਥ ID ਵਰਤੋ",

    newPatient: "ਨਵਾਂ ਮਰੀਜ਼",
    registerNewPatient: "ਨਵੇਂ ਮਰੀਜ਼ ਵਜੋਂ ਰਜਿਸਟਰ ਕਰੋ",

    aadhaarCard: "ਆਧਾਰ ਕਾਰਡ",
    optional: "ਵਿਕਲਪਿਕ",

    hospitalUhid: "ਹਸਪਤਾਲ UHID",
    enterUhid: "ਆਪਣਾ ਹਸਪਤਾਲ UHID ਦਰਜ ਕਰੋ",
    hospitalIdPreviousVisits:
      "ਜੇ ਤੁਸੀਂ ਪਹਿਲਾਂ ਇਸ ਹਸਪਤਾਲ ਵਿੱਚ ਆਏ ਹੋ ਤਾਂ ਆਪਣੀ ਹਸਪਤਾਲ ID ਵਰਤੋ।",

    enterAbhaId: "ਆਪਣਾ ਆਭਾ ID ਦਰਜ ਕਰੋ",
    abhaLinkExplanation:
      "ਤੁਹਾਡੇ ਸਿਹਤ ਰਿਕਾਰਡ ਨੂੰ ਸੁਰੱਖਿਅਤ ਢੰਗ ਨਾਲ ਜੋੜਨ ਲਈ ਆਭਾ ID ਵਰਤੀ ਜਾ ਸਕਦੀ ਹੈ।",

    aadhaarNumber: "ਆਧਾਰ ਨੰਬਰ",
    enterAadhaar: "ਆਪਣਾ ਆਧਾਰ ਨੰਬਰ ਦਰਜ ਕਰੋ",
    aadhaarOptionalExplanation:
      "ਆਧਾਰ ਵਿਕਲਪਿਕ ਹੈ ਅਤੇ ਮਰੀਜ਼ ਦੀ ਪਛਾਣ ਲਈ ਵਰਤਿਆ ਜਾ ਸਕਦਾ ਹੈ।",

    welcomeToMediKiosk: "MediKiosk ਵਿੱਚ ਤੁਹਾਡਾ ਸਵਾਗਤ ਹੈ",
    newPatientRegistrationExplanation:
      "ਤੁਸੀਂ ਨਵੇਂ ਮਰੀਜ਼ ਵਜੋਂ ਅੱਗੇ ਵਧ ਸਕਦੇ ਹੋ। ਤੁਹਾਡੇ ਕਲੀਨਿਕਲ ਇਤਿਹਾਸ ਲਈ ਲੋੜੀਂਦੀ ਜਾਣਕਾਰੀ ਇਕੱਠੀ ਕੀਤੀ ਜਾਵੇਗੀ।",

    whyCollectThis: "ਅਸੀਂ ਇਹ ਜਾਣਕਾਰੀ ਕਿਉਂ ਇਕੱਠੀ ਕਰਦੇ ਹਾਂ?",
    forClinicalConsultation:
      "ਕਲੀਨਿਕਲ ਸਲਾਹ ਲਈ",
    secureAndConfidential:
      "ਸੁਰੱਖਿਅਤ ਅਤੇ ਗੁਪਤ",
    yourControlYourConsent:
      "ਤੁਹਾਡਾ ਨਿਯੰਤਰਣ, ਤੁਹਾਡੀ ਸਹਿਮਤੀ",
    usedOnlyWithPermission:
      "ਸਿਰਫ਼ ਤੁਹਾਡੀ ਇਜਾਜ਼ਤ ਨਾਲ ਵਰਤੀ ਜਾਵੇਗੀ",

    back: "ਪਿੱਛੇ",
    help: "ਮਦਦ",
    continue: "ਜਾਰੀ ਰੱਖੋ",

    ayurvedaClinicalHistory:
      "AI-ਚਾਲਿਤ ਆਯੁਰਵੈਦਿਕ ਕਲੀਨਿਕਲ ਹਿਸਟਰੀ ਪਲੇਟਫਾਰਮ",
  },


  /* ----------------------------------------------------------------------- */
  /* SANTALI                                                                  */
  /* ----------------------------------------------------------------------- */

  sat: {
    identifyPatient: "ᱨᱳᱜᱤ ᱨᱚᱱᱟ ᱥᱟᱹᱛᱤ",
    selectOptionToContinue: "ᱞᱟᱦᱟ ᱪᱟᱞᱟᱣ ᱠᱷᱟᱛᱤᱨ ᱢᱤᱫ ᱵᱤᱠᱚᱞᱯ ᱵᱟᱪᱷᱟᱣ ᱢᱮ",

    existingPatient: "ᱢᱮᱱᱟᱜ ᱨᱳᱜᱤ",
    useHospitalId: "ᱦᱟᱥᱯᱟᱛᱟᱞ ID ᱵᱟᱹᱦᱟᱨ ᱢᱮ",

    abhaId: "ᱟᱵᱷᱟ ID",
    useAbhaHealthId: "ᱟᱵᱷᱟ ᱦᱮᱞᱛᱷ ID ᱵᱟᱹᱦᱟᱨ ᱢᱮ",

    newPatient: "ᱱᱟᱣᱟ ᱨᱳᱜᱤ",
    registerNewPatient: "ᱱᱟᱣᱟ ᱨᱳᱜᱤ ᱞᱮᱠᱟᱛᱮ ᱨᱮᱡᱤᱥᱴᱟᱨ ᱢᱮ",

    aadhaarCard: "ᱟᱫᱷᱟᱨ ᱠᱟᱨᱰ",
    optional: "ᱵᱤᱠᱚᱞᱯ",

    hospitalUhid: "ᱦᱟᱥᱯᱟᱛᱟᱞ UHID",
    enterUhid: "ᱟᱢᱟᱜ ᱦᱟᱥᱯᱟᱛᱟᱞ UHID ᱵᱚᱞᱚᱜ ᱢᱮ",
    hospitalIdPreviousVisits:
      "ᱡᱟᱣᱜᱮ ᱟᱢ ᱱᱚᱣᱟ ᱦᱟᱥᱯᱟᱛᱟᱞ ᱨᱮ ᱟᱭᱤᱡ ᱢᱮᱱᱟᱜ ᱟᱭᱤᱰᱤ ᱵᱟᱹᱦᱟᱨ ᱢᱮ",

    enterAbhaId: "ᱟᱢᱟᱜ ᱟᱵᱷᱟ ID ᱵᱚᱞᱚᱜ ᱢᱮ",
    abhaLinkExplanation:
      "ᱟᱵᱷᱟ ID ᱛᱮ ᱟᱢᱟᱜ ᱦᱮᱞᱛᱷ ᱨᱮᱠᱚᱨᱰ ᱥᱮᱯᱷᱛᱮ ᱡᱚᱲᱟᱣ ᱦᱚᱪᱚ ᱠᱟᱱᱟ",

    aadhaarNumber: "ᱟᱫᱷᱟᱨ ᱱᱟᱢᱵᱟᱨ",
    enterAadhaar: "ᱟᱢᱟᱜ ᱟᱫᱷᱟᱨ ᱱᱟᱢᱵᱟᱨ ᱵᱚᱞᱚᱜ ᱢᱮ",
    aadhaarOptionalExplanation:
      "ᱟᱫᱷᱟᱨ ᱵᱤᱠᱚᱞᱯ ᱠᱟᱱᱟ ᱟᱨ ᱨᱳᱜᱤ ᱥᱟᱹᱛᱤ ᱠᱷᱟᱛᱤᱨ ᱵᱟᱹᱦᱟᱨ ᱠᱟᱱᱟ",

    welcomeToMediKiosk: "MediKiosk ᱨᱮ ᱡᱚᱦᱟᱨ",
    newPatientRegistrationExplanation:
      "ᱟᱢ ᱱᱟᱣᱟ ᱨᱳᱜᱤ ᱞᱮᱠᱟᱛᱮ ᱞᱟᱦᱟ ᱪᱟᱞᱟᱣ ᱦᱚᱪᱚ ᱦᱚᱪᱚ ᱢᱮ।",

    whyCollectThis: "ᱟᱞᱮ ᱱᱚᱣᱟ ᱵᱤᱵᱨᱚᱱ ᱪᱮᱫ ᱠᱷᱟᱛᱤᱨ ᱞᱟᱹᱦᱟᱣᱟ?",
    forClinicalConsultation:
      "ᱠᱞᱤᱱᱤᱠᱟᱞ ᱥᱟᱞᱟᱦ ᱠᱷᱟᱛᱤᱨ",
    secureAndConfidential:
      "ᱥᱮᱯᱷ ᱟᱨ ᱜᱚᱯᱚᱱᱤᱭ",
    yourControlYourConsent:
      "ᱟᱢᱟᱜ ᱱᱤᱭᱚᱱᱛᱨᱚᱱ, ᱟᱢᱟᱜ ᱥᱚᱢᱢᱚᱛᱤ",
    usedOnlyWithPermission:
      "ᱠᱷᱟᱹᱞᱤ ᱟᱢᱟᱜ ᱟᱱᱩᱢᱚᱛᱤ ᱛᱮ ᱵᱟᱹᱦᱟᱨ ᱠᱟᱱᱟ",

    back: "ᱛᱟᱭᱚᱢ",
    help: "ᱜᱚᱲᱚ",
    continue: "ᱞᱟᱦᱟ ᱪᱟᱞᱟᱣ",

    ayurvedaClinicalHistory:
      "AI ᱪᱟᱞᱟᱣ ᱟᱭᱩᱨᱵᱮᱫᱤᱠ ᱠᱞᱤᱱᱤᱠᱟᱞ ᱦᱤᱥᱴᱨᱤ ᱯᱞᱟᱴᱯᱷᱚᱨᱢ",
  },


  /* ----------------------------------------------------------------------- */
  /* TAMIL                                                                    */
  /* ----------------------------------------------------------------------- */

  ta: {
    identifyPatient: "நோயாளியை அடையாளம் காண்க",
    selectOptionToContinue: "தொடர ஒரு விருப்பத்தைத் தேர்ந்தெடுக்கவும்",

    existingPatient: "ஏற்கனவே உள்ள நோயாளி",
    useHospitalId: "மருத்துவமனை ID பயன்படுத்தவும்",

    abhaId: "ஆபா ID",
    useAbhaHealthId: "ஆபா ஹெல்த் ID பயன்படுத்தவும்",

    newPatient: "புதிய நோயாளி",
    registerNewPatient: "புதிய நோயாளியாக பதிவு செய்யவும்",

    aadhaarCard: "ஆதார் அட்டை",
    optional: "விருப்பத்தேர்வு",

    hospitalUhid: "மருத்துவமனை UHID",
    enterUhid: "உங்கள் மருத்துவமனை UHID-ஐ உள்ளிடவும்",
    hospitalIdPreviousVisits:
      "நீங்கள் முன்பு இந்த மருத்துவமனைக்கு வந்திருந்தால் உங்கள் மருத்துவமனை ID-ஐ பயன்படுத்தவும்.",

    enterAbhaId: "உங்கள் ஆபா ID-ஐ உள்ளிடவும்",
    abhaLinkExplanation:
      "உங்கள் சுகாதார பதிவுகளை பாதுகாப்பாக இணைக்க ஆபா ID பயன்படுத்தப்படலாம்.",

    aadhaarNumber: "ஆதார் எண்",
    enterAadhaar: "உங்கள் ஆதார் எண்ணை உள்ளிடவும்",
    aadhaarOptionalExplanation:
      "ஆதார் விருப்பத்தேர்வாகும் மற்றும் நோயாளியின் அடையாளத்திற்காக பயன்படுத்தப்படலாம்.",

    welcomeToMediKiosk: "MediKiosk-க்கு வரவேற்கிறோம்",
    newPatientRegistrationExplanation:
      "நீங்கள் புதிய நோயாளியாக தொடரலாம். உங்கள் மருத்துவ வரலாற்றிற்கு தேவையான தகவல்கள் சேகரிக்கப்படும்.",

    whyCollectThis: "இந்த தகவலை நாங்கள் ஏன் சேகரிக்கிறோம்?",
    forClinicalConsultation:
      "மருத்துவ ஆலோசனைக்காக",
    secureAndConfidential:
      "பாதுகாப்பான மற்றும் ரகசியமானது",
    yourControlYourConsent:
      "உங்கள் கட்டுப்பாடு, உங்கள் ஒப்புதல்",
    usedOnlyWithPermission:
      "உங்கள் அனுமதியுடன் மட்டுமே பயன்படுத்தப்படும்",

    back: "பின்செல்",
    help: "உதவி",
    continue: "தொடரவும்",

    ayurvedaClinicalHistory:
      "AI-இயக்கப்படும் ஆயுர்வேத கிளினிக்கல் ஹிஸ்டரி தளம்",
  },


  /* ----------------------------------------------------------------------- */
  /* TELUGU                                                                   */
  /* ----------------------------------------------------------------------- */

  te: {
    identifyPatient: "రోగిని గుర్తించండి",
    selectOptionToContinue: "కొనసాగడానికి ఒక ఎంపికను ఎంచుకోండి",

    existingPatient: "ఇప్పటికే ఉన్న రోగి",
    useHospitalId: "ఆసుపత్రి ID ఉపయోగించండి",

    abhaId: "ఆభా ID",
    useAbhaHealthId: "ఆభా హెల్త్ ID ఉపయోగించండి",

    newPatient: "కొత్త రోగి",
    registerNewPatient: "కొత్త రోగిగా నమోదు చేసుకోండి",

    aadhaarCard: "ఆధార్ కార్డు",
    optional: "ఐచ్ఛికం",

    hospitalUhid: "ఆసుపత్రి UHID",
    enterUhid: "మీ ఆసుపత్రి UHID నమోదు చేయండి",
    hospitalIdPreviousVisits:
      "మీరు ఇంతకు ముందు ఈ ఆసుపత్రికి వచ్చినట్లయితే మీ ఆసుపత్రి ID ఉపయోగించండి.",

    enterAbhaId: "మీ ఆభా ID నమోదు చేయండి",
    abhaLinkExplanation:
      "మీ ఆరోగ్య రికార్డులను సురక్షితంగా అనుసంధానించడానికి ఆభా ID ఉపయోగించవచ్చు.",

    aadhaarNumber: "ఆధార్ నంబర్",
    enterAadhaar: "మీ ఆధార్ నంబర్ నమోదు చేయండి",
    aadhaarOptionalExplanation:
      "ఆధార్ ఐచ్ఛికం మరియు రోగి గుర్తింపుకు ఉపయోగించవచ్చు.",

    welcomeToMediKiosk: "MediKiosk కు స్వాగతం",
    newPatientRegistrationExplanation:
      "మీరు కొత్త రోగిగా కొనసాగవచ్చు. మీ క్లినికల్ చరిత్ర కోసం అవసరమైన సమాచారాన్ని సేకరిస్తాము.",

    whyCollectThis: "మేము ఈ సమాచారాన్ని ఎందుకు సేకరిస్తాము?",
    forClinicalConsultation:
      "క్లినికల్ సంప్రదింపుల కోసం",
    secureAndConfidential:
      "సురక్షితమైన మరియు గోప్యమైనది",
    yourControlYourConsent:
      "మీ నియంత్రణ, మీ సమ్మతి",
    usedOnlyWithPermission:
      "మీ అనుమతితో మాత్రమే ఉపయోగించబడుతుంది",

    back: "వెనుకకు",
    help: "సహాయం",
    continue: "కొనసాగించండి",

    ayurvedaClinicalHistory:
      "AI ఆధారిత ఆయుర్వేద క్లినికల్ హిస్టరీ ప్లాట్‌ఫారమ్",
  },


  /* ----------------------------------------------------------------------- */
  /* URDU                                                                     */
  /* ----------------------------------------------------------------------- */

  ur: {
    identifyPatient: "مریض کی شناخت",
    selectOptionToContinue: "جاری رکھنے کے لیے ایک اختیار منتخب کریں",

    existingPatient: "موجودہ مریض",
    useHospitalId: "ہسپتال آئی ڈی استعمال کریں",

    abhaId: "آبھاآئی ڈی",
    useAbhaHealthId: "آبھاآئی ڈی ہیلتھ استعمال کریں",

    newPatient: "نیا مریض",
    registerNewPatient: "نئے مریض کے طور پر رجسٹر کریں",

    aadhaarCard: "آدھار کارڈ",
    optional: "اختیاری",

    hospitalUhid: "ہسپتال UHID",
    enterUhid: "اپنا ہسپتال UHID درج کریں",
    hospitalIdPreviousVisits:
      "اگر آپ پہلے اس ہسپتال میں آ چکے ہیں تو اپنی ہسپتال آئی ڈی استعمال کریں۔",

    enterAbhaId: "اپنی آ بھا آئی ڈی درج کریں",
    abhaLinkExplanation:
      "آپ کی صحت کی معلومات کو محفوظ طریقے سے جوڑنے کے لیے آ بھا آئی ڈی استعمال کی جا سکتی ہے۔",

    aadhaarNumber: "آدھار نمبر",
    enterAadhaar: "اپنا آدھار نمبر درج کریں",
    aadhaarOptionalExplanation:
      "آدھار اختیاری ہے اور مریض کی شناخت کے لیے استعمال کیا جا سکتا ہے۔",

    welcomeToMediKiosk: "MediKiosk میں خوش آمدید",
    newPatientRegistrationExplanation:
      "آپ نئے مریض کے طور پر آگے بڑھ سکتے ہیں۔ آپ کی طبی تاریخ کے لیے ضروری معلومات جمع کی جائیں گی۔",

    whyCollectThis: "ہم یہ معلومات کیوں جمع کرتے ہیں؟",
    forClinicalConsultation:
      "طبی مشاورت کے لیے",
    secureAndConfidential:
      "محفوظ اور خفیہ",
    yourControlYourConsent:
      "آپ کا اختیار، آپ کی رضامندی",
    usedOnlyWithPermission:
      "صرف آپ کی اجازت سے استعمال کی جائے گی",

    back: "واپس",
    help: "مدد",
    continue: "جاری رکھیں",

    ayurvedaClinicalHistory:
      "AI سے چلنے والا آیورویدک کلینیکل ہسٹری پلیٹ فارم",
  },

};


/* ========================================================================= */
/* GET CURRENT PAGE TRANSLATION                                               */
/* ========================================================================= */

function getPageCopy(
  language: string
): PageCopy {

  return (
    pageTranslations[language] ??
    pageTranslations.en
  );
}


/* ========================================================================= */
/* IDENTIFY PAGE                                                            */
/* ========================================================================= */

export default function Identify() {

  const navigate = useNavigate();


  /* ----------------------------------------------------------------------- */
  /* SELECTED LANGUAGE                                                       */
  /* ----------------------------------------------------------------------- */

  const language = usePatientStore(
    (state) => state.language
  );


  /* ----------------------------------------------------------------------- */
  /* CURRENT TRANSLATION                                                     */
  /* ----------------------------------------------------------------------- */

  const copy =
    getPageCopy(language);


  /* ----------------------------------------------------------------------- */
  /* PATIENT TYPE                                                             */
  /* ----------------------------------------------------------------------- */

  const [patientType, setPatientType] =
    useState<PatientType>("existing");


  /* ----------------------------------------------------------------------- */
  /* INPUT VALUES                                                             */
  /* ----------------------------------------------------------------------- */

  const [uhid, setUhid] =
    useState("");

  const [abha, setAbha] =
    useState("");

  const [aadhaar, setAadhaar] =
    useState("");


  /* ========================================================================= */
  /* PATIENT OPTIONS                                                          */
  /* ========================================================================= */

  const patientOptions = [

    {
      id: "existing" as PatientType,

      title:
        copy.existingPatient,

      description:
        copy.useHospitalId,

      icon:
        UserRound,

      accent:
        "green",

      /* English speech ONLY */
      speech:
        "Existing Patient. Use Hospital ID.",
    },


    {
      id: "abha" as PatientType,

      title:
        copy.abhaId,

      description:
        copy.useAbhaHealthId,

      icon:
        CreditCard,

      accent:
        "blue",

      /* English speech ONLY */
      speech:
        "ABHA ID. Use ABHA Health ID.",
    },


    {
      id: "new" as PatientType,

      title:
        copy.newPatient,

      description:
        copy.registerNewPatient,

      icon:
        UserRoundPlus,

      accent:
        "terracotta",

      /* English speech ONLY */
      speech:
        "New Patient. Register as New Patient.",
    },


    {
      id: "aadhaar" as PatientType,

      title:
        copy.aadhaarCard,

      description:
        copy.optional,

      icon:
        Fingerprint,

      accent:
        "green",

      /* English speech ONLY */
      speech:
        "Aadhaar Card. Optional.",
    },

  ];


  /* ========================================================================= */
  /* VALIDATION                                                               */
  /* ========================================================================= */

  const canContinue =

    patientType === "new"

    ||

    (
      patientType === "existing" &&
      Boolean(uhid.trim())
    )

    ||

    (
      patientType === "abha" &&
      Boolean(abha.trim())
    )

    ||

    (
      patientType === "aadhaar" &&
      Boolean(aadhaar.trim())
    );


  /* ========================================================================= */
  /* SPEAK OPTION                                                             */
  /* ========================================================================= */

  const speakPatientOption = (
    option: PatientType
  ) => {

    /*
     * IMPORTANT:
     *
     * Only speak when English is selected.
     *
     * Hindi / Marathi / Konkani / Sanskrit /
     * Sindhi / etc. will NOT trigger speech.
     */

    if (language !== "en") {
      return;
    }


    const selectedOption =
      patientOptions.find(
        (item) =>
          item.id === option
      );


    if (!selectedOption) {
      return;
    }


    speakText(
      selectedOption.speech,
      "en-IN"
    );
  };


  /* ========================================================================= */
  /* OPTION CLICK                                                             */
  /* ========================================================================= */

  const handlePatientTypeSelect = (
    option: PatientType
  ) => {

    setPatientType(option);

    speakPatientOption(option);
  };


  /* ========================================================================= */
  /* HELP                                                                     */
  /* ========================================================================= */

  const handleHelp = () => {

    if (language !== "en") {
      return;
    }

    speakPatientOption(
      patientType
    );
  };


  /* ========================================================================= */
  /* CONTINUE                                                                 */
  /* ========================================================================= */

  const handleContinue = () => {

    if (!canContinue) {
      return;
    }

    navigate(
      "/patient/consent"
    );
  };


  /* ========================================================================= */
  /* UI                                                                       */
  /* ========================================================================= */

  return (

    <KioskLayout>

      <div
        className="
          mx-auto
          min-h-screen
          max-w-[1500px]
          px-2
          py-2
        "
      >

        <div
          className="
            relative
            min-h-[calc(100vh-16px)]
            overflow-hidden
            rounded-lg
            border
            border-[#DDD4C4]
            bg-[#F7F3E9]
          "
        >


          {/* =============================================================== */}
          {/* HEADER                                                          */}
          {/* =============================================================== */}

          <header
            className="
              relative
              z-10
              flex
              items-center
              justify-between
              border-b
              border-[#DDD4C4]
              px-6
              py-4
            "
          >


            {/* ------------------------------------------------------------- */}
            {/* BACK                                                           */}
            {/* ------------------------------------------------------------- */}

            <button
              type="button"
              onClick={() =>
                navigate(
                  "/patient/language"
                )
              }
              className="
                flex
                items-center
                gap-2
                text-[11px]
                text-[#314C43]
                transition
                hover:text-[#173F35]
              "
            >

              <ArrowLeft
                size={14}
              />

              {copy.back}

            </button>


            {/* ------------------------------------------------------------- */}
            {/* CENTER LOGO                                                    */}
            {/* ------------------------------------------------------------- */}

            <div
              className="
                absolute
                left-1/2
                hidden
                -translate-x-1/2
                text-center
                md:block
              "
            >

              <p
                className="
                  font-serif
                  text-[21px]
                  font-bold
                  text-[#173F35]
                "
              >
                MediKiosk
              </p>


              <p
                className="
                  whitespace-nowrap
                  text-[8px]
                  font-medium
                  tracking-[0.08em]
                  text-[#68776F]
                "
              >
                {copy.ayurvedaClinicalHistory}
              </p>

            </div>


            {/* ------------------------------------------------------------- */}
            {/* RIGHT SIDE                                                     */}
            {/* ------------------------------------------------------------- */}

            <div
              className="
                ml-auto
                flex
                items-center
                gap-7
              "
            >

              <ProgressBar
                current={2}
                total={5}
              />


              <button
                type="button"
                onClick={
                  handleHelp
                }
                className="
                  flex
                  items-center
                  gap-1.5
                  text-[11px]
                  text-[#314C43]
                  transition
                  hover:text-[#173F35]
                "
              >

                <CircleHelp
                  size={13}
                />

                {copy.help}

              </button>

            </div>

          </header>


          {/* =============================================================== */}
          {/* CONTENT                                                         */}
          {/* =============================================================== */}

          <main
            className="
              relative
              z-10
              mx-auto
              max-w-[1050px]
              px-6
              pb-12
              pt-9
            "
          >


            {/* ============================================================= */}
            {/* TITLE                                                         */}
            {/* ============================================================= */}

            <div
              className="text-center"
            >

              <h1
                className="
                  font-serif
                  text-[32px]
                  font-bold
                  text-[#173F35]
                  md:text-[38px]
                "
              >

                {copy.identifyPatient}

              </h1>


              <p
                className="
                  mt-2
                  text-[11px]
                  text-[#68776F]
                "
              >

                {copy.selectOptionToContinue}

              </p>

            </div>


            {/* ============================================================= */}
            {/* PATIENT OPTIONS                                               */}
            {/* ============================================================= */}

            <div
              className="
                mt-8
                grid
                grid-cols-2
                gap-3
                md:grid-cols-4
              "
            >

              {patientOptions.map(
                (option) => {

                  const Icon =
                    option.icon;

                  const selected =
                    patientType ===
                    option.id;


                  return (

                    <button
                      key={
                        option.id
                      }
                      type="button"
                      onClick={() =>
                        handlePatientTypeSelect(
                          option.id
                        )
                      }
                      className={`
                        relative
                        min-h-[120px]
                        rounded-lg
                        border
                        p-4
                        text-center
                        transition

                        ${
                          selected
                            ? "border-[#315C4D] bg-[#E7EFE4] shadow-sm"
                            : "border-[#DDD4C4] bg-[#F9F6EE] hover:border-[#A85C3A]"
                        }
                      `}
                    >

                      {/* OPTION ICON */}

                      <div
                        className={`
                          mx-auto
                          flex
                          h-10
                          w-10
                          items-center
                          justify-center
                          rounded-lg

                          ${
                            option.accent ===
                            "terracotta"

                              ? "bg-[#F1E1D2] text-[#A85C3A]"

                              : option.accent ===
                                "blue"

                              ? "bg-[#E8EAF1] text-[#4C598B]"

                              : "bg-[#E7EFE4] text-[#315C4D]"
                          }
                        `}
                      >

                        <Icon
                          size={21}
                          strokeWidth={1.8}
                        />

                      </div>


                      {/* OPTION TITLE */}

                      <p
                        className="
                          mt-3
                          font-serif
                          text-[14px]
                          font-semibold
                          text-[#263F36]
                        "
                      >

                        {option.title}

                      </p>


                      {/* OPTION DESCRIPTION */}

                      <p
                        className="
                          mt-1
                          text-[9px]
                          leading-4
                          text-[#68776F]
                        "
                      >

                        {option.description}

                      </p>


                      {/* SELECTED CHECK */}

                      {selected && (

                        <span
                          className="
                            absolute
                            right-3
                            top-3
                            flex
                            h-4
                            w-4
                            items-center
                            justify-center
                            rounded-full
                            bg-[#315C4D]
                            text-white
                          "
                        >

                          <Check
                            size={10}
                          />

                        </span>

                      )}

                    </button>

                  );

                }
              )}

            </div>


            {/* ============================================================= */}
            {/* LOWER CONTENT                                                  */}
            {/* ============================================================= */}

            <div
              className="
                mt-5
                grid
                gap-5
                md:grid-cols-[1.35fr_0.85fr]
              "
            >


              {/* =========================================================== */}
              {/* INPUT AREA                                                   */}
              {/* =========================================================== */}

              <div
                className="
                  rounded-lg
                  border
                  border-[#DDD4C4]
                  bg-[#F9F6EE]
                  p-5
                "
              >


                {/* EXISTING PATIENT */}

                {patientType ===
                  "existing" && (

                  <>

                    <label
                      className="
                        block
                        text-[10px]
                        font-semibold
                        text-[#4F625A]
                      "
                    >

                      {copy.hospitalUhid}

                      <span
                        className="
                          ml-1
                          font-normal
                          text-[#89918D]
                        "
                      >

                        ({copy.optional})

                      </span>

                    </label>


                    <input
                      value={uhid}
                      onChange={(e) =>
                        setUhid(
                          e.target.value
                        )
                      }
                      placeholder={
                        copy.enterUhid
                      }
                      className="
                        mt-2
                        h-11
                        w-full
                        rounded-lg
                        border
                        border-[#D5CCBC]
                        bg-white
                        px-4
                        text-sm
                        outline-none
                        transition
                        focus:border-[#315C4D]
                      "
                    />


                    <p
                      className="
                        mt-4
                        text-[9px]
                        leading-4
                        text-[#7A837E]
                      "
                    >

                      {
                        copy.hospitalIdPreviousVisits
                      }

                    </p>

                  </>

                )}


                {/* ABHA */}

                {patientType ===
                  "abha" && (

                  <>

                    <label
                      className="
                        block
                        text-[10px]
                        font-semibold
                        text-[#4F625A]
                      "
                    >

                      {copy.abhaId}

                    </label>


                    <input
                      value={abha}
                      onChange={(e) =>
                        setAbha(
                          e.target.value
                        )
                      }
                      placeholder={
                        copy.enterAbhaId
                      }
                      className="
                        mt-2
                        h-11
                        w-full
                        rounded-lg
                        border
                        border-[#D5CCBC]
                        bg-white
                        px-4
                        text-sm
                        outline-none
                        transition
                        focus:border-[#315C4D]
                      "
                    />


                    <p
                      className="
                        mt-4
                        text-[9px]
                        leading-4
                        text-[#7A837E]
                      "
                    >

                      {
                        copy.abhaLinkExplanation
                      }

                    </p>

                  </>

                )}


                {/* AADHAAR */}

                {patientType ===
                  "aadhaar" && (

                  <>

                    <label
                      className="
                        block
                        text-[10px]
                        font-semibold
                        text-[#4F625A]
                      "
                    >

                      {copy.aadhaarNumber}

                      <span
                        className="
                          ml-1
                          font-normal
                          text-[#89918D]
                        "
                      >

                        ({copy.optional})

                      </span>

                    </label>


                    {/* NO FINGERPRINT ICON IN INPUT */}

                    <input
                      value={aadhaar}
                      onChange={(e) =>
                        setAadhaar(
                          e.target.value
                            .replace(
                              /\D/g,
                              ""
                            )
                            .slice(
                              0,
                              12
                            )
                        )
                      }
                      placeholder={
                        copy.enterAadhaar
                      }
                      className="
                        mt-2
                        h-11
                        w-full
                        rounded-lg
                        border
                        border-[#D5CCBC]
                        bg-white
                        px-4
                        text-sm
                        outline-none
                        transition
                        focus:border-[#315C4D]
                      "
                    />


                    <p
                      className="
                        mt-4
                        text-[9px]
                        leading-4
                        text-[#7A837E]
                      "
                    >

                      {
                        copy.aadhaarOptionalExplanation
                      }

                    </p>

                  </>

                )}


                {/* NEW PATIENT */}

                {patientType ===
                  "new" && (

                  <div
                    className="
                      flex
                      min-h-[125px]
                      items-center
                    "
                  >

                    <div>

                      <p
                        className="
                          font-serif
                          text-[18px]
                          font-semibold
                          text-[#173F35]
                        "
                      >

                        {
                          copy.welcomeToMediKiosk
                        }

                      </p>


                      <p
                        className="
                          mt-2
                          max-w-lg
                          text-[11px]
                          leading-5
                          text-[#68776F]
                        "
                      >

                        {
                          copy.newPatientRegistrationExplanation
                        }

                      </p>

                    </div>

                  </div>

                )}

              </div>


              {/* =========================================================== */}
              {/* WHY COLLECT INFORMATION                                     */}
              {/* =========================================================== */}

              <div
                className="
                  rounded-lg
                  border
                  border-[#D5DDD0]
                  bg-[#E7EFE4]
                  p-5
                "
              >

                <div
                  className="
                    flex
                    items-center
                    gap-2
                  "
                >

                  <div
                    className="
                      flex
                      h-7
                      w-7
                      items-center
                      justify-center
                      rounded-full
                      bg-[#315C4D]
                      text-white
                    "
                  >

                    <span
                      className="
                        text-xs
                        font-bold
                      "
                    >
                      ?
                    </span>

                  </div>


                  <h2
                    className="
                      font-serif
                      text-[16px]
                      font-semibold
                      text-[#173F35]
                    "
                  >

                    {copy.whyCollectThis}

                  </h2>

                </div>


                <div
                  className="
                    mt-5
                    space-y-3
                  "
                >

                  {[
                    copy.forClinicalConsultation,
                    copy.secureAndConfidential,
                    copy.yourControlYourConsent,
                    copy.usedOnlyWithPermission,
                  ].map(
                    (text, index) => (

                    <div
                      key={index}
                      className="
                        flex
                        items-center
                        gap-2
                      "
                    >

                      <Check
                        size={15}
                        className="
                          shrink-0
                          text-[#315C4D]
                        "
                      />


                      <span
                        className="
                          text-[10px]
                          text-[#4F625A]
                        "
                      >

                        {text}

                      </span>

                    </div>

                  ))}

                </div>

              </div>

            </div>


            {/* ============================================================= */}
            {/* CONTINUE                                                       */}
            {/* ============================================================= */}

            <div
              className="
                mt-5
                flex
                justify-end
              "
            >

              <button
                type="button"
                onClick={
                  handleContinue
                }
                disabled={
                  !canContinue
                }
                className={`
                  flex
                  items-center
                  gap-2
                  rounded-lg
                  px-7
                  py-3
                  text-[12px]
                  font-semibold
                  transition

                  ${
                    canContinue

                      ? "bg-[#173F35] text-white hover:bg-[#234F43]"

                      : "cursor-not-allowed bg-[#D7D0C2] text-[#8B918D]"
                  }
                `}
              >

                {copy.continue}

                <ArrowRight
                  size={16}
                />

              </button>

            </div>

          </main>


          {/* =============================================================== */}
          {/* DECORATIVE LEAVES                                               */}
          {/* =============================================================== */}

          <div
            className="
              pointer-events-none
              absolute
              bottom-[-25px]
              left-[-10px]
              h-28
              w-20
              rotate-[-25deg]
              rounded-[100%_0_100%_0]
              bg-[#DCE3D5]
              opacity-60
            "
          />


          <div
            className="
              pointer-events-none
              absolute
              bottom-[-25px]
              right-[-5px]
              h-32
              w-20
              rotate-[28deg]
              rounded-[100%_0_100%_0]
              bg-[#C4D0BF]
              opacity-60
            "
          />

        </div>

      </div>

    </KioskLayout>
  );
}