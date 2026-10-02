'use strict';

const UNIVERSITY = {
  KAIST:{place:'Daejeon'},
  UNIST:{place:'Ulsan'},
  'Korea University':{place:'Seoul'},
  'Ajou University':{place:'Suwon'}
};

const SOURCE_CHECKED = '24 Sep 2026';
const NOT_STATED = 'Not stated in the preview source snapshot';

const AWARDS = [
  {
    id:'kaist-ug',uni:'KAIST',name:'KAIST International Undergraduate Scholarship',
    type:'University scholarship',degree:'Undergraduate',deadline:'Same as chosen admission round',
    deadlineKind:'admission_schedule',benefit:'Full tuition · 8 semesters',detail:'₩350,000/month + health insurance',
    gpa:'Renewal: GPA over 2.7/4.3 after freshman year',topik:'Admission language rules checked separately',
    renewal:'Continued funding is subject to published academic conditions.',
    selection:'Linked to international undergraduate admission.',notice:'Confirm the intake-specific admission guide before applying.',
    funding:'living',major:null,minTopik:null,minIelts:null,
    source:'https://admission.kaist.ac.kr/intl-undergraduate/support/scholarships/kaist/'
  },
  {
    id:'unist-ug',uni:'UNIST',name:'UNIST Undergraduate Tuition Scholarship',
    type:'University scholarship',degree:'Undergraduate',deadline:'Check intake-specific admission schedule',
    deadlineKind:'admission_schedule',benefit:'Full first-term tuition waiver',detail:'Continuation depends on academic rules',
    gpa:'Later full waiver: 12 credits + GPA ≥2.7',topik:'Check admissions language rules',
    renewal:'Later-semester support depends on the university’s published academic rules.',
    selection:'University scholarship tied to undergraduate enrollment.',notice:'Confirm the current intake page for dates and continuation details.',
    funding:'full',major:null,minTopik:null,minIelts:null,
    source:'https://admu-intl.unist.ac.kr/admission-eng/life/scholarships.do'
  },
  {
    id:'ku-anam',uni:'Korea University',name:'Anam Global Scholarship',
    type:'Admission-evaluated',degree:'Undergraduate',deadline:'Follows university admission calendar',
    deadlineKind:'admission_schedule',benefit:'Full tuition · 8 semesters',detail:'Freshman award · admission evaluation',
    gpa:'Renewal: 12 credits + GPA ≥3.5',topik:'Follow admission guide',
    renewal:'Published renewal condition includes academic performance requirements.',
    selection:'Awarded through university admission evaluation.',notice:'This is not a prediction of selection. Confirm the current admission guide.',
    funding:'full',major:null,minTopik:null,minIelts:null,
    source:'https://oia.korea.ac.kr/oia2026/KU-Scholarships.do'
  },
  {
    id:'ku-leader-a',uni:'Korea University',name:'Global Leader Scholarship A',
    type:'Admission-evaluated',degree:'Undergraduate',deadline:'Follows university admission calendar',
    deadlineKind:'admission_schedule',benefit:'Full tuition · 4 semesters',detail:'Freshman award · admission evaluation',
    gpa:'Renewal: 12 credits + GPA ≥3.5',topik:'Follow admission guide',
    renewal:'Published renewal condition includes credit and GPA requirements.',
    selection:'Awarded through university admission evaluation.',notice:'Confirm the current admissions cycle and scholarship page.',
    funding:'full',major:null,minTopik:null,minIelts:null,
    source:'https://oia.korea.ac.kr/oia2026/KU-Scholarships.do'
  },
  {
    id:'ku-leader-b',uni:'Korea University',name:'Global Leader Scholarship B',
    type:'Admission-evaluated',degree:'Undergraduate',deadline:'Follows university admission calendar',
    deadlineKind:'admission_schedule',benefit:'50% tuition · 4 semesters',detail:'Freshman award · admission evaluation',
    gpa:'Renewal: 12 credits + GPA ≥3.0',topik:'Follow admission guide',
    renewal:'Published renewal condition includes credit and GPA requirements.',
    selection:'Awarded through university admission evaluation.',notice:'Confirm the current admissions cycle and scholarship page.',
    funding:'partial',major:null,minTopik:null,minIelts:null,
    source:'https://oia.korea.ac.kr/oia2026/KU-Scholarships.do'
  },
  {
    id:'ku-stem',uni:'Korea University',name:'KU STEM Scholarship',
    type:'STEM evidence',degree:'Undergraduate',deadline:'Follows university admission calendar',
    deadlineKind:'admission_schedule',benefit:'Full tuition · 4 semesters',detail:'Requires qualifying STEM-output certificate',
    gpa:'Renewal: 12 credits + GPA ≥3.5',topik:'Follow admission guide',
    renewal:'Published renewal condition includes credit and GPA requirements.',
    selection:'Requires the university’s stated STEM evidence in addition to admission evaluation.',
    notice:'The exact acceptable STEM evidence must be confirmed from the current official guide.',
    funding:'full',major:'STEM',minTopik:null,minIelts:null,
    source:'https://oia.korea.ac.kr/oia2026/KU-Scholarships.do'
  },
  {
    id:'ajou-frontier',uni:'Ajou University',name:'Ajou Frontier Scholarship S',
    type:'Admission-evaluated',degree:'Undergraduate',deadline:'Follows university admission calendar',
    deadlineKind:'admission_schedule',benefit:'100% tuition · 4 years',detail:'Internally selected for outstanding grades',
    gpa:'University selection; confirm continuation rules',topik:'Depends on admission track',
    renewal:'Confirm continuation rules in the current Ajou guide.',
    selection:'University selection based on the published admission/scholarship process.',
    notice:'No selection probability is inferred in Scholarship Studio.',
    funding:'full',major:null,minTopik:null,minIelts:null,
    source:'https://ajou.ac.kr/iadmissions_en/undergraduate/scholarship.do'
  },
  {
    id:'ajou-k6',uni:'Ajou University',name:'Ajou Global Scholarship 1 · Korean track',
    type:'Language-based',degree:'Undergraduate',deadline:'Follows university admission calendar',
    deadlineKind:'admission_schedule',benefit:'100% tuition · 1 semester',detail:'Published TOPIK criterion: Level 6',
    gpa:'Selection confirmed by university',topik:'TOPIK 6',
    renewal:'One-semester award in this preview snapshot.',selection:'Language-based published scholarship tier.',
    notice:'Confirm whether the current intake retains the same TOPIK tier and benefit.',
    funding:'full',major:null,minTopik:6,minIelts:null,
    source:'https://ajou.ac.kr/iadmissions_en/undergraduate/scholarship.do'
  },
  {
    id:'ajou-k5',uni:'Ajou University',name:'Ajou Global Scholarship 2 · Korean track',
    type:'Language-based',degree:'Undergraduate',deadline:'Follows university admission calendar',
    deadlineKind:'admission_schedule',benefit:'70% tuition · 1 semester',detail:'Published TOPIK criterion: Level 5',
    gpa:'Selection confirmed by university',topik:'TOPIK 5',
    renewal:'One-semester award in this preview snapshot.',selection:'Language-based published scholarship tier.',
    notice:'Confirm whether the current intake retains the same TOPIK tier and benefit.',
    funding:'partial',major:null,minTopik:5,minIelts:null,
    source:'https://ajou.ac.kr/iadmissions_en/undergraduate/scholarship.do'
  },
  {
    id:'ajou-k4',uni:'Ajou University',name:'Ajou Global Scholarship 3 · Korean track',
    type:'Language-based',degree:'Undergraduate',deadline:'Follows university admission calendar',
    deadlineKind:'admission_schedule',benefit:'50% tuition · 1 semester',detail:'Published TOPIK criterion: Level 4',
    gpa:'Selection confirmed by university',topik:'TOPIK 4',
    renewal:'One-semester award in this preview snapshot.',selection:'Language-based published scholarship tier.',
    notice:'Confirm whether the current intake retains the same TOPIK tier and benefit.',
    funding:'partial',major:null,minTopik:4,minIelts:null,
    source:'https://ajou.ac.kr/iadmissions_en/undergraduate/scholarship.do'
  },
  {
    id:'ajou-k3',uni:'Ajou University',name:'Ajou Global Scholarship 4 · Korean track',
    type:'Language-based',degree:'Undergraduate',deadline:'Follows university admission calendar',
    deadlineKind:'admission_schedule',benefit:'30% tuition · 1 semester',detail:'Published TOPIK criterion: Level 3',
    gpa:'Selection confirmed by university',topik:'TOPIK 3',
    renewal:'One-semester award in this preview snapshot.',selection:'Language-based published scholarship tier.',
    notice:'Confirm whether the current intake retains the same TOPIK tier and benefit.',
    funding:'partial',major:null,minTopik:3,minIelts:null,
    source:'https://ajou.ac.kr/iadmissions_en/undergraduate/scholarship.do'
  },
  {
    id:'ajou-e1',uni:'Ajou University',name:'Ajou Global Scholarship 1 · English track',
    type:'Language-based · Business Administration',degree:'Undergraduate',deadline:'Follows university admission calendar',
    deadlineKind:'admission_schedule',benefit:'100% tuition · 1 semester',detail:'Published IELTS criterion: 8.0',
    gpa:'Selection confirmed by university',topik:'IELTS 8.0 or published TOEFL alternative',
    renewal:'One-semester award in this preview snapshot.',selection:'Language-based published scholarship tier.',
    notice:'Preview matching checks IELTS only; use the official page for TOEFL alternatives.',
    funding:'full',major:'Business Administration',minTopik:null,minIelts:8,
    source:'https://ajou.ac.kr/iadmissions_en/undergraduate/scholarship.do'
  },
  {
    id:'ajou-e2',uni:'Ajou University',name:'Ajou Global Scholarship 2 · English track',
    type:'Language-based · Business Administration',degree:'Undergraduate',deadline:'Follows university admission calendar',
    deadlineKind:'admission_schedule',benefit:'70% tuition · 1 semester',detail:'Published IELTS criterion: 7.0',
    gpa:'Selection confirmed by university',topik:'IELTS 7.0 or published TOEFL alternative',
    renewal:'One-semester award in this preview snapshot.',selection:'Language-based published scholarship tier.',
    notice:'Preview matching checks IELTS only; use the official page for TOEFL alternatives.',
    funding:'partial',major:'Business Administration',minTopik:null,minIelts:7,
    source:'https://ajou.ac.kr/iadmissions_en/undergraduate/scholarship.do'
  },
  {
    id:'ajou-e3',uni:'Ajou University',name:'Ajou Global Scholarship 3 · English track',
    type:'Language-based · Business Administration',degree:'Undergraduate',deadline:'Follows university admission calendar',
    deadlineKind:'admission_schedule',benefit:'50% tuition · 1 semester',detail:'Published IELTS criterion: 6.5',
    gpa:'Selection confirmed by university',topik:'IELTS 6.5 or published TOEFL alternative',
    renewal:'One-semester award in this preview snapshot.',selection:'Language-based published scholarship tier.',
    notice:'Preview matching checks IELTS only; use the official page for TOEFL alternatives.',
    funding:'partial',major:'Business Administration',minTopik:null,minIelts:6.5,
    source:'https://ajou.ac.kr/iadmissions_en/undergraduate/scholarship.do'
  },
  {
    id:'ajou-e4',uni:'Ajou University',name:'Ajou Global Scholarship 4 · English track',
    type:'Language-based · Business Administration',degree:'Undergraduate',deadline:'Follows university admission calendar',
    deadlineKind:'admission_schedule',benefit:'30% tuition · 1 semester',detail:'Published IELTS criterion: 5.5',
    gpa:'Selection confirmed by university',topik:'IELTS 5.5 or published TOEFL alternative',
    renewal:'One-semester award in this preview snapshot.',selection:'Language-based published scholarship tier.',
    notice:'Preview matching checks IELTS only; use the official page for TOEFL alternatives.',
    funding:'partial',major:'Business Administration',minTopik:null,minIelts:5.5,
    source:'https://ajou.ac.kr/iadmissions_en/undergraduate/scholarship.do'
  }
];

