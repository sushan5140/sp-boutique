/* SP Boutique | Balanced Editorial Motion V1
   01 Hero (CSS), 02 Section reveals, 03 Garment reveals, 04 Card touch
   (CSS), 05 Studio transitions (CSS on the existing SVG/steps),
   06 Scroll-linked stitching thread, 07 Native-first accordion.
   No tracking, new dependencies, or intercepted scroll. */
(() => {
  "use strict";
  const $ = (s, root = document) => root.querySelector(s);
  const $$ = (s, root = document) => [...root.querySelectorAll(s)];
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
  const canObserve = "IntersectionObserver" in window;

  /* 02/03 — Initialize only below-viewport elements, never the page hero.
     CSS alone leaves all content visible, including if JavaScript fails. */
  if (canObserve && !reduced.matches) {
    const pending = new Set();
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.classList.add("spb-reveal-visible");
        observer.unobserve(entry.target);
        pending.delete(entry.target);
      }
    }, { rootMargin: "0px 0px -7% 0px", threshold: .08 });

    const track = (element, delay = 0, isCard = false) => {
      if (!element || element.classList.contains("spb-reveal-pending") ||
          element.closest("[hidden]")) return;
      const r = element.getBoundingClientRect();
      if (r.top < innerHeight * .88 || r.bottom <= 0) return;
      if (isCard) element.classList.add("spb-card-reveal");
      element.style.setProperty("--spb-motion-delay", `${Math.min(delay, 180)}ms`);
      element.classList.add("spb-reveal-pending");
      pending.add(element);
      observer.observe(element);
    };

    [
      "#collections .sec__head",
      ".spb-garment-chooser__head",
      "#styles-we-stitch .spb-styles__intro",
      "#styles-we-stitch .spb-styles__group-head",
      "#studio .studio__intro",
      "#stitching .craft__heading",
      "#stitching .craft__photo",
      ".journey__lead",
      ".journey__steps",
      ".rates__head",
      ".rates__body",
      "#visit .visit__header",
      "#visit .visit__photo",
      "#visit .enquiry"
    ].forEach(selector => $$(selector).forEach(el => track(el)));

    const addCards = (cards) => {
      const columns = window.innerWidth <= 650 ? 2 : window.innerWidth <= 990 ? 3 : 4;
      cards.forEach((card, i) => track(card, (i % columns) * 60, true));
    };
    addCards($$(".spb-garment-card, .spb-style-card"));
    const b5 = $("#b5-kurta-gallery");
    if (b5) {
      const newlyVisible = new MutationObserver(() => {
        if (!b5.hidden) {
          addCards($$(".spb-style-card", b5));
          newlyVisible.disconnect();
        }
      });
      if (b5.hidden) newlyVisible.observe(b5, { attributes: true, attributeFilter: ["hidden"] });
    }

    /* Fallback if an observer stalls or a browser restores scroll position.
       A delayed scroll check never blocks clicks, semantics or layout. */
    const check = () => {
      for (const element of pending) {
        const r = element.getBoundingClientRect();
        if (r.top < innerHeight && r.bottom > 0) {
          element.classList.add("spb-reveal-visible");
          observer.unobserve(element);
          pending.delete(element);
        }
      }
    };
    addEventListener("pageshow", check, { passive: true });
    addEventListener("focus", check, { passive: true });
    reduced.addEventListener?.("change", () => {
      if (reduced.matches) {
        for (const element of pending) element.classList.add("spb-reveal-visible");
        pending.clear();
        observer.disconnect();
      }
    });
  }

  /* 05 — Reuse existing live SVG updates and tab state from site.js.
     CSS animates each newly inserted <svg> rather than rerendering it. */
  const studio = $("#studio");
  if (studio) studio.classList.add("spb-motion-live");

  /* 06 — Draw a thin tailoring-thread line between order milestones,
     with one lightweight rAF measurement per scroll frame at most. */
  const steps = $(".journey__steps");
  if (steps && !reduced.matches) {
    const items = $$("li", steps);
    if (items.length >= 2) {
      steps.parentElement?.classList.add("spb-thread-active");
      let scheduled = false;
      const update = () => {
        scheduled = false;
        const a = items[0].getBoundingClientRect();
        const b = items[items.length - 1].getBoundingClientRect();
        const first = a.top + a.height / 2;
        const last = b.top + b.height / 2;
        const probe = window.innerHeight * .69;
        const fraction = Math.min(1, Math.max(0, (probe - first) / Math.max(1, last - first)));
        steps.style.setProperty("--spb-thread-progress", fraction.toFixed(3));
      };
      const schedule = () => {
        if (scheduled) return;
        scheduled = true;
        requestAnimationFrame(update);
      };
      addEventListener("scroll", schedule, { passive: true });
      addEventListener("resize", schedule, { passive: true });
      addEventListener("pageshow", schedule, { passive: true });
      schedule();
    }
  }

  /* 07 — Animate the 3 actual service details.
     Summary is still a native keyboard-activatable control if JS or WAAPI
     fails; open state is not mutated until a close animation finishes. */
  const craft = $("#stitching");
  if (craft) craft.classList.add("spb-motion-accordion");
  for (const details of $$(".craft__more")) {
    const summary = $("summary", details);
    const content = $(":scope > p", details);
    const icon = $("summary span", details);
    if (!summary || !content) continue;

    const syncIcon = () => { if (icon) icon.textContent = details.open ? "−" : "+"; };
    syncIcon();
    details.addEventListener("toggle", syncIcon);
    if (typeof content.animate !== "function") continue;

    let animation = null;
    let closing = false;
    summary.addEventListener("click", event => {
      if (reduced.matches) return; // native, immediate open/close
      event.preventDefault();
      const opening = !details.open || closing;
      if (animation) { animation.cancel(); animation = null; }
      closing = false;
      if (opening) details.open = true;
      if (icon) icon.textContent = opening ? "−" : "+";

      const height = Math.max(1, content.scrollHeight);
      const from = opening ? 0 : height;
      const to = opening ? height : 0;
      content.style.overflow = "hidden";
      closing = !opening;
      const current = content.animate([
        { height: `${from}px`, opacity: opening ? 0 : 1 },
        { height: `${to}px`, opacity: opening ? 1 : 0 }
      ], { duration: opening ? 230 : 190, easing: "cubic-bezier(.22,1,.36,1)" });
      animation = current;
      current.onfinish = () => {
        if (animation !== current) return;
        if (!opening) details.open = false;
        content.style.removeProperty("overflow");
        closing = false;
        animation = null;
        syncIcon();
      };
      current.oncancel = () => {
        if (animation !== current) return;
        content.style.removeProperty("overflow");
        animation = null;
      };
    });
  }
})();
