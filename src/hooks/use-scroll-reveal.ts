import { useEffect } from "react";

/** Progressive enhancement: content remains visible without JavaScript or animation support. */
export function useScrollReveal(pathname: string) {
  useEffect(() => {
    const main = document.querySelector("main");
    if (!main || !("IntersectionObserver" in window)) return;

    const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const registered = new WeakSet<Element>();
    const animations = new Set<Animation>();
    const delays = new WeakMap<Element, number>();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          observer.unobserve(entry.target);
          if (motionPreference.matches || !(entry.target instanceof HTMLElement)) continue;

          const animation = entry.target.animate(
            [
              { opacity: 0, transform: "translateY(22px)" },
              { opacity: 1, transform: "translateY(0)" },
            ],
            {
              duration: 650,
              delay: delays.get(entry.target) ?? 0,
              easing: "cubic-bezier(0.22, 1, 0.36, 1)",
            },
          );
          animations.add(animation);
          animation.onfinish = () => animations.delete(animation);
        }
      },
      { threshold: 0, rootMargin: "0px 0px -32px 0px" },
    );

    const register = () => {
      if (motionPreference.matches) return;
      const selector = ".grid > *, section h2";
      for (const element of main.querySelectorAll<HTMLElement>(selector)) {
        // Animate a group or its children, never both: avoid compounded motion.
        if (registered.has(element) || element.parentElement?.closest(selector)) continue;
        registered.add(element);
        if (element.getBoundingClientRect().top < window.innerHeight) continue;
        const siblings = Array.from(element.parentElement?.children ?? []);
        delays.set(element, (siblings.indexOf(element) % 3) * 70);
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