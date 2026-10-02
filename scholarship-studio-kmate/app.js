'use strict';

const UNIVERSITIES = {
  KAIST:{place:'Daejeon'},
  UNIST:{place:'Ulsan'},
  'Korea University':{place:'Seoul'},
  'Ajou University':{place:'Suwon'}
};

const AWARDS = [
  {id:'kaist-ug',uni:'KAIST',name:'KAIST International Undergraduate Scholarship',type:'University scholarship',degree:'Undergraduate',deadline:'Same as chosen admission round',benefit:'Full tuition · 8 semesters',detail:'₩350,000/month + health insurance',gpa:'Renewal: GPA over 2.7/4.3 after freshman year',topik:'Admission language rules checked separately',source:'https://admission.kaist.ac.kr/intl-undergraduate/support/scholarships/kaist/'},
  {id:'unist-ug',uni:'UNIST',name:'UNIST Undergraduate Tuition Scholarship',type:'University scholarship',degree:'Undergraduate',deadline:'Check intake-specific admission schedule',benefit:'Full first-term tuition waiver',detail:'Continuation depends on academic rules',gpa:'Later full waiver: 12 credits + GPA ≥2.7',topik:'Check admissions language rules',source:'https://admu-intl.unist.ac.kr/admission-eng/life/scholarships.do'},
  {id:'ku-anam',uni:'Korea University',name:'Anam Global Scholarship',type:'Admission-evaluated',degree:'Undergraduate',deadline:'Follows university admission calendar',benefit:'Full tuition · 8 semesters',detail:'Freshman award · admission evaluation',gpa:'Renewal: 12 credits + GPA ≥3.5',topik:'Follow admission guide',source:'https://oia.korea.ac.kr/oia2026/KU-Scholarships.do'},
  {id:'ku-leader-a',uni:'Korea University',name:'Global Leader Scholarship A',type:'Admission-evaluated',degree:'Undergraduate',deadline:'Follows university admission calendar',benefit:'Full tuition · 4 semesters',detail:'Freshman award · admission evaluation',gpa:'Renewal: 12 credits + GPA ≥3.5',topik:'Follow admission guide',source:'https://oia.korea.ac.kr/oia2026/KU-Scholarships.do'},
  {id:'ku-leader-b',uni:'Korea University',name:'Global Leader Scholarship B',type:'Admission-evaluated',degree:'Undergraduate',deadline:'Follows university admission calendar',benefit:'50% tuition · 4 semesters',detail:'Freshman award · admission evaluation',gpa:'Renewal: 12 credits + GPA ≥3.0',topik:'Follow admission guide',source:'https://oia.korea.ac.kr/oia2026/KU-Scholarships.do'},
  {id:'ku-stem',uni:'Korea University',name:'KU STEM Scholarship',type:'STEM evidence',degree:'Undergraduate',deadline:'Follows university admission calendar',benefit:'Full tuition · 4 semesters',detail:'Requires qualifying STEM-output certificate',gpa:'Renewal: 12 credits + GPA ≥3.5',topik:'Follow admission guide',source:'https://oia.korea.ac.kr/oia2026/KU-Scholarships.do'},
  {id:'ajou-frontier',uni:'Ajou University',name:'Ajou Frontier Scholarship S',type:'Admission-evaluated',degree:'Undergraduate',deadline:'Follows university admission calendar',benefit:'100% tuition · 4 years',detail:'Internally selected for outstanding grades',gpa:'University selection; confirm continuation rules',topik:'Depends on admission track',source:'https://ajou.ac.kr/iadmissions_en/undergraduate/scholarship.do'},
  {id:'ajou-k6',uni:'Ajou University',name:'Ajou Global Scholarship 1 · Korean track',type:'Language-based',degree:'Undergraduate',deadline:'Follows university admission calendar',benefit:'100% tuition · 1 semester',detail:'Published TOPIK criterion: Level 6',gpa:'Selection confirmed by university',topik:'TOPIK 6',source:'https://ajou.ac.kr/iadmissions_en/undergraduate/scholarship.do'},
  {id:'ajou-k5',uni:'Ajou University',name:'Ajou Global Scholarship 2 · Korean track',type:'Language-based',degree:'Undergraduate',deadline:'Follows university admission calendar',benefit:'70% tuition · 1 semester',detail:'Published TOPIK criterion: Level 5',gpa:'Selection confirmed by university',topik:'TOPIK 5',source:'https://ajou.ac.kr/iadmissions_en/undergraduate/scholarship.do'},
  {id:'ajou-k4',uni:'Ajou University',name:'Ajou Global Scholarship 3 · Korean track',type:'Language-based',degree:'Undergraduate',deadline:'Follows university admission calendar',benefit:'50% tuition · 1 semester',detail:'Published TOPIK criterion: Level 4',gpa:'Selection confirmed by university',topik:'TOPIK 4',source:'https://ajou.ac.kr/iadmissions_en/undergraduate/scholarship.do'},
  {id:'ajou-k3',uni:'Ajou University',name:'Ajou Global Scholarship 4 · Korean track',type:'Language-based',degree:'Undergraduate',deadline:'Follows university admission calendar',benefit:'30% tuition · 1 semester',detail:'Published TOPIK criterion: Level 3',gpa:'Selection confirmed by university',topik:'TOPIK 3',source:'https://ajou.ac.kr/iadmissions_en/undergraduate/scholarship.do'},
  {id:'ajou-e1',uni:'Ajou University',name:'Ajou Global Scholarship 1 · English track',type:'Language-based · Business Administration',degree:'Undergraduate',deadline:'Follows university admission calendar',benefit:'100% tuition · 1 semester',detail:'Published IELTS criterion: 8.0',gpa:'Selection confirmed by university',topik:'IELTS 8.0 or published TOEFL alternative',source:'https://ajou.ac.kr/iadmissions_en/undergraduate/scholarship.do'},
  {id:'ajou-e2',uni:'Ajou University',name:'Ajou Global Scholarship 2 · English track',type:'Language-based · Business Administration',degree:'Undergraduate',deadline:'Follows university admission calendar',benefit:'70% tuition · 1 semester',detail:'Published IELTS criterion: 7.0',gpa:'Selection confirmed by university',topik:'IELTS 7.0 or published TOEFL alternative',source:'https://ajou.ac.kr/iadmissions_en/undergraduate/scholarship.do'},
  {id:'ajou-e3',uni:'Ajou University',name:'Ajou Global Scholarship 3 · English track',type:'Language-based · Business Administration',degree:'Undergraduate',deadline:'Follows university admission calendar',benefit:'50% tuition · 1 semester',detail:'Published IELTS criterion: 6.5',gpa:'Selection confirmed by university',topik:'IELTS 6.5 or published TOEFL alternative',source:'https://ajou.ac.kr/iadmissions_en/undergraduate/scholarship.do'},
  {id:'ajou-e4',uni:'Ajou University',name:'Ajou Global Scholarship 4 · English track',type:'Language-based · Business Administration',degree:'Undergraduate',deadline:'Follows university admission calendar',benefit:'30% tuition · 1 semester',detail:'Published IELTS criterion: 5.5',gpa:'Selection confirmed by university',topik:'IELTS 5.5 or published TOEFL alternative',source:'https://ajou.ac.kr/iadmissions_en/undergraduate/scholarship.do'}
];

