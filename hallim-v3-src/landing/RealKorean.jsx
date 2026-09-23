"use client";
import {useState} from "react";
import s from "./real-korean.module.css";

const rizz=[
 {korean:"너 혹시 떡이야? 나랑 너무 찰떡인데?",roman:"neo hoksi tteogiya? narang neomu chaltteoginde?",english:"Are you tteok? Because you and I are a perfect match.",note:"찰떡 means sticky rice cake, but also a perfect match."},
 {korean:"너 때문에 심쿵했잖아. 책임져.",roman:"neo ttaemune simkunghaetjana. chaegimjyeo.",english:"You made my heart skip. Take responsibility.",note:"심쿵 is slang for that sudden heart-thump."},
 {korean:"너 혹시 자석이야? 왜 자꾸 너한테 끌리지?",roman:"neo hoksi jaseogiya? wae jakku neohante kkeulliji?",english:"Are you a magnet? Why am I so drawn to you?",note:"끌리다 means both to be pulled and to feel attracted."},
 {korean:"너 혹시 와이파이야? 가까이 가면 자꾸 연결되고 싶어.",roman:"neo hoksi waipaiya? gakkai gamyeon jakku yeongyeoldoego sipeo.",english:"Are you Wi-Fi? I keep wanting to connect when I'm close.",note:"연결되다 means to connect. Deliberately cheesy."}
];
const presets=[
 {name:"Did you eat?",english:"Did you eat?",casual:"밥 먹었어?",polite:"밥 먹었어요?",note:"A warm everyday check-in, not a word-for-word translation."},
 {name:"I miss you",english:"I miss you.",casual:"보고 싶어.",polite:"보고 싶어요.",note:"Korean expresses this as wanting to see someone."},
 {name:"Call later?",english:"Shall we call later?",casual:"이따 통화할까?",polite:"이따 통화할까요?",note:"통화하다 is more natural for a voice call."},
 {name:"Take care",english:"Take care and message me when you arrive.",casual:"조심히 가. 도착하면 연락해.",polite:"조심히 가세요. 도착하면 연락해 주세요.",note:"Korean often shows care through concrete actions."}
];
const people=["Friend","Close friend","Crush","Talking stage","Partner","Older / senior"];
const moods=["Natural","Cute","Funny","Flirty","Bold","Caring","Polite"];
function LinkArrow(){return <span aria-hidden="true">↗</span>}
export default function RealKorean({authHref}){
 const [tab,setTab]=useState("flirt");
 const [line,setLine]=useState(0);
 const [preset,setPreset]=useState(1);
 const [form,setForm]=useState({message:"",person:"Crush",vibe:"Flirty",intensity:45});
 const [tone,setTone]=useState("casual");
 const [audio,setAudio]=useState("");
 const chosen=rizz[line],instant=presets[preset];
 function play(ko){
  if(typeof window==="undefined"||!("speechSynthesis"in window)){setAudio("Playback isn't available here.");return}
  window.speechSynthesis.cancel();
  const utterance=new SpeechSynthesisUtterance(ko);
  utterance.lang="ko-KR";utterance.rate=.83;
  utterance.onstart=()=>setAudio("Playing Korean…");
  utterance.onend=()=>setAudio("");
  utterance.onerror=()=>setAudio("A Korean voice isn't available on this device.");
  window.speechSynthesis.speak(utterance);
 }
 function switchTab(next){setTab(next);setAudio("");if(typeof window!=="undefined"&&"speechSynthesis"in window)window.speechSynthesis.cancel()}
 return <article className={s.feature} id="real-korean" aria-labelledby="real-korean-heading">
  <div className={s.intro}>
   <div className={s.label}><span aria-hidden="true">♡</span> PARTNER KOREAN · REAL KOREAN</div>
   <h3 id="real-korean-heading">Your Korean has<br/><em>a little rizz, too.</em></h3>
   <p>Not the Study Partners matching system. This is the part of Hallim for someone you want to text: sweet check-ins, playful teasing, cheesy pickup lines, relationship conversations—and your own customized Korean message with AI.</p>
   <div className={s.categories}><span>12 phrase categories</span><span>Korean-only jokes</span><span>Cheesy flirting</span><span>5 mini-dialogues</span><span>Casual ↔ polite</span></div>
   <div className={s.heroLine}><span lang="ko">보고 싶어. ♡</span><small>I miss you. / I want to see you.</small></div>
   <a href={authHref("/?view=partner")} className={s.cta}>Explore Partner Korean <LinkArrow/></a>
  </div>
  <div className={s.preview}>
   <div className={s.previewTop}><div><span className={s.mark} aria-hidden="true">ㅎ</span><span><strong>Real Korean</strong><small>SOMETHING YOU'D ACTUALLY TEXT</small></span></div><span className={s.previewMeta}>INTERACTIVE PREVIEW</span></div>
   <div className={s.tabs} role="group" aria-label="Explore Partner Korean features">
    {[["flirt","Rizz line bank"],["preset","Everyday texts"],["custom","Make it yours"]].map(([key,name])=><button key={key} type="button" onClick={()=>switchTab(key)} aria-pressed={tab===key} className={tab===key?s.tabOn:""}>{name}</button>)}
   </div>
   {tab==="flirt"&&<div className={s.tabPanel}><span className={s.eyebrow}>CHEESY KOREAN FLIRTING</span><p className={s.tabIntro}>Actual lines from Hallim's searchable phrase bank, including explanations of the Korean wordplay.</p><div className={s.lineCard}><span>LINE {line+1} / {rizz.length}</span><strong lang="ko">{chosen.korean}</strong><small>{chosen.roman}</small><p>{chosen.english}</p><div className={s.context}><b>Why it works in Korean</b><span>{chosen.note}</span></div></div><div className={s.controls}><div className={s.dots}>{rizz.map((item,i)=><button type="button" key={item.korean} className={line===i?s.activeDot:""} aria-label={"Show pickup line "+(i+1)} aria-pressed={line===i} onClick={()=>setLine(i)} />)}</div><button type="button" className={s.audio} onClick={()=>play(chosen.korean)}>♪ Hear the line</button></div></div>}
   {tab==="preset"&&<div className={s.tabPanel}><span className={s.eyebrow}>INSTANT KOREAN FOR REAL LIFE</span><p className={s.tabIntro}>Pick a ready-made message, then compare what you'd say casually or politely.</p><div className={s.presetChoices}>{presets.map((x,i)=><button type="button" key={x.name} className={preset===i?s.presetOn:""} aria-pressed={preset===i} onClick={()=>setPreset(i)}>{x.name}</button>)}</div><div className={s.toneToggle} role="group" aria-label="Korean speech register"><button type="button" aria-pressed={tone==="casual"} onClick={()=>setTone("casual")} className={tone==="casual"?s.toneOn:""}>Casual / close</button><button type="button" aria-pressed={tone==="polite"} onClick={()=>setTone("polite")} className={tone==="polite"?s.toneOn:""}>Polite</button></div><div className={s.instantCard}><small>“{instant.english}”</small><strong lang="ko">{instant[tone]}</strong><p>{instant.note}</p><button type="button" onClick={()=>play(instant[tone])}>♪ Hear Korean</button></div></div>}
   {tab==="custom"&&<div className={s.tabPanel}><span className={s.eyebrow}>AI MESSAGE MAKEOVER</span><p className={s.tabIntro}>In the actual app, write an English message, pick the person and vibe, then set how obvious the flirting should be. Hallim generates a natural Korean match plus softer, bolder and funnier variations.</p><label className={s.formField}><span>Your message</span><textarea value={form.message} maxLength={280} onChange={e=>setForm(v=>({...v,message:e.target.value}))} placeholder="E.g. I was thinking about you today…" rows={2}/></label><div className={s.formRow}><label className={s.formField}><span>Who is it for?</span><select value={form.person} onChange={e=>setForm(v=>({...v,person:e.target.value}))}>{people.map(x=><option key={x}>{x}</option>)}</select></label><label className={s.formField}><span>What vibe?</span><select value={form.vibe} onChange={e=>setForm(v=>({...v,vibe:e.target.value}))}>{moods.map(x=><option key={x}>{x}</option>)}</select></label></div><label className={s.range}><span>How obvious should I make it? <b>{form.intensity}%</b></span><input type="range" min="0" max="100" step="5" value={form.intensity} onChange={e=>setForm(v=>({...v,intensity:Number(e.target.value)}))}/><small><span>Just friendly</span><span>Obviously flirting</span></small></label><a href={authHref("/?view=partner")} className={s.makeoverCta}>{form.message.trim()?"Make this Korean in Hallim":"Open AI Message Makeover"} <LinkArrow/></a><p className={s.previewNote}>Controls are a static preview; AI generation runs after sign-in in the actual Hallim app. Your text here isn't submitted.</p></div>}
   <div className={s.previewBottom}><span aria-live="polite">{audio||"Examples are from Hallim's actual Partner Korean feature."}</span><a href={authHref("/?view=partner")}>Open full feature <LinkArrow/></a></div>
  </div>
 </article>;
}
