"use client";
import { useState } from "react";
import s from "./feature-atlas.module.css";

const signals=[
 {key:"curriculum",number:"01",icon:"▦",title:"Companion curriculum",subtitle:"15 units · a level-to-level route",description:"Your selected starting point and target level shape the lessons in front of you, from introductions to connected Korean.",detail:"Starter / Foundation → Elementary → Lower Intermediate → Intermediate → Advanced",href:"#curriculum"},
 {key:"practice",number:"02",icon:"◉",title:"Active language practice",subtitle:"Listen · shadow · build · read",description:"Lesson steps move between understanding and use: hearing a line, repeating it, typing what you heard and building a Korean sentence.",detail:"Vocabulary · grammar · listening · shadowing · dictation · reading · sentence building",href:"#lesson-lab"},
 {key:"language",number:"03",icon:"한",title:"Word map + grammar",subtitle:"Sounds, patterns and examples",description:"Explore the vocabulary and grammar in your selected level separately, with pronunciation breakdowns and examples.",detail:"Word coach · syllable playback · natural pronunciation notes · grammar chunks",href:"#language-desk"},
 {key:"evidence",number:"04",icon:"▤",title:"Study checks",subtitle:"What do you actually remember?",description:"Level-specific study tests and unit checkpoints make it possible to see what you answered, rather than treating every lesson as proof of mastery.",detail:"Level-specific vocabulary and grammar tests · checkpoints · test history",href:"#review-loop"},
 {key:"review",number:"05",icon:"↺",title:"Review + progress",subtitle:"Return to the weak links",description:"Mistakes become review items. Correct reviews spread the interval; wrong answers come back sooner. Your profile keeps the learning evidence together.",detail:"Due review · repaired mistakes · completed lessons · synced progress",href:"#review-loop"}
];
const intelligence=[
 ["✳","AI learning audit","Read the performance evidence behind a learner's current route."],
 ["↗","Automatic difficulty","Use actual results to guide the challenge of subsequent practice."],
 ["◎","Explain my mistake","Unpack an incorrect answer and the rule behind the correction."],
 ["↺","Adaptive review","Target the areas the learner has actually missed."],
 ["▦","Personal study plan","Turn study signals into a focused multi-day learning route."],
 ["✓","Fresh checkpoint + promotion audit","Generate a new mastery check and review evidence for moving levels."]
];
const bands=[
 {level:"Starter + Foundation",units:"Everyday Korean",words:"Hello · routines · simple plans",value:26},
 {level:"Elementary",units:"Make yourself understood",words:"Shopping · directions · past and future",value:46},
 {level:"Lower Intermediate",units:"Connect the conversation",words:"Reasons · comparisons · conversation",value:66},
 {level:"Intermediate",units:"Say what you mean",words:"Reported speech · cause and consequence",value:82},
 {level:"Advanced",units:"Think in Korean",words:"Inference · argument · nuance",value:100},
];
const lessonStages=[
 ["01","Learn the words","안녕하세요 · 이름 · 학생"],
 ["02","Understand the grammar","저는 학생이에요."],
 ["03","Choose the right answer","학생 + 이에요"],
 ["04","Listen to the dialogue","Hear it before reading the answer"],
 ["05","Shadow the sentence","Repeat the rhythm aloud"],
 ["06","Build the phrase","저는 + 학생이에요"],
 ["07","Finish with an outcome","A greeting you can actually use"]
];
function Arrow(){return <span aria-hidden="true">↗</span>}
function Word({children}){return <span lang="ko">{children}</span>}
export function HallimHeroGraph(){
 return <div className={s.heroBoard} aria-label="Illustration showing Hallim’s curriculum, practice, tests and review feeding one daily learning route">
  <div className={s.boardTop}><span><i/> HALLIM / LEARNING DESK</span><span>ILLUSTRATIVE PREVIEW</span></div>
  <div className={s.boardRoute}><small>YOUR KOREAN ROUTE</small><strong>Starter <span>→</span> Elementary</strong><p>One path, built around your level and progress.</p></div>
  <div className={s.boardToday}><div><span className={s.boardFlower}>✳</span><span><small>TODAY’S HALLIM PATH</small><b>Make Korean usable.</b></span></div><span className={s.boardNow}>3 STEPS</span></div>
  <div className={s.boardSteps}>
   <div><span className={s.boardNumber}>1</span><span><b>Continue a Companion lesson</b><small>Vocabulary → grammar → conversation</small></span><span>↗</span></div>
   <div><span className={s.boardNumber}>2</span><span><b>Review the words you missed</b><small>Return to a weak link, not the whole unit</small></span><span>↗</span></div>
   <div><span className={s.boardNumber}>3</span><span><b>Check what you can recall</b><small>Use results to inform what comes next</small></span><span>↗</span></div>
  </div>
  <div className={s.boardBottom}><span><strong>15</strong><small>published units</small></span><span><strong>76</strong><small>lessons + checkpoints</small></span><span><strong>5</strong><small>learning bands</small></span></div>
 </div>
}
export function HallimFeatureSystem({authHref}){
 const [focus,setFocus]=useState(0);
 const chosen=signals[focus];
 const entry=authHref("/?view=companion");
 const profile=authHref("/?view=profile");
 const review=authHref("/?view=review");
 const vocab=authHref("/?view=vocab");
 const grammar=authHref("/?view=grammar");
 return <div className={s.wrap} id="features">
  <section className={s.atlas} aria-labelledby="atlas-heading">
   <div className={s.atlasIntro}><div><p className={s.eyebrow}>THE ENTIRE HALLIM SYSTEM</p><h2 id="atlas-heading">Not five disconnected tools.<br/><em>One learning journey.</em></h2></div><p>Lessons, practice, language tools, study checks and review all contribute to a clearer next step. Select an input to see how the parts connect.</p></div>
   <div className={s.graph} aria-label="Five parts of Hallim connect to Hallim Intelligence">
    <div className={s.signalList} aria-label="Select a learning signal">{signals.map((item,i)=><button key={item.key} onClick={()=>setFocus(i)} type="button" className={focus===i?s.signalActive:s.signal} aria-pressed={focus===i}><span className={s.signalNumber}>{item.number}</span><span className={s.signalIcon} aria-hidden="true">{item.icon}</span><span className={s.signalText}><strong>{item.title}</strong><small>{item.subtitle}</small></span><span className={s.signalArrow} aria-hidden="true">↗</span></button>)}</div>
    <svg className={s.wires} viewBox="0 0 170 490" preserveAspectRatio="none" aria-hidden="true"><defs><linearGradient id="hallim-wire-gradient"><stop stopColor="#a494dc"/><stop offset="1" stopColor="#7d68c8"/></linearGradient></defs>{[49,147,245,343,441].map((y,i)=><g key={i}><path className={focus===i?s.wireActive:s.wire} d={`M 0 ${y} C 88 ${y}, 67 245, 170 245`}/><circle cx="1" cy={y} r="4" className={focus===i?s.dotActive:s.dot}/></g>)}<circle cx="166" cy="245" r="7" fill="#7060bf" stroke="#f9f7f1" strokeWidth="3"/></svg>
    <div className={s.hub}><div className={s.hubTop}><span className={s.hubMark}>ㅎ</span><span><small>ONE CONNECTED DESTINATION</small><strong>Hallim Intelligence</strong></span><span className={s.hubSpark}>✳</span></div><div className={s.hubFocus} key={chosen.key}><span className={s.hubLabel}>FROM {chosen.number} / {chosen.title.toUpperCase()}</span><h3>{chosen.description}</h3><p>{chosen.detail}</p><a href={chosen.href}>Explore this feature <Arrow/></a></div><div className={s.hubOutcome}><span>YOUR NEXT MOVE, INFORMED BY YOUR WORK</span><div><i>1</i> Continue learning</div><div><i>2</i> Review what needs work</div><div><i>3</i> Recheck your understanding</div></div><small className={s.illustration}>Illustrative flow. AI suggestions depend on a signed-in learner’s available evidence.</small></div>
   </div>
   <div className={s.atlasFooter}><span><b>5</b> connected learning inputs</span><span><b>1</b> personal route</span><span><b>6</b> AI study tools</span><a href={entry}>Open the real learning workspace <Arrow/></a></div>
  </section>

  <section className={s.curriculum} id="curriculum">
   <div className={s.deepCopy}><p className={s.eyebrow}>01 / THE LEARNING ROADMAP</p><h2>From <Word>안녕하세요</Word> to thoughts that sound like you.</h2><p>You shouldn’t have to guess which lesson belongs next. Hallim asks where you are and where you want to go, then opens a route through its published curriculum.</p><div className={s.bigNumbers}><span><b>15</b><small>published units</small></span><span><b>76</b><small>lessons & checkpoints</small></span><span><b>5</b><small>learning bands</small></span></div><a href={entry} className={s.featureLink}>Find your starting point <Arrow/></a></div>
   <div className={s.bandBoard}><div className={s.boardSectionTop}><span>THE ROUTE / STARTER → ADVANCED</span><span>01—05</span></div>{bands.map((item,i)=><div className={s.band} key={item.level}><div className={s.bandRow}><span>{String(i+1).padStart(2,"0")}</span><strong>{item.level}</strong><small>{item.units}</small></div><div className={s.bandMeter}><i style={{width:item.value+"%"}}/></div><p>{item.words}</p></div>)}<div className={s.boardNote}>Five broad bands shown for orientation; Starter and Foundation are separate choices inside Hallim. This is a curriculum map, not a user progress chart.</div></div>
  </section>

  <section className={s.practice} id="lesson-lab">
   <div className={s.sectionTitle}><p className={s.eyebrow}>02 / COMPANION LESSONS</p><h2>It’s not a slideshow of vocabulary.<br/><em>You have to use the Korean.</em></h2><p>A single lesson can move from hearing a phrase to understanding its pattern, answering a question, listening again, and putting a sentence together.</p></div>
   <div className={s.lessonGrid}><div className={s.lessonPreview}><div className={s.lessonTop}><span><i/> LIVE LESSON FORMAT</span><span>MEETING SOMEONE NEW</span></div><span className={s.lessonTag}>COMPANION · STARTER</span><h3>오늘은 한국어로<br/>말해 봐요.</h3><p>Today, try saying it in Korean.</p><div className={s.lessonBubble}><span>VOCABULARY</span><b lang="ko">안녕하세요</b><small>Hello · polite greeting</small></div><div className={s.lessonBubble+" "+s.lessonBubbleDark}><span>GRAMMAR IN CONTEXT</span><b lang="ko">저는 학생이에요.</b><small>저는 · 학생 · 이에요</small></div><div className={s.lessonEnd}>LISTEN, SHADOW & BUILD <span>↗</span></div><small className={s.illustration}>Sample content from Hallim’s first lesson.</small></div><div className={s.lessonStages}><p>What happens inside a lesson</p>{lessonStages.map(([n,title,detail])=><div key={n}><span>{n}</span><strong>{title}</strong><small>{detail}</small><span className={s.stepCheck} aria-hidden="true">↗</span></div>)}<a href={entry} className={s.featureLink}>Go to Companion lessons <Arrow/></a></div></div>
   <div className={s.practiceTicker} aria-label="Practice formats"><span>VOCABULARY</span><i/> <span>GRAMMAR</span><i/> <span>LISTENING</span><i/><span>SHADOWING</span><i/><span>DICTATION</span><i/><span>READING</span><i/><span>SENTENCE BUILDING</span><i/><span>CHECKPOINTS</span></div>
  </section>

  <section className={s.desk} id="language-desk"><div className={s.deskCopy}><p className={s.eyebrow}>03 / YOUR LANGUAGE DESK</p><h2>A word map for the words.<br/>A grammar room for <em>the why.</em></h2><p>Leave the lesson without losing its context. Explore vocabulary and grammar by level, listen to Korean, and see the patterns split into understandable pieces.</p><div className={s.microFeatures}><span>Sound + syllable playback</span><span>Pronunciation notes</span><span>Grammar pattern breakdowns</span><span>Level-based study packs</span><span>Real example sentences</span><span>Word coach</span></div><div className={s.deepActions}><a href={vocab} className={s.featureLink}>Explore Word Map <Arrow/></a><a href={grammar} className={s.featureLink}>Explore Grammar <Arrow/></a></div></div><div className={s.deskVisual}><div className={s.deskCard}><div><small>WORD MAP / HOW A WORD SOUNDS</small><span>♪</span></div><strong lang="ko">학생</strong><span className={s.pronunciation}>[학쌩]</span><p>student</p><div className={s.wordChips}><span>학</span><span>생</span><span>▶ Say it naturally</span></div></div><div className={s.grammarCard}><small>GRAMMAR / THE PATTERN</small><strong lang="ko">저는 학생이에요.</strong><p>I'm a student.</p><div><span>저는 <small>as for me</small></span><span>학생 <small>student</small></span><span>이에요 <small>am / is</small></span></div></div><span className={s.deskSideText}>SOUND → MEANING → STRUCTURE</span></div></section>

  <section className={s.reviewSection} id="review-loop"><div className={s.reviewCopy}><p className={s.eyebrow}>04 / STUDY CHECKS + REVIEW</p><h2>Hallim remembers what you <em>almost</em> remembered.</h2><p>A missed question becomes something to work on. Hallim’s review cycle schedules a weak item again, expands the interval after correct reviews, and keeps your test history and completed lessons in one profile.</p><div className={s.reviewPoints}><span><b>01</b> Level-specific vocabulary & grammar checks</span><span><b>02</b> Mistake explanations and due review</span><span><b>03</b> Review intervals of 3, 7, 14, 30 and 60 days as answers improve</span><span><b>04</b> Synced learning progress after Google sign-in</span></div><a href={review} className={s.featureLink}>Open the review workspace <Arrow/></a></div><div className={s.reviewVisual}><div className={s.reviewHeader}><span>REVIEW / ONE WEAK LINK AT A TIME</span><span>↻</span></div><div className={s.reviewQuestion}><small>GRAMMAR PATTERN · EXAMPLE</small><strong>Which form completes the sentence?</strong><b lang="ko">저는 학생___</b></div><div className={s.reviewOptions}><div className={s.reviewCorrect}>이에요 <span>✓ CORRECT</span></div><div>예요</div></div><div className={s.reviewSchedule}><span><i/> AFTER A CORRECT REVIEW</span><strong>3d <span>→</span> 7d <span>→</span> 14d <span>→</span> 30d <span>→</span> 60d</strong><small>The next interval follows your review history.</small></div><small className={s.illustration}>Illustrative example, not a real learner’s record.</small></div></section>

  <section className={s.intelligence} id="intelligence"><div className={s.intelligenceHead}><p className={s.eyebrow}>05 / HALLIM INTELLIGENCE</p><h2>Not a chatbot that guesses<br/>how good you are. <em>Tools that use your work.</em></h2><p>When enough evidence is available, Hallim Intelligence can turn study results, progress and missed questions into targeted suggestions. It does not certify your TOPIK level or claim unmeasured speaking ability.</p></div><div className={s.intelligenceLayout}><div className={s.aiCore}><div className={s.aiCoreTop}><span className={s.aiMark}>✳</span><span>THE ADAPTIVE LEARNING ENGINE</span></div><h3>Today’s Hallim Path</h3><p>Turn recognition into use and return to what matters.</p><div className={s.aiLine}><span>01</span><div><strong>Continue a lesson</strong><small>Learn within your chosen route</small></div><b>↗</b></div><div className={s.aiLine}><span>02</span><div><strong>Target a weak point</strong><small>Review recorded errors</small></div><b>↗</b></div><div className={s.aiLine}><span>03</span><div><strong>Recheck your understanding</strong><small>Use a fresh mastery check</small></div><b>↗</b></div><small>Example of the route format, not an actual AI-generated assessment.</small></div><div className={s.aiCapabilities}>{intelligence.map(([icon,title,body],i)=><article key={title}><span className={s.aiIcon}>{icon}</span><div><small>TOOL {String(i+1).padStart(2,"0")}</small><h3>{title}</h3><p>{body}</p></div></article>)}</div></div><a href={profile} className={s.aiButton}>See your learning intelligence <Arrow/></a></section>

  <section className={s.extras}><div className={s.extrasIntro}><p className={s.eyebrow}>06 / AND THE REST OF YOUR WORLD</p><h2>Learning isn't only<br/>what happens in lessons.</h2></div><div className={s.extrasGrid}><a href="https://hallium.vercel.app/hangul"><strong lang="ko">가 나 다</strong><h3>Hangul Lab</h3><p>Begin with the script: letters, syllables, sound and writing practice.</p><span>Explore the writing system ↗</span></a><a href={authHref("/?view=partner")}><strong lang="ko">뭐 해?</strong><h3>Real Korean</h3><p>A phrase bank for everyday check-ins, affection, care, and casual situations—with usage notes.</p><span>Learn what people really say ↗</span></a><a href="https://hallium.vercel.app/study-partners"><strong>↔ ✳</strong><h3>Study Partners</h3><p>Opt-in matching, mutual requests, private notes, shared rooms and three-round practice from shared material.</p><span>Discover complementary learners ↗</span></a><a href="https://hallium.vercel.app/flashcards"><strong>▤ ♡</strong><h3>Starter flashcards</h3><p>Another way to meet and revisit introductory Korean vocabulary.</p><span>Open the flashcards ↗</span></a></div></section>
 </div>
}
