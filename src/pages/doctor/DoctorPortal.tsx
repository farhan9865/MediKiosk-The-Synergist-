import { useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import {
  Activity,
  BarChart3,
  Bell,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  Clock3,
  FileText,
  Filter,
  Leaf,
  Menu,
  Search,
  Settings,
  UserRound,
  Users,
  X,
} from "lucide-react";

/* ========================================================================= */
/* TYPES                                                                     */
/* ========================================================================= */

type PatientStatus = "New" | "Completed";

type Patient = {
  token: string;
  name: string;
  age: number;
  gender: "M" | "F" | "Other";
  complaint: string;
  submittedAt: string;
  status: PatientStatus;

  clinicalNotes?: string;
  medicalHistory?: string;
  allergyStatus?: string;
  prakriti?: string;
  vikriti?: string;
  lifestyle?: string;
};

type Section =
  | "Dashboard"
  | "Patient Queue"
  | "Patient Records"
  | "Analytics"
  | "Profile"
  | "Settings";

type DoctorProfile = {
  name: string;
  qualification: string;
  specialization: string;
  experience: string;
  registration: string;
  department: string;
  room: string;
  email: string;
  mobile: string;
  opdHours: string;
  breakHours: string;
};

type PortalSettings = {
  patientNotifications: boolean;

  adaptiveHistory: boolean;
  prakritiContext: boolean;
  relevantHistory: boolean;
  completeHistoryAccess: boolean;

  clinicalSummary: boolean;
  bilingualSummary: boolean;
  sourceTraceability: boolean;
  physicianVerification: boolean;

  trividhaPariksha: boolean;
  ashtavidhaPariksha: boolean;
  dashavidhaPariksha: boolean;
  agniKoshtha: boolean;

  prescriptionReview: boolean;
  investigationReview: boolean;
  documentTimeline: boolean;

  redFlagAlerts: boolean;
  mandatoryClinicalReview: boolean;
  privacyMode: boolean;
  autoLock: boolean;

  largeTextMode: boolean;
};

/* ========================================================================= */
/* STORAGE HELPER                                                            */
/* ========================================================================= */

function loadStoredValue<T>(
  key: string,
  fallback: T,
): T {
  if (typeof window === "undefined") {
    return fallback;
  }

  try {
    const stored = localStorage.getItem(key);

    if (!stored) {
      return fallback;
    }

    return JSON.parse(stored) as T;
  } catch {
    return fallback;
  }
}

/* ========================================================================= */
/* INITIAL PATIENT DATA                                                      */
/* ========================================================================= */

const initialPatients: Patient[] = [
  {
    token: "A023",
    name: "Rajesh Patil",
    age: 45,
    gender: "M",
    complaint: "Shirashoola / Headache",
    submittedAt: "09:20 AM",
    status: "Completed",
    clinicalNotes:
      "Recurrent headache reported predominantly during the morning. History reviewed by physician.",
    medicalHistory:
      "No major previous medical or surgical history reported.",
    allergyStatus:
      "No known allergies reported.",
    prakriti:
      "To be reviewed by physician",
    vikriti:
      "Shirashoola symptoms under assessment",
    lifestyle:
      "Ahara-Vihara and daily routine information available.",
  },

  {
    token: "A024",
    name: "Sunita Deshmukh",
    age: 32,
    gender: "F",
    complaint: "Amlapitta / Acidity",
    submittedAt: "09:35 AM",
    status: "Completed",
    clinicalNotes:
      "Recurrent acidity and burning discomfort reported after meals. History reviewed.",
    medicalHistory:
      "Previous episodes of digestive discomfort reported.",
    allergyStatus:
      "No known allergies reported.",
    prakriti:
      "To be reviewed by physician",
    vikriti:
      "Amlapitta-related symptoms under assessment",
    lifestyle:
      "Dietary habits and Ahara-Vihara history available.",
  },

  {
    token: "A025",
    name: "Prakash Jadhav",
    age: 60,
    gender: "M",
    complaint: "Sandhishoola / Joint Pain",
    submittedAt: "10:10 AM",
    status: "Completed",
    clinicalNotes:
      "Long-standing joint discomfort reported. Physician review completed.",
    medicalHistory:
      "Previous musculoskeletal complaints reported.",
    allergyStatus:
      "No known allergies reported.",
    prakriti:
      "To be reviewed by physician",
    vikriti:
      "Sandhishoola symptoms",
    lifestyle:
      "Physical activity and daily routine information available.",
  },

  {
    token: "A026",
    name: "Meera Kulkarni",
    age: 28,
    gender: "F",
    complaint: "Kandu / Skin Itching",
    submittedAt: "10:30 AM",
    status: "Completed",
    clinicalNotes:
      "Intermittent skin itching and rash reported. History reviewed.",
    medicalHistory:
      "No significant previous history reported.",
    allergyStatus:
      "To be confirmed during consultation.",
    prakriti:
      "To be reviewed by physician",
    vikriti:
      "Current skin-related symptoms",
    lifestyle:
      "Lifestyle history collected through the kiosk.",
  },

  {
    token: "A027",
    name: "Amit Sharma",
    age: 35,
    gender: "M",
    complaint: "Anidra / Sleep Difficulty",
    submittedAt: "11:00 AM",
    status: "Completed",
    clinicalNotes:
      "Difficulty initiating and maintaining sleep reported over recent weeks.",
    medicalHistory:
      "No major previous history reported.",
    allergyStatus:
      "No known allergies reported.",
    prakriti:
      "To be reviewed by physician",
    vikriti:
      "Sleep-related concern under assessment",
    lifestyle:
      "Sleep routine and daily lifestyle information available.",
  },

  {
    token: "A028",
    name: "Kavita Nair",
    age: 42,
    gender: "F",
    complaint: "Kati Shoola / Back Pain",
    submittedAt: "11:15 AM",
    status: "Completed",
    clinicalNotes:
      "Back pain reported after prolonged physical activity. History reviewed.",
    medicalHistory:
      "Previous musculoskeletal complaints reported.",
    allergyStatus:
      "No known allergies reported.",
    prakriti:
      "To be reviewed by physician",
    vikriti:
      "Kati Shoola symptoms",
    lifestyle:
      "Physical activity and Ahara-Vihara details recorded.",
  },

  {
    token: "A029",
    name: "Vikram Reddy",
    age: 50,
    gender: "M",
    complaint: "Agnimandya / Poor Digestion",
    submittedAt: "11:40 AM",
    status: "New",
    clinicalNotes:
      "Patient reports heaviness and reduced digestive comfort.",
    medicalHistory:
      "Relevant history to be verified during consultation.",
    allergyStatus:
      "No known allergies reported.",
    prakriti:
      "To be reviewed",
    vikriti:
      "Digestive symptoms under assessment",
    lifestyle:
      "Dietary habits and daily routine available.",
  },

  {
    token: "A030",
    name: "Neha Gupta",
    age: 26,
    gender: "F",
    complaint: "Aruchi / Reduced Appetite",
    submittedAt: "11:55 AM",
    status: "New",
    clinicalNotes:
      "Reduced appetite reported with changes in daily eating pattern.",
    medicalHistory:
      "No major previous medical history reported.",
    allergyStatus:
      "No known allergies reported.",
    prakriti:
      "To be reviewed",
    vikriti:
      "Aruchi-related symptoms under assessment",
    lifestyle:
      "Ahara-Vihara and daily routine information available.",
  },

  {
    token: "A031",
    name: "Rahul Joshi",
    age: 39,
    gender: "M",
    complaint: "Pratishyaya / Nasal Symptoms",
    submittedAt: "12:10 PM",
    status: "New",
    clinicalNotes:
      "Recurrent nasal symptoms reported, particularly during seasonal changes.",
    medicalHistory:
      "Relevant respiratory history to be confirmed.",
    allergyStatus:
      "Allergy history requires physician review.",
    prakriti:
      "To be reviewed",
    vikriti:
      "Pratishyaya-related symptoms under assessment",
    lifestyle:
      "Environmental and lifestyle information collected.",
  },

  {
    token: "A032",
    name: "Pooja Desai",
    age: 31,
    gender: "F",
    complaint: "Kasa / Cough",
    submittedAt: "12:25 PM",
    status: "New",
    clinicalNotes:
      "Patient reports recurring cough. Complaint-specific history available.",
    medicalHistory:
      "Previous episodes to be verified.",
    allergyStatus:
      "To be confirmed.",
    prakriti:
      "To be reviewed",
    vikriti:
      "Kasa symptoms under assessment",
    lifestyle:
      "Ahara-Vihara and environmental history available.",
  },

  {
    token: "A033",
    name: "Mahesh Rao",
    age: 54,
    gender: "M",
    complaint: "Ajirna / Indigestion",
    submittedAt: "12:40 PM",
    status: "New",
    clinicalNotes:
      "Patient reports recurrent indigestion and abdominal discomfort.",
    medicalHistory:
      "Digestive history requires physician review.",
    allergyStatus:
      "No known allergies reported.",
    prakriti:
      "To be reviewed",
    vikriti:
      "Ajirna-related symptoms under assessment",
    lifestyle:
      "Meal pattern and Ahara-Vihara information available.",
  },
];

/* ========================================================================= */
/* DEFAULT DOCTOR PROFILE                                                    */
/* ========================================================================= */

const defaultProfile: DoctorProfile = {
  name: "Dr. Nipun Sancheti",

  qualification:
    "B.A.M.S , M.D , Counselling Psychologist.(sch)",

  specialization: "Kayachikitsa",

  experience: "8 Years",

  registration: "AYU-XXXXXX",

  department: "Ayurveda OPD",

  room: "Room 04",

  email: "drsanchetiayurveda@gmail.com",

  mobile: "9270322502",

  opdHours: "09:00 AM – 05:00 PM",

  breakHours: "01:00 PM – 02:00 PM",
};

/* ========================================================================= */
/* DEFAULT SETTINGS                                                          */
/* ========================================================================= */

const defaultSettings: PortalSettings = {
  patientNotifications: true,

  adaptiveHistory: true,
  prakritiContext: true,
  relevantHistory: true,
  completeHistoryAccess: true,

  clinicalSummary: true,
  bilingualSummary: true,
  sourceTraceability: true,
  physicianVerification: true,

  trividhaPariksha: true,
  ashtavidhaPariksha: true,
  dashavidhaPariksha: true,
  agniKoshtha: true,

  prescriptionReview: true,
  investigationReview: true,
  documentTimeline: true,

  redFlagAlerts: true,
  mandatoryClinicalReview: true,
  privacyMode: true,
  autoLock: true,

  largeTextMode: false,
};

/* ========================================================================= */
/* MAIN COMPONENT                                                            */
/* ========================================================================= */

export default function DoctorPortal() {
  const [activeSection, setActiveSection] =
    useState<Section>("Dashboard");

  const [patients, setPatients] =
    useState<Patient[]>(initialPatients);

  /*
   * Doctor profile is fixed in the prototype.
   *
   * The profile below is used directly instead of loading
   * an older doctor profile from localStorage.
   *
   * This means the updated doctor information appears
   * without requiring any browser-console changes.
   */

  const [profile] =
    useState<DoctorProfile>(defaultProfile);

  const [portalSettings, setPortalSettings] =
    useState<PortalSettings>(() =>
      loadStoredValue(
        "medikiosk-doctor-settings",
        defaultSettings,
      ),
    );

  const [search, setSearch] =
    useState("");

  const [statusFilter, setStatusFilter] =
    useState<"All" | PatientStatus>("All");

  const [mobileMenuOpen, setMobileMenuOpen] =
    useState(false);

  const [profileOpen, setProfileOpen] =
    useState(false);

  const [notificationsOpen, setNotificationsOpen] =
    useState(false);

  const [selectedPatient, setSelectedPatient] =
    useState<Patient | null>(null);

  const [message, setMessage] =
    useState<string | null>(null);

  /* ----------------------------------------------------------------------- */
  /* FORCE UPDATED DOCTOR PROFILE                                            */
  /* ----------------------------------------------------------------------- */

  useEffect(() => {
    localStorage.setItem(
      "medikiosk-doctor-profile",
      JSON.stringify(defaultProfile),
    );
  }, []);

  /* ----------------------------------------------------------------------- */
  /* PERSIST SETTINGS                                                        */
  /* ----------------------------------------------------------------------- */

  useEffect(() => {
    localStorage.setItem(
      "medikiosk-doctor-settings",
      JSON.stringify(portalSettings),
    );
  }, [portalSettings]);

  /* ----------------------------------------------------------------------- */
  /* PATIENT COUNTS                                                          */
  /* ----------------------------------------------------------------------- */

  const newPatients = patients.filter(
    (patient) =>
      patient.status === "New",
  ).length;

  const completedPatients = patients.filter(
    (patient) =>
      patient.status === "Completed",
  ).length;

  const totalPatients =
    patients.length;

  const completionRate =
    totalPatients > 0
      ? Math.round(
          (completedPatients /
            totalPatients) *
            100,
        )
      : 0;

  /* ----------------------------------------------------------------------- */
  /* FILTERED PATIENTS                                                       */
  /* ----------------------------------------------------------------------- */

  const filteredPatients = useMemo(() => {
    const query =
      search.trim().toLowerCase();

    return patients.filter(
      (patient) => {
        const matchesSearch =
          !query ||
          patient.name
            .toLowerCase()
            .includes(query) ||
          patient.token
            .toLowerCase()
            .includes(query) ||
          patient.complaint
            .toLowerCase()
            .includes(query);

        const matchesStatus =
          statusFilter === "All" ||
          patient.status ===
            statusFilter;

        return (
          matchesSearch &&
          matchesStatus
        );
      },
    );
  }, [
    patients,
    search,
    statusFilter,
  ]);

  /* ----------------------------------------------------------------------- */
  /* NAVIGATION                                                              */
  /* ----------------------------------------------------------------------- */

  const handleNavigation = (
    section: Section,
  ) => {
    setActiveSection(section);
    setMobileMenuOpen(false);
    setProfileOpen(false);
    setNotificationsOpen(false);
  };

  /* ----------------------------------------------------------------------- */
  /* TOAST                                                                   */
  /* ----------------------------------------------------------------------- */

  const showMessage = (
    text: string,
  ) => {
    setMessage(text);

    window.setTimeout(() => {
      setMessage(null);
    }, 3000);
  };

  /* ----------------------------------------------------------------------- */
  /* REVIEW PATIENT                                                          */
  /* ----------------------------------------------------------------------- */

  const handleReviewPatient = (
    patient: Patient,
  ) => {
    setSelectedPatient(patient);
  };

  /* ----------------------------------------------------------------------- */
  /* UPDATE PATIENT                                                          */
  /* ----------------------------------------------------------------------- */

  const handleUpdatePatient = (
    updatedPatient: Patient,
  ) => {
    setPatients(
      (currentPatients) =>
        currentPatients.map(
          (patient) =>
            patient.token ===
            updatedPatient.token
              ? updatedPatient
              : patient,
        ),
    );

    setSelectedPatient(
      updatedPatient,
    );

    showMessage(
      `${updatedPatient.name}'s history has been updated.`,
    );
  };

  /* ----------------------------------------------------------------------- */
  /* MARK PATIENT COMPLETED                                                  */
  /* ----------------------------------------------------------------------- */

  const handleMarkCompleted = () => {
    if (!selectedPatient) {
      return;
    }

    const updatedPatient: Patient = {
      ...selectedPatient,
      status: "Completed",
    };

    handleUpdatePatient(
      updatedPatient,
    );

    showMessage(
      `${updatedPatient.name}'s history has been marked as completed.`,
    );
  };

  /* ----------------------------------------------------------------------- */
  /* QUICK ACTION                                                            */
  /* ----------------------------------------------------------------------- */

  const handleQuickAction = (
    action: string,
  ) => {
    if (
      action ===
      "Search Patient"
    ) {
      setActiveSection(
        "Patient Queue",
      );

      showMessage(
        "Patient search is ready.",
      );

      return;
    }

    if (
      action ===
      "Review New Histories"
    ) {
      setStatusFilter("New");
      setActiveSection(
        "Patient Queue",
      );

      showMessage(
        "Showing histories awaiting review.",
      );

      return;
    }

    if (
      action ===
      "Ayurveda Clinical Focus"
    ) {
      setActiveSection(
        "Profile",
      );

      showMessage(
        "Opening Ayurveda clinical focus.",
      );

      return;
    }

    if (
      action ===
      "View Reports"
    ) {
      setActiveSection(
        "Analytics",
      );
    }
  };

  return (
    <div className="min-h-screen bg-[#F7F3E9] text-[#173F35]">

      {/* =================================================================== */}
      {/* MOBILE OVERLAY                                                      */}
      {/* =================================================================== */}

      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/20 lg:hidden"
          onClick={() =>
            setMobileMenuOpen(
              false,
            )
          }
        />
      )}

      {/* =================================================================== */}
      {/* SIDEBAR                                                             */}
      {/* =================================================================== */}

      <aside
        className={`fixed left-0 top-0 z-50 flex h-screen w-[266px] flex-col border-r border-[#E5E2D8] bg-[#FBFAF3] transition-transform duration-300 ${
          mobileMenuOpen
            ? "translate-x-0"
            : "-translate-x-full lg:translate-x-0"
        }`}
      >

        <div className="flex h-[101px] items-center border-b border-[#E5E2D8] px-7">

          <div className="flex items-center gap-3">

            <div className="relative flex h-[50px] w-[38px] items-center justify-center">

              <Leaf
                size={43}
                strokeWidth={1.7}
                className="rotate-[-22deg] text-[#24765E]"
              />

            </div>

            <div>

              <h1 className="font-serif text-[25px] font-semibold tracking-[-0.7px] text-[#164638]">
                MediKiosk
              </h1>

              <p className="mt-[-1px] max-w-[140px] text-[7px] leading-[9px] text-[#7B817C]">
                AI-Powered Ayurveda Clinical History Platform
              </p>

            </div>

          </div>

        </div>

        <nav className="flex-1 px-4 py-7">

          <SidebarItem
            icon={
              <BarChart3
                size={20}
              />
            }
            label="Dashboard"
            active={
              activeSection ===
              "Dashboard"
            }
            onClick={() =>
              handleNavigation(
                "Dashboard",
              )
            }
          />

          <SidebarItem
            icon={
              <Users
                size={20}
              />
            }
            label="Patient Queue"
            active={
              activeSection ===
              "Patient Queue"
            }
            onClick={() =>
              handleNavigation(
                "Patient Queue",
              )
            }
          />

          <SidebarItem
            icon={
              <FileText
                size={20}
              />
            }
            label="Patient Records"
            active={
              activeSection ===
              "Patient Records"
            }
            onClick={() =>
              handleNavigation(
                "Patient Records",
              )
            }
          />

          <SidebarItem
            icon={
              <BarChart3
                size={20}
              />
            }
            label="Analytics"
            active={
              activeSection ===
              "Analytics"
            }
            onClick={() =>
              handleNavigation(
                "Analytics",
              )
            }
          />

          <SidebarItem
            icon={
              <UserRound
                size={20}
              />
            }
            label="Profile"
            active={
              activeSection ===
              "Profile"
            }
            onClick={() =>
              handleNavigation(
                "Profile",
              )
            }
          />

          <SidebarItem
            icon={
              <Settings
                size={20}
              />
            }
            label="Settings"
            active={
              activeSection ===
              "Settings"
            }
            onClick={() =>
              handleNavigation(
                "Settings",
              )
            }
          />

        </nav>

        <div className="relative min-h-[190px] overflow-hidden px-6 pb-8">

          <div className="absolute bottom-[-30px] left-[18px] opacity-45">

            <Leaf
              size={128}
              strokeWidth={1}
              className="rotate-[-18deg] text-[#9FB3A6]"
            />

          </div>

          <div className="relative mt-2">

            <p className="font-serif text-[16px] leading-5 text-[#68776F]">
              Traditional Wisdom
            </p>

            <p className="font-serif text-[16px] leading-5 text-[#68776F]">
              Modern Care
            </p>

            <p className="mt-5 text-[11px] text-[#7B817C]">
              Developed by{" "}
              <span className="font-semibold text-[#B35B38]">
                The Synergist!
              </span>
            </p>

          </div>

        </div>

      </aside>

      {/* =================================================================== */}
      {/* MAIN                                                                */}
      {/* =================================================================== */}

      <main className="min-h-screen lg:ml-[266px]">

        {/* HEADER */}

        <header className="flex h-[101px] items-center justify-between border-b border-[#E5E2D8] bg-[#FBFAF3] px-5 md:px-9">

          <div className="flex items-center gap-4">

            <button
              onClick={() =>
                setMobileMenuOpen(
                  true,
                )
              }
              className="rounded-xl p-2 text-[#24483E] hover:bg-[#EEF2EB] lg:hidden"
              aria-label="Open menu"
            >
              <Menu size={23} />
            </button>

            <div>

              <h2 className="font-serif text-[27px] font-semibold text-[#173F35] md:text-[30px]">
                {activeSection}
              </h2>

              <p className="mt-1 text-[13px] text-[#7A817D]">
                Manage Patients
                <span className="mx-2 text-[#C7CAC5]">
                  ·
                </span>
                Review Histories
                <span className="mx-2 text-[#C7CAC5]">
                  ·
                </span>
                Provide Better Care
              </p>

            </div>

          </div>

          <div className="relative flex items-center gap-3">

            {/* NOTIFICATIONS */}

            <button
              onClick={() =>
                setNotificationsOpen(
                  !notificationsOpen,
                )
              }
              className="relative rounded-full p-2 text-[#24483E] hover:bg-[#EEF2EB]"
              aria-label="Notifications"
            >

              <Bell
                size={21}
                strokeWidth={1.8}
              />

              {newPatients >
                0 && (
                <span className="absolute right-1 top-0 flex h-[16px] min-w-[16px] items-center justify-center rounded-full bg-[#D74D4D] px-1 text-[9px] font-semibold text-white">
                  {newPatients}
                </span>
              )}

            </button>

            {notificationsOpen && (
              <NotificationDropdown
                newPatients={
                  newPatients
                }
              />
            )}

            {/* PROFILE */}

            <button
              onClick={() =>
                setProfileOpen(
                  !profileOpen,
                )
              }
              className="flex items-center gap-3 rounded-xl px-2 py-1.5 hover:bg-[#F0F3ED]"
            >

              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#E5F0E7]">

                <UserRound
                  size={21}
                  strokeWidth={1.8}
                  className="text-[#1C6650]"
                />

              </div>

              <div className="hidden max-w-[310px] text-left sm:block">

                <p className="text-[14px] font-semibold text-[#29473E]">
                  {profile.name}
                </p>

                <p className="max-w-[300px] text-[10px] leading-4 text-[#7C8580]">
                  {profile.qualification}
                </p>

              </div>

              <ChevronDown
                size={17}
                className="ml-1 shrink-0 text-[#52665F]"
              />

            </button>

            {profileOpen && (
              <div className="absolute right-0 top-[62px] z-[70] w-[310px] rounded-xl border border-[#E2E5DF] bg-white p-2 shadow-xl">

                <div className="border-b border-[#EDF0EC] px-3 py-3">

                  <p className="text-[13px] font-semibold text-[#29473E]">
                    {profile.name}
                  </p>

                  <p className="mt-1 text-[10px] leading-4 text-[#7C8580]">
                    {profile.qualification}
                  </p>

                  <p className="mt-2 text-[10px] text-[#7C8580]">
                    {profile.email}
                  </p>

                </div>

                <button
                  onClick={() => {
                    handleNavigation(
                      "Profile",
                    );

                    setProfileOpen(
                      false,
                    );
                  }}
                  className="flex w-full items-center gap-3 rounded-lg px-3 py-3 text-left text-[12px] text-[#43574F] hover:bg-[#F1F5F0]"
                >
                  <UserRound
                    size={17}
                  />

                  My Profile
                </button>

                <button
                  onClick={() => {
                    handleNavigation(
                      "Settings",
                    );

                    setProfileOpen(
                      false,
                    );
                  }}
                  className="flex w-full items-center gap-3 rounded-lg px-3 py-3 text-left text-[12px] text-[#43574F] hover:bg-[#F1F5F0]"
                >
                  <Settings
                    size={17}
                  />

                  Settings
                </button>

              </div>
            )}

          </div>

        </header>

        {/* ================================================================= */}
        {/* PAGE CONTENT                                                      */}
        {/* ================================================================= */}

        <div className="px-4 py-5 md:px-6 md:py-7">

          {activeSection ===
            "Dashboard" && (
            <DashboardSection
              patients={
                patients
              }
              filteredPatients={
                filteredPatients
              }
              newPatients={
                newPatients
              }
              completedPatients={
                completedPatients
              }
              search={
                search
              }
              setSearch={
                setSearch
              }
              statusFilter={
                statusFilter
              }
              setStatusFilter={
                setStatusFilter
              }
              onReview={
                handleReviewPatient
              }
              onQuickAction={
                handleQuickAction
              }
            />
          )}

          {activeSection ===
            "Patient Queue" && (
            <PatientQueueSection
              filteredPatients={
                filteredPatients
              }
              search={
                search
              }
              setSearch={
                setSearch
              }
              statusFilter={
                statusFilter
              }
              setStatusFilter={
                setStatusFilter
              }
              onReview={
                handleReviewPatient
              }
            />
          )}

          {activeSection ===
            "Patient Records" && (
            <PatientRecordsSection
              patients={
                patients
              }
              onReview={
                handleReviewPatient
              }
            />
          )}

          {activeSection ===
            "Analytics" && (
            <AnalyticsSection
              patients={
                patients
              }
              completionRate={
                completionRate
              }
            />
          )}

          {activeSection ===
            "Profile" && (
            <ProfileSection
              profile={
                profile
              }
            />
          )}

          {activeSection ===
            "Settings" && (
            <SettingsSection
              settings={
                portalSettings
              }
              setSettings={
                setPortalSettings
              }
            />
          )}

        </div>

      </main>

      {/* =================================================================== */}
      {/* TOAST                                                               */}
      {/* =================================================================== */}

      {message && (
        <div className="fixed bottom-6 right-6 z-[120] flex items-center gap-3 rounded-xl bg-[#174F40] px-5 py-3 text-white shadow-xl">

          <CheckCircle2
            size={18}
          />

          <span className="text-[12px] font-medium">
            {message}
          </span>

        </div>
      )}

      {/* =================================================================== */}
      {/* PATIENT MODAL                                                       */}
      {/* =================================================================== */}

      {selectedPatient && (
        <PatientReviewModal
          patient={
            selectedPatient
          }
          onClose={() =>
            setSelectedPatient(
              null,
            )
          }
          onMarkCompleted={
            handleMarkCompleted
          }
        />
      )}

    </div>
  );
}