const $ = s => document.querySelector(s);
const $$ = s => [...document.querySelectorAll(s)];
const esc = v => String(v ?? '').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const STORE='kmate-scholarship-preview';
let state={uni:'all',query:'',deadline:'all',expanded:null,tracked:[],compare:[]};
try{state={...state,...JSON.parse(localStorage.getItem(STORE)||'{}')}}catch{}
state.compare=(state.compare||[]).slice(0,3);state.tracked=state.tracked||[];

const uniNames=Object.keys(UNIVERSITIES);
let previewUni=uniNames[0];

function save(){localStorage.setItem(STORE,JSON.stringify(state))}
function award(id){return AWARDS.find(a=>a.id===id)}
function countFor(u){return AWARDS.filter(a=>a.uni===u).length}
function toast(msg){const n=$('#toast');n.textContent=msg;n.classList.add('show');clearTimeout(toast.t);toast.t=setTimeout(()=>n.classList.remove('show'),2200)}
function filtered(){
  const q=state.query.trim().toLowerCase();
  return AWARDS.filter(a=>{
    if(state.uni!=='all'&&a.uni!==state.uni)return false;
    if(q&&!Object.values(a).some(v=>String(v).toLowerCase().includes(q)))return false;
    return true;
  });
}
function renderHero(){
  $('#hero-total').textContent=AWARDS.length+' LIVE INDEXED AWARDS';
  $('#hero-unis').innerHTML=uniNames.map((u,i)=>`<button data-hero-uni="${esc(u)}" class="${previewUni===u?'active':''}"><span>0${i+1}</span><b>${esc(u)}</b><small>${countFor(u)} awards</small></button>`).join('');
  updateSignal(previewUni);
}
function updateSignal(u){
  previewUni=u;
  const first=AWARDS.find(a=>a.uni===u);
  $('#signal-place').textContent=UNIVERSITIES[u]?.place||'South Korea';
  $('#signal-name').textContent=u;
  $('#signal-count').textContent=countFor(u);
  $('#signal-benefit').textContent=first?.benefit||'University-funded scholarship options';
  $$('#hero-unis button').forEach(b=>b.classList.toggle('active',b.dataset.heroUni===u));
}
function renderFilters(){
  $('#stream-total').textContent=AWARDS.length;
  $('#uni-filters').innerHTML=[['all','All',AWARDS.length],...uniNames.map(u=>[u,u,countFor(u)])].map(([id,label,count])=>`<button data-filter-uni="${esc(id)}" class="${state.uni===id?'active':''}">${esc(label)} <span>${count}</span></button>`).join('');
  $('#uni-select').innerHTML='<option value="all">All universities</option>'+uniNames.map(u=>`<option value="${esc(u)}">${esc(u)}</option>`).join('');
  $('#uni-select').value=state.uni;
  $('#search').value=state.query;
}
function renderStream(){
  const rows=filtered();
  $('#shown-count').textContent=rows.length+' shown';
  $('#award-stream').innerHTML=rows.map((a,index)=>{
    const open=state.expanded===a.id,tr=state.tracked.includes(a.id),cmp=state.compare.includes(a.id);
    return `<article class="award ${open?'open':''} ${tr?'tracked':''} ${cmp?'compared':''}" data-award="${a.id}">
      <div class="award-row">
        <div><div class="uni-index">0${index+1}</div><div class="uni-name">${esc(a.uni)}</div><div class="degree">${esc(a.degree)}</div><span class="status">Active</span></div>
        <div class="award-main"><div class="type">${esc(a.type)}</div><h3>${esc(a.name)}</h3><p>Deadline · <b style="color:var(--ink)">${esc(a.deadline)}</b></p></div>
        <div class="funding"><div class="col-label">Published funding</div><strong>${esc(a.benefit)}</strong><p>${esc(a.detail)}</p></div>
        <div class="criteria"><div><div class="col-label">Published criteria</div><strong>${esc(a.topik)}</strong><p>${esc(a.gpa)}</p></div></div>
        <button class="expand" data-expand="${a.id}" aria-label="Toggle details">${open?'⌃':'⌄'}</button>
      </div>
      <div class="details"><div class="details-inner"><div class="detail-box">
        <div class="detail-grid">
          <div><span>Deadline</span><p>${esc(a.deadline)}</p></div>
          <div><span>Funding</span><p>${esc(a.benefit)}</p></div>
          <div><span>Language</span><p>${esc(a.topik)}</p></div>
          <div><span>Academic</span><p>${esc(a.gpa)}</p></div>
        </div>
        <div class="detail-actions">
          <button class="track ${tr?'active':''}" data-track="${a.id}">${tr?'✓ Tracked':'＋ Track'}</button>
          <button class="compare ${cmp?'active':''}" data-compare="${a.id}">${cmp?'✓ In comparison':'⇄ Compare'}</button>
          <a target="_blank" rel="noopener" href="${esc(a.source)}">Official source ↗</a>
        </div>
      </div></div></div>
    </article>`;
  }).join('');
}
function renderCompare(){
  const selected=state.compare.map(award).filter(Boolean);
  $('#clear-compare').style.visibility=selected.length?'visible':'hidden';
  if(!selected.length){
    $('#compare-body').innerHTML='<div class="empty"><b>Your comparison is empty.</b><p>Open an award and add it to comparison.</p></div>';
  }else{
    const rows=[
      ['Deadline',a=>a.deadline],
      ['Funding',a=>a.benefit],
      ['Language',a=>a.topik],
      ['Academic',a=>a.gpa]
    ];
    $('#compare-body').innerHTML=`<div class="compare-table"><table><thead><tr><th>Field</th>${selected.map(a=>`<th><small>${esc(a.uni)}</small><b>${esc(a.name)}</b></th>`).join('')}</tr></thead><tbody>${rows.map(([label,get])=>`<tr><th>${label}</th>${selected.map(a=>`<td>${esc(get(a))}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`;
  }
  const tray=$('#compare-tray');
  tray.hidden=!selected.length;
  if(selected.length)tray.innerHTML=`<div><small style="color:rgba(255,255,255,.45);font-size:8px">${selected.length}/3 selected</small><div class="tray-items">${selected.map(a=>`<button data-remove-compare="${a.id}">${esc(a.uni)} ×</button>`).join('')}</div></div><a href="#compare">Compare now →</a>`;
}
function render(){renderFilters();renderStream();renderCompare();save()}

renderHero();render();

$('#search').addEventListener('input',e=>{state.query=e.target.value;renderStream();save()});
$('#uni-select').addEventListener('change',e=>{state.uni=e.target.value;render()});
$('#deadline-filter').addEventListener('change',e=>{state.deadline=e.target.value;render()});
$('#reset').addEventListener('click',()=>{state.uni='all';state.query='';state.deadline='all';render()});
$('#signal-filter').addEventListener('click',()=>{state.uni=previewUni;render();$('#stream').scrollIntoView({behavior:'smooth'})});
$('#explore-btn').addEventListener('click',()=>$('#stream').scrollIntoView({behavior:'smooth'}));
$('#profile-btn').addEventListener('click',()=>{toast('Preview only — production KMate links this to the real profile checker.')});
$('#clear-compare').addEventListener('click',()=>{state.compare=[];renderCompare();save()});

document.addEventListener('pointermove',e=>{
  const hero=e.target.closest('.hero'); if(!hero)return;
  const r=hero.getBoundingClientRect();
  hero.style.setProperty('--px',((e.clientX-r.left)/r.width*100).toFixed(1)+'%');
  hero.style.setProperty('--py',((e.clientY-r.top)/r.height*100).toFixed(1)+'%');
});
document.addEventListener('pointerover',e=>{
  const b=e.target.closest('[data-hero-uni]'); if(b) updateSignal(b.dataset.heroUni);
});
document.addEventListener('click',e=>{
  const h=e.target.closest('[data-hero-uni]');if(h){state.uni=h.dataset.heroUni;previewUni=h.dataset.heroUni;render();$('#stream').scrollIntoView({behavior:'smooth'});return}
  const f=e.target.closest('[data-filter-uni]');if(f){state.uni=f.dataset.filterUni;render();return}
  const j=e.target.closest('[data-jump]');if(j){$('#'+j.dataset.jump)?.scrollIntoView({behavior:'smooth'});return}
  const ex=e.target.closest('[data-expand]');if(ex){state.expanded=state.expanded===ex.dataset.expand?null:ex.dataset.expand;renderStream();return}
  const tr=e.target.closest('[data-track]');if(tr){const id=tr.dataset.track;state.tracked=state.tracked.includes(id)?state.tracked.filter(x=>x!==id):[...state.tracked,id];renderStream();save();toast(state.tracked.includes(id)?'Saved to tracked awards':'Removed from tracked awards');return}
  const cp=e.target.closest('[data-compare]');if(cp){const id=cp.dataset.compare;if(state.compare.includes(id))state.compare=state.compare.filter(x=>x!==id);else if(state.compare.length<3)state.compare=[...state.compare,id];else{toast('Comparison is limited to 3 awards');return}renderStream();renderCompare();save();return}
  const rm=e.target.closest('[data-remove-compare]');if(rm){state.compare=state.compare.filter(x=>x!==rm.dataset.removeCompare);renderStream();renderCompare();save();return}
});
