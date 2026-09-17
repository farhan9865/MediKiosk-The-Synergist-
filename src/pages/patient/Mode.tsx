import { useEffect, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Keyboard,
  MessageCircle,
  Mic,
  Volume2,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import { usePatientStore } from "../../store/patientStore";

import {
  speakText,
  stopSpeaking,
} from "../../services/speech/speech";

/* ========================================================================= */
/* TYPES                                                                     */
/* ========================================================================= */

type InteractionMode =
  | "voice-to-voice"
  | "voice-to-text"
  | "text-to-voice"
  | "text-to-text";

type LanguageCode =
  | "en"
  | "hi"
  | "mr"
  | "kok"
  | "sa"
  | "sd"
  | "as"
  | "bn"
  | "brx"
  | "doi"
  | "gu"
  | "kn"
  | "ks"
  | "mai"
  | "ml"
  | "mni"
  | "ne"
  | "or"
  | "pa"
  | "sat"
  | "ta"
  | "te"
  | "ur";

type ModeTranslation = {
  title: string;
  description: string;
  actionText: string;
};

type PageTranslation = {
  tagline: string;
  eyebrow: string;
  title: string;
  subtitle: string;

  voiceToVoice: ModeTranslation;
  voiceToText: ModeTranslation;
  textToVoice: ModeTranslation;
  textToText: ModeTranslation;

  selectedMode: string;
  continueText: string;
  recommended: string;
  recommendation: string;

  back: string;
  help: string;
};

/* ========================================================================= */
/* MODE IDS                                                                  */
/* ========================================================================= */

const modeIds: InteractionMode[] = [
  "voice-to-voice",
  "voice-to-text",
  "text-to-voice",
  "text-to-text",
];

/* ========================================================================= */
/* ICONS                                                                     */
/* ========================================================================= */

const modeIcons: Record<
  InteractionMode,
  typeof Mic
> = {
  "voice-to-voice": Mic,
  "voice-to-text": Volume2,
  "text-to-voice": MessageCircle,
  "text-to-text": Keyboard,
};

/* ========================================================================= */
/* SPEECH LANGUAGE MAP                                                       */
/* ========================================================================= */

const speechLanguageMap: Record<
  LanguageCode,
  string
> = {
  en: "en-IN",
  hi: "hi-IN",
  mr: "mr-IN",
  kok: "kok-IN",
  sa: "sa-IN",
  sd: "sd-IN",
  as: "as-IN",
  bn: "bn-IN",
  brx: "brx-IN",
  doi: "doi-IN",
  gu: "gu-IN",
  kn: "kn-IN",
  ks: "ks-IN",
  mai: "mai-IN",
  ml: "ml-IN",
  mni: "mni-IN",
  ne: "ne-IN",
  or: "or-IN",
  pa: "pa-IN",
  sat: "sat-IN",
  ta: "ta-IN",
  te: "te-IN",
  ur: "ur-IN",
};

/* ========================================================================= */
/* TRANSLATIONS                                                              */
/* ========================================================================= */

const pageTranslations: Record<
  LanguageCode,
  PageTranslation
> = {
  /* ======================================================================= */
  /* ENGLISH                                                                 */
  /* ======================================================================= */

  en: {
    tagline:
      "AI-Powered Ayurveda Clinical History Platform",

    eyebrow:
      "INTERACTION PREFERENCE",

    title:
      "How would you like to continue?",

    subtitle:
      "Choose the way that feels most comfortable.",

    voiceToVoice: {
      title: "Voice to Voice",
      description:
        "Speak naturally with MediKiosk and listen to questions through audio.",
      actionText:
        "Speak naturally",
    },

    voiceToText: {
      title: "Voice to Text",
      description:
        "Speak your answers while MediKiosk converts them into text.",
      actionText:
        "Speak naturally",
    },

    textToVoice: {
      title: "Text to Voice",
      description:
        "Read questions on screen and listen to them through audio.",
      actionText:
        "Tap and listen",
    },

    textToText: {
      title: "Text to Text",
      description:
        "Read questions and type your answers on screen.",
      actionText:
        "Tap and read",
    },

    selectedMode:
      "SELECTED MODE",

    continueText:
      "Continue",

    recommended:
      "Recommended:",

    recommendation:
      "Voice to Voice for a natural, conversational experience.",

    back:
      "Back",

    help:
      "Help",
  },

  /* ======================================================================= */
  /* HINDI                                                                   */
  /* ======================================================================= */

  hi: {
    tagline:
      "AI-संचालित आयुर्वेद क्लिनिकल हिस्ट्री प्लेटफ़ॉर्म",

    eyebrow:
      "इंटरैक्शन की पसंद",

    title:
      "आप कैसे आगे बढ़ना चाहेंगे?",

    subtitle:
      "वह तरीका चुनें जो आपको सबसे सुविधाजनक लगे।",

    voiceToVoice: {
      title: "वॉइस से वॉइस",
      description:
        "MediKiosk के साथ स्वाभाविक रूप से बात करें और प्रश्न ऑडियो में सुनें।",
      actionText:
        "स्वाभाविक रूप से बोलें",
    },

    voiceToText: {
      title: "वॉइस से टेक्स्ट",
      description:
        "अपने उत्तर बोलें और MediKiosk उन्हें टेक्स्ट में बदल देगा।",
      actionText:
        "बोलकर उत्तर दें",
    },

    textToVoice: {
      title: "टेक्स्ट से वॉइस",
      description:
        "स्क्रीन पर प्रश्न पढ़ें और उन्हें ऑडियो में सुनें।",
      actionText:
        "टैप करके सुनें",
    },

    textToText: {
      title: "टेक्स्ट से टेक्स्ट",
      description:
        "प्रश्न पढ़ें और स्क्रीन पर अपने उत्तर टाइप करें।",
      actionText:
        "टैप करके लिखें",
    },

    selectedMode:
      "चयनित मोड",

    continueText:
      "जारी रखें",

    recommended:
      "अनुशंसित:",

    recommendation:
      "स्वाभाविक बातचीत के अनुभव के लिए वॉइस से वॉइस।",

    back:
      "वापस",

    help:
      "मदद",
  },

  /* ======================================================================= */
  /* MARATHI                                                                 */
  /* ======================================================================= */

  mr: {
    tagline:
      "AI-सक्षम आयुर्वेद क्लिनिकल हिस्टरी प्लॅटफॉर्म",

    eyebrow:
      "संवादाची पसंती",

    title:
      "तुम्हाला पुढे कसे जायचे आहे?",

    subtitle:
      "तुम्हाला सर्वात सोयीस्कर वाटणारी पद्धत निवडा.",

    voiceToVoice: {
      title: "व्हॉइस ते व्हॉइस",
      description:
        "MediKiosk सोबत नैसर्गिकरित्या बोला आणि प्रश्न ऑडिओमधून ऐका.",
      actionText:
        "नैसर्गिकरित्या बोला",
    },

    voiceToText: {
      title: "व्हॉइस ते टेक्स्ट",
      description:
        "तुमची उत्तरे बोला आणि MediKiosk ती मजकुरात बदलेल.",
      actionText:
        "बोलून उत्तर द्या",
    },

    textToVoice: {
      title: "टेक्स्ट ते व्हॉइस",
      description:
        "स्क्रीनवरील प्रश्न वाचा आणि ते ऑडिओमधून ऐका.",
      actionText:
        "टॅप करून ऐका",
    },

    textToText: {
      title: "टेक्स्ट ते टेक्स्ट",
      description:
        "प्रश्न वाचा आणि स्क्रीनवर तुमची उत्तरे टाइप करा.",
      actionText:
        "टॅप करून टाइप करा",
    },

    selectedMode:
      "निवडलेली पद्धत",

    continueText:
      "पुढे जा",

    recommended:
      "शिफारस:",

    recommendation:
      "नैसर्गिक संवादाच्या अनुभवासाठी व्हॉइस ते व्हॉइस.",

    back:
      "मागे",

    help:
      "मदत",
  },

  /* ======================================================================= */
  /* KONKANI                                                                 */
  /* ======================================================================= */

  kok: {
    tagline:
      "AI-आधारीत आयुर्वेद क्लिनिकल हिस्टरी प्लॅटफॉर्म",

    eyebrow:
      "संवादाची पसंती",

    title:
      "तुमका फुडें कशें वचपाक जाय?",

    subtitle:
      "तुमका सोयीची दिसता ती पद्धत निवडात.",

    voiceToVoice: {
      title: "आवाज ते आवाज",
      description:
        "MediKiosk कडेन नैसर्गिक रितीन उलोवात आनी प्रश्न आवाजान आयकात.",
      actionText:
        "नैसर्गिक रितीन उलोवात",
    },

    voiceToText: {
      title: "आवाज ते मजकूर",
      description:
        "तुमची उत्तरां उलोवात आनी MediKiosk ती मजकुरांत बदलता.",
      actionText:
        "उलोवन उत्तर दियात",
    },

    textToVoice: {
      title: "मजकूर ते आवाज",
      description:
        "पडद्यावयले प्रश्न वाचात आनी आवाजान आयकात.",
      actionText:
        "टॅप करून आयकात",
    },

    textToText: {
      title: "मजकूर ते मजकूर",
      description:
        "प्रश्न वाचात आनी पडद्यावयर उत्तरां टायप करात.",
      actionText:
        "टॅप करून टायप करात",
    },

    selectedMode:
      "निवडिल्ली पद्धत",

    continueText:
      "फुडें वचात",

    recommended:
      "शिफारस:",

    recommendation:
      "नैसर्गिक संवादाक लागीं आवाज ते आवाज.",

    back:
      "फाटीं",

    help:
      "मदत",
  },

  /* ======================================================================= */
  /* SANSKRIT                                                                */
  /* ======================================================================= */

  sa: {
    tagline:
      "AI-सञ्चालित आयुर्वेद-चिकित्सकीय-इतिहास-मञ्चम्",

    eyebrow:
      "संवाद-विकल्पः",

    title:
      "भवान् कथम् अग्रे गन्तुम् इच्छति?",

    subtitle:
      "भवते यत् सुविधाजनकं तत् माध्यमं चिनुत।",

    voiceToVoice: {
      title: "स्वरात् स्वम्",
      description:
        "MediKiosk इत्यनेन सह स्वाभाविकतया सम्भाषणं कुरुत तथा प्रश्नान् ध्वनिरूपेण शृणुत।",
      actionText:
        "स्वाभाविकतया वदतु",
    },

    voiceToText: {
      title: "स्वरात् पाठः",
      description:
        "स्वउत्तराणि वदतु, MediKiosk तानि पाठरूपेण परिवर्तयिष्यति।",
      actionText:
        "वदित्वा उत्तरं ददातु",
    },

    textToVoice: {
      title: "पाठात् स्वरः",
      description:
        "पटले प्रश्नान् पठित्वा तान् ध्वनिरूपेण शृणुत।",
      actionText:
        "स्पृष्ट्वा शृणुत",
    },

    textToText: {
      title: "पाठात् पाठः",
      description:
        "प्रश्नान् पठित्वा पटले उत्तराणि लिखत।",
      actionText:
        "स्पृष्ट्वा लिखत",
    },

    selectedMode:
      "चयनितं माध्यमम्",

    continueText:
      "अग्रे गच्छतु",

    recommended:
      "अनुशंसितम्:",

    recommendation:
      "स्वाभाविक-संवादानुभवाय स्वरात् स्वरम्।",

    back:
      "पृष्ठतः",

    help:
      "सहायता",
  },

  /* ======================================================================= */
  /* SINDHI                                                                  */
  /* ======================================================================= */

  sd: {
    tagline:
      "AI تي ٻڌل آيورويڊا ڪلينڪل هسٽري پليٽ فارم",

    eyebrow:
      "ڳالهائڻ جي ترجيح",

    title:
      "توهان ڪيئن اڳتي وڌڻ چاهيو ٿا؟",

    subtitle:
      "اهو طريقو چونڊيو جيڪو توهان لاءِ وڌيڪ آسان هجي.",

    voiceToVoice: {
      title: "آواز کان آواز",
      description:
        "MediKiosk سان قدرتي نموني ڳالهايو ۽ سوال آواز ۾ ٻڌو.",
      actionText:
        "قدرتي نموني ڳالهايو",
    },

    voiceToText: {
      title: "آواز کان متن",
      description:
        "پنهنجا جواب ڳالهايو ۽ MediKiosk انهن کي متن ۾ تبديل ڪندو.",
      actionText:
        "ڳالهائي جواب ڏيو",
    },

    textToVoice: {
      title: "متن کان آواز",
      description:
        "اسڪرين تي سوال پڙهو ۽ انهن کي آواز ۾ ٻڌو.",
      actionText:
        "دٻائي ٻڌو",
    },

    textToText: {
      title: "متن کان متن",
      description:
        "سوال پڙهو ۽ اسڪرين تي پنهنجا جواب لکو.",
      actionText:
        "دٻائي لکو",
    },

    selectedMode:
      "چونڊيل طريقو",

    continueText:
      "اڳتي وڌو",

    recommended:
      "تجويز ڪيل:",

    recommendation:
      "قدرتي گفتگو لاءِ آواز کان آواز.",

    back:
      "واپس",

    help:
      "مدد",
  },

  /* ======================================================================= */
  /* ASSAMESE                                                                */
  /* ======================================================================= */

  as: {
    tagline:
      "AI-চালিত আয়ুৰ্বেদ ক্লিনিকেল হিষ্টৰী প্লেটফৰ্ম",

    eyebrow:
      "যোগাযোগৰ পছন্দ",

    title:
      "আপুনি কেনেকৈ আগবাঢ়িব বিচাৰে?",

    subtitle:
      "আপোনাৰ বাবে সুবিধাজনক পদ্ধতিটো বাছনি কৰক।",

    voiceToVoice: {
      title: "ভইচ টু ভইচ",
      description:
        "MediKiosk ৰ সৈতে স্বাভাৱিকভাৱে কথা পাতক আৰু প্ৰশ্নসমূহ অডিঅ'ত শুনক।",
      actionText:
        "স্বাভাৱিকভাৱে কথা পাতক",
    },

    voiceToText: {
      title: "ভইচ টু টেক্সট",
      description:
        "আপোনাৰ উত্তৰ কওক আৰু MediKiosk এ সেইবোৰ লিখিত ৰূপলৈ সলনি কৰিব।",
      actionText:
        "কথা কৈ উত্তৰ দিয়ক",
    },

    textToVoice: {
      title: "টেক্সট টু ভইচ",
      description:
        "পৰ্দাত প্ৰশ্নটো পঢ়ক আৰু অডিঅ'ৰ জৰিয়তে শুনক।",
      actionText:
        "টেপ কৰি শুনক",
    },

    textToText: {
      title: "টেক্সট টু টেক্সট",
      description:
        "প্ৰশ্নটো পঢ়ক আৰু পৰ্দাত আপোনাৰ উত্তৰ লিখক।",
      actionText:
        "টেপ কৰি লিখক",
    },

    selectedMode:
      "নিৰ্বাচিত পদ্ধতি",

    continueText:
      "আগবাঢ়ক",

    recommended:
      "পৰামৰ্শিত:",

    recommendation:
      "স্বাভাৱিক কথোপকথনৰ বাবে ভইচ টু ভইচ।",

    back:
      "পিছলৈ",

    help:
      "সহায়",
  },

  /* ======================================================================= */
  /* BENGALI                                                                 */
  /* ======================================================================= */

  bn: {
    tagline:
      "AI-চালিত আয়ুর্বেদ ক্লিনিক্যাল হিস্ট্রি প্ল্যাটফর্ম",

    eyebrow:
      "যোগাযোগের পছন্দ",

    title:
      "আপনি কীভাবে এগিয়ে যেতে চান?",

    subtitle:
      "আপনার জন্য সবচেয়ে স্বাচ্ছন্দ্যপূর্ণ পদ্ধতিটি বেছে নিন।",

    voiceToVoice: {
      title: "ভয়েস থেকে ভয়েস",
      description:
        "MediKiosk-এর সঙ্গে স্বাভাবিকভাবে কথা বলুন এবং অডিওতে প্রশ্ন শুনুন।",
      actionText:
        "স্বাভাবিকভাবে বলুন",
    },

    voiceToText: {
      title: "ভয়েস থেকে টেক্সট",
      description:
        "আপনার উত্তর বলুন এবং MediKiosk সেগুলো টেক্সটে রূপান্তর করবে।",
      actionText:
        "কথা বলে উত্তর দিন",
    },

    textToVoice: {
      title: "টেক্সট থেকে ভয়েস",
      description:
        "স্ক্রিনে প্রশ্ন পড়ুন এবং অডিওতে শুনুন।",
      actionText:
        "ট্যাপ করে শুনুন",
    },

    textToText: {
      title: "টেক্সট থেকে টেক্সট",
      description:
        "প্রশ্ন পড়ুন এবং স্ক্রিনে আপনার উত্তর লিখুন।",
      actionText:
        "ট্যাপ করে লিখুন",
    },

    selectedMode:
      "নির্বাচিত পদ্ধতি",

    continueText:
      "চালিয়ে যান",

    recommended:
      "প্রস্তাবিত:",

    recommendation:
      "স্বাভাবিক কথোপকথনের জন্য ভয়েস থেকে ভয়েস।",

    back:
      "পিছনে",

    help:
      "সাহায্য",
  },

  /* ======================================================================= */
  /* BODO                                                                    */
  /* ======================================================================= */

  brx: {
    tagline:
      "AI-जों आयुर्वेद क्लिनिकल हिस्ट्री प्लेटफर्म",

    eyebrow:
      "बाथ्रा होनायनि बासिखनाय",

    title:
      "नों माबोरै आगोलाव जाबायनो सानो?",

    subtitle:
      "नोंनो जोंमनाय जाथायखौ बासिख।",

    voiceToVoice: {
      title: "रावजों राव",
      description:
        "MediKiosk जों सोलोंगै रावजों बाथ्रा हो आरो सवालखौ रावजों खोनो।",
      actionText:
        "सोलोंगै बाथ्रा हो",
    },

    voiceToText: {
      title: "रावजों फराय",
      description:
        "नोंनि फिनबायखौ रावजों हो आरो MediKiosk बेखौ फरायाव सोलायगोन।",
      actionText:
        "रावजों फिन हो",
    },

    textToVoice: {
      title: "फरायजों राव",
      description:
        "स्क्रीनआव सवाल फराय आरो रावजों खोनो।",
      actionText:
        "टैप खालाम आरो खोनो",
    },

    textToText: {
      title: "फरायजों फराय",
      description:
        "सवाल फराय आरो स्क्रीनआव फिनबाय टाइप खालाम।",
      actionText:
        "टैप खालाम आरो टाइप खालाम",
    },

    selectedMode:
      "बासिखानाय जाथाय",

    continueText:
      "आगोलाव जाबाय",

    recommended:
      "सिफारिस:",

    recommendation:
      "सोलोंगै संवादनि थाखाय रावजों राव।",

    back:
      "फिन",

    help:
      "मदद",
  },

  /* ======================================================================= */
  /* DOGRI                                                                   */
  /* ======================================================================= */

  doi: {
    tagline:
      "AI-आधारित आयुर्वेद क्लिनिकल हिस्ट्री प्लेटफॉर्म",

    eyebrow:
      "संवाद दी पसंद",

    title:
      "तुसें अग्गें कियां बधना चाहंदे ओ?",

    subtitle:
      "ओह तरीका चुनो जेहड़ा तुंदे लेई सबतों आसान ऐ।",

    voiceToVoice: {
      title: "आवाज थमां आवाज",
      description:
        "MediKiosk कन्नै सहज तरीके कन्नै गल्ल करो ते सवाल आवाज च सुनो।",
      actionText:
        "सहज तरीके कन्नै बोलो",
    },

    voiceToText: {
      title: "आवाज थमां लिखत",
      description:
        "अपने जवाब बोलो ते MediKiosk उनें गी लिखत च बदलू।",
      actionText:
        "बोलियै जवाब देओ",
    },

    textToVoice: {
      title: "लिखत थमां आवाज",
      description:
        "स्क्रीन पर सवाल पढ़ो ते आवाज च सुनो।",
      actionText:
        "टैप करियै सुनो",
    },

    textToText: {
      title: "लिखत थमां लिखत",
      description:
        "सवाल पढ़ो ते स्क्रीन पर अपने जवाब टाइप करो।",
      actionText:
        "टैप करियै टाइप करो",
    },

    selectedMode:
      "चुनिंदा तरीका",

    continueText:
      "अग्गें जाओ",

    recommended:
      "सिफारश:",

    recommendation:
      "सहज बातचीत दे अनुभव लेई आवाज थमां आवाज।",

    back:
      "पिछें",

    help:
      "मदद",
  },

  /* ======================================================================= */
  /* GUJARATI                                                                */
  /* ======================================================================= */

  gu: {
    tagline:
      "AI-સંચાલિત આયુર્વેદ ક્લિનિકલ હિસ્ટ્રી પ્લેટફોર્મ",

    eyebrow:
      "ઇન્ટરેક્શન પસંદગી",

    title:
      "તમે કેવી રીતે આગળ વધવા માંગો છો?",

    subtitle:
      "તમારા માટે સૌથી આરામદાયક લાગે તે રીત પસંદ કરો.",

    voiceToVoice: {
      title: "અવાજથી અવાજ",
      description:
        "MediKiosk સાથે કુદરતી રીતે વાત કરો અને પ્રશ્નો ઓડિયોમાં સાંભળો.",
      actionText:
        "કુદરતી રીતે બોલો",
    },

    voiceToText: {
      title: "અવાજથી ટેક્સ્ટ",
      description:
        "તમારા જવાબો બોલો અને MediKiosk તેમને ટેક્સ્ટમાં ફેરવશે.",
      actionText:
        "બોલીને જવાબ આપો",
    },

    textToVoice: {
      title: "ટેક્સ્ટથી અવાજ",
      description:
        "સ્ક્રીન પર પ્રશ્નો વાંચો અને તેમને ઓડિયોમાં સાંભળો.",
      actionText:
        "ટેપ કરીને સાંભળો",
    },

    textToText: {
      title: "ટેક્સ્ટથી ટેક્સ્ટ",
      description:
        "પ્રશ્નો વાંચો અને સ્ક્રીન પર તમારા જવાબો ટાઇપ કરો.",
      actionText:
        "ટેપ કરીને ટાઇપ કરો",
    },

    selectedMode:
      "પસંદ કરેલ મોડ",

    continueText:
      "આગળ વધો",

    recommended:
      "ભલામણ:",

    recommendation:
      "કુદરતી વાતચીતના અનુભવ માટે અવાજથી અવાજ.",

    back:
      "પાછળ",

    help:
      "મદદ",
  },

  /* ======================================================================= */
  /* KANNADA                                                                 */
  /* ======================================================================= */

  kn: {
    tagline:
      "AI-ಚಾಲಿತ ಆಯುರ್ವೇದ ಕ್ಲಿನಿಕಲ್ ಹಿಸ್ಟರಿ ಪ್ಲಾಟ್‌ಫಾರ್ಮ್",

    eyebrow:
      "ಸಂವಹನದ ಆಯ್ಕೆ",

    title:
      "ನೀವು ಹೇಗೆ ಮುಂದುವರಿಯಲು ಬಯಸುತ್ತೀರಿ?",

    subtitle:
      "ನಿಮಗೆ ಹೆಚ್ಚು ಆರಾಮದಾಯಕವಾದ ವಿಧಾನವನ್ನು ಆಯ್ಕೆಮಾಡಿ.",

    voiceToVoice: {
      title: "ಧ್ವನಿಯಿಂದ ಧ್ವನಿಗೆ",
      description:
        "MediKiosk ಜೊತೆ ಸಹಜವಾಗಿ ಮಾತನಾಡಿ ಮತ್ತು ಪ್ರಶ್ನೆಗಳನ್ನು ಧ್ವನಿಯಲ್ಲಿ ಕೇಳಿ.",
      actionText:
        "ಸಹಜವಾಗಿ ಮಾತನಾಡಿ",
    },

    voiceToText: {
      title: "ಧ್ವನಿಯಿಂದ ಪಠ್ಯಕ್ಕೆ",
      description:
        "ನಿಮ್ಮ ಉತ್ತರಗಳನ್ನು ಮಾತನಾಡಿ ಮತ್ತು MediKiosk ಅವುಗಳನ್ನು ಪಠ್ಯಕ್ಕೆ ಪರಿವರ್ತಿಸುತ್ತದೆ.",
      actionText:
        "ಮಾತನಾಡಿ ಉತ್ತರಿಸಿ",
    },

    textToVoice: {
      title: "ಪಠ್ಯದಿಂದ ಧ್ವನಿಗೆ",
      description:
        "ಪರದೆಯಲ್ಲಿರುವ ಪ್ರಶ್ನೆಗಳನ್ನು ಓದಿ ಮತ್ತು ಧ್ವನಿಯಲ್ಲಿ ಕೇಳಿ.",
      actionText:
        "ಟ್ಯಾಪ್ ಮಾಡಿ ಕೇಳಿ",
    },

    textToText: {
      title: "ಪಠ್ಯದಿಂದ ಪಠ್ಯಕ್ಕೆ",
      description:
        "ಪ್ರಶ್ನೆಗಳನ್ನು ಓದಿ ಮತ್ತು ಪರದೆಯಲ್ಲಿ ನಿಮ್ಮ ಉತ್ತರಗಳನ್ನು ಟೈಪ್ ಮಾಡಿ.",
      actionText:
        "ಟ್ಯಾಪ್ ಮಾಡಿ ಟೈಪ್ ಮಾಡಿ",
    },

    selectedMode:
      "ಆಯ್ಕೆ ಮಾಡಿದ ವಿಧಾನ",

    continueText:
      "ಮುಂದುವರಿಸಿ",

    recommended:
      "ಶಿಫಾರಸು:",

    recommendation:
      "ಸಹಜ ಸಂಭಾಷಣೆಯ ಅನುಭವಕ್ಕಾಗಿ ಧ್ವನಿಯಿಂದ ಧ್ವನಿಗೆ.",

    back:
      "ಹಿಂದೆ",

    help:
      "ಸಹಾಯ",
  },

  /* ======================================================================= */
  /* KASHMIRI                                                                */
  /* ======================================================================= */

  ks: {
    tagline:
      "AI-سۭتۍ چلٲوِتھ آیورویدا کلینیکل ہسٹری پلیٹ فارم",

    eyebrow:
      "رابطہ ہُنٛد انتخاب",

    title:
      "تُہۍ کَتھ پٲٹھۍ پَگاہ گژھِو؟",

    subtitle:
      "تُہندِ خٲطرٕ آسان طریقہ ژٕرِو۔",

    voiceToVoice: {
      title: "آواز سۭتۍ آواز",
      description:
        "MediKiosk سۭتۍ قدرتی پٲٹھۍ گژھِو تہ سوال آوازس منز بوزِو۔",
      actionText:
        "قدرتی پٲٹھۍ وٲنِو",
    },

    voiceToText: {
      title: "آواز سۭتۍ متن",
      description:
        "پنُن جواب وٲنِو تہ MediKiosk تِم متنَس منز تبدیل کرِ۔",
      actionText:
        "وٲنِتھ جواب دِو",
    },

    textToVoice: {
      title: "متن سۭتۍ آواز",
      description:
        "سکرین پٮ۪ٹھ سوال پرِو تہ آوازس منز بوزِو۔",
      actionText:
        "ٹَیپ کرِتھ بوزِو",
    },

    textToText: {
      title: "متن سۭتۍ متن",
      description:
        "سوال پرِو تہ سکرین پٮ۪ٹھ جواب ٹائپ کرِو۔",
      actionText:
        "ٹَیپ کرِتھ ٹائپ کرِو",
    },

    selectedMode:
      "ژٕرِمُت طریقہ",

    continueText:
      "پَگاہ گژھِو",

    recommended:
      "مشورہ:",

    recommendation:
      "قدرتی بات چیت خٲطرٕ آواز سۭتۍ آواز۔",

    back:
      "واپس",

    help:
      "مدد",
  },

  /* ======================================================================= */
  /* MAITHILI                                                                */
  /* ======================================================================= */

  mai: {
    tagline:
      "AI-संचालित आयुर्वेद क्लिनिकल हिस्ट्री प्लेटफॉर्म",

    eyebrow:
      "बातचीतक विकल्प",

    title:
      "अहाँ कोना आगाँ बढ़ऽ चाहैत छी?",

    subtitle:
      "जे तरीका अहाँ लेल बेसी सहज हो, से चुनू।",

    voiceToVoice: {
      title: "आवाज सँ आवाज",
      description:
        "MediKiosk सँ स्वाभाविक रूप सँ बात करू आ प्रश्न ऑडियो मे सुनू।",
      actionText:
        "स्वाभाविक रूप सँ बाजू",
    },

    voiceToText: {
      title: "आवाज सँ टेक्स्ट",
      description:
        "अपन उत्तर बाजू आ MediKiosk ओकरा टेक्स्ट मे बदलत।",
      actionText:
        "बाजि कऽ उत्तर दिअ",
    },

    textToVoice: {
      title: "टेक्स्ट सँ आवाज",
      description:
        "स्क्रीन पर प्रश्न पढ़ू आ ओकरा ऑडियो मे सुनू।",
      actionText:
        "टैप कऽ सुनू",
    },

    textToText: {
      title: "टेक्स्ट सँ टेक्स्ट",
      description:
        "प्रश्न पढ़ू आ स्क्रीन पर अपन उत्तर टाइप करू।",
      actionText:
        "टैप कऽ टाइप करू",
    },

    selectedMode:
      "चयनित तरीका",

    continueText:
      "आगाँ बढ़ू",

    recommended:
      "अनुशंसित:",

    recommendation:
      "स्वाभाविक बातचीतक अनुभव लेल आवाज सँ आवाज।",

    back:
      "पाछाँ",

    help:
      "मदद",
  },

  /* ======================================================================= */
  /* MALAYALAM                                                               */
  /* ======================================================================= */

  ml: {
    tagline:
      "AI-അധിഷ്ഠിത ആയുർവേദ ക്ലിനിക്കൽ ഹിസ്റ്ററി പ്ലാറ്റ്ഫോം",

    eyebrow:
      "സംവദിക്കാനുള്ള രീതി",

    title:
      "നിങ്ങൾ എങ്ങനെ തുടരാൻ ആഗ്രഹിക്കുന്നു?",

    subtitle:
      "നിങ്ങൾക്ക് ഏറ്റവും സൗകര്യപ്രദമായ രീതി തിരഞ്ഞെടുക്കുക.",

    voiceToVoice: {
      title: "ശബ്ദത്തിൽ നിന്ന് ശബ്ദത്തിലേക്ക്",
      description:
        "MediKiosk-നോട് സ്വാഭാവികമായി സംസാരിക്കുകയും ചോദ്യങ്ങൾ ഓഡിയോയിൽ കേൾക്കുകയും ചെയ്യുക.",
      actionText:
        "സ്വാഭാവികമായി സംസാരിക്കുക",
    },

    voiceToText: {
      title: "ശബ്ദത്തിൽ നിന്ന് ടെക്സ്റ്റിലേക്ക്",
      description:
        "നിങ്ങളുടെ ഉത്തരങ്ങൾ പറയുക, MediKiosk അവ ടെക്സ്റ്റാക്കി മാറ്റും.",
      actionText:
        "സംസാരിച്ച് ഉത്തരം നൽകുക",
    },

    textToVoice: {
      title: "ടെക്സ്റ്റിൽ നിന്ന് ശബ്ദത്തിലേക്ക്",
      description:
        "സ്ക്രീനിലെ ചോദ്യങ്ങൾ വായിക്കുകയും അവ ഓഡിയോയിൽ കേൾക്കുകയും ചെയ്യുക.",
      actionText:
        "ടാപ്പ് ചെയ്ത് കേൾക്കുക",
    },

    textToText: {
      title: "ടെക്സ്റ്റിൽ നിന്ന് ടെക്സ്റ്റിലേക്ക്",
      description:
        "ചോദ്യങ്ങൾ വായിച്ച് സ്ക്രീനിൽ നിങ്ങളുടെ ഉത്തരങ്ങൾ ടൈപ്പ് ചെയ്യുക.",
      actionText:
        "ടാപ്പ് ചെയ്ത് ടൈപ്പ് ചെയ്യുക",
    },

    selectedMode:
      "തിരഞ്ഞെടുത്ത രീതി",

    continueText:
      "തുടരുക",

    recommended:
      "ശുപാർശ:",

    recommendation:
      "സ്വാഭാവിക സംഭാഷണ അനുഭവത്തിനായി ശബ്ദത്തിൽ നിന്ന് ശബ്ദത്തിലേക്ക്.",

    back:
      "പിന്നിലേക്ക്",

    help:
      "സഹായം",
  },

  /* ======================================================================= */
  /* MANIPURI                                                                */
  /* ======================================================================= */

  mni: {
    tagline:
      "AI-গী মপাং অয়ুর্বেদা ক্লিনিকেল হিস্টরি প্লেটফর্ম",

    eyebrow:
      "ৱারী শিংগী মখা",

    title:
      "নাহাক্না করম্না মখা চৎপা পাম্বিব্রা?",

    subtitle:
      "নাহাক্না নুংঙাইবা মওং অমা খনবিয়ু।",

    voiceToVoice: {
      title: "ৱাইসদগী ৱাইস",
      description:
        "MediKiosk-গা নুংঙাইবা মওংদা ৱারী শেম্মু অমসুং প্রশ্নশিং অডিওদা তাম্মু।",
      actionText:
        "নুংঙাইবা মওংদা ৱারী শেম্মু",
    },

    voiceToText: {
      title: "ৱাইসদগী টেক্সট",
      description:
        "নাহাক্কী মফমশিং হায়বিয়ু অমসুং MediKiosk না মখোয়বু টেক্সটদা শেম্মি।",
      actionText:
        "হায়না মফম পীবিয়ু",
    },

    textToVoice: {
      title: "টেক্সটদগী ৱাইস",
      description:
        "স্ক্রীনদা প্রশ্নশিং পাউজেল অমসুং অডিওদা তাম্মু।",
      actionText:
        "টেপ তৌনা তাম্মু",
    },

    textToText: {
      title: "টেক্সটদগী টেক্সট",
      description:
        "প্রশ্নশিং পাউজেল অমসুং স্ক্রীনদা মফমশিং টাইপ তৌ।",
      actionText:
        "টেপ তৌনা টাইপ তৌ",
    },

    selectedMode:
      "খনগৎপা মওং",

    continueText:
      "মখা চৎপা",

    recommended:
      "শিংজিন্নবা:",

    recommendation:
      "নুংঙাইবা ৱারী অমগী থম্মাইদা ৱাইসদগী ৱাইস।",

    back:
      "মতুং",

    help:
      "মতেং",
  },

  /* ======================================================================= */
  /* NEPALI                                                                  */
  /* ======================================================================= */

  ne: {
    tagline:
      "AI-सञ्चालित आयुर्वेद क्लिनिकल हिस्ट्री प्लेटफर्म",

    eyebrow:
      "सम्पर्कको प्राथमिकता",

    title:
      "तपाईं कसरी अगाडि बढ्न चाहनुहुन्छ?",

    subtitle:
      "तपाईंलाई सहज लाग्ने तरिका छनोट गर्नुहोस्।",

    voiceToVoice: {
      title: "आवाजदेखि आवाज",
      description:
        "MediKiosk सँग स्वाभाविक रूपमा कुरा गर्नुहोस् र प्रश्नहरू अडियोमा सुन्नुहोस्।",
      actionText:
        "स्वाभाविक रूपमा बोल्नुहोस्",
    },

    voiceToText: {
      title: "आवाजदेखि पाठ",
      description:
        "आफ्ना उत्तरहरू बोल्नुहोस् र MediKiosk ले तिनलाई पाठमा बदल्नेछ।",
      actionText:
        "बोलेर उत्तर दिनुहोस्",
    },

    textToVoice: {
      title: "पाठदेखि आवाज",
      description:
        "स्क्रिनमा प्रश्न पढ्नुहोस् र तिनलाई अडियोमा सुन्नुहोस्।",
      actionText:
        "थिचेर सुन्नुहोस्",
    },

    textToText: {
      title: "पाठदेखि पाठ",
      description:
        "प्रश्न पढ्नुहोस् र स्क्रिनमा आफ्ना उत्तरहरू टाइप गर्नुहोस्।",
      actionText:
        "थिचेर टाइप गर्नुहोस्",
    },

    selectedMode:
      "छानिएको तरिका",

    continueText:
      "अगाडि बढ्नुहोस्",

    recommended:
      "सिफारिस:",

    recommendation:
      "स्वाभाविक कुराकानीको अनुभवका लागि आवाजदेखि आवाज।",

    back:
      "पछाडि",

    help:
      "मद्दत",
  },

  /* ======================================================================= */
  /* ODIA                                                                    */
  /* ======================================================================= */

  or: {
    tagline:
      "AI-ଚାଳିତ ଆୟୁର୍ବେଦ କ୍ଲିନିକାଲ ହିଷ୍ଟ୍ରି ପ୍ଲାଟଫର୍ମ",

    eyebrow:
      "ଯୋଗାଯୋଗ ପସନ୍ଦ",

    title:
      "ଆପଣ କିପରି ଆଗକୁ ବଢ଼ିବାକୁ ଚାହୁଁଛନ୍ତି?",

    subtitle:
      "ଆପଣଙ୍କ ପାଇଁ ସହଜ ଲାଗୁଥିବା ପଦ୍ଧତି ବାଛନ୍ତୁ।",

    voiceToVoice: {
      title: "ସ୍ୱରରୁ ସ୍ୱର",
      description:
        "MediKiosk ସହିତ ସ୍ୱାଭାବିକ ଭାବରେ କଥା ହୁଅନ୍ତୁ ଏବଂ ପ୍ରଶ୍ନଗୁଡ଼ିକୁ ଅଡିଓରେ ଶୁଣନ୍ତୁ।",
      actionText:
        "ସ୍ୱାଭାବିକ ଭାବରେ କୁହନ୍ତୁ",
    },

    voiceToText: {
      title: "ସ୍ୱରରୁ ଟେକ୍ସଟ୍",
      description:
        "ଆପଣଙ୍କ ଉତ୍ତର କୁହନ୍ତୁ ଏବଂ MediKiosk ସେଗୁଡ଼ିକୁ ଟେକ୍ସଟ୍‌ରେ ପରିବର୍ତ୍ତନ କରିବ।",
      actionText:
        "କହି ଉତ୍ତର ଦିଅନ୍ତୁ",
    },

    textToVoice: {
      title: "ଟେକ୍ସଟ୍‌ରୁ ସ୍ୱର",
      description:
        "ସ୍କ୍ରିନ୍‌ରେ ପ୍ରଶ୍ନ ପଢ଼ନ୍ତୁ ଏବଂ ଅଡିଓରେ ଶୁଣନ୍ତୁ।",
      actionText:
        "ଟ୍ୟାପ୍ କରି ଶୁଣନ୍ତୁ",
    },

    textToText: {
      title: "ଟେକ୍ସଟ୍‌ରୁ ଟେକ୍ସଟ୍",
      description:
        "ପ୍ରଶ୍ନ ପଢ଼ନ୍ତୁ ଏବଂ ସ୍କ୍ରିନ୍‌ରେ ଆପଣଙ୍କ ଉତ୍ତର ଟାଇପ୍ କରନ୍ତୁ।",
      actionText:
        "ଟ୍ୟାପ୍ କରି ଟାଇପ୍ କରନ୍ତୁ",
    },

    selectedMode:
      "ଚୟନିତ ପଦ୍ଧତି",

    continueText:
      "ଆଗକୁ ବଢ଼ନ୍ତୁ",

    recommended:
      "ସୁପାରିଶ:",

    recommendation:
      "ସ୍ୱାଭାବିକ କଥୋପକଥନ ପାଇଁ ସ୍ୱରରୁ ସ୍ୱର।",

    back:
      "ପଛକୁ",

    help:
      "ସହାୟତା",
  },

  /* ======================================================================= */
  /* PUNJABI                                                                 */
  /* ======================================================================= */

  pa: {
    tagline:
      "AI-ਅਧਾਰਿਤ ਆਯੁਰਵੇਦ ਕਲੀਨਿਕਲ ਹਿਸਟਰੀ ਪਲੇਟਫਾਰਮ",

    eyebrow:
      "ਗੱਲਬਾਤ ਦੀ ਪਸੰਦ",

    title:
      "ਤੁਸੀਂ ਕਿਵੇਂ ਅੱਗੇ ਵਧਣਾ ਚਾਹੁੰਦੇ ਹੋ?",

    subtitle:
      "ਉਹ ਤਰੀਕਾ ਚੁਣੋ ਜੋ ਤੁਹਾਨੂੰ ਸਭ ਤੋਂ ਆਰਾਮਦਾਇਕ ਲੱਗੇ।",

    voiceToVoice: {
      title: "ਆਵਾਜ਼ ਤੋਂ ਆਵਾਜ਼",
      description:
        "MediKiosk ਨਾਲ ਕੁਦਰਤੀ ਤਰੀਕੇ ਨਾਲ ਗੱਲ ਕਰੋ ਅਤੇ ਸਵਾਲ ਆਡੀਓ ਵਿੱਚ ਸੁਣੋ।",
      actionText:
        "ਕੁਦਰਤੀ ਤਰੀਕੇ ਨਾਲ ਬੋਲੋ",
    },

    voiceToText: {
      title: "ਆਵਾਜ਼ ਤੋਂ ਟੈਕਸਟ",
      description:
        "ਆਪਣੇ ਜਵਾਬ ਬੋਲੋ ਅਤੇ MediKiosk ਉਹਨਾਂ ਨੂੰ ਟੈਕਸਟ ਵਿੱਚ ਬਦਲੇਗਾ।",
      actionText:
        "ਬੋਲ ਕੇ ਜਵਾਬ ਦਿਓ",
    },

    textToVoice: {
      title: "ਟੈਕਸਟ ਤੋਂ ਆਵਾਜ਼",
      description:
        "ਸਕ੍ਰੀਨ ਉੱਤੇ ਸਵਾਲ ਪੜ੍ਹੋ ਅਤੇ ਉਨ੍ਹਾਂ ਨੂੰ ਆਡੀਓ ਵਿੱਚ ਸੁਣੋ।",
      actionText:
        "ਟੈਪ ਕਰਕੇ ਸੁਣੋ",
    },

    textToText: {
      title: "ਟੈਕਸਟ ਤੋਂ ਟੈਕਸਟ",
      description:
        "ਸਵਾਲ ਪੜ੍ਹੋ ਅਤੇ ਸਕ੍ਰੀਨ ਉੱਤੇ ਆਪਣੇ ਜਵਾਬ ਟਾਈਪ ਕਰੋ।",
      actionText:
        "ਟੈਪ ਕਰਕੇ ਟਾਈਪ ਕਰੋ",
    },

    selectedMode:
      "ਚੁਣਿਆ ਹੋਇਆ ਤਰੀਕਾ",

    continueText:
      "ਅੱਗੇ ਵਧੋ",

    recommended:
      "ਸਿਫਾਰਸ਼:",

    recommendation:
      "ਕੁਦਰਤੀ ਗੱਲਬਾਤ ਦੇ ਅਨੁਭਵ ਲਈ ਆਵਾਜ਼ ਤੋਂ ਆਵਾਜ਼।",

    back:
      "ਵਾਪਸ",

    help:
      "ਮਦਦ",
  },

  /* ======================================================================= */
  /* SANTALI                                                                 */
  /* ======================================================================= */

  sat: {
    tagline:
      "AI रे आयुर्वेद क्लिनिकल हिस्ट्री प्लेटफॉर्म",

    eyebrow:
      "बोलचाल रे पसंद",

    title:
      "आम दो चेत् लेका आगु सेनोक् मे?",

    subtitle:
      "आम रेयाक् लागित् सुबिधा आकोट बाछाव मे।",

    voiceToVoice: {
      title: "आवाज ते आवाज",
      description:
        "MediKiosk सांव सहज ते बात रा़पाड़ाव मे आर सवाल ऑडियो रे आंजोम मे।",
      actionText:
        "सहज ते बात रा़पाड़ाव मे",
    },

    voiceToText: {
      title: "आवाज ते लिखत",
      description:
        "आमाक् जवाब बात ते एम मे आर MediKiosk ओना लिखत रे बोदोल मे।",
      actionText:
        "बात ते जवाब एम मे",
    },

    textToVoice: {
      title: "लिखत ते आवाज",
      description:
        "स्क्रीन रे सवाल पाड़हाव मे आर ऑडियो रे आंजोम मे।",
      actionText:
        "टैप काते आंजोम मे",
    },

    textToText: {
      title: "लिखत ते लिखत",
      description:
        "सवाल पाड़हाव मे आर स्क्रीन रे आमाक् जवाब टाइप मे।",
      actionText:
        "टैप काते टाइप मे",
    },

    selectedMode:
      "बाछावाक् तरीका",

    continueText:
      "आगु सेनोक् मे",

    recommended:
      "सिफारिस:",

    recommendation:
      "सहज बात रा़पाड़ाव लागित् आवाज ते आवाज।",

    back:
      "फाटें",

    help:
      "मदद",
  },

  /* ======================================================================= */
  /* TAMIL                                                                   */
  /* ======================================================================= */

  ta: {
    tagline:
      "AI-இயங்கும் ஆயுர்வேத மருத்துவ வரலாறு தளம்",

    eyebrow:
      "உரையாடல் விருப்பம்",

    title:
      "நீங்கள் எவ்வாறு தொடர விரும்புகிறீர்கள்?",

    subtitle:
      "உங்களுக்கு வசதியான முறையைத் தேர்ந்தெடுக்கவும்.",

    voiceToVoice: {
      title: "குரல் முதல் குரல்",
      description:
        "MediKiosk உடன் இயல்பாகப் பேசுங்கள் மற்றும் கேள்விகளை ஒலியாகக் கேளுங்கள்.",
      actionText:
        "இயல்பாகப் பேசுங்கள்",
    },

    voiceToText: {
      title: "குரல் முதல் உரை",
      description:
        "உங்கள் பதில்களைப் பேசுங்கள், MediKiosk அவற்றை உரையாக மாற்றும்.",
      actionText:
        "பேசி பதிலளிக்கவும்",
    },

    textToVoice: {
      title: "உரை முதல் குரல்",
      description:
        "திரையில் உள்ள கேள்விகளைப் படித்து அவற்றை ஒலியாகக் கேளுங்கள்.",
      actionText:
        "தட்டிக் கேளுங்கள்",
    },

    textToText: {
      title: "உரை முதல் உரை",
      description:
        "கேள்விகளைப் படித்து திரையில் உங்கள் பதில்களைத் தட்டச்சு செய்யுங்கள்.",
      actionText:
        "தட்டி தட்டச்சு செய்யுங்கள்",
    },

    selectedMode:
      "தேர்ந்தெடுக்கப்பட்ட முறை",

    continueText:
      "தொடரவும்",

    recommended:
      "பரிந்துரை:",

    recommendation:
      "இயல்பான உரையாடல் அனுபவத்திற்கு குரல் முதல் குரல்.",

    back:
      "பின்செல்",

    help:
      "உதவி",
  },

  /* ======================================================================= */
  /* TELUGU                                                                  */
  /* ======================================================================= */

  te: {
    tagline:
      "AI ఆధారిత ఆయుర్వేద క్లినికల్ హిస్టరీ ప్లాట్‌ఫారమ్",

    eyebrow:
      "ఇంటరాక్షన్ ఎంపిక",

    title:
      "మీరు ఎలా కొనసాగాలనుకుంటున్నారు?",

    subtitle:
      "మీకు సౌకర్యంగా అనిపించే విధానాన్ని ఎంచుకోండి.",

    voiceToVoice: {
      title: "వాయిస్ నుండి వాయిస్",
      description:
        "MediKiosk తో సహజంగా మాట్లాడండి మరియు ప్రశ్నలను ఆడియోలో వినండి.",
      actionText:
        "సహజంగా మాట్లాడండి",
    },

    voiceToText: {
      title: "వాయిస్ నుండి టెక్స్ట్",
      description:
        "మీ సమాధానాలను మాట్లాడండి మరియు MediKiosk వాటిని టెక్స్ట్‌గా మారుస్తుంది.",
      actionText:
        "మాట్లాడి సమాధానం ఇవ్వండి",
    },

    textToVoice: {
      title: "టెక్స్ట్ నుండి వాయిస్",
      description:
        "స్క్రీన్‌పై ప్రశ్నలను చదివి వాటిని ఆడియోలో వినండి.",
      actionText:
        "ట్యాప్ చేసి వినండి",
    },

    textToText: {
      title: "టెక్స్ట్ నుండి టెక్స్ట్",
      description:
        "ప్రశ్నలను చదివి స్క్రీన్‌పై మీ సమాధానాలను టైప్ చేయండి.",
      actionText:
        "ట్యాప్ చేసి టైప్ చేయండి",
    },

    selectedMode:
      "ఎంచుకున్న విధానం",

    continueText:
      "కొనసాగించండి",

    recommended:
      "సిఫార్సు:",

    recommendation:
      "సహజమైన సంభాషణ అనుభవం కోసం వాయిస్ నుండి వాయిస్.",

    back:
      "వెనుకకు",

    help:
      "సహాయం",
  },

  /* ======================================================================= */
  /* URDU                                                                    */
  /* ======================================================================= */

  ur: {
    tagline:
      "AI پر مبنی آیورویدک کلینیکل ہسٹری پلیٹ فارم",

    eyebrow:
      "رابطے کی ترجیح",

    title:
      "آپ کیسے آگے بڑھنا چاہتے ہیں؟",

    subtitle:
      "وہ طریقہ منتخب کریں جو آپ کے لیے سب سے زیادہ آسان ہو۔",

    voiceToVoice: {
      title: "آواز سے آواز",
      description:
        "MediKiosk کے ساتھ قدرتی انداز میں بات کریں اور سوالات آڈیو میں سنیں۔",
      actionText:
        "قدرتی انداز میں بولیں",
    },

    voiceToText: {
      title: "آواز سے متن",
      description:
        "اپنے جوابات بولیں اور MediKiosk انہیں متن میں تبدیل کرے گا۔",
      actionText:
        "بول کر جواب دیں",
    },

    textToVoice: {
      title: "متن سے آواز",
      description:
        "اسکرین پر سوالات پڑھیں اور انہیں آڈیو میں سنیں۔",
      actionText:
        "ٹیپ کرکے سنیں",
    },

    textToText: {
      title: "متن سے متن",
      description:
        "سوالات پڑھیں اور اسکرین پر اپنے جوابات ٹائپ کریں۔",
      actionText:
        "ٹیپ کرکے ٹائپ کریں",
    },

    selectedMode:
      "منتخب طریقہ",

    continueText:
      "جاری رکھیں",

    recommended:
      "تجویز کردہ:",

    recommendation:
      "قدرتی گفتگو کے تجربے کے لیے آواز سے آواز۔",

    back:
      "واپس",

    help:
      "مدد",
  },
};

/* ========================================================================= */
/* COMPONENT                                                                 */
/* ========================================================================= */

export default function Mode() {
  const navigate = useNavigate();

  /* ----------------------------------------------------------------------- */
  /* LANGUAGE                                                                */
  /* ----------------------------------------------------------------------- */

  const language =
    usePatientStore(
      (state) => state.language
    ) as LanguageCode;

  /* ----------------------------------------------------------------------- */
  /* STORED MODE                                                             */
  /* ----------------------------------------------------------------------- */

  const storedMode =
    usePatientStore(
      (state) => state.mode
    );

  const setMode =
    usePatientStore(
      (state) => state.setMode
    );

  /* ----------------------------------------------------------------------- */
  /* LOCAL SELECTED MODE                                                     */
  /* ----------------------------------------------------------------------- */

  const [selectedMode, setSelectedMode] =
    useState<InteractionMode>(
      (storedMode as InteractionMode) ||
        "text-to-text"
    );

  /* ----------------------------------------------------------------------- */
  /* CURRENT TRANSLATION                                                     */
  /* ----------------------------------------------------------------------- */

  const current =
    pageTranslations[language] ||
    pageTranslations.en;

  /* ========================================================================= */
  /* STOP SPEECH WHEN PAGE OPENS / CLOSES                                     */
  /* ========================================================================= */

  useEffect(() => {
    stopSpeaking();

    return () => {
      stopSpeaking();
    };
  }, []);

  /* ========================================================================= */
  /* GET MODE TEXT                                                            */
  /* ========================================================================= */

  function getModeText(
    mode: InteractionMode
  ): ModeTranslation {
    if (
      mode === "voice-to-voice"
    ) {
      return current.voiceToVoice;
    }

    if (
      mode === "voice-to-text"
    ) {
      return current.voiceToText;
    }

    if (
      mode === "text-to-voice"
    ) {
      return current.textToVoice;
    }

    return current.textToText;
  }

  /* ========================================================================= */
  /* GET SPEECH TEXT                                                          */
  /* ========================================================================= */

  function getSpeechText(
    mode: InteractionMode
  ): string {
    const modeText =
      getModeText(mode);

    return `${modeText.title}. ${modeText.description}`;
  }

  /* ========================================================================= */
  /* GET CURRENT SPEECH LANGUAGE                                              */
  /* ========================================================================= */

  function getCurrentSpeechLanguage(): string {
    return (
      speechLanguageMap[language] ||
      "en-IN"
    );
  }

  /* ========================================================================= */
  /* SELECT MODE                                                              */
  /* ========================================================================= */

  function selectMode(
    mode: InteractionMode
  ) {
    setSelectedMode(mode);

    stopSpeaking();

    const speechLanguage =
      getCurrentSpeechLanguage();

    speakText(
      getSpeechText(mode),
      speechLanguage
    );
  }

  /* ========================================================================= */
  /* SPEAK SELECTED MODE                                                      */
  /* ========================================================================= */

  function speakSelectedMode() {
    stopSpeaking();

    const speechLanguage =
      getCurrentSpeechLanguage();

    speakText(
      getSpeechText(selectedMode),
      speechLanguage
    );
  }

  /* ========================================================================= */
  /* HELP                                                                     */
  /* ========================================================================= */

  function handleHelp() {
    stopSpeaking();

    const speechLanguage =
      getCurrentSpeechLanguage();

    speakText(
      `${current.title}. ${current.subtitle}`,
      speechLanguage
    );
  }

  /* ========================================================================= */
  /* CONTINUE                                                                 */
  /* ========================================================================= */

  function handleContinue() {
    setMode(selectedMode);

    stopSpeaking();

    navigate(
      `/patient/history?mode=${selectedMode}`
    );
  }

  /* ========================================================================= */
  /* BACK                                                                     */
  /* ========================================================================= */

  function handleBack() {
    stopSpeaking();

    navigate(
      "/patient/demographics"
    );
  }

  /* ========================================================================= */
  /* UI                                                                       */
  /* ========================================================================= */

  return (
    <div className="min-h-screen bg-[#F7F3E9] text-[#173F35]">

      {/* =================================================================== */}
      {/* HEADER                                                              */}
      {/* =================================================================== */}

      <header className="border-b border-[#D8CDBB] bg-[#FBF8F2]">

        <div className="relative mx-auto flex h-[65px] w-full max-w-[1100px] items-center justify-between px-8">

          {/* --------------------------------------------------------------- */}
          {/* BACK BUTTON                                                      */}
          {/* --------------------------------------------------------------- */}

          <button
            type="button"
            onClick={handleBack}
            className="inline-flex items-center gap-2 rounded-lg border border-[#DED5C6] bg-white px-4 py-2 text-sm font-medium text-[#315C4D] shadow-sm transition hover:bg-[#F7F3E9]"
          >
            <ArrowLeft
              size={17}
            />

            <span>
              {current.back}
            </span>
          </button>

          {/* --------------------------------------------------------------- */}
          {/* CENTER LOGO                                                      */}
          {/* --------------------------------------------------------------- */}

          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center">

            <p className="font-serif text-[21px] font-bold text-[#173F35]">
              MediKiosk
            </p>

            <p className="mt-1 whitespace-nowrap text-[13px] font-semibold tracking-[0.2em] text-[#68776F]">
              {current.tagline}
            </p>

          </div>

          {/* --------------------------------------------------------------- */}
          {/* HELP BUTTON                                                      */}
          {/* --------------------------------------------------------------- */}

          <button
            type="button"
            onClick={handleHelp}
            className="ml-auto inline-flex items-center rounded-lg border border-[#DED5C6] bg-white px-4 py-2 text-sm font-medium text-[#315C4D] shadow-sm transition hover:bg-[#F7F3E9]"
          >
            <span className="flex h-[18px] w-[18px] items-center justify-center rounded-full border border-[#315C4D] text-[11px] font-bold">
              ?
            </span>

            <span className="ml-2">
              {current.help}
            </span>
          </button>

        </div>

      </header>

      {/* =================================================================== */}
      {/* MAIN                                                                */}
      {/* =================================================================== */}

      <main className="mx-auto w-full max-w-[900px] px-6 pb-12 pt-14">

        {/* ================================================================= */}
        {/* INTRODUCTION                                                      */}
        {/* ================================================================= */}

        <div className="mb-11 text-center">

          <p className="mb-4 text-[13px] font-semibold uppercase tracking-[0.25em] text-[#BD5D38]">
            {current.eyebrow}
          </p>

          <h1 className="font-serif text-[40px] font-semibold leading-[1.12] tracking-[-0.02em] text-[#124D3D] md:text-[42px]">
            {current.title}
          </h1>

          <p className="mt-4 text-[17px] leading-7 text-[#68766F]">
            {current.subtitle}
          </p>

        </div>

        {/* ================================================================= */}
        {/* MODE CARDS                                                        */}
        {/* ================================================================= */}

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">

          {modeIds.map(
            (modeId) => {

              const mode =
                getModeText(
                  modeId
                );

              const Icon =
                modeIcons[
                  modeId
                ];

              const isSelected =
                selectedMode ===
                modeId;

              return (
                <button
                  key={modeId}
                  type="button"
                  onClick={() =>
                    selectMode(
                      modeId
                    )
                  }
                  className={`group relative min-h-[230px] rounded-[20px] border p-6 text-left transition-all duration-200 ${
                    isSelected
                      ? "border-[#286B58] bg-[#E4F0E6] shadow-[0_8px_24px_rgba(23,79,64,0.06)]"
                      : "border-[#DED4C3] bg-[#FBF9F5] hover:-translate-y-[2px] hover:border-[#BCAE9A] hover:bg-white"
                  }`}
                >

                  {/* ----------------------------------------------------- */}
                  {/* SELECTED INDICATOR                                     */}
                  {/* ----------------------------------------------------- */}

                  {isSelected && (
                    <div className="absolute right-6 top-6 flex h-[24px] w-[24px] items-center justify-center rounded-full bg-[#236A55] text-[13px] font-bold text-white">
                      ✓
                    </div>
                  )}

                  {/* ----------------------------------------------------- */}
                  {/* TOP ICON                                                */}
                  {/* ----------------------------------------------------- */}

                  <div className="flex items-start justify-between">

                    <div
                      className={`flex h-[48px] w-[48px] items-center justify-center rounded-[13px] ${
                        isSelected
                          ? "bg-[#236A55] text-white"
                          : "bg-[#E0EBE3] text-[#17604B]"
                      }`}
                    >
                      <Icon
                        size={23}
                        strokeWidth={1.8}
                      />
                    </div>

                    {!isSelected && (
                      <ArrowRight
                        size={19}
                        strokeWidth={1.8}
                        className="text-[#BD5D38] transition-transform group-hover:translate-x-1"
                      />
                    )}

                  </div>

                  {/* ----------------------------------------------------- */}
                  {/* MODE TITLE                                              */}
                  {/* ----------------------------------------------------- */}

                  <h2 className="mt-6 font-serif text-[21px] font-semibold text-[#174F40]">
                    {mode.title}
                  </h2>

                  {/* ----------------------------------------------------- */}
                  {/* DESCRIPTION                                             */}
                  {/* ----------------------------------------------------- */}

                  <p className="mt-3 max-w-[390px] text-[14px] leading-6 text-[#68766F]">
                    {mode.description}
                  </p>

                  {/* ----------------------------------------------------- */}
                  {/* ACTION TEXT                                              */}
                  {/* ----------------------------------------------------- */}

                  <div className="mt-5 text-[13px] font-semibold text-[#BD5D38]">
                    {mode.actionText}
                  </div>

                </button>
              );
            }
          )}

        </div>

        {/* ================================================================= */}
        {/* SELECTED MODE BAR                                                 */}
        {/* ================================================================= */}

        <div className="mt-8 flex flex-col gap-5 rounded-[18px] border border-[#CFE1D4] bg-[#E4F0E6] p-5 sm:flex-row sm:items-center sm:justify-between">

          {/* --------------------------------------------------------------- */}
          {/* SELECTED MODE INFORMATION                                       */}
          {/* --------------------------------------------------------------- */}

          <div className="flex items-center gap-4">

            {/* Speaker button */}

            <button
              type="button"
              onClick={
                speakSelectedMode
              }
              className="flex h-[46px] w-[46px] shrink-0 items-center justify-center rounded-full bg-[#236A55] text-white transition hover:bg-[#174D3B]"
              aria-label="Listen to selected mode"
            >
              <Volume2
                size={21}
              />
            </button>

            {/* Selected mode text */}

            <div>

              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#6B8379]">
                {current.selectedMode}
              </p>

              <p className="mt-1 text-[15px] font-semibold text-[#174F40]">
                {
                  getModeText(
                    selectedMode
                  ).title
                }
              </p>

            </div>

          </div>

          {/* --------------------------------------------------------------- */}
          {/* CONTINUE BUTTON                                                  */}
          {/* --------------------------------------------------------------- */}

          <button
            type="button"
            onClick={
              handleContinue
            }
            className="flex h-[48px] items-center justify-center gap-3 rounded-[11px] bg-[#145943] px-7 text-[14px] font-semibold text-white transition hover:bg-[#104A38] active:scale-[0.98]"
          >
            {current.continueText}

            <ArrowRight
              size={18}
              strokeWidth={2}
            />
          </button>

        </div>

        {/* ================================================================= */}
        {/* RECOMMENDATION                                                    */}
        {/* ================================================================= */}

        <div className="mt-4 rounded-[15px] border border-[#DED4C3] bg-[#F5EEE0] px-5 py-4 text-center">

          <span className="text-[12px] font-semibold text-[#174F40]">
            {current.recommended}
          </span>

          <span className="ml-1 text-[12px] text-[#68766F]">
            {current.recommendation}
          </span>

        </div>

      </main>

      {/* =================================================================== */}
      {/* DECORATIVE CORNER                                                   */}
      {/* =================================================================== */}

      <div className="pointer-events-none fixed bottom-0 right-0 h-24 w-24 overflow-hidden">

        <div className="absolute -bottom-14 -right-14 h-32 w-32 rounded-full bg-[#DCE5D8]" />

      </div>

    </div>
  );
}