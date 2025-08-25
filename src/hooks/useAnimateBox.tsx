import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { type RefObject } from "react";

gsap.registerPlugin(ScrollTrigger);
const useAnimateBox = (element: RefObject<HTMLDivElement>, parentContainer: RefObject<HTMLDivElement>) => {
	useGSAP(
		() => {
			const elementRef = element?.current;

			gsap.from(elementRef, {
				yPercent: 50,
				opacity: 0,
				duration: 1.25,
				ease: "expo.out",
				scrollTrigger: {
					trigger: elementRef,
					// start: "top 120%",
				},
			});
		},
		{ scope: parentContainer }
	);
};

export default useAnimateBox;
