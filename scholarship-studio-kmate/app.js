'use strict';

const UNIVERSITY = {
  KAIST:{place:'Daejeon'},
  UNIST:{place:'Ulsan'},
  'Korea University':{place:'Seoul'},
  'Ajou University':{place:'Suwon'}
};

const SOURCE_CHECKED = '24 Sep 2026';
const SOURCE_CHECKED_ISO = '2026-09-24';
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


const FINANCE_META = {
  'kaist-ug':{tuitionPct:100,stipendMonthly:350000},
  'unist-ug':{tuitionPct:100,stipendMonthly:0},
  'ku-anam':{tuitionPct:100,stipendMonthly:0},
  'ku-leader-a':{tuitionPct:100,stipendMonthly:0},
  'ku-leader-b':{tuitionPct:50,stipendMonthly:0},
  'ku-stem':{tuitionPct:100,stipendMonthly:0},
  'ajou-frontier':{tuitionPct:100,stipendMonthly:0},
  'ajou-k6':{tuitionPct:100,stipendMonthly:0},
  'ajou-k5':{tuitionPct:70,stipendMonthly:0},
  'ajou-k4':{tuitionPct:50,stipendMonthly:0},
  'ajou-k3':{tuitionPct:30,stipendMonthly:0},
  'ajou-e1':{tuitionPct:100,stipendMonthly:0},
  'ajou-e2':{tuitionPct:70,stipendMonthly:0},
  'ajou-e3':{tuitionPct:50,stipendMonthly:0},
  'ajou-e4':{tuitionPct:30,stipendMonthly:0}
};

const ARCHIVE = [
  {id:'archive-kaist',uni:'KAIST',name:'KAIST scholarship · previous-cycle reference',cycle:'Previous-cycle reference',source:AWARDS[0].source},
  {id:'archive-unist',uni:'UNIST',name:'UNIST tuition scholarship · previous-cycle reference',cycle:'Previous-cycle reference',source:AWARDS[1].source},
  {id:'archive-ku',uni:'Korea University',name:'Korea University scholarship · previous-cycle reference',cycle:'Previous-cycle reference',source:AWARDS[2].source},
  {id:'archive-ajou',uni:'Ajou University',name:'Ajou scholarship · previous-cycle reference',cycle:'Previous-cycle reference',source:AWARDS[6].source}
];

const DOC_LABELS = {
  transcript:'Transcript',
  graduation:'Graduation certificate',
  language:'Language score',
  identity:'Identity / passport',
  recommendation:'Recommendation',
  essay:'Essay / statement',
  specific:'Scholarship-specific evidence'
};

const COMMON_DOC_PLAN = ['transcript','graduation','language','identity'];
const KMATE_BASE = 'https://kmate.vercel.app';

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
  view:'discover',uni:'all',query:'',funding:'all',deadline:'all',expanded:null,
  tracked:[],compare:[],profile:{...emptyProfile},applications:{},reminders:[],matchRun:false,
  watches:[],cycleWatches:[],notifications:[],communityNotes:[],reviews:[],sourceSnapshots:{}
};

try {
  const saved = JSON.parse(localStorage.getItem(STORE)||'{}');
  state = {
    ...state,
    ...saved,
    profile:{...emptyProfile,...(saved.profile||{})},
    applications:saved.applications||{},
    reminders:Array.isArray(saved.reminders)?saved.reminders:[],
    watches:Array.isArray(saved.watches)?saved.watches:[],
    cycleWatches:Array.isArray(saved.cycleWatches)?saved.cycleWatches:[],
    notifications:Array.isArray(saved.notifications)?saved.notifications:[],
    communityNotes:Array.isArray(saved.communityNotes)?saved.communityNotes:[],
    reviews:Array.isArray(saved.reviews)?saved.reviews:[],
    sourceSnapshots:saved.sourceSnapshots||{}
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
      submission:'Not started',interview:'Not started',result:'Pending',notes:'',targetDate:'',generatedPlan:[]
    };
  }
  return state.applications[id];
}

function switchView(view,scroll=true){
  state.view=view;
  $$('.studio-view').forEach(p=>p.classList.toggle('active',p.dataset.viewPanel===view));
  $$('.subnav [data-view]').forEach(b=>b.classList.toggle('active',b.dataset.view===view));
  renderNavCounts();
  if(view==='eligibility'){fillProfileForm();renderProfile();renderMatches();renderGapAnalyzer();renderVault()}
  if(view==='applications'){renderApplications();renderTimeline();renderPathway()}
  if(view==='compare'){renderCompare();renderHistory();renderFundingCalculator()}
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
    const tr=state.tracked.includes(a.id),cmp=state.compare.includes(a.id);
    return `<article class="award ${tr?'tracked':''} ${cmp?'compared':''}" data-award="${a.id}">
      <div class="award-row" data-open-award="${a.id}" role="button" tabindex="0" aria-haspopup="dialog" aria-label="Open ${esc(a.name)} details">
        <div><div class="uni-index">${String(index+1).padStart(2,'0')}</div><div class="uni-name">${esc(a.uni)}</div><div class="degree">${esc(a.degree)}</div><span class="status">Active</span></div>
        <div class="award-main"><div class="type">${esc(a.type)}</div><h3>${esc(a.name)}</h3><p>Deadline · <b style="color:var(--ink)">${esc(a.deadline)}</b></p></div>
        <div class="funding"><div class="col-label">Published funding</div><strong>${esc(a.benefit)}</strong><p>${esc(a.detail)}</p></div>
        <div class="criteria"><div><div class="col-label">Published criteria</div><strong>${esc(a.topik)}</strong><p>${esc(a.gpa)}</p></div></div>
        <button class="expand" data-award-open="${a.id}" aria-label="Open scholarship details">⌄</button>
      </div>
    </article>`;
  }).join('');
}

