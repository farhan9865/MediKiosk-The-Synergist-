# MediKiosk Architecture

## Purpose

MediKiosk separates patient interaction, clinical question selection, speech/language processing, document intelligence, structured data and physician review.

## High-Level Flow

```text
Patient
  ↓
MediKiosk UI
  ↓
Language + Consent
  ↓
Identification + Demographics
  ↓
Interaction Mode
  ↓
Adaptive Ayurveda History
  ↓
Structured Clinical Data
  ↓
Physician Summary
  ↓
Physician Review
  ↓
Future HIS / FHIR / ABDM Integration
```

## Adaptive Questioning

The question engine should use a clinician-reviewed ontology and dependency graph:

```text
Chief Complaint
    ↓
Complaint Classification
    ↓
Relevant Questions
    ↓
Previous Answers
    ↓
Dependency Evaluation
    ↓
Next Relevant Question
```

The objective is to avoid presenting unrelated questions.

## AI Boundary

AI/NLP may support:
- speech recognition
- language understanding
- structured extraction
- translation
- summarization
- explanation

Clinical diagnosis and treatment decisions remain with qualified clinicians.

## Language Independence

Question IDs and answer values should remain stable across languages.

Example:

```json
{
  "questionId": "HEADACHE_LOCATION",
  "answerValue": "one-side",
  "displayLanguage": "hi"
}
```

## Physician Review

The physician should be able to review, edit, confirm or reject collected information before clinical use.

## Production Boundary

The current repository is a prototype. Production use requires secure backend services, authentication/authorization, protected health-data handling, validated OCR, clinical ontology review, auditability, appropriate consent management and clinical/legal review.
