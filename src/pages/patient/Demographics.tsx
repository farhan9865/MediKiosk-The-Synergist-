import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  UserRound,
  ChevronDown,
  ArrowRight,
} from "lucide-react";

import { usePatientStore } from "../../store/patientStore";
import { t } from "../../i18n/translations";

/* ========================================================================= */
/* GENDER OPTIONS                                                            */
/* ========================================================================= */

const genderOptions = [
  "Male",
  "Female",
  "Other",
  "Prefer not to say",
];

/* ========================================================================= */
/* LOCATION OPTIONS                                                          */
/* ========================================================================= */
/*
 * Common cities / districts / localities for the prototype.
 *
 * "Other / Enter manually" allows the patient to type a location
 * that is not present in this list.
 */

const locationOptions = [
  /* ----------------------------- Maharashtra ---------------------------- */

  "Ahmednagar",
  "Akola",
  "Amravati",
  "Aurangabad",
  "Beed",
  "Bhandara",
  "Buldhana",
  "Chandrapur",
  "Chiplun",
  "Dhule",
  "Gadchiroli",
  "Gondia",
  "Hingoli",
  "Jalgaon",
  "Jalna",
  "Kolhapur",
  "Latur",
  "Mumbai",
  "Nagpur",
  "Nanded",
  "Nandurbar",
  "Nashik",
  "Osmanabad",
  "Palghar",
  "Parbhani",
  "Pune",
  "Raigad",
  "Ratnagiri",
  "Chiplun",
  "Sangli",
  "Satara",
  "Sindhudurg",
  "Solapur",
  "Thane",
  "Wardha",
  "Washim",
  "Yavatmal",

  /* ------------------------------- Delhi -------------------------------- */

  "New Delhi",
  "Central Delhi",
  "East Delhi",
  "North Delhi",
  "North East Delhi",
  "North West Delhi",
  "South Delhi",
  "South East Delhi",
  "South West Delhi",
  "West Delhi",

  /* -------------------------- Delhi Localities --------------------------- */

  "Dwarka",
  "Rohini",
  "Janakpuri",
  "Karol Bagh",
  "Lajpat Nagar",
  "Saket",
  "Vasant Kunj",
  "Hauz Khas",
  "Connaught Place",
  "Pitampura",
  "Shahdara",
  "Mayur Vihar",
  "Preet Vihar",
  "Rajouri Garden",
  "Punjabi Bagh",
  "Greater Kailash",
  "Defence Colony",
  "Okhla",
  "Vasant Vihar",
  "Mehrauli",
  "Burari",
  "Narela",

  /* -------------------------- Manual Location --------------------------- */

  "Other / Enter manually",
];

/* ========================================================================= */
/* STATE OPTIONS                                                             */
/* ========================================================================= */

const stateOptions = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
  "Andaman and Nicobar Islands",
  "Chandigarh",
  "Dadra and Nagar Haveli and Daman and Diu",
  "Delhi",
  "Jammu and Kashmir",
  "Ladakh",
  "Lakshadweep",
  "Puducherry",
];

/* ========================================================================= */
/* COMPONENT                                                                 */
/* ========================================================================= */

