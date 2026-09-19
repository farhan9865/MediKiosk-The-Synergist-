# Security & Privacy

MediKiosk is a healthcare-oriented prototype. Do not commit real patient information.

## Never commit

- Patient names or identifiers
- ABHA identifiers
- Aadhaar numbers
- Prescriptions
- Laboratory reports
- Medical documents
- API keys
- Access tokens
- Passwords
- Database credentials
- Private certificates

## Secrets

Use environment variables for secrets and keep `.env` files out of Git.

## Clinical safety

MediKiosk is intended to support information collection and organization. It should not independently diagnose or prescribe.

## Production requirements

Before real patient deployment, conduct appropriate:
- authentication and authorization review
- encryption review
- access-control testing
- audit-log design
- vulnerability testing
- consent/privacy review
- clinical validation
- incident-response planning

## Vulnerability reporting

Do not publish sensitive vulnerability details in public issues. Contact the maintainers privately.