function syncAwardModal(id){
  const dialog=$('#award-dialog');
  if(!dialog||dialog.dataset.awardId!==id)return;
  const a=award(id);if(!a)return;
  const tracked=state.tracked.includes(id),compared=state.compare.includes(id);
  const track=$('#award-modal-track'),compare=$('#award-modal-compare');
  track.textContent=tracked?'✓ Tracked':'＋ Track';
  track.classList.toggle('active',tracked);
  compare.textContent=compared?'✓ In comparison':'⇄ Compare';
  compare.classList.toggle('active',compared);
}

function openAwardPanel(id){
  const a=award(id),dialog=$('#award-dialog');if(!a||!dialog)return;
  const health=sourceHealth();
  dialog.dataset.awardId=id;
  $('#award-modal-uni').textContent=a.uni;
  $('#award-modal-type').textContent=a.type+' · '+a.degree;
  $('#award-modal-title').textContent=a.name;
  $('#award-modal-deadline').textContent='Deadline · '+a.deadline;
  $('#award-modal-funding').textContent=a.benefit;
  $('#award-modal-funding-detail').textContent=a.detail;
  $('#award-modal-language').textContent=a.topik;
  $('#award-modal-academic').textContent=a.gpa;
  $('#award-modal-renewal').textContent=a.renewal;
  $('#award-modal-health').textContent=health.label+' · source checked '+SOURCE_CHECKED;
  $('#award-modal-selection').textContent=a.selection;
  $('#award-modal-notice').textContent=a.notice;
  $('#award-modal-source').href=a.source;
  syncAwardModal(id);
  if(!dialog.open)dialog.showModal();
  document.body.classList.add('award-panel-open');
  requestAnimationFrame(()=>$('#award-modal-close')?.focus({preventScroll:true}));
}

function closeAwardPanel(){
  const dialog=$('#award-dialog');
  if(dialog?.open)dialog.close();
  document.body.classList.remove('award-panel-open');
}

function trackAward(id){
  const adding=!state.tracked.includes(id);
  state.tracked=adding?[...state.tracked,id]:state.tracked.filter(x=>x!==id);
  if(adding)appState(id);
  renderStream();renderCompareTray();renderNavCounts();save();syncAwardModal(id);
  toast(adding?'Saved to Applications':'Removed from active Applications');
}

function toggleCompare(id){
  if(state.compare.includes(id))state.compare=state.compare.filter(x=>x!==id);
  else if(state.compare.length<3)state.compare=[...state.compare,id];
  else return toast('Comparison is limited to 3 awards');
  renderStream();renderCompareTray();renderNavCounts();save();syncAwardModal(id);
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
    root.innerHTML='<div class="empty"><b>No application workspaces yet.</b><p>Track a scholarship from Discover or Eligibility. Its own checklist, notes, stages, handoffs and reminders will appear here.</p><button data-action-view="discover">Browse scholarships →</button></div>';
    return;
  }
  root.innerHTML=ids.map(id=>{
    const a=award(id),app=appState(id),pct=applicationProgress(app);
    const reminderCount=state.reminders.filter(r=>r.awardId===id).length;
    const reviewRequests=state.reviews.filter(r=>r.awardId===id);
    return `<article class="application-card" data-app="${id}">
      <div class="app-head">
        <div><span>${esc(a.uni)}</span><h2>${esc(a.name)}</h2><p>${esc(a.benefit)} · ${esc(a.deadline)}</p></div>
        <div class="app-progress"><strong>${pct}%</strong><div><i style="width:${pct}%"></i></div><small>workspace progress</small></div>
      </div>
      <div class="app-stage-row">
        <label><span>Stage</span><select data-app-field="stage" data-app-id="${id}">${['Researching','Preparing documents','Ready to submit','Submitted','Interview','Result'].map(v=>`<option ${app.stage===v?'selected':''}>${v}</option>`).join('')}</select></label>
        <label><span>Target submission</span><input type="date" data-target-date="${id}" value="${esc(app.targetDate||'')}"></label>
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
      <div class="handoff-row">
        <div><span>KMate handoffs</span><p>Carry this application context into writing guidance, interview preparation, or a peer-review checklist.</p></div>
        <div><a href="${KMATE_BASE}/gks" target="_blank" rel="noopener">Open GKS Assistant ↗</a><a href="${KMATE_BASE}/interview-db" target="_blank" rel="noopener">Interview DB ↗</a><button data-review-for="${id}">＋ Peer review request</button></div>
      </div>
      ${reviewRequests.length?`<div class="review-requests">${reviewRequests.map(r=>`<article><span>${esc(r.artifact)}</span><p>${esc(r.focus)}</p><small>Local review request · ${new Date(r.created).toLocaleString()}</small><button data-delete-review="${r.id}">×</button></article>`).join('')}</div>`:''}
      <div class="notes-row"><label><span>Notes</span><textarea data-notes="${id}" placeholder="Questions, source details, document issues, interview notes…">${esc(app.notes)}</textarea></label><div><button data-reminder-for="${id}">＋ Reminder</button><button data-compare="${id}">⇄ Compare</button><button data-assistant-for="${id}">Ask scholarship</button><button class="danger-lite" data-track="${id}">Remove workspace</button></div></div>
    </article>`;
  }).join('');
}