const STARTER_DOCS = [
  ['transcript','Academic transcript'],
  ['graduation','Graduation / expected-graduation evidence'],
  ['language','Language evidence if applicable'],
  ['identity','Passport / identity evidence if requested'],
  ['specific','Scholarship-specific supporting evidence']
];

const STARTER_REQUIREMENTS = [
  ['source','Official source reviewed'],
  ['criteria','Published criteria checked'],
  ['deadline','Current deadline behavior checked']
];

const $ = (s, root=document) => root.querySelector(s);
const $$ = (s, root=document) => [...root.querySelectorAll(s)];
const esc = v => String(v ?? '').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const STORE = 'kmate-scholarship-studio-preview-v3';

const emptyProfile = {
  degree:'Undergraduate',major:'',nationality:'',education:'',gradingScale:'',gpa:'',
  topik:'',ielts:'',toefl:'',intake:'',funding:'any'
};

let state = {
  view:'discover',uni:'all',query:'',funding:'all',expanded:null,
  tracked:[],compare:[],profile:{...emptyProfile},applications:{},reminders:[],matchRun:false
};

try {
  const saved = JSON.parse(localStorage.getItem(STORE)||'{}');
  state = {
    ...state,
    ...saved,
    profile:{...emptyProfile,...(saved.profile||{})},
    applications:saved.applications||{},
    reminders:Array.isArray(saved.reminders)?saved.reminders:[]
  };
} catch {}

