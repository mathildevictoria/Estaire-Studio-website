// Password-beskyttelse af /ai (den tidligere hjemmeside).
//
// Koerer paa Vercels server foer siden sendes, saa hverken HTML, billeder
// eller videoer under /ai kan hentes uden den rigtige kode.
//
// Koden laeses fra miljoevariablen AI_PASSWORD, som saettes i Vercel under
// Project Settings -> Environment Variables. Den staar bevidst ikke her,
// fordi repoet er offentligt. Mangler variablen, er /ai lukket for alle.
//
// Login huskes i 30 dage via en cookie. Skiftes koden i Vercel, bliver
// alle gamle logins ugyldige.

export const config = { matcher: ['/ai', '/ai/:path*'] };

const COOKIE = 'estaire_ai';
const MAX_AGE = 60 * 60 * 24 * 30;

async function tokenFor(password) {
  const data = new TextEncoder().encode('estaire-ai:' + password);
  const hash = await crypto.subtle.digest('SHA-256', data);
  return [...new Uint8Array(hash)].map((b) => b.toString(16).padStart(2, '0')).join('');
}

function hasCookie(request, value) {
  const header = request.headers.get('cookie') || '';
  return header.split(/;\s*/).some((c) => c === `${COOKIE}=${value}`);
}

const HEADERS = {
  'Content-Type': 'text/html; charset=utf-8',
  'Cache-Control': 'no-store',
  'X-Robots-Tag': 'noindex, nofollow',
};

function loginPage(wrong) {
  const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex, nofollow">
<title>Estaire Studio | Protected</title>
<link rel="icon" href="/assets/estaire-logo.png">
<style>
@font-face{font-family:"Instrument Sans";font-weight:400;font-display:swap;src:url(/assets/fonts/instrument-sans-400-latin.woff2) format("woff2")}
@font-face{font-family:"Instrument Sans";font-weight:600;font-display:swap;src:url(/assets/fonts/instrument-sans-600-latin.woff2) format("woff2")}
*{box-sizing:border-box}
body{margin:0;min-height:100svh;display:flex;align-items:center;justify-content:center;padding:24px;background:#fbf9f7;color:#171314;font-family:"Instrument Sans",ui-sans-serif,system-ui,sans-serif;-webkit-font-smoothing:antialiased}
.card{width:100%;max-width:380px;text-align:center}
.card img{height:52px;width:auto}
h1{margin:28px 0 0;font-size:24px;font-weight:600;letter-spacing:-.02em}
p{margin:10px 0 0;color:#6d6563;font-size:15px;line-height:1.55}
form{margin-top:28px;display:grid;gap:10px}
input{height:52px;border:1px solid #ebe4df;border-radius:999px;background:#fff;padding:0 22px;font:inherit;font-size:16px;text-align:center;letter-spacing:.2em;color:#171314}
input:focus{outline:2px solid #7c1d1a;outline-offset:2px}
button{height:52px;border:0;border-radius:999px;background:#7c1d1a;color:#fff;font:inherit;font-size:16px;font-weight:600;cursor:pointer}
button:hover{background:#5e1513}
.error{color:#a8322d;font-size:14px;margin-top:4px}
</style>
</head>
<body>
<main class="card">
  <img src="/assets/estaire-logo-full.png" alt="Estaire Studio">
  <h1>This page is protected</h1>
  <p>Enter the password to continue.</p>
  <form method="post" action="/ai/login">
    <input type="password" name="password" inputmode="numeric" autocomplete="current-password" aria-label="Password" placeholder="Password" autofocus required>
    <button type="submit">Enter</button>
    ${wrong ? '<p class="error" role="alert">Wrong password. Please try again.</p>' : ''}
  </form>
</main>
</body>
</html>`;
  return new Response(html, { status: 401, headers: HEADERS });
}

export default async function middleware(request) {
  const url = new URL(request.url);
  const password = process.env.AI_PASSWORD;
  if (!password) {
    return new Response('This page is not available.', { status: 503, headers: { 'Cache-Control': 'no-store' } });
  }
  const token = await tokenFor(password);

  if (url.pathname === '/ai/login') {
    if (request.method !== 'POST') return Response.redirect(new URL('/ai/', url), 303);
    const form = await request.formData().catch(() => null);
    const given = String((form && form.get('password')) || '').trim();
    if (given === password) {
      return new Response(null, {
        status: 303,
        headers: {
          Location: '/ai/',
          'Cache-Control': 'no-store',
          'Set-Cookie': `${COOKIE}=${token}; Path=/ai; Max-Age=${MAX_AGE}; HttpOnly; Secure; SameSite=Lax`,
        },
      });
    }
    // Lille forsinkelse goer det langsommere at gaette koden
    await new Promise((r) => setTimeout(r, 800));
    return loginPage(true);
  }

  if (!hasCookie(request, token)) return loginPage(false);

  if (url.pathname === '/ai') return Response.redirect(new URL('/ai/', url), 308);

  // Logget ind: siden sendes som normalt.
}
