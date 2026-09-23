"use client";
import { useState } from "react";
import s from "./level-journey.module.css";

const levels = {
  starter:{
    key:"starter",label:"Starter",korean:"저는 학생이에요.",roman:"jeoneun haksaeng-ieyo",english:"I'm a student.",
    prompt:"A first introduction",note:"The simplest way to tell someone who you are.",
    tokens:[["저는","I / as for me"],["학생","student"],["이에요","am / is"]],
    steps:[["Meet the words","저는 · 학생"],["Hear the pattern","이에요 / 예요"],["Make a sentence","저는 학생이에요."]],
    mini:"FIRST CONVERSATIONS",index:"01",chapter:"Say who you are"
  },
  elementary:{
    key:"elementary",label:"Elementary",korean:"저는 어제 친구를 만났어요.",roman:"jeoneun eoje chingureul mannasseoyo",english:"I met a friend yesterday.",
    prompt:"A little story",note:"Connect the person, the time and what happened.",
    tokens:[["어제","yesterday"],["친구를","a friend"],["만났어요","met"]],
    steps:[["Recall familiar words","친구 · 어제"],["Meet past tense","만났어요"],["Tell your own story","어제 친구를 만났어요."]],
    mini:"PAST & FUTURE",index:"03",chapter:"Tell someone what happened"
  }
};

export default function LevelJourney(){
 const [level,setLevel]=useState("starter");
 const [sound,setSound]=useState("");
 const current=levels[level];
 function speak(){
  if(typeof window==="undefined"||!("speechSynthesis"in window)){setSound("Speech playback isn't available here.");return}
  window.speechSynthesis.cancel();
  const utterance=new SpeechSynthesisUtterance(current.korean);
  utterance.lang="ko-KR";utterance.rate=.82;
  utterance.onstart=()=>setSound("Playing Korean…");
  utterance.onend=()=>setSound("");
  utterance.onerror=()=>setSound("A Korean voice isn't available on this device.");
  window.speechSynthesis.speak(utterance);
 }
 function change(next){if(next===level)return;if(typeof window!=="undefined"&&"speechSynthesis"in window)window.speechSynthesis.cancel();setSound("");setLevel(next)}
 return <div className={s.outer}>
  <div className={s.orbitA} aria-hidden="true"/><div className={s.orbitB} aria-hidden="true"/>
  <div className={s.panel} aria-label="Interactive illustration of Hallim learning routes">
   <div className={s.toolbar}><span className={s.symbol} aria-hidden="true">ㅎ</span><span className={s.product}>Hallim <b>learning routes</b></span><span className={s.presence}><i/> LIVE PREVIEW</span></div>
   <div className={s.canvas}>
    <div className={s.selectorTop}><span>Choose a chapter to explore</span><span className={s.selectorHint}>TRY BOTH LEVELS ↘</span></div>
    <div className={s.switcher} role="group" aria-label="Preview Korean learning level">
     <button type="button" aria-pressed={level==="starter"} className={level==="starter"?s.selected:""} onClick={()=>change("starter")}><span lang="ko">가</span> Starter</button>
     <button type="button" aria-pressed={level==="elementary"} className={level==="elementary"?s.selected:""} onClick={()=>change("elementary")}><span lang="ko">나</span> Elementary</button>
    </div>
    <div className={s.lesson} key={level}>
     <div className={s.lessonMeta}><span>{current.index} / {current.mini}</span><span>{current.chapter}</span></div>
     <div className={s.lessonWord} lang="ko">{current.korean}</div>
     <div className={s.lessonEnglish}>{current.english}</div>
     <div className={s.lessonRoman}>{current.roman}</div>
     <div className={s.line}/>
     <div className={s.tokens} aria-label="Korean word breakdown">{current.tokens.map(([korean,english])=><span key={korean}><b lang="ko">{korean}</b><small>{english}</small></span>)}</div>
     <div className={s.miniAction}><button type="button" className={s.audio} onClick={speak} aria-label="Hear the Korean sentence"><span aria-hidden="true">♪</span> Hear this line</button><span className={s.audioStatus} aria-live="polite">{sound}</span></div>
    </div>
    <div className={s.upNext}><div className={s.upHeading}><span>How this lesson connects</span><b>→</b></div><div className={s.nextGrid}>{current.steps.map(([title,body],i)=><div key={title}><i>{String(i+1).padStart(2,"0")}</i><strong>{title}</strong><small lang={/[가-힣]/.test(body)?"ko":undefined}>{body}</small></div>)}</div></div>
   </div>
   <div className={s.route}><div className={s.routeTitle}><span>REAL HALLIM LEVEL PATH</span><span aria-hidden="true">✳</span></div><div className={s.routeTrack}><span className={level==="starter"?s.routeCurrent:s.routePast}>Starter</span><span className={s.routeArrow}>→</span><span>Foundation</span><span className={s.routeArrow}>→</span><span className={level==="elementary"?s.routeCurrent:""}>Elementary</span></div><p>Next: Lower Intermediate → Intermediate → Advanced. This preview is illustrative; progress is saved only in the signed-in app.</p></div>
  </div>
  <div className={s.labelOutside}><span className={s.labelPulse} aria-hidden="true"/><span>BUILT TO TAKE YOU FURTHER</span><span>한 걸음씩 · ONE STEP AT A TIME</span></div>
 </div>
}