export default function BasicInformation() {
  const navigate = useNavigate();

  /* ----------------------------------------------------------------------- */
  /* SELECTED LANGUAGE                                                       */
  /* ----------------------------------------------------------------------- */

  const language = usePatientStore(
    (state) => state.language
  );

  /* ----------------------------------------------------------------------- */
  /* STORE                                                                    */
  /* ----------------------------------------------------------------------- */

  const setDemographics = usePatientStore(
    (state) => state.setDemographics
  );

  /* ----------------------------------------------------------------------- */
  /* FORM STATE                                                              */
  /* ----------------------------------------------------------------------- */
  /*
   * Deliberately initialized as empty.
   *
   * This prevents previously entered test information from appearing
   * automatically when the page opens.
   */

  const [name, setName] = useState("");

  const [age, setAge] = useState("");

  const [gender, setGender] = useState("");

  const [mobileNumber, setMobileNumber] =
    useState("");

  const [dateOfBirth, setDateOfBirth] =
    useState("");

  const [occupation, setOccupation] =
    useState("");

  const [location, setLocation] =
    useState("");

  const [customLocation, setCustomLocation] =
    useState("");

  const [state, setState] =
    useState("");

  const [error, setError] =
    useState("");

  /* ========================================================================= */
  /* CONTINUE / VALIDATION                                                     */
  /* ========================================================================= */

  const handleContinue = () => {
    const trimmedName = name.trim();

    const trimmedMobile =
      mobileNumber.trim();

    const trimmedOccupation =
      occupation.trim();

    /* --------------------------------------------------------------------- */
    /* FULL NAME                                                             */
    /* --------------------------------------------------------------------- */

    if (!trimmedName) {
      setError(
        t(language, "fullNameRequired")
      );
      return;
    }

    /* --------------------------------------------------------------------- */
    /* AGE                                                                   */
    /* --------------------------------------------------------------------- */

    if (
      age === "" ||
      Number(age) <= 0 ||
      Number(age) > 120
    ) {
      setError(
        t(language, "ageRequired")
      );
      return;
    }

    /* --------------------------------------------------------------------- */
    /* GENDER                                                                */
    /* --------------------------------------------------------------------- */

    if (!gender) {
      setError(
        t(language, "genderRequired")
      );
      return;
    }

    /* --------------------------------------------------------------------- */
    /* MOBILE NUMBER                                                         */
    /* --------------------------------------------------------------------- */

    if (!trimmedMobile) {
      setError(
        language === "hi"
          ? "कृपया मोबाइल नंबर दर्ज करें।"
          : language === "mr"
          ? "कृपया मोबाईल नंबर प्रविष्ट करा."
          : "Please enter your mobile number."
      );
      return;
    }

    if (
      !/^[6-9]\d{9}$/.test(
        trimmedMobile
      )
    ) {
      setError(
        language === "hi"
          ? "कृपया 10 अंकों का वैध मोबाइल नंबर दर्ज करें।"
          : language === "mr"
          ? "कृपया 10 अंकी वैध मोबाईल नंबर प्रविष्ट करा."
          : "Please enter a valid 10-digit mobile number."
      );
      return;
    }

    /* --------------------------------------------------------------------- */
    /* DATE OF BIRTH                                                         */
    /* --------------------------------------------------------------------- */

    if (!dateOfBirth) {
      setError(
        language === "hi"
          ? "कृपया जन्म तिथि चुनें।"
          : language === "mr"
          ? "कृपया जन्मतारीख निवडा."
          : "Please select your date of birth."
      );
      return;
    }

    /* --------------------------------------------------------------------- */
    /* OCCUPATION                                                            */
    /* --------------------------------------------------------------------- */

    if (!trimmedOccupation) {
      setError(
        language === "hi"
          ? "कृपया अपना व्यवसाय दर्ज करें।"
          : language === "mr"
          ? "कृपया तुमचा व्यवसाय प्रविष्ट करा."
          : "Please enter your occupation."
      );
      return;
    }

    /* --------------------------------------------------------------------- */
    /* LOCATION                                                              */
    /* --------------------------------------------------------------------- */

    if (!location) {
      setError(
        language === "hi"
          ? "कृपया अपना शहर या जिला चुनें।"
          : language === "mr"
          ? "कृपया तुमचे शहर किंवा जिल्हा निवडा."
          : "Please select your city or district."
      );
      return;
    }

    /* --------------------------------------------------------------------- */
    /* CUSTOM LOCATION                                                       */
    /* --------------------------------------------------------------------- */

    let finalLocation = location;

    if (
      location ===
      "Other / Enter manually"
    ) {
      const trimmedCustomLocation =
        customLocation.trim();

      if (!trimmedCustomLocation) {
        setError(
          language === "hi"
            ? "कृपया अपना शहर या जिला दर्ज करें।"
            : language === "mr"
            ? "कृपया तुमचे शहर किंवा जिल्हा प्रविष्ट करा."
            : "Please enter your city or district."
        );
        return;
      }

      finalLocation =
        trimmedCustomLocation;
    }

    /* --------------------------------------------------------------------- */
    /* STATE                                                                 */
    /* --------------------------------------------------------------------- */

    if (!state) {
      setError(
        language === "hi"
          ? "कृपया अपना राज्य चुनें।"
          : language === "mr"
          ? "कृपया तुमचे राज्य निवडा."
          : "Please select your state."
      );
      return;
    }

    /* --------------------------------------------------------------------- */
    /* SUCCESS                                                               */
    /* --------------------------------------------------------------------- */

    setError("");

    setDemographics({
      name: trimmedName,
      fullName: trimmedName,
      age: Number(age),
      gender,
      mobileNumber: trimmedMobile,
      dateOfBirth,
      occupation: trimmedOccupation,
      location: finalLocation,
      state,
    });

    navigate("/patient/mode");
  };

  /* ========================================================================= */
  /* COMMON STYLES                                                             */
  /* ========================================================================= */

  const inputClass =
    "h-[56px] w-full rounded-[15px] border border-[#d9cfbf] bg-white px-5 text-[17px] text-[#234f44] outline-none transition focus:border-[#17604b] focus:ring-2 focus:ring-[#17604b]/10";

  const selectClass =
    "h-[56px] w-full appearance-none rounded-[15px] border border-[#d9cfbf] bg-white px-5 pr-12 text-[17px] text-[#234f44] outline-none transition focus:border-[#17604b] focus:ring-2 focus:ring-[#17604b]/10";

  /* ========================================================================= */
  /* UI                                                                        */
  /* ========================================================================= */

  return (
    <div className="min-h-screen bg-[#f8f4ec] text-[#164f3f]">

      {/* =================================================================== */}
      {/* MAIN CONTENT                                                        */}
      {/* =================================================================== */}

      <div className="mx-auto w-full max-w-[1100px] px-6 pb-12 pt-8">

        {/* ================================================================= */}
        {/* ICON                                                               */}
        {/* ================================================================= */}

        <div className="mb-8 flex h-[58px] w-[58px] items-center justify-center rounded-2xl bg-[#dfeae2]">

          <UserRound
            size={27}
            strokeWidth={1.8}
            className="text-[#17604b]"
          />

        </div>

        {/* ================================================================= */}
        {/* HEADING                                                            */}
        {/* ================================================================= */}

        <div className="mb-9">

          <p className="mb-3 text-[15px] font-semibold uppercase tracking-[0.27em] text-[#bd5d38]">
            {t(
              language,
              "aboutYou"
            )}
          </p>

          <h1 className="font-serif text-[40px] font-semibold leading-[1.1] tracking-[-0.02em] text-[#124d3d]">
            {t(
              language,
              "tellAboutYourself"
            )}
          </h1>

          <p className="mt-3 text-[17px] leading-7 text-[#68766f]">
            {t(
              language,
              "basicInfoSubtitle"
            )}
          </p>

        </div>

        {/* ================================================================= */}
        {/* FORM CARD                                                         */}
        {/* ================================================================= */}

        <div className="rounded-[22px] border border-[#ded4c3] bg-[#fbf9f5] px-7 py-7">

          {/* =============================================================== */}
          {/* FULL NAME                                                        */}
          {/* =============================================================== */}

          <div className="mb-6">

            <label className="mb-3 block text-[16px] font-semibold text-[#174f40]">

              {t(
                language,
                "fullName"
              )}

              <span className="text-[#bd5d38]">
                {" "}*
              </span>

            </label>

            <input
              type="text"
              required
              value={name}
              onChange={(e) => {
                setName(
                  e.target.value
                );
                setError("");
              }}
              placeholder={t(
                language,
                "enterFullName"
              )}
              className={inputClass}
            />

          </div>

          {/* =============================================================== */}
          {/* AGE + GENDER                                                    */}
          {/* =============================================================== */}

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">

            {/* ------------------------------------------------------------- */}
            {/* AGE                                                           */}
            {/* ------------------------------------------------------------- */}

            <div>

              <label className="mb-3 block text-[16px] font-semibold text-[#174f40]">

                {t(
                  language,
                  "age"
                )}

                <span className="text-[#bd5d38]">
                  {" "}*
                </span>

              </label>

              <input
                type="number"
                required
                min="1"
                max="120"
                value={age}
                onChange={(e) => {
                  setAge(
                    e.target.value
                  );
                  setError("");
                }}
                placeholder={t(
                  language,
                  "enterAge"
                )}
                className={inputClass}
              />

            </div>

            {/* ------------------------------------------------------------- */}
            {/* GENDER                                                        */}
            {/* ------------------------------------------------------------- */}

            <div>

              <label className="mb-3 block text-[16px] font-semibold text-[#174f40]">

                {t(
                  language,
                  "gender"
                )}

                <span className="text-[#bd5d38]">
                  {" "}*
                </span>

              </label>

              <div className="relative">

                <select
                  required
                  value={gender}
                  onChange={(e) => {
                    setGender(
                      e.target.value
                    );
                    setError("");
                  }}
                  className={selectClass}
                >

                  <option value="">
                    {t(
                      language,
                      "selectGender"
                    )}
                  </option>

                  {genderOptions.map(
                    (option) => {

                      const optionKey =
                        option === "Male"
                          ? "male"
                          : option === "Female"
                          ? "female"
                          : option === "Other"
                          ? "other"
                          : "preferNotToSay";

                      return (
                        <option
                          key={option}
                          value={option}
                        >
                          {t(
                            language,
                            optionKey
                          )}
                        </option>
                      );
                    }
                  )}

                </select>

                <ChevronDown
                  size={19}
                  className="pointer-events-none absolute right-5 top-1/2 -translate-y-1/2 text-[#174f40]"
                />

              </div>

            </div>

            {/* ============================================================= */}
            {/* MOBILE NUMBER                                                  */}
            {/* ============================================================= */}

            <div>

              <label className="mb-3 block text-[16px] font-semibold text-[#174f40]">

                {t(
                  language,
                  "mobileNumber"
                )}

                <span className="text-[#bd5d38]">
                  {" "}*
                </span>

              </label>

              <input
                type="tel"
                required
                inputMode="numeric"
                pattern="[6-9][0-9]{9}"
                maxLength={10}
                value={mobileNumber}
                onChange={(e) => {

                  const value =
                    e.target.value
                      .replace(
                        /\D/g,
                        ""
                      )
                      .slice(
                        0,
                        10
                      );

                  setMobileNumber(
                    value
                  );

                  setError("");
                }}
                placeholder={t(
                  language,
                  "enterMobileNumber"
                )}
                className={inputClass}
              />

            </div>

            {/* ============================================================= */}
            {/* DATE OF BIRTH                                                  */}
            {/* ============================================================= */}

            <div>

              <label className="mb-3 block text-[16px] font-semibold text-[#174f40]">

                {t(
                  language,
                  "dateOfBirth"
                )}

                <span className="text-[#bd5d38]">
                  {" "}*
                </span>

              </label>

              <input
                type="date"
                required
                value={dateOfBirth}
                onChange={(e) => {
                  setDateOfBirth(
                    e.target.value
                  );
                  setError("");
                }}
                max={
                  new Date()
                    .toISOString()
                    .split("T")[0]
                }
                className={inputClass}
              />

            </div>

            {/* ============================================================= */}
            {/* OCCUPATION                                                     */}
            {/* ============================================================= */}

            <div>

              <label className="mb-3 block text-[16px] font-semibold text-[#174f40]">

                {t(
                  language,
                  "occupation"
                )}

                <span className="text-[#bd5d38]">
                  {" "}*
                </span>

              </label>

              <input
                type="text"
                required
                value={occupation}
                onChange={(e) => {
                  setOccupation(
                    e.target.value
                  );
                  setError("");
                }}
                placeholder={t(
                  language,
                  "occupationPlaceholder"
                )}
                className={inputClass}
              />

            </div>

            {/* ============================================================= */}
            {/* LOCATION DROPDOWN                                              */}
            {/* ============================================================= */}

            <div>

              <label className="mb-3 block text-[16px] font-semibold text-[#174f40]">

                {t(
                  language,
                  "location"
                )}

                <span className="text-[#bd5d38]">
                  {" "}*
                </span>

              </label>

              <div className="relative">

                <select
                  required
                  value={location}
                  onChange={(e) => {

                    const selected =
                      e.target.value;

                    setLocation(
                      selected
                    );

                    /*
                     * Clear the manually entered
                     * location whenever a normal
                     * dropdown option is selected.
                     */

                    if (
                      selected !==
                      "Other / Enter manually"
                    ) {
                      setCustomLocation(
                        ""
                      );
                    }

                    setError("");
                  }}
                  className={selectClass}
                >

                  <option value="">
                    {t(
                      language,
                      "cityDistrict"
                    )}
                  </option>

                  {locationOptions.map(
                    (option) => (
                      <option
                        key={option}
                        value={option}
                      >
                        {option}
                      </option>
                    )
                  )}

                </select>

                <ChevronDown
                  size={19}
                  className="pointer-events-none absolute right-5 top-1/2 -translate-y-1/2 text-[#174f40]"
                />

              </div>

              {/* ----------------------------------------------------------- */}
              {/* MANUAL LOCATION                                             */}
              {/* ----------------------------------------------------------- */}

              {location ===
                "Other / Enter manually" && (
                <input
                  type="text"
                  required
                  value={
                    customLocation
                  }
                  onChange={(e) => {
                    setCustomLocation(
                      e.target.value
                    );
                    setError("");
                  }}
                  placeholder={
                    language === "hi"
                      ? "अपना शहर या जिला दर्ज करें"
                      : language === "mr"
                      ? "तुमचे शहर किंवा जिल्हा प्रविष्ट करा"
                      : "Enter your city or district"
                  }
                  className={`${inputClass} mt-3`}
                />
              )}

            </div>

            {/* ============================================================= */}
            {/* STATE DROPDOWN                                                 */}
            {/* ============================================================= */}

            <div>

              <label className="mb-3 block text-[16px] font-semibold text-[#174f40]">

                {t(
                  language,
                  "state"
                )}

                <span className="text-[#bd5d38]">
                  {" "}*
                </span>

              </label>

              <div className="relative">

                <select
                  required
                  value={state}
                  onChange={(e) => {
                    setState(
                      e.target.value
                    );
                    setError("");
                  }}
                  className={selectClass}
                >

                  <option value="">
                    {t(
                      language,
                      "selectState"
                    )}
                  </option>

                  {stateOptions.map(
                    (option) => (
                      <option
                        key={option}
                        value={option}
                      >
                        {option}
                      </option>
                    )
                  )}

                </select>

                <ChevronDown
                  size={19}
                  className="pointer-events-none absolute right-5 top-1/2 -translate-y-1/2 text-[#174f40]"
                />

              </div>

            </div>

          </div>

          {/* =============================================================== */}
          {/* ERROR MESSAGE                                                   */}
          {/* =============================================================== */}

          {error && (
            <div className="mt-5 rounded-xl border border-[#d9a18e] bg-[#fff2ed] px-4 py-3 text-[14px] font-medium text-[#a94f32]">
              {error}
            </div>
          )}

        </div>

        {/* =================================================================== */}
        {/* CONTINUE                                                           */}
        {/* =================================================================== */}

        <button
          type="button"
          onClick={
            handleContinue
          }
          className="mt-7 flex h-[62px] w-full items-center justify-center gap-3 rounded-[15px] bg-[#145943] text-[18px] font-semibold text-white transition hover:bg-[#104a38] active:scale-[0.995]"
        >

          {t(
            language,
            "continue"
          )}

          <ArrowRight
            size={21}
            strokeWidth={2.2}
          />

        </button>

      </div>

      {/* =================================================================== */}
      {/* DECORATIVE CORNER                                                   */}
      {/* =================================================================== */}

      <div className="pointer-events-none fixed bottom-0 right-0 h-24 w-24 overflow-hidden">

        <div className="absolute -bottom-14 -right-14 h-32 w-32 rounded-full bg-[#dce5d8]" />

      </div>

    </div>
  );
}