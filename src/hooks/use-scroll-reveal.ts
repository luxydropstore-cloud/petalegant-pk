import { useEffect } from "react";

/** Progressive enhancement: content remains visible without JavaScript or animation support. */
export function useScrollReveal(pathname: string) {
  useEffect(() => {
    const main = document.querySelector("main");
    if (!main || !("IntersectionObserver" in window)) return;

    const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const registered = new WeakSet<Element>();
    const animations = new Set<Animation>();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          observer.unobserve(entry.target);
          if (motionPreference.matches || !(entry.target instanceof HTMLElement)) continue;
          // Fast scrolling or anchor navigation must never move already-visible content.
          if (entry.boundingClientRect.top < window.innerHeight - 120) continue;

          const animation = entry.target.animate(
            [
              { transform: "translateY(12px)" },
              { transform: "translateY(0)" },
            ],
            {
              duration: 850,
              easing: "cubic-bezier(0.25, 0.1, 0.25, 1)",
            },
          );
          animations.add(animation);
          animation.onfinish = () => animations.delete(animation);
        }
      },
      // Begin just before content enters the screen, rather than fading it out on screen.
      { threshold: 0, rootMargin: "0px 0px 80px 0px" },
    );

    const register = () => {
      if (motionPreference.matches) return;
      const selector = ".grid > *, section h2";
      for (const element of main.querySelectorAll<HTMLElement>(selector)) {
        // Animate a group or its children, never both: avoid compounded motion.
        if (registered.has(element) || element.parentElement?.closest(selector)) continue;
        registered.add(element);
        if (element.getBoundingClientRect().top < window.innerHeight) continue;
        observer.observe(element);
      }
    };

    const cancelMotion = () => {
      if (!motionPreference.matches) return;
      observer.disconnect();
      for (const animation of animations) animation.cancel();
      animations.clear();
    };

    register();
    // Collection results and route content can arrive after the first render.
    const mutations = new MutationObserver(register);
    mutations.observe(main, { childList: true, subtree: true });
    motionPreference.addEventListener("change", cancelMotion);

    return () => {
      observer.disconnect();
      mutations.disconnect();
      motionPreference.removeEventListener("change", cancelMotion);
      for (const animation of animations) animation.cancel();
    };
  }, [pathname]);
}