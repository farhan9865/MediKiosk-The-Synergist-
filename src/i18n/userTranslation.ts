import type { PatientLanguage } from "../store/patientStore";
import type { TranslationKey } from "./translations";
import { t } from "./translations";

/* =========================================================
   USER TRANSLATION HELPER
   ---------------------------------------------------------
   Central helper for translating the MediKiosk interface.

   Usage:
     translate(language, "continue")

   Example:
     translate("hi", "continue")
     → "जारी रखें"

   You can also use:
     const translateForUser = createTranslator("mr");
     translateForUser("continue")
========================================================= */

/**
 * Translate a UI key for the selected patient language.
 */
export function translate(
  language: PatientLanguage,
  key: TranslationKey
): string {
  return t(language, key);
}

/**
 * Create a translator bound to one language.
 *
 * Example:
 *
 * const tr = createTranslator("hi");
 * tr("continue");
 * tr("back");
 */
export function createTranslator(
  language: PatientLanguage
): (key: TranslationKey) => string {
  return (key: TranslationKey): string => {
    return t(language, key);
  };
}

/**
 * React-friendly translation helper.
 *
 * Example:
 *
 * const tr = useTranslation(language);
 *
 * <button>{tr("continue")}</button>
 */
export function useTranslation(
  language: PatientLanguage
): (key: TranslationKey) => string {
  return createTranslator(language);
}

/**
 * Check whether a translation exists for a language/key.
 *
 * This is useful while completing the 23-language translation
 * coverage.
 */
export function hasTranslation(
  language: PatientLanguage,
  key: TranslationKey
): boolean {
  return Boolean(t(language, key) && t(language, key) !== key);
}

/**
 * Get the translated value with English automatically used
 * as fallback by the main t() function.
 */
export function getTranslation(
  language: PatientLanguage,
  key: TranslationKey
): string {
  return t(language, key);
}