function timelineItems(){
  const manual=state.reminders.map(r=>({...r,dateObj:new Date(r.date+'T00:00:00'),auto:false}));
  const auto=allPathwayTasks().map(r=>({...r,dateObj:new Date(r.date+'T00:00:00'),auto:true}));
  return [...manual,...auto].sort((a,b)=>a.dateObj-b.dateObj);
}
function renderTimeline(){
  const root=$('#timeline');
  const items=timelineItems();
  if(!items.length){
    root.innerHTML='<div class="timeline-empty">No timeline items yet. Add a reminder or set a target submission date to generate application tasks automatically.</div>';
    return;
  }
  root.innerHTML=items.map((r,i)=>{
    const prev=items[i-1],next=items[i+1];
    const close=[prev,next].filter(Boolean).some(x=>Math.abs((x.dateObj-r.dateObj)/86400000)<=3);
    const a=award(r.awardId);
    return `<div class="timeline-item ${close?'collision':''} ${r.auto?'auto':''}"><div class="timeline-date"><b>${esc(fmtDate(r.date))}</b><small>${r.date<todayISO()?'past':'upcoming'} · ${r.auto?'auto plan':'reminder'}</small></div><div><span>${esc(a?.uni||'General')}</span><strong>${esc(r.label)}</strong><p>${a?esc(a.name):'General Scholarship Studio reminder'}</p></div>${close?'<i>Deadline collision</i>':''}${r.auto?'<span class="auto-badge">Auto</span>':`<button data-delete-reminder="${r.id}">×</button>`}</div>`;
  }).join('');
  const upcoming=items.filter(x=>x.date>=todayISO()&&((new Date(x.date+'T00:00:00')-new Date())/86400000)<=7);
  if(upcoming.length)addNotification('Upcoming scholarship tasks',`${upcoming.length} timeline item${upcoming.length===1?' is':'s are'} due within 7 days.`,'deadline');
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
  const health=sourceHealth();
  $('#source-history').innerHTML=ids.map(id=>{
    const a=award(id);if(!a)return'';
    const snaps=state.sourceSnapshots[id]||[];
    const last=snaps[0];
    const previous=snaps[1];
    const changed=last&&previous&&(last.deadline!==previous.deadline||last.benefit!==previous.benefit||last.language!==previous.language);
    return `<article>
      <div><span>${esc(a.uni)}</span><h3>${esc(a.name)}</h3></div>
      <div><small>Source checked</small><b>${SOURCE_CHECKED}</b></div>
      <div><small>Source health</small><b class="health-${health.className}">${health.label} · ${health.days}d</b></div>
      <div class="history-state"><i class="${changed?'changed':''}"></i><span>${changed?'Local snapshot difference detected':snaps.length?snaps.length+' local verification snapshot'+(snaps.length===1?'':'s'):'No local verification snapshot yet'}</span></div>
      <div><small>Deadline record</small><b>${esc(a.deadline)}</b></div>
      <a href="${esc(a.source)}" target="_blank" rel="noopener">Source ↗</a>
    </article>`;
  }).join('');
}

