import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  FileText,
  ShieldCheck,
} from "lucide-react";

import { useMemo } from "react";
import { useNavigate } from "react-router-dom";

import {
  usePatientStore,
  type HistoryAnswer,
  type PatientLanguage,
} from "../../store/patientStore";

/* ========================================================================= */
/* REVIEW PAGE                                                               */
/* ========================================================================= */

export default function Review() {
  const navigate = useNavigate();

  /* ----------------------------------------------------------------------- */
  /* PATIENT STORE                                                            */
  /* ----------------------------------------------------------------------- */

  const language = usePatientStore(
    (state) => state.language
  );

  const demographics = usePatientStore(
    (state) => state.demographics
  );

  const chiefComplaint = usePatientStore(
    (state) => state.chiefComplaint
  );

  const selectedComplaints = usePatientStore(
    (state) => state.selectedComplaints
  );

  const historyAnswers = usePatientStore(
    (state) => state.historyAnswers
  );

  const prakriti = usePatientStore(
    (state) => state.prakriti
  );

  const lifestyle = usePatientStore(
    (state) => state.lifestyle
  );

  const medicalHistory = usePatientStore(
    (state) => state.medicalHistory
  );

  const submitForPhysicianReview =
    usePatientStore(
      (state) => state.submitForPhysicianReview
    );

  const resetPatientSession =
    usePatientStore(
      (state) => state.resetPatientSession
    );

  /* ----------------------------------------------------------------------- */
  /* PATIENT VALUES                                                           */
  /* ----------------------------------------------------------------------- */

  const patientName =
    demographics.fullName ||
    demographics.name ||
    getText(language, "notProvided");

  const patientAge =
    demographics.age !== ""
      ? `${demographics.age} ${getText(
          language,
          "years"
        )}`
      : getText(language, "notProvided");

  const patientGender =
    demographics.gender ||
    getText(language, "notProvided");

  const patientDob =
    demographics.dateOfBirth
      ? formatDate(
          demographics.dateOfBirth,
          language
        )
      : getText(language, "notProvided");

  const patientMobile =
    demographics.mobileNumber ||
    getText(language, "notProvided");

  const patientOccupation =
    demographics.occupation ||
    getText(language, "notProvided");

  const patientLocation =
    demographics.location ||
    getText(language, "notProvided");

  const patientState =
    demographics.state ||
    getText(language, "notProvided");

  /* ----------------------------------------------------------------------- */
  /* CHIEF COMPLAINT                                                          */
  /* ----------------------------------------------------------------------- */

  const complaint = chiefComplaint.trim();

  /* ----------------------------------------------------------------------- */
  /* GROUP HISTORY ANSWERS                                                    */
  /* ----------------------------------------------------------------------- */

  const groupedAnswers = useMemo(() => {
    const groups: Record<string, HistoryAnswer[]> = {};

    historyAnswers.forEach(
      (answer: HistoryAnswer) => {
        const section =
          answer.category ||
          "Clinical History";

        if (!groups[section]) {
          groups[section] = [];
        }

        groups[section].push(answer);
      }
    );

    return groups;
  }, [historyAnswers]);

  /* ----------------------------------------------------------------------- */
  /* ORDER SECTIONS                                                           */
  /* ----------------------------------------------------------------------- */

  const orderedSections = useMemo(() => {
    const sections = Object.keys(groupedAnswers);

    return [
      ...sections.filter(
        (section) =>
          section === "Chief Complaint"
      ),
      ...sections.filter(
        (section) =>
          section !== "Chief Complaint"
      ),
    ];
  }, [groupedAnswers]);

  /* ----------------------------------------------------------------------- */
  /* CHECK SECTION                                                            */
  /* ----------------------------------------------------------------------- */

  const hasSection = (section: string) => {
    return historyAnswers.some(
      (answer: HistoryAnswer) =>
        answer.category === section
    );
  };

  /* ----------------------------------------------------------------------- */
  /* SUBMIT                                                                   */
  /* ----------------------------------------------------------------------- */

  const handleSubmit = () => {
    submitForPhysicianReview();

    navigate("/patient/thank-you");
  };

  /* ----------------------------------------------------------------------- */
  /* RESET                                                                    */
  /* ----------------------------------------------------------------------- */

  const handleReset = () => {
    resetPatientSession();

    navigate("/patient");
  };

  /* ========================================================================= */
  /* RENDER                                                                    */
  /* ========================================================================= */

  return (
    <div className="min-h-screen bg-[#F7F3E9] text-[#173F35]">

      {/* =================================================================== */}
      {/* HEADER                                                              */}
      {/* =================================================================== */}

      <header
        className="
          flex
          min-h-[72px]
          items-center
          justify-between
          border-b
          border-[#E5DED1]
          bg-[#FBF8F2]
          px-5
          py-3
          md:px-7
        "
      >

        {/* BACK */}

        <button
          type="button"
          onClick={() =>
            navigate("/patient/documents")
          }
          className="
            inline-flex
            items-center
            gap-2
            rounded-lg
            border
            border-[#E2DACE]
            bg-white
            px-4
            py-2
            text-sm
            font-medium
            text-[#234C3E]
            shadow-sm
            transition
            hover:bg-[#F7F3E9]
          "
        >
          <ArrowLeft size={17} />

          {getText(language, "back")}
        </button>


        {/* CENTER LOGO */}

        <div
          className="
            absolute
            left-1/2
            -translate-x-1/2
            text-center
          "
        >
          <div
            className="
              font-serif
              text-xl
              font-semibold
              text-[#174638]
            "
          >
            MediKiosk
          </div>

          <div
            className="
              mt-1
              whitespace-nowrap
              text-[8px]
              font-medium
              tracking-[0.08em]
              text-[#74827B]
              md:text-[9px]
            "
          >
            {getText(language, "platform")}
          </div>
        </div>


        {/* RESET */}

        <button
          type="button"
          onClick={handleReset}
          className="
            ml-auto
            rounded-lg
            border
            border-[#E2DACE]
            bg-white
            px-4
            py-2
            text-sm
            font-medium
            text-[#C96D4D]
            transition
            hover:bg-[#FBEEE9]
          "
        >
          {getText(language, "reset")}
        </button>

      </header>


      {/* =================================================================== */}
      {/* PROGRESS                                                            */}
      {/* =================================================================== */}

      <div
        className="
          flex
          justify-center
          gap-2
          border-b
          border-[#E5DED1]
          bg-[#FBF8F2]
          py-4
        "
      >
        {Array.from({ length: 8 }).map(
          (_, index) => (
            <div
              key={index}
              className="
                h-2
                w-8
                rounded-full
                bg-[#174D3B]
              "
            />
          )
        )}
      </div>


      {/* =================================================================== */}
      {/* MAIN                                                                */}
      {/* =================================================================== */}

      <main
        className="
          mx-auto
          max-w-5xl
          px-5
          py-10
          md:px-6
          md:py-12
        "
      >

        {/* ================================================================= */}
        {/* TITLE                                                              */}
        {/* ================================================================= */}

        <div className="text-center">

          <p
            className="
              text-sm
              font-semibold
              uppercase
              tracking-[0.18em]
              text-[#3A9271]
            "
          >
            {getText(language, "step8")}
          </p>

          <h1
            className="
              mt-3
              font-serif
              text-4xl
              font-semibold
              text-[#174638]
              md:text-5xl
            "
          >
            {getText(language, "reviewTitle")}
          </h1>

          <p
            className="
              mx-auto
              mt-4
              max-w-2xl
              text-base
              leading-7
              text-[#66766F]
              md:text-lg
              md:leading-8
            "
          >
            {getText(
              language,
              "reviewSubtitle"
            )}
          </p>

        </div>


        {/* ================================================================= */}
        {/* TOP CARDS                                                          */}
        {/* ================================================================= */}

        <div
          className="
            mt-10
            grid
            gap-5
            md:grid-cols-2
          "
        >

          {/* =============================================================== */}
          {/* PATIENT INFORMATION                                             */}
          {/* =============================================================== */}

          <section
            className="
              rounded-2xl
              border
              border-[#E0D8CA]
              bg-white
              p-6
              shadow-sm
            "
          >

            <div
              className="
                flex
                items-center
                gap-3
              "
            >

              <div
                className="
                  flex
                  h-11
                  w-11
                  items-center
                  justify-center
                  rounded-xl
                  bg-[#E5F0E8]
                "
              >
                <CheckCircle2
                  size={22}
                  className="text-[#2D8B68]"
                />
              </div>

              <div>

                <h2
                  className="
                    font-serif
                    text-xl
                    font-semibold
                    text-[#174638]
                  "
                >
                  {getText(
                    language,
                    "patientInformation"
                  )}
                </h2>

                <p className="text-sm text-[#718078]">
                  {getText(
                    language,
                    "basicDemographicInformation"
                  )}
                </p>

              </div>

            </div>


            {/* PATIENT DETAILS */}

            <div className="mt-6 space-y-4">

              <InfoRow
                label={getText(
                  language,
                  "name"
                )}
                value={patientName}
              />

              <InfoRow
                label={getText(
                  language,
                  "dateOfBirth"
                )}
                value={patientDob}
              />

              <InfoRow
                label={getText(
                  language,
                  "age"
                )}
                value={patientAge}
              />

              <InfoRow
                label={getText(
                  language,
                  "gender"
                )}
                value={patientGender}
              />

              <InfoRow
                label={getText(
                  language,
                  "mobileNumber"
                )}
                value={patientMobile}
              />

              <InfoRow
                label={getText(
                  language,
                  "occupation"
                )}
                value={patientOccupation}
              />

              <InfoRow
                label={getText(
                  language,
                  "location"
                )}
                value={patientLocation}
              />

              <InfoRow
                label={getText(
                  language,
                  "state"
                )}
                value={patientState}
              />

            </div>

          </section>


          {/* =============================================================== */}
          {/* CHIEF COMPLAINT                                                  */}
          {/* =============================================================== */}

          <section
            className="
              rounded-2xl
              border
              border-[#E0D8CA]
              bg-white
              p-6
              shadow-sm
            "
          >

            <div
              className="
                flex
                items-center
                gap-3
              "
            >

              <div
                className="
                  flex
                  h-11
                  w-11
                  items-center
                  justify-center
                  rounded-xl
                  bg-[#F1E4D8]
                "
              >
                <FileText
                  size={22}
                  className="text-[#A85C3A]"
                />
              </div>

              <div>

                <h2
                  className="
                    font-serif
                    text-xl
                    font-semibold
                    text-[#174638]
                  "
                >
                  {getText(
                    language,
                    "chiefComplaint"
                  )}
                </h2>

                <p className="text-sm text-[#718078]">
                  {getText(
                    language,
                    "presentingHealthConcern"
                  )}
                </p>

              </div>

            </div>


            <div
              className="
                mt-6
                rounded-xl
                bg-[#F7F3E9]
                p-5
              "
            >

              <p
                className="
                  text-sm
                  font-semibold
                  text-[#718078]
                "
              >
                {getText(
                  language,
                  "mainProblem"
                )}
              </p>


              {complaint ? (
                <p
                  className="
                    mt-2
                    font-serif
                    text-2xl
                    font-semibold
                    leading-9
                    text-[#174638]
                  "
                >
                  {getLocalizedComplaintText(
                    complaint,
                    language
                  )}
                </p>
              ) : (
                <p
                  className="
                    mt-2
                    font-serif
                    text-2xl
                    font-semibold
                    text-[#8A918D]
                  "
                >
                  {getText(
                    language,
                    "notProvided"
                  )}
                </p>
              )}


              <p
                className="
                  mt-2
                  text-sm
                  text-[#687970]
                "
              >
                {getText(
                  language,
                  "capturedFromPatient"
                )}
              </p>

            </div>


            {/* IDENTIFIED CONCERNS */}

            {selectedComplaints.length > 0 && (
              <div className="mt-5">

                <p
                  className="
                    text-sm
                    font-semibold
                    text-[#315C4D]
                  "
                >
                  {getText(
                    language,
                    "identifiedConcerns"
                  )}
                </p>

                <div
                  className="
                    mt-3
                    flex
                    flex-wrap
                    gap-2
                  "
                >
                  {selectedComplaints.map(
                    (selectedComplaint) => (
                      <span
                        key={
                          selectedComplaint.id
                        }
                        className="
                          rounded-full
                          border
                          border-[#C9DED2]
                          bg-[#E7F1EA]
                          px-4
                          py-2
                          text-sm
                          font-medium
                          text-[#174D3B]
                        "
                      >
                        {getComplaintLabel(
                          selectedComplaint.id,
                          language,
                          selectedComplaint.displayName ||
                            selectedComplaint.name
                        )}
                      </span>
                    )
                  )}
                </div>

              </div>
            )}

          </section>

        </div>


        {/* ================================================================= */}
        {/* COMPLETE ADAPTIVE HISTORY                                         */}
        {/* ================================================================= */}

        <section
          className="
            mt-5
            rounded-2xl
            border
            border-[#E0D8CA]
            bg-white
            p-6
            shadow-sm
          "
        >

          <div
            className="
              flex
              flex-col
              justify-between
              gap-4
              md:flex-row
              md:items-center
            "
          >

            <div>

              <h2
                className="
                  font-serif
                  text-2xl
                  font-semibold
                  text-[#174638]
                "
              >
                {getText(
                  language,
                  "detailedClinicalHistory"
                )}
              </h2>

              <p
                className="
                  mt-1
                  text-sm
                  text-[#718078]
                "
              >
                {getText(
                  language,
                  "everyResponseCaptured"
                )}
              </p>

            </div>

            <span
              className="
                w-fit
                rounded-full
                bg-[#E5F0E8]
                px-4
                py-2
                text-xs
                font-semibold
                text-[#2D6F55]
              "
            >
              {getText(
                language,
                "physicianVerificationRequired"
              )}
            </span>

          </div>


          {/* NO ANSWERS */}

          {historyAnswers.length === 0 ? (
            <div
              className="
                mt-6
                rounded-xl
                border
                border-dashed
                border-[#D7CEBF]
                bg-[#FBF8F2]
                p-7
                text-center
              "
            >

              <FileText
                size={28}
                className="
                  mx-auto
                  text-[#8BA99A]
                "
              />

              <p
                className="
                  mt-3
                  font-medium
                  text-[#315C4D]
                "
              >
                {getText(
                  language,
                  "noHistoryResponses"
                )}
              </p>

              <p
                className="
                  mt-1
                  text-sm
                  text-[#718078]
                "
              >
                {getText(
                  language,
                  "historyWillAppear"
                )}
              </p>

            </div>
          ) : (
            <div
              className="
                mt-7
                space-y-8
              "
            >

              {orderedSections.map(
                (section: string) => {

                  const answers =
                    groupedAnswers[section];

                  if (
                    !answers ||
                    answers.length === 0
                  ) {
                    return null;
                  }

                  return (
                    <div key={section}>

                      {/* SECTION */}

                      <div
                        className="
                          mb-4
                          flex
                          items-center
                          gap-2
                        "
                      >

                        <div
                          className="
                            h-2
                            w-2
                            rounded-full
                            bg-[#BD6848]
                          "
                        />

                        <h3
                          className="
                            text-sm
                            font-semibold
                            uppercase
                            tracking-[0.14em]
                            text-[#A85C3A]
                          "
                        >
                          {getSectionLabel(
                            section,
                            language
                          )}
                        </h3>

                      </div>


                      {/* ANSWERS */}

                      <div className="space-y-3">

                        {answers.map(
                          (
                            answer: HistoryAnswer
                          ) => (
                            <div
                              key={
                                answer.questionId
                              }
                              className="
                                rounded-xl
                                border
                                border-[#E6DED1]
                                bg-[#FBF8F2]
                                p-4
                              "
                            >

                              <p
                                className="
                                  text-sm
                                  font-medium
                                  leading-6
                                  text-[#687970]
                                "
                              >
                                {answer.question}
                              </p>

                              <div
                                className="
                                  mt-2
                                  rounded-lg
                                  bg-white
                                  px-4
                                  py-3
                                "
                              >
                                <p
                                  className="
                                    text-sm
                                    font-semibold
                                    text-[#174638]
                                  "
                                >
                                  {answer.answer}
                                </p>
                              </div>

                              {answer.complaint && (
                                <p
                                  className="
                                    mt-2
                                    text-xs
                                    font-medium
                                    uppercase
                                    tracking-[0.1em]
                                    text-[#9A8B78]
                                  "
                                >
                                  {getComplaintLabel(
                                    answer.complaint,
                                    language
                                  )}
                                </p>
                              )}

                            </div>
                          )
                        )}

                      </div>

                    </div>
                  );
                }
              )}

            </div>
          )}

        </section>


        {/* ================================================================= */}
        {/* AYURVEDA CLINICAL HISTORY                                         */}
        {/* ================================================================= */}

        <section
          className="
            mt-5
            rounded-2xl
            border
            border-[#E0D8CA]
            bg-white
            p-6
            shadow-sm
          "
        >

          <div
            className="
              flex
              flex-col
              justify-between
              gap-4
              md:flex-row
              md:items-center
            "
          >

            <div>

              <h2
                className="
                  font-serif
                  text-2xl
                  font-semibold
                  text-[#174638]
                "
              >
                {getText(
                  language,
                  "ayurvedaClinicalHistory"
                )}
              </h2>

              <p
                className="
                  mt-1
                  text-sm
                  text-[#718078]
                "
              >
                {getText(
                  language,
                  "structuredHistory"
                )}
              </p>

            </div>

            <span
              className="
                w-fit
                rounded-full
                bg-[#E5F0E8]
                px-4
                py-2
                text-xs
                font-semibold
                text-[#2D6F55]
              "
            >
              {getText(
                language,
                "physicianVerificationRequired"
              )}
            </span>

          </div>


          <div
            className="
              mt-7
              grid
              gap-4
              md:grid-cols-3
            "
          >

            {/* PRAKRITI */}

            <HistoryItem
              title={getText(
                language,
                "prakriti"
              )}
              value={
                [
                  prakriti.bodyFrame
                    ? `${getText(
                        language,
                        "bodyFrame"
                      )}: ${getReadableValue(
                        prakriti.bodyFrame,
                        language
                      )}`
                    : "",

                  prakriti.skin
                    ? `${getText(
                        language,
                        "skin"
                      )}: ${getReadableValue(
                        prakriti.skin,
                        language
                      )}`
                    : "",

                  prakriti.appetite
                    ? `${getText(
                        language,
                        "appetite"
                      )}: ${getReadableValue(
                        prakriti.appetite,
                        language
                      )}`
                    : "",
                ]
                  .filter(Boolean)
                  .join(" • ") ||
                getText(
                  language,
                  "notProvided"
                )
              }
            />


            {/* VIKRITI */}

            <HistoryItem
              title={getText(
                language,
                "vikriti"
              )}
              value={
                hasSection("Vikriti")
                  ? getText(
                      language,
                      "vikritiCaptured"
                    )
                  : getText(
                      language,
                      "notProvided"
                    )
              }
            />


            {/* AGNI */}

            <HistoryItem
              title={getText(
                language,
                "agni"
              )}
              value={
                hasSection("Agni")
                  ? getText(
                      language,
                      "agniCaptured"
                    )
                  : getText(
                      language,
                      "notProvided"
                    )
              }
            />


            {/* KOSHTHA */}

            <HistoryItem
              title={getText(
                language,
                "koshtha"
              )}
              value={
                hasSection("Koshtha")
                  ? getText(
                      language,
                      "koshthaCaptured"
                    )
                  : getText(
                      language,
                      "notProvided"
                    )
              }
            />


            {/* AHARA VIHARA */}

            <HistoryItem
              title={getText(
                language,
                "aharaVihara"
              )}
              value={
                [
                  lifestyle.dietType
                    ? `${getText(
                        language,
                        "diet"
                      )}: ${lifestyle.dietType}`
                    : "",

                  lifestyle.mealTiming
                    ? `${getText(
                        language,
                        "meals"
                      )}: ${lifestyle.mealTiming}`
                    : "",

                  lifestyle.physicalActivity
                    ? `${getText(
                        language,
                        "activity"
                      )}: ${lifestyle.physicalActivity}`
                    : "",

                  lifestyle.sleepPattern
                    ? `${getText(
                        language,
                        "sleep"
                      )}: ${lifestyle.sleepPattern}`
                    : "",

                  lifestyle.workEnvironment
                    ? `${getText(
                        language,
                        "work"
                      )}: ${lifestyle.workEnvironment}`
                    : "",

                  lifestyle.travelFrequency
                    ? `${getText(
                        language,
                        "travel"
                      )}: ${lifestyle.travelFrequency}`
                    : "",
                ]
                  .filter(Boolean)
                  .join(" • ") ||
                getText(
                  language,
                  "notProvided"
                )
              }
            />


            {/* NIDANA */}

            <HistoryItem
              title={getText(
                language,
                "nidana"
              )}
              value={
                hasSection("Nidana")
                  ? getText(
                      language,
                      "nidanaCaptured"
                    )
                  : getText(
                      language,
                      "notProvided"
                    )
              }
            />


            {/* SAMPRAPTI */}

            <HistoryItem
              title={getText(
                language,
                "samprapti"
              )}
              value={
                hasSection("Samprapti")
                  ? getText(
                      language,
                      "sampraptiCaptured"
                    )
                  : getText(
                      language,
                      "notProvided"
                    )
              }
            />

          </div>

        </section>


        {/* ================================================================= */}
        {/* PREVIOUS MEDICAL HISTORY                                          */}
        {/* ================================================================= */}

        <section
          className="
            mt-5
            rounded-2xl
            border
            border-[#E0D8CA]
            bg-white
            p-6
            shadow-sm
          "
        >

          <div>

            <h2
              className="
                font-serif
                text-2xl
                font-semibold
                text-[#174638]
              "
            >
              {getText(
                language,
                "previousMedicalHistory"
              )}
            </h2>

            <p
              className="
                mt-1
                text-sm
                text-[#718078]
              "
            >
              {getText(
                language,
                "patientProvidedMedicalBackground"
              )}
            </p>

          </div>


          <div
            className="
              mt-6
              grid
              gap-4
              md:grid-cols-2
            "
          >

            <HistoryBox
              title={getText(
                language,
                "pastMedicalHistory"
              )}
              value={
                medicalHistory.pastMedicalHistory
              }
              language={language}
            />

            <HistoryBox
              title={getText(
                language,
                "pastSurgicalHistory"
              )}
              value={
                medicalHistory.pastSurgicalHistory
              }
              language={language}
            />

            <HistoryBox
              title={getText(
                language,
                "familyHistory"
              )}
              value={
                medicalHistory.familyHistory
              }
              language={language}
            />

            <HistoryBox
              title={getText(
                language,
                "drugHistory"
              )}
              value={
                medicalHistory.drugHistory
              }
              language={language}
            />

            <HistoryBox
              title={getText(
                language,
                "allergyHistory"
              )}
              value={getAllergyLabel(
                medicalHistory.allergyStatus,
                language
              )}
              language={language}
            />

          </div>

        </section>


        {/* ================================================================= */}
        {/* MEDICAL DOCUMENTS                                                 */}
        {/* ================================================================= */}

        <section
          className="
            mt-5
            rounded-2xl
            border
            border-[#E0D8CA]
            bg-white
            p-6
            shadow-sm
          "
        >

          <div
            className="
              flex
              items-center
              gap-3
            "
          >

            <div
              className="
                flex
                h-11
                w-11
                items-center
                justify-center
                rounded-xl
                bg-[#EDF3EE]
              "
            >
              <FileText
                size={22}
                className="text-[#315C4D]"
              />
            </div>

            <div>

              <h2
                className="
                  font-serif
                  text-xl
                  font-semibold
                  text-[#174638]
                "
              >
                {getText(
                  language,
                  "medicalDocuments"
                )}
              </h2>

              <p className="text-sm text-[#718078]">
                {getText(
                  language,
                  "previousDocuments"
                )}
              </p>

            </div>

          </div>


          <div
            className="
              mt-6
              rounded-xl
              border
              border-dashed
              border-[#C9DED2]
              bg-[#F1F6F2]
              p-6
              text-center
            "
          >

            <FileText
              size={30}
              className="
                mx-auto
                text-[#65A787]
              "
            />

            <p
              className="
                mt-3
                font-medium
                text-[#315C4D]
              "
            >
              {getText(
                language,
                "documentsCaptured"
              )}
            </p>

            <p
              className="
                mt-1
                text-sm
                text-[#718078]
              "
            >
              {getText(
                language,
                "documentResults"
              )}
            </p>

          </div>

        </section>


        {/* ================================================================= */}
        {/* IMPORTANT NOTICE                                                  */}
        {/* ================================================================= */}

        <div
          className="
            mt-7
            rounded-2xl
            border
            border-[#E5DED1]
            bg-[#FBF8F2]
            p-5
            text-center
          "
        >

          <p
            className="
              text-sm
              leading-6
              text-[#687970]
            "
          >
            {getText(
              language,
              "importantNotice"
            )}
          </p>

        </div>


        {/* ================================================================= */}
        {/* ACTION BUTTONS                                                     */}
        {/* ================================================================= */}

        <div
          className="
            mt-8
            flex
            flex-col
            gap-3
            md:flex-row
            md:items-center
            md:justify-between
          "
        >

          {/* BACK */}

          <button
            type="button"
            onClick={() =>
              navigate(
                "/patient/documents"
              )
            }
            className="
              inline-flex
              h-[54px]
              items-center
              justify-center
              gap-2
              rounded-xl
              border
              border-[#DED5C6]
              bg-white
              px-6
              font-medium
              text-[#315C4D]
              shadow-sm
              transition
              hover:bg-[#FBF8F2]
            "
          >

            <ArrowLeft size={18} />

            {getText(
              language,
              "back"
            )}

          </button>


          {/* SUBMIT */}

          <button
            type="button"
            onClick={handleSubmit}
            className="
              inline-flex
              h-[58px]
              items-center
              justify-center
              gap-3
              rounded-xl
              bg-[#174D3B]
              px-8
              font-semibold
              text-white
              shadow-sm
              transition
              hover:bg-[#123E30]
            "
          >

            {getText(
              language,
              "submitForPhysicianReview"
            )}

            <ArrowRight size={19} />

          </button>

        </div>


        {/* ================================================================= */}
        {/* SECURITY                                                          */}
        {/* ================================================================= */}

        <div
          className="
            mt-6
            flex
            items-center
            justify-center
            gap-2
            text-center
            text-xs
            text-[#687970]
          "
        >

          <ShieldCheck
            size={16}
            className="text-[#3E9271]"
          />

          {getText(
            language,
            "securityNotice"
          )}

        </div>

      </main>


      {/* =================================================================== */}
      {/* FOOTER                                                              */}
      {/* =================================================================== */}

      <footer
        className="
          border-t
          border-[#E5DED1]
          bg-[#FBF8F2]
          px-6
          py-5
        "
      >

        <div
          className="
            mx-auto
            flex
            max-w-5xl
            flex-col
            items-center
            justify-between
            gap-2
            text-center
            text-sm
            text-[#687970]
            md:flex-row
          "
        >

          <span>
            {getText(
              language,
              "privacyFirst"
            )}
          </span>

          <span>
            {getText(
              language,
              "underConsent"
            )}
          </span>

        </div>

      </footer>

    </div>
  );
}


/* ========================================================================= */
/* INFO ROW                                                                  */
/* ========================================================================= */

function InfoRow({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div
      className="
        flex
        items-center
        justify-between
        gap-5
        border-b
        border-[#EEE8DD]
        pb-3
        last:border-0
      "
    >

      <span className="text-sm text-[#718078]">
        {label}
      </span>

      <span
        className="
          max-w-[60%]
          text-right
          text-sm
          font-medium
          text-[#315C4D]
        "
      >
        {value}
      </span>

    </div>
  );
}


/* ========================================================================= */
/* HISTORY ITEM                                                              */
/* ========================================================================= */

function HistoryItem({
  title,
  value,
}: {
  title: string;
  value: string;
}) {
  return (
    <div
      className="
        rounded-xl
        border
        border-[#E5DED1]
        bg-[#FBF8F2]
        p-4
      "
    >

      <h3
        className="
          font-serif
          text-lg
          font-semibold
          text-[#174638]
        "
      >
        {title}
      </h3>

      <p
        className="
          mt-2
          text-sm
          leading-6
          text-[#718078]
        "
      >
        {value}
      </p>

    </div>
  );
}


/* ========================================================================= */
/* HISTORY BOX                                                               */
/* ========================================================================= */

function HistoryBox({
  title,
  value,
  language,
}: {
  title: string;
  value: string;
  language: PatientLanguage;
}) {
  return (
    <div
      className="
        rounded-xl
        border
        border-[#E5DED1]
        bg-[#FBF8F2]
        p-4
      "
    >

      <p
        className="
          text-sm
          font-semibold
          text-[#687970]
        "
      >
        {title}
      </p>

      <p
        className="
          mt-2
          whitespace-pre-wrap
          text-sm
          leading-6
          text-[#315C4D]
        "
      >
        {value?.trim()
          ? value
          : getText(
              language,
              "notProvided"
            )}
      </p>

    </div>
  );
}


/* ========================================================================= */
/* READABLE PRAKRITI VALUE                                                   */
/* ========================================================================= */

function getReadableValue(
  value: string,
  language: PatientLanguage
): string {
  if (!value) {
    return "";
  }

  const values: Record<
    string,
    ReviewTextKey
  > = {
    "thin-lean": "thinLean",
    "medium-moderate": "mediumModerate",
    "broad-heavy": "broadHeavy",
    "dry-rough": "dryRough",
    "soft-smooth": "softSmooth",
    "oily-thick": "oilyThick",
    irregular: "irregular",
    good: "goodRegular",
    strong: "strong",
  };

  const key = values[value];

  return key
    ? getText(language, key)
    : value;
}


/* ========================================================================= */
/* ALLERGY LABEL                                                             */
/* ========================================================================= */

function getAllergyLabel(
  value:
    | "no-known-allergy"
    | "known-allergy"
    | "not-sure"
    | "prefer-not-to-answer"
    | "",
  language: PatientLanguage
): string {
  switch (value) {
    case "no-known-allergy":
      return getText(
        language,
        "noKnownAllergy"
      );

    case "known-allergy":
      return getText(
        language,
        "knownAllergy"
      );

    case "not-sure":
      return getText(
        language,
        "notSure"
      );

    case "prefer-not-to-answer":
      return getText(
        language,
        "preferNotToAnswer"
      );

    default:
      return getText(
        language,
        "notProvided"
      );
  }
}


/* ========================================================================= */
/* COMPLAINT LABEL                                                           */
/* ========================================================================= */

function getComplaintLabel(
  complaint: string,
  language: PatientLanguage,
  fallback?: string
): string {
  const map: Record<
    string,
    ReviewTextKey
  > = {
    headache: "complaintHeadache",
    "joint-pain": "complaintJointPain",
    stomach: "complaintStomach",
    skin: "complaintSkin",
    sleep: "complaintSleep",
    weakness: "complaintWeakness",
    "fever-cough": "complaintFeverCough",
    constipation: "complaintConstipation",
    diarrhea: "complaintDiarrhea",
    "low-back": "complaintLowBack",
    eye: "complaintEye",
    "low-back-pain": "complaintLowBack",
  };

  const key = map[complaint];

  return key
    ? getText(language, key)
    : fallback || complaint;
}


/* ========================================================================= */
/* LOCALIZED CHIEF COMPLAINT                                                 */
/* ========================================================================= */

function getLocalizedComplaintText(
  complaint: string,
  language: PatientLanguage
): string {
  const normalized =
    complaint.toLowerCase();

  if (
    normalized.includes("atisara") ||
    normalized.includes("diarrhea")
  ) {
    return getText(
      language,
      "complaintDiarrhea"
    );
  }

  if (
    normalized.includes("headache") ||
    normalized.includes("shira shula")
  ) {
    return getText(
      language,
      "complaintHeadache"
    );
  }

  if (
    normalized.includes("joint") ||
    normalized.includes("sandhi shula")
  ) {
    return getText(
      language,
      "complaintJointPain"
    );
  }

  if (
    normalized.includes("stomach") ||
    normalized.includes("amlapitta")
  ) {
    return getText(
      language,
      "complaintStomach"
    );
  }

  if (
    normalized.includes("constipation") ||
    normalized.includes("vibandha")
  ) {
    return getText(
      language,
      "complaintConstipation"
    );
  }

  return complaint;
}


/* ========================================================================= */
/* SECTION LABEL                                                             */
/* ========================================================================= */

function getSectionLabel(
  section: string,
  language: PatientLanguage
): string {
  const map: Record<
    string,
    ReviewTextKey
  > = {
    "Chief Complaint":
      "chiefComplaint",

    Vikriti:
      "vikriti",

    Prakriti:
      "prakriti",

    Agni:
      "agni",

    Koshtha:
      "koshtha",

    Nidana:
      "nidana",

    Samprapti:
      "samprapti",

    "Ahara & Vihara":
      "aharaVihara",

    "Clinical History":
      "clinicalHistory",
  };

  return map[section]
    ? getText(
        language,
        map[section]
      )
    : section;
}


/* ========================================================================= */
/* DATE FORMAT                                                               */
/* ========================================================================= */

function formatDate(
  dateString: string,
  language: PatientLanguage
): string {
  if (!dateString) {
    return getText(
      language,
      "notProvided"
    );
  }

  const date = new Date(
    `${dateString}T00:00:00`
  );

  if (
    Number.isNaN(
      date.getTime()
    )
  ) {
    return dateString;
  }

  const localeMap: Record<
    string,
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

  return date.toLocaleDateString(
    localeMap[language] || "en-IN",
    {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }
  );
}


/* ========================================================================= */
/* TRANSLATION TYPES                                                         */
/* ========================================================================= */

type ReviewTextKey =
  | "back"
  | "reset"
  | "platform"
  | "step8"
  | "reviewTitle"
  | "reviewSubtitle"
  | "patientInformation"
  | "basicDemographicInformation"
  | "name"
  | "dateOfBirth"
  | "age"
  | "years"
  | "gender"
  | "mobileNumber"
  | "occupation"
  | "location"
  | "state"
  | "chiefComplaint"
  | "presentingHealthConcern"
  | "mainProblem"
  | "notProvided"
  | "capturedFromPatient"
  | "identifiedConcerns"
  | "detailedClinicalHistory"
  | "everyResponseCaptured"
  | "noHistoryResponses"
  | "historyWillAppear"
  | "ayurvedaClinicalHistory"
  | "structuredHistory"
  | "physicianVerificationRequired"
  | "prakriti"
  | "vikriti"
  | "agni"
  | "koshtha"
  | "aharaVihara"
  | "nidana"
  | "samprapti"
  | "clinicalHistory"
  | "prakritiCaptured"
  | "vikritiCaptured"
  | "agniCaptured"
  | "koshthaCaptured"
  | "nidanaCaptured"
  | "sampraptiCaptured"
  | "previousMedicalHistory"
  | "patientProvidedMedicalBackground"
  | "pastMedicalHistory"
  | "pastSurgicalHistory"
  | "familyHistory"
  | "drugHistory"
  | "allergyHistory"
  | "medicalDocuments"
  | "previousDocuments"
  | "documentsCaptured"
  | "documentResults"
  | "importantNotice"
  | "submitForPhysicianReview"
  | "securityNotice"
  | "privacyFirst"
  | "underConsent"
  | "bodyFrame"
  | "skin"
  | "appetite"
  | "diet"
  | "meals"
  | "activity"
  | "sleep"
  | "work"
  | "travel"
  | "thinLean"
  | "mediumModerate"
  | "broadHeavy"
  | "dryRough"
  | "softSmooth"
  | "oilyThick"
  | "irregular"
  | "goodRegular"
  | "strong"
  | "noKnownAllergy"
  | "knownAllergy"
  | "notSure"
  | "preferNotToAnswer"
  | "complaintHeadache"
  | "complaintJointPain"
  | "complaintStomach"
  | "complaintSkin"
  | "complaintSleep"
  | "complaintWeakness"
  | "complaintFeverCough"
  | "complaintConstipation"
  | "complaintDiarrhea"
  | "complaintLowBack"
  | "complaintEye";


/* ========================================================================= */
/* TRANSLATIONS                                                              */
/* ========================================================================= */

const english: Record<
  ReviewTextKey,
  string
> = {
  back: "Back",

  reset: "Reset",

  platform:
    "AI-Powered Ayurveda Clinical History Platform",

  step8:
    "Step 8 of 8",

  reviewTitle:
    "Review Your Health History",

  reviewSubtitle:
    "Please review the information captured during your clinical history. Your physician will verify this information before making any clinical decision.",

  patientInformation:
    "Patient Information",

  basicDemographicInformation:
    "Basic demographic information",

  name: "Name",

  dateOfBirth:
    "Date of Birth",

  age: "Age",

  years: "years",

  gender: "Gender",

  mobileNumber:
    "Mobile Number",

  occupation:
    "Occupation",

  location:
    "Location",

  state: "State",

  chiefComplaint:
    "Chief Complaint",

  presentingHealthConcern:
    "Presenting health concern",

  mainProblem:
    "Main problem",

  notProvided:
    "Not provided",

  capturedFromPatient:
    "Captured directly from the patient",

  identifiedConcerns:
    "Identified concerns",

  detailedClinicalHistory:
    "Detailed Clinical History",

  everyResponseCaptured:
    "Every response captured during adaptive questioning",

  noHistoryResponses:
    "No adaptive history responses were recorded.",

  historyWillAppear:
    "Patient answers will appear here as the clinical history is completed.",

  ayurvedaClinicalHistory:
    "Ayurveda Clinical History",

  structuredHistory:
    "Structured information captured during adaptive questioning",

  physicianVerificationRequired:
    "Physician Verification Required",

  prakriti: "Prakriti",

  vikriti: "Vikriti",

  agni: "Agni",

  koshtha: "Koshtha",

  aharaVihara:
    "Ahara & Vihara",

  nidana: "Nidana",

  samprapti: "Samprapti",

  clinicalHistory:
    "Clinical History",

  prakritiCaptured:
    "Captured during constitutional assessment",

  vikritiCaptured:
    "Current complaint and associated history captured",

  agniCaptured:
    "Digestive strength information captured",

  koshthaCaptured:
    "Bowel habit information captured",

  nidanaCaptured:
    "Relevant contributing factors captured",

  sampraptiCaptured:
    "Progression information captured for physician review",

  previousMedicalHistory:
    "Previous Medical History",

  patientProvidedMedicalBackground:
    "Patient-provided medical background",

  pastMedicalHistory:
    "Past Medical History",

  pastSurgicalHistory:
    "Past Surgical History",

  familyHistory:
    "Family History",

  drugHistory:
    "Drug History",

  allergyHistory:
    "Allergy History",

  medicalDocuments:
    "Medical Documents",

  previousDocuments:
    "Previous prescriptions, reports and discharge documents",

  documentsCaptured:
    "Documents captured",

  documentResults:
    "Document intelligence results will appear here when documents are uploaded.",

  importantNotice:
    "MediKiosk structures the information provided by you for physician review. It does not independently diagnose conditions or prescribe treatment.",

  submitForPhysicianReview:
    "Submit for Physician Review",

  securityNotice:
    "Your information is handled securely and remains subject to physician verification.",

  privacyFirst:
    "Privacy-first clinical intake",

  underConsent:
    "Your information remains under your consent.",

  bodyFrame:
    "Body frame",

  skin: "Skin",

  appetite: "Appetite",

  diet: "Diet",

  meals: "Meals",

  activity: "Activity",

  sleep: "Sleep",

  work: "Work",

  travel: "Travel",

  thinLean:
    "Thin / Lean",

  mediumModerate:
    "Medium / Moderate",

  broadHeavy:
    "Broad / Heavy",

  dryRough:
    "Dry / Rough",

  softSmooth:
    "Soft / Smooth",

  oilyThick:
    "Oily / Thick",

  irregular:
    "Irregular",

  goodRegular:
    "Good / Regular",

  strong:
    "Strong",

  noKnownAllergy:
    "No known allergy",

  knownAllergy:
    "Known allergy",

  notSure:
    "Not sure",

  preferNotToAnswer:
    "Prefer not to answer",

  complaintHeadache:
    "Shira Shula — Headache",

  complaintJointPain:
    "Sandhi Shula — Joint Pain / Stiffness",

  complaintStomach:
    "Amlapitta — Stomach Pain / Acidity",

  complaintSkin:
    "Tvak Roga — Skin Rash / Itching",

  complaintSleep:
    "Anidra — Sleep Difficulty",

  complaintWeakness:
    "Daurbalya — Weakness / Fatigue",

  complaintFeverCough:
    "Jwara / Kasa — Fever / Cough",

  complaintConstipation:
    "Vibandha — Constipation",

  complaintDiarrhea:
    "Atisara — Diarrhea",

  complaintLowBack:
    "Kati Shula — Low Back Pain",

  complaintEye:
    "Netra Roga — Eye Problems",
};


/* ========================================================================= */
/* HINDI                                                                     */
/* ========================================================================= */

const hindi: Partial<
  Record<ReviewTextKey, string>
> = {
  back: "वापस",

  reset: "रीसेट",

  platform:
    "AI-संचालित आयुर्वेद नैदानिक इतिहास प्लेटफॉर्म",

  step8:
    "चरण 8 में से 8",

  reviewTitle:
    "अपने स्वास्थ्य इतिहास की समीक्षा करें",

  reviewSubtitle:
    "कृपया अपने नैदानिक इतिहास के दौरान दर्ज की गई जानकारी की समीक्षा करें। किसी भी चिकित्सीय निर्णय से पहले आपका चिकित्सक इस जानकारी की पुष्टि करेगा।",

  patientInformation:
    "रोगी की जानकारी",

  basicDemographicInformation:
    "बुनियादी जानकारी",

  name: "नाम",

  dateOfBirth:
    "जन्म तिथि",

  age: "आयु",

  years: "वर्ष",

  gender: "लिंग",

  mobileNumber:
    "मोबाइल नंबर",

  occupation:
    "व्यवसाय",

  location: "स्थान",

  state: "राज्य",

  chiefComplaint:
    "मुख्य शिकायत",

  presentingHealthConcern:
    "मुख्य स्वास्थ्य समस्या",

  mainProblem:
    "मुख्य समस्या",

  notProvided:
    "उपलब्ध नहीं",

  capturedFromPatient:
    "रोगी से सीधे प्राप्त जानकारी",

  identifiedConcerns:
    "पहचानी गई समस्याएँ",

  detailedClinicalHistory:
    "विस्तृत नैदानिक इतिहास",

  everyResponseCaptured:
    "अनुकूली प्रश्नों के दौरान दर्ज किए गए सभी उत्तर",

  noHistoryResponses:
    "कोई नैदानिक उत्तर दर्ज नहीं किया गया है।",

  historyWillAppear:
    "इतिहास पूरा होने पर रोगी के उत्तर यहां दिखाई देंगे।",

  ayurvedaClinicalHistory:
    "आयुर्वेद नैदानिक इतिहास",

  structuredHistory:
    "अनुकूली प्रश्नों के दौरान दर्ज की गई संरचित जानकारी",

  physicianVerificationRequired:
    "चिकित्सक द्वारा सत्यापन आवश्यक",

  prakriti: "प्रकृति",

  vikriti: "विकृति",

  agni: "अग्नि",

  koshtha: "कोष्ठ",

  aharaVihara:
    "आहार एवं विहार",

  nidana: "निदान",

  samprapti: "सम्प्राप्ति",

  clinicalHistory:
    "नैदानिक इतिहास",

  prakritiCaptured:
    "प्रकृति मूल्यांकन के दौरान दर्ज किया गया",

  vikritiCaptured:
    "वर्तमान शिकायत और संबंधित इतिहास दर्ज किया गया",

  agniCaptured:
    "पाचन शक्ति से संबंधित जानकारी दर्ज की गई",

  koshthaCaptured:
    "कोष्ठ से संबंधित जानकारी दर्ज की गई",

  nidanaCaptured:
    "प्रासंगिक योगदान करने वाले कारक दर्ज किए गए",

  sampraptiCaptured:
    "समस्या की प्रगति संबंधी जानकारी दर्ज की गई",

  previousMedicalHistory:
    "पिछला चिकित्सा इतिहास",

  patientProvidedMedicalBackground:
    "रोगी द्वारा प्रदान की गई चिकित्सा जानकारी",

  pastMedicalHistory:
    "पिछला चिकित्सा इतिहास",

  pastSurgicalHistory:
    "पिछला शल्य चिकित्सा इतिहास",

  familyHistory:
    "पारिवारिक इतिहास",

  drugHistory:
    "दवा का इतिहास",

  allergyHistory:
    "एलर्जी का इतिहास",

  medicalDocuments:
    "चिकित्सीय दस्तावेज़",

  previousDocuments:
    "पिछले नुस्खे, रिपोर्ट और डिस्चार्ज दस्तावेज़",

  documentsCaptured:
    "दस्तावेज़ दर्ज किए गए",

  documentResults:
    "दस्तावेज़ अपलोड होने पर उनकी जानकारी यहां दिखाई देगी।",

  importantNotice:
    "MediKiosk आपके द्वारा दी गई जानकारी को चिकित्सक की समीक्षा के लिए व्यवस्थित करता है। यह स्वयं निदान या उपचार निर्धारित नहीं करता।",

  submitForPhysicianReview:
    "चिकित्सक की समीक्षा के लिए भेजें",

  securityNotice:
    "आपकी जानकारी सुरक्षित रखी जाती है और चिकित्सक के सत्यापन के अधीन रहती है।",

  privacyFirst:
    "गोपनीयता-प्रथम नैदानिक इनटेक",

  underConsent:
    "आपकी जानकारी आपकी सहमति के अंतर्गत रहती है।",

  bodyFrame:
    "शरीर की बनावट",

  skin: "त्वचा",

  appetite: "भूख",

  diet: "आहार",

  meals: "भोजन",

  activity: "गतिविधि",

  sleep: "नींद",

  work: "कार्य",

  travel: "यात्रा",

  thinLean:
    "पतला / दुबला",

  mediumModerate:
    "मध्यम / सामान्य",

  broadHeavy:
    "चौड़ा / भारी",

  dryRough:
    "सूखी / खुरदरी",

  softSmooth:
    "कोमल / चिकनी",

  oilyThick:
    "तैलीय / मोटी",

  irregular:
    "अनियमित",

  goodRegular:
    "अच्छी / नियमित",

  strong: "मजबूत",

  noKnownAllergy:
    "कोई ज्ञात एलर्जी नहीं",

  knownAllergy:
    "ज्ञात एलर्जी",

  notSure:
    "निश्चित नहीं",

  preferNotToAnswer:
    "उत्तर देना पसंद नहीं है",

  complaintHeadache:
    "शिरः शूल — सिरदर्द",

  complaintJointPain:
    "संधि शूल — जोड़ों का दर्द / अकड़न",

  complaintStomach:
    "अम्लपित्त — पेट दर्द / एसिडिटी",

  complaintSkin:
    "त्वक रोग — त्वचा पर चकत्ते / खुजली",

  complaintSleep:
    "अनिद्रा — नींद में कठिनाई",

  complaintWeakness:
    "दौर्बल्य — कमजोरी / थकान",

  complaintFeverCough:
    "ज्वर / कास — बुखार / खांसी",

  complaintConstipation:
    "विबंध — कब्ज",

  complaintDiarrhea:
    "अतिसार — दस्त",

  complaintLowBack:
    "कटि शूल — कमर के निचले हिस्से में दर्द",

  complaintEye:
    "नेत्र रोग — आंखों की समस्या",
};


/* ========================================================================= */
/* MARATHI                                                                   */
/* ========================================================================= */

const marathi: Partial<
  Record<ReviewTextKey, string>
> = {
  back: "मागे",

  reset: "रीसेट",

  platform:
    "AI-संचालित आयुर्वेद नैदानिक इतिहास प्लॅटफॉर्म",

  step8:
    "चरण 8 पैकी 8",

  reviewTitle:
    "तुमच्या आरोग्य इतिहासाचे पुनरावलोकन करा",

  reviewSubtitle:
    "कृपया तुमच्या नैदानिक इतिहासादरम्यान नोंदवलेल्या माहितीचे पुनरावलोकन करा. कोणताही वैद्यकीय निर्णय घेण्यापूर्वी डॉक्टर या माहितीची पडताळणी करतील.",

  patientInformation:
    "रुग्णाची माहिती",

  basicDemographicInformation:
    "मूलभूत माहिती",

  name: "नाव",

  dateOfBirth:
    "जन्मतारीख",

  age: "वय",

  years: "वर्षे",

  gender: "लिंग",

  mobileNumber:
    "मोबाइल नंबर",

  occupation:
    "व्यवसाय",

  location: "स्थान",

  state: "राज्य",

  chiefComplaint:
    "मुख्य तक्रार",

  presentingHealthConcern:
    "मुख्य आरोग्य समस्या",

  mainProblem:
    "मुख्य समस्या",

  notProvided:
    "उपलब्ध नाही",

  capturedFromPatient:
    "रुग्णाकडून थेट प्राप्त माहिती",

  identifiedConcerns:
    "ओळखलेल्या समस्या",

  detailedClinicalHistory:
    "विस्तृत नैदानिक इतिहास",

  everyResponseCaptured:
    "अनुकूली प्रश्नांदरम्यान नोंदवलेली सर्व उत्तरे",

  noHistoryResponses:
    "कोणतीही नैदानिक उत्तरे नोंदवलेली नाहीत.",

  historyWillAppear:
    "इतिहास पूर्ण झाल्यावर रुग्णाची उत्तरे येथे दिसतील.",

  ayurvedaClinicalHistory:
    "आयुर्वेद नैदानिक इतिहास",

  structuredHistory:
    "अनुकूली प्रश्नांदरम्यान नोंदवलेली संरचित माहिती",

  physicianVerificationRequired:
    "डॉक्टरांचे सत्यापन आवश्यक",

  prakriti: "प्रकृती",

  vikriti: "विकृती",

  agni: "अग्नी",

  koshtha: "कोष्ठ",

  aharaVihara:
    "आहार व विहार",

  nidana: "निदान",

  samprapti: "संप्राप्ती",

  clinicalHistory:
    "नैदानिक इतिहास",

  prakritiCaptured:
    "प्रकृती मूल्यांकनादरम्यान नोंदवलेली माहिती",

  vikritiCaptured:
    "सध्याची तक्रार आणि संबंधित इतिहास नोंदवला आहे",

  agniCaptured:
    "पचनशक्तीशी संबंधित माहिती नोंदवली आहे",

  koshthaCaptured:
    "कोष्ठाशी संबंधित माहिती नोंदवली आहे",

  nidanaCaptured:
    "संबंधित कारणे नोंदवली आहेत",

  sampraptiCaptured:
    "समस्येच्या प्रगतीची माहिती नोंदवली आहे",

  previousMedicalHistory:
    "मागील वैद्यकीय इतिहास",

  patientProvidedMedicalBackground:
    "रुग्णाने दिलेली वैद्यकीय माहिती",

  pastMedicalHistory:
    "मागील वैद्यकीय इतिहास",

  pastSurgicalHistory:
    "मागील शस्त्रक्रिया इतिहास",

  familyHistory:
    "कौटुंबिक इतिहास",

  drugHistory:
    "औषधांचा इतिहास",

  allergyHistory:
    "अॅलर्जीचा इतिहास",

  medicalDocuments:
    "वैद्यकीय कागदपत्रे",

  previousDocuments:
    "मागील प्रिस्क्रिप्शन, अहवाल आणि डिस्चार्ज कागदपत्रे",

  documentsCaptured:
    "कागदपत्रे नोंदवली आहेत",

  documentResults:
    "कागदपत्रे अपलोड केल्यानंतर त्यांची माहिती येथे दिसेल.",

  importantNotice:
    "MediKiosk तुम्ही दिलेली माहिती डॉक्टरांच्या पुनरावलोकनासाठी व्यवस्थित करते. हे स्वतः निदान किंवा उपचार ठरवत नाही.",

  submitForPhysicianReview:
    "डॉक्टरांच्या पुनरावलोकनासाठी पाठवा",

  securityNotice:
    "तुमची माहिती सुरक्षित ठेवली जाते आणि डॉक्टरांच्या सत्यापनाच्या अधीन असते.",

  privacyFirst:
    "गोपनीयता-प्रथम क्लिनिकल इनटेक",

  underConsent:
    "तुमची माहिती तुमच्या संमतीअंतर्गत राहते.",

  bodyFrame:
    "शरीराची ठेवण",

  skin: "त्वचा",

  appetite: "भूक",

  diet: "आहार",

  meals: "जेवण",

  activity: "शारीरिक क्रिया",

  sleep: "झोप",

  work: "काम",

  travel: "प्रवास",

  thinLean:
    "बारीक / कृश",

  mediumModerate:
    "मध्यम / सामान्य",

  broadHeavy:
    "रुंद / जड",

  dryRough:
    "कोरडी / खरखरीत",

  softSmooth:
    "मऊ / गुळगुळीत",

  oilyThick:
    "तेलकट / जाड",

  irregular:
    "अनियमित",

  goodRegular:
    "चांगली / नियमित",

  strong: "मजबूत",

  noKnownAllergy:
    "कोणतीही ज्ञात अॅलर्जी नाही",

  knownAllergy:
    "ज्ञात अॅलर्जी",

  notSure:
    "निश्चित नाही",

  preferNotToAnswer:
    "उत्तर देणे पसंत नाही",

  complaintHeadache:
    "शिरः शूल — डोकेदुखी",

  complaintJointPain:
    "संधी शूल — सांधेदुखी / कडकपणा",

  complaintStomach:
    "अम्लपित्त — पोटदुखी / अॅसिडिटी",

  complaintSkin:
    "त्वचा विकार — त्वचेवर पुरळ / खाज",

  complaintSleep:
    "अनिद्रा — झोपेची अडचण",

  complaintWeakness:
    "दौर्बल्य — अशक्तपणा / थकवा",

  complaintFeverCough:
    "ज्वर / कास — ताप / खोकला",

  complaintConstipation:
    "विबंध — बद्धकोष्ठता",

  complaintDiarrhea:
    "अतिसार — जुलाब",

  complaintLowBack:
    "कटि शूल — कंबरेच्या खालच्या भागात वेदना",

  complaintEye:
    "नेत्र विकार — डोळ्यांच्या समस्या",
};


/* ========================================================================= */
/* OTHER INDIAN LANGUAGES                                                    */
/* ========================================================================= */

const additionalTranslations:
  Partial<
    Record<
      PatientLanguage,
      Partial<Record<ReviewTextKey, string>>
    >
  > = {

  /* ----------------------------------------------------------------------- */
  /* KONKANI                                                                 */
  /* ----------------------------------------------------------------------- */

  kok: {
    back: "फाटीं",

    reset: "रिसेट",

    platform:
      "AI-आधारित आयुर्वेद क्लिनिकल इतिहास प्लॅटफॉर्म",

    step8:
      "8 तल्या 8वो टप्पो",

    reviewTitle:
      "तुमच्या आरोग्य इतिहासाचो आढावो घेवचो",

    patientInformation:
      "रुग्णाची म्हायती",

    name: "नांव",

    dateOfBirth:
      "जन्म तारीख",

    age: "वय",

    years: "वर्सां",

    gender: "लिंग",

    mobileNumber:
      "मोबायल नंबर",

    occupation:
      "व्यवसाय",

    location: "स्थान",

    state: "राज्य",

    chiefComplaint:
      "मुखेल तक्रार",

    mainProblem:
      "मुखेल समस्या",

    notProvided:
      "उपलब्ध ना",

    detailedClinicalHistory:
      "सविस्तर क्लिनिकल इतिहास",

    ayurvedaClinicalHistory:
      "आयुर्वेद क्लिनिकल इतिहास",

    physicianVerificationRequired:
      "डॉक्टराची पडताळणी गरजेची",

    previousMedicalHistory:
      "मागिल्लो वैद्यकीय इतिहास",

    medicalDocuments:
      "वैद्यकीय कागदपत्रां",

    submitForPhysicianReview:
      "डॉक्टराच्या आढाव्याक धाडात",
  },


  /* ----------------------------------------------------------------------- */
  /* SANSKRIT                                                                */
  /* ----------------------------------------------------------------------- */

  sa: {
    back: "पुनः",

    reset: "पुनःस्थापनम्",

    platform:
      "AI-आधारित आयुर्वेद चिकित्सीय-इतिहास मञ्चम्",

    step8:
      "अष्टमे सोपाने अष्टमं सोपानम्",

    reviewTitle:
      "स्वास्थ्य-इतिहासस्य पुनरवलोकनम्",

    patientInformation:
      "रोगिणः सूचना",

    name: "नाम",

    dateOfBirth:
      "जन्मतिथिः",

    age: "आयुः",

    years: "वर्षाणि",

    gender: "लिङ्गम्",

    mobileNumber:
      "दूरभाष-सङ्ख्या",

    occupation:
      "व्यवसायः",

    location: "स्थानम्",

    state: "राज्यम्",

    chiefComplaint:
      "मुख्य-शिकायत",

    mainProblem:
      "मुख्य-समस्या",

    notProvided:
      "उपलब्धं नास्ति",

    detailedClinicalHistory:
      "विस्तृतः चिकित्सीय-इतिहासः",

    ayurvedaClinicalHistory:
      "आयुर्वेद चिकित्सीय इतिहासः",

    physicianVerificationRequired:
      "चिकित्सकस्य सत्यापनम् आवश्यकम्",

    previousMedicalHistory:
      "पूर्व-चिकित्सीय इतिहासः",

    medicalDocuments:
      "चिकित्सीय दस्तावेजाः",

    submitForPhysicianReview:
      "चिकित्सकस्य समीक्षायै प्रेषयतु",
  },


  /* ----------------------------------------------------------------------- */
  /* GUJARATI                                                                */
  /* ----------------------------------------------------------------------- */

  gu: {
    back: "પાછળ",

    reset: "રીસેટ",

    platform:
      "AI આધારિત આયુર્વેદ ક્લિનિકલ હિસ્ટ્રી પ્લેટફોર્મ",

    step8:
      "8 માંથી પગલું 8",

    reviewTitle:
      "તમારા આરોગ્ય ઇતિહાસની સમીક્ષા કરો",

    patientInformation:
      "દર્દીની માહિતી",

    basicDemographicInformation:
      "મૂળભૂત માહિતી",

    name: "નામ",

    dateOfBirth:
      "જન્મ તારીખ",

    age: "ઉંમર",

    years: "વર્ષ",

    gender: "લિંગ",

    mobileNumber:
      "મોબાઇલ નંબર",

    occupation:
      "વ્યવસાય",

    location: "સ્થળ",

    state: "રાજ્ય",

    chiefComplaint:
      "મુખ્ય ફરિયાદ",

    presentingHealthConcern:
      "મુખ્ય આરોગ્ય સમસ્યા",

    mainProblem:
      "મુખ્ય સમસ્યા",

    notProvided:
      "આપવામાં આવેલ નથી",

    capturedFromPatient:
      "દર્દી પાસેથી સીધી મેળવેલી માહિતી",

    detailedClinicalHistory:
      "વિગતવાર ક્લિનિકલ ઇતિહાસ",

    everyResponseCaptured:
      "અનુકૂલનશીલ પ્રશ્નો દરમિયાન નોંધાયેલા તમામ જવાબો",

    ayurvedaClinicalHistory:
      "આયુર્વેદ ક્લિનિકલ ઇતિહાસ",

    physicianVerificationRequired:
      "ડૉક્ટર દ્વારા ચકાસણી જરૂરી",

    previousMedicalHistory:
      "અગાઉનો તબીબી ઇતિહાસ",

    medicalDocuments:
      "તબીબી દસ્તાવેજો",

    submitForPhysicianReview:
      "ડૉક્ટરની સમીક્ષા માટે મોકલો",

    securityNotice:
      "તમારી માહિતી સુરક્ષિત રીતે રાખવામાં આવે છે અને ડૉક્ટરની ચકાસણી હેઠળ રહે છે.",
  },


  /* ----------------------------------------------------------------------- */
  /* BENGALI                                                                 */
  /* ----------------------------------------------------------------------- */

  bn: {
    back: "পিছনে",

    reset: "রিসেট",

    platform:
      "AI-চালিত আয়ুর্বেদ ক্লিনিক্যাল হিস্ট্রি প্ল্যাটফর্ম",

    step8:
      "৮টির মধ্যে ধাপ ৮",

    reviewTitle:
      "আপনার স্বাস্থ্য ইতিহাস পর্যালোচনা করুন",

    patientInformation:
      "রোগীর তথ্য",

    basicDemographicInformation:
      "মৌলিক তথ্য",

    name: "নাম",

    dateOfBirth:
      "জন্ম তারিখ",

    age: "বয়স",

    years: "বছর",

    gender: "লিঙ্গ",

    mobileNumber:
      "মোবাইল নম্বর",

    occupation: "পেশা",

    location: "স্থান",

    state: "রাজ্য",

    chiefComplaint:
      "প্রধান অভিযোগ",

    mainProblem:
      "প্রধান সমস্যা",

    notProvided:
      "প্রদান করা হয়নি",

    detailedClinicalHistory:
      "বিস্তারিত ক্লিনিক্যাল ইতিহাস",

    ayurvedaClinicalHistory:
      "আয়ুর্বেদ ক্লিনিক্যাল ইতিহাস",

    physicianVerificationRequired:
      "চিকিৎসকের যাচাই প্রয়োজন",

    previousMedicalHistory:
      "পূর্ববর্তী চিকিৎসা ইতিহাস",

    medicalDocuments:
      "চিকিৎসা সংক্রান্ত নথি",

    submitForPhysicianReview:
      "চিকিৎসকের পর্যালোচনার জন্য জমা দিন",
  },


  /* ----------------------------------------------------------------------- */
  /* KANNADA                                                                 */
  /* ----------------------------------------------------------------------- */

  kn: {
    back: "ಹಿಂದೆ",

    reset: "ರೀಸೆಟ್",

    platform:
      "AI ಆಧಾರಿತ ಆಯುರ್ವೇದ ಕ್ಲಿನಿಕಲ್ ಹಿಸ್ಟರಿ ಪ್ಲಾಟ್‌ಫಾರ್ಮ್",

    step8:
      "8ರಲ್ಲಿ ಹಂತ 8",

    reviewTitle:
      "ನಿಮ್ಮ ಆರೋಗ್ಯ ಇತಿಹಾಸವನ್ನು ಪರಿಶೀಲಿಸಿ",

    patientInformation:
      "ರೋಗಿಯ ಮಾಹಿತಿ",

    basicDemographicInformation:
      "ಮೂಲಭೂತ ಮಾಹಿತಿ",

    name: "ಹೆಸರು",

    dateOfBirth:
      "ಜನ್ಮ ದಿನಾಂಕ",

    age: "ವಯಸ್ಸು",

    years: "ವರ್ಷ",

    gender: "ಲಿಂಗ",

    mobileNumber:
      "ಮೊಬೈಲ್ ಸಂಖ್ಯೆ",

    occupation: "ಉದ್ಯೋಗ",

    location: "ಸ್ಥಳ",

    state: "ರಾಜ್ಯ",

    chiefComplaint:
      "ಮುಖ್ಯ ದೂರು",

    mainProblem:
      "ಮುಖ್ಯ ಸಮಸ್ಯೆ",

    notProvided:
      "ನೀಡಲಾಗಿಲ್ಲ",

    detailedClinicalHistory:
      "ವಿವರವಾದ ಕ್ಲಿನಿಕಲ್ ಇತಿಹಾಸ",

    ayurvedaClinicalHistory:
      "ಆಯುರ್ವೇದ ಕ್ಲಿನಿಕಲ್ ಇತಿಹಾಸ",

    physicianVerificationRequired:
      "ವೈದ್ಯರ ಪರಿಶೀಲನೆ ಅಗತ್ಯ",

    previousMedicalHistory:
      "ಹಿಂದಿನ ವೈದ್ಯಕೀಯ ಇತಿಹಾಸ",

    medicalDocuments:
      "ವೈದ್ಯಕೀಯ ದಾಖಲೆಗಳು",

    submitForPhysicianReview:
      "ವೈದ್ಯರ ಪರಿಶೀಲನೆಗೆ ಸಲ್ಲಿಸಿ",
  },


  /* ----------------------------------------------------------------------- */
  /* MALAYALAM                                                               */
  /* ----------------------------------------------------------------------- */

  ml: {
    back: "തിരികെ",

    reset: "റീസെറ്റ്",

    platform:
      "AI അധിഷ്ഠിത ആയുർവേദ ക്ലിനിക്കൽ ഹിസ്റ്ററി പ്ലാറ്റ്ഫോം",

    step8:
      "8ൽ ഘട്ടം 8",

    reviewTitle:
      "നിങ്ങളുടെ ആരോഗ്യ ചരിത്രം പരിശോധിക്കുക",

    patientInformation:
      "രോഗിയുടെ വിവരങ്ങൾ",

    basicDemographicInformation:
      "അടിസ്ഥാന വിവരങ്ങൾ",

    name: "പേര്",

    dateOfBirth:
      "ജനന തീയതി",

    age: "പ്രായം",

    years: "വർഷം",

    gender: "ലിംഗം",

    mobileNumber:
      "മൊബൈൽ നമ്പർ",

    occupation: "തൊഴിൽ",

    location: "സ്ഥലം",

    state: "സംസ്ഥാനം",

    chiefComplaint:
      "പ്രധാന പരാതി",

    mainProblem:
      "പ്രധാന പ്രശ്നം",

    notProvided:
      "നൽകിയിട്ടില്ല",

    detailedClinicalHistory:
      "വിശദമായ ക്ലിനിക്കൽ ചരിത്രം",

    ayurvedaClinicalHistory:
      "ആയുർവേദ ക്ലിനിക്കൽ ചരിത്രം",

    physicianVerificationRequired:
      "ഡോക്ടറുടെ പരിശോധന ആവശ്യമാണ്",

    previousMedicalHistory:
      "മുൻകാല മെഡിക്കൽ ചരിത്രം",

    medicalDocuments:
      "മെഡിക്കൽ രേഖകൾ",

    submitForPhysicianReview:
      "ഡോക്ടറുടെ പരിശോധനയ്ക്കായി സമർപ്പിക്കുക",
  },


  /* ----------------------------------------------------------------------- */
  /* TAMIL                                                                   */
  /* ----------------------------------------------------------------------- */

  ta: {
    back: "பின்செல்",

    reset: "மீட்டமை",

    platform:
      "AI இயங்கும் ஆயுர்வேத மருத்துவ வரலாறு தளம்",

    step8:
      "8 இல் படி 8",

    reviewTitle:
      "உங்கள் உடல்நல வரலாற்றை மதிப்பாய்வு செய்யவும்",

    patientInformation:
      "நோயாளி தகவல்",

    basicDemographicInformation:
      "அடிப்படை தகவல்",

    name: "பெயர்",

    dateOfBirth:
      "பிறந்த தேதி",

    age: "வயது",

    years: "ஆண்டுகள்",

    gender: "பாலினம்",

    mobileNumber:
      "மொபைல் எண்",

    occupation: "தொழில்",

    location: "இடம்",

    state: "மாநிலம்",

    chiefComplaint:
      "முக்கிய புகார்",

    mainProblem:
      "முக்கிய பிரச்சனை",

    notProvided:
      "வழங்கப்படவில்லை",

    detailedClinicalHistory:
      "விரிவான மருத்துவ வரலாறு",

    ayurvedaClinicalHistory:
      "ஆயுர்வேத மருத்துவ வரலாறு",

    physicianVerificationRequired:
      "மருத்துவர் சரிபார்ப்பு தேவை",

    previousMedicalHistory:
      "முந்தைய மருத்துவ வரலாறு",

    medicalDocuments:
      "மருத்துவ ஆவணங்கள்",

    submitForPhysicianReview:
      "மருத்துவர் மதிப்பாய்விற்கு சமர்ப்பிக்கவும்",
  },


  /* ----------------------------------------------------------------------- */
  /* TELUGU                                                                  */
  /* ----------------------------------------------------------------------- */

  te: {
    back: "వెనుకకు",

    reset: "రీసెట్",

    platform:
      "AI ఆధారిత ఆయుర్వేద క్లినికల్ హిస్టరీ ప్లాట్‌ఫారమ్",

    step8:
      "8లో దశ 8",

    reviewTitle:
      "మీ ఆరోగ్య చరిత్రను సమీక్షించండి",

    patientInformation:
      "రోగి సమాచారం",

    basicDemographicInformation:
      "ప్రాథమిక సమాచారం",

    name: "పేరు",

    dateOfBirth:
      "పుట్టిన తేదీ",

    age: "వయస్సు",

    years: "సంవత్సరాలు",

    gender: "లింగం",

    mobileNumber:
      "మొబైల్ నంబర్",

    occupation: "వృత్తి",

    location: "స్థానం",

    state: "రాష్ట్రం",

    chiefComplaint:
      "ప్రధాన ఫిర్యాదు",

    mainProblem:
      "ప్రధాన సమస్య",

    notProvided:
      "అందించలేదు",

    detailedClinicalHistory:
      "వివరణాత్మక క్లినికల్ చరిత్ర",

    ayurvedaClinicalHistory:
      "ఆయుర్వేద క్లినికల్ చరిత్ర",

    physicianVerificationRequired:
      "వైద్యుల ధృవీకరణ అవసరం",

    previousMedicalHistory:
      "గత వైద్య చరిత్ర",

    medicalDocuments:
      "వైద్య పత్రాలు",

    submitForPhysicianReview:
      "వైద్యుల సమీక్ష కోసం సమర్పించండి",
  },


  /* ----------------------------------------------------------------------- */
  /* PUNJABI                                                                 */
  /* ----------------------------------------------------------------------- */

  pa: {
    back: "ਵਾਪਸ",

    reset: "ਰੀਸੈਟ",

    platform:
      "AI-ਅਧਾਰਿਤ ਆਯੁਰਵੇਦ ਕਲੀਨਿਕਲ ਹਿਸਟਰੀ ਪਲੇਟਫਾਰਮ",

    step8:
      "8 ਵਿੱਚੋਂ ਪੜਾਅ 8",

    reviewTitle:
      "ਆਪਣੇ ਸਿਹਤ ਇਤਿਹਾਸ ਦੀ ਸਮੀਖਿਆ ਕਰੋ",

    patientInformation:
      "ਮਰੀਜ਼ ਦੀ ਜਾਣਕਾਰੀ",

    basicDemographicInformation:
      "ਮੁੱਢਲੀ ਜਾਣਕਾਰੀ",

    name: "ਨਾਮ",

    dateOfBirth:
      "ਜਨਮ ਮਿਤੀ",

    age: "ਉਮਰ",

    years: "ਸਾਲ",

    gender: "ਲਿੰਗ",

    mobileNumber:
      "ਮੋਬਾਈਲ ਨੰਬਰ",

    occupation: "ਪੇਸ਼ਾ",

    location: "ਸਥਾਨ",

    state: "ਰਾਜ",

    chiefComplaint:
      "ਮੁੱਖ ਸ਼ਿਕਾਇਤ",

    mainProblem:
      "ਮੁੱਖ ਸਮੱਸਿਆ",

    notProvided:
      "ਉਪਲਬਧ ਨਹੀਂ",

    detailedClinicalHistory:
      "ਵਿਸਤ੍ਰਿਤ ਕਲੀਨਿਕਲ ਇਤਿਹਾਸ",

    ayurvedaClinicalHistory:
      "ਆਯੁਰਵੇਦ ਕਲੀਨਿਕਲ ਇਤਿਹਾਸ",

    physicianVerificationRequired:
      "ਡਾਕਟਰ ਦੀ ਪੁਸ਼ਟੀ ਲੋੜੀਂਦੀ ਹੈ",

    previousMedicalHistory:
      "ਪਿਛਲਾ ਮੈਡੀਕਲ ਇਤਿਹਾਸ",

    medicalDocuments:
      "ਮੈਡੀਕਲ ਦਸਤਾਵੇਜ਼",

    submitForPhysicianReview:
      "ਡਾਕਟਰ ਦੀ ਸਮੀਖਿਆ ਲਈ ਭੇਜੋ",
  },


  /* ----------------------------------------------------------------------- */
  /* ODIA                                                                    */
  /* ----------------------------------------------------------------------- */

  or: {
    back: "ପଛକୁ",

    reset: "ରିସେଟ୍",

    platform:
      "AI ଆଧାରିତ ଆୟୁର୍ବେଦ କ୍ଲିନିକାଲ୍ ହିଷ୍ଟ୍ରି ପ୍ଲାଟଫର୍ମ",

    step8:
      "8 ମଧ୍ୟରୁ ପଦକ୍ଷେପ 8",

    reviewTitle:
      "ଆପଣଙ୍କ ସ୍ୱାସ୍ଥ୍ୟ ଇତିହାସ ସମୀକ୍ଷା କରନ୍ତୁ",

    patientInformation:
      "ରୋଗୀ ସୂଚନା",

    basicDemographicInformation:
      "ମୌଳିକ ସୂଚନା",

    name: "ନାମ",

    dateOfBirth:
      "ଜନ୍ମ ତାରିଖ",

    age: "ବୟସ",

    years: "ବର୍ଷ",

    gender: "ଲିଙ୍ଗ",

    mobileNumber:
      "ମୋବାଇଲ୍ ନମ୍ବର",

    occupation: "ବୃତ୍ତି",

    location: "ସ୍ଥାନ",

    state: "ରାଜ୍ୟ",

    chiefComplaint:
      "ମୁଖ୍ୟ ଅଭିଯୋଗ",

    mainProblem:
      "ମୁଖ୍ୟ ସମସ୍ୟା",

    notProvided:
      "ଦିଆଯାଇନାହିଁ",

    detailedClinicalHistory:
      "ବିସ୍ତୃତ କ୍ଲିନିକାଲ୍ ଇତିହାସ",

    ayurvedaClinicalHistory:
      "ଆୟୁର୍ବେଦ କ୍ଲିନିକାଲ୍ ଇତିହାସ",

    physicianVerificationRequired:
      "ଡାକ୍ତରଙ୍କ ଯାଞ୍ଚ ଆବଶ୍ୟକ",

    previousMedicalHistory:
      "ପୂର୍ବ ଚିକିତ୍ସା ଇତିହାସ",

    medicalDocuments:
      "ଚିକିତ୍ସା ଦଲିଲ",

    submitForPhysicianReview:
      "ଡାକ୍ତରଙ୍କ ସମୀକ୍ଷା ପାଇଁ ପଠାନ୍ତୁ",
  },


  /* ----------------------------------------------------------------------- */
  /* ASSAMESE                                                                */
  /* ----------------------------------------------------------------------- */

  as: {
    back: "উভতি",

    reset: "ৰিছেট",

    platform:
      "AI-চালিত আয়ুৰ্বেদ ক্লিনিকেল ইতিহাস প্লেটফৰ্ম",

    step8:
      "৮ৰ ভিতৰত ধাপ ৮",

    reviewTitle:
      "আপোনাৰ স্বাস্থ্য ইতিহাস পৰ্যালোচনা কৰক",

    patientInformation:
      "ৰোগীৰ তথ্য",

    basicDemographicInformation:
      "মৌলিক তথ্য",

    name: "নাম",

    dateOfBirth:
      "জন্ম তাৰিখ",

    age: "বয়স",

    years: "বছৰ",

    gender: "লিংগ",

    mobileNumber:
      "ম'বাইল নম্বৰ",

    occupation: "বৃত্তি",

    location: "স্থান",

    state: "ৰাজ্য",

    chiefComplaint:
      "মুখ্য অভিযোগ",

    mainProblem:
      "মুখ্য সমস্যা",

    notProvided:
      "দিয়া হোৱা নাই",

    detailedClinicalHistory:
      "বিস্তৃত ক্লিনিকেল ইতিহাস",

    ayurvedaClinicalHistory:
      "আয়ুৰ্বেদ ক্লিনিকেল ইতিহাস",

    physicianVerificationRequired:
      "চিকিৎসকৰ পৰীক্ষা প্ৰয়োজন",

    previousMedicalHistory:
      "পূৰ্বৰ চিকিৎসা ইতিহাস",

    medicalDocuments:
      "চিকিৎসা নথি",

    submitForPhysicianReview:
      "চিকিৎসকৰ পৰ্যালোচনাৰ বাবে পঠিয়াওক",
  },


  /* ----------------------------------------------------------------------- */
  /* NEPALI                                                                  */
  /* ----------------------------------------------------------------------- */

  ne: {
    back: "पछाडि",

    reset: "रिसेट",

    platform:
      "AI-संचालित आयुर्वेद क्लिनिकल इतिहास प्लेटफर्म",

    step8:
      "८ मध्ये चरण ८",

    reviewTitle:
      "आफ्नो स्वास्थ्य इतिहास समीक्षा गर्नुहोस्",

    patientInformation:
      "बिरामीको जानकारी",

    basicDemographicInformation:
      "आधारभूत जानकारी",

    name: "नाम",

    dateOfBirth:
      "जन्म मिति",

    age: "उमेर",

    years: "वर्ष",

    gender: "लिङ्ग",

    mobileNumber:
      "मोबाइल नम्बर",

    occupation: "पेशा",

    location: "स्थान",

    state: "राज्य",

    chiefComplaint:
      "मुख्य गुनासो",

    mainProblem:
      "मुख्य समस्या",

    notProvided:
      "उपलब्ध छैन",

    detailedClinicalHistory:
      "विस्तृत क्लिनिकल इतिहास",

    ayurvedaClinicalHistory:
      "आयुर्वेद क्लिनिकल इतिहास",

    physicianVerificationRequired:
      "चिकित्सकको प्रमाणीकरण आवश्यक",

    previousMedicalHistory:
      "अघिल्लो चिकित्सा इतिहास",

    medicalDocuments:
      "चिकित्सा कागजातहरू",

    submitForPhysicianReview:
      "चिकित्सकको समीक्षाका लागि पठाउनुहोस्",
  },


  /* ----------------------------------------------------------------------- */
  /* URDU                                                                    */
  /* ----------------------------------------------------------------------- */

  ur: {
    back: "واپس",

    reset: "ری سیٹ",

    platform:
      "AI پر مبنی آیوروید کلینیکل ہسٹری پلیٹ فارم",

    step8:
      "8 میں سے مرحلہ 8",

    reviewTitle:
      "اپنی صحت کی تاریخ کا جائزہ لیں",

    patientInformation:
      "مریض کی معلومات",

    basicDemographicInformation:
      "بنیادی معلومات",

    name: "نام",

    dateOfBirth:
      "تاریخ پیدائش",

    age: "عمر",

    years: "سال",

    gender: "صنف",

    mobileNumber:
      "موبائل نمبر",

    occupation: "پیشہ",

    location: "مقام",

    state: "ریاست",

    chiefComplaint:
      "اہم شکایت",

    mainProblem:
      "اہم مسئلہ",

    notProvided:
      "فراہم نہیں کیا گیا",

    detailedClinicalHistory:
      "تفصیلی طبی تاریخ",

    ayurvedaClinicalHistory:
      "آیوروید طبی تاریخ",

    physicianVerificationRequired:
      "معالج کی تصدیق ضروری ہے",

    previousMedicalHistory:
      "پچھلی طبی تاریخ",

    medicalDocuments:
      "طبی دستاویزات",

    submitForPhysicianReview:
      "معالج کے جائزے کے لیے جمع کریں",
  },


  /* ----------------------------------------------------------------------- */
  /* SINDHI                                                                  */
  /* ----------------------------------------------------------------------- */

  sd: {
    back: "واپس",

    reset: "ري سيٽ",

    platform:
      "AI تي ٻڌل ايوورويد ڪلينڪل هسٽري پليٽ فارم",

    step8:
      "8 مان قدم 8",

    reviewTitle:
      "پنهنجي صحت جي تاريخ جو جائزو وٺو",

    patientInformation:
      "مريض جي معلومات",

    basicDemographicInformation:
      "بنيادي معلومات",

    name: "نالو",

    dateOfBirth:
      "ڄمڻ جي تاريخ",

    age: "عمر",

    years: "سال",

    gender: "جنس",

    mobileNumber:
      "موبائل نمبر",

    occupation: "پيشو",

    location: "جڳهه",

    state: "رياست",

    chiefComplaint:
      "مکيه شڪايت",

    mainProblem:
      "مکيه مسئلو",

    notProvided:
      "فراهم نه ڪيو ويو",

    detailedClinicalHistory:
      "تفصيلي ڪلينڪل تاريخ",

    ayurvedaClinicalHistory:
      "ايوورويد ڪلينڪل تاريخ",

    physicianVerificationRequired:
      "ڊاڪٽر جي تصديق ضروري آهي",

    previousMedicalHistory:
      "اڳئين طبي تاريخ",

    medicalDocuments:
      "طبي دستاويز",

    submitForPhysicianReview:
      "ڊاڪٽر جي جائزي لاءِ موڪليو",
  },
};


/* ========================================================================= */
/* TRANSLATION FUNCTION                                                      */
/* ========================================================================= */

function getText(
  language: PatientLanguage,
  key: ReviewTextKey
): string {

  if (language === "hi") {
    return (
      hindi[key] ??
      english[key]
    );
  }

  if (language === "mr") {
    return (
      marathi[key] ??
      english[key]
    );
  }

  const additional =
    additionalTranslations[language];

  if (additional?.[key]) {
    return additional[key] as string;
  }

  return english[key];
}