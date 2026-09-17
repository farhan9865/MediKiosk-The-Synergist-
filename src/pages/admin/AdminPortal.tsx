import { useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";

import {
  Activity,
  BarChart3,
  Bell,
  BookOpen,
  CalendarDays,
  ChevronDown,
  ClipboardCheck,
  ClipboardList,
  Database,
  Edit3,
  FileBarChart,
  FileText,
  Globe2,
  HeartPulse,
  KeyRound,
  Leaf,
  Link2,
  LogOut,
  Menu,
  Monitor,
  Plus,
  Power,
  RefreshCw,
  Save,
  Search,
  Settings,
  ShieldCheck,
  Stethoscope,
  Trash2,
  User,
  UserCog,
  Users,
  X,
} from "lucide-react";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

/* =========================================================
   TYPES
========================================================= */

type AdminSection =
  | "dashboard"
  | "doctors"
  | "patients"
  | "staff"
  | "roles"
  | "appointments"
  | "kiosks"
  | "questions"
  | "ayurveda"
  | "reports"
  | "system"
  | "integrations"
  | "audit"
  | "data"
  | "support";

type DoctorStatus = "Active" | "Inactive";
type PatientStatus = "New" | "Completed";
type KioskStatus = "Online" | "Offline";

type AppointmentStatus =
  | "Completed"
  | "In Consultation"
  | "Waiting"
  | "Cancelled";

interface Doctor {
  id: string;
  name: string;
  qualification: string;
  specialization: string;
  registration: string;
  status: DoctorStatus;
  department: string;
  room: string;
  email: string;
  mobile: string;
}

interface Patient {
  id: string;
  name: string;
  age: number;
  gender: string;
  complaint: string;
  doctor: string;
  status: PatientStatus;
  createdAt: string;
}

interface Appointment {
  id: string;
  patient: string;
  doctor: string;
  time: string;
  department: string;
  status: AppointmentStatus;
}

interface Kiosk {
  id: string;
  name: string;
  hospital: string;
  location: string;
  department: string;
  status: KioskStatus;
  lastSync: string;
}

interface ClinicalQuestion {
  id: string;
  section: string;
  question: string;
  language: string;
  inputType: string;
  required: boolean;
  active: boolean;
}

interface ActivityItem {
  id: string;
  title: string;
  description: string;
  time: string;
  type: "doctor" | "patient" | "kiosk" | "system";
}

/* =========================================================
   COLORS
========================================================= */

const C = {
  bg: "#F7F5EF",
  surface: "#FFFEFA",
  surfaceSoft: "#FAF9F5",

  greenDark: "#173D32",
  green: "#285B48",
  greenMid: "#4D8064",
  greenLight: "#E6EFE3",

  terracotta: "#B85B38",
  terracottaLight: "#F7E6DB",

  blue: "#3E7185",
  blueLight: "#E4EEF0",

  purple: "#5B609B",
  purpleLight: "#ECE9F3",

  border: "#DDDCD4",
  borderLight: "#EAE8E0",

  text: "#344E45",
  muted: "#7B837E",
};

/* =========================================================
   INITIAL DATA
========================================================= */

const initialDoctors: Doctor[] = [
  {
    id: "D001",
    name: "Dr. Nipun Sancheti",
    qualification: "B.A.M.S , M.D , Counselling Psychologist.(sch)",
    specialization: "Kayachikitsa",
    registration: "AYU-XXXXXX",
    status: "Active",
    department: "Ayurveda OPD",
    room: "Room 04",
    email: "drsanchetiayurveda@gmail.com",
    mobile: "9270322502",
  },
  {
    id: "D002",
    name: "Dr. Bhavna Sancheti",
    qualification: "B.A.M.S , M.D",
    specialization: "Panchakarma",
    registration: "AYU-XXXXXY",
    status: "Active",
    department: "Panchakarma",
    room: "Room 02",
    email: "bhavna@medikiosk.in",
    mobile: "9876543210",
  },
  {
    id: "D003",
    name: "Dr. Rohan Patil",
    qualification: "B.A.M.S , M.D",
    specialization: "Shalya Tantra",
    registration: "AYU-XXXXXZ",
    status: "Active",
    department: "Shalya Tantra",
    room: "Room 05",
    email: "rohan@medikiosk.in",
    mobile: "9823456789",
  },
  {
    id: "D004",
    name: "Dr. Sneha Kulkarni",
    qualification: "B.A.M.S , M.D",
    specialization: "Prasuti Tantra",
    registration: "AYU-XXXXXW",
    status: "Active",
    department: "Women's Health",
    room: "Room 03",
    email: "sneha@medikiosk.in",
    mobile: "9765432109",
  },
];

const initialPatients: Patient[] = [
  {
    id: "A023",
    name: "Rajesh Patil",
    age: 46,
    gender: "Male",
    complaint: "Headache",
    doctor: "Dr. Nipun Sancheti",
    status: "Completed",
    createdAt: "Today, 09:12 AM",
  },
  {
    id: "A024",
    name: "Sunita Deshmukh",
    age: 39,
    gender: "Female",
    complaint: "Digestive discomfort",
    doctor: "Dr. Bhavna Sancheti",
    status: "New",
    createdAt: "Today, 09:38 AM",
  },
  {
    id: "A025",
    name: "Amit Jadhav",
    age: 34,
    gender: "Male",
    complaint: "Joint pain",
    doctor: "Dr. Rohan Patil",
    status: "New",
    createdAt: "Today, 10:04 AM",
  },
  {
    id: "A026",
    name: "Meena Joshi",
    age: 52,
    gender: "Female",
    complaint: "Fatigue",
    doctor: "Dr. Sneha Kulkarni",
    status: "New",
    createdAt: "Today, 10:22 AM",
  },
  {
    id: "A027",
    name: "Prakash More",
    age: 61,
    gender: "Male",
    complaint: "Back pain",
    doctor: "Dr. Nipun Sancheti",
    status: "New",
    createdAt: "Today, 10:41 AM",
  },
  {
    id: "A028",
    name: "Anita Pawar",
    age: 42,
    gender: "Female",
    complaint: "Sleep difficulty",
    doctor: "Dr. Bhavna Sancheti",
    status: "Completed",
    createdAt: "Today, 11:05 AM",
  },
];

const initialAppointments: Appointment[] = [
  {
    id: "APT001",
    patient: "Rajesh Patil",
    doctor: "Dr. Nipun Sancheti",
    time: "09:30 AM",
    department: "Kayachikitsa",
    status: "Completed",
  },
  {
    id: "APT002",
    patient: "Sunita Deshmukh",
    doctor: "Dr. Bhavna Sancheti",
    time: "10:00 AM",
    department: "Panchakarma",
    status: "In Consultation",
  },
  {
    id: "APT003",
    patient: "Amit Jadhav",
    doctor: "Dr. Rohan Patil",
    time: "10:30 AM",
    department: "Shalya Tantra",
    status: "Waiting",
  },
  {
    id: "APT004",
    patient: "Meena Joshi",
    doctor: "Dr. Sneha Kulkarni",
    time: "11:00 AM",
    department: "Women's Health",
    status: "Waiting",
  },
  {
    id: "APT005",
    patient: "Prakash More",
    doctor: "Dr. Nipun Sancheti",
    time: "11:30 AM",
    department: "Kayachikitsa",
    status: "Completed",
  },
  {
    id: "APT006",
    patient: "Anita Pawar",
    doctor: "Dr. Bhavna Sancheti",
    time: "12:00 PM",
    department: "Panchakarma",
    status: "Completed",
  },
  {
    id: "APT007",
    patient: "Vijay Shinde",
    doctor: "Dr. Rohan Patil",
    time: "12:30 PM",
    department: "Shalya Tantra",
    status: "Waiting",
  },
  {
    id: "APT008",
    patient: "Kavita More",
    doctor: "Dr. Sneha Kulkarni",
    time: "01:00 PM",
    department: "Women's Health",
    status: "Completed",
  },
  {
    id: "APT009",
    patient: "Suresh Pawar",
    doctor: "Dr. Nipun Sancheti",
    time: "02:30 PM",
    department: "Kayachikitsa",
    status: "Completed",
  },
  {
    id: "APT010",
    patient: "Pooja Joshi",
    doctor: "Dr. Bhavna Sancheti",
    time: "03:00 PM",
    department: "Panchakarma",
    status: "Completed",
  },
  {
    id: "APT011",
    patient: "Rahul Kadam",
    doctor: "Dr. Rohan Patil",
    time: "03:30 PM",
    department: "Shalya Tantra",
    status: "In Consultation",
  },
  {
    id: "APT012",
    patient: "Neha Kulkarni",
    doctor: "Dr. Sneha Kulkarni",
    time: "04:00 PM",
    department: "Women's Health",
    status: "Completed",
  },
];

const initialKiosks: Kiosk[] = [
  {
    id: "K01",
    name: "Kiosk 01",
    hospital: "Dr. Sancheti Ayurveda Clinic",
    location: "Main OPD",
    department: "General OPD",
    status: "Online",
    lastSync: "Just now",
  },
  {
    id: "K02",
    name: "Kiosk 02",
    hospital: "Dr. Sancheti Ayurveda Clinic",
    location: "Registration Hall",
    department: "Registration",
    status: "Online",
    lastSync: "1 min ago",
  },
  {
    id: "K03",
    name: "Kiosk 03",
    hospital: "Dr. Sancheti Ayurveda Clinic",
    location: "Panchakarma",
    department: "Panchakarma",
    status: "Offline",
    lastSync: "18 min ago",
  },
  {
    id: "K04",
    name: "Kiosk 04",
    hospital: "Dr. Sancheti Ayurveda Clinic",
    location: "Women's Health",
    department: "Prasuti Tantra",
    status: "Online",
    lastSync: "2 min ago",
  },
  {
    id: "K05",
    name: "Kiosk 05",
    hospital: "Dr. Sancheti Ayurveda Clinic",
    location: "OPD Block B",
    department: "General OPD",
    status: "Offline",
    lastSync: "25 min ago",
  },
];

const initialQuestions: ClinicalQuestion[] = [
  {
    id: "Q001",
    section: "Trividha Pariksha",
    question: "What is your main health concern today?",
    language: "English / Hindi / Marathi",
    inputType: "Voice + Text",
    required: true,
    active: true,
  },
  {
    id: "Q002",
    section: "Prakriti",
    question:
      "Please tell us about your usual body constitution and tendencies.",
    language: "English / Hindi / Marathi",
    inputType: "Guided",
    required: true,
    active: true,
  },
  {
    id: "Q003",
    section: "Vikriti",
    question:
      "What changes have you noticed recently in your health or routine?",
    language: "English / Hindi / Marathi",
    inputType: "Voice + Text",
    required: true,
    active: true,
  },
  {
    id: "Q004",
    section: "Agni",
    question: "How is your appetite and digestion?",
    language: "English / Hindi / Marathi",
    inputType: "Guided",
    required: true,
    active: true,
  },
  {
    id: "Q005",
    section: "Koshtha",
    question: "How would you describe your bowel habits?",
    language: "English / Hindi / Marathi",
    inputType: "Guided",
    required: false,
    active: true,
  },
  {
    id: "Q006",
    section: "Ahara-Vihara",
    question:
      "Tell us about your usual food, sleep and daily routine.",
    language: "English / Hindi / Marathi",
    inputType: "Voice + Text",
    required: false,
    active: true,
  },
  {
    id: "Q007",
    section: "Nidana",
    question:
      "Have you noticed anything that makes your complaint better or worse?",
    language: "English / Hindi / Marathi",
    inputType: "Voice + Text",
    required: false,
    active: true,
  },
  {
    id: "Q008",
    section: "Samprapti",
    question:
      "How has the present complaint changed since it started?",
    language: "English / Hindi / Marathi",
    inputType: "Voice + Text",
    required: false,
    active: true,
  },
];

const initialActivities: ActivityItem[] = [
  {
    id: "ACT001",
    title: "Patient history submitted",
    description: "A026 · Meena Joshi",
    time: "5 min ago",
    type: "patient",
  },
  {
    id: "ACT002",
    title: "Doctor profile updated",
    description: "Dr. Nipun Sancheti",
    time: "18 min ago",
    type: "doctor",
  },
  {
    id: "ACT003",
    title: "Kiosk went offline",
    description: "Kiosk 05 · OPD Block B",
    time: "25 min ago",
    type: "kiosk",
  },
  {
    id: "ACT004",
    title: "Question pathway updated",
    description: "Agni section",
    time: "42 min ago",
    type: "system",
  },
];

const registrationData = [
  { day: "Mon", patients: 40 },
  { day: "Tue", patients: 56 },
  { day: "Wed", patients: 49 },
  { day: "Thu", patients: 63 },
  { day: "Fri", patients: 59 },
  { day: "Sat", patients: 74 },
  { day: "Sun", patients: 40 },
];

const appointmentData = [
  { name: "Completed", value: 8 },
  { name: "In Consultation", value: 2 },
  { name: "Waiting", value: 2 },
];

/* =========================================================
   MAIN ADMIN PORTAL
========================================================= */

export default function AdminPortal() {
  const [activeSection, setActiveSection] =
    useState<AdminSection>("dashboard");

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [doctors, setDoctors] = useState<Doctor[]>(() => {
    try {
      const saved = localStorage.getItem(
        "medikiosk-admin-doctors",
      );

      return saved
        ? JSON.parse(saved)
        : initialDoctors;
    } catch {
      return initialDoctors;
    }
  });

   const [patients] = useState<Patient[]>(() => {

  try {

    const saved = localStorage.getItem(

      "medikiosk-admin-patients",

    );

      return saved
        ? JSON.parse(saved)
        : initialPatients;
    } catch {
      return initialPatients;
    }
  });

  const [kiosks, setKiosks] = useState<Kiosk[]>(() => {
    try {
      const saved = localStorage.getItem(
        "medikiosk-admin-kiosks",
      );

      return saved
        ? JSON.parse(saved)
        : initialKiosks;
    } catch {
      return initialKiosks;
    }
  });

  const [questions, setQuestions] =
    useState<ClinicalQuestion[]>(() => {
      try {
        const saved = localStorage.getItem(
          "medikiosk-admin-questions",
        );

        return saved
          ? JSON.parse(saved)
          : initialQuestions;
      } catch {
        return initialQuestions;
      }
    });

  const [activities, setActivities] =
    useState<ActivityItem[]>(initialActivities);

  const [appointments] =
    useState<Appointment[]>(initialAppointments);

  const [searchTerm, setSearchTerm] = useState("");

  const [hospitalName, setHospitalName] =
    useState(
      () =>
        localStorage.getItem(
          "medikiosk-hospital-name",
        ) ||
        "Dr. Sancheti Ayurveda Clinic Multispeciality Panchakarma And Day Care Center",
    );

  const [hospitalDraft, setHospitalDraft] =
    useState("");

  const [notificationsOpen, setNotificationsOpen] =
    useState(false);

  const [profileOpen, setProfileOpen] =
    useState(false);

  const [doctorModal, setDoctorModal] =
    useState(false);

  const [questionModal, setQuestionModal] =
    useState(false);

  const [kioskModal, setKioskModal] =
    useState(false);

  const [patientModal, setPatientModal] =
    useState(false);

  const [hospitalModal, setHospitalModal] =
    useState(false);

  const [selectedDoctor, setSelectedDoctor] =
    useState<Doctor | null>(null);

  const [selectedQuestion, setSelectedQuestion] =
    useState<ClinicalQuestion | null>(null);

  const [selectedKiosk, setSelectedKiosk] =
    useState<Kiosk | null>(null);

  const [selectedPatient, setSelectedPatient] =
    useState<Patient | null>(null);

  const [doctorForm, setDoctorForm] = useState<Doctor>({
    id: "",
    name: "",
    qualification: "",
    specialization: "Kayachikitsa",
    registration: "",
    status: "Active",
    department: "Ayurveda OPD",
    room: "",
    email: "",
    mobile: "",
  });

  const [questionForm, setQuestionForm] =
    useState<ClinicalQuestion>({
      id: "",
      section: "Trividha Pariksha",
      question: "",
      language: "English / Hindi / Marathi",
      inputType: "Voice + Text",
      required: true,
      active: true,
    });

  const [kioskForm, setKioskForm] = useState<Kiosk>({
    id: "",
    name: "",
    hospital: hospitalName,
    location: "",
    department: "",
    status: "Online",
    lastSync: "Just now",
  });

  /* =======================================================
     PERSISTENCE
  ======================================================= */

  useEffect(() => {
    localStorage.setItem(
      "medikiosk-admin-doctors",
      JSON.stringify(doctors),
    );
  }, [doctors]);

  useEffect(() => {
    localStorage.setItem(
      "medikiosk-admin-patients",
      JSON.stringify(patients),
    );
  }, [patients]);

  useEffect(() => {
    localStorage.setItem(
      "medikiosk-admin-kiosks",
      JSON.stringify(kiosks),
    );
  }, [kiosks]);

  useEffect(() => {
    localStorage.setItem(
      "medikiosk-admin-questions",
      JSON.stringify(questions),
    );
  }, [questions]);

  useEffect(() => {
    localStorage.setItem(
      "medikiosk-hospital-name",
      hospitalName,
    );
  }, [hospitalName]);

  useEffect(() => {
    setHospitalDraft(hospitalName);
  }, [hospitalName]);

  /* =======================================================
     COUNTS
  ======================================================= */

  const activeDoctors = doctors.filter(
    (doctor) => doctor.status === "Active",
  ).length;

  const awaitingReview = patients.filter(
    (patient) => patient.status === "New",
  ).length;

  const onlineKiosks = kiosks.filter(
    (kiosk) => kiosk.status === "Online",
  ).length;

  const activeQuestions = questions.filter(
    (question) => question.active,
  ).length;

  /* =======================================================
     SEARCH
  ======================================================= */

  const filteredDoctors = useMemo(() => {
    const term = searchTerm.toLowerCase().trim();

    if (!term) return doctors;

    return doctors.filter(
      (doctor) =>
        doctor.name.toLowerCase().includes(term) ||
        doctor.specialization
          .toLowerCase()
          .includes(term) ||
        doctor.department
          .toLowerCase()
          .includes(term),
    );
  }, [doctors, searchTerm]);

  const filteredPatients = useMemo(() => {
    const term = searchTerm.toLowerCase().trim();

    if (!term) return patients;

    return patients.filter(
      (patient) =>
        patient.name.toLowerCase().includes(term) ||
        patient.id.toLowerCase().includes(term) ||
        patient.complaint
          .toLowerCase()
          .includes(term),
    );
  }, [patients, searchTerm]);

  const filteredQuestions = useMemo(() => {
    const term = searchTerm.toLowerCase().trim();

    if (!term) return questions;

    return questions.filter(
      (question) =>
        question.section
          .toLowerCase()
          .includes(term) ||
        question.question
          .toLowerCase()
          .includes(term),
    );
  }, [questions, searchTerm]);

  /* =======================================================
     NAVIGATION
  ======================================================= */

  const navigate = (section: AdminSection) => {
    setActiveSection(section);
    setSidebarOpen(false);
    setSearchTerm("");
    setProfileOpen(false);
  };

  /* =======================================================
     DOCTOR ACTIONS
  ======================================================= */

  const addDoctor = () => {
    setSelectedDoctor(null);

    setDoctorForm({
      id: `D${String(
        doctors.length + 1,
      ).padStart(3, "0")}`,
      name: "",
      qualification: "B.A.M.S",
      specialization: "Kayachikitsa",
      registration: "",
      status: "Active",
      department: "Ayurveda OPD",
      room: "",
      email: "",
      mobile: "",
    });

    setDoctorModal(true);
  };

  const editDoctor = (doctor: Doctor) => {
    setSelectedDoctor(doctor);
    setDoctorForm({ ...doctor });
    setDoctorModal(true);
  };

  const saveDoctor = () => {
    if (!doctorForm.name.trim()) return;

    if (selectedDoctor) {
      setDoctors((current) =>
        current.map((doctor) =>
          doctor.id === selectedDoctor.id
            ? doctorForm
            : doctor,
        ),
      );
    } else {
      setDoctors((current) => [
        ...current,
        doctorForm,
      ]);

      setActivities((current) => [
        {
          id: String(Date.now()),
          title: "New doctor registered",
          description: doctorForm.name,
          time: "Just now",
          type: "doctor",
        },
        ...current,
      ]);
    }

    setDoctorModal(false);
  };

  const toggleDoctor = (id: string) => {
    setDoctors((current) =>
      current.map((doctor) =>
        doctor.id === id
          ? {
              ...doctor,
              status:
                doctor.status === "Active"
                  ? "Inactive"
                  : "Active",
            }
          : doctor,
      ),
    );
  };

  const deleteDoctor = (id: string) => {
    const doctor = doctors.find(
      (item) => item.id === id,
    );

    if (!doctor) return;

    if (
      !window.confirm(
        `Remove ${doctor.name} from the clinical team?`,
      )
    ) {
      return;
    }

    setDoctors((current) =>
      current.filter(
        (item) => item.id !== id,
      ),
    );
  };

  /* =======================================================
     QUESTION ACTIONS
  ======================================================= */

  const addQuestion = () => {
    setSelectedQuestion(null);

    setQuestionForm({
      id: `Q${String(
        questions.length + 1,
      ).padStart(3, "0")}`,
      section: "Trividha Pariksha",
      question: "",
      language: "English / Hindi / Marathi",
      inputType: "Voice + Text",
      required: true,
      active: true,
    });

    setQuestionModal(true);
  };

  const editQuestion = (
    question: ClinicalQuestion,
  ) => {
    setSelectedQuestion(question);
    setQuestionForm({ ...question });
    setQuestionModal(true);
  };

  const saveQuestion = () => {
    if (!questionForm.question.trim()) return;

    if (selectedQuestion) {
      setQuestions((current) =>
        current.map((question) =>
          question.id === selectedQuestion.id
            ? questionForm
            : question,
        ),
      );
    } else {
      setQuestions((current) => [
        ...current,
        questionForm,
      ]);
    }

    setQuestionModal(false);
  };

  const toggleQuestion = (id: string) => {
    setQuestions((current) =>
      current.map((question) =>
        question.id === id
          ? {
              ...question,
              active: !question.active,
            }
          : question,
      ),
    );
  };

  const deleteQuestion = (id: string) => {
    if (
      !window.confirm(
        "Delete this clinical pathway question?",
      )
    ) {
      return;
    }

    setQuestions((current) =>
      current.filter(
        (question) => question.id !== id,
      ),
    );
  };

  /* =======================================================
     KIOSK ACTIONS
  ======================================================= */

  const editKiosk = (kiosk: Kiosk) => {
    setSelectedKiosk(kiosk);
    setKioskForm({ ...kiosk });
    setKioskModal(true);
  };

  const saveKiosk = () => {
    if (!selectedKiosk) return;

    setKiosks((current) =>
      current.map((kiosk) =>
        kiosk.id === selectedKiosk.id
          ? {
              ...kioskForm,
              hospital: hospitalName,
            }
          : kiosk,
      ),
    );

    setKioskModal(false);
  };

  const toggleKiosk = (id: string) => {
    setKiosks((current) =>
      current.map((kiosk) =>
        kiosk.id === id
          ? {
              ...kiosk,
              status:
                kiosk.status === "Online"
                  ? "Offline"
                  : "Online",
              lastSync: "Just now",
            }
          : kiosk,
      ),
    );
  };

  /* =======================================================
     HOSPITAL
  ======================================================= */

  const openHospitalModal = () => {
    setHospitalDraft(hospitalName);
    setHospitalModal(true);
  };

  const saveHospital = () => {
    const value = hospitalDraft.trim();

    if (!value) return;

    setHospitalName(value);

    setKiosks((current) =>
      current.map((kiosk) => ({
        ...kiosk,
        hospital: value,
      })),
    );

    setHospitalModal(false);
  };

  /* =======================================================
     RENDER
  ======================================================= */

  return (
    <div
      className="min-h-screen"
      style={{
        background: C.bg,
        color: C.text,
        fontFamily:
          "Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      }}
    >
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-[#173D32]/25 backdrop-blur-sm lg:hidden"
          onClick={() =>
            setSidebarOpen(false)
          }
        />
      )}

      <div className="flex min-h-screen">
        {/* =================================================
            SIDEBAR
        ================================================= */}

        <aside
          className={`
            fixed inset-y-0 left-0 z-50 w-[216px]
            border-r bg-[#FAF9F5]
            transition-transform duration-300
            lg:static lg:translate-x-0
            ${
              sidebarOpen
                ? "translate-x-0"
                : "-translate-x-full"
            }
          `}
          style={{
            borderColor: C.border,
          }}
        >
          <div className="flex h-full flex-col">
            {/* BRAND */}

            <div className="px-5 pb-3 pt-5">
              <div className="flex items-start gap-2">
                <div
                  className="mt-0.5 flex h-[35px] w-[28px] items-center justify-center"
                  style={{
                    color: C.green,
                  }}
                >
                  <Leaf
                    size={34}
                    strokeWidth={1.5}
                    className="-rotate-[18deg]"
                  />
                </div>

                <div>
                  <div
                    className="text-[20px] font-bold tracking-[-0.7px]"
                    style={{
                      fontFamily:
                        "'Georgia', 'Times New Roman', serif",
                      color:
                        C.greenDark,
                    }}
                  >
                    Medi
                    <span
                      style={{
                        color:
                          C.terracotta,
                      }}
                    >
                      Kiosk
                    </span>
                  </div>

                  <div
                    className="text-[9px] font-semibold tracking-[1.7px]"
                    style={{
                      color:
                        "#68736E",
                    }}
                  >
                    ADMIN PORTAL
                  </div>
                </div>
              </div>

              <p
                className="mt-3 text-[9px] leading-[14px]"
                style={{
                  color: "#707A75",
                }}
              >
                AI-Powered Ayurveda
                <br />
                Clinical History Platform
              </p>
            </div>

            {/* NAVIGATION */}

            <nav className="flex-1 overflow-y-auto px-3 pb-4">
              <SidebarItem
                icon={<Monitor size={15} />}
                label="Dashboard"
                active={
                  activeSection ===
                  "dashboard"
                }
                onClick={() =>
                  navigate("dashboard")
                }
              />

              <SidebarGroup title="USER MANAGEMENT">
                <SidebarItem
                  icon={
                    <Stethoscope
                      size={15}
                    />
                  }
                  label="Doctors"
                  active={
                    activeSection ===
                    "doctors"
                  }
                  onClick={() =>
                    navigate("doctors")
                  }
                />

                <SidebarItem
                  icon={<User size={15} />}
                  label="Patients"
                  active={
                    activeSection ===
                    "patients"
                  }
                  onClick={() =>
                    navigate("patients")
                  }
                />

                <SidebarItem
                  icon={
                    <UserCog size={15} />
                  }
                  label="Staff Members"
                  active={
                    activeSection ===
                    "staff"
                  }
                  onClick={() =>
                    navigate("staff")
                  }
                />

                <SidebarItem
                  icon={
                    <Users size={15} />
                  }
                  label="Roles & Permissions"
                  active={
                    activeSection ===
                    "roles"
                  }
                  onClick={() =>
                    navigate("roles")
                  }
                />
              </SidebarGroup>

              <SidebarGroup title="CLINICAL MANAGEMENT">
                <SidebarItem
                  icon={
                    <CalendarDays
                      size={15}
                    />
                  }
                  label="Appointments"
                  active={
                    activeSection ===
                    "appointments"
                  }
                  onClick={() =>
                    navigate(
                      "appointments",
                    )
                  }
                />

                <SidebarItem
                  icon={
                    <Monitor size={15} />
                  }
                  label="Kiosk Management"
                  active={
                    activeSection ===
                    "kiosks"
                  }
                  onClick={() =>
                    navigate("kiosks")
                  }
                />

                <SidebarItem
                  icon={
                    <ClipboardList
                      size={15}
                    />
                  }
                  label="Question Pathways"
                  active={
                    activeSection ===
                    "questions"
                  }
                  onClick={() =>
                    navigate("questions")
                  }
                />

                <SidebarItem
                  icon={<Leaf size={15} />}
                  label="Ayurveda Content"
                  active={
                    activeSection ===
                    "ayurveda"
                  }
                  onClick={() =>
                    navigate("ayurveda")
                  }
                />

                <SidebarItem
                  icon={
                    <FileBarChart
                      size={15}
                    />
                  }
                  label="Reports & Analytics"
                  active={
                    activeSection ===
                    "reports"
                  }
                  onClick={() =>
                    navigate("reports")
                  }
                />
              </SidebarGroup>

              <SidebarGroup title="SYSTEM">
                <SidebarItem
                  icon={
                    <Settings size={15} />
                  }
                  label="System Settings"
                  active={
                    activeSection ===
                    "system"
                  }
                  onClick={() =>
                    navigate("system")
                  }
                />

                <SidebarItem
                  icon={<Link2 size={15} />}
                  label="Integrations"
                  active={
                    activeSection ===
                    "integrations"
                  }
                  onClick={() =>
                    navigate(
                      "integrations",
                    )
                  }
                />

                <SidebarItem
                  icon={
                    <KeyRound size={15} />
                  }
                  label="Audit Logs"
                  active={
                    activeSection ===
                    "audit"
                  }
                  onClick={() =>
                    navigate("audit")
                  }
                />

                <SidebarItem
                  icon={
                    <Database size={15} />
                  }
                  label="Data Management"
                  active={
                    activeSection ===
                    "data"
                  }
                  onClick={() =>
                    navigate("data")
                  }
                />

                <SidebarItem
                  icon={<CircleHelpIcon />}
                  label="Support"
                  active={
                    activeSection ===
                    "support"
                  }
                  onClick={() =>
                    navigate("support")
                  }
                />
              </SidebarGroup>
            </nav>

            {/* FOOTER */}

            <div
              className="relative min-h-[105px] overflow-hidden border-t"
              style={{
                borderColor: C.border,
              }}
            >
              <SidebarFooterDecoration />

              <div className="relative ml-[72px] pt-[14px] pr-2">
                <p
                  className="text-[14px] leading-[19px]"
                  style={{
                    fontFamily:
                      "'Georgia', 'Times New Roman', serif",
                    color: "#68766F",
                  }}
                >
                  Traditional Wisdom
                </p>

                <p
                  className="text-[14px] leading-[19px]"
                  style={{
                    fontFamily:
                      "'Georgia', 'Times New Roman', serif",
                    color: "#68766F",
                  }}
                >
                  Modern Care
                </p>

                <div className="mt-[10px] flex items-center gap-[4px] whitespace-nowrap">
                  <Leaf
                    size={10}
                    strokeWidth={1.7}
                    className="shrink-0 rotate-[-22deg]"
                    style={{
                      color: "#789C7E",
                    }}
                  />

                  <p
                    className="text-[8.5px] leading-[13px]"
                    style={{
                      color: "#7B817C",
                    }}
                  >
                    Developed by{" "}
                    <span
                      className="font-semibold"
                      style={{
                        color:
                          C.terracotta,
                      }}
                    >
                      The Synergist!
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </aside>

        {/* =================================================
            MAIN
        ================================================= */}

        <main className="min-w-0 flex-1">
          {/* HEADER */}

          <header
            className="flex h-[67px] items-center justify-between border-b px-4 sm:px-6 lg:px-7"
            style={{
              background: "#FBFAF7",
              borderColor: C.border,
            }}
          >
            <div className="flex items-center gap-3">
              <button
                className="rounded-lg p-2 lg:hidden"
                onClick={() =>
                  setSidebarOpen(true)
                }
                style={{
                  color: C.green,
                }}
              >
                <Menu size={20} />
              </button>

              <div>
                <h1
                  className="text-[18px] font-semibold leading-5"
                  style={{
                    fontFamily:
                      "'Georgia', 'Times New Roman', serif",
                    color:
                      C.greenDark,
                  }}
                >
                  {getSectionTitle(
                    activeSection,
                  )}
                </h1>

                <p
                  className="text-[9px]"
                  style={{
                    color: C.muted,
                  }}
                >
                  {getSectionDescription(
                    activeSection,
                  )}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {/* SEARCH */}

              <div
                className="hidden h-[35px] w-[335px] items-center gap-2 rounded-full border bg-white px-3 md:flex"
                style={{
                  borderColor:
                    "#E2E1D9",
                }}
              >
                <Search
                  size={15}
                  style={{
                    color: "#61716A",
                  }}
                />

                <input
                  value={searchTerm}
                  onChange={(event) =>
                    setSearchTerm(
                      event.target.value,
                    )
                  }
                  placeholder="Search patients, doctors, kiosks, records..."
                  className="w-full bg-transparent text-[10px] outline-none"
                />
              </div>

              {/* NOTIFICATIONS */}

              <div className="relative">
                <button
                  onClick={() =>
                    setNotificationsOpen(
                      (current) =>
                        !current,
                    )
                  }
                  className="relative rounded-full p-2 hover:bg-[#EEF1EB]"
                >
                  <Bell
                    size={19}
                    style={{
                      color:
                        C.greenDark,
                    }}
                  />

                  <span
                    className="absolute right-0 top-0 flex h-[14px] min-w-[14px] items-center justify-center rounded-full px-1 text-[7px] font-bold text-white"
                    style={{
                      background:
                        C.terracotta,
                    }}
                  >
                    5
                  </span>
                </button>

                {notificationsOpen && (
                  <div className="absolute right-0 top-11 z-[80] w-[300px] overflow-hidden rounded-2xl border bg-white shadow-xl">
                    <div className="border-b px-4 py-3">
                      <h3
                        className="text-[15px] font-semibold"
                        style={{
                          fontFamily:
                            "'Georgia', serif",
                          color:
                            C.greenDark,
                        }}
                      >
                        Notifications
                      </h3>

                      <p className="mt-1 text-[9px] text-[#818984]">
                        Recent system
                        activity
                      </p>
                    </div>

                    <NotificationRow
                      title="2 patient histories awaiting review"
                      time="5 min ago"
                    />

                    <NotificationRow
                      title="Kiosk 05 is offline"
                      time="25 min ago"
                    />

                    <NotificationRow
                      title="Question pathway updated"
                      time="42 min ago"
                    />

                    <button
                      onClick={() => {
                        setNotificationsOpen(
                          false,
                        );
                        navigate("audit");
                      }}
                      className="w-full border-t px-4 py-3 text-left text-[9px] font-semibold hover:bg-[#F7F8F3]"
                    >
                      View all notifications
                    </button>
                  </div>
                )}
              </div>

              {/* PROFILE */}

              <div className="relative">
                <button
                  onClick={() =>
                    setProfileOpen(
                      (current) =>
                        !current,
                    )
                  }
                  className="flex items-center gap-2 rounded-xl border px-2 py-1.5"
                  style={{
                    borderColor:
                      C.border,
                    background:
                      "#FAF9F5",
                  }}
                >
                  <div
                    className="flex h-[32px] w-[32px] items-center justify-center rounded-full text-[14px] font-semibold"
                    style={{
                      background:
                        "#DDEBDA",
                      color: C.green,
                      fontFamily:
                        "'Georgia', serif",
                    }}
                  >
                    A
                  </div>

                  <div className="hidden text-left sm:block">
                    <p
                      className="text-[11px] font-semibold"
                      style={{
                        color:
                          C.greenDark,
                      }}
                    >
                      Admin
                    </p>

                    <p
                      className="text-[8px]"
                      style={{
                        color: C.muted,
                      }}
                    >
                      System
                      Administrator
                    </p>
                  </div>

                  <ChevronDown
                    size={13}
                    style={{
                      color:
                        "#6D7772",
                    }}
                  />
                </button>

                {profileOpen && (
                  <div className="absolute right-0 top-12 z-[80] w-[270px] overflow-hidden rounded-2xl border bg-white shadow-xl">
                    <div className="border-b px-4 py-3">
                      <p
                        className="text-[14px] font-semibold"
                        style={{
                          fontFamily:
                            "'Georgia', serif",
                          color:
                            C.greenDark,
                        }}
                      >
                        Administrator
                      </p>

                      <p className="mt-1 text-[8px] leading-4 text-[#818984]">
                        {hospitalName}
                      </p>
                    </div>

                    <button
                      onClick={() =>
                        navigate("system")
                      }
                      className="flex w-full items-center gap-3 px-4 py-3 text-left text-[10px] hover:bg-[#F5F6F1]"
                    >
                      <Settings size={15} />
                      Settings
                    </button>

                    <button
                      onClick={() =>
                        setProfileOpen(
                          false,
                        )
                      }
                      className="flex w-full items-center gap-3 border-t px-4 py-3 text-left text-[10px] text-[#A14F38] hover:bg-[#FCF2EE]"
                    >
                      <LogOut size={15} />
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            </div>
          </header>

          {/* CONTENT */}

          <div className="px-4 py-5 sm:px-6 lg:px-7">
            {activeSection === "dashboard" && (
              <Dashboard
                hospitalName={hospitalName}
                activeDoctors={
                  activeDoctors
                }
                awaitingReview={
                  awaitingReview
                }
                onlineKiosks={
                  onlineKiosks
                }
                totalKiosks={
                  kiosks.length
                }
                activeQuestions={
                  activeQuestions
                }
                doctors={doctors}
                patients={patients}
                kiosks={kiosks}
                activities={activities}
                onNavigate={navigate}
                onHospital={
                  openHospitalModal
                }
                onPatient={(patient) => {
                  setSelectedPatient(
                    patient,
                  );
                  setPatientModal(true);
                }}
              />
            )}

            {activeSection === "doctors" && (
              <DoctorsPage
                doctors={filteredDoctors}
                onAdd={addDoctor}
                onEdit={editDoctor}
                onToggle={toggleDoctor}
                onDelete={deleteDoctor}
              />
            )}

            {activeSection === "patients" && (
              <PatientsPage
                patients={
                  filteredPatients
                }
                onOpen={(patient) => {
                  setSelectedPatient(
                    patient,
                  );
                  setPatientModal(true);
                }}
              />
            )}

            {activeSection ===
              "appointments" && (
              <AppointmentsPage
                appointments={
                  appointments
                }
              />
            )}

            {activeSection === "kiosks" && (
              <KiosksPage
                kiosks={kiosks}
                onEdit={editKiosk}
                onToggle={toggleKiosk}
                onHospital={
                  openHospitalModal
                }
              />
            )}

            {activeSection === "questions" && (
              <QuestionsPage
                questions={
                  filteredQuestions
                }
                onAdd={addQuestion}
                onEdit={editQuestion}
                onToggle={
                  toggleQuestion
                }
                onDelete={
                  deleteQuestion
                }
              />
            )}

            {activeSection === "staff" && (
              <SimplePage
                title="Staff Members"
                subtitle="Manage registration, nursing and support staff."
                icon={<Users size={20} />}
                items={[
                  [
                    "Registration Staff",
                    "Manage staff handling patient registration and kiosk assistance.",
                    <UserCog size={19} />,
                  ],
                  [
                    "Nursing Staff",
                    "Manage nursing users and clinical workflow access.",
                    <HeartPulse size={19} />,
                  ],
                  [
                    "Support Staff",
                    "Manage technical and operational staff accounts.",
                    <Settings size={19} />,
                  ],
                ]}
              />
            )}

            {activeSection === "roles" && (
              <SimplePage
                title="Roles & Permissions"
                subtitle="Control access across the MediKiosk ecosystem."
                icon={
                  <ShieldCheck
                    size={20}
                  />
                }
                items={[
                  [
                    "Administrator",
                    "Full system configuration, user and clinical management access.",
                    <ShieldCheck
                      size={19}
                    />,
                  ],
                  [
                    "Doctor",
                    "Access assigned patient histories and physician review workflows.",
                    <Stethoscope
                      size={19}
                    />,
                  ],
                  [
                    "Staff",
                    "Limited registration and operational access.",
                    <Users size={19} />,
                  ],
                  [
                    "Kiosk Operator",
                    "Device-level operational permissions.",
                    <Monitor size={19} />,
                  ],
                ]}
              />
            )}

            {activeSection ===
              "ayurveda" && <AyurvedaPage />}

            {activeSection === "reports" && (
              <ReportsPage
                doctors={doctors}
                patients={patients}
                kiosks={kiosks}
                appointments={
                  appointments
                }
              />
            )}

            {activeSection === "system" && (
              <SimplePage
                title="System Settings"
                subtitle="Configure MediKiosk platform-wide behaviour."
                icon={
                  <Settings size={20} />
                }
                items={[
                  [
                    "Privacy & Session Security",
                    "Configure kiosk session lock, privacy screen and automatic session clearing.",
                    <ShieldCheck
                      size={19}
                    />,
                  ],
                  [
                    "AI & History Engine",
                    "Manage structured history processing and physician verification settings.",
                    <HeartPulse
                      size={19}
                    />,
                  ],
                  [
                    "Language Settings",
                    "Configure supported patient and physician languages.",
                    <Globe2 size={19} />,
                  ],
                  [
                    "Notification Settings",
                    "Manage patient, doctor and system notifications.",
                    <Bell size={19} />,
                  ],
                ]}
              />
            )}

            {activeSection ===
              "integrations" && (
              <SimplePage
                title="Integrations"
                subtitle="Manage external healthcare and technology integrations."
                icon={<Link2 size={20} />}
                items={[
                  [
                    "ABDM / ABHA",
                    "Prepare patient identity and consent workflows for ABDM-compatible integration.",
                    <Link2 size={19} />,
                  ],
                  [
                    "Hospital Information System",
                    "FHIR-ready integration boundary for structured clinical history transfer.",
                    <Database
                      size={19}
                    />,
                  ],
                  [
                    "OCR Service",
                    "Connect document scanning and multilingual document extraction.",
                    <FileText
                      size={19}
                    />,
                  ],
                  [
                    "AI / NLP Services",
                    "Manage the controlled AI processing layer used for transcription and structured explanation.",
                    <Activity
                      size={19}
                    />,
                  ],
                ]}
              />
            )}

            {activeSection === "audit" && (
              <AuditPage />
            )}

            {activeSection === "data" && (
              <SimplePage
                title="Data Management"
                subtitle="Manage platform data, backups and retention controls."
                icon={
                  <Database size={20} />
                }
                items={[
                  [
                    "Patient Data",
                    "Manage structured patient history and registration records.",
                    <Users size={19} />,
                  ],
                  [
                    "Document Records",
                    "Manage scanned prescriptions, reports and document metadata.",
                    <FileText
                      size={19}
                    />,
                  ],
                  [
                    "Backup & Recovery",
                    "Configure database backup and restoration workflows.",
                    <RefreshCw
                      size={19}
                    />,
                  ],
                  [
                    "Data Retention",
                    "Configure retention and deletion policies.",
                    <Database
                      size={19}
                    />,
                  ],
                  [
                    "Export",
                    "Export approved operational reports and system data.",
                    <FileBarChart
                      size={19}
                    />,
                  ],
                ]}
              />
            )}

            {activeSection ===
              "support" && (
              <SimplePage
                title="Support"
                subtitle="MediKiosk administrator help and operational support."
                icon={
                  <CircleHelpIcon />
                }
                items={[
                  [
                    "Administrator Guide",
                    "Learn how to manage users, devices, pathways and system configuration.",
                    <BookOpen
                      size={19}
                    />,
                  ],
                  [
                    "Kiosk Support",
                    "Troubleshoot kiosk connectivity, session and device issues.",
                    <Monitor size={19} />,
                  ],
                  [
                    "Contact Support",
                    "Create a support request for technical or operational issues.",
                    <CircleHelpIcon />,
                  ],
                ]}
              />
            )}
          </div>
        </main>
      </div>

      {/* =====================================================
          DOCTOR MODAL
      ===================================================== */}

      {doctorModal && (
        <Modal
          title={
            selectedDoctor
              ? "Edit Doctor"
              : "Add Doctor"
          }
          subtitle="Maintain the physician profile used across MediKiosk."
          onClose={() =>
            setDoctorModal(false)
          }
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <InputField
              label="Doctor Name"
              value={doctorForm.name}
              onChange={(value) =>
                setDoctorForm({
                  ...doctorForm,
                  name: value,
                })
              }
            />

            <InputField
              label="Registration Number"
              value={
                doctorForm.registration
              }
              onChange={(value) =>
                setDoctorForm({
                  ...doctorForm,
                  registration: value,
                })
              }
            />

            <InputField
              label="Qualification"
              value={
                doctorForm.qualification
              }
              onChange={(value) =>
                setDoctorForm({
                  ...doctorForm,
                  qualification: value,
                })
              }
            />

            <InputField
              label="Specialization"
              value={
                doctorForm.specialization
              }
              onChange={(value) =>
                setDoctorForm({
                  ...doctorForm,
                  specialization: value,
                })
              }
            />

            <InputField
              label="Department"
              value={
                doctorForm.department
              }
              onChange={(value) =>
                setDoctorForm({
                  ...doctorForm,
                  department: value,
                })
              }
            />

            <InputField
              label="Room"
              value={doctorForm.room}
              onChange={(value) =>
                setDoctorForm({
                  ...doctorForm,
                  room: value,
                })
              }
            />

            <InputField
              label="Email"
              value={doctorForm.email}
              onChange={(value) =>
                setDoctorForm({
                  ...doctorForm,
                  email: value,
                })
              }
            />

            <InputField
              label="Mobile"
              value={doctorForm.mobile}
              onChange={(value) =>
                setDoctorForm({
                  ...doctorForm,
                  mobile: value,
                })
              }
            />
          </div>

          <ModalButtons
            onCancel={() =>
              setDoctorModal(false)
            }
            onSave={saveDoctor}
            saveText="Save Doctor"
          />
        </Modal>
      )}

      {/* =====================================================
          QUESTION MODAL
      ===================================================== */}

      {questionModal && (
        <Modal
          title={
            selectedQuestion
              ? "Edit Clinical Question"
              : "Add Clinical Question"
          }
          subtitle="Configure the physician-approved Ayurveda history pathway."
          onClose={() =>
            setQuestionModal(false)
          }
        >
          <div className="space-y-4">
            <SelectField
              label="Clinical Section"
              value={
                questionForm.section
              }
              options={[
                "Trividha Pariksha",
                "Ashtavidha Pariksha",
                "Dashavidha Pariksha",
                "Prakriti",
                "Vikriti",
                "Agni",
                "Koshtha",
                "Ahara-Vihara",
                "Nidana",
                "Samprapti",
                "Chief Complaint",
                "Past Medical History",
                "Drug & Allergy History",
                "Family History",
                "Personal History",
                "Investigations",
              ]}
              onChange={(value) =>
                setQuestionForm({
                  ...questionForm,
                  section: value,
                })
              }
            />

            <TextAreaField
              label="Question"
              value={
                questionForm.question
              }
              onChange={(value) =>
                setQuestionForm({
                  ...questionForm,
                  question: value,
                })
              }
            />

            <div className="grid gap-4 sm:grid-cols-2">
              <SelectField
                label="Input Type"
                value={
                  questionForm.inputType
                }
                options={[
                  "Voice + Text",
                  "Voice",
                  "Text",
                  "Guided",
                  "Multiple Choice",
                ]}
                onChange={(value) =>
                  setQuestionForm({
                    ...questionForm,
                    inputType: value,
                  })
                }
              />

              <SelectField
                label="Language"
                value={
                  questionForm.language
                }
                options={[
                  "English / Hindi / Marathi",
                  "English",
                  "Hindi",
                  "Marathi",
                ]}
                onChange={(value) =>
                  setQuestionForm({
                    ...questionForm,
                    language: value,
                  })
                }
              />
            </div>

            <label
              className="flex cursor-pointer items-center gap-3 rounded-xl border p-3"
              style={{
                borderColor:
                  C.borderLight,
                background:
                  C.surfaceSoft,
              }}
            >
              <input
                type="checkbox"
                checked={
                  questionForm.required
                }
                onChange={(event) =>
                  setQuestionForm({
                    ...questionForm,
                    required:
                      event.target.checked,
                  })
                }
                className="h-4 w-4 accent-[#326A53]"
              />

              <div>
                <p className="text-[10px] font-semibold">
                  Required question
                </p>

                <p className="mt-1 text-[9px] text-[#7D8580]">
                  Ask this question
                  when the pathway
                  reaches this
                  section.
                </p>
              </div>
            </label>
          </div>

          <ModalButtons
            onCancel={() =>
              setQuestionModal(false)
            }
            onSave={saveQuestion}
            saveText="Save Question"
          />
        </Modal>
      )}

      {/* =====================================================
          KIOSK MODAL
      ===================================================== */}

      {kioskModal && (
        <Modal
          title="Edit Kiosk"
          subtitle="Manage the device configuration and current state."
          onClose={() =>
            setKioskModal(false)
          }
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <InputField
              label="Kiosk Name"
              value={kioskForm.name}
              onChange={(value) =>
                setKioskForm({
                  ...kioskForm,
                  name: value,
                })
              }
            />

            <InputField
              label="Location"
              value={
                kioskForm.location
              }
              onChange={(value) =>
                setKioskForm({
                  ...kioskForm,
                  location: value,
                })
              }
            />

            <InputField
              label="Department"
              value={
                kioskForm.department
              }
              onChange={(value) =>
                setKioskForm({
                  ...kioskForm,
                  department: value,
                })
              }
            />

            <SelectField
              label="Status"
              value={kioskForm.status}
              options={[
                "Online",
                "Offline",
              ]}
              onChange={(value) =>
                setKioskForm({
                  ...kioskForm,
                  status:
                    value as KioskStatus,
                })
              }
            />
          </div>

          <ModalButtons
            onCancel={() =>
              setKioskModal(false)
            }
            onSave={saveKiosk}
            saveText="Save Kiosk"
          />
        </Modal>
      )}

      {/* =====================================================
          HOSPITAL MODAL
      ===================================================== */}

      {hospitalModal && (
        <Modal
          title="Hospital / Clinic"
          subtitle="Update the healthcare facility displayed throughout the admin system."
          onClose={() =>
            setHospitalModal(false)
          }
        >
          <InputField
            label="Hospital / Clinic Name"
            value={hospitalDraft}
            onChange={setHospitalDraft}
          />

          <ModalButtons
            onCancel={() =>
              setHospitalModal(false)
            }
            onSave={saveHospital}
            saveText="Save Hospital"
          />
        </Modal>
      )}

      {/* =====================================================
          PATIENT MODAL
      ===================================================== */}

      {patientModal &&
        selectedPatient && (
          <Modal
            title={`${selectedPatient.id} · ${selectedPatient.name}`}
            subtitle="Patient registration and structured intake overview."
            onClose={() => {
              setPatientModal(false);
              setSelectedPatient(null);
            }}
          >
            <div className="grid gap-3 sm:grid-cols-2">
              <InfoBox
                label="Age"
                value={`${selectedPatient.age} years`}
              />

              <InfoBox
                label="Gender"
                value={
                  selectedPatient.gender
                }
              />

              <InfoBox
                label="Chief Complaint"
                value={
                  selectedPatient.complaint
                }
              />

              <InfoBox
                label="Assigned Doctor"
                value={
                  selectedPatient.doctor
                }
              />

              <InfoBox
                label="Registration"
                value={
                  selectedPatient.createdAt
                }
              />

              <InfoBox
                label="Status"
                value={
                  selectedPatient.status
                }
              />
            </div>

            <div
              className="mt-5 rounded-xl border p-4"
              style={{
                background: "#F0F5EC",
                borderColor:
                  "#D8E5D5",
              }}
            >
              <div className="flex gap-3">
                <div
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl"
                  style={{
                    background:
                      "#DDEBDD",
                    color: C.green,
                  }}
                >
                  <ClipboardCheck
                    size={16}
                  />
                </div>

                <div>
                  <p
                    className="text-[13px] font-semibold"
                    style={{
                      fontFamily:
                        "'Georgia', serif",
                      color:
                        C.greenDark,
                    }}
                  >
                    Structured History
                    Workflow
                  </p>

                  <p className="mt-1 text-[9px] leading-5 text-[#6F7B75]">
                    Patient history is
                    captured through
                    the approved
                    MediKiosk pathway
                    and reviewed by
                    the physician
                    before clinical
                    use.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-5 flex justify-end">
              <SecondaryButton
                onClick={() => {
                  setPatientModal(false);
                  setSelectedPatient(null);
                }}
              >
                Close
              </SecondaryButton>
            </div>
          </Modal>
        )}
    </div>
  );
}

/* =========================================================
   DASHBOARD
========================================================= */

function Dashboard({
  hospitalName,
  activeDoctors,
  awaitingReview,
  onlineKiosks,
  totalKiosks,
  activeQuestions,
  doctors,
  patients,
  kiosks,
  activities,
  onNavigate,
  onHospital,
  onPatient,
}: {
  hospitalName: string;
  activeDoctors: number;
  awaitingReview: number;
  onlineKiosks: number;
  totalKiosks: number;
  activeQuestions: number;
  doctors: Doctor[];
  patients: Patient[];
  kiosks: Kiosk[];
  activities: ActivityItem[];
  onNavigate: (section: AdminSection) => void;
  onHospital: () => void;
  onPatient: (patient: Patient) => void;
}) {
  return (
    <div className="space-y-3">
      {/* HERO */}

      <section
        className="relative min-h-[194px] overflow-hidden rounded-[15px] border"
        style={{
          background:
            "linear-gradient(100deg,#EEF3E9 0%,#EDF2E7 48%,#E3EBDD 100%)",
          borderColor:
            "#D6DED2",
        }}
      >
        <div
          className="absolute -right-8 -top-16 h-[160px] w-[160px] rounded-full border"
          style={{
            borderColor:
              "rgba(91,122,102,.18)",
          }}
        />

        <div
          className="absolute bottom-[-70px] right-[80px] h-[170px] w-[170px] rounded-full border"
          style={{
            borderColor:
              "rgba(91,122,102,.14)",
          }}
        />

        <HeroBotanical />

        <div className="relative z-10 px-6 py-5 sm:px-7">
          <p
            className="text-[9px] font-semibold tracking-[2px]"
            style={{
              color: "#42695A",
            }}
          >
            ADMINISTRATION OVERVIEW
          </p>

          <h2
            className="mt-1 text-[27px] font-bold tracking-[-0.8px]"
            style={{
              fontFamily:
                "'Georgia', 'Times New Roman', serif",
              color: C.greenDark,
            }}
          >
            Good Morning, Admin!
          </h2>

          <p
            className="mt-1 max-w-[540px] text-[10px] leading-[17px]"
            style={{
              color: "#405B51",
            }}
          >
            Manage your MediKiosk ecosystem,
            clinical pathways, healthcare
            staff, kiosks and Ayurveda content
            from one place.
          </p>

          <button
            onClick={onHospital}
            className="mt-3 flex h-[46px] w-[530px] max-w-full items-center gap-3 rounded-xl border px-3 text-left"
            style={{
              borderColor:
                "#D6DDD2",
              background:
                "rgba(255,255,255,.82)",
            }}
          >
            <div
              className="flex h-[30px] w-[30px] shrink-0 items-center justify-center rounded-full"
              style={{
                background:
                  "#DCEBDE",
                color: C.green,
              }}
            >
              <HospitalIcon />
            </div>

            <div className="min-w-0">
              <p
                className="text-[8px] font-semibold tracking-[1.2px]"
                style={{
                  color: "#7A847F",
                }}
              >
                HOSPITAL / CLINIC
              </p>

              <p
                className="truncate text-[10px] font-semibold"
                style={{
                  color: "#2E4B41",
                }}
              >
                {hospitalName}
              </p>
            </div>
          </button>
        </div>

        <div className="absolute right-[335px] top-[33px] z-10 hidden text-center xl:block">
          <p
            className="text-[17px] italic leading-6"
            style={{
              fontFamily:
                "'Georgia', 'Times New Roman', serif",
              color: "#294D40",
            }}
          >
            “Ancient Wisdom
            <br />
            for a Healthier
            <br />
            Tomorrow”
          </p>

          <div
            className="mx-auto mt-3 h-px w-8"
            style={{
              background:
                "#789384",
            }}
          />
        </div>

        <div className="absolute right-5 top-[60px] z-10 hidden xl:block">
          {[
            "BALANCE",
            "HEAL",
            "NATURALLY",
            "LIVE BETTER",
          ].map((word) => (
            <div
              key={word}
              className="mb-3 border-l pl-3 text-[8px] font-semibold tracking-[1.4px]"
              style={{
                borderColor:
                  "#789384",
                color: "#527063",
              }}
            >
              {word}
            </div>
          ))}
        </div>
      </section>

      {/* STATS */}

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Active Doctors"
          value={activeDoctors}
          subtitle="Registered clinical users"
          icon={<Users size={22} />}
          variant="green"
          onClick={() =>
            onNavigate("doctors")
          }
        />

        <StatCard
          title="Awaiting Review"
          value={awaitingReview}
          subtitle="Patient histories"
          icon={<Users size={22} />}
          variant="terracotta"
          onClick={() =>
            onNavigate("patients")
          }
        />

        <StatCard
          title="Online Kiosks"
          value={onlineKiosks}
          subtitle={`of ${totalKiosks} registered kiosks`}
          icon={<Monitor size={22} />}
          variant="blue"
          onClick={() =>
            onNavigate("kiosks")
          }
        />

        <StatCard
          title="Active Questions"
          value={activeQuestions}
          subtitle="Clinical pathway questions"
          icon={<FileText size={22} />}
          variant="purple"
          onClick={() =>
            onNavigate("questions")
          }
        />
      </div>

      {/* CHARTS */}

      <div className="grid gap-3 xl:grid-cols-[1.2fr_.8fr]">
        <DashboardCard
          title="Patient Registration"
          subtitle="Last 7 days"
          icon={<BarChart3 size={18} />}
          action={
            <button className="rounded-lg border bg-[#FAFAF6] px-2.5 py-1.5 text-[8px] font-semibold text-[#5B6962]">
              Last 7 days{" "}
              <ChevronDown
                size={11}
                className="ml-1 inline"
              />
            </button>
          }
        >
          <div className="h-[175px]">
            <ResponsiveContainer
              width="100%"
              height="100%"
            >
              <BarChart
                data={registrationData}
                margin={{
                  top: 5,
                  right: 5,
                  left: -20,
                  bottom: 0,
                }}
              >
                <CartesianGrid
                  vertical={false}
                  stroke="#E7E5DE"
                />

                <XAxis
                  dataKey="day"
                  axisLine={false}
                  tickLine={false}
                  tick={{
                    fontSize: 8,
                    fill: "#727D77",
                  }}
                />

                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{
                    fontSize: 8,
                    fill: "#727D77",
                  }}
                />

                <Tooltip
                  contentStyle={{
                    borderRadius: 10,
                    border:
                      "1px solid #E2E0D8",
                    fontSize: 9,
                  }}
                />

                <Bar
                  dataKey="patients"
                  fill="#4D8064"
                  radius={[
                    4,
                    4,
                    0,
                    0,
                  ]}
                  barSize={38}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </DashboardCard>

        <DashboardCard
          title="Today's Appointments"
          subtitle="Current status"
          icon={
            <CalendarDays
              size={18}
            />
          }
          action={
            <button
              onClick={() =>
                onNavigate(
                  "appointments",
                )
              }
              className="text-[9px] font-semibold"
              style={{
                color: C.green,
              }}
            >
              View All
            </button>
          }
        >
          <div className="relative h-[175px]">
            <ResponsiveContainer
              width="100%"
              height="100%"
            >
              <PieChart>
                <Pie
                  data={appointmentData}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={39}
                  outerRadius={59}
                  cx="50%"
                  cy="45%"
                  paddingAngle={2}
                >
                  <Cell fill="#32765A" />
                  <Cell fill="#9AA59F" />
                  <Cell fill="#B85A39" />
                </Pie>

                <Tooltip
                  contentStyle={{
                    borderRadius: 10,
                    border:
                      "1px solid #E2E0D8",
                    fontSize: 9,
                  }}
                />

                <Legend
                  verticalAlign="bottom"
                  iconType="circle"
                  wrapperStyle={{
                    fontSize: 8,
                  }}
                />
              </PieChart>
            </ResponsiveContainer>

            <div className="pointer-events-none absolute left-1/2 top-[43px] -translate-x-1/2 text-center">
              <p
                className="text-[22px] font-bold"
                style={{
                  fontFamily:
                    "'Georgia', serif",
                  color:
                    C.greenDark,
                }}
              >
                12
              </p>

              <p className="text-[8px] text-[#818984]">
                Total
              </p>
            </div>
          </div>
        </DashboardCard>
      </div>

      {/* LOWER */}

      <div className="grid gap-3 xl:grid-cols-3">
        <DashboardCard
          title="Clinical Team"
          subtitle="Registered doctors"
          icon={<Users size={18} />}
          action={
            <button
              onClick={() =>
                onNavigate("doctors")
              }
              className="text-[9px] font-semibold"
              style={{
                color: C.green,
              }}
            >
              Manage
            </button>
          }
        >
          <div className="space-y-2">
            {doctors
              .slice(0, 4)
              .map((doctor) => (
                <div
                  key={doctor.id}
                  className="flex items-center gap-2 rounded-xl border px-2.5 py-1.5"
                  style={{
                    borderColor:
                      "#F0EEE7",
                    background:
                      "#FBFBF7",
                  }}
                >
                  <div
                    className="flex h-[29px] w-[29px] shrink-0 items-center justify-center rounded-full text-[9px] font-semibold"
                    style={{
                      background:
                        "#DDEBDA",
                      color: C.green,
                    }}
                  >
                    {initials(
                      doctor.name,
                    )}
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="truncate text-[9px] font-semibold text-[#334D43]">
                      {doctor.name}
                    </p>

                    <p className="truncate text-[8px] text-[#7D8580]">
                      {
                        doctor.specialization
                      }
                    </p>
                  </div>

                  <QueueStatus status="Active" />
                </div>
              ))}
          </div>
        </DashboardCard>

        <DashboardCard
          title="Patient Queue"
          subtitle="Latest intake activity"
          icon={
            <ClipboardList
              size={18}
            />
          }
          action={
            <button
              onClick={() =>
                onNavigate("patients")
              }
              className="text-[9px] font-semibold"
              style={{
                color: C.green,
              }}
            >
              View Queue
            </button>
          }
        >
          <div className="space-y-2">
            {patients
              .slice(0, 4)
              .map((patient) => (
                <button
                  key={patient.id}
                  onClick={() =>
                    onPatient(patient)
                  }
                  className="flex w-full items-center gap-2 rounded-xl border px-2.5 py-1.5 text-left hover:bg-[#F9FAF6]"
                  style={{
                    borderColor:
                      "#E9E7DF",
                  }}
                >
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-[9px] font-semibold text-[#334D43]">
                      {patient.id} ·{" "}
                      {patient.name}
                    </p>

                    <p className="text-[8px] text-[#7D8580]">
                      {patient.complaint}
                    </p>
                  </div>

                  <QueueStatus
                    status={
                      patient.status ===
                      "Completed"
                        ? "Completed"
                        : patient.id ===
                            "A024"
                          ? "In Consultation"
                          : "Awaiting Review"
                    }
                  />
                </button>
              ))}
          </div>
        </DashboardCard>

        <DashboardCard
          title="Kiosk Status"
          subtitle="Device overview"
          icon={<Monitor size={18} />}
          action={
            <button
              onClick={() =>
                onNavigate("kiosks")
              }
              className="text-[9px] font-semibold"
              style={{
                color: C.green,
              }}
            >
              Manage
            </button>
          }
        >
          <div className="space-y-0.5">
            {kiosks.map(
              (kiosk, index) => {
                const doctorNames = [
                  "Dr. Nipun Sancheti",
                  "Dr. Bhavna Sancheti",
                  "Dr. Rohan Patil",
                  "Dr. Sneha Kulkarni",
                  "Dr. Nipun Sancheti",
                ];

                return (
                  <div
                    key={kiosk.id}
                    className="flex items-center gap-2 border-b py-[6px] last:border-0"
                    style={{
                      borderColor:
                        "#F0EEE7",
                    }}
                  >
                    <span
                      className="h-[8px] w-[8px] shrink-0 rounded-full"
                      style={{
                        background:
                          kiosk.status ===
                          "Online"
                            ? "#4B8A65"
                            : "#B84D30",
                      }}
                    />

                    <div className="min-w-0 flex-1">
                      <p className="truncate text-[8px] font-semibold text-[#3B4E47]">
                        {
                          doctorNames[
                            index
                          ]
                        }{" "}
                        – {kiosk.name}
                      </p>

                      <p className="truncate text-[8px] text-[#838A86]">
                        {kiosk.location}
                      </p>
                    </div>

                    <QueueStatus
                      status={
                        kiosk.status
                      }
                    />
                  </div>
                );
              },
            )}
          </div>
        </DashboardCard>
      </div>

      {/* ACTIVITY */}

      <div className="grid gap-3 xl:grid-cols-2">
        <DashboardCard
          title="Recent System Activity"
          subtitle="Latest administrative events"
          icon={
            <Activity size={18} />
          }
        >
          <div className="space-y-2">
            {activities.map(
              (activity) => (
                <div
                  key={activity.id}
                  className="flex items-center gap-3 rounded-xl border px-3 py-2"
                  style={{
                    borderColor:
                      "#EFEEE8",
                    background:
                      "#FBFBF7",
                  }}
                >
                  <div
                    className="flex h-[29px] w-[29px] shrink-0 items-center justify-center rounded-full"
                    style={{
                      background:
                        "#E5EEE3",
                      color: C.green,
                    }}
                  >
                    {activity.type ===
                      "doctor" && (
                      <Stethoscope
                        size={13}
                      />
                    )}

                    {activity.type ===
                      "patient" && (
                      <User size={13} />
                    )}

                    {activity.type ===
                      "kiosk" && (
                      <Monitor
                        size={13}
                      />
                    )}

                    {activity.type ===
                      "system" && (
                      <Settings
                        size={13}
                      />
                    )}
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="text-[9px] font-semibold text-[#3D544B]">
                      {activity.title}
                    </p>

                    <p className="text-[8px] text-[#808983]">
                      {
                        activity.description
                      }
                    </p>
                  </div>

                  <span className="text-[7px] text-[#929894]">
                    {activity.time}
                  </span>
                </div>
              ),
            )}
          </div>
        </DashboardCard>

        <DashboardCard
          title="Quick Administration"
          subtitle="Common management actions"
          icon={
            <Settings size={18} />
          }
        >
          <div className="grid grid-cols-2 gap-2">
            <QuickAction
              icon={<Plus size={16} />}
              title="Add Doctor"
              description="Register clinical user"
              onClick={() =>
                onNavigate("doctors")
              }
            />

            <QuickAction
              icon={
                <ClipboardList
                  size={16}
                />
              }
              title="Question Pathways"
              description="Configure clinical flow"
              onClick={() =>
                onNavigate("questions")
              }
            />

            <QuickAction
              icon={
                <Monitor size={16} />
              }
              title="Manage Kiosks"
              description="Monitor devices"
              onClick={() =>
                onNavigate("kiosks")
              }
            />

            <QuickAction
              icon={
                <FileBarChart
                  size={16}
                />
              }
              title="View Reports"
              description="System analytics"
              onClick={() =>
                onNavigate("reports")
              }
            />
          </div>
        </DashboardCard>
      </div>
    </div>
  );
}

/* =========================================================
   DOCTORS PAGE
========================================================= */

function DoctorsPage({
  doctors,
  onAdd,
  onEdit,
  onToggle,
  onDelete,
}: {
  doctors: Doctor[];
  onAdd: () => void;
  onEdit: (doctor: Doctor) => void;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}) {
  return (
    <PageLayout
      title="Doctors"
      subtitle="Manage registered Ayurveda physicians and clinical access."
      icon={
        <Stethoscope size={20} />
      }
      action={
        <PrimaryButton
          icon={<Plus size={14} />}
          onClick={onAdd}
        >
          Add Doctor
        </PrimaryButton>
      }
    >
      <TableCard>
        <table className="w-full min-w-[900px]">
          <thead>
            <tr className="border-b bg-[#F8F8F3]">
              <TableHead text="DOCTOR" />
              <TableHead text="SPECIALIZATION" />
              <TableHead text="DEPARTMENT" />
              <TableHead text="ROOM" />
              <TableHead text="STATUS" />
              <TableHead text="ACTIONS" right />
            </tr>
          </thead>

          <tbody>
            {doctors.map((doctor) => (
              <tr
                key={doctor.id}
                className="border-b last:border-0 hover:bg-[#FBFBF8]"
              >
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <div
                      className="flex h-9 w-9 items-center justify-center rounded-full text-[9px] font-semibold"
                      style={{
                        background:
                          "#DDEBDA",
                        color: C.green,
                      }}
                    >
                      {initials(
                        doctor.name,
                      )}
                    </div>

                    <div>
                      <p className="text-[10px] font-semibold text-[#304A41]">
                        {doctor.name}
                      </p>

                      <p className="mt-0.5 max-w-[280px] text-[8px] text-[#858C88]">
                        {
                          doctor.qualification
                        }
                      </p>
                    </div>
                  </div>
                </td>

                <td className="px-4 py-3 text-[9px] text-[#53655D]">
                  {
                    doctor.specialization
                  }
                </td>

                <td className="px-4 py-3 text-[9px] text-[#53655D]">
                  {doctor.department}
                </td>

                <td className="px-4 py-3 text-[9px] text-[#53655D]">
                  {doctor.room}
                </td>

                <td className="px-4 py-3">
                  <QueueStatus
                    status={
                      doctor.status
                    }
                  />
                </td>

                <td className="px-4 py-3">
                  <div className="flex justify-end gap-1">
                    <SmallIconButton
                      title="Edit"
                      onClick={() =>
                        onEdit(doctor)
                      }
                    >
                      <Edit3 size={13} />
                    </SmallIconButton>

                    <SmallIconButton
                      title="Toggle"
                      onClick={() =>
                        onToggle(
                          doctor.id,
                        )
                      }
                    >
                      <Power size={13} />
                    </SmallIconButton>

                    <SmallIconButton
                      title="Delete"
                      danger
                      onClick={() =>
                        onDelete(
                          doctor.id,
                        )
                      }
                    >
                      <Trash2
                        size={13}
                      />
                    </SmallIconButton>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </TableCard>
    </PageLayout>
  );
}

/* =========================================================
   PATIENTS PAGE
========================================================= */

function PatientsPage({
  patients,
  onOpen,
}: {
  patients: Patient[];
  onOpen: (patient: Patient) => void;
}) {
  return (
    <PageLayout
      title="Patients"
      subtitle="View patient registration and structured intake activity."
      icon={<Users size={20} />}
    >
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
        {patients.map((patient) => (
          <button
            key={patient.id}
            onClick={() => onOpen(patient)}
            className="rounded-2xl border bg-[#FFFEFA] p-4 text-left transition hover:-translate-y-[1px] hover:shadow-sm"
            style={{
              borderColor: C.border,
            }}
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-[8px] font-semibold tracking-[1px] text-[#7A847F]">
                  {patient.id}
                </p>

                <h3
                  className="mt-1 text-[16px] font-semibold"
                  style={{
                    fontFamily:
                      "'Georgia', serif",
                    color: "#294C40",
                  }}
                >
                  {patient.name}
                </h3>
              </div>

              <QueueStatus
                status={
                  patient.status
                }
              />
            </div>

            <div className="mt-4 space-y-2">
              <MiniInfo
                label="Complaint"
                value={
                  patient.complaint
                }
              />

              <MiniInfo
                label="Doctor"
                value={
                  patient.doctor
                }
              />

              <MiniInfo
                label="Registration"
                value={
                  patient.createdAt
                }
              />
            </div>

            <div
              className="mt-4 text-[8px] font-semibold"
              style={{
                color: C.green,
              }}
            >
              Open record
            </div>
          </button>
        ))}
      </div>
    </PageLayout>
  );
}

/* =========================================================
   APPOINTMENTS
========================================================= */

function AppointmentsPage({
  appointments,
}: {
  appointments: Appointment[];
}) {
  return (
    <PageLayout
      title="Appointments"
      subtitle="Monitor the current outpatient consultation schedule."
      icon={
        <CalendarDays size={20} />
      }
    >
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
        {appointments.map(
          (appointment) => (
            <div
              key={appointment.id}
              className="rounded-2xl border bg-[#FFFEFA] p-4"
              style={{
                borderColor: C.border,
              }}
            >
              <div className="flex items-center justify-between">
                <span className="text-[8px] font-semibold tracking-[1px] text-[#7B837E]">
                  {appointment.id}
                </span>

                <QueueStatus
                  status={
                    appointment.status
                  }
                />
              </div>

              <h3
                className="mt-2 text-[16px] font-semibold"
                style={{
                  fontFamily:
                    "'Georgia', serif",
                  color: "#294C40",
                }}
              >
                {appointment.patient}
              </h3>

              <div className="mt-3 space-y-2">
                <MiniInfo
                  label="Doctor"
                  value={
                    appointment.doctor
                  }
                />

                <MiniInfo
                  label="Department"
                  value={
                    appointment.department
                  }
                />

                <MiniInfo
                  label="Time"
                  value={
                    appointment.time
                  }
                />
              </div>
            </div>
          ),
        )}
      </div>
    </PageLayout>
  );
}

/* =========================================================
   KIOSKS
========================================================= */

function KiosksPage({
  kiosks,
  onEdit,
  onToggle,
  onHospital,
}: {
  kiosks: Kiosk[];
  onEdit: (kiosk: Kiosk) => void;
  onToggle: (id: string) => void;
  onHospital: () => void;
}) {
  return (
    <PageLayout
      title="Kiosk Management"
      subtitle="Monitor patient intake devices across the hospital."
      icon={<Monitor size={20} />}
      action={
        <SecondaryButton
          icon={<Edit3 size={13} />}
          onClick={onHospital}
        >
          Edit Hospital
        </SecondaryButton>
      }
    >
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
        {kiosks.map((kiosk) => (
          <div
            key={kiosk.id}
            className="relative overflow-hidden rounded-2xl border bg-[#FFFEFA] p-5"
            style={{
              borderColor: C.border,
            }}
          >
            <Leaf
              className="absolute -right-3 -top-2 rotate-12 opacity-20"
              size={60}
              style={{
                color:
                  C.greenMid,
              }}
            />

            <div className="relative">
              <div className="flex items-start justify-between">
                <div
                  className="flex h-10 w-10 items-center justify-center rounded-xl"
                  style={{
                    background:
                      "#E3EEE2",
                    color: C.green,
                  }}
                >
                  <Monitor size={18} />
                </div>

                <QueueStatus
                  status={
                    kiosk.status
                  }
                />
              </div>

              <h3
                className="mt-4 text-[17px] font-semibold"
                style={{
                  fontFamily:
                    "'Georgia', serif",
                  color: "#294C40",
                }}
              >
                {kiosk.name}
              </h3>

              <p className="mt-1 text-[9px] text-[#7B837E]">
                {kiosk.location}
              </p>

              <div className="mt-4 space-y-2">
                <MiniInfo
                  label="Department"
                  value={
                    kiosk.department
                  }
                />

                <MiniInfo
                  label="Last Sync"
                  value={
                    kiosk.lastSync
                  }
                />
              </div>

              <div className="mt-5 flex gap-2">
                <SecondaryButton
                  className="flex-1"
                  icon={
                    <Edit3 size={12} />
                  }
                  onClick={() =>
                    onEdit(kiosk)
                  }
                >
                  Edit
                </SecondaryButton>

                <SecondaryButton
                  className="flex-1"
                  icon={
                    <Power size={12} />
                  }
                  onClick={() =>
                    onToggle(
                      kiosk.id,
                    )
                  }
                >
                  {kiosk.status ===
                  "Online"
                    ? "Offline"
                    : "Online"}
                </SecondaryButton>
              </div>
            </div>
          </div>
        ))}
      </div>
    </PageLayout>
  );
}

/* =========================================================
   QUESTION PATHWAYS
========================================================= */

function QuestionsPage({
  questions,
  onAdd,
  onEdit,
  onToggle,
  onDelete,
}: {
  questions: ClinicalQuestion[];
  onAdd: () => void;
  onEdit: (
    question: ClinicalQuestion,
  ) => void;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}) {
  return (
    <PageLayout
      title="Question Pathways"
      subtitle="Manage physician-approved adaptive Ayurveda history questions."
      icon={
        <ClipboardList
          size={20}
        />
      }
      action={
        <PrimaryButton
          icon={<Plus size={14} />}
          onClick={onAdd}
        >
          Add Question
        </PrimaryButton>
      }
    >
      <div
        className="mb-4 rounded-2xl border p-4"
        style={{
          background:
            "#EFF5EC",
          borderColor:
            "#D8E5D5",
        }}
      >
        <div className="flex gap-3">
          <div
            className="flex h-9 w-9 items-center justify-center rounded-xl"
            style={{
              background:
                "#DDEBDD",
              color: C.green,
            }}
          >
            <Leaf size={17} />
          </div>

          <div>
            <p
              className="text-[14px] font-semibold"
              style={{
                fontFamily:
                  "'Georgia', serif",
                color: "#294D41",
              }}
            >
              Physician-Controlled
              Clinical Pathways
            </p>

            <p className="mt-1 max-w-[800px] text-[9px] leading-5 text-[#68766F]">
              MediKiosk uses structured,
              physician-approved
              pathways to determine
              relevant questions. The
              system does not
              autonomously diagnose the
              patient.
            </p>
          </div>
        </div>
      </div>

      <TableCard>
        <table className="w-full min-w-[950px]">
          <thead>
            <tr className="border-b bg-[#F8F8F3]">
              <TableHead text="SECTION" />
              <TableHead text="QUESTION" />
              <TableHead text="INPUT" />
              <TableHead text="REQUIRED" />
              <TableHead text="STATUS" />
              <TableHead text="ACTIONS" right />
            </tr>
          </thead>

          <tbody>
            {questions.map(
              (question) => (
                <tr
                  key={question.id}
                  className="border-b last:border-0 hover:bg-[#FBFBF8]"
                >
                  <td className="px-4 py-3">
                    <span
                      className="rounded-lg px-2 py-1 text-[8px] font-semibold"
                      style={{
                        background:
                          "#EEF3EB",
                        color:
                          "#426653",
                      }}
                    >
                      {
                        question.section
                      }
                    </span>
                  </td>

                  <td className="max-w-[430px] px-4 py-3 text-[9px] leading-5 text-[#53655D]">
                    {
                      question.question
                    }
                  </td>

                  <td className="px-4 py-3 text-[8px] text-[#6F7B75]">
                    {
                      question.inputType
                    }
                  </td>

                  <td className="px-4 py-3">
                    {question.required ? (
                      <CheckIcon />
                    ) : (
                      <span className="text-[#9B9E9A]">
                        —
                      </span>
                    )}
                  </td>

                  <td className="px-4 py-3">
                    <button
                      onClick={() =>
                        onToggle(
                          question.id,
                        )
                      }
                    >
                      <QueueStatus
                        status={
                          question.active
                            ? "Active"
                            : "Inactive"
                        }
                      />
                    </button>
                  </td>

                  <td className="px-4 py-3">
                    <div className="flex justify-end gap-1">
                      <SmallIconButton
                        title="Edit"
                        onClick={() =>
                          onEdit(
                            question,
                          )
                        }
                      >
                        <Edit3 size={13} />
                      </SmallIconButton>

                      <SmallIconButton
                        title="Delete"
                        danger
                        onClick={() =>
                          onDelete(
                            question.id,
                          )
                        }
                      >
                        <Trash2
                          size={13}
                        />
                      </SmallIconButton>
                    </div>
                  </td>
                </tr>
              ),
            )}
          </tbody>
        </table>
      </TableCard>
    </PageLayout>
  );
}

/* =========================================================
   AYURVEDA
========================================================= */

function AyurvedaPage() {
  const sections: [
    string,
    string,
    ReactNode,
  ][] = [
    [
      "Trividha Pariksha",
      "Configure physician-approved Trividha Pariksha content.",
      <ClipboardCheck size={19} />,
    ],
    [
      "Ashtavidha Pariksha",
      "Manage structured Ashtavidha Pariksha content.",
      <Activity size={19} />,
    ],
    [
      "Dashavidha Pariksha",
      "Manage physician-approved Dashavidha clinical context.",
      <BookOpen size={19} />,
    ],
    [
      "Prakriti",
      "Configure demographic and constitutional context.",
      <Leaf size={19} />,
    ],
    [
      "Vikriti",
      "Configure current-condition and lifestyle context.",
      <HeartPulse size={19} />,
    ],
    [
      "Agni & Koshtha",
      "Manage digestion and bowel-pattern history.",
      <ClipboardList size={19} />,
    ],
    [
      "Ahara-Vihara",
      "Configure food, lifestyle, sleep and daily routine.",
      <Globe2 size={19} />,
    ],
    [
      "Nidana & Samprapti",
      "Manage cause and progression content.",
      <FileText size={19} />,
    ],
  ];

  return (
    <PageLayout
      title="Ayurveda Content"
      subtitle="Manage the clinical knowledge structure used by MediKiosk."
      icon={<Leaf size={20} />}
    >
      <div
        className="mb-5 rounded-2xl border p-5"
        style={{
          background:
            "#EFF5EC",
          borderColor:
            "#D8E5D5",
        }}
      >
        <p className="text-[8px] font-semibold tracking-[1.7px] text-[#517262]">
          AYURVEDA CLINICAL
          CONFIGURATION
        </p>

        <h3
          className="mt-1 text-[20px] font-semibold"
          style={{
            fontFamily:
              "'Georgia', serif",
            color: "#284D40",
          }}
        >
          Structured clinical
          history
        </h3>

        <p className="mt-2 max-w-[850px] text-[9px] leading-5 text-[#68766F]">
          Maintain the physician-approved
          Ayurveda history structure without
          allowing the AI layer to
          independently create clinical
          questions or diagnoses.
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
        {sections.map(
          ([
            title,
            description,
            icon,
          ]) => (
            <ConfigCard
              key={title}
              title={title}
              description={
                description
              }
              icon={icon}
            />
          ),
        )}
      </div>
    </PageLayout>
  );
}

/* =========================================================
   REPORTS
========================================================= */

function ReportsPage({
  doctors,
  patients,
  kiosks,
  appointments,
}: {
  doctors: Doctor[];
  patients: Patient[];
  kiosks: Kiosk[];
  appointments: Appointment[];
}) {
  const completed =
    appointments.filter(
      (item) =>
        item.status ===
        "Completed",
    ).length;

  return (
    <PageLayout
      title="Reports & Analytics"
      subtitle="Operational and clinical workflow metrics."
      icon={
        <FileBarChart
          size={20}
        />
      }
    >
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <Metric
          title="Registered Doctors"
          value={doctors.length}
          icon={
            <Stethoscope
              size={17}
            />
          }
        />

        <Metric
          title="Patients"
          value={patients.length}
          icon={<Users size={17} />}
        />

        <Metric
          title="Active Kiosks"
          value={
            kiosks.filter(
              (item) =>
                item.status ===
                "Online",
            ).length
          }
          icon={
            <Monitor size={17} />
          }
        />

        <Metric
          title="Completed Appointments"
          value={completed}
          icon={
            <ClipboardCheck
              size={17}
            />
          }
        />
      </div>

      <div className="mt-4 grid gap-3 xl:grid-cols-2">
        <DashboardCard
          title="Patient Registration"
          subtitle="Last 7 days"
          icon={
            <BarChart3 size={18} />
          }
        >
          <div className="h-[260px]">
            <ResponsiveContainer
              width="100%"
              height="100%"
            >
              <BarChart
                data={registrationData}
              >
                <CartesianGrid
                  vertical={false}
                  stroke="#E7E5DE"
                />

                <XAxis
                  dataKey="day"
                  axisLine={false}
                  tickLine={false}
                  tick={{
                    fontSize: 8,
                    fill: "#727D77",
                  }}
                />

                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{
                    fontSize: 8,
                    fill: "#727D77",
                  }}
                />

                <Tooltip />

                <Bar
                  dataKey="patients"
                  fill="#4D8064"
                  radius={[
                    4,
                    4,
                    0,
                    0,
                  ]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </DashboardCard>

        <DashboardCard
          title="Appointment Distribution"
          subtitle="Today's consultation status"
          icon={
            <CalendarDays
              size={18}
            />
          }
        >
          <div className="h-[260px]">
            <ResponsiveContainer
              width="100%"
              height="100%"
            >
              <PieChart>
                <Pie
                  data={appointmentData}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={55}
                  outerRadius={85}
                  paddingAngle={3}
                >
                  <Cell fill="#32765A" />
                  <Cell fill="#9AA59F" />
                  <Cell fill="#B85A39" />
                </Pie>

                <Tooltip />

                <Legend
                  verticalAlign="bottom"
                  iconType="circle"
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </DashboardCard>
      </div>
    </PageLayout>
  );
}

/* =========================================================
   AUDIT
========================================================= */

function AuditPage() {
  const logs = [
    [
      "Doctor profile updated",
      "Admin",
      "Today, 10:42 AM",
      "Clinical",
    ],
    [
      "Kiosk 05 status changed",
      "Admin",
      "Today, 10:25 AM",
      "Device",
    ],
    [
      "Clinical question updated",
      "Admin",
      "Today, 09:42 AM",
      "Configuration",
    ],
    [
      "Patient record accessed",
      "Dr. Nipun Sancheti",
      "Today, 09:25 AM",
      "Clinical",
    ],
    [
      "System settings opened",
      "Admin",
      "Today, 09:10 AM",
      "System",
    ],
  ];

  return (
    <PageLayout
      title="Audit Logs"
      subtitle="Track important administrative and clinical system events."
      icon={<KeyRound size={20} />}
    >
      <div
        className="overflow-hidden rounded-2xl border bg-[#FFFEFA]"
        style={{
          borderColor: C.border,
        }}
      >
        {logs.map(
          ([
            action,
            user,
            time,
            type,
          ]) => (
            <div
              key={`${action}-${time}`}
              className="flex items-center gap-3 border-b px-4 py-4 last:border-0"
              style={{
                borderColor:
                  "#F0EEE8",
              }}
            >
              <div
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full"
                style={{
                  background:
                    "#E5EEE3",
                  color: C.green,
                }}
              >
                <Activity size={14} />
              </div>

              <div className="min-w-0 flex-1">
                <p className="text-[10px] font-semibold text-[#304B42]">
                  {action}
                </p>

                <p className="mt-1 text-[8px] text-[#808983]">
                  {user}
                </p>
              </div>

              <span className="hidden rounded-full bg-[#F0F3ED] px-2 py-1 text-[7px] text-[#607069] sm:block">
                {type}
              </span>

              <span className="text-[8px] text-[#929894]">
                {time}
              </span>
            </div>
          ),
        )}
      </div>
    </PageLayout>
  );
}

/* =========================================================
   SIMPLE PAGE
========================================================= */

function SimplePage({
  title,
  subtitle,
  icon,
  items,
}: {
  title: string;
  subtitle: string;
  icon: ReactNode;
  items: [
    string,
    string,
    ReactNode,
  ][];
}) {
  return (
    <PageLayout
      title={title}
      subtitle={subtitle}
      icon={icon}
    >
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
        {items.map(
          ([
            itemTitle,
            description,
            itemIcon,
          ]) => (
            <ConfigCard
              key={itemTitle}
              title={itemTitle}
              description={
                description
              }
              icon={itemIcon}
            />
          ),
        )}
      </div>
    </PageLayout>
  );
}

/* =========================================================
   PAGE LAYOUT
========================================================= */

function PageLayout({
  title,
  subtitle,
  icon,
  action,
  children,
}: {
  title: string;
  subtitle: string;
  icon: ReactNode;
  action?: ReactNode;
  children: ReactNode;
}) {
  return (
    <div>
      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div className="flex items-start gap-3">
          <div
            className="mt-0.5 flex h-9 w-9 items-center justify-center rounded-xl"
            style={{
              background:
                "#E4EEE1",
              color: C.green,
            }}
          >
            {icon}
          </div>

          <div>
            <h2
              className="text-[26px] font-bold tracking-[-0.7px]"
              style={{
                fontFamily:
                  "'Georgia', 'Times New Roman', serif",
                color:
                  C.greenDark,
              }}
            >
              {title}
            </h2>

            <p className="text-[9px] text-[#78817C]">
              {subtitle}
            </p>
          </div>
        </div>

        {action}
      </div>

      {children}
    </div>
  );
}

/* =========================================================
   TABLE CARD
========================================================= */

function TableCard({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div
      className="overflow-x-auto rounded-2xl border bg-[#FFFEFA]"
      style={{
        borderColor: C.border,
      }}
    >
      {children}
    </div>
  );
}

function TableHead({
  text,
  right = false,
}: {
  text: string;
  right?: boolean;
}) {
  return (
    <th
      className={`px-4 py-3 text-[8px] font-bold tracking-[1px] text-[#7A847F] ${
        right ? "text-right" : "text-left"
      }`}
    >
      {text}
    </th>
  );
}

/* =========================================================
   SIDEBAR
========================================================= */

function SidebarGroup({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="mt-5">
      <p className="mb-1.5 px-3 text-[8px] font-bold tracking-[1.6px] text-[#858B87]">
        {title}
      </p>

      <div className="space-y-0.5">
        {children}
      </div>
    </div>
  );
}

function SidebarItem({
  icon,
  label,
  active,
  onClick,
}: {
  icon: ReactNode;
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="flex w-full items-center gap-3 rounded-lg px-3 py-[7px] text-left text-[9px] font-medium transition hover:bg-[#F0F3EC]"
      style={{
        background: active
          ? "#E7EFE4"
          : "transparent",
        color: active
          ? C.greenDark
          : "#52635C",
      }}
    >
      <span
        style={{
          color: active
            ? C.green
            : "#66736D",
        }}
      >
        {icon}
      </span>

      {label}
    </button>
  );
}

/* =========================================================
   STAT CARD
========================================================= */

function StatCard({
  title,
  value,
  subtitle,
  icon,
  variant,
  onClick,
}: {
  title: string;
  value: number;
  subtitle: string;
  icon: ReactNode;
  variant:
    | "green"
    | "terracotta"
    | "blue"
    | "purple";
  onClick: () => void;
}) {
  const styles = {
    green: {
      bg: "#F4F8F1",
      iconBg: "#DFEDE0",
      icon: "#2E7157",
    },
    terracotta: {
      bg: "#FCF4ED",
      iconBg: "#F5E1D1",
      icon: "#AD5A37",
    },
    blue: {
      bg: "#F0F5F6",
      iconBg: "#DDEBED",
      icon: "#286077",
    },
    purple: {
      bg: "#F5F2F8",
      iconBg: "#E8E1F0",
      icon: "#43519A",
    },
  }[variant];

  return (
    <button
      onClick={onClick}
      className="relative min-h-[99px] overflow-hidden rounded-[13px] border p-4 text-left transition hover:-translate-y-[1px] hover:shadow-sm"
      style={{
        background: styles.bg,
        borderColor: C.border,
      }}
    >
      <Leaf
        size={45}
        className="absolute -bottom-3 -right-1 rotate-[-20deg] opacity-40"
        style={{
          color: styles.icon,
        }}
      />

      <div className="relative">
        <div
          className="flex h-[37px] w-[37px] items-center justify-center rounded-full"
          style={{
            background:
              styles.iconBg,
            color:
              styles.icon,
          }}
        >
          {icon}
        </div>

        <p className="mt-2 text-[9px] font-semibold text-[#40534B]">
          {title}
        </p>

        <div className="flex items-end gap-2">
          <span
            className="text-[25px] font-bold leading-none"
            style={{
              fontFamily:
                "'Georgia', serif",
              color:
                C.greenDark,
            }}
          >
            {value}
          </span>

          <span className="pb-0.5 text-[8px] text-[#7C847F]">
            {subtitle}
          </span>
        </div>
      </div>
    </button>
  );
}

/* =========================================================
   DASHBOARD CARD
========================================================= */

function DashboardCard({
  title,
  subtitle,
  icon,
  action,
  children,
}: {
  title: string;
  subtitle: string;
  icon: ReactNode;
  action?: ReactNode;
  children: ReactNode;
}) {
  return (
    <section
      className="rounded-[14px] border bg-[#FFFEFA] p-3.5"
      style={{
        borderColor: C.border,
      }}
    >
      <div className="mb-3 flex items-start justify-between">
        <div className="flex items-start gap-2">
          <div
            className="mt-0.5"
            style={{
              color: C.green,
            }}
          >
            {icon}
          </div>

          <div>
            <h3
              className="text-[16px] font-semibold leading-5"
              style={{
                fontFamily:
                  "'Georgia', serif",
                color: "#284B40",
              }}
            >
              {title}
            </h3>

            <p className="text-[8px] text-[#7C847F]">
              {subtitle}
            </p>
          </div>
        </div>

        {action}
      </div>

      {children}
    </section>
  );
}

/* =========================================================
   CONFIG CARD
========================================================= */

function ConfigCard({
  title,
  description,
  icon,
}: {
  title: string;
  description: string;
  icon: ReactNode;
}) {
  return (
    <div
      className="group relative min-h-[165px] rounded-2xl border bg-[#FFFEFA] p-5 text-left transition hover:-translate-y-[1px] hover:shadow-sm"
      style={{
        borderColor: C.border,
      }}
    >
      <div className="flex items-start justify-between">
        <div
          className="flex h-10 w-10 items-center justify-center rounded-xl"
          style={{
            background:
              "#E5EEE2",
            color: C.green,
          }}
        >
          {icon}
        </div>
      </div>

      <h3
        className="mt-4 text-[16px] font-semibold"
        style={{
          fontFamily:
            "'Georgia', serif",
          color: "#2B4D42",
        }}
      >
        {title}
      </h3>

      <p className="mt-2 text-[9px] leading-[17px] text-[#78817D]">
        {description}
      </p>

      <p
        className="mt-4 text-[8px] font-semibold"
        style={{
          color: C.green,
        }}
      >
        Configure
      </p>
    </div>
  );
}

/* =========================================================
   QUICK ACTION
========================================================= */

function QuickAction({
  icon,
  title,
  description,
  onClick,
}: {
  icon: ReactNode;
  title: string;
  description: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-3 rounded-xl border bg-[#FBFBF7] p-3 text-left hover:bg-[#F4F6F0]"
      style={{
        borderColor:
          "#E5E3DC",
      }}
    >
      <div
        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl"
        style={{
          background:
            "#E2EEE1",
          color: C.green,
        }}
      >
        {icon}
      </div>

      <div className="min-w-0">
        <p className="text-[9px] font-semibold text-[#3A5149]">
          {title}
        </p>

        <p className="mt-0.5 text-[8px] text-[#858C88]">
          {description}
        </p>
      </div>
    </button>
  );
}

/* =========================================================
   STATUS
========================================================= */

function QueueStatus({
  status,
}: {
  status: string;
}) {
  const normalized =
    status.toLowerCase();

  let background = "#ECEFEA";
  let color = "#657069";

  if (
    normalized === "active" ||
    normalized === "online" ||
    normalized === "completed"
  ) {
    background = "#E1F0E5";
    color = "#3A6D55";
  }

  if (
    normalized === "new" ||
    normalized.includes("awaiting")
  ) {
    background = "#F9E4D8";
    color = "#AA5637";
  }

  if (
    normalized.includes(
      "consultation",
    )
  ) {
    background = "#E4EAF7";
    color = "#50669B";
  }

  if (normalized === "waiting") {
    background = "#F8E6D4";
    color = "#A85B37";
  }

  if (
    normalized === "offline" ||
    normalized === "inactive" ||
    normalized === "cancelled"
  ) {
    background = "#F8E2DD";
    color = "#A94E37";
  }

  return (
    <span
      className="inline-flex whitespace-nowrap rounded-full px-2 py-1 text-[7px] font-semibold"
      style={{
        background,
        color,
      }}
    >
      {status}
    </span>
  );
}

/* =========================================================
   INFO
========================================================= */

function MiniInfo({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start justify-between gap-3">
      <span className="text-[8px] text-[#8A918D]">
        {label}
      </span>

      <span className="text-right text-[8px] font-medium text-[#56675F]">
        {value}
      </span>
    </div>
  );
}

function InfoBox({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-xl border bg-[#FAFAF7] p-3">
      <p className="text-[7px] font-semibold tracking-[1px] text-[#828A85]">
        {label.toUpperCase()}
      </p>

      <p className="mt-1 text-[9px] font-semibold text-[#3E574D]">
        {value}
      </p>
    </div>
  );
}

function NotificationRow({
  title,
  time,
}: {
  title: string;
  time: string;
}) {
  return (
    <div className="border-b px-4 py-3">
      <p className="text-[9px] font-semibold text-[#3D544B]">
        {title}
      </p>

      <p className="mt-1 text-[7px] text-[#8A918D]">
        {time}
      </p>
    </div>
  );
}

/* =========================================================
   METRIC
========================================================= */

function Metric({
  title,
  value,
  icon,
}: {
  title: string;
  value: number;
  icon: ReactNode;
}) {
  return (
    <div
      className="rounded-2xl border bg-[#FFFEFA] p-4"
      style={{
        borderColor: C.border,
      }}
    >
      <div className="flex items-center gap-3">
        <div
          className="flex h-9 w-9 items-center justify-center rounded-xl"
          style={{
            background:
              "#E5EEE3",
            color: C.green,
          }}
        >
          {icon}
        </div>

        <div>
          <p className="text-[8px] text-[#7C847F]">
            {title}
          </p>

          <p
            className="text-[23px] font-bold"
            style={{
              fontFamily:
                "'Georgia', serif",
              color:
                C.greenDark,
            }}
          >
            {value}
          </p>
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   FORM INPUTS
========================================================= */

function InputField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-[8px] font-semibold tracking-[.8px] text-[#69756F]">
        {label.toUpperCase()}
      </span>

      <input
        value={value}
        onChange={(event) =>
          onChange(
            event.target.value,
          )
        }
        className="w-full rounded-xl border bg-[#FCFCF9] px-3 py-2.5 text-[9px] text-[#344E45] outline-none focus:border-[#88A995] focus:ring-2 focus:ring-[#DCE8DD]"
        style={{
          borderColor:
            "#DDDCD5",
        }}
      />
    </label>
  );
}

function TextAreaField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-[8px] font-semibold tracking-[.8px] text-[#69756F]">
        {label.toUpperCase()}
      </span>

      <textarea
        value={value}
        onChange={(event) =>
          onChange(
            event.target.value,
          )
        }
        rows={4}
        className="w-full resize-none rounded-xl border bg-[#FCFCF9] px-3 py-2.5 text-[9px] leading-5 text-[#344E45] outline-none focus:border-[#88A995] focus:ring-2 focus:ring-[#DCE8DD]"
        style={{
          borderColor:
            "#DDDCD5",
        }}
      />
    </label>
  );
}

function SelectField({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-[8px] font-semibold tracking-[.8px] text-[#69756F]">
        {label.toUpperCase()}
      </span>

      <select
        value={value}
        onChange={(event) =>
          onChange(
            event.target.value,
          )
        }
        className="w-full rounded-xl border bg-[#FCFCF9] px-3 py-2.5 text-[9px] text-[#344E45] outline-none focus:border-[#88A995] focus:ring-2 focus:ring-[#DCE8DD]"
        style={{
          borderColor:
            "#DDDCD5",
        }}
      >
        {options.map(
          (option) => (
            <option
              key={option}
              value={option}
            >
              {option}
            </option>
          ),
        )}
      </select>
    </label>
  );
}

/* =========================================================
   BUTTONS
========================================================= */

function PrimaryButton({
  children,
  onClick,
  icon,
  className = "",
}: {
  children: ReactNode;
  onClick: () => void;
  icon?: ReactNode;
  className?: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-[9px] font-semibold text-white transition hover:brightness-95 ${className}`}
      style={{
        background: C.green,
      }}
    >
      {icon}
      {children}
    </button>
  );
}

function SecondaryButton({
  children,
  onClick,
  icon,
  className = "",
}: {
  children: ReactNode;
  onClick: () => void;
  icon?: ReactNode;
  className?: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center justify-center gap-2 rounded-xl border bg-white px-4 py-2.5 text-[9px] font-semibold text-[#50625A] hover:bg-[#F5F6F1] ${className}`}
      style={{
        borderColor:
          "#DDDCD4",
      }}
    >
      {icon}
      {children}
    </button>
  );
}

function SmallIconButton({
  children,
  onClick,
  title,
  danger = false,
}: {
  children: ReactNode;
  onClick: () => void;
  title: string;
  danger?: boolean;
}) {
  return (
    <button
      type="button"
      title={title}
      onClick={onClick}
      className="rounded-lg p-2 hover:bg-[#EDF2EA]"
      style={{
        color: danger
          ? "#A8523A"
          : "#60706A",
      }}
    >
      {children}
    </button>
  );
}

/* =========================================================
   MODAL
========================================================= */

function Modal({
  title,
  subtitle,
  onClose,
  children,
}: {
  title: string;
  subtitle: string;
  onClose: () => void;
  children: ReactNode;
}) {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#183D32]/30 p-4 backdrop-blur-sm">
      <div className="max-h-[90vh] w-full max-w-[680px] overflow-y-auto rounded-3xl border bg-[#FCFCF9] shadow-2xl">
        <div
          className="flex items-start justify-between border-b px-5 py-4"
          style={{
            borderColor:
              "#E7E5DE",
          }}
        >
          <div>
            <h3
              className="text-[20px] font-semibold"
              style={{
                fontFamily:
                  "'Georgia', serif",
                color: "#244A3E",
              }}
            >
              {title}
            </h3>

            <p className="mt-1 text-[9px] leading-4 text-[#7D8580]">
              {subtitle}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-xl p-2 hover:bg-[#EFF1EC]"
          >
            <X size={16} />
          </button>
        </div>

        <div className="p-5">
          {children}
        </div>
      </div>
    </div>
  );
}

function ModalButtons({
  onCancel,
  onSave,
  saveText,
}: {
  onCancel: () => void;
  onSave: () => void;
  saveText: string;
}) {
  return (
    <div className="mt-6 flex justify-end gap-2">
      <SecondaryButton
        onClick={onCancel}
      >
        Cancel
      </SecondaryButton>

      <PrimaryButton
        icon={<Save size={13} />}
        onClick={onSave}
      >
        {saveText}
      </PrimaryButton>
    </div>
  );
}

/* =========================================================
   ICON HELPERS
========================================================= */

function CheckIcon() {
  return (
    <span
      className="flex h-5 w-5 items-center justify-center rounded-full"
      style={{
        background: "#E1F0E5",
        color: C.green,
      }}
    >
      <svg
        width="11"
        height="11"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M20 6L9 17l-5-5" />
      </svg>
    </span>
  );
}

function CircleHelpIcon() {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="9" />

      <path d="M9.7 9a2.4 2.4 0 1 1 4.1 1.7c-.9.9-1.8 1.2-1.8 2.5" />

      <path d="M12 17h.01" />
    </svg>
  );
}

/* =========================================================
   HOSPITAL ICON
========================================================= */

function HospitalIcon() {
  return (
    <svg
      width="17"
      height="17"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 21h18" />

      <path d="M5 21V6a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v15" />

      <path d="M9 8h6" />

      <path d="M12 5v6" />

      <path d="M8 15h2" />

      <path d="M14 15h2" />

      <path d="M8 19h2" />

      <path d="M14 19h2" />
    </svg>
  );
}

/* =========================================================
   SIDEBAR FOOTER DECORATION
========================================================= */

function SidebarFooterDecoration() {
  return (
    <svg
      className="absolute bottom-[-8px] left-[-13px]"
      width="88"
      height="96"
      viewBox="0 0 88 96"
      fill="none"
    >
      <path
        d="M7 94C22 67 37 43 57 7"
        stroke="#789C7E"
        strokeWidth="1.7"
      />

      <path
        d="M22 73C8 67 6 55 11 46C21 47 29 55 29 64C29 68 26 71 22 73Z"
        fill="#B7CDB1"
      />

      <path
        d="M36 52C24 44 24 33 30 26C40 28 47 37 44 45C42 49 39 51 36 52Z"
        fill="#91B391"
      />

      <path
        d="M50 31C45 20 49 10 57 4C65 12 65 22 59 28C56 31 53 32 50 31Z"
        fill="#719878"
      />

      <path
        d="M49 83C62 71 75 68 85 72C79 82 68 89 58 90C54 90 51 87 49 83Z"
        fill="#91B391"
      />
    </svg>
  );
}

/* =========================================================
   HERO BOTANICAL
========================================================= */

function HeroBotanical() {
  return (
    <>
      <svg
        className="absolute bottom-[-30px] right-[-10px] h-[220px] w-[400px] opacity-75"
        viewBox="0 0 400 220"
        fill="none"
      >
        <path
          d="M310 220C281 177 282 119 313 72C343 27 378 13 400 10C396 61 376 109 345 144C326 166 315 194 310 220Z"
          fill="#AFC8AD"
        />

        <path
          d="M301 216C320 164 345 91 389 27"
          stroke="#6D9273"
          strokeWidth="2"
        />

        <path
          d="M278 217C234 182 216 137 225 92C235 48 267 21 292 8C304 56 297 101 275 137C259 164 261 192 278 217Z"
          fill="#8FB49A"
        />

        <path
          d="M275 210C267 157 264 90 286 31"
          stroke="#5C856B"
          strokeWidth="2"
        />

        <path
          d="M343 205C320 164 327 119 355 85C380 55 399 48 400 48C396 83 381 116 359 139C345 156 339 180 343 205Z"
          fill="#719A79"
        />

        <path
          d="M195 213C164 172 162 128 181 91C199 56 225 42 242 38C244 79 230 117 207 143C190 162 186 188 195 213Z"
          fill="#B9CDB3"
        />

        <path
          d="M195 207C196 159 211 97 236 48"
          stroke="#77957A"
          strokeWidth="1.6"
        />
      </svg>

      <svg
        className="absolute bottom-[-31px] right-[55px] hidden h-[150px] w-[180px] md:block"
        viewBox="0 0 180 150"
        fill="none"
      >
        <ellipse
          cx="90"
          cy="104"
          rx="63"
          ry="22"
          fill="#8C6844"
        />

        <path
          d="M28 99C30 129 54 143 90 144C126 143 150 129 152 99L143 67H37L28 99Z"
          fill="#A77B4E"
        />

        <ellipse
          cx="90"
          cy="67"
          rx="54"
          ry="17"
          fill="#87603D"
        />

        <ellipse
          cx="90"
          cy="65"
          rx="43"
          ry="10"
          fill="#6F4E31"
          opacity=".7"
        />

        <path
          d="M116 18C126 22 138 29 145 37"
          stroke="#855D38"
          strokeWidth="12"
          strokeLinecap="round"
        />

        <path
          d="M111 17C126 19 141 27 150 36"
          stroke="#B18A5E"
          strokeWidth="7"
          strokeLinecap="round"
        />
      </svg>
    </>
  );
}

/* =========================================================
   HELPERS
========================================================= */

function initials(name: string) {
  return name
    .replace("Dr. ", "")
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}

function getSectionTitle(
  section: AdminSection,
) {
  const titles: Record<
    AdminSection,
    string
  > = {
    dashboard: "Dashboard",
    doctors: "Doctors",
    patients: "Patients",
    staff: "Staff Members",
    roles: "Roles & Permissions",
    appointments: "Appointments",
    kiosks: "Kiosk Management",
    questions: "Question Pathways",
    ayurveda: "Ayurveda Content",
    reports: "Reports & Analytics",
    system: "System Settings",
    integrations: "Integrations",
    audit: "Audit Logs",
    data: "Data Management",
    support: "Support",
  };

  return titles[section];
}

function getSectionDescription(
  section: AdminSection,
) {
  const descriptions: Record<
    AdminSection,
    string
  > = {
    dashboard:
      "Overview of the MediKiosk ecosystem and current operations.",
    doctors:
      "Manage registered Ayurveda physicians and clinical access.",
    patients:
      "View patient registration and structured intake activity.",
    staff:
      "Manage registration, nursing and support staff.",
    roles:
      "Control access across the MediKiosk ecosystem.",
    appointments:
      "Monitor the current outpatient consultation schedule.",
    kiosks:
      "Monitor patient intake devices across the hospital.",
    questions:
      "Manage physician-approved adaptive Ayurveda history questions.",
    ayurveda:
      "Manage the clinical knowledge structure used by MediKiosk.",
    reports:
      "Operational and clinical workflow metrics.",
    system:
      "Configure MediKiosk platform-wide behaviour.",
    integrations:
      "Manage external healthcare and technology integrations.",
    audit:
      "Track important administrative and clinical system events.",
    data:
      "Manage platform data, backups and retention controls.",
    support:
      "MediKiosk administrator help and operational support.",
  };

  return descriptions[section];
}