function daysSince(iso){
  const d=new Date(iso+'T00:00:00');
  return Math.max(0,Math.floor((Date.now()-d.getTime())/86400000));
}
function sourceHealth(){
  const days=daysSince(SOURCE_CHECKED_ISO);
  return days<=14?{label:'Fresh',className:'fresh',days}:days<=30?{label:'Recheck soon',className:'aging',days}:{label:'Stale',className:'stale',days};
}
function addNotification(title,body,kind='info'){
  const duplicate=state.notifications.find(n=>n.title===title&&n.body===body&&!n.read);
  if(duplicate)return;
  state.notifications.unshift({id:'n'+Date.now()+Math.random().toString(36).slice(2,6),title,body,kind,read:false,created:new Date().toISOString()});
  state.notifications=state.notifications.slice(0,30);
  renderNotifications();save();
}
function renderNotifications(){
  const unread=state.notifications.filter(n=>!n.read).length;
  $('#notification-count').textContent=unread;
  const root=$('#notification-list');
  if(!root)return;
  root.innerHTML=state.notifications.length?state.notifications.map(n=>`<article class="notice-item ${n.read?'read':''} ${n.kind}"><div><span>${esc(n.kind)}</span><h3>${esc(n.title)}</h3><p>${esc(n.body)}</p></div><small>${new Date(n.created).toLocaleString()}</small></article>`).join(''):'<div class="empty"><b>No alerts yet.</b><p>Saved searches, Cycle Watch, reminders and source-health notices will appear here.</p></div>';
}
function relevanceScore(a){
  let score=0,reasons=[];
  if(state.profile.degree&&a.degree===state.profile.degree){score+=2;reasons.push('degree')}
  if(state.profile.major){
    if(a.major==='STEM'&&majorLooksStem(state.profile.major)){score+=2;reasons.push('STEM route')}
    else if(a.major==='Business Administration'&&majorLooksBusiness(state.profile.major)){score+=2;reasons.push('major')}
    else if(!a.major){score+=1}
  }
  if(a.minTopik&&state.profile.topik&&Number(state.profile.topik)>=a.minTopik){score+=2;reasons.push('TOPIK')}
  if(a.minIelts&&state.profile.ielts&&Number(state.profile.ielts)>=a.minIelts){score+=2;reasons.push('IELTS')}
  if(state.profile.funding==='full'&&(a.funding==='full'||a.funding==='living')){score+=2;reasons.push('funding preference')}
  if(state.profile.funding==='living'&&a.funding==='living'){score+=3;reasons.push('living support')}
  return {score,reasons};
}
function renderRadar(){
  const root=$('#radar-content');if(!root)return;
  const pct=profileCompletion();
  if(pct<35){
    root.innerHTML='<div class="radar-empty"><b>Build your profile to personalize the radar.</b><p>Degree, major and at least one language/funding preference make this useful.</p><button data-action-view="eligibility">Complete profile →</button></div>';
    renderSavedWatches();return;
  }
  const rows=AWARDS.map(a=>({a,...relevanceScore(a)})).sort((x,y)=>y.score-x.score).slice(0,4);
  root.innerHTML=rows.map(({a,score,reasons})=>`<button class="radar-hit" data-radar-award="${a.id}"><span>${esc(a.uni)}</span><strong>${esc(a.name)}</strong><small>${score?esc(reasons.join(' · ')):'Needs source review'}</small><i>↗</i></button>`).join('');
  renderSavedWatches();
}
function watchLabel(w){
  const parts=[];
  if(w.uni!=='all')parts.push(w.uni);
  if(w.funding!=='all')parts.push(w.funding==='full'?'full tuition':'partial tuition');
  if(w.query)parts.push('“'+w.query+'”');
  return parts.length?parts.join(' · '):'All scholarships';
}
function renderSavedWatches(){
  const root=$('#saved-watches');if(!root)return;
  root.innerHTML=state.watches.length?state.watches.map(w=>`<div><span>${esc(watchLabel(w))}</span><button data-delete-watch="${w.id}">×</button></div>`).join(''):'<p>No saved searches yet.</p>';
}
function saveCurrentWatch(){
  const spec={uni:state.uni,funding:state.funding,query:state.query.trim(),deadline:state.deadline};
  const key=JSON.stringify(spec);
  if(state.watches.some(w=>JSON.stringify({uni:w.uni,funding:w.funding,query:w.query,deadline:w.deadline})===key))return toast('That search is already being watched');
  const w={id:'w'+Date.now(),...spec,created:new Date().toISOString()};
  state.watches.push(w);renderSavedWatches();save();
  const old={uni:state.uni,funding:state.funding,query:state.query,deadline:state.deadline};
  const matches=AWARDS.filter(a=>{
    if(w.uni!=='all'&&a.uni!==w.uni)return false;
    if(w.funding==='full'&&a.funding!=='full'&&a.funding!=='living')return false;
    if(w.funding==='partial'&&a.funding!=='partial')return false;
    if(w.deadline!=='all'&&a.deadlineKind!==w.deadline)return false;
    if(w.query&&!Object.values(a).some(v=>String(v).toLowerCase().includes(w.query.toLowerCase())))return false;
    return true;
  }).length;
  addNotification('Saved search watch created',`${watchLabel(w)} currently matches ${matches} preview award${matches===1?'':'s'}.`,'watch');
}
function renderArchive(){
  const root=$('#archive-list');if(!root)return;
  root.innerHTML=ARCHIVE.map(a=>`<article><div><span>${esc(a.cycle)}</span><h3>${esc(a.name)}</h3><p>Historical reference surface only. Re-check the future cycle before relying on prior terms.</p></div><div class="archive-actions"><button class="${state.cycleWatches.includes(a.id)?'active':''}" data-cycle-watch="${a.id}">${state.cycleWatches.includes(a.id)?'✓ Watching next cycle':'◌ Watch next cycle'}</button><a href="${esc(a.source)}" target="_blank" rel="noopener">Source ↗</a></div></article>`).join('');
}
function renderCommunity(){
  const root=$('#community-list');if(!root)return;
  root.innerHTML=state.communityNotes.length?state.communityNotes.map(n=>{const a=award(n.awardId);return `<article><div><span>Community note · ${esc(a?.uni||'General')}</span><p>${esc(n.note)}</p><small>${new Date(n.created).toLocaleString()}</small></div><button data-delete-community="${n.id}">×</button></article>`}).join(''):'<div class="empty"><b>No applicant notes in this browser yet.</b><p>Add process observations here. Official rules stay separate in the scholarship record.</p></div>';
}
function renderGapAnalyzer(){
  const root=$('#gap-results');if(!root)return;
  if(!state.matchRun){root.innerHTML='<div class="empty"><b>Run eligibility first.</b><p>The Gap Analyzer turns review/missing criteria into a practical action list.</p></div>';return}
  const candidates=AWARDS.map(a=>({a,e:evaluateAward(a),r:relevanceScore(a)})).sort((x,y)=>y.r.score-x.r.score);
  const actions=[];
  for(const {a,e} of candidates){
    for(const check of e.checks.filter(c=>c.result!=='ok')){
      const key=a.id+'|'+check.label;
      if(actions.some(x=>x.key===key))continue;
      const action=check.result==='bad'
        ?`Published ${check.label.toLowerCase()} criterion is not met for this tier. Consider a different tier or update the relevant qualification before relying on this award.`
        :`Verify or complete: ${check.detail}`;
      actions.push({key,a,label:check.label,result:check.result,action});
      if(actions.length>=8)break;
    }
    if(actions.length>=8)break;
  }
  root.innerHTML=actions.length?actions.map((x,i)=>`<article class="${x.result}"><span>${String(i+1).padStart(2,'0')}</span><div><small>${esc(x.a.uni)} · ${esc(x.a.name)}</small><h3>${esc(x.label)}</h3><p>${esc(x.action)}</p></div><button data-gap-award="${x.a.id}">Open award ↗</button></article>`).join(''):'<div class="empty"><b>No structured gaps detected in the current preview checks.</b><p>Still confirm every intake-specific official source before applying.</p></div>';
}

