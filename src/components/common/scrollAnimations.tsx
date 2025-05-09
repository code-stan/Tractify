import { gsap } from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

export const initScrollAnimations = (): void => {
  gsap.registerPlugin(ScrollTrigger);
  
  setupHeroPinning();
  
  window.addEventListener("resize", () => {
    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);
  });
};

const setupHeroPinning = (): void => {
  const heroSection = document.querySelector("[class*='hero']");
  const sections = document.querySelectorAll("[data-section]");
  
  if (!heroSection || sections.length === 0) {
    console.error("Required elements not found for hero pin animation");
    return;
  }
  
  gsap.set(heroSection, { 
    zIndex: 1,
    position: "relative"
  });
  
  sections.forEach((section, index) => {
    gsap.set(section, { 
      zIndex: 10 + index, 
      position: "relative",
    });
    ScrollTrigger.create({
      trigger: heroSection,
      start: "top top", 
      endTrigger: section, 
      end: "top top",
      pin: true,
      pinSpacing: false
    });
  });
  
}