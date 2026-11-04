/* Public course navigation. No authentication, analytics or student records. */
(function () {
  'use strict';
  const escape = value => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const words = {
    en: {title:'Direct access to weekly materials',choose:'Study module',module:'Module',lecture:'Full lecture',reading:'Sources',media:'Video & podcast',practice:'Practice',slides:'Presentation',ppt:'PowerPoint',map:'Choose your module',note:'Lectures and presentations are in English. The Turkish option translates the course overview and navigation.'},
    tr: {title:'Haftalık materyallere doğrudan erişim',choose:'Çalışma modülü',module:'Modül',lecture:'Ayrıntılı ders',reading:'Kaynaklar',media:'Video ve podcast',practice:'Alıştırma',slides:'Sunum',ppt:'PowerPoint',map:'Modülünüzü seçin',note:'Ders metinleri ve sunumlar İngilizcedir. Türkçe seçeneği genel bakışı ve gezinmeyi çevirir.'}
  };
  function refresh() {
    const lang = document.documentElement.lang === 'tr' ? 'tr' : 'en';
    const t = words[lang], modules = window.COURSE.weeks;
    const match = location.hash.match(/^#week\/(\d+)(?:\/(lecture|readings|media|practice))?$/);
    const number = match ? Number(match[1]) : 1;
    if (number < 1 || number > modules.length || location.hash === '#resources') return;
    const old = document.querySelector('.course-access'); if (old) old.remove();
    const panel = document.createElement('section'); panel.className = 'course-access'; panel.setAttribute('aria-label', t.title);
    const stem = 'presentations/week-' + String(number).padStart(2,'0');
    panel.innerHTML = `<div class="access-heading"><label for="accessWeek">${t.choose}</label><select id="accessWeek">${modules.map(w => `<option value="${w.number}" ${w.number===number?'selected':''}>${t.module} ${w.number} · ${escape(w.period)}</option>`).join('')}</select></div><nav class="access-links" aria-label="${t.title}"><a href="#week/${number}/lecture">${t.lecture}</a><a href="#week/${number}/readings">${t.reading}</a><a href="#week/${number}/media">${t.media}</a><a href="#week/${number}/practice">${t.practice}</a><a href="${stem}.html">${t.slides} ↗</a><a href="${stem}.pptx" download>${t.ppt} ↓</a></nav><p class="access-note">${t.note}</p>`;
    const target = match ? document.querySelector('article > .intro') : document.querySelector('.start-panel, #weekly');
    if (!target) return;
    if (match) target.after(panel); else target.before(panel);
    panel.querySelector('select').addEventListener('change', e => {location.hash = 'week/' + e.target.value;});
    if (!match) {
      const map = document.createElement('nav'); map.className='course-module-map'; map.setAttribute('aria-label', t.map);
      map.innerHTML = modules.map(w => `<a href="#week/${w.number}" title="${escape(w.title)}" aria-label="${t.module} ${w.number}: ${escape(w.title)}"><span>${String(w.number).padStart(2,'0')}</span><small>${escape(w.period)}</small></a>`).join('');
      panel.append(map);
    }
    const logo=document.querySelector('.hitit-course-logo');
    if (logo) {logo.src='brand/hitit-'+lang+'.png'; logo.alt=lang==='tr'?'Hitit Üniversitesi':'Hitit University';}
    const section = match && match[2];
    if (section) {
      const id = section === 'lecture' ? 'advanced' : section;
      const content = document.getElementById(id);
      if(content) {
        if(content.tagName==='DETAILS') content.open=true;
        content.querySelectorAll('details.lecture-note').forEach(d=>d.open=true);
        content.setAttribute('tabindex','-1'); content.focus({preventScroll:true}); content.scrollIntoView({block:'start',behavior:'auto'});
      }
    }
  }
  window.addEventListener('course-render', refresh);
  refresh();
})();