const VAULT_DB='kmate-scholarship-vault-preview';
function openVaultDB(){
  return new Promise((resolve,reject)=>{
    const req=indexedDB.open(VAULT_DB,1);
    req.onupgradeneeded=()=>{const db=req.result;if(!db.objectStoreNames.contains('files'))db.createObjectStore('files',{keyPath:'id'})};
    req.onsuccess=()=>resolve(req.result);req.onerror=()=>reject(req.error);
  });
}
async function vaultAll(){
  const db=await openVaultDB();
  return new Promise((resolve,reject)=>{
    const tx=db.transaction('files','readonly');const req=tx.objectStore('files').getAll();
    req.onsuccess=()=>resolve(req.result||[]);req.onerror=()=>reject(req.error);
  });
}
async function vaultGet(id){
  const db=await openVaultDB();
  return new Promise((resolve,reject)=>{
    const tx=db.transaction('files','readonly');const req=tx.objectStore('files').get(id);
    req.onsuccess=()=>resolve(req.result||null);req.onerror=()=>reject(req.error);
  });
}
async function vaultPut(record){
  const db=await openVaultDB();
  return new Promise((resolve,reject)=>{
    const tx=db.transaction('files','readwrite');tx.objectStore('files').put(record);
    tx.oncomplete=resolve;tx.onerror=()=>reject(tx.error);
  });
}
async function vaultRemove(id){
  const db=await openVaultDB();
  return new Promise((resolve,reject)=>{
    const tx=db.transaction('files','readwrite');tx.objectStore('files').delete(id);
    tx.oncomplete=resolve;tx.onerror=()=>reject(tx.error);
  });
}
async function renderVault(){
  if(!$('#vault-files'))return;
  const files=await vaultAll();
  $('#vault-count').textContent=files.length;
  $('#vault-files').innerHTML=files.length?files.map(file=>`<article><div><span>${esc(DOC_LABELS[file.type]||file.type)}</span><h3>${esc(file.name)}</h3><p>${Math.ceil(file.size/1024)} KB${file.date?' · '+esc(fmtDate(file.date)):''}${file.notes?' · '+esc(file.notes):''}</p></div><div><button data-vault-download="${file.id}">Download</button><button data-vault-delete="${file.id}">Delete</button></div></article>`).join(''):'<div class="empty"><b>Your browser vault is empty.</b><p>Add a document above. The file is stored in IndexedDB on this device only.</p></div>';
  renderCompatibility(files);
}
function renderCompatibility(files){
  const root=$('#compatibility-matrix');if(!root)return;
  const have=new Set(files.map(f=>f.type));
  const ids=state.tracked.length?state.tracked:AWARDS.slice(0,6).map(a=>a.id);
  const rows=COMMON_DOC_PLAN.map(type=>[type,DOC_LABELS[type]]);
  root.innerHTML=`<div class="compat-table"><table><thead><tr><th>Evidence</th>${ids.map(id=>{const a=award(id);return a?`<th><small>${esc(a.uni)}</small><b>${esc(a.name)}</b></th>`:''}).join('')}</tr></thead><tbody>${rows.map(([type,label])=>`<tr><th>${esc(label)}<small>${have.has(type)?'Saved in vault':'Missing from vault'}</small></th>${ids.map(id=>`<td><span class="${have.has(type)?'ready':'missing'}">${have.has(type)?'Reusable file available':'Add / verify'}</span></td>`).join('')}</tr>`).join('')}</tbody></table></div>`;
}

