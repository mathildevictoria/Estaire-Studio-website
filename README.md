# Estaire Studio

Hjemmeside for Estaire Studio - international AI content studio:
kampagnevisuals, social content og content-systemer skabt med AI.

## Opbygning

`index.html` er almindelig, handskrevet HTML - ikke laengere en pakket
artifact-fil. Teksten staar direkte i markup'en og kan rettes med det samme.

Skrifttypen (Instrument Sans, 400-700) og billeder ligger som
selvstaendige filer under `assets/`, saa siden henter intet udefra.

Layoutet er responsivt (mobil, tablet, desktop). Sektioner: hero,
"In motion" (9:16-karrusel, 15 pladser, uendelig loop), AI content (tekst + billedkollage), services + priser,
kontakt og footer.

## Billeder

`assets/img/` indeholder hero-portraettet og fem stills.
Videoer ligger i `assets/video/` (foerste kort: `seda-barrier-cream.mp4`).
De oevrige videokort i "In motion" er pladsholdere (`<div class="reel-frame slot">`) -
erstat dem med `<video>` naar klippene er klar (se kommentaren i markup'en).

## Lokal visning

    python3 -m http.server 4321

Aabn derefter http://localhost:4321

## Deployment

Deployes automatisk via Vercel ved push til `main`.
Domaener: estairestudio.com og www.estairestudio.com

## Backups

Tidligere versioner ligger som `index-*-backup.html`. De er git-ignoreret.
`index-v3-backup.html` er den forrige side med priser, FAQ, process og Calendly.
