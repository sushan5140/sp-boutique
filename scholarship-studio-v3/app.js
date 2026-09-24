
'use strict';

/* Standalone, framework-free preview. No KMate imports, cookies, network writes or API keys. */
const SOURCE_DATE = '24 Sep 2026';
const STORAGE_KEY = 'scholarship-studio-v3';
const UNIVERSITY = {
  KAIST: {mark:'K',place:'Daejeon'},
  UNIST: {mark:'U',place:'Ulsan'},
  'Korea University': {mark:'KU',place:'Seoul'},
  'Ajou University': {mark:'A',place:'Suwon'}
};
const SCHOLARSHIPS = [
 {id:'kaist-ug',uni:'KAIST',name:'KAIST International Undergraduate Scholarship',scope:'Undergraduate',category:'University scholarship',benefit:'Full tuition · 8 semesters',detail:'₩350,000/month + health insurance',tuition:'Full tuition for eight semesters',stipend:'₩350,000 per month',route:'Scholarship selection through international undergraduate admission',language:'Admission language rules must be checked separately',selection:'Select KAIST Scholarship in financial-resources section of admission application; scholarship linked to admission.',renewal:'Maintain GPA over 2.7/4.3 at KAIST after freshman year.',deadline:'Same as chosen admission round',source:'https://admission.kaist.ac.kr/intl-undergraduate/support/scholarships/kaist/',notice:'Verify your chosen 2027 intake and current admission guide.',type:'admission'},
 {id:'unist-ug',uni:'UNIST',name:'UNIST Undergraduate Tuition Scholarship',scope:'Undergraduate',category:'University scholarship',benefit:'Full first-term tuition waiver',detail:'Continuation depends on academic rules',tuition:'Full first-term waiver for freshmen; future terms conditional',stipend:'Separate living scholarships have their own conditions',route:'International undergraduate admission; scholarship renewal based on academic performance',language:'Check admissions language and major-specific rules',selection:'Official page states all freshmen receive full tuition scholarship in first term.',renewal:'For later full waiver: 12 credits and GPA ≥2.7 in prior term; exceptional second-term freshman rule may apply.',deadline:'Check intake-specific admission schedule',source:'https://admu-intl.unist.ac.kr/admission-eng/life/scholarships.do',notice:'First-term coverage is not a promise of full-degree coverage.',type:'admission'},
 {id:'ku-anam',uni:'Korea University',name:'Anam Global Scholarship',scope:'Undergraduate',category:'Admission-evaluated',benefit:'Full tuition · 8 semesters',detail:'Freshman award · admission evaluation',tuition:'Full tuition for eight semesters',stipend:'Not stated on award page',route:'Automatic consideration for freshman applicants',language:'Follow university admission guide',selection:'Admission evaluation; no separate scholarship application.',renewal:'At least 12 credits and GPA ≥3.5 in previous semester.',deadline:'Follows university admission calendar',source:'https://oia.korea.ac.kr/oia2026/KU-Scholarships.do',notice:'Renewal GPA is not an undergraduate entry GPA requirement.',type:'admission'},
 {id:'ku-leader-a',uni:'Korea University',name:'Global Leader Scholarship A',scope:'Undergraduate',category:'Admission-evaluated',benefit:'Full tuition · 4 semesters',detail:'Freshman award · admission evaluation',tuition:'Full tuition for four semesters (freshman)',stipend:'Not stated on award page',route:'Automatic consideration during admission',language:'Follow university admission guide',selection:'Awarded on admission evaluation; no separate application.',renewal:'At least 12 credits and GPA ≥3.5 in previous semester.',deadline:'Follows university admission calendar',source:'https://oia.korea.ac.kr/oia2026/KU-Scholarships.do',notice:'Duration stated for freshman applicants.',type:'admission'},
 {id:'ku-leader-b',uni:'Korea University',name:'Global Leader Scholarship B',scope:'Undergraduate',category:'Admission-evaluated',benefit:'50% tuition · 4 semesters',detail:'Freshman award · admission evaluation',tuition:'50% tuition for four semesters (freshman)',stipend:'Not stated on award page',route:'Automatic consideration during admission',language:'Follow university admission guide',selection:'Awarded on admission evaluation; no separate application.',renewal:'At least 12 credits and GPA ≥3.0 in previous semester.',deadline:'Follows university admission calendar',source:'https://oia.korea.ac.kr/oia2026/KU-Scholarships.do',notice:'Duration stated for freshman applicants.',type:'admission'},
 {id:'ku-stem',uni:'Korea University',name:'KU STEM Scholarship',scope:'Undergraduate',category:'STEM evidence',benefit:'Full tuition · 4 semesters',detail:'Requires certificate of STEM outputs',tuition:'Full tuition for four semesters (freshman)',stipend:'Not stated on award page',route:'Submit certificate of outstanding STEM outputs with admission documents',language:'Follow university admission guide',selection:'Automatic consideration for applicants submitting qualifying STEM output certificate; admission evaluation.',renewal:'At least 12 credits and GPA ≥3.5 in previous semester.',deadline:'Follows university admission calendar',source:'https://oia.korea.ac.kr/oia2026/KU-Scholarships.do',notice:'A personal project alone does not establish that a qualifying certificate has been submitted.',type:'stem'},
 {id:'ajou-frontier',uni:'Ajou University',name:'Ajou Frontier Scholarship S',scope:'Undergraduate',category:'Admission-evaluated',benefit:'100% tuition · 4 years',detail:'Internally selected for outstanding grades',tuition:'100% tuition waiver for four years',stipend:'Not stated for this award',route:'Internal selection among newly admitted students',language:'Depends on chosen admission track',selection:'University internally selects recipients based on outstanding grades.',renewal:'Confirm continuation rules for actual offer.',deadline:'Follows university admission calendar',source:'https://ajou.ac.kr/iadmissions_en/undergraduate/scholarship.do',notice:'Not a guarantee based only on reported GPA.',type:'admission'},
 {id:'ajou-global-1',uni:'Ajou University',name:'Ajou Global Scholarship 1 · Korean track',scope:'Undergraduate',category:'Language-based',benefit:'100% tuition · 1 semester',detail:'Published TOPIK criterion: Level 6',tuition:'100% tuition waiver for one semester',stipend:'Not stated for this award',route:'New student · Korean-language track',language:'TOPIK 6 published for Korean track',selection:'Scholarship criteria for new students; university confirms selection.',renewal:'Award listed for first semester only.',deadline:'Follows university admission calendar',source:'https://ajou.ac.kr/iadmissions_en/undergraduate/scholarship.do',notice:'Korean track shown; an English-track applicant may have different IELTS criteria.',type:'topik',minTopik:6},
 {id:'ajou-global-2',uni:'Ajou University',name:'Ajou Global Scholarship 2 · Korean track',scope:'Undergraduate',category:'Language-based',benefit:'70% tuition · 1 semester',detail:'Published TOPIK criterion: Level 5',tuition:'70% tuition waiver for one semester',stipend:'Not stated for this award',route:'New student · Korean-language track',language:'TOPIK 5 published for Korean track',selection:'Scholarship criteria for new students; university confirms selection.',renewal:'Award listed for first semester only.',deadline:'Follows university admission calendar',source:'https://ajou.ac.kr/iadmissions_en/undergraduate/scholarship.do',notice:'TOPIK level is a criterion, not an admission guarantee.',type:'topik',minTopik:5},
 {id:'ajou-global-3',uni:'Ajou University',name:'Ajou Global Scholarship 3 · Korean track',scope:'Undergraduate',category:'Language-based',benefit:'50% tuition · 1 semester',detail:'Published TOPIK criterion: Level 4',tuition:'50% tuition waiver for one semester',stipend:'Not stated for this award',route:'New student · Korean-language track',language:'TOPIK 4 published for Korean track',selection:'Scholarship criteria for new students; university confirms selection.',renewal:'Award listed for first semester only.',deadline:'Follows university admission calendar',source:'https://ajou.ac.kr/iadmissions_en/undergraduate/scholarship.do',notice:'Confirm actual programme language and admission rules.',type:'topik',minTopik:4},
 {id:'ajou-global-4',uni:'Ajou University',name:'Ajou Global Scholarship 4 · Korean track',scope:'Undergraduate',category:'Language-based',benefit:'30% tuition · 1 semester',detail:'Published TOPIK criterion: Level 3',tuition:'30% tuition waiver for one semester',stipend:'Not stated for this award',route:'New student · Korean-language track',language:'TOPIK 3 published for Korean track',selection:'Scholarship criteria for new students; university confirms selection.',renewal:'Award listed for first semester only.',deadline:'Follows university admission calendar',source:'https://ajou.ac.kr/iadmissions_en/undergraduate/scholarship.do',notice:'University may adjust scholarship rules; consult current notice.',type:'topik',minTopik:3}
];
/* English-track awards are displayed separately: Ajou's official undergraduate table
   identifies the English track as Business Administration. Do not assume AI/CS applicability. */