/* ========================================================================= */
/* DASHBOARD                                                                 */
/* ========================================================================= */

function DashboardSection({
  patients,
  filteredPatients,
  newPatients,
  completedPatients,
  search,
  setSearch,
  statusFilter,
  setStatusFilter,
  onReview,
  onQuickAction,
}: {
  patients: Patient[];
  filteredPatients: Patient[];
  newPatients: number;
  completedPatients: number;
  search: string;
  setSearch: (
    value: string,
  ) => void;
  statusFilter:
    | "All"
    | PatientStatus;
  setStatusFilter: (
    value:
      | "All"
      | PatientStatus,
  ) => void;
  onReview: (
    patient: Patient,
  ) => void;
  onQuickAction: (
    action: string,
  ) => void;
}) {
  return (
    <>
      <section className="relative mb-5 min-h-[130px] overflow-hidden rounded-xl border border-[#E2E7DF] bg-gradient-to-r from-[#F0F6EF] to-[#F8FAF5] px-7 py-7">

        <div className="relative z-10">

          <p className="mb-1 text-[10px] font-semibold uppercase tracking-[1px] text-[#628274]">
            Ayurveda Clinical Portal
          </p>

          <h3 className="font-serif text-[27px] font-semibold tracking-[-0.5px] text-[#164638] md:text-[30px]">
            Good Morning, Doctor
          </h3>

          <p className="mt-1 text-[15px] text-[#74807A]">
            Your patients&apos;
            stories help build a
            healthier tomorrow.
          </p>

        </div>

        <div className="absolute bottom-[-28px] right-[100px] opacity-55">

          <Leaf
            size={105}
            strokeWidth={1}
            className="rotate-[-12deg] text-[#78A391]"
          />

        </div>

        <div className="absolute bottom-[-35px] right-[45px] opacity-40">

          <Leaf
            size={90}
            strokeWidth={1}
            className="rotate-[20deg] text-[#88AA99]"
          />

        </div>

      </section>

      <section className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3">

        <StatCard
          icon={
            <Users
              size={27}
            />
          }
          value={String(
            newPatients,
          )}
          label="Patients Awaiting Review"
          type="green"
        />

        <StatCard
          icon={
            <FileText
              size={27}
            />
          }
          value={String(
            completedPatients,
          )}
          label="Completed Histories"
          type="blue"
        />

        <StatCard
          icon={
            <Activity
              size={27}
            />
          }
          value={String(
            patients.length,
          )}
          label="Total Patient Records"
          type="purple"
        />

      </section>

      <section className="grid grid-cols-1 gap-5 xl:grid-cols-[minmax(0,1fr)_338px]">

        <PatientQueueCard
          filteredPatients={
            filteredPatients
          }
          search={
            search
          }
          setSearch={
            setSearch
          }
          statusFilter={
            statusFilter
          }
          setStatusFilter={
            setStatusFilter
          }
          onReview={
            onReview
          }
        />

        <div className="space-y-5">

          <ClinicalActivityCard
            patients={
              patients
            }
          />

          <QuickActionsCard
            onQuickAction={
              onQuickAction
            }
          />

          <BetterHealthCard />

        </div>

      </section>
    </>
  );
}

