(function(){
  // Services-dropdown i headeren (klik/tast; hover styres i CSS paa desktop)
  document.querySelectorAll('.dropdown').forEach(function(dd){
    var btn=dd.querySelector('.dropdown-btn');
    btn.addEventListener('click',function(e){e.stopPropagation();var o=dd.classList.toggle('open');btn.setAttribute('aria-expanded',o)});
    document.addEventListener('click',function(e){if(!dd.contains(e.target)){dd.classList.remove('open');btn.setAttribute('aria-expanded','false')}});
    document.addEventListener('keydown',function(e){if(e.key==='Escape'){dd.classList.remove('open');btn.setAttribute('aria-expanded','false')}});
  });
  // Menu (mobil)
  var header=document.querySelector('.header'),menuBtn=document.querySelector('.menu-btn');
  menuBtn.addEventListener('click',function(){
    var open=header.classList.toggle('menu-open');
    menuBtn.setAttribute('aria-expanded',open);menuBtn.setAttribute('aria-label',open?'Close menu':'Open menu');
  });
  document.querySelectorAll('.nav-links a').forEach(function(a){a.addEventListener('click',function(){header.classList.remove('menu-open');menuBtn.setAttribute('aria-expanded','false')})});
  window.addEventListener('scroll',function(){header.classList.toggle('scrolled',scrollY>8)},{passive:true});

  // Cookie-samtykke ('all' eller 'necessary'). Analyse-scripts skal lytte paa 'estaire:consent'.
  var KEY='estaire-cookie-consent',banner=document.getElementById('cookie');
  function applyConsent(v){window.estaireConsent=v;window.dispatchEvent(new CustomEvent('estaire:consent',{detail:v}))}
  function showBanner(){banner.hidden=false;requestAnimationFrame(function(){banner.classList.add('show')})}
  function hideBanner(){banner.classList.remove('show');setTimeout(function(){banner.hidden=true},400)}
  banner.querySelectorAll('[data-consent]').forEach(function(b){b.addEventListener('click',function(){
    var v=b.getAttribute('data-consent');try{localStorage.setItem(KEY,v)}catch(e){}applyConsent(v);hideBanner();
  })});
  document.getElementById('cookie-settings').addEventListener('click',showBanner);
  var saved=null;try{saved=localStorage.getItem(KEY)}catch(e){}
  if(saved)applyConsent(saved);else setTimeout(showBanner,900);

  // Reveal ved scroll
  var els=document.querySelectorAll('.reveal');
  if('IntersectionObserver' in window){
    var io=new IntersectionObserver(function(en){en.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}})},{rootMargin:'0px 0px -8% 0px'});
    els.forEach(function(el){io.observe(el)});
  } else els.forEach(function(el){el.classList.add('in')});

  document.getElementById('year').textContent=new Date().getFullYear();
})();