[
  [1,8.0,100],
  [2,7.0,70],
  [3,6.5,50],
  [4,5.5,30]
].forEach(function(t){
  SCHOLARSHIPS.push({
    id:'ajou-english-'+t[0],uni:'Ajou University',name:'Ajou Global Scholarship '+t[0]+' · English track',
    scope:'Undergraduate',category:'Language-based · Business Administration',
    benefit:t[2]+'% tuition · 1 semester',
    detail:'Published IELTS criterion: '+t[1].toFixed(1),
    tuition:t[2]+'% tuition waiver for one semester',
    stipend:'Not stated for this award',
    route:'New student · English-track Business Administration',
    language:'IELTS '+t[1].toFixed(1)+' published for English track; TOEFL alternative exists',
    selection:'Scholarship criteria for new students; university confirms selection.',
    renewal:'Award listed for first semester only.',
    deadline:'Follows university admission calendar',
    source:'https://ajou.ac.kr/iadmissions_en/undergraduate/scholarship.do',
    notice:'English track on the official table is Business Administration. Do not assume this pathway applies to AI/CS.',
    type:'ielts',minIelts:t[1]
  });
});
const DEFAULT_PROFILE = {name:'',nationality:'',degree:'',major:'',gpa:'',scale:'',topik:'',ielts:'',language:'',intake:'',stemEvidence:false};
const STAGES = ['Researching','Preparing documents','Ready to submit','Submitted','Interview','Offer received','Not proceeding'];
const TASKS = ['Check admission guide','Prepare transcript','Complete statement','Arrange recommendation','Submit application'];
const $ = sel => document.querySelector(sel);
const esc = value => String(value == null ? '' : value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function byId(id){return SCHOLARSHIPS.find(s=>s.id===id);}
function readState(){try{const old=JSON.parse(localStorage.getItem(STORAGE_KEY));if(old&&typeof old==='object')return {profile:Object.assign({},DEFAULT_PROFILE,old.profile||{}),apps:Array.isArray(old.apps)?old.apps.filter(a=>byId(a.id)):[],compare:Array.isArray(old.compare)?old.compare.filter(id=>byId(id)).slice(0,3):[]};}catch(e){}return {profile:{...DEFAULT_PROFILE},apps:[],compare:[]};}
let state=readState();
let view=['discover','eligibility','applications','compare'].includes(location.hash.slice(1))?location.hash.slice(1):'discover';
let filters={search:'',uni:'all',match:'all',tracked:false};
let timer=0;
function store(){try{localStorage.setItem(STORAGE_KEY,JSON.stringify(state));}catch(e){toast('Browser storage is unavailable. Use Export to keep a copy.');}syncShell();}
function toast(msg){const node=$('#toast');node.textContent=msg;node.classList.add('show');clearTimeout(timer);timer=setTimeout(()=>node.classList.remove('show'),3400);}
function completeness(){return ['nationality','degree','major','language','intake'].filter(k=>state.profile[k]).length;}
function statusFor(s){
 const p=state.profile;
 if(p.degree==='Graduate')return {key:'scope',label:'Outside preview scope',reason:'This snapshot covers undergraduate awards only; graduate awards are not assessed here.'};
 if(!p.degree||!p.nationality)return {key:'check',label:'Complete your profile',reason:'Add your nationality and degree level for a more useful criteria check.'};
 if(s.type==='topik'){
   if(p.language==='English track')return {key:'check',label:'Korean-track award',reason:'This entry shows Korean-track TOPIK criteria. Check the English-track award and major before relying on it.'};
   if(p.topik==='')return {key:'check',label:'TOPIK not provided',reason:'Add a TOPIK level to check the published level '+s.minTopik+' threshold.'};
   if(Number(p.topik)<s.minTopik)return {key:'gap',label:'Language criterion gap',reason:'This Korean-track award lists TOPIK '+s.minTopik+'. Your entered level is '+p.topik+'.'};
   return {key:'good',label:'TOPIK criterion met',reason:'Your entered TOPIK level meets the published level '+s.minTopik+' threshold. Admission and award selection still require verification.'};
 }
 if(s.type==='ielts'){
   if(p.major!=='Business / Management')return {key:'check',label:'Programme to verify',reason:'This award is listed for the English-track Business Administration programme, not an assumed AI/CS route. Check your intended programme.'};
   if(p.language==='Korean track')return {key:'check',label:'English-track award',reason:'This is an English-track Business Administration award; check if it fits your intended admissions route.'};
   if(p.ielts==='')return {key:'check',label:'IELTS not provided',reason:'Add IELTS overall to check the published '+s.minIelts.toFixed(1)+' criterion. TOEFL is another published route.'};
   if(Number(p.ielts)<s.minIelts)return {key:'gap',label:'Language criterion gap',reason:'This English-track award lists IELTS '+s.minIelts.toFixed(1)+'. Your entered score is '+p.ielts+'.'};
   return {key:'good',label:'IELTS criterion met',reason:'Your entered IELTS meets the published '+s.minIelts.toFixed(1)+' threshold for this English-track award. Selection is not guaranteed.'};
 }
 if(s.type==='stem'&&!p.stemEvidence)return {key:'gap',label:'STEM evidence to check',reason:'KU asks for a certificate of outstanding STEM outputs. Add it to your profile only if you have qualifying evidence.'};
 if(s.type==='stem')return {key:'check',label:'Evidence declared · verify',reason:'You indicated STEM evidence; check whether the university accepts your actual certificate and evaluates you for this award.'};
 return {key:'check',label:'Selection to verify',reason:'The award depends on international admission and/or university selection. No pre-admission acceptance conclusion is available.'};
}
function badge(s){let m=statusFor(s);return '<span class="tag '+(m.key==='good'?'good':m.key==='gap'?'warn':'subtle')+'" title="'+esc(m.reason)+'">'+esc(m.label)+'</span>';}
function sourceLink(s,label){return '<a class="source-link" target="_blank" rel="noopener noreferrer" href="'+esc(s.source)+'">'+(label||'Official source ↗')+'</a>';}
function syncShell(){
 document.querySelectorAll('[data-view]').forEach(b=>b.classList.toggle('active',b.classList.contains('nav-item')&&b.dataset.view===view));
 $('#nav-app-count').textContent=state.apps.length;
 $('#nav-compare-count').textContent=state.compare.length;
 $('#crumb-current').textContent=({discover:'DISCOVER',eligibility:'MY ELIGIBILITY',applications:'APPLICATIONS',compare:'COMPARE'})[view];
 $('#mini-profile').textContent=state.profile.name||((completeness()?completeness()+'/5 essentials saved':'Not completed yet'));
 const meter=$('.mini-progress'); if(meter){meter.setAttribute('aria-valuenow',completeness());$('#mini-progress-fill').style.width=(completeness()*20)+'%';}
}
function navigate(next){if(!['discover','eligibility','applications','compare'].includes(next))return;view=next;location.hash=next;render();window.scrollTo({top:0,behavior:'instant'});}
function shell(body){return '<div class="main-content">'+body+'</div>';}
function sectionEyebrow(text){return '<div class="eyebrow">'+esc(text)+'</div>';}
function stat(label,value,meta,highlight){return '<div class="stat'+(highlight?' highlight':'')+'"><div class="stat-label">'+label+'</div><div class="stat-value">'+value+'</div><div class="stat-meta">'+meta+'</div>'+(highlight?'<span class="stat-symbol">✳</span>':'')+'</div>';}
function heroAside(){
 const completed=completeness(),p=state.profile,selected=state.compare.length,tracked=state.apps.length;
 const steps=[
  {number:'01',view:'eligibility',title:completed>=5?'Review your profile':'Build your profile',detail:completed+'/5 essentials completed',done:completed>=5},
  {number:'02',view:'applications',title:'Track your applications',detail:tracked+' saved application'+(tracked===1?'':'s'),done:tracked>0},
  {number:'03',view:'compare',title:'Compare scholarships',detail:selected+'/3 selected for comparison',done:selected>0}
 ];
 return '<aside class="hero-aside" aria-label="Your scholarship plan">'+
 '<div class="aside-top"><span class="aside-eyebrow"><span class="aside-label-dot"></span>YOUR SCHOLARSHIP PLAN</span><span class="aside-spark" aria-hidden="true">✳</span></div>'+
 '<div class="aside-main"><span class="aside-index">'+(p.name?'HELLO, '+esc(p.name.toUpperCase()):'YOUR NEXT STEPS')+'</span>'+
 '<h2>One plan.<br><em>Many possibilities.</em></h2>'+
 '<p class="aside-intro">Your university funding journey, in one place.</p></div>'+
 '<div class="aside-progress-row"><div class="aside-progress-head"><span>PROFILE COMPLETENESS</span><strong>'+completed+'<span class="progress-total"> / 5</span></strong></div>'+
 '<div class="aside-progress" role="progressbar" aria-label="Profile essentials completed" aria-valuemin="0" aria-valuemax="5" aria-valuenow="'+completed+'"><span style="width:'+(completed*20)+'%"></span></div></div>'+
 '<div class="aside-steps">'+steps.map(x=>'<button type="button" class="aside-step" data-view="'+x.view+'">'+
 '<span class="step-index">'+x.number+'</span><span class="step-copy"><strong>'+x.title+'</strong><small>'+x.detail+'</small></span>'+
 '<span class="step-arrow" aria-hidden="true">'+(x.done?'✓':'↗')+'</span></button>').join('')+'</div>'+
 '<div class="aside-bottom"><span><span class="aside-live-dot"></span> Saved privately in your browser</span><span class="aside-bottom-right">NON-GKS · KOREA</span></div></aside>';
}
function header(title,subtitle,action){
 return '<section class="hero-row'+(view==='discover'?' hero-discover':' hero-compact')+'">'+
 '<div class="hero-copy"><div class="hero-overline"><span class="hero-overline-line"></span>YOUR KOREA FUNDING WORKSPACE'+
 '<span class="hero-overline-tail">/ UNIVERSITY SCHOLARSHIPS</span></div>'+
 '<h1>'+title+'</h1><p>'+subtitle+'</p><div class="hero-actions">'+(action||'')+
 (view==='discover'?'<button type="button" id="jump-awards" class="hero-text-link">Explore scholarships <span aria-hidden="true">↓</span></button>':'')+
 '</div><div class="hero-proof"><span class="proof-mark">✳</span><span><strong>'+SCHOLARSHIPS.length+' university awards</strong><small>Curated from 4 official university sources</small></span></div></div>'+
 heroAside()+'</section>';
}
function stats(){
 const meets=SCHOLARSHIPS.filter(s=>statusFor(s).key==='good').length;
 return '<div class="stats-strip">'+stat('Curated awards',SCHOLARSHIPS.length,'4 official university sources',true)+stat('Published criteria met',meets,'Not an award prediction')+stat('Applications tracked',state.apps.length,'Saved on this device')+stat('Your comparison',state.compare.length+'/3','Up to three awards')+'</div>';
}
function card(s){
 const tracked=state.apps.some(a=>a.id===s.id),compared=state.compare.includes(s.id),m=statusFor(s),u=UNIVERSITY[s.uni];
 return '<article class="scholarship-card"><div class="card-head"><div class="university"><div class="university-icon">'+u.mark+'</div><div><div class="university-name">'+esc(s.uni)+'</div><div class="university-meta">'+esc(u.place)+' · Undergraduate</div></div></div>'+badge(s)+'</div>'+
 '<div class="card-main"><div class="card-meta">'+esc(s.category)+'<span aria-hidden="true">·</span>'+esc(s.scope)+'</div><h3>'+esc(s.name)+'</h3><p class="description">'+esc(s.route)+'</p></div>'+
 '<div class="benefit"><span class="benefit-kicker">PUBLISHED FUNDING</span><strong>'+esc(s.benefit)+'</strong><span class="small-note">'+esc(s.detail)+'</span></div>'+
 '<div class="criteria"><span class="criteria-icon" aria-hidden="true">◎</span><div><strong>YOUR PROFILE SIGNAL</strong><p>'+esc(m.reason)+'</p></div></div>'+
 '<div class="card-actions"><div class="left"><button class="btn btn-small '+(tracked?'btn-light':'btn-primary')+'" data-track="'+s.id+'">'+(tracked?'✓ View application':'＋ Track application')+'</button><button class="btn btn-small '+(compared?'btn-light':'')+'" data-compare="'+s.id+'">'+(compared?'✓ In comparison':'⊞ Compare')+'</button></div>'+sourceLink(s,'Official source ↗')+'</div></article>';
}
function filteredAwards(){return SCHOLARSHIPS.filter(s=>{
 const text=(s.uni+' '+s.name+' '+s.benefit+' '+s.category).toLowerCase();
 return text.includes(filters.search.toLowerCase())&&(filters.uni==='all'||s.uni===filters.uni)&&(filters.match==='all'||statusFor(s).key===filters.match)&&(!filters.tracked||state.apps.some(a=>a.id===s.id));
});}
function renderCards(){const awards=filteredAwards();$('#catalog-count').textContent=awards.length+' of '+SCHOLARSHIPS.length+' shown';$('#catalog-grid').innerHTML=awards.length?awards.map(card).join(''):'<div class="empty-state" style="grid-column:1/-1"><div class="empty-icon">⌕</div><h3>No awards in this view</h3><p>Try another university or remove the profile-criterion filter.</p><button class="btn btn-primary" id="clear-filters">Clear filters</button></div>';}
function discover(){
 const searchText=esc(filters.search);
 const uniOpts=Object.keys(UNIVERSITY).map(u=>'<option value="'+esc(u)+'" '+(filters.uni===u?'selected':'')+'>'+esc(u)+'</option>').join('');
 let html=
 '<section class="page-mast page-mast-discover" aria-label="Scholarship discovery">'+
 '<div class="mast-copy"><div class="mast-eyebrow"><span class="mast-eyebrow-mark">✳</span> SCHOLARSHIP EXPLORER <span class="mast-eyebrow-line"></span> NON-GKS ONLY</div>'+
 '<h1>Find your <em>next opportunity.</em></h1>'+
 '<p>Search university-funded scholarships, check published criteria and save what matters to you.</p>'+
 '<div class="mast-meta"><span><b>'+SCHOLARSHIPS.length+'</b> curated awards</span><span><b>4</b> university sources</span><span>Snapshot · '+SOURCE_DATE+'</span></div></div>'+
 '<div class="mast-side mast-side-discover"><span class="mast-side-kicker">YOUR SEARCH, YOUR WAY</span>'+
 '<div class="mast-search-mark">⌕</div><strong>Start with a university, award or benefit.</strong>'+
 '<p>Refine your results below, then track or compare awards in one click.</p>'+
 '<button class="mast-link" data-view="eligibility">Set my criteria <span>↗</span></button></div></section>'+
 '<div class="discovery-workbench"><div class="discovery-workbench-head"><div><span class="section-kicker">YOUR OPPORTUNITY LIBRARY</span><h2>Explore university awards</h2><p>Source-linked opportunities, with your criteria insight on every card.</p></div><span class="workbench-source-tag"><span class="pulse"></span> 4 official sources</span></div>'+
 '<div class="filters discovery-filters"><label class="discovery-search-label"><span aria-hidden="true">⌕</span><input id="search" class="input" type="search" placeholder="Search universities, awards, funding…" value="'+searchText+'" aria-label="Search scholarships"></label>'+
 '<select id="uni-filter" class="select" aria-label="Filter university"><option value="all">All universities</option>'+uniOpts+'</select>'+
 '<select id="match-filter" class="select" aria-label="Filter profile signals"><option value="all">All profile signals</option><option value="good" '+(filters.match==='good'?'selected':'')+'>Criterion met</option><option value="gap" '+(filters.match==='gap'?'selected':'')+'>Needs attention</option><option value="check" '+(filters.match==='check'?'selected':'')+'>Review required</option></select>'+
 '<div id="catalog-count" class="filter-count"></div></div>'+
 '<div class="filter-toolbar"><div class="filter-tabs"><span class="filter-tabs-label">QUICK VIEW</span><button class="filter-chip '+(!filters.tracked?'is-selected':'')+'" id="all-awards">All awards</button><button class="filter-chip '+(filters.tracked?'is-selected':'')+'" id="tracked-only">My tracked awards <span>'+state.apps.length+'</span></button></div><button class="filter-clear" id="clear-filters">Reset filters ↺</button></div></div>'+
 '<div class="banner page-source-note"><span>ⓘ</span><div><strong>Curated preview, not a live admissions feed.</strong> Award information checked '+SOURCE_DATE+'. Confirm intake-specific eligibility and exact dates on the university’s current official page.</div></div>'+
 '<div id="catalog-grid" class="card-grid"></div>';
 $('#view-root').innerHTML=shell(html);renderCards();
}
function field(label,name,type,opts,extra){
 let input=opts?'<select class="select" name="'+name+'" id="field-'+name+'">'+opts.map(o=>'<option value="'+esc(o[0])+'" '+(String(state.profile[name])===String(o[0])?'selected':'')+'>'+esc(o[1])+'</option>').join('')+'</select>':'<input class="input" type="'+type+'" id="field-'+name+'" name="'+name+'" value="'+esc(state.profile[name])+'" '+(extra||'')+'>';
 return '<div class="field"><label for="field-'+name+'">'+label+'</label>'+input+'</div>';
}
function eligibility(){
 const p=state.profile;
 const assessment=SCHOLARSHIPS.map(s=>({s,m:statusFor(s)}));
 let html='<section class="page-mast page-mast-eligibility" aria-label="My eligibility overview"><div class="mast-copy"><div class="mast-eyebrow"><span class="mast-eyebrow-mark">◎</span> PERSONAL CRITERIA CHECK</div>'+
 '<h1>My <em>eligibility.</em></h1><p>Organize your academic and language profile, then check it against published scholarship criteria. Not an admissions prediction.</p>'+
 '<div class="mast-meta"><span>'+esc(p.degree||'Degree not set')+'</span><span>'+esc(p.major||'Major not set')+'</span><span>'+esc(p.intake||'Intake not set')+'</span></div></div>'+
 '<div class="mast-side eligibility-side"><span class="mast-side-kicker">YOUR PROFILE READINESS</span><div class="eligibility-progress-number">'+completeness()+'<span> / 5</span></div><strong>Essentials completed</strong>'+
 '<div class="progress-track" role="progressbar" aria-label="Profile essentials completed" aria-valuemin="0" aria-valuemax="5" aria-valuenow="'+completeness()+'"><span style="width:'+(completeness()*20)+'%"></span></div>'+
 '<p>'+ (completeness()===5?'Your essentials are recorded. Check individual university rules.':'Finish your essentials to make scholarship criteria checks more useful.')+'</p>'+
 '<button class="mast-link" data-view="discover">Browse source-linked awards <span>↗</span></button></div></section>'+
 '<div class="two-col"><section class="panel"><div class="panel-title"><h3>My scholarship profile</h3><span class="tag">'+completeness()+'/5 essentials</span></div><p class="panel-subtitle">Your information is stored locally in this browser, not sent to KMate or any university.</p><form id="profile-form"><div class="field-grid">'+
 field('Display name','name','text',null,'maxlength="80" placeholder="How should we address you?"')+
 field('Nationality / citizenship','nationality','text',null,'maxlength="80" placeholder="e.g. India"')+
 field('Study level','degree',null,[['','Select level'],['Undergraduate','Undergraduate'],['Graduate','Graduate']])+
 field('Intended field','major',null,[['','Select intended field'],['AI / Computer Science','AI / Computer Science'],['Engineering / STEM','Engineering / STEM'],['Business / Management','Business / Management'],['Arts / Humanities','Arts / Humanities'],['Undecided / Other','Undecided / Other']])+
 field('Preferred language route','language',null,[['','Not decided'],['Korean track','Korean track'],['English track','English track'],['Either / undecided','Either / undecided']])+
 field('Target intake','intake',null,[['','Not decided'],['Spring 2027','Spring 2027'],['Fall 2027','Fall 2027'],['Spring 2028','Spring 2028'],['Fall 2028','Fall 2028']])+
 field('TOPIK level','topik',null,[['','Not taken / not provided'],['0','No level yet'],['1','Level 1'],['2','Level 2'],['3','Level 3'],['4','Level 4'],['5','Level 5'],['6','Level 6']])+
 field('IELTS overall (optional)','ielts','number',null,'min="0" max="9" step="0.5" placeholder="e.g. 7.0"')+
 field('Academic result (optional)','gpa','text',null,'maxlength="22" placeholder="e.g. 91%"')+
 field('Grading scale (optional)','scale','text',null,'maxlength="25" placeholder="e.g. percentage / 4.0"')+
 '<div class="field full"><label class="check-item"><input type="checkbox" name="stemEvidence" '+(p.stemEvidence?'checked':'')+'> I have a certificate of outstanding STEM outputs to submit for KU STEM consideration</label><span class="field-hint">A project or portfolio by itself does not confirm this certificate requirement.</span></div></div>'+
 '<div class="form-actions"><button class="btn btn-primary" type="submit">Save & check my criteria →</button><button class="btn" type="button" id="sample-profile">Try example profile</button></div></form></section>'+
 '<aside class="panel"><div class="panel-title"><h3>Eligibility signals</h3><span class="tag good">Source-based</span></div><p class="panel-subtitle">A transparent read of your profile against published scholarship rules. Not a prediction or university decision.</p><div class="summary-side"><div class="eyebrow">PROFILE COMPLETENESS</div><strong>'+completeness()+' / 5</strong><div class="progress-track"><span style="width:'+(completeness()*20)+'%"></span></div><p>Your essentials help us focus the assessment, but each university must confirm admission eligibility.</p><button data-view="discover" class="btn btn-primary btn-small">Explore opportunities ↗</button></div>'+
 '<div class="diagnosis" style="margin-top:18px">'+assessment.filter(x=>x.m.key==='good'||x.m.key==='gap').slice(0,5).map(x=>'<div class="diagnosis-row">'+badge(x.s)+'<strong>'+esc(x.s.name)+'</strong><p>'+esc(x.m.reason)+'</p></div>').join('')+
 (assessment.every(x=>x.m.key==='check'||x.m.key==='scope')?'<div class="diagnosis-row"><strong>No deterministic conclusion yet</strong><p>Most awards here rely on admission evaluation. Fill in your profile and check the institution’s admission guide.</p></div>':'')+'</div><p class="explain" style="margin-top:20px">Academic grades are recorded for your reference but not automatically compared across incompatible grading systems. KU and KAIST renewal GPAs are not treated as freshman admission cutoffs.</p></aside></div>';
 $('#view-root').innerHTML=shell(html);
}
function apps(){
 let intro='<section class="page-mast page-mast-applications" aria-label="Application control center"><div class="mast-copy"><div class="mast-eyebrow"><span class="mast-eyebrow-mark">▤</span> APPLICATION CONTROL CENTER</div>'+
 '<h1>Your applications, <em>under control.</em></h1><p>Manage university opportunities from first research to final decision, with checklists, notes and your next-action dates.</p>'+
 '<div class="mast-meta"><span><b>'+state.apps.length+'</b> tracked</span><span><b>'+state.apps.filter(a=>a.stage==="Submitted").length+'</b> submitted</span><span>Saved locally on this device</span></div></div>'+
 '<div class="mast-side applications-side"><span class="mast-side-kicker">NEXT MOVE</span><div class="mast-side-symbol">↗</div><strong>Keep every application moving.</strong><p>Add an opportunity, update its stage, and give it a next action.</p>'+
 '<button class="btn btn-primary" data-view="discover">＋ Add an application</button><button class="mast-secondary" id="export-data">↧ Export records</button></div></section>';
 let overview= '<div class="stats-strip">'+stat('In your workspace',state.apps.length,'Independent award records',true)+stat('Preparing',state.apps.filter(a=>a.stage==='Preparing documents').length,'Document stage')+stat('Submitted',state.apps.filter(a=>a.stage==='Submitted').length,'Recorded by you')+stat('Offers recorded',state.apps.filter(a=>a.stage==='Offer received').length,'Entered by you')+'</div>';
 let content=state.apps.length?'<div class="app-list">'+state.apps.map(appCard).join('')+'</div>':'<div class="empty-state"><div class="empty-icon">▤</div><h3>No applications tracked yet</h3><p>Pick an award from Discover and choose “Track application”. You’ll get an independent checklist, status, notes and deadline field.</p><button class="btn btn-primary" data-view="discover">Explore scholarships →</button></div>';
 $('#view-root').innerHTML=shell(intro+overview+'<div class="section-heading"><div><div class="eyebrow">Your application desk</div><h2>My applications</h2><p>Manual tracking — this demo does not submit university applications.</p></div></div>'+content);
}
function appCard(a){
 const s=byId(a.id),tasks=Array.isArray(a.tasks)?a.tasks:[],done=TASKS.filter(t=>tasks.includes(t)).length;
 return '<article class="app-card"><div class="app-top"><div><div class="eyebrow">'+esc(s.uni)+' · UNIVERSITY FUNDING</div><h3>'+esc(s.name)+'</h3><small>'+esc(s.benefit)+'</small></div><button class="btn btn-small btn-danger" data-remove="'+s.id+'" aria-label="Remove '+esc(s.name)+' application">Remove ×</button></div>'+
 '<div class="app-fields"><div class="field"><label for="stage-'+s.id+'">Application status</label><select class="select" id="stage-'+s.id+'" data-app-field="stage" data-id="'+s.id+'">'+STAGES.map(t=>'<option '+(a.stage===t?'selected':'')+'>'+t+'</option>').join('')+'</select></div>'+
 '<div class="field"><label for="intake-'+s.id+'">Target intake</label><input class="input" id="intake-'+s.id+'" value="'+esc(a.intake||'')+'" placeholder="e.g. Fall 2027" data-app-field="intake" data-id="'+s.id+'" maxlength="55"></div>'+
 '<div class="field"><label for="date-'+s.id+'">My next action date</label><input class="input" type="date" id="date-'+s.id+'" value="'+esc(a.date||'')+'" data-app-field="date" data-id="'+s.id+'"></div></div>'+
 '<div class="app-bottom"><div><h4>MY CHECKLIST <span class="muted">'+done+'/'+TASKS.length+'</span></h4>'+TASKS.map(t=>'<label class="check-item"><input type="checkbox" data-task="'+esc(t)+'" data-id="'+s.id+'" '+(tasks.includes(t)?'checked':'')+'>'+t+'</label>').join('')+'</div><div><h4>MY NOTES & NEXT STEPS</h4><textarea class="textarea" data-app-field="notes" data-id="'+s.id+'" maxlength="1200" placeholder="Add official deadline, document questions, tasks or contacts…">'+esc(a.notes||'')+'</textarea><p class="small-sup">Auto-saved when you leave this field. Add your own deadline after verifying the latest admissions notice.</p></div></div>'+
 '<div class="app-tools"><span class="app-status">Personal tracker · not connected to admissions portal</span>'+sourceLink(s,'Check official award ↗')+'</div></article>';
}
function compare(){
 const slots=Array.from({length:3},(_,i)=>{
 const s=byId(state.compare[i]);
 return '<div class="compare-slot '+(s?'filled':'')+'"><span>SLOT 0'+(i+1)+'</span>'+
 (s?'<strong>'+esc(s.name)+'</strong><small>'+esc(s.uni)+' · '+esc(s.benefit)+'</small><button data-compare="'+s.id+'" aria-label="Remove '+esc(s.name)+' from comparison">×</button>':
 '<strong>Choose an award</strong><small>Select below or from Discover</small><span class="compare-slot-plus" aria-hidden="true">＋</span>')+'</div>';
 }).join('');
 const title='<section class="page-mast page-mast-compare" aria-label="Scholarship comparison builder"><div class="mast-copy"><div class="mast-eyebrow"><span class="mast-eyebrow-mark">⊞</span> COMPARISON DESK</div>'+
 '<h1>See the <em>whole picture.</em></h1><p>Compare documented funding, selection routes and continuation rules without invented rankings or acceptance scores.</p>'+
 '<div class="mast-meta"><span><b>'+state.compare.length+' / 3</b> selected</span><span>Official award sources</span></div></div>'+
 '<div class="mast-side compare-side"><span class="mast-side-kicker">BUILD YOUR SHORTLIST</span><strong>Put opportunities side by side.</strong><p>Select up to three awards. Your comparison updates immediately.</p><div class="compare-mast-actions"><button class="btn btn-primary" data-view="discover">＋ Explore awards</button><button class="mast-secondary" id="clear-comparison">Clear all</button></div></div></section>';
 let picks='<div class="compare-builder"><div class="compare-builder-head"><div><span class="section-kicker">YOUR SELECTION</span><h2>Three places. One clear view.</h2><p>'+state.compare.length+' of 3 awards selected · choose or remove below</p></div><button class="btn btn-small" data-view="discover">Browse awards ↗</button></div><div class="compare-slots">'+slots+'</div></div>'+
 '<div class="section-heading compare-pick-heading"><div><div class="eyebrow">SOURCE-LINKED AWARDS</div><h2>Choose your comparison set</h2><p>Tick an award to compare its published conditions.</p></div></div>'+
 '<div class="compare-choices">'+SCHOLARSHIPS.map(s=>'<label class="compare-choice '+(state.compare.includes(s.id)?'selected':'')+'"><input type="checkbox" data-compare="'+s.id+'" '+(state.compare.includes(s.id)?'checked':'')+' '+(state.compare.length>=3&&!state.compare.includes(s.id)?'disabled':'')+'><div><strong>'+esc(s.name)+'</strong><small>'+esc(s.uni)+' · '+esc(s.benefit)+'</small></div></label>').join('')+'</div>';
 let chosen=state.compare.map(byId).filter(Boolean);
 let rows=[['University',s=>s.uni],['Profile signal',s=>esc(statusFor(s).label)+' — '+esc(statusFor(s).reason)],['Tuition coverage',s=>esc(s.tuition)],['Living allowance',s=>esc(s.stipend)],['Scholarship route',s=>esc(s.route)],['Published language condition',s=>esc(s.language)],['Selection method',s=>esc(s.selection)],['Renewal / duration',s=>esc(s.renewal)],['Deadline',s=>esc(s.deadline)],['Important caution',s=>esc(s.notice)],['Official source',s=>sourceLink(s,'Open university source ↗')]];
 let table=chosen.length?'<div class="compare-table-wrap"><table class="compare-table"><thead><tr><th>COMPARISON FIELD</th>'+chosen.map(s=>'<th>'+esc(s.name)+'<div class="small-sup">'+esc(s.uni)+'</div></th>').join('')+'</tr></thead><tbody>'+rows.map(row=>'<tr><th>'+row[0]+'</th>'+chosen.map(s=>'<td>'+row[1](s)+'</td>').join('')+'</tr>').join('')+'</tbody></table></div><p class="compact-info">Award details are from official source pages checked '+SOURCE_DATE+'. An unspecified benefit is not evidence that a benefit is unavailable.</p>':'<div class="empty-state"><div class="empty-icon">⊞</div><h3>Your comparison is empty</h3><p>Select two or three awards above, or add them from the Discover view.</p></div>';
 $('#view-root').innerHTML=shell(title+picks+table);
}
function render(){syncShell();({discover,eligibility,applications:apps,compare})[view]();}
document.addEventListener('click',e=>{
 if(e.target.closest('#jump-awards')){document.querySelector('.section-heading')?.scrollIntoView({behavior:window.matchMedia?.('(prefers-reduced-motion: reduce)').matches?'auto':'smooth',block:'start'});return;}
 const nav=e.target.closest('[data-view]');if(nav){navigate(nav.dataset.view);return;}
 const track=e.target.closest('button[data-track]');if(track){const id=track.dataset.track;if(state.apps.some(a=>a.id===id)){navigate('applications');toast('Opened your application tracker.');return;}state.apps.push({id,stage:'Researching',intake:state.profile.intake||'',date:'',tasks:[],notes:''});store();render();toast('Added to your applications.');return;}
 const comp=e.target.closest('button[data-compare]');if(comp){toggleCompare(comp.dataset.compare);return;}
 const remove=e.target.closest('button[data-remove]');if(remove){if(confirm('Remove this application and its locally saved notes?')){state.apps=state.apps.filter(a=>a.id!==remove.dataset.remove);store();render();toast('Application removed.');}return;}
 if(e.target.id==='tracked-only'){filters.tracked=true;render();return;}
 if(e.target.id==='all-awards'){filters.tracked=false;render();return;}
 if(e.target.id==='clear-comparison'){state.compare=[];store();render();toast('Comparison cleared.');return;}
 if(e.target.id==='clear-filters'){filters={search:'',uni:'all',match:'all',tracked:false};render();return;}
 if(e.target.id==='top-profile'){navigate('eligibility');return;}
 if(e.target.id==='sample-profile'){state.profile={name:'Example applicant',nationality:'Example country',degree:'Undergraduate',major:'AI / Computer Science',gpa:'',scale:'',topik:'4',ielts:'7.0',language:'Korean track',intake:'Fall 2027',stemEvidence:false};store();render();toast('Example loaded. Replace with your own details.');return;}
 if(e.target.id==='export-data'){const blob=new Blob([JSON.stringify({version:1,exportedAt:new Date().toISOString(),sourceDate:SOURCE_DATE,...state},null,2)],{type:'application/json'});const link=document.createElement('a');link.href=URL.createObjectURL(blob);link.download='scholarship-studio-workspace.json';document.body.appendChild(link);link.click();link.remove();setTimeout(()=>URL.revokeObjectURL(link.href),1000);toast('Workspace exported.');}
});
function toggleCompare(id){const selected=state.compare.includes(id);if(selected)state.compare=state.compare.filter(x=>x!==id);else if(state.compare.length>=3){toast('Choose up to three awards. Remove one to add another.');return;}else state.compare.push(id);store();render();toast(selected?'Removed from comparison.':'Added to comparison.');}
document.addEventListener('submit',e=>{
 if(e.target.id!=='profile-form')return;e.preventDefault();
 const f=new FormData(e.target),next={};
 Object.keys(DEFAULT_PROFILE).forEach(k=>next[k]=k==='stemEvidence'?f.has(k):String(f.get(k)||'').trim());
 if(next.ielts!==''&&(Number(next.ielts)<0||Number(next.ielts)>9)){toast('IELTS should be between 0 and 9.');return;}
 state.profile=next;store();render();toast('Profile saved. Scholarship insights updated.');
});
document.addEventListener('input',e=>{if(e.target.id==='search'){filters.search=e.target.value;renderCards();}});
document.addEventListener('change',e=>{
 if(e.target.id==='uni-filter'){filters.uni=e.target.value;renderCards();return;}
 if(e.target.id==='match-filter'){filters.match=e.target.value;renderCards();return;}
 if(e.target.matches('input[data-compare]')){toggleCompare(e.target.dataset.compare);return;}
 const id=e.target.dataset.id;if(!id)return;const a=state.apps.find(x=>x.id===id);if(!a)return;
 if(e.target.dataset.task){const t=e.target.dataset.task;a.tasks=Array.isArray(a.tasks)?a.tasks:[];a.tasks=e.target.checked?Array.from(new Set([...a.tasks,t])):a.tasks.filter(x=>x!==t);store();render();toast('Checklist saved.');return;}
 if(e.target.dataset.appField){const f=e.target.dataset.appField;if(['stage','intake','date','notes'].includes(f)){a[f]=e.target.value;store();if(f==='stage')render();toast('Application updated locally.');}}
});
window.addEventListener('hashchange',()=>{const v=location.hash.slice(1);if(['discover','eligibility','applications','compare'].includes(v)&&v!==view){view=v;render();}});
render();
