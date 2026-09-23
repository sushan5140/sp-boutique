"use client";
import { useState } from "react";
import LevelJourney from "./LevelJourney";
import FeatureAtlas from "./FeatureAtlas";
import s from "./landing.module.css";

const moments=[
 {ko:"오늘 뭐 해요?",phonetic:"oneul mwo haeyo?",en:"What are you doing today?",setting:"A message from your friend",parts:["오늘","뭐","해요?"],gloss:["today","what","do?"]},
 {ko:"커피 한 잔 주세요.",phonetic:"keopi han jan juseyo.",en:"One cup of coffee, please.",setting:"At a café in Korea",parts:["커피","한 잔","주세요."],gloss:["coffee","one cup","please give me"]},
 {ko:"주말에 같이 공부해요.",phonetic:"jumare gachi gongbuhaeyo.",en:"Let's study together this weekend.",setting:"Making a plan with a partner",parts:["주말에","같이","공부해요."],gloss:["on the weekend","together","study"]}
];
const aiTools=[
 ["Explain My Mistake","See why a specific answer missed the grammar or vocabulary."],
 ["Automatic Difficulty","Use your results to inform the challenge level."],
 ["Adaptive Review","Focus another practice session on recorded weak areas."],
 ["Personal Study Plan","Organize a focused route from actual study signals."],
 ["Fresh AI Checkpoint","Generate a new check on the material you have studied."],
 ["Level Promotion Audit","Review the available evidence before moving up."],
];
const faqs=[
 ["Do I need to know Hangul?","No. You can start with Hangul Lab, then move into the Companion curriculum when you feel ready."],
 ["Can I try Hallim before signing in?","Yes. The landing-page interactions here are public previews. Sign in to the main app to save an actual learning route and use personal account features."],
 ["Does Hallim grant an official TOPIK level?","No. Hallim supports practice and evidence-informed study, but its in-app assessments are not official TOPIK tests or certificates."],
 ["Can everyone see my Study Partners profile?","No. Study Partners discovery is opt-in. Shared spaces require mutual acceptance, and you choose which notes to share."]
];
function Arrow(){return <span aria-hidden="true">↗</span>}
function Logo(){return <span className={s.logoIcon} aria-hidden="true">ㅎ</span>}
export default function LandingPage({authHref,authError=""}){
 const [menu,setMenu]=useState(false);
 const [view,setView]=useState("learn");
 const [scene,setScene]=useState(0);
 const [words,setWords]=useState([]);
 const [shown,setShown]=useState(false);
 const [speech,setSpeech]=useState("");
 const sample=moments[scene];
 const entry=authHref("/?view=companion");
 const other=authHref("/?view=profile");
 const correct=words.length===3&&words.every((word,i)=>word===i);
 const assembled=words.map(i=>sample.parts[i]).join(" ");
 function changeScene(direction){const next=(scene+direction+moments.length)%moments.length;setScene(next);setWords([]);setShown(false);setSpeech("");if(typeof window!=="undefined"&&"speechSynthesis"in window)window.speechSynthesis.cancel()}
 function speak(){if(typeof window==="undefined"||!("speechSynthesis"in window)){setSpeech("Speech isn't available in this browser.");return}window.speechSynthesis.cancel();let u=new SpeechSynthesisUtterance(sample.ko);u.lang="ko-KR";u.rate=.84;u.onstart=()=>setSpeech("Playing Korean…");u.onend=()=>setSpeech("");u.onerror=()=>setSpeech("Korean playback isn't available here.");window.speechSynthesis.speak(u)}
 return <main className={s.root}>
  <a className={s.skip} href="#system">Skip to Hallim's features</a>
  <header className={s.header}>
   <div className={s.nav}>
    <a className={s.brand} href="./" aria-label="Hallim landing page"><Logo/><span>hallim<small lang="ko">한림</small></span></a>
    <nav className={s.navLinks} aria-label="Page navigation"><a href="#system">How it works</a><a href="#inside">Inside Hallim</a><a href="#connections">Learning together</a></nav>
    <a className={s.navStart} href={entry}>Start learning <Arrow/></a>
    <button type="button" className={s.menuButton} aria-label={menu?"Close navigation":"Open navigation"} aria-controls="v2-menu" aria-expanded={menu} onClick={()=>setMenu(!menu)}>{menu?"Close ×":"Menu ☰"}</button>
   </div>
   {menu&&<nav id="v2-menu" className={s.mobileMenu} aria-label="Mobile navigation"><a href="#system" onClick={()=>setMenu(false)}>How it works</a><a href="#inside" onClick={()=>setMenu(false)}>Inside Hallim</a><a href="#connections" onClick={()=>setMenu(false)}>Learning together</a><a href={entry}>Start learning ↗</a></nav>}
  </header>

  <section className={s.hero} aria-labelledby="hero-title">
   <div className={s.heroInner}>
    <div className={s.heroCopy}>
     <span className={s.heroPill}><span aria-hidden="true">✳</span> A companion for the way you actually learn</span>
     <h1 id="hero-title">Your Korean world,<br/><em>all connected.</em></h1>
     <p>Learn Korean inside a real study workspace: a level-based Companion route, a searchable Word Map, grammar and pronunciation guides, honest study checks, intelligent review, and people to practise with.</p>
     <div className={s.heroActions}><a className={s.primary} href="#system">Explore Hallim <Arrow/></a><a className={s.secondary} href={entry}>Start your journey <Arrow/></a></div>
     {authError&&<p className={s.authError} role="alert">{authError}</p>}
     <div className={s.heroAside}><span className={s.dotCluster} aria-hidden="true"><i lang="ko">가</i><i lang="ko">나</i><i lang="ko">다</i></span><span>Six entry levels, one connected learning route—from Starter to Advanced.</span></div>
    </div>
    <LevelJourney/>
   </div>
   <div className={s.stats} aria-label="Hallim's learning library"><span><strong>15</strong><small>published units</small></span><i aria-hidden="true"/><span><strong>76</strong><small>lessons & checkpoints</small></span><i aria-hidden="true"/><span><strong>5 → 1</strong><small>learning inputs, one route</small></span></div>
  </section>

  <FeatureAtlas authHref={authHref}/>

  <section className={s.inside} id="inside" aria-labelledby="inside-title">
   <div className={s.insideTop}><div><span className={s.kicker}>From the real Hallim workspace</span><h2 id="inside-title">One lesson starts it.<br/>The rest connects.</h2></div><p>Companion introduces the language. Word Map and Grammar help you understand it. Listening, shadowing, checkpoints and review help you use and retain it.</p></div>
   <div className={s.experience}>
    <div className={s.journeyNav} role="group" aria-label="Preview a stage of the learning journey">
     {[["learn","01","Learn","Meet the language"],["use","02","Use it","Make it yours"],["return","03","Come back","Remember it longer"]].map(([id,num,title,sub])=><button key={id} type="button" onClick={()=>setView(id)} aria-pressed={view===id} className={view===id?s.journeyActive:s.journeyButton}><span>{num}</span><strong>{title}</strong><small>{sub}</small><b aria-hidden="true">↗</b></button>)}
     <div className={s.journeyNote}><strong>One learning desk.</strong><p>Companion → Word Map &amp; Grammar → listening, shadowing and sentence building → study checks → adaptive review. Your profile brings the evidence together.</p></div>
    </div>
    <div className={s.experiencePanel}>
     {view==="learn"&&<div className={s.learnPanel}>
      <div className={s.panelIntro}><span className={s.tag}>COMPANION · WORD MAP · GRAMMAR</span><h3>Meet the phrase. Understand the parts.</h3><p>Choose a starting level. Companion gives each lesson a real-life purpose; Word Map searches words by meaning, while the Grammar guide explains patterns, examples, pronunciation and spoken chunks.</p></div>
      <div className={s.learnCanvas}><div className={s.lessonTop}><span>YOUR FIRST CONVERSATION</span><span>01 / COMPANION</span></div><div className={s.learnSentence} lang="ko">저는 학생이에요.</div><div className={s.learnEnglish}>I'm a student.</div><div className={s.wordRow}><div><strong lang="ko">저는</strong><small>as for me</small></div><div><strong lang="ko">학생</strong><small>student</small></div><div><strong lang="ko">이에요</strong><small>am / is</small></div></div><div className={s.grammarHint}><span>Grammar in context</span><strong>이에요 / 예요</strong><p>Choose the form based on whether the preceding word ends with a consonant or a vowel.</p></div></div>
      <div className={s.panelBottom}><span>Hear syllables, inspect pronunciation notes or follow a grammar example as you learn.</span><div className={s.panelLinks}><a href={authHref("/?view=vocab")}>Word Map <Arrow/></a><a href={authHref("/?view=grammar")}>Grammar <Arrow/></a><a href={entry}>Companion <Arrow/></a></div></div>
     </div>}
     {view==="use"&&<div className={s.usePanel}>
      <div className={s.panelIntro}><span className={s.tag}>LISTEN · SHADOW · DICTATE · BUILD</span><h3>Turn recognition into a sentence.</h3><p>A real Companion lesson can move from vocabulary and grammar to listening, shadowing, dictation, reading and sentence building. Try a small sentence-building moment below.</p></div>
      <div className={s.demoCanvas}>
       <div className={s.demoContext}><div><small>IN A REAL MOMENT</small><strong>{sample.setting}</strong></div><div className={s.demoNav}><button type="button" aria-label="Previous conversation" onClick={()=>changeScene(-1)}>←</button><span>{scene+1}/{moments.length}</span><button type="button" aria-label="Next conversation" onClick={()=>changeScene(1)}>→</button></div></div>
       <div className={s.demoPhrase} lang="ko">{sample.ko}</div><div className={s.demoPhonetic}>{sample.phonetic}</div>
       <div className={s.demoButtons}><button type="button" onClick={speak}>♪ &nbsp; Hear the Korean</button><button type="button" onClick={()=>setShown(!shown)}>{shown?"Hide meaning":"Reveal meaning"}</button></div>
       <div className={s.demoMeaning} aria-live="polite">{shown?sample.en:"Try listening before revealing the meaning."}</div>
       <div className={s.assemble}><span>NOW BUILD THE SENTENCE</span><div className={s.answer} aria-live="polite">{assembled||"Tap the words in order…"}</div><div className={s.pieces}>{[1,2,0].map(i=><button type="button" key={i} disabled={words.includes(i)} onClick={()=>setWords(prev=>[...prev,i])} lang="ko">{sample.parts[i]}</button>)}</div><div className={s.answerBottom}><span aria-live="polite">{correct?"Nicely done. You've built the sentence.":words.length===3?"Not quite. Try a different order.":"Try without worrying about a score."}</span><button type="button" onClick={()=>setWords([])}>Reset ↶</button></div></div>
       <span className={s.speechStatus} aria-live="polite">{speech}</span>
      </div>
      <div className={s.panelBottom}><span>Full lessons also include listening, shadowing, dictation and reading.</span><a href={entry}>Open your lesson <Arrow/></a></div>
     </div>}
     {view==="return"&&<div className={s.returnPanel}>
      <div className={s.panelIntro}><span className={s.tag}>LEVEL TESTS · CHECKPOINTS · SPACED REVIEW</span><h3>Your mistakes become a useful next step.</h3><p>Hallim records what you actually answered. Wrong responses enter a review queue; correct reviews widen the interval, while further mistakes come back sooner. Completed lessons alone never prove mastery.</p></div>
      <div className={s.returnCanvas}><div className={s.resultCard}><span>REVIEW EXAMPLE</span><strong lang="ko">저는 학생___</strong><div>Correct answer <b lang="ko">이에요</b></div><p><b>Why:</b> 학생 ends in a consonant, so 이에요 is used.</p></div><div className={s.interval}><span>WHEN IT COMES BACK</span><div><b>3d</b><i>→</i><b>7d</b><i>→</i><b>14d</b><i>→</i><b>30d</b><i>→</i><b>60d</b></div><small>Illustrative successful-review intervals, not your personal data.</small></div><div className={s.checkBar}><span>Study checks</span><b>→</b><span>Mistake log</span><b>→</b><span>Review</span><b>→</b><span>Progress</span></div></div>
      <div className={s.panelBottom}><span>What you've answered informs what deserves another look.</span><a href={authHref("/?view=review")}>Explore Review <Arrow/></a></div>
     </div>}
    </div>
   </div>
   <div className={s.experienceFoot}><span>THE SAME LEARNING PATH</span><p>Starter → Foundation → Elementary → Lower Intermediate → Intermediate → Advanced</p></div>
  </section>

  <section className={s.connections} id="connections" aria-labelledby="connections-title">
   <div className={s.connectionsHeading}><span className={s.kicker}>Beyond the lesson</span><h2 id="connections-title">Your next step isn't<br/>a guessing game.</h2><p>Hallim combines evidence-based AI learning tools with optional Study Partners—so you can work on your actual weak points, on your own or with someone whose strengths complement yours.</p></div>
   <div className={s.connectionGrid}>
    <article className={s.ai}><div className={s.connectionTop}><span className={s.connectionIcon} aria-hidden="true">✳</span><span>HALLIM INTELLIGENCE</span></div><h3>Six focused tools. Grounded in your work.</h3><p>Hallim's learning audit reads available progress and test history. Six Intelligence tools use that evidence to explain errors, adjust practice, suggest a plan and check level readiness—without inventing speaking scores or certifying TOPIK.</p><div className={s.aiTools}>{aiTools.map(([name,desc])=><div key={name}><span aria-hidden="true">↗</span><strong>{name}</strong><small>{desc}</small></div>)}</div><a href={other}>Explore learning intelligence <Arrow/></a></article>
    <article className={s.partner}><div className={s.connectionTop}><span className={s.connectionIcon} aria-hidden="true">↔</span><span>STUDY PARTNERS</span></div><h3>Find the learner who fills your gaps.</h3><p>Opt in to discover learners with complementary vocabulary and grammar strengths. After a mutual yes, use a shared room to exchange only the notes you choose, talk, and build a three-round practice session from your shared vocabulary and grammar.</p><div className={s.partnerDemo}><div><span className={s.partnerAvatar} lang="ko">가</span><span><small>LEARNER A</small><strong>Vocabulary comes naturally</strong><em>Working on grammar</em></span></div><div className={s.joinLine}><span>SELECTIVE NOTE SHARING · MUTUAL PRACTICE</span><b aria-hidden="true">↔</b></div><div><span className={s.partnerAvatar} lang="ko">문</span><span><small>LEARNER B</small><strong>Grammar comes naturally</strong><em>Working on vocabulary</em></span></div></div><small className={s.partnerDisclaimer}>Illustrative profiles. Notes can be shared selectively and access can be revoked; joint practice does not automatically grade either learner.</small><a href="https://hallium.vercel.app/study-partners">Explore Study Partners <Arrow/></a></article>
   </div>
  </section>

  <section className={s.end} aria-labelledby="end-title">
   <div className={s.endText}><span className={s.kicker}>A learning home, at your level</span><h2 id="end-title">Come for a word.<br/>Stay for the journey.</h2><p>Start with Hangul, choose your Companion level or try Real Korean's everyday phrase bank and AI Message Makeover. Your own saved learning history begins after Google sign-in.</p></div>
   <div className={s.endActions}><a href={entry} className={s.primary}>Start learning with Google <Arrow/></a><a href="https://hallium.vercel.app/hangul" className={s.secondary}>Explore Hangul Lab <Arrow/></a></div>
   <div className={s.endLinks}><a href="https://hallium.vercel.app/demo">Product tour ↗</a><a href={authHref("/?view=partner")}>Real Korean + Message Makeover ↗</a><a href="https://hallium.vercel.app/study-partners">Study Partners ↗</a><a href="https://hallium.vercel.app/flashcards">Starter flashcards ↗</a></div>
   <div className={s.faq}><h3>A few things to know.</h3><div>{faqs.map(([q,a])=><details key={q}><summary>{q}<span aria-hidden="true">+</span></summary><p>{a}</p></details>)}</div></div>
  </section>
 </main>
}
