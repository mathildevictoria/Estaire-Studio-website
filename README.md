# Estaire Studio

Hjemmeside for Estaire Studio.

## Opbygning

| Sti | Indhold |
|---|---|
| `index.html` | Forsiden paa dansk (standard): hero, Ydelser, Udvalgt arbejde, Sådan foregår det, kontakt. |
| `social-media-management/index.html` | Underside paa dansk: estairestudio.com/social-media-management/ |
| `content-creation/index.html` | Underside paa dansk: estairestudio.com/content-creation/ |
| `en/` | Den engelske version af de tre sider (estairestudio.com/en/ ...). DA / EN-knappen i headeren skifter mellem sprogene. De danske sider genereres ud fra de engelske. |
| `vercel.json` | Sender de gamle /da/-adresser videre til de danske sider i roden. |
| `assets/site.css`, `assets/site.js` | Faelles design og funktioner (menu, dropdown, cookie-banner) for de tre sider ovenfor. |
| `assets/img/` | Billeder til de offentlige sider. |
| `ai/index.html` | Den tidligere hjemmeside (AI content, video, priser m.m.). Ligger paa estairestudio.com/ai bag password. |
| `ai/assets/` | Billeder og videoer til /ai. Beskyttet af samme password. |
| `assets/` | Logo og skrifttyper, som alle sider bruger (ogsaa /ai). |
| `middleware.js` | Password-beskyttelsen af /ai. Koerer paa Vercels server. |
| `robots.txt` | Beder soegemaskiner holde sig fra /ai. |

Den tidligere version af forsiden er gemt i git som tagget `site-v1`.

## Password paa /ai

Koden staar ikke i koden (repoet er offentligt). Den saettes i Vercel:
Project Settings -> Environment Variables -> `AI_PASSWORD`.
Mangler variablen, er /ai lukket for alle. Skiftes koden, skal man logge ind
igen. Et login huskes i 30 dage.

## Lokal visning

    python3 -m http.server 4321

Aabn http://localhost:4321 (forsiden), undersiderne og http://localhost:4321/ai/ (den
tidligere side). Lokalt er der ikke password paa /ai - det findes kun paa Vercel.

## Deployment

Deployes automatisk via Vercel ved push til `main`.
Domaener: estairestudio.com og www.estairestudio.com

## Filer der ikke kommer med i git

Originale, ukomprimerede billeder og videoer (`*-original.*`) og de gamle
`index-*-backup.html`-filer er git-ignoreret.
