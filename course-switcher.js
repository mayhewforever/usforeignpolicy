(function(){
  'use strict';
  function update(){
    const nav=document.querySelector('.course-switcher');if(!nav)return;
    const tr=document.documentElement.lang==='tr';
    nav.setAttribute('aria-label',tr?'Diğer ders':'Other course');
    const link=nav.querySelector('a');
    const current=document.body.dataset.course;
    link.textContent=current==='usfp'?(tr?'Kamu Diplomasisi ve Yumuşak Güç →':'Public Diplomacy & Soft Power →'):(tr?'ABD Dış Politikası →':'U.S. Foreign Policy →');
  }
  const nav=document.createElement('nav');nav.className='course-switcher';
  const link=document.createElement('a');
  link.href=document.body.dataset.course==='usfp'?'https://mayhewforever.github.io/kamudiplomasisi/':'https://mayhewforever.github.io/us-foreign-policy/';
  nav.append(link);document.querySelector('footer').append(nav);
  update();window.addEventListener('course-language-change',update);window.addEventListener('course-render',update);
})();
