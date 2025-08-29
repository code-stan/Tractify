import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { type RefObject } from "react";
import { BREAKPOINT } from "../utils/constants";

gsap.registerPlugin(ScrollTrigger);

// For section that has images with long height
const useAnimateItemsInList = (listParent: RefObject<HTMLUListElement | null>, containerWrapper: RefObject<HTMLDivElement | null>) => {
	useGSAP(
		() => {
			const mm = gsap.matchMedia();
			if (containerWrapper.current && listParent.current) {
				const lis = listParent.current.querySelectorAll("li");
				if (lis) {
					mm.add(`(max-width: ${BREAKPOINT}px)`, () => {
						lis.forEach((li) => {
							gsap.from(li, {
								yPercent: 35,
								opacity: 0,
								duration: 1.25,
								ease: "expo.out",
								scrollTrigger: {
									trigger: li,
									start: "top 100%",
									// markers: true,
								},
							});

						});
					});
					mm.add(`(min-width: ${BREAKPOINT + 1}px)`, () => {
						gsap.from(lis, {
							yPercent: 50,
							opacity: 0,
							duration: 1.25,
							ease: "expo.out",
							stagger: 0.15,
							scrollTrigger: {
								trigger: lis,
								start: "top 90%",
								// markers: true,
							},
						});
					});
				}
			}
		},
		{ scope: containerWrapper }
	);
};

export { useAnimateItemsInList };