function planTasksFor(id){
  const a=award(id),app=appState(id);if(!a||!app.targetDate)return[];
  const end=new Date(app.targetDate+'T00:00:00');
  if(Number.isNaN(end.getTime()))return[];
  const defs=[[-28,'Review official source & criteria'],[-21,'Lock reusable document set'],[-14,'Finish scholarship-specific writing/evidence'],[-7,'Final document verification'],[-2,'Portal-ready application review'],[0,'Target submission']];
  return defs.map(([offset,label])=>{const d=new Date(end);d.setDate(d.getDate()+offset);return{id:id+'-'+offset,awardId:id,label,date:d.toISOString().slice(0,10),auto:true}});
}
function allPathwayTasks(){return state.tracked.flatMap(planTasksFor).sort((a,b)=>a.date.localeCompare(b.date))}
function renderPathway(){
  const root=$('#pathway-content');if(!root)return;
  const tasks=allPathwayTasks();
  if(!state.tracked.length){root.innerHTML='<div class="empty"><b>Track scholarships to build a pathway.</b><p>The combined plan will show reusable work and target-date tasks across applications.</p></div>';return}
  const reusable=STARTER_DOCS.filter(([key])=>state.tracked.every(id=>appState(id).docs[key])).length;
  const unresolved=state.tracked.reduce((sum,id)=>sum+Object.values(appState(id).requirements).filter(v=>!v).length,0);
  root.innerHTML=`<div class="pathway-summary"><div><span>Tracked</span><b>${state.tracked.length}</b></div><div><span>Docs completed across all</span><b>${reusable}/${STARTER_DOCS.length}</b></div><div><span>Unresolved source checks</span><b>${unresolved}</b></div><div><span>Generated tasks</span><b>${tasks.length}</b></div></div>`+(tasks.length?`<div class="pathway-list">${tasks.map(t=>{const a=award(t.awardId);return `<article><time>${esc(fmtDate(t.date))}</time><div><span>${esc(a?.uni||'')}</span><b>${esc(t.label)}</b><small>${esc(a?.name||'')}</small></div></article>`}).join('')}</div>`:'<div class="timeline-empty">Set a target submission date inside each application workspace, then generate the pathway.</div>');
}
function downloadBlob(name,type,content){
  const blob=content instanceof Blob?content:new Blob([content],{type});
  const url=URL.createObjectURL(blob);const a=document.createElement('a');a.href=url;a.download=name;document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),500);
}
function exportCalendar(){
  const items=[...state.reminders.map(r=>({date:r.date,label:r.label,awardId:r.awardId})),...allPathwayTasks()];
  if(!items.length)return toast('Add reminders or target submission dates first');
  const escIcs=s=>String(s||'').replace(/\\/g,'\\\\').replace(/,/g,'\\,').replace(/;/g,'\\;').replace(/\n/g,'\\n');
  const lines=['BEGIN:VCALENDAR','VERSION:2.0','PRODID:-//KMate//Scholarship Studio Preview//EN'];
  items.forEach((item,i)=>{const a=award(item.awardId);const date=item.date.replaceAll('-','');lines.push('BEGIN:VEVENT','UID:kmate-'+Date.now()+'-'+i+'@preview','DTSTART;VALUE=DATE:'+date,'SUMMARY:'+escIcs(item.label+(a?' · '+a.uni:'')),'DESCRIPTION:'+escIcs(a?.name||'Scholarship Studio reminder'),'END:VEVENT')});
  lines.push('END:VCALENDAR');downloadBlob('kmate-scholarship-calendar.ics','text/calendar',lines.join('\r\n'));toast('Calendar exported');
}
async function exportWorkspace(){
  const files=await vaultAll();
  const manifest=files.map(({bytes,...meta})=>meta);
  downloadBlob('kmate-scholarship-workspace.json','application/json',JSON.stringify({version:1,exportedAt:new Date().toISOString(),state,vaultManifest:manifest},null,2));
}
function renderFundingCalculator(){
  const root=$('#funding-results');if(!root)return;
  const ids=state.compare.length?state.compare:state.tracked.slice(0,3);
  if(!ids.length){root.innerHTML='<div class="empty"><b>Select scholarships to calculate funding gaps.</b><p>Add awards to Compare or track them first.</p></div>';return}
  const tuition=Number($('#calc-tuition')?.value||0),living=Number($('#calc-living')?.value||0),months=Number($('#calc-months')?.value||12),one=Number($('#calc-onetime')?.value||0);
  root.innerHTML=ids.map(id=>{const a=award(id),m=FINANCE_META[id]||{tuitionPct:0,stipendMonthly:0};const base=tuition+living*months+one;const support=tuition*(m.tuitionPct/100)+m.stipendMonthly*months;const gap=Math.max(0,base-support);return `<article><span>${esc(a.uni)}</span><h3>${esc(a.name)}</h3><div><p>Assumed annual cost <b>₩${Math.round(base).toLocaleString()}</b></p><p>Modeled support <b>₩${Math.round(support).toLocaleString()}</b></p><p class="gap">Estimated gap <b>₩${Math.round(gap).toLocaleString()}</b></p></div><small>Uses your assumptions + structured preview tuition/stipend fields only.</small></article>`}).join('');
}

function answerAssistant(){
  const id=$('#assistant-award').value,q=$('#assistant-question').value.trim().toLowerCase(),a=award(id),root=$('#assistant-answer');
  if(!a){root.innerHTML='<p>Select a scholarship.</p>';return}
  let label='Source-record summary',answer=`${a.benefit}. Deadline behavior: ${a.deadline}. Published language field: ${a.topik}.`;
  if(/deadline|date|when/.test(q)){label='Deadline';answer=a.deadline}
  else if(/topik|ielts|toefl|language|english|korean/.test(q)){label='Language';answer=a.topik}
  else if(/gpa|grade|academic|score/.test(q)){label='Academic';answer=a.gpa}
  else if(/fund|tuition|stipend|money|allowance|benefit/.test(q)){label='Funding';answer=a.benefit+' · '+a.detail}
  else if(/renew|continue/.test(q)){label='Renewal';answer=a.renewal}
  else if(/select|choose|evaluation|chance|probability/.test(q)){label='Selection';answer=a.selection+' Scholarship Studio does not estimate selection probability.'}
  else if(/document|certificate|evidence/.test(q)){label='Documents';answer='This preview record does not encode a complete official document list. Use the official source and the Vault compatibility matrix only as planning support.'}
  root.innerHTML=`<span>${esc(label)}</span><p>${esc(answer)}</p><a href="${esc(a.source)}" target="_blank" rel="noopener">Open official source ↗</a>`;
}

function snapshotSources(){
  const now=new Date().toISOString();
  AWARDS.forEach(a=>{
    const list=state.sourceSnapshots[a.id]||[];
    const snap={id:'s'+Date.now()+Math.random().toString(36).slice(2,5),capturedAt:now,deadline:a.deadline,benefit:a.benefit,language:a.topik,source:a.source};
    const last=list[0];
    const changed=last&&(last.deadline!==snap.deadline||last.benefit!==snap.benefit||last.language!==snap.language);
    state.sourceSnapshots[a.id]=[snap,...list].slice(0,10);
    if(changed)addNotification('Scholarship source snapshot changed',a.uni+' · '+a.name+' differs from the previous locally recorded snapshot.','source');
  });
  save();renderHistory();toast('Local source snapshots refreshed');
}


function populateGlobalSelectors(){
  const options=AWARDS.map(a=>`<option value="${a.id}">${esc(a.uni)} · ${esc(a.name)}</option>`).join('');
  if($('#assistant-award'))$('#assistant-award').innerHTML=options;
  if($('#community-award'))$('#community-award').innerHTML='<option value="">General</option>'+options;
}
function openAssistant(id){
  populateGlobalSelectors();
  if(id&&award(id))$('#assistant-award').value=id;
  $('#assistant-question').value='';
  $('#assistant-answer').innerHTML='<p>Answers use only the structured preview record and its official-source link.</p>';
  $('#assistant-dialog').showModal();
}

