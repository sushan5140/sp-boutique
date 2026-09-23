"use client";

import { useState } from "react";
import styles from "./landing.module.css";
import { HallimFeatureSystem } from "./FeatureAtlas";
import LevelJourney from "./LevelJourney";

const scenes = [
  { korean:"오늘 뭐 해요?", sound:"oneul mwo haeyo?", meaning:"What are you doing today?", context:"Your friend checks in after class.", pieces:["오늘","뭐","해요?"], gloss:["today","what","do?"] },
  { korean:"커피 한 잔 주세요.", sound:"keopi han jan juseyo.", meaning:"One cup of coffee, please.", context:"You're ordering at a little café.", pieces:["커피","한 잔","주세요."], gloss:["coffee","one cup","please give me"] },
  { korean:"주말에 같이 공부해요.", sound:"jumare gachi gongbuhaeyo.", meaning:"Let's study together this weekend.", context:"You're making plans with a study partner.", pieces:["주말에","같이","공부해요."], gloss:["on the weekend","together","study"] },
];

const faqs = [
  { q:"Do I need to know Hangul first?", a:"No. Start in Hangul Lab to explore the writing system, then choose a Starter learning path when you're ready." },
  { q:"Can I see Hallim before signing in?", a:"Yes. Explore this page, the product demo, and the public Hangul Lab. Google sign-in is needed to save a personal learning path and access account features." },
  { q:"Does Hallim prepare me for TOPIK?", a:"Hallim can support Korean language practice, but its study results and level suggestions are not official TOPIK assessments or certificates." },
  { q:"Are Study Partners automatic?", a:"No. Discovery starts off, you choose whether to be visible, and a partner needs to accept your request before a shared room opens. You choose which notes to share." },
];

function Mark() {
  return <span className={styles.logoMark} aria-hidden="true">ㅎ</span>;
}

function Arrow({ diagonal = false }) {
  return <span aria-hidden="true">{diagonal ? "↗" : "→"}</span>;
}