state.compare = (state.compare||[]).slice(0,3);
state.tracked = Array.isArray(state.tracked)?state.tracked:[];
state.view = ['discover','eligibility','applications','compare'].includes(state.view)?state.view:'discover';

const uniNames = Object.keys(UNIVERSITY);
let previewUni = uniNames[0];

function save(){localStorage.setItem(STORE,JSON.stringify(state))}
function award(id){return AWARDS.find(a=>a.id===id)}
function countFor(u){return AWARDS.filter(a=>a.uni===u).length}
function toast(msg){const n=$('#toast');n.textContent=msg;n.classList.add('show');clearTimeout(toast.t);toast.t=setTimeout(()=>n.classList.remove('show'),2200)}
function todayISO(){return new Date().toISOString().slice(0,10)}
function fmtDate(v){
  if(!v)return '';
  const d=new Date(v+'T00:00:00');
  return Number.isNaN(d.getTime())?v:d.toLocaleDateString('en-IN',{day:'numeric',month:'short',year:'numeric'});
}
function appState(id){
  if(!state.applications[id]){
    state.applications[id]={
      stage:'Researching',
      docs:Object.fromEntries(STARTER_DOCS.map(([key])=>[key,false])),
      requirements:Object.fromEntries(STARTER_REQUIREMENTS.map(([key])=>[key,false])),
      submission:'Not started',interview:'Not started',result:'Pending',notes:''
    };
  }
  return state.applications[id];
}