/* ========================================================================= */
/* CLINICAL ACTIVITY                                                         */
/* ========================================================================= */

function ClinicalActivityCard({
  patients,
}: {
  patients: Patient[];
}) {
  const newCount =
    patients.filter(
      (patient) =>
        patient.status ===
        "New",
    ).length;

  const completedCount =
    patients.filter(
      (patient) =>
        patient.status ===
        "Completed",
    ).length;

  return (
    <div className="rounded-xl border border-[#E1E6E1] bg-white p-5 shadow-sm">

      <div className="mb-4 flex items-center justify-between">

        <h3 className="font-serif text-[19px] font-semibold text-[#17473A]">
          Clinical Activity
        </h3>

        <Activity
          size={19}
          className="text-[#39775F]"
        />

      </div>

      <div className="space-y-3">

        <ClinicalActivityRow
          label="Histories awaiting review"
          value={String(
            newCount,
          )}
        />

        <ClinicalActivityRow
          label="Completed histories"
          value={String(
            completedCount,
          )}
        />

        <ClinicalActivityRow
          label="Total patient records"
          value={String(
            patients.length,
          )}
        />

      </div>

    </div>
  );
}

function ClinicalActivityRow({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center justify-between rounded-lg bg-[#F5F8F4] px-3 py-3">

      <span className="text-[10px] font-medium text-[#60736A]">
        {label}
      </span>

      <span className="font-serif text-[20px] font-semibold text-[#245648]">
        {value}
      </span>

    </div>
  );
}

/* ========================================================================= */
/* PATIENT QUEUE PAGE                                                        */
/* ========================================================================= */

function PatientQueueSection({
  filteredPatients,
  search,
  setSearch,
  statusFilter,
  setStatusFilter,
  onReview,
}: {
  filteredPatients: Patient[];
  search: string;
  setSearch: (
    value: string,
  ) => void;
  statusFilter:
    | "All"
    | PatientStatus;
  setStatusFilter: (
    value:
      | "All"
      | PatientStatus,
  ) => void;
  onReview: (
    patient: Patient,
  ) => void;
}) {
  return (
    <div className="rounded-xl border border-[#E1E6E1] bg-white shadow-sm">

      <div className="border-b border-[#E5E9E5] px-6 py-5">

        <h3 className="font-serif text-[23px] font-semibold text-[#17473A]">
          Patient Queue
        </h3>

        <p className="mt-1 text-[12px] text-[#818984]">
          Review submitted histories and attend to patients.
        </p>

      </div>

      <div className="p-5">

        <PatientQueueCard
          filteredPatients={
            filteredPatients
          }
          search={
            search
          }
          setSearch={
            setSearch
          }
          statusFilter={
            statusFilter
          }
          setStatusFilter={
            setStatusFilter
          }
          onReview={
            onReview
          }
          embedded
        />

      </div>

    </div>
  );
}

/* ========================================================================= */
/* PATIENT QUEUE CARD                                                        */
/* ========================================================================= */

function PatientQueueCard({
  filteredPatients,
  search,
  setSearch,
  statusFilter,
  setStatusFilter,
  onReview,
  embedded = false,
}: {
  filteredPatients: Patient[];
  search: string;
  setSearch: (
    value: string,
  ) => void;
  statusFilter:
    | "All"
    | PatientStatus;
  setStatusFilter: (
    value:
      | "All"
      | PatientStatus,
  ) => void;
  onReview: (
    patient: Patient,
  ) => void;
  embedded?: boolean;
}) {
  return (
    <div
      className={
        embedded
          ? ""
          : "overflow-hidden rounded-xl border border-[#E1E6E1] bg-white shadow-sm"
      }
    >

      {!embedded && (
        <div className="border-b border-[#E5E9E5] px-5 pb-4 pt-5">

          <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">

            <div>

              <h3 className="font-serif text-[20px] font-semibold text-[#17473A]">
                Patient Queue
              </h3>

              <p className="mt-1 text-[12px] text-[#818984]">
                Review submitted histories and attend to patients.
              </p>

            </div>

            <QueueControls
              search={
                search
              }
              setSearch={
                setSearch
              }
              statusFilter={
                statusFilter
              }
              setStatusFilter={
                setStatusFilter
              }
            />

          </div>

        </div>
      )}

      {embedded && (
        <div className="mb-5 flex justify-end">

          <QueueControls
            search={
              search
            }
            setSearch={
              setSearch
            }
            statusFilter={
              statusFilter
            }
            setStatusFilter={
              setStatusFilter
            }
          />

        </div>
      )}

      <div className="overflow-x-auto">

        <table className="w-full min-w-[800px] border-collapse">

          <thead>

            <tr className="bg-[#F7F9F7] text-left">

              <th className="px-5 py-3 text-[11px] font-semibold text-[#6D7772]">
                #
              </th>

              <th className="px-3 py-3 text-[11px] font-semibold text-[#6D7772]">
                Token No.
              </th>

              <th className="px-3 py-3 text-[11px] font-semibold text-[#6D7772]">
                Patient Name
              </th>

              <th className="px-3 py-3 text-[11px] font-semibold text-[#6D7772]">
                Age / Gender
              </th>

              <th className="px-3 py-3 text-[11px] font-semibold text-[#6D7772]">
                Chief Complaint
              </th>

              <th className="px-3 py-3 text-[11px] font-semibold text-[#6D7772]">
                Submitted At
              </th>

              <th className="px-3 py-3 text-[11px] font-semibold text-[#6D7772]">
                Status
              </th>

              <th className="px-5 py-3 text-[11px] font-semibold text-[#6D7772]">
                Action
              </th>

            </tr>

          </thead>

          <tbody>

            {filteredPatients.map(
              (
                patient,
                index,
              ) => (
                <tr
                  key={
                    patient.token
                  }
                  className="border-t border-[#EDF0ED] transition hover:bg-[#FAFCF9]"
                >

                  <td className="px-5 py-3 text-[12px] text-[#4E5C56]">
                    {index + 1}
                  </td>

                  <td className="px-3 py-3">

                    <span className="inline-flex rounded-md bg-[#E7F3E9] px-3 py-1.5 text-[11px] font-semibold text-[#247152]">
                      {
                        patient.token
                      }
                    </span>

                  </td>

                  <td className="px-3 py-3 text-[12px] font-semibold text-[#354B43]">
                    {
                      patient.name
                    }
                  </td>

                  <td className="px-3 py-3 text-[12px] text-[#5D6964]">
                    {
                      patient.age
                    }{" "}
                    /{" "}
                    {
                      patient.gender
                    }
                  </td>

                  <td className="px-3 py-3 text-[12px] text-[#45564F]">
                    {
                      patient.complaint
                    }
                  </td>

                  <td className="px-3 py-3 text-[12px] text-[#66716C]">
                    {
                      patient.submittedAt
                    }
                  </td>

                  <td className="px-3 py-3">

                    <StatusBadge
                      status={
                        patient.status
                      }
                    />

                  </td>

                  <td className="px-5 py-3">

                    <button
                      onClick={() =>
                        onReview(
                          patient,
                        )
                      }
                      className={`inline-flex items-center gap-1 rounded-md px-4 py-2 text-[11px] font-semibold transition ${
                        patient.status ===
                        "New"
                          ? "bg-[#145846] text-white hover:bg-[#0F4738]"
                          : "border border-[#DCE2DD] bg-white text-[#445850] hover:bg-[#F5F8F5]"
                      }`}
                    >

                      {patient.status ===
                      "New"
                        ? "Review"
                        : "Completed"}

                      {patient.status ===
                        "New" && (
                        <ChevronRight
                          size={14}
                        />
                      )}

                    </button>

                  </td>

                </tr>
              ),
            )}

          </tbody>

        </table>

        {filteredPatients.length ===
          0 && (
          <div className="px-6 py-12 text-center">

            <FileText
              size={30}
              className="mx-auto mb-3 text-[#9AA59F]"
            />

            <p className="text-sm font-medium text-[#50625A]">
              No patients found
            </p>

            <p className="mt-1 text-xs text-[#8A938E]">
              Try changing your search or filter.
            </p>

          </div>
        )}

      </div>

    </div>
  );
}

/* ========================================================================= */
/* QUEUE CONTROLS                                                            */
/* ========================================================================= */

function QueueControls({
  search,
  setSearch,
  statusFilter,
  setStatusFilter,
}: {
  search: string;
  setSearch: (
    value: string,
  ) => void;
  statusFilter:
    | "All"
    | PatientStatus;
  setStatusFilter: (
    value:
      | "All"
      | PatientStatus,
  ) => void;
}) {
  return (
    <div className="flex w-full gap-2 sm:w-auto">

      <div className="relative min-w-0 flex-1 sm:w-[270px]">

        <Search
          size={17}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-[#929A95]"
        />

        <input
          value={
            search
          }
          onChange={(
            event,
          ) =>
            setSearch(
              event.target
                .value,
            )
          }
          placeholder="Search by name, token no., or complaint..."
          className="h-10 w-full rounded-lg border border-[#E0E4E0] bg-[#FCFCFA] pl-9 pr-3 text-[12px] text-[#29463E] outline-none transition focus:border-[#79A894] focus:ring-2 focus:ring-[#DCEBE2]"
        />

      </div>

      <button
        onClick={() => {
          if (
            statusFilter ===
            "All"
          ) {
            setStatusFilter(
              "New",
            );
          } else if (
            statusFilter ===
            "New"
          ) {
            setStatusFilter(
              "Completed",
            );
          } else {
            setStatusFilter(
              "All",
            );
          }
        }}
        className="flex h-10 items-center gap-2 rounded-lg border border-[#E0E4E0] bg-white px-3 text-[12px] font-medium text-[#3E5950] hover:bg-[#F5F8F5]"
      >

        <Filter
          size={15}
        />

        <span className="hidden sm:inline">
          {
            statusFilter
          }
        </span>

        <ChevronDown
          size={14}
        />

      </button>

    </div>
  );
}

/* ========================================================================= */
/* PATIENT RECORDS                                                           */
/* ========================================================================= */

function PatientRecordsSection({
  patients,
  onReview,
}: {
  patients: Patient[];
  onReview: (
    patient: Patient,
  ) => void;
}) {
  return (
    <div className="rounded-xl border border-[#E1E6E1] bg-white p-6 shadow-sm">

      <div className="mb-6">

        <h3 className="font-serif text-[24px] font-semibold text-[#17473A]">
          Patient Records
        </h3>

        <p className="mt-1 text-[12px] text-[#818984]">
          Access submitted patient histories and clinical records.
        </p>

      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">

        {patients.map(
          (patient) => (
            <button
              key={
                patient.token
              }
              onClick={() =>
                onReview(
                  patient,
                )
              }
              className="rounded-xl border border-[#E4E9E4] bg-[#FBFCF9] p-5 text-left transition hover:-translate-y-0.5 hover:border-[#BCD0C2] hover:shadow-sm"
            >

              <div className="flex items-start justify-between">

                <span className="rounded-md bg-[#E7F3E9] px-3 py-1.5 text-[10px] font-semibold text-[#247152]">
                  {
                    patient.token
                  }
                </span>

                <StatusBadge
                  status={
                    patient.status
                  }
                />

              </div>

              <h4 className="mt-4 text-[14px] font-semibold text-[#354B43]">
                {
                  patient.name
                }
              </h4>

              <p className="mt-1 text-[11px] text-[#6B7771]">
                {
                  patient.age
                }{" "}
                years ·{" "}
                {
                  patient.gender
                }
              </p>

              <div className="mt-4 rounded-lg bg-[#F1F6F0] p-3">

                <p className="text-[9px] uppercase tracking-[0.7px] text-[#7C8B83]">
                  Chief Concern
                </p>

                <p className="mt-1 text-[12px] font-semibold text-[#31584B]">
                  {
                    patient.complaint
                  }
                </p>

              </div>

            </button>
          ),
        )}

      </div>

    </div>
  );
}

/* ========================================================================= */
/* ANALYTICS                                                                 */
/* ========================================================================= */

function AnalyticsSection({
  patients,
  completionRate,
}: {
  patients: Patient[];
  completionRate: number;
}) {
  const total =
    patients.length;

  const completed =
    patients.filter(
      (patient) =>
        patient.status ===
        "Completed",
    ).length;

  const newCount =
    patients.filter(
      (patient) =>
        patient.status ===
        "New",
    ).length;

  const complaintCounts =
    patients.reduce<
      Record<
        string,
        number
      >
    >(
      (
        accumulator,
        patient,
      ) => {
        accumulator[
          patient.complaint
        ] =
          (accumulator[
            patient.complaint
          ] || 0) + 1;

        return accumulator;
      },
      {},
    );

  const topComplaints =
    Object.entries(
      complaintCounts,
    )
      .sort(
        (a, b) =>
          b[1] - a[1],
      )
      .slice(
        0,
        8,
      );

  return (
    <div className="space-y-5">

      <section className="rounded-xl border border-[#E1E6E1] bg-white p-6 shadow-sm md:p-7">

        <div>

          <h3 className="font-serif text-[24px] font-semibold text-[#17473A]">
            Analytics
          </h3>

          <p className="mt-1 text-[12px] text-[#818984]">
            Overview of patient intake, history review and Ayurveda clinical activity.
          </p>

        </div>

        <div className="mt-7 grid gap-4 sm:grid-cols-3">

          <AnalyticsMetric
            label="Total Patients"
            value={String(
              total,
            )}
            detail="Patient records"
            icon={
              <Users
                size={20}
              />
            }
          />

          <AnalyticsMetric
            label="Awaiting Review"
            value={String(
              newCount,
            )}
            detail="Histories pending"
            icon={
              <Clock3
                size={20}
              />
            }
          />

          <AnalyticsMetric
            label="Completed"
            value={String(
              completed,
            )}
            detail="Histories completed"
            icon={
              <CheckCircle2
                size={20}
              />
            }
          />

        </div>

      </section>

      <section className="rounded-xl border border-[#E1E6E1] bg-white p-6 shadow-sm md:p-7">

        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">

          <div>

            <h4 className="font-serif text-[20px] font-semibold text-[#315449]">
              History Review Progress
            </h4>

            <p className="mt-1 text-[11px] text-[#818984]">
              Percentage of submitted histories completed by the physician.
            </p>

          </div>

          <p className="font-serif text-[28px] font-semibold text-[#1D5A49]">
            {
              completionRate
            }%
          </p>

        </div>

        <div className="mt-5 h-3 overflow-hidden rounded-full bg-[#E8ECE7]">

          <div
            className="h-full rounded-full bg-[#2A755D] transition-all duration-500"
            style={{
              width: `${completionRate}%`,
            }}
          />

        </div>

        <p className="mt-3 text-[11px] text-[#78847E]">
          {
            completed
          }{" "}
          of{" "}
          {total}{" "}
          patient histories completed.
        </p>

      </section>

      <section className="grid gap-5 xl:grid-cols-2">

        <div className="rounded-xl border border-[#E1E6E1] bg-white p-6 shadow-sm">

          <div className="flex items-start gap-3">

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#E8F4E9]">

              <Leaf
                size={20}
                className="text-[#2D795D]"
              />

            </div>

            <div>

              <h4 className="font-serif text-[20px] font-semibold text-[#315449]">
                Common Ayurveda Concerns
              </h4>

              <p className="mt-1 text-[11px] text-[#818984]">
                Current distribution of patient-reported Ayurveda concerns.
              </p>

            </div>

          </div>

          <div className="mt-6 space-y-4">

            {topComplaints.map(
              ([
                complaint,
                count,
              ]) => {
                const percentage =
                  total > 0
                    ? Math.round(
                        (count /
                          total) *
                          100,
                      )
                    : 0;

                return (
                  <div
                    key={
                      complaint
                    }
                  >

                    <div className="flex justify-between gap-4">

                      <span className="text-[11px] font-semibold text-[#4A5D55]">
                        {
                          complaint
                        }
                      </span>

                      <span className="text-[10px] text-[#7C8982]">
                        {
                          count
                        }{" "}
                        patient
                        {count !==
                        1
                          ? "s"
                          : ""}
                      </span>

                    </div>

                    <div className="mt-2 h-2 overflow-hidden rounded-full bg-[#EDF1EC]">

                      <div
                        className="h-full rounded-full bg-[#6B9983] transition-all duration-500"
                        style={{
                          width: `${percentage}%`,
                        }}
                      />

                    </div>

                  </div>
                );
              },
            )}

          </div>

        </div>

        <div className="rounded-xl border border-[#E1E6E1] bg-white p-6 shadow-sm">

          <h4 className="font-serif text-[20px] font-semibold text-[#315449]">
            Clinical Workload
          </h4>

          <p className="mt-1 text-[11px] text-[#818984]">
            Current physician workload indicators.
          </p>

          <div className="mt-6 space-y-3">

            <WorkloadRow
              label="Histories awaiting review"
              value={String(
                newCount,
              )}
              icon={
                <FileText
                  size={18}
                />
              }
            />

            <WorkloadRow
              label="Completed histories"
              value={String(
                completed,
              )}
              icon={
                <CheckCircle2
                  size={18}
                />
              }
            />

            <WorkloadRow
              label="Total patient records"
              value={String(
                total,
              )}
              icon={
                <Users
                  size={18}
                />
              }
            />

            <WorkloadRow
              label="Clinical concerns recorded"
              value={String(
                topComplaints.length,
              )}
              icon={
                <Leaf
                  size={18}
                />
              }
            />

          </div>

          <div className="mt-5 rounded-xl bg-[#F1F6F0] p-4">

            <div className="flex items-start gap-3">

              <Leaf
                size={19}
                className="mt-0.5 shrink-0 text-[#2D795D]"
              />

              <p className="text-[10px] leading-5 text-[#63766D]">
                MediKiosk organizes patient-reported information before consultation so the physician can focus on clinical examination, reasoning and counselling.
              </p>

            </div>

          </div>

        </div>

      </section>

    </div>
  );
}

/* ========================================================================= */
/* PROFILE                                                                   */
/* ========================================================================= */

function ProfileSection({
  profile,
}: {
  profile: DoctorProfile;
}) {
  return (
    <div className="space-y-5">

      {/* PROFILE HERO */}

      <section className="overflow-hidden rounded-xl border border-[#E1E6E1] bg-white shadow-sm">

        <div className="relative overflow-hidden bg-gradient-to-r from-[#EEF6EF] to-[#F8FAF5] px-6 py-7 md:px-8">

          <div className="pointer-events-none absolute right-8 top-[-40px] opacity-20">

            <Leaf
              size={155}
              strokeWidth={1}
              className="rotate-[18deg] text-[#287253]"
            />

          </div>

          <div className="relative z-10 flex flex-col justify-between gap-6 md:flex-row md:items-center">

            <div className="flex items-center gap-5">

              <div className="flex h-[82px] w-[82px] shrink-0 items-center justify-center rounded-full bg-[#E3F0E6]">

                <UserRound
                  size={39}
                  strokeWidth={1.6}
                  className="text-[#1C6650]"
                />

              </div>

              <div className="min-w-0">

                <h3 className="font-serif text-[27px] font-semibold tracking-[-0.4px] text-[#17473A]">
                  {
                    profile.name
                  }
                </h3>

                {/* UPDATED */}
                <p className="mt-1 max-w-[700px] text-[13px] leading-5 text-[#718078]">
                  {
                    profile.qualification
                  }
                </p>

                <div className="mt-2 flex flex-wrap gap-2">

                  <span className="rounded-full bg-[#E5F2E8] px-3 py-1 text-[9px] font-semibold text-[#287253]">
                    Doctor
                  </span>

                  <span className="rounded-full bg-[#F2EEE5] px-3 py-1 text-[9px] font-medium text-[#7A6C58]">
                    {
                      profile.department
                    }
                  </span>

                </div>

              </div>

            </div>

            <div className="flex items-center">

              <span className="flex items-center gap-2 rounded-full border border-white/70 bg-white/75 px-3 py-2">

                <span className="h-2.5 w-2.5 rounded-full bg-[#2D8A63]" />

                <span className="text-[11px] font-semibold text-[#4C6058]">
                  Clinical Profile
                </span>

              </span>

            </div>

          </div>

        </div>

      </section>

      {/* PROFESSIONAL INFORMATION */}

      <section className="rounded-xl border border-[#E1E6E1] bg-white p-6 shadow-sm md:p-7">

        <SectionHeading
          title="Professional Information"
          description="Read-only professional information configured for this prototype doctor profile."
        />

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">

          <ProfileField
            label="Doctor Name"
            value={
              profile.name
            }
          />

          <ProfileField
            label="Qualification"
            value={
              profile.qualification
            }
          />

          <ProfileField
            label="Specialization"
            value={
              profile.specialization
            }
          />

          <ProfileField
            label="Clinical Experience"
            value={
              profile.experience
            }
          />

          <ProfileField
            label="AYUSH Registration"
            value={
              profile.registration
            }
          />

          <ProfileField
            label="Department"
            value={
              profile.department
            }
          />

          <ProfileField
            label="Consultation Room"
            value={
              profile.room
            }
          />

          <ProfileField
            label="Email"
            value={
              profile.email
            }
          />

          <ProfileField
            label="Mobile"
            value={
              profile.mobile
            }
          />

          <ProfileField
            label="OPD Hours"
            value={
              profile.opdHours
            }
          />

          <ProfileField
            label="Break Hours"
            value={
              profile.breakHours
            }
          />

        </div>

      </section>

      {/* CLINICAL FOCUS */}

      <section className="rounded-xl border border-[#E1E6E1] bg-white p-6 shadow-sm md:p-7">

        <SectionHeading
          title="Ayurveda Clinical Focus"
          description="Ayurveda assessment areas supported by the MediKiosk history workflow."
        />

        <div className="mt-6 flex flex-wrap gap-3">

          <ClinicalTag
            label="Prakriti"
          />

          <ClinicalTag
            label="Vikriti"
          />

          <ClinicalTag
            label="Agni"
          />

          <ClinicalTag
            label="Koshtha"
          />

          <ClinicalTag
            label="Ahara"
          />

          <ClinicalTag
            label="Vihara"
          />

          <ClinicalTag
            label="Nidana"
          />

          <ClinicalTag
            label="Samprapti"
          />

          <ClinicalTag
            label="Trividha Pariksha"
          />

          <ClinicalTag
            label="Ashtavidha Pariksha"
          />

          <ClinicalTag
            label="Dashavidha Pariksha"
          />

        </div>

      </section>

      {/* PROFILE NOTICE */}

      <section className="rounded-xl border border-[#E1E6E1] bg-[#F5F8F4] p-5">

        <div className="flex items-start gap-3">

          <CheckCircle2
            size={19}
            className="mt-0.5 shrink-0 text-[#287253]"
          />

          <div>

            <p className="text-[12px] font-semibold text-[#40564D]">
              Read-only doctor profile
            </p>

            <p className="mt-1 text-[10px] leading-5 text-[#78847E]">
              Doctor credentials and profile information are fixed for the prototype. In the backend version, authenticated hospital administrators can manage authorized professional records.
            </p>

          </div>

        </div>

      </section>

    </div>
  );
}

/* ========================================================================= */
/* SETTINGS                                                                  */
/* ========================================================================= */

function SettingsSection({
  settings,
  setSettings,
}: {
  settings: PortalSettings;
  setSettings: (
    value: PortalSettings,
  ) => void;
}) {
  const updateSetting = (
    key: keyof PortalSettings,
  ) => {
    setSettings({
      ...settings,
      [key]: !settings[key],
    });
  };

  return (
    <div className="space-y-5">

      <section className="rounded-xl border border-[#E1E6E1] bg-white p-6 shadow-sm md:p-7">

        <div className="flex items-start gap-4">

          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#E8F3EA] text-[#287253]">

            <Settings
              size={23}
            />

          </div>

          <div>

            <h3 className="font-serif text-[24px] font-semibold text-[#17473A]">
              Clinical Settings
            </h3>

            <p className="mt-1 text-[12px] leading-5 text-[#818984]">
              Configure how MediKiosk prepares, presents and verifies Ayurveda patient histories.
            </p>

          </div>

        </div>

      </section>

      <SettingsGroup
        title="Patient History"
        description="Control the depth and relevance of information prepared for clinical review."
      >

        <PreferenceRow
          title="Adaptive Ayurveda History"
          description="Allow MediKiosk to ask physician-approved complaint-specific questions based on the patient's reported concern."
          enabled={
            settings.adaptiveHistory
          }
          onToggle={() =>
            updateSetting(
              "adaptiveHistory",
            )
          }
        />

        <PreferenceRow
          title="Prakriti Context"
          description="Keep Prakriti information available as context throughout the patient's adaptive history."
          enabled={
            settings.prakritiContext
          }
          onToggle={() =>
            updateSetting(
              "prakritiContext",
            )
          }
        />

        <PreferenceRow
          title="Relevant History"
          description="Prioritize history sections relevant to the patient's reported concerns."
          enabled={
            settings.relevantHistory
          }
          onToggle={() =>
            updateSetting(
              "relevantHistory",
            )
          }
        />

        <PreferenceRow
          title="Complete History Access"
          description="Allow the physician to expand and review the complete submitted history."
          enabled={
            settings.completeHistoryAccess
          }
          onToggle={() =>
            updateSetting(
              "completeHistoryAccess",
            )
          }
        />

      </SettingsGroup>

      <SettingsGroup
        title="Clinical Summary"
        description="Control how structured patient information is presented to the physician."
      >

        <PreferenceRow
          title="Structured Clinical Summary"
          description="Organize verified patient responses into a physician-readable clinical summary."
          enabled={
            settings.clinicalSummary
          }
          onToggle={() =>
            updateSetting(
              "clinicalSummary",
            )
          }
        />

        <PreferenceRow
          title="Bilingual Summary"
          description="Display physician-facing summaries in English and Hindi."
          enabled={
            settings.bilingualSummary
          }
          onToggle={() =>
            updateSetting(
              "bilingualSummary",
            )
          }
        />

        <PreferenceRow
          title="Source Response Traceability"
          description="Allow the physician to open the original patient response behind summarized information."
          enabled={
            settings.sourceTraceability
          }
          onToggle={() =>
            updateSetting(
              "sourceTraceability",
            )
          }
        />

        <PreferenceRow
          title="Physician Verification"
          description="Require extracted and summarized information to remain editable and verifiable by the physician."
          enabled={
            settings.physicianVerification
          }
          onToggle={() =>
            updateSetting(
              "physicianVerification",
            )
          }
        />

      </SettingsGroup>

      <SettingsGroup
        title="Ayurveda Assessment"
        description="Choose which physician-approved Ayurveda assessment areas are included in the clinical workflow."
      >

        <PreferenceRow
          title="Trividha Pariksha"
          description="Include physician-approved Trividha information in the clinical summary."
          enabled={
            settings.trividhaPariksha
          }
          onToggle={() =>
            updateSetting(
              "trividhaPariksha",
            )
          }
        />

        <PreferenceRow
          title="Ashtavidha Pariksha"
          description="Include physician-approved Ashtavidha information where relevant."
          enabled={
            settings.ashtavidhaPariksha
          }
          onToggle={() =>
            updateSetting(
              "ashtavidhaPariksha",
            )
          }
        />

        <PreferenceRow
          title="Dashavidha Pariksha"
          description="Include physician-approved Dashavidha information where relevant."
          enabled={
            settings.dashavidhaPariksha
          }
          onToggle={() =>
            updateSetting(
              "dashavidhaPariksha",
            )
          }
        />

        <PreferenceRow
          title="Agni & Koshtha"
          description="Include relevant Agni and Koshtha information when collected."
          enabled={
            settings.agniKoshtha
          }
          onToggle={() =>
            updateSetting(
              "agniKoshtha",
            )
          }
        />

      </SettingsGroup>

      <SettingsGroup
        title="Document Intelligence"
        description="Configure how uploaded clinical documents are presented during physician review."
      >

        <PreferenceRow
          title="Prescription Review"
          description="Show extracted medicines and instructions from uploaded prescriptions."
          enabled={
            settings.prescriptionReview
          }
          onToggle={() =>
            updateSetting(
              "prescriptionReview",
            )
          }
        />

        <PreferenceRow
          title="Investigation Review"
          description="Show relevant laboratory information extracted from uploaded reports."
          enabled={
            settings.investigationReview
          }
          onToggle={() =>
            updateSetting(
              "investigationReview",
            )
          }
        />

        <PreferenceRow
          title="Document Timeline"
          description="Organize uploaded clinical documents chronologically for easier review."
          enabled={
            settings.documentTimeline
          }
          onToggle={() =>
            updateSetting(
              "documentTimeline",
            )
          }
        />

      </SettingsGroup>

      <SettingsGroup
        title="Safety & Privacy"
        description="Configure clinical review safeguards and patient privacy controls."
      >

        <PreferenceRow
          title="Patient Red-Flag Alerts"
          description="Highlight patient-reported information that requires physician attention."
          enabled={
            settings.redFlagAlerts
          }
          onToggle={() =>
            updateSetting(
              "redFlagAlerts",
            )
          }
        />

        <PreferenceRow
          title="Mandatory Clinical Review"
          description="Require review of flagged information before the history can be marked complete."
          enabled={
            settings.mandatoryClinicalReview
          }
          onToggle={() =>
            updateSetting(
              "mandatoryClinicalReview",
            )
          }
        />

        <PreferenceRow
          title="Nearby-Person Privacy"
          description="Reduce visible patient information when another person is detected nearby."
          enabled={
            settings.privacyMode
          }
          onToggle={() =>
            updateSetting(
              "privacyMode",
            )
          }
        />

        <PreferenceRow
          title="Automatic Session Lock"
          description="Protect an inactive patient-facing kiosk session before the next patient."
          enabled={
            settings.autoLock
          }
          onToggle={() =>
            updateSetting(
              "autoLock",
            )
          }
        />

      </SettingsGroup>

      <SettingsGroup
        title="Accessibility"
        description="Adjust the clinical interface for easier reading."
      >

        <PreferenceRow
          title="Large Text Mode"
          description="Increase text size and readability across physician-facing clinical information."
          enabled={
            settings.largeTextMode
          }
          onToggle={() =>
            updateSetting(
              "largeTextMode",
            )
          }
        />

      </SettingsGroup>

      <section className="rounded-xl border border-[#E1E6E1] bg-[#F5F8F4] p-5">

        <div className="flex items-start gap-3">

          <CheckCircle2
            size={19}
            className="mt-0.5 shrink-0 text-[#287253]"
          />

          <div>

            <p className="text-[12px] font-semibold text-[#40564D]">
              MediKiosk clinical configuration
            </p>

            <p className="mt-1 text-[10px] leading-5 text-[#78847E]">
              These settings are stored locally for the prototype. In the backend phase, they can be connected to authenticated doctor preferences and hospital-level clinical configuration.
            </p>

          </div>

        </div>

      </section>

    </div>
  );
}

/* ========================================================================= */
/* QUICK ACTIONS                                                             */
/* ========================================================================= */

function QuickActionsCard({
  onQuickAction,
}: {
  onQuickAction: (
    action: string,
  ) => void;
}) {
  return (
    <div className="rounded-xl border border-[#E1E6E1] bg-white p-5 shadow-sm">

      <h3 className="mb-4 font-serif text-[19px] font-semibold text-[#17473A]">
        Quick Actions
      </h3>

      <div className="grid grid-cols-4 gap-2">

        <QuickAction
          icon={
            <Search
              size={21}
            />
          }
          label="Search Patient"
          onClick={() =>
            onQuickAction(
              "Search Patient",
            )
          }
        />

        <QuickAction
          icon={
            <FileText
              size={21}
            />
          }
          label="Review New"
          onClick={() =>
            onQuickAction(
              "Review New Histories",
            )
          }
        />

        <QuickAction
          icon={
            <Leaf
              size={21}
            />
          }
          label="Ayurveda Focus"
          onClick={() =>
            onQuickAction(
              "Ayurveda Clinical Focus",
            )
          }
        />

        <QuickAction
          icon={
            <BarChart3
              size={21}
            />
          }
          label="View Reports"
          onClick={() =>
            onQuickAction(
              "View Reports",
            )
          }
        />

      </div>

    </div>
  );
}

/* ========================================================================= */
/* BETTER HEALTH                                                             */
/* ========================================================================= */

function BetterHealthCard() {
  return (
    <div className="rounded-xl border border-[#E1E6E1] bg-white p-5 shadow-sm">

      <div className="flex items-center gap-4">

        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#E8F4E9]">

          <Leaf
            size={25}
            strokeWidth={1.7}
            className="text-[#2D795D]"
          />

        </div>

        <div>

          <h4 className="font-serif text-[16px] font-semibold text-[#315449]">
            Together for Better Health
          </h4>

          <p className="mt-1 text-[10px] text-[#818B86]">
            Your insights create healthier tomorrows.
          </p>

        </div>

      </div>

    </div>
  );
}

/* ========================================================================= */
/* STAT CARD                                                                 */
/* ========================================================================= */

function StatCard({
  icon,
  value,
  label,
  type,
}: {
  icon: ReactNode;
  value: string;
  label: string;
  type:
    | "green"
    | "blue"
    | "purple";
}) {
  const styles = {
    green: {
      wrapper:
        "bg-[#F2F8F2]",
      icon:
        "bg-[#E1F0E4] text-[#23765B]",
      number:
        "text-[#194D3E]",
    },

    blue: {
      wrapper:
        "bg-[#F1F6FC]",
      icon:
        "bg-[#E1EDFB] text-[#2C67A5]",
      number:
        "text-[#24558B]",
    },

    purple: {
      wrapper:
        "bg-[#F6F3FC]",
      icon:
        "bg-[#ECE2FA] text-[#69419B]",
      number:
        "text-[#52317E]",
    },
  };

  const style =
    styles[type];

  return (
    <div
      className={`flex min-h-[108px] items-center rounded-xl border border-[#E1E7E1] px-4 ${style.wrapper}`}
    >

      <div className="flex items-center gap-4">

        <div
          className={`flex h-[60px] w-[60px] items-center justify-center rounded-xl ${style.icon}`}
        >
          {
            icon
          }
        </div>

        <div>

          <p
            className={`font-serif text-[30px] font-semibold leading-none ${style.number}`}
          >
            {
              value
            }
          </p>

          <p className="mt-1 max-w-[150px] text-[11px] text-[#626E68]">
            {
              label
            }
          </p>

        </div>

      </div>

    </div>
  );
}

/* ========================================================================= */
/* SIDEBAR ITEM                                                              */
/* ========================================================================= */

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
      onClick={
        onClick
      }
      className={`mb-1 flex w-full items-center gap-4 rounded-xl px-4 py-3.5 text-left transition ${
        active
          ? "bg-[#E6F1E9] text-[#1B5948]"
          : "text-[#485A53] hover:bg-[#F0F4EF]"
      }`}
    >

      <span
        className={
          active
            ? "text-[#216B55]"
            : "text-[#53635D]"
        }
      >
        {
          icon
        }
      </span>

      <span
        className={`text-[13px] ${
          active
            ? "font-semibold"
            : "font-medium"
        }`}
      >
        {
          label
        }
      </span>

    </button>
  );
}