export default function LandingPage({ authHref, authError = "" }) {
  const [sceneIndex, setSceneIndex] = useState(0);
  const [mode, setMode] = useState("meaning");
  const [chosen, setChosen] = useState([]);
  const [speakerStatus, setSpeakerStatus] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const scene = scenes[sceneIndex];
  const entry = authHref("/?view=companion");
  const closeMenu = () => setMenuOpen(false);

  function chooseScene(next) {
    setSceneIndex((next + scenes.length) % scenes.length);
    setMode("meaning");
    setChosen([]);
    setSpeakerStatus("");
  }

  function speak() {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) {
      setSpeakerStatus("Your browser has no speech playback.");
      return;
    }
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(scene.korean);
    utterance.lang = "ko-KR";
    utterance.rate = 0.85;
    utterance.onstart = () => setSpeakerStatus("Playing Korean…");
    utterance.onend = () => setSpeakerStatus("");
    utterance.onerror = () => setSpeakerStatus("Speech is unavailable on this device.");
    window.speechSynthesis.speak(utterance);
  }

  const chosenPhrase = chosen.map(i => scene.pieces[i]).join(" ");
  const complete = chosen.length === scene.pieces.length;
  const phraseMatches = chosen.join(",") === scene.pieces.map((_, i) => i).join(",");

  return (
    <main className={styles.root} id="main">
      <a className={styles.skip} href="#features">Skip to content</a>
      <header className={styles.header}>
        <div className={styles.navInner}>
          <a href="./" className={styles.logo} onClick={closeMenu} aria-label="Hallim home"><Mark/><span>hallim<span className={styles.logoDot}>.</span><small lang="ko">한림</small></span></a>
          <nav className={styles.nav} aria-label="Primary navigation">
            <a href="#features">The system</a>
            <a href="#lesson-lab">Inside a lesson</a>
            <a href="#try-a-moment">Try Korean</a>
            <a href="#study-together">Study together</a>
            <a href="https://hallium.vercel.app/demo">Product tour <Arrow diagonal/></a>
          </nav>
          <a className={styles.navCta} href={entry}>Start learning <Arrow diagonal/></a>
          <button className={styles.menuButton} type="button" onClick={() => setMenuOpen(o => !o)} aria-expanded={menuOpen} aria-controls="hallim-menu" aria-label={menuOpen ? "Close menu" : "Open menu"}>{menuOpen ? "Close ×" : "Menu ☰"}</button>
        </div>
        {menuOpen && <nav className={styles.mobileMenu} id="hallim-menu" aria-label="Mobile navigation">
          <a href="#features" onClick={closeMenu}>The system</a>
          <a href="#lesson-lab" onClick={closeMenu}>Inside a lesson</a>
          <a href="#try-a-moment" onClick={closeMenu}>Try Korean</a>
          <a href="#study-together" onClick={closeMenu}>Study together</a>
          <a href="https://hallium.vercel.app/demo" onClick={closeMenu}>Product tour ↗</a>
          <a href={entry} onClick={closeMenu}>Start learning ↗</a>
        </nav>}
      </header>

      <section className={styles.hero} aria-labelledby="hero-title">
        <div className={styles.heroCopy}>
          <span className={styles.pill}><span className={styles.pillStar}>✳</span> One place for your whole Korean journey</span>
          <h1 id="hero-title">Your Korean journey,<br/><em>beautifully connected.</em><span> From your first word on.</span></h1>
          <p className={styles.heroLead}>Go from your first Hangul letter to real conversations with a connected curriculum, hands-on practice, thoughtful review and help from people learning alongside you.</p>
          <div className={styles.heroActions}>
            <a href="#features" className={styles.primary}>Discover your Korean world <Arrow diagonal/></a>
            <a href={entry} className={styles.secondary}>Start learning <span aria-hidden="true">↗</span></a>
          </div>
          {authError && <p className={styles.authError} role="alert">{authError}</p>}
          <div className={styles.heroFoot}>
            <span className={styles.threeMarks} aria-hidden="true"><i>가</i><i>나</i><i>다</i></span>
            <p>A connected path from your first letter to your next conversation.</p>
          </div>
        </div>
        <LevelJourney />
      </section>

      <section className={styles.ribbon} aria-label="Hallim by the numbers">
        <div><span>15</span><b>CURRICULUM UNITS</b></div>
        <span className={styles.ribbonArrow} aria-hidden="true">✳</span>
        <div><span>76</span><b>LESSONS & CHECKPOINTS</b></div>
        <span className={styles.ribbonArrow} aria-hidden="true">✳</span>
        <div><span>5 → 1</span><b>LEARNING INPUTS, ONE ROUTE</b></div>
      </section>

      <HallimFeatureSystem authHref={authHref} />

      <section className={styles.demoSection} id="try-a-moment">
        <div className={styles.demoHeading}>
          <div><span className={styles.sectionEyebrow}><span className={styles.sectionIndex}>07</span> TRY IT YOURSELF</span><h2>Try a moment.<br/><em>Feel the difference.</em></h2></div>
          <p>This is a tiny interactive preview. Your choices here stay on this page; your real learning history starts after sign-in.</p>
        </div>
        <div className={styles.demoCard}>
          <div className={styles.demoLeft}>
            <div className={styles.demoBar}><span><Mark/> MOMENT {String(sceneIndex+1).padStart(2,"0")}</span><span>한국어 · KOREAN</span></div>
            <div className={styles.demoScene} key={sceneIndex}>
              <span className={styles.dialogueEyebrow}>IN A REAL MOMENT</span>
              <p>{scene.context}</p>
              <div className={styles.speechBubble}><span className={styles.speechDots} aria-hidden="true">✳</span><strong lang="ko">{scene.korean}</strong></div>
              <span className={styles.romanization}>{scene.sound}</span>
              <button className={styles.listen} onClick={speak} type="button"><span aria-hidden="true">♪</span> Hear it out loud <Arrow diagonal/></button>
              <span className={styles.speechStatus} aria-live="polite">{speakerStatus}</span>
            </div>
            <div className={styles.sceneControls}>
              <span>SWITCH THE SCENE</span><div><button type="button" onClick={() => chooseScene(sceneIndex-1)} aria-label="Previous conversation">←</button>{scenes.map((item,i)=><button type="button" key={item.korean} onClick={() => chooseScene(i)} className={sceneIndex===i ? styles.sceneDotActive : styles.sceneDot} aria-label={"Show conversation "+(i+1)} aria-current={sceneIndex===i ? "step" : undefined}/>) }<button type="button" onClick={() => chooseScene(sceneIndex+1)} aria-label="Next conversation">→</button></div>
            </div>
          </div>
          <div className={styles.demoRight}>
            <div className={styles.exploreHead}><span>EXPLORE THE PHRASE</span><span>✦</span></div>
            <div className={styles.tabs} role="group" aria-label="Choose learning activity">
              {[["meaning","Understand"],["build","Build it"],["review","Remember"]].map(([key,label])=><button key={key} type="button" className={mode===key?styles.activeTab:""} onClick={()=>{setMode(key);setChosen([])}} aria-pressed={mode===key}>{label}</button>)}
            </div>
            {mode==="meaning"&&<div className={styles.modePanel} key={"meaning"+sceneIndex}>
              <span className={styles.microLabel}>THE MEANING</span>
              <h3>{scene.meaning}</h3>
              <div className={styles.wordBreakdown}>{scene.pieces.map((p,i)=><div key={p}><strong lang="ko">{p}</strong><span>{scene.gloss[i]}</span></div>)}</div>
              <p>One phrase, a real situation, and words you can take into the next conversation.</p>
              <button className={styles.panelNext} type="button" onClick={()=>setMode("build")}>Now build it <Arrow/></button>
            </div>}
            {mode==="build"&&<div className={styles.modePanel} key={"build"+sceneIndex}>
              <span className={styles.microLabel}>YOUR TURN</span><h3>Put the phrase together.</h3>
              <p>Tap each piece in the order you would say it.</p>
              <div className={styles.answer} aria-live="polite">{chosenPhrase || "Your Korean goes here…"}</div>
              <div className={styles.buildPieces}>{[1,2,0].map(i=><button type="button" key={i} disabled={chosen.includes(i)} onClick={()=>setChosen(prev=>[...prev,i])} lang="ko">{scene.pieces[i]}</button>)}</div>
              <p className={styles.buildFeedback} aria-live="polite">{complete ? (phraseMatches ? "Yes! You put the conversation together." : "Not quite — change the order and try again.") : "No grades here. Just room to try."}</p>
              <div className={styles.panelRow}><button type="button" className={styles.reset} onClick={()=>setChosen([])}>Start again ↶</button>{complete&&phraseMatches&&<button type="button" className={styles.panelNext} onClick={()=>setMode("review")}>One more way <Arrow/></button>}</div>
            </div>}
            {mode==="review"&&<div className={styles.modePanel} key={"review"+sceneIndex}>
              <span className={styles.microLabel}>MAKE IT STICK</span><h3>Would you remember it tomorrow?</h3>
              <div className={styles.reviewTile}><span lang="ko">기억해요</span><p>In Hallim, learning continues after the first correct answer. Lessons, checks, and review help you return to what needs practice.</p></div>
              <a className={styles.panelNext} href={entry}>Keep learning in Hallim <Arrow/></a>
            </div>}
          </div>
        </div>
      </section>

      <section className={styles.partner} id="study-together">
        <div className={styles.partnerCopy}><span className={styles.sectionEyebrow}><span className={styles.sectionIndex}>08</span>  BETTER TOGETHER</span><h2>Your next breakthrough might be <em>another learner.</em></h2><p>You’re great at words. They’re finding their way through grammar. Hallim’s optional Study Partners helps you find complementary learners and share the notes you actually choose to share.</p><div className={styles.partnerActions}><a href="https://hallium.vercel.app/study-partners" className={styles.primary}>Discover Study Partners <Arrow diagonal/></a><span>Opt-in discovery · Mutual acceptance</span></div></div>
        <div className={styles.partnerIllustration} aria-label="Illustration of complementary vocabulary and grammar strengths">
          <span className={styles.partnerSticker}>같이 배우자 ✳</span>
          <div className={styles.learnerOne}><span className={styles.avatar}>가</span><div><small>LEARNER A</small><b>Vocabulary <span>↗</span></b><em>Working on grammar</em></div></div>
          <div className={styles.partnerConnection}><i/>better together<i/></div>
          <div className={styles.learnerTwo}><span className={styles.avatar}>문</span><div><small>LEARNER B</small><b>Grammar <span>↗</span></b><em>Working on vocabulary</em></div></div>
          <div className={styles.partnerNote}>Share a note. Start a conversation. <strong>Grow together. ↗</strong></div>
          <small className={styles.illustrationDisclaimer}>Illustrative example — not real learner profiles.</small>
        </div>
      </section>

      <section className={styles.doorways}>
        <span className={styles.sectionEyebrow}><span className={styles.sectionIndex}>09</span>  WHERE WOULD YOU LIKE TO BEGIN?</span>
        <h2>There's more than one<br/><em>way to start.</em></h2>
        <div className={styles.doorGrid}>
          <a href="https://hallium.vercel.app/hangul" className={styles.doorOne}><span>01 / COMPLETE BEGINNER</span><strong lang="ko">가 나 다</strong><h3>Start with Hangul.</h3><p>Meet the writing system through sound, visual practice, and writing.</p><span className={styles.doorLink}>Open Hangul Lab <Arrow diagonal/></span></a>
          <a href={entry} className={styles.doorTwo}><span>02 / READY FOR A LESSON</span><strong lang="ko">말해 봐요!</strong><h3>Start with a moment.</h3><p>Step into structured lessons, listening and a path built from your progress.</p><span className={styles.doorLink}>Explore your learning path <Arrow diagonal/></span></a>
          <a href="https://hallium.vercel.app/demo" className={styles.doorThree}><span>03 / JUST CURIOUS</span><strong>✳ ↗</strong><h3>See the whole picture.</h3><p>Take a quick look at Hallim’s actual curriculum, review, and adaptive tools.</p><span className={styles.doorLink}>Watch the product tour <Arrow diagonal/></span></a>
        </div>
      </section>

      <section className={styles.faq} id="faq">
        <div><span className={styles.sectionEyebrow}><span className={styles.sectionIndex}>10</span>  GOOD TO KNOW</span><h2>A few things you<br/>might be wondering.</h2></div>
        <div className={styles.faqList}>{faqs.map(item=><details key={item.q}><summary>{item.q}<span aria-hidden="true">+</span></summary><p>{item.a}</p></details>)}</div>
      </section>

      <section className={styles.finalCta}><span className={styles.finalKorean} aria-hidden="true">시작</span><span className={styles.sectionEyebrow}>THE FIRST STEP IS A SMALL ONE.</span><h2>Your Korean story<br/>starts <em>here.</em></h2><p>No perfect level required. No perfect pronunciation required. Just a place to begin.</p><div><a href={entry} className={styles.finalButton}>Start learning with Google <Arrow diagonal/></a><a href="https://hallium.vercel.app/hangul" className={styles.finalAlt}>Try Hangul Lab first ↓</a></div></section>
    </main>
  );
}
