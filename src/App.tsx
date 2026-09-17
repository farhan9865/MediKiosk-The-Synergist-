import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";

import Home from "./pages/Home";

/* ========================================================================= */
/* PATIENT PORTAL                                                           */
/* ========================================================================= */

import Language from "./pages/patient/Language";
import Identify from "./pages/patient/Identify";
import Consent from "./pages/patient/Consent";
import Demographics from "./pages/patient/Demographics";
import Mode from "./pages/patient/Mode";
import History from "./pages/patient/History";
import Documents from "./pages/patient/Documents";
import Review from "./pages/patient/Review";
import ThankYou from "./pages/patient/ThankYou";
import AdminPortal from "./pages/admin/AdminPortal";

/* ========================================================================= */
/* DOCTOR PORTAL                                                            */
/* ========================================================================= */

import DoctorPortal from "./pages/doctor/DoctorPortal";

/* ========================================================================= */
/* ADMIN PORTAL                                                             */
/* ========================================================================= */

function Admin() {
  return (
    <div className="min-h-screen bg-[#F7F3E9] text-[#173F35]">
      <div className="flex min-h-screen items-center justify-center">
        <h1 className="font-serif text-5xl font-semibold">
          Admin Portal
        </h1>
      </div>
    </div>
  );
}

/* ========================================================================= */
/* APP ROUTES                                                               */
/* ========================================================================= */

export default function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* ================================================================= */}
        {/* HOME                                                              */}
        {/* ================================================================= */}

        <Route
          path="/"
          element={<Home />}
        />

        {/* ================================================================= */}
        {/* PATIENT ENTRY                                                     */}
        {/* ================================================================= */}

        {/*
         * Patient Kiosk no longer uses an intermediate welcome screen.
         *
         * When the user opens:
         *
         * /patient
         *
         * they are automatically taken to:
         *
         * /patient/language
         */}

        <Route
          path="/patient"
          element={
            <Navigate
              to="/patient/language"
              replace
            />
          }
        />

        {/* ================================================================= */}
        {/* PATIENT KIOSK JOURNEY                                             */}
        {/* ================================================================= */}

        <Route
          path="/patient/language"
          element={<Language />}
        />

        <Route
          path="/patient/identify"
          element={<Identify />}
        />

        <Route
          path="/patient/consent"
          element={<Consent />}
        />

        <Route
          path="/patient/demographics"
          element={<Demographics />}
        />

        <Route
  path="/admin"
  element={<AdminPortal />}
/>

        <Route
          path="/patient/mode"
          element={<Mode />}
        />

        <Route
          path="/patient/history"
          element={<History />}
        />

        <Route
          path="/patient/documents"
          element={<Documents />}
        />

        <Route
          path="/patient/review"
          element={<Review />}
        />

        <Route
          path="/patient/thank-you"
          element={<ThankYou />}
        />

        {/* ================================================================= */}
        {/* DOCTOR PORTAL                                                     */}
        {/* ================================================================= */}

        {/*
         * The complete Doctor Portal dashboard is rendered here.
         *
         * Home page should open this route in a NEW browser tab:
         *
         * window.open("/doctor", "_blank", "noopener,noreferrer")
         *
         * The DoctorPortal component contains:
         *
         * - Doctor dashboard
         * - Sidebar navigation
         * - Patient queue
         * - Patient search
         * - Status filter
         * - Today's schedule
         * - Quick actions
         * - Patient review modal
         * - Ayurveda themed UI
         */}

        <Route
          path="/doctor"
          element={<DoctorPortal />}
        />

        {/* ================================================================= */}
        {/* ADMIN PORTAL                                                      */}
        {/* ================================================================= */}

        <Route
          path="/admin"
          element={<Admin />}
        />

        {/* ================================================================= */}
        {/* FALLBACK                                                          */}
        {/* ================================================================= */}

        {/*
         * Any unknown URL is redirected back to the MediKiosk home page.
         */}

        <Route
          path="*"
          element={
            <Navigate
              to="/"
              replace
            />
          }
        />

      </Routes>
    </BrowserRouter>
  );
}