/* ========================================================================= */
/* STATUS BADGE                                                              */
/* ========================================================================= */

function StatusBadge({
  status,
}: {
  status: PatientStatus;
}) {
  if (
    status ===
    "Completed"
  ) {
    return (
      <span className="inline-flex rounded-md bg-[#E8F1FC] px-3 py-1.5 text-[10px] font-semibold text-[#3973BD]">
        Completed
      </span>
    );
  }

  return (
    <span className="inline-flex rounded-md bg-[#E5F3EA] px-3 py-1.5 text-[10px] font-semibold text-[#287253]">
      New
    </span>
  );
}

/* ========================================================================= */
/* QUICK ACTION                                                              */
/* ========================================================================= */

function QuickAction({
  icon,
  label,
  onClick,
}: {
  icon: ReactNode;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={
        onClick
      }
      className="group flex min-w-0 flex-col items-center text-center"
    >

      <span className="flex h-[48px] w-[48px] items-center justify-center rounded-xl bg-[#EAF3EC] text-[#286C57] transition group-hover:bg-[#DCEBE0]">
        {
          icon
        }
      </span>

      <span className="mt-2 text-[9px] font-medium leading-3 text-[#66736D]">
        {
          label
        }
      </span>

    </button>
  );
}

/* ========================================================================= */
/* ANALYTICS METRIC                                                          */
/* ========================================================================= */

