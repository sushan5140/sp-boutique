"use client";
import { useState } from "react";
import s from "./feature-atlas.module.css";

const nodes = [
  {name:"Companion", sub:"A lesson with a purpose", icon:"가", evidence:"The lessons you've finished and the ones ahead.", description:"Learn a real-world phrase, meet the grammar inside it, then use it before moving on.", where:"#inside"},
  {name:"Word map & grammar", sub:"Meaning, sound and pattern", icon:"한", evidence:"Level-based words, meaning search, syllable audio, pronunciation notes and spoken grammar chunks.", description:"Find words by meaning, hear their sounds, inspect Korean pronunciation rules, then see how grammar turns words into natural sentences.", where:"#inside"},
  {name:"Active practice", sub:"Hear · shadow · write · build", icon:"♪", evidence:"Completed listening, shadowing, dictation, reading and sentence-building steps.", description:"Practise in multiple ways rather than only flipping word cards: hear the Korean, shadow its rhythm, dictate it and rebuild a sentence.", where:"#inside"},
  {name:"Study checks", sub:"What can you recall on your own?", icon:"✓", evidence:"Level-specific vocabulary and grammar tests, unit checkpoints and test history.", description:"A completed lesson isn't a passing score. Checks record the answers you actually gave so your next study recommendation has evidence.", where:"#inside"},
  {name:"Review", sub:"Bring the weak links back", icon:"↺", evidence:"Due mistakes, repairs, repeat attempts and retention intervals.", description:"Return to the exact questions that need work: correct reviews push them further away, missed reviews schedule an earlier return.", where:"#inside"},
];

export default function FeatureAtlas({authHref}){
 const [selected,setSelected]=useState(0);
 const node=nodes[selected];
 return <section className={s.section} id="system" aria-labelledby="system-title">
  <div className={s.container}>
   <div className={s.heading}>
    <div><span className={s.kicker}><span aria-hidden="true">✳</span> Meet the Hallim system</span><h2 id="system-title">Five connected inputs.<br/><em>One place to grow.</em></h2></div>
    <p>This is how the actual app is organised: Companion, Word Map and Grammar, active practice, checks and adaptive review inform a single learning route. Select a part to see how it fits.</p>
   </div>
   <div className={s.diagram}>
    <div className={s.diagramCaption}><span>THE LEARNING CIRCUIT</span><span>SELECT A SIGNAL TO EXPLORE</span></div>
    <div className={s.diagramBody}>
     <div className={s.inputs} role="group" aria-label="Hallim's five learning inputs">
      {nodes.map((item,i)=><button key={item.name} type="button" onClick={()=>setSelected(i)} aria-pressed={i===selected} className={i===selected?s.inputActive:s.input}>
       <span className={s.inputIcon} aria-hidden="true">{item.icon}</span>
       <span className={s.inputText}><strong>{item.name}</strong><small>{item.sub}</small></span>
       <span className={s.inputEnd} aria-hidden="true">{i===selected?"●":"↗"}</span>
      </button>)}
     </div>
     <svg className={s.lines} viewBox="0 0 140 448" preserveAspectRatio="none" aria-hidden="true">{[42,133,224,315,406].map((y,i)=><path key={i} d={"M 0 "+y+" C 74 "+y+" 74 224 140 224"} className={selected===i?s.lineActive:s.line}/>)}
      <circle cx="137" cy="224" r="5" fill="#3560c9"/>
     </svg>
     <div className={s.output} aria-live="polite">
      <div className={s.outputHead}><span className={s.outputMark} aria-hidden="true">ㅎ</span><div><small>ONE PLACE TO CONNECT THE DOTS</small><strong>Hallim Intelligence</strong></div><span className={s.outputStar} aria-hidden="true">✳</span></div>
      <div className={s.outputMain} key={node.name}>
       <span className={s.nowLabel}>You're exploring <b>{node.name}</b></span>
       <h3>{node.description}</h3>
       <div className={s.evidence}><span>This adds to your learning picture</span><p>{node.evidence}</p></div>
      </div>
      <div className={s.next}><span>A BETTER NEXT STEP</span><div><span>Learn</span><b aria-hidden="true">→</b><span>Apply</span><b aria-hidden="true">→</b><span>Recheck</span></div></div>
      <p className={s.disclaimer}>Illustrative system map. AI suggestions require an account and available learning evidence.</p>
     </div>
    </div>
   </div>
   <div className={s.under}><div><strong>15</strong><span>published units</span></div><div><strong>76</strong><span>lessons & checkpoints</span></div><div><strong>6</strong><span>AI study tools</span></div><a href={authHref("/?view=companion")}>Open the real Hallim workspace <span aria-hidden="true">↗</span></a></div>
  </div>
 </section>;
}
