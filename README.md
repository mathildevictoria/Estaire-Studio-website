# Estaire Studio

Hjemmeside for Estaire Studio - kreativt bureau for social content:
content repurposing, AI-genererede visuals og social media management.

## Opbygning

`index.html` er en selvstaendig, selvpakkende fil. Skrifttyper (Poppins,
Instrument Sans, DM Mono), logo og React ligger indlejret som base64 i
filen, saa siden henter intet udefra bortset fra Calendly-widgeten
nederst paa siden.

Teksten og priserne ligger inde i `<script type="__bundler/template">`
midt i filen - ikke som almindelig HTML.

## Lokal visning

    python3 -m http.server 4321

Aabn derefter http://localhost:4321

## Deployment

Deployes automatisk via Vercel ved push til `main`.
Domaener: estairestudio.com og www.estairestudio.com