function AnalyticsMetric({
  label,
  value,
  detail,
  icon,
}: {
  label: string;
  value: string;
  detail: string;
  icon: ReactNode;
}) {
  return (
    <div className="rounded-xl border border-[#E4E9E4] bg-[#F8FAF7] p-5">

      <div className="flex items-center justify-between">

        <p className="text-[9px] uppercase tracking-[0.8px] text-[#7C8982]">
          {
            label
          }
        </p>

        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#E7F2E9] text-[#287253]">
          {
            icon
          }
        </span>

      </div>

      <p className="mt-4 font-serif text-[32px] font-semibold text-[#1D5A49]">
        {
          value
        }
      </p>

      <p className="mt-1 text-[10px] text-[#7C8982]">
        {
          detail
        }
      </p>

    </div>
  );
}

/* ========================================================================= */
/* WORKLOAD ROW                                                              */
/* ========================================================================= */

function WorkloadRow({
  label,
  value,
  icon,
}: {
  label: string;
  value: string;
  icon: ReactNode;
}) {
  return (
    <div className="flex items-center justify-between rounded-xl border border-[#E5E9E5] bg-[#FAFCF9] p-4">

      <div className="flex items-center gap-3">

        <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#EAF3EC] text-[#287253]">
          {
            icon
          }
        </span>

        <span className="text-[11px] font-medium text-[#52655C]">
          {
            label
          }
        </span>

      </div>

      <span className="font-serif text-[22px] font-semibold text-[#245648]">
        {
          value
        }
      </span>

    </div>
  );
}