function renderAll(){
  populateGlobalSelectors();renderHero();renderFilters();renderStream();renderCompareTray();renderNavCounts();renderRadar();renderArchive();renderCommunity();renderNotifications();
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

$('#award-modal-close').addEventListener('click',closeAwardPanel);
$('#award-dialog').addEventListener('click',e=>{if(e.target===$('#award-dialog'))closeAwardPanel()});
$('#award-dialog').addEventListener('close',()=>document.body.classList.remove('award-panel-open'));
$('#award-modal-track').addEventListener('click',()=>{const id=$('#award-dialog').dataset.awardId;if(id)trackAward(id)});
$('#award-modal-compare').addEventListener('click',()=>{const id=$('#award-dialog').dataset.awardId;if(id)toggleCompare(id)});
$('#award-modal-eligibility').addEventListener('click',()=>{const id=$('#award-dialog').dataset.awardId;closeAwardPanel();state.matchRun=true;switchView('eligibility');requestAnimationFrame(()=>document.querySelector('.match-card[data-award="'+id+'"]')?.scrollIntoView({behavior:'smooth',block:'center'}))});
$('#award-modal-assistant').addEventListener('click',()=>{const id=$('#award-dialog').dataset.awardId;closeAwardPanel();if(id)openAssistant(id)});

$('#profile-form').addEventListener('submit',e=>{
  e.preventDefault();
  const data=new FormData(e.currentTarget);
  state.profile={...state.profile,...Object.fromEntries(data.entries())};
  state.matchRun=true;
  renderProfile();renderMatches();renderGapAnalyzer();renderRadar();save();toast('Profile saved and eligibility signals refreshed');
});
$('#clear-profile').addEventListener('click',()=>{
  state.profile={...emptyProfile};state.matchRun=false;fillProfileForm();renderProfile();renderMatches();renderGapAnalyzer();renderRadar();save();
});
$('#run-match').addEventListener('click',()=>{
  const data=new FormData($('#profile-form'));
  state.profile={...state.profile,...Object.fromEntries(data.entries())};
  state.matchRun=true;renderProfile();renderMatches();renderGapAnalyzer();renderRadar();save();
});
$('#clear-compare').addEventListener('click',()=>{state.compare=[];renderCompare();renderCompareTray();renderHistory();renderNavCounts();save()});

$('#radar-profile').addEventListener('click',()=>switchView('eligibility'));
$('#save-search-watch').addEventListener('click',saveCurrentWatch);
$('#add-community-note').addEventListener('click',()=>{populateGlobalSelectors();$('#community-dialog').showModal()});
$('#notification-button').addEventListener('click',()=>{renderNotifications();$('#notification-dialog').showModal()});
$('#close-notifications').addEventListener('click',()=>$('#notification-dialog').close());
$('#mark-notifications-read').addEventListener('click',()=>{state.notifications.forEach(n=>n.read=true);renderNotifications();save()});
$('#assistant-button').addEventListener('click',()=>openAssistant(state.compare[0]||state.tracked[0]||AWARDS[0].id));
$('#assistant-ask').addEventListener('click',answerAssistant);
$('#generate-pathway').addEventListener('click',()=>{renderPathway();renderTimeline();toast('Combined pathway refreshed')});
$('#export-calendar').addEventListener('click',exportCalendar);
$('#export-workspace').addEventListener('click',exportWorkspace);
$('#refresh-source-health').addEventListener('click',snapshotSources);
['#calc-tuition','#calc-living','#calc-months','#calc-onetime'].forEach(sel=>$(sel)?.addEventListener('input',renderFundingCalculator));

$('#vault-form').addEventListener('submit',async e=>{
  e.preventDefault();
  const form=e.currentTarget;
  const data=new FormData(form),file=data.get('file');
  if(!file||typeof file.arrayBuffer!=='function'||!Number(file.size)){toast('Choose a file first');return}
  if(file.size>15*1024*1024)return toast('Preview vault limit: 15 MB per file');
  try{
    const bytes=await file.arrayBuffer();
    const record={id:'v'+Date.now(),type:String(data.get('type')||'specific'),name:String(file.name||'document'),size:Number(file.size||bytes.byteLength),mime:String(file.type||'application/octet-stream'),date:String(data.get('date')||''),notes:String(data.get('notes')||''),savedAt:new Date().toISOString(),bytes};
    await vaultPut(record);
    form.reset();
    await renderVault();
    toast('Document saved in browser vault');
  }catch(err){
    console.error('Vault save failed',err);
    $('#vault-files').innerHTML='<div class="empty"><b>Vault write failed in this browser.</b><p>'+esc(err?.message||String(err))+'</p></div>';
    toast('Vault write failed');
  }
});

$('#community-form').addEventListener('submit',e=>{
  e.preventDefault();if(e.submitter?.value==='cancel')return;
  const data=new FormData(e.currentTarget),note=String(data.get('note')||'').trim();if(!note)return;
  state.communityNotes.unshift({id:'c'+Date.now(),awardId:String(data.get('awardId')||''),note,created:new Date().toISOString()});
  save();renderCommunity();$('#community-dialog').close();e.currentTarget.reset();toast('Community note saved locally');
});

$('#review-form').addEventListener('submit',e=>{
  e.preventDefault();if(e.submitter?.value==='cancel')return;
  const data=new FormData(e.currentTarget),focus=String(data.get('focus')||'').trim();if(!focus)return;
  state.reviews.unshift({id:'rv'+Date.now(),awardId:String(data.get('awardId')||''),artifact:String(data.get('artifact')||''),focus,created:new Date().toISOString()});
  save();renderApplications();$('#review-dialog').close();e.currentTarget.reset();toast('Review request checklist created');
});

$('#import-workspace').addEventListener('change',async e=>{
  const file=e.target.files?.[0];if(!file)return;
  try{
    const parsed=JSON.parse(await file.text());
    if(!parsed||typeof parsed.state!=='object')throw new Error('Invalid workspace file');
    state={...state,...parsed.state,profile:{...emptyProfile,...(parsed.state.profile||{})},applications:parsed.state.applications||{}};
    state.compare=(state.compare||[]).slice(0,3);state.tracked=Array.isArray(state.tracked)?state.tracked:[];
    save();renderAll();toast('Workspace imported. Vault files are not embedded in JSON backups.');
  }catch(err){toast('Could not import that workspace file')}
  e.target.value='';
});

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


document.addEventListener('keydown',e=>{
  const row=e.target.closest?.('[data-open-award]');
  if(!row)return;
  if(e.key==='Enter'||e.key===' '){
    e.preventDefault();
    openAwardPanel(row.dataset.openAward);
  }
});

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
  const field=e.target.closest('[data-app-field]');if(field){appState(field.dataset.appId)[field.dataset.appField]=field.value;renderApplications();renderPathway();renderTimeline();save();return}
  const target=e.target.closest('[data-target-date]');if(target){appState(target.dataset.targetDate).targetDate=target.value;renderApplications();renderPathway();renderTimeline();save();return}
});
document.addEventListener('input',e=>{
  const note=e.target.closest('[data-notes]');if(note){appState(note.dataset.notes).notes=note.value;save()}
});