function switchView(view,scroll=true){
  state.view=view;
  $$('.studio-view').forEach(p=>p.classList.toggle('active',p.dataset.viewPanel===view));
  $$('.subnav [data-view]').forEach(b=>b.classList.toggle('active',b.dataset.view===view));
  renderNavCounts();
  if(view==='eligibility'){fillProfileForm();renderProfile();renderMatches()}
  if(view==='applications'){renderApplications();renderTimeline()}
  if(view==='compare'){renderCompare();renderHistory()}
  save();
  if(scroll)window.scrollTo({top:0,behavior:'smooth'});
}

function renderNavCounts(){
  $('#app-nav-count').textContent=state.tracked.length;
  $('#compare-nav-count').textContent=state.compare.length;
}

function filtered(){
  const q=state.query.trim().toLowerCase();
  return AWARDS.filter(a=>{
    if(state.uni!=='all'&&a.uni!==state.uni)return false;
    if(state.funding==='full'&&a.funding!=='full'&&a.funding!=='living')return false;
    if(state.funding==='partial'&&a.funding!=='partial')return false;
    if(state.deadline!=='all'&&a.deadlineKind!==state.deadline)return false;
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
  $('#signal-place').textContent=UNIVERSITY[u]?.place||'South Korea';
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
  $('#funding-filter').value=state.funding;
  $('#deadline-filter').value=state.deadline;
  $('#search').value=state.query;
}

function renderStream(){
  const rows=filtered();
  $('#shown-count').textContent=rows.length+' shown';
  if(!rows.length){
    $('#award-stream').innerHTML='<div class="empty"><b>Nothing matches this view.</b><p>Try another university, funding filter, or search term.</p></div>';
    return;
  }
  $('#award-stream').innerHTML=rows.map((a,index)=>{
    const open=state.expanded===a.id,tr=state.tracked.includes(a.id),cmp=state.compare.includes(a.id);
    return `<article class="award ${open?'open':''} ${tr?'tracked':''} ${cmp?'compared':''}" data-award="${a.id}">
      <div class="award-row">
        <div><div class="uni-index">${String(index+1).padStart(2,'0')}</div><div class="uni-name">${esc(a.uni)}</div><div class="degree">${esc(a.degree)}</div><span class="status">Active</span></div>
        <div class="award-main"><div class="type">${esc(a.type)}</div><h3>${esc(a.name)}</h3><p>Deadline · <b style="color:var(--ink)">${esc(a.deadline)}</b></p></div>
        <div class="funding"><div class="col-label">Published funding</div><strong>${esc(a.benefit)}</strong><p>${esc(a.detail)}</p></div>
        <div class="criteria"><div><div class="col-label">Published criteria</div><strong>${esc(a.topik)}</strong><p>${esc(a.gpa)}</p></div></div>
        <button class="expand" data-expand="${a.id}" aria-expanded="${open}" aria-label="Toggle details">${open?'⌃':'⌄'}</button>
      </div>
      <div class="details"><div class="details-inner"><div class="detail-box">
        <div class="detail-grid">
          <div><span>Deadline</span><p>${esc(a.deadline)}</p></div>
          <div><span>Funding</span><p>${esc(a.benefit)}</p></div>
          <div><span>Language</span><p>${esc(a.topik)}</p></div>
          <div><span>Renewal</span><p>${esc(a.renewal)}</p></div>
        </div>
        <div class="detail-note"><span>Selection</span><p>${esc(a.selection)}</p></div>
        <div class="detail-note caution"><span>Caution</span><p>${esc(a.notice)}</p></div>
        <div class="detail-actions">
          <button class="track ${tr?'active':''}" data-track="${a.id}">${tr?'✓ Tracked':'＋ Track'}</button>
          <button class="compare ${cmp?'active':''}" data-compare="${a.id}">${cmp?'✓ In comparison':'⇄ Compare'}</button>
          <button data-check-award="${a.id}">Check eligibility</button>
          <a target="_blank" rel="noopener" href="${esc(a.source)}">Official source ↗</a>
        </div>
      </div></div></div>
    </article>`;
  }).join('');
}

function trackAward(id){
  const adding=!state.tracked.includes(id);
  state.tracked=adding?[...state.tracked,id]:state.tracked.filter(x=>x!==id);
  if(adding)appState(id);
  renderStream();renderCompareTray();renderNavCounts();save();
  toast(adding?'Saved to Applications':'Removed from active Applications');
}

function toggleCompare(id){
  if(state.compare.includes(id))state.compare=state.compare.filter(x=>x!==id);
  else if(state.compare.length<3)state.compare=[...state.compare,id];
  else return toast('Comparison is limited to 3 awards');
  renderStream();renderCompareTray();renderNavCounts();save();
  if(state.view==='compare'){renderCompare();renderHistory()}
}

function renderCompareTray(){
  const selected=state.compare.map(award).filter(Boolean);
  const tray=$('#compare-tray');
  tray.hidden=!selected.length;
  if(!selected.length)return;
  tray.innerHTML=`<div><small>${selected.length}/3 selected</small><div class="tray-items">${selected.map(a=>`<button data-remove-compare="${a.id}">${esc(a.uni)} ×</button>`).join('')}</div></div><button data-action-view="compare">Compare now →</button>`;
}

function profileCompletion(){
  const keys=['major','nationality','education','gradingScale','gpa','intake'];
  const language=state.profile.topik||state.profile.ielts||state.profile.toefl;
  const completed=keys.filter(k=>String(state.profile[k]||'').trim()).length+(language?1:0);
  return Math.round((completed/(keys.length+1))*100);
}
function fillProfileForm(){
  const form=$('#profile-form');
  if(!form)return;
  Object.entries(state.profile).forEach(([key,value])=>{
    const el=form.elements.namedItem(key);
    if(el)el.value=value;
  });
}
function renderProfile(){
  const pct=profileCompletion();
  $('#profile-complete').textContent=pct+'%';
  $('#profile-progress').style.width=pct+'%';
  const major=state.profile.major||'your intended major';
  $('#profile-name').textContent=state.profile.major?`${major} · ${state.profile.degree}`:'Build your profile once.';
  $('#profile-summary-copy').textContent=pct>=70
    ?'Your reusable profile is ready for structured checks. Results still defer to the current official scholarship source.'
    :'Add your major, academic scale, intake and at least one language score for a more useful check.';
  const facts=[
    ['Major',state.profile.major||'Not entered'],
    ['Academic',state.profile.gpa&&state.profile.gradingScale?`${state.profile.gpa} / ${state.profile.gradingScale}`:'Not entered'],
    ['TOPIK',state.profile.topik?`Level ${state.profile.topik}`:'—'],
    ['IELTS',state.profile.ielts||'—'],
    ['Intake',state.profile.intake||'Not entered']
  ];
  $('#profile-facts').innerHTML=facts.map(([k,v])=>`<div><span>${esc(k)}</span><b>${esc(v)}</b></div>`).join('');
}

function majorLooksStem(v){return /(computer|software|ai|artificial|data|engineering|science|math|physics|chem|biology|stem)/i.test(v||'')}
function majorLooksBusiness(v){return /(business|management|commerce|econom|finance|account)/i.test(v||'')}

function evaluateAward(a){
  const checks=[];
  if(a.degree){
    checks.push({label:'Degree level',result:state.profile.degree===a.degree?'ok':'bad',detail:`Published: ${a.degree}. Profile: ${state.profile.degree||'not entered'}.`});
  }
  if(a.minTopik){
    if(!state.profile.topik) checks.push({label:'TOPIK',result:'warn',detail:`Published criterion: TOPIK ${a.minTopik}. Add your TOPIK level to check it.`});
    else checks.push({label:'TOPIK',result:Number(state.profile.topik)>=a.minTopik?'ok':'bad',detail:`Published: TOPIK ${a.minTopik}. Profile: TOPIK ${state.profile.topik}.`});
  }
  if(a.minIelts){
    if(!state.profile.ielts) checks.push({label:'IELTS',result:'warn',detail:`Published criterion: IELTS ${a.minIelts}. Add IELTS to check this tier.`});
    else checks.push({label:'IELTS',result:Number(state.profile.ielts)>=a.minIelts?'ok':'bad',detail:`Published: IELTS ${a.minIelts}. Profile: IELTS ${state.profile.ielts}.`});
  }
  if(a.major==='Business Administration'){
    if(!state.profile.major)checks.push({label:'Major',result:'warn',detail:'This preview entry is tied to the Business Administration English track. Add your intended major.'});
    else checks.push({label:'Major',result:majorLooksBusiness(state.profile.major)?'ok':'bad',detail:`Published track: Business Administration. Profile: ${state.profile.major}.`});
  }
  if(a.major==='STEM'){
    if(!state.profile.major)checks.push({label:'STEM route',result:'warn',detail:'This award uses a STEM-specific evidence condition. Add your intended major and review the evidence rule.'});
    else checks.push({label:'STEM route',result:majorLooksStem(state.profile.major)?'ok':'warn',detail:`Profile major: ${state.profile.major}. Exact acceptable STEM evidence still needs official review.`});
  }
  if(state.profile.funding==='full'){
    checks.push({label:'Funding preference',result:(a.funding==='full'||a.funding==='living')?'ok':'warn',detail:`Preference: full tuition. Published benefit: ${a.benefit}.`});
  } else if(state.profile.funding==='living'){
    checks.push({label:'Funding preference',result:a.funding==='living'?'ok':'warn',detail:`Preference: tuition + living support. Published benefit: ${a.benefit}.`});
  }
  checks.push({label:'Nationality / education',result:'warn',detail:'This preview does not encode every current nationality or schooling condition. Confirm them on the official source.'});
  checks.push({label:'Deadline',result:'warn',detail:a.deadline});

  const hasBad=checks.some(c=>c.result==='bad');
  const hasWarn=checks.some(c=>c.result==='warn');
  return {
    status:hasBad?'bad':hasWarn?'warn':'ok',
    label:hasBad?'Published criterion not met':hasWarn?'Review / missing data':'Published checks met',
    checks
  };
}

function renderMatches(){
  const root=$('#match-results');
  if(!state.matchRun){
    root.innerHTML='<div class="empty"><b>Run a check when your profile is ready.</b><p>Scholarship Studio will show the exact published criteria it can evaluate and clearly mark everything else for review.</p></div>';
    return;
  }
  const results=AWARDS.map(a=>({a,e:evaluateAward(a)}));
  const rank={ok:0,warn:1,bad:2};
  results.sort((x,y)=>rank[x.e.status]-rank[y.e.status]);
  root.innerHTML=results.map(({a,e})=>`<article class="match-card ${e.status}" data-award="${a.id}">
    <div class="match-top"><div><small>${esc(a.uni)}</small><h3>${esc(a.name)}</h3></div><span>${esc(e.label)}</span></div>
    <div class="match-checks">${e.checks.map(c=>`<div><i class="${c.result}"></i><p><b>${esc(c.label)}</b><span>${esc(c.detail)}</span></p></div>`).join('')}</div>
    <div class="match-actions"><button data-track="${a.id}">${state.tracked.includes(a.id)?'✓ Tracked':'＋ Track'}</button><button data-compare="${a.id}">Compare</button><a href="${esc(a.source)}" target="_blank" rel="noopener">Official source ↗</a></div>
  </article>`).join('');
}

function applicationProgress(app){
  const docs=Object.values(app.docs).filter(Boolean).length;
  const reqs=Object.values(app.requirements).filter(Boolean).length;
  const states=[app.submission!=='Not started',app.interview!=='Not started',app.result!=='Pending'].filter(Boolean).length;
  const total=STARTER_DOCS.length+STARTER_REQUIREMENTS.length+3;
  return Math.round(((docs+reqs+states)/total)*100);
}

function renderApplications(){
  const ids=state.tracked.filter(id=>award(id));
  $('#application-count').textContent=ids.length;
  $('#application-meta').textContent=ids.length?ids.length+' saved scholarship workspace'+(ids.length===1?'':'s'):'Track an award to begin.';
  const root=$('#application-list');
  if(!ids.length){
    root.innerHTML='<div class="empty"><b>No application workspaces yet.</b><p>Track a scholarship from Discover or Eligibility. Its own checklist, notes, stages and reminders will appear here.</p><button data-action-view="discover">Browse scholarships →</button></div>';
    return;
  }
  root.innerHTML=ids.map(id=>{
    const a=award(id),app=appState(id),pct=applicationProgress(app);
    const reminderCount=state.reminders.filter(r=>r.awardId===id).length;
    return `<article class="application-card" data-app="${id}">
      <div class="app-head">
        <div><span>${esc(a.uni)}</span><h2>${esc(a.name)}</h2><p>${esc(a.benefit)} · ${esc(a.deadline)}</p></div>
        <div class="app-progress"><strong>${pct}%</strong><div><i style="width:${pct}%"></i></div><small>workspace progress</small></div>
      </div>
      <div class="app-stage-row">
        <label><span>Stage</span><select data-app-field="stage" data-app-id="${id}">${['Researching','Preparing documents','Ready to submit','Submitted','Interview','Result'].map(v=>`<option ${app.stage===v?'selected':''}>${v}</option>`).join('')}</select></label>
        <div><span>Reminders</span><b>${reminderCount}</b></div>
        <a href="${esc(a.source)}" target="_blank" rel="noopener">Official source ↗</a>
      </div>
      <div class="app-columns">
        <section><div class="micro-head"><span>Documents</span><small>Planning checklist · confirm official source</small></div>
          <div class="checklist">${STARTER_DOCS.map(([key,label])=>`<label><input type="checkbox" data-doc="${key}" data-app-id="${id}" ${app.docs[key]?'checked':''}><span>${esc(label)}</span></label>`).join('')}</div>
        </section>
        <section><div class="micro-head"><span>Requirements</span><small>Source-control checks</small></div>
          <div class="checklist">${STARTER_REQUIREMENTS.map(([key,label])=>`<label><input type="checkbox" data-req="${key}" data-app-id="${id}" ${app.requirements[key]?'checked':''}><span>${esc(label)}</span></label>`).join('')}</div>
        </section>
        <section><div class="micro-head"><span>Milestones</span><small>Submission → interview → result</small></div>
          <label class="select-row"><span>Submission</span><select data-app-field="submission" data-app-id="${id}">${['Not started','Preparing','Submitted'].map(v=>`<option ${app.submission===v?'selected':''}>${v}</option>`).join('')}</select></label>
          <label class="select-row"><span>Interview</span><select data-app-field="interview" data-app-id="${id}">${['Not started','Preparing','Scheduled','Completed','Not applicable'].map(v=>`<option ${app.interview===v?'selected':''}>${v}</option>`).join('')}</select></label>
          <label class="select-row"><span>Result</span><select data-app-field="result" data-app-id="${id}">${['Pending','Awarded','Not awarded','Waitlisted'].map(v=>`<option ${app.result===v?'selected':''}>${v}</option>`).join('')}</select></label>
        </section>
      </div>
      <div class="notes-row"><label><span>Notes</span><textarea data-notes="${id}" placeholder="Questions, source details, document issues, interview notes…">${esc(app.notes)}</textarea></label><div><button data-reminder-for="${id}">＋ Reminder</button><button data-compare="${id}">⇄ Compare</button><button class="danger-lite" data-track="${id}">Remove workspace</button></div></div>
    </article>`;
  }).join('');
}

function timelineItems(){
  return state.reminders.map(r=>({...r,dateObj:new Date(r.date+'T00:00:00')})).sort((a,b)=>a.dateObj-b.dateObj);
}
function renderTimeline(){
  const root=$('#timeline');
  const items=timelineItems();
  if(!items.length){
    root.innerHTML='<div class="timeline-empty">No custom reminders yet. Add one for documents, university checks, submission prep, or interviews.</div>';
    return;
  }
  root.innerHTML=items.map((r,i)=>{
    const prev=items[i-1],next=items[i+1];
    const close=[prev,next].filter(Boolean).some(x=>Math.abs((x.dateObj-r.dateObj)/86400000)<=3);
    const a=award(r.awardId);
    return `<div class="timeline-item ${close?'collision':''}"><div class="timeline-date"><b>${esc(fmtDate(r.date))}</b><small>${r.date<todayISO()?'past':'upcoming'}</small></div><div><span>${esc(a?.uni||'General')}</span><strong>${esc(r.label)}</strong><p>${a?esc(a.name):'General Scholarship Studio reminder'}</p></div>${close?'<i>Deadline collision</i>':''}<button data-delete-reminder="${r.id}">×</button></div>`;
  }).join('');
}

function renderCompare(){
  const selected=state.compare.map(award).filter(Boolean);
  $('#compare-heading-count').textContent=selected.length+'/3';
  const root=$('#compare-body');
  if(!selected.length){
    root.innerHTML='<div class="empty"><b>Your comparison is empty.</b><p>Add up to three awards from Discover, Eligibility, or an Application workspace.</p><button data-action-view="discover">Choose scholarships →</button></div>';
    return;
  }
  const rows=[
    ['University',a=>a.uni],
    ['Funding',a=>a.benefit],
    ['Support detail',a=>a.detail],
    ['Deadline behavior',a=>a.deadline],
    ['Language',a=>a.topik],
    ['Academic / renewal',a=>a.gpa],
    ['Renewal',a=>a.renewal],
    ['Selection',a=>a.selection],
    ['Caution',a=>a.notice]
  ];
  root.innerHTML=`<div class="compare-table rich"><table><thead><tr><th>Field</th>${selected.map(a=>`<th><small>${esc(a.uni)}</small><b>${esc(a.name)}</b><button data-remove-compare="${a.id}">×</button></th>`).join('')}</tr></thead><tbody>${rows.map(([label,get])=>`<tr><th>${label}</th>${selected.map(a=>`<td>${esc(get(a))}</td>`).join('')}</tr>`).join('')}<tr><th>Official source</th>${selected.map(a=>`<td><a href="${esc(a.source)}" target="_blank" rel="noopener">Open official source ↗</a></td>`).join('')}</tr></tbody></table></div>`;
}

function renderHistory(){
  const ids=state.compare.length?state.compare:(state.tracked.length?state.tracked:AWARDS.slice(0,5).map(a=>a.id));
  $('#source-history').innerHTML=ids.map(id=>{
    const a=award(id);if(!a)return'';
    return `<article><div><span>${esc(a.uni)}</span><h3>${esc(a.name)}</h3></div><div><small>Source checked</small><b>${SOURCE_CHECKED}</b></div><div><small>Deadline record</small><b>${esc(a.deadline)}</b></div><div class="history-state"><i></i><span>No earlier change recorded in this preview</span></div><a href="${esc(a.source)}" target="_blank" rel="noopener">Source ↗</a></article>`;
  }).join('');
}

function renderAll(){
  renderHero();renderFilters();renderStream();renderCompareTray();renderNavCounts();
  switchView(state.view,false);
}

renderAll();

$('#search').addEventListener('input',e=>{state.query=e.target.value;renderStream();save()});
$('#uni-select').addEventListener('change',e=>{state.uni=e.target.value;renderFilters();renderStream();save()});
$('#funding-filter').addEventListener('change',e=>{state.funding=e.target.value;renderFilters();renderStream();save()});
$('#deadline-filter').addEventListener('change',e=>{state.deadline=e.target.value;renderFilters();renderStream();save()});
$('#reset').addEventListener('click',()=>{state.uni='all';state.query='';state.funding='all';state.deadline='all';renderFilters();renderStream();save()});
$('#signal-filter').addEventListener('click',()=>{state.uni=previewUni;renderFilters();renderStream();$('#stream').scrollIntoView({behavior:'smooth'})});
$('#explore-btn').addEventListener('click',()=>$('#stream').scrollIntoView({behavior:'smooth'}));
$('#profile-btn').addEventListener('click',()=>switchView('eligibility'));

$('#profile-form').addEventListener('submit',e=>{
  e.preventDefault();
  const data=new FormData(e.currentTarget);
  state.profile={...state.profile,...Object.fromEntries(data.entries())};
  state.matchRun=true;
  renderProfile();renderMatches();save();toast('Profile saved and eligibility signals refreshed');
});
$('#clear-profile').addEventListener('click',()=>{
  state.profile={...emptyProfile};state.matchRun=false;fillProfileForm();renderProfile();renderMatches();save();
});
$('#run-match').addEventListener('click',()=>{
  const data=new FormData($('#profile-form'));
  state.profile={...state.profile,...Object.fromEntries(data.entries())};
  state.matchRun=true;renderProfile();renderMatches();save();
});
$('#clear-compare').addEventListener('click',()=>{state.compare=[];renderCompare();renderCompareTray();renderHistory();renderNavCounts();save()});
$('#add-reminder').addEventListener('click',()=>openReminder(''));
$('#reminder-form').addEventListener('submit',e=>{
  e.preventDefault();
  const submitter=e.submitter;
  if(submitter?.value==='cancel')return;
  const data=new FormData(e.currentTarget);
  const label=String(data.get('label')||'').trim(),date=String(data.get('date')||''),awardId=String(data.get('awardId')||'');
  if(!label||!date)return;
  state.reminders.push({id:'r'+Date.now(),label,date,awardId});
  save();renderTimeline();$('#reminder-dialog').close();e.currentTarget.reset();toast('Reminder added');
});

function openReminder(awardId){
  $('#reminder-award').innerHTML='<option value="">General</option>'+state.tracked.map(id=>{const a=award(id);return a?`<option value="${a.id}" ${a.id===awardId?'selected':''}>${esc(a.uni)} · ${esc(a.name)}</option>`:''}).join('');
  $('#reminder-dialog').showModal();
}

document.addEventListener('pointermove',e=>{
  const hero=e.target.closest('.hero');if(!hero)return;
  const r=hero.getBoundingClientRect();
  hero.style.setProperty('--px',((e.clientX-r.left)/r.width*100).toFixed(1)+'%');
  hero.style.setProperty('--py',((e.clientY-r.top)/r.height*100).toFixed(1)+'%');
});
document.addEventListener('pointerover',e=>{
  const b=e.target.closest('[data-hero-uni]');if(b)updateSignal(b.dataset.heroUni);
});

document.addEventListener('change',e=>{
  const doc=e.target.closest('[data-doc]');if(doc){appState(doc.dataset.appId).docs[doc.dataset.doc]=doc.checked;renderApplications();save();return}
  const req=e.target.closest('[data-req]');if(req){appState(req.dataset.appId).requirements[req.dataset.req]=req.checked;renderApplications();save();return}
  const field=e.target.closest('[data-app-field]');if(field){appState(field.dataset.appId)[field.dataset.appField]=field.value;renderApplications();save();return}
});
document.addEventListener('input',e=>{
  const note=e.target.closest('[data-notes]');if(note){appState(note.dataset.notes).notes=note.value;save()}
});

document.addEventListener('click',e=>{
  const nav=e.target.closest('[data-view]');if(nav){switchView(nav.dataset.view);return}
  const act=e.target.closest('[data-action-view]');if(act){switchView(act.dataset.actionView);return}
  const h=e.target.closest('[data-hero-uni]');if(h){state.uni=h.dataset.heroUni;previewUni=h.dataset.heroUni;renderFilters();renderStream();$('#stream').scrollIntoView({behavior:'smooth'});return}
  const f=e.target.closest('[data-filter-uni]');if(f){state.uni=f.dataset.filterUni;renderFilters();renderStream();save();return}
  const ex=e.target.closest('[data-expand]');if(ex){state.expanded=state.expanded===ex.dataset.expand?null:ex.dataset.expand;renderStream();return}
  const tr=e.target.closest('[data-track]');if(tr){trackAward(tr.dataset.track);if(state.view==='eligibility')renderMatches();if(state.view==='applications'){renderApplications();renderTimeline()}return}
  const cp=e.target.closest('[data-compare]');if(cp){toggleCompare(cp.dataset.compare);return}
  const rm=e.target.closest('[data-remove-compare]');if(rm){state.compare=state.compare.filter(x=>x!==rm.dataset.removeCompare);renderStream();renderCompare();renderCompareTray();renderHistory();renderNavCounts();save();return}
  const chk=e.target.closest('[data-check-award]');if(chk){state.matchRun=true;switchView('eligibility');requestAnimationFrame(()=>document.querySelector(`.match-card[data-award="${chk.dataset.checkAward}"]`)?.scrollIntoView({behavior:'smooth'}));return}
  const rem=e.target.closest('[data-reminder-for]');if(rem){openReminder(rem.dataset.reminderFor);return}
  const del=e.target.closest('[data-delete-reminder]');if(del){state.reminders=state.reminders.filter(r=>r.id!==del.dataset.deleteReminder);renderTimeline();save();return}
});