/* ========================================================================= */
/* PROFILE HELPERS                                                           */
/* ========================================================================= */

function SectionHeading({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div>

      <h3 className="font-serif text-[21px] font-semibold text-[#17473A]">
        {
          title
        }
      </h3>

      <p className="mt-1 text-[11px] text-[#818984]">
        {
          description
        }
      </p>

    </div>
  );
}

function ProfileField({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-xl border border-[#E4E9E4] bg-[#FAFCF9] p-4">

      <p className="text-[9px] uppercase tracking-[0.7px] text-[#8A948E]">
        {
          label
        }
      </p>

      <p className="mt-2 text-[12px] font-semibold text-[#40564D]">
        {
          value
        }
      </p>

    </div>
  );
}

function ClinicalTag({
  label,
}: {
  label: string;
}) {
  return (
    <span className="rounded-full border border-[#D9E5DA] bg-[#F1F7F1] px-4 py-2 text-[11px] font-medium text-[#356252]">
      {
        label
      }
    </span>
  );
}

/* ========================================================================= */
/* SETTINGS GROUP                                                            */
/* ========================================================================= */

function SettingsGroup({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: ReactNode;
}) {
  return (
    <section className="rounded-xl border border-[#E1E6E1] bg-white p-6 shadow-sm md:p-7">

      <div>

        <h4 className="font-serif text-[20px] font-semibold text-[#315449]">
          {
            title
          }
        </h4>

        <p className="mt-1 text-[11px] text-[#818984]">
          {
            description
          }
        </p>

      </div>

      <div className="mt-5 space-y-3">
        {
          children
        }
      </div>

    </section>
  );
}

/* ========================================================================= */
/* PREFERENCE ROW                                                            */
/* ========================================================================= */

function PreferenceRow({
  title,
  description,
  enabled,
  onToggle,
}: {
  title: string;
  description: string;
  enabled: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="flex flex-col justify-between gap-4 rounded-xl border border-[#E4E9E4] bg-[#FAFCF9] p-4 sm:flex-row sm:items-center">

      <div>

        <p className="text-[12px] font-semibold text-[#40564D]">
          {
            title
          }
        </p>

        <p className="mt-1 max-w-[700px] text-[10px] leading-4 text-[#808B85]">
          {
            description
          }
        </p>

      </div>

      <Toggle
        enabled={
          enabled
        }
        onToggle={
          onToggle
        }
      />

    </div>
  );
}

/* ========================================================================= */
/* TOGGLE                                                                    */
/* ========================================================================= */

function Toggle({
  enabled,
  onToggle,
}: {
  enabled: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      type="button"
      onClick={
        onToggle
      }
      className={`relative h-6 w-11 shrink-0 rounded-full transition ${
        enabled
          ? "bg-[#28745B]"
          : "bg-[#C7CEC8]"
      }`}
      aria-label={
        enabled
          ? "Disable setting"
          : "Enable setting"
      }
    >

      <span
        className={`absolute top-1 h-4 w-4 rounded-full bg-white shadow-sm transition ${
          enabled
            ? "left-6"
            : "left-1"
        }`}
      />

    </button>
  );
}

/* ========================================================================= */
/* NOTIFICATIONS                                                             */
/* ========================================================================= */

function NotificationDropdown({
  newPatients,
}: {
  newPatients: number;
}) {
  return (
    <div className="absolute right-[150px] top-[58px] z-[70] w-[300px] rounded-xl border border-[#E2E5DF] bg-white p-4 shadow-xl">

      <div className="flex items-center justify-between">

        <h4 className="font-serif text-[17px] font-semibold text-[#194A3C]">
          Notifications
        </h4>

        {newPatients >
          0 && (
          <span className="rounded-full bg-[#E7F3E9] px-2 py-1 text-[9px] font-semibold text-[#287253]">
            {
              newPatients
            }{" "}
            New
          </span>
        )}

      </div>

      <div className="mt-3">

        {newPatients >
        0 ? (
          <NotificationItem
            title="Patient histories waiting"
            text={`${newPatients} patient histories are ready for physician review.`}
          />
        ) : (
          <NotificationItem
            title="All caught up"
            text="There are no new clinical notifications."
          />
        )}

      </div>

    </div>
  );
}

function NotificationItem({
  title,
  text,
}: {
  title: string;
  text: string;
}) {
  return (
    <div className="rounded-lg bg-[#F5F8F4] p-3">

      <p className="text-[11px] font-semibold text-[#3F554C]">
        {
          title
        }
      </p>

      <p className="mt-1 text-[10px] leading-4 text-[#7D8983]">
        {
          text
        }
      </p>

    </div>
  );
}

/* ========================================================================= */
/* PATIENT REVIEW MODAL                                                      */
/* ========================================================================= */
/*
 * Patient editing has been intentionally removed.
 *
 * Patient information is read-only.
 * There is no "Edit Information" button.
 *
 * The physician can still mark a New history as Completed.
 */

function PatientReviewModal({
  patient,
  onClose,
  onMarkCompleted,
}: {
  patient: Patient;
  onClose: () => void;
  onMarkCompleted: () => void;
}) {
  const [draft] =
    useState<Patient>(
      patient,
    );

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#102D25]/30 p-4 backdrop-blur-[2px]">

      <div className="max-h-[92vh] w-full max-w-[760px] overflow-y-auto rounded-2xl bg-white shadow-2xl">

        {/* HEADER */}

        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-[#E4E9E4] bg-white px-6 py-5">

          <div>

            <p className="text-[10px] font-semibold uppercase tracking-[1px] text-[#6D857B]">
              Patient Clinical History
            </p>

            <h3 className="mt-1 font-serif text-[24px] font-semibold text-[#17473A]">
              {
                draft.name
              }
            </h3>

          </div>

          <button
            onClick={
              onClose
            }
            className="rounded-full p-2 text-[#64736D] hover:bg-[#F0F4F0]"
            aria-label="Close patient history"
          >
            <X
              size={20}
            />
          </button>

        </div>

        <div className="space-y-5 px-6 py-6">

          {/* PATIENT STATUS */}

          <div className="flex items-center gap-2">

            <span className="rounded-md bg-[#E7F3E9] px-3 py-1.5 text-[10px] font-semibold text-[#247152]">
              {
                draft.token
              }
            </span>

            <StatusBadge
              status={
                draft.status
              }
            />

          </div>

          {/* PATIENT INFORMATION */}

          <section className="rounded-xl border border-[#E4E9E4] p-5">

            <div className="mb-4">

              <h4 className="font-serif text-[18px] font-semibold text-[#315449]">
                Patient Information
              </h4>

              <p className="mt-1 text-[10px] text-[#818984]">
                Demographic and registration information.
              </p>

            </div>

            <div className="grid gap-4 sm:grid-cols-3">

              <ReadOnlyPatientField
                label="Patient Name"
                value={
                  draft.name
                }
              />

              <ReadOnlyPatientField
                label="Age"
                value={String(
                  draft.age,
                )}
              />

              <ReadOnlyPatientField
                label="Gender"
                value={
                  draft.gender
                }
              />

            </div>

            <div className="mt-4 grid gap-4 sm:grid-cols-2">

              <ReadOnlyPatientField
                label="Submitted At"
                value={
                  draft.submittedAt
                }
              />

              <ReadOnlyPatientField
                label="Chief Complaint"
                value={
                  draft.complaint
                }
              />

            </div>

          </section>

          {/* CLINICAL HISTORY */}

          <section className="rounded-xl border border-[#E4E9E4] p-5">

            <div className="mb-4">

              <h4 className="font-serif text-[18px] font-semibold text-[#315449]">
                Clinical History
              </h4>

              <p className="mt-1 text-[10px] text-[#818984]">
                Patient-reported information prepared for physician review.
              </p>

            </div>

            <div className="space-y-4">

              <ReadOnlyTextArea
                label="Clinical Notes"
                value={
                  draft.clinicalNotes ||
                  ""
                }
              />

              <ReadOnlyTextArea
                label="Previous Medical History"
                value={
                  draft.medicalHistory ||
                  ""
                }
              />

              <ReadOnlyTextArea
                label="Allergy Status"
                value={
                  draft.allergyStatus ||
                  ""
                }
              />

            </div>

          </section>

          {/* AYURVEDA */}

          <section className="rounded-xl border border-[#E4E9E4] p-5">

            <div className="mb-4 flex items-start gap-3">

              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#E8F4E9]">

                <Leaf
                  size={18}
                  className="text-[#2D795D]"
                />

              </div>

              <div>

                <h4 className="font-serif text-[18px] font-semibold text-[#315449]">
                  Ayurveda Assessment
                </h4>

                <p className="mt-1 text-[10px] text-[#818984]">
                  Relevant Ayurveda context available for physician review.
                </p>

              </div>

            </div>

            <div className="grid gap-4 sm:grid-cols-3">

              <ReadOnlyPatientField
                label="Prakriti"
                value={
                  draft.prakriti ||
                  ""
                }
              />

              <ReadOnlyPatientField
                label="Vikriti"
                value={
                  draft.vikriti ||
                  ""
                }
              />

              <ReadOnlyPatientField
                label="Lifestyle / Ahara-Vihara"
                value={
                  draft.lifestyle ||
                  ""
                }
              />

            </div>

          </section>

          {/* COMPLETION */}

          <div className="flex flex-col gap-2 border-t border-[#E8ECE7] pt-5 sm:flex-row sm:justify-end">

            <button
              onClick={
                onClose
              }
              className="rounded-lg border border-[#DCE3DD] px-5 py-2.5 text-[12px] font-semibold text-[#53645D] hover:bg-[#F6F8F6]"
            >
              Close
            </button>

            {draft.status ===
              "New" && (
              <button
                onClick={
                  onMarkCompleted
                }
                className="flex items-center justify-center gap-2 rounded-lg bg-[#145846] px-5 py-2.5 text-[12px] font-semibold text-white hover:bg-[#0F4738]"
              >

                <CheckCircle2
                  size={16}
                />

                Mark as Completed

              </button>
            )}

            {draft.status ===
              "Completed" && (
              <div className="flex items-center gap-2 rounded-lg bg-[#E8F1FC] px-5 py-2.5 text-[12px] font-semibold text-[#3973BD]">

                <CheckCircle2
                  size={16}
                />

                History Completed

              </div>
            )}

          </div>

        </div>

      </div>

    </div>
  );
}

/* ========================================================================= */
/* READ-ONLY PATIENT FIELD                                                   */
/* ========================================================================= */

function ReadOnlyPatientField({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-lg border border-[#E4E9E4] bg-[#FAFCF9] p-3">

      <p className="text-[9px] uppercase tracking-[0.6px] text-[#8A948E]">
        {
          label
        }
      </p>

      <p className="mt-2 text-[11px] font-semibold text-[#40564D]">
        {
          value ||
          "Not provided"
        }
      </p>

    </div>
  );
}

/* ========================================================================= */
/* READ-ONLY TEXT AREA                                                       */
/* ========================================================================= */

function ReadOnlyTextArea({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div>

      <p className="text-[9px] font-semibold uppercase tracking-[0.7px] text-[#8A948E]">
        {
          label
        }
      </p>

      <div className="mt-2 rounded-lg bg-[#FAFCF9] p-3">

        <p className="text-[11px] leading-5 text-[#65756E]">
          {
            value ||
            "Not provided"
          }
        </p>

      </div>

    </div>
  );
}