document.addEventListener('click',e=>{
  const nav=e.target.closest('[data-view]');if(nav){switchView(nav.dataset.view);return}
  const act=e.target.closest('[data-action-view]');if(act){switchView(act.dataset.actionView);return}
  const h=e.target.closest('[data-hero-uni]');if(h){state.uni=h.dataset.heroUni;previewUni=h.dataset.heroUni;renderFilters();renderStream();$('#stream').scrollIntoView({behavior:'smooth'});return}
  const f=e.target.closest('[data-filter-uni]');if(f){state.uni=f.dataset.filterUni;renderFilters();renderStream();save();return}
  const openButton=e.target.closest('[data-award-open]');if(openButton){openAwardPanel(openButton.dataset.awardOpen);return}
  const row=e.target.closest('[data-open-award]');if(row){openAwardPanel(row.dataset.openAward);return}
  const tr=e.target.closest('[data-track]');if(tr){trackAward(tr.dataset.track);if(state.view==='eligibility')renderMatches();if(state.view==='applications'){renderApplications();renderTimeline()}return}
  const cp=e.target.closest('[data-compare]');if(cp){toggleCompare(cp.dataset.compare);return}
  const rm=e.target.closest('[data-remove-compare]');if(rm){state.compare=state.compare.filter(x=>x!==rm.dataset.removeCompare);renderStream();renderCompare();renderCompareTray();renderHistory();renderNavCounts();save();return}
  const chk=e.target.closest('[data-check-award]');if(chk){state.matchRun=true;switchView('eligibility');requestAnimationFrame(()=>document.querySelector(`.match-card[data-award="${chk.dataset.checkAward}"]`)?.scrollIntoView({behavior:'smooth'}));return}
  const rem=e.target.closest('[data-reminder-for]');if(rem){openReminder(rem.dataset.reminderFor);return}
  const del=e.target.closest('[data-delete-reminder]');if(del){state.reminders=state.reminders.filter(r=>r.id!==del.dataset.deleteReminder);renderTimeline();save();return}

  const radar=e.target.closest('[data-radar-award]');if(radar){switchView('discover');requestAnimationFrame(()=>openAwardPanel(radar.dataset.radarAward));return}
  const dw=e.target.closest('[data-delete-watch]');if(dw){state.watches=state.watches.filter(w=>w.id!==dw.dataset.deleteWatch);renderSavedWatches();save();return}
  const cw=e.target.closest('[data-cycle-watch]');if(cw){const id=cw.dataset.cycleWatch,adding=!state.cycleWatches.includes(id);state.cycleWatches=adding?[...state.cycleWatches,id]:state.cycleWatches.filter(x=>x!==id);renderArchive();save();if(adding)addNotification('Cycle Watch enabled',(ARCHIVE.find(a=>a.id===id)?.name||'Archived scholarship')+' is now on your future-cycle watchlist.','cycle');return}
  const dc=e.target.closest('[data-delete-community]');if(dc){state.communityNotes=state.communityNotes.filter(n=>n.id!==dc.dataset.deleteCommunity);renderCommunity();save();return}
  const gap=e.target.closest('[data-gap-award]');if(gap){switchView('discover');requestAnimationFrame(()=>openAwardPanel(gap.dataset.gapAward));return}
  const assist=e.target.closest('[data-assistant-for]');if(assist){openAssistant(assist.dataset.assistantFor);return}
  const review=e.target.closest('[data-review-for]');if(review){$('#review-award-id').value=review.dataset.reviewFor;$('#review-dialog').showModal();return}
  const delReview=e.target.closest('[data-delete-review]');if(delReview){state.reviews=state.reviews.filter(r=>r.id!==delReview.dataset.deleteReview);renderApplications();save();return}
  const vd=e.target.closest('[data-vault-delete]');if(vd){vaultRemove(vd.dataset.vaultDelete).then(renderVault);return}
  const vdl=e.target.closest('[data-vault-download]');if(vdl){vaultGet(vdl.dataset.vaultDownload).then(file=>{if(file?.bytes)downloadBlob(file.name,file.mime||'application/octet-stream',new Blob([file.bytes],{type:file.mime||'application/octet-stream'}))});return}
});
