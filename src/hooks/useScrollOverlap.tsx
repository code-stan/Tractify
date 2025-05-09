import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger)
export function useScrollOverlap() {
  useGSAP(() => {
    const sections = gsap.utils.toArray<HTMLElement>('[data-section]');

    if (window.innerWidth >= 768) {
      sections.forEach((section, i) => {
        if (i === 0) return;

        const prev = sections[i - 1];

        // pin previous section
        ScrollTrigger.create({
          trigger: prev,
          start: "bottom bottom",
          end: () => `+=${prev.offsetHeight}`,
          pin: true,
          pinSpacing: false,
        });

        // slide current section up over pinned one
        gsap.fromTo(
          section,
          { yPercent: 100 },
          {
            yPercent: 0,
            ease: "none",
            scrollTrigger: {
              trigger: prev,
              start: "bottom bottom",
              end: () => `+=${prev.offsetHeight}`,
              scrub: true,
            },
          }
        );
      });
    } else {
      sections.forEach((section, i) => {
        gsap.set(section, {
            zIndex: 10 + i
        })
        gsap.from(section, {
          autoAlpha: 0,
          y: 50,
          duration: 0.6,
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
          },
        });
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);
}