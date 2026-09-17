import {

  ArrowLeft,

  Camera,

  CheckCircle2,

  RotateCcw,

  ScanLine,

  X,

} from "lucide-react";

import {
  useEffect,
  useRef,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";
import KioskLayout from "../../components/common/KioskLayout";

export default function Documents() {
  const navigate = useNavigate();

  /* ====================================================================== */
  /* CAMERA                                                                 */
  /* ====================================================================== */

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const [cameraOpen, setCameraOpen] =
    useState(false);

  const [capturedImage, setCapturedImage] =
    useState<string | null>(null);

  const [cameraError, setCameraError] =
    useState("");

  /* ====================================================================== */
  /* SCANNED DOCUMENTS                                                      */
  /* ====================================================================== */

  const [scannedDocuments, setScannedDocuments] =
    useState<
      {
        id: string;
        name: string;
        image: string;
      }[]
    >([]);

  /* ====================================================================== */
  /* STOP CAMERA                                                            */
  /* ====================================================================== */

  function stopCamera() {
    if (streamRef.current) {
      streamRef.current
        .getTracks()
        .forEach((track) => track.stop());

      streamRef.current = null;
    }

    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }

    setCameraOpen(false);
  }

  /* ====================================================================== */
  /* CLEAN CAMERA WHEN PAGE IS LEFT                                         */
  /* ====================================================================== */

  useEffect(() => {
    return () => {
      if (streamRef.current) {
        streamRef.current
          .getTracks()
          .forEach((track) => track.stop());
      }
    };
  }, []);

  /* ====================================================================== */
  /* OPEN CAMERA                                                            */
  /* ====================================================================== */

  async function openCamera() {
    setCameraError("");
    setCapturedImage(null);
    setCameraOpen(true);

    try {
      if (
        !navigator.mediaDevices ||
        !navigator.mediaDevices.getUserMedia
      ) {
        setCameraError(
          "Camera access is not supported on this device."
        );
        return;
      }

      const stream =
        await navigator.mediaDevices.getUserMedia({
          video: {
            facingMode: {
              ideal: "environment",
            },
            width: {
              ideal: 1920,
            },
            height: {
              ideal: 1080,
            },
          },
          audio: false,
        });

      streamRef.current = stream;

      /*
       * Give React a moment to render the video element.
       */

      requestAnimationFrame(() => {
        if (videoRef.current) {
          videoRef.current.srcObject =
            stream;

          videoRef.current
            .play()
            .catch(() => {
              // Browser may require the video to start after permission.
            });
        }
      });
    } catch (error) {
      console.error(
        "Camera error:",
        error
      );

      setCameraError(
        "Camera permission was not granted. Please allow camera access and try again."
      );
    }
  }

  /* ====================================================================== */
  /* CAPTURE DOCUMENT                                                       */
  /* ====================================================================== */

  function capturePhoto() {
    const video =
      videoRef.current;

    const canvas =
      canvasRef.current;

    if (!video || !canvas) {
      return;
    }

    if (
      video.videoWidth === 0 ||
      video.videoHeight === 0
    ) {
      setCameraError(
        "The camera is not ready yet. Please wait a moment and try again."
      );

      return;
    }

    canvas.width =
      video.videoWidth;

    canvas.height =
      video.videoHeight;

    const context =
      canvas.getContext("2d");

    if (!context) {
      return;
    }

    context.drawImage(
      video,
      0,
      0,
      canvas.width,
      canvas.height
    );

    const image =
      canvas.toDataURL(
        "image/jpeg",
        0.88
      );

    setCapturedImage(image);

    /*
     * Stop the camera after taking
     * the photograph.
     */

    if (streamRef.current) {
      streamRef.current
        .getTracks()
        .forEach((track) =>
          track.stop()
        );

      streamRef.current = null;
    }
  }

  /* ====================================================================== */
  /* RETAKE                                                                 */
  /* ====================================================================== */

  function retakePhoto() {
    setCapturedImage(null);
    setCameraError("");

    openCamera();
  }

  /* ====================================================================== */
  /* USE CAPTURED PHOTO                                                     */
  /* ====================================================================== */

  function useCapturedPhoto() {
    if (!capturedImage) {
      return;
    }

    const documentNumber =
      scannedDocuments.length + 1;

    const newDocument = {
      id: `${Date.now()}-${documentNumber}`,
      name: `Scanned Document ${documentNumber}`,
      image: capturedImage,
    };

    setScannedDocuments(
      (current) => [
        ...current,
        newDocument,
      ]
    );

    setCapturedImage(null);
    setCameraOpen(false);
  }

  /* ====================================================================== */
  /* CLOSE CAMERA                                                           */
  /* ====================================================================== */

  function closeCamera() {
    stopCamera();
    setCapturedImage(null);
    setCameraError("");
  }

  /* ====================================================================== */
  /* RENDER                                                                 */
  /* ====================================================================== */

  return (
    <KioskLayout>

      <div className="min-h-screen">

        {/* ================================================================ */}
        {/* HEADER                                                           */}
        {/* ================================================================ */}

        <header className="flex h-[72px] items-center justify-between border-b border-[#E5DED1] bg-[#FBF8F2]/95 px-7 backdrop-blur-sm">

          <button
            type="button"
            onClick={() =>
              navigate(
                "/patient/history"
              )
            }
            className="inline-flex items-center gap-2 rounded-lg border border-[#E2DACE] bg-white px-4 py-2 text-sm font-medium text-[#315C4D] shadow-sm transition hover:bg-[#F7F3E9]"
          >
            <ArrowLeft size={17} />

            Back
          </button>

          <div className="text-center">

            <div className="font-serif text-xl font-semibold text-[#174638]">
              MediKiosk
            </div>

            <div className="text-[9px] uppercase tracking-[0.18em] text-[#718078]">
              Ayurveda Clinical History
            </div>

          </div>

          <button
            type="button"
            onClick={() =>
              navigate("/patient")
            }
            className="rounded-lg border border-[#E2DACE] bg-white px-4 py-2 text-sm text-[#C96D4D] transition hover:bg-[#FBEEE9]"
          >
            Reset
          </button>

        </header>

        {/* ================================================================ */}
        {/* MAIN                                                             */}
        {/* ================================================================ */}

        <main className="flex min-h-[calc(100vh-72px)] items-center justify-center px-6 py-12">

          <div className="w-full max-w-4xl">

            {/* ============================================================ */}
            {/* TITLE                                                         */}
            {/* ============================================================ */}

            <div className="text-center">

              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#3A9271]">
                Step 7
              </p>

              <h1 className="mt-3 font-serif text-5xl font-semibold text-[#174638]">
                Scan Your Medical Documents
              </h1>

              <p className="mx-auto mt-4 max-w-xl text-base leading-7 text-[#6B7A73]">
                Scan previous prescriptions,
                laboratory reports, discharge
                summaries, or other medical
                documents using the kiosk camera.
              </p>

            </div>

            {/* ============================================================ */}
            {/* SCAN BUTTON                                                   */}
            {/* ============================================================ */}

            {!cameraOpen &&
              !capturedImage && (
                <button
                  type="button"
                  onClick={openCamera}
                  className="group mt-12 flex w-full cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-[#BFD5C8] bg-[#F1F5EF]/95 px-8 py-16 text-center shadow-sm transition hover:border-[#8DB8A4] hover:bg-[#EAF1EB]"
                >

                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white text-[#2D8B68] shadow-sm transition group-hover:scale-105">

                    <Camera
                      size={29}
                      strokeWidth={1.8}
                    />

                  </div>

                  <h2 className="mt-5 font-serif text-2xl font-semibold text-[#234C3E]">
                    Tap to Scan Document
                  </h2>

                  <p className="mt-2 text-sm text-[#718078]">
                    Camera will open to capture
                    your document
                  </p>

                  <div className="mt-5 flex items-center gap-2 text-xs font-medium text-[#3A9271]">
                    <ScanLine
                      size={15}
                    />
                    Prescription • Lab Report •
                    Discharge Summary
                  </div>

                </button>
              )}

            {/* ============================================================ */}
            {/* CAMERA                                                        */}
            {/* ============================================================ */}

            {cameraOpen &&
              !capturedImage && (
                <section className="mt-10 overflow-hidden rounded-2xl border border-[#D9D1C1] bg-[#173F35] shadow-lg">

                  {/* Camera header */}

                  <div className="flex items-center justify-between px-5 py-4">

                    <div className="flex items-center gap-3 text-white">

                      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/10">
                        <Camera
                          size={19}
                        />
                      </div>

                      <div>

                        <p className="font-serif text-lg font-semibold">
                          Scan Document
                        </p>

                        <p className="text-xs text-white/65">
                          Position the document
                          inside the frame
                        </p>

                      </div>

                    </div>

                    <button
                      type="button"
                      onClick={
                        closeCamera
                      }
                      className="flex h-9 w-9 items-center justify-center rounded-lg text-white/80 transition hover:bg-white/10 hover:text-white"
                      aria-label="Close camera"
                    >
                      <X size={20} />
                    </button>

                  </div>

                  {/* Camera viewport */}

                  <div className="relative bg-black">

                    <video
                      ref={videoRef}
                      autoPlay
                      playsInline
                      muted
                      className="block aspect-video w-full object-cover"
                    />

                    {/* Document guide */}

                    <div className="pointer-events-none absolute inset-0 flex items-center justify-center">

                      <div className="relative h-[72%] w-[78%] rounded-xl border-2 border-white/80">

                        <span className="absolute -left-[2px] -top-[2px] h-8 w-8 border-l-4 border-t-4 border-[#7BC49F]" />

                        <span className="absolute -right-[2px] -top-[2px] h-8 w-8 border-r-4 border-t-4 border-[#7BC49F]" />

                        <span className="absolute -bottom-[2px] -left-[2px] h-8 w-8 border-b-4 border-l-4 border-[#7BC49F]" />

                        <span className="absolute -bottom-[2px] -right-[2px] h-8 w-8 border-b-4 border-r-4 border-[#7BC49F]" />

                      </div>

                    </div>

                  </div>

                  {/* Camera error */}

                  {cameraError && (
                    <div className="mx-5 mt-4 rounded-xl bg-[#8B4938]/20 px-4 py-3 text-center text-sm text-[#F5D4C8]">
                      {cameraError}
                    </div>
                  )}

                  {/* Camera controls */}

                  <div className="flex items-center justify-center gap-5 px-5 py-6">

                    <button
                      type="button"
                      onClick={
                        closeCamera
                      }
                      className="rounded-xl border border-white/20 px-6 py-3 font-medium text-white transition hover:bg-white/10"
                    >
                      Cancel
                    </button>

                    <button
                      type="button"
                      onClick={
                        capturePhoto
                      }
                      className="flex h-16 w-16 items-center justify-center rounded-full border-4 border-white bg-[#2D8B68] text-white shadow-lg transition hover:scale-105 hover:bg-[#256F55]"
                      aria-label="Capture document"
                    >
                      <Camera
                        size={27}
                      />
                    </button>

                  </div>

                </section>
              )}

            {/* ============================================================ */}
            {/* PHOTO PREVIEW                                                 */}
            {/* ============================================================ */}

            {capturedImage && (
              <section className="mt-10 rounded-2xl border border-[#D9D1C1] bg-white p-6 shadow-sm">

                <div className="flex items-center justify-between gap-4">

                  <div>

                    <h2 className="font-serif text-2xl font-semibold text-[#234C3E]">
                      Document Preview
                    </h2>

                    <p className="mt-1 text-sm text-[#718078]">
                      Check that the document is
                      clear and readable.
                    </p>

                  </div>

                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#E5F0E8] text-[#2D8B68]">
                    <CheckCircle2
                      size={22}
                    />
                  </div>

                </div>

                <div className="mt-6 overflow-hidden rounded-xl border border-[#E2DACE] bg-[#F7F3E9]">

                  <img
                    src={capturedImage}
                    alt="Captured medical document"
                    className="max-h-[520px] w-full object-contain"
                  />

                </div>

                <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-end">

                  <button
                    type="button"
                    onClick={
                      retakePhoto
                    }
                    className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#DED5C6] bg-white px-6 py-3 font-medium text-[#315C4D] transition hover:bg-[#FBF8F2]"
                  >
                    <RotateCcw
                      size={17}
                    />

                    Retake
                  </button>

                  <button
                    type="button"
                    onClick={
                      useCapturedPhoto
                    }
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#174D3B] px-7 py-3 font-semibold text-white shadow-sm transition hover:bg-[#123E30]"
                  >
                    <CheckCircle2
                      size={18}
                    />

                    Use This Photo
                  </button>

                </div>

              </section>
            )}

            {/* ============================================================ */}
            {/* RECENT SCANS                                                  */}
            {/* ============================================================ */}

            {scannedDocuments.length >
              0 && (
                <section className="mt-7 rounded-2xl border border-[#E2DACE] bg-white p-6 shadow-sm">

                  <div className="flex items-center justify-between">

                    <div>

                      <h3 className="font-serif text-xl font-semibold text-[#234C3E]">
                        Scanned Documents
                      </h3>

                      <p className="mt-1 text-sm text-[#718078]">
                        Documents captured during
                        this session
                      </p>

                    </div>

                    <span className="rounded-full bg-[#E5F0E8] px-4 py-2 text-xs font-semibold text-[#2D6F55]">
                      {
                        scannedDocuments.length
                      }{" "}
                      {scannedDocuments.length ===
                      1
                        ? "Document"
                        : "Documents"}
                    </span>

                  </div>

                  <div className="mt-5 grid gap-3">

                    {scannedDocuments.map(
                      (document) => (
                        <div
                          key={
                            document.id
                          }
                          className="flex items-center justify-between gap-4 rounded-xl border border-[#E8E1D6] bg-[#FBF8F2] p-4"
                        >

                          <div className="flex min-w-0 items-center gap-3">

                            <div className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-white">

                              <img
                                src={
                                  document.image
                                }
                                alt=""
                                className="h-full w-full object-cover"
                              />

                            </div>

                            <div className="min-w-0">

                              <p className="truncate text-sm font-semibold text-[#315C4D]">
                                {
                                  document.name
                                }
                              </p>

                              <p className="mt-1 text-xs text-[#718078]">
                                Camera scan captured
                              </p>

                            </div>

                          </div>

                          <CheckCircle2
                            size={20}
                            className="shrink-0 text-[#2D8B68]"
                          />

                        </div>
                      )
                    )}

                  </div>

                  {/* Scan another */}

                  <button
                    type="button"
                    onClick={
                      openCamera
                    }
                    className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[#2D8B68] transition hover:text-[#174D3B]"
                  >
                    <Camera
                      size={17}
                    />

                    Scan Another Document
                  </button>

                </section>
              )}

            {/* ============================================================ */}
            {/* CONTINUE                                                      */}
            {/* ============================================================ */}

            <div className="mt-8 flex justify-end">

              <button
                type="button"
                onClick={() =>
                  navigate(
                    "/patient/review"
                  )
                }
                className="rounded-xl bg-[#174D3B] px-8 py-4 font-semibold text-white shadow-sm transition hover:bg-[#123E30]"
              >
                Continue to Review →
              </button>

            </div>

            {/* ============================================================ */}
            {/* PRIVACY                                                       */}
            {/* ============================================================ */}

            <p className="mt-5 text-center text-xs text-[#718078]">
              Your scanned documents are
              captured for clinical history
              preparation and physician review.
            </p>

          </div>

        </main>

        {/* Hidden canvas used for image capture */}

        <canvas
          ref={canvasRef}
          className="hidden"
        />

      </div>

    </KioskLayout>
  );
}